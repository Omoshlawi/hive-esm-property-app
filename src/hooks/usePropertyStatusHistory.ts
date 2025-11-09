import { APIFetchResponse } from "@havena/esm-core-api";
import useSWR from "swr";
import { PropertyStatus } from "../types";

export const usePropertyStatusHistory = (propertyId: string) => {
  const url = `/properties/${propertyId}/status`;
  const { data, isValidating, ...props } =
    useSWR<APIFetchResponse<{ results: Array<PropertyStatus> }>>(url);
  return { ...props, statusHistory: data?.data?.results ?? [] };
};
