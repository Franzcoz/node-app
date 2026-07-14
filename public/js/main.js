$('#login-btn').on('click', (ev)=>{
    ev.preventDefault();
    window.location.href = '/login';
});

$('#register-btn').on('click', (ev)=>{
    ev.preventDefault();
    window.location.href = '/register';
});