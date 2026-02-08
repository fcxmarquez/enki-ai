import { useCallback, useEffect, useRef, useState } from "react";

interface UseChatScrollOptions {
  enabled?: boolean;
  followKey?: string | number;
  isLoading: boolean;
  bottomThreshold?: number;
}

export const useChatScroll = ({
  enabled = true,
  followKey,
  isLoading,
  bottomThreshold = 100,
}: UseChatScrollOptions) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const shouldAutoScrollRef = useRef(true);
  const pendingScrollBehaviorRef = useRef<ScrollBehavior | null>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const scrollToBottom = useCallback((behavior: ScrollBehavior) => {
    // If we explicitly scroll to bottom, treat it as "follow mode".
    shouldAutoScrollRef.current = true;

    requestAnimationFrame(() => {
      const el = scrollContainerRef.current;
      if (!el) return;

      el.scrollTo({
        top: el.scrollHeight,
        behavior,
      });
    });
  }, []);

  const scheduleScrollToBottom = useCallback((behavior: ScrollBehavior) => {
    // Defer the scroll until after the next render, when DOM height is accurate.
    pendingScrollBehaviorRef.current = behavior;
    shouldAutoScrollRef.current = true;
  }, []);

  const updateScrollButtonState = useCallback(
    (hasOverflow: boolean, isAtBottom: boolean) => {
      setShowScrollButton((prev) => {
        const newValue = hasOverflow && !isAtBottom;
        return prev === newValue ? prev : newValue;
      });
    },
    []
  );

  const computeScrollState = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return null;

    const { scrollTop, scrollHeight, clientHeight } = el;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - bottomThreshold;
    const hasOverflow = scrollHeight > clientHeight;

    return { isAtBottom, hasOverflow };
  }, [bottomThreshold]);

  const syncScrollButtonState = useCallback(() => {
    const state = computeScrollState();
    if (!state) return;
    updateScrollButtonState(state.hasOverflow, state.isAtBottom);
  }, [computeScrollState, updateScrollButtonState]);

  const onScroll = useCallback(() => {
    const state = computeScrollState();
    if (!state) return;

    shouldAutoScrollRef.current = state.isAtBottom;
    updateScrollButtonState(state.hasOverflow, state.isAtBottom);
  }, [computeScrollState, updateScrollButtonState]);

  useEffect(() => {
    if (!enabled) return;
    if (followKey == null) return;
    if (!shouldAutoScrollRef.current) return;

    // Keep following the bottom while the user hasn't scrolled away.
    const behavior = pendingScrollBehaviorRef.current ?? "auto";
    pendingScrollBehaviorRef.current = null;
    scrollToBottom(behavior);
  }, [enabled, followKey, scrollToBottom]);

  useEffect(() => {
    if (!enabled) return;

    const content = scrollContainerRef.current;
    if (!content) return;

    const innerContent = content.firstElementChild;
    if (!innerContent) return;

    const observer = new ResizeObserver(() => {
      syncScrollButtonState();
    });

    observer.observe(innerContent);

    return () => observer.disconnect();
  }, [enabled, syncScrollButtonState]);

  useEffect(() => {
    if (!enabled) return;

    // Ensure the button visibility is correct once enabled (DOM is now present).
    const raf = requestAnimationFrame(() => {
      syncScrollButtonState();
    });

    return () => cancelAnimationFrame(raf);
  }, [enabled, syncScrollButtonState]);

  useEffect(() => {
    if (!enabled) return;

    if (!isLoading) {
      const timer = setTimeout(() => {
        syncScrollButtonState();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [enabled, isLoading, syncScrollButtonState]);

  return {
    scrollContainerRef,
    showScrollButton,
    onScroll,
    scrollToBottom,
    scheduleScrollToBottom,
  };
};
