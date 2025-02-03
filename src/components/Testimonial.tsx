"use client";

import Image from "next/image";
import { HTMLAttributes, useEffect } from "react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { twMerge } from "tailwind-merge";
import { usePresence, motion } from "motion/react";
import { useTextRevealAnimation } from "@/hooks/useTextRevealAnimation";

export interface TestimonialProps extends HTMLAttributes<HTMLDivElement> {
  quote: string;
  name: string;
  role: string;
  company: string;
  imagePositionY: number;
  image: string | StaticImport;
}

export const Testimonial = ({
  company,
  name,
  quote,
  role,
  imagePositionY,
  image,
  className,
  ...rest
}: TestimonialProps) => {
  const {
    scope: quoteScope,
    entranceAnimation: quoteEntranceAnimation,
    exitAnimation: quoteExitAnimation,
  } = useTextRevealAnimation();
  const {
    scope: citeScope,
    entranceAnimation: citeEntranceAnimation,
    exitAnimation: citeExitAnimation,
  } = useTextRevealAnimation();
  const [isPresent, safeToRemove] = usePresence();

  useEffect(() => {
    if (isPresent) {
      quoteEntranceAnimation().then(citeEntranceAnimation);
    } else {
      Promise.all([quoteExitAnimation(), citeExitAnimation()]).then(
        safeToRemove
      );
    }
  }, [
    isPresent,
    quoteEntranceAnimation,
    citeEntranceAnimation,
    quoteExitAnimation,
    citeExitAnimation,
    safeToRemove,
  ]);

  return (
    <div
      className={twMerge(
        "grid md:grid-cols-5 md:gap-8 lg:gap-16 md:items-center",
        className
      )}
      {...rest}
    >
      <div className="aspect-square md:aspect-[9/16] md:col-span-2 relative">
        <motion.div
          className="absolute h-full bg-stone-900"
          initial={{
            width: "100%",
          }}
          animate={{
            width: 0,
          }}
          exit={{
            width: "100%",
          }}
          transition={{
            duration: 0.5,
          }}
        ></motion.div>
        <Image
          src={image}
          alt={name}
          className="size-full object-cover"
          style={{
            objectPosition: `50% ${imagePositionY * 100}%`,
          }}
        />
      </div>

      <blockquote className="md:col-span-3">
        <div
          ref={quoteScope}
          className="text-3xl md:text-5xl lg:text-6xl mt-8 md:mt-0"
        >
          <span>&ldquo;</span>
          {quote}
          <span>&rdquo;</span>
        </div>

        <cite
          ref={citeScope}
          className="mt-4 md:mt-8 not-italic block md:text-lg lg:text-xl"
        >
          {name}, {role} at {company}
        </cite>
      </blockquote>
    </div>
  );
};
