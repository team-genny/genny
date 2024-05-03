import useSWR from "swr";
import fetcher from "./fetcher";
import { Schema } from "../types";
import SWRData from "./SWRData";

export default function useSchemas(): SWRData<{ schemas: Schema[] }> & { mutate: (data?: any, shouldRevalidate?: boolean) => Promise<void> } {
  const { data, error, isLoading, mutate } = useSWR('/api/schemas', fetcher);

return {
  schemas: data,
  error,
  isLoading,
  mutate // Return the mutate function
};
};