document.addEventListener('DOMContentLoaded', () => {
  const ca = document.getElementById('contentArea');

  // ─── Sparkline SVG ────────────────────────────────────────────────────
  let _sid = 0;
  const spark = (pts, color) => {
    const id = 'spk' + (++_sid);
    const W = 80, H = 30, n = pts.length;
    const coords = pts.map((v, i) => {
      const x = ((i / (n - 1)) * W).toFixed(1);
      const y = (H - (v / 100) * (H - 5) - 2).toFixed(1);
      return `${x},${y}`;
    });
    const pline = coords.join(' ');
    const last = coords[n - 1].split(',');
    const area = `M${coords[0]} L${coords.slice(1).join(' L')} L${W},${H} L0,${H} Z`;
    return `<svg viewBox="0 0 ${W} ${H}" style="width:${W}px;height:${H}px;display:block;flex-shrink:0">
      <defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${color}" stop-opacity="0.3"/>
        <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
      </linearGradient></defs>
      <path d="${area}" fill="url(#${id})"/>
      <polyline points="${pline}" fill="none" stroke="${color}" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"/>
      <circle cx="${last[0]}" cy="${last[1]}" r="2.5" fill="${color}" stroke="#fff" stroke-width="1.5"/>
    </svg>`;
  };

  // ─── Ring Chart ───────────────────────────────────────────────────────
  const ring = (pct, color, label) => {
    const r = 15.915;
    const alertColor = pct < 70 ? '#ef4444' : pct < 80 ? '#f59e0b' : color;
    return `<div style="text-align:center">
      <svg viewBox="0 0 36 36" width="60" height="60">
        <circle cx="18" cy="18" r="${r}" fill="none" stroke="#f0f0f0" stroke-width="3.2"/>
        <circle cx="18" cy="18" r="${r}" fill="none" stroke="${alertColor}" stroke-width="3.2"
          stroke-dasharray="${pct} ${100 - pct}" stroke-dashoffset="25" stroke-linecap="round"/>
        <text x="18" y="18" text-anchor="middle" dominant-baseline="central"
          font-size="7" font-weight="800" fill="${alertColor}">${pct}%</text>
      </svg>
      <div style="font-size:9px;color:var(--fg-muted);font-weight:500;margin-top:1px">${label}</div>
    </div>`;
  };

  // ─── Smooth Area Chart (Catmull-Rom) ──────────────────────────────────
  // Points: (x, y, valueLabel, dayLabel, isToday)
  const chartPts = [
    [42, 34, '95K',  'Mon 23', false],
    [99, 24, '110K', 'Tue 24', false],
    [157,39, '88K',  'Wed 25', false],
    [215,14, '125K', 'Thu 26', false],
    [273,10, '130K', 'Fri 27', false],
    [331,46, '78K',  'Sat 28', false],
    [389,14, '125K', 'Today',  true ],
  ];
  const smoothPath = 'M42,34 C51.5,32.3 79.8,23.2 99,24 C118.2,24.8 137.7,40.7 157,39 C176.3,37.3 195.7,18.8 215,14 C234.3,9.2 253.7,4.7 273,10 C292.3,15.3 311.7,45.3 331,46 C350.3,46.7 379.3,8.7 389,14';
  const areaChartSVG = `<svg viewBox="0 0 430 128" style="width:100%;height:148px">
    <defs>
      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#003366" stop-opacity="0.18"/>
        <stop offset="100%" stop-color="#003366" stop-opacity="0.01"/>
      </linearGradient>
      <linearGradient id="chartGradToday" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#22c55e" stop-opacity="0.28"/>
        <stop offset="100%" stop-color="#22c55e" stop-opacity="0.02"/>
      </linearGradient>
    </defs>
    ${[0, 25, 50, 75, 100].map(p => {
      const y = (10 + (1 - p / 100) * 90).toFixed(1);
      const lbl = p === 100 ? '130K' : p === 75 ? '98K' : p === 50 ? '65K' : p === 25 ? '33K' : '';
      return `<line x1="40" y1="${y}" x2="405" y2="${y}" stroke="#f3f4f6" stroke-width="${p === 0 ? 1 : 0.7}"/>
              <text x="36" y="${(parseFloat(y) + 3).toFixed(1)}" text-anchor="end" font-size="7" fill="#c8ccd6">${lbl}</text>`;
    }).join('')}
    <line x1="40" y1="17" x2="405" y2="17" stroke="#f59e0b" stroke-width="1.2" stroke-dasharray="5,4" opacity="0.8"/>
    <text x="408" y="20" font-size="7" fill="#f59e0b" font-weight="700">Target 120K</text>
    <line x1="40" y1="10" x2="40" y2="100" stroke="#e9ecef" stroke-width="1"/>
    <line x1="40" y1="100" x2="405" y2="100" stroke="#e9ecef" stroke-width="1"/>
    <path d="${smoothPath} L389,100 L42,100 Z" fill="url(#chartGrad)"/>
    <path d="M331,46 C350.3,46.7 379.3,8.7 389,14 L389,100 L331,100 Z" fill="url(#chartGradToday)" opacity="0.9"/>
    <path d="${smoothPath}" fill="none" stroke="#003366" stroke-width="2.2" stroke-linejoin="round"/>
    ${chartPts.map(([x, y, vl, dl, isT]) => `
      <circle cx="${x}" cy="${y}" r="${isT ? 5 : 3.5}" fill="${isT ? '#22c55e' : '#003366'}" stroke="#fff" stroke-width="2"/>
      <text x="${x}" y="${y - 9}" text-anchor="middle" font-size="7" fill="${isT ? '#16a34a' : '#003366'}" font-weight="700">${vl}</text>
      <text x="${x}" y="113" text-anchor="middle" font-size="7.5" fill="${isT ? '#22c55e' : '#9ca3af'}" font-weight="${isT ? '700' : '400'}">${dl}</text>`).join('')}
  </svg>`;

  // ─── Horizontal Mini Stock Bar ─────────────────────────────────────────
  const stockBar = (name, pct, color, extra) => `
    <div style="margin-bottom:10px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:3px">
        <span style="font-size:11px;font-weight:500">${name}</span>
        <div style="display:flex;align-items:center;gap:6px">
          ${extra ? `<span style="font-size:9.5px;color:var(--fg-muted)">${extra}</span>` : ''}
          <span style="font-size:9px;font-weight:700;padding:1px 6px;border-radius:20px;background:${color}15;color:${color}">${pct}%</span>
        </div>
      </div>
      <div style="height:5px;background:#f0f2f5;border-radius:6px;overflow:hidden">
        <div style="height:100%;width:${pct}%;background:linear-gradient(to right,${color},${color}cc);border-radius:6px;transition:width .7s"></div>
      </div>
    </div>`;

  // ─── KPI data ─────────────────────────────────────────────────────────
  const kpis = [
    { label: 'Sales Orders',   value: '47',       sub: '39 last week', trend: '+20.5%', up: true,  color: '#003366', bg: 'rgba(0,51,102,.07)', icon: 'bi-receipt-cutoff',      page: 'sales-order',    spark: [38,42,36,50,45,60,54,68,60,75] },
    { label: 'Units Today',    value: '1,24,800', sub: '1,14K yesterday',trend:'+9.5%', up: true,  color: '#22c55e', bg: '#f0fdf4',            icon: 'bi-gear-wide-connected', page: 'prod-tracking',  spark: [58,62,55,70,64,78,70,83,76,88] },
    { label: 'Cardstock Stock',     value: '48,600 kg',sub: '3 items low',  trend: '3 Low',  up: false, color: '#3b82f6', bg: '#eff6ff',            icon: 'bi-stack',               page: 'Cardstock-stock',     spark: [90,85,80,72,78,70,74,68,63,60] },
    { label: 'Open POs',       value: '18',       sub: '₹8.4L pending',trend: '4 Due',  up: false, color: '#8b5cf6', bg: '#f5f3ff',            icon: 'bi-file-earmark-check',  page: 'Cardstock-po',        spark: [20,28,24,34,30,38,35,42,40,46] },
    { label: 'Dispatch Ready', value: '4 orders', sub: '3 with vehicle',trend:'+33%',   up: true,  color: '#f59e0b', bg: '#fffbeb',            icon: 'bi-truck',               page: 'dispatch-queue', spark: [30,28,35,40,36,44,42,50,46,55] },
    { label: 'Receivable',     value: '₹14.2L',   sub: '4 overdue',    trend: '4 Due',  up: false, color: '#ef4444', bg: '#fef2f2',            icon: 'bi-cash-stack',          page: 'reports',        spark: [55,60,65,60,70,68,75,72,78,82] },
  ];

  ca.insertAdjacentHTML('beforeend', `
<style>
  @keyframes dashFadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
  @keyframes pulseRing { 0%,100%{Deck-shadow:0 0 0 0 rgba(239,68,68,.35)} 50%{Deck-shadow:0 0 0 7px rgba(239,68,68,0)} }
  @keyframes tickerScroll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
  .dash-fadein { animation: dashFadeUp .5s cubic-bezier(.22,1,.36,1) both; }
  .d1{animation-delay:.04s}.d2{animation-delay:.08s}.d3{animation-delay:.12s}
  .d4{animation-delay:.16s}.d5{animation-delay:.20s}.d6{animation-delay:.24s}
  .d7{animation-delay:.32s}.d8{animation-delay:.40s}.d9{animation-delay:.48s}
  .pkpi {
    background:#fff;
    border-radius:14px;
    border:1px solid rgba(0,0,0,.06);
    Deck-shadow:0 1px 3px rgba(0,0,0,.05),0 4px 16px rgba(0,0,0,.04);
    padding:16px;
    cursor:pointer;
    transition:transform .2s cubic-bezier(.22,1,.36,1),Deck-shadow .2s ease;
    position:relative;
    overflow:hidden;
  }
  .pkpi:hover { transform:translateY(-4px); Deck-shadow:0 12px 32px rgba(0,0,0,.12),0 4px 8px rgba(0,0,0,.06); }
  .pkpi::before { content:''; position:absolute; top:0;left:0;right:0; height:3px; background:var(--accent); border-radius:14px 14px 0 0; }
  .pkpi .ghost-icon { position:absolute;right:6px;top:10px;font-size:56px;opacity:.045;pointer-events:none;color:var(--accent);line-height:1 }
  .pcard {
    background:#fff;
    border-radius:14px;
    border:1px solid rgba(0,0,0,.06);
    Deck-shadow:0 1px 3px rgba(0,0,0,.05),0 4px 16px rgba(0,0,0,.04);
    overflow:hidden;
  }
  .pcard-head {
    display:flex;justify-content:space-between;align-items:center;
    padding:11px 15px;
    border-bottom:1px solid rgba(0,0,0,.055);
  }
  .pcard-title { font-size:12.5px;font-weight:700;color:var(--fg-default);display:flex;align-items:center;gap:6px }
  .pcard-body { padding:13px 15px }
  .alert-pulse { animation: pulseRing 2.2s ease-in-out infinite; }
  .inv-cell { border-radius:8px;padding:8px 6px;text-align:center;font-size:9.5px;font-weight:700;cursor:pointer;transition:transform .15s,Deck-shadow .15s }
  .inv-cell:hover { transform:scale(1.08);Deck-shadow:0 4px 12px rgba(0,0,0,.15) }
  .dcard { background:#fff;border:1px solid rgba(0,0,0,.07);border-radius:10px;padding:13px;transition:Deck-shadow .15s,transform .15s }
  .dcard:hover { Deck-shadow:0 6px 20px rgba(0,0,0,.1);transform:translateY(-1px) }
  .act-item { display:flex;gap:10px;padding:7px 0;border-bottom:1px solid rgba(0,0,0,.05);font-size:11px;align-items:flex-start }
  .act-item:last-child{border-bottom:none}
  .act-dot { width:8px;height:8px;border-radius:50%;flex-shrink:0;margin-top:3px }
  .stage-bar { height:8px;border-radius:4px;transition:width .6s }
  .ticker-wrap { overflow:hidden;white-space:nowrap }
  .ticker-inner { display:inline-block;animation:tickerScroll 22s linear infinite }
  .ticker-inner:hover { animation-play-state:paused }
</style>

<div class="page" id="page-dashboard">

  <!-- ═══ HEADER HERO ═══ -->
  <div style="background:linear-gradient(135deg,#001229 0%,#002855 55%,#003d7a 100%);border-radius:16px;padding:0;margin-bottom:16px;overflow:hidden;position:relative" class="dash-fadein d1">
    <!-- Dot pattern background -->
    <div style="position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,.06) 1px,transparent 1px);background-size:20px 20px;pointer-events:none"></div>
    <!-- Top info bar -->
    <div style="padding:16px 22px 10px;display:flex;justify-content:space-between;align-items:center;position:relative">
      <div>
        <div style="font-size:22px;font-weight:800;color:#fff;letter-spacing:-.3px">Good Morning, Mahendra 👋</div>
        <div style="font-size:11.5px;color:rgba(255,255,255,.55);margin-top:4px">
          Monday, 30 June 2026 &nbsp;·&nbsp; Indus Playing Card Pvt. Ltd.
        </div>
      </div>
      <div style="display:flex;gap:8px;align-items:center">
        <button style="background:rgba(255,255,255,.1);color:rgba(255,255,255,.85);border:1px solid rgba(255,255,255,.18);border-radius:8px;padding:6px 13px;font-size:11px;cursor:pointer;transition:background .15s" onmouseenter="this.style.background='rgba(255,255,255,.18)'" onmouseleave="this.style.background='rgba(255,255,255,.1)'" onclick="navigate('dashboard')">
          <i class="bi bi-arrow-clockwise"></i> Refresh
        </button>
        <button style="background:rgba(255,255,255,.1);color:rgba(255,255,255,.85);border:1px solid rgba(255,255,255,.18);border-radius:8px;padding:6px 13px;font-size:11px;cursor:pointer;transition:background .15s" onmouseenter="this.style.background='rgba(255,255,255,.18)'" onmouseleave="this.style.background='rgba(255,255,255,.1)'" onclick="navigate('kpi-dashboard')">
          <i class="bi bi-graph-up"></i> KPI View
        </button>
        <button style="background:#fff;color:#003366;border:none;border-radius:8px;padding:6px 14px;font-size:11px;font-weight:700;cursor:pointer;Deck-shadow:0 2px 8px rgba(0,0,0,.2);transition:Deck-shadow .15s" onmouseenter="this.style.boxShadow='0 4px 14px rgba(0,0,0,.3)'" onmouseleave="this.style.boxShadow='0 2px 8px rgba(0,0,0,.2)'">
          <i class="bi bi-download"></i> Export
        </button>
      </div>
    </div>
    <!-- Live ticker bar -->
    <div style="background:rgba(0,0,0,.25);padding:7px 22px;border-top:1px solid rgba(255,255,255,.07);position:relative">
      <div class="ticker-wrap">
        <div class="ticker-inner" style="color:rgba(255,255,255,.6);font-size:11px">
          &nbsp;&nbsp;&nbsp;
          <i class="bi bi-circle-fill" style="color:#22c55e;font-size:7px"></i>
          &nbsp;<b style="color:#fff">Production:</b> 1,24,800 units today — 84% efficiency &nbsp;|&nbsp;
          <i class="bi bi-circle-fill" style="color:#f59e0b;font-size:7px"></i>
          &nbsp;<b style="color:#fff">Alert:</b> Test Liner TL-160 below min stock — 480kg &nbsp;|&nbsp;
          <i class="bi bi-circle-fill" style="color:#22c55e;font-size:7px"></i>
          &nbsp;<b style="color:#fff">Dispatch:</b> 4 orders ready · SO-1278 Godrej 30K Decks &nbsp;|&nbsp;
          <i class="bi bi-circle-fill" style="color:#ef4444;font-size:7px"></i>
          &nbsp;<b style="color:#fff">Overdue:</b> Star Packaging ₹2.4L — 45 days &nbsp;|&nbsp;
          <i class="bi bi-circle-fill" style="color:#3b82f6;font-size:7px"></i>
          &nbsp;<b style="color:#fff">PO:</b> 18 open purchase orders · ₹8.4L value pending &nbsp;|&nbsp;
          <!-- repeat for seamless loop -->
          <i class="bi bi-circle-fill" style="color:#22c55e;font-size:7px"></i>
          &nbsp;<b style="color:#fff">Production:</b> 1,24,800 units today — 84% efficiency &nbsp;|&nbsp;
          <i class="bi bi-circle-fill" style="color:#f59e0b;font-size:7px"></i>
          &nbsp;<b style="color:#fff">Alert:</b> Test Liner TL-160 below min stock — 480kg &nbsp;|&nbsp;
          <i class="bi bi-circle-fill" style="color:#22c55e;font-size:7px"></i>
          &nbsp;<b style="color:#fff">Dispatch:</b> 4 orders ready · SO-1278 Godrej 30K Decks &nbsp;|&nbsp;
          <i class="bi bi-circle-fill" style="color:#ef4444;font-size:7px"></i>
          &nbsp;<b style="color:#fff">Overdue:</b> Star Packaging ₹2.4L — 45 days &nbsp;|&nbsp;
          <i class="bi bi-circle-fill" style="color:#3b82f6;font-size:7px"></i>
          &nbsp;<b style="color:#fff">PO:</b> 18 open purchase orders · ₹8.4L value pending
        </div>
      </div>
    </div>
    <!-- Stats row inside header -->
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:0;border-top:1px solid rgba(255,255,255,.07);position:relative">
      ${[
        ['Active Jobs','47','bi-receipt-cutoff','sales-order'],
        ['Plant Efficiency','84%','bi-speedometer2','prod-tracking'],
        ['Pending Dispatch','4 Orders','bi-truck','dispatch-queue'],
        ['Outstanding','₹14.2L','bi-cash-stack','reports'],
      ].map(([l, v, icon, pg], i) => `
      <div style="padding:12px 20px;border-right:${i < 3 ? '1px solid rgba(255,255,255,.07)' : 'none'};cursor:pointer;transition:background .15s"
        onmouseenter="this.style.background='rgba(255,255,255,.06)'" onmouseleave="this.style.background=''"
        onclick="navigate('${pg}')">
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px">
          <i class="bi ${icon}" style="color:rgba(255,255,255,.4);font-size:11px"></i>
          <span style="font-size:10px;color:rgba(255,255,255,.45);letter-spacing:.3px">${l.toUpperCase()}</span>
        </div>
        <div style="font-size:18px;font-weight:800;color:#fff">${v}</div>
      </div>`).join('')}
    </div>
  </div>

  <!-- ═══ KPI CARDS ═══ -->
  <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:12px;margin-bottom:14px">
    ${kpis.map((k, i) => `
    <div class="pkpi dash-fadein d${i + 2}" style="--accent:${k.color}" onclick="navigate('${k.page}')">
      <div class="ghost-icon"><i class="bi ${k.icon}"></i></div>
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px">
        <div style="width:34px;height:34px;background:${k.bg};border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0">
          <i class="bi ${k.icon}" style="color:${k.color};font-size:15px"></i>
        </div>
        <div style="background:${k.up ? '#f0fdf4' : '#fef2f2'};color:${k.up ? '#15803d' : '#dc2626'};border-radius:20px;padding:2px 7px;font-size:9.5px;font-weight:700;display:flex;align-items:center;gap:1px">
          <i class="bi bi-arrow-${k.up ? 'up' : 'down'}-short"></i>${k.trend}
        </div>
      </div>
      <div style="font-size:clamp(15px,1.6vw,22px);font-weight:800;color:var(--fg-default);line-height:1;margin-bottom:3px">${k.value}</div>
      <div style="font-size:10.5px;color:var(--fg-muted);margin-bottom:10px">${k.label}</div>
      <div style="border-top:1px solid rgba(0,0,0,.05);padding-top:9px;display:flex;align-items:center;justify-content:space-between;gap:6px">
        ${spark(k.spark, k.color)}
        <div style="font-size:9.5px;color:var(--fg-muted);text-align:right;line-height:1.4">${k.sub}</div>
      </div>
    </div>`).join('')}
  </div>

  <!-- ═══ CHARTS ROW ═══ -->
  <div style="display:grid;grid-template-columns:1.85fr 1fr;gap:14px;margin-bottom:14px">

    <!-- Area Chart: Production This Week -->
    <div class="pcard dash-fadein d7">
      <div class="pcard-head" style="background:linear-gradient(to right,rgba(0,51,102,.03),transparent)">
        <div class="pcard-title">
          <div style="width:28px;height:28px;background:rgba(0,51,102,.08);border-radius:8px;display:flex;align-items:center;justify-content:center">
            <i class="bi bi-area-chart-fill" style="color:#003366;font-size:12px"></i>
          </div>
          Production Output — This Week
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          <div style="display:flex;align-items:center;gap:5px;font-size:10px;color:var(--fg-muted)">
            <span style="width:24px;height:2.5px;background:#003366;border-radius:2px;display:inline-block"></span>Actual
            <span style="width:16px;height:1.5px;background:#f59e0b;border-radius:2px;display:inline-block;margin-left:6px;border-bottom:1px dashed #f59e0b"></span>Target 120K
            <span style="width:12px;height:10px;background:rgba(34,197,94,.25);border-radius:2px;display:inline-block;margin-left:6px"></span>Today
          </div>
          <button class="btn btn-ghost btn-sm" style="font-size:10px;padding:4px 8px" onclick="navigate('prod-tracking')">Live Board <i class="bi bi-arrow-right"></i></button>
        </div>
      </div>
      <div style="padding:12px 16px 8px">
        ${areaChartSVG}
        <div style="display:flex;justify-content:space-between;margin-top:6px;padding-top:8px;border-top:1px solid rgba(0,0,0,.05)">
          ${[['Week Total','7,51,600 units','#003366'],['Peak Day','1,30,000 (Fri)','#22c55e'],['Lowest','78,000 (Sat)','#f59e0b'],['Today So Far','1,24,800','#22c55e']].map(([l,v,c])=>`
          <div style="text-align:center">
            <div style="font-size:12px;font-weight:800;color:${c}">${v}</div>
            <div style="font-size:9px;color:var(--fg-muted)">${l}</div>
          </div>`).join('')}
        </div>
      </div>
    </div>

    <!-- Plant Efficiency Rings -->
    <div class="pcard dash-fadein d8">
      <div class="pcard-head">
        <div class="pcard-title">
          <div style="width:28px;height:28px;background:#f0fdf4;border-radius:8px;display:flex;align-items:center;justify-content:center">
            <i class="bi bi-speedometer2" style="color:#22c55e;font-size:12px"></i>
          </div>
          Plant Efficiency
        </div>
        <button class="btn btn-ghost btn-sm" style="font-size:10px;padding:4px 8px" onclick="navigate('wip')">WIP <i class="bi bi-arrow-right"></i></button>
      </div>
      <div style="padding:14px 12px">
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;place-items:center;margin-bottom:10px">
          ${ring(88,'#22c55e','Playing Card')}
          ${ring(74,'#f59e0b','Printing')}
          ${ring(96,'#22c55e','Collation')}
          ${ring(62,'#ef4444','Varnishing')}
          ${ring(84,'#003366','Overall')}
          ${ring(95,'#22c55e','Punching')}
        </div>
        <div style="background:#fff7ed;border:1px solid #fed7aa;border-radius:8px;padding:8px 11px;font-size:10.5px;display:flex;align-items:center;gap:8px">
          <div style="width:28px;height:28px;background:#ef444415;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0">
            <i class="bi bi-exclamation-triangle" style="color:#ef4444;font-size:12px"></i>
          </div>
          <div>
            <div style="font-weight:700;color:#92400e">Varnishing at 62%</div>
            <div style="color:#b45309;font-size:9.5px">M-03 downtime 2.4 hrs — JC-2026-089 delayed</div>
          </div>
        </div>
        <button class="btn btn-ghost btn-sm" style="width:100%;margin-top:9px;justify-content:center;font-size:10.5px;border-radius:8px" onclick="navigate('prod-tracking')">
          <i class="bi bi-bar-chart-steps"></i> View Full Production Board
        </button>
      </div>
    </div>

  </div>

  <!-- ═══ INVENTORY + PURCHASE + DISPATCH ═══ -->
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;margin-bottom:14px">

    <!-- Inventory & Store -->
    <div class="pcard dash-fadein d7">
      <div class="pcard-head">
        <div class="pcard-title">
          <div style="width:28px;height:28px;background:#f5f3ff;border-radius:8px;display:flex;align-items:center;justify-content:center">
            <i class="bi bi-Decks" style="color:#8b5cf6;font-size:12px"></i>
          </div>
          Inventory &amp; Store
        </div>
        <button class="btn btn-ghost btn-sm" style="font-size:10px;padding:4px 8px" onclick="navigate('Cardstock-stock')">All Stock <i class="bi bi-arrow-right"></i></button>
      </div>
      <!-- Inventory heatmap -->
      <div style="padding:12px 14px">
        <div style="font-size:9.5px;font-weight:600;color:var(--fg-muted);text-transform:uppercase;letter-spacing:.4px;margin-bottom:8px">Material Stock Health</div>
        ${stockBar('Art Paper Liner 150 GSM', 82, '#22c55e', '8,200 kg')}
        ${stockBar('Finish Medium 120 GSM',   65, '#22c55e', '6,500 kg')}
        ${stockBar('Test Liner 160 GSM',  24, '#ef4444', '480 kg ⚠')}
        ${stockBar('WL 100 GSM',          53, '#f59e0b', '2,100 kg')}
        ${stockBar('Board 250 GSM',       60, '#22c55e', '500 sht')}
        <!-- Location heatmap -->
        <div style="font-size:9.5px;font-weight:600;color:var(--fg-muted);text-transform:uppercase;letter-spacing:.4px;margin:12px 0 7px">Warehouse Utilization</div>
        <div style="display:grid;grid-template-columns:auto 1fr 1fr 1fr;gap:4px;align-items:center">
          <div style="font-size:8.5px;color:var(--fg-muted)"></div>
          ${['Godown A','Godown B','Floor'].map(w=>`<div style="font-size:8.5px;font-weight:600;color:var(--fg-muted);text-align:center">${w}</div>`).join('')}
          ${[
            ['KR-150',[[82,'#22c55e'],[45,'#f59e0b'],[8,'#3b82f6']]],
            ['Finish-120',[[65,'#22c55e'],[55,'#22c55e'],[29,'#f59e0b']]],
            ['TL-160',[[24,'#ef4444'],[0,'#e5e7eb'],[10,'#3b82f6']]],
            ['WL-100',[[53,'#f59e0b'],[30,'#f59e0b'],[5,'#3b82f6']]],
          ].map(([code, cells]) => `
            <div style="font-size:8.5px;font-weight:600;color:var(--primary);font-family:monospace">${code}</div>
            ${cells.map(([pct, color]) => pct === 0
              ? `<div style="background:#f3f4f6;border-radius:5px;height:22px;display:flex;align-items:center;justify-content:center;font-size:8px;color:#c0c0c0">—</div>`
              : `<div class="inv-cell" style="background:${color}18;border:1px solid ${color}35;color:${color};height:22px;display:flex;align-items:center;justify-content:center" onclick="navigate('Cardstock-stock')">${pct}%</div>`
            ).join('')}
          `).join('')}
        </div>
        <div style="display:flex;gap:7px;margin-top:12px">
          <button class="btn btn-ghost btn-sm" style="flex:1;justify-content:center;font-size:10px;border-radius:8px" onclick="navigate('Cardstock-floor-stock')">
            <i class="bi bi-grid-3x2"></i> Floor Stock
          </button>
          <button class="btn btn-ghost btn-sm" style="flex:1;justify-content:center;font-size:10px;border-radius:8px" onclick="navigate('Cardstock-req')">
            <i class="bi bi-plus"></i> Raise Req.
          </button>
        </div>
      </div>
    </div>

    <!-- Purchase Overview -->
    <div class="pcard dash-fadein d8">
      <div class="pcard-head">
        <div class="pcard-title">
          <div style="width:28px;height:28px;background:#fffbeb;border-radius:8px;display:flex;align-items:center;justify-content:center">
            <i class="bi bi-cart-check-fill" style="color:#f59e0b;font-size:12px"></i>
          </div>
          Purchase Overview
        </div>
        <button class="btn btn-ghost btn-sm" style="font-size:10px;padding:4px 8px" onclick="navigate('Cardstock-po')">All POs <i class="bi bi-arrow-right"></i></button>
      </div>
      <div style="padding:13px 14px">
        <!-- Pipeline stages -->
        <div style="font-size:9.5px;font-weight:600;color:var(--fg-muted);text-transform:uppercase;letter-spacing:.4px;margin-bottom:9px">PO Pipeline</div>
        ${[
          ['Requisitions','28','#8b5cf6',100,'Cardstock-req'],
          ['PO Created','18','#3b82f6',64,'Cardstock-po'],
          ['Partial Rcvd','8','#f59e0b',29,'Cardstock-receipt'],
          ['Fully Received','6','#22c55e',21,'Cardstock-receipt'],
          ['PO Closed','4','#64748b',14,'Cardstock-po-close'],
        ].map(([stage, count, color, pct, pg]) => `
        <div style="margin-bottom:9px;cursor:pointer" onclick="navigate('${pg}')">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:3px">
            <span style="font-size:11px;font-weight:500">${stage}</span>
            <span style="font-size:11px;font-weight:700;color:${color}">${count}</span>
          </div>
          <div style="height:6px;background:#f0f2f5;border-radius:4px;overflow:hidden">
            <div class="stage-bar" style="width:${pct}%;background:linear-gradient(to right,${color},${color}aa)"></div>
          </div>
        </div>`).join('')}
        <!-- Overdue alert -->
        <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:9px 11px;display:flex;align-items:center;gap:8px;margin-top:4px;cursor:pointer" onclick="navigate('Cardstock-po-close')">
          <div class="alert-pulse" style="width:8px;height:8px;background:#ef4444;border-radius:50%;flex-shrink:0"></div>
          <div style="font-size:10.5px">
            <b style="color:#dc2626">4 POs overdue</b>
            <span style="color:#b91c1c"> — ₹4.2L at risk. Review & close.</span>
          </div>
        </div>
        <!-- Summary row -->
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:7px;margin-top:11px">
          ${[['₹8.4L','Pending Value','#f59e0b'],['₹4.1L','Received','#22c55e'],['4,500 kg','Pending GRN','#3b82f6']].map(([v,l,c])=>`
          <div style="background:${c}08;border:1px solid ${c}20;border-radius:8px;padding:8px 6px;text-align:center">
            <div style="font-size:13px;font-weight:800;color:${c}">${v}</div>
            <div style="font-size:8.5px;color:var(--fg-muted)">${l}</div>
          </div>`).join('')}
        </div>
        <div style="display:flex;gap:7px;margin-top:10px">
          <button class="btn btn-ghost btn-sm" style="flex:1;justify-content:center;font-size:10px;border-radius:8px" onclick="navigate('Cardstock-receipt')">
            <i class="bi bi-truck"></i> GRN Entry
          </button>
          <button class="btn btn-ghost btn-sm" style="flex:1;justify-content:center;font-size:10px;border-radius:8px" onclick="navigate('Cardstock-req')">
            <i class="bi bi-plus"></i> New Req.
          </button>
        </div>
      </div>
    </div>

    <!-- Dispatch Queue -->
    <div class="pcard dash-fadein d9">
      <div class="pcard-head">
        <div class="pcard-title">
          <div style="width:28px;height:28px;background:#f0fdf4;border-radius:8px;display:flex;align-items:center;justify-content:center">
            <i class="bi bi-truck" style="color:#22c55e;font-size:12px"></i>
          </div>
          Dispatch Queue
        </div>
        <button class="btn btn-ghost btn-sm" style="font-size:10px;padding:4px 8px" onclick="navigate('dispatch-queue')">All Orders <i class="bi bi-arrow-right"></i></button>
      </div>
      <div style="padding:12px 14px">
        <!-- Summary mini -->
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-bottom:12px">
          ${[['Ready','4','#22c55e','dispatch-queue'],['Challan Done','8','#3b82f6','challan'],['Delayed','3','#ef4444','dispatch-queue']].map(([l,v,c,pg])=>`
          <div style="background:${c}0d;border:1px solid ${c}25;border-radius:8px;padding:9px 6px;text-align:center;cursor:pointer" onclick="navigate('${pg}')">
            <div style="font-size:18px;font-weight:800;color:${c};line-height:1">${v}</div>
            <div style="font-size:9px;color:var(--fg-muted);margin-top:2px">${l}</div>
          </div>`).join('')}
        </div>
        <!-- Order cards -->
        <div style="display:flex;flex-direction:column;gap:7px">
          ${[
            ['SO-1278','Godrej','30,000 Decks','MH12 AB 1234','assigned','#22c55e'],
            ['SO-1279','Dabur','45,000 Decks','GJ05 CD 5678','assigned','#22c55e'],
            ['SO-1280','Asian Paints','18,500 Decks',null,'pending','#ef4444'],
            ['SO-1281','Nestle','22,000 Decks',null,'pending','#ef4444'],
          ].map(([so, cust, qty, veh, state, sc]) => `
          <div class="dcard">
            <div style="display:flex;justify-content:space-between;align-items:flex-start">
              <div>
                <div style="font-size:11px;font-weight:700;color:var(--primary)">${so} — ${cust}</div>
                <div style="font-size:10px;color:var(--fg-muted);margin-top:2px">${qty}</div>
              </div>
              <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px">
                ${veh
                  ? `<div style="font-size:9px;background:#f0fdf4;color:#15803d;border:1px solid #bbf7d0;border-radius:20px;padding:2px 7px;font-weight:600"><i class="bi bi-truck" style="font-size:8px"></i> ${veh}</div>
                     <button class="btn btn-save btn-sm" style="font-size:9.5px;padding:3px 9px;border-radius:7px" onclick="openModal('modal-challan-quick')">Challan</button>`
                  : `<div style="font-size:9px;background:#fef2f2;color:#dc2626;border:1px solid #fecaca;border-radius:20px;padding:2px 7px;font-weight:600">Unassigned</div>
                     <button class="btn btn-create btn-sm" style="font-size:9.5px;padding:3px 9px;border-radius:7px" onclick="openModal('modal-dispatch-assign')">Assign</button>`}
              </div>
            </div>
          </div>`).join('')}
        </div>
      </div>
    </div>

  </div>

  <!-- ═══ PRODUCTION BOARD + ALERTS ═══ -->
  <div style="display:grid;grid-template-columns:1.65fr 1fr;gap:14px;margin-bottom:14px">

    <!-- Production Board -->
    <div class="pcard dash-fadein d7">
      <div class="pcard-head" style="background:linear-gradient(to right,rgba(0,51,102,.03),transparent)">
        <div class="pcard-title">
          <div style="width:28px;height:28px;background:rgba(0,51,102,.08);border-radius:8px;display:flex;align-items:center;justify-content:center">
            <i class="bi bi-bar-chart-steps" style="color:#003366;font-size:12px"></i>
          </div>
          Production Board — Today
        </div>
        <button class="btn btn-ghost btn-sm" style="font-size:10px;padding:4px 8px" onclick="navigate('prod-tracking')">Live Board <i class="bi bi-arrow-right"></i></button>
      </div>
      <div style="padding:0">
        <table class="data-table" style="font-size:11.5px">
          <thead>
            <tr style="background:rgba(0,51,102,.025)">
              <th>Department</th>
              <th style="text-align:center">Pending</th>
              <th style="text-align:center">Running</th>
              <th style="text-align:center">Done</th>
              <th style="text-align:center">Delayed</th>
              <th style="min-width:130px">Efficiency</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${[
              ['Playing Card', 4, 2, 18, 1, 88],
              ['Printing',    6, 3, 14, 2, 74],
              ['Collation',   3, 2, 22, 0, 96],
              ['Varnishing',      5, 1, 10, 1, 62],
              ['Punching',    2, 1,  8, 0, 91],
              ['Die Cutting', 1, 1,  6, 0, 95],
            ].map(([dept, pend, run, done, delay, eff]) => {
              const ec = eff >= 85 ? '#22c55e' : eff >= 70 ? '#f59e0b' : '#ef4444';
              const ef = eff >= 85 ? 'success' : eff >= 70 ? 'warning' : '';
              const sl = eff >= 85 ? 'On Track' : eff >= 70 ? 'Watch' : 'Action Reqd';
              const sc = eff >= 85 ? 'green' : eff >= 70 ? 'orange' : 'red';
              return `<tr onclick="navigate('prod-tracking')" style="cursor:pointer">
                <td><b>${dept}</b></td>
                <td style="text-align:center"><span class="tag tag-gold" style="font-size:10px">${pend}</span></td>
                <td style="text-align:center"><span class="tag tag-blue" style="font-size:10px">${run}</span></td>
                <td style="text-align:center"><span class="tag tag-green" style="font-size:10px">${done}</span></td>
                <td style="text-align:center"><span class="tag tag-${delay ? 'red' : 'gray'}" style="font-size:10px">${delay}</span></td>
                <td>
                  <div style="display:flex;align-items:center;gap:6px">
                    <div class="progress-bar" style="width:74px"><div class="progress-fill ${ef}" style="width:${eff}%"></div></div>
                    <span style="font-size:11px;color:${ec};font-weight:800">${eff}%</span>
                  </div>
                </td>
                <td><span class="tag tag-${sc}" style="font-size:10px">${sl}</span></td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
        <!-- Priority orders strip -->
        <div style="padding:10px 14px;background:rgba(0,51,102,.02);border-top:1px solid rgba(0,0,0,.05)">
          <div style="font-size:9.5px;font-weight:700;color:var(--fg-muted);text-transform:uppercase;letter-spacing:.4px;margin-bottom:7px">Priority Orders</div>
          <div style="display:flex;flex-wrap:wrap;gap:6px">
            ${[
              ['SO-1284','Amul','Today','#ef4444'],
              ['SO-1285','Metro','30 Jun','#3b82f6'],
              ['SO-1286','Patanjali','1 Jul','#3b82f6'],
              ['SO-1287','ITC Ltd','3 Jul','#f59e0b'],
              ['SO-1288','HUL','5 Jul','#f59e0b'],
            ].map(([so, cust, due, sc]) => `
            <div style="background:#fff;border:1px solid ${sc}30;border-left:3px solid ${sc};border-radius:7px;padding:6px 10px;font-size:10px;cursor:pointer;min-width:90px"
              onclick="navigate('sales-order')">
              <div style="font-weight:700;color:var(--primary)">${so}</div>
              <div style="color:var(--fg-muted);margin-top:1px">${cust}</div>
              <div style="color:${sc};font-weight:600;margin-top:1px">Due: ${due}</div>
            </div>`).join('')}
          </div>
        </div>
      </div>
    </div>

    <!-- Alerts & Activity Feed -->
    <div class="pcard dash-fadein d8" style="display:flex;flex-direction:column">
      <div class="pcard-head">
        <div class="pcard-title">
          <div style="width:28px;height:28px;background:#fef2f2;border-radius:8px;display:flex;align-items:center;justify-content:center">
            <i class="bi bi-bell-fill" style="color:#ef4444;font-size:12px"></i>
          </div>
          Alerts &amp; Activity
        </div>
        <div style="display:flex;gap:5px">
          <span style="background:#fef2f2;color:#dc2626;border:1px solid #fecaca;border-radius:20px;padding:2px 8px;font-size:9.5px;font-weight:700">3 Critical</span>
          <span style="background:#fffbeb;color:#d97706;border:1px solid #fde68a;border-radius:20px;padding:2px 8px;font-size:9.5px;font-weight:700">4 Warn</span>
        </div>
      </div>
      <div style="padding:8px 12px;flex:1;overflow-y:auto;max-height:400px">
        ${[
          { type:'error',   icon:'bi-exclamation-octagon-fill', title:'Low Stock Critical', msg:'Test Liner TL-160 — 480kg vs 500kg min. Raise PO immediately.', page:'Cardstock-req',       time:'9:38 AM' },
          { type:'error',   icon:'bi-x-circle-fill',            title:'Machine Downtime',   msg:'Varnishing M-03 — 2.4hrs downtime. JC-2026-089 delayed 4hrs.',    page:'job-card',       time:'8:52 AM' },
          { type:'error',   icon:'bi-cash-coin',                title:'Payment Overdue',    msg:'Star Packaging ₹2.4L outstanding — 45 days. Escalate now.',    page:'reports',        time:'8:30 AM' },
          { type:'warning', icon:'bi-truck',                    title:'Dispatch Pending',   msg:'3 orders ready but no vehicles assigned yet.',                   page:'dispatch-queue', time:'9:15 AM' },
          { type:'warning', icon:'bi-clock-fill',               title:'Orders Due Today',   msg:'5 orders due today — 2 not in production yet.',                  page:'sales-order',    time:'9:00 AM' },
          { type:'warning', icon:'bi-inbox-fill',               title:'GRN Pending',        msg:'RP-2026-082 Ballarpur 2,500 kg — receipt not done yet.',         page:'Cardstock-receipt',   time:'Yesterday' },
          { type:'info',    icon:'bi-clipboard-check',          title:'Verification Due',   msg:'BIL-JUN-3 batch (845kg) — physical verify pending.',             page:'Cardstock-verification', time:'Yesterday' },
          { type:'info',    icon:'bi-bell',                     title:'Credit Terms',       msg:'Metro Cash SO-1285 — 30 day credit expiring in 2 days.',         page:'reports',        time:'2 days ago' },
        ].map(a => {
          const dotColor = a.type === 'error' ? '#ef4444' : a.type === 'warning' ? '#f59e0b' : '#3b82f6';
          const bgColor  = a.type === 'error' ? '#fef2f2' : a.type === 'warning' ? '#fffbeb' : '#eff6ff';
          const bdColor  = a.type === 'error' ? '#fecaca' : a.type === 'warning' ? '#fde68a' : '#bfdbfe';
          return `<div style="background:${bgColor};border:1px solid ${bdColor};border-radius:9px;padding:9px 11px;cursor:pointer;margin-bottom:6px;transition:Deck-shadow .15s"
            onclick="navigate('${a.page}')"
            onmouseenter="this.style.boxShadow='0 3px 10px rgba(0,0,0,.08)'" onmouseleave="this.style.boxShadow=''">
            <div style="display:flex;align-items:flex-start;gap:8px">
              <i class="bi ${a.icon}" style="color:${dotColor};font-size:13px;flex-shrink:0;margin-top:1px"></i>
              <div style="flex:1">
                <div style="font-size:11px;font-weight:700;color:var(--fg-default)">${a.title}</div>
                <div style="font-size:10px;color:var(--fg-muted);margin-top:2px;line-height:1.4">${a.msg}</div>
              </div>
              <div style="font-size:9px;color:var(--fg-muted);flex-shrink:0;margin-top:2px">${a.time}</div>
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>

  </div>

  <!-- ═══ QUICK ACTIONS STRIP ═══ -->
  <div class="pcard dash-fadein d9" style="margin-bottom:0">
    <div style="padding:12px 16px;display:flex;align-items:center;gap:14px">
      <div style="font-size:10px;font-weight:700;color:var(--fg-muted);text-transform:uppercase;letter-spacing:.5px;white-space:nowrap">Quick Actions</div>
      <div style="flex:1;display:flex;gap:8px;flex-wrap:wrap">
        ${[
          ['bi-plus-circle-fill','New Cardstock Req.','#003366','nav','Cardstock-req'],
          ['bi-file-earmark-check-fill','New PO','#8b5cf6','nav','Cardstock-po'],
          ['bi-Deck-arrow-up-right','Issue Reels','#3b82f6','nav','Cardstock-issue'],
          ['bi-journal-plus','New Job Card','#22c55e','nav','job-card'],
          ['bi-truck','Quick Challan','#f59e0b','modal','modal-challan-quick'],
          ['bi-Decks','Finished Goods','#003366','nav','finished-goods'],
          ['bi-clipboard-data','PPC Board','#8b5cf6','nav','ppc'],
          ['bi-graph-up-arrow','Reports','#ef4444','nav','reports'],
        ].map(([icon, label, color, type, target]) => `
        <button style="display:flex;align-items:center;gap:6px;padding:7px 13px;border-radius:9px;border:1px solid ${color}28;background:${color}0a;color:var(--fg-default);font-size:11px;cursor:pointer;transition:all .15s;font-weight:500"
          onmouseenter="this.style.background='${color}18';this.style.borderColor='${color}55';this.style.transform='translateY(-1px)'"
          onmouseleave="this.style.background='${color}0a';this.style.borderColor='${color}28';this.style.transform=''"
          onclick="${type === 'nav' ? `navigate('${target}')` : `openModal('${target}')`}">
          <i class="bi ${icon}" style="color:${color};font-size:13px"></i>${label}
        </button>`).join('')}
      </div>
    </div>
  </div>

</div>

<!-- ════ MODALS ════ -->

<div class="modal-overlay hidden" id="modal-challan-quick">
  <div class="modal modal-md">
    <div class="modal-header">
      <div class="modal-icon" style="background:#fff7ed;color:#c2410c"><i class="bi bi-truck"></i></div>
      <div><div class="modal-title">Quick Challan</div><div class="modal-sub">Generate delivery challan for dispatched order</div></div>
      <button class="modal-close" onclick="closeModal('modal-challan-quick')"><i class="bi bi-x"></i></button>
    </div>
    <div class="modal-body">
      <div class="form-row cols-2">
        <div class="field-group"><label class="field-label required">Sales Order</label>
          <select class="form-select"><option>SO-1278 — Godrej — 30,000 Decks</option><option>SO-1279 — Dabur — 45,000 Decks</option></select>
        </div>
        <div class="field-group"><label class="field-label required">Challan Date</label>
          <input class="form-input" type="date" value="2026-06-30" />
        </div>
      </div>
      <div class="form-row cols-2">
        <div class="field-group"><label class="field-label required">Vehicle No</label>
          <select class="form-select"><option>MH12 AB 1234 — TATA 407</option><option>GJ05 CD 5678 — Eicher 14 ft</option></select>
        </div>
        <div class="field-group"><label class="field-label">Driver Name</label>
          <input class="form-input" value="Ramesh Driver" />
        </div>
      </div>
      <div class="form-row cols-2">
        <div class="field-group"><label class="field-label required">Dispatch Qty (Decks)</label>
          <input class="form-input" type="number" value="30000" />
        </div>
        <div class="field-group"><label class="field-label">Transporter</label>
          <input class="form-input" value="Mahindra Logistics" />
        </div>
      </div>
      <div class="field-group"><label class="field-label">Delivery Address</label>
        <input class="form-input" placeholder="Consignee delivery address..." />
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal('modal-challan-quick')">Cancel</button>
      <button class="btn btn-print"><i class="bi bi-printer"></i> Print Challan</button>
      <button class="btn btn-save"><i class="bi bi-check-lg"></i> Save Challan</button>
    </div>
  </div>
</div>

<div class="modal-overlay hidden" id="modal-dispatch-assign">
  <div class="modal modal-sm">
    <div class="modal-header">
      <div class="modal-icon"><i class="bi bi-truck"></i></div>
      <div><div class="modal-title">Assign Vehicle</div><div class="modal-sub">SO-1280 — Asian Paints — 18,500 Decks</div></div>
      <button class="modal-close" onclick="closeModal('modal-dispatch-assign')"><i class="bi bi-x"></i></button>
    </div>
    <div class="modal-body">
      <div class="field-group">
        <label class="field-label required">Select Vehicle</label>
        <select class="form-select">
          <option>— Select —</option>
          <option>MH12 EF 9012 — TATA 407</option>
          <option>GJ05 GH 3456 — Eicher 14 ft</option>
          <option>RJ14 IJ 7890 — TATA Ace</option>
        </select>
      </div>
      <div class="field-group">
        <label class="field-label required">Driver Name</label>
        <input class="form-input" placeholder="Driver name" />
      </div>
      <div class="field-group">
        <label class="field-label">Expected Delivery Date</label>
        <input class="form-input" type="date" value="2026-06-30" />
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal('modal-dispatch-assign')">Cancel</button>
      <button class="btn btn-save">Assign &amp; Proceed</button>
    </div>
  </div>
</div>
`);
});
