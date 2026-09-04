const stream = document.getElementById("stream");
const replay = document.getElementById("replay");
const lncol = document.getElementById("lncol");
const sparkleLayer = document.getElementById("sparkles");

const sleep = ms => new Promise(r => setTimeout(r, ms));
let lineNum = 0;

/* ---------------- ambient sparkles (runs once, forever) ---------------- */
function initSparkles(count = 22) {
  sparkleLayer.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const s = document.createElement("span");
    s.className = "spark";
    const size = 1.5 + Math.random() * 2.5;
    s.style.width = size + "px";
    s.style.height = size + "px";
    s.style.left = Math.random() * 100 + "vw";
    s.style.setProperty("--drift", (Math.random() * 40 - 20) + "px");
    s.style.animationDuration = (10 + Math.random() * 12) + "s";
    s.style.animationDelay = (Math.random() * -20) + "s";
    if (Math.random() > 0.6) s.style.background = "var(--teal)";
    else if (Math.random() > 0.7) s.style.background = "var(--rose)";
    sparkleLayer.appendChild(s);
  }
}

/* ---------------- corner frame helper ---------------- */
const CORNERS = `<span class="corner tl"></span><span class="corner tr"></span><span class="corner bl"></span><span class="corner br"></span>`;

/* ---------------- code stream helpers ---------------- */
function addCode(html, speed) {
  lineNum += 1;
  const row = document.createElement("div");
  row.className = "code-row";
  row.innerHTML = `<span class="num">${lineNum}</span><span class="txt"></span>`;
  stream.appendChild(row);
  lncol.textContent = `Ln ${lineNum}, Col 1`;
  return typeInto(row.querySelector(".txt"), html, speed);
}

async function typeInto(el, html, speed = 10) {
  if (speed === 0) { el.innerHTML = html; return el; }
  if (/<[a-z]/i.test(html)) {
    el.innerHTML = html;
    return el;
  }
  const caret = document.createElement("span");
  caret.className = "caret";
  el.appendChild(caret);
  for (const ch of html) {
    caret.insertAdjacentText("beforebegin", ch);
    await sleep(speed);
  }
  caret.remove();
  return el;
}

async function progress(label) {
  lineNum += 1;
  const row = document.createElement("div");
  row.className = "code-row";
  row.innerHTML = `<span class="num">${lineNum}</span><span class="txt dim">// ${label}</span>`;
  stream.appendChild(row);

  const bar = document.createElement("div");
  bar.className = "bar-row";
  bar.innerHTML = `<div class="bar-track"><div class="bar-fill"></div></div>`;
  stream.appendChild(bar);
  const fill = bar.querySelector(".bar-fill");
  for (let i = 0; i <= 100; i += 4) {
    fill.style.width = i + "%";
    await sleep(10);
  }
  fill.style.width = "100%";

  lineNum += 1;
  const done = document.createElement("div");
  done.className = "code-row";
  done.innerHTML = `<span class="num">${lineNum}</span><span class="txt"><span class="badge ok">✓ ${label} — ready</span></span>`;
  stream.appendChild(done);
  lncol.textContent = `Ln ${lineNum}, Col 1`;
  await sleep(180);
}

function reveal(node) {
  stream.appendChild(node);
  return node;
}

