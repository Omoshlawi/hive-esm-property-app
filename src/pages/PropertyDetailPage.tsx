import { EmptyState, ErrorState, When } from "@hive/esm-core-components";
import { PiletApi } from "@hive/esm-shell-app";
import {
  ActionIcon,
  Avatar,
  Badge,
  Card,
  Divider,
  Grid,
  Group,
  Image,
  Loader,
  RingProgress,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Timeline
} from "@mantine/core";
import {
  IconBuilding,
  IconCalendar,
  IconCheck,
  IconClock,
  IconEdit,
  IconHome,
  IconMapPin,
  IconShare,
  IconUser
} from "@tabler/icons-react";
import React from "react";
import { useParams } from "react-router-dom";
import { useProperty } from "../hooks";

type PropertyDetailPageProps = Pick<PiletApi, "launchWorkspace"> & {};
const PropertyDetailPage: React.FC<PropertyDetailPageProps> = ({
  launchWorkspace,
}) => {
  const { propertyId } = useParams<{ propertyId: string }>();
  const propertyAsync = useProperty(propertyId);
  return (
    <When
      asyncState={{ ...propertyAsync, data: propertyAsync.property }}
      elseRender={() => (
        <EmptyState
          title="Property Summary"
          message="No summary report for this property"
          onAdd={() =>
            launchWorkspace(<>Add here</>, { expandable: true, width: "wide" })
          }
        />
      )}
      error={(err) => <ErrorState error={err} title="Property summary" />}
      loading={() => <Loader />}
      success={(property) => {
        const completionPercentage = calculateCompletionPercentage(property);

        return (
          <Stack gap="lg">
            {/* Property Overview Card */}
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Stack gap="md">
                <Group justify="space-between">
                  <Text size="lg" fw={600}>
                    Property Overview
                  </Text>
                  <Group gap="xs">
                    <ActionIcon variant="light" color="blue">
                      <IconEdit size={16} />
                    </ActionIcon>
                    <ActionIcon variant="light" color="green">
                      <IconShare size={16} />
                    </ActionIcon>
                  </Group>
                </Group>

                <Group align="flex-start" gap="lg">
                  {property.thumbnail ? (
                    <Image
                      src={property.thumbnail}
                      alt={property.name}
                      width={120}
                      height={120}
                      radius="md"
                      fallbackSrc="https://placehold.co/600x500?text=Placeholder"
                    />
                  ) : (
                    <Avatar size={120} radius="md">
                      <IconBuilding size={60} />
                    </Avatar>
                  )}

                  <Stack gap="xs" style={{ flex: 1 }}>
                    <Group gap="xs">
                      <Text size="xl" fw={700}>
                        {property.name}
                      </Text>
                      <Badge
                        color={getStatusColor(property.status)}
                        variant="filled"
                      >
                        {property.status}
                      </Badge>
                    </Group>

                    {property.description && (
                      <Text size="sm" c="dimmed" lineClamp={3}>
                        {property.description}
                      </Text>
                    )}
                  </Stack>
                </Group>
              </Stack>
            </Card>

            <Grid>
              {/* Key Statistics */}
              <Grid.Col span={{ base: 12, md: 6 }}>
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
                          {0}
                        </Text>
                        <Text size="sm" c="dimmed">
                          Photos
                        </Text>
                      </div>
                    </SimpleGrid>
                  </Stack>
                </Card>
              </Grid.Col>

              {/* Profile Completion */}
              <Grid.Col span={{ base: 12, md: 6 }}>
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
                          color:
                            completionPercentage >= 80 ? "green" : "orange",
                        },
                      ]}
                      label={
                        <Text
                          size="xs"
                          ta="center"
                          px="xs"
                          style={{ pointerEvents: "none" }}
                        >
                          {completionPercentage >= 80
                            ? "Complete"
                            : "Needs Work"}
                        </Text>
                      }
                      style={{ alignSelf: "center" }}
                    />

                    <Stack gap="xs">
                      <CompletionItem
                        completed={!!property.name}
                        label="Property Name"
                      />
                      <CompletionItem
                        completed={!!property.description}
                        label="Description"
                      />
                      <CompletionItem
                        completed={!!property.thumbnail}
                        label="Main Photo"
                      />
                      <CompletionItem
                        completed={!!property.address}
                        label="Address"
                      />
                      <CompletionItem
                        completed={
                          property.amenities && property.amenities.length > 0
                        }
                        label="Amenities"
                      />
                    </Stack>
                  </Stack>
                </Card>
              </Grid.Col>

              {/* Property Details */}
              <Grid.Col span={{ base: 12, md: 8 }}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Stack gap="md">
                    <Text size="lg" fw={600}>
                      Property Details
                    </Text>

                    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                      <Stack gap="xs">
                        <Group gap="xs">
                          <IconMapPin size={16} color="gray" />
                          <Text fw={500}>Location</Text>
                        </Group>
                        <Text size="sm" c="dimmed" pl="lg">
                          {property.address
                            ? `${property.address.county || ""} ${
                                property.address.subCounty || ""
                              } ${property.address.ward || ""}`.trim() ||
                              "Address not set"
                            : "Address not set"}
                        </Text>
                      </Stack>

                      <Stack gap="xs">
                        <Group gap="xs">
                          <IconHome size={16} color="gray" />
                          <Text fw={500}>Organization</Text>
                        </Group>
                        <Text size="sm" c="dimmed" pl="lg">
                          {property.organization?.name || "Not specified"}
                        </Text>
                      </Stack>

                      <Stack gap="xs">
                        <Group gap="xs">
                          <IconCalendar size={16} color="gray" />
                          <Text fw={500}>Created</Text>
                        </Group>
                        <Text size="sm" c="dimmed" pl="lg">
                          {new Date(property.createdAt).toLocaleDateString()}
                        </Text>
                      </Stack>

                      <Stack gap="xs">
                        <Group gap="xs">
                          <IconUser size={16} color="gray" />
                          <Text fw={500}>Property ID</Text>
                        </Group>
                        <Text size="sm" c="dimmed" pl="lg" ff="monospace">
                          {property.id.slice(0, 8)}...
                        </Text>
                      </Stack>
                    </SimpleGrid>

                    {/* Room Details */}
                    {property.attributes.length > 0 && (
                      <>
                        <Divider />
                        <Group gap="lg">
                          {property.attributes.map((attr) => (
                            <Group gap="xs" key={attr.id}>
                              <Text fw={500}>{attr.attribute.name}:</Text>
                              <Badge variant="light">{attr.value}</Badge>
                            </Group>
                          ))}
                        </Group>
                      </>
                    )}
                  </Stack>
                </Card>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Stack gap="md">
                    <Text size="lg" fw={600}>
                      Property Details
                    </Text>

                    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                      <Stack gap="xs">
                        <Group gap="xs">
                          <IconMapPin size={16} color="gray" />
                          <Text fw={500}>Location</Text>
                        </Group>
                        <Text size="sm" c="dimmed" pl="lg">
                          {property.address
                            ? `${property.address.county || ""} ${
                                property.address.subCounty || ""
                              } ${property.address.ward || ""}`.trim() ||
                              "Address not set"
                            : "Address not set"}
                        </Text>
                      </Stack>

                      <Stack gap="xs">
                        <Group gap="xs">
                          <IconHome size={16} color="gray" />
                          <Text fw={500}>Organization</Text>
                        </Group>
                        <Text size="sm" c="dimmed" pl="lg">
                          {property.organization?.name || "Not specified"}
                        </Text>
                      </Stack>

                      <Stack gap="xs">
                        <Group gap="xs">
                          <IconCalendar size={16} color="gray" />
                          <Text fw={500}>Created</Text>
                        </Group>
                        <Text size="sm" c="dimmed" pl="lg">
                          {new Date(property.createdAt).toLocaleDateString()}
                        </Text>
                      </Stack>

                      <Stack gap="xs">
                        <Group gap="xs">
                          <IconUser size={16} color="gray" />
                          <Text fw={500}>Property ID</Text>
                        </Group>
                        <Text size="sm" c="dimmed" pl="lg" ff="monospace">
                          {property.id.slice(0, 8)}...
                        </Text>
                      </Stack>
                    </SimpleGrid>

                    {/* Room Details */}
                    {property.attributes.length > 0 && (
                      <>
                        <Divider />
                        <Group gap="lg">
                          {property.attributes.map((attr) => (
                            <Group gap="xs" key={attr.id}>
                              <Text fw={500}>{attr.attribute.name}:</Text>
                              <Badge variant="light">{attr.value}</Badge>
                            </Group>
                          ))}
                        </Group>
                      </>
                    )}
                  </Stack>
                </Card>
              </Grid.Col>

              {/* Categories & Amenities */}
              {(property.categories?.length > 0 ||
                property.amenities?.length > 0) && (
                <Grid.Col span={12}>
                  <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Stack gap="md">
                      <Text size="lg" fw={600}>
                        Categories & Amenities
                      </Text>

                      <Group gap="lg" align="flex-start">
                        {property.categories &&
                          property.categories.length > 0 && (
                            <Stack gap="xs" style={{ flex: 1 }}>
                              <Text fw={500} size="sm">
                                Categories
                              </Text>
                              <Group gap="xs">
                                {property.categories
                                  .slice(0, 5)
                                  .map((category) => (
                                    <Badge
                                      key={category.id}
                                      variant="light"
                                      color="blue"
                                    >
                                      {category.category?.name}
                                    </Badge>
                                  ))}
                                {property.categories.length > 5 && (
                                  <Badge variant="light" color="gray">
                                    +{property.categories.length - 5} more
                                  </Badge>
                                )}
                              </Group>
                            </Stack>
                          )}

                        {property.amenities &&
                          property.amenities.length > 0 && (
                            <Stack gap="xs" style={{ flex: 1 }}>
                              <Text fw={500} size="sm">
                                Amenities
                              </Text>
                              <Group gap="xs">
                                {property.amenities
                                  .slice(0, 6)
                                  .map((amenity) => (
                                    <Badge
                                      key={amenity.id}
                                      variant="outline"
                                      color="green"
                                    >
                                      {amenity.amenity?.name}
                                    </Badge>
                                  ))}
                                {property.amenities.length > 6 && (
                                  <Badge variant="outline" color="gray">
                                    +{property.amenities.length - 6} more
                                  </Badge>
                                )}
                              </Group>
                            </Stack>
                          )}
                      </Group>
                    </Stack>
                  </Card>
                </Grid.Col>
              )}

              {/* Recent Activity Timeline */}
              <Grid.Col span={12}>
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
              </Grid.Col>
            </Grid>
          </Stack>
        );
      }}
    />
  );
};

export default PropertyDetailPage;

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

// Helper Functions
function getStatusColor(status: string) {
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
}

function calculateCompletionPercentage(property: any): number {
  const checks = [
    !!property.name,
    !!property.description,
    !!property.thumbnail,
    !!property.address,
    property.media && property.media.length > 0,
    property.amenities && property.amenities.length > 0,
    !!property.price,
    !!property.type,
  ];

  const completed = checks.filter(Boolean).length;
  return Math.round((completed / checks.length) * 100);
}
