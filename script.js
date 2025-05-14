let reservas = [];
let indexEditar = -1; // Variable para saber si se está editando una reserva

// Obtener referencias del formulario y elementos HTML
const form = document.getElementById('reservaForm');
const tabla = document.getElementById('tablaReservas');
const btnGuardar = document.getElementById('btnGuardar');

// Evento que se activa cuando el formulario se envía
form.addEventListener('submit', function (e) {
    e.preventDefault(); // Evita que la página se recargue

    // Obtener los valores ingresados en los campos
    const nombre = document.getElementById('nombre').value.trim();
    const matricula = document.getElementById('matricula').value.trim();
    const actividad = document.getElementById('actividad').value;
    const fecha = document.getElementById('fecha').value;

    // Validación: todos los campos deben estar llenos
    if (!nombre || !matricula || !actividad || !fecha) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    // Validación: la matrícula debe tener 8 caracteres alfanuméricos
    if (!/^[a-zA-Z0-9]{8}$/.test(matricula)) {
        alert('El código de matrícula debe tener 8 caracteres alfanuméricos.');
        return;
    }

    // Validación: la fecha debe ser actual o futura
    const hoy = new Date().toISOString().split('T')[0];
    if (fecha < hoy) {
        alert('La fecha debe ser actual o futura.');
        return;
    }

    // Crear un objeto con los datos de la reserva
    const nuevaReserva = { nombre, matricula, actividad, fecha };

    // Si no se está editando, agregamos una nueva reserva
    if (indexEditar === -1) {
        reservas.push(nuevaReserva);
    } else {
        // Si se está editando, actualizamos la reserva en esa posición
        reservas[indexEditar] = nuevaReserva;
        indexEditar = -1;
        btnGuardar.textContent = 'Registrar'; // Cambiamos el texto del botón
    }

    form.reset(); // Limpiamos el formulario
    mostrarReservas(); // Actualizamos la tabla
});

// Función para mostrar todas las reservas en la tabla
function mostrarReservas() {
    tabla.innerHTML = ''; // Limpiamos la tabla primero

    reservas.forEach((reserva, index) => {
        const fila = document.createElement('tr'); // Creamos una fila nueva

        // Agregamos los datos de la reserva en celdas
        fila.innerHTML = `
            <td>${reserva.nombre}</td>
            <td>${reserva.matricula}</td>
            <td>${reserva.actividad}</td>
            <td>${reserva.fecha}</td>
            <td>
                <button class="btn btn-warning btn-sm me-2" onclick="editarReserva(${index})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="eliminarReserva(${index})">Eliminar</button>
            </td>
        `;

        tabla.appendChild(fila); // Agregamos la fila a la tabla
    });
}

// Función para cargar los datos de una reserva en el formulario para editar
function editarReserva(index) {
    const reserva = reservas[index];
    document.getElementById('nombre').value = reserva.nombre;
    document.getElementById('matricula').value = reserva.matricula;
    document.getElementById('actividad').value = reserva.actividad;
    document.getElementById('fecha').value = reserva.fecha;

    indexEditar = index; // Guardamos el índice para saber qué registro se está editando
    btnGuardar.textContent = 'Guardar Cambios';
}

// Función para eliminar una reserva del arreglo
function eliminarReserva(index) {
    if (confirm('¿Estás segura de que deseas eliminar esta reserva?')) {
        reservas.splice(index, 1); // Eliminamos la reserva usando su índice
        mostrarReservas(); // Actualizamos la tabla
    }
}
