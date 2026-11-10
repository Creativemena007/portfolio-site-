/*
  Body of the "Echo chamber → Council and Debate" publication.

  Ported from the original standalone HTML piece. The markup keeps that
  piece's semantic class names (.gap, .shift, .pair, .tn …); every one of them
  is restyled to the portfolio look in ./publication.css, scoped under `.pub`.
  Screenshots render through <Shot> (next/image) and recordings through <Clip>
  (lazy, plays only while on screen). Edit copy directly in this file.
*/
import { Compare } from "./compare";
import { Clip, Shot } from "./media";

export function Content() {
  return (
    <>
<header className="masthead enter enter-d1">
  <div className="eyebrow">Zo · Design publication</div>
  <h1>The Idea Was Right. <span>The Technology Wasn’t Ready.</span></h1>
  <p className="dek">Revisiting the AI experiences we designed at Zo in 2024, what held them back, and how two years of technological progress have changed what’s possible.</p>
  <div className="meta"><span>Orezi Mena</span><span>10 November 2026</span><span>15 min read</span></div>
</header>

{/* Opening spread: the 2024 feature fades back on the left, the two
    redesigns come forward. Side phones are decorative context, so only the
    centre one is described. */}
<figure className="hero wide enter enter-d2">
  <div className="hero-stage">
    <div className="hero-phone side left"><Shot src="shot-03.jpg" alt="" priority zoom={false} /></div>
    <div className="hero-phone main"><Shot src="shot-11.jpg" alt="Council: one card showing where three models agree and where they differ" priority zoom={false} /></div>
    <div className="hero-phone side right"><Shot src="shot-14.jpg" alt="" priority zoom={false} /></div>
  </div>
  <figcaption><span>2024 · Echo</span><span>2026 · Council</span><span>2026 · Debate</span></figcaption>
</figure>

<div className="col enter enter-d3">
  <p className="lede">In 2024, we were experimenting with something that felt like a glimpse into the future: AI agents that could participate in conversations, respond to one another, and collaborate inside group chats. We could design the experience, and even ship an early version of it, but the technology was still catching up with the ambition. Two years later, I decided to revisit those ideas. This time, the possibilities look very different.</p>
  <nav className="toc" aria-label="Contents">
    <a href="#before">What I started with</a><a href="#gaps">The gaps</a><a href="#shifts">What changed in AI</a><a href="#tech">The numbers</a><a href="#design">What I designed</a><a href="#compare">Before and after</a><a href="#system">The system underneath</a><a href="#decisions">Decisions</a><a href="#next">What is possible now</a><a href="#sources">Sources</a>
  </nav>
</div>

<section id="before" className="wide">
  <div className="col sechead">
    <div className="eyebrow">01 · 2024</div>
    <h2>What I started with</h2>
    <p className="lead"><b>Echo</b> let you pick several AI apps and have each one reply to your message. <b>Echochamber</b> let you set goals and a number of exchanges, then watch the apps talk to each other. Both lived behind the composer’s apps button, both charged Zaps, and both ran in the open group chat.</p>
  </div>
  <div className="tag strip-label">Echo</div>
  <div className="strip reveal">
    <figure className="shot"><Shot src="shot-01.jpg" alt="Echo: choose apps to answer, dark theme" /><figcaption><b>Pick apps</b>Code Expert, ChatGPT and others, then Save Echo.</figcaption></figure>
    <figure className="shot"><Shot src="shot-02.jpg" alt="Echo active bar with per-app toggles" /><figcaption><b>Echo is active</b>&quot;Echo active with 4 AI agent&quot;, 8 Zaps per echo, a toggle per app.</figcaption></figure>
    <figure className="shot"><Shot src="shot-03.jpg" alt="Echo replies arriving as separate messages" /><figcaption><b>Every app replies</b>Each answer lands as its own message in the group.</figcaption></figure>
  </div>
  <div className="tag strip-label">Echochamber</div>
  <div className="strip reveal">
    <figure className="shot"><Shot src="shot-04.jpg" alt="Echochamber setup: goals, objectives, number of exchanges" /><figcaption><b>Goals and exchanges</b>&quot;8 rounds of conversation will cost you 16 Zaps&quot;.</figcaption></figure>
    <figure className="shot"><Shot src="shot-05.jpg" alt="Echochamber: select apps" /><figcaption><b>Select apps</b>Suggested and popular apps, including people-shaped agents.</figcaption></figure>
    <figure className="shot"><Shot src="shot-06.jpg" alt="Echochamber confirmation card in chat" /><figcaption><b>Confirm in chat</b>&quot;Only you can see this&quot;, but the debate itself ran in front of everyone.</figcaption></figure>
    <figure className="shot"><Shot src="shot-07.jpg" alt="Echochamber running: agents replying" /><figcaption><b>It runs</b>Agents post one after another, each in front of the whole group.</figcaption></figure>
  </div>
</section>

<section id="gaps" className="col">
  <div className="sechead">
    <div className="eyebrow">02 · Review</div>
    <h2>The gaps</h2>
    <p className="lead">Looking back at the 2024 flows, the gaps fall into two kinds: things the design never factored in, and things the models of the time couldn’t do yet.</p>
  </div>
  <h3 className="subhead">What I didn’t factor in</h3>
  <div className="gaps reveal">
    <div className="gap"><span className="tag">Outcome</span><h3>No ending</h3><p>Echochamber promised to &quot;discuss and resolve&quot;, but I never decided what it should hand back. It stopped when the talking stopped: no summary, no decision, no next step.</p></div>
    <div className="gap"><span className="tag">Audience</span><h3>Who it was for</h3><p>In a group of 18, I never decided who sees the result. The confirmation said &quot;only you can see this&quot;, then every agent reply landed in front of the whole chat.</p></div>
    <div className="gap"><span className="tag">Agreement</span><h3>More agents, same answer</h3><p>I assumed more agents meant better answers. Agents drift towards agreeing with each other, and copies of one model agree fastest. There were no roles and no skeptic to push back.</p></div>
    <div className="gap"><span className="tag">Control</span><h3>A spectator once it started</h3><p>After you pressed start, you could only watch. You couldn’t steer it, add a point, or stop early and keep what had been said.</p></div>
    <div className="gap"><span className="tag">Value</span><h3>Paying for talk, not answers</h3><p>The price counted exchanges, and &quot;exchange&quot; was never defined. Nothing stopped a debate once it was settled, and Echo charged for every message while it was on.</p></div>
    <div className="gap"><span className="tag">Naming</span><h3>The name described the failure</h3><p>An echo chamber is a room where everyone agrees, which is exactly where unchecked AI debate drifts. And Echo and Echochamber were one word apart for two very different features.</p></div>
  </div>
  <h3 className="subhead">What the technology couldn’t do in 2024</h3>
  <figure className="diagram reveal"><div className="scroll"><svg viewBox="0 0 680 192" role="img" aria-label="Timeline: Echo was designed in April 2024, before structured output (August 2024), reasoning models (September 2024), MCP (November 2024), A2A (April 2025), AI in group chats (November 2025) and model councils (February 2026)."><defs><marker id="m3" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" style={{ fill: "var(--dim)" }} /></marker><marker id="n3" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" style={{ fill: "var(--accent)" }} /></marker></defs><line x1="30" y1="100" x2="650" y2="100" style={{ stroke: "var(--line)", strokeWidth: "2" }} /><line x1="30" y1="46" x2="30" y2="96" style={{ stroke: "var(--line)" }} /><circle cx="30" cy="100" r="5" style={{ fill: "var(--accent)" }} /><text x="30" y="26" textAnchor="start" style={{ fill: "var(--accent)", fontSize: "12.5px" }}>Echo designed</text><text x="30" y="40" textAnchor="start" style={{ fill: "var(--dim)", fontSize: "11.5px" }}>Apr 2024</text><line x1="110" y1="104" x2="110" y2="120" style={{ stroke: "var(--line)" }} /><circle cx="110" cy="100" r="4" style={{ fill: "var(--muted)" }} /><text x="110" y="136" textAnchor="middle" style={{ fill: "var(--fg)", fontSize: "12.5px" }}>Structured output</text><text x="110" y="150" textAnchor="middle" style={{ fill: "var(--dim)", fontSize: "11.5px" }}>Aug 2024</text><line x1="130" y1="78" x2="130" y2="96" style={{ stroke: "var(--line)" }} /><circle cx="130" cy="100" r="4" style={{ fill: "var(--muted)" }} /><text x="130" y="58" textAnchor="middle" style={{ fill: "var(--fg)", fontSize: "12.5px" }}>Reasoning models</text><text x="130" y="72" textAnchor="middle" style={{ fill: "var(--dim)", fontSize: "11.5px" }}>Sep 2024</text><line x1="170" y1="104" x2="170" y2="152" style={{ stroke: "var(--line)" }} /><circle cx="170" cy="100" r="4" style={{ fill: "var(--muted)" }} /><text x="170" y="168" textAnchor="middle" style={{ fill: "var(--fg)", fontSize: "12.5px" }}>MCP</text><text x="170" y="182" textAnchor="middle" style={{ fill: "var(--dim)", fontSize: "11.5px" }}>Nov 2024</text><line x1="270" y1="78" x2="270" y2="96" style={{ stroke: "var(--line)" }} /><circle cx="270" cy="100" r="4" style={{ fill: "var(--muted)" }} /><text x="270" y="58" textAnchor="middle" style={{ fill: "var(--fg)", fontSize: "12.5px" }}>A2A</text><text x="270" y="72" textAnchor="middle" style={{ fill: "var(--dim)", fontSize: "11.5px" }}>Apr 2025</text><line x1="410" y1="104" x2="410" y2="120" style={{ stroke: "var(--line)" }} /><circle cx="410" cy="100" r="4" style={{ fill: "var(--muted)" }} /><text x="410" y="136" textAnchor="middle" style={{ fill: "var(--fg)", fontSize: "12.5px" }}>AI in group chats</text><text x="410" y="150" textAnchor="middle" style={{ fill: "var(--dim)", fontSize: "11.5px" }}>Nov 2025</text><line x1="470" y1="78" x2="470" y2="96" style={{ stroke: "var(--line)" }} /><circle cx="470" cy="100" r="4" style={{ fill: "var(--muted)" }} /><text x="470" y="58" textAnchor="middle" style={{ fill: "var(--fg)", fontSize: "12.5px" }}>Model councils ship</text><text x="470" y="72" textAnchor="middle" style={{ fill: "var(--dim)", fontSize: "11.5px" }}>Feb 2026</text><line x1="650" y1="46" x2="650" y2="96" style={{ stroke: "var(--line)" }} /><circle cx="650" cy="100" r="5" style={{ fill: "var(--accent)" }} /><text x="650" y="26" textAnchor="end" style={{ fill: "var(--accent)", fontSize: "12.5px" }}>Council and Debate</text><text x="650" y="40" textAnchor="end" style={{ fill: "var(--dim)", fontSize: "11.5px" }}>Nov 2026</text></svg></div><figcaption><b>The design came before the tools.</b> Echo was designed four months before guaranteed structured output, seven before MCP and a year before A2A. Everything a council leans on arrived after it.</figcaption></figure>
  <div className="gaps reveal">
    <div className="gap tech"><span className="tag">Cost</span><h3>Several models per message was expensive</h3><p>Frontier models cost $10 to $30 per million tokens, so the default was GPT-3.5 and every exchange had to be rationed and charged.</p></div>
    <div className="gap tech"><span className="tag">Context</span><h3>It couldn’t read the room</h3><p>GPT-3.5 could take in about 16,000 tokens. Debating the actual group conversation, rather than one prompt, was out of reach for the default model.</p></div>
    <div className="gap tech"><span className="tag">Structure</span><h3>No dependable result card</h3><p>Guaranteed structured output arrived in August 2024. Before that, turning a debate into a clean decision, split or plan meant parsing free text and hoping.</p></div>
    <div className="gap tech"><span className="tag">Tools</span><h3>Agents couldn’t share context</h3><p>MCP arrived in November 2024 and A2A in 2025. Zo Apps had no standard way to pass context or tools between agents in one conversation.</p></div>
    <div className="gap tech"><span className="tag">Freshness</span><h3>No web search in the APIs</h3><p>Neither OpenAI’s nor Anthropic’s API had built-in search then, so answers about prices, places or news could be out of date.</p></div>
  </div>
</section>


<section id="shifts" className="col">
  <div className="sechead">
    <div className="eyebrow">03 · The world moved</div>
    <h2>What changed in AI since 2024</h2>
    <p className="lead">My new direction did not come from the screens alone. Between 2024 and now, AI changed in seven ways that each pointed at a specific design decision.</p>
  </div>
  <div className="shifts">
    <div className="shift reveal"><div className="then"><span className="when">2024 → 2026</span><h3>From chatbots to agents</h3><p>In 2024 AI mostly answered questions. Now it uses tools, reads sources and takes actions. Anthropic introduced the Model Context Protocol in November 2024, and it became the common way to plug models into tools and data.</p></div><div className="so"><span className="tag">What it changed for me</span><p>Seats can search the web, cite sources and use Zo apps. An outcome can be something you act on, like a suggested split, not just a paragraph.</p></div></div>
    <div className="shift reveal"><div className="then"><span className="when">Since September 2024</span><h3>Models that think, and think in parallel</h3><p>OpenAI’s o1 started a run of reasoning models that spend more time before answering. By July 2025 xAI’s Grok 4 Heavy was running several agents side by side and comparing their work. Quality now comes from extra thinking and from parallel attempts, more than from long back-and-forth.</p></div><div className="so"><span className="tag">What it changed for me</span><p>Council runs three seats at once and compares them. Debate is capped at a few rounds and stops early once positions stop moving.</p></div></div>
    <div className="shift reveal"><div className="then"><span className="when">November 2025</span><h3>AI moved into group chats</h3><p>ChatGPT and Poe both launched group chats where people and models share a thread. ChatGPT stays quiet unless it is asked and offers a mention-only mode. The etiquette of an AI in a room of friends became a design problem everyone is solving.</p></div><div className="so"><span className="tag">What it changed for me</span><p>Council and Debate start from the apps button or an @mention, never on their own. The group sees one result, and debates run in their own thread.</p></div></div>
    <div className="shift reveal"><div className="then"><span className="when">November 2025 → February 2026</span><h3>Comparing models became a product</h3><p>Karpathy’s open-source LLM Council and Perplexity’s Model Council both send one question to several models and synthesise one answer. People want to see where models agree and where they don’t, not pick a single favourite.</p></div><div className="so"><span className="tag">What it changed for me</span><p>Echo became Council. The card leads with where the models land, then shows the split and lets you read every answer.</p></div></div>
    <div className="shift reveal"><div className="then"><span className="when">2024 → 2026</span><h3>Cost and context stopped being the constraint</h3><p>Epoch AI measures the price of a fixed level of capability falling tens to hundreds of times a year. Context windows grew from about 16k tokens to 128k and beyond, and cached re-reads became cheap.</p></div><div className="so"><span className="tag">What it changed for me</span><p>A council can be an everyday reflex and a debate fits any real argument. The price is still shown before you start, but it is small and charged only for what runs.</p></div></div>
    <div className="shift reveal"><div className="then"><span className="when">Mid-2025 → April 2026</span><h3>Agents learned to talk to each other</h3><p>Google’s Agent2Agent protocol moved to the Linux Foundation in 2025 and passed 150 supporting organisations within a year. With MCP for tools and A2A for agents, a seat no longer has to be a model you host.</p></div><div className="so"><span className="tag">What it changed for me</span><p>Seats can be specialists built in App Studio, and later agents from outside Zo can join a debate.</p></div></div>
    <div className="shift reveal"><div className="then"><span className="when">April 2025 → 2026</span><h3>The agreement problem got a name</h3><p>OpenAI rolled back a GPT-4o update in April 2025 because it had become too agreeable. Research on multi-agent debate kept finding the same thing: copies of one model drift into agreeing with each other.</p></div><div className="so"><span className="tag">What it changed for me</span><p>Seats come from different model families, sides are assigned at random, the strongest objection is always kept, and the group can vote on the result.</p></div></div>
  </div>
</section>
<section id="tech" className="col">
  <div className="sechead">
    <div className="eyebrow">04 · The numbers</div>
    <h2>The numbers behind it</h2>
    <p className="lead">The original designs defaulted to GPT-3.5. Most of the limits I designed around then have since gone away. One has not: agents talking to each other do not automatically produce better answers.</p>
  </div>

  <h3 className="subhead">What OpenAI and Anthropic could do when Echo was designed</h3>
  <p className="lead">Echo and Echochamber were designed in April 2024. Both labs existed and had working APIs, but the tools this kind of feature needs were either brand new or months away.</p>
  <div className="tnwrap reveal">
    <table className="tn">
      <thead><tr><th>In 2024</th><th>OpenAI</th><th>Anthropic</th></tr></thead>
      <tbody>
        <tr><td>Models on offer</td><td>GPT-3.5 Turbo and GPT-4 Turbo. GPT-4o arrived in May, GPT-4o mini in July.</td><td>Claude 3 (Haiku, Sonnet, Opus) arrived in March. Claude 3.5 Sonnet in June.</td></tr>
        <tr><td>Price per million tokens</td><td>GPT-3.5 Turbo <span className="num">$0.50 / $1.50</span>. GPT-4 Turbo <span className="num">$10 / $30</span>. GPT-4o <span className="num">$5 / $15</span>.</td><td>Claude 3 Haiku <span className="num">$0.25 / $1.25</span>. Claude 3 Opus <span className="num">$15 / $75</span>. Claude 3.5 Sonnet <span className="num">$3 / $15</span>.</td></tr>
        <tr><td>Context</td><td>About 16k on GPT-3.5 Turbo; 128k on GPT-4 Turbo and GPT-4o.</td><td>200k across Claude 3, but long prompts were slow and expensive to resend every turn.</td></tr>
        <tr><td>Tools and structure</td><td>Function calling existed. Guaranteed JSON (Structured Outputs) only arrived in August 2024.</td><td>Tool use was in beta from April and generally available from the end of May 2024.</td></tr>
        <tr><td>Re-reading the conversation</td><td>No caching until October 2024; every agent paid full price to reread the transcript.</td><td>Prompt caching entered beta in August 2024.</td></tr>
        <tr><td>Reasoning</td><td>No reasoning models until o1-preview in September 2024.</td><td>No extended thinking yet.</td></tr>
        <tr><td>Agents and standards</td><td>An Assistants API in beta. No group-chat product, no agent-to-agent standard.</td><td>No MCP until November 2024. Computer use arrived as a beta in October.</td></tr>
      </tbody>
    </table>
  </div>
  <p>So the 2024 limits were real, and they explain the original screens. A cheap model with a short memory, every turn charged at full price, unreliable structure and no way to make agents disagree well meant the safest design was a fixed number of exchanges, a price on every round, and nothing designed for the end.</p>
  <div className="tnwrap reveal">
    <table className="tn">
      <thead><tr><th>Limit</th><th>2024, when Echo shipped</th><th>2026, now</th></tr></thead>
      <tbody>
        <tr><td>Context</td><td>About 16k tokens on GPT-3.5 Turbo. Eight rounds of four agents ran out of room.</td><td>128k to 1M tokens is normal, so long rooms fit.</td></tr>
        <tr><td>Cost</td><td>$0.50 in and $1.50 out per million tokens, so every round had a visible price.</td><td>The price of a fixed level of capability falls <span className="num">9× to 900×</span> a year, median <span className="num">50×</span>, recently about <span className="num">200×</span> (Epoch AI). Cached re-reads cost about 10% on Anthropic.</td></tr>
        <tr><td>Speed</td><td>Agents answered one after another.</td><td>Parallel streaming is routine, so three seats can answer at once.</td></tr>
        <tr><td>Orchestration</td><td>Hand-rolled turn-taking.</td><td>Group-chat orchestration with a manager that picks the next speaker ships in Microsoft Agent Framework. A2A (v1, 150+ organisations) lets agents from different vendors talk; MCP connects them to tools.</td></tr>
        <tr><td>Products</td><td>Poe’s multi-bot chat (April 2024).</td><td>Poe group chats with up to 200 people across 200+ models, and ChatGPT group chats with a mention-only mode (both November 2025). Karpathy’s LLM Council (November 2025) and Perplexity’s Model Council (February 2026) compare models and synthesise one answer.</td></tr>
      </tbody>
    </table>
  </div>
  <h3 className="subhead">What the research says about agents debating</h3>
  <div className="findings reveal">
    <div className="finding"><div className="big">≈ voting</div><p>At equal compute, multi-agent debate usually does not beat simple self-consistency voting. Most of the gain comes from aggregating answers.</p></div>
    <div className="finding"><div className="big">85.5%</div><p>Highest rate at which agents in same-model teams adopted the majority answer, while using 2.1 to 3.4 times the tokens of self-correction.</p></div>
    <div className="finding"><div className="big">91% vs 82%</div><p>A reported comparison: mixed model families against identical copies of one model. Diversity helps.</p></div>
    <div className="finding"><div className="big">15×</div><p>Tokens a multi-agent system uses compared with a chat (Anthropic), with a 90.2% gain on an internal research eval. Worth it only for tasks that matter.</p></div>
  </div>
  <p className="caveat">Many of these studies use small open models and benchmark tasks, and some figures come from preprints or secondary summaries. I treat them as direction, not law.</p>
  <blockquote className="quote reveal">So the value is not watching agents chat. It is what they hand back.</blockquote>
</section>

<section id="design" className="wide">
  <div className="col sechead">
    <div className="eyebrow">05 · Redesign</div>
    <h2>What I designed</h2>
    <p className="lead">Echo became <b>Council</b>: several models answer at once, and Zo shows where they agree. Echochamber became <b>Debate</b>: agents take sides, a moderator runs it, and it ends with something you can act on. Both launch from the apps button next to + in the composer, with <span style={{ fontFamily: "var(--mono)" }}>@council</span> and <span style={{ fontFamily: "var(--mono)" }}>@debate</span> as shortcuts.</p>
  </div>

  <div className="flow">
    <div className="col flowhead"><h3><span className="tag">Council</span>Ask once, get one card</h3><p className="lead">One card instead of one bubble per agent. Seats from different model families by default. The price before you ask. Only you see it until you post it. Once it’s posted, everyone can open the full answers, and the verdict can become a vote.</p></div>
    <figure className="diagram wide-d reveal"><div className="scroll"><svg viewBox="0 0 1000 390" role="img" aria-label="In 2024 every agent replied straight into the group chat. In 2026 three models answer inside a private boundary, Zo compares them into one card, and only the person who asked decides whether to post it."><defs><marker id="m1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" style={{ fill: "var(--dim)" }} /></marker><marker id="n1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" style={{ fill: "var(--accent)" }} /></marker></defs><text x="20" y="22" style={{ fill: "var(--dim)", fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: ".08em" }}>2024 · ECHO</text><rect x="20" y="62" width="130" height="40" rx="10" style={{ fill: "var(--surface)", stroke: "var(--line)" }} /><text x="85.0" y="86.5" textAnchor="middle" style={{ fill: "var(--fg)", fontSize: "13px" }}>Mena asks</text><rect x="230" y="34" width="110" height="28" rx="8" style={{ fill: "var(--surface)", stroke: "var(--line)" }} /><text x="285.0" y="52.5" textAnchor="middle" style={{ fill: "var(--fg)", fontSize: "13px" }}>Agent 1</text><line x1="150" y1="82" x2="229" y2="48" style={{ stroke: "var(--dim)", strokeWidth: "1.2", fill: "none" }} markerEnd="url(#m1)" /><line x1="340" y1="48" x2="879" y2="99" style={{ stroke: "var(--dim)", strokeWidth: "1.2", fill: "none" }} markerEnd="url(#m1)" /><rect x="230" y="68" width="110" height="28" rx="8" style={{ fill: "var(--surface)", stroke: "var(--line)" }} /><text x="285.0" y="86.5" textAnchor="middle" style={{ fill: "var(--fg)", fontSize: "13px" }}>Agent 2</text><line x1="150" y1="82" x2="229" y2="82" style={{ stroke: "var(--dim)", strokeWidth: "1.2", fill: "none" }} markerEnd="url(#m1)" /><line x1="340" y1="82" x2="879" y2="99" style={{ stroke: "var(--dim)", strokeWidth: "1.2", fill: "none" }} markerEnd="url(#m1)" /><rect x="230" y="102" width="110" height="28" rx="8" style={{ fill: "var(--surface)", stroke: "var(--line)" }} /><text x="285.0" y="120.5" textAnchor="middle" style={{ fill: "var(--fg)", fontSize: "13px" }}>Agent 3</text><line x1="150" y1="82" x2="229" y2="116" style={{ stroke: "var(--dim)", strokeWidth: "1.2", fill: "none" }} markerEnd="url(#m1)" /><line x1="340" y1="116" x2="879" y2="99" style={{ stroke: "var(--dim)", strokeWidth: "1.2", fill: "none" }} markerEnd="url(#m1)" /><rect x="230" y="136" width="110" height="28" rx="8" style={{ fill: "var(--surface)", stroke: "var(--line)" }} /><text x="285.0" y="154.5" textAnchor="middle" style={{ fill: "var(--fg)", fontSize: "13px" }}>Agent 4</text><line x1="150" y1="82" x2="229" y2="150" style={{ stroke: "var(--dim)", strokeWidth: "1.2", fill: "none" }} markerEnd="url(#m1)" /><line x1="340" y1="150" x2="879" y2="99" style={{ stroke: "var(--dim)", strokeWidth: "1.2", fill: "none" }} markerEnd="url(#m1)" /><text x="610" y="62" textAnchor="middle" style={{ fill: "var(--dim)", fontSize: "11.5px" }}>every reply posts to all 18</text><rect x="880" y="64" width="110" height="70" rx="10" style={{ fill: "var(--surface)", stroke: "var(--line)" }} /><text x="935.0" y="96.0" textAnchor="middle" style={{ fill: "var(--fg)", fontSize: "13px" }}>The group</text><text x="935.0" y="112.0" textAnchor="middle" style={{ fill: "var(--dim)", fontSize: "11.5px" }}>18 people</text><line x1="20" y1="184" x2="990" y2="184" style={{ stroke: "var(--line)" }} /><text x="20" y="214" style={{ fill: "var(--dim)", fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: ".08em" }}>2026 · COUNCIL</text><rect x="214" y="228" width="481" height="146" rx="14" style={{ fill: "rgb(253 252 248 / 0.04)", stroke: "var(--accent)", strokeDasharray: "5 5" }} /><text x="230" y="248" textAnchor="start" style={{ fill: "var(--accent)", fontSize: "11.5px" }}>Only Mena sees this</text><rect x="20" y="289" width="130" height="40" rx="10" style={{ fill: "var(--surface)", stroke: "var(--line)" }} /><text x="85.0" y="313.5" textAnchor="middle" style={{ fill: "var(--fg)", fontSize: "13px" }}>Mena asks</text><rect x="230" y="262" width="110" height="28" rx="8" style={{ fill: "var(--surface)", stroke: "var(--line)" }} /><text x="285.0" y="280.5" textAnchor="middle" style={{ fill: "var(--fg)", fontSize: "13px" }}>Claude</text><line x1="150" y1="309" x2="229" y2="276" style={{ stroke: "var(--dim)", strokeWidth: "1.2", fill: "none" }} markerEnd="url(#m1)" /><line x1="340" y1="276" x2="389" y2="309" style={{ stroke: "var(--dim)", strokeWidth: "1.2", fill: "none" }} markerEnd="url(#m1)" /><rect x="230" y="299" width="110" height="28" rx="8" style={{ fill: "var(--surface)", stroke: "var(--line)" }} /><text x="285.0" y="317.5" textAnchor="middle" style={{ fill: "var(--fg)", fontSize: "13px" }}>ChatGPT</text><line x1="150" y1="309" x2="229" y2="313" style={{ stroke: "var(--dim)", strokeWidth: "1.2", fill: "none" }} markerEnd="url(#m1)" /><line x1="340" y1="313" x2="389" y2="309" style={{ stroke: "var(--dim)", strokeWidth: "1.2", fill: "none" }} markerEnd="url(#m1)" /><rect x="230" y="336" width="110" height="28" rx="8" style={{ fill: "var(--surface)", stroke: "var(--line)" }} /><text x="285.0" y="354.5" textAnchor="middle" style={{ fill: "var(--fg)", fontSize: "13px" }}>Gemini</text><line x1="150" y1="309" x2="229" y2="350" style={{ stroke: "var(--dim)", strokeWidth: "1.2", fill: "none" }} markerEnd="url(#m1)" /><line x1="340" y1="350" x2="389" y2="309" style={{ stroke: "var(--dim)", strokeWidth: "1.2", fill: "none" }} markerEnd="url(#m1)" /><text x="180" y="281" textAnchor="middle" style={{ fill: "var(--dim)", fontSize: "11.5px" }}>in parallel</text><rect x="390" y="291" width="110" height="36" rx="10" style={{ fill: "var(--surface)", stroke: "var(--line)" }} /><text x="445.0" y="313.5" textAnchor="middle" style={{ fill: "var(--fg)", fontSize: "13px" }}>Zo compares</text><line x1="500" y1="309" x2="549" y2="309" style={{ stroke: "var(--dim)", strokeWidth: "1.2", fill: "none" }} markerEnd="url(#m1)" /><rect x="550" y="291" width="130" height="36" rx="10" style={{ fill: "var(--surface)", stroke: "var(--line)" }} /><text x="615.0" y="313.5" textAnchor="middle" style={{ fill: "var(--fg)", fontSize: "13px" }}>One card</text><line x1="680" y1="309" x2="729" y2="309" style={{ stroke: "var(--dim)", strokeWidth: "1.2", fill: "none" }} markerEnd="url(#m1)" /><rect x="730" y="291" width="110" height="36" rx="10" style={{ fill: "var(--surface)", stroke: "var(--accent)" }} /><text x="785.0" y="313.5" textAnchor="middle" style={{ fill: "var(--fg)", fontSize: "13px" }}>Mena chooses</text><line x1="840" y1="309" x2="879" y2="309" style={{ stroke: "var(--accent)", strokeWidth: "1.4", fill: "none" }} markerEnd="url(#n1)" /><text x="860" y="299" textAnchor="middle" style={{ fill: "var(--accent)", fontSize: "11.5px" }}>post</text><text x="785" y="350" textAnchor="middle" style={{ fill: "var(--dim)", fontSize: "11.5px" }}>or vote, debate</text><text x="785" y="365" textAnchor="middle" style={{ fill: "var(--dim)", fontSize: "11.5px" }}>or discard</text><rect x="880" y="276" width="110" height="66" rx="10" style={{ fill: "var(--surface)", stroke: "var(--line)" }} /><text x="935.0" y="306.0" textAnchor="middle" style={{ fill: "var(--fg)", fontSize: "13px" }}>The group</text><text x="935.0" y="322.0" textAnchor="middle" style={{ fill: "var(--dim)", fontSize: "11.5px" }}>18 people</text></svg></div><figcaption><b>How a council travels.</b> In 2024 every agent replied straight into the group. Now the answers stay inside a private boundary until the person who asked decides to post one card.</figcaption></figure>
    <div className="strip reveal">
      <figure className="shot vid"><Clip name="council" label="Watch it: Council" /><figcaption><b>Watch it: Council</b>Apps button, pick Council, type, send. Three answers, one comparison, then you post it.</figcaption></figure>
      <figure className="shot"><Shot src="shot-08.jpg" alt="Ask Zo menu opened from the apps button" /><figcaption><b>Tap the apps button</b>Council, Debate, Summarize and Zo Apps in one place.</figcaption></figure>
      <figure className="shot"><Shot src="shot-09.jpg" alt="Council attached to the message in the composer" /><figcaption><b>Council attaches</b>A chip shows the 3 seats and the 6 Zap price before you send.</figcaption></figure>
      <figure className="shot"><Shot src="shot-10.jpg" alt="Council card with three seats answering" /><figcaption><b>Three seats, one card</b>Claude, ChatGPT and Gemini stream in parallel. So far only you can see it.</figcaption></figure>
      <figure className="shot"><Shot src="shot-11.jpg" alt="Council comparison: where they land, agree, differ" /><figcaption><b>Where they land</b>2 of 3 recommend it and Gemini differs. Then you choose: post it, put it to a vote, debate it or discard it.</figcaption></figure>
      <figure className="shot vid"><Clip name="vote" label="Watch it: the group decides" /><figcaption><b>Watch it: the group decides</b>Votes come in, Mena closes the poll, and the result is saved to Highlights.</figcaption></figure>
    </div>
  </div>

  <div className="flow">
    <div className="col flowhead"><h3><span className="tag">Debate</span>Choose the outcome first</h3><p className="lead">You pick what comes back: a decision, a plan, pros and cons, or ranked ideas. Zo casts advocates for each option and a skeptic, spread across model families and assigned at random. You choose a length in plain terms, it stops early once positions stop moving, it runs in its own thread, and the outcome keeps the strongest objection.</p></div>
    <figure className="diagram wide-d reveal"><div className="scroll"><svg viewBox="0 0 1000 310" role="img" aria-label="Zo casts the debate across model families, runs rounds until positions stop moving or the budget runs out, folds in points from anyone in the group, and posts the outcome to the chat as a vote. Only the person who started it can end it early."><defs><marker id="m2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" style={{ fill: "var(--dim)" }} /></marker><marker id="n2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" style={{ fill: "var(--accent)" }} /></marker></defs><rect x="20" y="132" width="150" height="56" rx="10" style={{ fill: "var(--surface)", stroke: "var(--line)" }} /><text x="95.0" y="157.0" textAnchor="middle" style={{ fill: "var(--fg)", fontSize: "13px" }}>Question</text><text x="95.0" y="173.0" textAnchor="middle" style={{ fill: "var(--dim)", fontSize: "11.5px" }}>+ its options</text><line x1="170" y1="160" x2="209" y2="160" style={{ stroke: "var(--dim)", strokeWidth: "1.2", fill: "none" }} markerEnd="url(#m2)" /><text x="190" y="150" textAnchor="middle" style={{ fill: "var(--dim)", fontSize: "11.5px" }}>casts</text><rect x="210" y="70" width="200" height="180" rx="12" style={{ fill: "var(--surface)", stroke: "var(--line)" }} /><text x="226" y="96" style={{ fill: "var(--dim)", fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: ".08em" }}>THE CAST</text><text x="226" y="124" style={{ fill: "var(--fg)", fontSize: "13px" }}>Zo · moderator</text><text x="226" y="152" style={{ fill: "var(--fg)", fontSize: "13px" }}>Claude · for option A</text><text x="226" y="180" style={{ fill: "var(--fg)", fontSize: "13px" }}>Gemini · for option B</text><text x="226" y="208" style={{ fill: "var(--fg)", fontSize: "13px" }}>ChatGPT · skeptic</text><text x="226" y="234" style={{ fill: "var(--dim)", fontSize: "11.5px" }}>mixed families, random sides</text><line x1="410" y1="160" x2="459" y2="160" style={{ stroke: "var(--dim)", strokeWidth: "1.2", fill: "none" }} markerEnd="url(#m2)" /><rect x="460" y="132" width="150" height="56" rx="10" style={{ fill: "var(--surface)", stroke: "var(--line)" }} /><text x="535.0" y="157.0" textAnchor="middle" style={{ fill: "var(--fg)", fontSize: "13px" }}>Round</text><text x="535.0" y="173.0" textAnchor="middle" style={{ fill: "var(--dim)", fontSize: "11.5px" }}>each speaks once</text><line x1="610" y1="160" x2="659" y2="160" style={{ stroke: "var(--dim)", strokeWidth: "1.2", fill: "none" }} markerEnd="url(#m2)" /><rect x="660" y="132" width="140" height="56" rx="28" style={{ fill: "var(--surface)", stroke: "var(--line)" }} /><text x="730.0" y="157.0" textAnchor="middle" style={{ fill: "var(--fg)", fontSize: "13px" }}>Still moving?</text><text x="730.0" y="173.0" textAnchor="middle" style={{ fill: "var(--dim)", fontSize: "11.5px" }}>stances · budget</text><path d="M730 132 V100 H535 V131" style={{ stroke: "var(--dim)", strokeWidth: "1.2", fill: "none" }} markerEnd="url(#m2)" /><text x="632" y="92" textAnchor="middle" style={{ fill: "var(--dim)", fontSize: "11.5px" }}>yes · next round</text><line x1="800" y1="160" x2="839" y2="160" style={{ stroke: "var(--dim)", strokeWidth: "1.2", fill: "none" }} markerEnd="url(#m2)" /><text x="820" y="150" textAnchor="middle" style={{ fill: "var(--dim)", fontSize: "11.5px" }}>no</text><rect x="840" y="122" width="140" height="76" rx="10" style={{ fill: "var(--surface)", stroke: "var(--accent)" }} /><text x="910" y="150" textAnchor="middle" style={{ fill: "var(--fg)", fontSize: "13px" }}>Outcome</text><text x="910" y="168" textAnchor="middle" style={{ fill: "var(--dim)", fontSize: "11.5px" }}>decision + the</text><text x="910" y="183" textAnchor="middle" style={{ fill: "var(--dim)", fontSize: "11.5px" }}>open objection</text><line x1="910" y1="198" x2="910" y2="249" style={{ stroke: "var(--accent)", strokeWidth: "1.4", fill: "none" }} markerEnd="url(#n2)" /><text x="902" y="228" textAnchor="end" style={{ fill: "var(--accent)", fontSize: "11.5px" }}>posted to the chat</text><rect x="840" y="250" width="140" height="44" rx="10" style={{ fill: "var(--surface)", stroke: "var(--line)" }} /><text x="910.0" y="276.5" textAnchor="middle" style={{ fill: "var(--fg)", fontSize: "13px" }}>Group votes</text><rect x="460" y="250" width="150" height="50" rx="10" style={{ fill: "var(--surface)", stroke: "var(--line)" }} /><text x="535.0" y="272.0" textAnchor="middle" style={{ fill: "var(--fg)", fontSize: "13px" }}>Anyone in the group</text><text x="535.0" y="288.0" textAnchor="middle" style={{ fill: "var(--dim)", fontSize: "11.5px" }}>adds a point · free</text><line x1="535" y1="250" x2="535" y2="189" style={{ stroke: "var(--dim)", strokeWidth: "1.2", fill: "none" }} markerEnd="url(#m2)" /><text x="545" y="224" textAnchor="start" style={{ fill: "var(--dim)", fontSize: "11.5px" }}>joins next round</text><rect x="660" y="26" width="140" height="32" rx="10" style={{ fill: "var(--surface)", stroke: "var(--line)" }} /><text x="730.0" y="46.5" textAnchor="middle" style={{ fill: "var(--fg)", fontSize: "13px" }}>Mena can end it</text><path d="M800 42 H880 V121" style={{ stroke: "var(--dim)", strokeWidth: "1.2", fill: "none", strokeDasharray: "4 4" }} markerEnd="url(#m2)" /></svg></div><figcaption><b>How a debate runs.</b> Rounds repeat until positions stop moving or the budget runs out. Points from anyone in the group join the next round, only the starter can end it early, and the outcome comes back as a vote.</figcaption></figure>
    <div className="strip reveal">
      <figure className="shot vid"><Clip name="debate" label="Watch it: Debate" /><figcaption><b>Watch it: Debate</b>Set up, check who’s debating, start. Points arrive in the thread, then the outcome lands in the chat.</figcaption></figure>
      <figure className="shot"><Shot src="shot-12.jpg" alt="Debate setup: question, options, what comes back" /><figcaption><b>What comes back</b>The question and options are filled from the chat.</figcaption></figure>
      <figure className="shot"><Shot src="shot-13.jpg" alt="Who's debating: roles and length" /><figcaption><b>Who’s debating</b>Roles you can change, and Quick, Standard or Deep with the price shown.</figcaption></figure>
      <figure className="shot vid"><Clip name="roles" label="Watch it: change a role" /><figcaption><b>Watch it: change a role</b>Pick a model already in the debate and the two swap, with Undo.</figcaption></figure>
      <figure className="shot vid"><Clip name="addoption" label="Watch it: add an option" /><figcaption><b>Watch it: add an option</b>Type it, tap Add, and the cast and price update: 3 debaters plus a skeptic.</figcaption></figure>
      <figure className="shot"><Shot src="shot-14.jpg" alt="Debate live in its own thread" /><figcaption><b>Live, in a thread</b>A stance tracker, the moderator, and points from anyone in the group, shown with their name.</figcaption></figure>
      <figure className="shot"><Shot src="shot-15.jpg" alt="The debate outcome" /><figcaption><b>The outcome</b>A decision, a suggested split, the open objection, and what would change it.</figcaption></figure>
    </div>
  </div>
  <div className="flow">
    <div className="col flowhead"><h3><span className="tag">Visibility</span>Who sees what</h3><p className="lead">In a group of 18, the first question is who a result is for. My answer: a council is yours until you share it, and a debate belongs to the group.</p>
      <div className="tnwrap reveal"><table className="tn">
        <thead><tr><th></th><th>The person who started it</th><th>Everyone else</th></tr></thead>
        <tbody>
          <tr><td>Council, while it runs</td><td>Watches the three answers stream in</td><td>Sees nothing and gets no notification</td></tr>
          <tr><td>Council, when it finishes</td><td>Posts it, puts it to a vote, debates it or discards it</td><td>Opens the full answers once it is posted, replies, starts a poll</td></tr>
          <tr><td>Debate, while it runs</td><td>Watches, adds points, can end it</td><td>Sees one card in the chat, watches, adds a point (free, 1 per round)</td></tr>
          <tr><td>Debate outcome</td><td>Posted to the chat when it finishes</td><td>Reads it and votes on it</td></tr>
          <tr><td>Who pays</td><td>Pays for what they start</td><td>Pays only for follow-ups or debates they start</td></tr>
        </tbody>
      </table></div>
    </div>
    <div className="strip reveal">
      <figure className="shot"><Shot src="shot-16.jpg" alt="The council's verdict posted to the group as one card" /><figcaption><b>Posted to the group</b>One card with the verdict. Anyone can open the full answers.</figcaption></figure>
      <figure className="shot vid"><Clip name="member" label="Watch it: Aise’s side" /><figcaption><b>Watch it: Aise’s side</b>The posted card lands, she opens every answer, then replies quoting the council.</figcaption></figure>
      <figure className="shot"><Shot src="shot-17.jpg" alt="A live debate card in the group chat" /><figcaption><b>A debate starts in the open</b>One card in the chat. Anyone can watch or add a point; only Mena can end it.</figcaption></figure>
    </div>
  </div>
</section>

<section id="compare" className="wide">
  <div className="col sechead">
    <div className="eyebrow">06 · Side by side</div>
    <h2>Before and after</h2>
  </div>
  <div className="pairs">
    <div className="pair reveal">
      <Compare before="shot-18.jpg" beforeLabel="2024 · Echo" beforeAlt="Echo replies as separate messages" after="shot-19.jpg" afterLabel="2026 · Council" afterAlt="Council comparison card" />
      <div className="note"><h3>Four bubbles become one answer</h3><p>Echo dropped every reply into the group as its own message. Council compares them in a single card that says where the models agree, where they differ, and which one the others ranked most useful.</p></div>
    </div>
    <div className="pair reveal">
      <Compare before="shot-20.jpg" beforeLabel="2024 · Echochamber" beforeAlt="Echochamber setup with exchanges" after="shot-21.jpg" afterLabel="2026 · Debate" afterAlt="Debate roles and length" />
      <div className="note"><h3>&quot;8 exchanges&quot; becomes a length you understand</h3><p>A round is one turn from each debater. Quick, Standard or Deep shows the rounds, the minutes and the maximum Zaps, and the debate finishes early once nobody changes their mind for a full round.</p></div>
    </div>
    <div className="pair reveal">
      <Compare before="shot-22.jpg" beforeLabel="2024 · Echochamber" beforeAlt="Echochamber agents replying in the group" after="shot-23.jpg" afterLabel="2026 · Debate" afterAlt="Debate live thread" />
      <div className="note"><h3>From the group chat to its own thread</h3><p>Agents no longer talk over the people. The debate runs in a thread with a moderator, a stance tracker and a budget bar, and the group only gets the result.</p></div>
    </div>
    <div className="pair reveal">
      <Compare before="shot-24.jpg" beforeLabel="2024 · Echochamber" beforeAlt="Echochamber confirmation" after="shot-25.jpg" afterLabel="2026 · Debate" afterAlt="Debate outcome" />
      <div className="note"><h3>A confirmation becomes an outcome</h3><p>The old flow ended at &quot;are you sure&quot;. The new one ends with a recommendation, how many agree, the objection that is still open, and what would change the call.</p></div>
    </div>
  </div>
</section>

<section id="system" className="col">
  <div className="sechead">
    <div className="eyebrow">07 · Craft</div>
    <h2>The system underneath</h2>
    <p className="lead">The flows sit on a rebuilt design system, reviewed against Apple’s interface guidance and Emil Kowalski’s design-engineering principles, and audited against WhatsApp, Telegram, iMessage, Discord and AI chat apps on Mobbin.</p>
  </div>
  <div className="two reveal">
    <div className="box"><h3>Colour and states</h3><ul className="clean">
      <li><b>Near-black base</b>, with 12-step neutral and violet ramps. Violet now means action and AI, nothing else.</li>
      <li><b>Hover, pressed and disabled are solid ramp steps</b>, so they render the same in design tools, code and exports.</li>
      <li><b>Contrast fixes:</b> tertiary text from <span className="num">4.08:1</span> to <span className="num">4.6:1</span> or better; the focus ring from <span className="num">1.04:1</span> to <span className="num">8.8:1</span>.</li>
      <li><b>Seven name colours</b> for people, picked from their member ID, as in WhatsApp and Telegram. Real logos for each model, and an avatar each Zo App generates for itself.</li>
    </ul></div>
    <div className="box"><h3>Components and layout</h3><ul className="clean">
      <li><b>Message</b> bubbles that hug their text, group by sender, and carry inline time, replies and reactions.</li>
      <li><b>One squircle field</b> holding + and the apps button on the left and mic (or send) on the right, all styled the same. It grows with the message instead of a fully rounded pill.</li>
      <li><b>Buttons</b> in 3 sizes, 4 variants (including Destructive) and an icon slot, plus Chip and IconButton with a 44px tap area.</li>
      <li><b>Spacing on one scale:</b> <span className="num">104</span> off-scale values down to <span className="num">0</span>. Radii on 6, 10, 14, 20, 28 and pill, with squircle smoothing on the composer and its menus.</li>
      <li><b>Large sheets</b> that push the chat back, scroll inside and pin the main button.</li>
    </ul></div>
  </div>
</section>

<section id="decisions" className="col">
  <div className="sechead">
    <div className="eyebrow">08 · Calls I made</div>
    <h2>Decisions</h2>
  </div>
  <div className="decision"><span className="tag">Rename</span><div><h3>Echo → Council, Echochamber → Debate</h3><p className="lead">Plain words people already know. &quot;Council&quot; also matches where the industry has landed, so Zo stands out through group chat and @mentions rather than the name.</p></div></div>
  <div className="decision"><span className="tag">Diversity</span><div><h3>Different model families by default</h3><p className="lead">Mixed families disagree more honestly. In Debate, sides are assigned at random, so no model argues what it already believes.</p></div></div>
  <div className="decision"><span className="tag">Etiquette</span><div><h3>A council is yours until you share it</h3><p className="lead">A council runs only for the person who asked, and nobody is notified. They post it when it is worth posting, and then everyone can read every answer. A debate is the group’s argument, so it runs in the open: one card in the chat, a thread anyone can add to, and an outcome anyone can vote on.</p></div></div>
  <div className="decision"><span className="tag">People decide</span><div><h3>An answer can become a vote</h3><p className="lead">Any Council verdict or Debate outcome can be posted as a poll. The models inform; the group chooses.</p></div></div>
  <div className="decision"><span className="tag">Cut</span><div><h3>House rules are out</h3><p className="lead">I designed a way to save an outcome as a standing rule that Zo would remind the group about. It added rules and reminders to a friendship, and it didn’t earn its place. The vote does the useful part with less ceremony.</p></div></div>
  <div className="decision"><span className="tag">Honesty</span><div><h3>Show the price, the count and the source</h3><p className="lead">One price format, counts that add up, &quot;2 of 3 agree&quot; with the moderator not voting, AI tags on models, and a disclaimer on anything about money or health.</p></div></div>
</section>

<section id="next" className="col">
  <div className="sechead">
    <div className="eyebrow">09 · Next</div>
    <h2>What is possible now</h2>
    <p className="lead">With prices falling this fast, Council becomes cheap enough to be an everyday reflex, and Debate cheap enough for any decision a group actually argues about.</p>
  </div>
  <div className="two reveal">
    <div className="box"><h3>Within reach</h3><ul className="clean">
      <li><b>Specialist seats</b> from App Studio: a Money Coach or a Travel Planner sitting next to the frontier models.</li>
      <li><b>Agents from outside Zo</b> joining a debate over A2A, with MCP tools for live prices, maps and calendars.</li>
      <li><b>Voice</b>: ask the council out loud and hear the comparison in a voice note.</li>
      <li><b>Highlights as group memory</b>: past councils, debates and votes, searchable, without anything being enforced.</li>
      <li><b>Desktop and light mode</b>, using the same tokens.</li>
    </ul></div>
    <div className="box"><h3>Guardrails I’m keeping</h3><ul className="clean">
      <li><b>No open-ended chatter.</b> Every debate has a length cap and a hard budget.</li>
      <li><b>Agreement is not truth.</b> I show the split and the open objection, not just the winner.</li>
      <li><b>Consent for chat history.</b> Sharing the last 50 messages is off by default, and members are told when it is on.</li>
      <li><b>No likeness agents without consent.</b> No &quot;Vitalik&quot; seat unless the person agrees.</li>
      <li><b>Measure what matters:</b> how many debates end in an outcome, how many outcomes go to a vote, and how often people follow up.</li>
    </ul></div>
  </div>
</section>

<section id="sources" className="col sources">
  <div className="sechead"><div className="eyebrow">Sources</div></div>
  <ol>
    <li><a href="https://www.anthropic.com/engineering/multi-agent-research-system" target="_blank" rel="noopener noreferrer">Anthropic: How we built our multi-agent research system</a></li>
    <li><a href="https://epoch.ai/data-insights/llm-inference-price-trends" target="_blank" rel="noopener noreferrer">Epoch AI: LLM inference price trends</a></li>
    <li><a href="https://arxiv.org/html/2311.17371v3" target="_blank" rel="noopener noreferrer">Smit et al.: Should we be going MAD?</a></li>
    <li><a href="https://caisconf.org/program/2026/papers/decomposing-sycophancy-fragility-consensus-collapse-and-cost-in-homogeneous-mult/" target="_blank" rel="noopener noreferrer">Sycophancy and consensus collapse in homogeneous multi-agent teams (CAIS 2026)</a></li>
    <li><a href="https://arxiv.org/pdf/2502.08788" target="_blank" rel="noopener noreferrer">Zhang et al.: heterogeneous multi-agent debate</a></li>
    <li><a href="https://www.themoonlight.io/review/diversity-of-thought-elicits-stronger-reasoning-capabilities-in-multi-agent-debate-frameworks" target="_blank" rel="noopener noreferrer">Review: Diversity of Thought in multi-agent debate</a></li>
    <li><a href="https://www.analyticsvidhya.com/blog/2025/12/llm-council-by-andrej-karpathy/" target="_blank" rel="noopener noreferrer">Karpathy’s LLM Council, explained</a></li>
    <li><a href="https://www.resultsense.com/news/2026-02-10-perplexity-launches-model-council-multi-model-research" target="_blank" rel="noopener noreferrer">Perplexity launches Model Council</a></li>
    <li><a href="https://openai.com/index/group-chats-in-chatgpt/" target="_blank" rel="noopener noreferrer">OpenAI: Group chats in ChatGPT</a></li>
    <li><a href="https://techcrunch.com/2025/11/18/poes-ai-app-now-supports-group-chats-across-ai-models" target="_blank" rel="noopener noreferrer">TechCrunch: Poe group chats across AI models</a></li>
    <li><a href="https://learn.microsoft.com/da-dk/agent-framework/workflows/orchestrations/group-chat" target="_blank" rel="noopener noreferrer">Microsoft Agent Framework: group chat orchestration</a></li>
    <li><a href="https://www.linuxfoundation.org/press/a2a-protocol-surpasses-150-organizations-lands-in-major-cloud-platforms-and-sees-enterprise-production-use-in-first-year?hs_amp=true" target="_blank" rel="noopener noreferrer">Linux Foundation: A2A protocol one year on</a></li>
    <li><a href="https://linuxfoundation.org/press/linux-foundation-launches-the-agent2agent-protocol-project-to-enable-secure-intelligent-communication-between-ai-agents" target="_blank" rel="noopener noreferrer">Linux Foundation: Agent2Agent protocol project launch</a></li>
    <li><a href="https://www.anthropic.com/news/model-context-protocol" target="_blank" rel="noopener noreferrer">Anthropic: Introducing the Model Context Protocol</a></li>
    <li><a href="https://openai.com/index/sycophancy-in-gpt-4o/" target="_blank" rel="noopener noreferrer">OpenAI: Sycophancy in GPT-4o</a></li>
    <li><a href="https://openai.com/index/introducing-openai-o1-preview/" target="_blank" rel="noopener noreferrer">OpenAI: Introducing o1</a></li>
    <li><a href="https://officechai.com/miscellaneous/elon-musk-explains-how-grok4-heavy-xais-multi-agent-reasoning-model-works/" target="_blank" rel="noopener noreferrer">How Grok 4 Heavy’s multi-agent reasoning works</a></li>
    <li><a href="https://openai.com/index/hello-gpt-4o/" target="_blank" rel="noopener noreferrer">OpenAI: Hello GPT-4o</a></li>
    <li><a href="https://openai.com/index/gpt-4o-mini-advancing-cost-efficient-intelligence/" target="_blank" rel="noopener noreferrer">OpenAI: GPT-4o mini</a></li>
    <li><a href="https://openai.com/index/introducing-structured-outputs-in-the-api/" target="_blank" rel="noopener noreferrer">OpenAI: Structured Outputs in the API</a></li>
    <li><a href="https://www.anthropic.com/news/claude-3-family" target="_blank" rel="noopener noreferrer">Anthropic: Introducing the Claude 3 family</a></li>
    <li><a href="https://www.anthropic.com/news/claude-3-5-sonnet" target="_blank" rel="noopener noreferrer">Anthropic: Claude 3.5 Sonnet</a></li>
    <li><a href="https://www.anthropic.com/news/tool-use-ga" target="_blank" rel="noopener noreferrer">Anthropic: Tool use is generally available</a></li>
    <li><a href="https://www.anthropic.com/news/prompt-caching" target="_blank" rel="noopener noreferrer">Anthropic: Prompt caching</a></li>
    <li><a href="https://llm-stats.com/models/compare/gpt-3.5-turbo-0125-vs-gpt-4o-mini-2024-07-18" target="_blank" rel="noopener noreferrer">GPT-3.5 Turbo vs GPT-4o mini: price and context</a></li>
    <li><a href="https://mobbin.com/screens/7cb91cb0-89b4-4299-8955-dad4d3feca27" target="_blank" rel="noopener noreferrer">Mobbin: WhatsApp poll in a group chat</a> · <a href="https://mobbin.com/screens/e8eb6d85-bb28-4bee-a01e-b6f866be6b67" target="_blank" rel="noopener noreferrer">Luma grouped bubbles</a> · <a href="https://mobbin.com/screens/15f2246b-6705-4f98-b0e3-1c5d6f75414a" target="_blank" rel="noopener noreferrer">Character AI group chat</a></li>
  </ol>
</section>


    </>
  );
}
