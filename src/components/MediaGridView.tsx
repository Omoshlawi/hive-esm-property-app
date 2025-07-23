import { getHiveFileUrl } from "@hive/esm-core-api";
import {
  ActionIcon,
  Badge,
  Card,
  Group,
  Image,
  Menu,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import { openModal } from "@mantine/modals";
import {
  IconDots,
  IconDownload,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";
import { filesize } from "filesize";
import React from "react";
import { PropertyMedia, PropsWithLaunchWorkspace } from "../types";
import UpdateMediaMetadataForm from "../forms/media/UpdateMediaMetadataForm";

type MediaGridViewProps = PropsWithLaunchWorkspace & {
  media: Array<PropertyMedia>;
};

const MediaGridView: React.FC<MediaGridViewProps> = ({
  media,
  launchWorkspace,
}) => {
  const handleUpdate = (media: PropertyMedia) => {
    const dispose = launchWorkspace(
      <UpdateMediaMetadataForm
        propertyId={media.propertyId}
        media={media}
        onClose={() => dispose()}
      />,
      { title: "Update Media" }
    );
  };
  return (
    <SimpleGrid cols={{ base: 1, md: 2, lg: 4 }} spacing="md" m={"sm"}>
      {media.map((media_) => {
        const img = getHiveFileUrl(media_.url);

        return (
          <Card key={media_.id} p="xs" radius="md" shadow="sm" h={"100%"}>
            <Card.Section
              role="button"
              onClick={() =>
                openModal({
                  fullScreen: true,
                  title: media_.title,
                  children: (
                    <Image
                      src={img}
                      fit="contain"
                      fallbackSrc="https://placehold.co/600x400?text=Placeholder"
                      w={"100%"}
                      h={"100%"}
                    />
                  ),
                })
              }
            >
              <Image
                src={img}
                fit="cover"
                fallbackSrc="https://placehold.co/600x400?text=Placeholder"
                w={"100%"}
                height={"300"}
              />
            </Card.Section>
            <Stack gap="xs" mt="xs">
              <Group justify="space-between" align="flex-start">
                <Text size="xs" fw={500}>
                  {media_.title}
                </Text>
                <Menu>
                  <Menu.Target>
                    <ActionIcon size="xs" variant="subtle">
                      <IconDots size={12} />
                    </ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item
                      leftSection={<IconEdit size={12} />}
                      onClick={() => handleUpdate(media_)}
                    >
                      Edit
                    </Menu.Item>
                    <Menu.Item leftSection={<IconDownload size={12} />}>
                      Download
                    </Menu.Item>
                    <Menu.Item
                      leftSection={<IconTrash size={12} />}
                      color="red"
                    >
                      Delete
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Group>
              <Group>
                <Badge size="xs" variant="outline" color="green">
                  {media_.type}
                </Badge>
                <Badge size="xs" variant="outline">
                  {filesize(media_.metadata.size)}
                </Badge>
              </Group>
            </Stack>
          </Card>
        );
      })}
    </SimpleGrid>
  );
};

export default MediaGridView;
