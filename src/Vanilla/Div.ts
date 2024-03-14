const template = `
  <style>
    :host {
      width: 100%;
    }
  </style>
  <slot></slot>
`;

export class Div extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}

	connectedCallback() {
		this.render();
	}

	render() {
    if (this.shadowRoot) {
		  this.shadowRoot.innerHTML = template;
    }
	}
}
