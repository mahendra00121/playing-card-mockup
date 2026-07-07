document.addEventListener('DOMContentLoaded', () => {
  const ca = document.getElementById('contentArea');
  const tag = (c, t) => `<span class="tag tag-${c}" style="font-size:10px">${t}</span>`;
  const fi = (label, type='text', req=false, placeholder='') =>
    `<div class="field-group"><label class="field-label${req?' required':''}">${label}</label>
     <input class="form-input" type="${type}" placeholder="${placeholder||label+'...'}" /></div>`;
  const fs = (label, opts=[], req=false) =>
    `<div class="field-group"><label class="field-label${req?' required':''}">${label}</label>
     <select class="form-select">${opts.map(o=>`<option>${o}</option>`).join('')}</select></div>`;
  const fchk = (label) =>
    `<label style="display:flex;align-items:center;gap:6px;font-size:12px;cursor:pointer"><input type="checkbox" /> ${label}</label>`;

  // ─── Ink/Coating MASTER ────────────────────────────────────────────────────
  ca.insertAdjacentHTML('beforeend', `
<div class="page" id="page-m-Ink/Coating">
  <div class="page-header">
    <div><div class="page-title">Ink/Coating Master</div><div class="page-subtitle">Sheet Ink/Coating items — quality, GSM, dimensions, units and packaging</div></div>
    <div class="page-actions">
      <button class="btn btn-secondary btn-sm"><i class="bi bi-download"></i> Export</button>
      <button class="btn btn-create" onclick="openModal('modal-m-Ink/Coating')"><i class="bi bi-plus"></i> Add Ink/Coating</button>
    </div>
  </div>
  <div class="toolbar"><div class="toolbar-left">
    <div class="search-input-wrap"><i class="bi bi-search"></i><input class="search-input" placeholder="Item name, quality, GSM..." /></div>
    <select class="form-select" style="width:120px;padding:5px 8px"><option>All Quality</option><option>Art Paper</option><option>White</option><option>Test</option></select>
    <select class="form-select" style="width:110px;padding:5px 8px"><option>All GSM</option><option>80 GSM</option><option>100 GSM</option><option>120 GSM</option><option>150 GSM</option></select>
  </div></div>
  <div class="grid-wrap">
    <table class="data-table">
      <thead><tr><th>Item Code</th><th>Item Name</th><th>Quality</th><th>Ink/Coating Group</th><th>GSM</th><th>Finish</th><th>Caliper (MM)</th><th>Width (MM)</th><th>Width (CM)</th><th>Width (Inch)</th><th>Length (MM)</th><th>Length (CM)</th><th>Length (Inch)</th><th>Purchase Unit</th><th>Purchase Rate</th><th>Est. Unit</th><th>Est. Rate</th><th>Stock Unit</th><th>HSN Code</th><th>HSN Description</th><th></th></tr></thead>
      <tbody>
        ${[
          ['PP-001','Art Paper 90GSM 900×1800','Art Paper','Face Ink/Coating','90','Plain','0.18','900','90','35.43','1800','180','70.87','SHT','8.50','SHT','8.50','SHT','48101900','Art Paper Ink/Coating sheets'],
          ['PP-002','White 120GSM 1000×2000','White','Top Liner','120','Glossy','0.22','1000','100','39.37','2000','200','78.74','SHT','12.00','SHT','12.00','SHT','48101900','White coated Ink/Coating'],
          ['PP-003','Test 80GSM 900×1800','Test','Fluting','80','Plain','0.15','900','90','35.43','1800','180','70.87','SHT','7.00','SHT','7.00','SHT','48109900','Test liner sheets'],
          ['PP-004','Brown 100GSM 1200×2400','Brown','Medium','100','Plain','0.19','1200','120','47.24','2400','240','94.49','SHT','9.50','SHT','9.50','SHT','48101900','Brown kraft Ink/Coating'],
        ].map(([cd,nm,ql,pg,gsm,fn,cal,wmm,wcm,win,lmm,lcm,lin,pu,pr,eu,er,su,hsn,hd])=>`
        <tr onclick="openModal('modal-m-Ink/Coating')">
          <td><b>${cd}</b></td><td>${nm}</td>
          <td>${tag('blue',ql)}</td>
          <td style="font-size:11px">${pg}</td>
          <td class="text-center">${gsm}</td>
          <td class="muted" style="font-size:11px">${fn}</td>
          <td class="text-right muted" style="font-size:10px">${cal}</td>
          <td class="text-right font-bold">${wmm}</td><td class="text-right muted" style="font-size:11px">${wcm}</td>
          <td class="text-right muted" style="font-size:11px">${win}"</td>
          <td class="text-right font-bold">${lmm}</td><td class="text-right muted" style="font-size:11px">${lcm}</td>
          <td class="text-right muted" style="font-size:11px">${lin}"</td>
          <td class="text-center muted" style="font-size:11px">${pu}</td>
          <td class="text-right font-bold">₹${pr}</td>
          <td class="text-center muted" style="font-size:11px">${eu}</td>
          <td class="text-right">₹${er}</td>
          <td class="text-center muted" style="font-size:11px">${su}</td>
          <td style="font-family:monospace;font-size:10px">${hsn}</td>
          <td class="muted" style="font-size:11px">${hd}</td>
          <td class="actions-cell"><button class="btn btn-edit btn-icon btn-sm" onclick="event.stopPropagation()"><i class="bi bi-pencil"></i></button><button class="btn btn-delete btn-icon btn-sm" onclick="event.stopPropagation()"><i class="bi bi-trash"></i></button></td>
        </tr>`).join('')}
      </tbody>
    </table>
    <div class="grid-footer"><span>Showing 4 of 48 Ink/Coating items</span></div>
  </div>
</div>
<div class="modal-overlay hidden" id="modal-m-Ink/Coating">
  <div class="modal modal-xl">
    <div class="modal-header"><div class="modal-icon"><i class="bi bi-file-earmark"></i></div>
      <div><div class="modal-title">Add / Edit Ink/Coating Item</div><div class="modal-sub">Quality, GSM, dimensions, purchase/estimation/stock units and packaging</div></div>
      <button class="modal-close" onclick="closeModal('modal-m-Ink/Coating')"><i class="bi bi-x"></i></button>
    </div>
    <div class="modal-body">
      <div class="form-section-title"><i class="bi bi-info-circle"></i> Item Identity</div>
      <div class="form-row cols-4">
        <div class="field-group"><label class="field-label">Ink/Coating Code</label><input class="form-input" value="PP-049" readonly style="background:var(--bg-subtle)" /></div>
        <div class="field-group"><label class="field-label">Item Name <span style="font-size:10px;color:var(--muted)">(auto)</span></label><input class="form-input" placeholder="Auto from Quality + GSM + Size" readonly style="background:var(--bg-subtle)" /></div>
        ${fs('Quality',['Art Paper','White','Test','Brown','Semi-Chem'],'true')}
        ${fs('Ink/Coating Group',['Face Ink/Coating','Top Liner','Fluting','Medium','Bottom Liner'],'true')}
      </div>
      <div class="form-row cols-4">
        ${fs('GSM',['70','80','90','100','110','120','150','180','200'],'true')}
        ${fs('Finish',['Plain','Coated','Glossy','Matte'])}
        <div class="field-group"><label class="field-label">Caliper (MM) <span style="font-size:10px;color:var(--muted)">(computed)</span></label><input class="form-input" readonly style="background:var(--bg-subtle)" placeholder="Auto-calculated" /></div>
        <div></div>
      </div>

      <div class="form-section-title" style="margin-top:10px"><i class="bi bi-rulers"></i> Dimensions <span style="font-size:11px;font-weight:400;color:var(--muted)">— values sync across MM / CM / Inch</span></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div>
          <label class="field-label required">Ink/Coating Width</label>
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-top:4px">
            <div><label style="font-size:10px;color:var(--muted);display:block;margin-bottom:2px">MM</label><input class="form-input" placeholder="900" /></div>
            <div><label style="font-size:10px;color:var(--muted);display:block;margin-bottom:2px">CM</label><input class="form-input" placeholder="90" /></div>
            <div><label style="font-size:10px;color:var(--muted);display:block;margin-bottom:2px">Inch</label><input class="form-input" placeholder="35.43" /></div>
          </div>
        </div>
        <div>
          <label class="field-label required">Ink/Coating Length</label>
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-top:4px">
            <div><label style="font-size:10px;color:var(--muted);display:block;margin-bottom:2px">MM</label><input class="form-input" placeholder="1800" /></div>
            <div><label style="font-size:10px;color:var(--muted);display:block;margin-bottom:2px">CM</label><input class="form-input" placeholder="180" /></div>
            <div><label style="font-size:10px;color:var(--muted);display:block;margin-bottom:2px">Inch</label><input class="form-input" placeholder="70.87" /></div>
          </div>
        </div>
      </div>

      <div class="form-section-title" style="margin-top:10px"><i class="bi bi-Deck-seam"></i> Units & Rates</div>
      <div class="form-row cols-3">
        ${fs('Purchase Unit',['SHT','KG','PCS','Deck','REAM'],'true')}
        ${fi('Purchase Rate (₹)','number',true,'e.g. 8.50')}
        ${fi('Re-Order Qty','number',false,'e.g. 1000')}
      </div>
      <div class="form-row cols-3">
        ${fs('Estimation Unit',['SHT','KG','SqM'],'true')}
        ${fi('Estimation Rate (₹)','number',true,'e.g. 8.50')}
        ${fs('Stock Unit',['SHT','KG','PCS'],'true')}
      </div>

      <div class="form-section-title" style="margin-top:10px"><i class="bi bi-Decks"></i> Packing Details</div>
      <div class="form-row cols-3">
        ${fs('Packing Type',['Bundle','Deck','Ream','Pallet'])}
        ${fs('Sheets Per Packing',['50','100','200','250','500'])}
        ${fi('Per Packet Weight (kg)','number')}
      </div>

      <div class="form-section-title" style="margin-top:10px"><i class="bi bi-receipt"></i> HSN & Other</div>
      <div class="form-row cols-2">
        ${fs('HSN Code',['48101900','48109900','48119000','48010000'],'true')}
        <div class="field-group"><label class="field-label">HSN Description <span style="font-size:10px;color:var(--muted)">(auto)</span></label><input class="form-input" value="Art Paper Ink/Coating sheets" readonly style="background:var(--bg-subtle)" /></div>
      </div>
      <div class="form-row cols-2">
        ${fs('Certification Type',['ISO','ISI','BIS','None'])}
        ${fi('Stock Ref. Code')}
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:14px;padding:6px 0 2px">
        ${fchk('Standard Size')} ${fchk('Regular Item')} ${fchk('Is Active')}
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal('modal-m-Ink/Coating')">Cancel</button>
      <button class="btn btn-save"><i class="bi bi-check-lg"></i> Save Ink/Coating Item</button>
    </div>
  </div>
</div>`);

  // ─── Cardstock MASTER ─────────────────────────────────────────────────────
  ca.insertAdjacentHTML('beforeend', `
<div class="page" id="page-m-Cardstock">
  <div class="page-header">
    <div><div class="page-title">Cardstock Master</div><div class="page-subtitle">Cardstock items — quality, Finish, GSM, width (MM/CM/Inch) and procurement details</div></div>
    <div class="page-actions">
      <button class="btn btn-secondary btn-sm"><i class="bi bi-download"></i> Export</button>
      <button class="btn btn-create" onclick="openModal('modal-m-Cardstock')"><i class="bi bi-plus"></i> Add Cardstock</button>
    </div>
  </div>
  <div class="grid-wrap">
    <table class="data-table">
      <thead><tr><th>Item Code</th><th>Item Name</th><th>Quality</th><th>Finish</th><th>Ink/Coating Group</th><th>GSM</th><th>Finish</th><th>Width (MM)</th><th>Width (CM)</th><th>Width (Inch)</th><th>Purchase Unit</th><th>Purchase Rate</th><th>Est. Unit</th><th>Est. Rate</th><th>Stock Unit</th><th>HSN Code</th><th>HSN Description</th><th></th></tr></thead>
      <tbody>
        ${[
          ['RL-001','Art Paper Finish-22 90GSM 1250mm','Art Paper','22','Face Liner','90','Plain','1250','125','49.21','KG','42.00','KG','42.00','KG','48010000','Art Paper liner Cardstock'],
          ['RL-002','White Finish-18 120GSM 1000mm','White','18','Top Liner','120','Coated','1000','100','39.37','KG','55.00','KG','55.00','KG','48010000','White top liner'],
          ['RL-003','SC Finish-26 160GSM 1400mm','Semi-Chem','26','Fluting','160','Plain','1400','140','55.12','KG','48.00','KG','48.00','KG','48010000','SC fluting Cardstock'],
          ['RL-004','Art Paper Finish-14 80GSM 900mm','Art Paper','14','Medium','80','Plain','900','90','35.43','KG','38.00','KG','38.00','KG','48010000','Brown medium'],
        ].map(([cd,nm,ql,bf,pg,gsm,fn,wmm,wcm,win,pu,pr,eu,er,su,hsn,hd])=>`
        <tr onclick="openModal('modal-m-Cardstock')">
          <td><b>${cd}</b></td><td>${nm}</td>
          <td>${tag('blue',ql)}</td>
          <td class="text-center font-bold">${bf}</td>
          <td style="font-size:11px">${pg}</td>
          <td class="text-center">${gsm}</td>
          <td class="muted" style="font-size:11px">${fn}</td>
          <td class="text-right font-bold">${wmm}</td>
          <td class="text-right muted" style="font-size:11px">${wcm}</td>
          <td class="text-right muted" style="font-size:11px">${win}"</td>
          <td class="text-center muted" style="font-size:11px">${pu}</td>
          <td class="text-right font-bold">₹${pr}</td>
          <td class="text-center muted" style="font-size:11px">${eu}</td>
          <td class="text-right">₹${er}</td>
          <td class="text-center muted" style="font-size:11px">${su}</td>
          <td style="font-family:monospace;font-size:10px">${hsn}</td>
          <td class="muted" style="font-size:11px">${hd}</td>
          <td class="actions-cell"><button class="btn btn-edit btn-icon btn-sm" onclick="event.stopPropagation()"><i class="bi bi-pencil"></i></button><button class="btn btn-delete btn-icon btn-sm" onclick="event.stopPropagation()"><i class="bi bi-trash"></i></button></td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>
</div>
<div class="modal-overlay hidden" id="modal-m-Cardstock">
  <div class="modal modal-xl">
    <div class="modal-header"><div class="modal-icon"><i class="bi bi-arrow-repeat"></i></div>
      <div><div class="modal-title">Add / Edit Cardstock Item</div><div class="modal-sub">Finish, quality, GSM, width (MM/CM/Inch) sync, units and procurement</div></div>
      <button class="modal-close" onclick="closeModal('modal-m-Cardstock')"><i class="bi bi-x"></i></button>
    </div>
    <div class="modal-body">
      <div class="form-section-title"><i class="bi bi-info-circle"></i> Item Identity</div>
      <div class="form-row cols-4">
        <div class="field-group"><label class="field-label">Cardstock Code</label><input class="form-input" value="RL-049" readonly style="background:var(--bg-subtle)" /></div>
        <div class="field-group"><label class="field-label">Item Name <span style="font-size:10px;color:var(--muted)">(auto)</span></label><input class="form-input" placeholder="Auto from Quality+Finish+GSM+Width" readonly style="background:var(--bg-subtle)" /></div>
        ${fs('Quality',['Art Paper','White','Semi-Chem','Test','Brown'],'true')}
        ${fs('Ink/Coating Group',['Face Liner','Top Liner','Fluting','Medium','Bottom Liner'],'true')}
      </div>
      <div class="form-row cols-4">
        ${fi('Finish (Burst Factor)','number',true,'e.g. 22')}
        ${fs('GSM',['70','80','90','100','110','120','150','160'],'true')}
        ${fs('Finish',['Plain','Coated','Glossy','Matte'])}
        ${fs('Category',['Liner','Fluting','Medium'])}
      </div>

      <div class="form-section-title" style="margin-top:10px"><i class="bi bi-rulers"></i> Cardstock Width <span style="font-size:11px;font-weight:400;color:var(--muted)">— values sync across units</span></div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;max-width:420px">
        <div><label style="font-size:11px;color:var(--muted);display:block;margin-bottom:4px" class="required">Width (MM)</label><input class="form-input" placeholder="1250" /></div>
        <div><label style="font-size:11px;color:var(--muted);display:block;margin-bottom:4px">Width (CM)</label><input class="form-input" placeholder="125" /></div>
        <div><label style="font-size:11px;color:var(--muted);display:block;margin-bottom:4px">Width (Inch)</label><input class="form-input" placeholder="49.21" /></div>
      </div>

      <div class="form-section-title" style="margin-top:10px"><i class="bi bi-Deck-seam"></i> Units & Rates</div>
      <div class="form-row cols-3">
        ${fs('Purchase Unit',['KG','MT','PCS'],'true')}
        ${fi('Purchase Rate (₹)','number',true,'e.g. 42.00')}
        ${fi('Re-Order Qty','number',false,'e.g. 5000 kg')}
      </div>
      <div class="form-row cols-3">
        ${fs('Estimation Unit',['KG','MT','SQM'],'true')}
        ${fi('Estimation Rate (₹)','number',true)}
        ${fs('Stock Unit',['KG','MT','PCS'],'true')}
      </div>

      <div class="form-section-title" style="margin-top:10px"><i class="bi bi-receipt"></i> HSN & Other</div>
      <div class="form-row cols-2">
        ${fs('HSN Code',['48010000','48011000','48020000'],'true')}
        <div class="field-group"><label class="field-label">HSN Description <span style="font-size:10px;color:var(--muted)">(auto)</span></label><input class="form-input" value="Art Paper liner Cardstock" readonly style="background:var(--bg-subtle)" /></div>
      </div>
      <div class="form-row cols-2">
        ${fs('Certification Type',['ISO','ISI','BIS','None'])}
        ${fi('Stock Ref. Code')}
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:14px;padding:6px 0 2px">
        ${fchk('Standard Size')} ${fchk('Regular Item')} ${fchk('Is Active')}
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal('modal-m-Cardstock')">Cancel</button>
      <button class="btn btn-save"><i class="bi bi-check-lg"></i> Save Cardstock Item</button>
    </div>
  </div>
</div>`);

  // ─── DIE MASTER ──────────────────────────────────────────────────────
  ca.insertAdjacentHTML('beforeend', `
<div class="page" id="page-m-die">
  <div class="page-header">
    <div><div class="page-title">Die / Tool Master</div><div class="page-subtitle">Cutting die and tool register — client, dimensions, ups, HSN and attachments</div></div>
    <div class="page-actions">
      <button class="btn btn-secondary btn-sm"><i class="bi bi-download"></i> Export</button>
      <button class="btn btn-create" onclick="openModal('modal-m-die')"><i class="bi bi-plus"></i> Add Tool</button>
    </div>
  </div>
  <div class="grid-wrap">
    <table class="data-table">
      <thead><tr><th>Tool No</th><th>Ref Code</th><th>Client</th><th>Job Name</th><th>Category</th><th>Catalog Code</th><th>Content Type</th><th>L (mm)</th><th>W (mm)</th><th>H (mm)</th><th>Total Ups</th><th>HSN</th><th>Location</th><th>Active</th><th>Created By</th><th></th></tr></thead>
      <tbody>
        ${[['TL-001','DIE-001','Amul Dairy','Butter Deck','Poker Size','CAT-A001','Tuck-Top','240','180','120','2','48191000','Rack A-1',true,'Admin'],
           ['TL-002','DIE-002','ITC Limited','Biscuit Carton','FEFCO-0201','CAT-B002','Auto-Bottom','160','100','60','4','48191000','Rack A-2',true,'Admin'],
           ['TL-003','DIE-003','HUL','Soap Deck','Tray','CAT-C003','Straight Tuck','90','60','40','6','48191000','Rack B-1',true,'Admin'],
           ['TL-004','DIE-004','Patanjali','Powder Deck','SRP','CAT-D004','Reverse Tuck','200','150','80','1','48191000','Rack B-3',false,'Admin'],
        ].map(([tn,rc,cl,jn,cat,cc,ct,l,w,h,ups,hsn,loc,active,by])=>`
        <tr onclick="openModal('modal-m-die')">
          <td><b>${tn}</b></td>
          <td style="font-family:monospace;font-size:10px">${rc}</td>
          <td style="font-size:11px">${cl}</td>
          <td style="font-size:11px">${jn}</td>
          <td>${tag('blue',cat)}</td>
          <td style="font-size:11px">${cc}</td>
          <td style="font-size:11px">${ct}</td>
          <td class="text-right">${l}</td><td class="text-right">${w}</td><td class="text-right">${h}</td>
          <td class="text-center font-bold">${ups}</td>
          <td style="font-family:monospace;font-size:10px">${hsn}</td>
          <td style="font-size:11px">${loc}</td>
          <td>${tag(active?'green':'red',active?'Yes':'No')}</td>
          <td class="muted" style="font-size:11px">${by}</td>
          <td class="actions-cell"><button class="btn btn-edit btn-icon btn-sm" onclick="event.stopPropagation()"><i class="bi bi-pencil"></i></button><button class="btn btn-delete btn-icon btn-sm" onclick="event.stopPropagation()"><i class="bi bi-trash"></i></button></td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>
</div>
<div class="modal-overlay hidden" id="modal-m-die">
  <div class="modal modal-xl">
    <div class="modal-header"><div class="modal-icon"><i class="bi bi-scissors"></i></div>
      <div><div class="modal-title">Add / Edit Die / Tool</div><div class="modal-sub">Client, category, dimensions, ups, HSN and attachments</div></div>
      <button class="modal-close" onclick="closeModal('modal-m-die')"><i class="bi bi-x"></i></button>
    </div>
    <div class="modal-body">
      <div class="form-section-title"><i class="bi bi-info-circle"></i> Tool Identity</div>
      <div class="form-row cols-4">
        <div class="field-group"><label class="field-label">Tool No <span style="font-size:10px;color:var(--muted)">(auto)</span></label><input class="form-input" value="TL-049" readonly style="background:var(--bg-subtle)" /></div>
        ${fi('Date','date',true)}
        ${fi('Tool Reference Code',false,false,'e.g. DIE-049')}
        ${fs('Client Name',['Amul Dairy','ITC Limited','Hindustan Unilever','Patanjali'],'true')}
      </div>
      <div class="form-row cols-4">
        ${fs('Category',['Poker Size','FEFCO-0201','Tray','SRP','Custom'],'true')}
        <div class="field-group"><label class="field-label">Product Catalog Code <button class="btn btn-ghost btn-sm" style="padding:1px 5px;font-size:10px;margin-left:3px"><i class="bi bi-search"></i></button></label><input class="form-input" placeholder="Search catalog..." /></div>
        <div class="field-group"><label class="field-label">Content Type <button class="btn btn-ghost btn-sm" style="padding:1px 5px;font-size:10px;margin-left:3px"><i class="bi bi-search"></i></button></label><input class="form-input" placeholder="e.g. Tuck-Top..." /></div>
        ${fi('Job Name',false,false,'Description')}
      </div>

      <div class="form-section-title" style="margin-top:10px"><i class="bi bi-rulers"></i> Dimensions & Ups</div>
      <div class="form-row cols-4">
        ${fi('Length (MM)','number',true,'e.g. 240')}
        ${fi('Width (MM)','number',true,'e.g. 180')}
        ${fi('Height (MM)','number',true,'e.g. 120')}
        <div></div>
      </div>
      <div class="form-row cols-4">
        ${fi('Ups — L (across)','number',false,'e.g. 2')}
        ${fi('Ups — W (lengthwise)','number',false,'e.g. 1')}
        <div class="field-group"><label class="field-label">Total Ups <span style="font-size:10px;color:var(--muted)">(L × W)</span></label><input class="form-input" value="2" readonly style="background:var(--bg-subtle)" /></div>
        <div></div>
      </div>

      <div class="form-section-title" style="margin-top:10px"><i class="bi bi-receipt"></i> HSN & Procurement</div>
      <div class="form-row cols-4">
        ${fs('HSN Code',['48191000','48192000','48195000'],'true')}
        <div class="field-group"><label class="field-label">HSN Description</label><input class="form-input" value="Playing Card Decks" readonly style="background:var(--bg-subtle)" /></div>
        ${fs('Purchase Unit',['PCS','SET'])}
        ${fs('Stock Unit',['PCS','SET'])}
      </div>
      <div class="form-row cols-4">
        ${fi('Tool Location',false,false,'e.g. Rack A-1')}
        ${fs('Supplier',['Photon Dies','PrintTech Dies','Custom Tools'])}
        ${fi('Price (₹)','number')}
        <div class="field-group" style="padding-top:4px"><label class="field-label">Is Active Tool</label><div style="margin-top:8px">${fchk('Active Tool')}</div></div>
      </div>

      <div class="form-section-title" style="margin-top:10px"><i class="bi bi-paperclip"></i> Attachments</div>
      <table class="line-table">
        <thead><tr><th>File Name</th><th>Remark</th><th></th></tr></thead>
        <tbody>
          <tr>
            <td><button class="btn btn-ghost btn-sm" style="font-size:11px"><i class="bi bi-upload"></i> Choose File</button></td>
            <td><input class="form-input" placeholder="Description..." style="font-size:11px;padding:3px 6px" /></td>
            <td><button class="btn btn-delete btn-icon btn-sm"><i class="bi bi-trash"></i></button></td>
          </tr>
          <tr><td colspan="3" style="text-align:center;padding:6px"><button class="btn btn-ghost btn-sm"><i class="bi bi-plus"></i> Add Attachment</button></td></tr>
        </tbody>
      </table>
      <div style="margin-top:10px">${fi('Tool Description / Remark')}</div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal('modal-m-die')">Cancel</button>
      <button class="btn btn-save"><i class="bi bi-check-lg"></i> Save Tool</button>
    </div>
  </div>
</div>`);

  // ─── DIVISION MASTER ─────────────────────────────────────────────────
  ca.insertAdjacentHTML('beforeend', `
<div class="page" id="page-m-division">
  <div class="page-header">
    <div><div class="page-title">Division Master</div><div class="page-subtitle">Business divisions with profit factor settings and approval authority</div></div>
    <div class="page-actions">
      <button class="btn btn-create" onclick="openModal('modal-m-division')"><i class="bi bi-plus"></i> Add Division</button>
    </div>
  </div>
  <div class="grid-wrap">
    <table class="data-table">
      <thead><tr><th>Division Code</th><th>Division Name</th><th>Ref Division Code</th><th>Default Factor</th><th>Factor Value Type</th><th>Default Profit</th><th></th></tr></thead>
      <tbody>
        ${[['DIV-001','Playing Card Decks','MAIN','1.0','Percentage','12%'],
           ['DIV-002','Art Paper Ink/Coating','Ink/Coating','1.05','Multiplier','10%'],
           ['DIV-003','Printed Decks','PRINT','1.0','Percentage','15%'],
           ['DIV-004','Export Division','EXP','0.95','Multiplier','8%'],
        ].map(([cd,nm,ref,df,fvt,dp])=>`
        <tr onclick="openModal('modal-m-division')">
          <td><b>${cd}</b></td><td>${nm}</td>
          <td style="font-family:monospace;font-size:11px">${ref}</td>
          <td class="text-center">${df}</td>
          <td>${tag('blue',fvt)}</td>
          <td class="text-right font-bold">${dp}</td>
          <td class="actions-cell"><button class="btn btn-edit btn-icon btn-sm" onclick="event.stopPropagation()"><i class="bi bi-pencil"></i></button><button class="btn btn-delete btn-icon btn-sm" onclick="event.stopPropagation()"><i class="bi bi-trash"></i></button></td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>
</div>
<div class="modal-overlay hidden" id="modal-m-division">
  <div class="modal modal-lg">
    <div class="modal-header"><div class="modal-icon"><i class="bi bi-building"></i></div>
      <div><div class="modal-title">Add / Edit Division</div></div>
      <button class="modal-close" onclick="closeModal('modal-m-division')"><i class="bi bi-x"></i></button>
    </div>
    <div class="modal-body">
      <div class="form-row cols-2">
        <div class="field-group"><label class="field-label">Division Code <span style="font-size:10px;color:var(--muted)">(auto)</span></label><input class="form-input" value="DIV-005" readonly style="background:var(--bg-subtle)" /></div>
        ${fi('Division Name','text',true)}
      </div>
      <div class="form-row cols-4">
        ${fi('Ref Division Code',false,false,'e.g. MAIN')}
        ${fi('Default Factor','number',false,'e.g. 1.0')}
        ${fs('Factor Value Type',['Percentage','Multiplier','Fixed Amount'])}
        ${fi('Default Profit (%)','number',false,'e.g. 12')}
      </div>
      <div class="form-section-title" style="margin-top:12px"><i class="bi bi-table"></i> Profit Factor Settings</div>
      <table class="line-table">
        <thead><tr><th>Range From</th><th>Range To</th><th>Range Type</th><th>Approval Authority</th><th></th></tr></thead>
        <tbody>
          ${[[0,100000,'Amount','Self'],[100001,500000,'Amount','Manager'],[500001,9999999,'Amount','Director']].map(([fr,to,rt,aa])=>`
          <tr>
            <td><input class="form-input" value="${fr}" style="width:80px;padding:3px 6px;font-size:11px" /></td>
            <td><input class="form-input" value="${to}" style="width:90px;padding:3px 6px;font-size:11px" /></td>
            <td><select class="form-select" style="font-size:11px;padding:3px 6px"><option${rt==='Amount'?' selected':''}>Amount</option><option>Percentage</option></select></td>
            <td><select class="form-select" style="font-size:11px;padding:3px 6px"><option${aa==='Self'?' selected':''}>Self</option><option${aa==='Manager'?' selected':''}>Manager</option><option${aa==='Director'?' selected':''}>Director</option></select></td>
            <td><button class="btn btn-delete btn-icon btn-sm"><i class="bi bi-trash"></i></button></td>
          </tr>`).join('')}
          <tr><td colspan="5" style="text-align:center;padding:6px"><button class="btn btn-ghost btn-sm"><i class="bi bi-plus"></i> Add Range</button></td></tr>
        </tbody>
      </table>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal('modal-m-division')">Cancel</button>
      <button class="btn btn-save"><i class="bi bi-check-lg"></i> Save Division</button>
    </div>
  </div>
</div>`);

  // ─── CATEGORY MASTER ─────────────────────────────────────────────────
  ca.insertAdjacentHTML('beforeend', `
<div class="page" id="page-m-category">
  <div class="page-header">
    <div><div class="page-title">Category Master</div><div class="page-subtitle">Product categories — orientation, layer, gap/margin/trim settings and COA parameters</div></div>
    <div class="page-actions">
      <button class="btn btn-create" onclick="openModal('modal-m-category')"><i class="bi bi-plus"></i> Add Category</button>
    </div>
  </div>
  <div class="grid-wrap">
    <table class="data-table">
      <thead><tr><th>Category Code</th><th>Category Name</th><th>Orientation</th><th>Division</th><th>Layer</th><th>Status</th><th></th></tr></thead>
      <tbody>
        ${[['CAT-001','Poker Size','Portrait','Playing Card Decks','3 GSM','Active'],
           ['CAT-002','HSC Deck','Landscape','Playing Card Decks','5 GSM','Active'],
           ['CAT-003','FEFCO-0201','Portrait','Playing Card Decks','3 GSM','Active'],
           ['CAT-004','Printed Mono Carton','Portrait','Printed Decks','Mono','Active'],
           ['CAT-005','SRP Shipper','Landscape','Playing Card Decks','5 GSM','Inactive'],
        ].map(([cd,nm,or_,div,ly,st])=>`
        <tr onclick="openModal('modal-m-category')">
          <td><b>${cd}</b></td><td>${nm}</td>
          <td>${tag('blue',or_)}</td>
          <td style="font-size:11px">${div}</td>
          <td>${tag('orange',ly)}</td>
          <td>${tag(st==='Active'?'green':'red',st)}</td>
          <td class="actions-cell"><button class="btn btn-edit btn-icon btn-sm" onclick="event.stopPropagation()"><i class="bi bi-pencil"></i></button><button class="btn btn-delete btn-icon btn-sm" onclick="event.stopPropagation()"><i class="bi bi-trash"></i></button></td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>
</div>
<div class="modal-overlay hidden" id="modal-m-category">
  <div class="modal modal-xl">
    <div class="modal-header"><div class="modal-icon"><i class="bi bi-collection"></i></div>
      <div><div class="modal-title">Add / Edit Category</div><div class="modal-sub">Orientation, layers, gap/margin/trim settings, content/process allocation and COA</div></div>
      <button class="modal-close" onclick="closeModal('modal-m-category')"><i class="bi bi-x"></i></button>
    </div>
    <div class="modal-body">
      <div class="form-row cols-4">
        ${fi('Category Name','text',true)}
        ${fs('Orientation',['Portrait','Landscape'],'true')}
        ${fs('Division',['Playing Card Decks','Printed Decks','Art Paper Ink/Coating'],'true')}
        ${fi('Layer / GSM',false,true,'e.g. 3 GSM')}
      </div>

      <div class="form-section-title" style="margin-top:10px"><i class="bi bi-arrows-angle-expand"></i> Gap Settings (all values in MM)</div>
      <div style="overflow-x:auto">
        <table class="line-table" style="min-width:400px">
          <thead><tr><th style="min-width:140px"></th><th>Min</th><th>Max</th><th>Default</th></tr></thead>
          <tbody>
            ${[['Around Gap','5','20','10'],['Across Gap','5','20','10'],['Plate Bearer (MM)','10','30','15'],['Side Strip (MM)','5','25','12']].map(([lbl,mn,mx,def])=>`
            <tr><td style="font-weight:600;font-size:12px">${lbl}</td>
              ${[mn,mx,def].map(v=>`<td><input class="form-input" value="${v}" style="width:70px;padding:3px 6px;font-size:11px" /></td>`).join('')}
            </tr>`).join('')}
          </tbody>
        </table>
      </div>

      <div class="form-section-title" style="margin-top:12px"><i class="bi bi-border-all"></i> Margins & Trim (MM)</div>
      <div style="overflow-x:auto">
        <table class="line-table" style="min-width:400px">
          <thead><tr><th style="min-width:140px">Setting</th><th>Top</th><th>Bottom</th><th>Left</th><th>Right</th></tr></thead>
          <tbody>
            ${[['Printing Margin','5','5','5','5'],['Stripping Margin','3','3','3','3'],['Job Trimming','2','2','2','2']].map(([lbl,...vals])=>`
            <tr><td style="font-weight:600;font-size:12px">${lbl}</td>
              ${vals.map(v=>`<td><input class="form-input" value="${v}" style="width:60px;padding:3px 6px;font-size:11px" /></td>`).join('')}
            </tr>`).join('')}
          </tbody>
        </table>
      </div>

      <div class="form-section-title" style="margin-top:12px"><i class="bi bi-tags"></i> Content Allocation</div>
      <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:8px;align-items:center">
        ${['Tuck-Top','Auto-Bottom','Straight-Tuck','Reverse-Tuck','Sleeve'].map(c=>
          `<span class="tag tag-blue" style="cursor:pointer;font-size:11px">${c} <i class="bi bi-x"></i></span>`).join('')}
        <button class="btn btn-ghost btn-sm" style="font-size:11px"><i class="bi bi-plus"></i> Add</button>
      </div>

      <div class="form-section-title" style="margin-top:8px"><i class="bi bi-gear"></i> Process Allocation</div>
      <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:8px;align-items:center">
        ${['4-Color Printing','Die Cutting','Lamination','Embossing'].map(c=>
          `<span class="tag tag-orange" style="cursor:pointer;font-size:11px">${c} <i class="bi bi-x"></i></span>`).join('')}
        <button class="btn btn-ghost btn-sm" style="font-size:11px"><i class="bi bi-plus"></i> Add</button>
      </div>

      <div class="form-section-title" style="margin-top:12px"><i class="bi bi-clipboard-check"></i> COA Parameters</div>
      <table class="line-table">
        <thead><tr><th>Test Parameter</th><th>Specification</th><th>Unit</th><th>Default Value</th><th></th></tr></thead>
        <tbody>
          ${[['Bursting Strength','Min 14','kgf/cm²','14'],['Edge Crush Test','Min 11','kN/m','11'],['GSM','As per spec','g/m²','—'],['Moisture Content','Max 12%','%','10']].map(([t,s,u,d])=>`
          <tr>
            <td><input class="form-input" value="${t}" style="font-size:11px;padding:3px 6px;min-width:140px" /></td>
            <td><input class="form-input" value="${s}" style="font-size:11px;padding:3px 6px;min-width:100px" /></td>
            <td><input class="form-input" value="${u}" style="font-size:11px;padding:3px 6px;width:70px" /></td>
            <td><input class="form-input" value="${d}" style="font-size:11px;padding:3px 6px;width:70px" /></td>
            <td><button class="btn btn-delete btn-icon btn-sm"><i class="bi bi-trash"></i></button></td>
          </tr>`).join('')}
          <tr><td colspan="5" style="text-align:center;padding:6px"><button class="btn btn-ghost btn-sm"><i class="bi bi-plus"></i> Add Parameter</button></td></tr>
        </tbody>
      </table>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal('modal-m-category')">Cancel</button>
      <button class="btn btn-save"><i class="bi bi-check-lg"></i> Save Category</button>
    </div>
  </div>
</div>`);

  // ─── HSN MASTER ──────────────────────────────────────────────────────
  ca.insertAdjacentHTML('beforeend', `
<div class="page" id="page-m-hsn">
  <div class="page-header">
    <div><div class="page-title">Product HSN Master</div><div class="page-subtitle">HSN codes with description, product type, GST split and service flag</div></div>
    <div class="page-actions">
      <button class="btn btn-secondary btn-sm"><i class="bi bi-download"></i> Export</button>
      <button class="btn btn-create" onclick="openModal('modal-m-hsn')"><i class="bi bi-plus"></i> Add HSN</button>
    </div>
  </div>
  <div class="grid-wrap">
    <table class="data-table">
      <thead><tr><th>HSN Description</th><th>HSN Code</th><th>Product Type</th><th>GST %</th><th>IGST %</th><th>CGST %</th><th>SGST %</th><th>Service?</th><th></th></tr></thead>
      <tbody>
        ${[['Playing Card Decks','48191000','Goods','12','12','6','6',false],
           ['Art Paper liner Cardstock','48010000','Goods','12','12','6','6',false],
           ['Art Paper Ink/Coating sheets','48101900','Goods','12','12','6','6',false],
           ['Printing services','99843','Services','18','18','9','9',true],
           ['Die cutting tool','82078000','Goods','18','18','9','9',false],
        ].map(([desc,code,pt,gst,igst,cgst,sgst,isSvc])=>`
        <tr onclick="openModal('modal-m-hsn')">
          <td><b>${desc}</b></td>
          <td style="font-family:monospace;font-size:11px">${code}</td>
          <td>${tag(pt==='Services'?'orange':'blue',pt)}</td>
          <td class="text-center font-bold">${gst}%</td>
          <td class="text-right">${igst}%</td>
          <td class="text-right">${cgst}%</td>
          <td class="text-right">${sgst}%</td>
          <td class="text-center">${tag(isSvc?'orange':'gray',isSvc?'Yes':'No')}</td>
          <td class="actions-cell"><button class="btn btn-edit btn-icon btn-sm" onclick="event.stopPropagation()"><i class="bi bi-pencil"></i></button><button class="btn btn-delete btn-icon btn-sm" onclick="event.stopPropagation()"><i class="bi bi-trash"></i></button></td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>
</div>
<div class="modal-overlay hidden" id="modal-m-hsn">
  <div class="modal modal-md">
    <div class="modal-header"><div class="modal-icon"><i class="bi bi-tag"></i></div>
      <div><div class="modal-title">Add / Edit HSN Code</div></div>
      <button class="modal-close" onclick="closeModal('modal-m-hsn')"><i class="bi bi-x"></i></button>
    </div>
    <div class="modal-body">
      ${fi('HSN Description','text',true,'e.g. Playing Card Decks')}
      <div class="form-row cols-2">
        ${fi('HSN Code','text',true,'e.g. 48191000')}
        ${fs('Product Type',['Goods','Services'],'true')}
      </div>
      ${fi('GST %','number',true,'e.g. 12 — auto-fills IGST/CGST/SGST below')}
      <div class="form-row cols-3">
        ${fi('IGST %','number',false,'auto-fill')}
        ${fi('CGST %','number',false,'auto-fill')}
        ${fi('SGST %','number',false,'auto-fill')}
      </div>
      <div style="margin-top:6px">${fchk('Is Service HSN')}</div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal('modal-m-hsn')">Cancel</button>
      <button class="btn btn-save"><i class="bi bi-check-lg"></i> Save HSN</button>
    </div>
  </div>
</div>`);

  // ─── UNIT MASTER ─────────────────────────────────────────────────────
  ca.insertAdjacentHTML('beforeend', `
<div class="page" id="page-m-unit">
  <div class="page-header">
    <div><div class="page-title">Unit of Measure</div><div class="page-subtitle">Unit definitions — symbol, type, conversion value and decimal places</div></div>
    <div class="page-actions">
      <button class="btn btn-create" onclick="openModal('modal-m-unit')"><i class="bi bi-plus"></i> Add Unit</button>
    </div>
  </div>
  <div class="grid-wrap">
    <table class="data-table">
      <thead><tr><th>Unit Name</th><th>Unit Symbol</th><th>Type</th><th>Conversion Value</th><th>Decimal Place</th><th></th></tr></thead>
      <tbody>
        ${[['Sheet','SHT','Simple','1','0'],['Kilogram','KG','Simple','1','3'],['Metric Ton','MT','Compound','1000','3'],['Square Meter','SqM','Simple','1','4'],['Number / Piece','PCS','Simple','1','0'],['Job','JOB','Simple','1','0'],['Litre','LTR','Simple','1','3'],['Deck','Deck','Simple','1','0']].map(([n,sym,t,cv,dp])=>`
        <tr onclick="openModal('modal-m-unit')">
          <td><b>${n}</b></td>
          <td><span style="font-family:monospace;font-weight:700;color:var(--primary)">${sym}</span></td>
          <td>${tag(t==='Simple'?'blue':'orange',t)}</td>
          <td class="text-right">${cv}</td>
          <td class="text-center">${dp}</td>
          <td class="actions-cell"><button class="btn btn-edit btn-icon btn-sm" onclick="event.stopPropagation()"><i class="bi bi-pencil"></i></button><button class="btn btn-delete btn-icon btn-sm" onclick="event.stopPropagation()"><i class="bi bi-trash"></i></button></td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>
</div>
<div class="modal-overlay hidden" id="modal-m-unit">
  <div class="modal modal-sm">
    <div class="modal-header"><div class="modal-icon"><i class="bi bi-rulers"></i></div>
      <div><div class="modal-title">Add / Edit Unit</div></div>
      <button class="modal-close" onclick="closeModal('modal-m-unit')"><i class="bi bi-x"></i></button>
    </div>
    <div class="modal-body">
      <div class="form-row cols-2">
        ${fi('Unit Name','text',true,'e.g. Kilogram')}
        ${fi('Unit Symbol','text',true,'e.g. KG')}
      </div>
      <div class="form-row cols-2">
        ${fs('Type',['Simple','Compound'],'true')}
        ${fi('Conversion Value','number',false,'e.g. 1000')}
      </div>
      ${fi('Decimal Place','number',false,'e.g. 3')}
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal('modal-m-unit')">Cancel</button>
      <button class="btn btn-save"><i class="bi bi-check-lg"></i> Save Unit</button>
    </div>
  </div>
</div>`);

  // ─── MATERIAL GROUP MASTER ───────────────────────────────────────────
  ca.insertAdjacentHTML('beforeend', `
<div class="page" id="page-m-material-group">
  <div class="page-header">
    <div><div class="page-title">Material Group Master</div><div class="page-subtitle">Item groups with display name and parent group hierarchy</div></div>
    <div class="page-actions">
      <button class="btn btn-create" onclick="openModal('modal-m-material-group')"><i class="bi bi-plus"></i> Add Group</button>
    </div>
  </div>
  <div class="grid-wrap">
    <table class="data-table">
      <thead><tr><th>Group Name</th><th>Display Name</th><th>Under Group</th><th></th></tr></thead>
      <tbody>
        ${[['Ink/Coating & Board','Ink/Coating','—'],['Cardstock / Liner','Cardstock','Ink/Coating & Board'],['Playing Card Board','Board','Ink/Coating & Board'],['Ink & Chemicals','Ink','—'],['Printing Plates','Plates','Ink & Chemicals'],['Cellophane Rolls','Wires','—'],['Packing Material','Packing','—'],['Spares & Consumables','Spares','—']].map(([n,dn,ug])=>`
        <tr onclick="openModal('modal-m-material-group')">
          <td><b>${n}</b></td>
          <td style="font-size:11px;color:var(--primary)">${dn}</td>
          <td class="muted" style="font-size:11px">${ug}</td>
          <td class="actions-cell"><button class="btn btn-edit btn-icon btn-sm" onclick="event.stopPropagation()"><i class="bi bi-pencil"></i></button><button class="btn btn-delete btn-icon btn-sm" onclick="event.stopPropagation()"><i class="bi bi-trash"></i></button></td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>
</div>
<div class="modal-overlay hidden" id="modal-m-material-group">
  <div class="modal modal-sm">
    <div class="modal-header"><div class="modal-icon"><i class="bi bi-layers"></i></div>
      <div><div class="modal-title">Add / Edit Material Group</div></div>
      <button class="modal-close" onclick="closeModal('modal-m-material-group')"><i class="bi bi-x"></i></button>
    </div>
    <div class="modal-body">
      ${fi('Group Name','text',true,'e.g. Ink/Coating & Board')}
      ${fi('Display Name',false,false,'e.g. Ink/Coating')}
      ${fs('Under Group',['— None (Top Level) —','Ink/Coating & Board','Ink & Chemicals','Packing Material','Spares & Consumables'])}
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal('modal-m-material-group')">Cancel</button>
      <button class="btn btn-save"><i class="bi bi-check-lg"></i> Save Group</button>
    </div>
  </div>
</div>`);

  // ─── ITEM MASTER ─────────────────────────────────────────────────────
  ca.insertAdjacentHTML('beforeend', `
<div class="page" id="page-m-item">
  <div class="page-header">
    <div><div class="page-title">Item Master</div><div class="page-subtitle">All inventory items — code, group, category, unit, HSN, tax and reorder levels</div></div>
    <div class="page-actions">
      <button class="btn btn-secondary btn-sm" onclick="showToast('Item list exported')"><i class="bi bi-download"></i> Export</button>
      <button class="btn btn-create" onclick="openModal('modal-m-item')"><i class="bi bi-plus"></i> Add Item</button>
    </div>
  </div>

  <div class="kpi-grid" style="grid-template-columns:repeat(4,1fr)">
    <div class="kpi-card" style="--kpi-color:#3b82f6;--kpi-icon-bg:#eff6ff"><div class="kpi-icon"><i class="bi bi-Decks"></i></div><div class="kpi-value">248</div><div class="kpi-label">Total Items</div></div>
    <div class="kpi-card" style="--kpi-color:#22c55e;--kpi-icon-bg:#f0fdf4"><div class="kpi-icon"><i class="bi bi-check-circle"></i></div><div class="kpi-value">231</div><div class="kpi-label">Active Items</div></div>
    <div class="kpi-card" style="--kpi-color:#f59e0b;--kpi-icon-bg:#fffbeb"><div class="kpi-icon"><i class="bi bi-exclamation-triangle"></i></div><div class="kpi-value">12</div><div class="kpi-label">Below Reorder</div></div>
    <div class="kpi-card" style="--kpi-color:#8b5cf6;--kpi-icon-bg:#f5f3ff"><div class="kpi-icon"><i class="bi bi-diagram-3"></i></div><div class="kpi-value">8</div><div class="kpi-label">Item Groups</div></div>
  </div>

  <div class="toolbar">
    <div class="toolbar-left">
      <div class="seg-tabs">
        <div class="seg-tab active">All</div>
        <div class="seg-tab">Raw Material</div>
        <div class="seg-tab">Consumables</div>
        <div class="seg-tab">Finished Goods</div>
      </div>
      <div class="search-input-wrap"><i class="bi bi-search"></i><input class="search-input" placeholder="Search item code, name..." /></div>
    </div>
  </div>

  <div class="grid-wrap">
    <table class="data-table">
      <thead>
        <tr><th>Item Code</th><th>Item Name</th><th>Group</th><th>Category</th><th>Unit</th><th>HSN</th><th>GST %</th><th class="text-right">Reorder Level</th><th>Status</th><th></th></tr>
      </thead>
      <tbody>
        ${[
          ['ITM-0012','Art Paper Liner 150 GSM','Cardstock / Liner','Raw Material','Kg','48041100','12','600 Kg','Active','green'],
          ['ITM-0018','Fluting Medium 120 GSM','Cardstock / Liner','Raw Material','Kg','48051100','12','500 Kg','Low','orange'],
          ['ITM-0024','White Top Liner 300 GSM','Cardstock / Liner','Raw Material','Kg','48041900','12','400 Kg','Active','green'],
          ['ITM-0031','Duplex Board 300 GSM','Ink/Coating & Board','Raw Material','Sheet','48025500','12','300 Sht','Active','green'],
          ['ITM-0045','SC-1 Cardstock A-Grade','Cardstock / Liner','Raw Material','Kg','48041100','12','600 Kg','Low','orange'],
          ['ITM-0052','Gum / Adhesive (Starch)','Ink & Chemicals','Consumable','Kg','35051000','18','200 Kg','Active','green'],
          ['ITM-0063','Flexo Ink — Black','Ink & Chemicals','Consumable','Ltr','32151900','18','50 Ltr','Active','green'],
          ['ITM-0071','Cellophane Roll 22G','Cellophane Rolls','Consumable','Kg','72172010','18','80 Kg','Below','red'],
          ['ITM-0088','Printing Plate — Photopolymer','Printing Plates','Consumable','Nos','37130000','18','15 Nos','Active','green'],
          ['ITM-0094','Poker Size 7-GSM Export','Playing Card Board','Finished Good','Nos','48191010','12','—','Active','green'],
        ].map(([code,name,grp,cat,unit,hsn,gst,reorder,st,sc])=>`
        <tr onclick="openModal('modal-m-item')">
          <td><b>${code}</b></td>
          <td>${name}</td>
          <td style="font-size:11px;color:var(--primary)">${grp}</td>
          <td class="muted" style="font-size:11px">${cat}</td>
          <td>${unit}</td>
          <td style="font-size:11px">${hsn}</td>
          <td class="text-right">${gst}%</td>
          <td class="text-right" style="font-size:11px">${reorder}</td>
          <td>${tag(sc,st)}</td>
          <td class="actions-cell"><button class="btn btn-edit btn-icon btn-sm" onclick="event.stopPropagation()"><i class="bi bi-pencil"></i></button><button class="btn btn-delete btn-icon btn-sm" onclick="event.stopPropagation()"><i class="bi bi-trash"></i></button></td>
        </tr>`).join('')}
      </tbody>
    </table>
    <div class="grid-footer"><span>Showing 10 of 248 items</span></div>
  </div>
</div>
<div class="modal-overlay hidden" id="modal-m-item">
  <div class="modal modal-md">
    <div class="modal-header"><div class="modal-icon" style="background:#eff6ff;color:#2563eb"><i class="bi bi-Decks"></i></div>
      <div><div class="modal-title">Add / Edit Item</div><div class="modal-sub">Master record for an inventory item</div></div>
      <button class="modal-close" onclick="closeModal('modal-m-item')"><i class="bi bi-x"></i></button>
    </div>
    <div class="modal-body">
      <div class="form-grid" style="grid-template-columns:1fr 1fr;gap:12px">
        ${fi('Item Code','text',true,'e.g. ITM-0012')}
        ${fi('Item Name','text',true,'e.g. Art Paper Liner 150 GSM')}
        ${fs('Item Group',['Cardstock / Liner','Ink/Coating & Board','Playing Card Board','Ink & Chemicals','Printing Plates','Cellophane Rolls','Packing Material','Spares & Consumables'],true)}
        ${fs('Category',['Raw Material','Consumable','Finished Good','Semi-Finished'],true)}
        ${fs('Unit of Measure',['Kg','Sheet','Nos','Ltr','Meter','Deck'],true)}
        ${fi('HSN Code','text',false,'e.g. 48041100')}
        ${fi('GST %','number',false,'e.g. 12')}
        ${fi('Reorder Level','text',false,'e.g. 600 Kg')}
      </div>
      <div class="divider"></div>
      <div style="display:flex;gap:20px">
        ${fchk('Active')}
        ${fchk('Track Batch')}
        ${fchk('Maintain Floor Stock')}
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal('modal-m-item')">Cancel</button>
      <button class="btn btn-save"><i class="bi bi-check-lg"></i> Save Item</button>
    </div>
  </div>
</div>`);

  // ─── MILL MASTER ─────────────────────────────────────────────────────
  ca.insertAdjacentHTML('beforeend', `
<div class="page" id="page-m-mill">
  <div class="page-header">
    <div><div class="page-title">Mill Master</div><div class="page-subtitle">Ink/Coating mills / manufacturers</div></div>
    <div class="page-actions">
      <button class="btn btn-create" onclick="openModal('modal-m-mill')"><i class="bi bi-plus"></i> Add Mill</button>
    </div>
  </div>
  <div class="grid-wrap">
    <table class="data-table">
      <thead><tr><th>Mill Name</th><th></th></tr></thead>
      <tbody>
        ${['BILT (Ballarpur Industries)','JK Ink/Coating Ltd','Star Ink/Coating Mills','Sirpur Ink/Coating Mills','Satia Industries','Tamil Nadu Newsprint','West Coast Ink/Coating','Seshasayee Ink/Coating'].map(m=>`
        <tr onclick="openModal('modal-m-mill')">
          <td><b>${m}</b></td>
          <td class="actions-cell"><button class="btn btn-edit btn-icon btn-sm" onclick="event.stopPropagation()"><i class="bi bi-pencil"></i></button><button class="btn btn-delete btn-icon btn-sm" onclick="event.stopPropagation()"><i class="bi bi-trash"></i></button></td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>
</div>
<div class="modal-overlay hidden" id="modal-m-mill">
  <div class="modal modal-sm">
    <div class="modal-header"><div class="modal-icon"><i class="bi bi-bank"></i></div>
      <div><div class="modal-title">Add / Edit Mill</div></div>
      <button class="modal-close" onclick="closeModal('modal-m-mill')"><i class="bi bi-x"></i></button>
    </div>
    <div class="modal-body">
      ${fi('Mill Name','text',true,'e.g. BILT — Ballarpur Industries')}
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal('modal-m-mill')">Cancel</button>
      <button class="btn btn-save"><i class="bi bi-check-lg"></i> Save</button>
    </div>
  </div>
</div>`);

  // ─── WAREHOUSE MASTER ─────────────────────────────────────────────────
  ca.insertAdjacentHTML('beforeend', `
<div class="page" id="page-m-warehouse">
  <div class="page-header">
    <div><div class="page-title">Warehouse / Godown</div><div class="page-subtitle">Storage locations — code, ref code, contact, city, address and bins</div></div>
    <div class="page-actions">
      <button class="btn btn-create" onclick="openModal('modal-m-warehouse')"><i class="bi bi-plus"></i> Add Warehouse</button>
    </div>
  </div>
  <div class="grid-wrap">
    <table class="data-table">
      <thead><tr><th>Code</th><th>Warehouse Name</th><th>Ref Code</th><th>Contact No</th><th>City</th><th>Address</th><th>Bins</th><th></th></tr></thead>
      <tbody>
        ${[['WH-01','Main Godown','MAIN-GD','98765 43210','Ahmedabad','Plot No 12, GIDC Estate','A1, A2, A3, B1, B2'],
           ['WH-02','Cardstock Store','Cardstock-STR','98765 43211','Ahmedabad','GIDC Phase-2','R1, R2, R3'],
           ['WH-03','Finished Goods Store','FG-STR','98765 43212','Ahmedabad','Near Main Gate','FG1, FG2'],
        ].map(([cd,nm,rc,ct,cy,addr,bins])=>`
        <tr onclick="openModal('modal-m-warehouse')">
          <td><b>${cd}</b></td><td>${nm}</td>
          <td style="font-family:monospace;font-size:11px">${rc}</td>
          <td style="font-size:11px">${ct}</td>
          <td style="font-size:11px">${cy}</td>
          <td class="muted" style="font-size:11px">${addr}</td>
          <td style="font-size:11px">${bins.split(', ').map(b=>`<span class="tag tag-blue" style="font-size:10px;margin:1px">${b}</span>`).join('')}</td>
          <td class="actions-cell"><button class="btn btn-edit btn-icon btn-sm" onclick="event.stopPropagation()"><i class="bi bi-pencil"></i></button><button class="btn btn-delete btn-icon btn-sm" onclick="event.stopPropagation()"><i class="bi bi-trash"></i></button></td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>
</div>
<div class="modal-overlay hidden" id="modal-m-warehouse">
  <div class="modal modal-md">
    <div class="modal-header"><div class="modal-icon"><i class="bi bi-building-fill"></i></div>
      <div><div class="modal-title">Add / Edit Warehouse</div></div>
      <button class="modal-close" onclick="closeModal('modal-m-warehouse')"><i class="bi bi-x"></i></button>
    </div>
    <div class="modal-body">
      <div class="form-row cols-2">
        <div class="field-group"><label class="field-label">Warehouse Code <span style="font-size:10px;color:var(--muted)">(auto)</span></label><input class="form-input" value="WH-04" readonly style="background:var(--bg-subtle)" /></div>
        ${fi('Warehouse Name','text',true)}
      </div>
      <div class="form-row cols-2">
        ${fi('Ref Code',false,false,'e.g. MAIN-GD')}
        ${fi('Contact No',false,false,'Phone number')}
      </div>
      <div class="form-row cols-2">
        ${fi('City')} ${fi('Address')}
      </div>
      <div class="field-group">
        <label class="field-label">Bins <span style="font-size:10px;color:var(--muted)">— press Enter to add each bin</span></label>
        <div style="border:1px solid var(--border);border-radius:6px;padding:6px;min-height:40px;display:flex;flex-wrap:wrap;gap:4px;align-items:center">
          ${['A1','A2','A3','B1','B2'].map(b=>`<span class="tag tag-blue" style="font-size:11px">${b} <i class="bi bi-x" style="cursor:pointer"></i></span>`).join('')}
          <input style="border:none;outline:none;font-size:12px;min-width:60px;background:transparent" placeholder="Add bin..." />
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal('modal-m-warehouse')">Cancel</button>
      <button class="btn btn-save"><i class="bi bi-check-lg"></i> Save Warehouse</button>
    </div>
  </div>
</div>`);

  // ─── USER MASTER (4-Tab) ─────────────────────────────────────────────
  ca.insertAdjacentHTML('beforeend', `
<div class="page" id="page-m-user">
  <div class="page-header">
    <div><div class="page-title">User Master</div><div class="page-subtitle">System users — profile, permissions, module authorization and email settings</div></div>
    <div class="page-actions">
      <button class="btn btn-create" onclick="openModal('modal-m-user')"><i class="bi bi-plus"></i> Add User</button>
    </div>
  </div>
  <div class="grid-wrap">
    <table class="data-table">
      <thead><tr><th>Name</th><th>User Name</th><th>Email</th><th>Department</th><th>Designation</th><th>Branch</th><th>Two Factor</th><th>Is Active</th><th></th></tr></thead>
      <tbody>
        ${[['Rahul Sharma','rahul.sharma','rahul@Playing Card.com','Admin','System Admin','HQ',true,true],
           ['Priya Mehta','priya.mehta','priya@Playing Card.com','Sales','Sales Executive','HQ',false,true],
           ['Suresh Kumar','suresh.kumar','suresh@Playing Card.com','Production','Production Head','Unit-1',false,true],
           ['Anita Patel','anita.patel','anita@Playing Card.com','Accounts','Accountant','HQ',false,true],
        ].map(([n,un,em,dept,desig,br,tfa,active])=>`
        <tr onclick="openModal('modal-m-user')">
          <td><div style="display:flex;align-items:center;gap:8px">
            <div style="width:28px;height:28px;border-radius:50%;background:var(--primary);color:#fff;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700">${n.split(' ').map(x=>x[0]).join('')}</div>
            <b>${n}</b></div></td>
          <td style="font-family:monospace;font-size:11px">${un}</td>
          <td style="font-size:11px">${em}</td>
          <td style="font-size:11px">${dept}</td>
          <td style="font-size:11px">${desig}</td>
          <td class="muted" style="font-size:11px">${br}</td>
          <td class="text-center">${tag(tfa?'green':'gray',tfa?'ON':'OFF')}</td>
          <td>${tag(active?'green':'red',active?'Active':'Inactive')}</td>
          <td class="actions-cell"><button class="btn btn-edit btn-icon btn-sm" onclick="event.stopPropagation()"><i class="bi bi-pencil"></i></button><button class="btn btn-delete btn-icon btn-sm" onclick="event.stopPropagation()"><i class="bi bi-trash"></i></button></td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>
</div>
<div class="modal-overlay hidden" id="modal-m-user">
  <div class="modal modal-xl">
    <div class="modal-header"><div class="modal-icon"><i class="bi bi-person-lock"></i></div>
      <div><div class="modal-title">Add / Edit User</div><div class="modal-sub">Profile, permissions, module authorization and email config</div></div>
      <button class="modal-close" onclick="closeModal('modal-m-user')"><i class="bi bi-x"></i></button>
    </div>
    <div class="modal-body" style="padding:0">
      <div id="user-tabs" style="display:flex;border-bottom:2px solid var(--border);background:var(--bg-subtle)">
        ${['Profile','Other Details','Authorization','Email Config'].map((t,i)=>`
        <button onclick="document.querySelectorAll('.utab').forEach((el,j)=>el.style.display=j===parseInt(this.dataset.idx)?'block':'none');document.querySelectorAll('#user-tabs button').forEach(b=>{b.style.borderBottom='none';b.style.color='';b.style.fontWeight=''});this.style.borderBottom='2px solid var(--primary)';this.style.color='var(--primary)';this.style.fontWeight='600'"
          data-idx="${i}" style="border:none;background:none;cursor:pointer;padding:10px 18px;font-size:12px;${i===0?'border-bottom:2px solid var(--primary);color:var(--primary);font-weight:600':''}">${t}</button>`).join('')}
      </div>
      <div style="padding:16px">
        <div class="utab">
          <div style="display:flex;gap:20px;align-items:flex-start">
            <div style="text-align:center;min-width:80px">
              <div style="width:76px;height:76px;border-radius:50%;background:var(--primary);color:#fff;display:flex;align-items:center;justify-content:center;font-size:26px;font-weight:700;margin:0 auto 8px">RS</div>
              <button class="btn btn-ghost btn-sm" style="font-size:11px"><i class="bi bi-upload"></i> Photo</button>
            </div>
            <div style="flex:1">
              <div class="form-row cols-2">${fi('Name','text',true)} ${fi('User Name','text',true,'e.g. rahul.sharma')}</div>
              <div class="form-row cols-2">${fi('Email','email',true)} ${fi('Contact No','tel')}</div>
              <div class="form-row cols-2">${fi('Password','password',true)} ${fi('Confirm Password','password',true)}</div>
            </div>
            <div style="text-align:center;min-width:80px">
              <div style="width:76px;height:76px;border:2px dashed var(--border);border-radius:6px;display:flex;align-items:center;justify-content:center;color:var(--muted);font-size:22px;margin:0 auto 8px"><i class="bi bi-pen"></i></div>
              <button class="btn btn-ghost btn-sm" style="font-size:11px"><i class="bi bi-upload"></i> Signature</button>
            </div>
          </div>
        </div>

        <div class="utab" style="display:none">
          <div class="form-row cols-3">
            ${fi('Designation')} ${fs('Department',['Admin','Sales','Production','Accounts','Purchase','Dispatch'])}
            ${fs('Branch',['HQ','Unit-1','Unit-2'],'true')}
          </div>
          <div class="form-row cols-3">
            ${fs('Production Unit',['All','Unit-1','Unit-2'])}
            ${fs('Under User',['— None —','Rahul Sharma (Admin)','Suresh Kumar (Prod Head)'])}
            ${fs('Employee Allocation',['— None —','EMP-001 Ramesh Sharma','EMP-004 Priya Mehta'])}
          </div>
          <div class="form-row cols-3">
            ${fs('Country',['India'])} ${fs('State',['Gujarat','Maharashtra','Tamil Nadu'])} ${fi('City')}
          </div>
          ${fi('Address')}
          <div class="form-section-title" style="margin-top:12px"><i class="bi bi-shield-check"></i> User Permissions</div>
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;font-size:11px">
            ${['Can Delete Quotation','Can Send For SO','Can Edit Rate in SO','Can Issue Extra Material','Can Edit Material in Job Card',
               'Can Delete Voucher','Can Edit Posted Voucher','Can Print Price in Challan','Can Access MRP','Can Override Credit Limit',
               'Can Approve Discount','Can View All Branches','Can Export Reports','Can Delete Dispatch','Can Edit Closed PO',
               'Can Approve PO','Can Edit GST in Invoice','Can Backdate Entry','Can Delete PO','Can Edit Unit in PO',
               'Can View Purchase Rate','Can Edit Estimation','Can Finalize Quotation','Can Reject Sales Order'].map((p,i)=>
              `<label style="display:flex;align-items:center;gap:5px;cursor:pointer"><input type="checkbox" ${i%3===0?'checked':''} /> ${p}</label>`).join('')}
          </div>
          <div class="form-row cols-2" style="margin-top:12px">
            <div class="field-group"><label class="field-label">Division Settings</label>
              <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:4px">
                ${['DIV-001 Playing Card Decks','DIV-003 Printed Decks'].map(d=>`<span class="tag tag-blue" style="font-size:11px">${d} <i class="bi bi-x" style="cursor:pointer"></i></span>`).join('')}
                <button class="btn btn-ghost btn-sm" style="font-size:11px"><i class="bi bi-plus"></i></button>
              </div>
            </div>
            <div class="field-group"><label class="field-label">Two Factor Authentication</label>
              <label style="display:flex;align-items:center;gap:8px;margin-top:10px;font-size:12px"><input type="checkbox" /> Enable 2FA (TOTP Authenticator App)</label></div>
          </div>
        </div>

        <div class="utab" style="display:none">
          <div style="font-size:12px;color:var(--muted);margin-bottom:10px">Configure which modules this user can access and what actions they can perform</div>
          <div style="overflow-x:auto">
            <table class="line-table">
              <thead><tr><th>Module</th><th>Sub-Module</th><th style="text-align:center">View</th><th style="text-align:center">Save</th><th style="text-align:center">Edit</th><th style="text-align:center">Delete</th><th style="text-align:center">Export</th><th style="text-align:center">Print</th></tr></thead>
              <tbody>
                ${[['Sales','Enquiry',1,1,1,0,1,1],['Sales','Quotation',1,1,1,0,1,1],['Sales','Sales Order',1,1,1,0,1,1],
                   ['Production','Job Card',1,1,1,0,0,1],['Production','PPC',1,1,0,0,1,0],
                   ['Inventory','Cardstock PO',1,1,1,0,1,1],['Inventory','Cardstock GRN',1,1,0,0,0,1],['Inventory','Ink/Coating PO',1,1,1,0,1,1],
                   ['Masters','Machine',1,1,1,1,1,0],['Masters','Process',1,1,1,1,0,0],['Masters','User',1,1,1,0,0,0],
                   ['Accounts','Voucher',1,1,1,0,1,1]].map(([mod,sub,...flags])=>`
                <tr>
                  <td style="font-size:11px">${mod}</td>
                  <td style="font-size:11px;font-weight:600">${sub}</td>
                  ${flags.map(v=>`<td style="text-align:center"><input type="checkbox" ${v?'checked':''} /></td>`).join('')}
                </tr>`).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <div class="utab" style="display:none">
          ${fs('Email Provider',['Microsoft Graph (OAuth)','SMTP (Gmail)','SMTP (Custom)','Outlook / IMAP'])}
          <div class="form-row cols-2">
            ${fi('SMTP Host / Tenant ID',false,false,'e.g. smtp.gmail.com')}
            ${fi('Port / Client ID',false,false,'e.g. 587')}
          </div>
          <div class="form-row cols-2">
            ${fi('Email (From)','email',false,'sender@Playing Card.com')}
            ${fi('App Password / Secret','password')}
          </div>
          <div class="form-section-title" style="margin-top:10px"><i class="bi bi-envelope-Ink/Coating"></i> Email Templates</div>
          ${['Quotation','Sales Order Confirmation','Purchase Order','Delivery Challan','Tax Invoice'].map(t=>`
          <div style="display:flex;align-items:center;justify-content:space-between;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:12px;margin-bottom:5px">
            <span><i class="bi bi-envelope" style="margin-right:6px;color:var(--primary)"></i>${t}</span>
            <button class="btn btn-ghost btn-sm" style="font-size:11px"><i class="bi bi-pencil"></i> Edit Template</button>
          </div>`).join('')}
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal('modal-m-user')">Cancel</button>
      <button class="btn btn-save"><i class="bi bi-check-lg"></i> Save User</button>
    </div>
  </div>
</div>`);
});
