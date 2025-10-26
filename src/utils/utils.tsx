import { openConfirmModal } from "@mantine/modals";
import React from "react";
import { Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { handleApiErrors } from "@hive/esm-core-api";

export const confirmDelete = (
  resource: string,
  handleDelete?: () => Promise<void>
) => {
  openConfirmModal({
    title: `Delete ${resource}`,
    children: (
      <Text>
        {`Are you sure you want to delete this ${resource}.This action is destructive and will delete all data related to this ${resource}`}
      </Text>
    ),
    labels: { confirm: "Delete", cancel: "Cancel" },
    confirmProps: { color: "red" },
    centered: true,
    async onConfirm() {
      try {
        await handleDelete();
        showNotification({
          message: `${resource} deleted succesfully`,
          title: "Success",
          color: "teal",
        });
      } catch (error) {
        showNotification({
          message: handleApiErrors(error)?.detail,
          title: `Error deleting ${resource}`,
          color: "red",
        });
      }
    },
  });
};
