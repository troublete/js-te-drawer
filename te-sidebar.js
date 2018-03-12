if (window.customElements) {
	customElements.define('te-sidebar', class extends HTMLElement {
		connectedCallback() {
			this.attachShadow({mode: 'open'}).appendChild(this.template);

			this.addEventListener('te-sidebar:swipe-hide', this.hide);
			this.addEventListener('te-sidebar:swipe-show', this.show);

			this.setAttribute('role', 'region');
			this.setAttribute('aria-roledescription', 'sidebar');

			if (this.isVisible()) {
				this.show();
			} else {
				this.hide();
			}

			this._registerTouchEvent();
			this._registerTabEventHandling();
		}

		show() {
			this.setAttribute('visible', true);
			this.setAttribute('aria-hidden', false);
			document.body.style.position = 'fixed';
			document.body.style.overflow = 'hidden';
		}

		hide() {
			this.removeAttribute('visible');
			this.setAttribute('aria-hidden', true);
			document.body.style.position = '';
			document.body.style.overflow = '';
		}

		isVisible() {
			return this.hasAttribute('visible');
		}

		toggle() {
			if (this.isVisible()) {
				this.hide();
			} else {
				this.show();
			}
		}

		_registerTouchEvent() {
			const touchVector = {start: {}, end: {}};
			this.addEventListener('touchstart', e => {
				touchVector.start = e.changedTouches.item(0);
			});

			this.addEventListener('touchend', e => {
				touchVector.end = e.changedTouches.item(0);

				const movementX = touchVector.end.screenX - touchVector.start.screenX;

				if (movementX + 100 < 0 && this.isVisible()) {
					this.dispatchEvent(new CustomEvent('te-sidebar:swipe-hide'));
				}

				if (movementX - 100 > 0 && !this.isVisible()) {
					this.dispatchEvent(new CustomEvent('te-sidebar:swipe-show'));
				}
			});
		}

		_registerTabEventHandling() {
			this.shadowRoot.querySelector('slot').addEventListener('slotchange', () => {
				this.shadowRoot.querySelector('slot')
					.assignedNodes().filter(element => element instanceof HTMLElement)
					.pop().addEventListener('keydown', e => {
						if (e.keyCode === 9 && this.isVisible()) {
							e.preventDefault();
							this.shadowRoot.querySelector('slot').assignedNodes().filter(element => {
								return element.focus && true;
							}).shift().focus();
						}
					});


			});
		}

		get template() {
			const sidebar = document.createElement('template');
			sidebar.innerHTML = `
			<style>
			:host {
				z-index:9999;
				display:block;
				position:fixed;
				height:100vh;
				width:100vw;
				top:0;
				left:0;
			}
			div, section {
				transition:all 220ms;
			}
			div {
				pointer-events:none;
				display:block;
				position:fixed;
				width:100vw;
				height:100vh;
				background-color:var(--te-sidebar-overlay-color, rgba(0,0,0,.5));
				opacity:0;
			}
			:host([visible]) div {
				opacity:1;
				pointer-events:auto;
			}
			section {
				pointer-events:none;
				height:100vh;
				margin-left:-100%;
				background:var(--te-sidebar-background, white);
				width:75vw;
				max-width:var(--te-sidebar-max-width, 360px);
				min-width:320px;
				box-shadow:var(--te-sidebar-shadow, none);
			}
			:host([visible]) section {
				margin-left:0;
				pointer-events:auto;
			}
			</style>
			<div>
			  <section>
				<slot></slot>
			  </section>
			</div>`;
			return sidebar.content.cloneNode(true);
		}
	});
} else {
	throw new Error(`te-sidebar could not be registered`);
}
