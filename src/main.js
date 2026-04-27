import { Plugin, Notice, MarkdownView } from 'obsidian';
import { Translator } from './translator';
import { Popup } from './popup';
import { TranslatorSettingTab } from './settings';
import { t } from './i18n';

const DEFAULT_SETTINGS = {
	apiBaseUrl: 'https://api.xiaomimimo.com/v1',
	apiKey: '',
	model: 'mimo-v2.5',
	enableThinking: false,
	systemPrompt: 'You are a translation engine. Translate the following English text into natural, fluent Chinese. Output only the translated text — no explanations, no commentary, no formatting, no extra content whatsoever.',
	continuousTranslate: true,
	dismissOnFocusLoss: true,
	popupPosition: null
};

export default class AITranslatorPlugin extends Plugin {
	async onload() {
		await this.loadSettings();
		this.translator = new Translator(this);
		this.popup = new Popup(this);

		this.addCommand({
			id: 'translate-selection',
			name: t('cmd-translate'),
			callback: () => {
				const text = this.getSelectedText();
				if (text) {
					this.popup.open(text, this.getEditor());
				} else {
					new Notice(t('notice-select-first'));
				}
			}
		});

		this.registerEvent(
			this.app.workspace.on('editor-menu', (menu, editor) => {
				menu.addItem((item) => {
					item
						.setTitle(t('menu-translate'))
						.setIcon('languages')
						.onClick(() => {
							const selection = editor.getSelection();
							if (selection) {
								this.popup.open(selection, editor);
							} else {
								new Notice(t('notice-select-first'));
							}
						});
				});
			})
		);

		this.addSettingTab(new TranslatorSettingTab(this.app, this));
	}

	onunload() {
		this.popup.close();
	}

	getSelectedText() {
		const sel = window.getSelection();
		if (sel && sel.toString().trim()) {
			return sel.toString();
		}
		const editor = this.getEditor();
		if (editor) {
			const s = editor.getSelection();
			if (s && s.trim()) return s;
		}
		return '';
	}

	getEditor() {
		const view = this.app.workspace.getActiveViewOfType(MarkdownView);
		return view ? view.editor : null;
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
		if (this.translator) {
			this.translator.updateSettings(this.settings);
		}
	}
}
