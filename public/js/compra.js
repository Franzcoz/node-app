import { user, rol, alertModal } from "./menu.js";

// Definir variables
let fondos = [];
let tabla = document.querySelector('#tablaOperaciones tbody');
let detalles = [];


// Obtener fondos desde API y cargar en select de formualrio
async function cargarFondos() {
    const resp = await fetch("/api/fondo", {
        headers: {
            "Content-Type": "application/json",
        }
    });
    fondos = await resp.json();
    const select = document.getElementById('fondo');
    select.innerHTML = `<option value="">Seleccionar Fondo</option>`;

    fondos.forEach((f) => {
        select.innerHTML += `<option value="${f.id_fondo}">${f.nombre}</option>`;
    });
};

cargarFondos();

// Validar si Nemotécnico ingresado se encuentra registrado o no
async function validarNemo(nemo) {
    if (!nemo) return;
    const res = await fetch(`/api/nemotecnico/${nemo}`, {
        headers: {
            "Content-Type": "application/json",
        }
    });
    if (!res.ok) {
        alertModal('Nemotécnico no existe');
        document.getElementById('nemotec').value = '';
        document.getElementById('nemotec').focus();
    }
};

// Función para actualizar tabla según detalle registrado
async function modifTabla() {
    tabla.innerHTML = '';

    let total = 0;

    detalles.forEach((d, index) => {
        total += d.precio*d.cantidad;
        
        tabla.innerHTML += `
        <tr>
            <td>${d.id_nemotecnico}</td>
            <td>${Math.round(d.cantidad)}</td>
            <td>${Math.round(d.precio)}</td>
            <td>${(d.precio*d.cantidad).toFixed(2)}</td>
            <td>
                <button id="elim-${index}" class="btn btn-bad btn-sm rounded-5">X</button>
            </td>
        </tr>
        `;
    });

    // Añadir evento click a cada botón de eliminar
    document.querySelectorAll('[id^=elim-]').forEach((b) => {
        b.addEventListener('click', (ev) => {
            console.log(ev.target.id.split('-')[1]);
            const numer = ev.target.id.split('-')[1];
            elim(numer);
        });
    });

    // Mostrar el monto total de la compra bajo la tabla
    document.getElementById('total').innerText = total.toFixed(2);
};

async function crearCompra() {
    const fondo = document.getElementById('fondo').value;
    const fecha = document.getElementById('fecha').value;

    if (!fondo) {
        alertModal('Seleccione fondo');
        return;
    }
    if (!fecha) {
        alertModal('Seleccione fecha');
        return;
    }
    if (detalles.length === 0) {
        alertModal('Debe ingresar al menos un detalle');
        return;
    }

    const bod = { id_fondo: fondo, fecha, detalles, id_usuario: user };

    try {
        const resp = await fetch(`/api/operacion/compra`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bod)
        });
        const response = await resp.json();

        alertModal('Compra guardada ID: ' + response.data.id_operacion);

        detalles = [];
        tabla.innerHTML = '';
    } catch (err) {
        alertModal('Error al guardar compra');
        return;
    }
};

// Eliminar detalle de arreglo detalles y actualizar tabla
function elim(num) {
    detalles.splice(num, 1);
    modifTabla();
};


// EVENTOS
// Click en botón añadir detalle
$('button#add').on('click',(ev) => {
    ev.preventDefault();

    const nemo = document.getElementById('nemotec').value;
    const cantidad = document.getElementById('cantidad').value;
    const precio = document.getElementById('precio').value;
    
    if (!nemo || !cantidad || !precio) {
        alertModal('Ingresar Nemotécnico, Cantidad y Precio');
        return;
    } else if (cantidad <= 0 || precio <= 0 ) {
        alertModal('Precio o Cantidad inválidos');
    } else {
        const existe = detalles.find((d) => d.id_nemotecnico === nemo);
        if (existe) {
            alertModal('Ese nemotécnico ya fue agregado');
            return;
        };
        // Se actualiza arreglo detalles con el nuevo detalle
        detalles.push({ id_nemotecnico: nemo, cantidad: cantidad, precio: precio });

        modifTabla();

        document.getElementById('nemotec').value = '';
        document.getElementById('cantidad').value = '';
        document.getElementById('precio').value = '';
        document.getElementById('comprar').hidden = false;
    };
});

// Llamar a fx validarNemo cuando campo nemotécnico pierda el foco
$('#nemotec').on('blur',(ev) => {
    ev.preventDefault();
    const nemo = ev.target.value.trim();
    validarNemo(nemo);
});

// Evento clic enviar formulario y solicitar API desde formulario modal
$('button#comprar').on('click',(ev) => {
    ev.preventDefault();
    crearCompra();
});