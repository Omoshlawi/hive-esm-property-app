import { handleApiErrors, uploadFiles } from "@hive/esm-core-api";
import { Button, Group, Image, SimpleGrid, Stack, Text } from "@mantine/core";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { showNotification } from "@mantine/notifications";
import React, { FC, useState } from "react";
import { usePropertiesApi } from "../hooks";
import { PropertyMedia } from "../types";

type PropertyGalaryFormProps = {
  propertyId: string;
  onClose?: () => void;
  onSuccess?: (docs: Array<PropertyMedia>) => void;
};

const PropertyGalaryForm: FC<PropertyGalaryFormProps> = ({
  propertyId,
  onClose,
  onSuccess,
}) => {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [loading, setLoading] = useState(false);
  const { addPropertyMedia, mutateProperties } = usePropertiesApi();
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
      const uploaded = await uploadFiles({
        files: { images: files },
        path: "galary",
      });
      const _files = uploaded["images"];
      const media = await Promise.allSettled(
        _files.map(async (f) => {
          return await addPropertyMedia(propertyId, {
            type: "IMAGE",
            url: f.path,
            metadata: {
              memeType: f.memeType,
              size: Number(f.bytesSize),
              id: f.id,
            },
          });
        })
      );
      const succesfull = media.filter((m) => m.status === "fulfilled");
      const failed = media.filter((m) => m.status === "rejected");
      showNotification({
        title: `Upload complete`,
        message: `${succesfull.length} out of ${media.length} Uploaded succesfully`,
        color: "green",
        position: "top-right",
      });
      onSuccess?.(succesfull.map((s) => s.value));
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
      >
        <Text ta="center">Drop images here</Text>
      </Dropzone>
      <SimpleGrid cols={{ base: 1, sm: 4 }}>{previews}</SimpleGrid>
      <Group justify="flex-end">
        <Button
          onClick={() => setFiles([])}
          disabled={files.length === 0 || loading}
          variant="default"
        >
          Clear
        </Button>
        <Button
          onClick={handleUpload}
          disabled={files.length === 0 || loading}
          loading={loading}
        >
          Upload
        </Button>
      </Group>
    </Stack>
  );
};

export default PropertyGalaryForm;
