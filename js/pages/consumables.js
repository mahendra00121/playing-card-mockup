document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('contentArea').insertAdjacentHTML('beforeend', `
<div class="page" id="page-consumables">
  <div class="page-header">
    <div><div class="page-title">Consumables & Fitments</div><div class="page-subtitle">Track inks, plates, honeycomb, partition, adhesives and other consumables</div></div>
    <div class="page-actions">
      <button class="btn btn-secondary btn-sm"><i class="bi bi-download"></i> Export</button>
      <button class="btn btn-create" onclick="openModal('modal-cons-new')"><i class="bi bi-plus"></i> Add Stock</button>
    </div>
  </div>

  <div class="toolbar">
    <div class="toolbar-left">
      <div class="seg-tabs">
        <div class="seg-tab active">All</div>
        <div class="seg-tab">Inks & Chemicals</div>
        <div class="seg-tab">Plates</div>
        <div class="seg-tab">Fitments</div>
        <div class="seg-tab">Adhesives</div>
      </div>
      <div class="search-input-wrap"><i class="bi bi-search"></i><input class="search-input" placeholder="Search item..." /></div>
    </div>
  </div>

  <div class="grid-wrap">
    <table class="data-table">
      <thead>
        <tr>
          <th>Item Code</th>
          <th>Item Name</th>
          <th>Category</th>
          <th>Unit</th>
          <th>Min Stock</th>
          <th>Current Stock</th>
          <th>Last Received</th>
          <th>Avg Consumption/Day</th>
          <th>Days Cover</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${[
          ['INK-001','Cyan Ink — Process','Ink','Kg','20','48','28 Jun',4.2,'11 days','OK'],
          ['INK-002','Magenta Ink — Process','Ink','Kg','20','12','22 Jun',3.8,'3 days','Low'],
          ['INK-003','Yellow Ink — Process','Ink','Kg','20','6','18 Jun',3.5,'2 days','Critical'],
          ['INK-004','Black Ink — Process','Ink','Kg','25','55','26 Jun',5.1,'11 days','OK'],
          ['PLT-001','Photopolymer Plate 3mm','Plate','Nos','10','32','20 Jun',1.2,'27 days','OK'],
          ['PLT-002','Flexo Plate 2.54mm','Plate','Nos','8','5','15 Jun',0.8,'6 days','Low'],
          ['HON-001','Honeycomb Board 30mm','Fitment','Sheets','500','1,200','25 Jun',80,'15 days','OK'],
          ['HON-002','Honeycomb Board 50mm','Fitment','Sheets','300','180','20 Jun',45,'4 days','Low'],
          ['PAR-001','Partition Sheet 3-GSM','Fitment','Nos','1,000','4,500','27 Jun',350,'13 days','OK'],
          ['ADH-001','White Glue (Star Bond)','Adhesive','Kg','50','280','24 Jun',22,'13 days','OK'],
          ['ADH-002','Starch Powder','Adhesive','Kg','100','85','20 Jun',35,'2 days','Critical'],
          ['MISC-001','Cellophane Roll 0.8mm','Misc','Roll','5','18','22 Jun',0.8,'23 days','OK'],
        ].map(([code,name,cat,unit,min,curr,lastRec,avgCons,cover,status]) => {
          const stColor = status==='Critical'?'red':status==='Low'?'gold':'green';
          const catColor = cat==='Ink'?'cyan':cat==='Plate'?'purple':cat==='Fitment'?'orange':cat==='Adhesive'?'blue':'gray';
          return `<tr>
            <td><b>${code}</b></td>
            <td>${name}</td>
            <td><span class="tag tag-${catColor}">${cat}</span></td>
            <td class="muted">${unit}</td>
            <td class="text-right muted">${min}</td>
            <td class="text-right font-bold" style="${status==='Critical'?'color:#b91c1c':status==='Low'?'color:#92400e':''}">${curr}</td>
            <td class="muted">${lastRec}</td>
            <td class="text-right muted">${avgCons}</td>
            <td class="text-right" style="${status==='Critical'?'color:#b91c1c;font-weight:700':status==='Low'?'color:#92400e;font-weight:600':''}">${cover}</td>
            <td><span class="tag tag-${stColor}">${status}</span></td>
            <td class="actions-cell">
              <button class="btn btn-create btn-sm" onclick="openModal('modal-cons-new')"><i class="bi bi-plus"></i> Reorder</button>
              <button class="btn btn-ghost btn-icon btn-sm"><i class="bi bi-eye"></i></button>
            </td>
          </tr>`;
        }).join('')}
      </tbody>
    </table>
    <div class="grid-footer">
      <span>12 items &nbsp;|&nbsp; <span style="color:var(--color-error-text);font-weight:600">2 Critical</span> &nbsp;|&nbsp; <span style="color:var(--color-warning-text);font-weight:600">3 Low Stock</span></span>
    </div>
  </div>
</div>

<!-- Add/Reorder Consumable Modal -->
<div class="modal-overlay hidden" id="modal-cons-new">
  <div class="modal modal-md">
    <div class="modal-header">
      <div class="modal-icon" style="background:#fff7ed;color:#c2410c"><i class="bi bi-droplet-fill"></i></div>
      <div><div class="modal-title">Add / Reorder Consumable</div><div class="modal-sub">Record incoming stock or raise purchase request</div></div>
      <button class="modal-close" onclick="closeModal('modal-cons-new')"><i class="bi bi-x"></i></button>
    </div>
    <div class="modal-body">
      <div class="form-row cols-2">
        <div class="field-group"><label class="field-label required">Item</label><select class="form-select"><option>Yellow Ink — Process</option><option>Starch Powder</option><option>Magenta Ink</option></select></div>
        <div class="field-group"><label class="field-label required">Category</label><select class="form-select"><option>Ink</option><option>Plate</option><option>Fitment</option><option>Adhesive</option><option>Misc</option></select></div>
      </div>
      <div class="form-row cols-3">
        <div class="field-group"><label class="field-label required">Quantity</label><input class="form-input" type="number" placeholder="Enter qty" /></div>
        <div class="field-group"><label class="field-label">Unit</label><select class="form-select"><option>Kg</option><option>Nos</option><option>Sheets</option><option>Roll</option></select></div>
        <div class="field-group"><label class="field-label">Date</label><input class="form-input" type="date" value="2026-06-30" /></div>
      </div>
      <div class="form-row cols-2">
        <div class="field-group"><label class="field-label">Vendor</label><select class="form-select"><option>— Select Vendor —</option><option>Sun Chemical</option><option>Flint Group</option><option>Excel Chemicals</option></select></div>
        <div class="field-group"><label class="field-label">Rate (₹/unit)</label><input class="form-input" type="number" placeholder="0.00" /></div>
      </div>
      <div class="field-group"><label class="field-label">Remarks</label><textarea class="form-textarea" style="min-height:50px" placeholder="Notes..."></textarea></div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal('modal-cons-new')">Cancel</button>
      <button class="btn btn-secondary"><i class="bi bi-receipt"></i> Raise PR</button>
      <button class="btn btn-save"><i class="bi bi-check-lg"></i> Add Stock</button>
    </div>
  </div>
</div>
`);
});
