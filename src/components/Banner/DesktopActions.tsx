import { Group, Menu, Button, Tooltip, ActionIcon } from "@mantine/core";
import {
  IconDots,
  IconEye,
  IconEdit,
  IconCopy,
  IconShare,
  IconArchive,
  IconTrash,
  IconChevronDown,
} from "@tabler/icons-react";
import React, { FC } from "react";

type DesktopActionsProps = {
  onTogleExpand: () => void;
  expanded: boolean;
};

const DesktopActions: FC<DesktopActionsProps> = ({
  onTogleExpand,
  expanded,
}) => {
  return (
    <Group gap="xs" visibleFrom="sm" style={{ flexShrink: 0 }}>
      <Menu shadow="lg" width={220} position="bottom-end">
        <Menu.Target>
          <Button
            variant="light"
            leftSection={<IconDots size={16} />}
            size="sm"
            style={{
              transition: "all 0.2s ease",
            }}
          >
            Actions
          </Button>
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

      <Tooltip
        label={expanded ? "Hide details" : "Show more details"}
        position="bottom"
      >
        <ActionIcon
          variant="light"
          size="lg"
          onClick={onTogleExpand}
          aria-label={expanded ? "Collapse details" : "Expand details"}
          style={{
            transition: "all 0.2s ease",
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <IconChevronDown size={16} />
        </ActionIcon>
      </Tooltip>
    </Group>
  );
};

export default DesktopActions;
