import { Group, Tooltip, ActionIcon, Menu } from "@mantine/core";
import {
  IconChevronDown,
  IconDots,
  IconEye,
  IconEdit,
  IconCopy,
  IconShare,
  IconArchive,
  IconTrash,
} from "@tabler/icons-react";
import React, { FC } from "react";

type MobileActionsProps = {
  expanded: boolean;
  onToggleExpand: () => void;
};

const MobileActions: FC<MobileActionsProps> = ({
  expanded,
  onToggleExpand,
}) => {
  return (
    <Group gap="xs" hiddenFrom="sm" style={{ flexShrink: 0 }}>
      <Tooltip
        label={expanded ? "Hide details" : "Show more details"}
        position="bottom"
      >
        <ActionIcon
          variant="light"
          size="lg"
          onClick={onToggleExpand}
          aria-label={expanded ? "Collapse details" : "Expand details"}
          style={{
            transition: "all 0.2s ease",
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <IconChevronDown size={16} />
        </ActionIcon>
      </Tooltip>

      <Menu shadow="lg" width={220} position="bottom-end">
        <Menu.Target>
          <ActionIcon variant="light" size="lg">
            <IconDots size={16} />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Quick Actions</Menu.Label>
          <Menu.Item leftSection={<IconEye size={16} />}>
            View Details
          </Menu.Item>
          <Menu.Item leftSection={<IconEdit size={16} />}>
            Edit Property
          </Menu.Item>

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
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
};

export default MobileActions;
