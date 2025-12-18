// ========================================================================================================================================================
// お問い合わせフォーム
// ========================================================================================================================================================
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#form");
  const contactPlaceholder = form.querySelector(".contact-detail");

  // =========================================
  // プレスフォルダー 改行
  // =========================================
  // 要素が存在するときのみ実行
  if (!contactPlaceholder) {
    return;
  }
  contactPlaceholder.placeholder =
    "例1：サイトに記載しているジャンル以外の撮影にも対応可能でしょうか？\n\n例2：写真撮影をお願いしたいです。\n日付：○○月○○日 \n用途：家族旅行のファミリー撮影";

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // ページの自動リロードを止める

    const contactType = form.querySelector(
      'input[name="contact_type"]:checked'
    );
    const name = form.querySelector("#name");
    const furigana = form.querySelector("#furigana");
    const email = form.querySelector("#email");
    const tel = form.querySelector("#tel");
    const area = form.querySelector("#area");
    const contactDetail = form.querySelector("#contact-detail");

    // =========================================
    // バリデーションチェック
    // =========================================
    if (!contactType) {
      alert("お問い合わせの種類が選択されていません。");
      return;
    }
    if (name.value.trim() === "") {
      alert("ご氏名が入力されていません。");
      return;
    }
    if (furigana.value.trim() === "") {
      alert("フリガナが入力されていません。");
      return;
    }
    if (email.value.trim() === "") {
      alert("メールアドレスが入力されていません。");
      return;
    }
    if (contactDetail.value.trim() === "") {
      alert("お問い合わせ内容が入力されていません。");
      return;
    }

    // 保存
    const formData = {
      contactType: contactType.value,
      name: name.value,
      furigana: furigana.value,
      email: email.value,
      tel: tel.value,
      area: area.value,
      contactDetail: contactDetail.value,
    };

    localStorage.setItem("contactForm", JSON.stringify(formData));

    // チェックがOKならページ遷移
    window.location = "confirm.html";
  });
});
