import { Menu } from "@mantine/core";
import {
  IconEye,
  IconEdit,
  IconCopy,
  IconShare,
  IconArchive,
  IconTrash,
} from "@tabler/icons-react";
import React from "react";

const PropertyQuickActions = () => {
  return (
    <div>
      <Menu.Label>Quick Actions</Menu.Label>
      <Menu.Item leftSection={<IconEye size={16} />}>View Details</Menu.Item>
      <Menu.Item leftSection={<IconEdit size={16} />}>Edit Property</Menu.Item>
      <Menu.Label>Share & Export</Menu.Label>
      <Menu.Item leftSection={<IconCopy size={16} />}>Copy Link</Menu.Item>
      <Menu.Item leftSection={<IconShare size={16} />}>
        Share Property
      </Menu.Item>
      <Menu.Divider />
      <Menu.Label>Manage</Menu.Label>
      <Menu.Item leftSection={<IconArchive size={16} />}>
        Archive Property
      </Menu.Item>
      <Menu.Item leftSection={<IconTrash size={16} />} color="red">
        Delete Property
      </Menu.Item>
    </div>
  );
};

export default PropertyQuickActions;
