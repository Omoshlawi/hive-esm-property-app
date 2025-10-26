import { Address } from "../types";

// Enhanced status color mapping with better visual hierarchy
export const getStatusColor = (status: string) => {
  switch (status) {
    case "BLOCKED":
      return "red";
    case "DRAFT":
      return "blue";
    case "ARCHIVED":
      return "gray";
    case "APPROVED":
      return "green";
    case "REJECTED":
      return "red";
    case "PAUSED":
      return "yellow";
    case "PENDING":
      return "orange";
    default:
      return "gray";
  }
};

// Enhanced status variant for better visibility
export const getStatusVariant = (status: string, colorScheme: string) => {
  switch (status) {
    case "BLOCKED":
    case "REJECTED":
      return "filled";
    case "APPROVED":
      return "filled";
    case "PENDING":
      return colorScheme === "dark" ? "light" : "outline";
    case "PAUSED":
      return "light";
    case "DRAFT":
      return colorScheme === "dark" ? "light" : "outline";
    case "ARCHIVED":
      return "light";
    default:
      return colorScheme === "dark" ? "light" : "outline";
  }
};

export function formatAddress(address: Address): string {
  const parts = [];

  if (address.address1) parts.push(address.address1);
  if (address.address2) parts.push(address.address2);
  if (address.landmark) parts.push(address.landmark);
  if (address.level4) parts.push(address.level4);
  if (address.level3) parts.push(address.level3);
  if (address.level2) parts.push(address.level2);
  if (address.level1) parts.push(address.level1);
  if (address.postalCode) parts.push(address.postalCode);
  if (address.country) parts.push(address.country);

  return parts.join(", ");
}
