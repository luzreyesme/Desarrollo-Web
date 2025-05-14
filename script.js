// Referencias del DOM
const formulario = document.getElementById("reservaForm");
const tabla = document.getElementById("tablaReservas");

let reservas = [];
let indexEdicion = null;

// Función para validar matrícula
function validarMatricula(matricula) {
    return /^[a-zA-Z0-9]{8}$/.test(matricula);
}

// Validar fecha actual o futura
function validarFecha(fecha) {
    const hoy = new Date().toISOString().split("T")[0];
    return fecha >= hoy;
}

// Función para mostrar las reservas
function mostrarReservas() {
    tabla.innerHTML = "";
    reservas.forEach((reserva, index) => {
        const fila = `
            <tr>
                <td>${reserva.nombre}</td>
                <td>${reserva.matricula}</td>
                <td>${reserva.actividad}</td>
                <td>${reserva.fecha}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editarReserva(${index})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarReserva(${index})">Eliminar</button>
                </td>
            </tr>
        `;
        tabla.innerHTML += fila;
    });
}

// Función para limpiar el formulario
function limpiarFormulario() {
    formulario.reset();
    indexEdicion = null;
    document.getElementById("btnGuardar").textContent = "Registrar";
}

// Función para editar una reserva
function editarReserva(index) {
    const reserva = reservas[index];
    document.getElementById("nombre").value = reserva.nombre;
    document.getElementById("matricula").value = reserva.matricula;
    document.getElementById("actividad").value = reserva.actividad;
    document.getElementById("fecha").value = reserva.fecha;

    indexEdicion = index;
    document.getElementById("btnGuardar").textContent = "Guardar Cambios";
}

// Función para eliminar una reserva
function eliminarReserva(index) {
    if (confirm("¿Estás segura de eliminar esta reserva?")) {
        reservas.splice(index, 1);
        mostrarReservas();
    }
}

// Manejo del envío del formulario
formulario.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const matricula = document.getElementById("matricula").value.trim();
    const actividad = document.getElementById("actividad").value;
    const fecha = document.getElementById("fecha").value;

    // Validaciones
    if (!nombre || !matricula || !actividad || !fecha) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    if (!validarMatricula(matricula)) {
        alert("El código de matrícula debe tener 8 caracteres alfanuméricos.");
        return;
    }

    if (!validarFecha(fecha)) {
        alert("La fecha debe ser hoy o una fecha futura.");
        return;
    }

    const nuevaReserva = { nombre, matricula, actividad, fecha };

    if (indexEdicion !== null) {
        reservas[indexEdicion] = nuevaReserva;
        indexEdicion = null;
        document.getElementById("btnGuardar").textContent = "Registrar";
    } else {
        reservas.push(nuevaReserva);
    }

    mostrarReservas();
    limpiarFormulario();
});
