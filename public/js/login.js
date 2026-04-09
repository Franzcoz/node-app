// Cambio de evento click en button a submit en form
$('#login-form').on('submit', (event) => {
    event.preventDefault();

    // Añadir alert sobre formulario
    $('#login-form').prepend('<div id="alerta" class="alert alert-dismissible" hidden="true"><p id="msg-alert"></p><button id="alert-btn" class="btn rounded-5">Aceptar</button></div>');
    
    // Capturar email y contraseña ingresados
    const input_user = $('#user').val();
    const input_passwd = $('#passwd').val();

    if (!input_user) {
        alerta("alert-warning","Ingrese usuario","btn-warning");
        return;
    }
    if (!input_passwd) {
        alerta("alert-warning","Ingrese contraseña","btn-warning");
        return;
    }

    const cred = JSON.stringify({usuario: input_user, clave: input_passwd});
    
    async function login(cred) {
        const resp = await fetch('/api/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: cred
        });

        const data = await resp.json();
        console.log(data.usuario);
        if (data.usuario) {
            localStorage.setItem('id_usuario',data.usuario.id_usuario);
            localStorage.setItem('nombre_usuario', data.usuario.nombre);
            alerta("alert-success","Iniciando sesión...","btn-success");
            window.location.href = '/menu.html'
        } else {
            alerta("alert-warning","Usuario o contraseña incorrectos","btn-warning");
            return;
        }
    }
    login(cred);
});

// Función para mostrar alerta

function alerta(type, message, btn) {
    $('#msg-alert').append(message);
    $('#alerta').addClass(type);
    $('#alert-btn').addClass(btn);
    $('#alerta').attr('hidden', false);
    $('#alert-btn').attr('data-bs-dismiss', "alert");
}