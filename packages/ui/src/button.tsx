"use client";

import { ReactNode } from "react";
import { Spinner } from "./spinner";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  Loading : boolean
}

export const Button = ({ onClick, children,Loading }: ButtonProps) => {
  return (
    <button onClick={onClick} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
      {Loading ? <Spinner/> : children}
    </button>
  );
};
