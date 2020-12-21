import { TypeSelectCard } from "@egovernments/digit-ui-react-components";
import React, { useState } from "react";

const SelectSubType = ({ t, config, onSelect, value }) => {
  const [subType, setSubType] = useState(() => {
    const { subType } = value;
    return subType ? subType : {};
  });
  const { complaintType } = value;
  const menu = Digit.GetServiceDefinitions.getSubMenu(complaintType, t);

  const goNext = () => {
    onSelect({ subType });
  };
  // const complaintType = Digit.SessionStorage.get("complaintType");
  // const __initSubType__ = Digit.SessionStorage.get("subType");

  function selectedValue(value) {
    setSubType(value);
    // Digit.SessionStorage.set("subType", value);
  }

  const configNew = {
    ...config.texts,
    ...{ headerCaption: complaintType.key },
    ...{ menu: menu },
    ...{ optionsKey: "name" },
    ...{ selected: selectedValue },
    ...{ selectedOption: subType },
    ...{ onSave: goNext },
  };

  return <TypeSelectCard {...configNew} t={t} />;
};
export default SelectSubType;
