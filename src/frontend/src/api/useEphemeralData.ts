import useSWR from "swr"
import { poster } from "./fetcher";
import SWRData from "./SWRData";
import { Schema } from "../types";
import { AxiosError } from "axios";

export default function useEphemeralData(schema: Schema): SWRData<{ data: unknown}> {
  const { data, error, isLoading } = useSWR<Record<string, unknown>, AxiosError>(['/api/data/', schema], poster, { revalidateOnFocus: false })

  if (error && error.response?.status === 400) {
    return {
      data: error.response?.data,
      error: undefined,
      isLoading
    }
  }

  return {
    data,
    error,
    isLoading
  }
}
