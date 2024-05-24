import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import DashboardNavigation from "./dashboard-navigation";
import { CustomFilters } from "./filters/custom-filters";
import HeaderLogo from "./header-logo";
import WelcomeMessage from "./welcome-message";

const DashboardHeader = () => {
  return (
    <header className="bg-gradient-to-b from-primary to-primary/70 px-4 py-8 lg:px-14 pb-36">
      <div className="max-w-screen-2xl mx-auto">
        <div className="w-full flex items-center justify-between mb-14">
          <div className="flex items-center lg:gap-x-16">
            <HeaderLogo />
            <DashboardNavigation />
          </div>
          <ClerkLoaded>
            <UserButton afterSignOutUrl="/" />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="size-8 animate-spin text-gray-400" />
          </ClerkLoading>
        </div>
        <WelcomeMessage />
        <CustomFilters />
      </div>
    </header>
  );
};

export default DashboardHeader;
