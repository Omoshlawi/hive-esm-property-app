import { handleApiErrors } from "@hive/esm-core-api";
import { When } from "@hive/esm-core-components";
import {
  Alert,
  Avatar,
  Badge,
  Box,
  Collapse,
  Divider,
  Group,
  Paper,
  Stack,
  Text,
  alpha,
  rem,
  useComputedColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconBuilding,
  IconCalendar,
  IconInfoCircle,
} from "@tabler/icons-react";
import React from "react";
import { useProperty } from "../../hooks";
import BannerExpandedSection from "./BannerExpandedSection";
import BannerloadingSkeleton from "./BannerloadingSkeleton";
import DesktopActions from "./DesktopActions";
import MobileActions from "./MobileActions";

interface PropertyBannerProps {
  propertyId: string;
}

// Enhanced status color mapping with better visual hierarchy
const getStatusColor = (status: string) => {
  switch (status) {
    case "Published":
      return "green";
    case "Draft":
      return "blue";
    case "Under_Review":
      return "orange";
    case "Archived":
      return "gray";
    default:
      return "gray";
  }
};

// Enhanced status variant for better visibility
const getStatusVariant = (status: string, colorScheme: string) => {
  if (status === "Published") return "filled";
  if (colorScheme === "dark") return "light";
  return "light";
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

export function PropertyChartBanner({ propertyId }: PropertyBannerProps) {
  const propertyAsync = useProperty(propertyId);
  const theme = useMantineTheme();
  const colorScheme = useComputedColorScheme();
  const [expanded, { toggle }] = useDisclosure(false);

  const getBannerBackground = () => {
    if (colorScheme === "dark") {
      return `linear-gradient(135deg, ${theme.colors.dark[8]} 0%, ${theme.colors.dark[7]} 50%, ${theme.colors.dark[6]} 100%)`;
    }
    return `linear-gradient(135deg, ${theme.colors.gray[0]} 0%, ${alpha(
      theme.colors.blue[0],
      0.3
    )} 50%, ${theme.colors.gray[1]} 100%)`;
  };

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
    <When
      asyncState={{
        ...propertyAsync,
        data: propertyAsync.property,
      }}
      error={(e) => {
        const error = handleApiErrors(e);
        return (
          <Alert
            title="Error loading property"
            color="red"
            icon={<IconInfoCircle size={16} />}
            style={{ margin: theme.spacing.md }}
          >
            {error?.detail || "An unexpected error occurred"}
          </Alert>
        );
      }}
      loading={() => <BannerloadingSkeleton />}
      success={(property) => (
        <Box>
          <Paper
            p="md"
            mb={0}
            style={{
              background: getBannerBackground(),
              borderEndEndRadius: 0,
              borderEndStartRadius: 0,
              border: `1px solid ${getBorderColor()}`,
              transition: "all 0.2s ease",
            }}
          >
            <Group justify="space-between" align="flex-start">
              <Group gap="md" style={{ flex: 1, minWidth: 0 }}>
                <Avatar
                  size={50}
                  color="blue"
                  radius="sm"
                  style={{
                    flexShrink: 0,
                    boxShadow:
                      colorScheme === "dark"
                        ? `0 2px 8px ${alpha(theme.colors.blue[7], 0.3)}`
                        : `0 2px 8px ${alpha(theme.colors.blue[2], 0.4)}`,
                  }}
                >
                  <IconBuilding size={24} />
                </Avatar>

                <Stack gap="xs" style={{ flex: 1, minWidth: 0 }}>
                  <Group gap="xs" align="center" wrap="wrap">
                    <Text
                      fw={600}
                      size="lg"
                      c={getTextColor("primary")}
                      style={{
                        wordBreak: "break-word",
                        minWidth: 0,
                        lineHeight: 1.3,
                      }}
                    >
                      {property.name}
                    </Text>
                    <Badge
                      size="sm"
                      color={getStatusColor(property.status)}
                      variant={getStatusVariant(property.status, colorScheme)}
                      style={{
                        textTransform: "capitalize",
                        fontWeight: 500,
                      }}
                    >
                      {property.status.replace("_", " ")}
                    </Badge>
                  </Group>

                  <Group gap="xs" wrap="wrap">
                    <Text
                      size="sm"
                      c={getTextColor("dimmed")}
                      style={{
                        fontFamily: "monospace",
                        fontSize: rem(11),
                        backgroundColor:
                          colorScheme === "dark"
                            ? alpha(theme.colors.dark[6], 0.5)
                            : alpha(theme.colors.gray[2], 0.5),
                        padding: `${rem(2)} ${rem(6)}`,
                        borderRadius: theme.radius.xs,
                      }}
                    >
                      ID: {property.id.slice(0, 8)}...
                    </Text>
                    <Text size="sm" c={getTextColor("dimmed")}>
                      •
                    </Text>
                    <Text
                      size="sm"
                      c={getTextColor("dimmed")}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: rem(4),
                      }}
                    >
                      <IconCalendar size={12} />
                      Created {formatDate(property.createdAt)}
                    </Text>
                  </Group>
                </Stack>
              </Group>

              {/* Desktop Actions */}
              <DesktopActions expanded={expanded} onTogleExpand={toggle} />

              {/* Mobile Actions */}
              <MobileActions expanded={expanded} onToggleExpand={toggle} />
            </Group>
            {/* Enhanced Expandable Content */}
            {/* TODO Throws an error `If you want to write it to the DOM, pass a string instead: inert="true" or inert={value.toString()}`.the issue is in the Colapse component, try removing even children, still throws error */}
            <Collapse in={expanded}>
              <BannerExpandedSection property={property} />
            </Collapse>
          </Paper>
          <Divider color={getBorderColor()} />
        </Box>
      )}
    />
  );
}
