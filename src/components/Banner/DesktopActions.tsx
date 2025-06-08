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
  IconDotsVertical,
} from "@tabler/icons-react";
import React, { FC } from "react";

type DesktopActionsProps = {
  onTogleExpand: () => void;
  expanded: boolean;
  Extension: React.ComponentType<{ name: string; params: Record<string, any> }>;
};

const DesktopActions: FC<DesktopActionsProps> = ({
  onTogleExpand,
  expanded,
  Extension,
}) => {
  return (
    <Group gap="xs" visibleFrom="sm" style={{ flexShrink: 0 }}>
      <Menu shadow="lg" width={220} position="bottom-end">
        <Menu.Target>
          <Button
            variant="light"
            leftSection={<IconDotsVertical size={16} />}
            size="sm"
            style={{
              transition: "all 0.2s ease",
            }}
          >
            Actions
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Extension
            name="property-chart-banner-actions-extension-slot"
            params={{}}
          />
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
