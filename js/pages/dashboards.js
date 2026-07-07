document.addEventListener('DOMContentLoaded', () => {
  const ca = document.getElementById('contentArea');

  // ─── SHARED HELPERS ────────────────────────────────────────────────────────

  const kc = (icon, color, bg, label, val, trend, up, page = 'dashboard') => `
    <div onclick="navigate('${page}')" onmouseenter="this.style.transform='translateY(-3px)';this.style.boxShadow='0 10px 28px rgba(0,0,0,.12)'" onmouseleave="this.style.transform='';this.style.boxShadow='0 1px 4px rgba(0,0,0,.06)'"
      style="background:#fff;border-radius:12px;border:1px solid rgba(0,0,0,.06);Deck-shadow:0 1px 4px rgba(0,0,0,.06);padding:16px;cursor:pointer;transition:transform .2s,Deck-shadow .2s;position:relative;overflow:hidden;border-top:3px solid ${color}">
      <div style="position:absolute;right:4px;top:6px;font-size:52px;color:${color};opacity:.05;pointer-events:none"><i class="bi ${icon}"></i></div>
      <div style="width:34px;height:34px;background:${bg};border-radius:9px;display:flex;align-items:center;justify-content:center;margin-bottom:12px;border:1px solid ${color}22">
        <i class="bi ${icon}" style="color:${color};font-size:15px"></i>
      </div>
      <div style="font-size:clamp(16px,1.8vw,24px);font-weight:800;color:#111;line-height:1.1">${val}</div>
      <div style="font-size:10.5px;color:#6b7280;margin-top:4px;margin-bottom:10px;font-weight:500">${label}</div>
      <div style="display:inline-flex;align-items:center;gap:2px;padding:2px 8px;border-radius:20px;font-size:9.5px;font-weight:700;background:${up ? '#f0fdf4' : '#fef2f2'};color:${up ? '#15803d' : '#dc2626'}">
        <i class="bi bi-arrow-${up ? 'up' : 'down'}-short"></i>${trend}
      </div>
    </div>`;

  const ph = (icon, color, title, lnk = '', lpg = '') => `
    <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 15px;border-bottom:1px solid rgba(0,0,0,.05);background:linear-gradient(to right,${color}08,transparent)">
      <div style="display:flex;align-items:center;gap:8px;font-size:12.5px;font-weight:700;color:#111">
        <div style="width:28px;height:28px;background:${color}15;border-radius:7px;display:flex;align-items:center;justify-content:center">
          <i class="bi ${icon}" style="color:${color};font-size:12px"></i>
        </div>${title}
      </div>
      ${lpg ? `<button class="btn btn-ghost btn-sm" style="font-size:10px;padding:4px 10px" onclick="navigate('${lpg}')">${lnk} <i class="bi bi-arrow-right"></i></button>` : ''}
    </div>`;

  const hb = (label, pct, color, note = '') => `
    <div style="margin-bottom:10px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:3px">
        <span style="font-size:11px;font-weight:500;color:#374151">${label}</span>
        <div style="display:flex;gap:6px;align-items:center">
          ${note ? `<span style="font-size:9.5px;color:#9ca3af">${note}</span>` : ''}
          <span style="font-size:9px;font-weight:700;padding:1px 6px;border-radius:20px;background:${color}18;color:${color}">${pct}%</span>
        </div>
      </div>
      <div style="height:6px;background:#f1f3f5;border-radius:4px;overflow:hidden">
        <div style="height:100%;width:${pct}%;background:linear-gradient(to right,${color},${color}bb);border-radius:4px;transition:width .6s ease"></div>
      </div>
    </div>`;

  const rg = (pct, color, label, sub = '') => {
    const c = pct < 65 ? '#ef4444' : pct < 78 ? '#f59e0b' : color;
    return `<div style="text-align:center;padding:6px 4px">
      <svg viewBox="0 0 36 36" width="62" height="62">
        <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f0f0f0" stroke-width="3.2"/>
        <circle cx="18" cy="18" r="15.915" fill="none" stroke="${c}" stroke-width="3.2"
          stroke-dasharray="${pct} ${100 - pct}" stroke-dashoffset="25" stroke-linecap="round"/>
        <text x="18" y="18" text-anchor="middle" dominant-baseline="central" font-size="7.5" font-weight="800" fill="${c}">${pct}%</text>
      </svg>
      <div style="font-size:9px;color:#374151;font-weight:600;line-height:1.3">${label}</div>
      ${sub ? `<div style="font-size:8.5px;color:#9ca3af">${sub}</div>` : ''}
    </div>`;
  };

  const dhdr = (icon, title, sub, g1, g2, actions, statsHtml = '') => `
    <div style="background:linear-gradient(135deg,${g1} 0%,${g2} 100%);border-radius:14px;padding:18px 22px;margin-bottom:16px;position:relative;overflow:hidden">
      <div style="position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,.08) 1px,transparent 1px);background-size:20px 20px;pointer-events:none"></div>
      <div style="display:flex;justify-content:space-between;align-items:center;position:relative">
        <div style="display:flex;align-items:center;gap:13px">
          <div style="width:48px;height:48px;background:rgba(255,255,255,.15);border-radius:13px;display:flex;align-items:center;justify-content:center;border:1px solid rgba(255,255,255,.25);Deck-shadow:0 2px 8px rgba(0,0,0,.15)">
            <i class="bi ${icon}" style="color:#fff;font-size:22px"></i>
          </div>
          <div>
            <div style="font-size:19px;font-weight:800;color:#fff;letter-spacing:-.3px">${title}</div>
            <div style="font-size:11px;color:rgba(255,255,255,.6);margin-top:2px">${sub}</div>
          </div>
        </div>
        <div style="display:flex;gap:8px">${actions}</div>
      </div>
      ${statsHtml ? `<div style="display:flex;gap:0;border-top:1px solid rgba(255,255,255,.13);margin-top:14px;padding-top:14px">${statsHtml}</div>` : ''}
    </div>`;

  const hs = (label, val, isLast = false) =>
    `<div style="flex:1;${isLast ? '' : 'border-right:1px solid rgba(255,255,255,.12);'}padding-right:${isLast ? '0' : '18px'};margin-right:${isLast ? '0' : '18px'}">
      <div style="font-size:9.5px;color:rgba(255,255,255,.5);text-transform:uppercase;letter-spacing:.5px">${label}</div>
      <div style="font-size:18px;font-weight:800;color:#fff;margin-top:3px">${val}</div>
    </div>`;

  const dl = (items) =>
    `<div style="display:flex;gap:8px;flex-wrap:wrap;padding:10px 14px;border-top:1px solid rgba(0,0,0,.05);background:rgba(0,0,0,.01)">
      <span style="font-size:9.5px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:.4px;align-self:center">Jump to:</span>
      ${items.map(([label, page, icon = 'bi-arrow-right']) => `<button class="btn btn-ghost btn-sm" style="font-size:10.5px;padding:4px 11px;border-radius:8px" onclick="navigate('${page}')"><i class="bi ${icon}"></i> ${label}</button>`).join('')}
    </div>`;

  const card = (inner) =>
    `<div style="background:#fff;border-radius:12px;border:1px solid rgba(0,0,0,.06);Deck-shadow:0 1px 4px rgba(0,0,0,.06);overflow:hidden">${inner}</div>`;

  const alertRow = (icon, color, msg, sub) =>
    `<div style="display:flex;align-items:flex-start;gap:10px;padding:9px 14px;border-bottom:1px solid #f9f9f9">
      <div style="width:28px;height:28px;background:${color}15;border-radius:8px;flex-shrink:0;display:flex;align-items:center;justify-content:center;margin-top:1px">
        <i class="bi ${icon}" style="color:${color};font-size:12px"></i>
      </div>
      <div style="flex:1;min-width:0">
        <div style="font-size:11.5px;font-weight:600;color:#111">${msg}</div>
        <div style="font-size:10px;color:#9ca3af;margin-top:1px">${sub}</div>
      </div>
    </div>`;

  // ─── PRE-COMPUTED SVG CHARTS ───────────────────────────────────────────────

  // Production department bar chart
  const depts = [
    { name: 'Playing Card', jobs: 18, color: '#3b82f6' },
    { name: 'Printing', jobs: 14, color: '#8b5cf6' },
    { name: 'Collation', jobs: 22, color: '#22c55e' },
    { name: 'Varnishing', jobs: 10, color: '#f59e0b' },
    { name: 'Punching', jobs: 8, color: '#ef4444' },
    { name: 'Die Cut', jobs: 6, color: '#06b6d4' },
  ];
  const deptsMax = 22;
  const prodBarSVG = `<svg viewBox="0 0 300 120" width="100%" height="120">
    <line x1="22" y1="8" x2="22" y2="92" stroke="#e9ecef" stroke-width="1"/>
    <line x1="22" y1="92" x2="290" y2="92" stroke="#e9ecef" stroke-width="1"/>
    ${depts.map((d, i) => {
      const x = 30 + i * 44;
      const h = Math.round(d.jobs / deptsMax * 70);
      const y = 90 - h;
      return `<rect x="${x}" y="${y}" width="28" height="${h}" rx="4" fill="${d.color}" opacity=".85"/>
        <text x="${x + 14}" y="${y - 4}" text-anchor="middle" font-size="9" font-weight="700" fill="${d.color}">${d.jobs}</text>
        <text x="${x + 14}" y="108" text-anchor="middle" font-size="8" fill="#9ca3af">${d.name.substring(0, 5)}</text>`;
    }).join('')}
  </svg>`;

  // Sales monthly revenue area chart (Jan–Jun in lakhs: 42,38,55,48,61,52)
  const salesMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const salesVals = ['₹42L', '₹38L', '₹55L', '₹48L', '₹61L', '₹52L'];
  const salesXY = [[35, 40], [85, 44], [135, 25], [185, 33], [235, 18], [285, 28]];
  const salesPath = `M35,40 C52,40 68,47 85,44 C102,41 118,26 135,25 C152,24 168,35 185,33 C202,31 218,18 235,18 C252,18 268,26 285,28`;
  const salesAreaSVG = `<svg viewBox="0 0 320 110" width="100%" height="110">
    <defs>
      <linearGradient id="sgrd" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#0891b2" stop-opacity=".22"/>
        <stop offset="100%" stop-color="#0891b2" stop-opacity="0"/>
      </linearGradient>
    </defs>
    ${salesXY.map(([x]) => `<line x1="${x}" y1="8" x2="${x}" y2="92" stroke="#f0f2f5" stroke-width="1"/>`).join('')}
    <line x1="30" y1="92" x2="290" y2="92" stroke="#e5e7eb" stroke-width="1"/>
    <path d="${salesPath} L285,92 L35,92 Z" fill="url(#sgrd)"/>
    <path d="${salesPath}" fill="none" stroke="#0891b2" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    ${salesXY.map(([x, y], i) =>
      `<circle cx="${x}" cy="${y}" r="3.5" fill="#0891b2" stroke="#fff" stroke-width="2"/>
       <text x="${x}" y="105" text-anchor="middle" font-size="8" fill="#9ca3af">${salesMonths[i]}</text>`
    ).join('')}
  </svg>`;

  // Purchase monthly spend area chart (Jan–Jun in lakhs: 22,18,32,28,35,28.5)
  const purchMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const purchVals = ['₹22L', '₹18L', '₹32L', '₹28L', '₹35L', '₹28.5L'];
  const purchXY = [[35, 44], [85, 52], [135, 24], [185, 32], [235, 18], [285, 31]];
  const purchPath = `M35,44 C52,44 68,55 85,52 C102,49 118,25 135,24 C152,23 168,34 185,32 C202,30 218,18 235,18 C252,18 268,29 285,31`;
  const purchAreaSVG = `<svg viewBox="0 0 320 110" width="100%" height="110">
    <defs>
      <linearGradient id="pgrd" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#f59e0b" stop-opacity=".22"/>
        <stop offset="100%" stop-color="#f59e0b" stop-opacity="0"/>
      </linearGradient>
    </defs>
    ${purchXY.map(([x]) => `<line x1="${x}" y1="8" x2="${x}" y2="92" stroke="#f0f2f5" stroke-width="1"/>`).join('')}
    <line x1="30" y1="92" x2="290" y2="92" stroke="#e5e7eb" stroke-width="1"/>
    <path d="${purchPath} L285,92 L35,92 Z" fill="url(#pgrd)"/>
    <path d="${purchPath}" fill="none" stroke="#f59e0b" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    ${purchXY.map(([x, y], i) =>
      `<circle cx="${x}" cy="${y}" r="3.5" fill="#f59e0b" stroke="#fff" stroke-width="2"/>
       <text x="${x}" y="105" text-anchor="middle" font-size="8" fill="#9ca3af">${purchMonths[i]}</text>`
    ).join('')}
  </svg>`;

  // Inventory stock health chart (horizontal grouped bars)
  const invStocks = [
    { mat: 'Art Paper Liner', avail: 78, min: 40, color: '#3b82f6' },
    { mat: 'Fluting Medi.', avail: 22, min: 30, color: '#ef4444' },
    { mat: 'White Top', avail: 91, min: 35, color: '#22c55e' },
    { mat: 'Duplex Board', avail: 55, min: 50, color: '#f59e0b' },
    { mat: 'SC-1 Cardstock', avail: 14, min: 25, color: '#ef4444' },
  ];

  // Dispatch 7-day bar chart
  const dispVals = [22, 45, 18, 60, 75, 30, 40];
  const dispMax = 75;
  const dispDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Today'];
  const dispBarSVG = `<svg viewBox="0 0 300 120" width="100%" height="120">
    <line x1="20" y1="8" x2="20" y2="92" stroke="#e9ecef" stroke-width="1"/>
    <line x1="20" y1="92" x2="290" y2="92" stroke="#e9ecef" stroke-width="1"/>
    ${dispVals.map((v, i) => {
      const x = 24 + i * 38;
      const h = Math.round(v / dispMax * 72);
      const y = 90 - h;
      const isToday = i === 6;
      const color = isToday ? '#22c55e' : '#3b82f6';
      return `<rect x="${x}" y="${y}" width="25" height="${h}" rx="4" fill="${color}" opacity="${isToday ? '.75' : '.8'}"/>
        <text x="${x + 12}" y="${y - 3}" text-anchor="middle" font-size="8.5" font-weight="700" fill="${color}">${v}K</text>
        <text x="${x + 12}" y="107" text-anchor="middle" font-size="8" fill="${isToday ? '#22c55e' : '#9ca3af'}" font-weight="${isToday ? '700' : '400'}">${dispDays[i]}</text>`;
    }).join('')}
  </svg>`;

  // ═══════════════════════════════════════════════════════════════════════════
  // PRODUCTION DASHBOARD
  // ═══════════════════════════════════════════════════════════════════════════
  ca.insertAdjacentHTML('beforeend', `
<div class="page" id="page-dash-production">
<style>
@keyframes dbFadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
.db-ani{animation:dbFadeUp .4s ease both}
</style>

${dhdr('bi-gear-wide-connected', 'Production Dashboard', 'Live plant performance — jobs, machines, departments',
  '#003366', '#0a4f8a',
  `<button class="btn btn-sm" style="background:rgba(255,255,255,.15);color:#fff;border:1px solid rgba(255,255,255,.25);font-size:11px" onclick="navigate('prod-tracking')"><i class="bi bi-activity"></i> Live Tracking</button>
   <button class="btn btn-sm" style="background:rgba(255,255,255,.15);color:#fff;border:1px solid rgba(255,255,255,.25);font-size:11px" onclick="navigate('job-card')"><i class="bi bi-plus"></i> New JC</button>`,
  hs('Output Today', '1,24,800 units') + hs('Plant Efficiency', '84%') + hs('Active Job Cards', '47') + hs('Target %', '89.1%', true)
)}

<!-- KPI Grid -->
<div style="display:grid;grid-template-columns:repeat(6,1fr);gap:12px;margin-bottom:16px" class="db-ani" style="animation-delay:.05s">
  ${kc('bi-Decks', '#3b82f6', '#eff6ff', 'Active Job Cards', '47', 'vs 43 yesterday', true, 'job-card')}
  ${kc('bi-speedometer2', '#22c55e', '#f0fdf4', 'Plant Efficiency', '84%', '+3% this week', true, 'prod-tracking')}
  ${kc('bi-check2-all', '#0891b2', '#ecfeff', 'Completed Today', '32', 'of 47 total', true, 'prod-tracking')}
  ${kc('bi-exclamation-circle', '#f59e0b', '#fffbeb', 'Delayed Jobs', '3', '–1 from yesterday', true, 'wip')}
  ${kc('bi-cpu', '#8b5cf6', '#f5f3ff', 'Machines Running', '11/14', 'Idle: 3', false, 'wip')}
  ${kc('bi-bullseye', '#ef4444', '#fef2f2', 'Target Achievement', '89.1%', '–2.4% vs target', false, 'ppc')}
</div>

<!-- Charts Row -->
<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px">

  <!-- Dept output bar chart -->
  ${card(ph('bi-bar-chart', '#3b82f6', 'Department Output — Job Cards Completed Today', 'View Tracking', 'prod-tracking') + `
    <div style="padding:14px 16px 4px">
      ${prodBarSVG}
    </div>
    <div style="display:flex;justify-content:center;gap:14px;padding:6px 14px 12px;flex-wrap:wrap">
      ${depts.map(d => `<div style="display:flex;align-items:center;gap:4px;font-size:9px;color:#6b7280"><span style="width:10px;height:10px;border-radius:3px;background:${d.color};display:inline-block"></span>${d.name}</div>`).join('')}
    </div>`
  )}

  <!-- Efficiency rings -->
  ${card(ph('bi-circle-half', '#22c55e', 'Department Efficiency %', '') + `
    <div style="display:grid;grid-template-columns:repeat(3,1fr);padding:14px 10px">
      ${rg(88, '#22c55e', 'Playing Card', '18/22 jobs')}
      ${rg(78, '#8b5cf6', 'Printing', '14/18 jobs')}
      ${rg(96, '#22c55e', 'Collation', '22/23 jobs')}
      ${rg(71, '#f59e0b', 'Varnishing', '10/14 jobs')}
      ${rg(62, '#ef4444', 'Punching', '8/13 jobs')}
      ${rg(55, '#ef4444', 'Die Cut', '6/11 jobs')}
    </div>`
  )}
</div>

<!-- Jobs + Machines Row -->
<div style="display:grid;grid-template-columns:3fr 2fr;gap:14px;margin-bottom:14px">

  <!-- Active Job Cards -->
  ${card(ph('bi-journal-text', '#0891b2', 'Active Job Cards', 'All Job Cards', 'job-card') + `
    <div style="overflow-x:auto">
      <table class="data-table" style="font-size:11.5px">
        <thead>
          <tr>
            <th>JC No</th><th>Customer</th><th>Product</th><th>Dept</th>
            <th style="min-width:90px">Progress</th><th>ETA</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${[
            ['JC-2026-089','Amul Dairy','Poker Size Export 7-GSM','Playing Card',67,'Jun 30','In Progress','blue'],
            ['JC-2026-090','Metro Cash','Slotted Deck 5-GSM','Collation',100,'Done','Completed','green'],
            ['JC-2026-091','Patanjali','FMCG Carton 3-GSM','Printing',40,'Jul 2','Delayed','red'],
            ['JC-2026-092','ITC Ltd','Industrial 7-GSM','Varnishing',60,'Jul 1','In Progress','blue'],
            ['JC-2026-093','Godrej','Storage Deck 5-GSM','Punching',25,'Jul 3','In Progress','blue'],
          ].map(([jc,cust,prod,dept,pct,eta,st,sc]) =>
            `<tr onclick="navigate('job-card')">
              <td><b>${jc}</b></td>
              <td>${cust}</td>
              <td style="font-size:11px">${prod}</td>
              <td><span style="font-size:10px;padding:2px 7px;border-radius:20px;background:#eff6ff;color:#1d4ed8">${dept}</span></td>
              <td>
                <div style="display:flex;align-items:center;gap:5px">
                  <div style="flex:1;height:5px;background:#f0f2f5;border-radius:3px;overflow:hidden">
                    <div style="height:100%;width:${pct}%;background:${pct===100?'#22c55e':pct<50?'#ef4444':'#3b82f6'}"></div>
                  </div>
                  <span style="font-size:9.5px;font-weight:700;min-width:28px">${pct}%</span>
                </div>
              </td>
              <td style="font-size:11px">${eta}</td>
              <td><span class="tag tag-${sc}" style="font-size:9.5px">${st}</span></td>
            </tr>`
          ).join('')}
        </tbody>
      </table>
      <div style="padding:8px 14px;font-size:10.5px;color:#9ca3af;border-top:1px solid #f5f5f5">Showing 5 of 47 active jobs</div>
    </div>`
  )}

  <!-- Machine Status -->
  ${card(ph('bi-cpu', '#8b5cf6', 'Machine Status', 'Machine Master', 'm-machine') + `
    <div style="padding:6px 0">
      ${[
        ['M-01 Printing Press','Playing Card','Running','green'],
        ['M-02 Flexo 4C','Printing','Running','green'],
        ['M-03 Collator','Collation','Running','green'],
        ['M-04 Die Cutter','Die Cut','Down','red'],
        ['M-05 Flexo 2C','Printing','Idle','orange'],
        ['M-06 Slitter','Playing Card','Running','green'],
        ['M-07 Patcher','Collation','Running','green'],
        ['M-08 Coater','Varnishing','Idle','orange'],
      ].map(([name, dept, status, sc]) => {
        const bg = sc === 'green' ? '#f0fdf4' : sc === 'red' ? '#fef2f2' : '#fffbeb';
        const fc = sc === 'green' ? '#15803d' : sc === 'red' ? '#dc2626' : '#92400e';
        return `<div style="display:flex;align-items:center;justify-content:space-between;padding:8px 14px;border-bottom:1px solid #f8f8f8">
          <div>
            <div style="font-size:11.5px;font-weight:600;color:#111">${name}</div>
            <div style="font-size:10px;color:#9ca3af">${dept}</div>
          </div>
          <span style="padding:3px 9px;border-radius:20px;font-size:10px;font-weight:700;background:${bg};color:${fc}">${status}</span>
        </div>`;
      }).join('')}
    </div>`
  )}

</div>

<!-- WIP Alerts -->
${card(ph('bi-exclamation-triangle', '#ef4444', 'WIP Alerts & Blocked Jobs') + `
  <div>
    ${alertRow('bi-x-circle', '#ef4444', 'JC-2026-091 Blocked — Honeycomb & Partition not ready', 'Patanjali order · Due Jul 2 · Est. delay 2 days')}
    ${alertRow('bi-x-circle', '#ef4444', 'M-04 Die Cutter — Machine Down since 11:30 AM', 'Breakdown: belt failure · Maintenance called')}
    ${alertRow('bi-exclamation-circle', '#f59e0b', 'JC-2026-095 — Inking issue on Printing dept', 'Colour mismatch reported · QC check pending')}
    ${alertRow('bi-info-circle', '#3b82f6', 'PPC Revision: JC-2026-097 rescheduled to Jul 4', 'Customer requested delay · Approved by manager')}
  </div>`
)}

${dl([['Job Card','job-card','bi-journal-text'],['Production Tracking','prod-tracking','bi-activity'],['WIP Tracking','wip','bi-Decks'],['PPC Planning','ppc','bi-calendar3-week']])}
</div>`);

  // ═══════════════════════════════════════════════════════════════════════════
  // INVENTORY & STORE DASHBOARD
  // ═══════════════════════════════════════════════════════════════════════════
  ca.insertAdjacentHTML('beforeend', `
<div class="page" id="page-dash-inventory">

${dhdr('bi-Decks', 'Inventory & Store Dashboard', 'Cardstock stock, floor stock, warehouse utilization & alerts',
  '#4c1d95', '#6d28d9',
  `<button class="btn btn-sm" style="background:rgba(255,255,255,.15);color:#fff;border:1px solid rgba(255,255,255,.25);font-size:11px" onclick="navigate('Cardstock-req')"><i class="bi bi-plus"></i> New Requisition</button>
   <button class="btn btn-sm" style="background:rgba(255,255,255,.15);color:#fff;border:1px solid rgba(255,255,255,.25);font-size:11px" onclick="navigate('Cardstock-stock')"><i class="bi bi-file-earmark-bar-graph"></i> Stock Report</button>`,
  hs('Total Cardstock Stock', '48,600 kg') + hs('Below Min Stock', '3 items') + hs('Floor Stock', '4,820 kg') + hs('Near Expiry', '8 batches', true)
)}

<!-- KPI Grid -->
<div style="display:grid;grid-template-columns:repeat(6,1fr);gap:12px;margin-bottom:16px">
  ${kc('bi-layers', '#8b5cf6', '#f5f3ff', 'Total Cardstock Stock', '48,600 kg', '+2,400 kg this week', true, 'Cardstock-stock')}
  ${kc('bi-exclamation-triangle', '#ef4444', '#fef2f2', 'Below Min Stock', '3 items', 'Raise PO now!', false, 'Cardstock-req')}
  ${kc('bi-arrow-left-right', '#3b82f6', '#eff6ff', 'Floor Stock (Cardstock)', '4,820 kg', '–380 kg issued today', false, 'Cardstock-floor-stock')}
  ${kc('bi-file-earmark-text', '#0891b2', '#ecfeff', 'Ink/Coating / Board', '1,880 sht', '+120 today via GRN', true, 'Ink/Coating-stock')}
  ${kc('bi-clock-history', '#f59e0b', '#fffbeb', 'Near Expiry', '8 batches', '< 30 days left', false, 'Cardstock-verification')}
  ${kc('bi-building', '#22c55e', '#f0fdf4', 'Warehouse Bins', '3 active', 'WH-A, WH-B, FLOOR', true, 'Cardstock-stock')}
</div>

<!-- Main content -->
<div style="display:grid;grid-template-columns:3fr 2fr;gap:14px;margin-bottom:14px">

  <!-- Stock Health -->
  ${card(ph('bi-bar-chart-horizontal', '#8b5cf6', 'Material Stock Health vs Minimum Level') + `
    <div style="padding:16px">
      ${invStocks.map(s => hb(s.mat, s.avail, s.color, s.avail < s.min ? '⚠ Below Min' : `Min: ${s.min}%`)).join('')}
    </div>
    <div style="padding:0 16px 14px">
      <div style="font-size:10px;color:#9ca3af;padding:8px 12px;background:#fefce8;border-radius:8px;border:1px solid #fef08a">
        <i class="bi bi-exclamation-triangle" style="color:#ca8a04"></i>
        <b style="color:#92400e"> 3 items below minimum</b> — Fluting Medium, SC-1 Cardstock need immediate requisition.
      </div>
    </div>
    ${dl([['Raise Requisition','Cardstock-req','bi-plus'],['View Cardstock Stock','Cardstock-stock','bi-layers'],['Ink/Coating Stock','Ink/Coating-stock','bi-file-earmark-text']])}`
  )}

  <!-- Alerts + Warehouse -->
  <div style="display:flex;flex-direction:column;gap:14px">

    ${card(ph('bi-building', '#22c55e', 'Warehouse Utilization') + `
      <div style="padding:12px 16px">
        ${hb('WH-A (Main Store)', 72, '#22c55e', '1,440/2,000 bins')}
        ${hb('WH-B (Overflow)', 88, '#f59e0b', '880/1,000 bins')}
        ${hb('Floor Area', 45, '#3b82f6', '45% used')}
      </div>`
    )}

    ${card(ph('bi-exclamation-octagon', '#ef4444', 'Stock Alerts') + `
      <div>
        ${alertRow('bi-x-circle', '#ef4444', 'SC-1 Cardstock — Only 14% stock remaining', 'Current: 340 kg · Min required: 600 kg')}
        ${alertRow('bi-x-circle', '#ef4444', 'Fluting Medium — 22% vs 30% minimum', 'Raise PO immediately · 3 JCs pending')}
        ${alertRow('bi-clock', '#f59e0b', '8 batches near expiry (< 30 days)', 'Review in Physical Verification')}
        ${alertRow('bi-arrow-repeat', '#3b82f6', 'GRN Pending: 2 Cardstock POs awaiting receipt', 'PO-2026-041, PO-2026-044')}
      </div>`
    )}
  </div>
</div>

<!-- Floor Stock Ageing Table -->
${card(ph('bi-clock-history', '#f59e0b', 'Floor Stock Ageing — Cardstock & Ink/Coating', 'All Floor Stock', 'Cardstock-floor-stock') + `
  <div style="overflow-x:auto">
    <table class="data-table" style="font-size:11.5px">
      <thead>
        <tr><th>Material</th><th>Grade</th><th>Batch No</th><th>Qty on Floor</th><th>Issued On</th><th>Days on Floor</th><th>JC No</th><th>Action</th></tr>
      </thead>
      <tbody>
        ${[
          ['Art Paper Liner','KL-150','B-2026-114','240 kg','22 Jun','8 days','JC-2026-082','orange'],
          ['SC-1 Cardstock','SC-1 A','B-2026-109','120 kg','18 Jun','12 days','JC-2026-080','red'],
          ['Fluting Medium','FM-120','B-2026-118','180 kg','27 Jun','3 days','JC-2026-089','green'],
          ['Duplex Board','DX-250','B-2026-115','60 sht','24 Jun','6 days','JC-2026-086','orange'],
          ['White Top','WT-300','B-2026-117','96 kg','26 Jun','4 days','JC-2026-091','green'],
        ].map(([mat,grade,batch,qty,date,days,jc,sc]) =>
          `<tr>
            <td><b>${mat}</b></td>
            <td>${grade}</td>
            <td style="font-size:10.5px;color:#6b7280">${batch}</td>
            <td>${qty}</td>
            <td>${date}</td>
            <td><span class="tag tag-${sc}" style="font-size:10px">${days}</span></td>
            <td style="font-size:11px;color:#3b82f6;cursor:pointer" onclick="navigate('job-card')">${jc}</td>
            <td><button class="btn btn-ghost btn-sm" style="font-size:10px" onclick="openModal('modal-Cardstock-return-new')">Return</button></td>
          </tr>`
        ).join('')}
      </tbody>
    </table>
  </div>`
)}

${dl([['Cardstock Floor Stock','Cardstock-floor-stock','bi-layers'],['Ink/Coating Floor Stock','Ink/Coating-floor-stock','bi-file-earmark-text'],['Physical Verify','Cardstock-verification','bi-clipboard-check'],['GRN','Cardstock-receipt','bi-Deck-arrow-in-down']])}
</div>`);

  // ═══════════════════════════════════════════════════════════════════════════
  // PURCHASE DASHBOARD
  // ═══════════════════════════════════════════════════════════════════════════
  ca.insertAdjacentHTML('beforeend', `
<div class="page" id="page-dash-purchase">

${dhdr('bi-receipt', 'Purchase Dashboard', 'PO pipeline, GRN status, supplier performance & spend analytics',
  '#78350f', '#d97706',
  `<button class="btn btn-sm" style="background:rgba(255,255,255,.15);color:#fff;border:1px solid rgba(255,255,255,.25);font-size:11px" onclick="navigate('Cardstock-po')"><i class="bi bi-plus"></i> Create PO</button>
   <button class="btn btn-sm" style="background:rgba(255,255,255,.15);color:#fff;border:1px solid rgba(255,255,255,.25);font-size:11px" onclick="navigate('Cardstock-receipt')"><i class="bi bi-Deck-arrow-in-down"></i> New GRN</button>`,
  hs('Open POs', '18') + hs('Pending GRN', '5') + hs('Month Spend', '₹28.5L') + hs('Overdue POs', '4', true)
)}

<!-- KPI Grid -->
<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:12px;margin-bottom:16px">
  ${kc('bi-file-earmark-ruled', '#f59e0b', '#fffbeb', 'Open Purchase Orders', '18', '₹8.4L pending value', false, 'Cardstock-po')}
  ${kc('bi-Deck-arrow-in-down', '#3b82f6', '#eff6ff', 'Pending GRN', '5 POs', 'Awaiting receipt', false, 'Cardstock-receipt')}
  ${kc('bi-exclamation-triangle', '#ef4444', '#fef2f2', 'Overdue POs', '4 POs', 'Past delivery date', false, 'Cardstock-po')}
  ${kc('bi-currency-rupee', '#22c55e', '#f0fdf4', 'June Spend (MTD)', '₹28.5L', '+₹6.2L vs May', true, 'Cardstock-po')}
  ${kc('bi-people', '#8b5cf6', '#f5f3ff', 'Active Suppliers', '8', '3 Cardstock · 5 Ink/Coating', true, 'm-mill')}
</div>

<!-- Charts Row -->
<div style="display:grid;grid-template-columns:3fr 2fr;gap:14px;margin-bottom:14px">

  <!-- Monthly spend chart -->
  ${card(ph('bi-graph-up', '#f59e0b', 'Monthly Purchase Spend (₹ Lakhs) — Jan to Jun 2026') + `
    <div style="padding:16px 16px 8px">
      ${purchAreaSVG}
    </div>
    <div style="display:flex;justify-content:space-between;padding:0 16px 12px">
      ${purchVals.map((v, i) => `<div style="text-align:center"><div style="font-size:11px;font-weight:700;color:#f59e0b">${v}</div><div style="font-size:8.5px;color:#9ca3af">${purchMonths[i]}</div></div>`).join('')}
    </div>`
  )}

  <!-- PO Pipeline Funnel -->
  ${card(ph('bi-funnel', '#8b5cf6', 'PO Pipeline Stages') + `
    <div style="padding:16px">
      ${[
        ['Requisition Raised','28','#6b7280',100],
        ['PO Created','22','#3b82f6',79],
        ['PO Sent to Supplier','18','#8b5cf6',64],
        ['GRN Pending','5','#f59e0b',18],
        ['GRN Received','13','#22c55e',46],
        ['PO Closed','9','#22c55e',32],
      ].map(([stage, count, color, pct]) =>
        `<div style="margin-bottom:12px">
          <div style="display:flex;justify-content:space-between;margin-bottom:3px">
            <span style="font-size:11px;font-weight:500;color:#374151">${stage}</span>
            <span style="font-size:11px;font-weight:700;color:${color}">${count}</span>
          </div>
          <div style="height:8px;background:#f1f3f5;border-radius:4px;overflow:hidden">
            <div style="height:100%;width:${pct}%;background:${color};border-radius:4px;opacity:.85"></div>
          </div>
        </div>`
      ).join('')}
    </div>`
  )}
</div>

<!-- Recent POs + Supplier Summary -->
<div style="display:grid;grid-template-columns:3fr 2fr;gap:14px;margin-bottom:14px">

  <!-- Recent PO Table -->
  ${card(ph('bi-file-earmark-ruled', '#f59e0b', 'Recent Purchase Orders', 'All POs', 'Cardstock-po') + `
    <div style="overflow-x:auto">
      <table class="data-table" style="font-size:11.5px">
        <thead>
          <tr><th>PO No</th><th>Supplier</th><th>Material</th><th>Qty</th><th>PO Value</th><th>Delivery Date</th><th>GRN</th><th>Status</th></tr>
        </thead>
        <tbody>
          ${[
            ['PO-2026-041','Balaji Papers','Art Paper Liner 150gsm','8,000 kg','₹1,84,000','25 Jun 2026','Pending','orange'],
            ['PO-2026-042','Star Boards','Duplex Board 300gsm','500 sht','₹62,500','28 Jun 2026','Done','green'],
            ['PO-2026-043','Indore Mill','SC-1 Cardstock','5,000 kg','₹97,500','30 Jun 2026','Pending','orange'],
            ['PO-2026-044','Balaji Papers','Fluting Medium 120gsm','10,000 kg','₹1,60,000','18 Jun 2026','Overdue','red'],
            ['PO-2026-045','Narmada Ink/Coating','White Top 300gsm','2,000 kg','₹78,000','2 Jul 2026','Open','blue'],
          ].map(([po,sup,mat,qty,val,date,grn,sc]) =>
            `<tr onclick="navigate('Cardstock-po')">
              <td><b>${po}</b></td>
              <td>${sup}</td>
              <td style="font-size:11px">${mat}</td>
              <td>${qty}</td>
              <td style="font-weight:700">${val}</td>
              <td style="font-size:11px">${date}</td>
              <td><span class="tag tag-${grn==='Done'?'green':grn==='Overdue'?'red':grn==='Pending'?'orange':'blue'}" style="font-size:9.5px">${grn}</span></td>
              <td><span class="tag tag-${sc}" style="font-size:9.5px">${sc==='orange'?'In Transit':sc==='green'?'Received':sc==='red'?'Overdue':'Open'}</span></td>
            </tr>`
          ).join('')}
        </tbody>
      </table>
    </div>`
  )}

  <!-- Supplier-wise Spend -->
  ${card(ph('bi-people', '#8b5cf6', 'Supplier-wise June Spend') + `
    <div style="padding:16px">
      ${[
        ['Balaji Papers', 60, '#f59e0b', '₹17.1L'],
        ['Star Boards', 28, '#3b82f6', '₹8.0L'],
        ['Indore Mill', 42, '#8b5cf6', '₹3.4L'],
        ['Narmada Ink/Coating', 18, '#22c55e', '₹5.2L'],
        ['MP Board Mills', 35, '#06b6d4', '₹4.6L'],
      ].map(([name, pct, color, val]) =>
        `<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
          <div style="font-size:11px;font-weight:500;color:#374151;min-width:100px">${name}</div>
          <div style="flex:1;height:7px;background:#f1f3f5;border-radius:4px;overflow:hidden">
            <div style="height:100%;width:${pct}%;background:${color};border-radius:4px;opacity:.8"></div>
          </div>
          <div style="font-size:11px;font-weight:700;color:${color};min-width:42px;text-align:right">${val}</div>
        </div>`
      ).join('')}
    </div>`
  )}
</div>

${dl([['Cardstock PO','Cardstock-po','bi-file-earmark-ruled'],['Ink/Coating PO','Ink/Coating-po','bi-file-earmark-text'],['Cardstock GRN','Cardstock-receipt','bi-Deck-arrow-in-down'],['Ink/Coating GRN','Ink/Coating-receipt','bi-Deck-arrow-in-down'],['PO Close','Cardstock-po-close','bi-check2-circle']])}
</div>`);

  // ═══════════════════════════════════════════════════════════════════════════
  // SALES DASHBOARD
  // ═══════════════════════════════════════════════════════════════════════════
  ca.insertAdjacentHTML('beforeend', `
<div class="page" id="page-dash-sales">

${dhdr('bi-bag-check', 'Sales Dashboard', 'Orders, quotations, enquiries & revenue analytics',
  '#0c4a6e', '#0284c7',
  `<button class="btn btn-sm" style="background:rgba(255,255,255,.15);color:#fff;border:1px solid rgba(255,255,255,.25);font-size:11px" onclick="navigate('sales-order')"><i class="bi bi-plus"></i> New Order</button>
   <button class="btn btn-sm" style="background:rgba(255,255,255,.15);color:#fff;border:1px solid rgba(255,255,255,.25);font-size:11px" onclick="navigate('quotation')"><i class="bi bi-file-text"></i> New Quotation</button>`,
  hs('Active Orders', '47') + hs('June Revenue (MTD)', '₹52.4L') + hs('Win Rate', '68%') + hs('Due Today', '5 orders', true)
)}

<!-- KPI Grid -->
<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:12px;margin-bottom:16px">
  ${kc('bi-bag-check', '#0891b2', '#ecfeff', 'Active Sales Orders', '47', '+4 this week', true, 'sales-order')}
  ${kc('bi-currency-rupee', '#22c55e', '#f0fdf4', 'June Revenue (MTD)', '₹52.4L', '+₹8.2L vs May', true, 'sales-order')}
  ${kc('bi-file-earmark-text', '#8b5cf6', '#f5f3ff', 'Pending Quotations', '12', '4 need follow-up', false, 'quotation')}
  ${kc('bi-percent', '#3b82f6', '#eff6ff', 'Quotation Win Rate', '68%', '+3% vs last month', true, 'enquiry')}
  ${kc('bi-clock-history', '#ef4444', '#fef2f2', 'Orders Due Today', '5', '2 ready · 3 pending', false, 'dispatch-queue')}
</div>

<!-- Charts Row -->
<div style="display:grid;grid-template-columns:3fr 2fr;gap:14px;margin-bottom:14px">

  <!-- Monthly Revenue Chart -->
  ${card(ph('bi-graph-up-arrow', '#0891b2', 'Monthly Revenue Trend (₹ Lakhs) — Jan to Jun 2026') + `
    <div style="padding:16px 16px 8px">
      ${salesAreaSVG}
    </div>
    <div style="display:flex;justify-content:space-between;padding:0 16px 12px">
      ${salesVals.map((v, i) => `<div style="text-align:center"><div style="font-size:11px;font-weight:700;color:#0891b2">${v}</div><div style="font-size:8.5px;color:#9ca3af">${salesMonths[i]}</div></div>`).join('')}
    </div>`
  )}

  <!-- Order Stage Funnel -->
  ${card(ph('bi-funnel', '#22c55e', 'Order Conversion Funnel') + `
    <div style="padding:16px">
      ${[
        ['Enquiries Received','24','#6b7280',100],
        ['Quotations Sent','18','#0891b2',75],
        ['Negotiations','12','#8b5cf6',50],
        ['Orders Confirmed','8','#22c55e',33],
        ['Production Ordered','7','#3b82f6',29],
        ['Dispatched','5','#22c55e',21],
      ].map(([stage, count, color, pct]) =>
        `<div style="margin-bottom:11px">
          <div style="display:flex;justify-content:space-between;margin-bottom:3px">
            <span style="font-size:11px;font-weight:500;color:#374151">${stage}</span>
            <span style="font-size:11px;font-weight:700;color:${color}">${count}</span>
          </div>
          <div style="height:7px;background:#f1f3f5;border-radius:4px;overflow:hidden">
            <div style="height:100%;width:${pct}%;background:${color};border-radius:4px;opacity:.8"></div>
          </div>
        </div>`
      ).join('')}
    </div>`
  )}
</div>

<!-- Top Customers + Pending Quotations -->
<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px">

  <!-- Top Customers Table -->
  ${card(ph('bi-people', '#0891b2', 'Top Customers — June 2026', 'All Customers', 'm-ledger-customer') + `
    <div style="overflow-x:auto">
      <table class="data-table" style="font-size:11.5px">
        <thead>
          <tr><th>#</th><th>Customer</th><th>Orders</th><th>Revenue</th><th>YTD Revenue</th><th>Priority</th></tr>
        </thead>
        <tbody>
          ${[
            [1,'Amul Dairy','8','₹12.4L','₹68.2L','A'],
            [2,'Metro Cash','5','₹9.8L','₹51.3L','A'],
            [3,'Patanjali','7','₹8.2L','₹44.6L','A'],
            [4,'ITC Ltd','4','₹7.5L','₹38.9L','B'],
            [5,'Godrej','3','₹5.9L','₹32.1L','B'],
          ].map(([rank,name,orders,rev,ytd,pri]) =>
            `<tr onclick="navigate('sales-order')">
              <td style="font-weight:700;color:#9ca3af">${rank}</td>
              <td><b>${name}</b></td>
              <td>${orders}</td>
              <td style="font-weight:700;color:#22c55e">${rev}</td>
              <td style="font-size:11px;color:#6b7280">${ytd}</td>
              <td><span style="padding:2px 8px;border-radius:20px;font-size:10px;font-weight:700;background:${pri==='A'?'#fef3c7':'#eff6ff'};color:${pri==='A'?'#92400e':'#1d4ed8'}">${pri}</span></td>
            </tr>`
          ).join('')}
        </tbody>
      </table>
    </div>`
  )}

  <!-- Pending Quotations + Follow-ups -->
  ${card(ph('bi-file-earmark-text', '#8b5cf6', 'Quotations Awaiting Follow-Up', 'All Quotations', 'quotation') + `
    <div>
      ${[
        ['QT-2026-028','Dabur India','FMCG Carton 3-GSM','₹4.2L','Jun 18','12 days ago','red'],
        ['QT-2026-031','Asian Paints','Industrial 7-GSM','₹6.8L','Jun 22','8 days ago','orange'],
        ['QT-2026-034','Hindustan Unilever','Slotted Deck','₹3.1L','Jun 25','5 days ago','orange'],
        ['QT-2026-036','Marico Ltd','Export Poker Size','₹9.4L','Jun 28','2 days ago','blue'],
      ].map(([qt,cust,prod,val,date,age,sc]) =>
        `<div style="display:flex;align-items:flex-start;gap:10px;padding:10px 14px;border-bottom:1px solid #f8f8f8;cursor:pointer" onclick="navigate('quotation')">
          <div style="flex:1">
            <div style="display:flex;justify-content:space-between">
              <div style="font-size:11.5px;font-weight:600;color:#111">${cust}</div>
              <span class="tag tag-${sc}" style="font-size:9.5px">${age}</span>
            </div>
            <div style="font-size:10.5px;color:#6b7280;margin-top:2px">${qt} · ${prod}</div>
            <div style="display:flex;gap:10px;margin-top:4px">
              <span style="font-size:10.5px;font-weight:700;color:#8b5cf6">${val}</span>
              <span style="font-size:10px;color:#9ca3af">Sent: ${date}</span>
            </div>
          </div>
          <button class="btn btn-ghost btn-sm" style="font-size:10px;padding:3px 8px;flex-shrink:0" onclick="event.stopPropagation();showToast('Reminder sent to ${cust}')">Follow Up</button>
        </div>`
      ).join('')}
    </div>`
  )}
</div>

<!-- Recent Sales Orders -->
${card(ph('bi-bag-check', '#0891b2', 'Recent Sales Orders', 'All Orders', 'sales-order') + `
  <div style="overflow-x:auto">
    <table class="data-table" style="font-size:11.5px">
      <thead>
        <tr><th>SO No</th><th>Customer</th><th>Product</th><th>Qty</th><th>Value</th><th>Delivery</th><th>Production</th><th>Status</th></tr>
      </thead>
      <tbody>
        ${[
          ['SO-2026-118','Amul Dairy','Poker Size Export 7-GSM','1,00,000 pcs','₹12.4L','2 Jul 2026','JC-2026-089','In Production','blue'],
          ['SO-2026-117','Metro Cash','Slotted Deck 5-GSM','25,000 pcs','₹3.1L','30 Jun 2026','JC-2026-090','Ready','green'],
          ['SO-2026-116','Patanjali','FMCG Carton 3-GSM','80,000 pcs','₹5.6L','3 Jul 2026','JC-2026-091','Delayed','red'],
          ['SO-2026-115','ITC Ltd','Industrial Deck 7-GSM','1,20,000 pcs','₹8.8L','5 Jul 2026','JC-2026-092','In Production','blue'],
          ['SO-2026-114','Godrej','Storage Deck 5-GSM','30,000 pcs','₹2.7L','28 Jun 2026','JC-2026-087','Dispatched','green'],
        ].map(([so,cust,prod,qty,val,del,jc,st,sc]) =>
          `<tr onclick="navigate('sales-order')">
            <td><b>${so}</b></td>
            <td>${cust}</td>
            <td style="font-size:11px">${prod}</td>
            <td>${qty}</td>
            <td style="font-weight:700">${val}</td>
            <td style="font-size:11px">${del}</td>
            <td style="font-size:11px;color:#3b82f6;cursor:pointer" onclick="event.stopPropagation();navigate('job-card')">${jc}</td>
            <td><span class="tag tag-${sc}" style="font-size:9.5px">${st}</span></td>
          </tr>`
        ).join('')}
      </tbody>
    </table>
  </div>`
)}

${dl([['Sales Orders','sales-order','bi-bag-check'],['Quotations','quotation','bi-file-earmark-text'],['Enquiries','enquiry','bi-chat-square-text'],['AI Order Intel','so-frequency','bi-stars']])}
</div>`);

  // ═══════════════════════════════════════════════════════════════════════════
  // DISPATCH DASHBOARD
  // ═══════════════════════════════════════════════════════════════════════════
  ca.insertAdjacentHTML('beforeend', `
<div class="page" id="page-dash-dispatch">

${dhdr('bi-truck', 'Dispatch Dashboard', 'Ready orders, vehicle tracking, challan & delivery performance',
  '#064e3b', '#059669',
  `<button class="btn btn-sm" style="background:rgba(255,255,255,.15);color:#fff;border:1px solid rgba(255,255,255,.25);font-size:11px" onclick="navigate('dispatch-queue')"><i class="bi bi-list-check"></i> Dispatch Queue</button>
   <button class="btn btn-sm" style="background:rgba(255,255,255,.15);color:#fff;border:1px solid rgba(255,255,255,.25);font-size:11px" onclick="navigate('challan')"><i class="bi bi-plus"></i> New Challan</button>`,
  hs('Ready to Dispatch', '4 orders') + hs('Dispatched Today', '8 orders') + hs('Delayed', '3 orders') + hs('Challans (June)', '42', true)
)}

<!-- KPI Grid -->
<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:12px;margin-bottom:16px">
  ${kc('bi-Deck-seam', '#22c55e', '#f0fdf4', 'Ready to Dispatch', '4 orders', '72,500 Decks', true, 'dispatch-queue')}
  ${kc('bi-truck', '#3b82f6', '#eff6ff', 'Dispatched Today', '8 orders', '1,84,000 Decks', true, 'challan')}
  ${kc('bi-exclamation-triangle', '#ef4444', '#fef2f2', 'Delayed Orders', '3', 'Customer follow-up needed', false, 'dispatch-queue')}
  ${kc('bi-file-earmark-text', '#8b5cf6', '#f5f3ff', 'Challans (June)', '42', '+6 vs May', true, 'challan')}
  ${kc('bi-speedometer', '#f59e0b', '#fffbeb', 'On-Time Delivery', '87%', '+2% vs last month', true, 'challan')}
</div>

<!-- Charts Row -->
<div style="display:grid;grid-template-columns:3fr 2fr;gap:14px;margin-bottom:14px">

  <!-- 7-Day Dispatch Trend -->
  ${card(ph('bi-bar-chart', '#3b82f6', 'Weekly Dispatch Trend (Decks in \'000s)') + `
    <div style="padding:14px 16px 4px">
      ${dispBarSVG}
    </div>
    <div style="display:flex;justify-content:center;gap:14px;padding:6px 14px 12px">
      <div style="display:flex;align-items:center;gap:4px;font-size:10px;color:#6b7280"><span style="width:10px;height:10px;border-radius:3px;background:#3b82f6;display:inline-block;opacity:.8"></span>Dispatched</div>
      <div style="display:flex;align-items:center;gap:4px;font-size:10px;color:#6b7280"><span style="width:10px;height:10px;border-radius:3px;background:#22c55e;display:inline-block;opacity:.75"></span>Today (In Progress)</div>
    </div>`
  )}

  <!-- Vehicle Status -->
  ${card(ph('bi-truck', '#22c55e', 'Vehicle Status', 'Vehicle Master', 'm-vehicle') + `
    <div style="padding:8px 0">
      ${[
        ['MH-12-AB-2345','Tata 407','Dispatched','en route to Amul Dairy · ETA 4 PM','green'],
        ['MP-09-CD-7788','Eicher 2049','Loading','Loading at warehouse WH-A','blue'],
        ['GJ-01-EF-4411','Tata 407','Available','Ready for next dispatch','gray'],
        ['MH-12-GH-1122','Ashok Leyland','Dispatched','Returning after delivery · ETA 6 PM','green'],
        ['MP-04-IJ-9900','Tata 409','Maintenance','Scheduled service today','orange'],
      ].map(([no, model, status, note, sc]) => {
        const bg = sc === 'green' ? '#f0fdf4' : sc === 'blue' ? '#eff6ff' : sc === 'orange' ? '#fffbeb' : '#f9fafb';
        const fc = sc === 'green' ? '#15803d' : sc === 'blue' ? '#1d4ed8' : sc === 'orange' ? '#92400e' : '#374151';
        return `<div style="padding:9px 14px;border-bottom:1px solid #f8f8f8">
          <div style="display:flex;justify-content:space-between;align-items:flex-start">
            <div>
              <div style="font-size:11.5px;font-weight:700;color:#111">${no}</div>
              <div style="font-size:10px;color:#9ca3af">${model}</div>
            </div>
            <span style="padding:3px 9px;border-radius:20px;font-size:10px;font-weight:700;background:${bg};color:${fc};border:1px solid ${bg==='#f9fafb'?'#e5e7eb':'transparent'}">${status}</span>
          </div>
          <div style="font-size:10.5px;color:#6b7280;margin-top:3px">${note}</div>
        </div>`;
      }).join('')}
    </div>`
  )}
</div>

<!-- Ready Orders + Dispatched Today -->
<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px">

  <!-- Ready to Dispatch -->
  ${card(ph('bi-Deck-seam', '#22c55e', 'Ready to Dispatch', 'Dispatch Queue', 'dispatch-queue') + `
    <div>
      ${[
        ['SO-2026-117','Metro Cash','Slotted Deck 5-GSM','25,000 pcs','3.1L','MH-12-AB-2345','Assign Vehicle'],
        ['SO-2026-120','Godrej','Storage Deck 5-GSM','30,000 pcs','2.7L','—','Assign Vehicle'],
        ['SO-2026-121','Asian Paints','Paint Deck 5-GSM','18,500 pcs','1.8L','—','Assign Vehicle'],
        ['SO-2026-122','Dabur India','Shampoo Carton','1,20,000 pcs','4.4L','Loading…','Loading'],
      ].map(([so,cust,prod,qty,val,vehicle,action]) =>
        `<div style="padding:10px 14px;border-bottom:1px solid #f8f8f8">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:4px">
            <div>
              <div style="font-size:11.5px;font-weight:600;color:#111">${cust}</div>
              <div style="font-size:10.5px;color:#6b7280">${so} · ${prod} · ${qty}</div>
            </div>
            <div style="font-weight:700;font-size:11px;color:#22c55e">₹${val}</div>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center">
            <span style="font-size:10px;color:#9ca3af">Vehicle: ${vehicle}</span>
            <button class="btn btn-sm" style="font-size:10px;padding:3px 10px;background:${action==='Loading'?'#eff6ff':'#f0fdf4'};color:${action==='Loading'?'#1d4ed8':'#15803d'};border:1px solid ${action==='Loading'?'#bfdbfe':'#bbf7d0'}" onclick="openModal('modal-challan-quick')">${action}</button>
          </div>
        </div>`
      ).join('')}
    </div>`
  )}

  <!-- Today's Dispatched -->
  ${card(ph('bi-check2-all', '#3b82f6', "Today's Dispatched Orders", 'All Challans', 'challan') + `
    <div style="overflow-x:auto">
      <table class="data-table" style="font-size:11.5px">
        <thead>
          <tr><th>Challan</th><th>Customer</th><th>Qty</th><th>Value</th><th>Vehicle</th><th>Time</th><th>Status</th></tr>
        </thead>
        <tbody>
          ${[
            ['CH-2026-142','Amul Dairy','1,00,000','₹12.4L','MH-12-AB-2345','8:30 AM','En Route','blue'],
            ['CH-2026-141','ITC Ltd','50,000','₹4.4L','MP-09-CD-7788','7:15 AM','Delivered','green'],
            ['CH-2026-140','Patanjali','80,000','₹5.6L','GJ-01-EF-4411','9:00 AM','En Route','blue'],
            ['CH-2026-139','HUL','60,000','₹3.8L','MH-12-GH-1122','6:45 AM','Delivered','green'],
          ].map(([ch,cust,qty,val,vehicle,time,st,sc]) =>
            `<tr onclick="navigate('challan')">
              <td><b>${ch}</b></td>
              <td>${cust}</td>
              <td>${qty}</td>
              <td style="font-weight:700">${val}</td>
              <td style="font-size:10.5px;color:#6b7280">${vehicle}</td>
              <td style="font-size:11px">${time}</td>
              <td><span class="tag tag-${sc}" style="font-size:9.5px">${st}</span></td>
            </tr>`
          ).join('')}
        </tbody>
      </table>
    </div>
    <div style="padding:10px 14px;background:#f0fdf4;border-top:1px solid #d1fae5">
      <div style="font-size:11px;color:#15803d;font-weight:600"><i class="bi bi-check-circle"></i> Today's total: 8 challans · 3,10,000 Decks · ₹26.2L dispatched</div>
    </div>`
  )}
</div>

<!-- Delivery Performance KPIs -->
${card(ph('bi-graph-up', '#22c55e', 'Delivery Performance — June 2026') + `
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:0;padding:0">
    ${[
      ['On-Time Delivery', '87%', '#22c55e', '43 of 49 challan'],
      ['Customer Returns', '2 orders', '#ef4444', '0.4% return rate'],
      ['Avg Delivery Time', '3.2 hrs', '#3b82f6', 'City: 2.1h · Outstation: 6.4h'],
      ['Challan Value', '₹2.84 Cr', '#8b5cf6', 'June total dispatched'],
    ].map(([label, val, color, sub], i) =>
      `<div style="${i < 3 ? 'border-right:1px solid #f0f0f0;' : ''}padding:16px 20px;text-align:center">
        <div style="font-size:22px;font-weight:800;color:${color}">${val}</div>
        <div style="font-size:11px;font-weight:600;color:#374151;margin-top:4px">${label}</div>
        <div style="font-size:10px;color:#9ca3af;margin-top:2px">${sub}</div>
      </div>`
    ).join('')}
  </div>`
)}

${dl([['Dispatch Queue','dispatch-queue','bi-list-check'],['Create Challan','challan','bi-file-earmark-text'],['Vehicles','m-vehicle','bi-truck'],['Sales Orders','sales-order','bi-bag-check']])}
</div>`);

});
