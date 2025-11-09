import useSWR from "swr";
import { AttributeType } from "../types";
import { APIFetchResponse } from "@havena/esm-core-api";

const useAttributeTypes = () => {
  const path = "/attribute-types";
  const { data, error, isLoading, mutate } =
    useSWR<APIFetchResponse<{ results: AttributeType[] }>>(path);
  return {
    attributeTypes: data?.data?.results ?? [],
    isLoading,
    error,
    mutate,
  };
};

export default useAttributeTypes;
