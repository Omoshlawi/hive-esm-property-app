import { HeaderLink } from "@hive/esm-core-components";
import type { PiletApi } from "@hive/esm-shell-app";
import * as React from "react";
import { PropertyChartBanner, PropertyQuickActions } from "./components";
import { useChartCurrentProperty } from "./hooks";
import { PropertyChartLayout } from "./layouts";
import {
  PropertiesDashboard,
  PropertyDetail,
  PropertyMedia,
  PropertyRelationships,
} from "./pages";

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
  app.registerPage(
    "/dashboard/properties/:propertyId/relationships",
    () => <PropertyRelationships launchWorkspace={app.launchWorkspace} />,
    { layout: "propertyChart" }
  );
  app.registerPage(
    "/dashboard/properties/:propertyId/media",
    () => <PropertyMedia launchWorkspace={app.launchWorkspace} />,
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
    ({ onClose }: any) => {
      const id = useChartCurrentProperty();
      return (
        <HeaderLink
          label={"Summary"}
          to={`/dashboard/properties/${id}`}
          onClose={onClose ?? (() => {})}
          activeWhen={(currpath) => currpath === `/dashboard/properties/${id}`}
        />
      );
    },
    { type: "propertyChart" as any }
  );
  app.registerMenu(
    ({ onClose }: any) => {
      const id = useChartCurrentProperty();
      return (
        <HeaderLink
          label="Relationships"
          to={`/dashboard/properties/${id}/relationships`}
          onClose={onClose ?? (() => {})}
        />
      );
    },
    { type: "propertyChart" as any }
  );
  app.registerMenu(
    ({ onClose }: any) => {
      const id = useChartCurrentProperty();

      return (
        <HeaderLink
          label="Media"
          to={`/dashboard/properties/${id}/media`}
          onClose={onClose ?? (() => {})}
        />
      );
    },
    { type: "propertyChart" as any }
  );
  app.registerExtension(
    "property-chart-banner-extension-slot",
    ({ params }) => <PropertyChartBanner {...params} />
  );
  app.registerExtension(
    "property-chart-banner-actions-extension-slot",
    ({ params }) => <PropertyQuickActions {...params} />
  );
}
