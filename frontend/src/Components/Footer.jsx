import React from "react";

const Footer = () => {
  return (
    <footer className="footer footer-horizontal footer-center bg-gray-600 mt-5 text-base-content rounded p-10">
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved 
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
