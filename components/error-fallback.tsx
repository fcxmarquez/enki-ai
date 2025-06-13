"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

/**
 * Error fallback component displayed when an error boundary catches an error.
 *
 * Renders a Shadcn dialog with the error message and a button to retry.
 */
export function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <Dialog open>
      <DialogContent className="text-center">
        <DialogHeader>
          <DialogTitle>Something went wrong</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-destructive">{error.message}</p>
        <Button onClick={resetErrorBoundary} className="mt-4">
          Try again
        </Button>
      </DialogContent>
    </Dialog>
  );
}
