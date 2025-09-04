
// \u2014\u2014 Tab kezelés
const tabLogin = document.getElementById('tab-login');
const tabRegister = document.getElementById('tab-register');
const panelLogin = document.getElementById('panel-login');
const panelRegister = document.getElementById('panel-register');

function activate(tab){
    const loginActive = tab === 'login';
    tabLogin.setAttribute('aria-selected', loginActive);
    tabRegister.setAttribute('aria-selected', !loginActive);
    panelLogin.classList.toggle('hidden', !loginActive);
    panelRegister.classList.toggle('hidden', loginActive);
}
tabLogin.addEventListener('click', ()=>activate('login'));
tabRegister.addEventListener('click', ()=>activate('register'));

// \u2014\u2014 Jelszó megjelenítés/elrejtés
document.querySelectorAll('.toggle-eye').forEach(btn=>{
    btn.addEventListener('click', ()=>{
    const id = btn.getAttribute('data-toggle');
    const input = document.getElementById(id);
    const visible = input.getAttribute('type') === 'text';
    input.setAttribute('type', visible ? 'password' : 'text');
    btn.setAttribute('aria-label', visible ? 'Jelszó megjelenítése' : 'Jelszó elrejtése');
    });
});

// Segédek
function setFieldError(id, msg){
    const el = document.getElementById(id);
    if(el){ el.textContent = msg || ''; }
}
function showAlert(id, msg, type='error'){
    const box = document.getElementById(id);
    if(!box) return;
    box.className = `alert ${type} ${msg ? 'show' : ''}`;
    box.textContent = msg || '';
}

// Mockolt API hívások \u2013 itt cseréld le fetch-re a saját backendhez
async function apiLogin(payload){
    await new Promise(r=>setTimeout(r, 500));
    if(payload.email === 'error@example.com'){
    const err = new Error('Hibás belépési adatok');
    err.field = 'email';
    throw err;
    }
    return { token: 'fake-jwt', user: { name: 'Teszt Elek', email: payload.email } };
}
async function apiRegister(payload){
    await new Promise(r=>setTimeout(r, 600));
    if(/@invalid$/.test(payload.email)){
    const err = new Error('Ezzel az e-mail címmel már regisztráltak');
    err.field = 'reg-email-error';
    throw err;
    }
    return { id: 'user_123', ...payload };
}

// Bejelentkezés submit
const formLogin = document.getElementById('form-login');
formLogin.addEventListener('submit', async (e)=>{
    e.preventDefault();
    showAlert('login-alert', '');
    setFieldError('login-email-error', '');
    setFieldError('login-password-error', '');

    const email = document.getElementById('login-email');
    const password = document.getElementById('login-password');

    // HTML5 validáció
    if(!email.checkValidity()){
    setFieldError('login-email-error', email.validationMessage);
    email.focus();
    return;
    }
    if(!password.checkValidity()){
    setFieldError('login-password-error', password.validationMessage || 'A jelszó kötelező');
    password.focus();
    return;
    }

    const submitBtn = document.getElementById('login-submit');
    submitBtn.disabled = true; submitBtn.innerHTML = '<span>Bejelentkezés...</span>';
    try{
    const res = await apiLogin({ email: email.value.trim(), password: password.value });
    showAlert('login-alert', 'Sikeres bejelentkezés! Átirányítás...', 'success');
    // TODO: token kezelése (httpOnly cookie ajánlott), redirect a dashboardra
    }catch(err){
    if(err.field === 'email') setFieldError('login-email-error', err.message);
    else if(err.field === 'password') setFieldError('login-password-error', err.message);
    else showAlert('login-alert', err.message || 'Ismeretlen hiba történt');
    }finally{
    submitBtn.disabled = false; submitBtn.innerHTML = '<span>Bejelentkezés</span>';
    }
});

// Regisztráció submit
const formRegister = document.getElementById('form-register');
formRegister.addEventListener('submit', async (e)=>{
    e.preventDefault();
    showAlert('register-alert', '');
    setFieldError('reg-name-error', '');
    setFieldError('reg-email-error', '');
    setFieldError('reg-password-error', '');
    setFieldError('reg-confirm-error', '');

    const name = document.getElementById('reg-name');
    const email = document.getElementById('reg-email');
    const pass = document.getElementById('reg-password');
    const confirm = document.getElementById('reg-confirm');

    if(!name.checkValidity()){
    setFieldError('reg-name-error', name.validationMessage);
    name.focus(); return;
    }
    if(!email.checkValidity()){
    setFieldError('reg-email-error', email.validationMessage);
    email.focus(); return;
    }
    if(!pass.checkValidity()){
    setFieldError('reg-password-error', pass.validity.patternMismatch ? 'Kell legalább 1 betű és 1 szám' : pass.validationMessage);
    pass.focus(); return;
    }
    if(confirm.value !== pass.value){
    setFieldError('reg-confirm-error', 'A jelszavak nem egyeznek');
    confirm.focus(); return;
    }

    const btn = document.getElementById('register-submit');
    btn.disabled = true; btn.innerHTML = '<span>Regisztráció...</span>';
    try{
    const res = await apiRegister({ name: name.value.trim(), email: email.value.trim(), password: pass.value });
    showAlert('register-alert', 'Sikeres regisztráció! Most jelentkezz be.', 'success');
    // Siker után átváltunk a bejelentkezés fülre
    activate('login');
    }catch(err){
    if(err.field) setFieldError(err.field, err.message);
    else showAlert('register-alert', err.message || 'Ismeretlen hiba történt');
    }finally{
    btn.disabled = false; btn.innerHTML = '<span>Regisztráció</span>';
    }
});
