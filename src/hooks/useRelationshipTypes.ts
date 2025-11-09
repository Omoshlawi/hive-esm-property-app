import useSWR from "swr";
import { RelationshipType } from "../types";
import { APIFetchResponse } from "@havena/esm-core-api";

const useRelationshipTypes = () => {
  const path = "/relationship-types";
  const { data, error, isLoading, mutate } =
    useSWR<APIFetchResponse<{ results: RelationshipType[] }>>(path);
  return {
    relationshipTypes: data?.data?.results ?? [],
    isLoading,
    error,
    mutate,
  };
};

export default useRelationshipTypes;
