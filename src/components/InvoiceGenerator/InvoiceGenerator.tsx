import React from "react";

import useWindowWidth from "../../hooks/useWindowWidth";

import Input from "../Input";
import Button from "../Button";
import InvoiceItem from "./InvoiceItem";

export default function InvoiceGenerator(): JSX.Element {
  const { width } = useWindowWidth();
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
    <section className="content invoice-generator">
      <form className="invoice-generator__content">
        <div className="invoice-generator__invoice">
          <Input
            placeholder="Type invoice name"
            name="invoice-name"
            id="invoice-name"
            value={invoiceName}
            setState={setInvoiceName}
            underlineColor="blue"
            size="lg"
            additionalClasses={`${width >= 768 && "mr-14"} input--invoice-data`}
          />
          <Input
            placeholder="Select invoice date"
            name="invoice-date"
            id="invoice-date"
            additionalClasses={"input--invoice-data"}
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
        </div>
        <div className="invoice-generator__customer">
          <Input
            placeholder="Type customer first name"
            name="customer-first-name"
            id="customer-first-name"
            value={customerFirstName}
            setState={setCustomerFirstName}
            underlineColor="blue"
            size="lg"
            additionalClasses={`${width >= 768 && "mr-15"} input--invoice-data`}
          />
          <Input
            placeholder="Type customer last name"
            name="customer-last-name"
            id="customer-last-name"
            value={customerLastName}
            setState={setCustomerLastName}
            underlineColor="blue"
            size="lg"
            additionalClasses={`${width >= 768 && "mr-14"} input--invoice-data`}
          />
          <Input
            placeholder="Type customer phone"
            name="customer-phone"
            id="customer-phone"
            value={customerPhone}
            setState={setCustomerPhone}
            underlineColor="blue"
            size="lg"
            additionalClasses={`${width >= 768 && "mr-15"} input--invoice-data`}
          />
          <Input
            placeholder="Type customer email"
            name="customer-email"
            id="customer-email"
            value={customerEmail}
            setState={setCustomerEmail}
            underlineColor="blue"
            size="lg"
            additionalClasses={"input--invoice-data"}
          />
        </div>
        <InvoiceItem />
        <div className="invoice-generator__new-item"></div>
        <div className="invoice-generator__summary summary">
          <div className="summary__item">
            <span className="summary__name">SUBTOTAL:</span>
            <span className="summary__value">£ 12030,00</span>
          </div>
          <div className="summary__item">
            <span className="summary__name">VAT:</span>
            <span className="summary__value">£ 2406,00</span>
          </div>
          <div className="summary__item">
            <span className="summary__name">TOTAL:</span>
            <span className="summary__value">£ 14436,00</span>
          </div>
          <div className="invoice-generator__buttons">
            <Button
              text="Reset"
              type="reset"
              color="red"
              additionalClasses="mr-2 flex-2"
              onClick={() => {}}
              isDisabled={false}
            ></Button>
            <Button
              text="Generate invoice"
              type="submit"
              color="blue"
              additionalClasses="flex-4"
              onClick={() => {}}
              isDisabled={false}
            ></Button>
          </div>
        </div>
      </form>
    </section>
  );
}
