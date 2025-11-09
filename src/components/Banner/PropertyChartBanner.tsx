import { ContextualBanner, TablerIcon } from "@havena/esm-core-components";
import {
  Badge,
  useComputedColorScheme,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import React from "react";
import { useProperty } from "../../hooks";
import { Property } from "../../types";
import { getStatusColor, getStatusVariant } from "../../utils/helpers";
import BannerExpandedSection from "./BannerExpandedSection";

interface PropertyBannerProps {
  propertyId: string;
  Extension: React.ComponentType<{ name: string; params: Record<string, any> }>;
  color?: string;
}

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

export function PropertyChartBanner({
  propertyId,
  Extension,
  color = "green",
}: PropertyBannerProps) {
  const propertyAsync = useProperty(propertyId);
  const colorScheme = useComputedColorScheme();

  return (
    <ContextualBanner<Property>
      {...propertyAsync}
      data={propertyAsync.property}
      renderTitle={(listing) => listing.name}
      icon="building"
      color={color}
      iconVisbleFrom="sm"
      renderId={(l) => l.propertyNumber}
      renderTimeStamp={(l) => `Created ${formatDate(l.createdAt)}`}
      renderBadges={(l) => (
        <>
          <Badge
            size="sm"
            color={getStatusColor(l.status)}
            variant={getStatusVariant(l.status, colorScheme)}
            style={{
              textTransform: "capitalize",
              fontWeight: 500,
            }}
          >
            {l.status.replace("_", " ")}
          </Badge>
          {l.isVirtual && (
            <Tooltip label="This property is not an actual/physical structure or place. It is a group of properties that can be processed as a single entity.">
              <Badge
                size="sm"
                color="red"
                variant="dot"
                style={{
                  textTransform: "capitalize",
                  fontWeight: 500,
                }}
              >
                {"VIRTUAL"}
              </Badge>
            </Tooltip>
          )}
        </>
      )}
      renderExpandedSection={(l) => <BannerExpandedSection property={l} />}
      renderMenuExtensionSlot={(l) => (
        <Extension
          name="property-chart-banner-actions-extension-slot"
          params={{}}
        />
      )}
    />
  );
}
