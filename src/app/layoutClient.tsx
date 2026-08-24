"use client"

import { Provider as VisualNotificationsProvider } from "@/app/context/VisualNotificationsContext";
import GlobalToast from "./GlobalToastComponent";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <VisualNotificationsProvider>
      {children}
      <GlobalToast />
    </VisualNotificationsProvider>
  );
}
