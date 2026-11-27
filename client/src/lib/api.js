const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:3001/api').replace(/\/$/, '');

export async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
    },
  });

  if (response.status === 204) return null;
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = payload.message || payload.errors?.join('. ') || `Помилка запиту (${response.status})`;
    throw new Error(message);
  }
  return payload;
}

export const getCampaigns = () => apiRequest('/items');
export const getCampaign = (id) => apiRequest(`/items/${encodeURIComponent(id)}`);
export const createCampaign = (data) => apiRequest('/items', { method: 'POST', body: JSON.stringify(data) });
export const updateCampaign = (id, data) => apiRequest(`/items/${encodeURIComponent(id)}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteCampaign = (id) => apiRequest(`/items/${encodeURIComponent(id)}`, { method: 'DELETE' });
export const createDonationDemo = (id, amount) => apiRequest(`/items/${encodeURIComponent(id)}/donations`, { method: 'POST', body: JSON.stringify({ amount }) });
export const sendContact = (data) => apiRequest('/contact', { method: 'POST', body: JSON.stringify(data) });
