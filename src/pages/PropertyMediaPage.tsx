import {
  DataTableColumnHeader,
  StateFullDataTable,
  TablerIcon,
} from "@hive/esm-core-components";
import { PiletApi } from "@hive/esm-shell-app";
import {
  ActionIcon,
  Avatar,
  Button,
  Center,
  Image,
  Paper,
} from "@mantine/core";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { useParams } from "react-router-dom";
import { usePropertyMedia } from "../hooks";
import { PropertyMedia } from "../types";
import { IconTrash } from "@tabler/icons-react";
import { getHiveFileUrl } from "@hive/esm-core-api";
import { openModal } from "@mantine/modals";
import MediaGridView from "../components/MediaGridView";
type PropertyMediaPageProps = Pick<PiletApi, "launchWorkspace"> & {};

const PropertyMediaPage: React.FC<PropertyMediaPageProps> = ({
  launchWorkspace,
}) => {
  const { propertyId } = useParams<{ propertyId: string }>();
  const propertyMediaAsync = usePropertyMedia(propertyId);
  const title = "Property Media";
  return (
    <StateFullDataTable
      columns={columns}
      {...propertyMediaAsync}
      data={propertyMediaAsync.propertyMedia}
      title={title}
      withColumnViewOptions
      renderActions={() => (
        <Button
          leftSection={<IconTrash size={16} />}
          variant="light"
          color="red"
        >
          Delete
        </Button>
      )}
      renderExpandedRow={() => <Paper>Here</Paper>}
      views={{
        grid: (table) => <MediaGridView media={table.options.data} />,
      }}
      renderViewTabItem={(view) => {
        if (view === "table")
          return (
            <Center>
              <TablerIcon name="layoutGrid" />
            </Center>
          );
        return (
          <Center>
            <TablerIcon name="layoutList" />
          </Center>
        );
      }}
    />
  );
};

export default PropertyMediaPage;
const columns: ColumnDef<PropertyMedia>[] = [
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
    size: 20,
  },
  {
    accessorKey: "url",
    header: "Image",
    cell({ getValue, row }) {
      const url = getValue<string>();
      const media = row.original;
      const img = getHiveFileUrl(url);
      return (
        <Avatar
          alt="Property media"
          src={img}
          radius={"xl"}
          onClick={() => {
            openModal({
              fullScreen: true,
              title: media.title ?? "Media File",
              children: (
                <Image
                  src={img}
                  fit="contain"
                  fallbackSrc="https://placehold.co/600x400?text=Placeholder"
                />
              ),
            });
          }}
        />
      );
    },
    size: 10,
  },
  {
    accessorKey: "title",
    header: "Title",
    cell({ getValue }) {
      const title = getValue<string>();
      return title || "--";
    },
  },
  {
    accessorKey: "order",
    header: "Order",
  },

  {
    accessorKey: "type",
    header({ column }) {
      return <DataTableColumnHeader column={column} title="Type" />;
    },
  },

  {
    accessorKey: "createdAt",
    header({ column }) {
      return <DataTableColumnHeader column={column} title="Date created" />;
    },
    cell({ getValue }) {
      const startDate = getValue<string>();
      return new Date(startDate).toDateString();
    },
  },
];
