import {
  EmptyState,
  ErrorState,
  launchWorkspace,
  When,
} from "@hive/esm-core-components";
import {
  Badge,
  Card,
  Center,
  Divider,
  Grid,
  Group,
  Loader,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import {
  IconCalendar,
  IconHome,
  IconMapPin,
  IconUser,
} from "@tabler/icons-react";
import React from "react";
import { useParams } from "react-router-dom";
import {
  ProfileCompletion,
  PropertyRecentActivities,
  PropertyStatistics,
  PropertyThumbnail,
} from "../components/overview";
import { useProperty } from "../hooks";

const PropertyDetailPage: React.FC = () => {
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
        return (
          <Stack gap="lg">
            {/* Property Overview Card */}
            <Stack gap="md">
              <PropertyThumbnail property={property} />
              <Card withBorder>
                <Text size="lg" fw={600}>
                  Description
                </Text>
                <Center>
                  <Text size="sm" c="dimmed" lineClamp={3}>
                    {property?.description
                      ? property.description
                      : "No Description"}
                  </Text>
                </Center>
              </Card>
            </Stack>

            <Grid>
              {/* Key Statistics */}
              <Grid.Col span={{ base: 12, md: 6 }}>
                <PropertyStatistics property={property} />
              </Grid.Col>

              {/* Profile Completion */}
              <Grid.Col span={{ base: 12, md: 6 }}>
                <ProfileCompletion property={property} />
              </Grid.Col>

              {/* Property Details */}
              <Grid.Col span={{ base: 12, md: 8 }}>
                <Card
                  shadow="sm"
                  padding="lg"
                  radius="md"
                  withBorder
                  h={"100%"}
                >
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
                <PropertyRecentActivities property={property} />
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
            </Grid>
          </Stack>
        );
      }}
    />
  );
};

export default PropertyDetailPage;
