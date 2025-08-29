import { login, signup, resetPw } from '../auth.js';
import { toast } from '../ui.js';
export function render(){return `
  <div class="card">
    <h2>Welcome to Mokoro</h2>
    <input id="email" class="input" placeholder="Email"/>
    <input id="pw" type="password" class="input" placeholder="Password" style="margin-top:8px"/>
    <div style="display:flex;gap:8px;margin-top:12px">
      <button id="login" class="btn">Sign in</button>
      <button id="signup" class="btn" style="background:#222">Create account</button>
    </div>
    <button id="reset" style="margin-top:8px">Forgot password?</button>
  </div>`;}
export function init(){
  const $ = id => document.getElementById(id);
  $('login').onclick = async ()=>{ try{ await login($('email').value,$('pw').value); location.hash='#/home'; }catch(e){ toast(e.message); } };
  $('signup').onclick= async ()=>{ try{ await signup($('email').value,$('pw').value); location.hash='#/home'; }catch(e){ toast(e.message); } };
  $('reset').onclick = async ()=>{ try{ await resetPw($('email').value); toast('Reset link sent'); }catch(e){ toast(e.message); } };
}
