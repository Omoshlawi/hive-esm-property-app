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
import React from "react";
import { useRelatedProperties, useRelationships } from "../hooks";
import { Link, useParams } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import { RelatedProperty, Relationship } from "../types";
import { ActionIcon, Button, Group, Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import RelationshipForm from "../forms/RelationshipForm";
import { IconPlus } from "@tabler/icons-react";

type PropertyRelationshipsPageProps = Pick<PiletApi, "launchWorkspace"> & {};

const PropertyRelationshipsPage: React.FC<PropertyRelationshipsPageProps> = ({
  launchWorkspace,
}) => {
  const { propertyId } = useParams<{ propertyId: string }>();
  const relationshipAsync = useRelatedProperties(propertyId);
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
    <When
      asyncState={{
        ...relationshipAsync,
        data: relationshipAsync.relatedProperties,
      }}
      error={(e) => <ErrorState error={e} title={title} />}
      loading={() => <TableSkeleton />}
      success={(relationships) => {
        if (!relationships.length)
          return (
            <EmptyState
              onAdd={() => handleAddUpdate()}
              title={title}
              message="Their are no Reationships to display for this property"
            />
          );
        return (
          <DataTable
            columns={[
              ...columns,
              {
                id: "actions",
                header: "Actions",
                enableSorting: false,
                enableHiding: false,
                cell({ row }) {
                  const relationship = row.original;
                  return (
                    <Group>
                      <ActionIcon
                        variant="outline"
                        aria-label="Settings"
                        color="green"
                        onClick={() =>
                          handleAddUpdate(relationship.relationship)
                        }
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
                        onClick={() => handleDelete(relationship.relationship)}
                      >
                        <TablerIcon
                          name="trash"
                          style={{ width: "70%", height: "70%" }}
                          stroke={1.5}
                        />
                      </ActionIcon>
                    </Group>
                  );
                },
              },
            ]}
            data={relationships}
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
        );
      }}
    />
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
