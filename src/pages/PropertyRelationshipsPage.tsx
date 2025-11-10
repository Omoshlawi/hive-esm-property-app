import {
  DataTable,
  DataTableColumnHeader,
  EmptyState,
  ErrorState,
  launchWorkspace,
  StateFullDataTable,
  TablerIcon,
  TableSkeleton,
  When,
} from "@havena/esm-core-components";
import { ActionIcon, Button, Group, Paper, Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { IconPlus } from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { Link, useParams } from "react-router-dom";
import RelationshipForm from "../forms/RelationshipForm";
import { useAppColors, useRelatedProperties } from "../hooks";
import { RelatedProperty, Relationship } from "../types";

type PropertyRelationshipsPageProps = {};

const PropertyRelationshipsPage: React.FC<
  PropertyRelationshipsPageProps
> = ({}) => {
  const { propertyId } = useParams<{ propertyId: string }>();
  const relationshipAsync = useRelatedProperties(propertyId);
  const { bgColor } = useAppColors();
  const handleAddUpdate = (relationship?: Relationship) => {
    const close = launchWorkspace(
      <RelationshipForm
        propertyId={propertyId}
        onCloseWorkspace={() => close()}
        relationship={relationship}
      />,
      {
        width: "wide",
        title: relationship ? "Update relationship" : "Add related property",
      }
    );
  };
  const handleDelete = (relationship: Relationship) => {
    openConfirmModal({
      title: "Delete Relationship",
      children: (
        <Text>
          Are you sure you want to delete this organization.This action is
          destructive and will delete all data related to organization
        </Text>
      ),
      labels: { confirm: "Delete Relationship", cancel: "No don't delete it" },
      confirmProps: { color: "red" },
      centered: true,
      onConfirm() {
        // TODO Implement delete
      },
    });
  };
  const title = "Relationships";

  return (
    <Paper bg={bgColor} p={"md"}>
      <StateFullDataTable
        {...relationshipAsync}
        data={relationshipAsync.relatedProperties}
        columns={columns}
        title={title}
        withColumnViewOptions
        renderActions={() => (
          <Button
            onClick={() => handleAddUpdate()}
            leftSection={<IconPlus />}
            variant="light"
          >
            Add
          </Button>
        )}
      />
    </Paper>
  );
};
export default PropertyRelationshipsPage;
const columns: ColumnDef<RelatedProperty>[] = [
  {
    accessorKey: "name",
    header: "Related Property",
    cell({ row, getValue }) {
      const propertyId = row.original.id;
      const propertyName = getValue<string>();
      const linkToChart = `/dashboard/properties/${propertyId}`;
      return (
        <Button
          component={Link as any}
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
    accessorKey: "relationship.startDate",
    header({ column }) {
      return <DataTableColumnHeader column={column} title="Start date" />;
    },
    cell({ getValue }) {
      const startDate = getValue<string>();
      return new Date(startDate).toDateString();
    },
  },
  {
    accessorKey: "relationship.endDate",
    header({ column }) {
      return <DataTableColumnHeader column={column} title="End date" />;
    },
    cell({ getValue }) {
      const startDate = getValue<string>();
      return new Date(startDate).toDateString();
    },
  },
  {
    accessorKey: "relationshipToIndex",
    header({ column }) {
      return (
        <DataTableColumnHeader column={column} title="Relationship Type" />
      );
    },
  },
  {
    accessorKey: "relationship.createdAt",
    header({ column }) {
      return <DataTableColumnHeader column={column} title="Date created" />;
    },
    cell({ getValue }) {
      const startDate = getValue<string>();
      return new Date(startDate).toDateString();
    },
  },
];
