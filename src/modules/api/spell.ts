import { getAuthHeaders, mergeJsonHeaders } from '../services/auth-token-service';
import { apiSpellsUrl } from '../services/config';
import { buildErrorFromResponse } from './api-errors';
import { Page } from './common.dto';
import { CreateSpellDto, Spell, UpdateSpellDto } from './spell.dto';

export async function fetchSpell(id: string): Promise<Spell> {
  const url = `${apiSpellsUrl}/spell-lists/${id}`;
  const response = await fetch(url, { method: 'GET', headers: getAuthHeaders() });
  if (response.status !== 200) {
    throw await buildErrorFromResponse(response, url);
  }
  return await response.json();
}

export async function fetchSpells(rsql: string, page: number, size: number): Promise<Page<Spell>> {
  const url = `${apiSpellsUrl}/spell-lists?q=${rsql}&page=${page}&size=${size}`;
  const response = await fetch(url, { method: 'GET', headers: getAuthHeaders() });
  if (response.status !== 200) {
    throw await buildErrorFromResponse(response, url);
  }
  return await response.json();
}

export async function createSpell(dto: CreateSpellDto): Promise<Spell> {
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

export async function updateSpell(spellId: string, dto: Partial<UpdateSpellDto>): Promise<Spell> {
  const url = `${apiSpellsUrl}/spell-lists/${spellId}`;
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

export async function deleteSpell(spellId: string): Promise<void> {
  const url = `${apiSpellsUrl}/spell-lists/${spellId}`;
  const response = await fetch(url, { method: 'DELETE', headers: getAuthHeaders() });
  if (response.status !== 204) {
    throw await buildErrorFromResponse(response, url);
  }
}
