import { Stack, TagsInput, Textarea, TextInput } from "@mantine/core";
import React, { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { PropertyMediaFormData } from "../../types";

type Props = { index: number };

const MediaFormInputFields: FC<Props> = ({ index }) => {
  const form = useFormContext<{ media: Array<PropertyMediaFormData> }>();

  return (
    <Stack gap={"md"}>
      <Controller
        control={form.control}
        name={`media.${index}.title`}
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
        name={`media.${index}.description`}
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
  );
};

export default MediaFormInputFields;
