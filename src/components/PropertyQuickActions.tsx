import { Alert, Menu, Skeleton, Stack } from "@mantine/core";
import {
  IconArchive,
  IconEdit,
  IconImageInPicture,
  IconPhoto,
  IconTrash,
  IconUpload,
} from "@tabler/icons-react";
import React, { FC } from "react";
import { useChartCurrentProperty, useProperty } from "../hooks";
import { PiletApi } from "@hive/esm-shell-app";
import PropertyForm from "../forms/PropertyForm";
import { handleApiErrors } from "@hive/esm-core-api";
import { closeModal, openModal } from "@mantine/modals";
import ThumbnailUploadForm from "../forms/ThumbnailUploadForm";

type PropertyQuickActionsProps = Pick<PiletApi, "launchWorkspace"> & {};

const PropertyQuickActions: FC<PropertyQuickActionsProps> = ({
  launchWorkspace,
}) => {
  const propertyId = useChartCurrentProperty();
  const { isLoading, error, property } = useProperty(propertyId);
  const handleEditProperty = () => {
    const dispose = launchWorkspace(
      <PropertyForm onCloseWorkspace={() => dispose()} property={property} />,
      {
        width: "wide",
        title: "Update Property",
      }
    );
  };

  const handleUploadThumbnail = () => {
    const modalId = openModal({
      title: "Upload Thumbnail",
      children: (
        <ThumbnailUploadForm
          property={property}
          onClose={() => closeModal(modalId)}
        />
      ),
    });
  };
  if (isLoading)
    return (
      <Stack gap={"xs"}>
        <Skeleton h={40} w={"100%"} />
        <Skeleton h={40} w={"100%"} />
        <Skeleton h={40} w={"100%"} />
        <Skeleton h={40} w={"100%"} />
      </Stack>
    );
  if (error)
    return (
      <Alert color="red" title="Error getting property">
        {handleApiErrors(error).detail}
      </Alert>
    );
  return (
    <>
      <Menu.Item
        leftSection={<IconPhoto size={16} />}
        onClick={handleUploadThumbnail}
      >
        Update Thumbnail
      </Menu.Item>
      <Menu.Item
        leftSection={<IconEdit size={16} />}
        onClick={handleEditProperty}
      >
        Edit Property
      </Menu.Item>
      <Menu.Item leftSection={<IconUpload size={16} />}>Publish</Menu.Item>
      <Menu.Item leftSection={<IconArchive size={16} />}>
        Archive Property
      </Menu.Item>
      <Menu.Item leftSection={<IconTrash size={16} />} color="red">
        Delete Property
      </Menu.Item>
    </>
  );
};

export default PropertyQuickActions;
