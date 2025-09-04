
/*
// egyszerű nézet váltó
const buttons = document.querySelectorAll('.nav button');
const views = {
    'new': document.getElementById('view-new'),
    'mine': document.getElementById('view-mine'),
    'messages': document.getElementById('view-messages'),
    'contact': document.getElementById('view-contact'),
    'news': document.getElementById('view-news')
};
const welcome = document.getElementById('view-welcome');

function setActive(key){
    buttons.forEach(b=> b.classList.toggle('active', b.getAttribute('data-view')===key));
    // hide all
    Object.values(views).forEach(v=> v.classList.add('hidden'));
    welcome.classList.toggle('hidden', true);

    // show selected
    if(key && views[key]){
    views[key].classList.remove('hidden');
    } else {
    welcome.classList.remove('hidden');
    }
    // shift main focus for A11y
    document.getElementById('main').focus();
}

buttons.forEach(btn=> btn.addEventListener('click', ()=>{
    const key = btn.getAttribute('data-view');
    setActive(key);
}));

// default: show welcome
setActive();

// példa: "Új hibajegy" gomb összekapcsolása (ha integrálod a formot)
document.getElementById('open-new').addEventListener('click', ()=>{
    // ha van külön modal / form: nyisd meg. Most csak átirányít a nézetre és fókuszál.
    setActive('new');
    const btn = document.querySelector('.nav button[data-view="new"]'); if(btn) btn.classList.add('active');
});
*/