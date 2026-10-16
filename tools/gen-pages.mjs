import { read, out, mainInner, pageMeta } from "./lib.mjs";

const PAGES = [
  { slug: "/about/", file: "src/pages/about.astro", nav: "about" },
  { slug: "/service/", file: "src/pages/service.astro", nav: "service", ogImage: "/img/service-main.jpg" },
  { slug: "/price/", file: "src/pages/price.astro", nav: "price", ogImage: "/img/page-price.jpg" },
  { slug: "/flow/", file: "src/pages/flow.astro", nav: "flow", ogImage: "/img/page-flow.jpg" },
  { slug: "/faq/", file: "src/pages/faq.astro", nav: "faq", ogImage: "/img/page-faq.jpg" },
  { slug: "/privacy-policy/", file: "src/pages/privacy-policy.astro", nav: "other" },
  { slug: "/404", file: "src/pages/404.astro", nav: "other", src: "404.html" },
];

for (const p of PAGES) {
  const src = p.src || p.slug.replace(/^\//, "").replace(/\/$/, "") + "/index.html";
  const html = read(src);
  const { title, desc } = pageMeta(html);
  let main = mainInner(html).replace(
    /<!--[\\s]*@ctaband[\s\S]*?<!--[\\s]*\/@ctaband[\s]*-->/,
    "<CtaBanner />"
  );
  out(p.file, `---
import BaseLayout from "../layouts/BaseLayout.astro";
import CtaBanner from "../components/CtaBanner.astro";
---
<BaseLayout
  title=${JSON.stringify(title)}
  description=${JSON.stringify(desc)}
  canonicalPath=${JSON.stringify(p.slug === "/404" ? "/" : p.slug)}
${p.ogImage ? `  ogImage=${JSON.stringify(p.ogImage)}\n` : ""}  currentPage="${p.nav}"
>
  <main id="main">
${main}
  </main>
</BaseLayout>
`);
}
