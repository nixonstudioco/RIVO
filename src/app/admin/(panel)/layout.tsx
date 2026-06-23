import AdminSidebar from "@/components/admin/AdminSidebar";

export const dynamic = "force-dynamic";

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="lg:flex">
      <AdminSidebar />
      <div className="flex-1 lg:h-screen lg:overflow-y-auto">{children}</div>
    </div>
  );
}
