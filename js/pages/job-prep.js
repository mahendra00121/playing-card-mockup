document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('contentArea').insertAdjacentHTML('beforeend', `
<div class="page" id="page-job-prep">
  <div class="page-header">
    <div><div class="page-title">Job Preparation</div><div class="page-subtitle">Import from Product Master — generate Playing Card, offset and top Ink/Coating plans</div></div>
    <div class="page-actions">
      <button class="btn btn-secondary btn-sm"><i class="bi bi-download"></i> Export</button>
      <button class="btn btn-create" onclick="openModal('modal-jp-new')"><i class="bi bi-plus"></i> New Job Preparation</button>
    </div>
  </div>
  <div class="toolbar">
    <div class="toolbar-left">
      <div class="search-input-wrap"><i class="bi bi-search"></i><input class="search-input" placeholder="JP no, PM no, customer, job name..." /></div>
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
          <th>Source PM No</th><th>PM Date</th><th>Customer</th><th>Job Name</th><th>Job Type</th>
          <th>Product Code</th><th>GSM</th><th>Content Type</th><th>Size OD</th>
          <th>Qty</th><th>Total Ups</th><th>Calc Deck Wt (gm)</th><th>Total Wt (kg)</th><th>Created By</th><th></th>
        </tr>
      </thead>
      <tbody>
        ${[
          ['PM-0089','28 Jun','Amul Dairy','Amul Butter Deck 7-GSM','Playing Card','AM-Poker Size-7-001','7','Poker Size','500×350×300mm','1,00,000','2','182.3','18,230','Hariom I.'],
          ['PM-0088','27 Jun','ITC Ltd','Cigarette Inner 3-GSM','Playing Card','ITC-Poker Size-3-022','3','Poker Size','380×280×220mm','5,00,000','4','48.2','24,100','Priya M.'],
          ['PM-0087','26 Jun','Metro Cash','Half Slotted 5-GSM','Playing Card','MC-HSC-5-008','5','Half Slotted','450×350×350mm','25,000','2','183.2','4,580','Hariom I.'],
          ['PM-0086','25 Jun','HUL','Soap Carton 3-GSM','Offset','HUL-Poker Size-3-044','3','Poker Size','300×200×150mm','2,50,000','6','39.0','9,750','Priya M.'],
          ['PM-0085','24 Jun','Patanjali','Ghee Deck 3-GSM','Playing Card','PAT-Poker Size-3-011','3','Poker Size','350×250×250mm','80,000','2','78.0','6,240','Ravi S.'],
        ].map(([pm,dt,cust,job,type,code,GSM,content,sOD,qty,ups,boxwt,twt,by]) => `
        <tr onclick="openModal('modal-jp-new')">
          <td><b>${pm}</b></td><td class="muted">${dt}</td><td>${cust}</td>
          <td style="max-width:150px;font-size:12px">${job}</td>
          <td><span class="tag tag-${type==='Offset'?'purple':'blue'}" style="font-size:10px">${type}</span></td>
          <td style="font-size:11px;font-family:monospace">${code}</td>
          <td style="text-align:center"><span class="tag tag-${GSM==='7'?'purple':GSM==='5'?'blue':'navy'}">${GSM}</span></td>
          <td style="font-size:11px">${content}</td>
          <td class="font-bold" style="font-size:12px">${sOD}</td>
          <td class="text-right">${qty}</td>
          <td class="text-center">${ups}</td>
          <td class="text-right">${boxwt}</td>
          <td class="text-right font-bold">${twt}</td>
          <td class="muted" style="font-size:11px">${by}</td>
          <td class="actions-cell">
            <button class="btn btn-ghost btn-icon btn-sm" onclick="event.stopPropagation();openModal('modal-jp-new')"><i class="bi bi-eye"></i></button>
            <button class="btn btn-edit btn-icon btn-sm" onclick="event.stopPropagation()"><i class="bi bi-pencil"></i></button>
            <button class="btn btn-delete btn-icon btn-sm" onclick="event.stopPropagation()"><i class="bi bi-trash"></i></button>
          </td>
        </tr>`).join('')}
      </tbody>
    </table>
    <div class="grid-footer"><span>Showing 5 of 156 job preparations</span>
      <div class="pagination"><button class="page-btn active">1</button><button class="page-btn">2</button></div>
    </div>
  </div>
</div>

<!-- ── Job Preparation Modal ── -->
<div class="modal-overlay hidden" id="modal-jp-new">
  <div class="modal modal-xl">
    <div class="modal-header">
      <div class="modal-icon"><i class="bi bi-journal-text"></i></div>
      <div><div class="modal-title">Job Preparation — PM-0089</div><div class="modal-sub">Amul Butter Deck Poker Size 7-GSM | Playing Card Plan</div></div>
      <button class="modal-close" onclick="closeModal('modal-jp-new')"><i class="bi bi-x"></i></button>
    </div>
    <div class="modal-body">

      <!-- Source PM -->
      <div class="form-section-title"><i class="bi bi-link-45deg"></i> Source Product Master</div>
      <div style="background:var(--bg-subtle);border:1px solid var(--bd-default);border-radius:8px;padding:12px;display:flex;align-items:center;gap:12px;margin-bottom:14px">
        <div style="flex:1">
          <select class="form-select"><option>PM-0089 — Amul Butter Deck Poker Size 7-GSM (Amul Dairy)</option></select>
        </div>
        <button class="btn btn-secondary btn-sm"><i class="bi bi-arrow-repeat"></i> Import from PM</button>
        <div style="display:flex;gap:16px;font-size:12px;color:var(--fg-muted)">
          <span><b>GSM:</b> 7</span>
          <span><b>Size OD:</b> 500×350×300mm</span>
          <span><b>Content:</b> Poker Size</span>
        </div>
      </div>

      <!-- Job Header -->
      <div class="form-row cols-4">
        <div class="field-group"><label class="field-label required">Job Name</label><input class="form-input" value="Amul Butter Deck 7-GSM" /></div>
        <div class="field-group"><label class="field-label">Job Type</label>
          <select class="form-select"><option>Playing Card</option><option>Offset</option><option>Top Ink/Coating</option></select></div>
        <div class="field-group"><label class="field-label required">Quantity</label><input class="form-input" type="number" value="100000" /></div>
        <div class="field-group"><label class="field-label">Remark</label><input class="form-input" placeholder="Any note..." /></div>
      </div>

      <!-- Layer Table (imported from PM) -->
      <div class="form-section-title" style="margin-top:14px"><i class="bi bi-layers"></i> Layer Details (imported from PM)</div>
      <table class="line-table">
        <thead><tr><th>Sn</th><th>Core</th><th>Cardstock Code</th><th>Finish</th><th>Quality</th><th>GSM</th><th>Finish</th><th>Width (inch)</th><th>Width (mm)</th><th>Calc GSM</th><th>BS</th><th>Wt/Pc (gm)</th><th>Total Wt (kg)</th><th>Rate (₹/kg)</th><th>Wastage %</th><th>Mat Cost/Pc</th></tr></thead>
        <tbody>
          ${[
            ['1','—','KR150-1200','26','Art Paper','150','Plain','47.24','1200','150','25','48.2','4,820','42.00','8%','₹2.14'],
            ['2','C','Smooth120-1200','18','Finish','120','Plain','47.24','1200','152','18','38.5','3,850','38.00','8%','₹1.57'],
            ['3','—','KR150-1200','26','Art Paper','150','Plain','47.24','1200','150','25','36.4','3,640','42.00','8%','₹1.65'],
            ['4','B','Smooth120-1200','18','Finish','120','Plain','47.24','1200','148','18','22.8','2,280','38.00','8%','₹0.94'],
            ['5','—','KR150-1200','26','Art Paper','150','Plain','47.24','1200','150','25','36.4','3,640','42.00','8%','₹1.65'],
          ].map(([sn,fl,code,bf,qual,gsm,fin,wi,wm,cgsm,bs,wt,twt,rate,waste,cost]) => `
          <tr>
            <td class="text-center">${sn}</td>
            <td class="text-center"><span class="tag tag-cyan" style="font-size:10px">${fl}</span></td>
            <td style="font-size:11px">${code}</td>
            <td class="text-center" style="font-size:11px">${bf}</td>
            <td style="font-size:11px">${qual}</td>
            <td class="text-center" style="font-size:11px">${gsm}</td>
            <td class="muted" style="font-size:11px">${fin}</td>
            <td class="text-right muted" style="font-size:11px">${wi}</td>
            <td class="text-right muted" style="font-size:11px">${wm}</td>
            <td class="text-right muted" style="font-size:11px">${cgsm}</td>
            <td class="text-center muted" style="font-size:11px">${bs}</td>
            <td class="text-right" style="font-size:11px;font-weight:600">${wt}</td>
            <td class="text-right font-bold" style="font-size:11px">${twt}</td>
            <td><input class="form-input" value="${rate}" style="width:55px;padding:3px 5px;font-size:11px" /></td>
            <td><input class="form-input" value="${waste}" style="width:45px;padding:3px 5px;font-size:11px" /></td>
            <td class="text-right font-bold" style="font-size:11px;color:var(--primary)">${cost}</td>
          </tr>`).join('')}
        </tbody>
      </table>

      <!-- Operations Table -->
      <div class="form-section-title" style="margin-top:14px"><i class="bi bi-gear"></i> Operations</div>
      <table class="line-table">
        <thead><tr><th>Sn</th><th>Operation</th><th>Rate</th><th>Rate Type</th><th>Amount</th><th>Setup Charges</th><th>Min Charges</th><th>Min Qty Charged</th></tr></thead>
        <tbody>
          <tr><td>1</td><td>Playing Card</td><td>₹650</td><td>Rate/1000</td><td>₹65,000</td><td>₹500</td><td>₹500</td><td>500</td></tr>
          <tr><td>2</td><td>4-Color Printing</td><td>₹950</td><td>Rate/1000</td><td>₹95,000</td><td>₹800</td><td>₹800</td><td>500</td></tr>
          <tr><td>3</td><td>Collation</td><td>₹180</td><td>Rate/1000</td><td>₹18,000</td><td>₹150</td><td>₹150</td><td>1000</td></tr>
        </tbody>
      </table>

      <!-- Playing Card Plan -->
      <div class="form-section-title" style="margin-top:14px"><i class="bi bi-table"></i> Playing Card Plan (Auto-Generated)</div>
      <table class="line-table">
        <thead><tr><th>Sel</th><th>Sn</th><th>Machine</th><th>Deckle (mm)</th><th>Chop (mm)</th><th>Deckle Cuts</th><th>Deckle UPS</th><th>Chop UPS</th><th>Total UPS</th><th>Req. Deckle</th><th>Req. Chop</th><th>Gripper</th><th>Act. Sheets</th><th>Waste Sheets</th><th>Waste %</th></tr></thead>
        <tbody>
          <tr style="background:#f0fdf4">
            <td class="text-center"><input type="radio" name="corrplan" checked /></td>
            <td class="text-center">1</td><td><b>Printing Press-1</b></td>
            <td class="text-right font-bold">1200</td><td class="text-right font-bold">1620</td>
            <td class="text-center">2</td><td class="text-center">1</td><td class="text-center">1</td><td class="text-center font-bold">2</td>
            <td class="text-right">1200</td><td class="text-right">1620</td>
            <td class="text-right">10</td><td class="text-right">50,010</td><td class="text-right">410</td>
            <td class="text-right" style="color:var(--color-success-text);font-weight:700">0.82%</td>
          </tr>
          <tr>
            <td class="text-center"><input type="radio" name="corrplan" /></td>
            <td class="text-center">2</td><td>Printing Press-2</td>
            <td class="text-right">1800</td><td class="text-right">1620</td>
            <td class="text-center">3</td><td class="text-center">1</td><td class="text-center">1</td><td class="text-center">3</td>
            <td class="text-right">1200</td><td class="text-right">1620</td>
            <td class="text-right">10</td><td class="text-right">33,343</td><td class="text-right">343</td>
            <td class="text-right" style="color:var(--color-warning-text);font-weight:700">1.03%</td>
          </tr>
        </tbody>
      </table>

      <!-- Top Ink/Coating Plan -->
      <div class="form-section-title" style="margin-top:14px"><i class="bi bi-file-earmark-text"></i> Top Ink/Coating Plan</div>
      <table class="line-table">
        <thead><tr><th>Sn</th><th>Particulars</th><th>Cardstock Code</th><th>Finish</th><th>GSM</th><th>Quality</th><th>Finish</th><th>Size (inch)</th><th>Size (mm)</th></tr></thead>
        <tbody>
          <tr><td>1</td><td>Top Liner</td><td>KR150-1200</td><td>26</td><td>150</td><td>Art Paper</td><td>Plain</td><td>47.24"</td><td>1200mm</td></tr>
          <tr><td>2</td><td>Back Liner</td><td>KR150-1200</td><td>26</td><td>150</td><td>Art Paper</td><td>Plain</td><td>47.24"</td><td>1200mm</td></tr>
        </tbody>
      </table>

      <!-- Playing Card Cardstock -->
      <div class="form-section-title" style="margin-top:14px"><i class="bi bi-layers"></i> Playing Card Cardstock Plan</div>
      <table class="line-table">
        <thead><tr><th>Sn</th><th>Particulars</th><th>Cardstock Code</th><th>Finish</th><th>GSM</th><th>Quality</th><th>Finish</th><th>Size (inch)</th><th>Size (mm)</th></tr></thead>
        <tbody>
          <tr><td>1</td><td>Black Core Medium</td><td>Smooth120-1200</td><td>18</td><td>120</td><td>Finish</td><td>Plain</td><td>47.24"</td><td>1200mm</td></tr>
          <tr><td>2</td><td>Blue Core Medium</td><td>Smooth120-1200</td><td>18</td><td>120</td><td>Finish</td><td>Plain</td><td>47.24"</td><td>1200mm</td></tr>
          <tr><td>3</td><td>Inner Liner</td><td>KR150-1200</td><td>26</td><td>150</td><td>Art Paper</td><td>Plain</td><td>47.24"</td><td>1200mm</td></tr>
        </tbody>
      </table>
    </div>
    <div class="modal-footer">
      <div class="modal-footer-left"><button class="btn btn-print"><i class="bi bi-printer"></i> Print Plan</button></div>
      <button class="btn btn-secondary" onclick="closeModal('modal-jp-new')">Cancel</button>
      <button class="btn btn-save"><i class="bi bi-check-lg"></i> Save Job Preparation</button>
    </div>
  </div>
</div>
`);
});
