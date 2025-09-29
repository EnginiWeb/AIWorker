// ===== LocalStorage Keys =====
const LS = {
  WORKER: 'engini.selectedWorker',
  SKILLS: 'engini.selectedSkills',
  SIGNUP:'engini.signup'
};

// ===== Data =====
const WORKERS = [
  {
    id:'procurement',
    name:'Sarah',
    title:'Procurement & AP Worker',
    desc:'Automates invoice intake, PO matching, supplier ops.',
    adoption:1842,
    roi:['Invoice cycle time ↓35–55%','First-time match rate ↑20–35%'],
    logos:[
      'assets/logos/netsuite.svg',
      'assets/logos/sap-ariba.svg',
      'assets/logos/coupa.svg',
      'assets/logos/tipalti.svg',
      'assets/logos/zip.svg'
    ],
    skills:[
      'Invoice capture (OCR/EDI)','Duplicate supplier/invoice detection','2/3-Way Match (Invoice ↔ PO ↔ GR)',
      'PO & supplier validation','GL / cost center coding','Tax/VAT compliance checks','Exception flagging & routing',
      'Payment proposal creation','Execute supplier payments','Vendor statement reconciliation','Contract renewal monitoring',
      'Supplier performance tracking','Policy enforcement','Audit-ready AP reporting'
    ]
  },
  {
    id:'finance',
    name:'David',
    title:'Finance Ops Worker',
    desc:'Month-end close, reconciliations, reporting.',
    adoption:1376,
    roi:['Month-end close time ↓20–30%','Reconciliation STP ↑60–80%'],
    logos:[
      'assets/logos/netsuite.svg',
      'assets/logos/sap.svg',
      'assets/logos/sage.svg',
      'assets/logos/quickbooks.svg',
      'assets/logos/xero.svg',
      'assets/logos/oracle.svg',
    ],
    skills:[
      'Bank reconciliation','Recurring journal entries','Month-end data consolidation','Accruals & reclasses','AP/AR aging reports',
      'Expense anomaly detection','Cash flow forecasting','Trial balance drafts','VAT/GST reporting','P&L by cost center',
      'Payment batch scheduling','Payroll to GL integration','Variance analysis','DSO/DPO/OPEX KPI tracking'
    ]
  },
  {
    id:'hr',
    name:'Selina',
    title:'HR & Employee Experience Worker',
    desc:'Onboarding, HR tickets, access & records.',
    adoption:1109,
    roi:['Ticket deflection ↑30–50%','Onboarding time ↓40–60%'],
    logos:[
      'assets/logos/workday.svg',
      'assets/logos/successfactors.svg',
      'assets/logos/bamboohr.svg',
      'assets/logos/hibob.svg',
      'assets/logos/ukg.svg',
    ],
    skills:[
      'New-hire onboarding (accounts/systems)','HRIS record creation','Access provisioning/deprovisioning','PTO/leave automation',
      'Payslip/tax form generation','Compliance training reminders','HR ticket FAQ resolution','Performance review reminders',
      'Training completion tracking','Org chart updates','Headcount & attrition reports','Benefits enrollment',
      'Expense reimbursement processing','HR policy compliance checks'
    ]
  },
  {
    id:'it',
    name:'Max',
    title:'IT Service Desk Worker',
    desc:'Triage, resets, provisioning, patching, onboarding.',
    adoption:2204,
    roi:['Auto-resolution ↑40–60%','MTTR ↓25–40%'],
    logos:[
      'assets/logos/servicenow.svg','assets/logos/jira.svg','assets/logos/okta.svg',
      'assets/logos/intune.svg','assets/logos/jamf.svg',
    ],
    skills:[
      'Auto-triage incoming tickets','Password resets','Account unlocks','Incident categorization/prioritization',
      'Close duplicates/low-value tickets','Software package deployment','Security patching',
      'User provisioning/deprovisioning','Intelligent ticket routing','SLA/MTTR KPI reporting',
      'Asset inventory maintenance','Compliance/security scans','Weekly IT ops reports','Uptime/alert monitoring'
    ]
  },
  {
    id:'aml',
    name:'Jacob',
    title:'Financial Crime Compliance (AML/KYC)',
    desc:'Sanctions/PEP, TM, KYC/KYB, EDD, narratives.',
    adoption:987,
    roi:['Alert auto-clearance ↑60–80%','False positives ↓50–70%'],
    logos:[
      // אם אין SVG רשמי – המערכת תציג badge טקסטואלי במקום
      'NICE Actimize','FICO TONBELLER','Refinitiv World-Check','SAS AML','Oracle FCCM'
    ],
    skills:[
      'Sanctions/PEP Alert Triage','False-positive suppression','Payments sanctions screening',
      'AML transaction monitoring (L1 review)','KYC/KYB onboarding docs','Entity resolution & de-duplication',
      'Watchlist/data enrichment','Adverse media monitoring','Case assembly & EDD pack','Risk scoring & KYC refresh',
      'Narrative generation (GenAI)','SAR/STR drafting assist','Quality assurance & audit trail','Workload prioritization & SLA'
    ]
  },
  {
    id:'custom',
    avatar:'custom.png',
    name:'Custom',
    title:'Build your dream worker',
    desc:'Create a custom AI worker tailored to your stack.',
    adoption:null,
    roi:['ROI per use case'],
    logos:[],
    skills:[]
  }
];

