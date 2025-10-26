import {
  DashboardPageHeader,
  DataTableColumnHeader,
  launchWorkspace,
  StateFullDataTable,
  TablerIcon,
} from "@hive/esm-core-components";
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Group,
  Menu,
  Paper,
  Stack,
  Text,
  useComputedColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { Link } from "react-router-dom";
import PropertyStatusHistory from "../components/PropertyStatusHistory";
import PropertyForm from "../forms/PropertyForm";
import { useProperties, usePropertiesApi } from "../hooks";
import { Property } from "../types";
import {
  formatAddress,
  getStatusColor,
  getStatusVariant,
} from "../utils/helpers";
import AddressFields from "../components/AddressFields";
import { confirmDelete } from "../utils/utils";

const PropertiesPage: React.FC = () => {
  const propertiesAsync = useProperties();
  const { deleteProperty } = usePropertiesApi();
  const colorScheme = useComputedColorScheme();
  const theme = useMantineTheme();
  const bgColor =
    colorScheme === "light" ? theme.colors.gray[0] : theme.colors.dark[6];

  const handleAddOrupdate = (property?: Property) => {
    const dispose = launchWorkspace(
      <PropertyForm
        property={property}
        onSuccess={() => dispose()}
        onCloseWorkspace={() => dispose()}
      />,
      {
        title: property ? "Update Property" : "Add Property",
      }
    );
  };

  const actions: ColumnDef<Property> = {
    id: "actions",
    header: "Actions",
    cell({ row }) {
      const property = row.original;
      return (
        <Menu shadow="md" width={200} position="bottom-end">
          <Menu.Target>
            <ActionIcon variant="subtle" aria-label="actions">
              <TablerIcon
                name="dots"
                style={{ width: "70%", height: "70%" }}
                stroke={1.5}
              />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Actions</Menu.Label>
            <Menu.Divider />
            <Menu.Item
              leftSection={<TablerIcon name="edit" size={14} />}
              onClick={() => handleAddOrupdate(property)}
            >
              Edit
            </Menu.Item>
            <Menu.Item
              leftSection={<TablerIcon name="trash" size={14} />}
              onClick={() =>
                confirmDelete("property", async () => {
                  await deleteProperty(property.id, true);
                })
              }
            >
              Delete
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      );
    },
  };
  return (
    <Stack gap={"xl"}>
      <Box>
        <DashboardPageHeader
          title="Properties"
          subTitle={`
            Organization rental applications`}
          icon={"building"}
        />
      </Box>
      <Paper bg={bgColor} p={"md"}>
        <StateFullDataTable
          {...propertiesAsync}
          data={propertiesAsync.properties}
          withColumnViewOptions
          onAdd={() => handleAddOrupdate()}
          columns={[...columns, actions]}
          renderExpandedRow={({ original: { id } }) => (
            <PropertyStatusHistory propertyId={id} />
          )}
        />
      </Paper>
    </Stack>
  );
};

export default PropertiesPage;
const columns: ColumnDef<Property>[] = [
  {
    id: "expand",
    header: ({ table }) => {
      const allRowsExpanded = table.getIsAllRowsExpanded();
      //   const someRowsExpanded = table.getIsSomeRowsExpanded();
      return (
        <ActionIcon
          variant="subtle"
          color="gray"
          onClick={() => table.toggleAllRowsExpanded(!allRowsExpanded)}
          style={{ cursor: "pointer" }}
          aria-label="Expand all"
        >
          <TablerIcon
            name={allRowsExpanded ? "chevronUp" : "chevronDown"}
            size={16}
          />
        </ActionIcon>
      );
    },
    cell: ({ row }) => {
      const rowExpanded = row.getIsExpanded();
      return (
        <ActionIcon
          variant="subtle"
          color="gray"
          onClick={() => row.toggleExpanded(!rowExpanded)}
          style={{ cursor: "pointer" }}
          aria-label="Expand Row"
        >
          <TablerIcon
            name={rowExpanded ? "chevronUp" : "chevronDown"}
            size={16}
          />
        </ActionIcon>
      );
    },
    enableSorting: false,
    enableHiding: false,
    size: 0,
  },
  {
    accessorKey: "propertyNumber",
    header({ column }) {
      return <DataTableColumnHeader column={column} title="Property Number" />;
    },
  },
  {
    accessorKey: "name",
    header: "Property",
    cell({ row, getValue }) {
      const property = row.original;
      const propertyName = getValue<string>();
      const linkToChart = `/dashboard/properties/${property.id}`;
      return (
        <Button
          component={Link}
          to={linkToChart}
          variant="transparent"
          p={0}
          m={0}
        >
          {propertyName}
        </Button>
      );
    },
  },
  {
    id: "address",
    header({ column }) {
      return <DataTableColumnHeader column={column} title="Address" />;
    },
    cell: ({ row: { original: property } }) => (
      <AddressFields
        addressId={property.addressId}
        display={(address) => `${address.address1}, ${address.address2}`}
      />
    ),
  },
  {
    accessorKey: "isVirtual",
    header({ column }) {
      return <DataTableColumnHeader column={column} title="Type" />;
    },
    cell({ getValue }) {
      const isVirtual = getValue<Property["isVirtual"]>();
      return (
        <Badge color={isVirtual ? "red" : undefined} variant={"dot"}>
          {isVirtual ? "Virtual" : "Physical"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "status",
    header({ column }) {
      return <DataTableColumnHeader column={column} title="Status" />;
    },
    cell({ getValue }) {
      const status = getValue<Property["status"]>();
      const colorScheme = useComputedColorScheme();
      return (
        <Badge
          color={getStatusColor(status)}
          variant={getStatusVariant(status, colorScheme)}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header({ column }) {
      return <DataTableColumnHeader column={column} title="Date Created" />;
    },
    cell({ getValue }) {
      const created = getValue<string>();
      return new Date(created).toDateString();
    },
  },
];
