import { camelCaseToDash } from "./utils";

class ExElement {
  static create(tagName: keyof HTMLElementTagNameMap, options?: ElementCreationOptions) {
    return new ExElement(document.createElement(tagName, options));
  }

  static get(selector: string) {
    const find = document.querySelector(selector);
    
    if (find !== null) {
      return new ExElement(find as HTMLElement);
    } else {
      return null;
    }
  }

  private el!: HTMLElement;
  private eventMap: {
    [key: string]: (EventListenerOrEventListenerObject | null)[];
  } = {};

  constructor(el: HTMLElement) {
    this.el = el;
  }

  getEl() {
    return this.el;
  }

  addClass(appendClassName: string) {
    if (!this.el.className || !this.el.className.trim()) {
      this.el.className = appendClassName;
    } else if (this.el.className.indexOf(appendClassName) === -1) {
      this.el.className = `${this.el.className.trim()} ${appendClassName}`;
    }
    return this;
  }

  addClasses(...appendClassNames: string[]) {
    appendClassNames.forEach(appendClassName => this.addClass(appendClassName));
    return this;
  }

  removeClass(removeClassName: string) {
    if (this.el.className && this.el.className.indexOf(removeClassName) !== -1) {
      this.el.className = this.el.className
        .split(' ')
        .filter(e => e.trim() && e !== removeClassName)
        .join(' ');
    }
    return this;
  }

  removeClasses(...removeClassNames: string[]) {
    removeClassNames.forEach(removeClassName => this.removeClass(removeClassName));
    return this;
  }

  toggleClass(toggle: boolean, targetClassName: string) {
    return toggle ? this.addClass(targetClassName) : this.removeClass(targetClassName);
  }

  classList() {
    return this.el.className ? this.el.className.split(' ') : [];
  }

  show() {
    this.el.style.display = 'block';
    return this;
  }

  hide() {
    this.el.style.display = 'none';
    return this;
  }

  view(isView: boolean) {
    return isView ? this.show() : this.hide();
  }

  set text(val: string) {
    this.el.textContent = val;
  }

  get text() {
    const textContent = this.el.textContent;

    if (textContent === null) {
      return '';
    }
    return textContent;
  }

  setText(val: string) {
    this.text = val;
    return this;
  }

  getText(): string | null {
    return this.text;
  }

  append(element: this) {
    this.el.appendChild(element.el);
    return this;
  }

  appendTo(element: this) {
    element.append(this);
    return this;
  }

  prepend(element: this) {
    this.el.prepend(element.el);
    return this;
  }

  prependTo(element: this) {
    element.prepend(this);
    return this;
  }

  setStyle(styleObj: Partial<CSSStyleDeclaration>) {
    for (const key in styleObj) {
      const propertyKey = camelCaseToDash(key);
      const value = styleObj[key];
      
      if (value === undefined) {
        continue;
      }

      const importantIdx = value.indexOf(' !important');
  
      if (importantIdx !== -1) {
        this.el.style.setProperty(propertyKey, value.substring(0, importantIdx), 'important');
      } else {
        this.el.style.setProperty(propertyKey, value);
      }
    }

    return this;
  }

  on(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) {
    this.el.addEventListener(type, listener, options);
    
    if (!this.eventMap[type]) this.eventMap[type] = [];

    this.eventMap[type].push(listener);
    return this.eventMap[type].length - 1;
  }

  off(type: string, eventIdx?: number, options?: boolean | EventListenerOptions) {
    if (!this.eventMap[type]) {
      return;
    }

    if (undefined !== eventIdx && this.eventMap[type] && this.eventMap[type][eventIdx] !== null) {
      this.el.removeEventListener(type, this.eventMap[type][eventIdx] as EventListenerOrEventListenerObject, options);
      this.eventMap[type].splice(eventIdx, 1, null);
      
      return;
    }

    this.eventMap[type].forEach(eventListener => {
      if (eventListener !== null) this.el.removeEventListener(type, eventListener, options);
    })
    this.eventMap[type] = [];
  }
}

export default ExElement;