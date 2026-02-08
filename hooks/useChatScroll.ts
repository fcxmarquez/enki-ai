import { useCallback, useEffect, useRef, useState } from "react";

interface UseChatScrollOptions {
  enabled?: boolean;
  followKey?: string | number;
  isLoading: boolean;
  bottomThreshold?: number;
  buttonThreshold?: number;
}

export const useChatScroll = ({
  enabled = true,
  followKey,
  isLoading,
  bottomThreshold = 100,
  buttonThreshold = 2,
}: UseChatScrollOptions) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const shouldAutoScrollRef = useRef(true);
  const pendingScrollBehaviorRef = useRef<ScrollBehavior | null>(null);
  const isProgrammaticScrollRef = useRef(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const scrollToBottom = useCallback((behavior: ScrollBehavior) => {
    shouldAutoScrollRef.current = true;
    isProgrammaticScrollRef.current = true;

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
    isProgrammaticScrollRef.current = true;
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
    const isAtBottomForButton =
      scrollTop + clientHeight >= scrollHeight - buttonThreshold;
    const hasOverflow = scrollHeight > clientHeight;

    return { isAtBottom, isAtBottomForButton, hasOverflow };
  }, [bottomThreshold, buttonThreshold]);

  const handleProgrammaticScroll = useCallback(
    (state: { isAtBottomForButton: boolean }) => {
      if (!isProgrammaticScrollRef.current) return false;

      if (state.isAtBottomForButton) {
        isProgrammaticScrollRef.current = false;
      }

      updateScrollButtonState(false, true);
      return true;
    },
    [updateScrollButtonState]
  );

  const syncScrollButtonState = useCallback(() => {
    const state = computeScrollState();
    if (!state) return;

    if (handleProgrammaticScroll(state)) return;

    updateScrollButtonState(state.hasOverflow, state.isAtBottomForButton);
  }, [computeScrollState, handleProgrammaticScroll, updateScrollButtonState]);

  const onScroll = useCallback(() => {
    const state = computeScrollState();
    if (!state) return;

    if (handleProgrammaticScroll(state)) return;

    shouldAutoScrollRef.current = state.isAtBottom;
    updateScrollButtonState(state.hasOverflow, state.isAtBottomForButton);
  }, [computeScrollState, handleProgrammaticScroll, updateScrollButtonState]);

  useEffect(() => {
    if (!enabled) return;
    if (followKey == null) return;

    const raf = requestAnimationFrame(() => {
      syncScrollButtonState();
    });

    if (!shouldAutoScrollRef.current) {
      return () => cancelAnimationFrame(raf);
    }

    const behavior = pendingScrollBehaviorRef.current ?? "auto";
    pendingScrollBehaviorRef.current = null;
    scrollToBottom(behavior);
    return () => cancelAnimationFrame(raf);
  }, [enabled, followKey, scrollToBottom, syncScrollButtonState]);

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

    if (isLoading) {
      const interval = setInterval(() => {
        syncScrollButtonState();
      }, 100);
      const raf = requestAnimationFrame(() => {
        syncScrollButtonState();
      });

      return () => {
        cancelAnimationFrame(raf);
        clearInterval(interval);
      };
    }

    const timer = setTimeout(() => {
      syncScrollButtonState();
    }, 100);
    return () => clearTimeout(timer);
  }, [enabled, isLoading, syncScrollButtonState]);

  return {
    scrollContainerRef,
    showScrollButton,
    onScroll,
    scrollToBottom,
    scheduleScrollToBottom,
  };
};
