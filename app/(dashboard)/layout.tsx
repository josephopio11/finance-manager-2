import DashboardHeader from "@/components/shared/dashboard/header";
import React from "react";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <>
      <DashboardHeader />
      <main className="px-3 lg:px-14">
        <>{children}</>
      </main>
      {/* <DashboardFooter /> */}
    </>
  );
};

export default DashboardLayout;
