"use client"

import { dataUrl, debounce, download, getImageSize } from '@/lib/utils'
import { CldImage, getCldImageUrl } from 'next-cloudinary'
import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import React from 'react'
import { Loader2, Download } from 'lucide-react'

const TransformedImage = ({ image, type, title, transformationConfig, isTransforming, setIsTransforming, hasDownload = false }: TransformedImageProps) => {
  const downloadHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    download(getCldImageUrl({
      width: image?.width,
      height: image?.height,
      src: image?.publicId,
      ...transformationConfig
    }), title)
  }

  return (
    <div className="flex flex-col gap-4 select-none">
      <div className="flex-between">
        <h3 className="h3-bold text-foreground/80 font-bold tracking-tight">
          AI Transformed
        </h3>

        {hasDownload && (
          <button 
            className="download-btn group" 
            onClick={downloadHandler}
            aria-label="Download Image"
          >
            <Download className="size-4 text-foreground/70 group-hover:text-primary-indigo group-hover:scale-110 transition-all duration-200" />
            <span className="font-semibold tracking-wide">Download</span>
          </button>
        )}
      </div>

      {image?.publicId && transformationConfig ? (
        <div className="relative rounded-2xl border border-glass bg-panel-glass shadow-glow-card overflow-hidden">
         <div className="overflow-hidden max-h-[280px] flex items-center justify-center rounded-2xl bg-black/5">
            <CldImage 
              width={getImageSize(type, image, "width")}
              height={getImageSize(type, image, "height")}
              src={image?.publicId}
              alt={image.title}
              sizes={"(max-width: 767px) 100vw, 50vw"}
              placeholder={dataUrl as PlaceholderValue}
              className="w-full h-full object-contain rounded-2xl"
              style={{ maxHeight: '280px', width: '100%', height: 'auto' }}
              onLoad={() => {
                setIsTransforming && setIsTransforming(false);
              }}
              onError={() => {
                debounce(() => {
                  setIsTransforming && setIsTransforming(false);
                }, 8000)()
              }}
              {...transformationConfig}
            />
          </div>

          {isTransforming && (
            <div className="transforming-loader backdrop-blur-md bg-background/85 border border-glass rounded-2xl">
              <Loader2 className="size-10 animate-spin text-primary-indigo shadow-glow-indigo" />
              <p className="p-16-semibold bg-gradient-to-r from-primary-indigo to-accent-violet bg-clip-text text-transparent tracking-wide font-bold animate-pulse">
                Applying magic transformation...
              </p>
            </div>
          )}
        </div>
      ): (
        <div className="transformed-placeholder border border-dashed border-primary-indigo/25 bg-panel-glass/40 shadow-glow-card h-72 rounded-2xl flex flex-col justify-center items-center gap-3">
          <div className="size-12 rounded-xl bg-primary-indigo/5 border border-primary-indigo/10 flex items-center justify-center text-primary-indigo/60">
            <Image 
              src={`/assets/icons/stars.svg`}
              alt="magic"
              width={22}
              height={22}
              className="opacity-40"
            />
          </div>
          <span className="p-16-semibold text-foreground/50 tracking-wide font-medium">
            AI transformation preview will appear here
          </span>
        </div>
      )}
    </div>
  )
}

export default TransformedImage