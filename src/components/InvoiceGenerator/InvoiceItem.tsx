import React from "react";

import useWindowWidth from "../../hooks/useWindowWidth";

import { InvoiceItemInterface } from "./InvoiceItemInterface";

import Input from "../Input";
import Icon from "../Icon";

export interface InvoiceItemProps {
  index: number;
  serviceList: InvoiceItemInterface[];
  setServiceList: React.Dispatch<React.SetStateAction<{}>>;
  singleService: InvoiceItemInterface;
  setSum: React.Dispatch<React.SetStateAction<number>>;
}
export default function InvoiceItem({
  index,
  singleService,
  serviceList,
  setServiceList,
  setSum,
}: InvoiceItemProps): JSX.Element {
  const { width } = useWindowWidth();

  const handleServiceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    indx: number
  ) => {
    const { name, value } = e.target;
    const list: any = [...serviceList];
    list[indx][name] = value;
    setServiceList(list);
    // seting modified item as unconfirmed
    list[indx].isConfirmed = false;
    setServiceList(list);
  };

  const onConfirm = (indx: number) => {
    // confirm only when latest item has rate and quantity bigger than 0 and description field is not an empty string (unit and quantity have default values)
    if (
      parseFloat(serviceList[serviceList.length - 1].rate) > 0 &&
      serviceList[serviceList.length - 1].quantity > 0 &&
      serviceList[serviceList.length - 1].description !== ""
    ) {
      // set item as confirmed
      const list = [...serviceList];
      list[indx].isConfirmed = true;
      setServiceList(list);
      // add that item price*quantity to the sum
      setSum(
        serviceList.reduce((base: number, object: InvoiceItemInterface) => {
          return base + parseFloat(object.rate) * object.quantity;
        }, 0)
      );
      // save rate and quantity of the element at the time it was being confirmed
      list[indx].confirmedRate = parseFloat(serviceList[index].rate);
      list[indx].confirmedQuantity = serviceList[index].quantity;
      setServiceList(list);
    }
  };

  const onRemove = (indx: number) => {
    const list = [...serviceList];
    const rateToRemove = list[indx].confirmedRate;
    const quantityToRemove = list[indx].confirmedQuantity;

    // removing confirmed value from sum
    if (serviceList[index].confirmedRate > 0) {
      setSum((prevSum: number) => prevSum - rateToRemove * quantityToRemove);
      // removing this invoiceItem from list of items
      list.splice(indx, 1);
      setServiceList(list);
    } else if (serviceList[index].confirmedRate <= 0) {
      setSum((prevSum: number) => prevSum - rateToRemove * quantityToRemove);
      // removing this invoiceItem from list of items
      list.splice(indx, 1);
      setServiceList(list);
    }

    if (serviceList.length === 1) {
      list[indx] = {
        description: "",
        unit: "item",
        quantity: 1,
        rate: "",
        isConfirmed: false,
        confirmedRate: 0,
        confirmedQuantity: 1,
      };
      setServiceList(list);

      setSum(0);
    }
  };

  return (
    <div key={index} className="invoice-item">
      <div className="invoice-item__number">{`${index + 1}.`}</div>
      <div className="invoice-item__inputs">
        <Input
          placeholder="Type description"
          name="description"
          id="description"
          value={singleService.description}
          handleValueChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleServiceChange(e, index)
          }
          underlineColor="grey"
          size="md"
          additionalClasses={`${width < 1366 ? "mb-3" : "mr-4"} `}
          required
        />
        <Input
          placeholder="Type unit"
          name="unit"
          id="unit"
          value={singleService.unit}
          handleValueChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleServiceChange(e, index)
          }
          underlineColor="grey"
          size="md"
          additionalClasses={`${width < 1366 ? "mb-3" : "mr-4"} `}
        />
        <Input
          placeholder="Type quantity"
          name="quantity"
          id="quantity"
          value={singleService.quantity}
          handleValueChange={(e) => handleServiceChange(e, index)}
          underlineColor="grey"
          size="md"
          additionalClasses={`${width < 1366 ? "mb-3" : "mr-4"} `}
        />
        <Input
          placeholder="Type rate"
          name="rate"
          id="rate"
          value={singleService.rate}
          handleValueChange={(e) => handleServiceChange(e, index)}
          underlineColor="grey"
          size="md"
          additionalClasses={`${width < 1366 && "mb-3"} `}
        />
      </div>
      <div className="invoice-item__buttons">
        {serviceList[index].isConfirmed === false &&
          serviceList[index].description !== "" &&
          parseFloat(serviceList[index].rate) > 0 &&
          serviceList[index].quantity > 0 && (
            <Icon
              icon="confirm"
              onClick={() => onConfirm(index)}
              color="white"
              size="sm"
              additionalClasses={
                serviceList[index].isConfirmed === false ? "mr-2" : ""
              }
            />
          )}
        <Icon
          icon="remove"
          onClick={() => onRemove(index)}
          color="white"
          size="sm"
        />
      </div>
    </div>
  );
}
