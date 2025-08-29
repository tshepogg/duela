import { saveTxn } from '../db.js';
import { toast } from '../ui.js';
import { auth } from '../auth.js';
function genToken(){ return Array.from({length:20},()=>Math.floor(Math.random()*10)).join(''); }
export function render(){return `
  <div class="card">
    <h3>Buy Water Voucher</h3>
    <input id="meter" class="input" placeholder="Meter / Account Number"/>
    <select id="amt" class="input" style="margin-top:8px">
      <option value="50">P50</option><option value="100">P100</option>
      <option value="200">P200</option><option value="0">Custom…</option>
    </select>
    <input id="custom" class="input" placeholder="Custom amount" style="margin-top:8px;display:none"/>
    <button id="pay" class="btn" style="margin-top:12px">Pay (Demo)</button>
  </div>`;}
export function init(){
  const meter = document.getElementById('meter'), amt = document.getElementById('amt'), custom = document.getElementById('custom');
  amt.onchange = ()=> custom.style.display = amt.value==='0' ? 'block':'none';
  document.getElementById('pay').onclick = async ()=>{
    const amount = amt.value==='0' ? Number(custom.value||0) : Number(amt.value);
    if(!meter.value || !amount) return toast('Enter meter and amount');
    const payload = { meter: meter.value, amount, status:'SUCCESS', voucherToken: genToken(), paymentRef:`PAY-${Date.now()}` };
    if(!navigator.onLine){
      const q = JSON.parse(localStorage.getItem('queued')||'[]'); q.push(payload); localStorage.setItem('queued',JSON.stringify(q));
      toast('Queued — will sync when online'); location.hash='#/history'; return;
    }
    const uid = auth.currentUser?.uid;
    if (!uid) return toast('Not signed in');
    const id = await saveTxn(uid, { ...payload, userId: uid });
    location.hash = `#/receipt/${id}`;
  };
  window.addEventListener('online', async ()=>{
    const q = JSON.parse(localStorage.getItem('queued')||'[]');
    if(!q.length) return;
    const uid = auth.currentUser?.uid;
    if(!uid) return;
    for(const p of q){ await saveTxn(uid, { ...p, userId: uid }); }
    localStorage.removeItem('queued');
    toast('Queued purchases synced');
  }, { once:true });
}
