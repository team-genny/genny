import axios from "axios"

export default async function fetcher(url: string) {
  return axios.get(url).then(res => res.data)
}

export async function poster([url, data]: [string, Record<string, unknown>]) {
  return axios.post(url, data).then(res => res.data)
}
