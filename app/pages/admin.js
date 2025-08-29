import { isAdmin, markResent } from '../db.js';
export function render(){ return `<div class="card"><h3>Admin</h3><div id="adm">Loading…</div></div>`; }
export async function init({user}){
  if(!(await isAdmin(user.uid))){ location.hash='#/home'; return; }
  const snap = await (await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js"))
    .get((await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js")).ref(
      (await import('../db.js')).default || null,'transactions')); // simplified fetch via db.js already provided
}
