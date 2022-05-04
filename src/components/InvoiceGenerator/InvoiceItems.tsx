import React from "react";

import InvoiceItem from "./InvoiceItem";

import { InvoiceItemInterface } from "./InvoiceItemInterface";

interface InvoiceItemsProps {
  serviceList: InvoiceItemInterface[];
  setServiceList: React.Dispatch<React.SetStateAction<{}>>;
  setSum: React.Dispatch<React.SetStateAction<number>>;
}

export default function InvoiceItems({
  serviceList,
  setServiceList,
  setSum,
}: InvoiceItemsProps): JSX.Element {
  return (
    <>
      {serviceList.map((singleService: InvoiceItemInterface, index: number) => (
        <InvoiceItem
          index={index}
          serviceList={serviceList}
          setServiceList={setServiceList}
          singleService={singleService}
          key={index}
          setSum={setSum}
        />
      ))}
    </>
  );
}
