const pageData = [
  {
    title: "Page 1",
    text: "Welcome to Unheard"
  },
  {
    title: "Page 2",
    text: "Main point"
  },
  {
    title: "Page 3",
    text: "Conclusion"
  }
];

let currentPage = 0;

window.addEventListener("DOMContentLoaded", () => {
  const TITLE_MAX_CHARS = 52;
  const BODY_MAX_LINES = 8;
  const BODY_MAX_CHARS_PER_LINE = 34;

  const screenTitle = document.querySelector("#screenTitle");
  const screenText = document.querySelector("#screenText");
  const screenPage = document.querySelector("#screenPage");

  const nextBtn = document.querySelector("#nextBtn");
  const prevBtn = document.querySelector("#prevBtn");

  const slideTitleInput = document.querySelector("#slideTitle");
  const slideTextInput = document.querySelector("#slideText");
  const saveBtn = document.querySelector("#saveBtn");
  const nextEditorBtn = document.querySelector("#nextEditorBtn");
  const prevEditorBtn = document.querySelector("#prevEditorBtn");
  const pageStatus = document.querySelector("#pageStatus");

  const toggleBtn = document.querySelector("#toggleUI");
  const editorPanel = document.querySelector("#editorPanel");

  let isVisible = true;

  function sanitizeText(value) {
    return value.replace(/\r/g, "").trim();
  }

  function clampTitle(value) {
    const normalized = sanitizeText(value).replace(/\s+/g, " ");
    if (!normalized) {
      return "";
    }
    return normalized.length <= TITLE_MAX_CHARS
      ? normalized
      : `${normalized.slice(0, TITLE_MAX_CHARS - 1)}…`;
  }

  function fitBodyText(value) {
    const text = sanitizeText(value);
    if (!text) {
      return "";
    }

    const sourceLines = text.split("\n");
    const fitted = [];

    for (const sourceLine of sourceLines) {
      const words = sourceLine.trim().split(/\s+/).filter(Boolean);
      if (words.length === 0) {
        fitted.push("");
        continue;
      }

      let current = "";
      for (const word of words) {
        const proposal = current ? `${current} ${word}` : word;
        if (proposal.length <= BODY_MAX_CHARS_PER_LINE) {
          current = proposal;
        } else {
          if (current) {
            fitted.push(current);
          }
          current =
            word.length <= BODY_MAX_CHARS_PER_LINE
              ? word
              : `${word.slice(0, BODY_MAX_CHARS_PER_LINE - 1)}…`;
        }
      }
      if (current) {
        fitted.push(current);
      }
    }

    const trimmedLines = fitted.slice(0, BODY_MAX_LINES);
    if (fitted.length > BODY_MAX_LINES && trimmedLines.length > 0) {
      const last = trimmedLines[trimmedLines.length - 1];
      trimmedLines[trimmedLines.length - 1] =
        last.length >= BODY_MAX_CHARS_PER_LINE
          ? `${last.slice(0, BODY_MAX_CHARS_PER_LINE - 1)}…`
          : `${last}…`;
    }
    return trimmedLines.join("\n");
  }

  function getDisplayContent(page) {
    const title = clampTitle(page.title) || `Page ${currentPage + 1}`;
    const text = fitBodyText(page.text) || "No notes on this page yet.";
    return { title, text };
  }

  function updateScreen() {
    const page = pageData[currentPage];
    const display = getDisplayContent(page);
    screenTitle.setAttribute("value", display.title);
    screenText.setAttribute("value", display.text);
    screenPage.setAttribute("value", `${currentPage + 1} / ${pageData.length}`);

    slideTitleInput.value = page.title;
    slideTextInput.value = page.text;
    pageStatus.textContent = `Page ${currentPage + 1} / ${pageData.length}`;
  }

  function saveCurrentPage() {
    pageData[currentPage].title = sanitizeText(slideTitleInput.value);
    pageData[currentPage].text = sanitizeText(slideTextInput.value);

    updateScreen();
  }

  function goNextPage() {
    saveCurrentPage();
    currentPage = (currentPage + 1) % pageData.length;
    updateScreen();
  }

  function goPrevPage() {
    saveCurrentPage();
    currentPage = (currentPage - 1 + pageData.length) % pageData.length;
    updateScreen();
  }

  function toggleEditor() {
    isVisible = !isVisible;
    editorPanel.style.display = isVisible ? "block" : "none";
  }

  saveBtn.addEventListener("click", saveCurrentPage);
  nextEditorBtn.addEventListener("click", goNextPage);
  prevEditorBtn.addEventListener("click", goPrevPage);

  nextBtn.addEventListener("click", goNextPage);
  prevBtn.addEventListener("click", goPrevPage);

  toggleBtn.addEventListener("click", toggleEditor);

  document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "n") {
      toggleEditor();
    }
  });

  slideTitleInput.addEventListener("input", () => {
    const draftTitle = clampTitle(slideTitleInput.value) || `Page ${currentPage + 1}`;
    screenTitle.setAttribute("value", draftTitle);
  });

  slideTextInput.addEventListener("input", () => {
    const draftText = fitBodyText(slideTextInput.value) || "No notes on this page yet.";
    screenText.setAttribute("value", draftText);
  });

  updateScreen();
});