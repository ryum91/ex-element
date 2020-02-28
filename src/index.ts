class ExElement {
  static create(tagName: keyof HTMLElementTagNameMap, options?: ElementCreationOptions) {
    return new ExElement(document.createElement(tagName, options));
  }

  private el!: HTMLElement;

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

  removeClass(removeClassName: string) {
    if (this.el.className && this.el.className.indexOf(removeClassName) !== -1) {
      this.el.className = this.el.className
        .split(' ')
        .filter(e => e.trim() && e !== removeClassName)
        .join(' ');
    }
    return this;
  }

  toggleClass(toggle: boolean, targetClassName: string) {
    return toggle ? this.addClass(targetClassName) : this.removeClass(targetClassName);
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

  setStyle(styleObj: Partial<CSSStyleDeclaration>) {
    for (const key in styleObj) {
      const value = styleObj[key]!;
      
      const importantIdx = value.indexOf(' !important');
  
      if (importantIdx !== -1) {
        this.el.style.setProperty(key, value.substring(0, importantIdx), 'important');
      } else {
        this.el.style.setProperty(key, value);
      }
    }

    return this;
  }
}

export default ExElement;