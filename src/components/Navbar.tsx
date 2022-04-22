import React from "react";
import Logo from "./Logo";

export default function Navbar(): JSX.Element {
  return (
    <nav className="container navbar">
      <div className="content navbar">
        <a className="navbar__logo" href="https://ajbuildingdesign.co.uk/">
          <Logo />
        </a>
        <a href="/">INVOICE GENERATOR</a>
      </div>
    </nav>
  );
}
