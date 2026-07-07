document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('contentArea').insertAdjacentHTML('beforeend', `
<div class="page" id="page-finished-goods">
  <div class="page-header">
    <div><div class="page-title">Finished Goods Inventory</div><div class="page-subtitle">Real-time visibility of printed stock, finished Decks and dispatch-ready goods</div></div>
    <div class="page-actions">
      <button class="btn btn-secondary btn-sm"><i class="bi bi-download"></i> Export</button>
      <button class="btn btn-secondary btn-sm"><i class="bi bi-arrow-clockwise"></i></button>
      <button class="btn btn-create" onclick="openModal('modal-fg-receive')"><i class="bi bi-plus"></i> Add Stock</button>
    </div>
  </div>

  <!-- Summary KPIs -->
  <div class="kpi-grid" style="grid-template-columns:repeat(4,1fr);margin-bottom:16px">
    <div class="kpi-card" style="--kpi-color:#3b82f6;--kpi-icon-bg:#eff6ff"><div class="kpi-icon"><i class="bi bi-printer"></i></div><div class="kpi-value">8</div><div class="kpi-label">Printed Stock Items</div><div class="kpi-trend"><span style="font-size:12px">1,45,000 Decks ready</span></div></div>
    <div class="kpi-card" style="--kpi-color:#22c55e;--kpi-icon-bg:#f0fdf4"><div class="kpi-icon"><i class="bi bi-Deck-seam-fill"></i></div><div class="kpi-value">38,500</div><div class="kpi-label">Finished Deck Stock</div><div class="kpi-trend up"><i class="bi bi-arrow-up-short"></i> +12,000 today</div></div>
    <div class="kpi-card" style="--kpi-color:#8b5cf6;--kpi-icon-bg:#f5f3ff"><div class="kpi-icon"><i class="bi bi-truck"></i></div><div class="kpi-value">4</div><div class="kpi-label">Dispatch Ready Orders</div><div class="kpi-trend"><span style="font-size:12px">75,500 Decks</span></div></div>
    <div class="kpi-card" style="--kpi-color:#f59e0b;--kpi-icon-bg:#fffbeb"><div class="kpi-icon"><i class="bi bi-hourglass"></i></div><div class="kpi-value">12</div><div class="kpi-label">Pending Orders</div><div class="kpi-trend down"><i class="bi bi-exclamation-circle"></i> 2 delayed</div></div>
  </div>

  <div class="toolbar">
    <div class="toolbar-left">
      <div class="seg-tabs">
        <div class="seg-tab active">All Stock</div>
        <div class="seg-tab">Printed</div>
        <div class="seg-tab">Finished</div>
        <div class="seg-tab">Dispatch Ready</div>
        <div class="seg-tab">Pending</div>
      </div>
      <div class="search-input-wrap"><i class="bi bi-search"></i><input class="search-input" placeholder="Search product, customer..." /></div>
    </div>
    <div class="toolbar-right">
      <select class="form-select" style="width:150px;padding:5px 8px">
        <option>All Customers</option>
        <option>Amul Dairy</option>
        <option>ITC Ltd</option>
        <option>HUL</option>
      </select>
    </div>
  </div>

  <div class="grid-wrap">
    <table class="data-table">
      <thead>
        <tr>
          <th>Job Card</th>
          <th>Sales Order</th>
          <th>Customer</th>
          <th>Product</th>
          <th>Order Qty</th>
          <th>In Process</th>
          <th>Printed</th>
          <th>Finished</th>
          <th>Dispatched</th>
          <th>Balance</th>
          <th>Stage</th>
          <th>Days in Stock</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${[
          ['JC-2026-087','SO-1282','Godrej','Storage Deck 5-GSM','30,000','0','30,000','30,000','0','30,000','Dispatch Ready',2],
          ['JC-2026-088','SO-1283','Dabur','Shampoo Carton 3-GSM','1,20,000','0','1,20,000','96,000','0','1,20,000','Partly Finished',1],
          ['JC-2026-089','SO-1284','Amul Dairy','Poker Size Export 7-GSM','1,00,000','33,000','67,000','0','0','1,00,000','In Production',0],
          ['JC-2026-090','SO-1285','Metro Cash','Slotted Deck 5-GSM','25,000','17,500','7,500','0','0','25,000','In Production',0],
          ['JC-2026-085','SO-1280','Asian Paints','Paint Deck 5-GSM','18,500','9,200','9,300','9,300','9,300','9,200','Partly Dispatched',3],
          ['JC-2026-082','SO-1275','ITC Ltd','Cigarette Inner','5,00,000','0','5,00,000','5,00,000','5,00,000','0','Fully Dispatched',5],
          ['JC-2026-081','SO-1274','HUL','Soap Carton 3-GSM','2,50,000','0','2,50,000','2,50,000','0','2,50,000','Dispatch Ready',4],
        ].map(([jc,so,cust,prod,oq,inp,prt,fin,disp,bal,stage,days]) => {
          const stColor = stage==='Dispatch Ready'?'cyan':stage==='In Production'?'blue':stage==='Fully Dispatched'?'green':stage==='Partly Dispatched'?'purple':'orange';
          const daysColor = days>=5?'color:var(--color-error-text);font-weight:700':days>=3?'color:var(--color-warning-text);font-weight:600':'';
          return `<tr onclick="openModal('modal-fg-detail')">
            <td><b>${jc}</b></td>
            <td><span class="text-primary" style="font-size:12px">${so}</span></td>
            <td>${cust}</td>
            <td style="font-size:12px">${prod}</td>
            <td class="text-right">${oq}</td>
            <td class="text-right muted">${inp}</td>
            <td class="text-right" style="color:var(--color-info-text)">${prt}</td>
            <td class="text-right" style="color:var(--color-success-text);font-weight:600">${fin}</td>
            <td class="text-right muted">${disp}</td>
            <td class="text-right font-bold">${bal}</td>
            <td><span class="tag tag-${stColor}" style="font-size:10px">${stage}</span></td>
            <td style="text-align:center;font-size:13px;${daysColor}">${days > 0 ? days + 'd' : '—'}</td>
            <td class="actions-cell">
              <button class="btn btn-ghost btn-icon btn-sm"><i class="bi bi-eye"></i></button>
              ${stage==='Dispatch Ready'||stage.includes('Finished')?`<button class="btn btn-save btn-sm" onclick="event.stopPropagation();navigate('dispatch-queue')"><i class="bi bi-truck"></i> Dispatch</button>`:''}
            </td>
          </tr>`;
        }).join('')}
      </tbody>
    </table>
    <div class="grid-footer"><span>Showing 7 of 47 active jobs</span>
      <div class="pagination"><button class="page-btn active">1</button><button class="page-btn">2</button><button class="page-btn">3</button></div>
    </div>
  </div>
</div>

<!-- Add FG Stock Modal -->
<div class="modal-overlay hidden" id="modal-fg-receive">
  <div class="modal modal-md">
    <div class="modal-header">
      <div class="modal-icon"><i class="bi bi-Deck-seam"></i></div>
      <div><div class="modal-title">Add Finished Goods to Stock</div><div class="modal-sub">Record completed Decks from production floor</div></div>
      <button class="modal-close" onclick="closeModal('modal-fg-receive')"><i class="bi bi-x"></i></button>
    </div>
    <div class="modal-body">
      <div class="form-row cols-2">
        <div class="field-group"><label class="field-label required">Job Card</label><select class="form-select"><option>JC-2026-089 — Amul</option><option>JC-2026-088 — Dabur</option></select></div>
        <div class="field-group"><label class="field-label required">Date</label><input class="form-input" type="date" value="2026-06-30" /></div>
      </div>
      <div class="form-row cols-2">
        <div class="field-group"><label class="field-label required">Stage Completed</label><select class="form-select"><option>Printing</option><option>Collation</option><option>Varnishing</option><option selected>Punching (Final)</option></select></div>
        <div class="field-group"><label class="field-label required">Qty Received to Godown</label><input class="form-input" type="number" placeholder="Number of Decks" /></div>
      </div>
      <div class="field-group"><label class="field-label">Godown Location</label><select class="form-select"><option>Main Warehouse</option><option>FG Store-A</option><option>FG Store-B</option></select></div>
      <div class="field-group"><label class="field-label">QC Status</label>
        <div style="display:flex;gap:16px;margin-top:6px">
          <label style="display:flex;align-items:center;gap:6px;cursor:pointer"><input type="radio" name="qc" checked /> <span>Passed</span></label>
          <label style="display:flex;align-items:center;gap:6px;cursor:pointer"><input type="radio" name="qc" /> <span>Failed</span></label>
          <label style="display:flex;align-items:center;gap:6px;cursor:pointer"><input type="radio" name="qc" /> <span>Conditional</span></label>
        </div>
      </div>
      <div class="field-group"><label class="field-label">Remark</label><textarea class="form-textarea" style="min-height:50px" placeholder="Any notes about quality or condition..."></textarea></div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal('modal-fg-receive')">Cancel</button>
      <button class="btn btn-save"><i class="bi bi-check-lg"></i> Add to FG Stock</button>
    </div>
  </div>
</div>

<!-- FG Detail Modal -->
<div class="modal-overlay hidden" id="modal-fg-detail">
  <div class="modal modal-md">
    <div class="modal-header">
      <div class="modal-icon" style="background:#f5f3ff;color:#6d28d9"><i class="bi bi-Deck-seam-fill"></i></div>
      <div><div class="modal-title">JC-2026-087 — Godrej Storage Deck</div><div class="modal-sub">SO-1282 | 5-GSM | 30,000 Decks | Dispatch Ready</div></div>
      <button class="modal-close" onclick="closeModal('modal-fg-detail')"><i class="bi bi-x"></i></button>
    </div>
    <div class="modal-body">
      <div class="stat-row">
        <div class="stat-Deck"><div class="stat-Deck-val font-bold">30,000</div><div class="stat-Deck-lbl">Order Qty</div></div>
        <div class="stat-Deck"><div class="stat-Deck-val" style="color:var(--color-success-text)">30,000</div><div class="stat-Deck-lbl">In FG Store</div></div>
        <div class="stat-Deck"><div class="stat-Deck-val">0</div><div class="stat-Deck-lbl">Dispatched</div></div>
        <div class="stat-Deck"><div class="stat-Deck-val" style="color:var(--color-warning-text)">2 Days</div><div class="stat-Deck-lbl">In Stock</div></div>
      </div>
      <div class="desc-grid cols-2" style="margin-top:12px">
        <div class="desc-item"><div class="desc-label">Godown</div><div class="desc-value">FG Store-A</div></div>
        <div class="desc-item"><div class="desc-label">QC Status</div><div class="desc-value"><span class="tag tag-green">Passed</span></div></div>
        <div class="desc-item"><div class="desc-label">Production Complete</div><div class="desc-value">28 Jun 2026</div></div>
        <div class="desc-item"><div class="desc-label">Customer</div><div class="desc-value font-bold">Godrej Consumer</div></div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal('modal-fg-detail')">Close</button>
      <button class="btn btn-save" onclick="closeModal('modal-fg-detail');navigate('dispatch-queue')"><i class="bi bi-truck"></i> Send to Dispatch</button>
    </div>
  </div>
</div>
`);
});
