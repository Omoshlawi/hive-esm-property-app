import React, { FC, useEffect, useState } from "react";
import { PropertyMedia, PropertyMediaFormData } from "../types";
import {
  APIFetchResponse,
  handleApiErrors,
  mutate,
  uploadFiles,
} from "@hive/esm-core-api";
import { usePropertiesApi } from "../hooks";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PropertyMediaSchema } from "../utils/validation";
import { showNotification } from "@mantine/notifications";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import {
  ActionIcon,
  Button,
  Group,
  Image,
  NumberInput,
  Select,
  SimpleGrid,
  Stack,
  Textarea,
  TextInput,
  Text,
} from "@mantine/core";
type PropertyMediaFormProps = {
  onSuccess?: (media: PropertyMedia[]) => void;
  propertyMedia?: PropertyMedia;
  propertyId: string;
  mediaType: PropertyMediaFormData["type"];
  closeWorkspace?: () => void;
};

const PropertyMediForm: FC<PropertyMediaFormProps> = ({
  mediaType,
  propertyId,
  onSuccess,
  propertyMedia,
  closeWorkspace,
}) => {
  const { addPropertyMedia, updatePropertyMedia } = usePropertiesApi();
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const form = useForm<PropertyMediaFormData>({
    defaultValues: {
      type: mediaType,
    },
    resolver: zodResolver(PropertyMediaSchema),
  });

  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [loading, setLoading] = useState(false);
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
        path: "images",
      });
      showNotification({
        title: `Success`,
        message: `Media uploaded succesfully`,
        color: "green",
        position: "top-right",
      });
      return uploaded["images"];
    } catch (error) {
      const e = handleApiErrors(error);
      if (e.detail) {
        showNotification({
          title: `Error Uploading media image`,
          message: e.detail,
          color: "red",
          position: "top-right",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const onSubmit: SubmitHandler<PropertyMediaFormData> = async (data) => {
    try {
      showNotification({
        title: "succes",
        message: `property media ${
          propertyMedia ? "updated" : "created"
        } succesfull`,
        color: "teal",
      });
      mutate(`/properties/${propertyId}/media`);
    } catch (error) {
      const e = handleApiErrors<PropertyMediaFormData>(error);
      if (e.detail) {
        showNotification({ title: "error", message: e.detail, color: "red" });
      } else
        Object.entries(e).forEach(([key, val]) =>
          form.setError(key as keyof PropertyMediaFormData, { message: val })
        );
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Stack p={"md"} h={"100%"} justify="space-between">
        <Stack gap={"md"}>
            <Dropzone
              accept={IMAGE_MIME_TYPE}
              onDrop={setFiles}
              loading={loading}
              disabled={loading}
            >
              <Text ta="center">Drop images here</Text>
            </Dropzone>
            <SimpleGrid cols={{ base: 1, sm: 4 }}>{previews}</SimpleGrid>
          <Controller
            control={form.control}
            name="title"
            render={({ field, fieldState }) => (
              <TextInput
                {...field}
                label="Title"
                error={fieldState.error?.message}
                placeholder="e.g certificate"
              />
            )}
          />
          <Controller
            control={form.control}
            name="type"
            render={({ field, fieldState }) => (
              <Select
                data={[
                  { value: "IDENTITY", label: "Identity" },
                  { value: "ACADEMIC", label: "Academic" },
                  { value: "PROFESSIONAL", label: "Professional" },
                  { value: "VEHICLE", label: "Vehicle" },
                  { value: "FINANCIAL", label: "Financial" },
                  { value: "MEDICAL", label: "Medical" },
                  { value: "LEGAL", label: "Legal" },
                  { value: "OTHER", label: "Other" },
                ]}
                label="Media type"
                value={field.value}
                placeholder="Document type category"
                onChange={(_value, option) => field.onChange(_value)}
                error={fieldState.error?.message}
                ref={field.ref}
                clearable
              />
            )}
          />
          <Controller
            control={form.control}
            name="order"
            render={({ field, fieldState }) => (
              <NumberInput
                {...field}
                label="Order"
                error={fieldState.error?.message}
                placeholder="Used to sort while displaying"
              />
            )}
          />

          <Controller
            control={form.control}
            name="description"
            render={({ field, fieldState }) => (
              <Textarea
                {...field}
                value={field.value as string}
                placeholder="Description ..."
                label="Description"
                error={fieldState.error?.message}
              />
            )}
          />
        </Stack>
        <Group gap={1}>
          <Button
            flex={1}
            variant="default"
            radius={0}
            onClick={closeWorkspace}
          >
            Cancel
          </Button>
          <Button
            radius={0}
            flex={1}
            fullWidth
            type="submit"
            variant="filled"
            loading={form.formState.isSubmitting}
            disabled={form.formState.isSubmitting}
          >
            Submit
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

export default PropertyMediForm;
