import { UrlParams } from '../types/types';

export const getUrlWithParams = (baseUrl: string, params: UrlParams = {}, id?: number): string => {
  const url = id ? new URL(`${baseUrl}/${id}`) : new URL(baseUrl);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value.toString());
  });

  return url.href;
};
