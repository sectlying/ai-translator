var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.js
var main_exports = {};
__export(main_exports, {
  default: () => AITranslatorPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian3 = require("obsidian");

// src/translator.js
var import_obsidian = require("obsidian");

// locales/en.json
var en_default = {
  "plugin-name": "AI Translator",
  "cmd-translate": "Translate Selection",
  "menu-translate": "Translate Selection",
  "notice-select-first": "Please select text to translate first",
  "popup-title": "AI Translate",
  "popup-translating": "Translating...",
  "popup-continuous": "Continuous",
  "popup-dismiss-focus": "Dismiss on blur",
  "popup-error": "Translation failed: ",
  "setting-title": "AI Translator Settings",
  "setting-api": "API Configuration",
  "setting-api-url": "API Base URL",
  "setting-api-url-desc": "OpenAI-compatible base URL, e.g. https://api.xiaomimimo.com/v1",
  "setting-api-key": "API Key",
  "setting-api-key-desc": "Your API key",
  "setting-model": "Model",
  "setting-model-desc": "e.g. mimo-v2.5, gpt-4o, qwen-plus",
  "setting-thinking": "Enable Thinking",
  "setting-thinking-desc": "Enable reasoning/thinking mode (requires model support)",
  "setting-translation": "Translation",
  "setting-prompt": "System Prompt",
  "setting-prompt-desc": "Prompt used for translation. Controls target language and style.",
  "setting-prompt-placeholder": "You are a professional translation assistant...",
  "setting-popup": "Popup Behavior",
  "setting-continuous": "Continuous Translation",
  "setting-continuous-desc": "Automatically translate when text selection changes",
  "setting-dismiss": "Dismiss on Focus Loss",
  "setting-dismiss-desc": "Close popup when clicking outside it",
  "setting-reset-pos": "Reset Popup Position",
  "setting-reset-pos-desc": "Restore popup position to default",
  "setting-reset-btn": "Reset",
  "notice-pos-reset": "Popup position reset",
  "err-no-key": "API Key not configured. Please set it in plugin settings.",
  "err-no-model": "Model not configured. Please set it in plugin settings.",
  "err-api": "API Error: ",
  "err-no-result": "No content returned from API"
};

// locales/zh.json
var zh_default = {
  "plugin-name": "AI \u7FFB\u8BD1\u52A9\u624B",
  "cmd-translate": "\u7FFB\u8BD1\u9009\u4E2D\u6587\u672C",
  "menu-translate": "\u7FFB\u8BD1\u9009\u4E2D\u6587\u672C",
  "notice-select-first": "\u8BF7\u5148\u9009\u4E2D\u8981\u7FFB\u8BD1\u7684\u6587\u672C",
  "popup-title": "AI \u7FFB\u8BD1",
  "popup-translating": "\u7FFB\u8BD1\u4E2D...",
  "popup-continuous": "\u8FDE\u7EED\u7FFB\u8BD1",
  "popup-dismiss-focus": "\u79BB\u7126\u6D88\u5931",
  "popup-error": "\u7FFB\u8BD1\u5931\u8D25: ",
  "setting-title": "AI \u7FFB\u8BD1\u8BBE\u7F6E",
  "setting-api": "API \u914D\u7F6E",
  "setting-api-url": "API \u5730\u5740",
  "setting-api-url-desc": "\u517C\u5BB9 OpenAI \u63A5\u53E3\u7684 Base URL\uFF0C\u4F8B\u5982 https://api.xiaomimimo.com/v1",
  "setting-api-key": "API Key",
  "setting-api-key-desc": "\u4F60\u7684 API \u5BC6\u94A5",
  "setting-model": "\u6A21\u578B\u540D\u79F0",
  "setting-model-desc": "\u4F8B\u5982 mimo-v2.5\u3001gpt-4o\u3001qwen-plus \u7B49",
  "setting-thinking": "\u542F\u7528\u601D\u8003\u6A21\u5F0F",
  "setting-thinking-desc": "\u5F00\u542F\u63A8\u7406/\u601D\u8003\u6A21\u5F0F\uFF08\u9700\u8981\u6A21\u578B\u652F\u6301\uFF09",
  "setting-translation": "\u7FFB\u8BD1\u8BBE\u7F6E",
  "setting-prompt": "\u7CFB\u7EDF\u63D0\u793A\u8BCD",
  "setting-prompt-desc": "\u7528\u4E8E\u7FFB\u8BD1\u7684\u63D0\u793A\u8BCD\uFF0C\u63A7\u5236\u76EE\u6807\u8BED\u8A00\u548C\u98CE\u683C",
  "setting-prompt-placeholder": "\u4F60\u662F\u4E00\u4E2A\u4E13\u4E1A\u7684\u7FFB\u8BD1\u52A9\u624B...",
  "setting-popup": "\u5F39\u7A97\u884C\u4E3A",
  "setting-continuous": "\u8FDE\u7EED\u7FFB\u8BD1",
  "setting-continuous-desc": "\u9009\u4E2D\u6587\u672C\u53D8\u5316\u65F6\u81EA\u52A8\u7FFB\u8BD1",
  "setting-dismiss": "\u79BB\u7126\u81EA\u52A8\u5173\u95ED",
  "setting-dismiss-desc": "\u70B9\u51FB\u5F39\u7A97\u5916\u90E8\u65F6\u81EA\u52A8\u5173\u95ED\u5F39\u7A97",
  "setting-reset-pos": "\u91CD\u7F6E\u5F39\u7A97\u4F4D\u7F6E",
  "setting-reset-pos-desc": "\u5C06\u5F39\u7A97\u4F4D\u7F6E\u6062\u590D\u4E3A\u9ED8\u8BA4\u4F4D\u7F6E",
  "setting-reset-btn": "\u91CD\u7F6E",
  "notice-pos-reset": "\u5F39\u7A97\u4F4D\u7F6E\u5DF2\u91CD\u7F6E",
  "err-no-key": "\u672A\u914D\u7F6E API Key\uFF0C\u8BF7\u5728\u63D2\u4EF6\u8BBE\u7F6E\u4E2D\u586B\u5199",
  "err-no-model": "\u672A\u914D\u7F6E\u6A21\u578B\u540D\u79F0\uFF0C\u8BF7\u5728\u63D2\u4EF6\u8BBE\u7F6E\u4E2D\u586B\u5199",
  "err-api": "API \u9519\u8BEF: ",
  "err-no-result": "API \u672A\u8FD4\u56DE\u7FFB\u8BD1\u7ED3\u679C"
};

// src/i18n.js
var localeMap = { en: en_default, zh: zh_default };
function t(key) {
  const lang = window.localStorage.getItem("language") || "en";
  const locale = localeMap[lang] || localeMap[lang.split("-")[0]] || localeMap["en"];
  return locale[key] || en_default[key] || key;
}

// src/translator.js
var Translator = class {
  constructor(plugin) {
    this.plugin = plugin;
    this.settings = plugin.settings;
  }
  updateSettings(settings) {
    this.settings = settings;
  }
  async translate(text) {
    var _a;
    const { apiBaseUrl, apiKey, model, systemPrompt, enableThinking } = this.settings;
    if (!apiKey) {
      throw new Error(t("err-no-key"));
    }
    if (!model) {
      throw new Error(t("err-no-model"));
    }
    const baseUrl = apiBaseUrl.replace(/\/+$/, "");
    const url = baseUrl + "/chat/completions";
    const messages = [];
    if (systemPrompt) {
      messages.push({ role: "system", content: systemPrompt });
    }
    messages.push({ role: "user", content: text });
    const body = {
      model,
      messages,
      stream: false
    };
    if (enableThinking) {
      body.enable_thinking = true;
    }
    const response = await (0, import_obsidian.requestUrl)({
      url,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify(body)
    });
    if (response.status !== 200) {
      let msg = t("err-api") + response.status;
      try {
        const err = response.json;
        if ((_a = err == null ? void 0 : err.error) == null ? void 0 : _a.message) msg += " - " + err.error.message;
      } catch (e) {
      }
      throw new Error(msg);
    }
    const data = response.json;
    if (!data.choices || data.choices.length === 0) {
      throw new Error(t("err-no-result"));
    }
    const result = data.choices[0].message;
    if (enableThinking && result.reasoning_content) {
      return (result.content || result.reasoning_content).trim();
    }
    return (result.content || "").trim();
  }
};

// src/popup.js
var Popup = class {
  constructor(plugin) {
    this.plugin = plugin;
    this.el = null;
    this.contentEl = null;
    this.continuousToggle = null;
    this.focusToggle = null;
    this.isTranslating = false;
    this.lastTranslatedText = "";
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
    this.lastTranslatedText = "";
    this.isTranslating = false;
    const settings = this.plugin.settings;
    const popup = document.createElement("div");
    popup.className = "ai-tr-popup";
    popup.tabIndex = -1;
    const header = this._buildHeader(popup, editor);
    const content = document.createElement("div");
    content.className = "ai-tr-popup-content";
    content.textContent = t("popup-translating");
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
    const header = document.createElement("div");
    header.className = "ai-tr-popup-header";
    const title = document.createElement("span");
    title.className = "ai-tr-popup-title";
    title.textContent = t("popup-title");
    const actions = document.createElement("div");
    actions.className = "ai-tr-popup-actions";
    const continuousLabel = document.createElement("label");
    continuousLabel.className = "ai-tr-popup-option";
    const continuousCb = document.createElement("input");
    continuousCb.type = "checkbox";
    continuousCb.checked = settings.continuousTranslate;
    const continuousText = document.createElement("span");
    continuousText.textContent = t("popup-continuous");
    continuousLabel.appendChild(continuousCb);
    continuousLabel.appendChild(continuousText);
    this.continuousToggle = continuousCb;
    continuousCb.addEventListener("change", async () => {
      settings.continuousTranslate = continuousCb.checked;
      await this.plugin.saveSettings();
      if (continuousCb.checked) {
        this._startMonitoring(editor);
      } else {
        this._stopMonitoring();
      }
    });
    const focusLabel = document.createElement("label");
    focusLabel.className = "ai-tr-popup-option";
    const focusCb = document.createElement("input");
    focusCb.type = "checkbox";
    focusCb.checked = settings.dismissOnFocusLoss;
    const focusText = document.createElement("span");
    focusText.textContent = t("popup-dismiss-focus");
    focusLabel.appendChild(focusCb);
    focusLabel.appendChild(focusText);
    this.focusToggle = focusCb;
    focusCb.addEventListener("change", async () => {
      settings.dismissOnFocusLoss = focusCb.checked;
      await this.plugin.saveSettings();
      this._setupFocusLoss(popup);
    });
    const closeBtn = document.createElement("button");
    closeBtn.className = "ai-tr-popup-close";
    closeBtn.textContent = "\xD7";
    closeBtn.addEventListener("click", () => this.close());
    actions.appendChild(continuousLabel);
    actions.appendChild(focusLabel);
    actions.appendChild(closeBtn);
    header.appendChild(title);
    header.appendChild(actions);
    return header;
  }
  _setupFocusLoss(popup) {
    if (this._focusLossHandler) {
      popup.removeEventListener("focusout", this._focusLossHandler);
    }
    if (!this.plugin.settings.dismissOnFocusLoss) return;
    this._focusLossHandler = () => {
      setTimeout(() => {
        if (popup && !popup.contains(document.activeElement)) {
          this.close();
        }
      }, 150);
    };
    popup.addEventListener("focusout", this._focusLossHandler);
  }
  _restorePosition(popup) {
    const saved = this.plugin.settings.popupPosition;
    if (saved && typeof saved.x === "number" && typeof saved.y === "number") {
      const x = Math.max(0, Math.min(saved.x, window.innerWidth - 420));
      const y = Math.max(0, Math.min(saved.y, window.innerHeight - 320));
      popup.style.left = x + "px";
      popup.style.top = y + "px";
    } else {
      popup.style.top = "120px";
      popup.style.right = "20px";
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
      if (e.target.closest("button") || e.target.closest("label") || e.target.closest("input")) return;
      e.preventDefault();
      dragging = true;
      startX = e.clientX;
      startY = e.clientY;
      origLeft = popup.offsetLeft;
      origTop = popup.offsetTop;
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    };
    const onMouseMove = (e) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      popup.style.left = origLeft + dx + "px";
      popup.style.top = origTop + dy + "px";
      popup.style.right = "auto";
    };
    const onMouseUp = () => {
      dragging = false;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      this._savePosition(popup);
    };
    handle.addEventListener("mousedown", onMouseDown);
  }
  _startMonitoring(editor) {
    this._stopMonitoring();
    this.monitorInterval = setInterval(() => {
      let selection = "";
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
    this.contentEl.textContent = t("popup-translating");
    this.contentEl.className = "ai-tr-popup-content";
    try {
      const result = await this.plugin.translator.translate(text);
      if (this.contentEl) {
        this.contentEl.textContent = result;
        this.contentEl.className = "ai-tr-popup-content ai-tr-done";
      }
    } catch (error) {
      if (this.contentEl) {
        this.contentEl.textContent = t("popup-error") + error.message;
        this.contentEl.className = "ai-tr-popup-content ai-tr-error";
      }
    } finally {
      this.isTranslating = false;
    }
  }
};

// src/settings.js
var import_obsidian2 = require("obsidian");
var TranslatorSettingTab = class extends import_obsidian2.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: t("setting-title") });
    containerEl.createEl("h3", { text: t("setting-api") });
    new import_obsidian2.Setting(containerEl).setName(t("setting-api-url")).setDesc(t("setting-api-url-desc")).addText((text) => text.setPlaceholder("https://api.xiaomimimo.com/v1").setValue(this.plugin.settings.apiBaseUrl).onChange(async (value) => {
      this.plugin.settings.apiBaseUrl = value;
      await this.plugin.saveSettings();
    }));
    new import_obsidian2.Setting(containerEl).setName(t("setting-api-key")).setDesc(t("setting-api-key-desc")).addText((text) => {
      text.inputEl.type = "password";
      text.setPlaceholder("sk-...").setValue(this.plugin.settings.apiKey).onChange(async (value) => {
        this.plugin.settings.apiKey = value;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian2.Setting(containerEl).setName(t("setting-model")).setDesc(t("setting-model-desc")).addText((text) => text.setPlaceholder("mimo-v2.5").setValue(this.plugin.settings.model).onChange(async (value) => {
      this.plugin.settings.model = value;
      await this.plugin.saveSettings();
    }));
    new import_obsidian2.Setting(containerEl).setName(t("setting-thinking")).setDesc(t("setting-thinking-desc")).addToggle((toggle) => toggle.setValue(this.plugin.settings.enableThinking).onChange(async (value) => {
      this.plugin.settings.enableThinking = value;
      await this.plugin.saveSettings();
    }));
    containerEl.createEl("h3", { text: t("setting-translation") });
    new import_obsidian2.Setting(containerEl).setName(t("setting-prompt")).setDesc(t("setting-prompt-desc")).addTextArea((text) => text.setPlaceholder(t("setting-prompt-placeholder")).setValue(this.plugin.settings.systemPrompt).onChange(async (value) => {
      this.plugin.settings.systemPrompt = value;
      await this.plugin.saveSettings();
    }).then((ta) => {
      ta.inputEl.rows = 5;
      ta.inputEl.style.width = "100%";
    }));
    containerEl.createEl("h3", { text: t("setting-popup") });
    new import_obsidian2.Setting(containerEl).setName(t("setting-continuous")).setDesc(t("setting-continuous-desc")).addToggle((toggle) => toggle.setValue(this.plugin.settings.continuousTranslate).onChange(async (value) => {
      this.plugin.settings.continuousTranslate = value;
      await this.plugin.saveSettings();
    }));
    new import_obsidian2.Setting(containerEl).setName(t("setting-dismiss")).setDesc(t("setting-dismiss-desc")).addToggle((toggle) => toggle.setValue(this.plugin.settings.dismissOnFocusLoss).onChange(async (value) => {
      this.plugin.settings.dismissOnFocusLoss = value;
      await this.plugin.saveSettings();
    }));
    new import_obsidian2.Setting(containerEl).setName(t("setting-reset-pos")).setDesc(t("setting-reset-pos-desc")).addButton((btn) => btn.setButtonText(t("setting-reset-btn")).onClick(async () => {
      delete this.plugin.settings.popupPosition;
      await this.plugin.saveSettings();
      new import_obsidian2.Notice(t("notice-pos-reset"));
    }));
  }
};

// src/main.js
var DEFAULT_SETTINGS = {
  apiBaseUrl: "https://api.xiaomimimo.com/v1",
  apiKey: "",
  model: "mimo-v2.5",
  enableThinking: false,
  systemPrompt: "You are a translation engine. Translate the following English text into natural, fluent Chinese. Output only the translated text \u2014 no explanations, no commentary, no formatting, no extra content whatsoever.",
  continuousTranslate: true,
  dismissOnFocusLoss: true,
  popupPosition: null
};
var AITranslatorPlugin = class extends import_obsidian3.Plugin {
  async onload() {
    await this.loadSettings();
    this.translator = new Translator(this);
    this.popup = new Popup(this);
    this.addCommand({
      id: "translate-selection",
      name: t("cmd-translate"),
      callback: () => {
        const text = this.getSelectedText();
        if (text) {
          this.popup.open(text, this.getEditor());
        } else {
          new import_obsidian3.Notice(t("notice-select-first"));
        }
      }
    });
    this.registerEvent(
      this.app.workspace.on("editor-menu", (menu, editor) => {
        menu.addItem((item) => {
          item.setTitle(t("menu-translate")).setIcon("languages").onClick(() => {
            const selection = editor.getSelection();
            if (selection) {
              this.popup.open(selection, editor);
            } else {
              new import_obsidian3.Notice(t("notice-select-first"));
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
    return "";
  }
  getEditor() {
    const view = this.app.workspace.getActiveViewOfType(import_obsidian3.MarkdownView);
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
};
