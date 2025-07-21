import {
  MainBanner,
  MainFooter,
  MainGrid,
  MainHeader,
} from "@/components/main";
import Navbar from "@/components/Navbar/Navbar";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* <MainBanner /> */}
      <div className="h-16 bg-black"></div>
      <Navbar currentSection="blog"/>
      <MainGrid>

            {children}

      </MainGrid>
      <MainFooter />
    </>
  );
}
