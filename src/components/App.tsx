import React from "react";

import Navbar from "./Navbar";
import Input from "./Input";
import Button from "./Button";

export default function App(): JSX.Element {
  const [invoiceName, setInvoiceName] = React.useState("");
  const [invoiceDate, setInvoiceDate] = React.useState("");
  const [customerFirstName, setCustomerFirstName] = React.useState("");
  const [customerLastName, setCustomerLastName] = React.useState("");
  const [customerPhone, setCustomerPhone] = React.useState("");
  const [customerEmail, setCustomerEmail] = React.useState("");

  // function convertDigitIn(str) {
  //   return str.split("/").reverse().join("/");
  // }

  return (
    <>
      <Navbar></Navbar>
      <main className="container">
        <div
          className="content"
          style={{ background: "white", marginTop: "100px" }}
        >
          <Input
            placeholder="Type invoice name"
            name="invoice-name"
            id="invoice-name"
            value={invoiceName}
            setState={setInvoiceName}
            underlineColor="blue"
            size="lg"
          />
          <br></br>
          <br></br>
          <Input
            placeholder="Select invoice date"
            name="invoice-date"
            id="invoice-date"
            value={invoiceDate}
            setState={setInvoiceDate}
            underlineColor="blue"
            size="lg"
            type="text"
            onFocus={(e: any) => {
              e.target.type = "date";
            }}
            onBlur={(e: any) => {
              e.target.type = "text";
            }}
          />
          <br></br>
          <br></br>
          <Input
            placeholder="Type customer first name"
            name="customer-first-name"
            id="customer-first-name"
            value={customerFirstName}
            setState={setCustomerFirstName}
            underlineColor="blue"
            size="lg"
          />
          <br></br>
          <br></br>
          <Input
            placeholder="Type customer last name"
            name="customer-last-name"
            id="customer-last-name"
            value={customerLastName}
            setState={setCustomerLastName}
            underlineColor="blue"
            size="lg"
          />
          <br></br>
          <br></br>
          <Input
            placeholder="Type customer phone"
            name="customer-phone"
            id="customer-phone"
            value={customerPhone}
            setState={setCustomerPhone}
            underlineColor="blue"
            size="lg"
          />
          <br></br>
          <br></br>
          <Input
            placeholder="Type customer email"
            name="customer-email"
            id="customer-email"
            value={customerEmail}
            setState={setCustomerEmail}
            underlineColor="blue"
            size="lg"
          />
          <Button
            text="Reset"
            type="reset"
            color="red"
            hasFixedWidth={true}
            onClick={() => {}}
            isDisabled={false}
          ></Button>
        </div>
      </main>
    </>
  );
}
