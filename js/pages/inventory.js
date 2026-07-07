document.addEventListener('DOMContentLoaded', () => {
  const ca = document.getElementById('contentArea');

  // ─── Cardstock / LINER ────────────────────────────────────────────────────

  // Cardstock Requisition
  ca.insertAdjacentHTML('beforeend', `
<div class="page" id="page-Cardstock-req">
  <div class="page-header">
    <div><div class="page-title">Cardstock Requisition</div><div class="page-subtitle">Ink/Coating Cardstock / liner indent for production — tracks to PO and receipt</div></div>
    <div class="page-actions">
      <button class="btn btn-secondary btn-sm"><i class="bi bi-download"></i> Export</button>
      <button class="btn btn-create" onclick="openModal('modal-Cardstock-req-new')"><i class="bi bi-plus"></i> New Requisition</button>
    </div>
  </div>
  <div class="toolbar">
    <div class="toolbar-left">
      <div class="seg-tabs">
        <div class="seg-tab active">All</div><div class="seg-tab">PR Pending</div><div class="seg-tab">Partial PO</div><div class="seg-tab">PO Done</div><div class="seg-tab">Received</div>
      </div>
      <div class="search-input-wrap"><i class="bi bi-search"></i><input class="search-input" placeholder="Voucher no, Cardstock code, item..." /></div>
    </div>
    <div class="toolbar-right">
      <input class="form-input" type="date" value="2026-06-01" style="width:130px;padding:5px 8px" />
      <input class="form-input" type="date" value="2026-06-30" style="width:130px;padding:5px 8px" />
      <button class="btn btn-secondary btn-sm" onclick="navigate('Cardstock-po')"><i class="bi bi-plus"></i> Create PO from Selected</button>
    </div>
  </div>
  <div class="grid-wrap">
    <table class="data-table">
      <thead>
        <tr><th><input type="checkbox" /></th><th>Voucher No</th><th>Date</th><th>Cardstock Code</th><th>Item Name</th><th>Group</th><th>Quality</th><th>Finish</th><th>GSM</th><th>Width (mm)</th><th>Finish</th><th>Req Qty (kg)</th><th>Ordered Qty</th><th>Received Qty</th><th>PO Nos</th><th>Stage</th><th>Created By</th><th></th></tr>
      </thead>
      <tbody>
        ${[
          ['RR-2026-0089','28 Jun','KR-150-1200','Art Paper Liner 150 GSM','Liner','Art Paper','26','150','1200','Plain','5,000','5,000','—','RP-082','Partial PO','Ramesh S.'],
          ['RR-2026-0088','27 Jun','Finish-120-1200','Finish Medium 120 GSM','Core','Finish','18','120','1200','Plain','3,000','3,000','3,000','RP-081','Received','Ramesh S.'],
          ['RR-2026-0087','26 Jun','TL-160-1350','Test Liner 160 GSM','Liner','Test','22','160','1350','Plain','2,000','—','—','—','PR Pending','Ramesh S.'],
          ['RR-2026-0086','25 Jun','KR-150-900','Art Paper Liner 150 GSM 900','Liner','Art Paper','26','150','900','Plain','1,500','1,500','750','RP-080','Partial Receipt','Ramesh S.'],
        ].map(([vno,dt,code,name,grp,qual,bf,gsm,wid,fin,rq,oq,rcv,pono,stage,by]) => {
          const stMap={'PR Pending':'gold','Partial PO':'blue','PO Done':'purple','Partial Receipt':'orange','Received':'green'};
          return `<tr onclick="openModal('modal-Cardstock-req-new')">
            <td><input type="checkbox" onclick="event.stopPropagation()" /></td>
            <td><b>${vno}</b></td><td class="muted">${dt}</td>
            <td style="font-family:monospace;font-size:11px">${code}</td><td>${name}</td>
            <td><span class="tag tag-navy" style="font-size:10px">${grp}</span></td>
            <td class="muted" style="font-size:11px">${qual}</td>
            <td class="text-center muted" style="font-size:11px">${bf}</td>
            <td class="text-center muted" style="font-size:11px">${gsm}</td>
            <td class="text-right muted" style="font-size:11px">${wid}</td>
            <td class="muted" style="font-size:11px">${fin}</td>
            <td class="text-right font-bold">${rq}</td>
            <td class="text-right muted">${oq}</td>
            <td class="text-right muted">${rcv}</td>
            <td style="font-size:11px">${pono}</td>
            <td><span class="tag tag-${stMap[stage]}" style="font-size:10px">${stage}</span></td>
            <td class="muted" style="font-size:11px">${by}</td>
            <td class="actions-cell">
              <button class="btn btn-ghost btn-icon btn-sm"><i class="bi bi-eye"></i></button>
              <button class="btn btn-edit btn-icon btn-sm"><i class="bi bi-pencil"></i></button>
              <button class="btn btn-delete btn-icon btn-sm"><i class="bi bi-trash"></i></button>
            </td>
          </tr>`;
        }).join('')}
      </tbody>
    </table>
    <div class="grid-footer"><span>Showing 4 of 89 requisitions</span></div>
  </div>
</div>
<div class="modal-overlay hidden" id="modal-Cardstock-req-new">
  <div class="modal modal-lg">
    <div class="modal-header"><div class="modal-icon"><i class="bi bi-layers"></i></div>
      <div><div class="modal-title">New Cardstock Requisition</div><div class="modal-sub">Request Ink/Coating reels for production</div></div>
      <button class="modal-close" onclick="closeModal('modal-Cardstock-req-new')"><i class="bi bi-x"></i></button>
    </div>
    <div class="modal-body">
      <div class="form-row cols-2">
        <div class="field-group"><label class="field-label required">Date</label><input class="form-input" type="date" value="2026-06-30" /></div>
        <div class="field-group"><label class="field-label">Remark</label><input class="form-input" placeholder="Narration..." /></div>
      </div>
      <table class="line-table">
        <thead><tr><th>Cardstock Code</th><th>Item Name</th><th>Quality</th><th>Finish</th><th>GSM</th><th>Width (mm)</th><th>Finish</th><th>Req Qty (kg)</th><th>Exp. Delivery</th><th>Mill</th><th>Remark</th></tr></thead>
        <tbody>
          <tr>
            <td><select class="form-select" style="font-size:11px;padding:3px 5px;min-width:120px"><option>KR-150-1200</option></select></td>
            <td style="font-size:11px">Art Paper Liner 150 GSM</td>
            <td style="font-size:11px">Art Paper</td><td style="font-size:11px">26</td><td style="font-size:11px">150</td><td style="font-size:11px">1200</td><td style="font-size:11px">Plain</td>
            <td><input class="form-input" type="number" value="5000" style="width:65px;padding:3px 5px;font-size:11px" /></td>
            <td><input class="form-input" type="date" value="2026-07-05" style="padding:3px 5px;font-size:11px;width:110px" /></td>
            <td><select class="form-select" style="font-size:11px;padding:3px 5px;width:90px"><option>TNPL</option></select></td>
            <td><input class="form-input" placeholder="..." style="width:70px;padding:3px 5px;font-size:11px" /></td>
          </tr>
          <tr><td colspan="11" style="text-align:center;padding:8px"><button class="btn btn-ghost btn-sm"><i class="bi bi-plus"></i> Add Cardstock</button></td></tr>
        </tbody>
      </table>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal('modal-Cardstock-req-new')">Cancel</button>
      <button class="btn btn-save"><i class="bi bi-check-lg"></i> Save Requisition</button>
    </div>
  </div>
</div>`);

  // Cardstock PO
  ca.insertAdjacentHTML('beforeend', `
<div class="page" id="page-Cardstock-po">
  <div class="page-header">
    <div><div class="page-title">Cardstock Purchase Order</div><div class="page-subtitle">PO to supplier with price, GST and delivery terms</div></div>
    <div class="page-actions">
      <button class="btn btn-secondary btn-sm"><i class="bi bi-download"></i> Export</button>
      <button class="btn btn-create" onclick="openModal('modal-Cardstock-po-new')"><i class="bi bi-plus"></i> New PO</button>
    </div>
  </div>
  <div class="toolbar">
    <div class="toolbar-left">
      <div class="seg-tabs"><div class="seg-tab active">All</div><div class="seg-tab">Pending Receipt</div><div class="seg-tab">Partial</div><div class="seg-tab">Fully Received</div></div>
      <div class="search-input-wrap"><i class="bi bi-search"></i><input class="search-input" placeholder="PO no, supplier, Cardstock code..." /></div>
    </div>
    <div class="toolbar-right">
      <input class="form-input" type="date" value="2026-06-01" style="width:130px;padding:5px 8px" />
      <input class="form-input" type="date" value="2026-06-30" style="width:130px;padding:5px 8px" />
    </div>
  </div>
  <div class="grid-wrap">
    <table class="data-table">
      <thead><tr><th>PO No</th><th>Date</th><th>Supplier</th><th>Cardstock Code</th><th>Item Name</th><th>Quality</th><th>GSM</th><th>Width (mm)</th><th>Ordered Qty</th><th>Rate</th><th>Total Amt</th><th>Received Qty</th><th>Pending Qty</th><th>Receipt Status</th><th>Req No</th><th>Created By</th><th></th></tr></thead>
      <tbody>
        ${[
          ['RP-2026-082','28 Jun','Ballarpur Inds.','KR-150-1200','Art Paper Liner 150','Art Paper','150','1200','5,000','₹42.00','₹2,10,000','2,500','2,500','Partial Receipt','RR-089','Ramesh S.'],
          ['RP-2026-081','26 Jun','TNPL Ltd','Finish-120-1200','Finish Medium 120','Finish','120','1200','3,000','₹38.00','₹1,14,000','3,000','—','Fully Received','RR-088','Ramesh S.'],
          ['RP-2026-080','24 Jun','Ballarpur Inds.','KR-150-900','Art Paper Liner 150 900','Art Paper','150','900','1,500','₹42.00','₹63,000','750','750','Partial Receipt','RR-086','Ramesh S.'],
        ].map(([po,dt,sup,code,name,qual,gsm,wid,oq,rate,amt,rcv,pend,rstatus,reqno,by]) => {
          const stMap={'Partial Receipt':'orange','Fully Received':'green','Pending PO':'gold'};
          return `<tr onclick="openModal('modal-Cardstock-po-new')">
            <td><b>${po}</b></td><td class="muted">${dt}</td><td>${sup}</td>
            <td style="font-family:monospace;font-size:11px">${code}</td><td style="font-size:12px">${name}</td>
            <td class="muted" style="font-size:11px">${qual}</td><td class="text-center muted" style="font-size:11px">${gsm}</td>
            <td class="text-right muted" style="font-size:11px">${wid}</td>
            <td class="text-right font-bold">${oq}</td><td class="text-right">${rate}</td>
            <td class="text-right font-bold">${amt}</td>
            <td class="text-right muted">${rcv}</td><td class="text-right muted">${pend}</td>
            <td><span class="tag tag-${stMap[rstatus]}" style="font-size:10px">${rstatus}</span></td>
            <td style="font-size:11px">${reqno}</td><td class="muted" style="font-size:11px">${by}</td>
            <td class="actions-cell">
              <button class="btn btn-ghost btn-icon btn-sm"><i class="bi bi-eye"></i></button>
              <button class="btn btn-edit btn-icon btn-sm"><i class="bi bi-pencil"></i></button>
              <button class="btn btn-print btn-icon btn-sm"><i class="bi bi-printer"></i></button>
            </td>
          </tr>`;
        }).join('')}
      </tbody>
    </table>
    <div class="grid-footer"><span>Showing 3 of 82 POs</span></div>
  </div>
</div>
<div class="modal-overlay hidden" id="modal-Cardstock-po-new">
  <div class="modal modal-lg">
    <div class="modal-header"><div class="modal-icon"><i class="bi bi-file-earmark-check"></i></div>
      <div><div class="modal-title">Cardstock Purchase Order</div><div class="modal-sub">Create PO with price, GST, delivery terms</div></div>
      <button class="modal-close" onclick="closeModal('modal-Cardstock-po-new')"><i class="bi bi-x"></i></button>
    </div>
    <div class="modal-body">
      <div class="form-row cols-3">
        <div class="field-group"><label class="field-label required">Date</label><input class="form-input" type="date" value="2026-06-30" /></div>
        <div class="field-group"><label class="field-label required">Supplier</label><select class="form-select"><option>Ballarpur Inds.</option><option>TNPL Ltd</option></select></div>
        <div class="field-group"><label class="field-label">Payment Terms</label><input class="form-input" value="30 days credit" /></div>
      </div>
      <div class="form-row cols-3">
        <div class="field-group"><label class="field-label required">Destination Address</label><input class="form-input" placeholder="Delivery address..." /></div>
        <div class="field-group"><label class="field-label">Place of Delivery</label><input class="form-input" placeholder="City / location" /></div>
        <div class="field-group"><label class="field-label">Mode of Transport</label><select class="form-select"><option>Road</option><option>Rail</option></select></div>
      </div>
      <table class="line-table">
        <thead><tr><th>Cardstock Code</th><th>Item</th><th>Quality</th><th>Finish</th><th>GSM</th><th>Width (mm)</th><th>Finish</th><th>Order Qty (kg)</th><th>Rate (₹/kg)</th><th>Tol%</th><th>Disc%</th><th>Basic Amt</th><th>Tax%</th><th>CGST</th><th>SGST</th><th>Total</th><th>Exp. Del.</th><th>Req No</th></tr></thead>
        <tbody>
          <tr>
            <td><select class="form-select" style="font-size:11px;padding:3px 5px;min-width:110px"><option>KR-150-1200</option></select></td>
            <td style="font-size:11px">Art Paper Liner 150</td><td style="font-size:11px">Art Paper</td><td style="font-size:11px">26</td><td style="font-size:11px">150</td><td style="font-size:11px">1200</td><td style="font-size:11px">Plain</td>
            <td><input class="form-input" value="5000" style="width:60px;padding:3px 5px;font-size:11px" /></td>
            <td><input class="form-input" value="42.00" style="width:55px;padding:3px 5px;font-size:11px" /></td>
            <td><input class="form-input" value="2" style="width:35px;padding:3px 5px;font-size:11px" /></td>
            <td><input class="form-input" value="0" style="width:35px;padding:3px 5px;font-size:11px" /></td>
            <td class="text-right font-bold" style="font-size:11px">₹2,10,000</td>
            <td class="text-center" style="font-size:11px">18%</td>
            <td class="text-right" style="font-size:11px">₹18,900</td>
            <td class="text-right" style="font-size:11px">₹18,900</td>
            <td class="text-right font-bold" style="font-size:11px">₹2,47,800</td>
            <td><input class="form-input" type="date" value="2026-07-05" style="padding:3px 5px;font-size:11px;width:110px" /></td>
            <td style="font-size:11px">RR-089</td>
          </tr>
        </tbody>
        <tfoot>
          <tr><td colspan="11" style="font-weight:800">Total</td><td class="text-right font-bold">₹2,10,000</td><td></td><td class="text-right font-bold" colspan="2">₹37,800</td><td class="text-right font-bold" style="font-size:13px">₹2,47,800</td><td colspan="2"></td></tr>
        </tfoot>
      </table>
      <div class="form-row cols-3" style="margin-top:12px">
        <div class="field-group"><label class="field-label">Freight (₹)</label><input class="form-input" type="number" value="0" /></div>
        <div class="field-group"><label class="field-label">Discount (₹)</label><input class="form-input" type="number" value="0" /></div>
        <div class="field-group"><label class="field-label">Round Off</label><input class="form-input" type="number" value="0.20" /></div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal('modal-Cardstock-po-new')">Cancel</button>
      <button class="btn btn-print"><i class="bi bi-printer"></i> Print PO</button>
      <button class="btn btn-save"><i class="bi bi-check-lg"></i> Save PO</button>
    </div>
  </div>
</div>`);

  // Cardstock GRN
  ca.insertAdjacentHTML('beforeend', `
<div class="page" id="page-Cardstock-receipt">
  <div class="page-header">
    <div><div class="page-title">Cardstock GRN / Receipt</div><div class="page-subtitle">Goods Receipt Note — Cardstock batch tracking with KP no, weight, warehouse assignment</div></div>
    <div class="page-actions">
      <button class="btn btn-secondary btn-sm"><i class="bi bi-download"></i> Export</button>
      <button class="btn btn-create" onclick="openModal('modal-Cardstock-grn-new')"><i class="bi bi-plus"></i> New GRN</button>
    </div>
  </div>
  <div class="toolbar">
    <div class="toolbar-left">
      <div class="search-input-wrap"><i class="bi bi-search"></i><input class="search-input" placeholder="GRN no, challan no, supplier, KP Cardstock no..." /></div>
    </div>
    <div class="toolbar-right">
      <input class="form-input" type="date" value="2026-06-01" style="width:130px;padding:5px 8px" />
      <input class="form-input" type="date" value="2026-06-30" style="width:130px;padding:5px 8px" />
    </div>
  </div>
  <div class="grid-wrap">
    <table class="data-table">
      <thead><tr><th>GRN No</th><th>Date</th><th>Supplier</th><th>Challan No</th><th>Challan Date</th><th>Gate Entry No</th><th>Vehicle No</th><th>Transporter</th><th>Cardstock Code</th><th>Item Name</th><th>Quality</th><th>GSM</th><th>No. of Reels</th><th>Rcpt Qty (kg)</th><th>PO No</th><th>Created By</th><th></th></tr></thead>
      <tbody>
        ${[
          ['GRN-2026-042','28 Jun','Ballarpur Inds.','BIL/CH/2026/881','25 Jun','GE-2026-312','MH12 AB 1234','Mahindra Log.','KR-150-1200','Art Paper Liner 150','Art Paper','150','25','2,500','RP-082','Store Mgr'],
          ['GRN-2026-041','26 Jun','TNPL Ltd','TNPL/DC/2026/442','24 Jun','GE-2026-311','GJ05 CD 5678','DTDC Logistics','Finish-120-1200','Finish Medium 120','Finish','120','30','3,000','RP-081','Store Mgr'],
        ].map(([g,dt,sup,ch,chdt,ge,veh,trans,code,name,qual,gsm,nreels,rqty,pono,by]) => `
        <tr onclick="openModal('modal-Cardstock-grn-new')">
          <td><b>${g}</b></td><td class="muted">${dt}</td><td>${sup}</td>
          <td style="font-size:11px">${ch}</td><td class="muted" style="font-size:11px">${chdt}</td>
          <td style="font-size:11px">${ge}</td><td style="font-size:11px">${veh}</td>
          <td class="muted" style="font-size:11px">${trans}</td>
          <td style="font-family:monospace;font-size:11px">${code}</td><td style="font-size:12px">${name}</td>
          <td class="muted" style="font-size:11px">${qual}</td><td class="text-center muted" style="font-size:11px">${gsm}</td>
          <td class="text-center font-bold">${nreels}</td><td class="text-right font-bold">${rqty}</td>
          <td style="font-size:11px">${pono}</td><td class="muted" style="font-size:11px">${by}</td>
          <td class="actions-cell">
            <button class="btn btn-ghost btn-icon btn-sm"><i class="bi bi-eye"></i></button>
            <button class="btn btn-edit btn-icon btn-sm"><i class="bi bi-pencil"></i></button>
          </td>
        </tr>`).join('')}
      </tbody>
    </table>
    <div class="grid-footer"><span>Showing 2 of 42 GRNs</span></div>
  </div>
</div>
<div class="modal-overlay hidden" id="modal-Cardstock-grn-new">
  <div class="modal modal-xl">
    <div class="modal-header"><div class="modal-icon"><i class="bi bi-truck"></i></div>
      <div><div class="modal-title">New Cardstock GRN</div><div class="modal-sub">Goods receipt with batch-level KP tracking, weight and warehouse assignment</div></div>
      <button class="modal-close" onclick="closeModal('modal-Cardstock-grn-new')"><i class="bi bi-x"></i></button>
    </div>
    <div class="modal-body">
      <div class="form-row cols-4">
        <div class="field-group"><label class="field-label required">Date</label><input class="form-input" type="date" value="2026-06-28" /></div>
        <div class="field-group"><label class="field-label required">Source PO</label>
          <select class="form-select"><option>RP-2026-082 — Ballarpur (KR-150-1200)</option></select></div>
        <div class="field-group"><label class="field-label">Challan No</label><input class="form-input" value="BIL/CH/2026/881" /></div>
        <div class="field-group"><label class="field-label">Challan Date</label><input class="form-input" type="date" value="2026-06-25" /></div>
      </div>
      <div class="form-row cols-4">
        <div class="field-group"><label class="field-label">Gate Entry No</label><input class="form-input" value="GE-2026-312" /></div>
        <div class="field-group"><label class="field-label">Gate Entry Date</label><input class="form-input" type="date" value="2026-06-28" /></div>
        <div class="field-group"><label class="field-label">Vehicle No</label><input class="form-input" value="MH12 AB 1234" /></div>
        <div class="field-group"><label class="field-label">Driver Name</label><input class="form-input" value="Ramesh Driver" /></div>
      </div>
      <div class="form-row cols-3">
        <div class="field-group"><label class="field-label">Transporter</label><input class="form-input" value="Mahindra Logistics" /></div>
        <div class="field-group"><label class="field-label">LR No</label><input class="form-input" value="LR-2026-4421" /></div>
        <div class="field-group"><label class="field-label">Remark</label><input class="form-input" placeholder="GRN remark..." /></div>
      </div>
      <div class="form-section-title" style="margin-top:14px"><i class="bi bi-grid-3x2"></i> Cardstock Batch Entries (One row per physical Cardstock)</div>
      <div class="alert alert-warning"><i class="bi bi-info-circle"></i> PO: KR-150-1200 | Order Qty: 5,000 kg | Pending: 2,500 kg — Enter actual received reels below</div>
      <table class="line-table">
        <thead>
          <tr><th>PO Ref</th><th>Cardstock Code</th><th>KP Cardstock No *</th><th>Mill Cardstock No</th><th>Mill</th><th>Batch No</th><th>Supplier Batch No</th><th>Mfg Date</th><th>Expiry Date</th><th>Shelf Life (days)</th><th>Each Cardstock Wt (kg) *</th><th>Warehouse / Bin</th></tr>
        </thead>
        <tbody>
          ${[1,2,3].map(i => `
          <tr>
            <td style="font-size:11px">RP-2026-082</td>
            <td style="font-size:11px">KR-150-1200</td>
            <td><input class="form-input" value="KP-2026-${String(i).padStart(3,'0')}" style="width:100px;padding:3px 5px;font-size:11px" /></td>
            <td><input class="form-input" value="MILL-RN-${1000+i}" style="width:90px;padding:3px 5px;font-size:11px" /></td>
            <td><select class="form-select" style="font-size:11px;padding:3px 5px;width:80px"><option>TNPL</option></select></td>
            <td><input class="form-input" value="BIL-JUN-${i}" style="width:80px;padding:3px 5px;font-size:11px" /></td>
            <td><input class="form-input" value="SUP-${i}" style="width:70px;padding:3px 5px;font-size:11px" /></td>
            <td><input class="form-input" type="date" value="2026-05-01" style="padding:3px 5px;font-size:11px;width:105px" /></td>
            <td><input class="form-input" type="date" value="2026-11-01" style="padding:3px 5px;font-size:11px;width:105px" /></td>
            <td><input class="form-input" value="180" style="width:50px;padding:3px 5px;font-size:11px" /></td>
            <td><input class="form-input" type="number" value="${[820,835,845][i-1]}" style="width:60px;padding:3px 5px;font-size:11px" /></td>
            <td><select class="form-select" style="font-size:11px;padding:3px 5px;min-width:120px"><option>Godown A — Bin A1</option></select></td>
          </tr>`).join('')}
          <tr><td colspan="12" style="text-align:center;padding:8px"><button class="btn btn-ghost btn-sm"><i class="bi bi-plus"></i> Add Cardstock Row</button></td></tr>
        </tbody>
        <tfoot>
          <tr><td colspan="10" style="font-weight:800">Total Weight Received</td><td class="text-right font-bold">2,500 kg (3 reels)</td><td></td></tr>
        </tfoot>
      </table>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal('modal-Cardstock-grn-new')">Cancel</button>
      <button class="btn btn-print"><i class="bi bi-printer"></i> Print Sticker</button>
      <button class="btn btn-save"><i class="bi bi-check-lg"></i> Save GRN</button>
    </div>
  </div>
</div>`);

  // Cardstock Issue
  ca.insertAdjacentHTML('beforeend', `
<div class="page" id="page-Cardstock-issue">
  <div class="page-header">
    <div><div class="page-title">Cardstock Issue</div><div class="page-subtitle">Issue reels to floor/department — item-wise or job-wise, with batch selection</div></div>
    <div class="page-actions">
      <button class="btn btn-secondary btn-sm"><i class="bi bi-download"></i> Export</button>
      <button class="btn btn-create" onclick="openModal('modal-Cardstock-issue-new')"><i class="bi bi-plus"></i> New Issue</button>
    </div>
  </div>
  <div class="toolbar">
    <div class="toolbar-left">
      <div class="seg-tabs">
        <div class="seg-tab active">Item-wise</div><div class="seg-tab">Job-wise</div><div class="seg-tab">Floor Stock</div>
      </div>
      <div class="search-input-wrap"><i class="bi bi-search"></i><input class="search-input" placeholder="Voucher no, Cardstock code, KP no..." /></div>
    </div>
  </div>
  <div class="grid-wrap">
    <table class="data-table">
      <thead><tr><th>Voucher No</th><th>Date</th><th>Cardstock Code</th><th>Item Name</th><th>Quality</th><th>GSM</th><th>KP Cardstock No</th><th>Batch No</th><th>Stock Unit</th><th>Issued Qty</th><th>Dept</th><th>Floor / Bin</th><th>Job Card No</th><th>Content</th><th>Created By</th><th></th></tr></thead>
      <tbody>
        ${[
          ['RI-2026-088','28 Jun','KR-150-1200','Art Paper Liner 150','Art Paper','150','KP-2026-001','BIL-JUN-1','KG','820','Playing Card','Floor A — Bin F1','JC-2026-089','Top Liner','Ramesh S.'],
          ['RI-2026-087','27 Jun','Finish-120-1200','Finish Medium 120','Finish','120','KP-2026-010','BIL-JUN-2','KG','3,000','Playing Card','Floor A — Bin F2','JC-2026-088','Core Medium','Ramesh S.'],
        ].map(([v,dt,code,name,qual,gsm,kp,bn,su,qty,dept,floor,jc,content,by]) => `
        <tr onclick="openModal('modal-Cardstock-issue-new')">
          <td><b>${v}</b></td><td class="muted">${dt}</td>
          <td style="font-family:monospace;font-size:11px">${code}</td><td style="font-size:12px">${name}</td>
          <td class="muted" style="font-size:11px">${qual}</td><td class="text-center muted" style="font-size:11px">${gsm}</td>
          <td style="font-family:monospace;font-size:11px;color:var(--primary)">${kp}</td>
          <td style="font-size:11px">${bn}</td><td class="muted" style="font-size:11px">${su}</td>
          <td class="text-right font-bold">${qty}</td>
          <td style="font-size:11px">${dept}</td><td class="muted" style="font-size:11px">${floor}</td>
          <td style="font-size:11px">${jc}</td><td class="muted" style="font-size:11px">${content}</td>
          <td class="muted" style="font-size:11px">${by}</td>
          <td class="actions-cell"><button class="btn btn-ghost btn-icon btn-sm"><i class="bi bi-eye"></i></button></td>
        </tr>`).join('')}
      </tbody>
    </table>
    <div class="grid-footer"><span>Showing 2 of 88 issues</span></div>
  </div>
</div>
<div class="modal-overlay hidden" id="modal-Cardstock-issue-new">
  <div class="modal modal-lg">
    <div class="modal-header"><div class="modal-icon"><i class="bi bi-Deck-arrow-up-right"></i></div>
      <div><div class="modal-title">New Cardstock Issue</div><div class="modal-sub">Select reels by item or by job — choose specific batches</div></div>
      <button class="modal-close" onclick="closeModal('modal-Cardstock-issue-new')"><i class="bi bi-x"></i></button>
    </div>
    <div class="modal-body">
      <div class="form-row cols-3">
        <div class="field-group"><label class="field-label required">Date</label><input class="form-input" type="date" value="2026-06-30" /></div>
        <div class="field-group"><label class="field-label">Department</label><select class="form-select"><option>Playing Card</option><option>Printing</option></select></div>
        <div class="field-group"><label class="field-label required">Floor Warehouse / Bin</label><select class="form-select"><option>Floor A — Bin F1</option></select></div>
      </div>
      <div class="form-row cols-3">
        <div class="field-group"><label class="field-label">Job Card No (optional)</label><input class="form-input" placeholder="Link to job card..." /></div>
        <div class="field-group"><label class="field-label">Content Name</label><input class="form-input" placeholder="e.g. Top Liner" /></div>
        <div class="field-group"><label class="field-label">Direct Consume</label>
          <label style="display:flex;align-items:center;gap:6px;margin-top:8px"><input type="checkbox" /> Skip floor, consume directly</label>
        </div>
      </div>
      <div class="form-section-title"><i class="bi bi-table"></i> Issue Lines (select batches)</div>
      <table class="line-table">
        <thead><tr><th>Cardstock Code</th><th>Item Name</th><th>KP Cardstock No (batch)</th><th>Batch No</th><th>Warehouse / Bin</th><th>Avail Stock (kg)</th><th>Issue Qty (kg)</th><th>Remark</th></tr></thead>
        <tbody>
          <tr>
            <td><select class="form-select" style="font-size:11px;padding:3px 5px;min-width:120px"><option>KR-150-1200</option></select></td>
            <td style="font-size:11px">Art Paper Liner 150</td>
            <td><select class="form-select" style="font-size:11px;padding:3px 5px;min-width:110px"><option>KP-2026-001</option></select></td>
            <td style="font-size:11px">BIL-JUN-1</td>
            <td style="font-size:11px">Godown A — Bin A1</td>
            <td class="text-right font-bold" style="font-size:11px;color:var(--color-success-text)">820 kg</td>
            <td><input class="form-input" type="number" value="820" style="width:60px;padding:3px 5px;font-size:11px" /></td>
            <td><input class="form-input" placeholder="..." style="width:70px;padding:3px 5px;font-size:11px" /></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal('modal-Cardstock-issue-new')">Cancel</button>
      <button class="btn btn-save"><i class="bi bi-check-lg"></i> Issue Reels</button>
    </div>
  </div>
</div>`);

  // Cardstock Return (NEW - was missing)
  ca.insertAdjacentHTML('beforeend', `
<div class="page" id="page-Cardstock-return">
  <div class="page-header">
    <div><div class="page-title">Cardstock Return</div><div class="page-subtitle">Return unused reels from floor back to store</div></div>
    <div class="page-actions">
      <button class="btn btn-create" onclick="openModal('modal-Cardstock-return-new')"><i class="bi bi-plus"></i> New Return</button>
    </div>
  </div>
  <div class="toolbar">
    <div class="toolbar-left">
      <div class="search-input-wrap"><i class="bi bi-search"></i><input class="search-input" placeholder="Return voucher, KP no..." /></div>
      <select class="form-select" style="width:150px;padding:5px 8px"><option>All Departments</option><option>Playing Card</option><option>Printing</option></select>
    </div>
    <div class="toolbar-right">
      <button class="btn btn-secondary btn-sm">View Floor Stock</button>
    </div>
  </div>
  <div class="grid-wrap">
    <table class="data-table">
      <thead><tr><th>Voucher No</th><th>Date</th><th>Cardstock Code</th><th>Item Name</th><th>KP Cardstock No</th><th>Batch No</th><th>Quality</th><th>GSM</th><th>Return Qty (kg)</th><th>Stock Unit</th><th>Department</th><th>Remark</th><th>Created By</th></tr></thead>
      <tbody>
        <tr onclick="openModal('modal-Cardstock-return-new')">
          <td><b>RT-2026-012</b></td><td class="muted">28 Jun</td>
          <td style="font-family:monospace;font-size:11px">KR-150-1200</td><td>Art Paper Liner 150</td>
          <td style="font-family:monospace;font-size:11px;color:var(--primary)">KP-2026-002</td>
          <td style="font-size:11px">BIL-JUN-2</td>
          <td class="muted" style="font-size:11px">Art Paper</td><td class="text-center muted" style="font-size:11px">150</td>
          <td class="text-right font-bold">85</td><td class="muted">KG</td><td>Playing Card</td><td class="muted" style="font-size:11px">Excess returned</td><td class="muted" style="font-size:11px">Ramesh S.</td>
        </tr>
      </tbody>
    </table>
    <div class="grid-footer"><span>Showing 1 of 12 returns</span></div>
  </div>
</div>
<div class="modal-overlay hidden" id="modal-Cardstock-return-new">
  <div class="modal modal-md">
    <div class="modal-header"><div class="modal-icon"><i class="bi bi-arrow-return-left"></i></div>
      <div><div class="modal-title">New Cardstock Return</div><div class="modal-sub">Return unused floor reels to store</div></div>
      <button class="modal-close" onclick="closeModal('modal-Cardstock-return-new')"><i class="bi bi-x"></i></button>
    </div>
    <div class="modal-body">
      <div class="form-row cols-2">
        <div class="field-group"><label class="field-label required">Date</label><input class="form-input" type="date" value="2026-06-30" /></div>
        <div class="field-group"><label class="field-label">Department</label><select class="form-select"><option>Playing Card</option><option>Printing</option></select></div>
      </div>
      <div class="field-group"><label class="field-label">Remark</label><textarea class="form-textarea" style="min-height:48px" placeholder="Return reason..."></textarea></div>
      <div class="form-section-title"><i class="bi bi-table"></i> Floor Stock — Select Reels to Return</div>
      <table class="line-table">
        <thead><tr><th>Cardstock Code</th><th>Item</th><th>KP Cardstock No</th><th>Batch No</th><th>Quality</th><th>GSM</th><th>Floor Stock (kg)</th><th>Return Qty (kg)</th><th>Remark</th></tr></thead>
        <tbody>
          <tr>
            <td style="font-size:11px">KR-150-1200</td><td style="font-size:11px">Art Paper Liner 150</td>
            <td style="font-family:monospace;font-size:11px;color:var(--primary)">KP-2026-002</td>
            <td style="font-size:11px">BIL-JUN-2</td>
            <td class="muted" style="font-size:11px">Art Paper</td><td class="text-center muted" style="font-size:11px">150</td>
            <td class="text-right font-bold" style="color:var(--color-success-text)">85</td>
            <td><input class="form-input" type="number" value="85" style="width:60px;padding:3px 5px;font-size:11px" /></td>
            <td><input class="form-input" placeholder="..." style="width:90px;padding:3px 5px;font-size:11px" /></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal('modal-Cardstock-return-new')">Cancel</button>
      <button class="btn btn-save"><i class="bi bi-check-lg"></i> Save Return</button>
    </div>
  </div>
</div>`);

  // Cardstock Stock Report
  ca.insertAdjacentHTML('beforeend', `
<div class="page" id="page-Cardstock-stock">
  <div class="page-header">
    <div><div class="page-title">Cardstock Stock Report</div><div class="page-subtitle">Item-wise and batch-wise Cardstock stock with ageing, expiry and allocation status</div></div>
    <div class="page-actions">
      <button class="btn btn-secondary btn-sm"><i class="bi bi-download"></i> Export</button>
    </div>
  </div>
  <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin-bottom:14px">
    ${[['Total Items','12','#003366'],['Total Reels','142','#3b82f6'],['Total Weight','48,600 kg','#22c55e'],['Near Expiry (<30d)','8','#f59e0b'],['Below Min Stock','3','#ef4444']].map(([l,v,c]) => `
    <div style="background:#fff;border:1px solid var(--bd-default);border-radius:8px;padding:12px 14px;border-top:3px solid ${c};Deck-shadow:var(--shadow-sm);text-align:center">
      <div style="font-size:20px;font-weight:800;color:${c}">${v}</div>
      <div style="font-size:11px;color:var(--fg-muted)">${l}</div>
    </div>`).join('')}
  </div>
  <div class="toolbar">
    <div class="toolbar-left">
      <div class="seg-tabs">
        <div class="seg-tab active">Item-wise (Total)</div>
        <div class="seg-tab">Batch-wise Detail</div>
      </div>
      <select class="form-select" style="width:130px;padding:5px 8px"><option>All Groups</option><option>Liner</option><option>Core</option></select>
      <select class="form-select" style="width:140px;padding:5px 8px"><option>All Warehouses</option><option>Godown A</option><option>Godown B</option></select>
    </div>
  </div>
  <div class="grid-wrap">
    <table class="data-table">
      <thead>
        <tr>
          <th>Cardstock Code</th><th>Item Name</th><th>Group</th><th>Quality</th><th>Finish</th><th>GSM</th><th>Width (mm)</th><th>Finish</th>
          <th>Min Stock</th><th>Reorder Qty</th>
          <th>Closing Stock</th><th>Allocated</th><th>Booked</th><th>Floor Stock</th><th>Incoming</th><th>Req. Stock</th><th>Free Stock</th>
          <th>Cardstock Count</th><th></th>
        </tr>
      </thead>
      <tbody>
        ${[
          ['KR-150-1200','Art Paper Liner 150 GSM','Liner','Art Paper','26','150','1200','Plain','2,000','5,000','8,200','2,000','1,500','820','5,000','3,500','2,700','10'],
          ['Finish-120-1200','Finish Medium 120 GSM','Core','Finish','18','120','1200','Plain','1,500','3,000','6,500','1,000','800','3,000','3,000','2,000','1,700','8'],
          ['KR-150-900','Art Paper Liner 150 GSM 900','Liner','Art Paper','26','150','900','Plain','1,000','2,000','2,100','500','200','750','1,500','800','650','3'],
          ['TL-160-1350','Test Liner 160 GSM','Liner','Test','22','160','1350','Plain','500','1,000','480','—','—','200','2,000','2,000','280','1'],
        ].map(([code,name,grp,qual,bf,gsm,wid,fin,min,reord,cls,alloc,book,floor,incoming,req,free,reelcnt]) => {
          const lowStock = parseInt(cls.replace(/,/g,'')) < parseInt(min.replace(/,/g,''));
          return `<tr onclick="openModal('modal-Cardstock-batch-detail')">
            <td style="font-family:monospace;font-size:11px">${code}</td>
            <td style="font-size:12px">${name}</td>
            <td><span class="tag tag-navy" style="font-size:10px">${grp}</span></td>
            <td class="muted" style="font-size:11px">${qual}</td>
            <td class="text-center muted" style="font-size:11px">${bf}</td>
            <td class="text-center muted" style="font-size:11px">${gsm}</td>
            <td class="text-right muted" style="font-size:11px">${wid}</td>
            <td class="muted" style="font-size:11px">${fin}</td>
            <td class="text-right muted">${min}</td>
            <td class="text-right muted">${reord}</td>
            <td class="text-right font-bold" style="color:${lowStock?'var(--color-error-text)':'inherit'}">${cls}</td>
            <td class="text-right muted">${alloc}</td>
            <td class="text-right muted">${book}</td>
            <td class="text-right" style="color:var(--color-warning-text);font-weight:600">${floor}</td>
            <td class="text-right muted">${incoming}</td>
            <td class="text-right muted">${req}</td>
            <td class="text-right" style="font-weight:700;color:var(--color-success-text)">${free}</td>
            <td class="text-center">${reelcnt}</td>
            <td class="actions-cell"><button class="btn btn-ghost btn-icon btn-sm" onclick="event.stopPropagation();openModal('modal-Cardstock-batch-detail')"><i class="bi bi-list-ul"></i></button></td>
          </tr>`;
        }).join('')}
      </tbody>
    </table>
  </div>
</div>
<div class="modal-overlay hidden" id="modal-Cardstock-batch-detail">
  <div class="modal modal-xl">
    <div class="modal-header"><div class="modal-icon"><i class="bi bi-layers"></i></div>
      <div><div class="modal-title">KR-150-1200 — Batch-wise Detail</div><div class="modal-sub">Art Paper Liner 150 GSM | 1200mm | Total: 8,200 kg in 10 reels</div></div>
      <button class="modal-close" onclick="closeModal('modal-Cardstock-batch-detail')"><i class="bi bi-x"></i></button>
    </div>
    <div class="modal-body">
      <table class="line-table">
        <thead><tr><th>KP Cardstock No</th><th>Batch No</th><th>Sup. Batch No</th><th>Mill Cardstock No</th><th>Mill</th><th>Closing Stock (kg)</th><th>GRN No</th><th>GRN Date</th><th>Warehouse / Bin</th><th>Mfg Date</th><th>Expiry Date</th><th>Shelf Life</th><th>Ageing (days)</th><th>Days to Expiry</th><th>Stock State</th></tr></thead>
        <tbody>
          ${[
            ['KP-2026-001','BIL-JUN-1','SUP-1','MILL-RN-1001','TNPL','820','GRN-042','28 Jun','Godown A — A1','01 May 2026','01 Nov 2026','180','32','124','In Store'],
            ['KP-2026-002','BIL-JUN-2','SUP-2','MILL-RN-1002','TNPL','835','GRN-042','28 Jun','Floor A — F1','01 May 2026','01 Nov 2026','180','32','124','Floor'],
            ['KP-2026-003','BIL-JUN-3','SUP-3','MILL-RN-1003','TNPL','845','GRN-042','28 Jun','Godown A — A2','01 May 2026','01 Nov 2026','180','32','124','In Store'],
          ].map(([kp,bn,sbn,mrn,mill,stk,grn,gdt,wh,mfg,exp,sl,age,dte,state]) => `
          <tr>
            <td style="font-family:monospace;font-size:11px;color:var(--primary)">${kp}</td>
            <td style="font-size:11px">${bn}</td><td class="muted" style="font-size:11px">${sbn}</td>
            <td class="muted" style="font-size:11px">${mrn}</td><td class="muted" style="font-size:11px">${mill}</td>
            <td class="text-right font-bold">${stk}</td>
            <td style="font-size:11px">${grn}</td><td class="muted" style="font-size:11px">${gdt}</td>
            <td style="font-size:11px">${wh}</td>
            <td class="muted" style="font-size:11px">${mfg}</td><td class="muted" style="font-size:11px">${exp}</td>
            <td class="text-center muted" style="font-size:11px">${sl}</td>
            <td class="text-center" style="font-size:11px;color:var(--color-success-text);font-weight:600">${age}</td>
            <td class="text-center" style="font-size:11px">${dte}</td>
            <td><span class="tag tag-${state==='In Store'?'green':'blue'}" style="font-size:10px">${state}</span></td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal('modal-Cardstock-batch-detail')">Close</button>
      <button class="btn btn-print"><i class="bi bi-printer"></i> Print Sticker</button>
    </div>
  </div>
</div>`);

  // ─── Ink/Coating / BOARD ───────────────────────────────────────────────────

  const paperPages = [
    {id:'Ink/Coating-req', title:'Ink/Coating Requisition', sub:'Ink/Coating / board stock indent for production'},
    {id:'Ink/Coating-po', title:'Ink/Coating Purchase Order', sub:'PO to supplier with price, GST and delivery terms'},
    {id:'Ink/Coating-receipt', title:'Ink/Coating GRN / Receipt', sub:'Goods Receipt Note — Ink/Coating batch tracking, warehouse assignment'},
    {id:'Ink/Coating-issue', title:'Ink/Coating Issue', sub:'Issue Ink/Coating boards to floor department'},
    {id:'Ink/Coating-return', title:'Ink/Coating Return', sub:'Return unused Ink/Coating boards from floor back to store'},
    {id:'Ink/Coating-stock', title:'Ink/Coating Stock Report', sub:'Item-wise and batch-wise Ink/Coating stock with ageing and allocation'},
  ];
  const paperCols = {
    'Ink/Coating-req':['Voucher No','Date','Ink/Coating Code','Item Name','Group','Quality','GSM','Size W','Size L','Finish','Req Qty','Ordered Qty','Received Qty','PO Nos','Stage','Created By'],
    'Ink/Coating-po':['PO No','Date','Supplier','Ink/Coating Code','Item Name','Quality','GSM','Size','Ordered Qty','Rate','Total Amt','Received Qty','Pending Qty','Receipt Status','Req No','Created By'],
    'Ink/Coating-receipt':['GRN No','Date','Supplier','Challan No','Challan Date','Gate Entry No','Vehicle No','Transporter','PO No','Ink/Coating Code','Item Name','GSM','Receipt Qty','Batch No','Warehouse','Created By'],
    'Ink/Coating-issue':['Voucher No','Date','Ink/Coating Code','Item Name','Quality','GSM','Stock Unit','Issued Qty','Dept','Floor / Bin','Job Card No','Created By'],
    'Ink/Coating-return':['Voucher No','Date','Ink/Coating Code','Item Name','Quality','GSM','Return Qty','Stock Unit','Department','Remark','Created By'],
    'Ink/Coating-stock':['Ink/Coating Code','Item Name','Group','Quality','GSM','Size W','Size L','Finish','Min Stock','Reorder Qty','Closing Stock','Allocated','Booked','Floor Stock','Incoming','Free Stock','Batch Count'],
  };
  const paperRows = {
    'Ink/Coating-req':[['PR-P-2026-042','28 Jun','BD-250-760×1010','Board 250 GSM','Board','Ivory','250','760','1010','Plain','500 sht','500','—','—','PR Pending','Arun T.']],
    'Ink/Coating-po':[['PP-2026-031','27 Jun','Ballarpur','BD-250-760×1010','Board 250 GSM','Ivory','250','760×1010','500 sht','₹4.80/sht','₹2,400','—','500','Pending PO','PR-P-042','Arun T.']],
    'Ink/Coating-receipt':[['GRN-P-2026-018','28 Jun','Ballarpur','BIL/PB/2026/221','25 Jun','GE-P-2026-088','MH12 AB 1234','Self','PP-031','BD-250-760×1010','Board 250 GSM','250','500','BTN-001','Godown A','Store Mgr']],
    'Ink/Coating-issue':[['PI-2026-055','28 Jun','BD-250-760×1010','Board 250 GSM','Ivory','250','SHT','200','Printing','Floor B','JC-2026-089','Arun T.']],
    'Ink/Coating-return':[['PTR-2026-008','27 Jun','BD-250-760×1010','Board 250 GSM','Ivory','250','40','SHT','Printing','Excess after job','Arun T.']],
    'Ink/Coating-stock':[['BD-250-760×1010','Board 250 GSM','Board','Ivory','250','760','1010','Plain','200 sht','500 sht','500 sht','—','—','200 sht','—','300 sht','1'],
                   ['MG-80-580×880','Maplitho 80 GSM','Ink/Coating','Maplitho','80','580','880','Plain','500 sht','1,000 sht','1,200 sht','—','200 sht','—','—','1,000 sht','2']],
  };

  paperPages.forEach(pg => {
    const cols = paperCols[pg.id];
    const rows = paperRows[pg.id];
    const modalId = 'modal-'+pg.id+'-new';
    ca.insertAdjacentHTML('beforeend', `
<div class="page" id="page-${pg.id}">
  <div class="page-header">
    <div><div class="page-title">${pg.title}</div><div class="page-subtitle">${pg.sub}</div></div>
    <div class="page-actions">
      <button class="btn btn-secondary btn-sm"><i class="bi bi-download"></i> Export</button>
      <button class="btn btn-create" onclick="openModal('${modalId}')"><i class="bi bi-plus"></i> New</button>
    </div>
  </div>
  <div class="toolbar">
    <div class="toolbar-left">
      <div class="search-input-wrap"><i class="bi bi-search"></i><input class="search-input" placeholder="Search..." /></div>
    </div>
    <div class="toolbar-right">
      <input class="form-input" type="date" value="2026-06-01" style="width:130px;padding:5px 8px" />
      <input class="form-input" type="date" value="2026-06-30" style="width:130px;padding:5px 8px" />
    </div>
  </div>
  <div class="grid-wrap">
    <table class="data-table">
      <thead><tr>${cols.map(c=>`<th>${c}</th>`).join('')}<th></th></tr></thead>
      <tbody>
        ${rows.map(r=>`<tr onclick="openModal('${modalId}')">${r.map(c=>`<td style="font-size:12px">${c}</td>`).join('')}
          <td class="actions-cell">
            <button class="btn btn-ghost btn-icon btn-sm" onclick="event.stopPropagation()"><i class="bi bi-eye"></i></button>
            <button class="btn btn-edit btn-icon btn-sm" onclick="event.stopPropagation()"><i class="bi bi-pencil"></i></button>
            <button class="btn btn-delete btn-icon btn-sm" onclick="event.stopPropagation()"><i class="bi bi-trash"></i></button>
          </td>
        </tr>`).join('')}
      </tbody>
    </table>
    <div class="grid-footer"><span>Showing ${rows.length} records</span></div>
  </div>
</div>
<div class="modal-overlay hidden" id="${modalId}">
  <div class="modal modal-md">
    <div class="modal-header"><div class="modal-icon"><i class="bi bi-file-earmark-text"></i></div>
      <div><div class="modal-title">${pg.title}</div><div class="modal-sub">${pg.sub}</div></div>
      <button class="modal-close" onclick="closeModal('${modalId}')"><i class="bi bi-x"></i></button>
    </div>
    <div class="modal-body">
      <div class="form-row cols-2">
        <div class="field-group"><label class="field-label required">Date</label><input class="form-input" type="date" value="2026-06-30" /></div>
        <div class="field-group"><label class="field-label">Remark</label><input class="form-input" placeholder="Narration..." /></div>
      </div>
      <div class="field-group"><label class="field-label required">Ink/Coating Code / Item</label>
        <select class="form-select"><option>BD-250-760×1010 — Board 250 GSM</option><option>MG-80-580×880 — Maplitho 80 GSM</option></select></div>
      <div class="form-row cols-3">
        <div class="field-group"><label class="field-label">Quality</label><input class="form-input" value="Ivory" readonly style="background:var(--bg-subtle)" /></div>
        <div class="field-group"><label class="field-label">GSM</label><input class="form-input" value="250" readonly style="background:var(--bg-subtle)" /></div>
        <div class="field-group"><label class="field-label">Size</label><input class="form-input" value="760×1010 mm" readonly style="background:var(--bg-subtle)" /></div>
      </div>
      <div class="form-row cols-2">
        <div class="field-group"><label class="field-label required">Quantity</label><input class="form-input" type="number" placeholder="Qty" /></div>
        <div class="field-group"><label class="field-label">Expected Delivery</label><input class="form-input" type="date" /></div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal('${modalId}')">Cancel</button>
      <button class="btn btn-save"><i class="bi bi-check-lg"></i> Save</button>
    </div>
  </div>
</div>`);
  });
});
