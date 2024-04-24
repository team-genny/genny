type SWRData<T> = T & {
  error?: Error,
  isLoading: boolean,
}

export default SWRData
