import {
  HeaderLink,
  withNoOrganizationContextRequired,
  withRequiredOrganizationContext,
} from "@havena/esm-core-components";

export const OrganizationContextHeaderLink = withRequiredOrganizationContext(
  HeaderLink,
  { noOrganizationAction: { type: "hide" } }
);

export const AdminHeaderLink = withNoOrganizationContextRequired(HeaderLink, {
  hasOrganizationAction: { type: "hide" },
});
