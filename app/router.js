import { watchAuth, logout, toggleAdminLink } from './auth.js';
import * as Login from './pages/login.js';
import * as Home from './pages/home.js';
import * as Buy from './pages/buy.js';
import * as Receipt from './pages/receipt.js';
import * as History from './pages/history.js';
import * as Admin from './pages/admin.js';

const routes = {
  '#/login': Login, '#/home': Home, '#/buy': Buy,
  '#/history': History, '#/admin': Admin
};
function parseRoute(){
  const h = location.hash || '#/home';
  if(h.startsWith('#/receipt/')) return ['#/receipt', h.split('/').pop()];
  return [h, null];
}
async function render(user){
  const [key, param] = parseRoute();
  const page = key === '#/receipt' ? Receipt : routes[key] || Home;
  document.getElementById('logoutBtn').onclick = logout;
  if(user) toggleAdminLink(user.uid);
  const el = document.getElementById('app');
  el.innerHTML = page.render({ user, param });
  page.init?.({ user, param });
}
watchAuth(user => render(user));
window.addEventListener('hashchange', ()=>watchAuth(user=>render(user)));
