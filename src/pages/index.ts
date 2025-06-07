import { withUserAccess } from "@hive/esm-core-components";
import PropertiesPage from "./PropertiesPage";

export const PropertiesDashboard = withUserAccess(PropertiesPage, {
  isAuthenticated: (session) => session.isAuthenticated,
  requiresAuth: true,
});
