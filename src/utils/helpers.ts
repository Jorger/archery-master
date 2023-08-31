import type { Callback } from '../interfaces/index';
import { WIDTH, HEIGHT } from './constants';

export const $ = document.querySelector.bind(document);
export const $$ = document.querySelectorAll.bind(document);

// export const html = String.raw;

export const isMobile = () =>
  /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
export const ObjectKeys = (o: any) => Object.keys(o);

export const delay = (m: number) =>
  new Promise((resolve) => setTimeout(resolve, m));

export const clone = (v: any) => JSON.parse(JSON.stringify(v));

export const $on = (
  target: HTMLElement,
  type: any,
  callback: (this: HTMLElement, ev: any) => any
) => target?.addEventListener(type, callback);

export const setHtml = (element: HTMLElement | null, html: string): void => {
  if (element) {
    element.innerHTML = html;
  }
};

export const addStyle = (
  target: null | HTMLElement,
  styles: Record<string, string>
): void => {
  if (target) {
    for (const style in styles) {
      target.style[style as any] = styles[style];
    }
  }
};

export const getDOMRect = (element: HTMLElement) =>
  element.getBoundingClientRect();

export const newArray = <T>(size: number, cb: Callback<T>): string =>
  new Array(size)
    .fill(null)
    .map((_, i) => cb(i, (v) => v))
    .join('');

// TODO; ver si se necesita
export const randomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const onWindowResize = () => {
  const { innerWidth: w, innerHeight: h } = window;
  const scale = Math.min(w / WIDTH, h / HEIGHT);
  const mobile = isMobile();
  addStyle($('body'), {
    zoom: `${w < WIDTH ? Math.round((w / WIDTH) * 100) : 100}%`,
    transform: scale >= 1 || mobile ? `scale(${!mobile ? scale : 1})` : 'none'
  });
};
