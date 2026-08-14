/**
 * API Configuration for OctoFit Tracker Frontend
 * Handles both Codespaces and localhost environments
 */

// Get the API base URL based on environment
export const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

  // If CODESPACE_NAME is set, use Codespaces URL
  if (codespaceName && codespaceName.trim() !== '') {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  // Fallback to localhost for local development
  return 'http://localhost:8000';
};

// Build full API endpoint URL
export const buildApiUrl = (endpoint) => {
  const baseUrl = getApiBaseUrl();
  return `${baseUrl}${endpoint}`;
};

// Fetch API data with error handling
export const fetchApiData = async (endpoint) => {
  try {
    const url = buildApiUrl(endpoint);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch from ${endpoint}:`, error);
    throw error;
  }
};

// Extract data from API response
// Handles both paginated (with .data property) and direct array responses
export const extractData = (response) => {
  if (response && response.data) {
    return Array.isArray(response.data) ? response.data : [response.data];
  }
  if (Array.isArray(response)) {
    return response;
  }
  return [];
};

export default {
  getApiBaseUrl,
  buildApiUrl,
  fetchApiData,
  extractData,
};
