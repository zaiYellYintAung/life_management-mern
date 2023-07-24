import type { Metadata } from "next";
import MainHeader from "@/components/MainHeader";
import Sidebar from "@/components/main/Sidebar";

export const metadata: Metadata = {
  title: "Kazeki",
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <MainHeader />
      <section className=" flex">
        <nav>
          <Sidebar />
        </nav>
        <section className="px-2 md:px-4 lg:px-8 w-full">
          <div className="h-screen md:h-[calc(100vh-48px)] bg-gray-400 container px-0 md:px-8 overflow-y-auto">
            {children}
          </div>
        </section>
      </section>
    </main>
  );
}
