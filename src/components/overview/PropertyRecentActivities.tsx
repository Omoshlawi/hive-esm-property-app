import React, { FC } from "react";
import { Property } from "../../types";
import { Card, Stack, Timeline, Text } from "@mantine/core";
import { IconCheck, IconEdit, IconClock } from "@tabler/icons-react";
import { getStatusColor } from "../../utils/helpers";
type Props = {
  property: Property;
};
const PropertyRecentActivities: FC<Props> = ({ property }) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack gap="md">
        <Text size="lg" fw={600}>
          Recent Activity
        </Text>

        <Timeline active={3} bulletSize={24} lineWidth={2}>
          <Timeline.Item
            bullet={<IconCheck size={12} />}
            title="Property Created"
            color="green"
          >
            <Text c="dimmed" size="sm">
              Property was successfully created
            </Text>
            <Text size="xs" mt={4}>
              {new Date(property.createdAt).toLocaleString()}
            </Text>
          </Timeline.Item>

          <Timeline.Item
            bullet={<IconEdit size={12} />}
            title="Last Updated"
            color="blue"
          >
            <Text c="dimmed" size="sm">
              Property information was modified
            </Text>
            <Text size="xs" mt={4}>
              {new Date(property.updatedAt).toLocaleString()}
            </Text>
          </Timeline.Item>

          <Timeline.Item
            bullet={<IconClock size={12} />}
            title={`Status: ${property.status}`}
            color={getStatusColor(property.status)}
          >
            <Text c="dimmed" size="sm">
              Current property status
            </Text>
          </Timeline.Item>
        </Timeline>
      </Stack>
    </Card>
  );
};

export default PropertyRecentActivities;
