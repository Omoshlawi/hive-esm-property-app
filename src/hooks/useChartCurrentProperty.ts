import { useLocation } from "react-router-dom";
import { extractIdFromPath } from "@hive/esm-core-api";

const useChartCurrentProperty = () => {
  const location = useLocation();
  const pathName = location.pathname;
  return extractIdFromPath(pathName, "/dashboard/properties");
};

export default useChartCurrentProperty;
