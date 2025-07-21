import React, { FC } from "react";
import { Property } from "../../types";
import { Card, SimpleGrid, Stack, Text } from "@mantine/core";
import { usePropertyMedia } from "../../hooks";

type Props = {
  property: Property;
};

const PropertyStatistics: FC<Props> = ({ property }) => {
  const { propertyMedia } = usePropertyMedia(property.id, "IMAGE");
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
      <Stack gap="md">
        <Text size="lg" fw={600}>
          Key Statistics
        </Text>

        <SimpleGrid cols={2} spacing="md">
          <div style={{ textAlign: "center" }}>
            <Text size="xl" fw={700} c="blue">
              {0}
            </Text>
            <Text size="sm" c="dimmed">
              Views
            </Text>
          </div>

          <div style={{ textAlign: "center" }}>
            <Text size="xl" fw={700} c="red">
              {0}
            </Text>
            <Text size="sm" c="dimmed">
              Favorites
            </Text>
          </div>

          <div style={{ textAlign: "center" }}>
            <Text size="xl" fw={700} c="green">
              {0}
            </Text>
            <Text size="sm" c="dimmed">
              Inquiries
            </Text>
          </div>

          <div style={{ textAlign: "center" }}>
            <Text size="xl" fw={700} c="orange">
              {propertyMedia?.length ?? 0}
            </Text>
            <Text size="sm" c="dimmed">
              Photos
            </Text>
          </div>
        </SimpleGrid>
      </Stack>
    </Card>
  );
};

export default PropertyStatistics;
