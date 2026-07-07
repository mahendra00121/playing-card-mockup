document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('contentArea').insertAdjacentHTML('beforeend', `
<div class="page" id="page-job-card">
  <div class="page-header">
    <div>
      <div class="page-title">Job Card</div>
      <div class="page-subtitle">Production work orders linked to confirmed sales orders</div>
    </div>
    <div class="page-actions">
      <button class="btn btn-secondary btn-sm"><i class="bi bi-download"></i> Export</button>
      <button class="btn btn-secondary btn-sm"><i class="bi bi-arrow-clockwise"></i></button>
      <button class="btn btn-create" onclick="openModal('modal-jobcard-new')"><i class="bi bi-plus"></i> New Job Card</button>
    </div>
  </div>

  <div class="toolbar">
    <div class="toolbar-left">
      <div class="seg-tabs">
        <div class="seg-tab active">All</div>
        <div class="seg-tab">Pending</div>
        <div class="seg-tab">In Progress</div>
        <div class="seg-tab">Completed</div>
        <div class="seg-tab">Delayed</div>
      </div>
      <div class="search-input-wrap">
        <i class="bi bi-search"></i>
        <input class="search-input" placeholder="Search job no, customer, Deck..." />
      </div>
    </div>
    <div class="toolbar-right">
      <select class="form-select" style="width:140px;padding:5px 8px">
        <option>All Machines</option>
        <option>Printing Press 1</option>
        <option>Flexo Press 2</option>
        <option>Collator 1</option>
      </select>
      <input class="form-input" type="date" value="2026-06-30" style="width:135px;padding:5px 8px" />
    </div>
  </div>

  <div class="grid-wrap">
    <table class="data-table">
      <thead>
        <tr>
          <th>Job No</th>
          <th>Sales Order</th>
          <th>Customer</th>
          <th>Deck Description</th>
          <th>GSM</th>
          <th>Order Qty</th>
          <th>Priority</th>
          <th>Due Date</th>
          <th>Stages</th>
          <th>Overall</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${[
          ['JC-2026-089','SO-1284','Amul Dairy','Poker Size 500×350×300mm','7','1,00,000','🔴 High','30 Jun','corr✓ print✓ stitch⟳ glue— punch—','67%','In Progress'],
          ['JC-2026-090','SO-1285','Metro Cash','Slotted Deck 400×300×250mm','5','25,000','🟠 Med','1 Jul','corr✓ print⟳ stitch— glue— punch—','30%','In Progress'],
          ['JC-2026-091','SO-1286','Patanjali','FMCG Carton 300×200×150mm','3','80,000','🔴 High','1 Jul','corr— print— stitch— glue— punch—','0%','Pending'],
          ['JC-2026-092','SO-1287','ITC Ltd','Industrial Deck 600×400×400mm','7','1,20,000','🟠 Med','3 Jul','corr— print— stitch— glue— punch—','0%','Pending'],
          ['JC-2026-087','SO-1282','Godrej','Storage Deck 450×350×350mm','5','30,000','🟢 Low','28 Jun','corr✓ print✓ stitch✓ glue✓ punch✓','100%','Completed'],
          ['JC-2026-088','SO-1283','Dabur','Shampoo Carton 250×150×120mm','3','1,20,000','🟠 Med','29 Jun','corr✓ print✓ stitch✓ glue⟳ punch—','80%','In Progress'],
          ['JC-2026-086','SO-1280','Asian Paints','Paint Deck 350×250×250mm','5','18,500','🔴 High','29 Jun','corr✓ print✓ stitch⟳ glue— punch—','50%','Delayed'],
        ].map(([jno,so,cust,desc,GSM,qty,pri,due,stages,pct,status]) => {
          const stColor = status==='Completed'?'green':status==='Delayed'?'red':status==='Pending'?'gold':'blue';
          const pctNum = parseInt(pct);
          const barColor = pctNum===100?'success':pctNum>=60?'':'warning';
          return `<tr onclick="openModal('modal-jobcard-detail')">
            <td><b>${jno}</b></td>
            <td><span class="text-primary">${so}</span></td>
            <td>${cust}</td>
            <td style="max-width:160px;font-size:12px">${desc}</td>
            <td class="text-center">${GSM}</td>
            <td class="text-right">${qty}</td>
            <td style="font-size:12px">${pri}</td>
            <td class="muted" style="${status==='Delayed'?'color:#ef4444;font-weight:700':''}">${due}</td>
            <td style="font-size:11px;white-space:nowrap;font-family:monospace">${stages}</td>
            <td style="min-width:90px">
              <div style="display:flex;align-items:center;gap:5px">
                <div class="progress-bar" style="width:60px"><div class="progress-fill ${barColor}" style="width:${pct}"></div></div>
                <span style="font-size:11px;font-weight:700">${pct}</span>
              </div>
            </td>
            <td><span class="tag tag-${stColor}">${status}</span></td>
            <td class="actions-cell">
              <button class="btn btn-ghost btn-icon btn-sm" title="View Detail"><i class="bi bi-eye"></i></button>
              <button class="btn btn-edit btn-icon btn-sm" title="Edit"><i class="bi bi-pencil"></i></button>
              <button class="btn btn-print btn-icon btn-sm" title="Print Job Card"><i class="bi bi-printer"></i></button>
            </td>
          </tr>`;
        }).join('')}
      </tbody>
    </table>
    <div class="grid-footer">
      <span>Showing 7 of 89 records</span>
      <div class="pagination">
        <button class="page-btn"><i class="bi bi-chevron-left"></i></button>
        <button class="page-btn active">1</button>
        <button class="page-btn">2</button>
        <button class="page-btn">3</button>
        <button class="page-btn"><i class="bi bi-chevron-right"></i></button>
      </div>
    </div>
  </div>
</div>

<!-- New Job Card Modal -->
<div class="modal-overlay hidden" id="modal-jobcard-new">
  <div class="modal modal-lg">
    <div class="modal-header">
      <div class="modal-icon"><i class="bi bi-journal-text"></i></div>
      <div><div class="modal-title">Create Job Card</div><div class="modal-sub">Link a sales order to production floor</div></div>
      <button class="modal-close" onclick="closeModal('modal-jobcard-new')"><i class="bi bi-x"></i></button>
    </div>
    <div class="modal-body">
      <div class="form-section">
        <div class="form-section-title"><i class="bi bi-link-45deg"></i> Order Linkage</div>
        <div class="form-row cols-3">
          <div class="field-group">
            <label class="field-label required">Job Card No</label>
            <input class="form-input" value="JC-2026-093" readonly style="background:var(--bg-subtle)" />
          </div>
          <div class="field-group">
            <label class="field-label required">Sales Order No</label>
            <select class="form-select">
              <option>— Select SO —</option>
              <option selected>SO-1288 — HUL</option>
              <option>SO-1289 — Reliance</option>
            </select>
          </div>
          <div class="field-group">
            <label class="field-label">Date</label>
            <input class="form-input" type="date" value="2026-06-30" />
          </div>
        </div>
        <div class="form-row cols-2">
          <div class="field-group">
            <label class="field-label">Customer</label>
            <input class="form-input" value="Hindustan Unilever Ltd" readonly style="background:var(--bg-subtle)" />
          </div>
          <div class="field-group">
            <label class="field-label">Priority</label>
            <select class="form-select">
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
        </div>
      </div>

      <div class="form-section">
        <div class="form-section-title"><i class="bi bi-Deck-seam"></i> Deck Specification</div>
        <div class="form-row cols-4">
          <div class="field-group">
            <label class="field-label">Deck Type</label>
            <input class="form-input" value="Poker Size" />
          </div>
          <div class="field-group">
            <label class="field-label">GSM</label>
            <select class="form-select"><option>3</option><option>5</option><option selected>7</option></select>
          </div>
          <div class="field-group">
            <label class="field-label">GSM</label>
            <input class="form-input" value="150 / 120 / 150" />
          </div>
          <div class="field-group">
            <label class="field-label">Core</label>
            <select class="form-select"><option>B</option><option selected>BC</option><option>C</option><option>E</option></select>
          </div>
        </div>
        <div class="form-row cols-4">
          <div class="field-group">
            <label class="field-label">L (mm)</label>
            <input class="form-input" type="number" value="450" />
          </div>
          <div class="field-group">
            <label class="field-label">W (mm)</label>
            <input class="form-input" type="number" value="350" />
          </div>
          <div class="field-group">
            <label class="field-label">H (mm)</label>
            <input class="form-input" type="number" value="300" />
          </div>
          <div class="field-group">
            <label class="field-label">Quantity</label>
            <input class="form-input" type="number" value="60000" />
          </div>
        </div>
      </div>

      <div class="form-section">
        <div class="form-section-title"><i class="bi bi-gear"></i> Production Stages</div>
        <table class="line-table">
          <thead>
            <tr><th>Stage</th><th>Machine</th><th>Operator</th><th>Planned Date</th><th>Est. Hours</th><th>Include</th></tr>
          </thead>
          <tbody>
            ${['Playing Card','Printing','Collation','Varnishing','Punching'].map((s,i) => `
            <tr>
              <td><b>${s}</b></td>
              <td><select class="form-select" style="font-size:12px;padding:4px 6px">
                <option>— Select —</option>
                <option>${s === 'Playing Card' ? 'Printing Press-1' : s === 'Printing' ? 'Flexo Press-2' : s === 'Collation' ? 'Collator-1' : s === 'Varnishing' ? 'Coater-1' : 'Punching-1'}</option>
              </select></td>
              <td><input class="form-input" style="font-size:12px;padding:4px 6px" placeholder="Operator" /></td>
              <td><input class="form-input" type="date" value="2026-07-0${i+1}" style="font-size:12px;padding:4px 6px" /></td>
              <td><input class="form-input" type="number" value="${[4,3,2,2,1][i]}" style="font-size:12px;padding:4px 6px;width:70px" /></td>
              <td style="text-align:center"><input type="checkbox" checked /></td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>

      <div class="field-group">
        <label class="field-label">Special Instructions</label>
        <textarea class="form-textarea" placeholder="Any special notes for production floor..."></textarea>
      </div>
    </div>
    <div class="modal-footer">
      <div class="modal-footer-left">
        <button class="btn btn-print"><i class="bi bi-printer"></i> Print Job Card</button>
      </div>
      <button class="btn btn-secondary" onclick="closeModal('modal-jobcard-new')">Cancel</button>
      <button class="btn btn-save"><i class="bi bi-check-lg"></i> Create Job Card</button>
    </div>
  </div>
</div>

<!-- Job Card Detail Modal -->
<div class="modal-overlay hidden" id="modal-jobcard-detail">
  <div class="modal modal-xl">
    <div class="modal-header">
      <div class="modal-icon"><i class="bi bi-journal-check"></i></div>
      <div>
        <div class="modal-title">JC-2026-089 — Amul Dairy</div>
        <div class="modal-sub">Poker Size 500×350×300mm | 7-GSM Black Core | 1,00,000 Decks</div>
      </div>
      <div style="display:flex;gap:8px;margin-right:8px">
        <span class="tag tag-blue">In Progress</span>
        <span class="tag tag-red">🔴 High Priority</span>
      </div>
      <button class="modal-close" onclick="closeModal('modal-jobcard-detail')"><i class="bi bi-x"></i></button>
    </div>
    <div class="modal-body">

      <!-- Workflow progress -->
      <div class="workflow-steps" style="margin-bottom:20px">
        <div class="wf-step done">
          <div class="wf-step-circle"><i class="bi bi-check"></i></div>
          <div class="wf-step-label">Playing Card</div>
        </div>
        <div class="wf-step done">
          <div class="wf-step-circle"><i class="bi bi-check"></i></div>
          <div class="wf-step-label">Printing</div>
        </div>
        <div class="wf-step active">
          <div class="wf-step-circle">3</div>
          <div class="wf-step-label">Collation</div>
        </div>
        <div class="wf-step">
          <div class="wf-step-circle">4</div>
          <div class="wf-step-label">Varnishing</div>
        </div>
        <div class="wf-step">
          <div class="wf-step-circle">5</div>
          <div class="wf-step-label">Punching</div>
        </div>
      </div>

      <!-- Stats -->
      <div class="stat-row">
        <div class="stat-Deck"><div class="stat-Deck-val">67%</div><div class="stat-Deck-lbl">Overall Progress</div></div>
        <div class="stat-Deck"><div class="stat-Deck-val" style="color:var(--color-success-text)">67,000</div><div class="stat-Deck-lbl">Completed Units</div></div>
        <div class="stat-Deck"><div class="stat-Deck-val" style="color:var(--color-warning-text)">33,000</div><div class="stat-Deck-lbl">Remaining Units</div></div>
        <div class="stat-Deck"><div class="stat-Deck-val" style="color:var(--color-error-text)">+2 hrs</div><div class="stat-Deck-lbl">Delay</div></div>
        <div class="stat-Deck"><div class="stat-Deck-val">30 Jun</div><div class="stat-Deck-lbl">Due Date</div></div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
        <!-- Stage Detail -->
        <div>
          <table class="line-table">
            <thead><tr><th>Stage</th><th>Machine</th><th>Operator</th><th>Qty Done</th><th>Status</th></tr></thead>
            <tbody>
              <tr><td><b>Playing Card</b></td><td>Printing Press-1</td><td>Ramesh B.</td><td>1,00,000</td><td><span class="tag tag-green">Done</span></td></tr>
              <tr><td><b>Printing</b></td><td>Flexo Press-2</td><td>Suresh M.</td><td>1,00,000</td><td><span class="tag tag-green">Done</span></td></tr>
              <tr><td><b>Collation</b></td><td>Collator-1</td><td>Manoj K.</td><td>67,000</td><td><span class="tag tag-blue">Running</span></td></tr>
              <tr><td><b>Varnishing</b></td><td>—</td><td>—</td><td>0</td><td><span class="tag tag-gold">Pending</span></td></tr>
              <tr><td><b>Punching</b></td><td>—</td><td>—</td><td>0</td><td><span class="tag tag-gold">Pending</span></td></tr>
            </tbody>
          </table>
        </div>

        <!-- Timeline / Activity -->
        <div>
          <div style="font-size:13px;font-weight:700;margin-bottom:10px;color:var(--fg-default)">Activity Log</div>
          <div class="timeline">
            <div class="tl-item">
              <div class="tl-dot-wrap"><div class="tl-dot blue"></div><div class="tl-line"></div></div>
              <div class="tl-content"><div class="tl-title">Collation Started</div><div class="tl-meta">Manoj K. — 30 Jun 10:30 AM</div></div>
            </div>
            <div class="tl-item">
              <div class="tl-dot-wrap"><div class="tl-dot green"></div><div class="tl-line"></div></div>
              <div class="tl-content"><div class="tl-title">Printing Completed — 1,00,000 pcs</div><div class="tl-meta">Suresh M. — 30 Jun 9:15 AM</div></div>
            </div>
            <div class="tl-item">
              <div class="tl-dot-wrap"><div class="tl-dot orange"></div><div class="tl-line"></div></div>
              <div class="tl-content"><div class="tl-title">Machine Downtime — Flexo Press 2 (45 min)</div><div class="tl-meta">Maintenance — 29 Jun 3:30 PM</div></div>
            </div>
            <div class="tl-item">
              <div class="tl-dot-wrap"><div class="tl-dot green"></div></div>
              <div class="tl-content"><div class="tl-title">Playing Card Completed — 1,00,000 pcs</div><div class="tl-meta">Ramesh B. — 29 Jun 11:00 AM</div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <div class="modal-footer-left">
        <button class="btn btn-print"><i class="bi bi-printer"></i> Print Job Card</button>
      </div>
      <button class="btn btn-secondary" onclick="closeModal('modal-jobcard-detail')">Close</button>
      <button class="btn btn-create"><i class="bi bi-pencil"></i> Edit</button>
      <button class="btn btn-save" onclick="navigate('prod-tracking')"><i class="bi bi-gear"></i> Update Stage</button>
    </div>
  </div>
</div>
`);
});
