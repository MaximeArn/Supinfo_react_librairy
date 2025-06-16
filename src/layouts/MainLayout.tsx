import { Outlet } from "react-router";
import Header from "@/layouts/components/Header";
import MobileDockNav from "@/layouts/components/MobileDockNav";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col pb-16">
      <Header />

      <main className="flex-1 px-4 py-6">
        <Outlet />
      </main>

      <MobileDockNav />
    </div>
  );
}
