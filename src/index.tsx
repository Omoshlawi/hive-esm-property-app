import * as React from "react";
import type { PiletApi } from "@hive/esm-shell-app";
import { PropertiesDashboard, PropertyDetail } from "./pages";
import { HeaderLink } from "@hive/esm-core-components";
import PropertyChartLayout from "./pages/layouts/PropertyChartLayout";
import { AppShell } from "@mantine/core";

export function setup(app: PiletApi) {
  app.registerPageLayout("propertyChart", ({ children }) => (
    <PropertyChartLayout Extension={app.Extension}>
      {children}
    </PropertyChartLayout>
  ));
  app.registerPage(
    "/dashboard/properties",
    () => <PropertiesDashboard launchWorkspace={app.launchWorkspace} />,
    { layout: "dashboard" }
  );
  app.registerPage(
    "/dashboard/properties/:propertyId",
    () => <PropertyDetail launchWorkspace={app.launchWorkspace} />,
    { layout: "propertyChart" }
  );
  app.registerMenu(
    ({ onClose }: any) => (
      <HeaderLink
        label="Properties"
        to="/dashboard/properties"
        icon="building"
        onClose={onClose ?? (() => {})}
      />
    ),
    { type: "admin" }
  );
  app.registerMenu(
    ({ onClose }: any) => (
      <HeaderLink
        label="Relationships"
        to="relationships"
        icon="building"
        onClose={onClose ?? (() => {})}
      />
    ),
    { type: "propertyChart" as any }
  );
}
