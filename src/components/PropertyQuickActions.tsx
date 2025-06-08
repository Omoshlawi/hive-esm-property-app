import { Menu } from "@mantine/core";
import {
  IconEye,
  IconEdit,
  IconCopy,
  IconShare,
  IconArchive,
  IconTrash,
  IconUpload,
} from "@tabler/icons-react";
import React from "react";

const PropertyQuickActions = () => {
  return (
    <>
      <Menu.Item leftSection={<IconEdit size={16} />}>Edit Property</Menu.Item>
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
