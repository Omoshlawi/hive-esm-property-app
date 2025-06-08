import React, { FC } from "react";
import { Property } from "../../types";
import {
  Box,
  alpha,
  rem,
  Stack,
  Group,
  Text,
  useMantineTheme,
  useComputedColorScheme,
} from "@mantine/core";
import {
  IconUser,
  IconMapPin,
  IconCalendar,
  IconBuilding,
} from "@tabler/icons-react";

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
  const getBorderColor = () => {
    return colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3];
  };
  return (
    <Box
      mt="lg"
      pt="md"
      style={{
        borderTop: `1px solid ${getBorderColor()}`,
        backgroundColor:
          colorScheme === "dark"
            ? alpha(theme.colors.dark[7], 0.3)
            : alpha(theme.colors.gray[0], 0.5),
        marginLeft: rem(-16),
        marginRight: rem(-16),
        paddingLeft: rem(16),
        paddingRight: rem(16),
        borderRadius: `0 0 ${theme.radius.md} ${theme.radius.md}`,
      }}
    >
      <Stack gap="md">
        <Text size="sm" fw={600} c={getTextColor("primary")} mb="xs">
          Property Details
        </Text>

        <Group grow align="flex-start">
          <Stack gap="sm">
            <Group gap="xs">
              <IconUser size={16} style={{ color: getTextColor("dimmed") }} />
              <Text size="sm" fw={500} c={getTextColor("primary")}>
                Owner
              </Text>
            </Group>
            <Text size="sm" c={getTextColor("dimmed")} pl="xl">
              {"Not specified"}
            </Text>
          </Stack>

          <Stack gap="sm">
            <Group gap="xs">
              <IconMapPin size={16} style={{ color: getTextColor("dimmed") }} />
              <Text size="sm" fw={500} c={getTextColor("primary")}>
                Location
              </Text>
            </Group>
            <Text size="sm" c={getTextColor("dimmed")} pl="xl">
              {"Not specified"}
            </Text>
          </Stack>

          <Stack gap="sm">
            <Group gap="xs">
              <IconCalendar
                size={16}
                style={{ color: getTextColor("dimmed") }}
              />
              <Text size="sm" fw={500} c={getTextColor("primary")}>
                Last Updated
              </Text>
            </Group>
            <Text size="sm" c={getTextColor("dimmed")} pl="xl">
              {formatDate(property.updatedAt || property.createdAt)}
            </Text>
          </Stack>
        </Group>

        {property.description && (
          <Stack gap="sm">
            <Group gap="xs">
              <IconBuilding
                size={16}
                style={{ color: getTextColor("dimmed") }}
              />
              <Text size="sm" fw={500} c={getTextColor("primary")}>
                Description
              </Text>
            </Group>
            <Text
              size="sm"
              c={getTextColor("dimmed")}
              pl="xl"
              style={{
                lineHeight: 1.5,
                maxWidth: "100%",
                wordBreak: "break-word",
              }}
            >
              {property.description}
            </Text>
          </Stack>
        )}
      </Stack>
    </Box>
  );
};

export default BannerExpandedSection;
