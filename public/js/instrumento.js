import { cargarMenus } from "./menu.js";

let instruSelec = "";
let btnoption = "";
const tabla = document.querySelector('#tablaInstrumentos tbody');

cargarMenus();

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
    const resp = await fetch("/api/inst");
    const instrum = await resp.json();

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
$("#header button").on('click', (ev) => {
    ev.preventDefault();
    
    // Detectar en qué botón se hizo clic 
    btnoption = ev.target.id;
    const form = document.querySelector('#formInstr');
    const formdivs = form.querySelectorAll('div');
    form.reset();
    
    // Esconder campos
    formdivs.forEach((el) => {
        el.setAttribute('class', 'd-none');
    });
    if (btnoption != "addinst" && !instruSelec) {
        alertModal('Seleccione un instrumento');
        document.querySelector('.modal-footer').setAttribute('class', 'modal-footer d-none');
        return;
    }

    // Reiniciar atributos generales de formulario
    document.querySelector('.modal-footer').setAttribute('class', 'modal-footer');
    document.querySelector('#id_ins').removeAttribute("disabled");
    document.querySelector('#nombre_ins').removeAttribute("disabled");
    document.querySelector('#tipo_mer').removeAttribute("disabled");
    
    // Mostrar campos deseados
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

// Función para manejar Instrumentos y solicitar API
$('#new button').on('click',(ev) => {
    ev.preventDefault();

    const list = document.getElementById('formInstr').querySelectorAll('.form-control');
    let formValues = [];

    // Obtener lo ingresado en formulario
    list.forEach((li)=>{
        formValues.push(li.value);
    });

    let bod = {id: formValues[0], nombre: formValues[1], mercado: formValues[2]};
    if (btnoption == "addinst") {
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
        nuevoIns();
        cargarInstrum();
        //
        // if (!resp.ok) {} Implementar mensaje de error
    }
    if (btnoption == "modif") {
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
        editIns();
        cargarInstrum();
        // if (!resp.ok) {} Implementar mensaje de error

    }
    if (btnoption == "delinst") {
        async function elimIns() {
            const resp = await fetch(`/api/inst/${instruSelec.id_instrumento}`, {
                method: 'DELETE',
            });
        };
        elimIns();
        cargarInstrum();
        console.log("aver");
        //const nuevo = await resp.json();
        // if (!resp.ok) {} Implementar mensaje de error

    }
});

// Función modal

function alertModal(mssg) {
    document.querySelector('#new .modal-body h4').innerHTML = "";
    $('#modal-title').append(mssg);
}