document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('contentArea').insertAdjacentHTML('beforeend', `
<div class="page" id="page-dispatch-queue">
  <div class="page-header">
    <div>
      <div class="page-title">Dispatch Queue</div>
      <div class="page-subtitle">Orders ready for dispatch — vehicle assignment and loading management</div>
    </div>
    <div class="page-actions">
      <button class="btn btn-secondary btn-sm"><i class="bi bi-download"></i> Export</button>
      <button class="btn btn-secondary btn-sm"><i class="bi bi-arrow-clockwise"></i></button>
    </div>
  </div>

  <!-- Summary strip -->
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:16px">
    ${[
      ['Ready to Dispatch','12','#22c55e','bi-check-circle-fill','tag-green'],
      ['Vehicle Assigned','8','#3b82f6','bi-truck','tag-blue'],
      ['Awaiting Vehicle','4','#f59e0b','bi-hourglass','tag-gold'],
      ['Dispatched Today','27','#003366','bi-Deck-arrow-right','tag-navy'],
    ].map(([lbl,val,col,icon,tag]) => `
    <div style="background:#fff;border:1px solid var(--bd-default);border-radius:8px;padding:14px 16px;border-left:4px solid ${col};Deck-shadow:var(--shadow-sm);display:flex;align-items:center;gap:14px">
      <i class="bi ${icon}" style="font-size:26px;color:${col}"></i>
      <div>
        <div style="font-size:24px;font-weight:800;color:var(--fg-default)">${val}</div>
        <div style="font-size:12px;color:var(--fg-muted);font-weight:500">${lbl}</div>
      </div>
    </div>`).join('')}
  </div>

  <div class="toolbar">
    <div class="toolbar-left">
      <div class="seg-tabs">
        <div class="seg-tab active">All Ready</div>
        <div class="seg-tab">Awaiting Vehicle</div>
        <div class="seg-tab">Loading</div>
        <div class="seg-tab">Dispatched</div>
      </div>
      <div class="search-input-wrap">
        <i class="bi bi-search"></i>
        <input class="search-input" placeholder="Search order, customer, vehicle..." />
      </div>
    </div>
    <div class="toolbar-right">
      <input class="form-input" type="date" value="2026-06-30" style="width:135px;padding:5px 8px" />
    </div>
  </div>

  <div class="grid-wrap">
    <table class="data-table">
      <thead>
        <tr>
          <th>Order No</th>
          <th>Customer</th>
          <th>Product</th>
          <th>Qty (Decks)</th>
          <th>Weight (kg)</th>
          <th>Ready Since</th>
          <th>Vehicle</th>
          <th>Driver</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${[
          ['SO-1278','Godrej Consumer','Storage Deck 5-GSM','30,000','4,200','29 Jun 4:00 PM','MH12 AB 1234','Ramesh D.','Ready'],
          ['SO-1279','Dabur Ltd','Shampoo Carton 3-GSM','45,000','2,800','29 Jun 6:30 PM','GJ05 CD 5678','Suresh P.','Loading'],
          ['SO-1280','Asian Paints','Paint Deck 5-GSM','18,500','3,100','30 Jun 9:00 AM',null,null,'No Vehicle'],
          ['SO-1281','Nestle India','Cereal Deck 3-GSM','22,000','1,650','30 Jun 10:30 AM',null,null,'No Vehicle'],
          ['SO-1275','Amul Dairy','Export Poker Size 7-GSM','1,00,000','18,400','28 Jun 2:00 PM','MH04 EF 9012','Dinesh K.','Dispatched'],
          ['SO-1276','Metro Cash','Retail Deck 5-GSM','25,000','3,800','28 Jun 5:00 PM','RJ14 GH 3456','Arun V.','Dispatched'],
          ['SO-1277','Patanjali','FMCG Carton 3-GSM','80,000','4,200','29 Jun 11:00 AM','UP32 IJ 7890','Vijay S.','Dispatched'],
        ].map(([so,cust,prod,qty,wt,since,veh,drv,status]) => {
          const stColor = status==='Dispatched'?'green':status==='Loading'?'blue':status==='Ready'?'cyan':'red';
          const stLabel = status==='No Vehicle'?'Awaiting Vehicle':status;
          return `<tr onclick="openModal('modal-dispatch-detail')">
            <td><b>${so}</b></td>
            <td>${cust}</td>
            <td style="font-size:12px">${prod}</td>
            <td class="text-right font-bold">${qty}</td>
            <td class="text-right muted">${wt}</td>
            <td class="muted" style="font-size:12px">${since}</td>
            <td>${veh ? `<span class="tag tag-navy">${veh}</span>` : '<span class="tag tag-red">Not Assigned</span>'}</td>
            <td class="muted">${drv || '—'}</td>
            <td><span class="tag tag-${stColor}">${stLabel}</span></td>
            <td class="actions-cell">
              ${status==='No Vehicle' ? `<button class="btn btn-create btn-sm" onclick="event.stopPropagation();openModal('modal-assign-vehicle')"><i class="bi bi-truck"></i> Assign</button>` : ''}
              ${status==='Ready'||status==='Loading' ? `<button class="btn btn-save btn-sm" onclick="event.stopPropagation();navigate('challan')"><i class="bi bi-file-earmark-text"></i> Challan</button>` : ''}
              ${status==='Dispatched' ? `<button class="btn btn-ghost btn-icon btn-sm"><i class="bi bi-eye"></i></button>` : ''}
            </td>
          </tr>`;
        }).join('')}
      </tbody>
    </table>
    <div class="grid-footer">
      <span>Showing 7 of 27 records today</span>
      <div class="pagination">
        <button class="page-btn active">1</button>
        <button class="page-btn">2</button>
        <button class="page-btn">3</button>
      </div>
    </div>
  </div>
</div>

<!-- Assign Vehicle Modal -->
<div class="modal-overlay hidden" id="modal-assign-vehicle">
  <div class="modal modal-sm">
    <div class="modal-header">
      <div class="modal-icon"><i class="bi bi-truck"></i></div>
      <div><div class="modal-title">Assign Vehicle</div><div class="modal-sub">SO-1280 — Asian Paints — 18,500 Decks</div></div>
      <button class="modal-close" onclick="closeModal('modal-assign-vehicle')"><i class="bi bi-x"></i></button>
    </div>
    <div class="modal-body">
      <div class="alert alert-info" style="margin-bottom:14px;font-size:12px">
        <i class="bi bi-info-circle"></i>
        <span>Total weight: <b>3,100 kg</b> &nbsp;|&nbsp; Volume: approx <b>42 CBM</b></span>
      </div>
      <div class="field-group">
        <label class="field-label required">Vehicle</label>
        <select class="form-select">
          <option>— Select Available Vehicle —</option>
          <option>MH12 EF 9012 — TATA 407 (Capacity: 4T)</option>
          <option>GJ05 GH 3456 — Eicher 14ft (Capacity: 5T)</option>
        </select>
      </div>
      <div class="field-group">
        <label class="field-label required">Driver</label>
        <select class="form-select">
          <option>— Select Driver —</option>
          <option>Ramesh Chandra — MH Lic</option>
          <option>Vikram Singh — RJ Lic</option>
        </select>
      </div>
      <div class="field-group">
        <label class="field-label">Driver Mobile</label>
        <input class="form-input" placeholder="Mobile number" type="tel" />
      </div>
      <div class="field-group">
        <label class="field-label">Delivery Address</label>
        <textarea class="form-textarea" style="min-height:60px">Asian Paints Ltd, Plant 4, Turbhe, Navi Mumbai — 400705</textarea>
      </div>
      <div class="form-row cols-2">
        <div class="field-group">
          <label class="field-label">Departure Time</label>
          <input class="form-input" type="datetime-local" value="2026-06-30T14:00" />
        </div>
        <div class="field-group">
          <label class="field-label">Expected Delivery</label>
          <input class="form-input" type="date" value="2026-07-01" />
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal('modal-assign-vehicle')">Cancel</button>
      <button class="btn btn-save" onclick="closeModal('modal-assign-vehicle');navigate('challan')"><i class="bi bi-truck"></i> Assign & Create Challan</button>
    </div>
  </div>
</div>

<!-- Dispatch Detail Modal -->
<div class="modal-overlay hidden" id="modal-dispatch-detail">
  <div class="modal modal-md">
    <div class="modal-header">
      <div class="modal-icon" style="background:#f0fdf4;color:var(--color-success-text)"><i class="bi bi-Deck-arrow-right"></i></div>
      <div><div class="modal-title">Dispatch Detail — SO-1278</div><div class="modal-sub">Godrej Consumer — Storage Deck 5-GSM</div></div>
      <button class="modal-close" onclick="closeModal('modal-dispatch-detail')"><i class="bi bi-x"></i></button>
    </div>
    <div class="modal-body">
      <div class="desc-grid cols-3" style="margin-bottom:14px">
        <div class="desc-item"><div class="desc-label">Order No</div><div class="desc-value font-bold">SO-1278</div></div>
        <div class="desc-item"><div class="desc-label">Customer</div><div class="desc-value">Godrej Consumer</div></div>
        <div class="desc-item"><div class="desc-label">Status</div><div class="desc-value"><span class="tag tag-cyan">Ready</span></div></div>
        <div class="desc-item"><div class="desc-label">Quantity</div><div class="desc-value font-bold">30,000 Decks</div></div>
        <div class="desc-item"><div class="desc-label">Weight</div><div class="desc-value">4,200 kg</div></div>
        <div class="desc-item"><div class="desc-label">Ready Since</div><div class="desc-value">29 Jun, 4:00 PM</div></div>
        <div class="desc-item"><div class="desc-label">Vehicle</div><div class="desc-value">MH12 AB 1234</div></div>
        <div class="desc-item"><div class="desc-label">Driver</div><div class="desc-value">Ramesh D.</div></div>
        <div class="desc-item"><div class="desc-label">Driver Mobile</div><div class="desc-value">9876543210</div></div>
      </div>
      <div class="desc-item"><div class="desc-label">Delivery Address</div><div class="desc-value" style="margin-top:4px">Godrej Warehouse, MIDC Andheri, Mumbai — 400093</div></div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal('modal-dispatch-detail')">Close</button>
      <button class="btn btn-print"><i class="bi bi-printer"></i> Print Loading Slip</button>
      <button class="btn btn-save" onclick="closeModal('modal-dispatch-detail');navigate('challan')"><i class="bi bi-file-earmark-text"></i> Create Challan</button>
    </div>
  </div>
</div>
`);
});
