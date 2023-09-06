export const $ = document.querySelector.bind(document);
export const $$ = document.querySelectorAll.bind(document);

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

export const hasClass = (target: null | HTMLElement, className: string) => {
  if (target) {
    for (let classText of className.split(' ')) {
      return target.classList.contains(classText);
    }
  }
};

/**
 * Agrega o elimina una clase de un elemento...
 * @param {*} target
 * @param {*} className
 * @param {*} type
 */
export const classList = (
  target: null | HTMLElement,
  className: string,
  type: 'add' | 'remove' = 'add'
) => {
  if (target) {
    className.split(' ').forEach((classText) => {
      target.classList[type](classText);
    });
  }
};

export const getDOMRect = (element: HTMLElement) =>
  element.getBoundingClientRect();

export const randomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const isValidJson = (json: string): boolean => {
  try {
    JSON.parse(json);
    return true;
  } catch (_) {
    return false;
  }
};
