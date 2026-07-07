document.addEventListener('DOMContentLoaded', () => {
  const ca = document.getElementById('contentArea');
  const tag = (c, t) => `<span class="tag tag-${c}" style="font-size:10px">${t}</span>`;
  const fi = (label, type='text', req=false, placeholder='') =>
    `<div class="field-group"><label class="field-label${req?' required':''}">${label}</label>
     <input class="form-input" type="${type}" placeholder="${placeholder||label+'...'}" /></div>`;
  const fs = (label, opts=[], req=false) =>
    `<div class="field-group"><label class="field-label${req?' required':''}">${label}</label>
     <select class="form-select">${opts.map(o=>`<option>${o}</option>`).join('')}</select></div>`;

  // ─── CUSTOMER MASTER ────────────────────────────────────────────────
  ca.insertAdjacentHTML('beforeend', `
<div class="page" id="page-m-customer">
  <div class="page-header">
    <div><div class="page-title">Customer Master</div><div class="page-subtitle">Customer profiles — basic info, linked to Debtors Ledger for accounting</div></div>
    <div class="page-actions">
      <button class="btn btn-secondary btn-sm"><i class="bi bi-download"></i> Export</button>
      <button class="btn btn-create" onclick="openModal('modal-m-customer')"><i class="bi bi-plus"></i> Add Customer</button>
    </div>
  </div>
  <div class="toolbar"><div class="toolbar-left">
    <div class="search-input-wrap"><i class="bi bi-search"></i><input class="search-input" placeholder="Client name, GST, city..." /></div>
    <select class="form-select" style="width:120px;padding:5px 8px"><option>All States</option><option>Gujarat</option><option>Maharashtra</option></select>
  </div></div>
  <div class="grid-wrap">
    <table class="data-table">
      <thead><tr><th>Client Name</th><th>Mailing Name</th><th>Job Coordinator</th><th>Address 1</th><th>District</th><th>City</th><th>State</th><th>Country</th><th>Pincode</th><th>Mobile No.</th><th>Phone No.</th><th>Email</th><th>GST No.</th><th>Credit Days</th><th>Remarks</th><th>Is Active</th><th></th></tr></thead>
      <tbody>
        ${[['Amul Dairy Cooperative','Amul Dairy','Rajesh Kumar','P.O. Amul Dairy','Anand','Anand','Gujarat','India','388001','98765 43210','02692-258000','rajesh@amul.com','24AAACA0001A1Z5','45','Regular customer',true],
           ['ITC Limited','ITC Ltd','Sunita Shah','ITC Centre, Mount Road','Chennai','Chennai','Tamil Nadu','India','600002','98766 43211','044-28501234','sunita@itc.in','33AAACI0001A1Z2','30','Export orders',true],
           ['Hindustan Unilever','HUL','Amit Patel','Unilever House, BC Road','Mumbai','Mumbai','Maharashtra','India','400079','98767 43212','022-39832000','amit@hul.com','27AADCH0001A1Z0','60','Priority client',true],
           ['Patanjali Ayurveda','Patanjali','Manoj Gupta','Haridwar Road','Haridwar','Haridwar','Uttarakhand','India','249407','98768 43213','01334-240008','manoj@patanjali.com','07AADCP0001A1Z4','30','Credit hold review',true],
        ].map(([cn,mn,jc,a1,dist,city,st,cntry,pin,mob,ph,em,gst,cd,rem,active])=>`
        <tr onclick="openModal('modal-m-customer')">
          <td><b>${cn}</b></td><td class="muted" style="font-size:11px">${mn}</td>
          <td style="font-size:11px">${jc}</td><td style="font-size:11px">${a1}</td>
          <td class="muted" style="font-size:11px">${dist}</td><td style="font-size:11px">${city}</td>
          <td class="muted" style="font-size:11px">${st}</td><td class="muted" style="font-size:11px">${cntry}</td>
          <td class="muted" style="font-size:11px">${pin}</td>
          <td style="font-size:11px">${mob}</td><td class="muted" style="font-size:11px">${ph}</td>
          <td style="font-size:11px">${em}</td>
          <td style="font-family:monospace;font-size:10px">${gst}</td>
          <td class="text-center">${cd}d</td>
          <td class="muted" style="font-size:11px">${rem}</td>
          <td>${active?tag('green','Active'):tag('red','Inactive')}</td>
          <td class="actions-cell"><button class="btn btn-edit btn-icon btn-sm" onclick="event.stopPropagation()"><i class="bi bi-pencil"></i></button><button class="btn btn-delete btn-icon btn-sm" onclick="event.stopPropagation()"><i class="bi bi-trash"></i></button></td>
        </tr>`).join('')}
      </tbody>
    </table>
    <div class="grid-footer"><span>Showing 4 of 84 customers</span></div>
  </div>
</div>
<div class="modal-overlay hidden" id="modal-m-customer">
  <div class="modal modal-xl">
    <div class="modal-header"><div class="modal-icon"><i class="bi bi-person-vcard"></i></div>
      <div><div class="modal-title">Add / Edit Customer</div><div class="modal-sub">Client name, address, GST, contact and credit details</div></div>
      <button class="modal-close" onclick="closeModal('modal-m-customer')"><i class="bi bi-x"></i></button>
    </div>
    <div class="modal-body">
      <div class="form-section-title"><i class="bi bi-info-circle"></i> Basic Details</div>
      <div class="form-row cols-3">
        ${fi('Client Name','text',true)} ${fi('Mailing / Trade Name','text',true)} ${fi('Legal Name','text',true)}
      </div>
      <div class="form-row cols-3">
        ${fi('Contact Person Name')} ${fi('Address 1')} ${fi('Address 2')}
      </div>
      <div class="form-row cols-4">
        ${fs('Country',['India','UAE','USA','UK'])} ${fs('State',['Gujarat','Maharashtra','Tamil Nadu','Uttarakhand'])}
        ${fi('City')} ${fi('District / Province')}
      </div>
      <div class="form-row cols-4">
        ${fi('Pincode')} ${fi('Phone No.')} ${fi('Mobile No.')} ${fi('Email','email')}
      </div>
      <div class="form-section-title" style="margin-top:10px"><i class="bi bi-receipt"></i> GST & Tax Details</div>
      <div class="form-row cols-4">
        ${fi('PAN No.')} ${fi('GST No.')}
        <div class="field-group"><label class="field-label">GST Applicable</label>
          <label style="display:flex;align-items:center;gap:6px;margin-top:8px"><input type="checkbox" checked /> GST Applicable</label></div>
        ${fs('GST Reg. Type',['Registered Regular','Unregistered','Composition','SEZ Unit','Export'],'true')}
      </div>
      <div class="form-row cols-3">
        ${fs('SupGSM Type',['Domestic','Export','Deemed Export','SEZ'],'true')}
        ${fs('Sales Person',['Priya Mehta','Vikram Singh','Deepa Ranpura'])}
        ${fs('Sales Representative',['Rep-1','Rep-2','Rep-3'])}
      </div>
      <div class="form-section-title" style="margin-top:10px"><i class="bi bi-currency-rupee"></i> Credit & Account</div>
      <div class="form-row cols-4">
        ${fs('Currency',['INR — ₹','USD — $','EUR — €','GBP — £'])}
        ${fi('Credit Days','number')}
        ${fi('Ledger Ref Code','text',true)}
        ${fi('Ledger Ref Name','text',true)}
      </div>
      <div class="form-row cols-2">
        <div class="field-group"><label class="field-label">Remarks</label><textarea class="form-textarea" style="min-height:48px"></textarea></div>
        <div class="field-group"><label class="field-label">Is Active</label>
          <label style="display:flex;align-items:center;gap:6px;margin-top:8px"><input type="checkbox" checked /> Active Ledger</label></div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal('modal-m-customer')">Cancel</button>
      <button class="btn btn-save"><i class="bi bi-check-lg"></i> Save Customer</button>
    </div>
  </div>
</div>`);

  // ─── DEPARTMENT MASTER ───────────────────────────────────────────────
  ca.insertAdjacentHTML('beforeend', `
<div class="page" id="page-m-department">
  <div class="page-header">
    <div><div class="page-title">Department Master</div><div class="page-subtitle">Production departments with sequence order</div></div>
    <div class="page-actions">
      <button class="btn btn-create" onclick="openModal('modal-m-department')"><i class="bi bi-plus"></i> Add Department</button>
    </div>
  </div>
  <div class="grid-wrap">
    <table class="data-table">
      <thead><tr><th>Department Name</th><th>Seq. No.</th><th></th></tr></thead>
      <tbody>
        ${[['Playing Card','1'],['Printing','2'],['Collation','3'],['Varnishing / Pasting','4'],['Punching / Die Cutting','5'],['Lamination','6'],['Dispatch','7'],['Stores','8'],['QC','9']].map(([n,s])=>`
        <tr onclick="openModal('modal-m-department')">
          <td><b>${n}</b></td><td class="text-center muted">${s}</td>
          <td class="actions-cell"><button class="btn btn-edit btn-icon btn-sm" onclick="event.stopPropagation()"><i class="bi bi-pencil"></i></button><button class="btn btn-delete btn-icon btn-sm" onclick="event.stopPropagation()"><i class="bi bi-trash"></i></button></td>
        </tr>`).join('')}
      </tbody>
    </table>
    <div class="grid-footer"><span>9 departments</span></div>
  </div>
</div>
<div class="modal-overlay hidden" id="modal-m-department">
  <div class="modal modal-sm">
    <div class="modal-header"><div class="modal-icon"><i class="bi bi-diagram-3"></i></div>
      <div><div class="modal-title">Add / Edit Department</div></div>
      <button class="modal-close" onclick="closeModal('modal-m-department')"><i class="bi bi-x"></i></button>
    </div>
    <div class="modal-body">
      ${fi('Department Name','text',true)}
      ${fi('Production Seq. No.','number',false,'e.g. 1')}
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal('modal-m-department')">Cancel</button>
      <button class="btn btn-save"><i class="bi bi-check-lg"></i> Save</button>
    </div>
  </div>
</div>`);

  // ─── MACHINE MASTER ──────────────────────────────────────────────────
  ca.insertAdjacentHTML('beforeend', `
<div class="page" id="page-m-machine">
  <div class="page-header">
    <div><div class="page-title">Machine Master</div><div class="page-subtitle">Machine definitions — dimensions, costing, MR settings and rate slabs</div></div>
    <div class="page-actions">
      <button class="btn btn-secondary btn-sm"><i class="bi bi-download"></i> Export</button>
      <button class="btn btn-create" onclick="openModal('modal-m-machine')"><i class="bi bi-plus"></i> Add Machine</button>
    </div>
  </div>
  <div class="grid-wrap">
    <table class="data-table">
      <thead><tr><th>Machine Code</th><th>Machine Name</th><th>Machine Type</th><th>Ref Code</th><th>Department</th><th>Gripper (mm)</th><th>Max L</th><th>Max W</th><th>Min L</th><th>Min W</th><th>Colors</th><th>Per Hr Cost</th><th>Speed</th><th></th></tr></thead>
      <tbody>
        ${[
          ['MCH-01','Printing Press-1','Playing Card','CORR-01','Playing Card','—','—','2400mm','—','1200mm','—','₹1,800','120 m/min'],
          ['MCH-02','Printing Press-2','Playing Card','CORR-02','Playing Card','—','—','1800mm','—','900mm','—','₹1,500','100 m/min'],
          ['MCH-03','Flexo Press-1','Printing','FP-01','Printing','12mm','2400mm','1200mm','300mm','200mm','4','₹2,200','4000 sph'],
          ['MCH-04','Flexo Press-2','Printing','FP-02','Printing','12mm','2800mm','1400mm','300mm','200mm','6','₹3,000','6000 sph'],
          ['MCH-05','Collator-1','Collation','ST-01','Collation','—','—','—','—','—','—','₹800','8000 bph'],
          ['MCH-06','Die Cutter-1','Die Cutting','DC-01','Punching','—','1500mm','1000mm','300mm','200mm','—','₹2,500','2000 sph'],
        ].map(([code,name,type,ref,dept,grip,maxL,maxW,minL,minW,clrs,cost,spd])=>`
        <tr onclick="openModal('modal-m-machine')">
          <td><b>${code}</b></td><td>${name}</td>
          <td>${tag('blue',type)}</td>
          <td style="font-size:11px;font-family:monospace">${ref}</td>
          <td class="muted" style="font-size:11px">${dept}</td>
          <td class="text-center" style="font-size:11px">${grip}</td>
          <td class="text-right muted" style="font-size:11px">${maxL}</td>
          <td class="text-right muted" style="font-size:11px">${maxW}</td>
          <td class="text-right muted" style="font-size:11px">${minL}</td>
          <td class="text-right muted" style="font-size:11px">${minW}</td>
          <td class="text-center muted" style="font-size:11px">${clrs}</td>
          <td class="text-right font-bold">${cost}</td>
          <td class="muted" style="font-size:11px">${spd}</td>
          <td class="actions-cell">
            <button class="btn btn-ghost btn-icon btn-sm" onclick="event.stopPropagation();openModal('modal-m-machine')"><i class="bi bi-eye"></i></button>
            <button class="btn btn-edit btn-icon btn-sm" onclick="event.stopPropagation()"><i class="bi bi-pencil"></i></button>
            <button class="btn btn-delete btn-icon btn-sm" onclick="event.stopPropagation()"><i class="bi bi-trash"></i></button>
          </td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>
</div>
<div class="modal-overlay hidden" id="modal-m-machine">
  <div class="modal modal-xl">
    <div class="modal-header"><div class="modal-icon"><i class="bi bi-gear-wide-connected"></i></div>
      <div><div class="modal-title">Machine Master — Flexo Press-2</div><div class="modal-sub">6-Color Flexo | Printing Dept | MCH-04</div></div>
      <button class="modal-close" onclick="closeModal('modal-m-machine')"><i class="bi bi-x"></i></button>
    </div>
    <div class="modal-body">

      <div class="form-section-title"><i class="bi bi-info-circle"></i> Basic Information</div>
      <div class="form-row cols-4">
        <div class="field-group"><label class="field-label">Machine Code</label><input class="form-input" value="MCH-04" readonly style="background:var(--bg-subtle)" /></div>
        ${fi('Ref Machine Code','text',false,'e.g. FP-02')}
        ${fi('Machine Name','text',true)}
        ${fs('Machine Type',['Printing','Playing Card','Collation','Varnishing','Die Cutting','Lamination'],'true')}
      </div>
      <div class="form-row cols-4">
        ${fs('Department',['Printing','Playing Card','Collation','Varnishing','Punching'],'true')}
        ${fs('Production Unit',['Unit-1','Unit-2','Unit-3'],'true')}
        ${fs('Speed Unit',['sph','m/min','bph'])}
        ${fi('Max Speed','number',false,'e.g. 6000')}
      </div>

      <div class="form-section-title" style="margin-top:10px"><i class="bi bi-rulers"></i> Ink/Coating / Sheet Dimensions</div>
      <div class="form-row cols-4">
        ${fi('Ink/Coating Min. W (mm)','number',false,'200')} ${fi('Ink/Coating Max. W (mm)','number',false,'1400')}
        ${fi('Ink/Coating Min. L (mm)','number',false,'300')} ${fi('Ink/Coating Max. L (mm)','number',false,'2800')}
      </div>
      <div class="form-row cols-4">
        ${fi('Gripper (mm)','number',false,'12')} ${fi('Print Margin (mm)','number',false,'5')}
        ${fi('Print Min. W (mm)','number')} ${fi('Print Max. W (mm)','number')}
      </div>
      <div class="form-row cols-4">
        ${fi('Print Min. L (mm)','number')} ${fi('Print Max. L (mm)','number')}
        ${fi('Machine Width (mm)','number')} ${fi('Colors','number',false,'6')}
      </div>

      <div class="form-section-title" style="margin-top:10px"><i class="bi bi-layers"></i> Cardstock / Roll Parameters (Playing Card)</div>
      <div class="form-row cols-4">
        ${fi('Cardstock Size Max (mm)','number')} ${fi('Cardstock Size Min (mm)','number')}
        ${fi('Cut Off Max (mm)','number')} ${fi('Cut Off Min (mm)','number')}
      </div>
      <div class="form-row cols-4">
        ${fi('Avg Roll Length (Mtr)','number')} ${fi('Roll Change Wastage (Mtr)','number')}
        ${fi('Roll Change Time (Min)','number')} ${fi('Avg Breakdown Time (Min)','number')}
      </div>

      <div class="form-section-title" style="margin-top:10px"><i class="bi bi-card-image"></i> Plate Settings</div>
      <div class="form-row cols-4">
        ${fi('Plate Width (mm)','number')} ${fi('Plate Length (mm)','number')}
        ${fi('Plate Charges (₹)','number')} ${fs('Plate Charges Type',['Per Plate','Per Job','Fixed'])}
      </div>

      <div class="form-section-title" style="margin-top:10px"><i class="bi bi-currency-rupee"></i> Costing & Make Ready</div>
      <div class="form-row cols-4">
        ${fi('Cost / Hr (₹)','number',false,'3000')} ${fs('Cost Param',['Per Hour','Per 1000 Sheets'])}
        ${fi('MR Time (Min)','number',false,'30')} ${fs('MR Mode',['Sheet Count','Time Based'])}
      </div>
      <div class="form-row cols-4">
        ${fi('MR Wastage Sheets','number')} ${fi('MR Charges (₹)','number')}
        ${fi('MR Charges / Hr (₹)','number')} ${fi('Job Change Over (Min)','number',false,'15')}
      </div>
      <div class="form-row cols-4">
        ${fi('Min Impressions','number')} ${fi('Electric Cons. (kW)','number')}
        ${fi('Round Impressions','number')} ${fi('Basic Print Charge (₹)','number')}
      </div>

      <div class="form-section-title" style="margin-top:10px"><i class="bi bi-recycle"></i> Wastage Settings</div>
      <div class="form-row cols-4">
        ${fs('Type of Charges',['Rate/1000','Rate/Sheet','Rate/KG','Rate/Job'])}
        ${fi('Wastage Type','text')} ${fi('Wastage Calc On','text')} ${fi('Min Impr','number')}
      </div>

      <div class="form-section-title" style="margin-top:10px"><i class="bi bi-toggles"></i> Special Flags</div>
      <div style="display:flex;flex-wrap:wrap;gap:14px;padding:4px 0">
        ${['Planning Machine','Perfecta Machine','Variable Cut Off','Special Machine'].map(f=>
          `<label style="display:flex;align-items:center;gap:6px;font-size:12px;cursor:pointer"><input type="checkbox" /> ${f}</label>`).join('')}
      </div>

      <div class="form-section-title" style="margin-top:12px"><i class="bi bi-table"></i> Rate Slabs</div>
      <table class="line-table">
        <thead><tr><th>Sheet From</th><th>Sheet To</th><th>Printing Rate</th><th>CTP Charges</th><th>PS Charges</th><th>CTCP</th><th>Wastage %</th><th>Sp Color F</th><th>Sp Color B</th><th>Coating Rate</th><th>Min. Charges</th></tr></thead>
        <tbody>
          ${[[1,5000,'₹0.95','₹1,200','₹800','₹400','5%','₹800','₹800','₹0.10','₹2,000'],
             [5001,20000,'₹0.85','₹1,200','₹800','₹400','4%','₹800','₹800','₹0.10','₹2,000'],
             [20001,99999,'₹0.75','₹1,200','₹800','₹400','3%','₹800','₹800','₹0.08','₹2,000']].map(r=>`
          <tr>${r.map((v,i)=>`<td><input class="form-input" value="${v}" style="width:${i<2?55:70}px;padding:3px 5px;font-size:11px" /></td>`).join('')}</tr>`).join('')}
          <tr><td colspan="11" style="text-align:center;padding:6px"><button class="btn btn-ghost btn-sm"><i class="bi bi-plus"></i> Add Slab</button></td></tr>
        </tbody>
      </table>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal('modal-m-machine')">Cancel</button>
      <button class="btn btn-save"><i class="bi bi-check-lg"></i> Save Machine</button>
    </div>
  </div>
</div>`);

  // ─── PROCESS MASTER ──────────────────────────────────────────────────
  ca.insertAdjacentHTML('beforeend', `
<div class="page" id="page-m-process">
  <div class="page-header">
    <div><div class="page-title">Process Master</div><div class="page-subtitle">Production process definitions — type of charges, units, slabs and machine allocation</div></div>
    <div class="page-actions">
      <button class="btn btn-secondary btn-sm"><i class="bi bi-download"></i> Export</button>
      <button class="btn btn-create" onclick="openModal('modal-m-process')"><i class="bi bi-plus"></i> Add Process</button>
    </div>
  </div>
  <div class="grid-wrap">
    <table class="data-table">
      <thead><tr><th>Process Name</th><th>Type Of Charges</th><th>Size To Be Cons.</th><th>Min. Charges</th><th>Setup Charges</th><th>Department</th><th>Start Unit</th><th>End Unit</th><th>Unit Conversion</th><th>Display</th><th>Tool</th><th>Module Type</th><th>Online</th><th></th></tr></thead>
      <tbody>
        ${[
          ['Playing Card','Rate/1000','Sheet (L×W)','₹500','₹500','Playing Card','SHT','SHT','1:1','Yes','No','Cardstock Process','No'],
          ['4-Color Printing','Rate/1000','Sheet (L×W)','₹800','₹800','Printing','SHT','SHT','1:1','Yes','No','Sheet Process','Yes'],
          ['2-Color Printing','Rate/1000','Sheet (L×W)','₹500','₹500','Printing','SHT','SHT','1:1','Yes','No','Sheet Process','Yes'],
          ['Collation','Rate/1000','Sheet','₹150','₹150','Collation','SHT','SHT','1:1','Yes','No','Sheet Process','Yes'],
          ['Varnishing / Pasting','Rate/1000','Sheet','₹180','₹180','Varnishing','SHT','SHT','1:1','Yes','No','Sheet Process','No'],
          ['Die Cutting','Rate/Job','Job Size','₹2,000','₹1,000','Punching','JOB','SHT','1:1','Yes','Yes','Sheet Process','No'],
          ['Punching','Rate/1000','Sheet','₹100','₹100','Punching','SHT','SHT','1:1','Yes','No','Sheet Process','No'],
          ['Lamination','Rate/KG','Sheet (Area)','—','—','—','KG','KG','1:1','Yes','No','Sheet Process','No'],
        ].map(([pn,toc,stbc,mc,sc,dept,su,eu,uc,disp,tool,mod,online])=>`
        <tr onclick="openModal('modal-m-process')">
          <td><b>${pn}</b></td><td style="font-size:11px">${toc}</td>
          <td class="muted" style="font-size:11px">${stbc}</td>
          <td class="text-right">${mc}</td><td class="text-right">${sc}</td>
          <td class="muted" style="font-size:11px">${dept}</td>
          <td class="text-center muted" style="font-size:11px">${su}</td><td class="text-center muted" style="font-size:11px">${eu}</td>
          <td class="text-center muted" style="font-size:11px">${uc}</td>
          <td class="text-center">${tag(disp==='Yes'?'green':'gray',disp)}</td>
          <td class="text-center">${tag(tool==='Yes'?'orange':'gray',tool)}</td>
          <td style="font-size:11px">${mod}</td>
          <td class="text-center">${tag(online==='Yes'?'green':'gray',online)}</td>
          <td class="actions-cell"><button class="btn btn-edit btn-icon btn-sm" onclick="event.stopPropagation()"><i class="bi bi-pencil"></i></button><button class="btn btn-delete btn-icon btn-sm" onclick="event.stopPropagation()"><i class="bi bi-trash"></i></button></td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>
</div>
<div class="modal-overlay hidden" id="modal-m-process">
  <div class="modal modal-xl">
    <div class="modal-header"><div class="modal-icon"><i class="bi bi-sliders2"></i></div>
      <div><div class="modal-title">Add / Edit Process</div><div class="modal-sub">Process type, charge structure, units, slabs and machine allocation</div></div>
      <button class="modal-close" onclick="closeModal('modal-m-process')"><i class="bi bi-x"></i></button>
    </div>
    <div class="modal-body">
      <div class="form-section-title"><i class="bi bi-info-circle"></i> Basic Settings</div>
      <div class="form-row cols-3">
        ${fi('Process Name','text',true)} ${fi('Display Name')}
        ${fs('Type Of Charges',['Rate/1000','Rate/KG','Rate/SqM','Rate/Job','Rate/Sheet'],'true')}
      </div>
      <div class="form-row cols-4">
        ${fs('Department',['Playing Card','Printing','Collation','Varnishing','Punching'],'true')}
        ${fs('Module Type',['Sheet Process','Cardstock Process'],'true')}
        ${fs('Pre / Post',['Pre Process','Post Process','Both'],'true')}
        ${fs('Size To Be Considered',['Sheet (L×W)','Sheet (Area)','Job Size','Cardstock Width','Fixed'])}
      </div>
      <div class="form-row cols-4">
        ${fs('Start Unit',['SHT','KG','SqM','LTR','JOB'],'true')}
        ${fs('End Unit',['SHT','KG','SqM','LTR','JOB'],'true')}
        ${fs('Unit Conversion',['1:1','Custom'])}
        ${fi('Rate (₹)','number',true)}
      </div>
      <div class="form-row cols-3">
        ${fi('Min. Charges (₹)','number')} ${fi('Make Setup Charges (₹)','number')}
        <div class="field-group" style="padding-top:4px">
          <label class="field-label">Flags</label>
          <div style="display:flex;flex-wrap:wrap;gap:10px;margin-top:8px">
            ${['Is Online Process','Display in Quotation','Tool Required','Is Edit To Be Produce Qty'].map(f=>
              `<label style="display:flex;align-items:center;gap:5px;font-size:11px;cursor:pointer"><input type="checkbox" /> ${f}</label>`).join('')}
          </div>
        </div>
      </div>

      <div class="form-section-title" style="margin-top:12px"><i class="bi bi-table"></i> Rate Slabs</div>
      <table class="line-table">
        <thead><tr><th>From Qty</th><th>To Qty</th><th>Start Unit</th><th>Rate Factor</th><th>Rate (₹)</th><th>Min. Charges</th><th></th></tr></thead>
        <tbody>
          ${[[1,5000,'SHT','1.0','₹950','₹500'],[5001,20000,'SHT','0.95','₹850','₹500'],[20001,99999,'SHT','0.90','₹750','₹500']].map(r=>`
          <tr>${r.slice(0,6).map((v,i)=>`<td><input class="form-input" value="${v}" style="width:${i===2?55:60}px;padding:3px 5px;font-size:11px" /></td>`).join('')}
          <td><button class="btn btn-delete btn-icon btn-sm"><i class="bi bi-trash"></i></button></td></tr>`).join('')}
          <tr><td colspan="7" style="text-align:center;padding:6px"><button class="btn btn-ghost btn-sm"><i class="bi bi-plus"></i> Add Slab</button></td></tr>
        </tbody>
      </table>

      <div class="form-section-title" style="margin-top:12px"><i class="bi bi-gear"></i> Machine Allocation</div>
      <table class="line-table">
        <thead><tr><th>Machine</th><th>Department</th><th>Default</th><th></th></tr></thead>
        <tbody>
          <tr>
            <td><select class="form-select" style="font-size:11px;padding:3px 5px;min-width:140px"><option>Flexo Press-2 (MCH-04)</option><option>Flexo Press-1 (MCH-03)</option></select></td>
            <td style="font-size:11px">Printing</td>
            <td><input type="checkbox" checked /></td>
            <td><button class="btn btn-delete btn-icon btn-sm"><i class="bi bi-trash"></i></button></td>
          </tr>
          <tr><td colspan="4" style="text-align:center;padding:6px"><button class="btn btn-ghost btn-sm"><i class="bi bi-plus"></i> Add Machine</button></td></tr>
        </tbody>
      </table>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal('modal-m-process')">Cancel</button>
      <button class="btn btn-save"><i class="bi bi-check-lg"></i> Save Process</button>
    </div>
  </div>
</div>`);

  // ─── VEHICLE MASTER ───────────────────────────────────────────────────
  ca.insertAdjacentHTML('beforeend', `
<div class="page" id="page-m-vehicle">
  <div class="page-header">
    <div><div class="page-title">Vehicle Master</div><div class="page-subtitle">Fleet definitions for dispatch operations</div></div>
    <div class="page-actions">
      <button class="btn btn-create" onclick="openModal('modal-m-vehicle')"><i class="bi bi-plus"></i> Add Vehicle</button>
    </div>
  </div>
  <div class="grid-wrap">
    <table class="data-table">
      <thead><tr><th>Vehicle Name</th><th>Model</th><th>Reg No</th><th>Transporter</th><th>Vehicle Type</th><th>Fuel Type</th><th>Tare Wt. (kg)</th><th>Emissions</th><th>Status</th><th></th></tr></thead>
      <tbody>
        ${[['Truck-1','TATA 407','MH12 AB 1234','Self','Truck','Diesel','1,800','—','Active'],
           ['Truck-2','Eicher 14ft','GJ05 CD 5678','Self','Truck','Diesel','3,200','—','Active'],
           ['Tempo-1','TATA Ace','RJ14 GH 3456','Self','Tempo','Diesel','800','—','Active'],
           ['Truck-3','TATA 709','UP32 IJ 7890','Mahindra Log.','Truck','Diesel','2,800','—','Active'],
        ].map(([n,m,r,t,vt,ft,tw,em,st])=>`
        <tr onclick="openModal('modal-m-vehicle')">
          <td><b>${n}</b></td><td class="muted" style="font-size:11px">${m}</td>
          <td style="font-family:monospace;font-size:11px">${r}</td>
          <td style="font-size:11px">${t}</td>
          <td>${tag('blue',vt)}</td>
          <td class="muted" style="font-size:11px">${ft}</td>
          <td class="text-right">${tw}</td>
          <td class="muted" style="font-size:11px">${em}</td>
          <td>${tag('green',st)}</td>
          <td class="actions-cell"><button class="btn btn-edit btn-icon btn-sm" onclick="event.stopPropagation()"><i class="bi bi-pencil"></i></button><button class="btn btn-delete btn-icon btn-sm" onclick="event.stopPropagation()"><i class="bi bi-trash"></i></button></td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>
</div>
<div class="modal-overlay hidden" id="modal-m-vehicle">
  <div class="modal modal-md">
    <div class="modal-header"><div class="modal-icon"><i class="bi bi-truck"></i></div>
      <div><div class="modal-title">Add / Edit Vehicle</div></div>
      <button class="modal-close" onclick="closeModal('modal-m-vehicle')"><i class="bi bi-x"></i></button>
    </div>
    <div class="modal-body">
      <div class="form-row cols-2">
        ${fi('Vehicle Name','text',true)} ${fi('Model')}
      </div>
      <div class="form-row cols-2">
        ${fi('Vehicle Reg No','text',true,'e.g. MH12 AB 1234')}
        ${fs('Transporter',['Self','Mahindra Logistics','DTDC'])}
      </div>
      <div class="form-row cols-2">
        ${fs('Vehicle Type',['Truck','Tempo','Auto','Bike','Container'])}
        ${fs('Fuel Type',['Diesel','Petrol','CNG','Electric'])}
      </div>
      <div class="form-row cols-2">
        ${fi('Tare Weight (kg)','number')}
        ${fi('Emissions','number',false,'CO2 g/km')}
      </div>
      ${fs('Status',['Active','Inactive','Under Maintenance','Scrapped'])}
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal('modal-m-vehicle')">Cancel</button>
      <button class="btn btn-save"><i class="bi bi-check-lg"></i> Save</button>
    </div>
  </div>
</div>`);

  // ─── EMPLOYEE MASTER ──────────────────────────────────────────────────
  ca.insertAdjacentHTML('beforeend', `
<div class="page" id="page-m-employee">
  <div class="page-header">
    <div><div class="page-title">Employee Master</div><div class="page-subtitle">Employee HR records — department, designation, shift and contact details</div></div>
    <div class="page-actions">
      <button class="btn btn-secondary btn-sm"><i class="bi bi-download"></i> Export</button>
      <button class="btn btn-create" onclick="openModal('modal-m-employee')"><i class="bi bi-plus"></i> Add Employee</button>
    </div>
  </div>
  <div class="grid-wrap">
    <table class="data-table">
      <thead><tr><th>Emp No</th><th>Employee Name</th><th>Department</th><th>Designation</th><th>Shift</th><th>Date of Birth</th><th>Phone</th><th>Email</th><th>Joining Date</th><th>Is Active</th><th></th></tr></thead>
      <tbody>
        ${[['EMP-001','Ramesh Sharma','Playing Card','Supervisor','Day','12 Jan 1985','98765 43201','ramesh@estimo.com','01 Jan 2020',true],
           ['EMP-002','Suresh Mehta','Printing','Machine Operator','Day','08 Mar 1990','98765 43202','suresh@estimo.com','15 Mar 2019',true],
           ['EMP-003','Manoj Kumar','Collation','Operator','Day','22 Jun 1992','98765 43203','manoj@estimo.com','10 Jun 2021',true],
           ['EMP-004','Priya Mehta','Sales','Sales Executive','Day','05 Sep 1995','98765 43207','priya@estimo.com','12 Jul 2023',true],
        ].map(([en,nm,dept,desig,sh,dob,ph,em,jd,active])=>`
        <tr onclick="openModal('modal-m-employee')">
          <td><b>${en}</b></td><td>${nm}</td>
          <td style="font-size:11px">${dept}</td><td style="font-size:11px">${desig}</td>
          <td>${tag('blue',sh)}</td>
          <td class="muted" style="font-size:11px">${dob}</td>
          <td style="font-size:11px">${ph}</td>
          <td style="font-size:11px">${em}</td>
          <td class="muted" style="font-size:11px">${jd}</td>
          <td>${tag(active?'green':'red',active?'Active':'Inactive')}</td>
          <td class="actions-cell"><button class="btn btn-edit btn-icon btn-sm" onclick="event.stopPropagation()"><i class="bi bi-pencil"></i></button><button class="btn btn-delete btn-icon btn-sm" onclick="event.stopPropagation()"><i class="bi bi-trash"></i></button></td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>
</div>
<div class="modal-overlay hidden" id="modal-m-employee">
  <div class="modal modal-lg">
    <div class="modal-header"><div class="modal-icon"><i class="bi bi-person-badge"></i></div>
      <div><div class="modal-title">Add / Edit Employee</div></div>
      <button class="modal-close" onclick="closeModal('modal-m-employee')"><i class="bi bi-x"></i></button>
    </div>
    <div class="modal-body">
      <div class="form-row cols-3">
        ${fi('Employee Name','text',true)} ${fi('Designation','text')}
        ${fs('Department',['Playing Card','Printing','Collation','Varnishing','Dispatch','Sales','Stores','QC'],'true')}
      </div>
      <div class="form-row cols-3">
        ${fs('Shift',['Day','Night','General'])}
        ${fi('Date of Birth','date')} ${fi('Joining Date','date')}
      </div>
      <div class="form-row cols-3">
        ${fi('Phone No.')} ${fi('Email','email')} ${fi('PAN No.')}
      </div>
      <div class="form-row cols-2">
        <div class="field-group"><label class="field-label">Address</label><textarea class="form-textarea" style="min-height:60px"></textarea></div>
        <div class="field-group"><label class="field-label">Status</label><select class="form-select"><option>Active</option><option>Inactive</option><option>Resigned</option></select></div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal('modal-m-employee')">Cancel</button>
      <button class="btn btn-save"><i class="bi bi-check-lg"></i> Save</button>
    </div>
  </div>
</div>`);
});
