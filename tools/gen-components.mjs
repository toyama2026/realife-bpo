import { read, out, section } from "./lib.mjs";

const topHtml = read("index.html");
const iconsBlock = section(topHtml, "icons").trim();
const spriteBlock = section(topHtml, "sprite").trim();
const footerBlock = section(topHtml, "footer").trim();
const spctaBlock = section(topHtml, "spcta").trim();
const ctabandStd = section(read("about/index.html"), "ctaband").trim();

out("src/layouts/BaseLayout.astro", `---
import SiteHeader from "../components/SiteHeader.astro";
import SiteFooter from "../components/SiteFooter.astro";
import SpCta from "../components/SpCta.astro";

export interface Props {
  title: string;
  description: string;
  canonicalPath: string;
  ogImage?: string;
  ogType?: string;
  currentPage: "top" | "about" | "service" | "price" | "flow" | "faq" | "blog" | "other";
}
const { title, description, canonicalPath, ogImage, ogType = "website", currentPage } = Astro.props;
const siteUrl = (Astro.site?.toString() ?? "").replace(/\\/$/, "");
const canonical = siteUrl + canonicalPath;
---
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content={description} />
  <title>{title}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=Outfit:wght@400;500;600&display=swap" rel="stylesheet" />
${iconsBlock}
  <link rel="canonical" href={canonical} />
  <meta property="og:type" content={ogType} />
  <meta property="og:site_name" content="REALIFE BPO" />
  <meta property="og:locale" content="ja_JP" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={canonical} />
  {ogImage && <meta property="og:image" content={siteUrl + ogImage} />}
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="stylesheet" href="/styles.css" />
</head>
<body>
  <a class="skip-link" href="#main">本文へスキップ</a>

${spriteBlock}

  <SiteHeader currentPage={currentPage} />

  <slot />

${footerBlock}

${spctaBlock}

  <script src="/main.js" is:inline></script>
</body>
</html>
`);

const NAV = [
  ["service", "/service/", "サービス"],
  ["price", "/price/", "料金"],
  ["flow", "/flow/", "導入の流れ"],
  ["faq", "/faq/", "よくある質問"],
  ["blog", "/blog/", "ブログ"],
];
const desk = NAV.map(([k, h, l]) => `          <a href="${h}" aria-current={currentPage === "${k}" ? "page" : undefined}>${l}</a>`).join("\n");
const mob = NAV.map(([k, h, l]) => `      <a href="${h}" aria-current={currentPage === "${k}" ? "page" : undefined}>${l}</a>`).join("\n");

out("src/components/SiteHeader.astro", `---
export interface Props {
  currentPage: "top" | "about" | "service" | "price" | "flow" | "faq" | "blog" | "other";
}
const { currentPage } = Astro.props;
---
<header class="site-header" id="top">
    <div class="header-inner">
      <div class="header-left">
        <a class="logo" href="/" aria-label="REALIFE BPO トップへ">
          <img class="logo-img" src="/img/logo-realife-bpo.svg" alt="REALIFE BPO SERVICE" width="1151" height="244" />
        </a>
        <nav class="nav-desktop" aria-label="メインナビゲーション">
${desk}
        </nav>
      </div>
      <div class="hd-actions">
        <a class="hd-tel" href="tel:0926007592"><svg aria-hidden="true"><use href="#i-tel" /></svg><span>092-600-7592</span></a>
        <!-- 資料請求: flags.SHOW_DOC -->
        <a class="btn-pill btn-pill-header" href="/?purpose=hearing#contact"><span>30分無料相談</span><span class="btn-pill-icon" aria-hidden="true"><svg><use href="#i-send" /></svg></span></a>
      </div>
      <button type="button" class="nav-toggle" aria-expanded="false" aria-controls="nav-mobile" aria-label="メニューを開く">
        <span></span><span></span>
      </button>
    </div>
    <nav class="nav-mobile" id="nav-mobile" aria-label="モバイルナビゲーション" hidden>
${mob}
      <div class="nav-mobile-sub">
        <a href="/about/" aria-current={currentPage === "about" ? "page" : undefined}>REALIFEとは</a>
        <a href="/about/#company">会社概要</a>
        <a href="/#contact">お問い合わせ</a>
      </div>
      <a class="btn-pill " href="/?purpose=hearing#contact"><span>30分無料相談</span><span class="btn-pill-icon" aria-hidden="true"><svg><use href="#i-send" /></svg></span></a>
    </nav>
  </header>
`);

out("src/components/SiteFooter.astro", footerBlock + "\n");
out("src/components/SpCta.astro", spctaBlock + "\n");
out("src/components/CtaBanner.astro", ctabandStd + "\n");

out("src/components/BlogCard.astro", `---
import type { Post } from "../data/posts";
export interface Props { post: Post; heading?: "h2" | "h3" }
const { post, heading = "h2" } = Astro.props;
const Tag = heading;
---
<li class="blog-card" data-cat={post.cat}>
  <a href={\`/blog/\${post.slug}/\`}>
    <img src={post.image} alt="" width="1344" height="756" loading="lazy" />
    <p class="blog-meta"><span class="blog-cat">{post.cat}</span><time datetime={post.date}>{post.dateLabel}</time></p>
    <Tag class="blog-title" set:html={post.h1} />
  </a>
</li>
`);
