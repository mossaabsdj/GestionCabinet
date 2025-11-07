import "@/app/globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import SidebarPage from "@/app/component/NewSideBar/page";
import ExitButton from "@/app/component/exitbutton/page"; // 👈 add this import

export const dynamic = "force-dynamic";

export const metadata = {
  title: "DR. Amel",
  description: "make world better",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
        <SidebarProvider>
          <div className="flex w-full h-screen overflow-hidden relative">
            {/* Left Sidebar */}
            <SidebarPage />

            {/* Main content */}
            <main className="flex-1 p-0 overflow-auto">{children}</main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
