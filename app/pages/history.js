import { getUserTxns } from '../db.js';
export function render(){ return `<div class="list" id="hist">Loading…</div>`; }
export async function init({user}){
  const list = await getUserTxns(user.uid); const el = document.getElementById('hist');
  el.innerHTML = list.map(t=>`
    <div class="row">
      <div><b>${new Date(t.createdAt||Date.now()).toLocaleString()}</b><br/>Meter ${t.meter}</div>
      <div>P${t.amount.toFixed(2)}<br/><a href="#/receipt/${t.id}">View</a></div>
    </div>`).join('') || '<div class="card">No purchases yet.</div>';
}
