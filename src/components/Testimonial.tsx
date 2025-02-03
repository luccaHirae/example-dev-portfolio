import Image from "next/image";
import { HTMLAttributes } from "react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { twMerge } from "tailwind-merge";

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
  return (
    <div
      className={twMerge(
        "grid md:grid-cols-5 md:gap-8 lg:gap-16 md:items-center",
        className
      )}
      {...rest}
    >
      <div className="aspect-square md:aspect-[9/16] md:col-span-2">
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
        <div className="text-3xl md:text-5xl lg:text-6xl mt-8 md:mt-0">
          <span>&ldquo;</span>
          <span>{quote}</span>
          <span>&rdquo;</span>
        </div>

        <cite className="mt-4 md:mt-8 not-italic block md:text-lg lg:text-xl">
          {name}, {role} at {company}
        </cite>
      </blockquote>
    </div>
  );
};
