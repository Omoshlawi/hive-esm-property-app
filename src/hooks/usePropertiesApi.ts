import {
  apiFetch,
  APIFetchResponse,
  constructUrl,
  mutate,
} from "@hive/esm-core-api";
import { useDebouncedValue } from "@mantine/hooks";
import { useState } from "react";
import useSWR from "swr";
import {
  Property,
  PropertyFormData,
  PropertyMedia,
  PropertyMediaFormData,
  PropertyRelationshipFormData,
  PropertyStatus,
  Relationship,
} from "../types";

const mutateProperties = () => mutate("/properties");

const addProperty = async (data: PropertyFormData) => {
  const res = await apiFetch<Property>("/properties", {
    method: "POST",
    data,
  });
  mutateProperties();
  return res.data;
};

const updateProperty = async (id: string, data: PropertyFormData) => {
  const res = await apiFetch<Property>(`/properties/${id}`, {
    method: "PATCH",
    data,
  });
  mutateProperties();
  return res.data;
};

const deleteProperty = async (id: string, purge: boolean = false) => {
  const res = await apiFetch<Property>(`/properties/${id}`, {
    method: "DELETE",
    params: { purge },
  });
  mutateProperties();
  return res.data;
};

const addPropertyMedia = async (
  propertyId: string,
  data: PropertyMediaFormData
) => {
  const res = await apiFetch<PropertyMedia>(`properties/${propertyId}/media`, {
    method: "POST",
    data,
  });
  mutateProperties();
  return res.data;
};

const updatePropertyMedia = async (
  propertyId: string,
  mediaId: string,
  data: PropertyMediaFormData
) => {
  const res = await apiFetch<PropertyMedia>(
    `properties/${propertyId}/media/${mediaId}`,
    {
      method: "PATCH",
      data,
    }
  );
  mutateProperties();
  return res.data;
};

const deletePropertyMedia = async (
  propertyId: string,
  mediaId: string,
  purge: boolean = false
) => {
  const res = await apiFetch<PropertyMedia>(
    `properties/${propertyId}/media/${mediaId}`,
    {
      method: "DELETE",
      params: { purge },
    }
  );
  mutateProperties();
  return res.data;
};

const searchProperty = async (filters: Record<string, any>) => {
  const url = constructUrl(`/properties`, filters);
  const res = await apiFetch<{ results: Array<Property> }>(url);
  return res.data.results ?? [];
};

const addPropertiesRelationship = async (
  data: PropertyRelationshipFormData
) => {
  const res = await apiFetch<Relationship>(`/relationships`, {
    method: "POST",
    data,
  });
  mutateProperties();
  return res.data;
};
const updatePropertiesRelationship = async (
  relationshipId: string,
  data: PropertyRelationshipFormData
) => {
  const res = await apiFetch<Relationship>(`/relationships/${relationshipId}`, {
    method: "PATCH",
    data,
  });
  mutateProperties();
  return res.data;
};

const submitPropertyForReview = async (propertyId: string) => {
  const url = `/properties/${propertyId}/workflow/request-review`;
  const res = await apiFetch<PropertyStatus>(url, { method: "POST" });
  mutateProperties();
  return res.data;
};

const approvePendingProperty = async (propertyId: string) => {
  const url = `/properties/${propertyId}/workflow/approve`;
  const res = await apiFetch<PropertyStatus>(url, { method: "POST" });
  mutateProperties();
  return res.data;
};
export const usePropertiesApi = () => {
  return {
    addProperty,
    updateProperty,
    deleteProperty,
    addPropertyMedia,
    updatePropertyMedia,
    deletePropertyMedia,
    searchProperty,
    addPropertiesRelationship,
    updatePropertiesRelationship,
    submitPropertyForReview,
    approvePendingProperty,
    mutateProperties,
  };
};

export const useFilteredProperties = () => {
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [debounced] = useDebouncedValue(filters, 500);

  const url = constructUrl(`/properties`, debounced);

  const { data, error, isLoading } = useSWR<
    APIFetchResponse<{ results: Array<Property> }>
  >(Object.keys(filters ?? {}).length > 0 ? url : null);
  return {
    isLoading,
    error,
    properties: data?.data?.results ?? [],
    setFilters,
    filters,
  };
};
