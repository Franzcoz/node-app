import { cargarMenus, user } from "./menu.js";

// Definir variables "instrumento seleccionado" y "opción elegida" (agregar, modif, elim...)
let instrum = [];
let instruSelec = "";
let btnoption = "";
let tabla = document.querySelector('#tablaInstrumentos tbody');
let bod = {};

// Obtener tipo de Renta según código
function tipoRenta(codigo) {
    if (codigo === 'F') {
    return 'Renta Fija';
    }

    if (codigo === 'V') {
    return 'Renta Variable';
    }
    return codigo;
}

// Obtener instrumentos desde API y cargar en tabla
async function cargarInstrum() {
    let resp = await fetch("/api/inst");
    instrum = await resp.json();

    tabla.innerHTML = "";

    instrum.forEach((inst, i) => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${i + 1}</td>
            <td>${inst.id_instrumento}</td>
            <td>${inst.nombre}</td>
            <td>${tipoRenta(inst.tipo_mercado)}</td>
        `;
        tr.onclick = () => seleccionarFila(tr, inst);
        tabla.appendChild(tr);
    });
    console.log("Cargando instrumentos");
};
cargarInstrum();

const seleccionarFila = (tr, inst) => {
    document
        .querySelectorAll('#tablaInstrumentos tr')
        .forEach((f) => f.classList.remove('table-info'));
    tr.classList.add('table-info');
    instruSelec = inst;
    console.log(instruSelec);
};

// Mostrar y construir formulario según cada botón
// El modal se reutilizará para los formularios como para las alertas
$("#header button").on('click', (ev) => {
    ev.preventDefault();
    
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
    btn.innerHTML = obj.text;

    // Enviar título a función que muestra modal
    alertModal(obj.title);
});

// Fx crear nuevo instrumento
async function nuevoIns() {
    const resp = await fetch('/api/inst', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bod)
    });
    const nuevo = await resp.json();
};

// Fx editar instrumento
async function editIns() {
    const resp = await fetch(`/api/inst/${instruSelec.id_instrumento}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bod)
    });
    const edit = await resp.json();
};

// Fx eliminar instrumento
async function elimIns() {
    const resp = await fetch(`/api/inst/${instruSelec.id_instrumento}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        },
    });
};

// Evento clic enviar formulario y solicitar API desde formulario modal
$('#new button#sendbtn').on('click',(ev) => {
    ev.preventDefault();

    const list = document.getElementById('formInstr').querySelectorAll('.form-control');
    let formValues = [];

    // Obtener lo ingresado en formulario
    list.forEach((li)=>{
        formValues.push(li.value);
    });

    bod = {id: formValues[0], nombre: formValues[1], mercado: formValues[2], usuario: user};
    if (btnoption == "addinst") {
        // Validar que código no esté vacío o contenga otros caracteres
        if (!bod.id || bod.id.search(/[\s\W]/) >= 0) {
            document.querySelector('#formInstr').setAttribute('class', 'd-none');
            document.querySelector('#sendbtn').setAttribute('class', 'd-none');
            alertModal(`Campo "Código": Ingrese un valor válido`);
            return;
        } else {
            nuevoIns()
            .then(()=>{
                cargarInstrum();
            })
            .catch(err=>{
                console.log(`Error: ${err}`)
            });
        }
    }
    if (btnoption == "modif") {
        editIns()
        .then(()=>{
            cargarInstrum();
        });
        // if (!resp.ok) {} Implementar mensaje de error
    }
    if (btnoption == "delinst") {
        elimIns()
        .then(()=>{
            cargarInstrum();
            console.log("aver2");
        });
        //const nuevo = await resp.json();
        // if (!resp.ok) {} Implementar mensaje de error

    }
    $('#new').modal('hide');
    bod = {};
});

// Función modal

function alertModal(mssg) {
    document.querySelector('#new .modal-body h4').innerHTML = "";
    $('#modal-title').append(mssg);
}