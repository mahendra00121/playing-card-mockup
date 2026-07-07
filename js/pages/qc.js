document.getElementById('contentArea').insertAdjacentHTML('beforeend', `

<!-- ============================================== -->
<!-- QC DASHBOARD PAGE                              -->
<!-- ============================================== -->
<div class="page" id="page-qc-dashboard">
  <div class="header-actions" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
    <div style="font-size:18px;font-weight:700">Quality Control Dashboard</div>
    <div style="display:flex;gap:8px;">
      <select class="form-select"><option>This Week</option><option>Last Month</option></select>
      <button class="btn btn-primary" onclick="navigate('qc-entry')">Pending Inspections</button>
    </div>
  </div>

  <div class="kpi-grid">
    <div class="kpi-card">
      <div class="kpi-title">Pass Rate</div>
      <div class="kpi-value" style="color:var(--green)">98.2%</div>
      <div class="kpi-sub" style="color:var(--green)"><i class="bi bi-arrow-up-right"></i> 0.4% from last week</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-title">Rejected Sheets</div>
      <div class="kpi-value" style="color:var(--red)">142</div>
      <div class="kpi-sub" style="color:var(--red)"><i class="bi bi-arrow-up-right"></i> 12 more than average</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-title">Avg Slip Test (CoF)</div>
      <div class="kpi-value">0.32</div>
      <div class="kpi-sub">Target: 0.30 - 0.35</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-title">Pending QC Jobs</div>
      <div class="kpi-value">8</div>
      <div class="kpi-sub">3 High Priority</div>
    </div>
  </div>

  <div class="grid-2" style="margin-top:16px">
    <div class="card">
      <div class="card-header"><span class="card-title">Defect Breakdown</span></div>
      <div class="card-body" style="height:250px;display:flex;align-items:center;justify-content:center;color:var(--fg-muted)">
        <!-- Placeholder for a chart -->
        <svg viewBox="0 0 100 100" style="width:180px;height:180px;transform:rotate(-90deg)">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#f1f5f9" stroke-width="20"></circle>
          <circle cx="50" cy="50" r="40" fill="none" stroke="#ef4444" stroke-width="20" stroke-dasharray="251" stroke-dashoffset="150"></circle>
          <circle cx="50" cy="50" r="40" fill="none" stroke="#f59e0b" stroke-width="20" stroke-dasharray="251" stroke-dashoffset="200" style="transform-origin:center;transform:rotate(144deg)"></circle>
          <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" stroke-width="20" stroke-dasharray="251" stroke-dashoffset="220" style="transform-origin:center;transform:rotate(220deg)"></circle>
        </svg>
        <div style="margin-left:24px;display:flex;flex-direction:column;gap:12px;">
          <div style="font-size:12px"><span style="display:inline-block;width:10px;height:10px;background:#ef4444;border-radius:2px;margin-right:6px"></span> Registration / Centering (40%)</div>
          <div style="font-size:12px"><span style="display:inline-block;width:10px;height:10px;background:#f59e0b;border-radius:2px;margin-right:6px"></span> Corner Rounding (20%)</div>
          <div style="font-size:12px"><span style="display:inline-block;width:10px;height:10px;background:#3b82f6;border-radius:2px;margin-right:6px"></span> Slip / Snap Failed (15%)</div>
          <div style="font-size:12px"><span style="display:inline-block;width:10px;height:10px;background:#f1f5f9;border-radius:2px;margin-right:6px"></span> Other (25%)</div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-header"><span class="card-title">Recent Failed Inspections</span></div>
      <div class="card-body" style="padding:0">
        <table class="data-table">
          <thead><tr><th>Job Ref</th><th>Product</th><th>Failed Test</th><th>Action Taken</th></tr></thead>
          <tbody>
            <tr><td>JC-2026-081</td><td>Casino Deck</td><td><span class="tag tag-red">Snap Test</span></td><td>Rejected Batch</td></tr>
            <tr><td>JC-2026-078</td><td>Promo Deck</td><td><span class="tag tag-red">Registration</span></td><td>Reprint 50 sheets</td></tr>
            <tr><td>JC-2026-075</td><td>Standard Deck</td><td><span class="tag tag-orange">Slip Test (0.40)</span></td><td>Re-varnish</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

<!-- ============================================== -->
<!-- QC ENTRY / AUDIT PAGE                          -->
<!-- ============================================== -->
<div class="page" id="page-qc-entry">
  <div class="header-actions" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
    <div style="font-size:18px;font-weight:700">Pending QC Inspections</div>
    <div style="display:flex;gap:8px;">
      <input type="text" class="form-input" placeholder="Search Job / Product..." style="width:200px">
      <button class="btn btn-outline"><i class="bi bi-filter"></i> Filter</button>
    </div>
  </div>

  <div class="card">
    <div class="card-body" style="padding:0">
      <table class="data-table">
        <thead>
          <tr>
            <th>Date / Time</th>
            <th>Job Ref</th>
            <th>Customer</th>
            <th>Product</th>
            <th>Stage</th>
            <th>Inspector</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${[
            ['Today 10:30 AM','JC-2026-089','Amul Dairy','Butter Deck Poker Size','Post-Varnish','—','Pending'],
            ['Today 11:15 AM','JC-2026-090','Metro Cash','Retail Promo Deck','Post-Punching','—','Pending'],
            ['Today 12:00 PM','JC-2026-091','ITC Ltd','Premium Deck','Post-Collation','—','Pending'],
            ['Yesterday','JC-2026-088','Godrej','Storage Deck','Final QC','Manoj K.','Pass'],
          ].map(([dt, j, c, p, st, insp, stat]) => `
            <tr style="cursor:pointer" onclick="openQCModal('${j}', '${p}')">
              <td>${dt}</td>
              <td class="font-bold">${j}</td>
              <td>${c}</td>
              <td>${p}</td>
              <td>${st}</td>
              <td>${insp}</td>
              <td><span class="tag ${stat==='Pending'?'tag-blue':(stat==='Pass'?'tag-green':'tag-red')}">${stat}</span></td>
              <td class="text-right"><button class="btn btn-outline" style="padding:4px 8px;font-size:11px">Inspect</button></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  </div>
</div>

`);

function openQCModal(jobRef, product) {
  const content = `
    <div class="modal-header">
      <div>
        <div class="modal-title">Quality Control Audit</div>
        <div class="modal-sub">Job Ref: ${jobRef} | Product: ${product}</div>
      </div>
      <button class="btn btn-icon" onclick="closeModal()"><i class="bi bi-x"></i></button>
    </div>
    <div class="modal-body">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
        
        <div class="card" style="margin-bottom:0">
          <div class="card-header"><span class="card-title">Physical Parameters</span></div>
          <div class="card-body">
            <div class="field-group">
              <label class="field-label required">Slip Test (CoF)</label>
              <div style="display:flex;gap:8px;align-items:center;">
                <input type="number" class="form-input" value="0.32" step="0.01" style="width:100px">
                <span style="font-size:11px;color:var(--fg-muted)">Target: 0.30 - 0.35</span>
              </div>
            </div>
            <div class="field-group">
              <label class="field-label required">Snap / Memory Test</label>
              <select class="form-select">
                <option value="Pass" selected>Pass - Returns to flat</option>
                <option value="Fail">Fail - Retains bend</option>
              </select>
            </div>
          </div>
        </div>

        <div class="card" style="margin-bottom:0">
          <div class="card-header"><span class="card-title">Visual & Cut Parameters</span></div>
          <div class="card-body">
            <div class="field-group">
              <label class="field-label required">Registration (Centering)</label>
              <select class="form-select">
                <option value="Pass" selected>Pass - Perfectly centered</option>
                <option value="Marginal">Marginal - Slight shift</option>
                <option value="Fail">Fail - Visibly off-center</option>
              </select>
            </div>
            <div class="field-group">
              <label class="field-label required">Corner Rounding Check</label>
              <select class="form-select">
                <option value="Pass" selected>Pass - Smooth R-3 corners</option>
                <option value="Fail">Fail - Rough / Uneven radius</option>
              </select>
            </div>
          </div>
        </div>

      </div>
      
      <div class="field-group" style="margin-top:16px">
        <label class="field-label">Inspector Comments</label>
        <textarea class="form-input" rows="2" placeholder="Any additional notes regarding quality..."></textarea>
      </div>

    </div>
    <div class="modal-footer">
      <button class="btn btn-outline" onclick="closeModal()">Cancel</button>
      <button class="btn btn-red" onclick="closeModal()">Fail / Reject</button>
      <button class="btn btn-primary" onclick="closeModal()">Pass Inspection</button>
    </div>
  `;
  openModal(content, '800px');
}