// ===== State Helpers =====
function saveWorker(id){
  localStorage.setItem(LS.WORKER, id);
}
function getWorker(){
  const id = localStorage.getItem(LS.WORKER);
  return WORKERS.find(w => w.id === id) || null;
}
function saveSkills(arr){
  localStorage.setItem(LS.SKILLS, JSON.stringify(arr || []));
}
function getSkills(){
  try{ return JSON.parse(localStorage.getItem(LS.SKILLS)||'[]') }catch{ return []}
}
function saveSignup(obj){
  localStorage.setItem(LS.SIGNUP, JSON.stringify(obj||{}));
}
function getSignup(){
  try{ return JSON.parse(localStorage.getItem(LS.SIGNUP)||'{}') }catch{ return {}}
}

// Pricing
function calcTotal(selectedCount){
  const base = 2000;
  const extra = Math.max(0, selectedCount - 5) * 250;
  return {base, extra, total: base + extra};
}

// Utilities
function fmt(n){ return '$' + n.toLocaleString() }

// Modal helpers
function openModal(id){
  const bd = document.getElementById(id+'-backdrop');
  if(bd) bd.style.display='flex';
}
function closeModal(id){
  const bd = document.getElementById(id+'-backdrop');
  if(bd) bd.style.display='none';
}

// Drawer helpers
function openDrawer(){ 
  document.getElementById('drawer-backdrop')?.style.setProperty('display','block');
  document.getElementById('drawer')?.classList.add('open');
}
function closeDrawer(){
  document.getElementById('drawer-backdrop')?.style.setProperty('display','none');
  document.getElementById('drawer')?.classList.remove('open');
}

// ===== Gemini (Browser-safe Note) =====
// לשימוש Production, עדיף Proxy צד-שרת כדי לא לחשוף API-Key.
// כאן – Stub לפיתוח (מחזיר תשובת דמו).
async function callGemini(prompt){
  // אם יש לכם endpoint פרוקסי:
  // const res = await fetch('/api/gemini', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({prompt})});
  // const data = await res.json();
  // return data.text;

  // דמו:
  const demos = [
    "Sure — I extracted the key fields and validated the PO. Would you like me to post it to NetSuite?",
    "I planned 3 steps: parse → validate → execute. Step 1 completed. Proceed?",
    "I found 2 possible duplicates. Want me to merge suggestions?",
    "Drafted a cash-flow forecast for the next 14 days. See the attached summary."
  ];
  return demos[Math.floor(Math.random()*demos.length)];
}

// ===== Export to window (so inline pages can call) =====
window.ENG = {
  WORKERS, saveWorker, getWorker, saveSkills, getSkills, calcTotal, openModal, closeModal, saveSignup, getSignup,
  openDrawer, closeDrawer, callGemini
};
