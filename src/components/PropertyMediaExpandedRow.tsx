import React from "react";
import { PropertyMedia } from "../types";
import { Paper, Stack, Text, Title } from "@mantine/core";

type PropertyMediaExpandedRowProps = {
  media: PropertyMedia;
};

const PropertyMediaExpandedRow: React.FC<PropertyMediaExpandedRowProps> = ({
  media,
}) => {
  return (
    <Paper p={"md"}>
      <Stack gap={"xs"}>
        <Title order={6}>Description</Title>
        <Text c={"dimmed"}>{media.description || "No description"}</Text>
        
      </Stack>
    </Paper>
  );
};

export default PropertyMediaExpandedRow;
