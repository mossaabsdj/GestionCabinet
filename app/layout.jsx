import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/app/component/sidebar/page";
import "@/app/globals.css";

export const metadata = {
  title: "DR.Amel",
  description: "make world better",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen pl-8 bg-gradient-to-br from-purple-50 via-white to-purple-100">
        <div
          className="absolute inset-20 bg-no-repeat bg-cover bg-center opacity-15 pointer-events-none "
          style={{
            backgroundImage: "url('/background.png')",
          }}
        ></div>

        <SidebarProvider defaultOpen={false}>
          {/* القائمة الجانبية */}
          <AppSidebar />

          {/* زر التبديل */}
          <div className="absolute top-4 left-4 z-50 fixed">
            <SidebarTrigger className="p-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400">
              <span className="font-bold text-xl">☰</span>
            </SidebarTrigger>
          </div>

          {/* المحتوى الأساسي */}
          <main className="flex-1 p-4">{children}</main>
        </SidebarProvider>
      </body>
    </html>
  );
}
