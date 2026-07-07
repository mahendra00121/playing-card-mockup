document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('contentArea').insertAdjacentHTML('beforeend', `
<div class="page" id="page-enquiry">
  <div class="page-header">
    <div><div class="page-title">Sales Enquiry</div><div class="page-subtitle">Manage customer enquiries with full Deck specification and process details</div></div>
    <div class="page-actions">
      <div class="seg-tabs" style="margin-right:8px">
        <div class="seg-tab active">All</div>
        <div class="seg-tab">Converted</div>
        <div class="seg-tab">Not Converted</div>
      </div>
      <button class="btn btn-secondary btn-sm"><i class="bi bi-download"></i> Export</button>
      <button class="btn btn-create" onclick="openModal('modal-enq-new')"><i class="bi bi-plus"></i> Create Enquiry</button>
    </div>
  </div>
  <div class="toolbar">
    <div class="toolbar-left">
      <div class="search-input-wrap"><i class="bi bi-search"></i><input class="search-input" placeholder="Enquiry no, customer, job name..." /></div>
      <input class="form-input" type="date" value="2025-06-30" style="width:130px;padding:5px 8px" />
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
          <th>Enq No</th><th>Date</th><th>Customer</th><th>Party</th>
          <th>Job Name</th><th>Category</th><th>Sales Person</th>
          <th>Qty</th><th>Unit</th><th>Annual Qty</th><th>Exp. Days</th>
          <th>Prod. Unit</th><th>Mode</th><th>Source</th><th>Status</th><th>Remark</th><th></th>
        </tr>
      </thead>
      <tbody>
        ${[
          ['ENQ-2026-0421','28 Jun','Amul Dairy','Customer','Amul Butter Deck 7-GSM','Playing Card Deck','Priya M.','1,00,000','PCS','12,00,000','15','Unit-1','Detailed','Manual','Pending',''],
          ['ENQ-2026-0420','27 Jun','ITC Ltd','Customer','Cigarette Inner 3-GSM','Playing Card Deck','Priya M.','5,00,000','PCS','60,00,000','10','Unit-1','Detailed','Manual','Quotation Created',''],
          ['ENQ-2026-0419','26 Jun','Patanjali','Lead','Ghee Deck 5-GSM','Playing Card Deck','Ravi S.','80,000','PCS','9,60,000','20','Unit-1','Basic','Manual','Pending','Need more specs'],
          ['ENQ-2026-0418','25 Jun','Metro Cash','Customer','Storage Deck 5-GSM','Playing Card Deck','Ravi S.','25,000','PCS','3,00,000','7','Unit-1','Detailed','Manual','Rejected','Low margin'],
          ['ENQ-2026-0417','24 Jun','HUL','Customer','Soap Carton 3-GSM','Carton','Priya M.','2,50,000','PCS','30,00,000','12','Unit-1','Detailed','Manual','Incomplete Info','Size not confirmed'],
          ['ENQ-2026-0416','22 Jun','Nestle','Customer','Cereal Deck 3-GSM','Carton','Ravi S.','1,50,000','PCS','18,00,000','8','Unit-1','Detailed','Manual','Quotation Created',''],
        ].map(([no,dt,cust,party,job,cat,sp,qty,unit,annQty,days,pu,mode,src,status,rem]) => {
          const stMap={'Pending':'gold','Quotation Created':'green','Rejected':'red','Incomplete Info':'orange'};
          return `<tr onclick="openModal('modal-enq-view')">
            <td><b>${no}</b></td><td class="muted">${dt}</td><td>${cust}</td>
            <td><span class="tag tag-${party==='Lead'?'orange':'blue'}" style="font-size:10px">${party}</span></td>
            <td style="max-width:160px;font-size:12px">${job}</td>
            <td><span class="tag tag-navy" style="font-size:10px">${cat}</span></td>
            <td class="muted" style="font-size:12px">${sp}</td>
            <td class="text-right">${qty}</td><td class="muted">${unit}</td>
            <td class="text-right muted">${annQty}</td>
            <td class="text-center muted">${days}</td>
            <td class="muted" style="font-size:11px">${pu}</td>
            <td><span class="tag tag-${mode==='Detailed'?'blue':'gray'}" style="font-size:10px">${mode}</span></td>
            <td><span class="tag tag-gray" style="font-size:10px">${src}</span></td>
            <td><span class="tag tag-${stMap[status]}">${status}</span></td>
            <td style="font-size:11px;color:var(--fg-muted)">${rem}</td>
            <td class="actions-cell">
              <button class="btn btn-ghost btn-icon btn-sm" onclick="event.stopPropagation();openModal('modal-enq-view')"><i class="bi bi-eye"></i></button>
              <button class="btn btn-edit btn-icon btn-sm" onclick="event.stopPropagation();openModal('modal-enq-new')"><i class="bi bi-pencil"></i></button>
              <button class="btn btn-ghost btn-icon btn-sm" title="Clone"><i class="bi bi-files"></i></button>
              <button class="btn btn-delete btn-icon btn-sm"><i class="bi bi-trash"></i></button>
            </td>
          </tr>`;
        }).join('')}
      </tbody>
    </table>
    <div class="grid-footer"><span>Showing 6 of 421 enquiries</span>
      <div class="pagination"><button class="page-btn active">1</button><button class="page-btn">2</button><button class="page-btn">…</button><button class="page-btn">71</button></div>
    </div>
  </div>
</div>

<!-- ── Create Enquiry Modal ── -->
<div class="modal-overlay hidden" id="modal-enq-new">
  <div class="modal modal-xl">
    <div class="modal-header">
      <div class="modal-icon"><i class="bi bi-clipboard-plus"></i></div>
      <div><div class="modal-title">New Enquiry</div><div class="modal-sub">Full Deck specification with content selection and process details</div></div>
      <button class="modal-close" onclick="closeModal('modal-enq-new')"><i class="bi bi-x"></i></button>
    </div>
    <div class="modal-body">

      <!-- Section 1: Enquiry & Client -->
      <div class="form-section-title"><i class="bi bi-person-lines-fill"></i> Enquiry & Client Details</div>
      <div class="form-row cols-4">
        <div class="field-group"><label class="field-label">Enquiry No</label><input class="form-input" value="ENQ-2026-0422" readonly style="background:var(--bg-subtle)" /></div>
        <div class="field-group"><label class="field-label">Reference No</label><input class="form-input" placeholder="Customer RFQ / ref no" /></div>
        <div class="field-group"><label class="field-label required">Enquiry Date</label><input class="form-input" type="date" value="2026-06-30" /></div>
        <div class="field-group"><label class="field-label">Enquiry Type</label>
          <select class="form-select"><option>General</option><option>Bid</option></select></div>
      </div>
      <div class="form-row cols-4">
        <div class="field-group"><label class="field-label required">Sales Type</label>
          <select class="form-select"><option>Domestic</option><option>Export</option><option>Deemed Export</option></select></div>
        <div class="field-group"><label class="field-label required">Sales Person</label>
          <select class="form-select"><option>Priya Mehta</option><option>Ravi Sharma</option></select></div>
        <div class="field-group"><label class="field-label required">Lead / Customer</label>
          <select class="form-select"><option>Amul Dairy</option><option>ITC Ltd</option><option>HUL</option></select></div>
        <div class="field-group"><label class="field-label">Payment Terms</label>
          <input class="form-input" placeholder="e.g. 30 days credit" /></div>
      </div>
      <div class="form-row cols-3">
        <div class="field-group"><label class="field-label">Concerned Person</label>
          <select class="form-select"><option>Rajesh Kumar</option><option>Sunita Shah</option></select></div>
        <div class="field-group"><label class="field-label">Mobile (auto)</label>
          <input class="form-input" value="98765 43210" readonly style="background:var(--bg-subtle)" /></div>
        <div class="field-group"><label class="field-label">Remark</label>
          <input class="form-input" placeholder="Any note..." /></div>
      </div>

      <!-- Section 2: Job Specs -->
      <div class="form-section-title" style="margin-top:14px"><i class="bi bi-Decks"></i> Job Specifications</div>
      <div class="form-row cols-4">
        <div class="field-group"><label class="field-label required">Job Name</label><input class="form-input" placeholder="e.g. Butter Deck 7-GSM" /></div>
        <div class="field-group"><label class="field-label">Product Code</label><input class="form-input" placeholder="Optional" /></div>
        <div class="field-group"><label class="field-label required">Category</label>
          <select class="form-select"><option>Playing Card Deck</option><option>Carton</option><option>Sheet</option><option>Partition</option></select></div>
        <div class="field-group"><label class="field-label">Division (auto)</label>
          <input class="form-input" value="Packaging" readonly style="background:var(--bg-subtle)" /></div>
      </div>
      <div class="form-row cols-3">
        <div class="field-group"><label class="field-label required">Quantity</label><input class="form-input" type="number" placeholder="Order quantity" /></div>
        <div class="field-group"><label class="field-label">Annual Quantity</label><input class="form-input" type="number" placeholder="Expected per year" /></div>
        <div class="field-group"><label class="field-label">UOM</label>
          <select class="form-select"><option>PCS</option><option>KG</option><option>PKT</option><option>SET</option><option>Deck</option></select></div>
      </div>

      <!-- Section 3: Logistics -->
      <div class="form-section-title" style="margin-top:14px"><i class="bi bi-geo-alt"></i> Logistics</div>
      <div class="form-row cols-4">
        <div class="field-group"><label class="field-label required">Production Unit</label>
          <select class="form-select"><option>Unit-1 (Main Plant)</option><option>Unit-2</option></select></div>
        <div class="field-group"><label class="field-label">Incoterm</label>
          <select class="form-select"><option>—</option><option>FOB</option><option>CIF</option><option>CFR</option><option>EXW</option><option>DDP</option><option>FCA</option></select></div>
        <div class="field-group"><label class="field-label">Port</label>
          <select class="form-select"><option>—</option><option>JNPT, Mumbai</option><option>Kandla</option><option>Chennai</option></select></div>
        <div class="field-group"><label class="field-label">Currency</label>
          <select class="form-select"><option>INR ₹</option><option>USD $</option><option>EUR €</option><option>GBP £</option></select></div>
      </div>
      <div class="form-row cols-2">
        <div class="field-group"><label class="field-label">Delivery Location</label><input class="form-input" placeholder="Customer delivery address" /></div>
        <div class="field-group"><label class="field-label">Expected Delivery (Days)</label><input class="form-input" type="number" placeholder="e.g. 15" /></div>
      </div>

      <!-- Section 4: Content Selection -->
      <div class="form-section-title" style="margin-top:14px"><i class="bi bi-layout-three-columns"></i> Content Selection & Specification (Detailed Mode)</div>
      <div style="display:grid;grid-template-columns:190px 1fr 210px;gap:10px;background:var(--bg-subtle);border:1px solid var(--bd-default);border-radius:8px;padding:12px;min-height:290px">

        <!-- Left: Content tiles -->
        <div>
          <div style="font-size:10px;font-weight:700;text-transform:uppercase;color:var(--fg-muted);margin-bottom:8px;letter-spacing:.05em">Select Content</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:5px">
            ${[['bi-Deck-seam','Poker Size',true],['bi-scissors','Die Cut',false],['bi-file-earmark','Sheet',false],['bi-grid-3x2','Partition',false],['bi-hexagon','Honeycomb',false],['bi-puzzle','Fitment',false]].map(([ic,lbl,sel]) => `
            <div style="background:#fff;border:2px solid ${sel?'var(--primary)':'var(--bd-default)'};border-radius:7px;padding:8px 4px;text-align:center;cursor:pointer">
              <i class="bi ${ic}" style="font-size:17px;color:${sel?'var(--primary)':'var(--fg-muted)'}"></i>
              <div style="font-size:10px;margin-top:3px;font-weight:${sel?700:400};color:${sel?'var(--primary)':'var(--fg-muted)'}">${lbl}</div>
            </div>`).join('')}
          </div>
          <div style="margin-top:8px;font-size:10px;color:var(--fg-muted)">Content Qty: <input class="form-input" value="1,00,000" style="width:80px;padding:3px 5px;font-size:11px;display:inline-block" /></div>
        </div>

        <!-- Center: Plan Details -->
        <div>
          <div style="font-size:10px;font-weight:700;text-transform:uppercase;color:var(--fg-muted);margin-bottom:6px;letter-spacing:.05em">Plan Details — Poker Size</div>
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
            <label style="font-size:12px;display:flex;align-items:center;gap:4px"><input type="checkbox" checked /> Playing Card</label>
          </div>
          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:5px;margin-bottom:8px">
            ${[['Length (mm)','500'],['Width (mm)','350'],['Height (mm)','300'],['Opening Flap','150'],
               ['Pasting Flap','20'],['Bottom Flap','150'],['Tong Ht','—'],['Flap Ht','—'],
               ['Ups','1'],['Across Ups','—'],['Around Ups','—'],['Pages','—']].map(([l,v]) => `
            <div>
              <div style="font-size:9px;color:var(--fg-muted);margin-bottom:2px">${l}</div>
              <input class="form-input" value="${v}" style="padding:3px 5px;font-size:11px" />
            </div>`).join('')}
          </div>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:5px">
            ${[['Ink/Coating Quality','Art Paper'],['GSM','150'],['Mill','TNPL'],['Finish','Plain'],['F. Color','—'],['B. Color','—']].map(([l,v]) => `
            <div>
              <div style="font-size:9px;color:var(--fg-muted);margin-bottom:2px">${l}</div>
              <input class="form-input" value="${v}" style="padding:3px 5px;font-size:11px" />
            </div>`).join('')}
          </div>
        </div>

        <!-- Right: Process list -->
        <div>
          <div style="font-size:10px;font-weight:700;text-transform:uppercase;color:var(--fg-muted);margin-bottom:8px;letter-spacing:.05em">Add Allowed Processes</div>
          <div style="display:flex;flex-direction:column;gap:5px">
            ${[['Playing Card',true],['4-Color Printing',true],['2-Color Printing',false],['Collation',true],['Varnishing',false],['Die Cutting',false],['Punching',false],['Lamination',false],['Pasting',false],['Strapping',false],['UV Coating',false],['Embossing',false]].map(([p,chk]) => `
            <label style="display:flex;align-items:center;gap:5px;font-size:11px;cursor:pointer">
              <input type="checkbox" ${chk?'checked':''} /> ${p}
            </label>`).join('')}
          </div>
        </div>
      </div>

      <!-- Applied Content Table -->
      <div style="margin-top:10px">
        <div style="font-size:12px;font-weight:700;color:var(--fg-default);margin-bottom:6px">Applied Contents</div>
        <table class="line-table">
          <thead><tr><th>Content</th><th>Size</th><th>Qty</th><th>Quality / GSM</th><th>Processes</th><th></th></tr></thead>
          <tbody>
            <tr>
              <td>Poker Size</td><td>500×350×300mm</td><td>1,00,000 PCS</td>
              <td>Art Paper / 150 GSM</td>
              <td style="font-size:11px">Playing Card, 4-Color Printing, Collation (3)</td>
              <td><button class="btn btn-delete btn-icon btn-sm"><i class="bi bi-trash"></i></button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="modal-footer">
      <div class="modal-footer-left">
        <button class="btn btn-secondary btn-sm" style="color:var(--color-error-text);border-color:var(--color-error-text)"><i class="bi bi-x-circle"></i> Reject</button>
        <button class="btn btn-secondary btn-sm" style="color:var(--color-warning-text);border-color:var(--color-warning-text)"><i class="bi bi-info-circle"></i> Mark Incomplete</button>
      </div>
      <button class="btn btn-secondary" onclick="closeModal('modal-enq-new')">Cancel</button>
      <button class="btn btn-save"><i class="bi bi-check-lg"></i> Save Enquiry</button>
    </div>
  </div>
</div>

<!-- ── View Enquiry Modal ── -->
<div class="modal-overlay hidden" id="modal-enq-view">
  <div class="modal modal-xl">
    <div class="modal-header">
      <div class="modal-icon" style="background:#f0f9ff"><i class="bi bi-clipboard-check" style="color:var(--primary)"></i></div>
      <div>
        <div class="modal-title">ENQ-2026-0421 — Amul Dairy</div>
        <div class="modal-sub">Amul Butter Deck 7-GSM &nbsp;|&nbsp; <span class="tag tag-gold">Pending</span>&nbsp;<span class="tag tag-blue" style="font-size:10px">Detailed</span>&nbsp;<span class="tag tag-gray" style="font-size:10px">Manual</span></div>
      </div>
      <button class="modal-close" onclick="closeModal('modal-enq-view')"><i class="bi bi-x"></i></button>
    </div>
    <div class="modal-body">
      <div class="desc-grid cols-4">
        <div class="desc-item"><div class="desc-label">Enquiry No</div><div class="desc-value font-bold">ENQ-2026-0421</div></div>
        <div class="desc-item"><div class="desc-label">Date</div><div class="desc-value">28 Jun 2026</div></div>
        <div class="desc-item"><div class="desc-label">Enquiry Type</div><div class="desc-value">General</div></div>
        <div class="desc-item"><div class="desc-label">Sales Type</div><div class="desc-value">Domestic</div></div>
        <div class="desc-item"><div class="desc-label">Customer</div><div class="desc-value font-bold">Amul Dairy Cooperative</div></div>
        <div class="desc-item"><div class="desc-label">Concerned Person</div><div class="desc-value">Rajesh Kumar</div></div>
        <div class="desc-item"><div class="desc-label">Mobile</div><div class="desc-value">98765 43210</div></div>
        <div class="desc-item"><div class="desc-label">Sales Person</div><div class="desc-value">Priya Mehta</div></div>
        <div class="desc-item"><div class="desc-label">Quantity</div><div class="desc-value font-bold">1,00,000 PCS</div></div>
        <div class="desc-item"><div class="desc-label">Annual Qty</div><div class="desc-value">12,00,000 PCS</div></div>
        <div class="desc-item"><div class="desc-label">Exp. Delivery</div><div class="desc-value">15 days</div></div>
        <div class="desc-item"><div class="desc-label">Production Unit</div><div class="desc-value">Unit-1 (Main Plant)</div></div>
        <div class="desc-item"><div class="desc-label">Category</div><div class="desc-value">Playing Card Deck</div></div>
        <div class="desc-item"><div class="desc-label">Currency</div><div class="desc-value">INR ₹</div></div>
        <div class="desc-item"><div class="desc-label">Payment Terms</div><div class="desc-value">45 days</div></div>
        <div class="desc-item"><div class="desc-label">Ref No</div><div class="desc-value">AMUL/RFQ/2026/88</div></div>
      </div>
      <div class="form-section-title" style="margin-top:14px"><i class="bi bi-Deck-seam"></i> Applied Contents & Processes</div>
      <table class="line-table">
        <thead><tr><th>Content</th><th>Size</th><th>Qty</th><th>Quality / GSM</th><th>Processes</th></tr></thead>
        <tbody>
          <tr><td>Poker Size</td><td>500×350×300mm</td><td>1,00,000 PCS</td><td>Art Paper / 150 GSM</td><td>Playing Card, 4-Color Printing, Collation</td></tr>
        </tbody>
      </table>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal('modal-enq-view')">Close</button>
      <button class="btn btn-edit" onclick="closeModal('modal-enq-view');openModal('modal-enq-new')"><i class="bi bi-pencil"></i> Edit</button>
      <button class="btn btn-ghost btn-sm"><i class="bi bi-files"></i> Clone</button>
      <button class="btn btn-save" onclick="closeModal('modal-enq-view');navigate('quotation')"><i class="bi bi-file-earmark-text"></i> Create Quotation</button>
    </div>
  </div>
</div>
`);
});
