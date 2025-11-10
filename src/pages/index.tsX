import PropertiesPage from "./PropertiesPage";
import PropertyDetailPage from "./PropertyDetailPage";
import PropertyRelationshipsPage from "./PropertyRelationshipsPage";
import PropertyMediaPage from "./PropertyMediaPage";
import {
  withNoOrganizationContextRequired,
  withRequireAuth,
  withRequiredOrganizationContext,
} from "@havena/esm-core-components";
import ExitOrganizationContext from "../components/ExitOrganizationContext";
import React from "react";

const unauthenticatedAction: any = { type: "redirect", path: "/login" };
const hasOrganizationAction: any = {
  type: "fallback",
  component: <ExitOrganizationContext />,
};

export const PropertiesDashboard = withRequireAuth(
  withRequiredOrganizationContext(PropertiesPage),
  {
    unauthenticatedAction,
  }
);
export const PropertyDetail = withRequireAuth(PropertyDetailPage);
export const PropertyRelationships = withRequireAuth(
  withRequiredOrganizationContext(PropertyRelationshipsPage),
  {
    unauthenticatedAction,
  }
);
export const PropertyMedia = withRequireAuth(
  withRequiredOrganizationContext(PropertyMediaPage),
  {
    unauthenticatedAction,
  }
);
