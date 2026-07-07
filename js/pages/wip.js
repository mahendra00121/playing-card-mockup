document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('contentArea').insertAdjacentHTML('beforeend', `
<div class="page" id="page-wip">
  <div class="page-header">
    <div><div class="page-title">WIP — Work In Progress</div><div class="page-subtitle">Multi-component order tracking — Deck, fitment, honeycomb, partition, plate</div></div>
    <div class="page-actions">
      <button class="btn btn-secondary btn-sm" onclick="navigate('wip')"><i class="bi bi-arrow-clockwise"></i> Refresh</button>
    </div>
  </div>

  <div class="kpi-grid" style="grid-template-columns:repeat(4,1fr)">
    <div class="kpi-card" style="--kpi-color:#3b82f6;--kpi-icon-bg:#eff6ff"><div class="kpi-icon"><i class="bi bi-Decks"></i></div><div class="kpi-value">47</div><div class="kpi-label">Total WIP Orders</div></div>
    <div class="kpi-card" style="--kpi-color:#22c55e;--kpi-icon-bg:#f0fdf4"><div class="kpi-icon"><i class="bi bi-check-all"></i></div><div class="kpi-value">12</div><div class="kpi-label">All Components Ready</div></div>
    <div class="kpi-card" style="--kpi-color:#f59e0b;--kpi-icon-bg:#fffbeb"><div class="kpi-icon"><i class="bi bi-exclamation-circle"></i></div><div class="kpi-value">28</div><div class="kpi-label">Partial Ready</div></div>
    <div class="kpi-card" style="--kpi-color:#ef4444;--kpi-icon-bg:#fef2f2"><div class="kpi-icon"><i class="bi bi-x-circle"></i></div><div class="kpi-value">7</div><div class="kpi-label">Component Blocked</div></div>
  </div>

  <div class="toolbar">
    <div class="toolbar-left">
      <div class="seg-tabs">
        <div class="seg-tab active">All</div>
        <div class="seg-tab">Component Blocked</div>
        <div class="seg-tab">Partial Ready</div>
        <div class="seg-tab">All Ready</div>
      </div>
      <div class="search-input-wrap"><i class="bi bi-search"></i><input class="search-input" placeholder="Search order, customer..." /></div>
    </div>
  </div>

  <div class="grid-wrap">
    <table class="data-table">
      <thead>
        <tr>
          <th>Job Card</th>
          <th>Customer</th>
          <th>Product</th>
          <th>Order Qty</th>
          <th style="text-align:center">Deck Ready</th>
          <th style="text-align:center">Partition</th>
          <th style="text-align:center">Honeycomb</th>
          <th style="text-align:center">Plate</th>
          <th style="text-align:center">Fitment</th>
          <th>Completion %</th>
          <th>Blocked By</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        ${[
          ['JC-2026-089','Amul Dairy','Poker Size Export 7-GSM','1,00,000',true,false,false,true,false,40,'Honeycomb, Partition','Blocked'],
          ['JC-2026-090','Metro Cash','Slotted Deck 5-GSM','25,000',true,true,true,true,true,100,null,'Ready'],
          ['JC-2026-091','Patanjali','FMCG Carton 3-GSM','80,000',false,false,true,false,true,40,'Deck, Partition, Plate','Blocked'],
          ['JC-2026-092','ITC Ltd','Industrial Deck 7-GSM','1,20,000',true,true,false,true,false,60,'Honeycomb, Fitment','Partial'],
          ['JC-2026-087','Godrej','Storage Deck 5-GSM','30,000',true,true,true,true,true,100,null,'Ready'],
          ['JC-2026-086','Asian Paints','Paint Deck 5-GSM','18,500',true,false,true,true,true,80,'Partition','Partial'],
          ['JC-2026-088','Dabur','Shampoo Carton 3-GSM','1,20,000',true,true,true,true,false,80,'Fitment','Partial'],
        ].map(([jc,cust,prod,qty,Deck,part,honey,plate,fit,pct,blocked,status]) => {
          const stColor = status==='Ready'?'green':status==='Blocked'?'red':'orange';
          const c = (v) => `<span style="font-size:18px">${v?'✅':'❌'}</span>`;
          const pctColor = pct===100?'success':pct>=60?'':'warning';
          return `<tr onclick="openModal('modal-wip-detail')">
            <td><b>${jc}</b></td><td>${cust}</td><td style="font-size:12px">${prod}</td><td class="text-right">${qty}</td>
            <td style="text-align:center">${c(Deck)}</td>
            <td style="text-align:center">${c(part)}</td>
            <td style="text-align:center">${c(honey)}</td>
            <td style="text-align:center">${c(plate)}</td>
            <td style="text-align:center">${c(fit)}</td>
            <td style="min-width:100px">
              <div style="display:flex;align-items:center;gap:5px">
                <div class="progress-bar" style="width:65px"><div class="progress-fill ${pctColor}" style="width:${pct}%"></div></div>
                <span style="font-size:11px;font-weight:700">${pct}%</span>
              </div>
            </td>
            <td style="font-size:11px;color:var(--color-error-text)">${blocked || '—'}</td>
            <td><span class="tag tag-${stColor}">${status}</span></td>
          </tr>`;
        }).join('')}
      </tbody>
    </table>
    <div class="grid-footer"><span>Showing 7 of 47 WIP orders</span></div>
  </div>
</div>

<!-- WIP Detail Modal -->
<div class="modal-overlay hidden" id="modal-wip-detail">
  <div class="modal modal-md">
    <div class="modal-header">
      <div class="modal-icon" style="background:#fff7ed;color:#c2410c"><i class="bi bi-Decks"></i></div>
      <div><div class="modal-title">WIP Detail — JC-2026-089</div><div class="modal-sub">Amul Dairy — Poker Size Export 7-GSM — 1,00,000 Decks</div></div>
      <button class="modal-close" onclick="closeModal('modal-wip-detail')"><i class="bi bi-x"></i></button>
    </div>
    <div class="modal-body">
      <div class="alert alert-error" style="margin-bottom:14px"><i class="bi bi-exclamation-octagon"></i> <b>Blocked by:</b> Honeycomb and Partition not ready. Order cannot be completed.</div>
      <table class="line-table">
        <thead><tr><th>Component</th><th>Required Qty</th><th>Ready Qty</th><th>Pending</th><th>Status</th><th>Expected</th></tr></thead>
        <tbody>
          <tr><td><b>Deck (Main)</b></td><td>1,00,000</td><td>67,000</td><td>33,000</td><td><span class="tag tag-blue">In Progress</span></td><td>30 Jun 8 PM</td></tr>
          <tr><td><b>Partition</b></td><td>1,00,000</td><td>0</td><td>1,00,000</td><td><span class="tag tag-red">Not Started</span></td><td>2 Jul</td></tr>
          <tr><td><b>Honeycomb</b></td><td>50,000</td><td>0</td><td>50,000</td><td><span class="tag tag-red">Not Ready</span></td><td>3 Jul</td></tr>
          <tr><td><b>Plate</b></td><td>4</td><td>4</td><td>0</td><td><span class="tag tag-green">Ready</span></td><td>—</td></tr>
          <tr><td><b>Fitment</b></td><td>—</td><td>—</td><td>—</td><td><span class="tag tag-gray">N/A</span></td><td>—</td></tr>
        </tbody>
      </table>
      <div class="divider"></div>
      <div class="stat-row">
        <div class="stat-Deck"><div class="stat-Deck-val" style="color:var(--color-error-text)">40%</div><div class="stat-Deck-lbl">Overall Complete</div></div>
        <div class="stat-Deck"><div class="stat-Deck-val" style="color:var(--color-warning-text)">3 Days</div><div class="stat-Deck-lbl">Est. Delay</div></div>
        <div class="stat-Deck"><div class="stat-Deck-val">₹22.5L</div><div class="stat-Deck-lbl">Order Value</div></div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal('modal-wip-detail')">Close</button>
      <button class="btn btn-create" onclick="closeModal('modal-wip-detail');navigate('job-card')"><i class="bi bi-journal-text"></i> View Job Card</button>
    </div>
  </div>
</div>
`);
});
