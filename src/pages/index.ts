import { withUserAccess } from "@hive/esm-core-components";
import PropertiesPage from "./PropertiesPage";
import PropertyDetailPage from "./PropertyDetailPage";
import PropertyRelationshipsPage from "./PropertyRelationshipsPage";
import PropertyMediaPage from "./PropertyMediaPage";

export const PropertiesDashboard = withUserAccess(PropertiesPage, {
  isAuthenticated: (session) => session.isAuthenticated,
  requiresAuth: true,
});
export const PropertyDetail = withUserAccess(PropertyDetailPage, {
  isAuthenticated: (session) => session.isAuthenticated,
  requiresAuth: true,
});
export const PropertyRelationships = withUserAccess(PropertyRelationshipsPage, {
  isAuthenticated: (session) => session.isAuthenticated,
  requiresAuth: true,
});
export const PropertyMedia = withUserAccess(PropertyMediaPage, {
  isAuthenticated: (session) => session.isAuthenticated,
  requiresAuth: true,
});
