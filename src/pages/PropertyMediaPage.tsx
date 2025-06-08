import { EmptyState } from "@hive/esm-core-components";
import { PiletApi } from "@hive/esm-shell-app";
import React from "react";
type PropertyMediaPageProps = Pick<PiletApi, "launchWorkspace"> & {};

const PropertyMediaPage: React.FC<PropertyMediaPageProps> = ({
  launchWorkspace,
}) => {
  return (
    <EmptyState
      onAdd={() => {}}
      title="Property media"
      message="their are no Media files to display for this property"
    />
  );
};

export default PropertyMediaPage;
