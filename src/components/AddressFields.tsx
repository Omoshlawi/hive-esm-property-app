import React, { FC, useEffect } from "react";
import { useAddress } from "../hooks";
import { Loader } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { Address } from "../types";

type D =
  | "label"
  | "address1"
  | "address2"
  | "landmark"
  | "level1"
  | "level2"
  | "level3"
  | "level4"
  | "level5"
  | "country"
  | "postalCode"
  | "formated";

type Props = {
  addressId: string;
  display?: D | ((address: Address) => React.ReactNode);
};

const AddressFields: FC<Props> = ({ addressId, display = "formated" }) => {
  const { address, error, isLoading } = useAddress(addressId);

  useEffect(() => {
    if (error) {
      showNotification({
        message: error?.message,
        color: "red",
        title: "Error",
      });
    }
  }, [error]);

  if (isLoading) return <Loader size={"xs"} />;
  if (typeof display === "string") {
    return <p>{address?.[display]}</p>;
  }
  if (typeof display === "function") {
    return <>{display(address)}</>;
  }
  return null;
};

export default AddressFields;
