document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('contentArea').insertAdjacentHTML('beforeend', `
<div class="page" id="page-purchase-req">
  <div class="page-header">
    <div><div class="page-title">Purchase Requisition</div><div class="page-subtitle">Indent to Requisition to PO — 5-state approval workflow</div></div>
    <div class="page-actions">
      <button class="btn btn-secondary btn-sm"><i class="bi bi-download"></i> Export</button>
      <button class="btn btn-create" onclick="openModal('modal-pr-new')"><i class="bi bi-plus"></i> New Requisition</button>
    </div>
  </div>

  <!-- Status KPI strip -->
  <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin-bottom:16px">
    ${[['Draft','8','#9ca3af'],['Submitted','12','#3b82f6'],['Pending Approval','5','#f59e0b'],['Approved','6','#22c55e'],['Cancelled','3','#ef4444']].map(([s,n,c]) => `
    <div style="background:#fff;border:1px solid var(--bd-default);border-radius:8px;padding:12px 14px;Deck-shadow:var(--shadow-sm);text-align:center;border-top:3px solid ${c}">
      <div style="font-size:22px;font-weight:800;color:${c}">${n}</div>
      <div style="font-size:12px;color:var(--fg-muted);font-weight:500">${s}</div>
    </div>`).join('')}
  </div>

  <div class="toolbar">
    <div class="toolbar-left">
      <div class="seg-tabs">
        <div class="seg-tab">Indent List</div>
        <div class="seg-tab active">Created Requisitions</div>
      </div>
      <div class="search-input-wrap"><i class="bi bi-search"></i><input class="search-input" placeholder="PR no, item, job..." /></div>
      <select class="form-select" style="width:130px;padding:5px 8px"><option>All Groups</option><option>Ink/Coating / Board</option><option>Cardstock / Liner</option><option>Ink & Chemicals</option><option>Consumables</option></select>
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
          <th>PR No</th><th>Date</th><th>Requested By</th><th>Item Code</th><th>Item Name</th>
          <th>Group</th><th>Quality</th><th>GSM</th><th>Size</th>
          <th>Req Qty</th><th>Stock (Booked)</th><th>Stock (Free)</th>
          <th>Required By</th><th>Job Ref</th><th>Priority</th><th>Status</th><th></th>
        </tr>
      </thead>
      <tbody>
        ${[
          ['PR-2026-0089','28 Jun','Ramesh S.','KR-150-1200','Art Paper Liner 150 GSM','Ink/Coating / Board','Art Paper','150','1200mm','5,000 kg','800 kg','120 kg','30 Jun','JC-2026-082','High','Submitted'],
          ['PR-2026-0088','27 Jun','Arun T.','INK-YEL-01','Yellow Ink — Process','Ink & Chem','Process','—','—','20 kg','5 kg','2 kg','2 Jul','—','High','Approved'],
          ['PR-2026-0087','26 Jun','Store Mgr','HC-50MM-01','Honeycomb 50mm','Consumables','—','—','500mm W','1,200 nos','400 nos','80 nos','5 Jul','JC-2026-080','Medium','PO Created'],
          ['PR-2026-0086','25 Jun','Ramesh S.','TL-160-1350','Test Liner 160 GSM','Ink/Coating / Board','Test','160','1350mm','3,000 kg','200 kg','50 kg','28 Jun','JC-2026-081','Medium','Cancelled'],
          ['PR-2026-0085','24 Jun','Vijay K.','SW-24G-01','Cellophane Roll 24G','Consumables','—','—','—','10 kg','2 kg','0.5 kg','3 Jul','—','Low','Draft'],
          ['PR-2026-0084','22 Jun','Arun T.','PLATE-254','Flexo Plate 2.54mm','Consumables','—','—','—','12 nos','—','—','30 Jun','JC-2026-079','High','Pending Approval'],
        ].map(([pr,dt,by,icode,iname,grp,qual,gsm,size,rq,bk,fr,req,jref,pri,status]) => {
          const stMap={'Draft':'gray','Submitted':'blue','Pending Approval':'gold','Approved':'green','PO Created':'purple','Cancelled':'red'};
          const priMap={'High':'red','Medium':'orange','Low':'gray'};
          return `<tr onclick="openModal('modal-pr-detail')">
            <td><b>${pr}</b></td><td class="muted">${dt}</td><td>${by}</td>
            <td style="font-size:11px;font-family:monospace">${icode}</td>
            <td style="font-size:12px">${iname}</td>
            <td><span class="tag tag-navy" style="font-size:10px">${grp}</span></td>
            <td class="muted" style="font-size:11px">${qual}</td>
            <td class="text-center muted" style="font-size:11px">${gsm}</td>
            <td class="muted" style="font-size:11px">${size}</td>
            <td class="text-right font-bold">${rq}</td>
            <td class="text-right muted" style="font-size:11px">${bk}</td>
            <td class="text-right" style="font-size:11px;color:${fr==='0.5 kg'||fr==='0 kg'?'var(--color-error-text)':'inherit'}">${fr}</td>
            <td class="muted">${req}</td>
            <td style="font-size:11px">${jref}</td>
            <td><span class="tag tag-${priMap[pri]}" style="font-size:10px">${pri}</span></td>
            <td><span class="tag tag-${stMap[status]}" style="font-size:10px">${status}</span></td>
            <td class="actions-cell">
              <button class="btn btn-ghost btn-icon btn-sm" onclick="event.stopPropagation();openModal('modal-pr-detail')"><i class="bi bi-eye"></i></button>
              <button class="btn btn-edit btn-icon btn-sm" onclick="event.stopPropagation();openModal('modal-pr-new')"><i class="bi bi-pencil"></i></button>
              <button class="btn btn-print btn-icon btn-sm"><i class="bi bi-printer"></i></button>
              ${status==='Submitted'||status==='Pending Approval'?`<button class="btn btn-save btn-sm" onclick="event.stopPropagation()">Approve</button>`:''}
            </td>
          </tr>`;
        }).join('')}
      </tbody>
    </table>
    <div class="grid-footer"><span>Showing 6 of 89 requisitions</span>
      <div class="pagination"><button class="page-btn active">1</button><button class="page-btn">2</button><button class="page-btn">…</button></div>
    </div>
  </div>
</div>

<!-- ── New PR Modal ── -->
<div class="modal-overlay hidden" id="modal-pr-new">
  <div class="modal modal-lg">
    <div class="modal-header">
      <div class="modal-icon"><i class="bi bi-receipt"></i></div>
      <div><div class="modal-title">New Purchase Requisition</div><div class="modal-sub">Manual or from job card indent</div></div>
      <button class="modal-close" onclick="closeModal('modal-pr-new')"><i class="bi bi-x"></i></button>
    </div>
    <div class="modal-body">
      <div class="form-row cols-3">
        <div class="field-group"><label class="field-label">Voucher No</label><input class="form-input" value="PR-2026-0090" readonly style="background:var(--bg-subtle)" /></div>
        <div class="field-group"><label class="field-label required">Date</label><input class="form-input" type="date" value="2026-06-30" /></div>
        <div class="field-group"><label class="field-label">Narration</label><input class="form-input" placeholder="Purpose / narration..." /></div>
      </div>
      <div class="form-section-title"><i class="bi bi-list-ul"></i> Item Lines</div>
      <table class="line-table">
        <thead>
          <tr><th>#</th><th>Item Code</th><th>Item Name</th><th>Group</th><th>Quality</th><th>GSM</th><th>Size W</th><th>Size L</th><th>Booked Stk</th><th>Alloc Stk</th><th>Phys Stk</th><th>Req Qty</th><th>Stock Unit</th><th>Order Unit</th><th>Qty/Pack</th><th>No. Packs</th><th>Exp. Del.</th><th>Job Ref</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td style="font-size:11px">KR-150-1200</td>
            <td><select class="form-select" style="font-size:11px;padding:3px 5px;min-width:130px"><option>Art Paper Liner 150 GSM</option></select></td>
            <td style="font-size:11px">Ink/Coating / Board</td>
            <td><input class="form-input" value="Art Paper" style="width:55px;padding:3px 5px;font-size:11px" /></td>
            <td><input class="form-input" value="150" style="width:45px;padding:3px 5px;font-size:11px" /></td>
            <td><input class="form-input" value="1200" style="width:50px;padding:3px 5px;font-size:11px" /></td>
            <td><input class="form-input" value="—" style="width:45px;padding:3px 5px;font-size:11px" /></td>
            <td class="muted text-right" style="font-size:11px">800</td>
            <td class="muted text-right" style="font-size:11px">200</td>
            <td class="muted text-right" style="font-size:11px;color:var(--color-error-text);font-weight:600">120</td>
            <td><input class="form-input" type="number" value="5000" style="width:65px;padding:3px 5px;font-size:11px" /></td>
            <td><select class="form-select" style="font-size:11px;padding:3px 5px;width:55px"><option>KG</option></select></td>
            <td><select class="form-select" style="font-size:11px;padding:3px 5px;width:55px"><option>KG</option></select></td>
            <td><input class="form-input" value="50" style="width:40px;padding:3px 5px;font-size:11px" /></td>
            <td><input class="form-input" value="100" style="width:45px;padding:3px 5px;font-size:11px" /></td>
            <td><input class="form-input" type="date" value="2026-07-05" style="padding:3px 5px;font-size:11px;width:110px" /></td>
            <td style="font-size:11px">JC-2026-082</td>
          </tr>
          <tr><td colspan="18" style="text-align:center;padding:8px"><button class="btn btn-ghost btn-sm"><i class="bi bi-plus"></i> Add Item</button></td></tr>
        </tbody>
      </table>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal('modal-pr-new')">Cancel</button>
      <button class="btn btn-secondary"><i class="bi bi-floppy"></i> Save Draft</button>
      <button class="btn btn-save"><i class="bi bi-send"></i> Submit for Approval</button>
    </div>
  </div>
</div>

<!-- ── PR Detail Modal ── -->
<div class="modal-overlay hidden" id="modal-pr-detail">
  <div class="modal modal-md">
    <div class="modal-header">
      <div class="modal-icon" style="background:#f0fdf4;color:var(--color-success-text)"><i class="bi bi-receipt-cutoff"></i></div>
      <div><div class="modal-title">PR-2026-0088</div><div class="modal-sub">Arun T. — Ink & Chemicals | Approved</div></div>
      <button class="modal-close" onclick="closeModal('modal-pr-detail')"><i class="bi bi-x"></i></button>
    </div>
    <div class="modal-body">
      <div class="workflow-steps">
        <div class="wf-step done"><div class="wf-step-circle"><i class="bi bi-check"></i></div><div class="wf-step-label">Draft</div></div>
        <div class="wf-step done"><div class="wf-step-circle"><i class="bi bi-check"></i></div><div class="wf-step-label">Submitted</div></div>
        <div class="wf-step done"><div class="wf-step-circle"><i class="bi bi-check"></i></div><div class="wf-step-label">Pend. Approval</div></div>
        <div class="wf-step active"><div class="wf-step-circle"><i class="bi bi-check"></i></div><div class="wf-step-label">Approved</div></div>
        <div class="wf-step"><div class="wf-step-circle">5</div><div class="wf-step-label">PO Created</div></div>
      </div>
      <table class="line-table" style="margin-top:14px">
        <thead><tr><th>Item Code</th><th>Item Name</th><th>Quality/GSM</th><th>Req Qty</th><th>Stock Unit</th><th>Packs</th><th>Exp. Del.</th><th>Job Ref</th><th>Status</th></tr></thead>
        <tbody>
          <tr><td>INK-YEL-01</td><td>Yellow Ink</td><td>Process / —</td><td>20</td><td>KG</td><td>2</td><td>2 Jul</td><td>—</td><td><span class="tag tag-green" style="font-size:10px">Approved</span></td></tr>
          <tr><td>INK-MAG-01</td><td>Magenta Ink</td><td>Process / —</td><td>20</td><td>KG</td><td>2</td><td>2 Jul</td><td>—</td><td><span class="tag tag-green" style="font-size:10px">Approved</span></td></tr>
          <tr><td>STR-PWD-01</td><td>Starch Powder</td><td>Standard / —</td><td>160</td><td>KG</td><td>8</td><td>2 Jul</td><td>—</td><td><span class="tag tag-green" style="font-size:10px">Approved</span></td></tr>
        </tbody>
      </table>
    </div>
    <div class="modal-footer">
      <div class="modal-footer-left">
        <button class="btn btn-secondary btn-sm" style="color:var(--color-error-text);border-color:var(--color-error-text)"><i class="bi bi-x-circle"></i> Cancel PR</button>
      </div>
      <button class="btn btn-secondary" onclick="closeModal('modal-pr-detail')">Close</button>
      <button class="btn btn-print"><i class="bi bi-printer"></i> Print</button>
      <button class="btn btn-save" onclick="closeModal('modal-pr-detail')"><i class="bi bi-file-earmark-check"></i> Create PO</button>
    </div>
  </div>
</div>
`);
});
