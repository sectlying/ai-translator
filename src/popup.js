import { t } from './i18n';

export class Popup {
	constructor(plugin) {
		this.plugin = plugin;
		this.el = null;
		this.contentEl = null;
		this.continuousToggle = null;
		this.focusToggle = null;
		this.isTranslating = false;
		this.lastTranslatedText = '';
		this.monitorInterval = null;
	}

	close() {
		if (this.monitorInterval) {
			clearInterval(this.monitorInterval);
			this.monitorInterval = null;
		}
		if (this.el) {
			this.el.remove();
			this.el = null;
			this.contentEl = null;
			this.continuousToggle = null;
			this.focusToggle = null;
		}
	}

	open(text, editor) {
		this.close();
		this.lastTranslatedText = '';
		this.isTranslating = false;

		const settings = this.plugin.settings;
		const popup = document.createElement('div');
		popup.className = 'ai-tr-popup';
		popup.tabIndex = -1;

		const header = this._buildHeader(popup, editor);
		const content = document.createElement('div');
		content.className = 'ai-tr-popup-content';
		content.textContent = t('popup-translating');

		popup.appendChild(header);
		popup.appendChild(content);
		document.body.appendChild(popup);

		this.el = popup;
		this.contentEl = content;

		this._restorePosition(popup);
		this._enableDrag(popup, header);
		this._setupFocusLoss(popup);
		popup.focus();

		this._doTranslate(text);

		if (settings.continuousTranslate) {
			this._startMonitoring(editor);
		}
	}

	_buildHeader(popup, editor) {
		const settings = this.plugin.settings;

		const header = document.createElement('div');
		header.className = 'ai-tr-popup-header';

		const title = document.createElement('span');
		title.className = 'ai-tr-popup-title';
		title.textContent = t('popup-title');

		const actions = document.createElement('div');
		actions.className = 'ai-tr-popup-actions';

		const continuousLabel = document.createElement('label');
		continuousLabel.className = 'ai-tr-popup-option';
		const continuousCb = document.createElement('input');
		continuousCb.type = 'checkbox';
		continuousCb.checked = settings.continuousTranslate;
		const continuousText = document.createElement('span');
		continuousText.textContent = t('popup-continuous');
		continuousLabel.appendChild(continuousCb);
		continuousLabel.appendChild(continuousText);
		this.continuousToggle = continuousCb;

		continuousCb.addEventListener('change', async () => {
			settings.continuousTranslate = continuousCb.checked;
			await this.plugin.saveSettings();
			if (continuousCb.checked) {
				this._startMonitoring(editor);
			} else {
				this._stopMonitoring();
			}
		});

		const focusLabel = document.createElement('label');
		focusLabel.className = 'ai-tr-popup-option';
		const focusCb = document.createElement('input');
		focusCb.type = 'checkbox';
		focusCb.checked = settings.dismissOnFocusLoss;
		const focusText = document.createElement('span');
		focusText.textContent = t('popup-dismiss-focus');
		focusLabel.appendChild(focusCb);
		focusLabel.appendChild(focusText);
		this.focusToggle = focusCb;

		focusCb.addEventListener('change', async () => {
			settings.dismissOnFocusLoss = focusCb.checked;
			await this.plugin.saveSettings();
			this._setupFocusLoss(popup);
		});

		const closeBtn = document.createElement('button');
		closeBtn.className = 'ai-tr-popup-close';
		closeBtn.textContent = '×';
		closeBtn.addEventListener('click', () => this.close());

		actions.appendChild(continuousLabel);
		actions.appendChild(focusLabel);
		actions.appendChild(closeBtn);

		header.appendChild(title);
		header.appendChild(actions);

		return header;
	}

	_setupFocusLoss(popup) {
		if (this._focusLossHandler) {
			popup.removeEventListener('focusout', this._focusLossHandler);
		}

		if (!this.plugin.settings.dismissOnFocusLoss) return;

		this._focusLossHandler = () => {
			setTimeout(() => {
				if (popup && !popup.contains(document.activeElement)) {
					this.close();
				}
			}, 150);
		};
		popup.addEventListener('focusout', this._focusLossHandler);
	}

	_restorePosition(popup) {
		const saved = this.plugin.settings.popupPosition;
		if (saved && typeof saved.x === 'number' && typeof saved.y === 'number') {
			const x = Math.max(0, Math.min(saved.x, window.innerWidth - 420));
			const y = Math.max(0, Math.min(saved.y, window.innerHeight - 320));
			popup.style.left = x + 'px';
			popup.style.top = y + 'px';
		} else {
			popup.style.top = '120px';
			popup.style.right = '20px';
		}
	}

	_savePosition(popup) {
		const rect = popup.getBoundingClientRect();
		this.plugin.settings.popupPosition = {
			x: Math.round(rect.left),
			y: Math.round(rect.top)
		};
		this.plugin.saveSettings();
	}

	_enableDrag(popup, handle) {
		let dragging = false;
		let startX = 0, startY = 0;
		let origLeft = 0, origTop = 0;

		const onMouseDown = (e) => {
			if (e.target.closest('button') || e.target.closest('label') || e.target.closest('input')) return;
			e.preventDefault();
			dragging = true;
			startX = e.clientX;
			startY = e.clientY;
			origLeft = popup.offsetLeft;
			origTop = popup.offsetTop;
			document.addEventListener('mousemove', onMouseMove);
			document.addEventListener('mouseup', onMouseUp);
		};

		const onMouseMove = (e) => {
			if (!dragging) return;
			const dx = e.clientX - startX;
			const dy = e.clientY - startY;
			popup.style.left = (origLeft + dx) + 'px';
			popup.style.top = (origTop + dy) + 'px';
			popup.style.right = 'auto';
		};

		const onMouseUp = () => {
			dragging = false;
			document.removeEventListener('mousemove', onMouseMove);
			document.removeEventListener('mouseup', onMouseUp);
			this._savePosition(popup);
		};

		handle.addEventListener('mousedown', onMouseDown);
	}

	_startMonitoring(editor) {
		this._stopMonitoring();
		this.monitorInterval = setInterval(() => {
			let selection = '';
			if (editor) {
				selection = editor.getSelection();
			} else {
				const sel = window.getSelection();
				if (sel) selection = sel.toString();
			}
			if (!selection || this.isTranslating) return;
			if (selection === this.lastTranslatedText) return;
			if (this.lastTranslatedText && this.lastTranslatedText.includes(selection)) return;
			this._doTranslate(selection);
		}, 500);
	}

	_stopMonitoring() {
		if (this.monitorInterval) {
			clearInterval(this.monitorInterval);
			this.monitorInterval = null;
		}
	}

	async _doTranslate(text) {
		if (!this.contentEl || !text.trim()) return;
		if (this.isTranslating) return;

		this.isTranslating = true;
		this.lastTranslatedText = text;
		this.contentEl.textContent = t('popup-translating');
		this.contentEl.className = 'ai-tr-popup-content';

		try {
			const result = await this.plugin.translator.translate(text);
			if (this.contentEl) {
				this.contentEl.textContent = result;
				this.contentEl.className = 'ai-tr-popup-content ai-tr-done';
			}
		} catch (error) {
			if (this.contentEl) {
				this.contentEl.textContent = t('popup-error') + error.message;
				this.contentEl.className = 'ai-tr-popup-content ai-tr-error';
			}
		} finally {
			this.isTranslating = false;
		}
	}
}
