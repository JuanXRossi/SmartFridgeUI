import { AuthState, AuthUser } from "@/app/types/api/auth";
import { getInternalApiUrl } from "@/api/internalClient";
import LayoutClient from "./layoutClient";

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .map(word => word[0])
    .join("");
}

function buildAuthUser(data: AuthUser): AuthUser {
  return {
    userName: data.userName,
    name: data.name,
    initials: getInitials(data.name),
    email: data.email,
    roles: data.roles[0],
  } as AuthUser;
}

async function getSessionUser(): Promise<AuthUser | null> {
  try {
    console.log("[getSessionUser] Fetching session user from /api/account/me");

    const resp = await fetch(getInternalApiUrl("/api/account/me"), {
      credentials: "include",
      cache: "no-store",
    });

    if (!resp.ok) {
      if (resp.status === 401) {
        console.log("[getSessionUser] Received 401 - session expired or invalid");
      } else {
        console.error("[getSessionUser] HTTP error:", { status: resp.status, statusText: resp.statusText });
      }
      return null;
    }

    const json = await resp.json();
    const user = buildAuthUser(json.data);

    console.log("[getSessionUser] Successfully retrieved user:", { userName: user.userName, name: user.name });
    return user;
  } catch (err: any) {
    console.error("[getSessionUser] Unexpected error:", { message: err?.message, stack: err?.stack });
    return null;
  }
}

export default async function HomeLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser();
  const initialState: AuthState = { session: !!user, user };

  return (
    <LayoutClient initialState={initialState}>
      {children}
    </LayoutClient>
  );
}
