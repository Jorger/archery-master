import { isValidJson } from './helpers';

const CACHE_KEY = 'ARCHERY_MASTER_JORGE';

/**
 * Guarda la información en caché (session o localstorage)...
 * @param data
 */
export const saveCache = (data: any) => {
  const finalData = JSON.stringify(data);
  window.localStorage.setItem(CACHE_KEY, finalData);
};

/**
 * Obtener la data que está guardarda en localStorage.
 * @returns
 */
export const getDataCache = () => {
  const data = window.localStorage.getItem(CACHE_KEY) || '';
  return data !== '' && isValidJson(data) ? JSON.parse(data) : {};
};

/**
 * Guarda valores de una propiedad en localstorage
 * @param property
 * @param value
 */
export const savePropierties = (property: string, value: any) => {
  const localCache = getDataCache();
  localCache[property] = value;
  saveCache(localCache);
};

/**
 * Dada una propiedad, devuelve la información de la misma
 * @param key
 * @param initial
 * @returns
 */
export const getValueFromCache = (key: string = '', initial: any) => {
  const localCache = getDataCache();
  return localCache[key] || initial;
};
