// ─── Page Registry ───
const PAGE_META = {
  'dashboard':      { title: 'Dashboard',           section: 'Overview' },
  'dash-production':{ title: 'Production Dashboard', section: 'Dashboards' },
  'dash-inventory': { title: 'Inventory & Store Dashboard', section: 'Dashboards' },
  'dash-purchase':  { title: 'Purchase Dashboard',   section: 'Dashboards' },
  'dash-sales':     { title: 'Sales Dashboard',      section: 'Dashboards' },
  'dash-dispatch':  { title: 'Dispatch Dashboard',   section: 'Dashboards' },
  'ai-hub':         { title: 'AI Command Center',     section: 'AI' },
  'inventory-agent':{ title: 'Inventory AI Agent',   section: 'AI' },
  'enquiry':        { title: 'Sales Enquiry',        section: 'Sales' },
  'quotation':      { title: 'Quotation',            section: 'Sales' },
  'sales-order':    { title: 'Sales Order',          section: 'Sales' },
  'so-frequency':   { title: 'AI Order Intelligence',section: 'Sales › AI' },
  'job-card':       { title: 'Job Card',             section: 'Production' },
  'prod-tracking':  { title: 'Production Tracking',  section: 'Production' },
  'wip':            { title: 'WIP Tracking',         section: 'Production' },
  'ppc':            { title: 'PPC — Production Planning', section: 'Production' },
  'Cardstock-req':       { title: 'Cardstock Requisition',     section: 'Inventory › Cardstock' },
  'Cardstock-po':        { title: 'Cardstock Purchase Order',  section: 'Inventory › Cardstock' },
  'Cardstock-receipt':   { title: 'Cardstock GRN',             section: 'Inventory › Cardstock' },
  'Cardstock-issue':       { title: 'Cardstock Issue',             section: 'Inventory › Cardstock' },
  'Cardstock-floor-stock': { title: 'Cardstock Floor Stock',       section: 'Inventory › Cardstock' },
  'Cardstock-return':      { title: 'Cardstock Return',            section: 'Inventory › Cardstock' },
  'Cardstock-verification':{ title: 'Physical Verification',  section: 'Inventory › Cardstock' },
  'Cardstock-po-close':    { title: 'Cardstock PO Close',          section: 'Inventory › Cardstock' },
  'Cardstock-stock':       { title: 'Cardstock Stock Report',      section: 'Inventory › Cardstock' },
  'Ink/Coating-req':        { title: 'Ink/Coating Requisition',      section: 'Inventory › Ink & Coating' },
  'Ink/Coating-po':         { title: 'Ink/Coating Purchase Order',   section: 'Inventory › Ink & Coating' },
  'Ink/Coating-receipt':    { title: 'Ink/Coating GRN',              section: 'Inventory › Ink & Coating' },
  'Ink/Coating-issue':      { title: 'Ink/Coating Issue',            section: 'Inventory › Ink & Coating' },
  'Ink/Coating-floor-stock':{ title: 'Ink/Coating Floor Stock',      section: 'Inventory › Ink & Coating' },
  'Ink/Coating-return':     { title: 'Ink/Coating Return',           section: 'Inventory › Ink & Coating' },
  'Ink/Coating-stock':      { title: 'Ink/Coating Stock Report',     section: 'Inventory › Ink & Coating' },
  'finished-goods': { title: 'Finished Goods',       section: 'Inventory' },
  'consumables':    { title: 'Tuck Boxes & Packaging', section: 'Inventory' },
  'dispatch-queue': { title: 'Dispatch Queue',       section: 'Dispatch' },
  'challan':        { title: 'Delivery Challan',     section: 'Dispatch' },
  'product-master': { title: 'Product Master',       section: 'Operations' },
  'job-prep':       { title: 'Job Preparation',      section: 'Operations' },
  'purchase-req':   { title: 'Purchase Requisition', section: 'Operations' },
  'est-vs-actual':  { title: 'Estimation vs Actual', section: 'Reports' },
  'kpi-dashboard':  { title: 'KPI Dashboard',        section: 'Reports' },
  'mgmt-dashboard': { title: 'Management Dashboard', section: 'Reports' },
  'm-Ink/Coating':              { title: 'Ink/Coating Master',          section: 'Masters' },
  'm-Cardstock':               { title: 'Cardstock Master',           section: 'Masters' },
  'm-item':               { title: 'Item Master',           section: 'Masters' },
  'm-material-group':     { title: 'Material Group',        section: 'Masters' },
  'm-category':           { title: 'Category Master',       section: 'Masters' },
  'm-unit':               { title: 'Unit of Measure',       section: 'Masters' },
  'm-hsn':                { title: 'Product HSN',           section: 'Masters' },
  'm-customer':           { title: 'Customer Master',       section: 'Masters' },
  'm-warehouse':          { title: 'Warehouse Master',      section: 'Masters' },
  'm-mill':               { title: 'Mill Master',           section: 'Masters' },
  'm-machine':            { title: 'Machine Master',        section: 'Masters' },
  'm-department':         { title: 'Department Master',     section: 'Masters' },
  'm-process':            { title: 'Process Master',        section: 'Masters' },
  'm-die':                { title: 'Die Master',            section: 'Masters' },
  'm-division':           { title: 'Division Master',       section: 'Masters' },
  'm-vehicle':            { title: 'Vehicle Master',        section: 'Masters' },
  'm-employee':           { title: 'Employee Master',       section: 'Masters' },
  'm-user':               { title: 'User Master',           section: 'Masters' },
  'm-ledger-customer':    { title: 'Customer Ledger',       section: 'Ledgers' },
  'm-ledger-supplier':    { title: 'Supplier Ledger',       section: 'Ledgers' },
  'm-ledger-transporter': { title: 'Transporter Ledger',   section: 'Ledgers' },
  'm-ledger-consignee':   { title: 'Consignee Master',      section: 'Ledgers' },
  'm-ledger-employee':    { title: 'Employee Ledger',       section: 'Ledgers' },
  'm-ledger-duties-taxes':{ title: 'Duties & Taxes',        section: 'Ledgers' },
  'm-ledger-purchase':    { title: 'Purchase Accounts',     section: 'Ledgers' },
  'm-ledger-sales':       { title: 'Sales Accounts',        section: 'Ledgers' },
};

