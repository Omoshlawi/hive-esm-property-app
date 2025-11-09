import React from "react";
import { useAttributeTypes } from "../hooks";
import { Controller, useFormContext } from "react-hook-form";
import { PropertyFormData } from "../types";
import {
  ActionIcon,
  Button,
  Fieldset,
  Group,
  Loader,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { TablerIcon, When } from "@havena/esm-core-components";

const PropertyAttributesForm = () => {
  const atrtributeTypesAsync = useAttributeTypes();
  const form = useFormContext<PropertyFormData>();
  const attrs = form.watch("attributes") ?? [];

  return (
    <When
      asyncState={{
        ...atrtributeTypesAsync,
        data: atrtributeTypesAsync.attributeTypes,
      }}
      loading={() => {
        return <Loader />;
      }}
      success={(data) => {
        return (
          <Fieldset legend="Property Attributes" py={"xs"}>
            <Stack>
              {attrs.map((_, index) => (
                <Group flex={1} align="center" gap={"xs"}>
                  <Controller
                    control={form.control}
                    name={`attributes.${index}.attributeId`}
                    render={({ field, fieldState: { error } }) => (
                      <Select
                        {...field}
                        data={data.map((d) => ({
                          label: d.name,
                          value: d.id,
                          disabled:
                            attrs.findIndex((b) => b.attributeId === d.id) !==
                            -1,
                        }))}
                        placeholder="Select attr type"
                        label="Attribute Type"
                        error={error?.message}
                        flex={1}
                        searchable
                        nothingFoundMessage="Nothing found ..."
                      />
                    )}
                  />
                  <Controller
                    control={form.control}
                    name={`attributes.${index}.value`}
                    render={({ field, fieldState: { error } }) => (
                      <TextInput
                        {...field}
                        placeholder="Enter field value"
                        label="Field value"
                        error={error?.message}
                        flex={1}
                      />
                    )}
                  />
                  <ActionIcon
                    color="red"
                    variant="light"
                    onClick={() => {
                      const fields = attrs.filter((_, i) => i !== index);
                      form.setValue(`attributes`, fields);
                    }}
                  >
                    <TablerIcon name="trash" />
                  </ActionIcon>
                </Group>
              ))}
              <Button
                variant="outline"
                leftSection={<TablerIcon name="plus" />}
                onClick={() => {
                  form.setValue(`attributes.${attrs?.length}`, {
                    attributeId: "",
                    value: "",
                  });
                }}
              >
                Add Additional Fields
              </Button>
            </Stack>
          </Fieldset>
        );
      }}
    />
  );
};

export default PropertyAttributesForm;
