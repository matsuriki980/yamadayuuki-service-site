// ==================================================================================
// ハンバーガーメニュー
// ==================================================================================
const initHamburger = () => {
  const btn = document.querySelector("#hamburger-btn");
  const menu = document.querySelector("#hamburger-menu");
  const bg = document.querySelector("#hamburger-menu__bg");
  const items = document.querySelectorAll(".gnav__sub-link");
  const html = document.documentElement;

  // --- ボタン開閉処理 --- //
  btn.addEventListener("click", () => {
    const isOpen = btn.classList.contains("is-open"); //is-openクラスの有無をボタンを基準に判定

    btn.classList.toggle("is-open", !isOpen);
    menu.classList.toggle("is-open", !isOpen);
    bg.classList.toggle("is-open", !isOpen);
    html.classList.toggle("no-scroll", !isOpen); // 開閉時 スクロール無効化
  });

  // --- ナビアイテムをクリックしたらメニューを閉じる (Serviceページ内のセクション間移動用) --- //
  items.forEach((item) => {
    item.addEventListener("click", () => {
      btn.classList.remove("is-open");
      menu.classList.remove("is-open");
      bg.classList.remove("is-open");
      html.classList.remove("no-scroll");
    });
  });
};

// ==================================================================================
// ヘッダー pc ドロップダウン / sp アコーディオン
// ==================================================================================
const initNavAccordion = () => {
  const btns = document.querySelectorAll(".gnav__toggle");
  const isPc = () => window.matchMedia("(min-width: 1020px)").matches; //1020px以上かどうかを判定

  // --- SP版の処理を関数化 --- //
  const openNavAccordion = (list) => {
    list.classList.add("is-open");
    list.style.height = list.scrollHeight + "px";
    list.style.marginBottom = "clamp(17px, 19.875px, 24px)";
  };

  const closeNavAccordion = (list) => {
    list.classList.remove("is-open");
    list.style.height = "0px";
    list.style.marginBottom = "0px";
  };

  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const list = btn.nextElementSibling; //クリックしたボタンの次の要素であるリストを取得
      const isOpen = list.classList.contains("is-open");
      if (isPc()) {
        // pcの処理
        list.classList.toggle("is-open", !isOpen);
      } else {
        // spの処理
        if (!isOpen) {
          openNavAccordion(list);
        } else {
          closeNavAccordion(list);
        }
      }
    });
  });
};

// ==================================================================================
// ページトップボタン
// ==================================================================================
const initPageTop = () => {
  const btn = document.querySelector("#page-top-btn");
  const fv = document.querySelector("#fv");

  const fvHeight = fv.offsetHeight; // fvの高さを取得

  const updateVisibility = () => {
    const shouldShow = window.scrollY > fvHeight; // スクロール量がfvの高さを超えたら実行
    btn.classList.toggle("is-visible", shouldShow);
  };

  updateVisibility(); // ページ途中でリロードした場合でも実行するため初期状態に

  window.addEventListener("scroll", updateVisibility, { passive: true });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
};

// ==================================================================================
// SP 下部お問い合わせCTA
// ==================================================================================
const initBottomCTA = () => {
  const fv = document.querySelector("#fv");
  const bottomCta = document.querySelector("#bottom-cta");
  const footer = document.querySelector("#footer");
  if (!bottomCta || !footer || !fv) return;

  const updateCTA = () => {
    const fvHeight = fv.offsetHeight; //fvの高さを取得
    const scrollY = window.scrollY;
    const footerTop = footer.getBoundingClientRect().top + scrollY; //ページTOPからフッターTOPまでの位置を取得
    const windowHeight = window.innerHeight; //画面の高さを取得
    const isOverFv = scrollY > fvHeight; //スクロール量がfvの高さを超えたらture
    const isInFooter = footerTop > scrollY + windowHeight; //スクロール量がページ上部からフッターまでの距離を超えていなければture
    const shouldShow = isOverFv && isInFooter;
    bottomCta.classList.toggle("is-visible", shouldShow);
  };

  // ページ途中でリロードした場合でも実行するため初期状態に
  updateCTA();

  window.addEventListener("scroll", updateCTA, { passive: true });
};

