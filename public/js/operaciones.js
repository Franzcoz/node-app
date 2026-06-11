import { user, rol, alertModal } from "./menu.js";

// Definir variables
let fondos = [];
let tabla = document.querySelector('#tablaOperaciones tbody');

if (rol == 'TRADER') {
    document.getElementById('usuarios_sel').parentElement.parentElement.hidden = true;
    document.getElementById('fondo').parentElement.parentElement.setAttribute("class", "col-6 col-xl-4");
    document.getElementById('tipo').parentElement.parentElement.setAttribute("class", "col-6 col-xl-4");
}


// Obtener fondos desde API y cargar en select de formualrio
async function cargarFondos() {
    const resp = await fetch("/api/fondo", {
        headers: {
            "Content-Type": "application/json",
        },
    });
    fondos = await resp.json();
    const select = document.getElementById('fondo');
    select.innerHTML = `<option value="">Todos</option>`;

    fondos.forEach((f) => {
        select.innerHTML += `<option value="${f.id_fondo}">${f.nombre}</option>`;
    });
};

cargarFondos();

async function buscarOperaciones(params) {
    const resp = await fetch(`/api/operacion?${params}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    const response = await resp.json();

    if (response.status === 'error') {
        alertModal('Error');
        $('#new').modal("toggle");
        console.log(response.status);
        return;
    }

    tabla.innerHTML = '';

    const data = response.data;

    if (data.length === 0) {
        tabla.innerHTML = `
                        <tr>
                            <td colspan="9" class="text-center text-muted">
                                No se encontraron operaciones.
                            </td>
                        </tr>
                    `;
        return;
    };

    // OK
    data.forEach((o) => {
        const [año, mes, dia] = o.fecha.split('-').map(Number);
        const fechaFormat = new Date(año, mes - 1, dia);
        const fecha = fechaFormat.toLocaleDateString('es-Cl');
        let p = {
            id_operacion: o.id_operacion,
            id_usuario: o.id_usuario,
            fondo_nombre: o.Fondo.fondo_nombre,
            tipo: o.tipo,
            fecha: fecha
        };
        o.OperacionDetalles.forEach((d) => {
            tabla.innerHTML += `
                    <tr>
                        <td>${p.id_operacion}</td>
                        <td>${p.id_usuario}</td>
                        <td>${p.fondo_nombre}</td>
                        <td>${p.tipo}</td>
                        <td>${p.fecha}</td>
                        <td>${Math.round(d.precio*d.cantidad)}</td>
                        <td>${d.id_nemotecnico || ''}</td>
                        <td>${Math.round(d.cantidad) || ''}</td>
                        <td>${Math.round(d.precio) || ''}</td>
                    </tr>
                    `;
        })
    });
};

// Evento clic buscar operaciones 
$('button#buscar').on('click',(ev) => {
    ev.preventDefault();

    const fondo = document.getElementById('fondo').value;
    const tipo = document.getElementById('tipo').value;
    const desde = document.getElementById('desde').value;
    const hasta = document.getElementById('hasta').value;

    let parametros = {
        id_fondo: fondo,
        tipo,
        fecha_desde: desde,
        fecha_hasta: hasta
    };

    if (rol != 'TRADER') {
        const id_usuario = document.getElementById('usuarios_sel').value;
        parametros = { ...parametros, id_usuario };
    } else if (rol == 'TRADER') {
        const id_usuario = user;
        parametros = { ...parametros, id_usuario };
    }

    const params = new URLSearchParams(parametros);
    
    buscarOperaciones(params);
});