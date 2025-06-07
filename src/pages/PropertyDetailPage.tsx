import { PiletApi } from "@hive/esm-shell-app";
import React from "react";
import { useParams } from "react-router-dom";

type PropertyDetailPageProps = Pick<PiletApi, "launchWorkspace"> & {};
const PropertyDetailPage: React.FC<PropertyDetailPageProps> = ({
  launchWorkspace,
}) => {
  const { propertyId } = useParams<{ propertyId: string }>();
  return <div>{JSON.stringify(propertyId)}</div>;
};

export default PropertyDetailPage;
