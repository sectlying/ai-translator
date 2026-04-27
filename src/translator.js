import { requestUrl } from 'obsidian';
import { t } from './i18n';

export class Translator {
	constructor(plugin) {
		this.plugin = plugin;
		this.settings = plugin.settings;
	}

	updateSettings(settings) {
		this.settings = settings;
	}

	async translate(text) {
		const { apiBaseUrl, apiKey, model, systemPrompt, enableThinking } = this.settings;

		if (!apiKey) {
			throw new Error(t('err-no-key'));
		}

		if (!model) {
			throw new Error(t('err-no-model'));
		}

		const baseUrl = apiBaseUrl.replace(/\/+$/, '');
		const url = baseUrl + '/chat/completions';

		const messages = [];
		if (systemPrompt) {
			messages.push({ role: 'system', content: systemPrompt });
		}
		messages.push({ role: 'user', content: text });

		const body = {
			model,
			messages,
			stream: false
		};

		if (enableThinking) {
			body.enable_thinking = true;
		}

		const response = await requestUrl({
			url,
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${apiKey}`
			},
			body: JSON.stringify(body)
		});

		if (response.status !== 200) {
			let msg = t('err-api') + response.status;
			try {
				const err = response.json;
				if (err?.error?.message) msg += ' - ' + err.error.message;
			} catch (e) {}
			throw new Error(msg);
		}

		const data = response.json;
		if (!data.choices || data.choices.length === 0) {
			throw new Error(t('err-no-result'));
		}

		const result = data.choices[0].message;

		if (enableThinking && result.reasoning_content) {
			return (result.content || result.reasoning_content).trim();
		}

		return (result.content || '').trim();
	}
}
