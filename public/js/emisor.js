import { user, rol, alertModal } from "./menu.js";

// Definir variables "Emisor seleccionado" y "opción elegida" (agregar, modif, elim...)
let emisores = [];
let emisorSelec = "";
let btnoption = "";
let tabla = document.querySelector('#tablaEmisores tbody');
let bod = {};
let response;


// Obtener emisores desde API y cargar en tabla
async function cargarEmisores() {
    let resp = await fetch("/api/emisor", {
        headers: {
            "Content-Type": "application/json",
        },
    });
    emisores = await resp.json();
    console.log(emisores)

    tabla.innerHTML = "";

    emisores.forEach((emi, i) => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${i + 1}</td>
            <td>${emi.id_emisor}</td>
            <td>${emi.razon_social}</td>
            <td>${emi.nombre}</td>
        `;
        tr.onclick = () => seleccionarFila(tr, emi);
        tabla.appendChild(tr);
    });
    console.log("Cargando emisores");
};
cargarEmisores();

const seleccionarFila = (tr, emi) => {
    document
        .querySelectorAll('#tablaEmisores tr')
        .forEach((f) => f.classList.remove('table-info'));
    tr.classList.add('table-info');
    emisorSelec = emi;
    console.log(emisorSelec);
};

// Mostrar y construir formulario según cada botón
// El modal se reutilizará para los formularios como para las alertas
$("#header button").on('click', (ev) => {
    ev.preventDefault();
    
    // Detectar en qué botón se hizo clic 
    btnoption = ev.target.id;
    const form = document.querySelector('#formEmisor');
    const formdivs = form.querySelectorAll('div');
    form.reset();
    form.setAttribute('class', 'my-2 py-2');
    // Esconder campos
    // Alerta de ningún emisor seleccionado para editar o eliminar
    if (btnoption != "addemi" && !emisorSelec) {
        formdivs.forEach((el) => {
            el.setAttribute('class', 'd-none');
        });
        alertModal('Seleccione un emisor');
        document.querySelector('.modal-footer').setAttribute('class', 'modal-footer d-none');
        return;
    }

    // Reiniciar atributos generales de formulario
    document.querySelector('.modal-footer').setAttribute('class', 'modal-footer');
    document.querySelector('#id_emi').removeAttribute("disabled");
    document.querySelector('#razon_emi').removeAttribute("disabled");
    document.querySelector('#nom_emi').removeAttribute("disabled");
    
    // Mostrar campos deseados según opción
    document.querySelector('#campo_id').setAttribute('class', 'm-1');
    document.querySelector('#campo_razon').setAttribute('class', 'm-1');
    document.querySelector('#campo_nom').setAttribute('class', 'm-1');
    if (btnoption != "addemi") {
        document.querySelector('#id_emi').setAttribute("disabled","");
        document.querySelector('#id_emi').value = emisorSelec.id_emisor;
        document.querySelector('#razon_emi').value = emisorSelec.razon_social;
        document.querySelector('#nom_emi').value = emisorSelec.nombre;
        if (btnoption == "delemi") {
            document.querySelector('#razon_emi').setAttribute("disabled","");
            document.querySelector('#nom_emi').setAttribute("disabled","");
        }
    };
    
    // Botones y título
    const btn = document.querySelector('#sendbtn');
    let obj = {};
    if (btnoption == "addemi") {
        obj = { class: 'good',text: 'Agregar',title: 'Agregar Emisor' };
    } else if (btnoption == "modif") {
        obj = { class: 'neut',text: 'Confirmar',title: 'Editar Emisor' };
    } else if (btnoption == "delemi") {
        obj = { class: 'bad',text: 'Eliminar',title: 'Eliminar Emisor' };
    }
    btn.setAttribute('class',`btn btn-${obj.class} rounded-5 py-1`);
    btn.innerHTML = obj.text;

    // Enviar título a función que muestra modal
    alertModal(obj.title);
});


// Fx crear nuevo emisor
async function nuevoEmi() {
    const resp = await fetch('/api/emisor', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bod)
    });
    const nuevo = await resp;
};

// Fx editar emisor
async function editEmi() {
    const resp = await fetch(`/api/emisor/${emisorSelec.id_emisor}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bod)
    });
    const edit = await resp;
};

// Fx eliminar emisor
async function elimEmi() {
    const resp = await fetch(`/api/emisor/${emisorSelec.id_emisor}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        },
    });
};


// Evento clic enviar formulario y solicitar API desde formulario modal
$('#new button#sendbtn').on('click',(ev) => {
    ev.preventDefault();

    const list = document.getElementById('formEmisor').querySelectorAll('.form-control');
    let formValues = [];

    // Obtener lo ingresado en formulario
    list.forEach((li) => {
        formValues.push(li.value);
    });

    bod = {id: formValues[0], razon_social: formValues[1], nombre: formValues[2], usuario: user};
    if (btnoption == "addemi") {
        // Validar que código no esté vacío o contenga otros caracteres
        if (!bod.id || bod.id.search(/[\s\W]/) >= 0) {
            document.querySelector('#formEmisor').setAttribute('class', 'd-none');
            document.querySelector('#sendbtn').setAttribute('class', 'd-none');
            alertModal(`Campo "Código": Ingrese un valor válido`);
            return;
        } else {
            nuevoEmi()
            .then(() => {
                cargarEmisores();
            })
            .catch( err => {
                console.log(`Error: ${err}`);
            });
        }
    }
    if (btnoption == "modif") {
        editEmi()
        .then(()=>{
            cargarEmisores();
        })
        .catch( err => {
            console.log(`Error: ${err}`);
        });
        // if (!resp.ok) {} Implementar mensaje de error
    }
    if (btnoption == "delemi") {
        elimEmi()
        .then(()=>{
            cargarEmisores();
        })
        .catch( err => {
            console.log(`Error: ${err}`);
        });
        //const nuevo = await resp.json();
        // if (!resp.ok) {} Implementar mensaje de error

    }
    $('#new').modal('hide');
    bod = {};
});