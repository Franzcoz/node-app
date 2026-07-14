let alertCount = 0;

$('#user').on('blur', (event) => {
    event.preventDefault();

    const input_user = $('#user').val();
    
    async function check_usr(user) {
        try {
            const resp = await fetch(`/api/registro/${user}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await resp.json();

            if (data.status != 'success') {
                // Añadir alert sobre formulario
                alertCount++

                // Insertar alert en html
                $('#register-form').prepend(`<div id="alerta-${alertCount}" class="alert alert-dismissible position-fixed" hidden="true" style="transform: translateX(50%);right: 50%;"><p id="msg-alert"></p><button id="alert-btn" class="btn rounded-5">Aceptar</button></div>`);
                
                alerta(alertCount, "alert-warning","Usuario no disponible","btn-warning",3000);// Configurar y mostrar alert
                document.getElementById('register-btn').setAttribute('disabled', 'true');// Desabilitar botón de envio
                return;
            } else {
                $('#register-btn').removeAttr('disabled');
            }
        } catch (error) {
            alertCount++
            console.log(error);
            $('#register-form').prepend(`<div id="alerta-${alertCount}" class="alert alert-dismissible position-fixed" hidden="true" style="transform: translateX(50%);right: 50%;"><p id="msg-alert"></p><button id="alert-btn" class="btn rounded-5">Aceptar</button></div>`);
            
            alerta(alertCount, "alert-warning", 'Error al consultar usuario', "btn-warning", 3000);// Configurar y mostrar alert
            document.getElementById('register-btn').setAttribute('disabled', 'true');// Desabilitar botón de envio
            return;
        }
    }
    check_usr(input_user);
});

$('[id$=passwd]').on('blur', (event) => {
    event.preventDefault();
    const input_passwd = $('#passwd').val();
    const input_repasswd = $('#re-passwd').val();

    // Añadir alert sobre formulario
    
    if (input_passwd.length > 0 && input_repasswd.length > 0 && input_passwd != input_repasswd) {
        alertCount++
        $('#register-form').prepend(`<div id="alerta-${alertCount}" class="alert alert-dismissible position-fixed" hidden="true" style="transform: translateX(50%);right: 50%;"><p id="msg-alert"></p><button id="alert-btn" class="btn rounded-5">Aceptar</button></div>`);
        
        alerta(alertCount, "alert-warning","Contraseñas no coinciden","btn-warning",3000);
        document.getElementById('register-btn').setAttribute('disabled', 'true');
        return;
    } else if (input_passwd && input_repasswd) {
        $('#register-btn').removeAttr('disabled');
    }
});

// Envío de formulario
$('#register-form').on('submit', (event) => {
    event.preventDefault();

    // Capturar email y contraseña ingresados
    const input_user = $('#user').val();
    const input_passwd = $('#passwd').val();
    const input_repasswd = $('#re-passwd').val();
    const name = $('#name').val();
    const lastname1 = $('#lastname1').val();
    const lastname2 = $('#lastname2').val();
    const email = $('#email').val();

    // Añadir alert sobre formulario
    alertCount++
    const alertdiv = `<div id="alerta-${alertCount}" class="alert alert-dismissible position-fixed" hidden="true" style="transform: translateX(50%);right: 50%;"><p id="msg-alert"></p><button id="alert-btn" class="btn rounded-5">Aceptar</button></div>`;

    if (input_user.length >0 &&
        input_passwd.length >0 &&
        input_repasswd.length >0
        && name.length >0 &&
        lastname1.length >0 &&
        email.length >0) {
            try {
                const body = JSON.stringify({
                    id_usuario: input_user,
                    clave: input_passwd,
                    nombre: name,
                    apellido1: lastname1,
                    apellido2: lastname2,
                    email: email
                });
                async function register(body) {
                    const resp = await fetch('/api/registro', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: body
                    });
                    const data = await resp.json();
                    if (data.status == 'success') {
                        $('#register-form').prepend(alertdiv);
                        alerta(alertCount, "alert-success","Usuario registrado, por favor espere validación dentro de 24 hrs.", "btn-success", 10000);
                    } else {
                        $('#register-form').prepend(alertdiv);
                        alerta(alertCount, "alert-danger","Error al registrar usuario","btn-danger");
                    }
                };
                register(body);
            } catch (error) {
                console.log(error);
                $('#register-form').prepend(alertdiv);
                alerta(alertCount, "alert-danger","Error enviando datos","btn-danger");
            };
    } else {
        $('#register-form').prepend(alertdiv);
        alerta(alertCount, "alert-warning","Ingrese datos requeridos","btn-warning",3000);
        return;
    }
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
            document.getElementById('register-form').removeChild(elem);
        }
        alertCount--
    },time);
}