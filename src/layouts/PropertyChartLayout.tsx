import { AppShell } from "@mantine/core";
import React, { PropsWithChildren } from "react";
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
  return (
    <Extension
      name="app-shell-layout-with-workspace"
      params={{
        renderChildren: ({ menuItems, toggleDrawerOpen }: RenderProps) => {
          const menu = menuItems
            .filter((menu) => menu.meta.type === "propertyChart")
            .map((m) => m.component);
          return (
            <>
              <AppShell.Main h={"100%"}>{children}</AppShell.Main>
              <AppShell.Navbar p={"md"}>
                <SideNav>{menu}</SideNav>
              </AppShell.Navbar>
            </>
          );
        },
        asideExtentensionSlot: "aside-extension-slot",
        withAside: true,
        withSideNav: true,
      }}
    />
  );
};

export default PropertyChartLayout;
