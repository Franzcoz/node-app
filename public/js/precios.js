import { rol, alertModal } from "./menu.js";

// Definir variables
let formData = new FormData();

async function subirArchivo() {
    try {
        const resp = await fetch(`/api/precios/upload`, {
            method: 'POST',
            body: formData,
        });
        const data = await resp.json();

        document.getElementById('loading').style.display = 'none';

        if (resp.ok) {
            alertModal(`✔ ${data.message}. Registros procesados: ${data.data.registros}`);
        } else {
            alertModal(`${data.message}`);
            $('#new').modal("toggle");
            console.log(data.status);
        }
    } catch (error) {
        document.getElementById('loading').style.display = 'none';
        alertModal('Error al subir archivo');
        $('#new').modal("toggle");
        console.log(error);
    };
    document.getElementById('archivo').value = '';
    formData.delete('archivo');
};

// Evento clic subir archivo 
$('button#subir').on('click',(ev) => {
    ev.preventDefault();

    const file = document.getElementById('archivo').files[0];
    if (!file) {
        alertModal('Seleccione un archivo');
        return;
    };

    if (rol != 'TRADER') {
        formData.append('archivo', file);
        document.getElementById('loading').style.display = 'block';
        subirArchivo();
    } else {
        alertModal('No autorizado');
        return;
    }
});