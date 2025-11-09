import React, { FC } from "react";
import { Property } from "../../types";
import { Button, Card, Center, Image, Stack, Text } from "@mantine/core";
import { getHiveFileUrl } from "@havena/esm-core-api";
import { TablerIcon } from "@havena/esm-core-components";
import { closeModal, openModal } from "@mantine/modals";
import ThumbnailUploadForm from "../../forms/ThumbnailUploadForm";

type Props = {
  property: Property;
};

const PropertyThumbnail: FC<Props> = ({ property }) => {
  const handleUploadThumbnail = () => {
    const modalId = openModal({
      title: "Upload Thumbnail",
      children: (
        <ThumbnailUploadForm
          property={property}
          onClose={() => closeModal(modalId)}
        />
      ),
    });
  };
  if (property.thumbnail)
    return (
      <Image
        src={getHiveFileUrl(property.thumbnail)}
        alt={property.name}
        width={120}
        height={420}
        radius="md"
        fallbackSrc="https://placehold.co/600x500?text=Placeholder"
      />
    );
  return (
    <Card withBorder radius={"md"}>
      <Center>
        <Stack align="center" justify="center">
          <TablerIcon name="photoCancel" size={80} opacity={0.5} />
          <Text c={"dimmed"}>Thumbnail image not Uploaded</Text>
          <Button
            radius={"xl"}
            leftSection={<TablerIcon name="upload" size={16} />}
            variant="gradient"
            gradient={{ from: "red", to: "green" }}
            onClick={handleUploadThumbnail}
          >
            Upload Thumbnail
          </Button>
        </Stack>
      </Center>
    </Card>
  );
};

export default PropertyThumbnail;
