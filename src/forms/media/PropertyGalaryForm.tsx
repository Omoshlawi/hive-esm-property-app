import { cleanFiles, handleApiErrors, uploadFiles } from "@hive/esm-core-api";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Accordion,
  Avatar,
  Button,
  Card,
  Checkbox,
  Group,
  Image,
  SimpleGrid,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { showNotification } from "@mantine/notifications";
import React, { FC, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";
import MediaFormInputFields from "./MediaFormInputFields";
import { usePropertiesApi } from "../../hooks";
import { PropertyMediaSchema } from "../../utils/validation";
import { PropertyMedia, PropertyMediaFormData } from "../../types";

type ListingGalaryFormProps = {
  propertyId: string;
  onClose?: () => void;
  onSuccess?: (media: Array<PropertyMedia>) => void;
};

const FormSchema = z.object({
  media: PropertyMediaSchema.omit({ url: true, metadata: true }).array(),
});
type FormData = z.infer<typeof FormSchema>;

const PropertyGalaryForm: FC<ListingGalaryFormProps> = ({
  propertyId,
  onClose,
  onSuccess,
}) => {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [loading, setLoading] = useState(false);
  const [includeMetaData, setIncludeMetadata] = useState(false);
  const { addPropertyMedia, mutateProperties } = usePropertiesApi();
  const theme = useMantineTheme();
  const form = useForm<FormData>({
    defaultValues: { media: [] },
    resolver: zodResolver(FormSchema),
  });
  const media = form.watch("media") ?? [];

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Card h={"100%"} radius={0} withBorder role="button" padding={0}>
        <Image
          key={index}
          src={imageUrl}
          onLoad={() => URL.revokeObjectURL(imageUrl)}
          h={"100%"}
          w={"100%"}
          fit="cover"
        />
      </Card>
    );
  });

  const handleUpload = async () => {
    try {
      setLoading(true);
      const valid = await form.trigger();
      if (includeMetaData && !valid) return;
      const uploaded = await uploadFiles({
        files: { images: files },
        path: "galary",
      });
      const _files = uploaded["images"];
      const media = await Promise.allSettled(
        _files.map(async (f, i) => {
          const data = form.getValues();
          return await addPropertyMedia(propertyId, {
            type: "IMAGE",
            url: f.path,
            title: data?.media[i].title,
            description: data?.media[i]?.description,
            metadata: {
              memeType: f.memeType,
              size: Number(f.bytesSize),
              id: f.id,
            },
          });
        })
      );
      media.forEach((m, i) => {
        if (m.status === "rejected") {
          const error = handleApiErrors(m.reason);
          showNotification({
            color: "red",
            title: "Error adding media, rolling back upload",
            message: error.detail,
          });
          cleanFiles([_files[i].path]);
        }
      });
      const succesfull = media.filter((m) => m.status === "fulfilled");
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
    <FormProvider {...form}>
      <Stack justify="space-between">
        <Stack>
          <Dropzone
            accept={IMAGE_MIME_TYPE}
            onDrop={(f) => {
              setFiles(f);
              const _f = Array.from<PropertyMediaFormData>({
                length: f.length,
              }).fill({ type: "IMAGE" });
              form.setValue("media", _f);
            }}
            loading={loading}
            disabled={loading}
          >
            <Text ta="center">Drop images here</Text>
          </Dropzone>
          <SimpleGrid cols={{ base: 1, sm: 4 }}>{previews}</SimpleGrid>
          <Checkbox
            label="Include Title and description"
            checked={includeMetaData}
            onChange={(event) =>
              setIncludeMetadata(event.currentTarget.checked)
            }
          />
          {includeMetaData && (
            <Accordion>
              {media.map((m, i) => {
                const img = URL.createObjectURL(files[i]);
                const title = media[i].title ?? "No title";
                const type = media[i].description ?? "No description";
                return (
                  <Accordion.Item value={`${i}`} key={i}>
                    <Accordion.Control>
                      <Group wrap="nowrap">
                        <Avatar
                          src={img}
                          radius="xl"
                          onLoad={() => URL.revokeObjectURL(img)}
                          size="lg"
                        />
                        <div>
                          <Text>{title}</Text>
                          <Text size="sm" c="dimmed" fw={400}>
                            {type}
                          </Text>
                        </div>
                      </Group>
                    </Accordion.Control>
                    <Accordion.Panel>
                      <MediaFormInputFields index={i} />
                    </Accordion.Panel>
                  </Accordion.Item>
                );
              })}
            </Accordion>
          )}
          <Group justify="flex-end">
            <Button
              onClick={() => {
                form.setValue("media", []);
                setFiles([]);
              }}
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
      </Stack>
    </FormProvider>
  );
};

export default PropertyGalaryForm;
