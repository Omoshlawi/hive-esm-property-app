import { APIFetchResponse, constructUrl } from "@hive/esm-core-api";
import { RelatedProperty, Relationship } from "../types";
import useSWR from "swr";
import { useMemo } from "react";

export const useRelationships = (filters?: Record<string, any>) => {
  const url = constructUrl("/relationships", filters ?? {});
  const { data, error, isLoading, mutate } =
    useSWR<APIFetchResponse<{ results: Array<Relationship> }>>(url);

  return {
    isLoading,
    error,
    mutate,
    relationsShips: data?.data?.results ?? [],
  };
};

export const useRelatedProperties = (propertyId: string) => {
  const url = constructUrl("/relationships", {
    propertyId,
    v: "custom:include(propertyA,propertyB,type)",
  });
  const { data, error, isLoading, mutate } =
    useSWR<APIFetchResponse<{ results: Array<Relationship> }>>(url);

  const relatedProperties = useMemo(() => {
    const relationsShips = data?.data?.results ?? [];
    return relationsShips.map((rel) => {
      const isCurrentA = rel.propertyAId === propertyId;
      let relatedProperty: RelatedProperty;
      if (isCurrentA) {
        relatedProperty = {
          id: rel.propertyBId,
          name: rel.propertyB.name,
          relationshipToIndex: `${rel.type.bIsToA} ${rel.propertyA.name}`,
          relationship: rel,
        };
      } else {
        relatedProperty = {
          id: rel.propertyAId,
          name: rel.propertyA.name,
          relationshipToIndex: `${rel.type.aIsToB} ${rel.propertyB.name}`,
          relationship: rel,
        };
      }
      return relatedProperty;
    });
  }, [data?.data?.results]);

  return {
    isLoading,
    error,
    mutate,
    relatedProperties,
  };
};
