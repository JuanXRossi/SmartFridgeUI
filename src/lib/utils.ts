import { AuthUser } from "@/app/types/api/auth";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .map(word => word[0])
    .join("");
}

export function buildAuthUser(data: AuthUser): AuthUser {
  return {
    userName: data.userName,
    name: data.name,
    initials: getInitials(data.name),
    email: data.email,
    roles: data.roles[0],
  } as AuthUser;
}
