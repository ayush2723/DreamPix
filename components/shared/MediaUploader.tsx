"use client";

import { useToast } from "@/components/ui/use-toast"
import { dataUrl, getImageSize } from "@/lib/utils";
import { CldImage, CldUploadWidget } from "next-cloudinary"
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

type MediaUploaderProps = {
  onValueChange: (value: string) => void;
  setImage: React.Dispatch<any>;
  publicId: string;
  image: any;
  type: string;
}

const MediaUploader = ({
  onValueChange,
  setImage,
  image,
  publicId,
  type
}: MediaUploaderProps) => {
  const { toast } = useToast()

  const onUploadSuccessHandler = (result: any) => {
    setImage((prevState: any) => ({
      ...prevState,
      publicId: result?.info?.public_id,
      width: result?.info?.width,
      height: result?.info?.height,
      secureURL: result?.info?.secure_url
    }))

    onValueChange(result?.info?.public_id)

    toast({
      title: 'Image uploaded successfully',
      description: '1 credit was deducted from your account',
      duration: 5000,
      className: 'success-toast' 
    })
  }

  const onUploadErrorHandler = () => {
    toast({
      title: 'Something went wrong while uploading',
      description: 'Please try again',
      duration: 5000,
      className: 'error-toast' 
    })
  }

  return (
    <CldUploadWidget
      uploadPreset="jsm_dreampix"
      options={{
        multiple: false,
        resourceType: "image",
      }}
      onSuccess={onUploadSuccessHandler}
      onError={onUploadErrorHandler}
    >
      {({ open }) => (
        <div className="flex flex-col gap-4 select-none">
          <h3 className="h3-bold text-foreground/80 font-bold tracking-tight">
            Original Image
          </h3>

          {publicId ? (
            <div className="relative rounded-2xl overflow-hidden border border-glass bg-panel-glass shadow-glow-card group cursor-pointer" onClick={() => open()}>
              <div className="overflow-hidden max-h-[280px] flex items-center justify-center rounded-2xl bg-black/5">
                <CldImage 
                  width={getImageSize(type, image, "width")}
                  height={getImageSize(type, image, "height")}
                  src={publicId}
                  alt="image"
                  sizes={"(max-width: 767px) 100vw, 50vw"}
                  placeholder={dataUrl as PlaceholderValue}
                  className="w-full h-full object-contain rounded-2xl"
                  style={{ maxHeight: '280px', width: '100%', height: 'auto' }}

                />
              </div>
              
              {/* Overlay with subtle re-upload prompt */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300 rounded-2xl backdrop-blur-[2px]">
                <div className="flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-xl text-white text-[13px] font-bold uppercase tracking-wider backdrop-blur-md shadow-lg">
                  <Image 
                    src="/assets/icons/add.svg"
                    alt="Upload"
                    width={16}
                    height={16}
                    className="brightness-200"
                  />
                  Change Image
                </div>
              </div>
            </div>
          ): (
            <div className="media-uploader_cta group border border-dashed border-primary-indigo/30 bg-panel-glass/40 hover:bg-primary-indigo/5 transition-all duration-300 shadow-glow-card hover:border-primary-indigo/60 h-72 rounded-2xl" onClick={() => open()}>
              <div className="media-uploader_cta-image group-hover:scale-110 transition-transform duration-300">
                <Image 
                  src="/assets/icons/add.svg"
                  alt="Add Image"
                  width={22}
                  height={22}
                  className="dark:brightness-200"
                />
              </div>
              <p className="p-16-semibold text-foreground/70 group-hover:text-primary-indigo transition-colors duration-200">
                Upload your picture here
              </p>
            </div>
          )}
        </div>
      )}
    </CldUploadWidget>
  )
}

export default MediaUploader