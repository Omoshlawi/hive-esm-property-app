import { APIFetchResponse, constructUrl } from "@hive/esm-core-api";
import { Relationship } from "../types";
import useSWR from "swr";

const useRelationships = (filters?: Record<string, any>) => {
  const url = constructUrl("/relationships", filters ?? {});
  const { data, error, isLoading, mutate } =
    useSWR<APIFetchResponse<{ results: Array<Relationship> }>>(url);

  return {
    isLoading,
    error,
    mutate,
    relationsShips: data?.data?.results ?? [],
  };
};

export default useRelationships;
