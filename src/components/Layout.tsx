import Head from "next/head";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
  withSidebar?: boolean;
  title?: string;
}

export default function Layout({
  children,
  withSidebar = false,
  title,
}: LayoutProps) {
  const pageTitle = title
    ? `${title} - Galsenify`
    : "Galsenify - Documentation";

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content="A comprehensive library for Senegalese data, it offers a lot of information about country of Teranga."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen flex flex-col bg-white text-gray-900">
        <Navbar />

        {withSidebar ? (
          <div className="flex-1 max-w-7xl mx-auto w-full px-4 flex gap-8 pt-6">
            <Sidebar />
            <main className="flex-1 min-w-0 pb-16">{children}</main>
          </div>
        ) : (
          <main className="flex-1">{children}</main>
        )}

        <Footer />
      </div>
    </>
  );
}
