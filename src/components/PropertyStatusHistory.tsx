import React, { FC } from "react";
import { usePropertyStatusHistory } from "../hooks";
import {
  DataTable,
  ErrorState,
  StateFullDataTable,
  TableSkeleton,
  When,
} from "@hive/esm-core-components";
import { ColumnDef } from "@tanstack/react-table";
import { PropertyStatus } from "../types";
import { Paper, Title } from "@mantine/core";

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
