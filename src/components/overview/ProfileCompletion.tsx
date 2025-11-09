import React, { FC, useMemo } from "react";
import { Property, PropertyMedia } from "../../types";
import {
  Card,
  Stack,
  Group,
  RingProgress,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { usePropertyMedia } from "../../hooks";
type Props = {
  property: Property;
};
const ProfileCompletion: FC<Props> = ({ property }) => {
  const { propertyMedia } = usePropertyMedia(property.id, "IMAGE");
  const completionPercentage = useMemo(() => {
    return calculateCompletionPercentage({
      ...property,
      media: propertyMedia ?? [],
    });
  }, [propertyMedia, property]);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
      <Stack gap="md">
        <Group justify="space-between">
          <Text size="lg" fw={600}>
            Profile Completion
          </Text>
          <Text
            size="sm"
            fw={600}
            c={completionPercentage >= 80 ? "green" : "orange"}
          >
            {completionPercentage}%
          </Text>
        </Group>

        <RingProgress
          size={120}
          thickness={12}
          sections={[
            {
              value: completionPercentage,
              color: completionPercentage >= 80 ? "green" : "orange",
            },
          ]}
          label={
            <Text
              size="xs"
              ta="center"
              px="xs"
              style={{ pointerEvents: "none" }}
            >
              {completionPercentage >= 80 ? "Complete" : "Needs Work"}
            </Text>
          }
          style={{ alignSelf: "center" }}
        />

        <Stack gap="xs">
          <CompletionItem completed={!!property.name} label="Property Name" />
          <CompletionItem
            completed={!!property.description}
            label="Description"
          />
          <CompletionItem completed={!!property.thumbnail} label="Main Photo" />
          <CompletionItem completed={!!property.address} label="Address" />
          <CompletionItem
            completed={propertyMedia && propertyMedia?.length > 0}
            label="Media"
          />
          <CompletionItem
            completed={property.amenities && property.amenities?.length > 0}
            label="Amenities"
          />
        </Stack>
      </Stack>
    </Card>
  );
};

export default ProfileCompletion;
// Helper Components
function CompletionItem({
  completed,
  label,
}: {
  completed: boolean;
  label: string;
}) {
  return (
    <Group gap="xs">
      <ThemeIcon size="sm" variant="light" color={completed ? "green" : "gray"}>
        <IconCheck size={12} />
      </ThemeIcon>
      <Text size="sm" c={completed ? "green" : "dimmed"}>
        {label}
      </Text>
    </Group>
  );
}

function calculateCompletionPercentage(
  property: Property & { media: Array<PropertyMedia> }
): number {
  const checks = [
    !!property.name,
    !!property.description,
    !!property.thumbnail,
    !!property.address,
    property.media && property.media?.length > 0,
    property.amenities && property.amenities?.length > 0,
  ];

  const completed = checks.filter(Boolean)?.length;
  return Math.round((completed / checks?.length) * 100);
}
