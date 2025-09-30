import { withUserAccess } from "@hive/esm-core-components";
import PropertiesPage from "./PropertiesPage";
import PropertyDetailPage from "./PropertyDetailPage";
import PropertyRelationshipsPage from "./PropertyRelationshipsPage";
import PropertyMediaPage from "./PropertyMediaPage";

export const PropertiesDashboard = withUserAccess(PropertiesPage, {
  requiresAuth: true,
});
export const PropertyDetail = withUserAccess(PropertyDetailPage, {
  requiresAuth: true,
});
export const PropertyRelationships = withUserAccess(PropertyRelationshipsPage, {
  requiresAuth: true,
});
export const PropertyMedia = withUserAccess(PropertyMediaPage, {
  requiresAuth: true,
});
