import { auth } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";

import { Collection } from "@/components/shared/Collection";
import Header from "@/components/shared/Header";
import { getUserImages } from "@/lib/actions/image.actions";
import { getUserById } from "@/lib/actions/user.actions";

const Profile = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const user = await getUserById(userId);
  const images = await getUserImages({ page, userId: user._id });

  return (
    <>
      <Header 
        title="Creator Profile" 
        subtitle="Manage your visual assets, credit wallet, and check your creation achievements!"
      />

      <section className="profile select-none">
        {/* Wallet Balance Card */}
        <div className="profile-balance bg-gradient-to-br from-primary-indigo/5 to-accent-violet/5 hover:from-primary-indigo/10 hover:to-accent-violet/10 border border-primary-indigo/20">
          <p className="p-10-medium text-primary-indigo font-bold">CREDITS WALLET</p>
          <div className="mt-4 flex items-center gap-4">
            <div className="size-14 rounded-2xl bg-primary-indigo/10 dark:bg-primary-indigo/20 flex items-center justify-center text-primary-indigo shadow-md">
              <Image
                src="/assets/icons/coins.svg"
                alt="coins"
                width={30}
                height={30}
                className="size-8"
              />
            </div>
            <div className="flex flex-col">
              <h2 className="text-[34px] font-extrabold tracking-tight text-foreground leading-[100%]">
                {user.creditBalance}
              </h2>
              <span className="text-[12px] font-bold text-muted-foreground tracking-wide mt-1">Available Credits</span>
            </div>
          </div>
        </div>

        {/* Stats manipulation Card */}
        <div className="profile-image-manipulation bg-gradient-to-br from-accent-cyan/5 to-primary-indigo/5 hover:from-accent-cyan/10 hover:to-primary-indigo/10 border border-accent-cyan/20">
          <p className="p-10-medium text-accent-cyan font-bold">IMAGE CREATIONS</p>
          <div className="mt-4 flex items-center gap-4">
            <div className="size-14 rounded-2xl bg-accent-cyan/10 dark:bg-accent-cyan/20 flex items-center justify-center text-accent-cyan shadow-md">
              <Image
                src="/assets/icons/photo.svg"
                alt="coins"
                width={30}
                height={30}
                className="size-8 dark:brightness-200"
              />
            </div>
            <div className="flex flex-col">
              <h2 className="text-[34px] font-extrabold tracking-tight text-foreground leading-[100%]">
                {images?.data.length || 0}
              </h2>
              <span className="text-[12px] font-bold text-muted-foreground tracking-wide mt-1">Transformations Done</span>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Creations Collection */}
      <section className="mt-12 md:mt-16">
        <Collection
          images={images?.data}
          totalPages={images?.totalPages}
          page={page}
        />
      </section>
    </>
  );
};

export default Profile;