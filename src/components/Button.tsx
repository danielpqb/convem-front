"use client";

import React from "react";

export default function Button({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <div
      className="cursor-pointer bg-zinc-100 text-zinc-900 font-semibold p-2 rounded-md hover:bg-opacity-70 active:scale-90 ring-4 ring-zinc-500"
      onClick={onClick}
    >
      {children}
    </div>
  );
}
