document.addEventListener('DOMContentLoaded', () => {
  const ca = document.getElementById('contentArea');
  const tag = (color, txt) => `<span class="tag tag-${color}" style="font-size:10px">${txt}</span>`;

  // ─── Cardstock PO CLOSE ────────────────────────────────────────────────────
  ca.insertAdjacentHTML('beforeend', `
<div class="page" id="page-Cardstock-po-close">
  <div class="page-header">
    <div><div class="page-title">Cardstock PO Close</div><div class="page-subtitle">Finalize and close purchase orders — partial receipts, rate differences and balance cancellation</div></div>
    <div class="page-actions">
      <button class="btn btn-secondary btn-sm"><i class="bi bi-download"></i> Export</button>
    </div>
  </div>

  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:14px">
    ${[['Open POs','18','#3b82f6'],['Fully Received','6','#22c55e'],['Partially Received','8','#f59e0b'],['Overdue (>7d)','4','#ef4444']].map(([l,v,c])=>`
    <div style="background:#fff;border:1px solid var(--bd-default);border-radius:8px;padding:12px 14px;border-top:3px solid ${c};text-align:center;Deck-shadow:var(--shadow-sm)">
      <div style="font-size:20px;font-weight:800;color:${c}">${v}</div>
      <div style="font-size:11px;color:var(--fg-muted)">${l}</div>
    </div>`).join('')}
  </div>

  <div class="toolbar">
    <div class="toolbar-left">
      <div class="seg-tabs">
        <div class="seg-tab active">Pending Close</div>
        <div class="seg-tab">Fully Received</div>
        <div class="seg-tab">Closed</div>
      </div>
      <div class="search-input-wrap"><i class="bi bi-search"></i><input class="search-input" placeholder="PO no, supplier, Cardstock code..." /></div>
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
          <th><input type="checkbox" /></th>
          <th>PO No</th><th>PO Date</th><th>Supplier</th><th>Cardstock Code</th><th>Item Name</th>
          <th>Quality</th><th>GSM</th><th>Order Qty (kg)</th><th>Rate (₹/kg)</th>
          <th>Received Qty</th><th>Pending Qty</th><th>PO Value (₹)</th>
          <th>Rcvd Value (₹)</th><th>Balance (₹)</th><th>Last Receipt</th><th>Status</th><th></th>
        </tr>
      </thead>
      <tbody>
        ${[
          ['RP-2026-082','28 Jun','Ballarpur','KR-150-1200','Art Paper Liner 150','Art Paper','150','5,000','42.00','2,500','2,500','₹2,10,000','₹1,05,000','₹1,05,000','28 Jun','Partial'],
          ['RP-2026-080','24 Jun','Ballarpur','KR-150-900','Art Paper Liner 150 900','Art Paper','150','1,500','42.00','750','750','₹63,000','₹31,500','₹31,500','26 Jun','Partial'],
          ['RP-2026-078','20 Jun','TNPL','TL-160-1350','Test Liner 160','Test','160','2,000','48.00','2,000','0','₹96,000','₹96,000','₹0','22 Jun','Fully Received'],
          ['RP-2026-075','15 Jun','JK Ink/Coating','Finish-120-1200','Finish Medium 120','Finish','120','3,500','38.00','1,200','2,300','₹1,33,000','₹45,600','₹87,400','18 Jun','Partial'],
          ['RP-2026-070','10 Jun','Century','WL-100-1200','WL 100 GSM','WL','100','2,000','32.00','2,000','0','₹64,000','₹64,000','₹0','12 Jun','Fully Received'],
        ].map(([po,dt,sup,code,name,qual,gsm,oq,rate,rcv,pend,poval,rcvval,bal,lastRcv,status])=>{
          const sc = status==='Fully Received'?'green':'orange';
          return `<tr>
            <td><input type="checkbox" /></td>
            <td><b>${po}</b></td><td class="muted">${dt}</td><td>${sup}</td>
            <td style="font-family:monospace;font-size:11px">${code}</td>
            <td style="font-size:12px">${name}</td>
            <td class="muted" style="font-size:11px">${qual}</td>
            <td class="text-center muted" style="font-size:11px">${gsm}</td>
            <td class="text-right font-bold">${oq}</td>
            <td class="text-right">${rate}</td>
            <td class="text-right" style="color:var(--color-success-text);font-weight:600">${rcv}</td>
            <td class="text-right" style="color:${pend==='0'?'inherit':'var(--color-warning-text)'};font-weight:600">${pend}</td>
            <td class="text-right muted">${poval}</td>
            <td class="text-right muted">${rcvval}</td>
            <td class="text-right font-bold" style="color:${bal==='₹0'?'inherit':'var(--color-error-text)'}">${bal}</td>
            <td class="muted" style="font-size:11px">${lastRcv}</td>
            <td>${tag(sc,status)}</td>
            <td class="actions-cell">
              <button class="btn btn-ghost btn-icon btn-sm" onclick="openModal('modal-po-close-action')"><i class="bi bi-eye"></i></button>
              <button class="btn btn-save btn-sm" onclick="openModal('modal-po-close-action')">Close PO</button>
            </td>
          </tr>`;
        }).join('')}
      </tbody>
    </table>
    <div class="grid-footer">
      <span>Showing 5 of 18 POs</span>
      <button class="btn btn-secondary btn-sm" style="color:var(--color-error-text)"><i class="bi bi-x-circle"></i> Close Selected POs</button>
    </div>
  </div>
</div>

<div class="modal-overlay hidden" id="modal-po-close-action">
  <div class="modal modal-md">
    <div class="modal-header">
      <div class="modal-icon" style="background:#fef3c7;color:#d97706"><i class="bi bi-lock"></i></div>
      <div><div class="modal-title">Close PO — RP-2026-082</div><div class="modal-sub">Ballarpur | KR-150-1200 | Pending: 2,500 kg | Balance: ₹1,05,000</div></div>
      <button class="modal-close" onclick="closeModal('modal-po-close-action')"><i class="bi bi-x"></i></button>
    </div>
    <div class="modal-body">
      <div class="alert alert-warning"><i class="bi bi-exclamation-triangle"></i> <b>2,500 kg pending</b> will be cancelled. Booked stock will be released back to free stock.</div>
      <div class="form-row cols-2">
        <div class="field-group"><label class="field-label required">Close Date</label><input class="form-input" type="date" value="2026-06-30" /></div>
        <div class="field-group"><label class="field-label required">Close Reason</label>
          <select class="form-select">
            <option>Quantity not required</option>
            <option>Supplier unable to supGSM</option>
            <option>Rate revision</option>
            <option>Alternative source used</option>
            <option>Job cancelled</option>
          </select>
        </div>
      </div>
      <div class="field-group"><label class="field-label">Remarks</label>
        <textarea class="form-textarea" style="min-height:60px" placeholder="Detailed reason for closing..."></textarea>
      </div>
      <div style="background:var(--bg-subtle);border-radius:8px;padding:12px;border:1px solid var(--bd-default);display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:8px">
        ${[['Order Qty','5,000 kg'],['Received','2,500 kg'],['To be Cancelled','2,500 kg'],['PO Value','₹2,10,000'],['Received Value','₹1,05,000'],['Balance Cancelled','₹1,05,000']].map(([l,v])=>`
        <div style="text-align:center">
          <div style="font-size:14px;font-weight:700;color:var(--primary)">${v}</div>
          <div style="font-size:11px;color:var(--fg-muted)">${l}</div>
        </div>`).join('')}
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal('modal-po-close-action')">Cancel</button>
      <button class="btn btn-save" style="background:var(--color-error-text);border-color:var(--color-error-text)"><i class="bi bi-lock"></i> Confirm Close PO</button>
    </div>
  </div>
</div>`);

  // ─── Cardstock PHYSICAL VERIFICATION ──────────────────────────────────────
  ca.insertAdjacentHTML('beforeend', `
<div class="page" id="page-Cardstock-verification">
  <div class="page-header">
    <div><div class="page-title">Cardstock Physical Verification</div><div class="page-subtitle">Physical stock count — batch-wise verification of actual Cardstock weights vs system records</div></div>
    <div class="page-actions">
      <button class="btn btn-secondary btn-sm"><i class="bi bi-download"></i> Export</button>
      <button class="btn btn-create" onclick="openModal('modal-Cardstock-verify-new')"><i class="bi bi-plus"></i> New Verification</button>
    </div>
  </div>

  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:14px">
    ${[['Total Batches','142','#3b82f6'],['Verified','98','#22c55e'],['Pending Verify','36','#f59e0b'],['Discrepancies','8','#ef4444']].map(([l,v,c])=>`
    <div style="background:#fff;border:1px solid var(--bd-default);border-radius:8px;padding:12px 14px;border-top:3px solid ${c};text-align:center;Deck-shadow:var(--shadow-sm)">
      <div style="font-size:20px;font-weight:800;color:${c}">${v}</div>
      <div style="font-size:11px;color:var(--fg-muted)">${l}</div>
    </div>`).join('')}
  </div>

  <div class="toolbar">
    <div class="toolbar-left">
      <div class="seg-tabs">
        <div class="seg-tab active">All Batches</div>
        <div class="seg-tab">Pending Verify</div>
        <div class="seg-tab">Discrepancy</div>
        <div class="seg-tab">Verified OK</div>
      </div>
      <div class="search-input-wrap"><i class="bi bi-search"></i><input class="search-input" placeholder="KP Cardstock no, batch no, Cardstock code..." /></div>
      <select class="form-select" style="width:140px;padding:5px 8px"><option>All Warehouses</option><option>Godown A</option><option>Godown B</option></select>
    </div>
  </div>

  <div class="grid-wrap">
    <table class="data-table">
      <thead>
        <tr>
          <th><input type="checkbox" /></th>
          <th>KP Cardstock No</th><th>Cardstock Code</th><th>Item Name</th><th>Batch No</th>
          <th>Warehouse / Bin</th><th>System Wt (kg)</th><th>Physical Wt (kg)</th>
          <th>Difference (kg)</th><th>Diff%</th><th>Verified By</th><th>Verified On</th><th>Status</th><th></th>
        </tr>
      </thead>
      <tbody>
        ${[
          ['KP-2026-001','KR-150-1200','Art Paper Liner 150','BIL-JUN-1','Godown A — A1','820','815','-5','-0.6%','Ramesh S.','28 Jun','Verified OK'],
          ['KP-2026-002','KR-150-1200','Art Paper Liner 150','BIL-JUN-2','Floor A — F1','835','835','0','0.0%','Ramesh S.','28 Jun','Verified OK'],
          ['KP-2026-003','KR-150-1200','Art Paper Liner 150','BIL-JUN-3','Godown A — A2','845','810','-35','-4.1%','Ramesh S.','27 Jun','Discrepancy'],
          ['KP-2026-010','Finish-120-1200','Finish Medium 120','BIL-JUN-10','Godown B — B1','120','-','-','-','—','—','Pending'],
          ['KP-2026-011','Finish-120-1200','Finish Medium 120','BIL-JUN-11','Godown B — B2','98','-','-','-','—','—','Pending'],
          ['KP-2026-012','TL-160-1350','Test Liner 160','TNPL-JUN-1','Godown A — A3','420','422','+2','+0.5%','Arun T.','26 Jun','Verified OK'],
        ].map(([kp,code,name,bn,wh,sysw,phyw,diff,diffpct,verby,veron,status])=>{
          const sc = status==='Verified OK'?'green':status==='Discrepancy'?'red':'gold';
          const diffColor = diff.startsWith('-') && diff!=='-'?'var(--color-error-text)':diff.startsWith('+')?'var(--color-success-text)':'inherit';
          return `<tr>
            <td><input type="checkbox" /></td>
            <td style="font-family:monospace;font-size:11px;color:var(--primary)">${kp}</td>
            <td style="font-family:monospace;font-size:11px">${code}</td>
            <td style="font-size:12px">${name}</td>
            <td style="font-size:11px">${bn}</td>
            <td style="font-size:11px">${wh}</td>
            <td class="text-right font-bold">${sysw}</td>
            <td class="text-right">${phyw === '-' ? '<span class="muted">—</span>' : phyw}</td>
            <td class="text-right font-bold" style="color:${diffColor}">${diff}</td>
            <td class="text-right" style="font-size:11px;color:${diffColor}">${diffpct}</td>
            <td class="muted" style="font-size:11px">${verby}</td>
            <td class="muted" style="font-size:11px">${veron}</td>
            <td>${tag(sc,status)}</td>
            <td class="actions-cell">
              ${status==='Pending'?`<button class="btn btn-save btn-sm" onclick="openModal('modal-Cardstock-verify-new')">Enter Count</button>`:
              status==='Discrepancy'?`<button class="btn btn-edit btn-icon btn-sm" onclick="openModal('modal-Cardstock-verify-new')"><i class="bi bi-pencil"></i></button>`:
              `<button class="btn btn-ghost btn-icon btn-sm"><i class="bi bi-eye"></i></button>`}
            </td>
          </tr>`;
        }).join('')}
      </tbody>
    </table>
    <div class="grid-footer">
      <span>Showing 6 of 142 batches</span>
      <button class="btn btn-secondary btn-sm"><i class="bi bi-file-earmark-spreadsheet"></i> Export Discrepancy Report</button>
    </div>
  </div>
</div>

<div class="modal-overlay hidden" id="modal-Cardstock-verify-new">
  <div class="modal modal-md">
    <div class="modal-header">
      <div class="modal-icon"><i class="bi bi-clipboard-check"></i></div>
      <div><div class="modal-title">Physical Verification Entry</div><div class="modal-sub">Enter actual physical weight for Cardstock batch</div></div>
      <button class="modal-close" onclick="closeModal('modal-Cardstock-verify-new')"><i class="bi bi-x"></i></button>
    </div>
    <div class="modal-body">
      <div style="background:var(--bg-subtle);border-radius:8px;padding:12px;border:1px solid var(--bd-default);margin-bottom:12px">
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">
          ${[['KP Cardstock No','KP-2026-003'],['Cardstock Code','KR-150-1200'],['Item','Art Paper Liner 150 GSM'],['Batch No','BIL-JUN-3'],['Warehouse','Godown A — A2'],['System Wt','845 kg']].map(([l,v])=>`
          <div><div style="font-size:10px;color:var(--fg-muted)">${l}</div><div style="font-size:12px;font-weight:600">${v}</div></div>`).join('')}
        </div>
      </div>
      <div class="form-row cols-2">
        <div class="field-group"><label class="field-label required">Verification Date</label><input class="form-input" type="date" value="2026-06-30" /></div>
        <div class="field-group"><label class="field-label required">Actual Physical Wt (kg)</label><input class="form-input" type="number" value="810" /></div>
      </div>
      <div class="field-group"><label class="field-label">Condition of Cardstock</label>
        <select class="form-select"><option>Good — No Damage</option><option>Minor Damage</option><option>Major Damage</option><option>Unusable / Scrap</option></select>
      </div>
      <div class="field-group"><label class="field-label">Discrepancy Reason</label>
        <select class="form-select"><option>Weighment error</option><option>Usage without proper issue slip</option><option>Wastage during handling</option><option>Moisture loss</option><option>Theft / pilferage</option></select>
      </div>
      <div class="field-group"><label class="field-label">Remarks</label>
        <textarea class="form-textarea" style="min-height:60px" placeholder="Verification remarks...">Cardstock found with 35kg less weight — likely weighed without checking tape end.</textarea>
      </div>
      <div class="alert alert-warning" style="margin-top:8px"><i class="bi bi-exclamation-triangle"></i> Difference: <b>-35 kg (-4.1%)</b> — This will create a stock adjustment entry on save.</div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal('modal-Cardstock-verify-new')">Cancel</button>
      <button class="btn btn-save"><i class="bi bi-check-lg"></i> Save Verification</button>
    </div>
  </div>
</div>`);

  // ─── Cardstock FLOOR STOCK ─────────────────────────────────────────────────
  ca.insertAdjacentHTML('beforeend', `
<div class="page" id="page-Cardstock-floor-stock">
  <div class="page-header">
    <div><div class="page-title">Cardstock Floor Stock</div><div class="page-subtitle">Live view of Cardstock / liner stock currently on production floor — issued but not yet consumed</div></div>
    <div class="page-actions">
      <button class="btn btn-secondary btn-sm"><i class="bi bi-download"></i> Export</button>
      <button class="btn btn-secondary btn-sm" onclick="navigate('Cardstock-return')"><i class="bi bi-arrow-return-left"></i> Return to Store</button>
    </div>
  </div>

  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:14px">
    ${[['Items on Floor','8','#3b82f6'],['Total Floor Wt','4,820 kg','#003366'],['Floor Locations','3','#22c55e'],['Pending Return','2','#f59e0b']].map(([l,v,c])=>`
    <div style="background:#fff;border:1px solid var(--bd-default);border-radius:8px;padding:12px 14px;border-top:3px solid ${c};text-align:center;Deck-shadow:var(--shadow-sm)">
      <div style="font-size:20px;font-weight:800;color:${c}">${v}</div>
      <div style="font-size:11px;color:var(--fg-muted)">${l}</div>
    </div>`).join('')}
  </div>

  <div class="toolbar">
    <div class="toolbar-left">
      <div class="seg-tabs">
        <div class="seg-tab active">All Floor</div>
        <div class="seg-tab">Playing Card Floor</div>
        <div class="seg-tab">Printing Floor</div>
      </div>
      <div class="search-input-wrap"><i class="bi bi-search"></i><input class="search-input" placeholder="KP Cardstock no, Cardstock code, batch..." /></div>
    </div>
  </div>

  <div class="grid-wrap">
    <table class="data-table">
      <thead>
        <tr>
          <th>KP Cardstock No</th><th>Cardstock Code</th><th>Item Name</th><th>Batch No</th>
          <th>Quality</th><th>Finish</th><th>GSM</th><th>Width (mm)</th>
          <th>Floor Location</th><th>Floor Stock (kg)</th>
          <th>Issued On</th><th>Issue Voucher</th><th>Job Card No</th><th>Content Name</th><th>Days on Floor</th><th></th>
        </tr>
      </thead>
      <tbody>
        ${[
          ['KP-2026-002','KR-150-1200','Art Paper Liner 150','BIL-JUN-2','Art Paper','26','150','1200','Floor A — Bin F1','835','28 Jun','RI-2026-088','JC-2026-089','Top Liner','2'],
          ['KP-2026-004','KR-150-1200','Art Paper Liner 150','BIL-JUN-4','Art Paper','26','150','1200','Floor A — Bin F1','820','27 Jun','RI-2026-087','JC-2026-088','Back Liner','3'],
          ['KP-2026-010','Finish-120-1200','Finish Medium 120','BIL-JUN-10','Finish','18','120','1200','Floor A — Bin F2','3000','26 Jun','RI-2026-086','JC-2026-088','Core Medium','4'],
          ['KP-2026-015','TL-160-1350','Test Liner 160','TNPL-JUN-1','Test','22','160','1350','Floor A — Bin F3','165','25 Jun','RI-2026-085','JC-2026-087','Top Liner','5'],
        ].map(([kp,code,name,bn,qual,bf,gsm,wid,floor,stk,issdt,iv,jc,content,days])=>{
          const daysNum = parseInt(days);
          const daysColor = daysNum > 4 ? 'var(--color-error-text)' : daysNum > 2 ? 'var(--color-warning-text)' : 'var(--color-success-text)';
          return `<tr>
            <td style="font-family:monospace;font-size:11px;color:var(--primary)">${kp}</td>
            <td style="font-family:monospace;font-size:11px">${code}</td>
            <td style="font-size:12px">${name}</td>
            <td style="font-size:11px">${bn}</td>
            <td class="muted" style="font-size:11px">${qual}</td>
            <td class="text-center muted" style="font-size:11px">${bf}</td>
            <td class="text-center muted" style="font-size:11px">${gsm}</td>
            <td class="text-right muted" style="font-size:11px">${wid}</td>
            <td style="font-size:11px">${floor}</td>
            <td class="text-right font-bold">${stk} kg</td>
            <td class="muted" style="font-size:11px">${issdt}</td>
            <td style="font-size:11px">${iv}</td>
            <td style="font-size:11px">${jc}</td>
            <td class="muted" style="font-size:11px">${content}</td>
            <td class="text-center font-bold" style="color:${daysColor}">${days}d</td>
            <td class="actions-cell">
              <button class="btn btn-secondary btn-sm" onclick="openModal('modal-Cardstock-return-new')"><i class="bi bi-arrow-return-left"></i> Return</button>
            </td>
          </tr>`;
        }).join('')}
      </tbody>
    </table>
    <div class="grid-footer"><span>4 reels on floor — Total 4,820 kg</span></div>
  </div>
</div>`);

  // ─── Ink/Coating FLOOR STOCK ────────────────────────────────────────────────
  ca.insertAdjacentHTML('beforeend', `
<div class="page" id="page-Ink/Coating-floor-stock">
  <div class="page-header">
    <div><div class="page-title">Ink/Coating Floor Stock</div><div class="page-subtitle">Live view of Ink/Coating / board stock currently on production floor — issued but not yet consumed</div></div>
    <div class="page-actions">
      <button class="btn btn-secondary btn-sm"><i class="bi bi-download"></i> Export</button>
      <button class="btn btn-secondary btn-sm" onclick="navigate('Ink/Coating-return')"><i class="bi bi-arrow-return-left"></i> Return to Store</button>
    </div>
  </div>

  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:14px">
    ${[['Items on Floor','5','#3b82f6'],['Total Sheets','680 sht','#003366'],['Floor Locations','2','#22c55e'],['Pending Return','1','#f59e0b']].map(([l,v,c])=>`
    <div style="background:#fff;border:1px solid var(--bd-default);border-radius:8px;padding:12px 14px;border-top:3px solid ${c};text-align:center;Deck-shadow:var(--shadow-sm)">
      <div style="font-size:20px;font-weight:800;color:${c}">${v}</div>
      <div style="font-size:11px;color:var(--fg-muted)">${l}</div>
    </div>`).join('')}
  </div>

  <div class="toolbar">
    <div class="toolbar-left">
      <div class="seg-tabs">
        <div class="seg-tab active">All Floor</div>
        <div class="seg-tab">Printing Floor</div>
        <div class="seg-tab">Die Cutting</div>
      </div>
      <div class="search-input-wrap"><i class="bi bi-search"></i><input class="search-input" placeholder="Ink/Coating code, batch no, quality..." /></div>
    </div>
  </div>

  <div class="grid-wrap">
    <table class="data-table">
      <thead>
        <tr>
          <th>Batch No</th><th>Ink/Coating Code</th><th>Item Name</th><th>Quality</th><th>GSM</th>
          <th>Size W</th><th>Size L</th><th>Floor Location</th>
          <th>Floor Stock (sht)</th><th>Issued On</th><th>Issue Voucher</th>
          <th>Job Card No</th><th>Days on Floor</th><th></th>
        </tr>
      </thead>
      <tbody>
        ${[
          ['BTN-001','BD-250-760×1010','Board 250 GSM','Ivory','250','760','1010','Floor B — Bin F3','200','28 Jun','PI-2026-055','JC-2026-089','2'],
          ['MG-JUN-01','MG-80-580×880','Maplitho 80 GSM','Maplitho','80','580','880','Floor B — Bin F4','300','27 Jun','PI-2026-054','JC-2026-088','3'],
          ['KM-001','KM-90-630×900','Art Paper Mono 90 GSM','Art Paper Mono','90','630','900','Floor B — Bin F3','180','24 Jun','PI-2026-052','JC-2026-086','6'],
        ].map(([bn,code,name,qual,gsm,sw,sl,floor,stk,issdt,iv,jc,days])=>{
          const daysNum = parseInt(days);
          const daysColor = daysNum > 4 ? 'var(--color-error-text)' : daysNum > 2 ? 'var(--color-warning-text)' : 'var(--color-success-text)';
          return `<tr>
            <td style="font-family:monospace;font-size:11px">${bn}</td>
            <td style="font-family:monospace;font-size:11px">${code}</td>
            <td style="font-size:12px">${name}</td>
            <td class="muted" style="font-size:11px">${qual}</td>
            <td class="text-center muted" style="font-size:11px">${gsm}</td>
            <td class="text-right muted" style="font-size:11px">${sw}</td>
            <td class="text-right muted" style="font-size:11px">${sl}</td>
            <td style="font-size:11px">${floor}</td>
            <td class="text-right font-bold">${stk} sht</td>
            <td class="muted" style="font-size:11px">${issdt}</td>
            <td style="font-size:11px">${iv}</td>
            <td style="font-size:11px">${jc}</td>
            <td class="text-center font-bold" style="color:${daysColor}">${days}d</td>
            <td class="actions-cell">
              <button class="btn btn-secondary btn-sm" onclick="openModal('modal-Ink/Coating-return-new')"><i class="bi bi-arrow-return-left"></i> Return</button>
            </td>
          </tr>`;
        }).join('')}
      </tbody>
    </table>
    <div class="grid-footer"><span>3 Ink/Coating items on floor — Total 680 sheets</span></div>
  </div>
</div>`);
});
