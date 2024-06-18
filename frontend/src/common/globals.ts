export const API_URI = import.meta.env.DEV
    ? 'http://localhost:8000'
    : import.meta.env.VITE_APP_API_BASE_URL;

export const AGENT_URI = import.meta.env.DEV
    ? 'http://localhost'
    : import.meta.env.VITE_APP_AGENTS_BASE_URL;

export const AGENT_UUID = import.meta.env.VITE_APP_AGENT_UUID;
