import { getTxn } from '../db.js'; import { copy, fmt, toast } from '../ui.js';
export function render(){ return `<div class="card"><div id="r">Loading…</div></div>`; }
export async function init({param}){
  const t = await getTxn(param); const el = document.getElementById('r');
  if(!t){ el.textContent='Not found'; return; }
  el.innerHTML = `
    <h3>Receipt</h3>
    <p><b>Token:</b> <code id="tok">${t.voucherToken}</code></p>
    <p><b>Meter:</b> ${t.meter}</p>
    <p><b>Amount:</b> ${fmt(t.amount)}</p>
    <p><b>Ref:</b> ${t.paymentRef}</p>
    <button class="btn" id="copy">Copy Token</button>
    <a href="#/home" style="margin-left:8px">Back to Home</a>`;
  document.getElementById('copy').onclick=()=>copy(document.getElementById('tok').textContent);
}
