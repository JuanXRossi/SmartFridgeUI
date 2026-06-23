export const JWT_LIFETIME_S = 60 * 20;
export const REFRESH_THRESHOLD_S = 5 * 60; // 5 minutos
export const AUTH_COOKIE_MAX_AGE_S =
  JWT_LIFETIME_S + REFRESH_THRESHOLD_S + 60; // (+60 latencia de red)
export const REFRESH_COOKIE_MAX_AGE_S = 60 * 60 * 24 * 7;