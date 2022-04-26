import React from "react";

import useWindowWidth from "../../hooks/useWindowWidth";

import Input from "../Input";

export default function InvoiceItem(): JSX.Element {
  const { width } = useWindowWidth();

  const [description, setDescription] = React.useState("");
  const [unit, setUnit] = React.useState("item");
  const [quantity, setQuantity] = React.useState("1");
  const [rate, setRate] = React.useState("");

  return (
    <div className="invoice-item">
      <div className="invoice-item__number">1.</div>
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
      <div className="invoice-item__buttons"></div>
    </div>
  );
}
