"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { CldImage } from "next-cloudinary";

import {
  Pagination,
  PaginationContent,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { transformationTypes } from "@/constants";
import { IImage } from "@/lib/database/models/image.model";
import { formUrlQuery } from "@/lib/utils";

import { Button } from "../ui/button";

import { Search } from "./Search";

export const Collection = ({
  hasSearch = false,
  images,
  totalPages = 1,
  page,
}: {
  images: IImage[];
  totalPages?: number;
  page: number;
  hasSearch?: boolean;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // PAGINATION HANDLER
  const onPageChange = (action: string) => {
    const pageValue = action === "next" ? Number(page) + 1 : Number(page) - 1;

    const newUrl = formUrlQuery({
      searchParams: searchParams.toString(),
      key: "page",
      value: pageValue,
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="flex flex-col gap-6 w-full select-none">
      <div className="collection-heading">
        <h2 className="h2-bold bg-gradient-to-r from-slate-950 via-slate-800 to-slate-700 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent tracking-tight">
          Recent Generations
        </h2>
        {hasSearch && <Search />}
      </div>

      {images.length > 0 ? (
        <ul className="collection-list">
          {images.map((image) => (
            <Card image={image} key={image._id} />
          ))}
        </ul>
      ) : (
        <div className="collection-empty">
          <p className="p-20-semibold text-foreground/50">No creations found</p>
        </div>
      )}

      {totalPages > 1 && (
        <Pagination className="mt-12">
          <PaginationContent className="flex w-full justify-between items-center gap-4">
            <Button
              disabled={Number(page) <= 1}
              className="button w-36 bg-panel-glass hover:bg-primary-indigo hover:text-white transition-all duration-300 font-semibold"
              onClick={() => onPageChange("prev")}
            >
              <PaginationPrevious className="hover:bg-transparent hover:text-white border-none p-0" />
            </Button>

            <p className="flex-center p-16-medium text-foreground/70 font-bold bg-panel-glass px-5 py-2 rounded-xl border border-glass shadow-glow-card">
              Page {page} of {totalPages}
            </p>

            <Button
              className="button w-36 bg-gradient-to-r from-primary-indigo to-accent-violet hover:scale-105 active:scale-95 text-white font-semibold transition-all duration-300"
              onClick={() => onPageChange("next")}
              disabled={Number(page) >= totalPages}
            >
              <PaginationNext className="hover:bg-transparent hover:text-white border-none p-0" />
            </Button>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

const Card = ({ image }: { image: IImage }) => {
  const transType = transformationTypes[image.transformationType as TransformationTypeKey];

  return (
    <li className="list-none">
      <Link href={`/transformations/${image._id}`} className="collection-card group overflow-hidden relative">
        
        {/* Frame container with smooth overflow hiding */}
        <div className="relative h-56 w-full rounded-xl overflow-hidden bg-muted border border-glass transform-gpu">
          <CldImage
            src={image.publicId}
            alt={image.title}
            width={image.width}
            height={image.height}
            {...image.config}
            loading="lazy"
            className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
          />

          {/* Floating Neon Badge for transformation type */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-lg border border-white/20 bg-black/60 backdrop-blur-md text-white shadow-lg text-[11px] font-bold tracking-wider uppercase z-10 transition-transform duration-300 group-hover:scale-105">
            <Image
              src={`/assets/icons/${transType.icon}`}
              alt={transType.title}
              width={12}
              height={12}
              className="brightness-200"
            />
            {transType.title}
          </div>
        </div>

        {/* Text bottom details */}
        <div className="flex items-center justify-between px-1 py-0.5">
          <div className="flex flex-col gap-0.5">
            <p className="p-20-semibold line-clamp-1 text-foreground/90 font-bold group-hover:text-primary-indigo transition-colors duration-200">
              {image.title}
            </p>
            <p className="text-[12px] font-semibold text-muted-foreground tracking-wide capitalize">
              {image.aspectRatio || "Original Aspect"}
            </p>
          </div>
          
          <div className="size-9 rounded-lg border border-glass bg-panel-glass/80 flex items-center justify-center shadow-glow-card transition-all duration-300 group-hover:border-primary-indigo/30 group-hover:bg-primary-indigo/10 group-hover:text-primary-indigo">
            <Image
              src={`/assets/icons/${transType.icon}`}
              alt="action"
              width={16}
              height={16}
              className="dark:brightness-200 transition-all opacity-80 group-hover:opacity-100 group-hover:scale-110"
            />
          </div>
        </div>
      </Link>
    </li>
  );
};