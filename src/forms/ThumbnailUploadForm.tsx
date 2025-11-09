import { cleanFiles, handleApiErrors, uploadFile } from "@havena/esm-core-api";
import { Button, Group, Image, SimpleGrid, Stack, Text } from "@mantine/core";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { showNotification } from "@mantine/notifications";
import React, { FC, useState } from "react";
import { usePropertiesApi } from "../hooks";
import { Property } from "../types";

type ThumbnailUploadFormProps = {
  property: Property;
  onClose?: () => void;
  onSuccess?: (property: Property) => void;
};

const ThumbnailUploadForm: FC<ThumbnailUploadFormProps> = ({
  property,
  onClose,
  onSuccess,
}) => {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [loading, setLoading] = useState(false);
  const { updateProperty, mutateProperties } = usePropertiesApi();
  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        key={index}
        src={imageUrl}
        onLoad={() => URL.revokeObjectURL(imageUrl)}
      />
    );
  });

  const handleUpload = async () => {
    try {
      setLoading(true);
      const uploaded = await uploadFile({
        file: files[0],
        relatedModelName: "Property",
        relatedModelId: property.id,
        purpose: "thumbnail",
        tags: ["thumbnail", "property", "image"],
      });
      if (uploaded?.blob?.storageUrl) {
        const updatedProperty = await updateProperty(property.id, {
          thumbnail: uploaded?.blob?.storageUrl,
        });
        if (property.thumbnail) await cleanFiles([property.thumbnail]);
        onSuccess?.(updatedProperty);
      }
      showNotification({
        title: `Upload complete`,
        message: `Thumnail Uploaded succesfully`,
        color: "green",
        position: "top-right",
      });
      mutateProperties();
      onClose?.();
    } catch (error) {
      const e = handleApiErrors(error);
      if (e.detail) {
        showNotification({
          title: `Error Uploading image`,
          message: e.detail,
          color: "red",
          position: "top-right",
        });
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Stack>
      <Dropzone
        accept={IMAGE_MIME_TYPE}
        onDrop={setFiles}
        loading={loading}
        disabled={loading}
        multiple={false}
      >
        <Text ta="center">Drop images here</Text>
      </Dropzone>
      <SimpleGrid cols={{ base: 1, sm: 4 }}>{previews}</SimpleGrid>
      <Group justify="flex-end">
        <Button
          onClick={() => setFiles([])}
          disabled={files?.length === 0 || loading}
          variant="default"
        >
          Clear
        </Button>
        <Button
          onClick={handleUpload}
          disabled={files?.length === 0 || loading}
          loading={loading}
        >
          Upload
        </Button>
      </Group>
    </Stack>
  );
};

export default ThumbnailUploadForm;
