import { getHiveFileUrl } from "@hive/esm-core-api";
import {
  DataTableColumnHeader,
  StateFullDataTable,
  TablerIcon,
} from "@hive/esm-core-components";
import {
  ActionIcon,
  Avatar,
  Button,
  Center,
  Group,
  Image,
  Text,
} from "@mantine/core";
import { closeModal, openConfirmModal, openModal } from "@mantine/modals";
import { IconTrash } from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import { filesize } from "filesize";
import React from "react";
import { useParams } from "react-router-dom";
import MediaGridView from "../components/MediaGridView";
import PropertyGalaryForm from "../forms/media/PropertyGalaryForm";
import { usePropertyMedia } from "../hooks";
import { PropertyMedia, PropsWithLaunchWorkspace } from "../types";
import UpdateMediaMetadataForm from "../forms/media/UpdateMediaMetadataForm";
type PropertyMediaPageProps = PropsWithLaunchWorkspace & {};

const PropertyMediaPage: React.FC<PropertyMediaPageProps> = ({
  launchWorkspace,
}) => {
  const { propertyId } = useParams<{ propertyId: string }>();
  const propertyMediaAsync = usePropertyMedia(propertyId, "IMAGE");
  const title = "Property Media";

  const handleAdd = () => {
    const modalId = openModal({
      title: "Upload Property Images",
      children: (
        <PropertyGalaryForm
          propertyId={propertyId}
          onClose={() => closeModal(modalId)}
        />
      ),
    });
  };

  const handleUpdate = (media: PropertyMedia) => {
    const dispose = launchWorkspace(
      <UpdateMediaMetadataForm
        propertyId={propertyId}
        media={media}
        onClose={() => dispose()}
      />,
      { title: "Update Media" }
    );
  };
  const handleDelete = (media: PropertyMedia) => {
    openConfirmModal({
      title: "Delete media",
      children: (
        <Text>
          Are you sure you want to delete this role.This action is destructive
          and will delete all data related to role
        </Text>
      ),
      labels: { confirm: "Delete media", cancel: "No don't delete it" },
      confirmProps: { color: "red" },
      centered: true,
      onConfirm() {
        // TODO Implement delete
      },
    });
  };

  return (
    <StateFullDataTable
      defaultView="grid"
      columns={[
        ...columns,
        {
          id: "actions",
          header: "Actions",
          cell({ row }) {
            const property = row.original;
            return (
              <Group>
                <ActionIcon
                  variant="outline"
                  aria-label="edit"
                  color="teal"
                  onClick={() => handleUpdate(property)}
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
            );
          },
        },
      ]}
      {...propertyMediaAsync}
      data={propertyMediaAsync.propertyMedia}
      title={title}
      withColumnViewOptions
      onAdd={() => handleAdd()}
      renderActions={() => (
        <Button
          leftSection={<IconTrash size={16} />}
          variant="light"
          color="red"
        >
          Delete
        </Button>
      )}
      views={{
        grid: (table) => (
          <MediaGridView
            media={table.options.data}
            launchWorkspace={launchWorkspace}
          />
        ),
      }}
      renderViewTabItem={(view) => {
        if (view === "table")
          return (
            <Center>
              <TablerIcon name="layoutList" />
            </Center>
          );
        return (
          <Center>
            <TablerIcon name="layoutGrid" />
          </Center>
        );
      }}
    />
  );
};

export default PropertyMediaPage;
const columns: ColumnDef<PropertyMedia>[] = [
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
          role="button"
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
  },
  {
    accessorKey: "path",
    header: "Path",
    cell({ row }) {
      const media = row.original;
      const img = getHiveFileUrl(media.url);

      return (
        <Button
          variant="transparent"
          p={0}
          m={0}
          onClick={() =>
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
            })
          }
        >
          {media?.title ?? (media.url.split("/") as any)?.at(-1)}
        </Button>
      );
    },
  },

  {
    accessorKey: "metadata.size",
    header({ column }) {
      return <DataTableColumnHeader column={column} title="Size" />;
    },
    cell({ getValue }) {
      const size = getValue<number>();
      return filesize(size);
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
