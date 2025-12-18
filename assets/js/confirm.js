document.addEventListener("DOMContentLoaded", () => {
  // 入力値の取得
  const savedData = JSON.parse(localStorage.getItem("contactForm"));

  if (savedData) {
    document.querySelector("#confirm-contact_type").textContent =
      savedData.contactType || "";
    document.querySelector("#confirm-name").textContent = savedData.name || "";
    document.querySelector("#confirm-furigana").textContent =
      savedData.furigana || "";
    document.querySelector("#confirm-email").textContent =
      savedData.email || "";
    document.querySelector("#confirm-tel").textContent = savedData.tel || "";
    document.querySelector("#confirm-area").textContent = savedData.area || "";
    document.querySelector("#confirm-detail").textContent =
      savedData.contactDetail || "";
  }

  const confirmForm = document.querySelector("#confirm-form");

  const backBtn = document.querySelector("#confirm-btn--back");
  const nextBtn = document.querySelector("#confirm-btn--next");

  // 戻るボタン：前のページに戻る
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      history.back(); // もしくは location.href = "contact.html";
    });
  }

  // 次へボタン：送信完了ページへ移動
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      window.location.href = "thanks.html";
    });
  }
});
