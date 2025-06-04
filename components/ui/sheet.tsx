"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import { animate } from "motion";

import { cn } from "@/lib/utils";

/**
 * Root component for the Sheet UI element, providing the container for sheet state and context.
 *
 * Wraps the Radix UI Dialog root primitive and adds a `data-slot="sheet"` attribute for styling or identification.
 */
function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

/**
 * Renders an element that triggers the opening of the sheet when interacted with.
 *
 * Forwards all props to the underlying trigger primitive and adds a `data-slot="sheet-trigger"` attribute for styling or identification.
 */
function SheetTrigger({ ...props }: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

/**
 * Renders a button or element that closes the sheet when activated.
 *
 * Forwards all props to the underlying close primitive and adds a `data-slot="sheet-close"` attribute for styling or identification.
 */
function SheetClose({ ...props }: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

/**
 * Renders the sheet content in a React portal, enabling it to appear outside the normal DOM hierarchy.
 *
 * Forwards all props to the underlying portal primitive and adds a `data-slot="sheet-portal"` attribute for styling or identification.
 */
function SheetPortal({ ...props }: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

/**
 * Renders a semi-transparent overlay behind the sheet, applying open and close transition animations.
 *
 * @param className - Additional class names to merge with the default overlay styles.
 */
function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  );
}

/**
 * Renders the main content area of the sheet, sliding in from the specified side with animated transitions.
 *
 * Includes a close button and overlays the rest of the UI. The `side` prop determines the slide-in direction (`top`, `right`, `bottom`, or `left`).
 *
 * @param side - The edge of the viewport from which the sheet appears. Defaults to `"right"`.
 */
function SheetContent({
  className,
  children,
  side = "right",
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: "top" | "right" | "bottom" | "left";
}) {
  const contentRef = React.useRef<HTMLDivElement>(null);

  const animConfig = React.useMemo(
    () => ({
      duration: 0.2,
      easing: "ease-in-out",
    }),
    []
  );

  const getClosedTransform = React.useCallback(() => {
    switch (side) {
      case "right":
        return "translateX(100%)";
      case "left":
        return "translateX(-100%)";
      case "top":
        return "translateY(-100%)";
      case "bottom":
        return "translateY(100%)";
      default:
        return "translate(0, 0)";
    }
  }, [side]);

  React.useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const handleStateChange = (state: string | null) => {
      if (state === "open") {
        animate(
          content,
          { transform: "translate(0, 0)", opacity: 1 },
          animConfig
        );
      } else if (state === "closed") {
        animate(
          content,
          { transform: getClosedTransform(), opacity: 0 },
          animConfig
        );
      }
    };

    // Set initial state for entry animation
    content.style.transform = getClosedTransform();
    content.style.opacity = "0";
    handleStateChange(content.getAttribute("data-state"));

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "data-state") {
          handleStateChange(content.getAttribute("data-state"));
        }
      });
    });

    observer.observe(content, { attributes: true });
    return () => observer.disconnect();
  }, [getClosedTransform, animConfig]);

  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        ref={contentRef}
        data-slot="sheet-content"
        className={cn(
          "bg-background fixed z-50 flex flex-col gap-4 shadow-lg",
          side === "right" && "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          side === "left" && "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          side === "top" && "inset-x-0 top-0 h-auto border-b",
          side === "bottom" && "inset-x-0 bottom-0 h-auto border-t",
          className
        )}
        {...props}
      >
        {children}
        <SheetPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
          <XIcon className="size-4" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  );
}

/**
 * Renders a styled header section for the sheet component.
 *
 * Applies padding and vertical spacing to arrange header content. Additional class names can be merged for further customization.
 */
function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5 p-4", className)}
      {...props}
    />
  );
}

/**
 * Renders a footer section for the sheet, positioned at the bottom with padding and vertical spacing.
 *
 * @remark The footer uses `mt-auto` to push itself to the bottom of the sheet layout.
 */
function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  );
}

/**
 * Renders the sheet's title with emphasized styling.
 *
 * Forwards all props to the underlying Radix UI title primitive and adds a data attribute for slot identification.
 */
function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("text-foreground font-semibold", className)}
      {...props}
    />
  );
}

/**
 * Renders a styled description for the sheet, typically used to provide additional context below the title.
 *
 * Applies muted text styling and forwards all props to the underlying description primitive.
 */
function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
