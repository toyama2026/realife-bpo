(function () {
  // SP ハンバーガー
  var toggle = document.querySelector(".nav-toggle");
  var panel = document.getElementById("nav-mobile");
  if (toggle && panel) {
    var setOpen = function (open) {
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
      if (open) panel.removeAttribute("hidden");
      else panel.setAttribute("hidden", "");
      // 開いている間は下のページをスクロールさせない（メニューは画面いっぱいの白。DESIGN-REVIEW-2 H3）
      if (open) {
        var hd = toggle.closest("header") || toggle.parentNode;
        document.documentElement.style.setProperty("--nav-top", Math.max(0, Math.round(hd.getBoundingClientRect().bottom)) + "px");
      }
      document.documentElement.classList.toggle("nav-locked", open);
    };
    window.matchMedia("(min-width: 1061px)").addEventListener("change", function (e) {
      if (e.matches) setOpen(false);
    });
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    panel.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setOpen(false); });
    });
    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });
  }

  // 業種カルーセル（中央寄せで開始し、両端をはみ出させる／矢印で1枚ずつ）
  document.querySelectorAll("[data-carousel]").forEach(function (root) {
    var track = root.querySelector(".carousel-track");
    if (!track) return;
    var center = function () {
      if (window.matchMedia("(min-width: 768px)").matches) {
        track.scrollLeft = (track.scrollWidth - track.clientWidth) / 2;
      }
    };
    var step = function () {
      var card = track.querySelector(".ind-card");
      var gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 0;
      return card ? card.getBoundingClientRect().width + gap : track.clientWidth * 0.8;
    };
    root.querySelectorAll("[data-dir]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var dir = Number(btn.getAttribute("data-dir"));
        var max = track.scrollWidth - track.clientWidth;
        var next = track.scrollLeft + dir * step();
        if (next > max + 2) next = 0;
        if (next < -2) next = max;
        track.scrollTo({ left: next, behavior: "smooth" });
      });
    });
    if (document.readyState === "complete") center();
    else window.addEventListener("load", center);
  });

  // SP 固定バー（2026-10-06 デザインレビュー M1）: FV のボタン（下層はページ見出し）が画面の上に抜けてから出し、
  // フォーム・締めの CTA・フッターが見えている間は隠す。
  var bar = document.querySelector(".sp-cta");
  var trigger = document.querySelector("[data-fv-cta]") || document.querySelector(".page-head, .article-head");
  if (bar && "IntersectionObserver" in window) {
    var passed = !trigger, blockSet = new Set();
    var render = function () {
      var show = passed && blockSet.size === 0;
      bar.classList.toggle("is-shown", show);
      bar.setAttribute("aria-hidden", show ? "false" : "true");
      if (show) bar.removeAttribute("inert"); else bar.setAttribute("inert", "");
    };
    if (trigger) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) { passed = !e.isIntersecting && e.boundingClientRect.bottom < 0; });
        render();
      }).observe(trigger);
    }
    var bo = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) blockSet.add(e.target); else blockSet.delete(e.target); });
      render();
    });
    document.querySelectorAll("#contact, .cta-banner, .contact-band, .site-footer").forEach(function (el) { bo.observe(el); });
    render();
  } else if (bar) {
    bar.classList.add("is-shown");
  }

  // フォーム：送信先は未接続（Koki確認待ち）。必須チェック後、準備中の案内を表示。
  var form = document.querySelector("[data-form]");

  // ご用件（資料請求／30分ヒアリング／そのほか）。資料の PDF はまだ無いので、資料請求ボタンは
  // 「/?purpose=doc#contact」でこのフォームを開き、用件を選んだ状態にする。
  var setPurpose = function (val) {
    if (!form) return;
    var r = form.querySelector('input[name="purpose"][value="' + val + '"]');
    // 資料請求は素材ができるまで外している（flags.SHOW_DOC）。古いリンクの ?purpose=doc は「そのほか」で受ける
    if (!r) r = form.querySelector('input[name="purpose"][value="other"]');
    if (r) { r.checked = true; syncMsg(); }
  };
  var syncMsg = function () {
    if (!form) return;
    var cur = form.querySelector('input[name="purpose"]:checked');
    var need = !cur || cur.value === "other"; // 内容欄は「そのほか」のときだけ必須
    var msg = form.querySelector("[data-msg]");
    var badge = form.querySelector("[data-msg-badge]");
    if (msg) {
      msg.required = need;
      msg.placeholder = need ? "ご自由にご入力ください" : "ご質問やご要望があればご入力ください（空欄でも送れます）";
    }
    if (badge) { badge.textContent = need ? "必須" : "任意"; badge.classList.toggle("badge-req", need); }
  };
  if (form) {
    form.querySelectorAll('input[name="purpose"]').forEach(function (r) { r.addEventListener("change", syncMsg); });
    var q = new URLSearchParams(location.search).get("purpose");
    if (q) setPurpose(q); else syncMsg();
    // 同じページ内では再読み込みせず、用件を選んでフォームへ移動する
    document.querySelectorAll('a[href^="/?purpose="], a[href="/#contact"]').forEach(function (a) {
      a.addEventListener("click", function (e) {
        var target = document.getElementById("contact");
        if (!target) return;
        e.preventDefault();
        var u = new URL(a.getAttribute("href"), location.href);
        setPurpose(u.searchParams.get("purpose") || "other");
        target.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
        history.replaceState(null, "", location.pathname + "#contact");
      });
    });
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var status = form.querySelector(".form-status");
      if (status) {
        status.textContent = "送信機能は現在準備中です。お手数ですが、お電話（092-600-7592）でご連絡ください。";
        status.hidden = false;
      }
    });
  }
  // ブログ一覧：カテゴリで絞り込み（記事が無いカテゴリは「準備中」を表示）
  document.querySelectorAll("[data-blog]").forEach(function (root) {
    var tabs = root.querySelectorAll(".cat-tab");
    var cards = root.querySelectorAll(".blog-card");
    var emptyCat = root.querySelector("[data-empty-cat]");
    var hasAny = cards.length > 0;
    tabs.forEach(function (t) {
      t.addEventListener("click", function () {
        var cat = t.getAttribute("data-cat");
        var shown = 0;
        tabs.forEach(function (x) { x.setAttribute("aria-pressed", x === t ? "true" : "false"); });
        cards.forEach(function (c) {
          var ok = !cat || c.getAttribute("data-cat") === cat;
          c.hidden = !ok; if (ok) shown++;
        });
        if (emptyCat) emptyCat.hidden = !hasAny || shown > 0;
      });
    });
  });
})();
