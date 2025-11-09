import { TablerIcon } from "@havena/esm-core-components";
import { Alert, Group, Text } from "@mantine/core";
import React from "react";

const ExitOrganizationContext = () => {
  return (
    <Alert
      color="yellow"
      title={
        <Group>
          <TablerIcon name="exclamationCircle" />
          <Text>Exit organization context to continue</Text>
        </Group>
      }
    />
  );
};

export default ExitOrganizationContext;
