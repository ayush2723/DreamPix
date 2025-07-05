import { Collection } from "@/components/shared/Collection"
import { navLinks } from "@/constants"
import { getAllImages } from "@/lib/actions/image.actions"
import Image from "next/image"
import Link from "next/link"

const Home = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const searchQuery = (searchParams?.query as string) || '';

  const images = await getAllImages({ page, searchQuery})

  return (
    <>
      { <section className="home">
  <h1 className="text-[70px] sm:text-[120px] lg:text-[160px] font-black text-center tracking-tight z-10 leading-none bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
  Dream<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-400">Pix</span>
</h1>
  <p className="text-white/50 text-center text-[15px] font-medium z-10">
    AI-powered image transformation
  </p>
</section>/* <section className="home">
        <h1 className="home-heading">
          Bring Your Vision to Life with DreamPix.
        </h1>
        {/* <ul className="flex-center w-full gap-8 md:gap-12 lg:gap-20">
          {navLinks.slice(1, 6).map((link) => (
            <Link
              key={link.route}
              href={link.route}
              className="home-action-btn flex-center flex-col gap-2.5"
            >
              <li className="home-action-icon">
                <Image src={link.icon} alt="image" width={24} height={24} className="brightness-200 contrast-125" />
              </li>
              <p className="p-14-medium text-center text-white/95 font-semibold">{link.label}</p>
            </Link>
          ))}
        </ul> */
      }

      <section className="sm:mt-12">
        <Collection 
          hasSearch={true}
          images={images?.data}
          totalPages={images?.totalPage}
          page={page}
        />
      </section>
    </>
  )
}

export default Home