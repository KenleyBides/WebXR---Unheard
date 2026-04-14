const pageData = [
  {
    title: "Page 1",
    text: "Welcome to Unheard.\nUse the editor panel\nto write your speaking notes."
  },
  {
    title: "Page 2",
    text: "Main point:\nExplain your idea clearly\nand keep steady pacing."
  },
  {
    title: "Page 3",
    text: "Conclusion:\nSummarize the takeaway\nand end confidently."
  }
];

let currentPage = 0;

window.addEventListener("DOMContentLoaded", () => {
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

  function sanitizeText(value) {
    return value.replace(/\r/g, "").trim();
  }

  function updateScreen() {
    const page = pageData[currentPage];
    screenTitle.setAttribute("value", page.title || `Page ${currentPage + 1}`);
    screenText.setAttribute("value", page.text || "No notes on this page yet.");
    screenPage.setAttribute("value", `${currentPage + 1} / ${pageData.length}`);

    slideTitleInput.value = page.title;
    slideTextInput.value = page.text.replace(/\n/g, "\n");
    pageStatus.textContent = `Page ${currentPage + 1} / ${pageData.length}`;
  }

  function saveCurrentPage() {
    pageData[currentPage].title =
      sanitizeText(slideTitleInput.value) || `Page ${currentPage + 1}`;

    pageData[currentPage].text =
      sanitizeText(slideTextInput.value) || "No notes on this page yet.";

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

  saveBtn.addEventListener("click", saveCurrentPage);
  nextEditorBtn.addEventListener("click", goNextPage);
  prevEditorBtn.addEventListener("click", goPrevPage);

  nextBtn.addEventListener("click", goNextPage);
  prevBtn.addEventListener("click", goPrevPage);

  slideTitleInput.addEventListener("input", () => {
    const draftTitle = sanitizeText(slideTitleInput.value) || `Page ${currentPage + 1}`;
    screenTitle.setAttribute("value", draftTitle);
  });

  slideTextInput.addEventListener("input", () => {
    const draftText = sanitizeText(slideTextInput.value) || "No notes on this page yet.";
    screenText.setAttribute("value", draftText);
  });

  updateScreen();
});