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
