/*
  Single source of truth for the four "My Work" case studies.

  Both the home grid (src/app/page.tsx) and the project detail pages
  (src/app/work/[slug]/page.tsx) read from PROJECTS, so ordering here also
  defines the "Next project →" cycle on the detail pages.

  `content` holds the body of each case study as an ordered list of blocks.
  Fill it in as the copy/visuals for each project land.
*/

export type ProjectBlock =
  // level: 1 (default) = major section, 2 = subsection, 3 = step/sub-subsection.
  | { type: "heading"; text: string; level?: 1 | 2 | 3 }
  | { type: "text"; body: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  // light: render on a white panel (for transparent PNGs with dark text).
  | { type: "image"; src: string; alt?: string; light?: boolean }
  // A line worth pulling out of the running text. Use sparingly: one or two
  // per case study, and only words that already carry the argument.
  | { type: "quote"; text: string }
  // Headline numbers. `value` is the figure ("70%"), `label` what it measures.
  | { type: "stats"; items: { value: string; label: string }[] };

export type MetaRow = { label: string; value: string };

export type Project = {
  slug: string;
  /** Base name of the thumbnail in /public/images (no extension). */
  img: string;
  /** Short name — shown on the detail page and upper-cased on the card. */
  title: string;
  /** Optional longer H1 for the detail page (falls back to `title`). */
  headline?: string;
  category: string;
  /** Optional "r g b" hover-glow colour for the home card. Leave unset to use
      the colour read from the thumbnail at build time; set it when the photo
      (hands, props) drowns out the brand colour. */
  tint?: string;
  description: string;
  /** External "Visit link" URL shown in the detail header. */
  visitUrl?: string;
  /** Full public path to the hero image (e.g. "/images/jito/hero.png"). */
  hero?: string;
  /** Completion / Industry / Tools / Services table under the hero. */
  meta?: MetaRow[];
  content: ProjectBlock[];
};

export const PROJECTS: Project[] = [
  {
    slug: "jito",
    img: "work-jito",
    title: "Jito",
    category: "BLOCKCHAIN",
    // Jito green — the thumbnail's hands would otherwise read as salmon.
    tint: "95 211 160",
    description:
      "Research, product and web design for Jito’s Solana staking platform: a simple mode for people new to staking, an advanced mode for experienced stakers, and the marketing site that introduced both.",
    visitUrl: "https://www.jito.network",
    hero: "/images/jito/hero.png",
    meta: [
      { label: "Completion", value: "July 2023" },
      { label: "Industry", value: "Blockchain" },
      { label: "Tools", value: "Figma, After Effects, Notion" },
      { label: "Services", value: "Research, Product & Web Design" },
    ],
    content: [
      { type: "heading", text: "Client Background" },
      {
        type: "text",
        body: "Jito Foundation (Network) is an MEV infrastructure company that develops systems to scale Solana and maximize validator rewards. Users can deposit SOL to earn JitoSOL. The Jito Stake Pool delegates SOL to MEV-enabled validators who auction blockspace and earn MEV rewards. These rewards boost the stake pool’s APY, and users holding JitoSOL also benefit from MEV rewards, enhancing their overall returns alongside staking rewards. This setup allows users to maximize their earnings through staking and MEV opportunities on the Solana network.",
      },
      {
        type: "image",
        src: "/images/jito/client-background.jpeg",
        alt: "The Jito team in conversation with the community",
      },

      { type: "heading", text: "Designing the Jito Staking Platform" },
      {
        type: "text",
        body: "After checking out the product documentation on specifications and expectations, I had a friendly discovery call with the team. During the call, I discovered that the goal of the project was to build a platform that is similar to Marinade Finance. This means that the Jito platform will only be different from its competitors by offering a better Annual Percentage Yield (APY), which is a great unique selling point (USP). However, it was important to me to learn more about what they want to offer to their potential users, so I asked some questions to get a better understanding.",
      },
      {
        type: "image",
        src: "/images/jito/seesaw-diagram.jpeg",
        alt: "How JitoSOL accrues MEV + staking rewards over time",
      },

      { type: "heading", text: "Research & Discovery" },
      {
        type: "text",
        body: "So, I started out by checking out some other platforms that offer staking services to their users besides Marinade Finance. Platforms like Socean, Lido, and JPool all seem to focus on either Degens (people involved in crypto and financial spaces) or Noobs (newbies), and that seems to be working well for them. Now, Jito, like Marinade, wants to make their user experience simpler for novices. But, why can’t we do both? Let’s make it happen!",
      },
      {
        type: "image",
        src: "/images/jito/research-laptop.jpeg",
        alt: "Early marketing site exploration for Jito",
      },

      { type: "heading", text: "Interviews" },
      {
        type: "text",
        body: "To validate my initial assumptions gotten from my research I decided to conduct an interview on people who stake SOL or people who stake generally. The goals of the interview were quite straight forward",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Understand User Needs: Gain insights into users’ staking goals, preferences, and pain points to tailor the tool to their specific requirements.",
          "Collect Feedback: Gather user feedback to validate assumptions, prioritize features, and enhance the overall user experience.",
          "Identify Pain Points: Discover and address potential obstacles or concerns users may have when engaging in Solana staking.",
          "Prioritize Features: Determine which features and functionalities are most crucial to users, ensuring the tool’s development aligns with their priorities.",
          "Build Trust and Empathy: Establish trust with users by valuing their input, and create an empathetic user-centric design that enhances satisfaction and usability.",
        ],
      },

      { type: "heading", text: "User Personas" },
      {
        type: "image",
        src: "/images/jito/persona-sarah.png",
        alt: "User persona — Sarah Chung, financial analyst",
      },
      {
        type: "image",
        src: "/images/jito/persona-carlos.png",
        alt: "User persona — Carlos Rodriguez, small business owner",
      },
      {
        type: "image",
        src: "/images/jito/persona-emily.png",
        alt: "User persona — Emily Patel, college student",
      },

      { type: "heading", text: "Interview Questions" },
      {
        type: "image",
        src: "/images/jito/interview-questions.png",
        alt: "Interview question board — intro, closed and open-ended questions",
      },
      {
        type: "image",
        src: "/images/jito/interview-insights.png",
        alt: "Synthesised insights across the three personas",
      },
      {
        type: "text",
        body: "The user insights provided by the three personas show that potential users have a variety of preferences and priorities. Sarah, a financial analyst, values detailed analytics and is looking for a staking platform that is easy to use, so she can diversify and maximize her investments. Carlos, a small business owner, wants simplicity and efficiency to supplement his business income, and he also emphasizes the importance of security. Emily, a college student, is eager to learn and wants a beginner-friendly platform with low-cost options. She’s driven by her desire to expand her knowledge.",
      },
      {
        type: "text",
        body: "These insights highlight the need for a Solana staking platform to have both a straightforward, user-friendly interface and advanced features to accommodate a wide range of users with their unique goals.",
      },

      { type: "heading", text: "Alpha (Version 1)" },
      {
        type: "text",
        body: "The goal for V1 was to create a perfect UX, with visual design as a secondary concern. Therefore, we broke the design sections into 3 parts:",
      },
      {
        type: "list",
        items: [
          "Basic simplified staking",
          "Explore an advanced staking interface",
          "Explore the feature to transfer assets from other platforms to Jito (Vampire Attack)",
          "Optimize for mobile responsiveness",
        ],
      },
      {
        type: "text",
        body: "During the design process for the Jito Staking Platform, the client expressed a strong desire to use the color green in their design. This was partly because green is part of Solana’s color scheme, but also because they were interested in learning from what other successful platforms like Marinade were doing. After exploring different design options for three days, we were able to create Version 1, which incorporated the client’s desired use of green as well as other design elements that we felt would best meet the needs of the platform’s users.",
      },
      { type: "text", body: "Version one by components…" },
      {
        type: "image",
        src: "/images/jito/v1-components.png",
        alt: "Version 1 UI components",
      },
      { type: "text", body: "Screens on version 1" },
      {
        type: "image",
        src: "/images/jito/v1-screens.png",
        alt: "Version 1 — simple and advanced staking modes",
      },
      {
        type: "text",
        body: "After testing and confirming that it meets the basic requirements and more, including the introduction of the advanced mode, we proceeded to create the marketing site before pushing it to production. This led to further discovery, but first…",
      },

      { type: "heading", text: "The marketing page" },
      {
        type: "text",
        body: "During the initial phase, we extensively explored various design directions, all of which maintained the visual direction consistent with the product UI. However, we soon realized that there were certain accessibility concerns related to the color scheme and typography. These issues prompted us to delve into alternative design directions, as clearly depicted in the second and third frames showcased in the image above.",
      },
      {
        type: "image",
        src: "/images/jito/marketing-explorations.png",
        alt: "Marketing site explorations",
      },
      {
        type: "text",
        body: "Drawing inspiration from other successful products within the Solana ecosystem, we ultimately made the decision to incorporate a captivating purple color into our product. This color choice was arrived at after an extensive and meticulous series of explorations, where we rigorously tested and refined different shades until we discovered the perfect one to complement our product.",
      },
      {
        type: "image",
        src: "/images/jito/color-explorations.png",
        alt: "Exploring new colors — from green toward purple",
      },

      { type: "heading", text: "New Problem" },
      {
        type: "text",
        body: "The final design of the product was carefully curated to feature a unique and eye-catching purple color scheme, a sleek new typography, and a crisp white background that was further elevated by a subtle yet impactful drop shadow. While the design was aesthetically pleasing, it posed a problem when the marketing site and the product appeared to be two different entities.",
      },
      {
        type: "image",
        src: "/images/jito/final-product.png",
        alt: "The refreshed product design system",
      },
      {
        type: "text",
        body: "As a result, updating the design system became a high priority for V2 to better align the design of the marketing site and the product. Fortunately, the update was a seamless process due to the foresight of the team in creating components and styles during the design of V1. In just 24 hours, we were able to produce a completely new and improved design for the product that was both visually stunning and cohesive with the marketing site. The update not only improved the appearance of the product, but it also served as a testament to the team’s dedication to creating a seamless and user-friendly experience for their customers.",
      },

      { type: "heading", text: "Usability Testing" },
      {
        type: "text",
        body: "Usability testing is a critical phase in the development of the Jito Staking Platform. During this phase, we conducted thorough testing with real users to evaluate the platform’s user interface and overall user experience. Here are some key findings from our usability testing:",
      },
      {
        type: "list",
        items: [
          "Positive Feedback on Simplicity: Users appreciated the platform’s simplicity and user-friendly design, especially in the basic staking interface. This aligns with our goal of catering to both novice and experienced users.",
          "Advanced Features Exploration: Users who explored the advanced staking interface found it comprehensive and valuable. They particularly liked the ability to access detailed analytics and optimize their staking strategy.",
          "Smooth Mobile Experience: The optimized mobile experience received positive feedback, with users commending its responsiveness and ease of use. This aligns with our emphasis on mobile usability.",
          "Alignment with User Goals: Users found that the platform met their staking goals effectively, whether it was for earning passive income, maximizing returns, or gaining insights into their staking activities.",
        ],
      },
      {
        type: "image",
        src: "/images/jito/advanced-dashboard.jpeg",
        alt: "Advanced staking dashboard with strategy analytics",
      },
      { type: "text", body: "Some components created in the style guide" },
      {
        type: "image",
        src: "/images/jito/style-guide.png",
        alt: "Selected components from the style guide",
      },

      { type: "heading", text: "Takeaways" },
      {
        type: "text",
        body: "Based on our usability testing and the development journey of the Jito Staking Platform, we’ve gathered several key takeaways:",
      },
      {
        type: "list",
        items: [
          "User-Centric Design Pays Off: Prioritizing a user-centric design, simplicity, and mobile responsiveness has resulted in a positive user experience, attracting both novice and experienced stakers.",
          "Balance Simplicity and Advanced Features: Our ability to offer a straightforward staking experience while providing advanced features is a significant competitive advantage. It appeals to a wide range of users and aligns with their diverse goals.",
          "Mobile-First Approach: The decision to optimize for mobile and provide a personalized mobile experience has resonated well with users. It’s essential to continue refining the mobile interface.",
          "Feedback is Invaluable: Usability testing and user feedback have been instrumental in shaping the platform’s development. Continuous user engagement is crucial for ongoing improvements.",
        ],
      },

      { type: "heading", text: "Final Thoughts" },
      {
        type: "text",
        body: "The journey of designing and developing the Jito Staking Platform has been a rewarding one. We set out with the goal of creating a platform that caters to both simplicity seekers and those who crave advanced features. Our commitment to user-centric design, coupled with a focus on the mobile experience, has positioned Jito as a standout player in the Solana staking ecosystem.",
      },

      { type: "heading", text: "Future Recommendations" },
      {
        type: "text",
        body: "As we look to the future, we have several recommendations to ensure the ongoing success and growth of the Jito Staking Platform:",
      },
      {
        type: "list",
        items: [
          "Enhanced Analytics: Continuously improve and expand the analytics and insights offered to users, enabling them to make more informed staking decisions.",
          "Education and Support: Develop comprehensive educational resources to help users, especially beginners, understand staking and MEV opportunities better. Provide robust customer support channels.",
          "Security Measures: Strengthen security measures and regularly audit the platform’s security to ensure the safety of users’ assets.",
          "Community Building: Foster a strong and engaged user community by hosting events, webinars, and forums for discussions and knowledge sharing.",
          "Integration and Partnerships: Explore opportunities to integrate with other DeFi protocols and forge partnerships to expand the platform’s capabilities and offerings.",
        ],
      },
    ],
  },
  {
    slug: "zo",
    img: "work-zo",
    title: "Zo",
    headline: "Zo: From Crypto Communities to AI Conversations",
    category: "CHAT // AI",
    description:
      "How design guided a product through multiple reinventions. Zo’s journey was anything but linear — what began as an ambitious attempt to simplify governance for DAOs evolved into a crypto-native chat app, and ultimately reinvented itself as an AI conversation platform with over 100k+ downloads and a 4.0★ rating on Google Play.",
    visitUrl:
      "https://apps.apple.com/ng/app/zo-chat-with-ai-and-friends/id1616795098",
    meta: [
      { label: "Timeline", value: "2023 – 2024" },
      { label: "Role", value: "Sole Product & Interaction Designer" },
      { label: "Industry", value: "Chat / AI" },
      { label: "Platform", value: "iOS & Android" },
    ],
    content: [
      { type: "heading", text: "Executive Summary" },
      {
        type: "text",
        body: "I joined Zo in 2023 as the sole Product & Interaction Designer, responsible for everything from UX research to system architecture and visual direction.",
      },
      {
        type: "text",
        body: "Across three major pivots, Zo evolved from a crypto governance hub to a community chat platform with Farcaster and bot integrations, and eventually into an AI conversation network. Design wasn’t just polishing screens. It was the connective tissue that held the product together through moments of uncertainty, helping Zo rediscover its purpose each time it changed shape.",
      },
      {
        type: "text",
        body: "What follows isn’t just a story of UI or features, but a case study in how design can guide reinvention and turn clutter into coherence.",
      },
      {
        type: "image",
        src: "/images/zo/executive-summary.png",
        alt: "Zo across its three eras — governance, chat, and AI",
      },

      { type: "heading", text: "Context & Problem" },
      {
        type: "text",
        body: "When I joined, Zo wasn’t the AI platform you see today, it was already a crypto-native chat and social tool with an active community and a technically strong foundation. The team had built a solid design language and component library, and there was clear momentum.",
      },
      {
        type: "text",
        body: "What was missing, though, was direction. We weren’t struggling to build, we were struggling to define why. The product had potential across multiple directions, but no unifying story to tie them together.",
      },
      {
        type: "text",
        body: "At the time, the team’s major bet was Ozone, a governance feature designed to help DAOs coordinate better by allowing members to chat, review proposals, and vote in one place. It aimed to make decentralized governance more human and conversational.",
      },
      {
        type: "text",
        body: "Meanwhile, the broader landscape was shifting fast:",
      },
      {
        type: "list",
        items: [
          "DAO fatigue: after the 2021–22 hype cycle, many communities were burning out.",
          "Chat incumbents: Telegram, Discord, and Slack dominated their niches.",
          "AI wave: by 2024, AI tools were booming, but experiences were fragmented and clunky.",
        ],
      },
      {
        type: "text",
        body: "The question became: “What story does Zo want to tell, and how can design help uncover it?”",
      },

      { type: "heading", text: "My Role & Constraints" },
      { type: "text", body: "As the only designer, I wore every hat:" },
      {
        type: "list",
        items: [
          "UX Architect — shaping flows for governance, chat, and AI.",
          "Visual Designer — crafting a consistent interface and brand.",
          "Systems Thinker — building components flexible enough to survive pivots.",
          "Researcher — testing ideas with DAO mods, crypto natives, and early AI adopters.",
        ],
      },
      { type: "text", body: "Constraints defined everything:" },
      {
        type: "list",
        items: [
          "A small team meant design had to maximize reuse and minimize complexity.",
          "Constant pivots risked breaking coherence; I had to build systems that could bend, not snap.",
          "Competing against massive incumbents meant differentiation wasn’t optional — it was survival.",
        ],
      },
      {
        type: "text",
        body: "Design became the bridge between uncertainty and direction.",
      },

      { type: "heading", text: "Process & Philosophy" },
      {
        type: "text",
        body: "My approach centered on adaptability over aesthetics:",
      },
      {
        type: "list",
        items: [
          "Lightweight research: quick tests with target users to validate direction fast.",
          "Rapid prototyping: wireframes and flows tested within days, not weeks.",
          "Systemization: tokens, scalable components, and design rules built for future unknowns.",
          "Cross-functional collaboration: working closely with engineers to align feasibility and speed.",
        ],
      },
      {
        type: "text",
        body: "Every design had to do one of two things: deliver immediate value, or lay groundwork for the next reinvention.",
      },

      { type: "heading", text: "Phase 1: The DAO Era (Ozone)" },
      {
        type: "text",
        body: "When I joined, Zo’s mission was to fix DAO governance, a process that had become messy and intimidating. Ozone aimed to centralize proposals, voting, and chat into a single experience.",
      },
      {
        type: "text",
        body: "I designed early flows that made governance feel conversational:",
      },
      {
        type: "list",
        items: [
          "Proposal Cards: digestible summaries of on-chain proposals.",
          "Voting Flows: poll-like interactions right inside chat.",
          "Community Dashboards: simple overviews of progress and outcomes.",
        ],
      },
      {
        type: "image",
        src: "/images/zo/dao-proposal-cards.png",
        alt: "Ozone proposal cards — digestible summaries of on-chain proposals",
      },
      {
        type: "image",
        src: "/images/zo/dao-voting.png",
        alt: "Poll-like voting flows inside chat",
      },
      {
        type: "text",
        body: "The guiding principle was clarity, governance should feel as natural as voting in WhatsApp.",
      },
      {
        type: "text",
        body: "But before Ozone could launch, DAO engagement across Web3 collapsed. The feature never shipped.",
      },
      {
        type: "text",
        body: "Still, it wasn’t wasted. That failure taught us something foundational:",
      },
      {
        type: "quote",
        text: "Users don’t want complexity. They want context — delivered in familiar, conversational ways.",
      },
      {
        type: "text",
        body: "That insight would later define how Zo handled both chat and AI interactions.",
      },

      { type: "heading", text: "Phase 2: The Chat Era" },
      {
        type: "text",
        body: "With Ozone set aside, Zo leaned into its strongest foundation: conversation. At this stage, the product centered on group chats, community coordination, and early integrations with Farcaster, the emerging decentralized social graph.",
      },
      {
        type: "text",
        body: "We designed features that made chatting feel dynamic and purposeful:",
      },
      {
        type: "list",
        items: [
          "Group Spaces: structured chats where communities could organize discussions and announcements without losing context.",
          "Farcaster Integration: allowed users to link identities, follow threads, and bring Web3 social activity directly into Zo.",
          "Bots and Commands: simple custom bots that automated small tasks like notifications, summaries, and polls.",
        ],
      },
      {
        type: "image",
        src: "/images/zo/chat-era.png",
        alt: "Zo’s chat era — group spaces, Farcaster integration, and bots",
      },
      {
        type: "text",
        body: "The design felt intuitive and communities loved the simplicity. However, it still lacked a distinctive story. Telegram owned speed, Discord owned community, and Slack owned productivity. Zo needed a reason to exist beyond chat.",
      },
      {
        type: "text",
        body: "That clarity arrived with a single question:",
      },
      {
        type: "quote",
        text: "What if AI lived inside conversations instead of outside them?",
      },
      {
        type: "text",
        body: "It was the question that transformed Zo’s purpose and opened the door to its next evolution.",
      },

      { type: "heading", text: "Phase 3: The AI Pivot" },
      {
        type: "text",
        body: "By 2024, AI had captured the world’s imagination, but not its usability. People were bouncing between ChatGPT, MidJourney, and Notion, manually stitching outputs together.",
      },
      {
        type: "text",
        body: "Zo saw a gap: AI didn’t need a new app — it needed a home inside chat. We rebuilt around that vision.",
      },
      { type: "heading", text: "Key Design Innovations" },
      {
        type: "text",
        body: "Agent Cards: AI responses appeared inside chat as structured blocks that kept conversations clean and organized. Instead of flooding the chat with long messages, each response was shown as a compact card users could scan, expand for details, or share. This made AI interactions feel natural and reusable within the conversation flow.",
      },
      {
        type: "text",
        body: "Debate Rooms: spaces where multiple AI agents could debate in real time while users watched. Color-coded messages, clear spacing, and distinct pacing made it easy to follow different voices. The result was a playful and legible way to experience AI-to-AI dialogue inside chat.",
      },
      {
        type: "image",
        src: "/images/zo/agent-cards-1.png",
        alt: "Agent Cards — AI responses as compact, scannable blocks",
      },
      {
        type: "image",
        src: "/images/zo/agent-cards-2.png",
        alt: "An expanded Agent Card showing full detail",
      },
      {
        type: "image",
        src: "/images/zo/debate-rooms.png",
        alt: "Debate rooms — multiple AI agents in real-time dialogue",
      },
      {
        type: "text",
        body: "The Mini-App Store allowed users to install or create lightweight AI tools directly inside Zo. Inspired by familiar browsing patterns, each card showcased what an agent could do and offered one-tap setup. This transformed Zo from a chat app into an ecosystem of AI-powered mini-apps.",
      },
      {
        type: "image",
        src: "/images/zo/mini-app-store.png",
        alt: "The Mini-App Store — install or create lightweight AI tools inside Zo",
      },
      {
        type: "text",
        body: "Zai was every user’s personal AI assistant built directly into chat. It handled quick searches, summaries, and casual conversations without leaving the thread. The goal was to make AI feel approachable, always present, and part of the natural chat flow rather than a separate tool.",
      },
      {
        type: "image",
        src: "/images/zo/zai-1.png",
        alt: "Zai — a personal AI assistant inside chat",
      },
      {
        type: "image",
        src: "/images/zo/zai-2.png",
        alt: "Zai handling searches and summaries in-thread",
      },
      {
        type: "text",
        body: "Profiles became identity hubs that combined Web3 and Web2 presence in one place. Users could showcase NFTs, link socials and wallets, and display installed agents on a shareable page similar to Linktree. This turned every profile into a living portfolio of identity and activity within Zo.",
      },
      {
        type: "image",
        src: "/images/zo/profiles-1.png",
        alt: "Zo profiles as identity hubs combining Web2 and Web3 presence",
      },
      {
        type: "image",
        src: "/images/zo/profiles-2.png",
        alt: "A profile showcasing NFTs, socials, and installed agents",
      },
      {
        type: "image",
        src: "/images/zo/profiles-3.png",
        alt: "A shareable Zo profile page",
      },
      {
        type: "text",
        body: "Zo became something truly new — a conversation-first AI platform, where humans and AI coexisted naturally.",
      },

      { type: "heading", text: "Metrics & Impact" },
      { type: "text", body: "The AI pivot unlocked traction quickly:" },
      {
        type: "stats",
        items: [
          { value: "100k+", label: "downloads on Google Play within months" },
          {
            value: "4.0★",
            label: "rating, with reviews praising clean design and intuitive AI flow",
          },
        ],
      },
      {
        type: "list",
        items: [
          "Adoption by Web3 communities, repurposing Zo as a coordination hub.",
          "A modular design system that scaled across multiple product experiments.",
          "A new category identity: not just AI chat, but AI creation inside chat.",
        ],
      },
      {
        type: "image",
        src: "/images/zo/metrics.png",
        alt: "Zo’s metrics — 100k+ downloads and a 4.0★ rating",
      },

      { type: "heading", text: "Reflections & Learnings" },
      {
        type: "list",
        items: [
          "The first idea isn’t always the best. Ozone was smart but mistimed.",
          "Design for flexibility. Modularity saved the product across pivots.",
          "AI needs orchestration. The challenge wasn’t building models, it was making their outputs feel legible and human.",
          "Identity is layered. Web2 familiarity plus Web3 ownership created trust.",
          "Narrative clarity is everything. A product without a story fades fast.",
          "Scaling solo is possible. Systems > pixels. Prioritize leverage.",
        ],
      },

      { type: "heading", text: "Closing Thought" },
      {
        type: "text",
        body: "Zo’s evolution — from governance, to chat, to AI — was proof that design can do more than make products usable. It can guide reinvention.",
      },
      {
        type: "text",
        body: "For me, Zo was more than a workplace. It was a live experiment in how design can shape identity through constant change. Even in moments of uncertainty, design gave the team direction, coherence, and purpose, helping Zo find its true voice in a noisy space.",
      },
    ],
  },
  {
    slug: "ngx",
    img: "work-ngx",
    title: "NGX",
    headline:
      "Reality: Designing the Foundation of NGX’s Climate Infrastructure",
    category: "CLIMATE TECH",
    description:
      "Reality is NGX’s first act of definition — the product where climate infrastructure became real. I designed it from zero into the MENA region’s first real-time, IoT-powered emissions accounting platform: reducing supplier onboarding by 70%, earning regulatory trust, and becoming the architectural bedrock for NGX’s entire climate stack.",
    visitUrl: "https://nextgreenx.com/",
    meta: [
      { label: "Role", value: "Founding Product & Systems Designer" },
      { label: "Industry", value: "Climate Tech / ESG" },
      { label: "Platform", value: "Enterprise Web + IoT" },
      { label: "Focus", value: "Research, Product Design, Design System" },
    ],
    content: [
      { type: "heading", text: "Executive Summary" },
      {
        type: "text",
        body: "Reality is NGX’s first act of definition, the product where climate infrastructure became real. Where compliance, carbon, and code met in one living system. My job was to design that system from zero, shaping not just how it looked, but how it worked, scaled, and communicated truth.",
      },
      {
        type: "text",
        body: "Reality was NGX’s first attempt at bringing real-world emissions data into a living, visual system. It became the base layer that everything else would depend on: Trace, Vault, Energy Bank. The brief was ambitious: “Build an IoT-powered platform that helps enterprises track, analyze, and report their emissions in real time.”",
      },
      {
        type: "text",
        body: "In practice, it meant designing for uncertainty. The data was messy, the architecture was still forming, and the expectations were sky-high. This is where NGX’s design language and its discipline were born.",
      },
      {
        type: "text",
        body: "The result: Reality became the MENA region’s first real-time, IoT-powered emissions accounting platform, reducing supplier onboarding by 70%, earning regulatory trust, and becoming the architectural bedrock for NGX’s entire climate stack.",
      },
      {
        type: "image",
        src: "/images/ngx/system-overview.png",
        alt: "The Reality platform at a glance — emissions dashboards across the system",
      },

      { type: "heading", text: "Context & Problem" },
      {
        type: "text",
        body: "Before Reality, emissions reporting was broken, especially in the MENA region.",
      },
      {
        type: "text",
        body: "Governments were tightening ESG disclosure requirements. Global partners started asking tough questions. Fines were coming. Incentives were tied to verified reductions. And yet, most organizations still reported carbon like it was 1995: Excel files, email attachments, third-party audits six months after the fact.",
      },
      { type: "text", body: "This wasn’t just inefficient. It was dangerous." },
      {
        type: "text",
        body: "Non-compliance could lead to millions in regulatory fines. Unverifiable data could disqualify enterprises from green finance and global tenders. Mistrust in the data meant mistrust in the entire climate effort.",
      },
      {
        type: "text",
        body: "NGX saw the opportunity to fix this at the source: build a product that could gather, standardize, and structure emissions data in real time across facilities, fleets, and suppliers, with IoT as its heartbeat.",
      },
      {
        type: "text",
        body: "But emissions data is messy. IoT devices speak a hundred dialects. Operational staff don’t think in carbon. Admins need auditability. And reporting frameworks? They change like the wind.",
      },
      {
        type: "quote",
        text: "We weren’t just designing a dashboard. We were designing a language for climate truth, one both machines and humans could trust.",
      },
      {
        type: "text",
        body: "The idea was to connect IoT meters, vehicles, and facility sensors into one unified platform that could automatically calculate Scope 1–3 emissions and generate compliant reports. But we weren’t just visualizing data. We were building trust in it.",
      },

      {
        type: "image",
        src: "/images/ngx/data-wall-new.png",
        alt: "Reality Overview — business performance and emissions dashboards across scopes",
      },

      { type: "heading", text: "The Dual Challenge", level: 2 },
      {
        type: "text",
        body: "The challenge was balancing two user perspectives:",
      },
      {
        type: "list",
        items: [
          "Suppliers and operators, who uploaded data from the field. They wanted speed, clarity, and error forgiveness.",
          "Admins and enterprises, who validated and reported that data to regulators. They needed traceability, control, and documentation.",
        ],
      },
      {
        type: "text",
        body: "And we had to do this without ever speaking directly to those users.",
      },

      {
        type: "image",
        src: "/images/ngx/data-wall.png",
        alt: "The Reality platform — dashboard and systems management views",
      },

      { type: "heading", text: "My Role & Constraints" },
      {
        type: "text",
        body: "As the founding designer, I was responsible for:",
      },
      {
        type: "list",
        items: [
          "Defining the product’s architecture, flows, and visual system.",
          "Creating NGX’s core design language.",
          "Translating compliance logic and IoT complexity into usable interfaces.",
        ],
      },
      {
        type: "text",
        body: "But I wasn’t just drawing screens. I was embedded with the backend and data teams, often writing interface contracts, defining edge cases, and shaping feature scopes.",
      },
      { type: "heading", text: "The Constraints Were Intense", level: 2 },
      {
        type: "list",
        items: [
          "No user interviews. Our clients were large enterprises. Legal, security, and procurement made access impossible. We would never sit in a room with the operators uploading emissions data or the sustainability managers reviewing compliance reports.",
          "Unstable backend. The data infrastructure evolved daily. What was true today might be obsolete tomorrow. APIs changed. Data schemas shifted. Integration patterns got rewritten mid-sprint.",
          "Multiple personas. Suppliers uploading field data; admins analyzing and reporting it. One product had to serve both without compromising either experience.",
          "Regulatory ambiguity. Reporting standards (like GHG Protocol or ISO 14064) were shifting. We had to design for compliance that didn’t exist yet. The rules were moving targets, and our interface had to flex with them.",
          "Technical complexity. IoT streams brought their own chaos: sensor calibration errors, unit mismatches, connectivity drops, delayed syncs. Every design decision had to account for failure states we couldn’t predict.",
        ],
      },
      {
        type: "text",
        body: "These weren’t just constraints. They were the reality we had to design within.",
      },

      {
        type: "image",
        src: "/images/ngx/isometric-map.png",
        alt: "Flat isometric map grounding emissions in physical space",
      },

      { type: "heading", text: "Process & Methods" },
      {
        type: "heading",
        text: "1. System as User: Research Through Data, Not Interviews",
        level: 2,
      },
      {
        type: "text",
        body: "In the absence of direct access to users, I treated the data itself as a proxy. Instead of user interviews, I worked closely with the two people who knew the product’s logic inside out: Sebastian, who led data systems, and Sławek, who handled the backend architecture.",
      },
      {
        type: "text",
        body: "Our “research” was technical. It happened in Slack threads, Figma comments, and long working sessions where I’d ask:",
      },
      {
        type: "list",
        items: [
          "What’s the most common failure point in data submission?",
          "Where do suppliers usually get stuck?",
          "What kind of errors make admins lose confidence in the report?",
          "Which fields are most frequently misconfigured?",
          "What error types correlate with supplier churn?",
          "How do admins audit a data trail when trust is in doubt?",
        ],
      },
      {
        type: "text",
        body: "They weren’t describing user feelings. They were describing behaviors through data patterns. And that was enough.",
      },
      {
        type: "text",
        body: "Every failed upload, every malformed dataset, every support ticket became a signal. These questions gave me not user personas, but system personas: insights based on behavior patterns, failure logs, and friction maps.",
      },
      {
        type: "text",
        body: "This collaboration gave me something better than user quotes. It gave me system empathy. A deep understanding of how data really moves, breaks, and rebuilds inside emission reporting.",
      },
      { type: "heading", text: "2. Building and Breaking Prototypes", level: 2 },
      {
        type: "text",
        body: "We worked in public: Slack, Figma, Notion. I’d drop a prototype. The backend team would try to break it.",
      },
      {
        type: "text",
        body: "This became our rhythm: design, stress-test, redesign.",
      },
      {
        type: "image",
        src: "/images/ngx/report-tables.png",
        alt: "Early functional prototypes — raw admin tables for users, systems, and countries",
      },
      { type: "heading", text: "Iteration 1: The Data Wall", level: 3 },
      {
        type: "text",
        body: "Our first build was purely functional. Every metric visible, every field exposed, every data point rendered in one endless grid.",
      },
      {
        type: "text",
        body: "We called it The Data Wall. It showed everything. Every metric. Every sensor. Every field. A truth machine.",
      },
      {
        type: "text",
        body: "Sebastian loved it. Everyone else was terrified.",
      },
      {
        type: "text",
        body: "It was accurate but incomprehensible, the kind of screen that makes sense only if you wrote the code behind it. Engineers loved it. Users didn’t. It was unreadable unless you had built the backend.",
      },
      { type: "text", body: "That failure gave me my first real insight:" },
      {
        type: "quote",
        text: "Clarity isn’t hiding data. It’s sequencing attention.",
      },
      {
        type: "text",
        body: "Or as I told the team: “Clarity isn’t about simplifying data. It’s about designing what people should notice first.”",
      },
      { type: "text", body: "So we scrapped it and started again." },
      {
        type: "image",
        src: "/images/ngx/fleet-trucks.png",
        alt: "The fleet — diesel, electric, and third-party vehicle types",
      },
      { type: "heading", text: "Iteration 2: Trying 3D, Then Taming It", level: 3 },
      {
        type: "text",
        body: "We shifted direction. If numbers confused users, maybe space could help them understand the data. That’s where the 3D idea came in.",
      },
      {
        type: "text",
        body: "We explored spatial thinking early. Could emissions data feel grounded in space? We built 3D scenes: warehouses, fleets, sites. A visual representation of hubs, warehouses, and fleets that could help admins contextualize their emissions footprint.",
      },
      { type: "text", body: "But 3D became its own problem." },
      {
        type: "text",
        body: "The first renders were too heavy: high poly counts, reflective surfaces, long export times. Renders were too heavy. Real-time overlays clashed with lighting. The style felt “architectural” instead of operational. Scenes looked like architecture, not operations. Data overlays clashed with lighting and color hierarchy.",
      },
      {
        type: "text",
        body: "After 30+ visual tests and dozens of test renders, we found a visual logic that worked. We stripped it down to what worked:",
      },
      {
        type: "list",
        items: [
          "Flat isometric geometry (not full 3D).",
          "Soft mint glows for active sites and nodes.",
          "Layered, tappable data markers built right into the scene.",
        ],
      },
      {
        type: "text",
        body: "This wasn’t visual flair. It was cognitive orientation. It helped admins understand where emissions happened, not just what happened.",
      },
      {
        type: "text",
        body: "That was the beginning of NGX’s visual identity: clarity through calm, precision through restraint.",
      },
      {
        type: "image",
        src: "/images/ngx/transport-analytics.png",
        alt: "Transport Operations — the fleet emissions cockpit",
      },
      {
        type: "heading",
        text: "Iteration 3: Serving Two Personas with One Interface",
        level: 3,
      },
      {
        type: "text",
        body: "Reality had two audiences using one interface. Every feature was a balancing act:",
      },
      {
        type: "list",
        items: [
          "Suppliers wanted speed, clarity, and error forgiveness.",
          "Admins needed traceability, control, and documentation.",
        ],
      },
      {
        type: "text",
        body: "We ran three complete dashboard redesigns, testing three architectures:",
      },
      {
        type: "list",
        items: [
          "Shared View: Same layout for both users. Instant chaos. The interface tried to serve everyone and served no one.",
          "Split Dashboards: Separate environments. Inconsistent and hard to maintain. Every update required double the design work, and the experiences drifted apart visually.",
          "Role-based Layering: One unified layout, dynamic modules for each role. Success.",
        ],
      },
      {
        type: "text",
        body: "That final approach worked. Suppliers got a simplified, status-driven upload flow with clear progress states. Admins got full data lineage, audit flags, and export-ready reports. Same product. Two experiences.",
      },
      {
        type: "text",
        body: "This became the architecture template for every NGX product that followed.",
      },
      {
        type: "heading",
        text: "Iteration 4: Designing for Failure, Not Just Flow",
        level: 3,
      },
      {
        type: "text",
        body: "Even when the UX stabilized, data visualization kept breaking.",
      },
      {
        type: "text",
        body: "Our first charting engine collapsed under large fleet datasets. Stacked bars distorted totals. Pie charts failed accessibility color checks. Data fails. Uploads drop. Sensors misreport.",
      },
      {
        type: "text",
        body: "Sławek and I spent days tweaking logic and render limits.",
      },
      {
        type: "text",
        body: "We built Reality to surface, not suppress those failures.",
      },
      {
        type: "list",
        items: [
          "Every dataset had a lineage log.",
          "Every anomaly was flagged, not hidden.",
          "Every upload had a status state with recovery options.",
        ],
      },
      {
        type: "text",
        body: "Eventually, we developed adaptive chart density:",
      },
      {
        type: "list",
        items: [
          "Macro charts summarizing emissions by category.",
          "Micro charts nested in list views for detailed analysis.",
          "Consistent visual logic for energy sources: solar, diesel, electric.",
        ],
      },
      {
        type: "text",
        body: "This turned frustration into understanding. Blame into transparency.",
      },
      {
        type: "text",
        body: "This was the version that finally felt alive: real-time, legible, and compliant.",
      },

      { type: "heading", text: "Solution & Rationale" },
      {
        type: "text",
        body: "Reality became a layered system, both operationally and visually. It wasn’t just a product. It was a climate operating system.",
      },
      {
        type: "text",
        body: "The platform consisted of four core operational modules, each designed to serve a specific stage in the emissions lifecycle: data capture, analysis, compliance, and audit.",
      },

      {
        type: "image",
        src: "/images/ngx/failure-charts.png",
        alt: "Adaptive chart density — macro and micro views with recovery states",
      },

      {
        type: "heading",
        text: "1. Transport Operations: Real-Time Fleet Emissions",
        level: 2,
      },
      {
        type: "text",
        body: "What it does — Visualizes all transport-related emissions (Scope 1 & 3) using data from IoT sensors, trip logs, and telematics systems.",
      },
      {
        type: "text",
        body: "The challenge — Fleet emissions are notoriously messy. Each trip involves multiple variables: distance, cargo weight, fuel type, route conditions, third-party logistics. And for enterprises with hundreds of vehicles across multiple customers, it’s nearly impossible to see patterns without proper structure.",
      },
      {
        type: "text",
        body: "We needed to turn raw telematics data into actionable operational intelligence, something that worked for both logistics managers and sustainability leads.",
      },
      { type: "text", body: "Key capabilities I designed:" },
      {
        type: "text",
        body: "Trip Analytics: Each journey tracked end-to-end: distance, weight, cargo type, and associated CO₂e. The interface shows trip-level granularity with expandable rows revealing route segments, delivery status, and emission allocation per leg.",
      },
      {
        type: "text",
        body: "Emission Breakdown: Diesel vs Electric vs Third-Party trips shown per month, helping operators see transition progress toward cleaner fleets. The chart design uses consistent color logic (mint for electric, teal for diesel) that carries across the entire platform.",
      },
      {
        type: "text",
        body: "Operational Insights: Charts for total kilometers, avoided emissions, and customer retention, blending environmental and business metrics in one view. This was critical: sustainability teams cared about carbon, but operations cared about efficiency and cost.",
      },
      {
        type: "text",
        body: "Route Timeline: Designed a hybrid table + map-style route tracker showing each leg, delivery status, and emission allocation. The timeline gave spatial context to what would otherwise be abstract numbers.",
      },
      {
        type: "text",
        body: "Comparative Filters: Toggle between customers, cargo types, or time frames to benchmark efficiency. Admins could see which clients generated the most emissions, which routes were least efficient, and where electrification would have the highest impact.",
      },
      {
        type: "text",
        body: "Design thinking — We wanted the dashboard to feel like an operational cockpit rather than a sustainability report: visual, fast, and insight-driven.",
      },
      {
        type: "text",
        body: "The challenge was balancing density (thousands of trips per month) with clarity. Our solution: a two-tier hierarchy. Summary KPIs at the top (total emissions, distance traveled, cost per ton). Granular trip logs below, with expandable rows for route-level details.",
      },
      {
        type: "text",
        body: "The most contentious design decision: should we show customer names in the emissions breakdown? We did, because accountability matters. Enterprises needed to see which clients drove their footprint, especially for Scope 3 calculations.",
      },

      {
        type: "image",
        src: "/images/ngx/ghg-dashboard.png",
        alt: "GHG Dashboard — Scope 1, 2, 3 analytics engine",
      },

      {
        type: "heading",
        text: "2. GHG Dashboard: The Core Analytics Engine",
        level: 2,
      },
      {
        type: "text",
        body: "What it does — Aggregates all emissions (Scope 1, 2, 3) and turns them into business-readable performance metrics and compliance-ready reports.",
      },
      {
        type: "text",
        body: "The challenge — The GHG Protocol is technical, dense, and unforgiving. Scope definitions change based on industry and operational structure. Most platforms either oversimplify (losing accuracy) or over-complicate (losing usability).",
      },
      {
        type: "text",
        body: "We needed to design an interface that respected the Protocol’s rigor while making it navigable for non-technical sustainability managers.",
      },
      { type: "text", body: "Key capabilities I designed:" },
      {
        type: "text",
        body: "Scope Segregation: Dedicated metric cards for Scope 1 (Fuel, Direct Emissions), Scope 2 (Electricity), and Scope 3 (Supply Chain, Refrigerants), each showing year-over-year changes with percentage deltas and trend indicators.",
      },
      {
        type: "text",
        body: "Emission Distribution: Pie and bar charts showing top emission sources across the enterprise: fleet diesel, warehouse electricity, refrigerant leaks. The visual hierarchy prioritized the largest sources while keeping smaller contributors visible.",
      },
      {
        type: "text",
        body: "Fuel & Energy Trends: Continuous monthly line charts connecting usage patterns to emission intensity. We overlaid multiple energy types (diesel, electricity, gas) with a 30-day moving average to smooth out operational noise and reveal actual trends.",
      },
      {
        type: "text",
        body: "Operational Efficiency Module: Monthly emissions per scope with stacked bar charts showing the proportion of Scope 1 vs Scope 2 emissions. This helped admins understand whether operational changes (like fleet electrification) were actually moving the needle.",
      },
      {
        type: "text",
        body: "Compliance Progress Tracking: Integrated tracking for SBTi (Science Based Targets initiative), CDP (Carbon Disclosure Project), TCFD (Task Force on Climate-related Financial Disclosures), and Net-Zero goals, each with percentage completion bars and status indicators.",
      },
      {
        type: "text",
        body: "Document Traceability: Every data point linked to its original invoice, utility bill, or IoT feed in the Source Document Log. This was non-negotiable for audits. Users could click any number and see the proof.",
      },
      {
        type: "text",
        body: "Design thinking — This dashboard had to communicate credibility. Regulators, auditors, and sustainability leads all use it. We designed every graph to have dual context: environmental (tCO₂e) and operational (cost, energy, utilization).",
      },
      {
        type: "text",
        body: "A key design challenge was avoiding chart fatigue. Early prototypes had 15+ visualizations on one screen. Users felt overwhelmed.",
      },
      {
        type: "text",
        body: "Our solution: smart insight banners. Instead of forcing users to interpret every chart, we added AI-generated insights like “Scope 2 reduced by 26% YoY” or “Diesel usage spiked 18% in Q3, investigate fleet efficiency.” These acted as narrative guides through the data.",
      },
      {
        type: "text",
        body: "The hardest UX decision: how much complexity to expose. We tested three levels of depth:",
      },
      {
        type: "list",
        items: [
          "Lite View: Summary cards only (admins hated it, too shallow).",
          "Full View: Every chart, every breakdown (users got lost).",
          "Progressive Disclosure: Summary first, drill-downs on demand (this worked).",
        ],
      },
      {
        type: "text",
        body: "We also introduced chart density adaptation: if a dataset had fewer than 50 records, we showed full granularity. Above 1,000 records, we aggregated by week or month to prevent rendering collapse.",
      },
      {
        type: "image",
        src: "/images/ngx/ghg-analysis.png",
        alt: "Comprehensive GHG emission analysis views",
      },

      {
        type: "heading",
        text: "3. Hub Operations: Facility-Level Emission Intelligence",
        level: 2,
      },
      {
        type: "text",
        body: "What it does — Tracks and analyzes emissions inside physical hubs: energy consumption, refrigerant leakage, and storage efficiency across cold and ambient chambers.",
      },
      {
        type: "text",
        body: "The challenge — Facilities generate the noisiest data. Multiple meters, irregular readings, simultaneous processes across chambers with wildly different emissions profiles (cold storage vs ambient warehousing). And clients share space, so attribution gets messy fast.",
      },
      {
        type: "text",
        body: "We needed to make chamber-level emissions legible without losing operational nuance.",
      },
      { type: "text", body: "Key capabilities I designed:" },
      {
        type: "text",
        body: "Business Performance Summary: Four primary KPIs at the top: Total Emission, Total Electricity Consumption, Total Electricity Cost, Total Refrigerant Leak. Each broken down by Cold vs Ambient with delta indicators.",
      },
      {
        type: "text",
        body: "Key Insight Banners: Context-aware messages surfaced from the data. Example: “Customer growth (+40%) is outpacing cargo growth (+12%), suggesting opportunity to increase cargo per customer.” These helped facility managers connect emissions data to business decisions.",
      },
      {
        type: "text",
        body: "Environmental Impact Section: An emissions timeline (monthly trend chart with a 30-day moving average to detect anomalies), a total emissions distribution donut showing the split between Cold Room (85.4%) and Ambient Room (14.6%), an ambient emissions breakdown splitting storing (80%) vs handling (20%), and an emission-by-chamber horizontal bar chart using proportional width + exact values to maintain precision.",
      },
      {
        type: "text",
        body: "Refrigerant Leak Monitoring: Dedicated donut chart for refrigerant emissions split by storage type (99% from cold rooms). This became a critical operational alert. Leaks are both costly and high-emission.",
      },
      {
        type: "text",
        body: "Electricity Consumption Analysis: Stacked bar chart showing monthly usage by Total Storage, Ambient Storage, and Cold Storage with an annual summary sidebar. The mint/teal color system kept it consistent with the rest of the platform.",
      },
      {
        type: "text",
        body: "Top Clients by Emissions: Horizontal bar chart ranking customers by their emission footprint, labeled by sector (Government, Industrial, Energy, Education). This helped facility managers allocate emissions accurately for Scope 3 reporting.",
      },
      {
        type: "text",
        body: "Hub Operations Table: Granular client view showing Date, Client Name, Area/Type (Chamber 1-4, Cold/Ambient), Energy Consumption, Occupancy Volume, and Total Emission per entry. Expandable rows revealed detailed metrics like CBM In/Out for storage density analysis.",
      },
      {
        type: "image",
        src: "/images/ngx/hub-donuts.png",
        alt: "Hub Operations — cold vs ambient emission distribution",
      },
      {
        type: "text",
        body: "Design thinking — We designed layered summaries: Total → Cold/Ambient → Chamber → Client. Each layer added context without overwhelming the previous one.",
      },
      {
        type: "text",
        body: "The hardest challenge was visual proportionality. 85% of emissions came from cold rooms. If we used pure percentage-based sizing, ambient data would disappear. Our solution: proportional + absolute. Charts showed proportional splits, but labels always included exact values. This preserved both the story and the nuance.",
      },
      {
        type: "text",
        body: "Another critical decision: making leaks visible. Early designs buried refrigerant data in a sub-menu. But leaks are often the highest-impact, lowest-cost fix. We promoted them to the primary dashboard and added threshold alerts.",
      },

      {
        type: "heading",
        text: "4. Report History: Auditability Made Simple",
        level: 2,
      },
      {
        type: "text",
        body: "What it does — Keeps a complete archive of every report generated across modules (Transport, Hub, GHG) for audit, download, and traceability.",
      },
      {
        type: "text",
        body: "The challenge — Compliance isn’t a one-time event. It’s continuous. Auditors show up months after data is submitted. Clients request historical reports. Regulators ask for proof. If you can’t reproduce a report from six months ago, you’ve lost credibility.",
      },
      {
        type: "text",
        body: "Most platforms treat reporting as an afterthought. We made it a first-class feature.",
      },
      { type: "text", body: "Key capabilities I designed:" },
      {
        type: "text",
        body: "Unified Report Table: Centralized view showing Report ID, Report Type (Transport/Hub/GHG), Customer, Date Generated, Date Range, and Download Action. Filterable by type and time range with a date picker for precision.",
      },
      {
        type: "text",
        body: "Expandable Customer Lists: Reports covering multiple entities (e.g., “Show less (4)”) could be expanded inline to reveal all covered customers without leaving the page.",
      },
      {
        type: "text",
        body: "One-Click Download: Standardized PDF/CSV outputs formatted for regulators and clients. Each download includes metadata: generation timestamp, data sources used, and calculation methodology.",
      },
      {
        type: "text",
        body: "Version Control: If new data gets uploaded that affects a past report period, the system flags the discrepancy and allows regeneration with updated values while preserving the original for audit trail integrity.",
      },
      {
        type: "text",
        body: "Search & Filter: Quick filters for “All Type” (Transport/Hub/GHG) and date ranges. Pagination for large report archives (hundreds of entries over years).",
      },
      {
        type: "text",
        body: "Design thinking — The goal was zero ambiguity. Every report had to be traceable back to its source data, its generation logic, and its point-in-time accuracy.",
      },
      {
        type: "text",
        body: "Early designs hid older reports in an archive section. Bad idea. Auditors need easy access to history, so we made everything equally accessible with smart filters instead of artificial hierarchy.",
      },
      {
        type: "text",
        body: "The most important design decision: showing report metadata inline. Users could see at a glance which customers were included, which date range was covered, and which module generated it, without opening the file first.",
      },

      { type: "heading", text: "Why It All Worked Together" },
      {
        type: "list",
        items: [
          "Isometric maps grounded emissions in physical reality. Admins could see where their carbon was coming from, not just read about it in a table.",
          "Role-based UX meant clarity for both data entry and data audit. Suppliers weren’t overwhelmed. Admins weren’t limited.",
          "Consistent visual logic across charts, markers, and alerts. Once you learned the language in one module, you could read any part of the system. Mint always meant clean energy. Teal always meant fossil. Red always meant alert.",
          "Fail-first design meant issues were visible, not buried. Transparency built trust. When something broke, users knew immediately and knew how to fix it.",
          "Modular architecture allowed the system to grow. As NGX added new data sources and compliance frameworks, Reality absorbed them without breaking. Transport, Hub, and GHG modules operated independently but shared the same design DNA.",
        ],
      },
      {
        type: "text",
        body: "Reality became NGX’s operating layer, the proof that data could be both auditable and human.",
      },

      { type: "heading", text: "Design Highlights: Cross-Cutting Decisions" },
      {
        type: "text",
        body: "Beyond individual features, several design principles unified the entire platform:",
      },
      {
        type: "image",
        src: "/images/ngx/hub-table.png",
        alt: "Layered summaries and granular tables across the system",
      },
      {
        type: "image",
        src: "/images/ngx/mobile-screens.png",
        alt: "Reality’s consistent visual logic carried across screens",
      },
      { type: "heading", text: "Visual Language", level: 2 },
      {
        type: "text",
        body: "Isometric 3D with restraint — After 10+ failed renders, we landed on flat isometric geometry with soft glows for active nodes. This gave spatial context without performance cost or visual noise.",
      },
      { type: "text", body: "Consistent color semantics:" },
      {
        type: "list",
        items: [
          "Mint (#00D9A3): Clean energy, electric vehicles, positive trends.",
          "Teal (#008B8B): Fossil fuels, diesel, baseline operations.",
          "Red/Orange: Alerts, anomalies, threshold breaches.",
          "Gray: Inactive, historical, or archived data.",
        ],
      },
      {
        type: "text",
        body: "This color system carried across every module, every chart, every status indicator.",
      },
      {
        type: "text",
        body: "Adaptive chart density — Charts automatically adjusted granularity based on dataset size:",
      },
      {
        type: "list",
        items: [
          "<50 records: Full daily granularity.",
          "50-500 records: Weekly aggregation.",
          "500+ records: Monthly aggregation with moving averages.",
        ],
      },
      {
        type: "text",
        body: "This prevented render collapse while maintaining analytical value.",
      },
      { type: "heading", text: "Interaction Patterns", level: 2 },
      {
        type: "text",
        body: "Progressive disclosure — Summary metrics to category breakdowns to item-level details. Users could drill down without getting lost, and surface without losing context.",
      },
      {
        type: "text",
        body: "Expandable data rows — Tables showed essentials by default, with expandable rows for deeper inspection. This kept the interface scannable while preserving access to granular data.",
      },
      {
        type: "text",
        body: "Inline editing with validation — Where users could input data (calibration, tags, thresholds), validation happened in real-time with visual feedback. Green checkmarks for valid entries, inline error messages for failures.",
      },
      {
        type: "text",
        body: "Smart defaults — Every filter, every time range, every view started with the most statistically relevant default. “Last 30 Days” for timelines. “All Scopes” for emissions. “Highest Impact” for sorting.",
      },
      { type: "heading", text: "Information Architecture", level: 2 },
      {
        type: "text",
        body: "4-step enterprise workflow — Connect to Calibrate to Baseline to Report. This became the mental model for every user journey. Each step had a dedicated interface, but the flow was always visible in the navigation.",
      },
      {
        type: "text",
        body: "Dual-role architecture — One codebase, two experiences. Suppliers saw simplified upload flows. Admins saw full audit trails. Same data, different lenses.",
      },
      {
        type: "text",
        body: "System logging visible to users — Unlike most platforms that hide logs, we exposed them. Every calculation, every data transformation, every automated decision was traceable. This wasn’t just transparency. It was trust infrastructure.",
      },

      { type: "heading", text: "Metrics & Impact" },
      {
        type: "stats",
        items: [
          { value: "70%", label: "reduction in supplier onboarding time" },
          {
            value: "Zero",
            label: "critical data mismatches in third-party audits",
          },
        ],
      },
      {
        type: "list",
        items: [
          "First IoT-driven emissions platform in MENA. No other product in the region was doing real-time, sensor-connected carbon accounting at this scale.",
          "70% reduction in supplier onboarding time. What used to take weeks of back-and-forth now happened in days, with higher data quality.",
          "Zero critical data mismatches in third-party audits. The compliance layer worked. Auditors trusted the output because they could trace every number back to its source.",
          "Visual and architectural foundation for NGX’s ecosystem. Reality’s design language, role architecture, and data visualization patterns became the template for Trace, Vault, and Energy Bank.",
          "Recognized in regional sustainability reports as a benchmark for digital ESG tooling. Industry analysts cited Reality as an example of how climate tech should handle transparency.",
        ],
      },

      { type: "heading", text: "Reflections" },
      {
        type: "text",
        body: "Reality didn’t start with users. It started with data. And maybe that’s why it worked.",
      },
      {
        type: "text",
        body: "Designing Reality was an act of translation: from regulation to interface, from sensor to insight, from chaos to clarity.",
      },
      {
        type: "text",
        body: "But what made it work wasn’t the UI. It was the mindset: design isn’t just how something looks. It’s how well it explains itself.",
      },
      {
        type: "text",
        body: "Instead of designing from assumption, we designed from observation, understanding the system’s truth through the people who built it. We didn’t guess what users wanted. We studied how the system failed. We debugged trust. We didn’t just serve users. We served the systems they depend on.",
      },
      {
        type: "text",
        body: "The 3D failures, the broken dashboards, the conflicting roles, all of it was part of finding balance between accuracy and empathy.",
      },

      { type: "heading", text: "What I Learned" },
      {
        type: "text",
        body: "The best way to design for compliance is to design for transparency. When users can see the full data trail (errors included), they trust the output. Hiding failures destroys confidence. Surfacing them builds it.",
      },
      {
        type: "text",
        body: "The best way to scale climate software is to build visual logic that mirrors operational truth. Reality’s interface didn’t abstract away complexity. It made complexity legible. That’s why it scaled across dozens of enterprise deployments without breaking.",
      },
      {
        type: "text",
        body: "Sometimes, the fastest way to design for people is to design with the ones who understand their pain indirectly, the data guys, the engineers, the systems thinkers. Sebastian and Sławek taught me more about user needs through system behavior than a hundred interviews could have.",
      },
      {
        type: "text",
        body: "And sometimes, the most user-centered thing you can do is sit with the backend team and ask: “Where does this usually go wrong?” Because in complex environments like this, clarity isn’t given. It’s earned, line by line, render by render, iteration by iteration.",
      },
      {
        type: "text",
        body: "Because trust (especially in climate) isn’t a feature. It’s a consequence.",
      },
      {
        type: "text",
        body: "Reality earned that trust, line by line, flag by flag, decision by decision.",
      },
      {
        type: "text",
        body: "In climate tech, the real product isn’t the platform. It’s the proof.",
      },
    ],
  },
  {
    slug: "arc",
    img: "work-arc",
    title: "Arc",
    headline: "Arc: One Aggregator for the Entire Crypto Market",
    category: "BLOCKCHAIN",
    description:
      "ARC is a web three solution that makes you manage your entire crypto market from the palm of your hand by connecting the world of DEX, CEX and NFT on multiple blockchains effortlessly.",
    meta: [
      { label: "Completion", value: "August 2021" },
      { label: "Industry", value: "Blockchain" },
      { label: "Tools", value: "Figma, After Effects, Notion" },
      { label: "Services", value: "Research, Product & Web Design" },
    ],
    content: [
      {
        type: "image",
        src: "/images/work-arc.png",
        alt: "Arc — the aggregated crypto market dashboard",
      },

      { type: "heading", text: "Background" },
      {
        type: "text",
        body: "The crypto world has existed since 2009 but didn't get much limelight until the Defi space's introduction in 2015. The Defi space got a bigger boom in 2017 with the rise of Centralized Exchanges like Binance and Decentralized Exchanges like Uniswap. With the rise of crypto, new tokens get listed daily. Many of these tokens are found more on DEXs, with Pancakeswap, Uniswap, Zapper, etc., a hub to list and interact with connected to your wallet, e.g. Trustwallet. This made people have investments scattered across multiple platforms, making it difficult to manage their investments properly and estimate their worth. Arc was devised to be the solution to unifying the crypto space, including all CEX, DEX and even NFT investments, to make the lives of crypto investors easier.",
      },

      { type: "heading", text: "My Role" },
      {
        type: "text",
        body: "I came into Arc as the only designer on the project to handle the research, brainstorming with the CEO, who was the major visionary of the project. I took those ideas, improved on them, and created high-fidelity mockups that would be tested and implemented. I was shortly joined by another designer who would work directly under me to coordinate the two initial projects of Arc, including the web3 aggregator and the NFT marketplace.",
      },

      { type: "heading", text: "The Briefings Began" },
      {
        type: "text",
        body: "When I joined the team, there was an old design file that the previous designer had designed. Hence, my first act was to ask for feedback on the product, and why the dashboard was to be redesigned, so I started with meetings with the CEO as it was his idea to redesign the project. Some calls were scheduled in which his opinions on the current project were shared and how he felt the project didn't fully reflect his vision. But as a professional designer, my goal is to align business goals and users' needs together, so I went on ahead to test the existing product with a few members of the discord community to get the pain points from the users' perspectives as well, and this was used to draft out the new designs.",
      },

      { type: "heading", text: "More Research" },
      {
        type: "text",
        body: "The next step in the research phase was to look at major protocols across several aspects that were doing well in their niche. The available product has covered many niche areas, including Defi, DEX, NFT, and analysis tools. So these were the competitors researched — DEX: 1inch, Zapper, Uniswap, Sushiswap; NFT: Opensea, Rarible, Foundation.app; Analysis: Dextools, Coinmarketcap. These helped in getting an overview; though analogous, it helped to structure the UX of the product as the base shell so we can improve the design, UX, and overall value proposition of the protocol.",
      },

      { type: "heading", text: "Creating Personas" },
      {
        type: "text",
        body: "The personas created were aimed at having a mental picture of the type of users we would have to design for, to be able to empathize with the users properly.",
      },
      {
        type: "image",
        src: "/images/arc/persona-1.png",
        alt: "Arc user persona",
        light: true,
      },
      {
        type: "image",
        src: "/images/arc/persona-2.png",
        alt: "Arc user persona",
        light: true,
      },

      { type: "heading", text: "Brainstorming with HMW (How Might We)" },
      {
        type: "text",
        body: "Taking further steps to refine the problems with how we might help — seeing the solutions from the users' pain points and finding the best ways to offer value and simpler, more flexible flows.",
      },
      {
        type: "image",
        src: "/images/arc/hmw.png",
        alt: "How Might We — reframing pain points into opportunities",
      },

      { type: "heading", text: "Design Decisions" },
      {
        type: "text",
        body: "After carefully analyzing the data and working with an MVP and time constraints, the following solutions were designed.",
      },

      { type: "heading", text: "Dashboard", level: 2 },
      {
        type: "image",
        src: "/images/arc/dashboard.png",
        alt: "Arc dashboard — a unified view of CEX and DEX holdings",
      },
      {
        type: "text",
        body: "The dashboard is structured so that you get an overview of your investment holdings. At the same time, you can toggle to view the individual holdings, view your earnings, and interact with your other exchanges. Here you can see your CEX holdings and investments and interact with them, likewise your DEX investments — stake and unstake, bridge, and other forms of trading.",
      },

      { type: "heading", text: "Bridge", level: 2 },
      {
        type: "image",
        src: "/images/arc/bridge.png",
        alt: "Arc bridge — move the same asset across blockchains",
      },
      {
        type: "text",
        body: "The bridge Arc gives was designed to keep a record of all the activities and, simultaneously, give you a clean and easy way to move the same asset between different blockchains. We also take it forward by swapping different tokens between chains.",
      },

      { type: "heading", text: "Swap with Multiple Routes", level: 2 },
      {
        type: "image",
        src: "/images/arc/swap.png",
        alt: "Arc swap — best-route token conversion",
      },
      {
        type: "text",
        body: "The swap interface was designed to allow the conversion of one token to another on the same blockchain. At the same time, we give users the ability to import tokens from any blockchain by pulling data from sources like DEXTools, Coingecko, Coinmarketcap, etc. You can swap any token in the world for any token on Arc. We give you the best routes, aggregate all protocols with such tokens, and select the best for you.",
      },

      { type: "heading", text: "Trade", level: 2 },
      {
        type: "image",
        src: "/images/arc/trade.png",
        alt: "Arc trade — spot and futures via aggregated DEX liquidity",
      },
      {
        type: "text",
        body: "Trading is one feature that has been very difficult on DEXs due to its fast-paced nature and need for high liquidity. With Arc as an aggregator, we connect to the pools of multiple DEXs and access their treasury pools, and this gives more than enough to handle instant trading for both spot and futures trading — bringing the CEX experience into a decentralized space.",
      },

      { type: "heading", text: "Fiat On-Ramp", level: 2 },
      {
        type: "image",
        src: "/images/arc/fiat-onramp.png",
        alt: "Arc fiat on-ramp — buy crypto with card or bank via Wert",
      },
      {
        type: "text",
        body: "One of the biggest needs for most users of DEX is how to buy tokens; yes, we can manipulate the tokens from one form to another and invest when we have them, but getting them initially is the issue. So Arc integrates Wert, a tool that allows the purchase of several tokens via payments with your card or bank account, and this allows you to purchase crypto that can be traded or swapped at will.",
      },

      { type: "heading", text: "Pools & Farms", level: 2 },
      {
        type: "image",
        src: "/images/arc/pools-farms.png",
        alt: "Arc pools & farms — stake tokens for passive income",
      },
      {
        type: "text",
        body: "Pools and Farms are investment opportunities given to non-trading investors to stake their tokens and earn passive income. By so doing, they contribute to the protocol's treasury, which helps the speed of transactions in general. All pools and farms generate rewards that can be claimed at any time.",
      },

      { type: "heading", text: "Aggregated NFT Marketplace", level: 2 },
      {
        type: "image",
        src: "/images/arc/nft-marketplace.png",
        alt: "Arc — manage NFTs across marketplaces in one place",
      },
      {
        type: "text",
        body: "The world of NFTs has become increasingly popular among investors. However, interacting with your NFTs can be a cumbersome task, especially when you have investments in multiple marketplaces. That's where Arc comes in. It simplifies the process by allowing you to connect all your marketplaces in one place. With Arc, you can easily manage your assets, accept bid offers, and even sell your NFTs without having to navigate through multiple marketplaces.",
      },

      { type: "heading", text: "Lend NFT", level: 2 },
      {
        type: "image",
        src: "/images/arc/lend-nft.png",
        alt: "Arc — borrow and lend NFTs for GameFi",
      },
      {
        type: "text",
        body: "The usage of non-fungible tokens (NFTs), particularly in the GameFi industry, has become increasingly popular. To excel in some games, it is essential to possess good gear and weapons, which are usually NFTs. While guilds typically provide support to their members, Arc takes it a step further by allowing users to borrow NFTs for a specific period and return them within a given time frame.",
      },

      { type: "heading", text: "Arbitrage", level: 2 },
      {
        type: "image",
        src: "/images/arc/arbitrage.png",
        alt: "Arc arbitrage — opportunities refreshed every 10 minutes",
      },
      {
        type: "text",
        body: "Arbitrage trading is a profitable opportunity for many traders. It involves buying assets from the cheapest protocol and selling them at the highest price. Although it sounds simple, it's actually quite challenging to find such opportunities. Our platform is designed to assist you in your arbitrage trading by providing all the necessary tools. You'll have access to important news, Twitter updates (since that's where most protocols announce), and a list of arbitrage opportunities that are refreshed every 10 minutes based on the prices of assets we aggregate from various protocols. Our platform will help you identify the protocols that offer potential arbitrage opportunities.",
      },

      { type: "heading", text: "Mobile Views", level: 2 },
      {
        type: "image",
        src: "/images/arc/mobile-views.png",
        alt: "Arc — mobile-first designs for the majority mobile user base",
      },
      {
        type: "text",
        body: "The majority of Arc's users were mobile users from the research, so high priority had to be placed on the mobile designs to optimize the experience.",
      },

      { type: "heading", text: "Key Takeaways" },
      { type: "heading", text: "Learnings", level: 2 },
      {
        type: "text",
        body: "This is by far one of the most interesting web3 projects I have worked on. It allowed me to understand more in-depth the complexities of the Defi and NFT space, prioritize user needs, and simplify their burdensome activities to give maximum value. The web3 space holds a lot of treasures and ways to keep changing lives, and I am glad to have impacted thousands with this one.",
      },

      { type: "heading", text: "Conclusion" },
      {
        type: "text",
        body: "Arc is a solution set to bring about financial freedom to millions and affect a lot of lives, so the ease of the processes and the clarity of the tasks make it easier to drive adoption and, by so doing, invite more people who can benefit from the amazing product.",
      },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

/** The previous project in the list, wrapping around to the last. */
export function getPreviousProject(slug: string): Project {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  return PROJECTS[(i - 1 + PROJECTS.length) % PROJECTS.length];
}

/** The next project in the list, wrapping around to the first. */
export function getNextProject(slug: string): Project {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  return PROJECTS[(i + 1) % PROJECTS.length];
}
