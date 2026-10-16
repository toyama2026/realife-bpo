import { read, out, section, pageMeta, POST_SLUGS, LATEST_SLUGS } from "./lib.mjs";

function postInfo(slug) {
  const html = read(`blog/${slug}/index.html`);
  const h1 = (html.match(/<h1>([\s\S]*?)<\/h1>/) || [])[1]?.trim() || "";
  const cat = (html.match(/<span class="blog-cat">([\s\S]*?)<\/span>/) || [])[1]?.trim() || "";
  const date = (html.match(/<time datetime="([\s\S]*?)">/) || [])[1]?.trim() || "";
  const dlabel = (html.match(/<time datetime="[\s\S]*?">([\s\S]*?)<\/time>/) || [])[1]?.trim() || "";
  const lead = (html.match(/<p class="article-lead">([\s\S]*?)<\/p>/) || [])[1]?.trim() || "";
  const { title, desc } = pageMeta(html);
  return { slug, title, h1, cat, date, dlabel, lead, desc, html };
}
const posts = POST_SLUGS.map(postInfo);

// src/data/posts.ts
{
  const rows = posts.map((p) => `  {
    slug: "${p.slug}",
    title: ${JSON.stringify(p.title)},
    h1: ${JSON.stringify(p.h1)},
    cat: ${JSON.stringify(p.cat)},
    date: "${p.date}",
    dateLabel: ${JSON.stringify(p.dlabel)},
    lead: ${JSON.stringify(p.lead)},
    desc: ${JSON.stringify(p.desc)},
    image: "/img/blog/${p.slug}.jpg",
  },`);
  out("src/data/posts.ts",
    `export interface Post {\n  slug: string;\n  title: string;\n  h1: string;\n  cat: string;\n  date: string;\n  dateLabel: string;\n  lead: string;\n  desc: string;\n  image: string;\n}\n\nexport const POSTS: Post[] = [\n${rows.join("\n")}\n];\n\nexport const LATEST_SLUGS = ${JSON.stringify(LATEST_SLUGS)};\n`);
}

// article bodies (verbatim fragments, lead/toc/crumbs/byline handled in page template)
for (const p of posts) {
  let body = (p.html.match(/<div class="article-body">([\s\S]*?)<\/div>\s*<\/article>/) || [])[1] || "";
  body = body.replace(/<p class="article-lead">[\s\S]*?<\/p>/, "").trim();
  body = body.replace(/<nav class="toc"[\s\S]*?<\/nav>/, "").trim();
  body = body.replace(/<p class="article-by">[\s\S]*?<\/p>/, "").trim();
  out(`src/content/posts/${p.slug}.astro`, body + "\n");
}
