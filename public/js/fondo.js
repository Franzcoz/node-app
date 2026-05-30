import { user, rol, token, alertModal } from "./menu.js";

// Definir variables "Emisor seleccionado" y "opción elegida" (agregar, modif, elim...)
let fondos = [];
let fondosSelec = "";
let btnoption = "";
let tabla = document.querySelector('#tablaFondos tbody');
let bod = {};
let response;


// Obtener fondos desde API y cargar en tabla
async function cargarFondos() {
    let resp = await fetch("/api/fondo");
    fondos = await resp.json();

    tabla.innerHTML = "";

    fondos.forEach((fon, i) => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${i + 1}</td>
            <td>${fon.id_fondo}</td>
            <td>${fon.nombre}</td>
            <td>${fon.vigente}</td>
        `;
        tr.onclick = () => seleccionarFila(tr, fon);
        tabla.appendChild(tr);
    });
    console.log("Cargando fondos");
};
cargarFondos();

const seleccionarFila = (tr, fon) => {
    document
        .querySelectorAll('#tablaFondos tr')
        .forEach((f) => f.classList.remove('table-info'));
    tr.classList.add('table-info');
    fondosSelec = fon;
    console.log(fondosSelec);
};

// Cerrando sesión provisorio
$('#logout').on('click', (ev) => {
    ev.preventDefault();
    alertModal("Cerrando sesión...");
    localStorage.clear();
    setTimeout(()=>{window.location.href = "login.html"},2000);
});