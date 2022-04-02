import hljs from "highlight.js";
import MarkdownIt from "markdown-it/lib";

import markdownItUnderline from "markdown-it-underline";
const resultSection = document.querySelector("#result");
const md = new MarkdownIt({
  html: false,
  typographer: true,
  linkify: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (__) {}
    }

    return ""; // use external default escaping
  },
}).use(markdownItUnderline);

// ================= FUNCTIONS
function insertAtCursor(startValue, endValue = "", field = editorInput) {
  const startPos = field.selectionStart;
  const endPos = field.selectionEnd;
  field.value =
    field.value.substring(0, startPos) +
    startValue +
    field.value.substring(startPos, endPos) +
    endValue +
    field.value.substring(endPos, field.value.length);
  field.setSelectionRange(
    startPos + startValue.length,
    startPos +
      startValue.length +
      field.value.substring(startPos, endPos).length
  );
  field.focus();

  // Create a new 'change' event
  // SIMULATED EVENT
  const event = new Event("input");

  // Dispatch it.
  field.dispatchEvent(event);
}

// ================= LISTENERS

window.addEventListener("load", () => {
  window.scrollTo(0, 0);
});

const editorInput = document.querySelector("#editor-input");

editorInput.addEventListener("input", (e) => {
  resultSection.innerHTML = md.render(e.target.value);
});
editorInput.onkeydown = function (event) {
  if (event.key === "Tab") {
    event.preventDefault();
    insertAtCursor("    ");
  }
};

// TEXT
document
  .querySelector("#button-black")
  .addEventListener("click", () => insertAtCursor("**", "**"));
document
  .querySelector("#button-italic")
  .addEventListener("click", () => insertAtCursor("*", "*"));
document
  .querySelector("#button-underline")
  .addEventListener("click", () => insertAtCursor("_", "_"));
document
  .querySelector("#button-strike")
  .addEventListener("click", () => insertAtCursor("~~", "~~"));
document
  .querySelector("#button-blockquote")
  .addEventListener("click", () => insertAtCursor("> "));

// ELEMENTS
document
  .querySelector("#button-link")
  .addEventListener("click", () => insertAtCursor("[title](", ")"));
document
  .querySelector("#button-separator")
  .addEventListener("click", () => insertAtCursor("---"));
document
  .querySelector("#button-list")
  .addEventListener("click", () => insertAtCursor("+ "));
document
  .querySelector("#button-orderlist")
  .addEventListener("click", () => insertAtCursor("1 "));
document
  .querySelector("#button-code")
  .addEventListener("click", () => insertAtCursor("```js \n", " \n```"));

// TITLES
document
  .querySelector("#button-h1")
  .addEventListener("click", () => insertAtCursor("# ", ""));
document
  .querySelector("#button-h2")
  .addEventListener("click", () => insertAtCursor("## ", ""));
document
  .querySelector("#button-h3")
  .addEventListener("click", () => insertAtCursor("### ", ""));
document
  .querySelector("#button-h4")
  .addEventListener("click", () => insertAtCursor("#### ", ""));
document
  .querySelector("#button-h5")
  .addEventListener("click", () => insertAtCursor("##### ", ""));
document
  .querySelector("#button-h6")
  .addEventListener("click", () => insertAtCursor("###### ", ""));
