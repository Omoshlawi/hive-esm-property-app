import { StateFullDataTable } from "@havena/esm-core-components";
import { Paper, Title } from "@mantine/core";
import { ColumnDef } from "@tanstack/react-table";
import React, { FC } from "react";
import { usePropertyStatusHistory } from "../hooks";
import { PropertyStatus } from "../types";

type PropertyStatusHistoryProps = {
  propertyId: string;
};
const PropertyStatusHistory: FC<PropertyStatusHistoryProps> = ({
  propertyId,
}) => {
  const asyncstatus = usePropertyStatusHistory(propertyId);
  return (
    <Paper p={"md"}>
      <Title order={4}>Status history</Title>
      <StateFullDataTable
        columns={columns}
        {...asyncstatus}
        data={asyncstatus.statusHistory}
        nothingFoundMessage="No status history to display for this property"
      />
    </Paper>
  );
};

export default PropertyStatusHistory;
const columns: ColumnDef<PropertyStatus>[] = [
  { accessorKey: "previousStatus", header: "Previous Status" },
  { accessorKey: "newStatus", header: "New Status" },
  { accessorKey: "reason", header: "Reason" },
];
