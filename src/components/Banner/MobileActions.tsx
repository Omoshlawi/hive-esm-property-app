import { ActionIcon, Group, Menu, Tooltip } from "@mantine/core";
import { IconChevronDown, IconDotsVertical } from "@tabler/icons-react";
import React, { FC } from "react";

type MobileActionsProps = {
  expanded: boolean;
  onToggleExpand: () => void;
  Extension: React.ComponentType<{ name: string; params: Record<string, any> }>;
};

const MobileActions: FC<MobileActionsProps> = ({
  expanded,
  onToggleExpand,
  Extension,
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
            <IconDotsVertical size={16} />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Extension
            name="property-chart-banner-actions-extension-slot"
            params={{}}
          />
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
};

export default MobileActions;
