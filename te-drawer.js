if (window.customElements) {
	customElements.define('te-drawer', class extends HTMLElement {
		connectedCallback() {
			this.attachShadow({mode: 'open'}).appendChild(this.template);

			this.shadowRoot.querySelector('div').addEventListener('click', e => {
				if (e.path.shift().nodeName === 'DIV') {
					this.hide();
				}
			});

			this.addEventListener('te-drawer:swipe-hide', this.hide);
			this.addEventListener('te-drawer:swipe-show', this.show);

			this.setAttribute('role', 'region');
			this.setAttribute('aria-roledescription', 'drawer');

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

			this._getSelectableSlotElements().forEach(element => element.removeAttribute('tabindex'));
			this._getSelectableSlotElements().shift().focus();
		}

		hide() {
			this.removeAttribute('visible');
			this.setAttribute('aria-hidden', true);
			document.body.style.position = '';
			document.body.style.overflow = '';

			this._getSelectableSlotElements().forEach(element => element.setAttribute('tabindex', '-1'));
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
			document.addEventListener('touchstart', e => {
				touchVector.start = e.changedTouches.item(0);
			});

			document.addEventListener('touchend', e => {
				touchVector.end = e.changedTouches.item(0);

				const movementX = touchVector.end.screenX - touchVector.start.screenX;

				if (movementX + 100 < 0 && this.isVisible()) {
					this.dispatchEvent(new CustomEvent('te-drawer:swipe-hide'));
				}

				if (movementX - 100 > 0 && !this.isVisible()) {
					this.dispatchEvent(new CustomEvent('te-drawer:swipe-show'));
				}
			});
		}

		_registerTabEventHandling() {
			this.shadowRoot.querySelector('slot').addEventListener('slotchange', () => {
				if (!this.isVisible()) {
					this._getSelectableSlotElements().forEach(element => element.setAttribute('tabindex', '-1'));
				}

				this._getSelectableSlotElements().pop().addEventListener('keydown', e => {
					if (e.keyCode === 9 && this.isVisible()) {
						e.preventDefault();
						this.shadowRoot.querySelector('slot').assignedNodes().filter(element => {
							return element.focus && true;
						}).shift().focus();
					}
				});
			});
		}

		_getSelectableSlotElements() {
			return this.shadowRoot.querySelector('slot').assignedNodes().filter(element => {
				return (
					(
						element instanceof HTMLAnchorElement ||
						element instanceof HTMLAreaElement
					) && element.hasAttribute('href')
				) ||
				(
					(
						element instanceof HTMLInputElement ||
						element instanceof HTMLSelectElement ||
						element instanceof HTMLTextAreaElement ||
						element instanceof HTMLButtonElement
					) && !element.hasAttribute('disabled')
				) ||
				(
					element.hasAttribute && element.hasAttribute('tabindex') &&
					element.getAttribute('tabindex') !== '-1'
				);
			});
		}

		get template() {
			const drawer = document.createElement('template');
			drawer.innerHTML = `
			<style>
			:host {
				z-index:2000;
				display:block;
				position:fixed;
				height:100vh;
				width:100vw;
				top:0;
				left:0;
				pointer-events:none;
			}
			div, section {
				transition:all 220ms;
				pointer-events:none;
			}
			div {
				display:block;
				position:fixed;
				width:100vw;
				height:100vh;
				background-color:var(--te-drawer-overlay-color, rgba(0,0,0,.5));
				opacity:0;
			}
			:host([visible]) div {
				opacity:1;
				pointer-events:auto;
			}
			section {
				height:100vh;
				margin-left:-100%;
				background:var(--te-drawer-background, white);
				width:75vw;
				max-width:var(--te-drawer-max-width, 360px);
				min-width:320px;
				box-shadow:var(--te-drawer-shadow, none);
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
			return drawer.content.cloneNode(true);
		}
	});
} else {
	throw new Error(`te-drawer could not be registered`);
}
