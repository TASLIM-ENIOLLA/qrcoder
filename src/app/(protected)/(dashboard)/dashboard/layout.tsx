import { Sidebar } from "@/components/shadcn/ui/sidebar";
import { SidebarProvider } from "@/components/shadcn/ui/sidebar";

export default function Layout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar
        side="left"
        variant="floating"
        className="[&>div[data-slot='sidebar-inner']]:shadow-none"
        cssVars={{
          "--sidebar-width": "var(--container-sm)"
        } as React.CSSProperties}
      />
      {children}
    </SidebarProvider>
  );
}