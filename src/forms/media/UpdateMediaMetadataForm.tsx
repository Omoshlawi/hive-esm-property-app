import { handleApiErrors } from "@havena/esm-core-api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Group, Stack, Textarea, TextInput } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import React, { FC } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { usePropertiesApi } from "../../hooks";
import { PropertyMedia, PropertyMediaFormData } from "../../types";
import { PropertyMediaSchema } from "../../utils/validation";

type Props = {
  propertyId: string;
  media: PropertyMedia;
  onClose?: () => void;
  onSuccess?: (media: PropertyMedia) => void;
};
const UpdateMediaMetadataForm: FC<Props> = ({
  propertyId,
  media,
  onClose,
  onSuccess,
}) => {
  const form = useForm<PropertyMediaFormData>({
    defaultValues: media,
    resolver: zodResolver(PropertyMediaSchema),
  });
  const { updatePropertyMedia, mutateProperties } = usePropertiesApi();
  const onSubmit: SubmitHandler<PropertyMediaFormData> = async (data) => {
    try {
      const res = await updatePropertyMedia(propertyId, media.id, data);
      onSuccess?.(res);
      onClose?.();
      showNotification({
        title: "succes",
        message: `media updated succesfull`,
        color: "teal",
      });
      mutateProperties();
    } catch (error) {
      const e = handleApiErrors<PropertyMediaFormData>(error);
      if (e.detail) {
        showNotification({ title: "error", message: e.detail, color: "red" });
      } else
        Object.entries(e).forEach(([key, val]) =>
          form.setError(key as keyof PropertyMediaFormData, {
            message: val,
          })
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
          <Controller
            control={form.control}
            name={`title`}
            render={({ field, fieldState }) => (
              <TextInput
                {...field}
                label="Title"
                error={fieldState.error?.message}
                placeholder="e.g Bedroom"
              />
            )}
          />
          <Controller
            control={form.control}
            name={`description`}
            render={({ field, fieldState }) => (
              <Textarea
                {...field}
                placeholder="Brief description"
                label="Description"
                error={fieldState.error?.message}
              />
            )}
          />
        </Stack>
        <Group gap={1}>
          <Button flex={1} variant="default" radius={0} onClick={onClose}>
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

export default UpdateMediaMetadataForm;