let currentPage = 'dashboard';

function navigate(pageId) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  // Show target
  const el = document.getElementById('page-' + pageId);
  if (el) el.classList.add('active');

  // Update breadcrumb
  const meta = PAGE_META[pageId] || { title: pageId, section: 'Estimo' };
  const bc = document.getElementById('headerBreadcrumb');
  bc.innerHTML = `
    <span class="breadcrumb-item">${meta.section}</span>
    <span class="breadcrumb-sep"><i class="bi bi-chevron-right"></i></span>
    <span class="breadcrumb-item current">${meta.title}</span>
  `;

  // Update active nav items
  document.querySelectorAll('.nav-item, .nav-solo').forEach(n => {
    n.classList.toggle('active', n.dataset.page === pageId);
  });

  currentPage = pageId;

  // Scroll content to top
  const ca = document.getElementById('contentArea');
  if (ca) ca.scrollTop = 0;
}

function toggleGroup(id) {
  const el = document.getElementById(id);
  if (el) el.classList.toggle('open');
}

function toggleSidebar() {
  const sb = document.getElementById('sidebar');
  const ic = document.getElementById('toggleIcon');
  sb.classList.toggle('collapsed');
  ic.className = sb.classList.contains('collapsed')
    ? 'bi bi-layout-sidebar'
    : 'bi bi-layout-sidebar-reverse';
}

// ─── Modal helpers ───
function openModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('hidden');
}
function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('hidden');
}
function closeAllModals() {
  document.querySelectorAll('.modal-overlay').forEach(m => m.classList.add('hidden'));
}
// Close on overlay click
document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) closeAllModals();
});
// Close on ESC
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeAllModals();
});

// ─── Global action button handlers (capture phase — fires before stopPropagation) ───
document.addEventListener('click', e => {
  // Edit button → find parent TR's modal and open it
  const editBtn = e.target.closest('.btn-edit');
  if (editBtn) {
    e.stopPropagation();
    const tr = editBtn.closest('tr[onclick]');
    if (tr) {
      const m = tr.getAttribute('onclick').match(/openModal\('([^']+)'\)/);
      if (m) openModal(m[1]);
    }
    return;
  }
  // View button → same as edit for mockup
  const viewBtn = e.target.closest('.btn-ghost.btn-icon');
  if (viewBtn && viewBtn.closest('tr[onclick]')) {
    e.stopPropagation();
    const tr = viewBtn.closest('tr[onclick]');
    const m = tr.getAttribute('onclick').match(/openModal\('([^']+)'\)/);
    if (m) openModal(m[1]);
    return;
  }
  // Delete button → confirm then fade row
  const delBtn = e.target.closest('.btn-delete');
  if (delBtn && delBtn.closest('tr')) {
    e.stopPropagation();
    if (confirm('Delete this record? This action cannot be undone.')) {
      const tr = delBtn.closest('tr');
      tr.style.transition = 'opacity 0.3s';
      tr.style.opacity = '0.35';
      setTimeout(() => tr.remove(), 300);
    }
    return;
  }
}, true); // true = capture phase

// ─── Save button → toast + close modal (only if no explicit onclick) ───
document.addEventListener('click', e => {
  const saveBtn = e.target.closest('.btn-save');
  if (!saveBtn || saveBtn.hasAttribute('onclick')) return;
  const overlay = saveBtn.closest('.modal-overlay');
  if (!overlay) return;
  overlay.classList.add('hidden');
  showToast('Record saved successfully');
});

// ─── Seg-tab switcher ───
document.addEventListener('click', e => {
  const tab = e.target.closest('.seg-tab');
  if (!tab) return;
  const group = tab.closest('.seg-tabs');
  if (!group) return;
  group.querySelectorAll('.seg-tab').forEach(t => t.classList.remove('active'));
  tab.classList.add('active');
});

// ─── Toast notification ───
function showToast(msg, type='success') {
  const t = document.createElement('div');
  t.style.cssText = `
    position:fixed;bottom:24px;right:24px;z-index:9999;
    background:${type==='success'?'#2e7d32':'#c62828'};color:#fff;
    padding:10px 18px;border-radius:8px;font-size:13px;font-weight:500;
    Deck-shadow:0 4px 16px rgba(0,0,0,0.25);opacity:0;
    transition:opacity 0.2s;pointer-events:none`;
  t.textContent = (type === 'success' ? '✓ ' : '✗ ') + msg;
  document.body.appendChild(t);
  requestAnimationFrame(() => { t.style.opacity = '1'; });
  setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.remove(), 300); }, 2800);
}

// ─── Init ───
document.addEventListener('DOMContentLoaded', () => {
  navigate('dashboard');
});
