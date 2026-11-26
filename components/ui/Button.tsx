"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: boolean;
  onClick?: () => void;
  href?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  isLoading?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  icon = false,
  onClick,
  href,
  className = "",
  type = "button",
  disabled = false,
  isLoading = false,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-normal rounded-[10px] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles = {
    primary: "bg-ink text-white hover:bg-ink-hover",
    secondary: "bg-white text-ink ring-1 ring-inset ring-line hover:ring-line-strong",
    ghost: "text-ink hover:bg-ink/[0.05]",
  };

  const sizeStyles = {
    sm: "px-3.5 h-9 text-[14px]",
    md: "px-5 h-11 text-[15px]",
    lg: "px-6 h-13 text-[15px]",
  };

  const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  const content = (
    <>
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {children}
          {icon && (
            <ArrowRight
              className="w-4 h-4"
              style={{ width: "1rem", height: "1rem" }}
            />
          )}
        </>
      )}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileTap={!disabled ? { scale: 0.98 } : {}}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={classes}
      whileTap={!(disabled || isLoading) ? { scale: 0.98 } : {}}
    >
      {content}
    </motion.button>
  );
}
