# Privacy Policy

**Sudowrite Section Toggle**  
Created by Andrew Pearson and ChatGPT (OpenAI)  
Published: July 30, 2025

---

## 🔒 TL;DR

We don’t collect or store any of your data. Period.

---

## 📘 Full Policy

This Chrome extension, **Sudowrite Section Toggle**, is designed solely to enhance the usability of the Sudowrite web editor by allowing users to toggle the visibility of specific UI sections (e.g., Genre, Characters, Worldbuilding, etc.).

### ✅ What This Extension Does:
- Detects whether you are on a Sudowrite page
- Toggles the `display` style (`block`/`none`) of known elements in the DOM
- Executes local scripts only when the user interacts with the popup interface
- Operates entirely in the browser with no data collection, storage, or transmission

### 🚫 What It Does *Not* Do:
- It does **not** collect, log, store, or transmit any personal data
- It does **not** use cookies, analytics, or any third-party services
- It does **not** access your browsing history, content, keystrokes, or files
- It does **not** make external network requests or use remote code

---

## 🔐 Permissions Justification

The extension requires the following permissions:
- `scripting` — to inject lightweight DOM-manipulating functions into the current tab
- `activeTab` — to apply changes only when the user interacts with the extension
- `host_permissions` — limited to `https://*.sudowrite.com/*` to scope functionality to Sudowrite

All permissions are narrowly scoped and used solely for local UI control.

---

## 👥 Contact

If you have any questions or concerns about this extension, you can reach the author at:

**andrew [dot] pearson [at] [your domain or email provider]**

---

## 📄 License

This project is open source and licensed under the [MIT License](LICENSE).
