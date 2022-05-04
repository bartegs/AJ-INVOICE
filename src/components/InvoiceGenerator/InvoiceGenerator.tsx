import React from "react";

import useWindowWidth from "../../hooks/useWindowWidth";

import Input from "../Input";
import Button from "../Button";
import Icon from "../Icon";

import InvoiceItems from "./InvoiceItems";

import { InvoiceItemInterface } from "./InvoiceItemInterface";

export default function InvoiceGenerator(): JSX.Element {
  const { width } = useWindowWidth();

  const [invoiceName, setInvoiceName] = React.useState("");
  const [invoiceDate, setInvoiceDate] = React.useState("");
  const [customerFirstName, setCustomerFirstName] = React.useState("");
  const [customerLastName, setCustomerLastName] = React.useState("");
  const [customerPhone, setCustomerPhone] = React.useState("");
  const [customerEmail, setCustomerEmail] = React.useState("");

  const [invoiceItemsList, setInvoiceItemsList] = React.useState<
    InvoiceItemInterface[]
  >([
    {
      description: "",
      unit: "item",
      quantity: 1,
      rate: "",
      isConfirmed: false,
      confirmedRate: 0,
      confirmedQuantity: 1,
    },
  ]);

  const [sum, setSum] = React.useState(0);

  const onNewBtnClick = () => {
    if (
      parseFloat(invoiceItemsList[invoiceItemsList.length - 1].rate) > 0 &&
      invoiceItemsList[invoiceItemsList.length - 1].isConfirmed === true
    ) {
      setInvoiceItemsList([
        ...invoiceItemsList,
        {
          description: "",
          unit: "item",
          quantity: 1,
          rate: "",
          isConfirmed: false,
          confirmedRate: 0,
          confirmedQuantity: 1,
        },
      ]);
    }
    return sum;
  };

  const reset = () => {
    setInvoiceItemsList([
      {
        description: "",
        unit: "item",
        quantity: 1,
        rate: "",
        isConfirmed: false,
        confirmedRate: 0,
        confirmedQuantity: 1,
      },
    ]);

    setSum(0);
    setInvoiceName("");
    setInvoiceDate("");
    setCustomerFirstName("");
    setCustomerLastName("");
    setCustomerPhone("");
    setCustomerEmail("");
  };

  const subTotal = sum;
  const vat = subTotal * 0.2;
  const total = sum + vat;

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
            onFocus={(e: React.ChangeEvent<HTMLInputElement>) => {
              e.target.type = "date";
            }}
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {
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
        <InvoiceItems
          serviceList={invoiceItemsList}
          setServiceList={setInvoiceItemsList}
          setSum={setSum}
        />
        <div
          role="button"
          onClick={onNewBtnClick}
          className="invoice-generator__new-item"
        >
          <Icon icon="new" color="blue" size="lg" />
        </div>
        <div className="invoice-generator__summary summary">
          <div className="summary__item">
            <span className="summary__name">SUBTOTAL:</span>
            <span className="summary__value">{`£ ${sum.toFixed(2)}`}</span>
          </div>
          <div className="summary__item">
            <span className="summary__name">VAT(20%):</span>
            <span className="summary__value">{`£ ${vat.toFixed(2)}`}</span>
          </div>
          <div className="summary__item">
            <span className="summary__name">TOTAL:</span>
            <span className="summary__value">£ {total.toFixed(2)}</span>
          </div>
          <div className="invoice-generator__buttons">
            <Button
              text="Reset"
              type="reset"
              color="red"
              additionalClasses="mr-2 flex-2"
              onClick={reset}
              isDisabled={false}
            ></Button>
            <Button
              text="Generate invoice"
              type="button"
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
