import React from "react";

import Navbar from "./Navbar";
import InvoiceGenerator from "./InvoiceGenerator/InvoiceGenerator";

export default function App(): JSX.Element {
  return (
    <>
      <Navbar />
      <main className="container">
        <InvoiceGenerator />
      </main>
    </>
  );
}
