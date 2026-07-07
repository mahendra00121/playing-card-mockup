document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('contentArea').insertAdjacentHTML('beforeend', `
<div class="page" id="page-sales-order">
  <div class="page-header">
    <div><div class="page-title">Sales Order</div><div class="page-subtitle">Confirmed orders — track approval, production and dispatch</div></div>
    <div class="page-actions">
      <div class="seg-tabs" style="margin-right:8px">
        <div class="seg-tab active">All</div>
        <div class="seg-tab">Pending</div>
        <div class="seg-tab">Approved</div>
        <div class="seg-tab">Hold</div>
        <div class="seg-tab">Rejected</div>
      </div>
      <button class="btn btn-secondary btn-sm"><i class="bi bi-download"></i> Export</button>
      <button class="btn btn-create" onclick="openModal('modal-so-new')"><i class="bi bi-plus"></i> New Sales Order</button>
    </div>
  </div>
  <div class="toolbar">
    <div class="toolbar-left">
      <div class="search-input-wrap"><i class="bi bi-search"></i><input class="search-input" placeholder="SO no, customer, PO no..." /></div>
      <input class="form-input" type="date" value="2026-06-01" style="width:130px;padding:5px 8px" />
      <input class="form-input" type="date" value="2026-06-30" style="width:130px;padding:5px 8px" />
    </div>
    <div class="toolbar-right">
      <button class="btn btn-ghost btn-sm"><i class="bi bi-arrow-clockwise"></i> Refresh</button>
    </div>
  </div>
  <div class="grid-wrap">
    <table class="data-table">
      <thead>
        <tr>
          <th>SO No</th><th>Order Date</th><th>Client</th><th>Mobile</th><th>State</th>
          <th>PO No</th><th>PO Date</th><th>Items</th><th>Grand Total</th>
          <th>Prod. %</th><th>Dispatch</th><th>Status</th><th>Remark</th><th></th>
        </tr>
      </thead>
      <tbody>
        ${[
          ['SO-2026-1288','28 Jun','Amul Dairy','98765 43210','Gujarat','AMUL/PO/2026/445','25 Jun','3','₹2,25,000',72,'Partial','Approved',''],
          ['SO-2026-1287','27 Jun','ITC Ltd','98766 43211','Tamil Nadu','ITC/PO/884','24 Jun','1','₹84,000',45,'Pending','Approved',''],
          ['SO-2026-1286','26 Jun','Patanjali','98767 43212','Uttarakhand','PAT/2026/112','22 Jun','2','₹1,12,000',90,'Ready','Approved',''],
          ['SO-2026-1285','25 Jun','Metro Cash','98768 43213','Maharashtra','MC/PO/331','20 Jun','1','₹55,000',0,'Pending','Hold','Credit check'],
          ['SO-2026-1284','24 Jun','HUL','98769 43214','Maharashtra','HUL/PO/7721','18 Jun','4','₹3,68,000',100,'Dispatched','Approved',''],
          ['SO-2026-1283','22 Jun','Nestle','98770 43215','Maharashtra','NES/PO/228','16 Jun','2','₹1,92,000',60,'Partial','Pending','Under review'],
        ].map(([so,dt,cust,mob,st,po,podt,items,total,prod,disp,status,rem]) => {
          const stMap={'Approved':'green','Pending':'gold','Hold':'orange','Rejected':'red'};
          const dispMap={'Dispatched':'green','Ready':'blue','Partial':'orange','Pending':'gray'};
          return `<tr onclick="openModal('modal-so-detail')">
            <td><b>${so}</b></td><td class="muted">${dt}</td><td>${cust}</td>
            <td class="muted" style="font-size:11px">${mob}</td>
            <td class="muted" style="font-size:11px">${st}</td>
            <td style="font-size:11px">${po}</td>
            <td class="muted" style="font-size:11px">${podt}</td>
            <td class="text-center">${items}</td>
            <td class="text-right font-bold">${total}</td>
            <td style="min-width:90px">
              <div style="display:flex;align-items:center;gap:5px">
                <div class="progress-bar" style="flex:1;height:6px"><div class="progress-fill ${prod===100?'success':prod>60?'':'warning'}" style="width:${prod}%"></div></div>
                <span style="font-size:11px;font-weight:700;min-width:28px">${prod}%</span>
              </div>
            </td>
            <td><span class="tag tag-${dispMap[disp]}" style="font-size:10px">${disp}</span></td>
            <td><span class="tag tag-${stMap[status]}">${status}</span></td>
            <td style="font-size:11px;color:var(--fg-muted)">${rem}</td>
            <td class="actions-cell">
              <button class="btn btn-ghost btn-icon btn-sm" onclick="event.stopPropagation();openModal('modal-so-detail')"><i class="bi bi-eye"></i></button>
              <button class="btn btn-edit btn-icon btn-sm" onclick="event.stopPropagation();openModal('modal-so-new')"><i class="bi bi-pencil"></i></button>
              <button class="btn btn-print btn-icon btn-sm"><i class="bi bi-printer"></i></button>
            </td>
          </tr>`;
        }).join('')}
      </tbody>
    </table>
    <div class="grid-footer"><span>Showing 6 of 1,288 orders</span>
      <div class="pagination"><button class="page-btn active">1</button><button class="page-btn">2</button><button class="page-btn">…</button></div>
    </div>
  </div>
</div>

<!-- ── New SO Modal ── -->
<div class="modal-overlay hidden" id="modal-so-new">
  <div class="modal modal-xl">
    <div class="modal-header">
      <div class="modal-icon"><i class="bi bi-receipt-cutoff"></i></div>
      <div><div class="modal-title">New Sales Order</div><div class="modal-sub">Fill customer, PO and line item details</div></div>
      <button class="modal-close" onclick="closeModal('modal-so-new')"><i class="bi bi-x"></i></button>
    </div>
    <div class="modal-body">
      <!-- Header -->
      <div class="form-section-title"><i class="bi bi-person-lines-fill"></i> Order Header</div>
      <div class="form-row cols-4">
        <div class="field-group"><label class="field-label">SO No</label><input class="form-input" value="SO-2026-1289" readonly style="background:var(--bg-subtle)" /></div>
        <div class="field-group"><label class="field-label required">Order Date</label><input class="form-input" type="date" value="2026-06-30" /></div>
        <div class="field-group"><label class="field-label required">Customer</label>
          <select class="form-select"><option>Amul Dairy</option><option>ITC Ltd</option><option>HUL</option></select></div>
        <div class="field-group"><label class="field-label">Sales Type</label>
          <select class="form-select"><option>Domestic</option><option>Export</option><option>Deemed Export</option></select></div>
      </div>
      <div class="form-row cols-4">
        <div class="field-group"><label class="field-label">Client GST No</label><input class="form-input" value="24AAACA0001A1Z5" /></div>
        <div class="field-group"><label class="field-label">Client Mobile</label><input class="form-input" value="98765 43210" /></div>
        <div class="field-group"><label class="field-label">Client State</label><input class="form-input" value="Gujarat" /></div>
        <div class="field-group"><label class="field-label">Sales Rep</label>
          <select class="form-select"><option>Priya Mehta</option><option>Ravi Sharma</option></select></div>
      </div>
      <div class="form-row cols-4">
        <div class="field-group"><label class="field-label">PO No</label><input class="form-input" placeholder="Customer PO number" /></div>
        <div class="field-group"><label class="field-label">PO Date</label><input class="form-input" type="date" /></div>
        <div class="field-group"><label class="field-label">Transporter</label>
          <select class="form-select"><option>Self</option><option>Mahindra Logistics</option><option>DTDC</option></select></div>
        <div class="field-group"><label class="field-label">Consignee</label>
          <select class="form-select"><option>Same as Customer</option><option>Metro Depot — Mumbai</option></select></div>
      </div>
      <div class="form-row cols-2">
        <div class="field-group"><label class="field-label">Delivery Address</label>
          <textarea class="form-textarea" style="min-height:54px" placeholder="Full delivery address...">Amul Dairy Cooperative, Anand — Gujarat 388001</textarea></div>
        <div class="field-group">
          <div class="form-row cols-2" style="margin-bottom:6px">
            <div class="field-group"><label class="field-label">Delivery Contact</label><input class="form-input" value="Rajesh Kumar" /></div>
            <div class="field-group"><label class="field-label">Contact Phone</label><input class="form-input" value="98765 43210" /></div>
          </div>
          <div class="field-group"><label class="field-label">Remark</label><input class="form-input" placeholder="Order remark..." /></div>
        </div>
      </div>

      <!-- Credit Check -->
      <div class="form-section-title" style="margin-top:12px"><i class="bi bi-shield-check"></i> Credit Check</div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;background:var(--bg-subtle);border:1px solid var(--bd-default);border-radius:8px;padding:12px;margin-bottom:14px">
        <div style="text-align:center"><div style="font-size:11px;color:var(--fg-muted)">Credit Limit</div><div style="font-size:20px;font-weight:800;color:var(--primary)">₹50,00,000</div></div>
        <div style="text-align:center"><div style="font-size:11px;color:var(--fg-muted)">Outstanding</div><div style="font-size:20px;font-weight:800;color:var(--color-error-text)">₹12,40,000</div></div>
        <div style="text-align:center"><div style="font-size:11px;color:var(--fg-muted)">Available Credit</div><div style="font-size:20px;font-weight:800;color:var(--color-success-text)">₹37,60,000</div></div>
      </div>

      <!-- Line Items -->
      <div class="form-section-title"><i class="bi bi-list-ul"></i> Line Items</div>
      <table class="line-table">
        <thead>
          <tr><th>#</th><th>Product</th><th>Category</th><th>Size OD</th><th>GSM</th><th>Qty</th><th>Rate</th><th>Rate Type</th><th>Basic Amt</th><th>Disc%</th><th>Taxable</th><th>GST%</th><th>CGST</th><th>SGST</th><th>Net Amt</th><th>Del. Date</th><th>Remark</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td><select class="form-select" style="font-size:11px;padding:3px 5px;min-width:130px"><option>PM-0089 — Amul Poker Size 7-GSM</option></select></td>
            <td style="font-size:11px">Playing Card Deck</td>
            <td style="font-size:11px">500×350×300mm</td>
            <td class="text-center">7</td>
            <td><input class="form-input" value="100000" style="width:70px;padding:3px 5px;font-size:11px" /></td>
            <td><input class="form-input" value="22.50" style="width:60px;padding:3px 5px;font-size:11px" /></td>
            <td style="font-size:11px">Per PCS</td>
            <td class="text-right" style="font-size:11px;font-weight:600">₹22,50,000</td>
            <td><input class="form-input" value="0" style="width:40px;padding:3px 5px;font-size:11px" /></td>
            <td class="text-right" style="font-size:11px">₹22,50,000</td>
            <td class="text-center" style="font-size:11px">18%</td>
            <td class="text-right" style="font-size:11px">₹2,02,500</td>
            <td class="text-right" style="font-size:11px">₹2,02,500</td>
            <td class="text-right font-bold" style="font-size:11px">₹26,55,000</td>
            <td><input class="form-input" type="date" value="2026-07-15" style="padding:3px 5px;font-size:11px;width:110px" /></td>
            <td><input class="form-input" placeholder="..." style="width:70px;padding:3px 5px;font-size:11px" /></td>
          </tr>
          <tr><td colspan="17" style="text-align:center;padding:8px"><button class="btn btn-ghost btn-sm"><i class="bi bi-plus"></i> Add Line</button></td></tr>
        </tbody>
        <tfoot>
          <tr><td colspan="8" style="font-weight:700">Grand Total</td><td colspan="3" class="text-right">₹22,50,000</td><td colspan="2" class="text-right">₹4,05,000</td><td class="text-right font-bold" style="font-size:14px">₹26,55,000</td><td colspan="2"></td></tr>
        </tfoot>
      </table>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal('modal-so-new')">Cancel</button>
      <button class="btn btn-print"><i class="bi bi-printer"></i> Print</button>
      <button class="btn btn-save"><i class="bi bi-check-lg"></i> Save Order</button>
    </div>
  </div>
</div>

<!-- ── SO Detail Modal ── -->
<div class="modal-overlay hidden" id="modal-so-detail">
  <div class="modal modal-xl">
    <div class="modal-header">
      <div class="modal-icon" style="background:#f0fdf4"><i class="bi bi-receipt-cutoff" style="color:var(--color-success-text)"></i></div>
      <div>
        <div class="modal-title">SO-2026-1288 — Amul Dairy</div>
        <div class="modal-sub">PO: AMUL/PO/2026/445 &nbsp;|&nbsp; <span class="tag tag-green">Approved</span> &nbsp;|&nbsp; Grand Total: ₹2,25,000</div>
      </div>
      <button class="modal-close" onclick="closeModal('modal-so-detail')"><i class="bi bi-x"></i></button>
    </div>
    <div class="modal-body">
      <div class="desc-grid cols-4">
        <div class="desc-item"><div class="desc-label">SO No</div><div class="desc-value font-bold">SO-2026-1288</div></div>
        <div class="desc-item"><div class="desc-label">Order Date</div><div class="desc-value">28 Jun 2026</div></div>
        <div class="desc-item"><div class="desc-label">PO No</div><div class="desc-value">AMUL/PO/2026/445</div></div>
        <div class="desc-item"><div class="desc-label">PO Date</div><div class="desc-value">25 Jun 2026</div></div>
        <div class="desc-item"><div class="desc-label">Customer</div><div class="desc-value font-bold">Amul Dairy Cooperative</div></div>
        <div class="desc-item"><div class="desc-label">GST No</div><div class="desc-value">24AAACA0001A1Z5</div></div>
        <div class="desc-item"><div class="desc-label">Mobile</div><div class="desc-value">98765 43210</div></div>
        <div class="desc-item"><div class="desc-label">State</div><div class="desc-value">Gujarat</div></div>
        <div class="desc-item"><div class="desc-label">Sales Type</div><div class="desc-value">Domestic</div></div>
        <div class="desc-item"><div class="desc-label">Transporter</div><div class="desc-value">Self</div></div>
        <div class="desc-item"><div class="desc-label">Item Count</div><div class="desc-value">3 items</div></div>
        <div class="desc-item"><div class="desc-label">Grand Total</div><div class="desc-value font-bold" style="color:var(--primary)">₹2,25,000</div></div>
      </div>
      <div class="form-section-title" style="margin-top:14px"><i class="bi bi-list-ul"></i> Line Items</div>
      <table class="line-table">
        <thead><tr><th>#</th><th>Product</th><th>GSM</th><th>Size OD</th><th>Qty</th><th>Rate</th><th>Basic Amt</th><th>Disc%</th><th>Taxable</th><th>GST%</th><th>Net Amt</th><th>Del. Date</th><th>Status</th></tr></thead>
        <tbody>
          <tr><td>1</td><td>Amul Poker Size 7-GSM</td><td class="text-center">7</td><td>500×350×300</td><td>50,000</td><td>₹22.50</td><td>₹1,12,500</td><td>0%</td><td>₹1,12,500</td><td>18%</td><td class="font-bold">₹1,32,750</td><td>10 Jul</td><td><span class="tag tag-green" style="font-size:10px">Approved</span></td></tr>
          <tr><td>2</td><td>Amul Partition Set</td><td class="text-center">3</td><td>490×340</td><td>50,000</td><td>₹1.50</td><td>₹75,000</td><td>0%</td><td>₹75,000</td><td>18%</td><td class="font-bold">₹88,500</td><td>10 Jul</td><td><span class="tag tag-green" style="font-size:10px">Approved</span></td></tr>
          <tr><td>3</td><td>Honeycomb Insert</td><td class="text-center">—</td><td>490×340×50</td><td>50,000</td><td>₹0.08</td><td>₹4,000</td><td>0%</td><td>₹4,000</td><td>18%</td><td class="font-bold">₹4,720</td><td>10 Jul</td><td><span class="tag tag-gold" style="font-size:10px">Pending</span></td></tr>
        </tbody>
        <tfoot><tr><td colspan="6" style="font-weight:800">Grand Total</td><td class="font-bold">₹1,91,500</td><td></td><td class="font-bold">₹1,91,500</td><td></td><td class="font-bold" style="font-size:14px">₹2,25,970</td><td colspan="2"></td></tr></tfoot>
      </table>
    </div>
    <div class="modal-footer">
      <div class="modal-footer-left">
        <button class="btn btn-secondary btn-sm" style="color:var(--color-warning-text);border-color:var(--color-warning-text)"><i class="bi bi-pause-circle"></i> Hold</button>
        <button class="btn btn-secondary btn-sm" style="color:var(--color-error-text);border-color:var(--color-error-text)"><i class="bi bi-x-circle"></i> Reject</button>
      </div>
      <button class="btn btn-secondary" onclick="closeModal('modal-so-detail')">Close</button>
      <button class="btn btn-print"><i class="bi bi-printer"></i> Print</button>
      <button class="btn btn-save"><i class="bi bi-check-lg"></i> Approve</button>
    </div>
  </div>
</div>

<!-- Hold/Reject Remark Modal -->
<div class="modal-overlay hidden" id="modal-so-action">
  <div class="modal modal-sm">
    <div class="modal-header">
      <div class="modal-icon" style="background:#fffbeb"><i class="bi bi-pause-circle" style="color:var(--color-warning-text)"></i></div>
      <div><div class="modal-title">Hold Order</div><div class="modal-sub">SO-2026-1285</div></div>
      <button class="modal-close" onclick="closeModal('modal-so-action')"><i class="bi bi-x"></i></button>
    </div>
    <div class="modal-body">
      <div class="field-group"><label class="field-label required">Reason / Remark</label>
        <textarea class="form-textarea" placeholder="Enter reason for hold/rejection..."></textarea></div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal('modal-so-action')">Cancel</button>
      <button class="btn btn-save" style="background:var(--color-warning-text);border-color:var(--color-warning-text)" onclick="closeModal('modal-so-action')">Confirm Hold</button>
    </div>
  </div>
</div>
`);
});
