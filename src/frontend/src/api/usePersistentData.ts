import useSWR from 'swr';
import fetcher from "./fetcher";
import SWRData from './SWRData';

import { AxiosError } from 'axios';

export default function usePersistentData(dataId: string): SWRData<{ data: unknown }> {
  const { data, error, isLoading } = useSWR<Record<string, unknown>, AxiosError>(
    `/api/data/${dataId}`,
    fetcher,
    { revalidateOnFocus: false }
  );

  if (error && error.response?.status === 400) {
    return {
      data: error.response?.data,
      error: undefined,
      isLoading,
    };
  }
  if (error) {
    return {
      data: undefined,
      error,
      isLoading,
    };
  }

  return {
    data,
    error,
    isLoading,
  };
}