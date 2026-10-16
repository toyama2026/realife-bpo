export interface Post {
  slug: string;
  title: string;
  h1: string;
  cat: string;
  date: string;
  dateLabel: string;
  lead: string;
  desc: string;
  image: string;
}

export const POSTS: Post[] = [
  {
    slug: "what-is-bpo",
    title: "BPOとは？ 派遣・外注との違いと「攻めのBPO」という考え方｜REALIFE BPO ブログ",
    h1: "BPOとは？ 派遣・外注との違いと<span class=\"nw\">「攻めのBPO」</span><span class=\"nw\">という考え方</span>",
    cat: "BPO活用",
    date: "2026-10-06",
    dateLabel: "2026/10/06",
    lead: "「BPO」という言葉を目にする機会が増えました。ただ、派遣や外注と何が違うのか、自社にとって何が変わるのかは、意外と説明されていません。この記事では、BPOの基本と、ほかの方法との違い、そして私たちが「攻めのBPO」と呼んでいる考え方を整理します。",
    desc: "BPO（業務の外部委託）の基本と、派遣やスポットの外注との違い、売上を取りに行く「攻めのBPO」の考え方を整理します。",
    image: "/img/blog/what-is-bpo.jpg",
  },
  {
    slug: "lost-inquiries",
    title: "問い合わせの「取りこぼし」とは？ 中小企業で起きやすい4つの場面｜REALIFE BPO ブログ",
    h1: "問い合わせの「取りこぼし」とは？ <span class=\"nw\">中小企業</span>で起きやすい4つの場面",
    cat: "BPO活用",
    date: "2026-10-06",
    dateLabel: "2026/10/06",
    lead: "せっかく来た問い合わせが、返事をしないまま、あるいは返事が遅れたまま、他社に決まってしまう。私たちはこれを「取りこぼし」と呼んでいます。問い合わせを増やす前に、まず取りこぼしを減らすことは、売上を伸ばす手堅い方法のひとつです。",
    desc: "来ていた問い合わせが、返事の遅れや追客の抜けで他社に決まってしまう「取りこぼし」。起きやすい場面と、数字で追う方法をまとめます。",
    image: "/img/blog/lost-inquiries.jpg",
  },
  {
    slug: "ai-and-people",
    title: "AIと人の役割分担 ― AIを覚えなくても、AIの成果は受け取れる｜REALIFE BPO ブログ",
    h1: "AIと人の役割分担 ― AIを覚えなくても、<span class=\"nw\">AIの成果</span>は受け取れる",
    cat: "AI・DX",
    date: "2026-10-06",
    dateLabel: "2026/10/06",
    lead: "「AIを使わないと取り残される」という話を聞く一方で、「導入して、誰が使うの？」という疑問も残ります。この記事では、AIと人の役割分担と、私たちが「AIX」と呼んでいる考え方を紹介します。",
    desc: "AIを導入することが目的ではなく、売上を上げることが目的。AIが得意なことと人が担うことを分け、成果が出る仕組みを運用する考え方を紹介します。",
    image: "/img/blog/ai-and-people.jpg",
  },
  {
    slug: "how-to-start",
    title: "営業事務を外部に任せるまでの流れ ― 30分のヒアリングから、3週目の実務開始まで｜REALIFE BPO ブログ",
    h1: "営業事務を外部に任せるまでの流れ ― 30分のヒアリングから、3週目の実務開始まで",
    cat: "BPO活用",
    date: "2026-10-06",
    dateLabel: "2026/10/06",
    lead: "営業事務やバックオフィスを外部に任せたいと思っても、「始めるまでに手間がかかりそう」「何を準備すればいいかわからない」と感じることがあるかもしれません。この記事では、私たちにお任せいただく場合の流れを、時期ごとに紹介します。",
    desc: "外部に任せるとき、自社がやることは何か。1週目のヒアリングから毎月のレポートまで、始め方の流れと料金の考え方をまとめます。",
    image: "/img/blog/how-to-start.jpg",
  },
  {
    slug: "beyond-buzzwords",
    title: "「AI導入」「DX」「業務効率化」― 言葉ではなく、残った数字で選ぶ｜REALIFE BPO ブログ",
    h1: "「AI導入」「DX」「業務効率化」― 言葉ではなく、残った数字で選ぶ",
    cat: "AI・DX",
    date: "2026-10-06",
    dateLabel: "2026/10/06",
    lead: "「AI導入」「DX」「業務効率化」。どれも前向きな言葉ですが、聞いたあとに「それで、うちの売上はどうなるの？」という疑問が残ることがあります。この記事では、よく聞く言葉と、そのあとに残る疑問を並べてみます。",
    desc: "AI導入・自動化・DX・業務効率化・生産性向上。よく聞く言葉のあとに残る疑問と、サービスを選ぶときに確かめたいことを整理します。",
    image: "/img/blog/beyond-buzzwords.jpg",
  },
  {
    slug: "industry-teams",
    title: "業種ごとの専門チームとは ― 用語・商習慣・見積の型を知っているということ｜REALIFE BPO ブログ",
    h1: "業種ごとの専門チームとは ― 用語・商習慣・<span class=\"nw\">見積の型</span>を知っているということ",
    cat: "業種別",
    date: "2026-10-06",
    dateLabel: "2026/10/06",
    lead: "私たちは業種を問わずにお引き受けします。ただし「何でも屋」ではありません。業種ごとに専門チームを置き、その業界の用語・商習慣・見積の型・書類の作法を身につけた状態で担当します。この記事では、その理由を紹介します。",
    desc: "業種は問わないが「何でも屋」ではない。業種ごとに専門チームを置く理由と、全チームで共有している仕組みについて紹介します。",
    image: "/img/blog/industry-teams.jpg",
  },
];

export const LATEST_SLUGS = ["what-is-bpo","lost-inquiries","ai-and-people"];
