export function toast(msg){const t=document.createElement('div');t.className='toast';t.textContent=msg;document.body.appendChild(t);setTimeout(()=>t.remove(),2500);}
export function spinner(show){document.body.style.cursor=show?'progress':'default';}
export const fmt = n => `P${Number(n).toFixed(2)}`;
export const copy = async t => {await navigator.clipboard.writeText(t); toast('Copied');};
