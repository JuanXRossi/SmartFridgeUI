import { cookies } from "next/headers";
import client from "@/api/client";
import { AuthState, AuthUser } from "@/app/types/api/auth";
import LayoutClient from "./layoutClient";

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .map(word => word[0])
    .join("");
}

//TO-DO: ver si es posible mover la lógica de conexión a archivos modulares en carpeta /api
async function getSessionUser(): Promise<AuthUser | null> {
  const token = (await cookies()).get("auth_token")?.value;
  if (!token) return null;

  try {
    const resp = await client.get<AuthUser>("/account/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return {
      userName: resp.data.userName, 
      name: resp.data.name,
      initials: getInitials(resp.data.name),
      email: resp.data.email,
      roles: resp.data.roles[0]
    } as AuthUser;
  } catch {
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
