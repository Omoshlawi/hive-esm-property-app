import { useLocation } from "react-router-dom";

export function extractIdFromPath(
  pathname: string,
  basePath: string = "/dashboard/properties"
): string | null {
  // Normalize paths by removing trailing slashes
  const normalizedPath = pathname.replace(/\/+$/, "");
  const normalizedBase = basePath.replace(/\/+$/, "");

  if (normalizedPath.startsWith(normalizedBase + "/")) {
    const remainingPath = normalizedPath.slice(normalizedBase.length + 1);
    const firstSegment = remainingPath.split("/")[0];

    return firstSegment && firstSegment.trim() !== "" ? firstSegment : null;
  }

  return null;
}
const useChartCurrentProperty = () => {
  const location = useLocation();
  const pathName = location.pathname;
  return extractIdFromPath(pathName);
};

export default useChartCurrentProperty;
