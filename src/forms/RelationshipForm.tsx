import { handleApiErrors, mutate } from "@havena/esm-core-api";
import { InputSkeleton, When } from "@havena/esm-core-components";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Button, Group, Loader, Select, Stack } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { showNotification } from "@mantine/notifications";
import React, { FC } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  useFilteredProperties,
  usePropertiesApi,
  useRelationshipTypes,
} from "../hooks";
import { PropertyRelationshipFormData, Relationship } from "../types";
import { RelationshipSchema } from "../utils/validation";

type RelationshipFormProps = {
  propertyId: string;
  relationship?: Relationship;
  onSuccess?: (relationship: Relationship) => void;
  onCloseWorkspace?: () => void;
};
const RelationshipForm: FC<RelationshipFormProps> = ({
  propertyId,
  onCloseWorkspace,
  onSuccess,
  relationship,
}) => {
  const relationShipTypesAsync = useRelationshipTypes();
  const { addPropertiesRelationship, updatePropertiesRelationship } =
    usePropertiesApi();
  const { setFilters, filters, ...propertiesAsync } = useFilteredProperties();
  const form = useForm<PropertyRelationshipFormData>({
    defaultValues: {
      propertyAId: propertyId,
      startDate: relationship?.startDate
        ? new Date(relationship.startDate)
        : new Date(),
      endDate: relationship?.endDate
        ? new Date(relationship.endDate)
        : undefined,
      propertyBId: relationship?.propertyBId,
      typeId: relationship?.typeId,
    },
    resolver: zodResolver(RelationshipSchema),
  });

  const onSubmit: SubmitHandler<PropertyRelationshipFormData> = async (
    data
  ) => {
    try {
      const res = relationship
        ? await updatePropertiesRelationship(relationship?.id, data)
        : await addPropertiesRelationship(data);

      onSuccess?.(res);
      onCloseWorkspace?.();
      showNotification({
        title: "succes",
        message: `relationship ${
          relationship ? "updated" : "created"
        } succesfull`,
        color: "teal",
      });
      mutate("/relationships");
    } catch (error) {
      const e = handleApiErrors<PropertyRelationshipFormData>(error);
      console.log("Error->", e);

      if (e.detail) {
        showNotification({ title: "error", message: e.detail, color: "red" });
      } else
        Object.entries(e).forEach(([key, val]) =>
          form.setError(key as keyof PropertyRelationshipFormData, {
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
            name="startDate"
            render={({ field, fieldState }) => (
              <DateInput
                {...field}
                label="Start date"
                error={fieldState.error?.message}
                placeholder="dd/mm/yyyy"
              />
            )}
          />
          <Controller
            control={form.control}
            name="endDate"
            render={({ field, fieldState }) => (
              <DateInput
                {...field}
                placeholder="dd/mm/yyyy"
                label="End Date"
                error={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={form.control}
            name="typeId"
            render={({ field, fieldState }) => (
              <When
                asyncState={{
                  ...relationShipTypesAsync,
                  data: relationShipTypesAsync.relationshipTypes,
                }}
                loading={() => <InputSkeleton />}
                error={(e) => (
                  <Alert
                    color="red"
                    variant="light"
                    title="Error loading relationship types"
                  >
                    {handleApiErrors(e).detail}
                  </Alert>
                )}
                success={(relationshipTypes) => (
                  <Select
                    {...field}
                    data={relationshipTypes.map((res) => ({
                      label: res.bIsToA,
                      value: res.id,
                    }))}
                    placeholder="Select relationship type"
                    onChange={(_value, _) => field.onChange(_value)}
                    label="Relationship type"
                    error={fieldState.error?.message}
                    searchable
                    nothingFoundMessage="Nothing found..."
                    clearable
                  />
                )}
              />
            )}
          />

          {!relationship && (
            <Controller
              control={form.control}
              name="propertyBId"
              render={({ field, fieldState }) => (
                <Select
                  {...field}
                  data={propertiesAsync?.properties.map((res) => ({
                    label: res.name,
                    value: res.id,
                  }))}
                  placeholder="Search property"
                  onChange={(_value, _) => field.onChange(_value)}
                  label="Related Property"
                  error={fieldState.error?.message}
                  searchable
                  nothingFoundMessage="Nothing found..."
                  clearable
                  rightSection={
                    propertiesAsync.isLoading && <Loader size={16} />
                  }
                  searchValue={filters.search}
                  onSearchChange={(search) => {
                    setFilters({ search });
                  }}
                />
              )}
            />
          )}
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

export default RelationshipForm;
