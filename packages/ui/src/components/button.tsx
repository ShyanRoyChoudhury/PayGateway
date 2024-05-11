"use client";

import { cn } from "../cn";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        `text-white bg-gray-800  focus:outline-none focus:ring-4 bg-[#635BFF] font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2`,
        className,
      )}
    >
      {children}
    </button>
  );
};
