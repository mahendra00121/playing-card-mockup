document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('contentArea').insertAdjacentHTML('beforeend', `
<div class="page" id="page-challan">
  <div class="page-header">
    <div>
      <div class="page-title">Delivery Challan</div>
      <div class="page-subtitle">Generate and manage GST delivery challans for dispatched goods</div>
    </div>
    <div class="page-actions">
      <button class="btn btn-secondary btn-sm"><i class="bi bi-download"></i> Export</button>
      <button class="btn btn-secondary btn-sm"><i class="bi bi-arrow-clockwise"></i></button>
      <button class="btn btn-create" onclick="openModal('modal-challan-new')"><i class="bi bi-plus"></i> New Challan</button>
    </div>
  </div>

  <div class="toolbar">
    <div class="toolbar-left">
      <div class="seg-tabs">
        <div class="seg-tab active">All</div>
        <div class="seg-tab">Draft</div>
        <div class="seg-tab">Issued</div>
        <div class="seg-tab">Delivered</div>
      </div>
      <div class="search-input-wrap">
        <i class="bi bi-search"></i>
        <input class="search-input" placeholder="Challan no, customer, order..." />
      </div>
    </div>
    <div class="toolbar-right">
      <input class="form-input" type="date" value="2026-06-01" style="width:135px;padding:5px 8px" />
      <input class="form-input" type="date" value="2026-06-30" style="width:135px;padding:5px 8px" />
    </div>
  </div>

  <div class="grid-wrap">
    <table class="data-table">
      <thead>
        <tr>
          <th>Challan No</th>
          <th>Date</th>
          <th>Sales Order</th>
          <th>Customer</th>
          <th>Consignee</th>
          <th>Items</th>
          <th>Total Qty</th>
          <th>Vehicle No</th>
          <th>Transporter</th>
          <th>E-Way Bill</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${[
          ['DC-2026-0189','30 Jun 2026','SO-1278','Godrej Consumer','Godrej WH Mumbai','Storage Deck 5-GSM','30,000','MH12 AB 1234','Self','EWB-123456','Issued'],
          ['DC-2026-0188','29 Jun 2026','SO-1275','Amul Dairy','Amul Plant Anand','Poker Size 7-GSM','1,00,000','MH04 EF 9012','Gati Logistics','EWB-123455','Delivered'],
          ['DC-2026-0187','29 Jun 2026','SO-1276','Metro Cash','Metro WH Pune','Retail Deck 5-GSM','25,000','RJ14 GH 3456','DTDC','EWB-123454','Delivered'],
          ['DC-2026-0186','28 Jun 2026','SO-1273','ITC Ltd','ITC Factory Munger','Cigarette Inner Deck','5,00,000','UP32 IJ 7890','Blue Dart','EWB-123453','Delivered'],
          ['DC-2026-0185','27 Jun 2026','SO-1271','HUL','HUL Plant Halol','Soap Carton 3-GSM','2,50,000','GJ09 KL 1234','DHL','EWB-123452','Delivered'],
          ['DC-2026-0184','26 Jun 2026','SO-1279','Dabur Ltd','Dabur WH Baddi','Shampoo Carton','45,000','GJ05 CD 5678','Self',null,'Draft'],
        ].map(([cno,dt,so,cust,consignee,item,qty,veh,trans,eway,status]) => {
          const stColor = status==='Delivered'?'green':status==='Issued'?'blue':'gold';
          return `<tr onclick="openModal('modal-challan-view')">
            <td><b>${cno}</b></td>
            <td class="muted">${dt}</td>
            <td><span class="text-primary">${so}</span></td>
            <td>${cust}</td>
            <td class="muted" style="font-size:12px">${consignee}</td>
            <td style="font-size:12px">${item}</td>
            <td class="text-right font-bold">${qty}</td>
            <td><span class="tag tag-navy" style="font-size:10px">${veh}</span></td>
            <td class="muted" style="font-size:12px">${trans}</td>
            <td>${eway ? `<span style="font-size:11px;color:var(--color-success-text);font-weight:600">${eway}</span>` : '<span class="tag tag-gold" style="font-size:10px">Pending</span>'}</td>
            <td><span class="tag tag-${stColor}">${status}</span></td>
            <td class="actions-cell">
              <button class="btn btn-print btn-icon btn-sm" title="Print Challan"><i class="bi bi-printer"></i></button>
              <button class="btn btn-ghost btn-icon btn-sm" title="View"><i class="bi bi-eye"></i></button>
              ${status==='Draft'?`<button class="btn btn-save btn-sm" onclick="event.stopPropagation()">Issue</button>`:''}
            </td>
          </tr>`;
        }).join('')}
      </tbody>
    </table>
    <div class="grid-footer">
      <span>Showing 6 of 189 challans | June 2026</span>
      <div class="pagination">
        <button class="page-btn active">1</button>
        <button class="page-btn">2</button>
        <button class="page-btn">…</button>
        <button class="page-btn">19</button>
      </div>
    </div>
  </div>
</div>

<!-- New Challan Modal -->
<div class="modal-overlay hidden" id="modal-challan-new">
  <div class="modal modal-xl">
    <div class="modal-header">
      <div class="modal-icon"><i class="bi bi-file-earmark-text"></i></div>
      <div><div class="modal-title">New Delivery Challan</div><div class="modal-sub">GST Delivery Challan — Indus Playing Card Pvt. Ltd.</div></div>
      <button class="modal-close" onclick="closeModal('modal-challan-new')"><i class="bi bi-x"></i></button>
    </div>
    <div class="modal-body">

      <!-- Header -->
      <div class="form-section">
        <div class="form-section-title"><i class="bi bi-file-earmark"></i> Challan Header</div>
        <div class="form-row cols-4">
          <div class="field-group">
            <label class="field-label">Challan No</label>
            <input class="form-input" value="DC-2026-0190" readonly style="background:var(--bg-subtle)" />
          </div>
          <div class="field-group">
            <label class="field-label required">Date</label>
            <input class="form-input" type="date" value="2026-06-30" />
          </div>
          <div class="field-group">
            <label class="field-label required">Sales Order No</label>
            <select class="form-select">
              <option>— Link Sales Order —</option>
              <option selected>SO-1280 — Asian Paints</option>
              <option>SO-1281 — Nestle</option>
            </select>
          </div>
          <div class="field-group">
            <label class="field-label">Challan Type</label>
            <select class="form-select"><option>SupGSM of Goods</option><option>Job Work</option><option>Return</option></select>
          </div>
        </div>
      </div>

      <!-- Consignee -->
      <div class="form-section">
        <div class="form-section-title"><i class="bi bi-geo-alt"></i> Consignee Details</div>
        <div class="form-row cols-2">
          <div class="field-group">
            <label class="field-label required">Customer / Consignee</label>
            <select class="form-select"><option selected>Asian Paints Ltd</option><option>Asian Paints — WH Navi Mumbai</option></select>
          </div>
          <div class="field-group">
            <label class="field-label">GST No</label>
            <input class="form-input" value="27AAACA0001A1Z5" />
          </div>
        </div>
        <div class="field-group">
          <label class="field-label required">Delivery Address</label>
          <textarea class="form-textarea" style="min-height:56px">Asian Paints Ltd, Plant 4, MIDC, Turbhe, Navi Mumbai — 400 705, Maharashtra</textarea>
        </div>
      </div>

      <!-- Items -->
      <div class="form-section">
        <div class="form-section-title"><i class="bi bi-Deck-seam"></i> Items</div>
        <table class="line-table">
          <thead>
            <tr><th>#</th><th>Product / Description</th><th>HSN Code</th><th>Unit</th><th>Qty</th><th>Rate (₹)</th><th>GST %</th><th>Amount (₹)</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td><input class="form-input" value="Paint Deck 350×250×250mm 5-GSM Black Core" style="font-size:12px;padding:4px 6px" /></td>
              <td><input class="form-input" value="4819" style="font-size:12px;padding:4px 6px;width:70px" /></td>
              <td><select class="form-select" style="font-size:12px;padding:4px 6px;width:70px"><option>Decks</option></select></td>
              <td><input class="form-input" type="number" value="18500" style="font-size:12px;padding:4px 6px;width:80px" /></td>
              <td><input class="form-input" type="number" value="12.50" style="font-size:12px;padding:4px 6px;width:80px" /></td>
              <td><select class="form-select" style="font-size:12px;padding:4px 6px;width:70px"><option>12%</option><option>18%</option></select></td>
              <td style="font-weight:700;text-align:right">₹2,31,250</td>
            </tr>
            <tr>
              <td colspan="8" style="text-align:center;padding:10px">
                <button class="btn btn-ghost btn-sm"><i class="bi bi-plus"></i> Add Item</button>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr><td colspan="6"></td><td style="font-weight:700">Subtotal</td><td style="text-align:right;font-weight:700">₹2,31,250</td></tr>
            <tr><td colspan="6"></td><td>CGST 6%</td><td style="text-align:right">₹13,875</td></tr>
            <tr><td colspan="6"></td><td>SGST 6%</td><td style="text-align:right">₹13,875</td></tr>
            <tr><td colspan="6"></td><td style="font-weight:800;font-size:14px">Grand Total</td><td style="text-align:right;font-weight:800;font-size:14px">₹2,59,000</td></tr>
          </tfoot>
        </table>
      </div>

      <!-- Transport -->
      <div class="form-section">
        <div class="form-section-title"><i class="bi bi-truck"></i> Transport Details</div>
        <div class="form-row cols-4">
          <div class="field-group">
            <label class="field-label required">Vehicle No</label>
            <input class="form-input" value="MH12 EF 9012" />
          </div>
          <div class="field-group">
            <label class="field-label">Transporter</label>
            <select class="form-select"><option>Self</option><option>Gati</option><option>Blue Dart</option></select>
          </div>
          <div class="field-group">
            <label class="field-label">E-Way Bill No</label>
            <input class="form-input" placeholder="EWB number (if applicable)" />
          </div>
          <div class="field-group">
            <label class="field-label">LR / Bilty No</label>
            <input class="form-input" placeholder="Lorry receipt number" />
          </div>
        </div>
      </div>

    </div>
    <div class="modal-footer">
      <div class="modal-footer-left">
        <button class="btn btn-print"><i class="bi bi-printer"></i> Preview & Print</button>
      </div>
      <button class="btn btn-secondary" onclick="closeModal('modal-challan-new')">Cancel</button>
      <button class="btn btn-secondary btn-sm"><i class="bi bi-floppy"></i> Save Draft</button>
      <button class="btn btn-save"><i class="bi bi-check-lg"></i> Issue Challan</button>
    </div>
  </div>
</div>

<!-- View Challan Modal (Print Preview style) -->
<div class="modal-overlay hidden" id="modal-challan-view">
  <div class="modal modal-lg">
    <div class="modal-header">
      <div class="modal-icon" style="background:#eff6ff;color:#1d4ed8"><i class="bi bi-eye"></i></div>
      <div><div class="modal-title">DC-2026-0189</div><div class="modal-sub">Godrej Consumer — 30 June 2026</div></div>
      <button class="modal-close" onclick="closeModal('modal-challan-view')"><i class="bi bi-x"></i></button>
    </div>
    <div class="modal-body">
      <!-- Challan preview -->
      <div style="border:1px solid var(--bd-default);border-radius:8px;padding:20px;font-size:13px">
        <div style="display:flex;justify-content:space-between;margin-bottom:16px;padding-bottom:12px;border-bottom:2px solid var(--bd-medium)">
          <div>
            <div style="font-size:18px;font-weight:800;color:var(--primary)">DELIVERY CHALLAN</div>
            <div style="font-size:12px;color:var(--fg-muted);margin-top:2px">Indus Playing Card Pvt. Ltd.</div>
            <div style="font-size:11px;color:var(--fg-muted)">GSTIN: 24AABCI0001A1Z3</div>
          </div>
          <div style="text-align:right">
            <div><b>Challan No:</b> DC-2026-0189</div>
            <div><b>Date:</b> 30 June 2026</div>
            <div><b>SO Ref:</b> SO-1278</div>
            <div style="margin-top:6px"><span class="tag tag-blue">Issued</span></div>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px">
          <div>
            <div style="font-weight:700;margin-bottom:4px;font-size:12px;text-transform:uppercase;color:var(--fg-muted)">Consignee</div>
            <div style="font-weight:700">Godrej Consumer Products Ltd</div>
            <div style="font-size:12px;color:var(--fg-muted)">GSTIN: 27AADCG0001A1Z2</div>
            <div style="font-size:12px;margin-top:4px">Godrej Warehouse, MIDC Andheri,<br>Mumbai — 400 093, Maharashtra</div>
          </div>
          <div>
            <div style="font-weight:700;margin-bottom:4px;font-size:12px;text-transform:uppercase;color:var(--fg-muted)">Transport</div>
            <div><b>Vehicle:</b> MH12 AB 1234</div>
            <div><b>Driver:</b> Ramesh D.</div>
            <div><b>Transporter:</b> Self</div>
            <div><b>E-Way Bill:</b> EWB-123456</div>
          </div>
        </div>
        <table class="line-table" style="margin-bottom:12px">
          <thead><tr><th>#</th><th>Description</th><th>HSN</th><th>Unit</th><th>Qty</th><th>Rate</th><th>GST</th><th>Amount</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>Storage Deck 450×350×350mm 5-GSM BC</td><td>4819</td><td>Decks</td><td>30,000</td><td>₹12.00</td><td>12%</td><td style="text-align:right;font-weight:700">₹3,60,000</td></tr>
          </tbody>
          <tfoot>
            <tr><td colspan="7">CGST 6%</td><td style="text-align:right">₹21,600</td></tr>
            <tr><td colspan="7">SGST 6%</td><td style="text-align:right">₹21,600</td></tr>
            <tr><td colspan="7" style="font-weight:800">Grand Total</td><td style="text-align:right;font-weight:800">₹4,03,200</td></tr>
          </tfoot>
        </table>
        <div style="font-size:11px;color:var(--fg-muted);margin-top:12px"><i class="bi bi-info-circle"></i> This is a computer-generated delivery challan.</div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal('modal-challan-view')">Close</button>
      <button class="btn btn-print"><i class="bi bi-printer"></i> Print Challan</button>
      <button class="btn btn-create"><i class="bi bi-download"></i> PDF</button>
    </div>
  </div>
</div>

<!-- Quick challan from dashboard -->
<div class="modal-overlay hidden" id="modal-challan-quick">
  <div class="modal modal-sm">
    <div class="modal-header">
      <div class="modal-icon"><i class="bi bi-file-earmark-text"></i></div>
      <div><div class="modal-title">Quick Challan</div><div class="modal-sub">SO-1278 — Godrej Consumer</div></div>
      <button class="modal-close" onclick="closeModal('modal-challan-quick')"><i class="bi bi-x"></i></button>
    </div>
    <div class="modal-body">
      <div class="alert alert-success" style="font-size:12px;margin-bottom:14px"><i class="bi bi-check-circle"></i> Vehicle MH12 AB 1234 already assigned. Ready to generate challan.</div>
      <div class="form-row cols-2">
        <div class="field-group"><label class="field-label">Challan No</label><input class="form-input" value="DC-2026-0190" readonly style="background:var(--bg-subtle)" /></div>
        <div class="field-group"><label class="field-label">Date</label><input class="form-input" type="date" value="2026-06-30" /></div>
      </div>
      <div class="field-group"><label class="field-label">E-Way Bill No (optional)</label><input class="form-input" placeholder="EWB-XXXXXX" /></div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal('modal-challan-quick')">Cancel</button>
      <button class="btn btn-save"><i class="bi bi-check-lg"></i> Generate & Print</button>
    </div>
  </div>
</div>
`);
});
