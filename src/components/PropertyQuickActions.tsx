import { handleApiErrors } from "@havena/esm-core-api";
import { launchWorkspace } from "@havena/esm-core-components";
import { Alert, Menu, Skeleton, Stack } from "@mantine/core";
import { closeModal, openModal } from "@mantine/modals";
import { showNotification, updateNotification } from "@mantine/notifications";
import {
  IconArchive,
  IconCheck,
  IconEdit,
  IconExclamationCircle,
  IconPhoto,
  IconTrash,
  IconUpload,
} from "@tabler/icons-react";
import React, { FC } from "react";
import PropertyForm from "../forms/PropertyForm";
import ThumbnailUploadForm from "../forms/ThumbnailUploadForm";
import {
  useChartCurrentProperty,
  usePropertiesApi,
  useProperty,
} from "../hooks";

type PropertyQuickActionsProps = {};

const PropertyQuickActions: FC<PropertyQuickActionsProps> = () => {
  const propertyId = useChartCurrentProperty();
  const { submitPropertyForReview, mutateProperties, approvePendingProperty } =
    usePropertiesApi();
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

  const handleChangePropertyStatus = async (
    action: "approve" | "reject" | "submit"
  ) => {
    const id = showNotification({
      loading: true,
      title: "Validating Submitting",
      message: "Please wait",
      autoClose: false,
      withCloseButton: false,
    });
    try {
      if (action === "submit") await submitPropertyForReview(propertyId);
      else if (action === "approve") await approvePendingProperty(propertyId);
      mutateProperties();
      updateNotification({
        id,
        color: "teal",
        title: "Success",
        message: "Validation passed and submited succesfully",
        icon: <IconCheck size={18} />,
        loading: false,
        autoClose: 2000,
      });
    } catch (error) {
      updateNotification({
        id,
        color: "red",
        title: "Error",
        message: handleApiErrors(error)?.detail,
        icon: <IconExclamationCircle size={18} />,
        loading: false,
        autoClose: 2000,
      });
    }
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
      {property.status === "DRAFT" && (
        <Menu.Item
          leftSection={<IconUpload size={16} />}
          onClick={() => handleChangePropertyStatus("submit")}
        >
          Submit for review
        </Menu.Item>
      )}
      {property.status === "PENDING" && (
        <Menu.Item
          leftSection={<IconCheck size={16} />}
          onClick={() => handleChangePropertyStatus("approve")}
          color="green"
        >
          Approve
        </Menu.Item>
      )}
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
