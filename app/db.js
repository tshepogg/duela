import { firebaseConfig } from '../firebaseConfig.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, push, set, get, child, onValue, serverTimestamp, update } from
        "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export async function saveTxn(userId, data){
  const id = push(ref(db,'transactions')).key;
  await set(ref(db,`transactions/${id}`), { id, userId, ...data, createdAt: serverTimestamp() });
  return id;
}
export async function getUserTxns(uid){
  const snap = await get(ref(db,'transactions'));
  const list = []; snap.forEach(ch => { const v = ch.val(); if(v.userId===uid) list.push(v); });
  return list.sort((a,b)=>(b.createdAt||0)-(a.createdAt||0));
}
export async function getTxn(id){
  const snap = await get(child(ref(db),`transactions/${id}`));
  return snap.exists()? snap.val(): null;
}
export async function isAdmin(uid){
  const snap = await get(child(ref(db),`admins/${uid}`));
  return snap.exists() && snap.val()===true;
}
export async function markResent(id){
  await update(ref(db,`transactions/${id}`), { resentAt: Date.now() });
}
