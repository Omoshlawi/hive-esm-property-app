import { HeaderLink, withUserAccess } from "@hive/esm-core-components";
import React from "react";

export const OrganizationContextHeaderLink = withUserAccess(HeaderLink, {
  isAuthenticated: (session) =>
    session.isAuthenticated && Boolean(session.currentOrganization),
  requiresAuth: true,
  fallbackComponent: <></>,
});
