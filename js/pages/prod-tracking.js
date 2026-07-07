document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('contentArea').insertAdjacentHTML('beforeend', `
<div class="page" id="page-prod-tracking">
  <div class="page-header">
    <div>
      <div class="page-title">Production Tracking</div>
      <div class="page-subtitle">Real-time department-wise production board — 30 June 2026</div>
    </div>
    <div class="page-actions">
      <select class="form-select" style="width:160px;padding:5px 8px">
        <option>All Departments</option>
        <option>Playing Card</option>
        <option>Printing</option>
        <option>Collation</option>
        <option>Varnishing</option>
        <option>Punching</option>
      </select>
      <button class="btn btn-secondary btn-sm"><i class="bi bi-arrow-clockwise"></i> Refresh</button>
      <button class="btn btn-create" onclick="openModal('modal-update-stage')"><i class="bi bi-plus"></i> Update Stage</button>
    </div>
  </div>

  <!-- Department KPI strip -->
  <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin-bottom:16px">
    ${[
      ['Playing Card','#003366','bi-layers','88%','21/25 jobs'],
      ['Printing','#f59e0b','bi-printer','74%','17/23 jobs'],
      ['Collation','#22c55e','bi-pin-angle','96%','27/28 jobs'],
      ['Varnishing','#ef4444','bi-droplet','62%','11/18 jobs'],
      ['Punching','#8b5cf6','bi-scissors','91%','10/11 jobs'],
    ].map(([dept, color, icon, eff, jobs]) => `
    <div style="background:#fff;border:1px solid var(--bd-default);border-radius:8px;padding:12px 14px;border-top:3px solid ${color};Deck-shadow:var(--shadow-sm)">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
        <i class="bi ${icon}" style="color:${color};font-size:16px"></i>
        <span style="font-size:13px;font-weight:700;color:var(--fg-default)">${dept}</span>
      </div>
      <div style="font-size:22px;font-weight:800;color:var(--fg-default)">${eff}</div>
      <div style="font-size:11px;color:var(--fg-muted);margin-top:2px">${jobs} done today</div>
      <div class="progress-bar" style="margin-top:8px"><div class="progress-fill" style="width:${eff};background:${color}"></div></div>
    </div>`).join('')}
  </div>

  <!-- Kanban Board — 5 departments, 4 columns each -->
  <div style="margin-bottom:12px">
    <div class="seg-tabs" style="display:inline-flex">
      <div class="seg-tab active" onclick="showDeptBoard('Playing Card')">Playing Card</div>
      <div class="seg-tab" onclick="showDeptBoard('printing')">Printing</div>
      <div class="seg-tab" onclick="showDeptBoard('collation')">Collation</div>
      <div class="seg-tab" onclick="showDeptBoard('varnishing')">Varnishing</div>
      <div class="seg-tab" onclick="showDeptBoard('punching')">Punching</div>
    </div>
  </div>

  <div class="kanban-board" id="kanban-board">
    <!-- Pending -->
    <div class="kanban-col col-pending">
      <div class="kanban-col-header"><i class="bi bi-hourglass-split" style="color:#f59e0b"></i> Pending <span class="count">4</span></div>
      <div class="kanban-items">
        ${[
          ['JC-2026-091','Patanjali','FMCG Carton 3-GSM','80,000','Printing Press-1','Ramesh B.','High'],
          ['JC-2026-092','ITC Ltd','Industrial Deck 7-GSM','1,20,000','Printing Press-2','Suresh M.','Med'],
          ['JC-2026-093','HUL','Poker Size 5-GSM','60,000','Printing Press-1','Ramesh B.','High'],
          ['JC-2026-094','Nestle','Food Deck 3-GSM','2,00,000','Printing Press-2','—','Low'],
        ].map(([jc,cust,desc,qty,mach,op,pri]) => `
        <div class="kanban-card" onclick="openModal('modal-update-stage')">
          <div class="kanban-card-title">${jc}</div>
          <div class="kanban-card-sub" style="font-weight:600;color:var(--fg-default)">${cust}</div>
          <div class="kanban-card-sub" style="margin-top:3px">${desc}</div>
          <div class="kanban-card-meta">
            <span class="tag tag-${pri==='High'?'red':pri==='Med'?'orange':'gray'}" style="font-size:10px">${pri}</span>
            <span class="tag tag-navy" style="font-size:10px">${qty}</span>
          </div>
          <div style="margin-top:8px;font-size:11px;color:var(--fg-muted);display:flex;gap:8px">
            <span><i class="bi bi-gear"></i> ${mach}</span>
            <span><i class="bi bi-person"></i> ${op}</span>
          </div>
        </div>`).join('')}
      </div>
    </div>

    <!-- Running -->
    <div class="kanban-col col-running">
      <div class="kanban-col-header"><i class="bi bi-play-circle-fill" style="color:#3b82f6"></i> Running <span class="count">2</span></div>
      <div class="kanban-items">
        ${[
          ['JC-2026-089','Amul Dairy','Poker Size 7-GSM','1,00,000','Printing Press-1','Ramesh B.','67%'],
          ['JC-2026-090','Metro Cash','Slotted Deck 5-GSM','25,000','Printing Press-2','Dinesh K.','45%'],
        ].map(([jc,cust,desc,qty,mach,op,pct]) => `
        <div class="kanban-card" onclick="openModal('modal-update-stage')">
          <div class="kanban-card-title">${jc}</div>
          <div class="kanban-card-sub" style="font-weight:600;color:var(--fg-default)">${cust}</div>
          <div class="kanban-card-sub" style="margin-top:3px">${desc}</div>
          <div style="margin-top:8px">
            <div style="display:flex;justify-content:space-between;font-size:11px;color:var(--fg-muted);margin-bottom:3px">
              <span>Progress</span><span style="font-weight:700;color:var(--fg-default)">${pct}</span>
            </div>
            <div class="progress-bar"><div class="progress-fill" style="width:${pct};background:#3b82f6"></div></div>
          </div>
          <div style="margin-top:8px;font-size:11px;color:var(--fg-muted);display:flex;gap:8px">
            <span><i class="bi bi-gear"></i> ${mach}</span>
            <span><i class="bi bi-person"></i> ${op}</span>
          </div>
          <div class="kanban-card-meta" style="margin-top:6px">
            <span class="tag tag-blue" style="font-size:10px">In Progress</span>
            <span class="tag tag-navy" style="font-size:10px">${qty}</span>
          </div>
        </div>`).join('')}
      </div>
    </div>

    <!-- Completed -->
    <div class="kanban-col col-done">
      <div class="kanban-col-header"><i class="bi bi-check-circle-fill" style="color:#22c55e"></i> Completed <span class="count">18</span></div>
      <div class="kanban-items">
        ${[
          ['JC-2026-087','Godrej','Storage Deck 5-GSM','30,000'],
          ['JC-2026-085','Dabur','Shampoo Carton 3-GSM','1,20,000'],
          ['JC-2026-083','Asian Paints','Paint Deck 5-GSM','18,500'],
          ['JC-2026-081','Marico','Hair Oil Deck 3-GSM','75,000'],
          ['JC-2026-079','Britannia','Biscuit Deck 3-GSM','2,50,000'],
        ].map(([jc,cust,desc,qty]) => `
        <div class="kanban-card" style="opacity:0.8">
          <div class="kanban-card-title">${jc}</div>
          <div class="kanban-card-sub" style="font-weight:600">${cust}</div>
          <div class="kanban-card-sub" style="margin-top:2px;font-size:11px">${desc}</div>
          <div class="kanban-card-meta" style="margin-top:8px">
            <span class="tag tag-green" style="font-size:10px">✓ Done</span>
            <span class="tag tag-gray" style="font-size:10px">${qty}</span>
          </div>
        </div>`).join('')}
        <div style="text-align:center;padding:8px;font-size:12px;color:var(--fg-muted)">+13 more completed today</div>
      </div>
    </div>

    <!-- Delayed -->
    <div class="kanban-col col-delay">
      <div class="kanban-col-header"><i class="bi bi-exclamation-triangle-fill" style="color:#ef4444"></i> Delayed <span class="count">1</span></div>
      <div class="kanban-items">
        <div class="kanban-card" style="border-color:#fecaca;background:#fff5f5" onclick="openModal('modal-update-stage')">
          <div class="kanban-card-title" style="color:#b91c1c">JC-2026-086</div>
          <div class="kanban-card-sub" style="font-weight:600">Asian Paints</div>
          <div class="kanban-card-sub" style="margin-top:2px">Paint Deck 350×250×250mm</div>
          <div style="margin-top:8px;padding:8px;background:#fef2f2;border-radius:4px;font-size:11px;color:#b91c1c">
            <i class="bi bi-clock-history"></i> <b>+4 hrs delay</b> — Printing Press-1 breakdown at 2 PM
          </div>
          <div class="kanban-card-meta" style="margin-top:8px">
            <span class="tag tag-red" style="font-size:10px">Delayed</span>
            <span class="tag tag-navy" style="font-size:10px">18,500 pcs</span>
          </div>
          <div style="margin-top:8px;font-size:11px;color:var(--fg-muted)"><i class="bi bi-gear"></i> Printing Press-1 &nbsp; <i class="bi bi-person"></i> Ramesh B.</div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Update Stage Modal -->
<div class="modal-overlay hidden" id="modal-update-stage">
  <div class="modal modal-md">
    <div class="modal-header">
      <div class="modal-icon" style="background:#eff6ff;color:#1d4ed8"><i class="bi bi-gear-wide-connected"></i></div>
      <div><div class="modal-title">Update Production Stage</div><div class="modal-sub">JC-2026-089 — Playing Card Stage</div></div>
      <button class="modal-close" onclick="closeModal('modal-update-stage')"><i class="bi bi-x"></i></button>
    </div>
    <div class="modal-body">
      <div class="form-row cols-2">
        <div class="field-group">
          <label class="field-label">Department</label>
          <select class="form-select"><option>Playing Card</option><option>Printing</option><option selected>Collation</option><option>Varnishing</option><option>Punching</option></select>
        </div>
        <div class="field-group">
          <label class="field-label required">Status</label>
          <select class="form-select">
            <option>Pending</option>
            <option selected>Running</option>
            <option>Completed</option>
            <option>Delayed</option>
          </select>
        </div>
      </div>
      <div class="form-row cols-2">
        <div class="field-group">
          <label class="field-label">Machine</label>
          <select class="form-select"><option selected>Collator-1</option><option>Collator-2</option></select>
        </div>
        <div class="field-group">
          <label class="field-label">Operator</label>
          <select class="form-select"><option selected>Manoj K.</option><option>Vikram S.</option><option>Arun T.</option></select>
        </div>
      </div>
      <div class="form-row cols-2">
        <div class="field-group">
          <label class="field-label required">Qty Completed (this update)</label>
          <input class="form-input" type="number" value="5000" />
        </div>
        <div class="field-group">
          <label class="field-label">Total Done so far</label>
          <input class="form-input" value="67,000" readonly style="background:var(--bg-subtle)" />
        </div>
      </div>
      <div class="field-group">
        <label class="field-label">Delay Reason (if any)</label>
        <select class="form-select">
          <option>— None —</option>
          <option>Machine Breakdown</option>
          <option>Material Shortage</option>
          <option>Power Failure</option>
          <option>Operator Absent</option>
          <option>Other</option>
        </select>
      </div>
      <div class="field-group">
        <label class="field-label">Remark</label>
        <textarea class="form-textarea" placeholder="Add notes..." style="min-height:60px"></textarea>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal('modal-update-stage')">Cancel</button>
      <button class="btn btn-save"><i class="bi bi-check-lg"></i> Update Stage</button>
    </div>
  </div>
</div>
`);
});

function showDeptBoard(dept) {
  document.querySelectorAll('#page-prod-tracking .seg-tab').forEach((t,i) => {
    t.classList.toggle('active', ['Playing Card','printing','collation','varnishing','punching'][i] === dept);
  });
}
