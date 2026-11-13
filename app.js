// CoverSpell: premise + question only. The twist is NEVER used in output.
const FRAMES = [
  p => `${cap(p)} — but is it really that simple?`,
  p => `Everyone already knows: ${lower(p)}. So what happens next?`,
  p => `${cap(p)}. Who actually makes the money?`,
  p => `What happens the moment "${lower(p)}" becomes obvious to everyone?`,
  p => `${cap(p)}! This money — can you still earn it?`,
];

// Words/phrases that leak the outcome on a cover.
const SPOILER_WORDS = [
  "can't", "cannot", "won't", "will not", "actually", "in the end", "turns out",
  "so tomorrow", "already happened", "stays flat", "no profit", "rises anyway",
  "反而", "涨不了", "已经发生", "吃掉", "走平", "其实", "结果是", "最后"
];
const NUMBER_RE = /\d+(\.\d+)?\s*(%|万|亿|million|billion|k\b)/i;

const EXAMPLES = {
  market: { premise: "Everyone already knows the market will rise tomorrow",
            twist: "The rise already happened today, so tomorrow stays flat and the profit is gone",
            draft: "Everyone knows it rises tomorrow, so tomorrow it can't rise!" },
  road:   { premise: "The road you didn't take always looks better",
            twist: "It only looks better because it exists in your imagination, beautified",
            draft: "The road not taken only looks better because you imagined it" },
  house:  { premise: "You have 580k in hand — buy a home, or rent and invest?",
            twist: "After 30 years the renter ends up 1.73 million ahead",
            draft: "Renting wins: after 30 years you end up 173万 ahead!" },
};

const $ = id => document.getElementById(id);
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const lower = s => s.charAt(0).toLowerCase() + s.slice(1);

$("cast").addEventListener("click", () => {
  const premise = $("premise").value.trim().replace(/[.!?。！？]+$/, "");
  if (!premise) { alert("Tell me the premise first — what can everyone know?"); return; }
  const ul = $("results");
  ul.innerHTML = "";
  FRAMES.map(f => f(premise)).forEach(t => {
    const li = document.createElement("li");
    li.textContent = t;
    ul.appendChild(li);
  });
  $("resultsCard").hidden = false;
});

$("check").addEventListener("click", () => {
  const draft = $("draft").value.trim();
  const twist = $("twist").value.trim();
  const box = $("verdict");
  if (!draft) { box.innerHTML = ""; return; }
  const hits = new Set();
  const low = draft.toLowerCase();
  SPOILER_WORDS.forEach(w => { if (low.includes(w.toLowerCase())) hits.add(w); });
  if (NUMBER_RE.test(draft)) hits.add("a result number");
  // Leak check: any significant word from the secret twist appearing in the draft.
  if (twist) {
    twist.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5 ]/g, " ").split(/\s+/)
      .filter(w => w.length >= 4)
      .forEach(w => { if (low.includes(w)) hits.add("twist word: " + w); });
  }
  if (hits.size === 0) {
    box.innerHTML = `<span class="good">✅ Clean. This headline asks a question and keeps the ending locked in the video.</span>`;
  } else {
    box.innerHTML = `<span class="bad">👻 Spoiler spirits detected:</span> ` +
      [...hits].map(h => `<span class="chip">${h}</span>`).join(" ") +
      `<br>Cut these and end on a question instead — curiosity is what earns the tap.`;
  }
});

document.querySelectorAll("[data-example]").forEach(btn => {
  btn.addEventListener("click", () => {
    const ex = EXAMPLES[btn.dataset.example];
    $("premise").value = ex.premise;
    $("twist").value = ex.twist;
    $("draft").value = ex.draft;
  });
});
