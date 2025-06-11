// Enhanced status color mapping with better visual hierarchy
export const getStatusColor = (status: string) => {
  switch (status) {
    case "Blocked":
      return "red";
    case "Draft":
      return "blue";
    case "Archived":
      return "gray";
    case "Approved":
      return "green";
    case "Rejected":
      return "red";
    case "Paused":
      return "yellow";
    case "Pending":
      return "orange";
    default:
      return "gray";
  }
};

// Enhanced status variant for better visibility
export const getStatusVariant = (status: string, colorScheme: string) => {
  switch (status) {
    case "Blocked":
    case "Rejected":
      return "filled";
    case "Approved":
      return "filled";
    case "Pending":
      return colorScheme === "dark" ? "light" : "outline";
    case "Paused":
      return "light";
    case "Draft":
      return colorScheme === "dark" ? "light" : "outline";
    case "Archived":
      return "light";
    default:
      return colorScheme === "dark" ? "light" : "outline";
  }
};
