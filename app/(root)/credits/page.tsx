import { SignedIn, auth } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";

import Header from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import { plans } from "@/constants";
import { getUserById } from "@/lib/actions/user.actions";
import Checkout from "@/components/shared/Checkout";

const Credits = async () => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const user = await getUserById(userId);

  return (
    <>
      <Header
        title="Buy Credits"
        subtitle="Fuel your creative flow with dynamic credit packages tailored to your projects!"
      />

      <section className="mt-10 select-none">
        <ul className="credits-list">
          {plans.map((plan) => {
            const isPro = plan.name === "Pro Package";
            return (
              <li 
                key={plan.name} 
                className={`credits-item relative group ${
                  isPro 
                    ? "pro-glowing-card" 
                    : "border-glass"
                }`}
              >
                {/* Popular Badge for Pro plan */}
                {isPro && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-primary-indigo to-accent-violet px-3 py-1 rounded-full text-white text-[10px] font-extrabold uppercase tracking-widest shadow-md">
                    Popular Choice
                  </div>
                )}

                <div className="flex-center flex-col gap-3">
                  <div className="size-16 rounded-2xl bg-primary-indigo/5 dark:bg-primary-indigo/10 flex items-center justify-center text-primary-indigo shadow-inner border border-primary-indigo/10 transition-transform duration-300 group-hover:scale-105">
                    <Image src="/assets/icons/coins.svg" alt="coins" width={32} height={32} />
                  </div>
                  <p className="p-20-semibold mt-3 bg-gradient-to-r from-primary-indigo via-accent-violet to-primary-indigo bg-clip-text text-transparent font-bold">
                    {plan.name}
                  </p>
                  
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-[44px] font-extrabold tracking-tight text-foreground leading-[100%]">${plan.price}</span>
                    <span className="p-16-regular font-bold text-foreground/50">/ one-time</span>
                  </div>

                  <p className="p-16-semibold bg-panel-glass/80 px-4 py-1.5 rounded-lg border border-glass shadow-glow-card text-foreground font-bold tracking-wide mt-2">
                    {plan.credits} Total Credits
                  </p>
                </div>

                {/* Inclusions checklist container */}
                <ul className="flex flex-col gap-4 py-8 border-t border-glass mt-6 mb-4 w-full">
                  {plan.inclusions.map((inclusion) => (
                    <li
                      key={plan.name + inclusion.label}
                      className="flex items-center gap-4.5 px-2"
                    >
                      <Image
                        src={`/assets/icons/${
                          inclusion.isIncluded ? "check.svg" : "cross.svg"
                        }`}
                        alt="indicator"
                        width={18}
                        height={18}
                        className={`transition-all duration-300 ${
                          inclusion.isIncluded 
                            ? "dark:brightness-125 saturate-150 contrast-125" 
                            : "opacity-40"
                        }`}
                      />
                      <p className={`p-16-medium transition-all ${
                        inclusion.isIncluded 
                          ? "text-foreground/80 font-medium" 
                          : "text-muted-foreground/50 line-through font-normal"
                      }`}>
                        {inclusion.label}
                      </p>
                    </li>
                  ))}
                </ul>

                {plan.name === "Free" ? (
                  <Button variant="outline" className="credits-btn rounded-xl h-12 flex-center font-bold">
                    Free Consumable
                  </Button>
                ) : (
                  <SignedIn>
                    <Checkout
                      plan={plan.name}
                      amount={plan.price}
                      credits={plan.credits}
                      buyerId={user._id}
                    />
                  </SignedIn>
                )}
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
};

export default Credits;