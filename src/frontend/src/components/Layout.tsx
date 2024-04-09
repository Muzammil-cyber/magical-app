import React from "react";

import Navbar from "./Layout/Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="max-w-screen max-h-screen h-screen w-screen flex flex-col">
      <Navbar />
      <div className="flex-grow overflow-y-auto p-4 bg-[url('bg.png')]">
        {children}
      </div>
      <footer className="footer footer-center p-4 bg-base-300 text-base-content">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by
            Muzamil-cyber
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Layout;
