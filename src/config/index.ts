const APP_VERSION = import.meta.env.VITE_APP_VERSION 
const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v${APP_VERSION}`;

export {
    APP_VERSION,
    BASE_URL
}