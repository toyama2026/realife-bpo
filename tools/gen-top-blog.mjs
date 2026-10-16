import { read, out, mainInner, pageMeta } from "./lib.mjs";

// ---- top page: verbatim main, except @latest -> data loop, @ctaband -> component ----
{
  const topHtml = read("index.html");
  const { title, desc } = pageMeta(topHtml);
  let m = mainInner(topHtml);
  m = m.replace(
    /<!--[\\s]*@latest[\s\S]*?<!--[\\s]*\/@latest[\s]*-->/,
    `{LATEST_SLUGS.map((slug) => {
          const post = POSTS.find((p) => p.slug === slug)!;
          return (
            <li><a href={\`/blog/\${post.slug}/\`}><span class="post-meta"><time datetime={post.date}>{post.dateLabel}</time><span class="post-cat">{post.cat}</span></span><span class="post-title" set:html={post.h1}></span></a></li>
          );
        })}`
  );
  // top ctaband variant has no Contact label; keep verbatim instead of component
  out("src/pages/index.astro", `---
import BaseLayout from "../layouts/BaseLayout.astro";
import { POSTS, LATEST_SLUGS } from "../data/posts";
---
<BaseLayout
  title=${JSON.stringify(title)}
  description=${JSON.stringify(desc)}
  canonicalPath="/"
  ogImage="/img/fv-people.jpg"
  currentPage="top"
>
  <main id="main">
${m}
  </main>
</BaseLayout>
`);
}

// ---- blog index ----
{
  const { title, desc } = pageMeta(read("blog/index.html"));
  out("src/pages/blog/index.astro", `---
import BaseLayout from "../../layouts/BaseLayout.astro";
import CtaBanner from "../../components/CtaBanner.astro";
import BlogCard from "../../components/BlogCard.astro";
import { POSTS } from "../../data/posts";
---
<BaseLayout
  title=${JSON.stringify(title)}
  description=${JSON.stringify(desc)}
  canonicalPath="/blog/"
  currentPage="blog"
>
  <main id="main">
    <section class="page-head">
      <p class="label" lang="en">Blog</p>
      <h1>ブログ</h1>
      <p class="page-lead">BPOの活用、AI・DX、業種ごとの仕事の進め方などを、わかりやすくお伝えします。</p>
    </section>

    <section class="list-wrap list-wrap-wide" data-blog>
      <div class="cat-tabs" role="group" aria-label="カテゴリで絞り込む"><button type="button" class="cat-tab" aria-pressed="true" data-cat="">すべて</button><button type="button" class="cat-tab" aria-pressed="false" data-cat="BPO活用">BPO活用</button><button type="button" class="cat-tab" aria-pressed="false" data-cat="AI・DX">AI・DX</button><button type="button" class="cat-tab" aria-pressed="false" data-cat="業種別">業種別</button></div>
      <ul class="blog-grid">
        {POSTS.map((post) => <BlogCard post={post} />)}
      </ul>
      <p class="empty" data-empty hidden>記事は準備中です。</p>
      <p class="empty" data-empty-cat hidden>このカテゴリの記事は準備中です。</p>
    </section>

    <CtaBanner />
  </main>
</BaseLayout>
`);
}

// ---- blog articles ----
import { POST_SLUGS } from "./lib.mjs";
for (const slug of POST_SLUGS) {
  const html = read(`blog/${slug}/index.html`);
  const crumbs = (html.match(/<nav class="crumbs"[\s\S]*?<\/nav>/) || [])[0] || "";
  const toc = (html.match(/<nav class="toc"[\s\S]*?<\/nav>/) || [])[0] || "";
  const relBlock = (html.match(/<section class="related"[\s\S]*?<\/section>/) || [])[0] || "";
  const relSlugs = [...relBlock.matchAll(/href="\/blog\/([\w-]+)\/"/g)].map((mm) => mm[1]);
  const relCards = relSlugs.map((s) => `        <BlogCard post={POSTS.find((x) => x.slug === "${s}")!} heading="h3" />`).join("\n");
  const relHead = (relBlock.match(/<div class="head">[\s\S]*?<\/div>/) || [])[0] || "";
  out(`src/pages/blog/${slug}.astro`, `---
import BaseLayout from "../../layouts/BaseLayout.astro";
import CtaBanner from "../../components/CtaBanner.astro";
import BlogCard from "../../components/BlogCard.astro";
import PostBody from "../../content/posts/${slug}.astro";
import { POSTS } from "../../data/posts";
const post = POSTS.find((x) => x.slug === "${slug}")!;
---
<BaseLayout
  title={post.title}
  description={post.desc}
  canonicalPath={\`/blog/\${post.slug}/\`}
  ogImage={post.image}
  ogType="article"
  currentPage="blog"
>
  <main id="main">
    <article class="article">
      ${crumbs}
      <header class="article-head">
        <p class="blog-meta"><span class="blog-cat">{post.cat}</span><time datetime={post.date}>{post.dateLabel}</time></p>
        <h1 set:html={post.h1} />
      </header>
      <div class="article-visual"><img src={post.image} alt="" width="1344" height="756" /></div>
      <div class="article-body">
        <p class="article-lead">{post.lead}</p>
        ${toc}
        <PostBody />
        <p class="article-by">この記事は、合同会社REALIFE（福岡）が<span class="nw">作成しています。</span></p>
      </div>
    </article>

    <CtaBanner />

    <section class="related" aria-label="関連記事">
      ${relHead}
      <ul class="blog-grid">
${relCards}
      </ul>
      <p class="more more-center"><a class="more-link" href="/blog/">記事一覧へ<span class="round-icon" aria-hidden="true"><svg><use href="#i-right" /></svg></span></a></p>
    </section>
  </main>
</BaseLayout>
`);
}