/* ---------------- photo tilt interaction ---------------- */
function enableTilt(card) {
  const strength = 10;
  card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `rotateY(${px * strength}deg) rotateX(${-py * strength}deg) translateZ(6px)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateY(0) rotateX(0) translateZ(0)";
  });
}

/* ---------------- confetti burst ---------------- */
function confettiBurst(originEl, count = 26) {
  const rect = originEl.getBoundingClientRect();
  const colors = ["var(--gold)", "var(--teal)", "var(--violet)", "var(--rose)"];
  for (let i = 0; i < count; i++) {
    const p = document.createElement("span");
    p.className = "confetti-piece";
    const angle = Math.random() * Math.PI * 2;
    const dist = 90 + Math.random() * 160;
    p.style.setProperty("--cx", Math.cos(angle) * dist + "px");
    p.style.setProperty("--cy", Math.sin(angle) * dist - 40 + "px");
    p.style.setProperty("--cr", (Math.random() * 480 - 240) + "deg");
    p.style.background = colors[i % colors.length];
    p.style.top = rect.top + rect.height / 2 + "px";
    p.style.left = rect.left + rect.width / 2 + "px";
    if (Math.random() > 0.5) p.style.borderRadius = "50%";
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 1500);
  }
}

/* ---------------- main run sequence ---------------- */
async function run() {
  stream.innerHTML = "";
  lineNum = 0;
  replay.classList.add("hidden");

  await addCode('<span class="kw">#include</span> <span class="type">&lt;stdio.h&gt;</span>', 6);
  await addCode('<span class="kw">#include</span> <span class="type">&lt;teachers_day.h&gt;</span>', 6);
  await sleep(200);

  await addCode('<span class="kw">int</span> main() {', 6);
  await progress("loading memories");
  await progress("loading gratitude");
  await progress("loading respect");
  await progress("loading inspiration");

  await addCode('&nbsp;&nbsp;<span class="kw">include</span> <span class="type">knowledge.h</span>, <span class="type">respect.h</span>, <span class="type">gratitude.h</span>', 0);
  await sleep(120);
  await addCode('&nbsp;&nbsp;<span class="badge ok">✓ build successful</span>', 0);
  await sleep(500);

  await addCode('&nbsp;&nbsp;<span class="str">"searching for an exceptional teacher..."</span>', 8);
  await sleep(400);
  await addCode('&nbsp;&nbsp;<span class="badge ok">✓ teacher found</span>', 0);
  await sleep(500);

  const headline = document.createElement("div");
  headline.className = "reveal";
  headline.innerHTML = `
    ${CORNERS}
    <div class="eyebrow">// teachers_day.c — line ${lineNum + 1}</div>
    <h1><span class="shimmer">Happy Teacher's Day</span></h1>
    <div class="name">Sakib Sir</div>
  `;
  reveal(headline);
  await sleep(1300);

  const quoteWrap = document.createElement("div");
  quoteWrap.className = "reveal";
  quoteWrap.innerHTML = `${CORNERS}<div class="eyebrow">a message from your student</div><div class="quote-card"><span class="mark">&ldquo;</span><span class="q"></span></div>`;
  reveal(quoteWrap);
  const q = quoteWrap.querySelector(".q");
  const message = `Sir, you taught us C language, but your lessons go beyond syntax and programs. You taught us to think logically, solve problems patiently, and keep trying when the code doesn't work.`;
  await sleep(300);
  for (const ch of message) {
    q.textContent += ch;
    await sleep(14);
  }
  const sig = document.createElement("span");
  sig.className = "sig";
  sig.style.animationDelay = ".1s";
  sig.textContent = "Shivam Kumar Yadav";
  quoteWrap.querySelector(".quote-card").appendChild(sig);
  await sleep(900);

  await addCode('&nbsp;&nbsp;<span class="dim">// great teachers don\'t just teach us how to write code</span>', 0);
  await sleep(150);
  await addCode('&nbsp;&nbsp;<span class="dim">// they teach us how to think</span>', 0);
  await sleep(400);
  await addCode('&nbsp;&nbsp;<span class="kw">while</span> (student.learns()) {', 0);
  await addCode('&nbsp;&nbsp;&nbsp;&nbsp;knowledge<span class="type">++</span>;', 0);
  await addCode('&nbsp;&nbsp;&nbsp;&nbsp;confidence<span class="type">++</span>;', 0);
  await addCode('&nbsp;&nbsp;&nbsp;&nbsp;<span class="err">mistakes--;</span>', 0);
  await addCode('&nbsp;&nbsp;}', 0);
  await sleep(700);

  const asciiWrap = document.createElement("div");
  asciiWrap.className = "ascii-pane";
  asciiWrap.innerHTML = `<div class="label">&gt; generating_ascii_portrait();</div><img src="assets/ascii_portrait.jpg" alt="ASCII-style halftone portrait of Sakib Sir">`;
  reveal(asciiWrap);
  await sleep(1400);

  const photoWrap = document.createElement("div");
  photoWrap.className = "reveal";
  photoWrap.innerHTML = `
    ${CORNERS}
    <div class="photo-frame">
      <div class="photo-card"><img src="assets/teacher.jpg" alt="Sakib Sir — Teacher's Day tribute"></div>
    </div>
    <div class="photo-caption">
      <div class="tag">TEACHER'S DAY</div>
      <div class="who">Sakib Sir</div>
    </div>
  `;
  reveal(photoWrap);
  const photoCard = photoWrap.querySelector(".photo-card");
  enableTilt(photoCard);
  await sleep(500);
  confettiBurst(photoCard);
  await sleep(700);

  await addCode('&nbsp;&nbsp;<span class="badge warn">✓ program status: successful</span>', 0);
  await addCode('&nbsp;&nbsp;<span class="dim">// for: Sakib Sir · by: Shivam Kumar Yadav</span>', 0);
  await addCode('&nbsp;&nbsp;<span class="kw">return</span> 0;', 0);
  await addCode('}', 0);

  replay.classList.remove("hidden");
}

initSparkles();
replay.addEventListener("click", run);
run();
