import React from "react";

import useWindowWidth from "../../hooks/useWindowWidth";

import Input from "../Input";
import Icon from "../Icon";

export interface InvoiceItemProps {
  number?: number;
  onRemove?: any;
  id?: number;
  invoiceItemsNumbers?: any;

  index?: number;
  serviceList?: any;
}
export default function InvoiceItem({
  onRemove,
  index,
  serviceList,
}: InvoiceItemProps): JSX.Element {
  const { width } = useWindowWidth();

  const [description, setDescription] = React.useState("");
  const [unit, setUnit] = React.useState("item");
  const [quantity, setQuantity] = React.useState("1");
  const [rate, setRate] = React.useState("");

  return (
    <div className="invoice-item">
      <div className="invoice-item__number">{`${index + 1}.`}</div>
      <div className="invoice-item__inputs">
        <Input
          placeholder="Type description"
          name="description"
          id="description"
          value={description}
          setState={setDescription}
          underlineColor="grey"
          size="md"
          additionalClasses={`${width < 768 ? "mb-3" : "mr-4"} `}
        />
        <Input
          placeholder="Type unit"
          name="unit"
          id="unit"
          value={unit}
          setState={setUnit}
          underlineColor="grey"
          size="md"
          additionalClasses={`${width < 768 ? "mb-3" : "mr-4"} `}
        />
        <Input
          placeholder="Type quantity"
          name="quantity"
          id="quantity"
          value={quantity}
          setState={setQuantity}
          underlineColor="grey"
          size="md"
          additionalClasses={`${width < 768 ? "mb-3" : "mr-4"} `}
        />
        <Input
          placeholder="Type rate"
          name="rate"
          id="rate"
          value={rate}
          setState={setRate}
          underlineColor="grey"
          size="md"
          additionalClasses={`${width < 768 && "mb-3"} `}
        />
      </div>
      <div className="invoice-item__buttons">
        <Icon icon="confirm" color="white" size="sm" additionalClasses="mr-2" />
        {serviceList.length > 1 && index >= 0 && (
          <Icon
            icon="remove"
            onClick={() => onRemove(index)}
            color="white"
            size="sm"
          />
        )}
      </div>
    </div>
  );
}
