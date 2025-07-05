import { auth } from "@clerk/nextjs";
import Link from "next/link";

import Header from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import { getImageById } from "@/lib/actions/image.actions";
import { DeleteConfirmation } from "@/components/shared/DeleteConfirmation";
import { DownloadButton } from "@/components/shared/DownloadButton";

const ImageDetails = async ({ params: { id } }: SearchParamProps) => {
  const { userId } = auth();

  const image = await getImageById(id);

  return (
    <>
      <Header title={image.title} />

      <section className="mt-5 flex flex-wrap gap-4">
        <div className="p-14-medium md:p-16-medium flex gap-2">
          <p className="text-dark-600">Transformation:</p>
          <p className="capitalize text-purple-400">
            {image.transformationType}
          </p>
        </div>

        {image.prompt && (
          <>
            <p className="hidden text-dark-400/50 md:block">&#x25CF;</p>
            <div className="p-14-medium md:p-16-medium flex gap-2">
              <p className="text-dark-600">Prompt:</p>
              <p className="capitalize text-purple-400">{image.prompt}</p>
            </div>
          </>
        )}

        {image.color && (
          <>
            <p className="hidden text-dark-400/50 md:block">&#x25CF;</p>
            <div className="p-14-medium md:p-16-medium flex gap-2">
              <p className="text-dark-600">Color:</p>
              <p className="capitalize text-purple-400">{image.color}</p>
            </div>
          </>
        )}

        {image.aspectRatio && (
          <>
            <p className="hidden text-dark-400/50 md:block">&#x25CF;</p>
            <div className="p-14-medium md:p-16-medium flex gap-2">
              <p className="text-dark-600">Aspect Ratio:</p>
              <p className="capitalize text-purple-400">{image.aspectRatio}</p>
            </div>
          </>
        )}
      </section>

      <section className="mt-10 border-t border-dark-400/15">
      <div className="transformation-grid">
  {/* Original Column */}
  <div className="flex flex-col gap-4">
    <div className="flex items-center h-9">
      <h3 className="h3-bold text-foreground/80">Original</h3>
    </div>
    
    <div className="rounded-2xl overflow-hidden border border-glass bg-panel-glass flex items-center justify-center min-h-[200px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image.secureURL.replace('/upload/', '/upload/f_jpg/')}
        alt="original"
        className="w-full object-contain max-h-[300px]"
      />
    </div>
  </div>

  {/* Transformed Column */}
  <div className="flex flex-col gap-4">
     <div className="flex w-full items-center justify-between h-9">
       <h3 className="h3-bold text-foreground/80">AI Transformed</h3>
       
       {/* New clean client component button */}
       <DownloadButton url={image.transformationUrl} title={image.title} />
     </div>
     
     <div className="rounded-2xl overflow-hidden border border-glass bg-panel-glass flex items-center justify-center min-h-[200px]">
       {/* eslint-disable-next-line @next/next/no-img-element */}
       <img
         src={image.transformationUrl}
         alt="transformed"
         className="w-full object-contain max-h-[300px]"
       />
     </div>
   </div>
</div>
        {userId === image.author.clerkId && (
          <div className="mt-4 space-y-4">
            <Button asChild type="button" className="submit-button capitalize">
              <Link href={`/transformations/${image._id}/update`}>
                Update Image
              </Link>
            </Button>
            <DeleteConfirmation imageId={image._id} />
          </div>
        )}
      </section>
    </>
  );
};

export default ImageDetails;