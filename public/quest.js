/*
  Side Quest for the standalone pages (bookshelf, life-away).

  The React app's version lives in src/lib/quest.ts + src/components/quest.tsx;
  this file shares its storage key so finds count across the whole site.
  Keep NAMES and TOTAL in step with QUEST in src/lib/quest.ts.

  Usage: <button class="quest-item" data-quest="shelf" type="button"></button>
*/
(function () {
  var KEY = "mena:side-quest";
  var NAMES = {
    spark: "The Spark",
    pull: "The Pull",
    ending: "The Last Page",
    echo: "The Echo",
    lost: "The Wrong Turn",
    shelf: "The Bookmark",
    run: "The Long Run",
  };
  var TOTAL = 7;
  var SPARK =
    "M12 2.5c.7 5.2 2.8 7.6 9.5 9.5-6.7 1.9-8.8 4.3-9.5 9.5-.7-5.2-2.8-7.6-9.5-9.5 6.7-1.9 8.8-4.3 9.5-9.5Z";

  function read() {
    try {
      var ids = JSON.parse(localStorage.getItem(KEY) || "[]");
      return Array.isArray(ids) ? ids.filter(function (id) { return NAMES[id]; }) : [];
    } catch (e) {
      return [];
    }
  }
  function write(ids) {
    try {
      localStorage.setItem(KEY, JSON.stringify(ids));
    } catch (e) {}
  }
  function svg(filled) {
    return (
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + SPARK + '" fill="' +
      (filled ? "currentColor" : "none") + '" stroke="currentColor" stroke-width="' +
      (filled ? 0 : 1.6) + '" stroke-linejoin="round"/></svg>'
    );
  }

  var css =
    ".quest-item{position:relative;display:inline-grid;place-items:center;width:24px;height:24px;padding:0;border:0;background:none;border-radius:999px;color:#f3f0e9;opacity:.85;cursor:pointer;vertical-align:middle;-webkit-tap-highlight-color:transparent;transition:opacity .2s cubic-bezier(.23,1,.32,1),color .2s cubic-bezier(.23,1,.32,1),transform .3s cubic-bezier(.23,1,.32,1)}" +
    ".quest-item::before{content:'';position:absolute;inset:-10px}" +
    ".quest-item svg{width:16px;height:16px;filter:drop-shadow(0 0 6px rgba(253,252,248,.35))}" +
    ".quest-item[data-found=true]{color:#fdfcf8;opacity:1}" +
    ".quest-item:active{transform:scale(.85)}" +
    ".quest-item:focus-visible{outline:2px solid #f58404;outline-offset:4px}" +
    "@media (hover:hover) and (pointer:fine){.quest-item:hover{color:#fdfcf8;opacity:1;transform:rotate(45deg) scale(1.15)}}" +
    ".quest-hud{position:fixed;left:max(16px,env(safe-area-inset-left));bottom:max(16px,env(safe-area-inset-bottom));z-index:50;display:flex;align-items:center;gap:8px;height:36px;padding:0 14px;border-radius:999px;border:1px solid rgba(255,255,255,.08);background:rgba(28,27,24,.82);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);color:#f3f0e9;font:13px/1 'Neue Haas',system-ui,sans-serif;letter-spacing:0;text-transform:none;text-decoration:none;white-space:nowrap;box-shadow:0 8px 24px rgba(0,0,0,.35)}" +
    ".quest-hud svg{width:12px;height:12px;color:#fdfcf8;flex-shrink:0}" +
    ".quest-hud .msg{color:#a8a69f}" +
    "@media (prefers-reduced-motion:no-preference){.quest-item[data-pop=true]{animation:quest-pop .45s cubic-bezier(.23,1,.32,1)}.quest-item[data-twinkle=true]{animation:quest-twinkle .9s cubic-bezier(.23,1,.32,1)}.quest-hud{animation:quest-hud-in .3s cubic-bezier(.23,1,.32,1) backwards}}" +
    "@keyframes quest-pop{40%{transform:scale(1.7) rotate(45deg)}100%{transform:scale(1) rotate(90deg)}}" +
    "@keyframes quest-twinkle{30%{transform:scale(1.6) rotate(45deg);opacity:1;color:#fdfcf8}60%{transform:scale(.9) rotate(80deg)}100%{transform:scale(1) rotate(90deg)}}" +
    "@keyframes quest-hud-in{from{opacity:0;transform:translateY(8px)}}";

  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  var hud, timer, live;
  function renderHud(message) {
    var found = read();
    if (!found.length) return;
    if (!hud) {
      hud = document.createElement("a");
      hud.href = "/journal";
      hud.className = "quest-hud";
      document.body.appendChild(hud);
      live = document.createElement("span");
      live.setAttribute("role", "status");
      live.style.cssText = "position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)";
      document.body.appendChild(live);
    }
    hud.setAttribute("aria-label", "Side quest: " + found.length + " of " + TOTAL + " found. Open your journal");
    hud.innerHTML =
      svg(true) + "<span>" + found.length + "/" + TOTAL + "</span>" +
      (message ? '<span class="msg" aria-hidden="true">' + message + "</span>" : "");
    live.textContent = message || "";
    clearTimeout(timer);
    if (message) timer = setTimeout(function () { renderHud(""); }, 3200);
  }

  document.querySelectorAll("[data-quest]").forEach(function (btn) {
    var id = btn.getAttribute("data-quest");
    if (!NAMES[id]) return;
    function paint() {
      var has = read().indexOf(id) !== -1;
      btn.dataset.found = has;
      btn.innerHTML = svg(has);
      btn.setAttribute("aria-label", has ? NAMES[id] + ", already in your journal" : "Something hidden. Collect it");
    }
    paint();
    btn.addEventListener("animationend", function () {
      btn.dataset.pop = "false";
      btn.dataset.twinkle = "false";
    });
    // Twinkle once the first time an unfound spark comes into view.
    if ("IntersectionObserver" in window && read().indexOf(id) === -1) {
      var io = new IntersectionObserver(function (entries) {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        setTimeout(function () { btn.dataset.twinkle = "true"; }, 350);
      }, { threshold: 1 });
      io.observe(btn);
    }
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var found = read();
      if (found.indexOf(id) !== -1) {
        renderHud(NAMES[id] + " is in your journal");
        return;
      }
      found.push(id);
      write(found);
      paint();
      btn.dataset.pop = "true";
      renderHud(found.length === TOTAL ? "All " + TOTAL + " found. Open your journal" : "Found " + NAMES[id]);
    });
  });

  renderHud("");
})();
