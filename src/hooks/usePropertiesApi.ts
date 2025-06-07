import { apiFetch, constructUrl } from "@hive/esm-core-api";
import {
  Property,
  PropertyFormData,
  PropertyMedia,
  PropertyMediaFormData,
  PropertyRelationshipFormData,
  Relationship,
} from "../types";

const addProperty = async (data: PropertyFormData) => {
  return await apiFetch<Property>("/properties", {
    method: "POST",
    data,
  });
};

const updateProperty = async (
  id: string,
  data: PropertyFormData,
  method: "PUT" | "PATCH" = "PATCH"
) => {
  return await apiFetch<Property>(`/properties/${id}`, {
    method: method,
    data,
  });
};

const deleteProperty = async (
  id: string,
  method: "DELETE" | "PURGE" = "DELETE"
) => {
  return await apiFetch<Property>(`/properties/${id}`, {
    method: method,
  });
};

const addPropertyMedia = (propertyId: string, data: PropertyMediaFormData) =>
  apiFetch<PropertyMedia>(`properties/${propertyId}/media`, {
    method: "POST",
    data,
  });

const updatePropertyMedia = (
  propertyId: string,
  mediaId: string,
  data: PropertyMediaFormData,
  method: "PUT" | "PATCH" = "PATCH"
) =>
  apiFetch<PropertyMedia>(`properties/${propertyId}/media/${mediaId}`, {
    method,
    data,
  });

const deletePropertyMedia = (
  propertyId: string,
  mediaId: string,
  method: "DELETE" | "PURGE" = "DELETE"
) => apiFetch(`properties/${propertyId}/media/${mediaId}`, { method });

const searchProperty = (filters: Record<string, any>) => {
  const url = constructUrl(`/properties`, filters);
  return apiFetch<{ results: Array<Property> }>(url);
};

const addPropertiesRelationship = (data: PropertyRelationshipFormData) =>
  apiFetch<Relationship>(`/relationships`, { method: "POST", data });
const updatePropertiesRelationship = (
  relationshipId: string,
  data: PropertyRelationshipFormData,
  method: "PUT" | "PATCH" = "PATCH"
) =>
  apiFetch<Relationship>(`/relationships/${relationshipId}`, { method, data });

const usePropertiesApi = () => {
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
  };
};

export default usePropertiesApi;
