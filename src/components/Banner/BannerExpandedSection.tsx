import { TablerIcon, TablerIconName } from "@hive/esm-core-components";
import {
  Card,
  Chip,
  Group,
  SimpleGrid,
  Stack,
  Table,
  Text,
  useComputedColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { IconBuilding } from "@tabler/icons-react";
import React, { FC } from "react";
import { Property } from "../../types";

type BannerExpandedSectionProps = {
  property: Property;
};

// Format date helper with relative time
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const BannerExpandedSection: FC<BannerExpandedSectionProps> = ({
  property,
}) => {
  const theme = useMantineTheme();
  const colorScheme = useComputedColorScheme();
  const getTextColor = (type: "primary" | "dimmed") => {
    if (colorScheme === "dark") {
      return type === "primary" ? theme.colors.gray[0] : theme.colors.gray[5];
    }
    return type === "primary" ? theme.colors.gray[9] : theme.colors.gray[6];
  };
  const attrs: Array<{ icon: TablerIconName; label: string; value: string }> = [
    {
      icon: "mapPin",
      value: `${property.address?.landmark}`,
      label: "Landmark",
    },
    {
      icon: "addressBook",
      value: `${property.address?.ward}  ${property.address?.subCounty}  ${property?.address?.county}`,
      label: "Address",
    },
    {
      icon: "building",
      value: property.categories?.map((c) => c.category?.name).join(", "),
      label: "Property",
    },
    {
      icon: "calendar",
      value: formatDate(property.updatedAt || property.createdAt),
      label: "Last updated",
    },
  ];
  return (
    <Stack gap="md">
      <Text size="sm" fw={600} c={getTextColor("primary")} mb="xs">
        Property Details
      </Text>
      <Table withColumnBorders withTableBorder withRowBorders>
        <Table.Tr>
          <Table.Td>
            <Stack>
              <Group gap="xs">
                <TablerIcon
                  name={"mapPin"}
                  size={16}
                  style={{ color: getTextColor("dimmed") }}
                />
                <Text size="sm" fw={500} c={getTextColor("primary")}>
                  {"Landmark"}
                </Text>
              </Group>
              <Text size="sm" c={getTextColor("dimmed")}>
                {property.address?.landmark}
              </Text>
            </Stack>
          </Table.Td>
          <Table.Td>
            <Stack>
              <Group gap="xs">
                <TablerIcon
                  name={"addressBook"}
                  size={16}
                  style={{ color: getTextColor("dimmed") }}
                />
                <Text size="sm" fw={500} c={getTextColor("primary")}>
                  {"Adress"}
                </Text>
              </Group>
              <Text size="sm" c={getTextColor("dimmed")}>
                {`${property.address?.ward}  ${property.address?.subCounty}  ${property?.address?.county}`}
              </Text>
            </Stack>
          </Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Td>
            <Stack>
              <Group gap="xs">
                <TablerIcon
                  name={"category"}
                  size={16}
                  style={{ color: getTextColor("dimmed") }}
                />
                <Text size="sm" fw={500} c={getTextColor("primary")}>
                  {"Category"}
                </Text>
              </Group>
              <Group gap={"xs"}>
                {property.categories?.map((c) => (
                  <Chip size="xs">{c.category?.name}</Chip>
                ))}
              </Group>
            </Stack>
          </Table.Td>
          <Table.Td>
            <Stack>
              <Group gap="xs">
                <TablerIcon
                  name={"adjustments"}
                  size={16}
                  style={{ color: getTextColor("dimmed") }}
                />
                <Text size="sm" fw={500} c={getTextColor("primary")}>
                  {"Amenities"}
                </Text>
              </Group>
              <Group gap={"xs"}>
                {property.amenities?.map((c) => (
                  <Chip size="xs">{c.amenity?.name}</Chip>
                ))}
              </Group>
            </Stack>
          </Table.Td>
        </Table.Tr>
      </Table>
      {property.description && (
        <Text
          size="sm"
          c={getTextColor("dimmed")}
          style={{
            lineHeight: 1.5,
            maxWidth: "100%",
            wordBreak: "break-word",
          }}
        >
          {property.description}
        </Text>
      )}
    </Stack>
  );
};

export default BannerExpandedSection;
