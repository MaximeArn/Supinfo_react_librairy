import { Outlet } from "react-router";
import AppBar from "@/layouts/AppLayout/Components/AppBar";
import PageLayout from "../PageLayout/PageLayout";
import MobileDockNav from "@/layouts/AppLayout/Components/MobileDockNav";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0">
      <AppBar />

      <PageLayout>
        <Outlet />
      </PageLayout>

      <MobileDockNav />
    </div>
  );
}
