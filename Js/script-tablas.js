let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let selectedTaskIndex = null;
const customContextMenu = document.getElementById('customContextMenu');

// Mostrar el input al presionar el botón "Ingresar Tarea"
document.getElementById('addTaskBtn').addEventListener('click', function () {
    const nameInput = document.getElementById('nameInput');
    nameInput.style.display = 'inline-block'; // Mostrar el input
    this.style.display = 'none'; // Ocultar el botón
    nameInput.focus();
});

// Crear la tarea cuando se ingresa el nombre y se presiona "Enter"
document.getElementById('nameInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        createTask();
    }
});

// Crear la tarea al hacer clic fuera del input
document.getElementById('nameInput').addEventListener('blur', function () {
    if (this.value.trim()) { // Verificar que el input no esté vacío
        createTask();
    } else {
        this.style.display = 'none'; // Ocultar el input si está vacío
        document.getElementById('addTaskBtn').style.display = 'inline-block'; // Mostrar el botón
    }
});

function createTask() {
    const nameInput = document.getElementById('nameInput');
    const taskName = nameInput.value.trim();

    if (taskName) {
        const newTask = {
            name: taskName,
            status: 'Sin Empezar',
            priority: 'Bajo',
            deadline: '',
            daysRemaining: '',
            assignedTo: '',
            description: ''
        };

        tasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
        nameInput.value = '';
        nameInput.style.display = 'none'; // Ocultar el input después de crear la tarea
        document.getElementById('addTaskBtn').style.display = 'inline-block'; // Mostrar el botón otra vez
    } else {
        nameInput.style.display = 'none'; // Ocultar el input si no se ingresa un nombre
        document.getElementById('addTaskBtn').style.display = 'inline-block'; // Mostrar el botón otra vez
    }
}

// Función para renderizar las tareas guardadas
function renderTasks() {
    const tableBody = document.getElementById('taskTableBody');
    tableBody.innerHTML = ''; // Limpiar tabla

    tasks.forEach((task, index) => {
        const newRow = document.createElement('tr');

        newRow.innerHTML = `
            <td class="task-name">${task.name}</td>
            <td>
                <select class="form-control">
                    <option ${task.status === 'Sin Empezar' ? 'selected' : ''}>Sin Empezar</option>
                    <option ${task.status === 'Desarrollando' ? 'selected' : ''}>Desarrollando</option>
                    <option ${task.status === 'En Revisión' ? 'selected' : ''}>En Revisión</option>
                    <option ${task.status === 'Terminado' ? 'selected' : ''}>Terminado</option>
                </select>
            </td>
            <td>
                <select class="form-control">
                    <option ${task.priority === 'Bajo' ? 'selected' : ''}>Bajo</option>
                    <option ${task.priority === 'Medio' ? 'selected' : ''}>Medio</option>
                    <option ${task.priority === 'Alto' ? 'selected' : ''}>Alto</option>
                </select>
            </td>
            <td><input type="date" class="form-control fecha-limite" value="${task.deadline}"></td>
            <td><input type="number" class="form-control dias-restantes" readonly value="${task.daysRemaining}"></td>
            <td><input type="text" class="form-control" placeholder="Asignado a" value="${task.assignedTo}"></td>
            <td>
                <button class="btn btn-danger delete-btn">Eliminar</button>
            </td>
        `;

        tableBody.appendChild(newRow);

        const fechaLimiteInput = newRow.querySelector('.fecha-limite');
        fechaLimiteInput.addEventListener('change', function () {
            const diasRestantesInput = newRow.querySelector('.dias-restantes');
            const daysRemaining = calculateDaysRemaining(fechaLimiteInput.value);
            diasRestantesInput.value = daysRemaining;
            tasks[index].deadline = fechaLimiteInput.value;
            tasks[index].daysRemaining = daysRemaining;
            localStorage.setItem('tasks', JSON.stringify(tasks));
        });

        const deleteBtn = newRow.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', function () {
            tasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
        });

        // Abrir off-canvas al hacer clic en el nombre de la tarea
        const taskNameCell = newRow.querySelector('.task-name');
        taskNameCell.addEventListener('click', function () {
            openOffCanvas(index);
        });

        // Mostrar menú contextual al hacer clic derecho en cualquier celda
        newRow.addEventListener('contextmenu', function (e) {
            e.preventDefault();
            selectedTaskIndex = index;
            showContextMenu(e.clientX, e.clientY);
        });
    });
}

// Calcular días restantes
function calculateDaysRemaining(dueDate) {
    const currentDate = new Date();
    const targetDate = new Date(dueDate);
    const timeDiff = targetDate - currentDate;
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
}

// Función para abrir el off-canvas
function openOffCanvas(index) {
    const offCanvas = new bootstrap.Offcanvas(document.getElementById('descriptionOffCanvas'));
    const task = tasks[index];
    const taskDescriptionTextarea = document.getElementById('taskDescription');

    taskDescriptionTextarea.value = task.description;

    taskDescriptionTextarea.addEventListener('input', function () {
        tasks[index].description = taskDescriptionTextarea.value;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    });

    offCanvas.show();
}

// Función para mostrar el menú contextual
function showContextMenu(x, y) {
    customContextMenu.style.left = `${x}px`;
    customContextMenu.style.top = `${y}px`;
    customContextMenu.style.display = 'block';
}

// Ocultar menú contextual cuando se hace clic en otro lugar
document.addEventListener('click', function (e) {
    if (!customContextMenu.contains(e.target)) {
        customContextMenu.style.display = 'none';
    }
});

// Función para manejar la opción "Eliminar" del menú contextual
document.getElementById('contextDelete').addEventListener('click', function () {
    if (selectedTaskIndex !== null) {
        tasks.splice(selectedTaskIndex, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
        selectedTaskIndex = null;
    }
});

// Función para manejar la opción "Descripción" del menú contextual
document.getElementById('contextDescription').addEventListener('click', function () {
    if (selectedTaskIndex !== null) {
        openOffCanvas(selectedTaskIndex);
    }
});

// Renderizar tareas guardadas al cargar la página
window.onload = renderTasks;


