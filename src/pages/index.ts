import { withUserAccess } from "@hive/esm-core-components";
import PropertiesPage from "./PropertiesPage";
import PropertyDetailPage from "./PropertyDetailPage";

export const PropertiesDashboard = withUserAccess(PropertiesPage, {
  isAuthenticated: (session) => session.isAuthenticated,
  requiresAuth: true,
});
export const PropertyDetail = withUserAccess(PropertyDetailPage, {
  isAuthenticated: (session) => session.isAuthenticated,
  requiresAuth: true,
});
