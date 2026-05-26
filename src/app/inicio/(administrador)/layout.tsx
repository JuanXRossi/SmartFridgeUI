/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";
import client from "@/api/client";
import { AuthState, AuthUser, UserResponse } from "@/app/types/api/auth";
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

//TO-DO: ver si es posible mover la lógica de conexión a archivos modulares en carpeta /api
async function getSessionUser(): Promise<AuthUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  if (!token) return null;

  try {
    const resp = await client.get<AuthUser>("/account/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return buildAuthUser(resp.data);
  } catch (err: any) {
    if (err.response?.status !== 401) return null;

    const refreshToken = cookieStore.get("refresh_token")?.value;
    if (!refreshToken) return null;

    try {
      const refreshResp = await client.post<UserResponse>("/account/refresh", {
        refreshToken,
      });

      const { token: refreshedToken } = refreshResp.data;

      const resp = await client.get<AuthUser>("/account/me", {
        headers: { Authorization: `Bearer ${refreshedToken}` },
      });

      return buildAuthUser(resp.data);
    } catch {
      return null;
    }
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
