document.addEventListener('DOMContentLoaded', () => {

  // ── Estimation vs Actual ──
  document.getElementById('contentArea').insertAdjacentHTML('beforeend', `
<div class="page" id="page-est-vs-actual">
  <div class="page-header">
    <div><div class="page-title">Estimation vs Actual</div><div class="page-subtitle">Compare estimated vs actual — Ink/Coating, production time, waste and cost</div></div>
    <div class="page-actions">
      <button class="btn btn-secondary btn-sm"><i class="bi bi-download"></i> Export</button>
      <select class="form-select" style="width:140px;padding:5px 8px"><option>June 2026</option><option>May 2026</option></select>
    </div>
  </div>

  <!-- Summary Variance Cards -->
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:20px">
    ${[
      ['Ink/Coating Variance','avg -2.3%','Under consumption (good)','#22c55e','bi-check-circle-fill'],
      ['Time Variance','avg +12.4%','Production taking longer','#ef4444','bi-clock-fill'],
      ['Waste Variance','avg +1.8%','Slightly above estimate','#f59e0b','bi-exclamation-circle-fill'],
      ['Cost Variance','avg +4.2%','Higher than estimated','#f59e0b','bi-currency-rupee'],
    ].map(([lbl,val,sub,col,icon]) => `
    <div style="background:#fff;border:1px solid var(--bd-default);border-radius:8px;padding:14px 16px;Deck-shadow:var(--shadow-sm);border-top:3px solid ${col}">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
        <i class="bi ${icon}" style="color:${col};font-size:16px"></i>
        <span style="font-size:13px;font-weight:700">${lbl}</span>
      </div>
      <div style="font-size:22px;font-weight:800;color:${col}">${val}</div>
      <div style="font-size:11px;color:var(--fg-muted);margin-top:4px">${sub}</div>
    </div>`).join('')}
  </div>

  <div class="grid-wrap">
    <table class="data-table">
      <thead>
        <tr>
          <th>Job Card</th>
          <th>Customer</th>
          <th>Product</th>
          <th>Est. Ink/Coating (kg)</th>
          <th>Act. Ink/Coating (kg)</th>
          <th>Ink/Coating Var.</th>
          <th>Est. Time (hrs)</th>
          <th>Act. Time (hrs)</th>
          <th>Time Var.</th>
          <th>Est. Waste %</th>
          <th>Act. Waste %</th>
          <th>Est. Cost (₹)</th>
          <th>Act. Cost (₹)</th>
          <th>Cost Var.</th>
        </tr>
      </thead>
      <tbody>
        ${[
          ['JC-2026-082','ITC Ltd','Cigarette Inner','18,500','18,100','-2.2%','48','52','+8.3%','5%','5.8%','₹21,000','₹21,900','+4.3%'],
          ['JC-2026-083','Asian Paints','Paint Deck 5-GSM','4,200','4,380','+4.3%','16','19.5','+21.9%','6%','7.2%','₹52,000','₹56,200','+8.1%'],
          ['JC-2026-084','Godrej','Storage Deck 5-GSM','6,800','6,650','-2.2%','24','25','+4.2%','5.5%','5.1%','₹81,600','₹83,500','+2.3%'],
          ['JC-2026-085','Dabur','Shampoo Carton','8,160','7,900','-3.2%','32','34.5','+7.8%','4.5%','4.2%','₹55,500','₹56,800','+2.3%'],
          ['JC-2026-086','HUL','Soap Carton 3-GSM','21,250','21,800','+2.6%','80','88','+10.0%','6%','6.5%','₹1,80,600','₹1,89,200','+4.8%'],
          ['JC-2026-087','Nestle','Cereal Deck 3-GSM','23,800','23,400','-1.7%','96','102','+6.3%','5%','5.3%','₹1,62,000','₹1,68,500','+4.0%'],
        ].map(([jc,cust,prod,ep,ap,pv,et,at,tv,ew,aw,ec,ac,cv]) => {
          const pvc = pv.startsWith('+')?'color:var(--color-error-text)':'color:var(--color-success-text)';
          const tvc = tv.startsWith('+')?'color:var(--color-error-text)':'color:var(--color-success-text)';
          const cvc = cv.startsWith('+')?'color:var(--color-error-text)':'color:var(--color-success-text)';
          return `<tr>
            <td><b>${jc}</b></td><td>${cust}</td><td style="font-size:12px">${prod}</td>
            <td class="text-right">${ep}</td><td class="text-right">${ap}</td>
            <td class="text-right font-bold" style="${pvc}">${pv}</td>
            <td class="text-right">${et}</td><td class="text-right">${at}</td>
            <td class="text-right font-bold" style="${tvc}">${tv}</td>
            <td class="text-right muted">${ew}</td><td class="text-right muted">${aw}</td>
            <td class="text-right">${ec}</td><td class="text-right">${ac}</td>
            <td class="text-right font-bold" style="${cvc}">${cv}</td>
          </tr>`;
        }).join('')}
      </tbody>
    </table>
    <div class="grid-footer"><span>June 2026 — 6 completed jobs shown</span></div>
  </div>
</div>
`);

  // ── KPI Dashboard ──
  document.getElementById('contentArea').insertAdjacentHTML('beforeend', `
<div class="page" id="page-kpi-dashboard">
  <div class="page-header">
    <div><div class="page-title">KPI Dashboard</div><div class="page-subtitle">Department and machine performance KPIs — June 2026</div></div>
    <div class="page-actions">
      <select class="form-select" style="width:140px;padding:5px 8px"><option>June 2026</option><option>May 2026</option></select>
      <button class="btn btn-secondary btn-sm"><i class="bi bi-download"></i> Export</button>
    </div>
  </div>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px">

    <!-- Department KPIs -->
    <div class="card">
      <div class="card-header"><span class="card-title"><i class="bi bi-bar-chart-fill" style="color:var(--primary);margin-right:6px"></i>Department Efficiency</span></div>
      <div class="card-body" style="padding:14px">
        ${[
          ['Playing Card','88%','90%',true],
          ['Printing','74%','85%',false],
          ['Collation','96%','90%',true],
          ['Varnishing','62%','80%',false],
          ['Punching','91%','85%',true],
          ['Dispatch','85%','90%',false],
        ].map(([dept,actual,target,met]) => `
        <div style="margin-bottom:12px">
          <div style="display:flex;justify-content:space-between;margin-bottom:4px">
            <span style="font-size:13px;font-weight:600">${dept}</span>
            <span style="font-size:13px;font-weight:700;color:${met?'var(--color-success-text)':'var(--color-error-text)'}">${actual} <span style="font-size:11px;font-weight:400;color:var(--fg-muted)">/ ${target} target</span></span>
          </div>
          <div class="progress-bar" style="height:8px"><div class="progress-fill ${met?'success':'error'}" style="width:${actual}"></div></div>
        </div>`).join('')}
      </div>
    </div>

    <!-- Machine Utilization -->
    <div class="card">
      <div class="card-header"><span class="card-title"><i class="bi bi-gear-fill" style="color:var(--primary);margin-right:6px"></i>Machine Utilization</span></div>
      <div class="card-body" style="padding:0">
        <table class="data-table" style="font-size:12px">
          <thead><tr><th>Machine</th><th>Uptime</th><th>Downtime</th><th>Jobs</th><th>Output</th><th>Status</th></tr></thead>
          <tbody>
            ${[
              ['Printing Press-1','88%','12%',24,'1,24,000 m²',true],
              ['Printing Press-2','75%','25%',18,'95,000 m²',true],
              ['Flexo Press-1','60%','40%',12,'68,000 sheets',false],
              ['Flexo Press-2','92%','8%',28,'1,56,000 sheets',true],
              ['Collator-1','96%','4%',32,'2,20,000 Decks',true],
              ['Coater-1','62%','38%',14,'88,000 Decks',false],
            ].map(([m,up,dn,jobs,out,ok]) => `
            <tr><td><b>${m}</b></td><td style="color:var(--color-success-text);font-weight:600">${up}</td>
            <td style="color:${ok?'var(--fg-muted)':'var(--color-error-text);font-weight:600'}">${dn}</td>
            <td style="text-align:center">${jobs}</td><td style="font-size:11px;color:var(--fg-muted)">${out}</td>
            <td><span class="tag tag-${ok?'green':'red'}" style="font-size:10px">${ok?'Good':'Low'}</span></td></tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Production KPIs Table -->
  <div class="card">
    <div class="card-header"><span class="card-title"><i class="bi bi-clipboard-data" style="color:var(--primary);margin-right:6px"></i>Monthly Production Summary</span></div>
    <div class="card-body" style="padding:0">
      <table class="data-table">
        <thead><tr><th>KPI</th><th>Target</th><th>Actual</th><th>Variance</th><th>Status</th></tr></thead>
        <tbody>
          ${[
            ['Total Production Output','25,00,000 Decks','23,48,000 Decks','-6.1%','Below'],
            ['On-Time Delivery Rate','95%','88%','-7%','Below'],
            ['Ink/Coating Wastage %','5%','5.8%','+0.8%','Above'],
            ['Machine Uptime','90%','81.2%','-8.8%','Below'],
            ['Orders Completed on Time','42 / 45','38 / 45','84.4%','Below'],
            ['Average Lead Time','7 Days','8.2 Days','+1.2 Days','Above'],
            ['Customer Complaints','0','2','+2','Above'],
            ['Revenue (June)','₹45,00,000','₹42,30,000','-6.0%','Below'],
          ].map(([kpi,tgt,act,var_,status]) => `
          <tr>
            <td><b>${kpi}</b></td>
            <td class="muted">${tgt}</td>
            <td>${act}</td>
            <td style="font-weight:700;color:${var_.startsWith('-')?'var(--color-error-text)':var_.startsWith('+')&&status==='Above'?'var(--color-error-text)':'var(--color-success-text)'}">${var_}</td>
            <td><span class="tag tag-${status==='Above'&&!['Revenue','Orders'].some(x=>kpi.includes(x))||status==='Below'?'red':'green'}">${status}</span></td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>
</div>
`);

  // ── Management Dashboard ──
  document.getElementById('contentArea').insertAdjacentHTML('beforeend', `
<div class="page" id="page-mgmt-dashboard">
  <div class="page-header">
    <div><div class="page-title">Management Dashboard</div><div class="page-subtitle">Owner single-screen view — all critical metrics at a glance</div></div>
    <div class="page-actions">
      <span style="font-size:12px;color:var(--fg-muted)">Last updated: 30 Jun 2026, 11:45 AM</span>
      <button class="btn btn-secondary btn-sm"><i class="bi bi-arrow-clockwise"></i> Refresh</button>
    </div>
  </div>

  <!-- Top KPIs -->
  <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:12px;margin-bottom:16px">
    ${[
      ['Today Revenue','₹3.8L','#003366','bi-currency-rupee'],
      ['Orders Active','47','#3b82f6','bi-receipt-cutoff'],
      ['Prod. Efficiency','81%','#22c55e','bi-gear-wide-connected'],
      ['Dispatch Pending','12','#f59e0b','bi-truck'],
      ['Receivable','₹14.2L','#ef4444','bi-cash-stack'],
      ['Raw Mat. Value','₹28.5L','#8b5cf6','bi-layers'],
    ].map(([lbl,val,col,icon]) => `
    <div style="background:#fff;border:1px solid var(--bd-default);border-radius:8px;padding:12px 14px;border-top:3px solid ${col};Deck-shadow:var(--shadow-sm);text-align:center">
      <i class="bi ${icon}" style="font-size:20px;color:${col};margin-bottom:4px;display:block"></i>
      <div style="font-size:20px;font-weight:800;color:${col}">${val}</div>
      <div style="font-size:11px;color:var(--fg-muted);margin-top:2px">${lbl}</div>
    </div>`).join('')}
  </div>

  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px">

    <!-- Production Status -->
    <div class="card">
      <div class="card-header"><span class="card-title">Production Today</span><button class="btn btn-ghost btn-sm" onclick="navigate('prod-tracking')">Board →</button></div>
      <div class="card-body" style="padding:12px">
        ${[['Playing Card',88,'#22c55e'],['Printing',74,'#f59e0b'],['Collation',96,'#22c55e'],['Varnishing',62,'#ef4444'],['Punching',91,'#22c55e']].map(([d,e,c]) => `
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
          <span style="width:80px;font-size:12px;font-weight:600">${d}</span>
          <div class="progress-bar" style="flex:1"><div class="progress-fill" style="width:${e}%;background:${c}"></div></div>
          <span style="width:36px;text-align:right;font-size:12px;font-weight:700;color:${c}">${e}%</span>
        </div>`).join('')}
      </div>
    </div>

    <!-- Order Pipeline -->
    <div class="card">
      <div class="card-header"><span class="card-title">Order Pipeline</span><button class="btn btn-ghost btn-sm" onclick="navigate('sales-order')">All →</button></div>
      <div class="card-body" style="padding:12px">
        ${[['Planning','8','#f59e0b'],['In Production','24','#3b82f6'],['Ready to Dispatch','12','#8b5cf6'],['Dispatched Today','27','#22c55e'],['Delayed','3','#ef4444']].map(([s,n,c]) => `
        <div style="display:flex;align-items:center;justify-content:space-between;padding:6px 0;border-bottom:1px solid #f1f5f9">
          <span style="font-size:13px;display:flex;align-items:center;gap:6px"><span style="width:8px;height:8px;border-radius:50%;background:${c};display:inline-block"></span>${s}</span>
          <span style="font-size:16px;font-weight:800;color:${c}">${n}</span>
        </div>`).join('')}
      </div>
    </div>

    <!-- Alerts -->
    <div class="card">
      <div class="card-header"><span class="card-title" style="color:var(--color-error-text)"><i class="bi bi-bell-fill"></i> Active Alerts</span><span class="tag tag-red">5</span></div>
      <div class="card-body" style="padding:10px;display:flex;flex-direction:column;gap:6px">
        <div style="padding:8px;background:#fef2f2;border-radius:6px;border-left:3px solid #ef4444;font-size:12px"><b>CRITICAL:</b> Starch Powder — 2 days stock remaining</div>
        <div style="padding:8px;background:#fef2f2;border-radius:6px;border-left:3px solid #ef4444;font-size:12px"><b>DELAYED:</b> JC-2026-089 — Amul Dairy (4 hrs delay)</div>
        <div style="padding:8px;background:#fffbeb;border-radius:6px;border-left:3px solid #f59e0b;font-size:12px"><b>LOW STOCK:</b> Magenta Ink — 3 days remaining</div>
        <div style="padding:8px;background:#fffbeb;border-radius:6px;border-left:3px solid #f59e0b;font-size:12px"><b>OVERDUE:</b> Star Packaging — ₹2.4L (45 days)</div>
        <div style="padding:8px;background:#eff6ff;border-radius:6px;border-left:3px solid #3b82f6;font-size:12px"><b>INFO:</b> 3 orders ready — no vehicle assigned</div>
      </div>
    </div>
  </div>

  <!-- Cash Flow + Inventory Ageing row -->
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:14px">
    <div class="card">
      <div class="card-header"><span class="card-title">Cash Position</span></div>
      <div class="card-body">
        <div class="desc-grid cols-2">
          <div class="desc-item"><div class="desc-label">Receivable Total</div><div class="desc-value font-bold" style="color:var(--color-error-text)">₹14,20,000</div></div>
          <div class="desc-item"><div class="desc-label">Overdue (&gt;30 days)</div><div class="desc-value font-bold" style="color:var(--color-error-text)">₹4,80,000</div></div>
          <div class="desc-item"><div class="desc-label">Payable (Vendor)</div><div class="desc-value">₹6,50,000</div></div>
          <div class="desc-item"><div class="desc-label">Net Cash Position</div><div class="desc-value font-bold" style="color:var(--color-success-text)">₹7,70,000</div></div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-header"><span class="card-title">Inventory Ageing</span></div>
      <div class="card-body">
        <div class="desc-grid cols-2">
          <div class="desc-item"><div class="desc-label">0–3 Days (Fresh)</div><div class="desc-value font-bold" style="color:var(--color-success-text)">₹12.4L</div></div>
          <div class="desc-item"><div class="desc-label">3–30 Days</div><div class="desc-value">₹8.2L</div></div>
          <div class="desc-item"><div class="desc-label">30–90 Days (Slow)</div><div class="desc-value font-bold" style="color:var(--color-warning-text)">₹5.8L</div></div>
          <div class="desc-item"><div class="desc-label">&gt;90 Days (Dead)</div><div class="desc-value font-bold" style="color:var(--color-error-text)">₹2.1L</div></div>
        </div>
      </div>
    </div>
  </div>
</div>
`);

});
