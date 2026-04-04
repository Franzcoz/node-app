const email = "persona@email.com";
const passwd = "hola123";

// Cambio de evento click en button a submit en form
$('#login-form').on('submit', (event) => {
    event.preventDefault();

    // Añadir alert sobre formulario
    $('#cont-2').prepend('<div id="alerta" class="alert alert-dismissible" hidden="true"><p id="msg-alert"></p><button id="alert-btn" class="btn rounded-5">Aceptar</button></div>');
    
    // Capturar email y contraseña ingresados
    let input_email = $('#email').val();
    let input_passwd = $('#passwd').val();
    // En las siguientes condiciones se llama a la función de alerta y se entregan los parámetros adecuados
    // Corroborar que se ignrese email, que coincida con email registrado)
    if (input_email == false) {
        alerta("alert-warning","Ingrese email","btn-warning");
        return;
    } else if (input_email != email) {
        alerta("alert-warning","Credenciales incorrectas","btn-warning");
        return;
    };
    // Corroborar que se ingrese una contraseña y que coincida con la registrada
    if (input_passwd == false){
        alerta("alert-warning","Ingrese una contraseña","btn-warning");
        return;
    } else if (input_passwd != passwd) {
        alerta("alert-warning","Credenciales incorrectas","btn-warning");
        return;
    // Corroborar doblemente que coincidan email y contraseña con los registrados y redirección
    } else if (input_passwd === passwd && input_email === email) {
        alerta("alert-success","Iniciando sesión...","btn-success");
        setTimeout(()=>{window.location.href = "menu.html"},2000);
    } else {
        alert("Error desconocido");
        return;
    }
});

// Función para mostrar alerta

function alerta(type, message, btn) {
    $('#msg-alert').append(message);
    $('#alerta').addClass(type);
    $('#alert-btn').addClass(btn);
    $('#alerta').attr('hidden', false);
    $('#alert-btn').attr('data-bs-dismiss', "alert");
}