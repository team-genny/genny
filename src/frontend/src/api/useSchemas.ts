import useSWR from "swr"
import fetcher from "./fetcher";
import { Schema } from "../types";
import SWRData from "./SWRData";

export default function useSchemas(): SWRData<{ schemas: Schema[] }> {
  const { data, error, isLoading } = useSWR('/api/schemas', fetcher)

  return {
    schemas: data,
    error,
    isLoading
  }
}
