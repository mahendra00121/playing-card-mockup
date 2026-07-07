document.addEventListener('DOMContentLoaded', () => {
  const ca = document.getElementById('contentArea');
  const tag = (c, t) => `<span class="tag tag-${c}" style="font-size:10px">${t}</span>`;
  const fi = (label, type='text', req=false, placeholder='') =>
    `<div class="field-group"><label class="field-label${req?' required':''}">${label}</label>
     <input class="form-input" type="${type}" placeholder="${placeholder||label+'...'}" /></div>`;
  const fs = (label, opts=[], req=false) =>
    `<div class="field-group"><label class="field-label${req?' required':''}">${label}</label>
     <select class="form-select">${opts.map(o=>`<option>${o}</option>`).join('')}</select></div>`;
  const fchk = (label, checked=false) =>
    `<label style="display:flex;align-items:center;gap:6px;font-size:12px;cursor:pointer"><input type="checkbox" ${checked?'checked':''} /> ${label}</label>`;

  const LEDGER_ADDR_FIELDS = () => `
    <div class="form-section-title" style="margin-top:10px"><i class="bi bi-geo-alt"></i> Address</div>
    <div class="form-row cols-2">
      ${fi('Address 1')} ${fi('Address 2')}
    </div>
    <div class="form-row cols-4">
      ${fs('Country',['India','UAE','USA','UK','Singapore'])}
      ${fs('State',['Gujarat','Maharashtra','Tamil Nadu','Rajasthan','Delhi','Karnataka','UP'])}
      ${fi('City')} ${fi('District / Province')}
    </div>
    <div class="form-row cols-2">
      ${fi('Pincode','text',false,'6-digit PIN')}
      ${fi('Phone No.','tel',false,'Landline number')}
    </div>`;

  const LEDGER_GST_FIELDS = () => `
    <div class="form-section-title" style="margin-top:10px"><i class="bi bi-receipt"></i> GST & Tax</div>
    <div class="form-row cols-4">
      ${fi('PAN No.')} ${fi('GST No.')}
      <div class="field-group"><label class="field-label">GST Applicable</label><div style="margin-top:8px">${fchk('GST Applicable',true)}</div></div>
      ${fs('GST Reg. Type',['Registered Regular','Unregistered','Composition','SEZ Unit','Export'])}
    </div>`;

  // ─── CUSTOMER LEDGER ─────────────────────────────────────────────────
  ca.insertAdjacentHTML('beforeend', `
<div class="page" id="page-m-ledger-customer">
  <div class="page-header">
    <div><div class="page-title">Customer Ledger (Debtors)</div><div class="page-subtitle">Client accounts — billing address, GST, supGSM type, credit days and ledger ref</div></div>
    <div class="page-actions">
      <button class="btn btn-secondary btn-sm"><i class="bi bi-download"></i> Export</button>
      <button class="btn btn-create" onclick="openModal('modal-m-ledger-customer')"><i class="bi bi-plus"></i> Add Customer</button>
    </div>
  </div>
  <div class="toolbar"><div class="toolbar-left">
    <div class="search-input-wrap"><i class="bi bi-search"></i><input class="search-input" placeholder="Client name, GST, city..." /></div>
    <select class="form-select" style="width:130px;padding:5px 8px"><option>All SupGSM Types</option><option>Domestic</option><option>Export</option><option>SEZ</option></select>
    <select class="form-select" style="width:120px;padding:5px 8px"><option>All States</option><option>Gujarat</option><option>Maharashtra</option></select>
  </div></div>
  <div class="grid-wrap">
    <table class="data-table">
      <thead><tr><th>Client Name</th><th>Mailing Name</th><th>Job Coordinator</th><th>Address 1</th><th>Address 2</th><th>District</th><th>City</th><th>State</th><th>Country</th><th>Pincode</th><th>Mobile No.</th><th>Phone No.</th><th>Email</th><th>GST No.</th><th>Credit Days</th><th>Legal Name</th><th>Remarks</th><th>Is Active</th><th></th></tr></thead>
      <tbody>
        ${[['Amul Dairy','Amul Dairy Co.','Rajesh Kumar','P.O. Amul Dairy','Anand Road','Anand','Anand','Gujarat','India','388001','98765 43210','02692-258000','rajesh@amul.com','24AAACA0001A1Z5','45','Gujarat Cooperative Milk','Regular',true],
           ['ITC Limited','ITC Ltd','Sunita Shah','ITC Centre','Mount Road','Chennai','Chennai','Tamil Nadu','India','600002','98766 43211','044-28501234','sunita@itc.in','33AAACI0001A1Z2','30','ITC Limited — FMCG','Export',true],
           ['Hindustan Unilever','HUL','Amit Patel','Unilever House','BC Road','Mumbai','Mumbai','Maharashtra','India','400079','98767 43212','022-39832000','amit@hul.com','27AADCH0001A1Z0','60','HUL Ltd.','Priority',true],
        ].map(([cn,mn,jc,a1,a2,dist,city,st,cntry,pin,mob,ph,em,gst,cd,legal,rem,active])=>`
        <tr onclick="openModal('modal-m-ledger-customer')">
          <td><b>${cn}</b></td>
          <td class="muted" style="font-size:11px">${mn}</td>
          <td style="font-size:11px">${jc}</td>
          <td style="font-size:11px">${a1}</td>
          <td class="muted" style="font-size:11px">${a2}</td>
          <td class="muted" style="font-size:11px">${dist}</td>
          <td style="font-size:11px">${city}</td>
          <td class="muted" style="font-size:11px">${st}</td>
          <td class="muted" style="font-size:11px">${cntry}</td>
          <td class="muted" style="font-size:11px">${pin}</td>
          <td style="font-size:11px">${mob}</td>
          <td class="muted" style="font-size:11px">${ph}</td>
          <td style="font-size:11px">${em}</td>
          <td style="font-family:monospace;font-size:10px">${gst}</td>
          <td class="text-center">${cd}d</td>
          <td class="muted" style="font-size:11px">${legal}</td>
          <td class="muted" style="font-size:11px">${rem}</td>
          <td>${tag(active?'green':'red',active?'Active':'Inactive')}</td>
          <td class="actions-cell"><button class="btn btn-edit btn-icon btn-sm" onclick="event.stopPropagation()"><i class="bi bi-pencil"></i></button><button class="btn btn-delete btn-icon btn-sm" onclick="event.stopPropagation()"><i class="bi bi-trash"></i></button></td>
        </tr>`).join('')}
      </tbody>
    </table>
    <div class="grid-footer"><span>Showing 3 of 84 customers</span></div>
  </div>
</div>
<div class="modal-overlay hidden" id="modal-m-ledger-customer">
  <div class="modal modal-xl">
    <div class="modal-header"><div class="modal-icon"><i class="bi bi-person-vcard"></i></div>
      <div><div class="modal-title">Add / Edit Customer Ledger</div><div class="modal-sub">Billing name, legal name, address, GST, supGSM type, credit days and ledger ref</div></div>
      <button class="modal-close" onclick="closeModal('modal-m-ledger-customer')"><i class="bi bi-x"></i></button>
    </div>
    <div class="modal-body">
      <div class="form-section-title"><i class="bi bi-info-circle"></i> Basic Details</div>
      <div class="form-row cols-3">
        ${fi('Client Name','text',true)} ${fi('Mailing / Trade Name','text',true)} ${fi('Legal Name','text',true)}
      </div>
      <div class="form-row cols-3">
        ${fi('Contact Person Name')} ${fi('Mobile No.','tel',true)} ${fi('Email','email')}
      </div>
      ${LEDGER_ADDR_FIELDS()}
      ${LEDGER_GST_FIELDS()}
      <div class="form-section-title" style="margin-top:10px"><i class="bi bi-currency-rupee"></i> Trade & Credit</div>
      <div class="form-row cols-3">
        ${fs('SupGSM Type',['Domestic','Export','Deemed Export','SEZ'],'true')}
        ${fs('Sales Person',['Priya Mehta','Vikram Singh','Deepa Ranpura'])}
        ${fs('Sales Representative',['Rep-1 (East)','Rep-2 (West)','Rep-3 (North)'])}
      </div>
      <div class="form-row cols-4">
        ${fs('Currency',['INR — ₹','USD — $','EUR — €','GBP — £'])}
        ${fi('Credit Days','number',false,'e.g. 45')}
        ${fi('Ledger Ref Code','text',true,'Tally/Accounting code')}
        ${fi('Ledger Ref Name','text',true,'Ledger name in accounts')}
      </div>
      <div class="form-row cols-2">
        <div class="field-group"><label class="field-label">Remarks</label><textarea class="form-textarea" style="min-height:48px"></textarea></div>
        <div class="field-group"><label class="field-label">Status</label><div style="display:flex;flex-direction:column;gap:8px;margin-top:8px">${fchk('Is Active',true)}</div></div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal('modal-m-ledger-customer')">Cancel</button>
      <button class="btn btn-save"><i class="bi bi-check-lg"></i> Save Customer</button>
    </div>
  </div>
</div>`);

  // ─── SUPPLIER LEDGER ─────────────────────────────────────────────────
  ca.insertAdjacentHTML('beforeend', `
<div class="page" id="page-m-ledger-supplier">
  <div class="page-header">
    <div><div class="page-title">Supplier Ledger (Creditors)</div><div class="page-subtitle">Supplier accounts — vendor role, bank details, MICR code, payment terms and ledger ref</div></div>
    <div class="page-actions">
      <button class="btn btn-secondary btn-sm"><i class="bi bi-download"></i> Export</button>
      <button class="btn btn-create" onclick="openModal('modal-m-ledger-supplier')"><i class="bi bi-plus"></i> Add Supplier</button>
    </div>
  </div>
  <div class="grid-wrap">
    <table class="data-table">
      <thead><tr><th>Supplier Name</th><th>Mailing Name</th><th>Address 1</th><th>District</th><th>City</th><th>State</th><th>Country</th><th>Pincode</th><th>Mobile No.</th><th>Phone No.</th><th>Email</th><th>GST No.</th><th>Is Vendor</th><th>Is Active</th><th>Legal Name</th><th>SupGSM Type</th><th>Remarks</th><th></th></tr></thead>
      <tbody>
        ${[['BILT Ink/Coating Mills','BILT','Industrial Area','Yamunanagar','Yamunanagar','Haryana','India','135001','98770 43210','01732-270000','purchase@bilt.com','06AAACB0001A1Z3',true,true,'Ballarpur Industries','Domestic','Main Cardstock supplier'],
           ['JK Ink/Coating Ltd','JK Ink/Coating','Ink/Coating Mill Road','Rayagada','Rayagada','Odisha','India','765001','98771 43211','06856-220000','jk@jkpaper.com','21AADCJ0001A1Z1',true,true,'JK Ink/Coating Ltd','Domestic','Art Paper liner'],
           ['Photon Dies','Photon','GIDC Phase-3','Vadodara','Vadodara','Gujarat','India','390010','98772 43212','0265-2354000','photon@dies.com','24AABCP0001A1Z8',false,true,'Photon Tools Pvt Ltd','Domestic','Die supplier'],
        ].map(([sn,mn,a1,dist,city,st,cntry,pin,mob,ph,em,gst,isVend,active,legal,supType,rem])=>`
        <tr onclick="openModal('modal-m-ledger-supplier')">
          <td><b>${sn}</b></td>
          <td class="muted" style="font-size:11px">${mn}</td>
          <td style="font-size:11px">${a1}</td>
          <td class="muted" style="font-size:11px">${dist}</td>
          <td style="font-size:11px">${city}</td>
          <td class="muted" style="font-size:11px">${st}</td>
          <td class="muted" style="font-size:11px">${cntry}</td>
          <td class="muted" style="font-size:11px">${pin}</td>
          <td style="font-size:11px">${mob}</td>
          <td class="muted" style="font-size:11px">${ph}</td>
          <td style="font-size:11px">${em}</td>
          <td style="font-family:monospace;font-size:10px">${gst}</td>
          <td class="text-center">${tag(isVend?'green':'gray',isVend?'Yes':'No')}</td>
          <td>${tag(active?'green':'red',active?'Active':'Inactive')}</td>
          <td class="muted" style="font-size:11px">${legal}</td>
          <td style="font-size:11px">${supType}</td>
          <td class="muted" style="font-size:11px">${rem}</td>
          <td class="actions-cell"><button class="btn btn-edit btn-icon btn-sm" onclick="event.stopPropagation()"><i class="bi bi-pencil"></i></button><button class="btn btn-delete btn-icon btn-sm" onclick="event.stopPropagation()"><i class="bi bi-trash"></i></button></td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>
</div>
<div class="modal-overlay hidden" id="modal-m-ledger-supplier">
  <div class="modal modal-xl">
    <div class="modal-header"><div class="modal-icon"><i class="bi bi-truck-flatbed"></i></div>
      <div><div class="modal-title">Add / Edit Supplier Ledger</div><div class="modal-sub">Vendor role, address, GST, bank details, MICR, payment terms and ledger ref</div></div>
      <button class="modal-close" onclick="closeModal('modal-m-ledger-supplier')"><i class="bi bi-x"></i></button>
    </div>
    <div class="modal-body">
      <div class="form-section-title"><i class="bi bi-info-circle"></i> Basic Details</div>
      <div class="form-row cols-3">
        ${fi('Supplier Name','text',true)} ${fi('Mailing / Trade Name','text',true)} ${fi('Legal Name','text',true)}
      </div>
      <div class="form-row cols-4">
        ${fs('Supplier Registration',['Proprietorship','Partnership','Pvt Ltd','Ltd','LLP','Individual'])}
        ${fs('Vendor Role',['Manufacturer','Trader','Service Provider','Agent'])}
        <div class="field-group"><label class="field-label">Is Vendor</label><div style="margin-top:8px">${fchk('Mark as Vendor',true)}</div></div>
        <div></div>
      </div>
      <div class="form-row cols-2">
        ${fi('Mobile No.','tel',true)} ${fi('Email','email')}
      </div>
      ${LEDGER_ADDR_FIELDS()}
      ${LEDGER_GST_FIELDS()}
      <div class="form-section-title" style="margin-top:10px"><i class="bi bi-bank"></i> Bank Details</div>
      <div class="form-row cols-4">
        ${fi('Bank Name')} ${fi('Bank A/C No.')} ${fi('IFSC Code')} ${fi('MICR Code','text',false,'9-digit MICR')}
      </div>
      <div class="form-section-title" style="margin-top:10px"><i class="bi bi-currency-rupee"></i> Payment Terms</div>
      <div class="form-row cols-4">
        ${fs('SupGSM Type',['Domestic','Import','SEZ','Deemed Export'],'true')}
        ${fs('Currency',['INR — ₹','USD — $','EUR — €'])}
        ${fs('Payment Terms',['Immediate','Net 30','Net 45','Net 60','Advance'])}
        ${fi('Credit Days','number')}
      </div>
      <div class="form-row cols-2">
        ${fi('Ledger Ref Code','text',true,'Tally/Accounting code')}
        <div class="field-group"><label class="field-label">Remarks</label><textarea class="form-textarea" style="min-height:40px"></textarea></div>
      </div>
      <div style="margin-top:6px">${fchk('Is Active',true)}</div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal('modal-m-ledger-supplier')">Cancel</button>
      <button class="btn btn-save"><i class="bi bi-check-lg"></i> Save Supplier</button>
    </div>
  </div>
</div>`);

  // ─── TRANSPORTER LEDGER ───────────────────────────────────────────────
  ca.insertAdjacentHTML('beforeend', `
<div class="page" id="page-m-ledger-transporter">
  <div class="page-header">
    <div><div class="page-title">Transporter Ledger</div><div class="page-subtitle">Transport agencies — address, GST (required), contact and ledger ref</div></div>
    <div class="page-actions">
      <button class="btn btn-secondary btn-sm"><i class="bi bi-download"></i> Export</button>
      <button class="btn btn-create" onclick="openModal('modal-m-ledger-transporter')"><i class="bi bi-plus"></i> Add Transporter</button>
    </div>
  </div>
  <div class="grid-wrap">
    <table class="data-table">
      <thead><tr><th>Transporter Name</th><th>Mailing Name</th><th>District</th><th>City</th><th>State</th><th>Country</th><th>Pincode</th><th>Mobile No.</th><th>Phone No.</th><th>Email</th><th>GST No.</th><th>Is Active</th><th></th></tr></thead>
      <tbody>
        ${[['Mahindra Logistics','Mahindra Log.','Andheri','Mumbai','Maharashtra','India','400093','98780 43210','022-66526000','ops@mahindralogistics.com','27AABCM0001A1Z5',true],
           ['Blue Dart Express','Blue Dart','Marol','Mumbai','Maharashtra','India','400059','98781 43211','022-28281234','support@bluedart.com','27AABCB0001A1Z3',true],
           ['Gati Ltd','Gati','Secunderabad','Hyderabad','Telangana','India','500003','98782 43212','040-27813700','gati@gati.com','36AABCG0001A1Z1',true],
        ].map(([tn,mn,dist,city,st,cntry,pin,mob,ph,em,gst,active])=>`
        <tr onclick="openModal('modal-m-ledger-transporter')">
          <td><b>${tn}</b></td>
          <td class="muted" style="font-size:11px">${mn}</td>
          <td class="muted" style="font-size:11px">${dist}</td>
          <td style="font-size:11px">${city}</td>
          <td class="muted" style="font-size:11px">${st}</td>
          <td class="muted" style="font-size:11px">${cntry}</td>
          <td class="muted" style="font-size:11px">${pin}</td>
          <td style="font-size:11px">${mob}</td>
          <td class="muted" style="font-size:11px">${ph}</td>
          <td style="font-size:11px">${em}</td>
          <td style="font-family:monospace;font-size:10px">${gst}</td>
          <td>${tag(active?'green':'red',active?'Active':'Inactive')}</td>
          <td class="actions-cell"><button class="btn btn-edit btn-icon btn-sm" onclick="event.stopPropagation()"><i class="bi bi-pencil"></i></button><button class="btn btn-delete btn-icon btn-sm" onclick="event.stopPropagation()"><i class="bi bi-trash"></i></button></td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>
</div>
<div class="modal-overlay hidden" id="modal-m-ledger-transporter">
  <div class="modal modal-xl">
    <div class="modal-header"><div class="modal-icon"><i class="bi bi-truck"></i></div>
      <div><div class="modal-title">Add / Edit Transporter</div></div>
      <button class="modal-close" onclick="closeModal('modal-m-ledger-transporter')"><i class="bi bi-x"></i></button>
    </div>
    <div class="modal-body">
      <div class="form-section-title"><i class="bi bi-info-circle"></i> Basic Details</div>
      <div class="form-row cols-2">
        ${fi('Transporter Name','text',true)} ${fi('Mailing Name')}
      </div>
      <div class="form-row cols-2">
        ${fi('Mobile No.','tel',true)} ${fi('Email','email')}
      </div>
      ${LEDGER_ADDR_FIELDS()}
      <div class="form-section-title" style="margin-top:10px"><i class="bi bi-receipt"></i> GST (Required for E-way Bill)</div>
      <div class="form-row cols-3">
        ${fi('PAN No.')} ${fi('GST No.','text',true,'Required for transport billing')}
        <div class="field-group"><label class="field-label">GST Applicable</label><div style="margin-top:8px">${fchk('GST Applicable',true)}</div></div>
      </div>
      <div class="form-row cols-2">
        ${fi('Ledger Ref Code','text',true,'Accounting ref code')}
        <div class="field-group"><label class="field-label">Is Active</label><div style="margin-top:8px">${fchk('Is Active',true)}</div></div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal('modal-m-ledger-transporter')">Cancel</button>
      <button class="btn btn-save"><i class="bi bi-check-lg"></i> Save Transporter</button>
    </div>
  </div>
</div>`);

  // ─── CONSIGNEE MASTER ─────────────────────────────────────────────────
  ca.insertAdjacentHTML('beforeend', `
<div class="page" id="page-m-ledger-consignee">
  <div class="page-header">
    <div><div class="page-title">Consignee Master</div><div class="page-subtitle">Ship-to party — linked to billing customer, address, GST, supGSM type and ledger ref</div></div>
    <div class="page-actions">
      <button class="btn btn-secondary btn-sm"><i class="bi bi-download"></i> Export</button>
      <button class="btn btn-create" onclick="openModal('modal-m-ledger-consignee')"><i class="bi bi-plus"></i> Add Consignee</button>
    </div>
  </div>
  <div class="grid-wrap">
    <table class="data-table">
      <thead><tr><th>Consignee Name</th><th>Mailing Name</th><th>Client Name</th><th>Address 1</th><th>District</th><th>City</th><th>State</th><th>Country</th><th>Pincode</th><th>Mobile No.</th><th>Phone No.</th><th>Email</th><th>GST No.</th><th>Is Active</th><th>Legal Name</th><th>SupGSM Type</th><th>Remarks</th><th></th></tr></thead>
      <tbody>
        ${[['Amul Plant — Anand','Amul Anand','Amul Dairy','P.O. Amul Dairy','Anand','Anand','Gujarat','India','388001','98765 44001','02692-258100','amul.anand@amul.com','24AAACA0001A1Z5',true,'Gujarat Cooperative Milk','Domestic','—'],
           ['ITC — Munger Factory','ITC Munger','ITC Limited','ITC Factory Road','Munger','Munger','Bihar','India','811201','98765 44002','06344-220100','itcmunger@itc.in','10AAACI0001A1Z0',true,'ITC Limited','Domestic','—'],
        ].map(([cn,mn,cln,a1,dist,city,st,cntry,pin,mob,ph,em,gst,active,legal,supType,rem])=>`
        <tr onclick="openModal('modal-m-ledger-consignee')">
          <td><b>${cn}</b></td>
          <td class="muted" style="font-size:11px">${mn}</td>
          <td style="font-size:11px;color:var(--primary)">${cln}</td>
          <td style="font-size:11px">${a1}</td>
          <td class="muted" style="font-size:11px">${dist}</td>
          <td style="font-size:11px">${city}</td>
          <td class="muted" style="font-size:11px">${st}</td>
          <td class="muted" style="font-size:11px">${cntry}</td>
          <td class="muted" style="font-size:11px">${pin}</td>
          <td style="font-size:11px">${mob}</td>
          <td class="muted" style="font-size:11px">${ph}</td>
          <td style="font-size:11px">${em}</td>
          <td style="font-family:monospace;font-size:10px">${gst}</td>
          <td>${tag(active?'green':'red',active?'Active':'Inactive')}</td>
          <td class="muted" style="font-size:11px">${legal}</td>
          <td style="font-size:11px">${supType}</td>
          <td class="muted" style="font-size:11px">${rem}</td>
          <td class="actions-cell"><button class="btn btn-edit btn-icon btn-sm" onclick="event.stopPropagation()"><i class="bi bi-pencil"></i></button><button class="btn btn-delete btn-icon btn-sm" onclick="event.stopPropagation()"><i class="bi bi-trash"></i></button></td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>
</div>
<div class="modal-overlay hidden" id="modal-m-ledger-consignee">
  <div class="modal modal-xl">
    <div class="modal-header"><div class="modal-icon"><i class="bi bi-geo-alt-fill"></i></div>
      <div><div class="modal-title">Add / Edit Consignee</div><div class="modal-sub">Ship-to address linked to billing customer — name, GST, supGSM type and ledger ref</div></div>
      <button class="modal-close" onclick="closeModal('modal-m-ledger-consignee')"><i class="bi bi-x"></i></button>
    </div>
    <div class="modal-body">
      <div class="form-section-title"><i class="bi bi-info-circle"></i> Basic Details</div>
      <div class="form-row cols-3">
        ${fi('Consignee Name','text',true)} ${fi('Mailing / Trade Name','text',true)} ${fi('Legal Name','text',true)}
      </div>
      <div class="form-row cols-3">
        ${fs('Client Name (Billing)',['Amul Dairy','ITC Limited','Hindustan Unilever'],'true')}
        ${fi('Mobile No.','tel')} ${fi('Email','email')}
      </div>
      ${LEDGER_ADDR_FIELDS()}
      ${LEDGER_GST_FIELDS()}
      <div class="form-section-title" style="margin-top:10px"><i class="bi bi-currency-rupee"></i> Account Details</div>
      <div class="form-row cols-3">
        ${fs('SupGSM Type',['Domestic','Export','Deemed Export','SEZ'],'true')}
        ${fi('Credit Days','number')}
        ${fi('Ledger Ref Code','text',true)}
      </div>
      <div class="form-row cols-2">
        <div class="field-group"><label class="field-label">Remarks</label><textarea class="form-textarea" style="min-height:40px"></textarea></div>
        <div class="field-group"><label class="field-label">Is Active</label><div style="margin-top:8px">${fchk('Is Active',true)}</div></div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal('modal-m-ledger-consignee')">Cancel</button>
      <button class="btn btn-save"><i class="bi bi-check-lg"></i> Save Consignee</button>
    </div>
  </div>
</div>`);

  // ─── EMPLOYEE LEDGER ──────────────────────────────────────────────────
  ca.insertAdjacentHTML('beforeend', `
<div class="page" id="page-m-ledger-employee">
  <div class="page-header">
    <div><div class="page-title">Employee Ledger</div><div class="page-subtitle">Employee accounting records — address, DOB, department, PAN, ledger ref and machine allocation</div></div>
    <div class="page-actions">
      <button class="btn btn-secondary btn-sm"><i class="bi bi-download"></i> Export</button>
      <button class="btn btn-create" onclick="openModal('modal-m-ledger-employee')"><i class="bi bi-plus"></i> Add Employee</button>
    </div>
  </div>
  <div class="grid-wrap">
    <table class="data-table">
      <thead><tr><th>Employee Name</th><th>Mailing Name</th><th>Department</th><th>Designation</th><th>District</th><th>City</th><th>State</th><th>Country</th><th>Pincode</th><th>Mobile No.</th><th>Phone No.</th><th>Date Of Birth</th><th>Email</th><th>Is Active</th><th></th></tr></thead>
      <tbody>
        ${[['Ramesh Sharma','Ramesh','Playing Card','Supervisor','Anand','Anand','Gujarat','India','388001','98765 43201','—','12 Jan 1985','ramesh@Playing Card.com',true],
           ['Suresh Mehta','Suresh','Printing','Machine Operator','Ahmedabad','Ahmedabad','Gujarat','India','380001','98765 43202','—','08 Mar 1990','suresh@Playing Card.com',true],
           ['Priya Mehta','Priya','Sales','Sales Executive','Ahmedabad','Ahmedabad','Gujarat','India','380001','98765 43207','—','05 Sep 1995','priya@Playing Card.com',true],
        ].map(([en,mn,dept,desig,dist,city,st,cntry,pin,mob,ph,dob,em,active])=>`
        <tr onclick="openModal('modal-m-ledger-employee')">
          <td><b>${en}</b></td>
          <td class="muted" style="font-size:11px">${mn}</td>
          <td style="font-size:11px">${dept}</td>
          <td style="font-size:11px">${desig}</td>
          <td class="muted" style="font-size:11px">${dist}</td>
          <td style="font-size:11px">${city}</td>
          <td class="muted" style="font-size:11px">${st}</td>
          <td class="muted" style="font-size:11px">${cntry}</td>
          <td class="muted" style="font-size:11px">${pin}</td>
          <td style="font-size:11px">${mob}</td>
          <td class="muted" style="font-size:11px">${ph}</td>
          <td style="font-size:11px">${dob}</td>
          <td style="font-size:11px">${em}</td>
          <td>${tag(active?'green':'red',active?'Active':'Inactive')}</td>
          <td class="actions-cell"><button class="btn btn-edit btn-icon btn-sm" onclick="event.stopPropagation()"><i class="bi bi-pencil"></i></button><button class="btn btn-delete btn-icon btn-sm" onclick="event.stopPropagation()"><i class="bi bi-trash"></i></button></td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>
</div>
<div class="modal-overlay hidden" id="modal-m-ledger-employee">
  <div class="modal modal-xl">
    <div class="modal-header"><div class="modal-icon"><i class="bi bi-person-workspace"></i></div>
      <div><div class="modal-title">Add / Edit Employee Ledger</div><div class="modal-sub">Name, mailing name, DOB, address, PAN, ledger ref and machine allocation</div></div>
      <button class="modal-close" onclick="closeModal('modal-m-ledger-employee')"><i class="bi bi-x"></i></button>
    </div>
    <div class="modal-body">
      <div class="form-section-title"><i class="bi bi-info-circle"></i> Basic Details</div>
      <div class="form-row cols-3">
        ${fi('Employee Name','text',true)} ${fi('Mailing Name','text',true)} ${fi('Date Of Birth','date')}
      </div>
      <div class="form-row cols-3">
        ${fs('Department',['Playing Card','Printing','Collation','Varnishing','Dispatch','Sales','Stores','QC','Admin','Accounts'],'true')}
        ${fi('Designation')} ${fi('Mobile No.','tel',true)}
      </div>
      ${LEDGER_ADDR_FIELDS()}
      <div class="form-section-title" style="margin-top:10px"><i class="bi bi-receipt"></i> PAN & Account</div>
      <div class="form-row cols-3">
        ${fi('Email','email')} ${fi('PAN No.')} ${fi('Ledger Ref Code','text',true,'Tally/Accounting ref')}
      </div>
      <div class="form-row cols-2">
        <div class="field-group"><label class="field-label">Is Active</label><div style="margin-top:8px">${fchk('Is Active',true)}</div></div>
        <div class="field-group"><label class="field-label">Machine Allocation</label>
          <button class="btn btn-secondary btn-sm" style="margin-top:6px"><i class="bi bi-gear"></i> Manage Machine Allocation</button>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal('modal-m-ledger-employee')">Cancel</button>
      <button class="btn btn-save"><i class="bi bi-check-lg"></i> Save Employee</button>
    </div>
  </div>
</div>`);

  // ─── DUTIES & TAXES ──────────────────────────────────────────────────
  ca.insertAdjacentHTML('beforeend', `
<div class="page" id="page-m-ledger-duties-taxes">
  <div class="page-header">
    <div><div class="page-title">Duties & Taxes</div><div class="page-subtitle">Tax ledger definitions — GST type, inventory effect, bill-wise, GST calculation and Tally code</div></div>
    <div class="page-actions">
      <button class="btn btn-create" onclick="openModal('modal-m-ledger-duties-taxes')"><i class="bi bi-plus"></i> Add Tax Ledger</button>
    </div>
  </div>
  <div class="grid-wrap">
    <table class="data-table">
      <thead><tr><th>Tax Ledger Name</th><th>Tax Type</th><th>GST Applicable</th><th>Tax %</th><th>Is Active</th><th></th></tr></thead>
      <tbody>
        ${[['CGST @9%','CGST','Yes','9%',true],['SGST @9%','SGST','Yes','9%',true],['IGST @18%','IGST','Yes','18%',true],['CGST @6%','CGST','Yes','6%',true],['SGST @6%','SGST','Yes','6%',true],['IGST @12%','IGST','Yes','12%',true],['TDS @1% — Purchase','TDS','No','1%',true]].map(([n,t,gst,rate,active])=>`
        <tr onclick="openModal('modal-m-ledger-duties-taxes')">
          <td><b>${n}</b></td>
          <td>${tag('blue',t)}</td>
          <td class="text-center">${tag(gst==='Yes'?'green':'gray',gst)}</td>
          <td class="text-right font-bold">${rate}</td>
          <td>${tag(active?'green':'red',active?'Active':'Inactive')}</td>
          <td class="actions-cell"><button class="btn btn-edit btn-icon btn-sm" onclick="event.stopPropagation()"><i class="bi bi-pencil"></i></button><button class="btn btn-delete btn-icon btn-sm" onclick="event.stopPropagation()"><i class="bi bi-trash"></i></button></td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>
</div>
<div class="modal-overlay hidden" id="modal-m-ledger-duties-taxes">
  <div class="modal modal-md">
    <div class="modal-header"><div class="modal-icon"><i class="bi bi-percent"></i></div>
      <div><div class="modal-title">Add / Edit Duties & Taxes</div></div>
      <button class="modal-close" onclick="closeModal('modal-m-ledger-duties-taxes')"><i class="bi bi-x"></i></button>
    </div>
    <div class="modal-body">
      <div class="form-row cols-2">
        ${fi('Tax Ledger Name','text',true,'e.g. CGST @9%')}
        ${fi('Mailing Name',false,false,'Short name')}
      </div>
      <div style="margin-bottom:8px">${fchk('Is Tax Type (mark for GST-type ledgers)')}</div>
      <div class="form-row cols-2">
        ${fs('Tax Type',['CGST','SGST','IGST','TDS','TCS','Cess','Custom'],'true')}
        ${fi('Tax Percentage (%)','number',true,'e.g. 9')}
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:10px">
        ${fchk('Inventory Effect')} ${fchk('Maintain Bill-wise')} ${fchk('GST Applicable',true)}
      </div>
      <div class="form-row cols-2">
        ${fs('GST Ledger Type',['Output GST','Input GST (ITC)','Reverse Charge'])}
        ${fs('GST Calculation On',['Total Value','Assessable Value','MRP'])}
      </div>
      <div class="form-row cols-2">
        ${fs('HSN Code',['48191000','48010000','48101900','99843'])}
        ${fi('Tally Code',false,false,'Tally ledger ref')}
      </div>
      <div style="margin-top:6px">${fchk('Is Active',true)}</div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal('modal-m-ledger-duties-taxes')">Cancel</button>
      <button class="btn btn-save"><i class="bi bi-check-lg"></i> Save Tax Ledger</button>
    </div>
  </div>
</div>`);

  // ─── PURCHASE ACCOUNTS ────────────────────────────────────────────────
  ca.insertAdjacentHTML('beforeend', `
<div class="page" id="page-m-ledger-purchase">
  <div class="page-header">
    <div><div class="page-title">Purchase Accounts</div><div class="page-subtitle">Purchase GL accounts — account name, Tally code and active status</div></div>
    <div class="page-actions">
      <button class="btn btn-create" onclick="openModal('modal-m-ledger-purchase')"><i class="bi bi-plus"></i> Add Account</button>
    </div>
  </div>
  <div class="grid-wrap">
    <table class="data-table">
      <thead><tr><th>A/C Name</th><th>Tally Code</th><th>Is Active</th><th></th></tr></thead>
      <tbody>
        ${[['Purchase — Cardstock / Liner','PUR-Cardstock',true],['Purchase — Ink/Coating / Board','PUR-Ink/Coating',true],['Purchase — Ink & Chemicals','PUR-INK',true],['Purchase — Printing Plates','PUR-PLATES',true],['Purchase — Spare Parts','PUR-SPARES',true],['Purchase — Packing Material','PUR-PACKING',true],['Purchase — Capital Goods','PUR-CAP',false],['Purchase — Import','PUR-IMP',false]].map(([n,tc,active])=>`
        <tr onclick="openModal('modal-m-ledger-purchase')">
          <td><b>${n}</b></td>
          <td style="font-family:monospace;font-size:11px">${tc}</td>
          <td>${tag(active?'green':'gray',active?'Active':'Inactive')}</td>
          <td class="actions-cell"><button class="btn btn-edit btn-icon btn-sm" onclick="event.stopPropagation()"><i class="bi bi-pencil"></i></button><button class="btn btn-delete btn-icon btn-sm" onclick="event.stopPropagation()"><i class="bi bi-trash"></i></button></td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>
</div>
<div class="modal-overlay hidden" id="modal-m-ledger-purchase">
  <div class="modal modal-sm">
    <div class="modal-header"><div class="modal-icon"><i class="bi bi-cart3"></i></div>
      <div><div class="modal-title">Add / Edit Purchase Account</div></div>
      <button class="modal-close" onclick="closeModal('modal-m-ledger-purchase')"><i class="bi bi-x"></i></button>
    </div>
    <div class="modal-body">
      ${fi('A/C Name','text',true,'e.g. Purchase — Cardstock / Liner')}
      ${fi('Tally Code',false,true,'e.g. PUR-Cardstock')}
      <div style="margin-top:8px">${fchk('Is Active',true)}</div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal('modal-m-ledger-purchase')">Cancel</button>
      <button class="btn btn-save"><i class="bi bi-check-lg"></i> Save</button>
    </div>
  </div>
</div>`);

  // ─── SALES ACCOUNTS ───────────────────────────────────────────────────
  ca.insertAdjacentHTML('beforeend', `
<div class="page" id="page-m-ledger-sales">
  <div class="page-header">
    <div><div class="page-title">Sales Accounts</div><div class="page-subtitle">Sales GL accounts — account name, Tally code and active status</div></div>
    <div class="page-actions">
      <button class="btn btn-create" onclick="openModal('modal-m-ledger-sales')"><i class="bi bi-plus"></i> Add Account</button>
    </div>
  </div>
  <div class="grid-wrap">
    <table class="data-table">
      <thead><tr><th>A/C Name</th><th>Tally Code</th><th>Is Active</th><th></th></tr></thead>
      <tbody>
        ${[['Sales — Playing Card Decks','SAL-CORR',true],['Sales — Printed Decks','SAL-PRINT',true],['Sales — Art Paper Ink/Coating','SAL-KRAFT',true],['Sales — Export','SAL-EXP',true],['Sales — Scrap','SAL-SCRAP',false],['Sales — Service Charges','SAL-SVC',true],['Sales — Other','SAL-OTH',false]].map(([n,tc,active])=>`
        <tr onclick="openModal('modal-m-ledger-sales')">
          <td><b>${n}</b></td>
          <td style="font-family:monospace;font-size:11px">${tc}</td>
          <td>${tag(active?'green':'gray',active?'Active':'Inactive')}</td>
          <td class="actions-cell"><button class="btn btn-edit btn-icon btn-sm" onclick="event.stopPropagation()"><i class="bi bi-pencil"></i></button><button class="btn btn-delete btn-icon btn-sm" onclick="event.stopPropagation()"><i class="bi bi-trash"></i></button></td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>
</div>
<div class="modal-overlay hidden" id="modal-m-ledger-sales">
  <div class="modal modal-sm">
    <div class="modal-header"><div class="modal-icon"><i class="bi bi-graph-up"></i></div>
      <div><div class="modal-title">Add / Edit Sales Account</div></div>
      <button class="modal-close" onclick="closeModal('modal-m-ledger-sales')"><i class="bi bi-x"></i></button>
    </div>
    <div class="modal-body">
      ${fi('A/C Name','text',true,'e.g. Sales — Playing Card Decks')}
      ${fi('Tally Code',false,true,'e.g. SAL-CORR')}
      <div style="margin-top:8px">${fchk('Is Active',true)}</div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal('modal-m-ledger-sales')">Cancel</button>
      <button class="btn btn-save"><i class="bi bi-check-lg"></i> Save</button>
    </div>
  </div>
</div>`);
});
