import { type ReactNode } from "react";
import Footer from "./Components/PageFooter";

interface PageLayoutProps {
  children: ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="flex-1 flex flex-col">
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-6 space-y-6">
        {children}
      </main>
      <Footer />
    </div>
  );
}
