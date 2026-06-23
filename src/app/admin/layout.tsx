import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin · RIVO",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-ink text-bone">{children}</div>;
}
