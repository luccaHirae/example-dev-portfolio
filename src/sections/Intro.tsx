"use client";

import { useTextRevealAnimation } from "@/hooks/useTextRevealAnimation";
import { useInView } from "motion/react";
import { FC, useEffect, useRef } from "react";

const Intro: FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scope, entranceAnimation } = useTextRevealAnimation();
  const inView = useInView(scope, {
    once: true,
  });

  useEffect(() => {
    if (inView) {
      entranceAnimation();
    }
  }, [entranceAnimation, inView]);

  return (
    <section
      ref={sectionRef}
      className="section mt-12 md:mt-16 lg:mt-20"
      id="intro"
    >
      <div className="container">
        <h2 ref={scope} className="text-4xl md:text-7xl lg:w-[80%] lg:text-8xl">
          Building beautiful websites with clean code and thoughtful design to
          help your business grow and stand out online
        </h2>
      </div>
    </section>
  );
};

export default Intro;
