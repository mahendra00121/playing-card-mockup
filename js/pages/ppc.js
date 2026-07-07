document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('contentArea').insertAdjacentHTML('beforeend', `
<div class="page" id="page-ppc">
  <div class="page-header">
    <div><div class="page-title">PPC — Production Planning</div><div class="page-subtitle">Machine load, daily schedule, priority jobs and capacity planning</div></div>
    <div class="page-actions">
      <button class="btn btn-secondary btn-sm"><i class="bi bi-arrow-clockwise"></i> Refresh</button>
      <button class="btn btn-create" onclick="openModal('modal-ppc-plan')"><i class="bi bi-plus"></i> Create Plan</button>
    </div>
  </div>

  <!-- Machine Load Summary -->
  <div style="margin-bottom:16px">
    <div style="font-size:14px;font-weight:700;margin-bottom:10px;color:var(--fg-default)">Machine Load — Today (30 Jun 2026)</div>
    <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:10px">
      ${[
        ['Printing Press-1','92%','#ef4444','8/8 hrs booked'],
        ['Printing Press-2','75%','#f59e0b','6/8 hrs booked'],
        ['Flexo Press-1','60%','#22c55e','5/8 hrs booked'],
        ['Flexo Press-2','100%','#ef4444','8/8 hrs booked'],
        ['Collator-1','85%','#f59e0b','7/8 hrs booked'],
        ['Collator-2','45%','#22c55e','4/8 hrs booked'],
        ['Coater-1','70%','#22c55e','6/8 hrs booked'],
        ['Puncher-1','30%','#22c55e','2/8 hrs booked'],
        ['Puncher-2','0%','#9ca3af','0/8 hrs — Idle'],
        ['Die Cutter-1','55%','#22c55e','4/8 hrs booked'],
      ].map(([mach,load,col,sub]) => `
      <div style="background:#fff;border:1px solid var(--bd-default);border-radius:8px;padding:12px;Deck-shadow:var(--shadow-sm)">
        <div style="font-size:12px;font-weight:700;margin-bottom:6px">${mach}</div>
        <div style="font-size:20px;font-weight:800;color:${col}">${load}</div>
        <div class="progress-bar" style="margin:6px 0"><div class="progress-fill" style="width:${load};background:${col}"></div></div>
        <div style="font-size:11px;color:var(--fg-muted)">${sub}</div>
      </div>`).join('')}
    </div>
  </div>

  <!-- Schedule Table -->
  <div class="card" style="margin-bottom:16px">
    <div class="card-header">
      <span class="card-title"><i class="bi bi-calendar-week" style="color:var(--primary);margin-right:6px"></i>Daily Schedule — 30 Jun 2026</span>
      <div style="display:flex;gap:8px">
        <button class="btn btn-ghost btn-sm"><i class="bi bi-chevron-left"></i> Yesterday</button>
        <button class="btn btn-create btn-sm">Today</button>
        <button class="btn btn-ghost btn-sm">Tomorrow <i class="bi bi-chevron-right"></i></button>
      </div>
    </div>
    <div class="card-body" style="padding:0">
      <table class="data-table">
        <thead><tr><th>Time Slot</th><th>Printing Press-1</th><th>Printing Press-2</th><th>Flexo Press-2</th><th>Collator-1</th><th>Coater-1</th></tr></thead>
        <tbody>
          ${[
            ['6:00–8:00 AM','JC-091 Patanjali','JC-092 ITC','JC-089 Amul','JC-088 Dabur','JC-087 Godrej'],
            ['8:00–10:00 AM','JC-091 Patanjali','JC-092 ITC','JC-089 Amul','JC-088 Dabur','JC-087 Godrej'],
            ['10:00–12:00 PM','JC-093 HUL','JC-092 ITC','JC-090 Metro','JC-089 Amul','JC-088 Dabur'],
            ['12:00–2:00 PM','JC-093 HUL','LUNCH BREAK','JC-090 Metro','LUNCH BREAK','JC-089 Amul'],
            ['2:00–4:00 PM','JC-094 Nestle','JC-094 Nestle','JC-093 HUL','JC-090 Metro','JC-090 Metro'],
            ['4:00–6:00 PM','JC-094 Nestle','JC-094 Nestle','JC-093 HUL','JC-091 Patanjali','JC-091 Patanjali'],
          ].map(([time, ...cols]) => `
          <tr>
            <td style="font-weight:700;font-size:12px;white-space:nowrap">${time}</td>
            ${cols.map(c => `<td style="font-size:11px;${c.includes('BREAK')?'background:#f3f4f6;text-align:center;color:var(--fg-muted);font-style:italic':''}">${c.includes('BREAK')?c:`<span class="tag tag-navy" style="font-size:10px">${c}</span>`}</td>`).join('')}
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>

  <!-- Priority Queue -->
  <div class="card">
    <div class="card-header">
      <span class="card-title"><i class="bi bi-list-ol" style="color:var(--primary);margin-right:6px"></i>Priority Job Queue</span>
      <span class="tag tag-red">3 High Priority</span>
    </div>
    <div class="card-body" style="padding:0">
      <table class="data-table">
        <thead><tr><th>Priority</th><th>Job Card</th><th>Customer</th><th>Product</th><th>Qty</th><th>Due Date</th><th>Status</th><th>Dept Next</th><th></th></tr></thead>
        <tbody>
          ${[
            [1,'JC-2026-089','Amul Dairy','Poker Size 7-GSM','1,00,000','Today','67% Done','Collation','Delayed'],
            [2,'JC-2026-086','Asian Paints','Paint Deck','18,500','Today','50% Done','Collation','Delayed'],
            [3,'JC-2026-091','Patanjali','FMCG Carton','80,000','1 Jul','0% Done','Playing Card','On Track'],
            [4,'JC-2026-090','Metro Cash','Slotted Deck','25,000','1 Jul','30% Done','Printing','On Track'],
            [5,'JC-2026-092','ITC Ltd','Industrial Deck','1,20,000','3 Jul','0% Done','Playing Card','On Track'],
          ].map(([pri,jc,cust,prod,qty,due,prog,next,track]) => `
          <tr>
            <td><div style="width:28px;height:28px;border-radius:50%;background:var(--primary);color:#fff;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800">${pri}</div></td>
            <td><b>${jc}</b></td><td>${cust}</td><td style="font-size:12px">${prod}</td>
            <td class="text-right">${qty}</td>
            <td class="muted" style="${track==='Delayed'?'color:#ef4444;font-weight:700':''}">${due}</td>
            <td><span style="font-size:12px;color:var(--fg-muted)">${prog}</span></td>
            <td><span class="tag tag-blue" style="font-size:10px">${next}</span></td>
            <td><span class="tag tag-${track==='Delayed'?'red':'green'}">${track}</span></td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>
</div>

<!-- Create Plan Modal -->
<div class="modal-overlay hidden" id="modal-ppc-plan">
  <div class="modal modal-lg">
    <div class="modal-header">
      <div class="modal-icon"><i class="bi bi-calendar3-week"></i></div>
      <div><div class="modal-title">Create Production Plan</div><div class="modal-sub">Schedule jobs to machines for the upcoming days</div></div>
      <button class="modal-close" onclick="closeModal('modal-ppc-plan')"><i class="bi bi-x"></i></button>
    </div>
    <div class="modal-body">
      <div class="form-row cols-3">
        <div class="field-group"><label class="field-label required">Plan Date</label><input class="form-input" type="date" value="2026-07-01" /></div>
        <div class="field-group"><label class="field-label required">Shift</label><select class="form-select"><option>Day (6AM–6PM)</option><option>Night (6PM–6AM)</option><option>Double Shift</option></select></div>
        <div class="field-group"><label class="field-label">Machine</label><select class="form-select"><option>All Machines</option><option>Printing Press-1</option><option>Flexo Press-2</option></select></div>
      </div>
      <div class="form-section-title" style="margin-top:14px"><i class="bi bi-list-task"></i> Assign Jobs</div>
      <table class="line-table">
        <thead><tr><th>Job Card</th><th>Customer</th><th>Stage</th><th>Machine</th><th>From</th><th>To</th><th>Operator</th></tr></thead>
        <tbody>
          ${['JC-2026-091','JC-2026-092','JC-2026-093'].map((jc,i) => `
          <tr>
            <td><b>${jc}</b></td>
            <td>${['Patanjali','ITC Ltd','HUL'][i]}</td>
            <td><select class="form-select" style="font-size:12px;padding:4px 6px"><option>Playing Card</option><option>Printing</option></select></td>
            <td><select class="form-select" style="font-size:12px;padding:4px 6px"><option>Printing Press-1</option><option>Printing Press-2</option></select></td>
            <td><input class="form-input" type="time" value="0${6+i*2}:00" style="font-size:12px;padding:4px 6px" /></td>
            <td><input class="form-input" type="time" value="0${8+i*2}:00" style="font-size:12px;padding:4px 6px" /></td>
            <td><select class="form-select" style="font-size:12px;padding:4px 6px"><option>Ramesh B.</option><option>Suresh M.</option></select></td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal('modal-ppc-plan')">Cancel</button>
      <button class="btn btn-save"><i class="bi bi-check-lg"></i> Save Plan</button>
    </div>
  </div>
</div>
`);
});
