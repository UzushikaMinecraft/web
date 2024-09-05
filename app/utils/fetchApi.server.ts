import fetch from 'node-fetch';

const API_BASE_URL = process.env.NODE_ENV === 'production' ? 'http://host.docker.internal:3000/api/' : 'https://uzsk.iamtakagi.net/api/';

export async function fetchApiObject<T extends any>(path: string) {
  const response = await fetch(`${API_BASE_URL}${path}`);
  if (!response.ok) {
    return null;
  }

  const json = await response.json();

  return json as T;
}

export async function fetchApiText(path: string) {
  const response = await fetch(`${API_BASE_URL}${path}`);
  if (!response.ok) {
    return null;
  }

  const text = await response.text();

  return text.replace(/"/g, '');
}

