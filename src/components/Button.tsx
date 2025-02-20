import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary" | "text";
  iconAfter?: React.ReactNode;
}

export const Button = ({
  className,
  children,
  variant,
  iconAfter,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={twMerge(
        "h-11 px-6 rounded-xl border border-red-orange-500 uppercase inline-flex items-center gap-2 transition duration-500 relative group/button",
        variant === "primary" && "bg-red-orange-500 text-white",
        variant === "secondary" && "hover:bg-red-orange-500 hover:text-white",
        variant === "text" &&
          "h-auto px-0 border-transparent after:transition-all after:duration-500 after:content-[''] after:h-px after:w-0 after:absolute after:top-full after:bg-red-orange-500 hover:after:w-full",
        className
      )}
      {...rest}
    >
      <span>{children}</span>
      {iconAfter && <span>{iconAfter}</span>}
    </button>
  );
};
