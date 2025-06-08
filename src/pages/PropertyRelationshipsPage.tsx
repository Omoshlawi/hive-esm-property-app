import { EmptyState } from "@hive/esm-core-components";
import { PiletApi } from "@hive/esm-shell-app";
import React from "react";

type PropertyRelationshipsPageProps = Pick<PiletApi, "launchWorkspace"> & {};

const PropertyRelationshipsPage: React.FC<PropertyRelationshipsPageProps> = ({
  launchWorkspace,
}) => {
  return (
    <EmptyState
      onAdd={() => {}}
      title="Property Relationships"
      message="Their are no Reationships to display for this property"
    />
  );
};
export default PropertyRelationshipsPage;
