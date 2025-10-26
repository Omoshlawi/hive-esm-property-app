import { handleApiErrors } from "@hive/esm-core-api";
import { InputSkeleton, When } from "@hive/esm-core-components";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  Button,
  Checkbox,
  Group,
  MultiSelect,
  Select,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconExclamationCircle } from "@tabler/icons-react";
import React from "react";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import {
  useAddresses,
  useAmenities,
  useCategories,
  usePropertiesApi,
} from "../hooks";
import { Property, PropertyFormData } from "../types";
import { PropertySchema } from "../utils/validation";
import PropertyAttributesForm from "./PropertyAttributesForm";

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
      isVirtual: property?.isVirtual ?? false,
    },
    resolver: zodResolver(PropertySchema),
  });

  const onSubmit: SubmitHandler<PropertyFormData> = async (data) => {
    try {
      const _property = property
        ? await updateProperty(property?.id, data)
        : await addProperty(data);

      onSuccess?.(_property);
      onCloseWorkspace?.();
      showNotification({
        title: "success",
        message: `Property ${property ? "updated" : "created"} successfully`,
        color: "teal",
      });
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
    <FormProvider {...form}>
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
            <Controller
              control={form.control}
              name="isVirtual"
              render={({ field, fieldState }) => (
                <Checkbox
                  checked={field.value}
                  onChange={(event) =>
                    field.onChange(event.currentTarget.checked)
                  }
                  error={fieldState.error?.message}
                  label="Virtual Property Group"
                  description="Check if this property is a group of property units processed as a single entity. Leave unchecked for an actual physical structure/unit."
                />
              )}
            />
            <Controller
              control={form.control}
              name="description"
              render={({ field, fieldState }) => (
                <Textarea
                  {...field}
                  label="Property description"
                  error={fieldState.error?.message}
                  placeholder="Description ..."
                />
              )}
            />
            <Controller
              control={form.control}
              name="addressId"
              render={({ field, fieldState }) => (
                <When
                  asyncState={{
                    ...addressesAsync,
                    data: addressesAsync.addresses,
                  }}
                  loading={() => <InputSkeleton />}
                  error={(e) => (
                    <Alert
                      variant="light"
                      radius={"xs"}
                      title="Error loading address"
                      color="red"
                      icon={<IconExclamationCircle />}
                    >
                      {handleApiErrors(e).detail}
                    </Alert>
                  )}
                  success={(address) => (
                    <Select
                      {...field}
                      data={address.map((l) => ({
                        value: l.id,
                        label: l.label,
                      }))}
                      label="Address"
                      placeholder="Select from saved addresses"
                      error={fieldState.error?.message}
                      nothingFoundMessage="Nothing found..."
                      searchable
                    />
                  )}
                />
              )}
            />
            {!!!property && (
              <Controller
                control={form.control}
                name="amenities"
                render={({ field, fieldState }) => (
                  <When
                    asyncState={{
                      ...amenitiesAsync,
                      data: amenitiesAsync.amenities,
                    }}
                    loading={() => <InputSkeleton />}
                    error={(e) => (
                      <Alert
                        variant="light"
                        radius={"xs"}
                        title="Error loading amenities"
                        color="red"
                        icon={<IconExclamationCircle />}
                      >
                        {handleApiErrors(e).detail}
                      </Alert>
                    )}
                    success={(amenities) => (
                      <MultiSelect
                        {...field}
                        data={amenities.map((l) => ({
                          value: l.id,
                          label: l.name,
                        }))}
                        hidePickedOptions
                        label="Amenities"
                        placeholder="Select amenities"
                        error={fieldState.error?.message}
                        nothingFoundMessage="Nothing found..."
                        searchable
                      />
                    )}
                  />
                )}
              />
            )}
            {!!!property && (
              <Controller
                control={form.control}
                name="categories"
                render={({ field, fieldState }) => (
                  <When
                    asyncState={{
                      ...categoriesAsync,
                      data: categoriesAsync.categories,
                    }}
                    loading={() => <InputSkeleton />}
                    error={(e) => (
                      <Alert
                        variant="light"
                        radius={"xs"}
                        title="Error loading categories"
                        color="red"
                        icon={<IconExclamationCircle />}
                      >
                        {handleApiErrors(e).detail}
                      </Alert>
                    )}
                    success={(categories) => (
                      <MultiSelect
                        {...field}
                        data={categories.map((l) => ({
                          value: l.id,
                          label: l.name,
                        }))}
                        hidePickedOptions
                        label="categories"
                        placeholder="Select categories"
                        error={fieldState.error?.message}
                        nothingFoundMessage="Nothing found..."
                        searchable
                      />
                    )}
                  />
                )}
              />
            )}
            {!!!property && <PropertyAttributesForm />}
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
    </FormProvider>
  );
};

export default PropertyForm;
