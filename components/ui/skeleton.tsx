import { cn } from "@/lib/utils";

/**
 * Renders a skeleton loading placeholder as a styled `div` element.
 *
 * Combines default skeleton styles with any additional classes provided via {@link className}, and passes through all other `div` props.
 *
 * @param className - Additional CSS classes to apply to the skeleton element.
 */
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

export { Skeleton };
