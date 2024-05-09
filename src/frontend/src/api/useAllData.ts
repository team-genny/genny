import useSWR from 'swr';
import fetcher from "./fetcher";
import SWRData from './SWRData';
import { KeyedMutator } from 'swr';

import { AxiosError } from 'axios';

export default function useAllData(): SWRData<{ data: unknown }> & { mutate: KeyedMutator<Record<string, unknown >>}{
  const { data, error, isLoading, mutate } = useSWR<Record<string, unknown>, AxiosError>(
    `/api/data/`,
    fetcher,
    { revalidateOnFocus: false }
  );

  if (error && error.response?.status === 400) {
    return {
      data: error.response?.data,
      error: undefined,
      isLoading,
      mutate
    };
  }
  if (error) {
    return {
      data: undefined,
      error,
      isLoading,
      mutate
    };
  }

  return {
    data: data,
    error,
    isLoading,
    mutate
  };
}