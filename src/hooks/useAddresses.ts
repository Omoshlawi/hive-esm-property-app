import { APIFetchResponse, constructUrl, useSession } from "@hive/esm-core-api";
import useSWR from "swr";
import { Address, County } from "../types";

export const useAddresses = (filters: Record<string, any>) => {
  const session = useSession();
  const path = constructUrl("/addresses", {
    ...filters,
    organizationContext: session.currentOrganization,
  });
  const { data, error, isLoading, mutate } =
    useSWR<APIFetchResponse<{ results: Address[] }>>(path);
  return {
    addresses: data?.data?.results ?? [],
    isLoading,
    error,
    mutate,
  };
};

export const usePlaces = (filters: Record<string, any>) => {
  const path = constructUrl("/places/counties", {
    v: "custom:select(name,subCounties:select(name,wards:select(name)))",
    ...filters,
  });
  const { data, error, isLoading, mutate } =
    useSWR<APIFetchResponse<{ results: County[] }>>(path);
  return {
    counties: data?.data?.results ?? [],
    isLoading,
    error,
    mutate,
  };
};
