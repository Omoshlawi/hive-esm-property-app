import useSWR from "swr";
import { Property, PropertyMedia } from "../types";
import { APIFetchResponse, Auth, constructUrl } from "@havena/esm-core-api";

export const useProperties = (params?: Record<string, any>) => {
  const {
    data: { session },
    isPending,
    error: sessionError,
  } = Auth.client.useSession();
  const path = constructUrl("/properties", {
    organizationContext: session?.activeOrganizationId,
  });
  const { data, error, isLoading, mutate } = useSWR<
    APIFetchResponse<{ results: Property[] }>
  >(session.activeOrganizationId ? path : null);
  return {
    properties: data?.data?.results ?? [],
    isLoading: isLoading || isPending,
    error: error ?? sessionError,
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

export const usePropertyMedia = (
  propertyId: string,
  type?: PropertyMedia["type"]
) => {
  const path = constructUrl(`/properties/${propertyId}/media`, { type });

  const { data, error, isLoading, mutate } =
    useSWR<APIFetchResponse<{ results: PropertyMedia[] }>>(path);
  return {
    propertyMedia: data?.data?.results ?? [],
    isLoading,
    error,
    mutate,
  };
};
