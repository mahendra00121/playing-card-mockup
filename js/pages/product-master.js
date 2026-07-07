document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('contentArea').insertAdjacentHTML('beforeend', `
<div class="page" id="page-product-master">
  <div class="page-header">
    <div><div class="page-title">Product Master</div><div class="page-subtitle">Define Deck specs, layer stack and operations — base for job prep and costing</div></div>
    <div class="page-actions">
      <button class="btn btn-secondary btn-sm"><i class="bi bi-download"></i> Export</button>
      <button class="btn btn-create" onclick="openModal('modal-pm-new')"><i class="bi bi-plus"></i> New Product</button>
    </div>
  </div>
  <div class="toolbar">
    <div class="toolbar-left">
      <div class="search-input-wrap"><i class="bi bi-search"></i><input class="search-input" placeholder="PM no, customer, product code..." /></div>
      <select class="form-select" style="width:110px;padding:5px 8px"><option>All GSM</option><option>3-GSM</option><option>5-GSM</option><option>7-GSM</option></select>
    </div>
    <div class="toolbar-right">
      <button class="btn btn-ghost btn-sm"><i class="bi bi-arrow-clockwise"></i> Refresh</button>
    </div>
  </div>
  <div class="grid-wrap">
    <table class="data-table">
      <thead>
        <tr>
          <th>PM No</th><th>Date</th><th>Customer</th><th>Product Name</th><th>Code</th>
          <th>GSM</th><th>Content</th><th>Size OD</th><th>Qty</th><th>Total Wt (kg)</th><th>Created By</th><th></th>
        </tr>
      </thead>
      <tbody>
        ${[
          ['PM-0089','28 Jun','Amul Dairy','Amul Butter Deck Poker Size 7-GSM','AM-Poker Size-7-001','7','Poker Size','500×350×300mm','1,00,000','18,230','Hariom I.'],
          ['PM-0088','27 Jun','ITC Ltd','Cigarette Inner Poker Size 3-GSM','ITC-Poker Size-3-022','3','Poker Size','380×280×220mm','5,00,000','12,400','Priya M.'],
          ['PM-0087','26 Jun','Metro Cash','Half Slotted 5-GSM','MC-HSC-5-008','5','Half Slotted','450×350×350mm','25,000','4,580','Hariom I.'],
          ['PM-0086','25 Jun','HUL','Bridge Size 3-GSM','HUL-Poker Size-3-044','3','Poker Size','300×200×150mm','2,50,000','9,750','Priya M.'],
          ['PM-0085','24 Jun','Patanjali','FMCG Poker Size 3-GSM','PAT-Poker Size-3-011','3','Poker Size','350×250×250mm','80,000','6,240','Ravi S.'],
          ['PM-0084','22 Jun','Nestle','Display Deck 3-GSM','NES-DSP-3-005','3','Display Deck','280×180×120mm','1,50,000','5,100','Ravi S.'],
          ['PM-0083','20 Jun','Godrej','Storage Die Cut 5-GSM','GOD-DC-5-018','5','Die Cut Deck','400×300×300mm','30,000','3,960','Hariom I.'],
        ].map(([no,dt,cust,name,code,GSM,content,sizeOD,qty,wt,by]) => `
        <tr onclick="openModal('modal-pm-new')">
          <td><b>${no}</b></td><td class="muted">${dt}</td><td>${cust}</td>
          <td style="max-width:170px;font-size:12px">${name}</td>
          <td style="font-size:11px;font-family:monospace">${code}</td>
          <td style="text-align:center"><span class="tag tag-${GSM==='7'?'purple':GSM==='5'?'blue':'navy'}">${GSM}</span></td>
          <td style="font-size:11px">${content}</td>
          <td class="font-bold" style="font-size:12px">${sizeOD}</td>
          <td class="text-right">${qty}</td>
          <td class="text-right font-bold">${wt}</td>
          <td class="muted" style="font-size:11px">${by}</td>
          <td class="actions-cell">
            <button class="btn btn-ghost btn-icon btn-sm" onclick="event.stopPropagation();openModal('modal-pm-new')"><i class="bi bi-eye"></i></button>
            <button class="btn btn-edit btn-icon btn-sm" onclick="event.stopPropagation()"><i class="bi bi-pencil"></i></button>
            <button class="btn btn-delete btn-icon btn-sm" onclick="event.stopPropagation()"><i class="bi bi-trash"></i></button>
          </td>
        </tr>`).join('')}
      </tbody>
    </table>
    <div class="grid-footer"><span>Showing 7 of 284 products</span>
      <div class="pagination"><button class="page-btn active">1</button><button class="page-btn">2</button><button class="page-btn">…</button><button class="page-btn">41</button></div>
    </div>
  </div>
</div>

<!-- ── Product Master Create/Edit Modal ── -->
<div class="modal-overlay hidden" id="modal-pm-new">
  <div class="modal modal-xl">
    <div class="modal-header">
      <div class="modal-icon"><i class="bi bi-Decks"></i></div>
      <div><div class="modal-title">Product Master — PM-0089</div><div class="modal-sub">Amul Butter Deck Poker Size 7-GSM | Qty: 1,00,000 PCS</div></div>
      <button class="modal-close" onclick="closeModal('modal-pm-new')"><i class="bi bi-x"></i></button>
    </div>
    <div class="modal-body">
      <!-- Header Info -->
      <div class="form-section-title"><i class="bi bi-info-circle"></i> Basic Information</div>
      <div class="form-row cols-4">
        <div class="field-group"><label class="field-label">PM No</label><input class="form-input" value="PM-0089" readonly style="background:var(--bg-subtle)" /></div>
        <div class="field-group"><label class="field-label required">Date</label><input class="form-input" type="date" value="2026-06-28" /></div>
        <div class="field-group"><label class="field-label required">Customer</label>
          <select class="form-select"><option>Amul Dairy</option><option>ITC Ltd</option></select></div>
        <div class="field-group"><label class="field-label required">Product Name</label><input class="form-input" value="Amul Butter Deck Poker Size 7-GSM" /></div>
      </div>
      <div class="form-row cols-4">
        <div class="field-group"><label class="field-label">Product Code</label><input class="form-input" value="AM-Poker Size-7-001" /></div>
        <div class="field-group"><label class="field-label required">Quantity</label><input class="form-input" type="number" value="100000" /></div>
        <div class="field-group"><label class="field-label">GSM</label><input class="form-input" value="7" /></div>
        <div class="field-group"><label class="field-label">Content Type</label>
          <select class="form-select"><option>Poker Size</option><option>Die Cut</option><option>Sheet</option><option>Partition</option><option>Honeycomb</option></select></div>
      </div>
      <div class="form-row cols-4">
        <div class="field-group"><label class="field-label">Content Name</label><input class="form-input" value="Poker Size" /></div>
        <div class="field-group"><label class="field-label">Core 1</label><select class="form-select"><option>B</option><option>C</option><option>BC</option><option>E</option></select></div>
        <div class="field-group"><label class="field-label">Core 2</label><select class="form-select"><option>—</option><option>B</option><option>C</option><option>BC</option></select></div>
        <div class="field-group"><label class="field-label">Rate (₹/Deck)</label><input class="form-input" type="number" value="22.50" /></div>
      </div>

      <!-- Dimensions -->
      <div class="form-section-title" style="margin-top:14px"><i class="bi bi-rulers"></i> Deck Dimensions</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
        <div>
          <div style="font-size:11px;font-weight:600;color:var(--fg-muted);margin-bottom:6px;text-transform:uppercase">Millimeter (MM)</div>
          <div class="form-row cols-3">
            ${[['Length','500'],['Width','350'],['Height','300'],['Opening Flap','150'],['Pasting Flap','20'],['Bottom Flap','150']].map(([l,v]) => `
            <div class="field-group"><label class="field-label">${l}</label><input class="form-input" type="number" value="${v}" /></div>`).join('')}
          </div>
        </div>
        <div>
          <div style="font-size:11px;font-weight:600;color:var(--fg-muted);margin-bottom:6px;text-transform:uppercase">Inch</div>
          <div class="form-row cols-3">
            ${[['Length','19.69'],['Width','13.78'],['Height','11.81'],['Opening Flap','5.91'],['Pasting Flap','0.79'],['Bottom Flap','5.91']].map(([l,v]) => `
            <div class="field-group"><label class="field-label">${l}</label><input class="form-input" type="number" value="${v}" style="background:var(--bg-subtle)" readonly /></div>`).join('')}
          </div>
        </div>
      </div>

      <!-- Computed Sheet / Cardstock -->
      <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:10px;background:var(--bg-subtle);border:1px solid var(--bd-default);border-radius:8px;padding:12px;margin-top:12px">
        ${[['Size OD','500×350×300'],['Size ID','494×344×294'],['Sheet W (mm)','1200'],['Sheet L (mm)','1620'],['Deckle Cuts','2'],['Cutting Waste %','3%'],['Deckle Waste %','2%'],['Req. Deckle','1200'],['Req. Cutting','1620'],['Req. Cardstock Size','1200mm'],['Total Wt (kg)','18,230'],['Deck Wt (gm)','182.3']].map(([l,v]) => `
        <div><div style="font-size:9px;text-transform:uppercase;color:var(--fg-muted);letter-spacing:.04em">${l}</div>
        <div style="font-size:13px;font-weight:700;color:var(--primary);margin-top:2px">${v}</div></div>`).join('')}
      </div>
      <div class="field-group" style="margin-top:10px"><label class="field-label">Remark</label><input class="form-input" placeholder="Any notes..." /></div>

      <!-- Layer Stack Table -->
      <div class="form-section-title" style="margin-top:14px"><i class="bi bi-layers"></i> Layer Stack</div>
      <table class="line-table">
        <thead>
          <tr><th>Sn</th><th>Core</th><th>Cardstock Code</th><th>Finish</th><th>Quality</th><th>GSM</th><th>Width (inch)</th><th>Width (mm)</th><th>Calc. GSM</th><th>BS</th><th>Wt/Pc (gm)</th><th>Total Wt (kg)</th></tr>
        </thead>
        <tbody>
          ${[
            ['1','—','KR150-1200','26','Art Paper','150','47.24','1200','150','25','48.2','4,820'],
            ['2','C','Smooth120-1200','18','Finish','120','47.24','1200','152','18','38.5','3,850'],
            ['3','—','KR150-1200','26','Art Paper','150','47.24','1200','150','25','36.4','3,640'],
            ['4','B','Smooth120-1200','18','Finish','120','47.24','1200','148','18','22.8','2,280'],
            ['5','—','KR150-1200','26','Art Paper','150','47.24','1200','150','25','36.4','3,640'],
          ].map(([sn,flute,code,bf,qual,gsm,wi,wm,cgsm,bs,wt,twt]) => `
          <tr>
            <td class="text-center">${sn}</td>
            <td class="text-center"><span class="tag tag-cyan" style="font-size:10px">${flute}</span></td>
            <td><select class="form-select" style="font-size:11px;padding:3px 5px;min-width:120px"><option>${code}</option></select></td>
            <td class="text-center">${bf}</td>
            <td><input class="form-input" value="${qual}" style="width:60px;padding:3px 5px;font-size:11px" /></td>
            <td><input class="form-input" value="${gsm}" style="width:50px;padding:3px 5px;font-size:11px" /></td>
            <td class="text-right muted" style="font-size:11px">${wi}</td>
            <td class="text-right muted" style="font-size:11px">${wm}</td>
            <td class="text-right muted" style="font-size:11px">${cgsm}</td>
            <td class="text-center muted" style="font-size:11px">${bs}</td>
            <td class="text-right" style="font-size:11px;font-weight:600">${wt}</td>
            <td class="text-right font-bold" style="font-size:11px">${twt}</td>
          </tr>`).join('')}
        </tbody>
        <tfoot>
          <tr><td colspan="10" style="font-weight:800">Total Wt / Piece</td><td class="text-right font-bold">182.3 gm</td><td class="text-right font-bold">18,230 kg</td></tr>
        </tfoot>
      </table>

      <!-- Operations Table -->
      <div class="form-section-title" style="margin-top:14px"><i class="bi bi-gear"></i> Operations</div>
      <table class="line-table">
        <thead>
          <tr><th>Sn</th><th>Operation</th><th>Rate Type</th><th>Rate (₹)</th><th>Amount (₹)</th><th>Setup Charges</th><th>Min Charges</th><th>Min Qty Charged</th></tr>
        </thead>
        <tbody>
          ${[
            ['1','Playing Card','Rate/1000','650','₹65,000','₹500','₹500','500'],
            ['2','4-Color Printing','Rate/1000','950','₹95,000','₹800','₹800','500'],
            ['3','Collation','Rate/1000','180','₹18,000','₹150','₹150','1000'],
          ].map(([sn,op,rt,rate,amt,setup,min,minQ]) => `
          <tr>
            <td class="text-center">${sn}</td>
            <td><select class="form-select" style="font-size:11px;padding:3px 5px;min-width:140px"><option>${op}</option></select></td>
            <td style="font-size:11px">${rt}</td>
            <td><input class="form-input" value="${rate}" style="width:60px;padding:3px 5px;font-size:11px" /></td>
            <td class="text-right font-bold" style="font-size:11px">${amt}</td>
            <td><input class="form-input" value="${setup}" style="width:60px;padding:3px 5px;font-size:11px" /></td>
            <td><input class="form-input" value="${min}" style="width:60px;padding:3px 5px;font-size:11px" /></td>
            <td><input class="form-input" value="${minQ}" style="width:60px;padding:3px 5px;font-size:11px" /></td>
          </tr>`).join('')}
          <tr><td colspan="8" style="text-align:center;padding:8px"><button class="btn btn-ghost btn-sm"><i class="bi bi-plus"></i> Add Operation</button></td></tr>
        </tbody>
        <tfoot>
          <tr><td colspan="4" style="font-weight:800">Total Operation Cost</td><td class="text-right font-bold">₹1,78,000</td><td colspan="3"></td></tr>
        </tfoot>
      </table>
    </div>
    <div class="modal-footer">
      <div class="modal-footer-left"><button class="btn btn-print"><i class="bi bi-printer"></i> Print Spec Sheet</button></div>
      <button class="btn btn-secondary" onclick="closeModal('modal-pm-new')">Cancel</button>
      <button class="btn btn-save"><i class="bi bi-check-lg"></i> Save Product</button>
    </div>
  </div>
</div>
`);
});
