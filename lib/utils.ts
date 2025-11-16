import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { customAlphabet } from "nanoid";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getShorten(): string {
    const shorten = customAlphabet("6789BCDFGHJKLMNPQRTWbcdfghjkmnpqrtwz", 10);
    return shorten();
}
