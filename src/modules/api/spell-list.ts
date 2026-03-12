import { getAuthHeaders, mergeJsonHeaders } from '../services/auth-token-service';
import { apiSpellsUrl } from '../services/config';
import { buildErrorFromResponse } from './api-errors';
import { Page } from './common.dto';
import { CreateSpellListDto, SpellList, UpdateSpellListDto } from './spell-list.dto';

export async function fetchSpellList(id: string): Promise<SpellList> {
  const url = `${apiSpellsUrl}/spell-lists/${id}`;
  const response = await fetch(url, { method: 'GET', headers: getAuthHeaders() });
  if (response.status !== 200) {
    throw await buildErrorFromResponse(response, url);
  }
  return await response.json();
}

export async function fetchSpellLists(rsql: string, page: number, size: number): Promise<Page<SpellList>> {
  const url = `${apiSpellsUrl}/spell-lists?q=${rsql}&page=${page}&size=${size}`;
  const response = await fetch(url, { method: 'GET', headers: getAuthHeaders() });
  if (response.status !== 200) {
    throw await buildErrorFromResponse(response, url);
  }
  return await response.json();
}

export async function createSpellList(dto: CreateSpellListDto): Promise<SpellList> {
  const url = `${apiSpellsUrl}/spell-lists`;
  const response = await fetch(url, {
    method: 'POST',
    headers: mergeJsonHeaders(),
    body: JSON.stringify(dto),
  });
  if (response.status !== 201) {
    throw await buildErrorFromResponse(response, url);
  }
  return await response.json();
}

export async function updateSpellList(spellListId: string, dto: Partial<UpdateSpellListDto>): Promise<SpellList> {
  const url = `${apiSpellsUrl}/spell-lists/${spellListId}`;
  const response = await fetch(url, {
    method: 'PATCH',
    headers: mergeJsonHeaders(),
    body: JSON.stringify(dto),
  });
  if (response.status !== 200) {
    throw await buildErrorFromResponse(response, url);
  }
  return await response.json();
}

export async function deleteSpellList(spellListId: string): Promise<void> {
  const url = `${apiSpellsUrl}/spell-lists/${spellListId}`;
  const response = await fetch(url, { method: 'DELETE', headers: getAuthHeaders() });
  if (response.status !== 204) {
    throw await buildErrorFromResponse(response, url);
  }
}
