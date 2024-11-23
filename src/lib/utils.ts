import { clsx, type ClassValue } from "clsx";
import { withFluid } from "@fluid-tailwind/tailwind-merge";
import { extendTailwindMerge } from "tailwind-merge";

export const mytwMerge = extendTailwindMerge(withFluid);

export function cn(...inputs: ClassValue[]) {
  return mytwMerge(clsx(inputs));
}

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}