// ==================================================================================
// Work(top) カルーセル
// ==================================================================================
const initSwiper = () => {
  const el = document.querySelector("#top-works__content");

  if (!el) return;

  new Swiper(el, {
    loop: true,
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    breakpoints: {
      768: {
        spaceBetween: 24,
      },
      1024: {
        spaceBetween: 48,
      },
      1200: {
        spaceBetween: 80,
      },
    },
  });
};

// ==================================================================================
// 要素フェードイン
// ==================================================================================
const initFadeIn = () => {
  const fadeTargets = document.querySelectorAll(".fade-trigger"); //アニメーションのトリガーになる要素
  if (fadeTargets.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const triggers = entry.target;

        const group = triggers.closest(".fade-group");
        if (!group) return;

        //トリガーとなる要素をフェードイン
        triggers.classList.add("is-visible");

        //本文をフェードイン
        const descriptions = group.querySelectorAll(".fade-description");
        descriptions.forEach((desc) => {
          desc.classList.add("is-visible");
        });

        //画像をフェードイン
        const imgs = group.querySelectorAll(".fade-img");
        imgs.forEach((img) => {
          img.classList.add("is-visible");
        });

        //アイコンをフェードイン
        const icons = group.querySelectorAll(".fade-icon");
        icons.forEach((icon) => {
          icon.classList.add("is-visible");
        });

        //テキストや画像をまとめた要素ごとフェードイン
        const items = group.querySelectorAll(".fade-item");
        items.forEach((item) => {
          item.classList.add("is-visible");
        });

        // 一度だけ実行
        observer.unobserve(triggers);
      });
    },
    {
      root: null, // ビューポート
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    }
  );

  fadeTargets.forEach((targets) => observer.observe(targets));
};

// ==================================================================================
// fvタイトルフェードイン
// ==================================================================================
const initFvFadeIn = () => {
  const fadeTargets = document.querySelectorAll(
    ".fade-fv-title--main, .fade-fv-title--sub, .fade-fv-img"
  );

  if (!fadeTargets) return;

  fadeTargets.forEach((target) => {
    target.classList.add("is-visible");
  });
};

// ==================================================================================
// 料金アコーディオン
// ==================================================================================
const initPlanAccordion = () => {};

// ==================================================================================
// タブ切り替え plan
// ==================================================================================
const initPlanTabs = () => {};

// ==================================================================================
// タブ切り替え works
// ==================================================================================
const initWorkTabs = () => {
  const tabs = document.querySelector("[data-tabs]");
  if (!tabs) return;
  const tabButtons = tabs.querySelectorAll('[role="tab"]');
  const panels = document.querySelectorAll('[role="tabpanel"]');

  tabs.addEventListener("click", (e) => {
    const tab = e.target.closest('[role="tab"]');
    const key = tab.dataset.tab;

    tabButtons.forEach((btn) => btn.setAttribute("aria-selected", "false"));
    panels.forEach((panel) => {
      panel.hidden = true;
    });

    tab.setAttribute("aria-selected", "true");
    const activePanel = document.querySelector(`[data-panel="${key}"]`);
    if (activePanel) {
      activePanel.hidden = false;
    }
  });
};

// ==================================================================================
// 処理を実行
// ==================================================================================
window.addEventListener("DOMContentLoaded", () => {
  initHamburger(); // ハンバーガーメニュー
  initNavAccordion(); // ナビゲーションアコーディオン
  initPageTop(); // ページトップボタン
  initBottomCTA(); // SP 下部お問い合わせCTA
  initSwiper(); // Swiperカルーセル
  initFadeIn(); // 要素フェードイン
  initFvFadeIn(); // 要素フェードイン
  initPlanAccordion(); // 通常アコーディオン
  initPlanTabs(); // タブ切り替え 料金
  initWorkTabs(); // タブ切り替え 実績
});
