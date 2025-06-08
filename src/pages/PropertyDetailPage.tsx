import { PiletApi } from "@hive/esm-shell-app";
import React from "react";
import { useParams } from "react-router-dom";
import { useProperty } from "../hooks";
import { Code } from "@mantine/core";

type PropertyDetailPageProps = Pick<PiletApi, "launchWorkspace"> & {};
const PropertyDetailPage: React.FC<PropertyDetailPageProps> = ({
  launchWorkspace,
}) => {
  const { propertyId } = useParams<{ propertyId: string }>();
  const propertyAsync = useProperty(propertyId);
  return <pre>{JSON.stringify(propertyAsync.property.name, null, 2)}</pre>;
};

export default PropertyDetailPage;
