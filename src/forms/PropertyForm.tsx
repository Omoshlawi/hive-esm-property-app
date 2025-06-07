import React, { useState } from "react";
import { Property, PropertyFormData } from "../types";
import {
  useAddresses,
  useAmenities,
  useCategories,
  usePropertiesApi,
} from "../hooks";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PropertySchema } from "../utils/validation";
import { showNotification } from "@mantine/notifications";
import { handleApiErrors, mutate } from "@hive/esm-core-api";
import { Stack, TextInput, Group, Button } from "@mantine/core";

type PropertyFormProps = {
  property?: Property;
  onSuccess?: (property: Property) => void;
  onCloseWorkspace?: () => void;
};

const PropertyForm: React.FC<PropertyFormProps> = ({
  onCloseWorkspace,
  onSuccess,
  property,
}) => {
  const { addProperty, updateProperty } = usePropertiesApi();
  const addressesAsync = useAddresses({});
  const amenitiesAsync = useAmenities();
  const categoriesAsync = useCategories();
  const form = useForm<PropertyFormData>({
    defaultValues: {
      categories: property?.categories?.map((c) => c.categoryId) ?? [],
      addressId: property?.addressId ?? "",
      amenities: property?.amenities?.map((a) => a.amenityId) ?? [],
      attributes:
        property?.attributes?.map((a) => ({
          attributeId: a.attributeId,
          value: a.value,
        })) ?? [],
      media: [],
      name: property?.name ?? "",
      thumbnail: property?.thumbnail ?? "",
      description: property?.description ?? "",
    },
    resolver: zodResolver(PropertySchema),
  });

  const onSubmit: SubmitHandler<PropertyFormData> = async (data) => {
    try {
      const _property = property
        ? await updateProperty(property?.id, data)
        : await addProperty(data);

      onSuccess?.(_property);
      showNotification({
        title: "success",
        message: `Property ${property ? "updated" : "created"} successfully`,
        color: "teal",
      });
      mutate("/properties");
    } catch (error) {
      const e = handleApiErrors<PropertyFormData>(error);
      if (e.detail) {
        showNotification({ title: "error", message: e.detail, color: "red" });
      } else
        Object.entries(e).forEach(([key, val]) =>
          form.setError(key as keyof PropertyFormData, { message: val })
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
            name="name"
            render={({ field, fieldState }) => (
              <TextInput
                {...field}
                label="Property name"
                error={fieldState.error?.message}
                placeholder="Enter property name"
              />
            )}
          />
        </Stack>
        <Group gap={1}>
          <Button
            flex={1}
            variant="default"
            radius={0}
            onClick={onCloseWorkspace}
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

export default PropertyForm;
