class Element {
  public element: HTMLElement;

  constructor(public tag: keyof HTMLElementTagNameMap = 'div', public classList: string[] = [], public content = '') {
    this.element = document.createElement(this.tag);
    this.element.classList.add(...this.classList);
    this.element.textContent = this.content;
  }
}

export default Element;
