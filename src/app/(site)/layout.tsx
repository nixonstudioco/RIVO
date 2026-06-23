import SmoothScroll from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/layout/CustomCursor";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";
import { getSettings } from "@/lib/store";

// Reflectă imediat modificările din /admin (setări, contact etc.).
export const dynamic = "force-dynamic";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();

  return (
    <div className="grain">
      <SmoothScroll>
        <CustomCursor />
        <Navbar settings={settings} />
        <PageTransition>
          <main id="main">{children}</main>
        </PageTransition>
        <Footer settings={settings} />
      </SmoothScroll>
    </div>
  );
}
