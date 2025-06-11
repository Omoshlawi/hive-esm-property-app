import {
  DataTable,
  DataTableColumnHeader,
  EmptyState,
  ErrorState,
  TablerIcon,
  TableSkeleton,
  When,
} from "@hive/esm-core-components";
import { PiletApi } from "@hive/esm-shell-app";
import {
  ActionIcon,
  Badge,
  Button,
  Group,
  Text,
  useComputedColorScheme,
} from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { IconPlus } from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { Link } from "react-router-dom";
import PropertyStatusHistory from "../components/PropertyStatusHistory";
import PropertyForm from "../forms/PropertyForm";
import { useProperties } from "../hooks";
import { Property } from "../types";
import { getStatusColor, getStatusVariant } from "../utils/helpers";

type PropertiesPageProps = Pick<PiletApi, "launchWorkspace"> & {};

const PropertiesPage: React.FC<PropertiesPageProps> = ({ launchWorkspace }) => {
  const propertiesAsync = useProperties();
  const title = "Properties";

  const handleAddOrupdate = (property?: Property) => {
    const dispose = launchWorkspace(
      <PropertyForm
        property={property}
        onSuccess={() => dispose()}
        onCloseWorkspace={() => dispose()}
      />,
      {
        title: property ? "Update Property" : "Add Property",
        width: "wide",
      }
    );
  };
  const handleDelete = (property: Property) => {
    openConfirmModal({
      title: "Delete Property",
      children: (
        <Text>
          Are you sure you want to delete this role.This action is destructive
          and will delete all data related to role
        </Text>
      ),
      labels: { confirm: "Delete property", cancel: "No don't delete it" },
      confirmProps: { color: "red" },
      centered: true,
      onConfirm() {
        // TODO Implement delete
      },
    });
  };

  const actions: ColumnDef<Property> = {
    id: "actions",
    header: "Actions",
    cell({ row }) {
      const property = row.original;
      return (
        <Group>
          <Group>
            <ActionIcon
              variant="outline"
              aria-label="Settings"
              color="green"
              onClick={() => handleAddOrupdate(property)}
            >
              <TablerIcon
                name="edit"
                style={{ width: "70%", height: "70%" }}
                stroke={1.5}
              />
            </ActionIcon>
            <ActionIcon
              variant="outline"
              aria-label="Settings"
              color="red"
              onClick={() => handleDelete(property)}
            >
              <TablerIcon
                name="trash"
                style={{ width: "70%", height: "70%" }}
                stroke={1.5}
              />
            </ActionIcon>
          </Group>
        </Group>
      );
    },
  };
  return (
    <When
      asyncState={{ ...propertiesAsync, data: propertiesAsync.properties }}
      loading={() => <TableSkeleton />}
      error={(e) => <ErrorState error={e} title={title} />}
      success={(data) => {
        if (!data.length)
          return <EmptyState title={title} onAdd={() => handleAddOrupdate()} />;
        return (
          <DataTable
            data={data}
            columns={[...columns, actions]}
            renderExpandedRow={({ original: { id } }) => (
              <PropertyStatusHistory propertyId={id} />
            )}
            renderActions={() => (
              <>
                <Button
                  variant="light"
                  leftSection={<IconPlus />}
                  onClick={() => handleAddOrupdate()}
                >
                  Add
                </Button>
              </>
            )}
            title={title}
            withColumnViewOptions
          />
        );
      }}
    />
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
    accessorKey: "address.county",
    header({ column }) {
      return <DataTableColumnHeader column={column} title="County" />;
    },
  },
  {
    accessorKey: "address.subCounty",
    header({ column }) {
      return <DataTableColumnHeader column={column} title="Subcounty" />;
    },
  },
  {
    accessorKey: "address.ward",
    header({ column }) {
      return <DataTableColumnHeader column={column} title="Ward" />;
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
