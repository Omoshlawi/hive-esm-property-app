import { Alert, AppShell, Box, Paper, Stack, Title } from "@mantine/core";
import React, { PropsWithChildren } from "react";
import { useChartCurrentProperty } from "../hooks";
import SideNav from "./SideNav";

type PropertyChartLayoutProps = PropsWithChildren<{
  Extension: React.ComponentType<{ name: string; params: Record<string, any> }>;
}>;

type RenderProps = {
  toggleDrawerOpen?: () => void;
  menuItems: {
    component: React.JSX.Element;
    meta: {
      type: string;
    };
  }[];
};
const PropertyChartLayout: React.FC<PropertyChartLayoutProps> = ({
  children,
  Extension,
}) => {
  const propertyId = useChartCurrentProperty();

  if (!propertyId)
    return (
      <Paper p="xl">
        <Alert
          color="red"
          variant="filled"
          title="Invalid Property Chart Access"
        >
          <Title>
            No property selected. Please select a property to view its chart
            data. All property chart page routes must follow pattern
            "/dashboard/properties/:propertyId/*"
          </Title>
        </Alert>
      </Paper>
    );
  return (
    <Extension
      name="app-shell-layout-with-workspace-extension-slot"
      params={{
        renderChildren: ({ menuItems, toggleDrawerOpen }: RenderProps) => {
          const menu = menuItems
            .filter((menu) => menu.meta.type === "propertyChart")
            .map((m) => m.component);
          return (
            <>
              <AppShell.Main h={"100%"}>
                <Stack gap="xl">
                  <Extension
                    name="property-chart-banner-extension-slot"
                    params={{ propertyId, Extension }}
                  />
                  <Box>{children}</Box>
                </Stack>
              </AppShell.Main>
              <AppShell.Navbar p={"md"}>
                <SideNav>{menu}</SideNav>
              </AppShell.Navbar>
            </>
          );
        },
        asideExtentensionSlot: "aside-extension-slot",
        withAside: false,
        withSideNav: true,
      }}
    />
  );
};

export default PropertyChartLayout;
