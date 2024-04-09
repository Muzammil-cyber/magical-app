import React from "react";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="max-w-screen max-h-screen flex flex-col">
      <header className="navbar bg-base-100  justify-center border-b-2">
        <Link
          to={"/"}
          className="text-xl hover:cursor-pointer font-bold uppercase"
        >
          Magical
        </Link>
      </header>
      <div className="flex-grow overflow-y-scroll p-4">{children}</div>
      <footer className="footer footer-center p-4 bg-base-300 text-base-content">
        <aside>
          <p>Copyright © 2024 - All right reserved by ACME Industries Ltd</p>
        </aside>
      </footer>
    </div>
  );
};

export default Layout;
