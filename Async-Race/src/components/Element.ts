class Element {
  public element: HTMLElement;

  constructor(public tag: keyof HTMLElementTagNameMap = 'div', public classList: string[] = [], public content = '', id?: string) {
    this.element = document.createElement(this.tag);
    this.element.classList.add(...this.classList);
    this.element.textContent = this.content;

    if (id) {
      this.element.id = id;
    }
  }
}

export default Element;
