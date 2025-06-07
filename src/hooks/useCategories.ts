import useSWR from "swr";
import { Category } from "../types";
import { APIFetchResponse } from "@hive/esm-core-api";

const useCategories = () => {
  const path = "/categories";
  const { data, error, isLoading, mutate } =
    useSWR<APIFetchResponse<{ results: Category[] }>>(path);
  return {
    categories: data?.data?.results ?? [],
    isLoading,
    error,
    mutate,
  };
};

export default useCategories;
