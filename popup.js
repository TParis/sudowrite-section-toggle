/*
  Sudowrite Section Toggle Chrome Extension
  Created by Andrew Pearson and ChatGPT (OpenAI), July 30, 2025

  Released under the MIT License.

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the “Software”), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

const sections = [
  { name: "Editor", selector: "#editor-section" },
  { name: "Entire Story Bible", selector: ".story-bible" },
  { name: "Braindump", selector: ".seed" },
  { name: "Genre", selector: ".genre" },
  { name: "Style", selector: ".style" },
  { name: "Synopsis", selector: ".synopsis" },
  { name: "Series Header", selector: ".series-header" },
  { name: "Characters", selector: ".chars" },
  { name: "World Building", selector: ".worldbuilding" },
  { name: "Outline", selector: ".story-bible .inner .container .section:last-child" }
];

const togglesDiv = document.getElementById("toggles");

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const tabId = tabs[0].id;

  // First: check if this is a Sudowrite page and if #editor-section exists
  chrome.scripting.executeScript({
    target: { tabId },
    func: () => {
      return {
        hasEditor: !!document.querySelector("#editor-section"),
        title: document.title
      };
    }
  }, (checkResult) => {
    const { hasEditor, title } = checkResult[0].result;

    if (!hasEditor || !title.toLowerCase().includes("sudowrite")) {
      console.log("Sudowrite not detected — not injecting toggles.");
      return; // Leave #notdetected visible
    }

    // We're on a Sudowrite page, remove #notdetected
    const notDetected = document.getElementById("notdetected");
    if (notDetected) notDetected.remove();

    // Now query the display state of each section
    chrome.scripting.executeScript({
      target: { tabId },
      func: (sections) => {
        return sections.map(({ selector }) => {
          const el = document.querySelector(selector);
          if (!el) return null;
          return window.getComputedStyle(el).display !== 'none';
        });
      },
      args: [sections]
    }, (results) => {
      const visibilityStates = results[0].result;

      sections.forEach(({ name, selector }, i) => {
        const container = document.createElement("div");
        container.className = "toggle";

        const label = document.createElement("label");
        label.textContent = name;

        const toggle = document.createElement("input");
        toggle.type = "checkbox";
        toggle.checked = visibilityStates[i] ?? true;

        toggle.addEventListener("change", () => {
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
              target: { tabId: tabs[0].id },
              func: (sel, show) => {
                document.querySelectorAll(sel).forEach(el => {
                  el.style.display = show ? 'block' : 'none';
                });
              },
              args: [selector, toggle.checked]
            });
          });
        });

        container.appendChild(label);
        container.appendChild(toggle);
        togglesDiv.appendChild(container);
      });
    });
  });
});
