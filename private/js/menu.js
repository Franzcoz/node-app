let user = localStorage.getItem('id_usuario');
let rol = localStorage.getItem('id_rol');

async function cargarMenus() {
    // Despliegue de datos de usuario
    const nombre = localStorage.getItem('nombre_usuario');
    document.getElementById('username1').innerHTML = nombre.split(' ')[0];
    document.getElementById('username2').innerHTML = nombre;
    const nombre_rol = localStorage.getItem('nombre_rol');
    document.getElementById('userrol').innerHTML = nombre_rol;

    // Llamada a API para obtener menús y entregando token
    const params = new URLSearchParams({ user: user });
    const resp = await fetch(`/api/menus/?${params}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    const menus = await resp.json();

    // Si la respuesta da un error por token expirado o similar esto lo capta
    if (!resp.ok) {
        if (menus.mensaje == "token inválido") {
            window.location.href = '/login';
            return;
        }
        console.log('Error');
        console.log(menus);
        return;
    }

    const menuList = document.getElementById('menulist');
    menuList.innerHTML = "";

    menus.forEach((m) => {
        const button = document.createElement('button');
        const classatt = document.createAttribute("class");
        classatt.value = 'btn btn-main w-100 m-1 rounded-5';
        button.setAttributeNode(classatt);
        button.setAttribute('id',m.id_menu);
        button.innerHTML = m.nombre;
        button.setAttribute('onclick',`window.location.href="${m.ruta.split('.')[0]}"`);
        menuList.append(button);
    });
};

// Cerrando sesión
$('#logout').on('click', async (ev) => {
    ev.preventDefault();
    document.querySelector('form').setAttribute('class', 'd-none');
    document.querySelector('.modal-footer').setAttribute('class', 'modal-footer d-none');
    alertModal("Cerrando sesión...");
    localStorage.clear();
    window.location.href = '/logout';
});

// Función modal

function alertModal(mssg) {
    document.querySelector('#new .modal-body h4').innerHTML = "";
    $('#modal-title').append(mssg);
    $('#new').modal("show");
}

export { cargarMenus, user, rol, alertModal };

cargarMenus()