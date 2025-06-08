import useSWR from "swr";
import { Property, PropertyMedia } from "../types";
import { APIFetchResponse, constructUrl, useSession } from "@hive/esm-core-api";

export const useProperties = (params?: Record<string, any>) => {
  const session = useSession();
  const path = constructUrl("/properties", {
    organizationContext: session.currentOrganization,
  });
  const { data, error, isLoading, mutate } =
    useSWR<APIFetchResponse<{ results: Property[] }>>(path);
  return {
    properties: data?.data?.results ?? [],
    isLoading,
    error,
    mutate,
  };
};

export const useProperty = (id: string) => {
  const path = constructUrl(`/properties/${id}`, {
    v: "custom:include(categories:include(category),amenities:include(amenity),attributes:include(attribute))",
  });

  const { data, error, isLoading, mutate } =
    useSWR<APIFetchResponse<Property>>(path);
  return {
    property: data?.data,
    isLoading,
    error,
    mutate,
  };
};

export const usePropertyMedia = (propertyId: string) => {
  const path = constructUrl(`/properties/${propertyId}/media`, {});

  const { data, error, isLoading, mutate } =
    useSWR<APIFetchResponse<{ results: PropertyMedia[] }>>(path);
  return {
    propertyMedia: data?.data?.results ?? [],
    isLoading,
    error,
    mutate,
  };
};
