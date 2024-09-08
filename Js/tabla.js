// JavaScript
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoLane = document.getElementById("todo-lane");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = input.value;

  if (!value) return;

  // Crear la estructura del contenedor de la tarea
  const newTask = document.createElement("div");
  newTask.classList.add("task", "border-start", "border-5", "border-dark", "mb-3");
  newTask.setAttribute("draggable", "true");

  // Crear el contenido de la tarea (parte del título y el ícono)
  const taskContent = document.createElement("div");
  taskContent.classList.add("d-flex", "align-items-center", "flex-fill");

  const taskTitleContainer = document.createElement("div");
  taskTitleContainer.classList.add("d-flex", "flex-column", "pe-3");

  const taskTitle = document.createElement("h6");
  taskTitle.classList.add("fw-bold", "mb-0", "small-14");
  taskTitle.innerText = value; // El valor ingresado por el usuario

  // Ícono
  const taskIcon = document.createElement("i");
  taskIcon.classList.add("bi", "bi-clipboard2-check");

  // Agregar el título al contenedor del título
  taskTitleContainer.appendChild(taskTitle);

  // Añadir el contenedor del título y el ícono al contenido de la tarea
  taskContent.appendChild(taskTitleContainer);
  taskContent.appendChild(taskIcon);

  // Crear el badge (parte que muestra los días restantes)
  const taskBadgeContainer = document.createElement("div");
  
  const taskBadge = document.createElement("span");
  taskBadge.classList.add("badge", "bg-info");
  taskBadge.innerText = "En 17 días"; // Aquí puedes ajustar los días dinámicamente si lo deseas

  taskBadgeContainer.appendChild(taskBadge);

  // Añadir todo al contenedor principal de la tarea
  newTask.appendChild(taskContent);
  newTask.appendChild(taskBadgeContainer);

  // Funcionalidad de arrastrar y soltar
  newTask.addEventListener("dragstart", () => {
    newTask.classList.add("is-dragging");
  });

  newTask.addEventListener("dragend", () => {
    newTask.classList.remove("is-dragging");
  });

  // Añadir la nueva tarea al contenedor de tareas
  todoLane.appendChild(newTask);

  // Limpiar el input
  input.value = "";
});
