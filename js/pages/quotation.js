document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('contentArea').insertAdjacentHTML('beforeend', `
<div class="page" id="page-quotation">
  <div class="page-header">
    <div>
      <div class="page-title">Quotation</div>
      <div class="page-subtitle">Multi-quantity costing with rate slabs, currency, approval workflow and SO conversion</div>
    </div>
    <div class="page-actions">
      <button class="btn btn-secondary btn-sm"><i class="bi bi-download"></i> Export</button>
      <button class="btn btn-create" onclick="openModal('modal-quot-new')"><i class="bi bi-plus"></i> New Quotation</button>
    </div>
  </div>

  <!-- KPI strip -->
  <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:10px;margin-bottom:14px">
    ${[['Draft','4','#9ca3af'],['Sent','9','#3b82f6'],['Revision','3','#f59e0b'],['Approved','7','#22c55e'],['Won','5','#16a34a'],['Lost','6','#ef4444']].map(([s,n,c]) => `
    <div style="background:#fff;border:1px solid var(--bd-default);border-radius:8px;padding:10px 12px;text-align:center;border-top:3px solid ${c};Deck-shadow:var(--shadow-sm)">
      <div style="font-size:20px;font-weight:800;color:${c}">${n}</div>
      <div style="font-size:11px;color:var(--fg-muted);font-weight:500">${s}</div>
    </div>`).join('')}
  </div>

  <div class="toolbar">
    <div class="toolbar-left">
      <div class="seg-tabs">
        <div class="seg-tab active">All</div>
        <div class="seg-tab">Open</div>
        <div class="seg-tab">Won</div>
        <div class="seg-tab">Lost</div>
        <div class="seg-tab">SO Created</div>
      </div>
      <div class="search-input-wrap"><i class="bi bi-search"></i>
        <input class="search-input" placeholder="Quot no, customer, job..." />
      </div>
      <select class="form-select" style="width:120px;padding:5px 8px">
        <option>All Customers</option><option>Amul</option><option>ITC</option>
      </select>
    </div>
    <div class="toolbar-right">
      <input class="form-input" type="date" value="2026-06-01" style="width:130px;padding:5px 8px" />
      <input class="form-input" type="date" value="2026-06-30" style="width:130px;padding:5px 8px" />
    </div>
  </div>

  <div class="grid-wrap">
    <table class="data-table">
      <thead>
        <tr>
          <th>Quot No</th><th>Date</th><th>Ref Enq No</th><th>Customer</th>
          <th>Job Name</th><th>Category</th><th>Sales Person</th>
          <th>Qty Range</th><th>Currency</th><th>Rate</th><th>Deck Wt (gm)</th>
          <th>Mat Cost</th><th>Conversion</th><th>Total Cost</th>
          <th>Valid Upto</th><th>SO Ref</th><th>Status</th><th></th>
        </tr>
      </thead>
      <tbody>
        ${[
          ['QT-2026-0042','28 Jun','ENQ-0089','Amul Dairy','Milk Deck 500ml','Poker Size / 5-GSM','Priya M.','500–5,000','INR','₹24.50','285','₹14.80','₹9.70','₹24.50','15 Jul','SO-2026-0081','Won'],
          ['QT-2026-0041','27 Jun','ENQ-0088','ITC Limited','Display Deck A4','Die Cut / 3-GSM','Vikram S.','1,000–10,000','INR','₹12.20','180','₹7.60','₹4.60','₹12.20','10 Jul','—','Sent'],
          ['QT-2026-0040','26 Jun','ENQ-0087','HUL','Soap Deck 100gm','Poker Size / 3-GSM','Priya M.','2,000–20,000','INR','₹9.80','150','₹5.80','₹4.00','₹9.80','30 Jul','—','Draft'],
          ['QT-2026-0039','25 Jun','ENQ-0086','Nestlé India','Noodles Carton','Poker Size / 5-GSM','Vikram S.','5,000–50,000','USD','$0.42','290','$0.22','$0.20','$0.42','20 Jul','—','Revision'],
          ['QT-2026-0038','22 Jun','ENQ-0085','Patanjali','Ghee Deck 1 litre','Sheet / 3-GSM','Deepa R.','1,000–5,000','INR','₹28.00','380','₹18.00','₹10.00','₹28.00','5 Jul','—','Lost'],
          ['QT-2026-0037','20 Jun','ENQ-0084','Metro Cash','Tray Deck 40×30','Poker Size / 7-GSM','Priya M.','500–2,000','INR','₹62.00','680','₹38.00','₹24.00','₹62.00','25 Jul','SO-2026-0080','Won'],
          ['QT-2026-0036','18 Jun','ENQ-0083','Godrej Consumer','Hair Oil Deck','Die Cut / 3-GSM','Vikram S.','10,000–1,00,000','INR','₹7.40','120','₹4.20','₹3.20','₹7.40','30 Jul','SO-2026-0079','Won'],
        ].map(([qno,dt,enq,cust,job,cat,sp,qrange,curr,rate,bwt,mat,conv,total,valid,soref,status]) => {
          const stMap={'Draft':'gray','Sent':'blue','Revision':'gold','Approved':'purple','Won':'green','Lost':'red','SO Created':'navy'};
          return `<tr onclick="openModal('modal-quot-detail')">
            <td><b>${qno}</b></td>
            <td class="muted">${dt}</td>
            <td style="font-size:11px">${enq}</td>
            <td>${cust}</td>
            <td style="font-size:12px">${job}</td>
            <td><span class="tag tag-navy" style="font-size:10px">${cat}</span></td>
            <td class="muted" style="font-size:11px">${sp}</td>
            <td style="font-size:11px">${qrange}</td>
            <td><span class="tag tag-${curr==='INR'?'blue':'purple'}" style="font-size:10px">${curr}</span></td>
            <td class="text-right font-bold">${rate}</td>
            <td class="text-center muted" style="font-size:11px">${bwt}</td>
            <td class="text-right muted" style="font-size:11px">${mat}</td>
            <td class="text-right muted" style="font-size:11px">${conv}</td>
            <td class="text-right font-bold">${total}</td>
            <td class="muted" style="font-size:11px">${valid}</td>
            <td style="font-size:11px">${soref}</td>
            <td><span class="tag tag-${stMap[status]}" style="font-size:10px">${status}</span></td>
            <td class="actions-cell">
              <button class="btn btn-ghost btn-icon btn-sm" onclick="event.stopPropagation();openModal('modal-quot-detail')"><i class="bi bi-eye"></i></button>
              <button class="btn btn-edit btn-icon btn-sm" onclick="event.stopPropagation();openModal('modal-quot-new')"><i class="bi bi-pencil"></i></button>
              <button class="btn btn-ghost btn-icon btn-sm" title="Clone" onclick="event.stopPropagation()"><i class="bi bi-copy"></i></button>
              <button class="btn btn-print btn-icon btn-sm" onclick="event.stopPropagation()"><i class="bi bi-printer"></i></button>
            </td>
          </tr>`;
        }).join('')}
      </tbody>
    </table>
    <div class="grid-footer">
      <span>Showing 7 of 42 quotations</span>
      <div class="pagination">
        <button class="page-btn active">1</button><button class="page-btn">2</button>
      </div>
    </div>
  </div>
</div>

<!-- ── New Quotation Modal ── -->
<div class="modal-overlay hidden" id="modal-quot-new">
  <div class="modal modal-xl">
    <div class="modal-header">
      <div class="modal-icon"><i class="bi bi-file-earmark-text"></i></div>
      <div><div class="modal-title">New Quotation</div><div class="modal-sub">Rate slabs, full cost breakdown, currency and validity</div></div>
      <button class="modal-close" onclick="closeModal('modal-quot-new')"><i class="bi bi-x"></i></button>
    </div>
    <div class="modal-body">

      <!-- Header fields -->
      <div class="form-row cols-4">
        <div class="field-group"><label class="field-label">Quot No</label><input class="form-input" value="QT-2026-0043" readonly style="background:var(--bg-subtle)" /></div>
        <div class="field-group"><label class="field-label required">Date</label><input class="form-input" type="date" value="2026-06-30" /></div>
        <div class="field-group"><label class="field-label">Ref Enquiry</label>
          <select class="form-select"><option>ENQ-0090 — Amul Dairy (Milk Deck)</option><option>ENQ-0091 — ITC (Display)</option></select>
        </div>
        <div class="field-group"><label class="field-label">Valid Upto</label><input class="form-input" type="date" value="2026-07-30" /></div>
      </div>
      <div class="form-row cols-4">
        <div class="field-group"><label class="field-label required">Customer</label>
          <select class="form-select"><option>Amul Dairy Cooperative</option><option>ITC Limited</option></select>
        </div>
        <div class="field-group"><label class="field-label">Job Name</label><input class="form-input" placeholder="Quotation job name..." /></div>
        <div class="field-group"><label class="field-label">Sales Person</label>
          <select class="form-select"><option>Priya Mehta</option><option>Vikram Singh</option></select>
        </div>
        <div class="field-group"><label class="field-label">Payment Terms</label><input class="form-input" value="30 days" /></div>
      </div>
      <div class="form-row cols-4">
        <div class="field-group"><label class="field-label">Currency</label>
          <select class="form-select"><option>INR — ₹</option><option>USD — $</option><option>EUR — €</option><option>GBP — £</option></select>
        </div>
        <div class="field-group"><label class="field-label">Exchange Rate</label><input class="form-input" type="number" value="1.00" /></div>
        <div class="field-group"><label class="field-label">Incoterm</label>
          <select class="form-select"><option>Ex Works</option><option>FOB</option><option>CIF</option></select>
        </div>
        <div class="field-group"><label class="field-label">Delivery Location</label><input class="form-input" placeholder="Delivery site..." /></div>
      </div>

      <!-- Product link -->
      <div class="form-section-title" style="margin-top:8px"><i class="bi bi-Decks"></i> Product Details (from PM / Enquiry)</div>
      <div class="form-row cols-4">
        <div class="field-group"><label class="field-label">Product Code</label><input class="form-input" value="PM-2026-040" /></div>
        <div class="field-group"><label class="field-label">Product Name</label><input class="form-input" value="Milk Deck 500ml" /></div>
        <div class="field-group"><label class="field-label">Category</label><input class="form-input" value="Poker Size" /></div>
        <div class="field-group"><label class="field-label">GSM</label><input class="form-input" value="5-GSM" /></div>
      </div>
      <div class="form-row cols-4">
        <div class="field-group"><label class="field-label">Size OD (L×W×H mm)</label><input class="form-input" value="300×200×150 mm" readonly style="background:var(--bg-subtle)" /></div>
        <div class="field-group"><label class="field-label">Deck Weight (gm)</label><input class="form-input" value="285" readonly style="background:var(--bg-subtle)" /></div>
        <div class="field-group"><label class="field-label">Content Name</label><input class="form-input" value="Poker Size + Collation" /></div>
        <div class="field-group"><label class="field-label">Total Wt / 1000 Pc (kg)</label><input class="form-input" value="285" readonly style="background:var(--bg-subtle)" /></div>
      </div>

      <!-- Cost breakdown -->
      <div class="form-section-title" style="margin-top:8px"><i class="bi bi-currency-rupee"></i> Cost Breakdown (per 1 Pc)</div>
      <div style="display:grid;grid-template-columns:repeat(8,1fr);gap:8px;background:var(--bg-subtle);border-radius:8px;padding:12px;border:1px solid var(--bd-default)">
        ${[['Material Cost','₹14.80'],['Playing Card','₹3.20'],['Printing','₹2.40'],['Collation','₹0.60'],['Other Ops','₹0.80'],['Overhead','₹0.80'],['Profit%','8%'],['Total Rate','₹24.50']].map(([l,v]) => `
        <div style="text-align:center">
          <div style="font-size:13px;font-weight:700;color:var(--primary)">${v}</div>
          <div style="font-size:10px;color:var(--fg-muted)">${l}</div>
        </div>`).join('')}
      </div>

      <!-- Rate Slabs -->
      <div class="form-section-title" style="margin-top:12px"><i class="bi bi-table"></i> Rate Slabs (Multi-Quantity Pricing)</div>
      <table class="line-table">
        <thead>
          <tr>
            <th>#</th><th>Qty From</th><th>Qty To</th>
            <th>Mat Cost/Pc</th><th>Process Cost/Pc</th><th>OH/Pc</th>
            <th>Total Cost/Pc</th><th>Profit%</th><th>Rate/Pc ({{curr}})</th>
            <th>Basic Amt (1000Pc)</th><th>GST%</th><th>Total (1000Pc)</th>
            <th>Margin%</th>
          </tr>
        </thead>
        <tbody>
          ${[[1,'500','999','₹14.80','₹6.50','₹1.20','₹22.50','10%','₹24.75','₹24,750','12%','₹27,720','9.1%'],
             [2,'1,000','4,999','₹14.80','₹6.00','₹1.00','₹21.80','12%','₹24.42','₹24,420','12%','₹27,350','10.6%'],
             [3,'5,000','19,999','₹14.80','₹5.50','₹0.80','₹21.10','15%','₹24.27','₹24,265','12%','₹27,177','12.8%'],
             [4,'20,000','99,999','₹14.80','₹5.00','₹0.60','₹20.40','18%','₹24.07','₹24,072','12%','₹26,961','15.4%']].map(([sn,qf,qt,mc,pc,oh,tc,pct,rate,ba,gst,total,margin]) => `
          <tr>
            <td class="text-center muted" style="font-size:11px">${sn}</td>
            <td><input class="form-input" value="${qf}" style="width:55px;padding:3px 5px;font-size:11px" /></td>
            <td><input class="form-input" value="${qt}" style="width:65px;padding:3px 5px;font-size:11px" /></td>
            <td class="text-right muted" style="font-size:11px">${mc}</td>
            <td class="text-right muted" style="font-size:11px">${pc}</td>
            <td class="text-right muted" style="font-size:11px">${oh}</td>
            <td class="text-right font-bold" style="font-size:11px">${tc}</td>
            <td><input class="form-input" value="${pct}" style="width:45px;padding:3px 5px;font-size:11px" /></td>
            <td class="text-right font-bold" style="font-size:12px;color:var(--primary)">${rate}</td>
            <td class="text-right muted" style="font-size:11px">${ba}</td>
            <td class="text-center muted" style="font-size:11px">${gst}</td>
            <td class="text-right font-bold" style="font-size:11px">${total}</td>
            <td class="text-right" style="font-size:11px;color:var(--color-success-text);font-weight:600">${margin}</td>
          </tr>`).join('')}
          <tr>
            <td colspan="13" style="text-align:center;padding:6px">
              <button class="btn btn-ghost btn-sm"><i class="bi bi-plus"></i> Add Slab</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="form-row cols-2" style="margin-top:12px">
        <div class="field-group"><label class="field-label">Terms & Conditions</label>
          <textarea class="form-textarea" style="min-height:60px" placeholder="Payment terms, delivery, warranty...">Price valid for 30 days from quotation date.
GST extra as applicable.
Delivery ex-works Ahmedabad.
Rate subject to revision on raw material change.</textarea>
        </div>
        <div class="field-group"><label class="field-label">Internal Remark</label>
          <textarea class="form-textarea" style="min-height:60px" placeholder="Internal notes not printed on quotation..."></textarea>
        </div>
      </div>

    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal('modal-quot-new')">Cancel</button>
      <button class="btn btn-secondary"><i class="bi bi-floppy"></i> Save Draft</button>
      <button class="btn btn-print"><i class="bi bi-printer"></i> Print Quotation</button>
      <button class="btn btn-save"><i class="bi bi-send"></i> Send to Customer</button>
    </div>
  </div>
</div>

<!-- ── Quotation Detail Modal ── -->
<div class="modal-overlay hidden" id="modal-quot-detail">
  <div class="modal modal-lg">
    <div class="modal-header">
      <div class="modal-icon" style="background:#f0fdf4;color:var(--color-success-text)"><i class="bi bi-file-earmark-check"></i></div>
      <div>
        <div class="modal-title">QT-2026-0042 — Amul Dairy</div>
        <div class="modal-sub">Milk Deck 500ml | 5-GSM Poker Size | Status: <b style="color:#16a34a">Won</b></div>
      </div>
      <button class="modal-close" onclick="closeModal('modal-quot-detail')"><i class="bi bi-x"></i></button>
    </div>
    <div class="modal-body">
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:12px">
        ${[['Quot No','QT-2026-0042'],['Date','28 Jun 2026'],['Valid Upto','15 Jul 2026'],['Currency','INR — ₹'],
           ['Category','Poker Size / 5-GSM'],['Deck Wt (gm)','285'],['SO Ref','SO-2026-0081'],['Sales Person','Priya Mehta']].map(([l,v]) => `
        <div style="border:1px solid var(--bd-default);border-radius:6px;padding:8px 10px">
          <div style="font-size:10px;color:var(--fg-muted)">${l}</div>
          <div style="font-size:13px;font-weight:600">${v}</div>
        </div>`).join('')}
      </div>
      <!-- Slabs read-only -->
      <div class="form-section-title"><i class="bi bi-table"></i> Rate Slabs</div>
      <table class="line-table">
        <thead><tr><th>Qty Range</th><th>Rate / Pc (INR)</th><th>GST%</th><th>Total Rate incl GST</th><th>Margin%</th></tr></thead>
        <tbody>
          <tr><td>500 – 999</td><td class="font-bold text-right">₹24.75</td><td class="text-center">12%</td><td class="font-bold text-right">₹27.72</td><td class="text-right" style="color:var(--color-success-text)">9.1%</td></tr>
          <tr><td>1,000 – 4,999</td><td class="font-bold text-right">₹24.42</td><td class="text-center">12%</td><td class="font-bold text-right">₹27.35</td><td class="text-right" style="color:var(--color-success-text)">10.6%</td></tr>
          <tr><td>5,000 – 19,999</td><td class="font-bold text-right">₹24.27</td><td class="text-center">12%</td><td class="font-bold text-right">₹27.18</td><td class="text-right" style="color:var(--color-success-text)">12.8%</td></tr>
        </tbody>
      </table>
    </div>
    <div class="modal-footer">
      <div class="modal-footer-left" style="display:flex;gap:6px">
        <button class="btn btn-secondary btn-sm" style="color:#16a34a;border-color:#16a34a"><i class="bi bi-trophy"></i> Mark Won</button>
        <button class="btn btn-secondary btn-sm" style="color:var(--color-error-text);border-color:var(--color-error-text)"><i class="bi bi-x-circle"></i> Mark Lost</button>
      </div>
      <button class="btn btn-secondary" onclick="closeModal('modal-quot-detail')">Close</button>
      <button class="btn btn-ghost btn-sm"><i class="bi bi-copy"></i> Clone</button>
      <button class="btn btn-edit"><i class="bi bi-pencil"></i> Edit</button>
      <button class="btn btn-save"><i class="bi bi-file-earmark-check"></i> Create SO</button>
    </div>
  </div>
</div>
`);
});
