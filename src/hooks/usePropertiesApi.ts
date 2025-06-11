import {
  apiFetch,
  APIFetchResponse,
  constructUrl,
  debounce,
  mutate,
} from "@hive/esm-core-api";
import {
  Property,
  PropertyFormData,
  PropertyMedia,
  PropertyMediaFormData,
  PropertyRelationshipFormData,
  PropertyStatus,
  Relationship,
} from "../types";
import { useState } from "react";
import useSWR from "swr";

const addProperty = async (data: PropertyFormData) => {
  const res = await apiFetch<Property>("/properties", {
    method: "POST",
    data,
  });
  return res.data;
};

const updateProperty = async (
  id: string,
  data: PropertyFormData,
  method: "PUT" | "PATCH" = "PATCH"
) => {
  const res = await apiFetch<Property>(`/properties/${id}`, {
    method: method,
    data,
  });
  return res.data;
};

const deleteProperty = async (
  id: string,
  method: "DELETE" | "PURGE" = "DELETE"
) => {
  const res = await apiFetch<Property>(`/properties/${id}`, {
    method: method,
  });
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
  return res.data;
};

const updatePropertyMedia = async (
  propertyId: string,
  mediaId: string,
  data: PropertyMediaFormData,
  method: "PUT" | "PATCH" = "PATCH"
) => {
  const res = await apiFetch<PropertyMedia>(
    `properties/${propertyId}/media/${mediaId}`,
    {
      method,
      data,
    }
  );
  return res.data;
};

const deletePropertyMedia = async (
  propertyId: string,
  mediaId: string,
  method: "DELETE" | "PURGE" = "DELETE"
) => {
  const res = await apiFetch<PropertyMedia>(
    `properties/${propertyId}/media/${mediaId}`,
    {
      method,
    }
  );
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
  return res.data;
};
const updatePropertiesRelationship = async (
  relationshipId: string,
  data: PropertyRelationshipFormData,
  method: "PUT" | "PATCH" = "PATCH"
) => {
  const res = await apiFetch<Relationship>(`/relationships/${relationshipId}`, {
    method,
    data,
  });
  return res.data;
};

const submitPropertyForReview = async (propertyId: string) => {
  const url = `/properties/${propertyId}/status/submit`;
  const res = await apiFetch<PropertyStatus>(url, { method: "POST" });
  return res.data;
};

const approvePendingProperty = async (propertyId: string) => {
  const url = `/properties/${propertyId}/status/approve`;
  const res = await apiFetch<PropertyStatus>(url, { method: "POST" });
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
    mutateProperties: () => mutate("/properties"),
  };
};

export const useFilteredProperties = () => {
  const [filters, setFilters] = useState<Record<string, any>>({});
  const url = constructUrl(`/properties`, filters);

  const { data, error, isLoading } = useSWR<
    APIFetchResponse<{ results: Array<Property> }>
  >(Object.keys(filters ?? {}).length > 0 ? url : null);
  return {
    isLoading,
    error,
    properties: data?.data?.results ?? [],
    setFilters: debounce(setFilters, 500),
    filters,
  };
};
