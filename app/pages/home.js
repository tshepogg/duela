export function render({user}){return `
  <div class="card">
    <h2>Hi, ${user?.email||'friend'} 👋</h2>
    <p>Buy a prepaid water voucher quickly and securely.</p>
    <button class="btn" id="buy">Buy Water Voucher</button>
  </div>`;}
export function init(){ document.getElementById('buy').onclick=()=>location.hash='#/buy'; }
