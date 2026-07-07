document.addEventListener('DOMContentLoaded', () => {
  const ca = document.getElementById('contentArea');

  // ─── AI HUB ───────────────────────────────────────────────────────────
  ca.insertAdjacentHTML('beforeend', `
<div class="page" id="page-ai-hub">
  <div class="page-header">
    <div>
      <div class="page-title" style="display:flex;align-items:center;gap:8px">
        <span style="background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;padding:4px 10px;border-radius:20px;font-size:12px;font-weight:600">AI</span>
        AI Command Center
      </div>
      <div class="page-subtitle">Ask questions about your ERP data — orders, stock, production, costings in natural language</div>
    </div>
    <div class="page-actions">
      <button class="btn btn-secondary btn-sm"><i class="bi bi-clock-history"></i> History</button>
      <button class="btn btn-secondary btn-sm"><i class="bi bi-trash"></i> Clear Chat</button>
    </div>
  </div>

  <div style="display:grid;grid-template-columns:280px 1fr;gap:16px;height:calc(100vh - 200px)">

    <!-- Left: Quick Prompts -->
    <div style="display:flex;flex-direction:column;gap:12px">
      <div style="font-size:12px;font-weight:700;color:var(--fg-muted);text-transform:uppercase;letter-spacing:.05em">Quick Prompts</div>
      ${[
        ['bi-bar-chart-line','Sales','What were our top 5 customers by revenue this month?'],
        ['bi-layers','Inventory','Which reels are below minimum stock level right now?'],
        ['bi-gear-wide','Production','Show me all pending job cards for Playing Card today.'],
        ['bi-receipt','Purchase','What is the total outstanding payable to suppliers?'],
        ['bi-currency-rupee','Costing','What is the average Deck cost for Amul Dairy this quarter?'],
        ['bi-graph-up','Trend','Compare this month sales vs last month month-over-month.'],
        ['bi-exclamation-triangle','Alerts','Are there any overdue delivery commitments?'],
        ['bi-Deck-seam','Stock','What is the free Cardstock stock available for Job Card JC-2026-089?'],
      ].map(([icon,cat,prompt])=>`
      <div onclick="document.getElementById('ai-input').value='${prompt.replace(/'/g,'&apos;')}'" style="background:#fff;border:1px solid var(--bd-default);border-radius:8px;padding:10px 12px;cursor:pointer;transition:all .15s" onmouseover="this.style.borderColor='var(--primary)';this.style.boxShadow='var(--shadow-sm)'" onmouseout="this.style.borderColor='var(--bd-default)';this.style.boxShadow='none'">
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px">
          <i class="${icon}" style="color:#6366f1;font-size:12px"></i>
          <span style="font-size:10px;font-weight:700;color:#6366f1;text-transform:uppercase">${cat}</span>
        </div>
        <div style="font-size:11px;color:var(--fg-default);line-height:1.4">${prompt}</div>
      </div>`).join('')}
    </div>

    <!-- Right: Chat Area -->
    <div style="display:flex;flex-direction:column;background:#fff;border:1px solid var(--bd-default);border-radius:12px;overflow:hidden">
      <!-- Messages -->
      <div style="flex:1;overflow-y:auto;padding:20px;display:flex;flex-direction:column;gap:14px" id="ai-chat-area">

        <!-- System message -->
        <div style="text-align:center;color:var(--fg-muted);font-size:11px;padding:8px">
          <span style="background:var(--bg-subtle);border-radius:20px;padding:4px 12px;border:1px solid var(--bd-default)">
            <i class="bi bi-stars" style="color:#6366f1"></i> Estimo AI — Connected to your ERP data
          </span>
        </div>

        <!-- AI welcome -->
        <div style="display:flex;gap:10px;align-items:flex-start">
          <div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#6366f1,#8b5cf6);display:flex;align-items:center;justify-content:center;flex-shrink:0">
            <i class="bi bi-stars" style="color:#fff;font-size:14px"></i>
          </div>
          <div style="background:var(--bg-subtle);border:1px solid var(--bd-default);border-radius:12px 12px 12px 2px;padding:12px 16px;max-width:80%">
            <div style="font-size:13px;color:var(--fg-default);line-height:1.6">
              Hello! I'm your Estimo AI assistant. I have access to all your ERP data — sales orders, inventory, production, costing, and more.<br/><br/>
              You can ask me questions like:<br/>
              <span style="color:#6366f1">→ "What's our current Cardstock stock for Art Paper Liner 150?"</span><br/>
              <span style="color:#6366f1">→ "Which customers have overdue payment?"</span><br/>
              <span style="color:#6366f1">→ "What is the material cost for product PM-2026-040?"</span>
            </div>
            <div style="font-size:10px;color:var(--fg-muted);margin-top:6px">Estimo AI • Just now</div>
          </div>
        </div>

        <!-- Sample user message -->
        <div style="display:flex;gap:10px;align-items:flex-start;flex-direction:row-reverse">
          <div style="width:32px;height:32px;border-radius:50%;background:#003366;display:flex;align-items:center;justify-content:center;flex-shrink:0">
            <span style="color:#fff;font-size:12px;font-weight:700">HI</span>
          </div>
          <div style="background:#003366;color:#fff;border-radius:12px 12px 2px 12px;padding:12px 16px;max-width:75%">
            <div style="font-size:13px;line-height:1.6">What were our top 5 customers by revenue this month?</div>
            <div style="font-size:10px;color:rgba(255,255,255,0.6);margin-top:6px">28 Jun 2026, 09:15</div>
          </div>
        </div>

        <!-- Sample AI response with table -->
        <div style="display:flex;gap:10px;align-items:flex-start">
          <div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#6366f1,#8b5cf6);display:flex;align-items:center;justify-content:center;flex-shrink:0">
            <i class="bi bi-stars" style="color:#fff;font-size:14px"></i>
          </div>
          <div style="background:var(--bg-subtle);border:1px solid var(--bd-default);border-radius:12px 12px 12px 2px;padding:12px 16px;max-width:85%">
            <div style="font-size:13px;color:var(--fg-default);line-height:1.6;margin-bottom:10px">
              Here are your top 5 customers by revenue for <b>June 2026</b>:
            </div>
            <table style="width:100%;border-collapse:collapse;font-size:12px">
              <thead><tr style="background:var(--bg-default)">
                <th style="padding:6px 10px;text-align:left;border:1px solid var(--bd-default)">#</th>
                <th style="padding:6px 10px;text-align:left;border:1px solid var(--bd-default)">Customer</th>
                <th style="padding:6px 10px;text-align:right;border:1px solid var(--bd-default)">Orders</th>
                <th style="padding:6px 10px;text-align:right;border:1px solid var(--bd-default)">Revenue</th>
                <th style="padding:6px 10px;text-align:right;border:1px solid var(--bd-default)">vs Last Month</th>
              </tr></thead>
              <tbody>
                ${[['1','Amul Dairy','8','₹18,40,000','+12%'],['2','ITC Limited','5','₹12,20,000','+5%'],['3','Hindustan Unilever','4','₹8,60,000','-3%'],['4','Nestlé India','6','₹7,40,000','+18%'],['5','Metro Cash & Carry','3','₹4,80,000','—']].map(([r,n,o,rev,vs])=>`
                <tr>
                  <td style="padding:6px 10px;border:1px solid var(--bd-default)">${r}</td>
                  <td style="padding:6px 10px;border:1px solid var(--bd-default);font-weight:600">${n}</td>
                  <td style="padding:6px 10px;border:1px solid var(--bd-default);text-align:right">${o}</td>
                  <td style="padding:6px 10px;border:1px solid var(--bd-default);text-align:right;font-weight:700">${rev}</td>
                  <td style="padding:6px 10px;border:1px solid var(--bd-default);text-align:right;color:${vs.startsWith('+')?'#16a34a':vs.startsWith('-')?'#dc2626':'inherit'}">${vs}</td>
                </tr>`).join('')}
              </tbody>
            </table>
            <div style="margin-top:8px;font-size:12px;color:var(--fg-muted)">Total June revenue: <b>₹51,40,000</b> | Based on 26 approved sales orders</div>
            <div style="font-size:10px;color:var(--fg-muted);margin-top:6px">Estimo AI • 28 Jun 2026, 09:15</div>
          </div>
        </div>

      </div>

      <!-- Input bar -->
      <div style="border-top:1px solid var(--bd-default);padding:14px 16px;display:flex;gap:10px;align-items:flex-end">
        <textarea id="ai-input" class="form-textarea" style="flex:1;min-height:44px;max-height:120px;resize:none;padding:10px 14px;border-radius:8px;font-size:13px" placeholder="Ask anything about your ERP — stock levels, orders, costs, customers..."></textarea>
        <button class="btn btn-create" style="height:44px;padding:0 20px;flex-shrink:0">
          <i class="bi bi-send"></i> Ask AI
        </button>
      </div>
    </div>

  </div>
</div>`);

  // ─── INVENTORY AI AGENT ────────────────────────────────────────────────
  ca.insertAdjacentHTML('beforeend', `
<div class="page" id="page-inventory-agent">
  <div class="page-header">
    <div>
      <div class="page-title" style="display:flex;align-items:center;gap:8px">
        <span style="background:linear-gradient(135deg,#0ea5e9,#22c55e);color:#fff;padding:4px 10px;border-radius:20px;font-size:12px;font-weight:600">AI</span>
        Inventory AI Agent
      </div>
      <div class="page-subtitle">Automated inventory analysis — low stock alerts, reorder suggestions, demand forecasting</div>
    </div>
    <div class="page-actions">
      <button class="btn btn-secondary btn-sm"><i class="bi bi-arrow-clockwise"></i> Refresh Analysis</button>
      <button class="btn btn-save btn-sm"><i class="bi bi-file-earmark-text"></i> Generate PR from AI</button>
    </div>
  </div>

  <!-- Alert Banner -->
  <div style="background:linear-gradient(135deg,#fef3c7,#fde68a);border:1px solid #f59e0b;border-radius:10px;padding:14px 18px;margin-bottom:16px;display:flex;align-items:center;gap:12px">
    <i class="bi bi-robot" style="font-size:24px;color:#d97706"></i>
    <div>
      <div style="font-weight:700;font-size:13px;color:#92400e">AI Agent Alert — Action Required</div>
      <div style="font-size:12px;color:#78350f;margin-top:2px">3 items below minimum stock, 5 items forecasted to run out in 7 days, 2 POs overdue. Auto-generated PR suggestions ready for review.</div>
    </div>
    <button class="btn btn-save btn-sm" style="margin-left:auto;background:#d97706;border-color:#d97706">Review Suggestions</button>
  </div>

  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:16px">
    ${[['Items Tracked','62','#3b82f6','bi-layers'],['Below Min Stock','3','#ef4444','bi-exclamation-triangle'],['AI Reorder Suggestions','8','#f59e0b','bi-lightbulb'],['Days Forecast Horizon','14 days','#22c55e','bi-calendar-check']].map(([l,v,c,ic])=>`
    <div style="background:#fff;border:1px solid var(--bd-default);border-radius:10px;padding:14px 16px;border-left:4px solid ${c};Deck-shadow:var(--shadow-sm);display:flex;align-items:center;gap:12px">
      <div style="width:40px;height:40px;border-radius:8px;background:${c}22;display:flex;align-items:center;justify-content:center;flex-shrink:0">
        <i class="${ic}" style="color:${c};font-size:18px"></i>
      </div>
      <div>
        <div style="font-size:20px;font-weight:800;color:${c}">${v}</div>
        <div style="font-size:11px;color:var(--fg-muted)">${l}</div>
      </div>
    </div>`).join('')}
  </div>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">

    <!-- AI Reorder Suggestions -->
    <div style="background:#fff;border:1px solid var(--bd-default);border-radius:10px;overflow:hidden;Deck-shadow:var(--shadow-sm)">
      <div style="padding:14px 16px;border-bottom:1px solid var(--bd-default);display:flex;align-items:center;justify-content:space-between">
        <div style="font-weight:700;font-size:13px;display:flex;align-items:center;gap:6px">
          <i class="bi bi-lightbulb" style="color:#f59e0b"></i> AI Reorder Suggestions
        </div>
        <button class="btn btn-save btn-sm"><i class="bi bi-plus"></i> Create PR from All</button>
      </div>
      <table style="width:100%;border-collapse:collapse;font-size:12px">
        <thead><tr style="background:var(--bg-subtle)">
          <th style="padding:8px 12px;text-align:left;font-weight:600;color:var(--fg-muted)">Item</th>
          <th style="padding:8px 12px;text-align:right;font-weight:600;color:var(--fg-muted)">Free Stock</th>
          <th style="padding:8px 12px;text-align:right;font-weight:600;color:var(--fg-muted)">Suggest Qty</th>
          <th style="padding:8px 12px;text-align:left;font-weight:600;color:var(--fg-muted)">Reason</th>
          <th style="padding:8px 12px;text-align:center;font-weight:600;color:var(--fg-muted)">Priority</th>
          <th></th>
        </tr></thead>
        <tbody>
          ${[
            ['KR-150-1200','2,700 kg','5,000 kg','3 pending jobs need 4,200 kg — will run out in 2 days','Critical'],
            ['TL-160-1350','280 kg','1,000 kg','Below minimum (500 kg). Forecast: stock-out in 5 days','High'],
            ['Finish-120-1200','1,700 kg','3,000 kg','5 new SO confirm d — expected demand 2,800 kg next week','High'],
            ['BD-250-760×1010','300 sht','500 sht','Near minimum. Slow mover — 30-day supGSM needed','Medium'],
            ['INK-YEL-01','2 kg','20 kg','Consumption rate: 5kg/week. Stock for 2.8 weeks only','Medium'],
          ].map(([item,stock,sugg,reason,pri])=>{
            const pc = pri==='Critical'?'red':pri==='High'?'orange':'gold';
            return `<tr style="border-top:1px solid var(--bd-default)">
              <td style="padding:8px 12px;font-weight:600">${item}</td>
              <td style="padding:8px 12px;text-align:right;color:${pri==='Critical'?'var(--color-error-text)':'var(--color-warning-text)'};font-weight:700">${stock}</td>
              <td style="padding:8px 12px;text-align:right;font-weight:700;color:var(--primary)">${sugg}</td>
              <td style="padding:8px 12px;color:var(--fg-muted);font-size:11px;max-width:200px">${reason}</td>
              <td style="padding:8px 12px;text-align:center"><span class="tag tag-${pc}" style="font-size:10px">${pri}</span></td>
              <td style="padding:8px 12px"><button class="btn btn-ghost btn-sm" style="font-size:11px"><i class="bi bi-plus"></i> Add to PR</button></td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>

    <!-- Forecast Chart (static visual) -->
    <div style="background:#fff;border:1px solid var(--bd-default);border-radius:10px;overflow:hidden;Deck-shadow:var(--shadow-sm)">
      <div style="padding:14px 16px;border-bottom:1px solid var(--bd-default)">
        <div style="font-weight:700;font-size:13px;display:flex;align-items:center;gap:6px">
          <i class="bi bi-graph-up" style="color:#3b82f6"></i> 14-Day Demand Forecast — KR-150-1200
        </div>
        <div style="font-size:11px;color:var(--fg-muted);margin-top:2px">Based on pending job cards and historical consumption pattern</div>
      </div>
      <div style="padding:16px">
        <!-- Forecast bars -->
        <div style="display:flex;align-items:flex-end;gap:6px;height:140px;margin-bottom:8px">
          ${[['W1','3,200',85,false],['W2','2,800',74,false],['W3','4,100',100,true],['W4','3,600',88,false]].map(([week,val,pct,warn])=>`
          <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px">
            <div style="font-size:10px;font-weight:700;color:${warn?'var(--color-error-text)':'var(--primary)'}">${val}</div>
            <div style="width:100%;background:${warn?'#ef444433':'#003366'}22;border-radius:4px 4px 0 0;height:${pct}%;display:flex;align-items:flex-end;justify-content:center">
              <div style="width:100%;background:${warn?'#ef4444':'#003366'};border-radius:4px 4px 0 0;height:${pct}%"></div>
            </div>
            <div style="font-size:10px;color:var(--fg-muted)">${week}</div>
          </div>`).join('')}
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">
          ${[['Current Stock','8,200 kg','#003366'],['Total Demand (4W)','13,700 kg','#f59e0b'],['Shortfall','5,500 kg','#ef4444'],['Suggested Order','5,000 kg','#22c55e']].map(([l,v,c])=>`
          <div style="background:${c}11;border:1px solid ${c}33;border-radius:6px;padding:6px 10px;flex:1;min-width:100px">
            <div style="font-size:13px;font-weight:800;color:${c}">${v}</div>
            <div style="font-size:10px;color:var(--fg-muted)">${l}</div>
          </div>`).join('')}
        </div>
      </div>
      <!-- Slow movers section -->
      <div style="border-top:1px solid var(--bd-default);padding:12px 16px">
        <div style="font-size:12px;font-weight:700;margin-bottom:8px;color:var(--fg-muted)">Slow Movers — Low Consumption (last 30 days)</div>
        ${[['WL-100-1200','800 kg','Last used: 18 Jun','32 days'],['SC-112-1200','600 kg','Last used: 12 Jun','48 days'],['KM-90-630×900','180 sht','Last used: 5 Jun','55 days']].map(([item,stk,last,idle])=>`
        <div style="display:flex;align-items:center;justify-content:space-between;padding:5px 0;border-bottom:1px solid var(--bd-default)">
          <div>
            <div style="font-size:12px;font-weight:600">${item}</div>
            <div style="font-size:10px;color:var(--fg-muted)">${last}</div>
          </div>
          <div style="text-align:right">
            <div style="font-size:12px;font-weight:600">${stk}</div>
            <span class="tag tag-orange" style="font-size:9px">Idle ${idle}</span>
          </div>
        </div>`).join('')}
      </div>
    </div>

  </div>
</div>`);

  // ─── SALES ORDER FREQUENCY / AI ORDER INTELLIGENCE ─────────────────────
  ca.insertAdjacentHTML('beforeend', `
<div class="page" id="page-so-frequency">
  <div class="page-header">
    <div>
      <div class="page-title" style="display:flex;align-items:center;gap:8px">
        <span style="background:linear-gradient(135deg,#ec4899,#8b5cf6);color:#fff;padding:4px 10px;border-radius:20px;font-size:12px;font-weight:600">AI</span>
        AI Order Intelligence
      </div>
      <div class="page-subtitle">Customer ordering pattern analysis, frequency insights and predictive demand signals</div>
    </div>
    <div class="page-actions">
      <button class="btn btn-secondary btn-sm"><i class="bi bi-download"></i> Export Report</button>
    </div>
  </div>

  <!-- Filter bar -->
  <div class="toolbar" style="margin-bottom:14px">
    <div class="toolbar-left">
      <select class="form-select" style="width:200px;padding:5px 8px"><option>All Customers</option><option>Amul Dairy</option><option>ITC Limited</option></select>
      <select class="form-select" style="width:130px;padding:5px 8px"><option>Last 6 Months</option><option>Last 3 Months</option><option>Last 12 Months</option></select>
      <select class="form-select" style="width:140px;padding:5px 8px"><option>All Products</option><option>Poker Size / 5-GSM</option><option>Die Cut</option></select>
    </div>
  </div>

  <!-- Top KPI cards -->
  <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin-bottom:16px">
    ${[['Avg Order Freq.','8.4 days','#3b82f6','bi-calendar2-check'],['Repeat Customers','72%','#22c55e','bi-arrow-repeat'],['Predicted Orders (7d)','12','#6366f1','bi-lightning'],['Churn Risk','4 customers','#ef4444','bi-exclamation-circle'],['Highest Value Cust.','Amul — ₹18.4L','#f59e0b','bi-trophy']].map(([l,v,c,ic])=>`
    <div style="background:#fff;border:1px solid var(--bd-default);border-radius:10px;padding:12px 14px;border-top:3px solid ${c};Deck-shadow:var(--shadow-sm)">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px">
        <i class="${ic}" style="color:${c};font-size:14px"></i>
        <span style="font-size:10px;color:var(--fg-muted)">${l}</span>
      </div>
      <div style="font-size:17px;font-weight:800;color:${c}">${v}</div>
    </div>`).join('')}
  </div>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">

    <!-- Order Frequency Table -->
    <div style="background:#fff;border:1px solid var(--bd-default);border-radius:10px;overflow:hidden;Deck-shadow:var(--shadow-sm)">
      <div style="padding:14px 16px;border-bottom:1px solid var(--bd-default)">
        <div style="font-weight:700;font-size:13px;display:flex;align-items:center;gap:6px">
          <i class="bi bi-table" style="color:#6366f1"></i> Customer Order Frequency
        </div>
      </div>
      <table style="width:100%;border-collapse:collapse;font-size:12px">
        <thead><tr style="background:var(--bg-subtle)">
          <th style="padding:8px 12px;text-align:left">Customer</th>
          <th style="padding:8px 12px;text-align:center">Avg Freq (days)</th>
          <th style="padding:8px 12px;text-align:center">Last Order</th>
          <th style="padding:8px 12px;text-align:center">Next Expected</th>
          <th style="padding:8px 12px;text-align:right">Avg Order Value</th>
          <th style="padding:8px 12px;text-align:center">Signal</th>
        </tr></thead>
        <tbody>
          ${[
            ['Amul Dairy','7 days','28 Jun','5 Jul','₹2,30,000','Due Soon'],
            ['ITC Limited','14 days','20 Jun','4 Jul','₹1,22,000','Due Soon'],
            ['HUL','10 days','25 Jun','5 Jul','₹86,000','Due Soon'],
            ['Nestlé India','12 days','22 Jun','4 Jul','₹74,000','Due Soon'],
            ['Metro Cash','21 days','15 Jun','6 Jul','₹48,000','Upcoming'],
            ['Godrej Consumer','8 days','28 Jun','6 Jul','₹38,000','Upcoming'],
            ['Patanjali','30 days','5 Jun','5 Jul','₹1,40,000','Overdue!'],
          ].map(([cust,freq,last,next,aov,sig])=>{
            const sc = sig==='Overdue!'?'red':sig==='Due Soon'?'gold':'gray';
            return `<tr style="border-top:1px solid var(--bd-default)">
              <td style="padding:8px 12px;font-weight:600">${cust}</td>
              <td style="padding:8px 12px;text-align:center;color:var(--fg-muted)">${freq}</td>
              <td style="padding:8px 12px;text-align:center;color:var(--fg-muted);font-size:11px">${last}</td>
              <td style="padding:8px 12px;text-align:center;font-weight:600;color:var(--primary)">${next}</td>
              <td style="padding:8px 12px;text-align:right;font-weight:700">${aov}</td>
              <td style="padding:8px 12px;text-align:center"><span class="tag tag-${sc}" style="font-size:10px">${sig}</span></td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>

    <!-- Churn Risk + Product Affinity -->
    <div style="display:flex;flex-direction:column;gap:14px">

      <!-- Churn Risk -->
      <div style="background:#fff;border:1px solid var(--bd-default);border-radius:10px;overflow:hidden;Deck-shadow:var(--shadow-sm)">
        <div style="padding:12px 16px;border-bottom:1px solid var(--bd-default);background:#fef2f2">
          <div style="font-weight:700;font-size:13px;color:#dc2626;display:flex;align-items:center;gap:6px">
            <i class="bi bi-exclamation-circle"></i> Churn Risk Alert
          </div>
          <div style="font-size:11px;color:#b91c1c;margin-top:2px">Customers who haven't ordered in 2× their usual cycle</div>
        </div>
        ${[['Patanjali Ayurveda','30d cycle, last order 55 days ago','High'],['Godrej Consumer','8d cycle, last order 21 days ago — unusual','Medium'],['Marico Ltd','15d cycle, last order 38 days ago','High']].map(([name,reason,risk])=>`
        <div style="padding:10px 16px;border-bottom:1px solid var(--bd-default);display:flex;align-items:center;justify-content:space-between">
          <div>
            <div style="font-size:12px;font-weight:600">${name}</div>
            <div style="font-size:10px;color:var(--fg-muted)">${reason}</div>
          </div>
          <div style="display:flex;align-items:center;gap:8px">
            <span class="tag tag-${risk==='High'?'red':'orange'}" style="font-size:10px">${risk}</span>
            <button class="btn btn-ghost btn-sm" style="font-size:11px"><i class="bi bi-telephone"></i> Follow Up</button>
          </div>
        </div>`).join('')}
      </div>

      <!-- Top Products by Frequency -->
      <div style="background:#fff;border:1px solid var(--bd-default);border-radius:10px;overflow:hidden;Deck-shadow:var(--shadow-sm)">
        <div style="padding:12px 16px;border-bottom:1px solid var(--bd-default)">
          <div style="font-weight:700;font-size:13px;display:flex;align-items:center;gap:6px">
            <i class="bi bi-Deck-seam" style="color:#6366f1"></i> Most Ordered Products (6M)
          </div>
        </div>
        ${[['Poker Size 5-GSM Deck','42 orders','₹82,40,000','85%'],['Die Cut 3-GSM','28 orders','₹24,60,000','58%'],['Sheet SupGSM','15 orders','₹9,20,000','31%'],['Poker Size 7-GSM Deck','12 orders','₹18,40,000','25%'],['Partition Inner','8 orders','₹2,80,000','17%']].map(([prod,orders,rev,pct])=>`
        <div style="padding:10px 16px;border-bottom:1px solid var(--bd-default)">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
            <span style="font-size:12px;font-weight:600">${prod}</span>
            <span style="font-size:11px;color:var(--fg-muted)">${orders} | ${rev}</span>
          </div>
          <div style="background:var(--bg-subtle);border-radius:4px;height:6px">
            <div style="background:#6366f1;border-radius:4px;height:6px;width:${pct}"></div>
          </div>
        </div>`).join('')}
      </div>

    </div>

  </div>
</div>`);
});
