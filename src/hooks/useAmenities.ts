import { APIFetchResponse } from "@hive/esm-core-api";
import { Amenity } from "../types";
import useSWR from "swr";

const useAmenities = () => {
  const path = "/amenities";
  const { data, error, isLoading, mutate } =
    useSWR<APIFetchResponse<{ results: Amenity[] }>>(path);
  return {
    amenities: data?.data?.results ?? [],
    isLoading,
    error,
    mutate,
  };
};

export default useAmenities;
