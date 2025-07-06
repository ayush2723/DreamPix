"use client";

import { useTransition } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteImage } from "@/lib/actions/image.actions";

import { Button } from "../ui/button";

export const DeleteConfirmation = ({ imageId }: { imageId: string }) => {
  const [isPending, startTransition] = useTransition();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className="w-full">
        <Button
          type="button"
          className="button h-[50px] md:h-[54px] w-full rounded-xl border border-rose-500/20 bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-600 hover:text-white transition-all duration-300 font-semibold"
        >
          Delete Image
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="border border-glass bg-panel-glass/95 backdrop-blur-xl shadow-glow-indigo rounded-2xl p-6 max-w-md w-[92%]">
        <AlertDialogHeader className="flex flex-col gap-2">
          <AlertDialogTitle className="h3-bold text-foreground tracking-tight">
            Permanently delete this image?
          </AlertDialogTitle>
          <AlertDialogDescription className="p-16-regular leading-relaxed">
            This action cannot be undone. This will permanently remove the image from your library and delete its transformation config.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex flex-col gap-3 sm:flex-row pt-4">
          <AlertDialogCancel className="button bg-panel-glass text-foreground/80 hover:text-foreground font-semibold border border-glass h-12 rounded-xl flex-center w-full sm:w-auto">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="submit-button font-bold text-white bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 h-12 rounded-xl border-none shadow-glow-card transition-all w-full sm:w-auto flex-center"
            onClick={() =>
              startTransition(async () => {
                await deleteImage(imageId);
              })
            }
          >
            {isPending ? "Deleting..." : "Permanently Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};