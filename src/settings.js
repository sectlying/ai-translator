import { PluginSettingTab, Setting, Notice } from 'obsidian';
import { t } from './i18n';

export class TranslatorSettingTab extends PluginSettingTab {
	constructor(app, plugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display() {
		const { containerEl } = this;
		containerEl.empty();

		containerEl.createEl('h2', { text: t('setting-title') });

		containerEl.createEl('h3', { text: t('setting-api') });

		new Setting(containerEl)
			.setName(t('setting-api-url'))
			.setDesc(t('setting-api-url-desc'))
			.addText(text => text
				.setPlaceholder('https://api.xiaomimimo.com/v1')
				.setValue(this.plugin.settings.apiBaseUrl)
				.onChange(async (value) => {
					this.plugin.settings.apiBaseUrl = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName(t('setting-api-key'))
			.setDesc(t('setting-api-key-desc'))
			.addText(text => {
				text.inputEl.type = 'password';
				text.setPlaceholder('sk-...')
					.setValue(this.plugin.settings.apiKey)
					.onChange(async (value) => {
						this.plugin.settings.apiKey = value;
						await this.plugin.saveSettings();
					});
			});

		new Setting(containerEl)
			.setName(t('setting-model'))
			.setDesc(t('setting-model-desc'))
			.addText(text => text
				.setPlaceholder('mimo-v2.5')
				.setValue(this.plugin.settings.model)
				.onChange(async (value) => {
					this.plugin.settings.model = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName(t('setting-thinking'))
			.setDesc(t('setting-thinking-desc'))
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.enableThinking)
				.onChange(async (value) => {
					this.plugin.settings.enableThinking = value;
					await this.plugin.saveSettings();
				}));

		containerEl.createEl('h3', { text: t('setting-translation') });

		new Setting(containerEl)
			.setName(t('setting-prompt'))
			.setDesc(t('setting-prompt-desc'))
			.addTextArea(text => text
				.setPlaceholder(t('setting-prompt-placeholder'))
				.setValue(this.plugin.settings.systemPrompt)
				.onChange(async (value) => {
					this.plugin.settings.systemPrompt = value;
					await this.plugin.saveSettings();
				})
				.then(ta => {
					ta.inputEl.rows = 5;
					ta.inputEl.style.width = '100%';
				}));

		containerEl.createEl('h3', { text: t('setting-popup') });

		new Setting(containerEl)
			.setName(t('setting-continuous'))
			.setDesc(t('setting-continuous-desc'))
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.continuousTranslate)
				.onChange(async (value) => {
					this.plugin.settings.continuousTranslate = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName(t('setting-dismiss'))
			.setDesc(t('setting-dismiss-desc'))
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.dismissOnFocusLoss)
				.onChange(async (value) => {
					this.plugin.settings.dismissOnFocusLoss = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName(t('setting-reset-pos'))
			.setDesc(t('setting-reset-pos-desc'))
			.addButton(btn => btn
				.setButtonText(t('setting-reset-btn'))
				.onClick(async () => {
					delete this.plugin.settings.popupPosition;
					await this.plugin.saveSettings();
					new Notice(t('notice-pos-reset'));
				}));
	}
}
