import React from "react";

import InvoiceItem from "./InvoiceItem";

interface InvoiceItemsProps {
  serviceList: any;
  setServiceList: any;
}

export default function InvoiceItems({
  serviceList,
  setServiceList,
}: InvoiceItemsProps): JSX.Element {
  const onRemoveBtnClick = (index: any) => {
    const list = [...serviceList];
    list.splice(index, 1);
    setServiceList(list);
  };

  return (
    <>
      {serviceList.map((singleService: any, index: any) => (
        <InvoiceItem
          serviceList={serviceList}
          onRemove={onRemoveBtnClick}
          index={index}
          key={index}
        />
      ))}
    </>
  );
}
