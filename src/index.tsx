import * as React from "react";
import type { PiletApi } from "@hive/esm-shell-app";
import { PropertiesDashboard } from "./pages";
import { HeaderLink } from "@hive/esm-core-components";

export function setup(app: PiletApi) {
  app.registerPage(
    "/dashboard/properties",
    () => <PropertiesDashboard launchWorkspace={app.launchWorkspace} />,
    { layout: "dashboard" }
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
}
