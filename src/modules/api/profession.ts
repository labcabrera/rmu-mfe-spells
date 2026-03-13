import { getAuthHeaders } from '../services/auth-token-service';
import { apiCoreUrl } from '../services/config';
import { buildErrorFromResponse } from './api-errors';
import { Page } from './common.dto';
import { Profession } from './profession.dto';

export async function fetchProfession(professionId: string): Promise<Profession> {
  const url = `${apiCoreUrl}/professions/${professionId}`;
  console.debug("url", url);
  const response = await fetch(url, { method: 'GET', headers: getAuthHeaders() });
  if (response.status !== 200) {
    throw await buildErrorFromResponse(response, url);
  }
  // return await response.json();
  const x = await response.json();
  console.debug("X :", x);
  return x;
}

export async function fetchProfessions(rsql: string, page: number, size: number): Promise<Page<Profession>> {
  const url = `${apiCoreUrl}/professions?q=${rsql}&page=${page}&size=${size}`;
  const response = await fetch(url, { method: 'GET', headers: getAuthHeaders() });
  if (response.status !== 200) {
    throw await buildErrorFromResponse(response, url);
  }
  return await response.json();
}
