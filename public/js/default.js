async function cargarMenus() {
    const user = localStorage.getItem('id_usuario');
    if (!user) {
        window.location.href = '/login';
        return;
    }

    // Despliegue del nombre de usuario y menú
    const nombre = localStorage.getItem('nombre_usuario');
    document.getElementById('username1').innerHTML = nombre.split(' ')[0];
    document.getElementById('username2').innerHTML = nombre;
    const search = new URLSearchParams(window.location.search);
    const menuname = search.get("menu");
    document.getElementById("menuname").innerText = menuname;
    document.title = `Cool Wallet - ${menuname}`;

    // Llamada a API para obtener menús
    const params = new URLSearchParams({ user: user });
    const resp = await fetch(`/api/menus/?${params}`);
    const menus = await resp.json();

    const menuList = document.getElementById('menulist');
    menuList.innerHTML = "";

    menus.forEach((m) => {
        const button = document.createElement('button');
        const classatt = document.createAttribute("class");
        classatt.value = 'btn btn-main w-100 rounded-5';
        button.setAttributeNode(classatt);
        button.setAttribute('id',m.id_menu);
        button.innerHTML = m.nombre;
        button.setAttribute('onclick',`window.location.href="${m.ruta}?menu=${encodeURIComponent(m.nombre)}"`);
        menuList.append(button);
    });
};

cargarMenus();

// Cerrando sesión provisorio
$('#logout').on('click', (ev) => {
    ev.preventDefault();
    alertModal("Cerrando sesión...");
    localStorage.clear();
    setTimeout(()=>{window.location.href = "login.html"},2000);
});

// Función modal

function alertModal(mssg) {
    $('#new .modal-body').append('<h4>'+mssg+'</h4>');
}