import React from "react";
import { StudentWorkspaceLayout } from "@/components/portal/StudentWorkspaceLayout";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <StudentWorkspaceLayout>{children}</StudentWorkspaceLayout>;
}
