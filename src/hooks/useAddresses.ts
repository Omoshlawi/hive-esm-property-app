import {
  apiFetch,
  APIFetchResponse,
  constructUrl,
  useSession,
} from "@hive/esm-core-api";
import { Address, AddressFormData, County } from "../types";
import useSWR from "swr";

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

const addAddress = async (data: AddressFormData) => {
  return await apiFetch<Address>("/addresses", { method: "POST", data });
};

const updateAddress = async (
  id: string,
  data: AddressFormData,
  method: "PUT" | "PATCH" = "PUT"
) => {
  return await apiFetch<Address>(`/addresses/${id}`, {
    method: method,
    data,
  });
};

const deleteAddress = async (
  id: string,
  method: "DELETE" | "PURGE" = "DELETE"
) => {
  return await apiFetch<Address>(`/addresses/${id}`, {
    method: method,
  });
};

export const useAddressApi = () => {
  return {
    addAddress,
    updateAddress,
    deleteAddress,
  };
};
