let alertCount = 0;

// Cambio de evento click en button a submit en form
$('#login-form').on('submit', (event) => {
    event.preventDefault();

    // Capturar email y contraseña ingresados
    const input_user = $('#user').val();
    const input_passwd = $('#passwd').val();

    // Añadir alert sobre formulario
    alertCount++
    const alertdiv = `<div id="alerta-${alertCount}" class="alert alert-dismissible position-fixed" hidden="true" style="transform: translateX(50%);right: 50%;"><p id="msg-alert"></p><button id="alert-btn" class="btn rounded-5">Aceptar</button></div>`;

    if (!input_user) {
        $('#login-form').prepend(alertdiv);
        alerta(alertCount, "alert-warning","Ingrese usuario","btn-warning", 3000);
        return;
    }
    if (!input_passwd) {
        $('#login-form').prepend(alertdiv);
        alerta(alertCount, "alert-warning","Ingrese contraseña","btn-warning", 3000);
        return;
    }

    const cred = JSON.stringify({usuario: input_user, clave: input_passwd});
    
    async function login(cred) {
        const resp = await fetch('/api/auth/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: cred
        });

        const data = await resp.json();
        if (data.usuario) {
            localStorage.setItem('id_usuario',data.usuario.id_usuario);
            localStorage.setItem('nombre_usuario', data.usuario.nombre);
            localStorage.setItem('id_rol', data.usuario.Rols.id_rol);
            localStorage.setItem('nombre_rol', data.usuario.Rols.nombre_rol);

            $('#login-form').prepend(alertdiv);
            alerta(alertCount, "alert-success","Iniciando sesión...","btn-success");
            window.location.href = '/menu'
        } else {
            $('#login-form').prepend(alertdiv);
            alerta(alertCount, "alert-warning","Credenciales incorrectas","btn-warning", 3000);
            return;
        }
    }
    login(cred);
});

// Función para mostrar alerta

function alerta(num, type, message, btn, time = 5000) {
    $('#msg-alert').append(message);
    $(`#alerta-${num}`).addClass(type);
    $('#alert-btn').addClass(btn);
    $(`#alerta-${num}`).attr('hidden', false);
    $('#alert-btn').attr('data-bs-dismiss', "alert");
    setTimeout(()=> {
        let elem = document.getElementById(`alerta-${num}`);
        if (elem) {
            document.getElementById('login-form').removeChild(elem);
        }
        alertCount--
    },time);
}