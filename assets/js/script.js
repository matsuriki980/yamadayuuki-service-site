window.addEventListener("DOMContentLoaded", () => {
  // ========================================================================================================================================================
  // ハンバーガーメニュー　開閉処理
  // ========================================================================================================================================================
  const hamburgerBtn = document.querySelector(".hamburger-btn");
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const hamburgerMenuBg = document.querySelector(".hamburger-menu__bg");
  const headerNavItems = document.querySelectorAll(".gnav-item a");
  const html = document.documentElement;

  // 要素が存在するときのみ実行
  if (!hamburgerBtn || !hamburgerMenu) {
    return;
  }

  // ハンバーガーボタンをクリックした時の処理
  hamburgerBtn.addEventListener("click", () => {
    hamburgerBtn.classList.toggle("active");
    hamburgerMenu.classList.toggle("active");
    hamburgerMenuBg.classList.toggle("active");
    html.classList.toggle("no-scroll"); // スクロール停止
  });

  // リンククリックでメニューを閉じる
  headerNavItems.forEach((item) => {
    item.addEventListener("click", () => {
      hamburgerBtn.classList.remove("active");
      hamburgerMenu.classList.remove("active");
      hamburgerMenuBg.classList.remove("active");
      html.classList.remove("no-scroll"); // スクロール停止
    });
  });

  // ========================================================================================================================================================
  // ドロップダウン
  // ========================================================================================================================================================
  const mq = window.matchMedia("(max-width: 1020px)"); // 画面が768px以下かどうかを判定
  const SubNav = document.querySelector(".has-child");
  const SubNavList = document.querySelector(".gnav__sub-list");
  let flag = false; // 開閉判定用

  SubNav.addEventListener("click", () => {
    if (mq.matches) {
      // SP版の処理
      if (flag === false) {
        const targetHeight = SubNavList.scrollHeight; // 要素の高さを取得
        SubNavList.style.height = targetHeight + "px";

        setTimeout(() => {
          SubNav.style.paddingBottom = "clamp(17px, 19.875px, 24px)";
        }, 220);

        setTimeout(() => {
          SubNavList.style.height = "auto";
        }, 300);
        flag = true;
      } else {
        const targetHeight = SubNavList.scrollHeight; // 要素の高さを取得
        SubNavList.style.height = targetHeight + "px";
        SubNav.style.paddingBottom = "0";
        setTimeout(() => {
          SubNavList.style.height = "0";
        }, 1);
        flag = false;
      }
    } else {
      // 768pxを超える処理
      SubNavList.classList.toggle("active");
    }
  });
});
