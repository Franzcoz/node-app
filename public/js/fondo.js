import { user, rol, alertModal } from "./menu.js";

// Definir variables "Emisor seleccionado" y "opción elegida" (agregar, modif, elim...)
let fondos = [];
let fondosSelec = "";
let btnoption = "";
let tabla = document.querySelector('#tablaFondos tbody');
let bod = {};
let response;


// Obtener fondos desde API y cargar en tabla
async function cargarFondos() {
    let resp = await fetch("/api/fondo", {
        headers: {
            "Content-Type": "application/json",
        },
    });
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

$("#header button").on('click', (ev) => {
    ev.preventDefault();
    /* 
    // Detectar en qué botón se hizo clic 
    btnoption = ev.target.id;
    const form = document.querySelector('#formInstr');
    const formdivs = form.querySelectorAll('div');
    form.reset();
    form.setAttribute('class', 'my-2 py-2');
    // Esconder campos
    // Alerta de ningún instrumento seleccionado par editar o eliminar
    if (btnoption != "addinst" && !instruSelec) {
        formdivs.forEach((el) => {
            el.setAttribute('class', 'd-none');
        });
        alertModal('Seleccione un instrumento');
        document.querySelector('.modal-footer').setAttribute('class', 'modal-footer d-none');
        return;
    }

    // Reiniciar atributos generales de formulario
    document.querySelector('.modal-footer').setAttribute('class', 'modal-footer');
    document.querySelector('#id_ins').removeAttribute("disabled");
    document.querySelector('#nombre_ins').removeAttribute("disabled");
    document.querySelector('#tipo_mer').removeAttribute("disabled");
    
    // Mostrar campos deseados según opción
    document.querySelector('#campo_id').setAttribute('class', 'm-1');
    document.querySelector('#campo_nom').setAttribute('class', 'm-1');
    document.querySelector('#campo_merc').setAttribute('class', 'm-1');
    if (btnoption != "addinst") {
        document.querySelector('#id_ins').setAttribute("disabled","");
        document.querySelector('#id_ins').value = instruSelec.id_instrumento;
        document.querySelector('#nombre_ins').value = instruSelec.nombre;
        document.querySelector('#tipo_mer').value = instruSelec.tipo_mercado;
        if (btnoption == "delinst") {
            document.querySelector('#nombre_ins').setAttribute("disabled","");
            document.querySelector('#tipo_mer').setAttribute("disabled","");
        }
    };
    
    // Botones y título
    const btn = document.querySelector('#sendbtn');
    let obj = {};
    if (btnoption == "addinst") {
        obj = { class: 'good',text: 'Agregar',title: 'Agregar Instrumento' };
    } else if (btnoption == "modif") {
        obj = { class: 'neut',text: 'Confirmar',title: 'Editar Instrumento' };
    } else if (btnoption == "delinst") {
        obj = { class: 'bad',text: 'Eliminar',title: 'Eliminar Instrumento' };
    }
    btn.setAttribute('class',`btn btn-${obj.class} rounded-5 py-1`);
    btn.innerHTML = obj.text; */

    // Enviar título a función que muestra modal
    alertModal('Pronto...');
});

// Cerrando sesión provisorio
$('#logout').on('click', (ev) => {
    ev.preventDefault();
    alertModal("Cerrando sesión...");
    localStorage.clear();
    setTimeout(()=>{window.location.href = "login.html"},2000);
});