let user = "";

async function cargarMenus() {
    user = localStorage.getItem('id_usuario');
    if (!user) {
        window.location.href = '/login';
        return;
    }

    // Despliegue del nombre de usuario
    const nombre = localStorage.getItem('nombre_usuario');
    document.getElementById('username1').innerHTML = nombre.split(' ')[0];
    document.getElementById('username2').innerHTML = nombre;


    // Llamada a API para obtener menús
    const params = new URLSearchParams({ user: user });
    const resp = await fetch(`/api/menus/?${params}`);
    const menus = await resp.json();

    const menuList = document.getElementById('menulist');
    menuList.innerHTML = "";

    menus.forEach((m) => {
        const button = document.createElement('button');
        const classatt = document.createAttribute("class");
        classatt.value = 'btn btn-main w-100 m-1 rounded-5';
        button.setAttributeNode(classatt);
        button.setAttribute('id',m.id_menu);
        button.innerHTML = m.nombre;
        button.setAttribute('onclick',`window.location.href="${m.ruta}?menu=${encodeURIComponent(m.nombre)}"`);
        menuList.append(button);
    });
};

// Cerrando sesión provisorio
$('#logout').on('click', (ev) => {
    ev.preventDefault();
    document.querySelector('.modal-footer').setAttribute('class', 'modal-footer d-none');
    alertModal("Cerrando sesión...");
    localStorage.clear();
    setTimeout(()=>{window.location.href = "login.html"},2000);
});

// Función modal

function alertModal(mssg) {
    document.querySelector('#new .modal-body h4').innerHTML = "";
    $('#modal-title').append(mssg);
}

export { cargarMenus, user };

cargarMenus();