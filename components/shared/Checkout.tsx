"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";

import { useToast } from "@/components/ui/use-toast";
import { checkoutCredits } from "@/lib/actions/transaction.action";

import { Button } from "../ui/button";

const Checkout = ({
  plan,
  amount,
  credits,
  buyerId,
}: {
  plan: string;
  amount: number;
  credits: number;
  buyerId: string;
}) => {
  const { toast } = useToast();

  useEffect(() => {
    loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }, []);

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      toast({
        title: "Order placed successfully!",
        description: "Your credits have been added to your profile",
        duration: 5000,
        className: "success-toast",
      });
    }

    if (query.get("canceled")) {
      toast({
        title: "Order canceled!",
        description: "Shop around and checkout when you are ready",
        duration: 5000,
        className: "error-toast",
      });
    }
  }, [toast]); 

  const onCheckout = async () => {
    const transaction = {
      plan,
      amount,
      credits,
      buyerId,
    };

  await checkoutCredits(transaction);
  };

  return (
    <form action={onCheckout} method="POST" className="w-full mt-2 select-none">
      <section className="w-full">
        <Button
          type="submit"
          role="link"
          className="w-full rounded-xl bg-gradient-to-r from-primary-indigo to-accent-violet hover:scale-[1.02] active:scale-[0.98] transition-all text-white font-bold h-12 shadow-glow-indigo hover:shadow-glow-indigo/50 flex-center"
        >
          Buy Credit Package
        </Button>
      </section>
    </form>
  );
};

export default Checkout;