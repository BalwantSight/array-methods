// Definir las tareas iniciales
let tasks = [
  { id: 1, name: "Aprender Condiciones en JS", completed: true },
  { id: 2, name: "Aprender Funciones en JS", completed: true },
  { id: 3, name: "Aprender Arreglos en JS", completed: true },
  { id: 4, name: "Aprender Métodos en JS", completed: false },
];

// Obtener referencias a elementos del DOM
const inputAdd = document.querySelector("#inputAdd");
const btnAdd = document.querySelector("#btnAdd");
const count = document.querySelector("#count");
const done = document.querySelector("#done");
const taskList = document.querySelector(".taskList");
const refreshIcon = document.querySelector("#refresh");

// Función para agregar una nueva tarea
let taskAdd = () => {
  let taskName = inputAdd.value;
  if (!taskName) {
    alert("¡Añade una tarea!");
    return false;
  }

  let lastTask = tasks[tasks.length - 1];
  let newTask = {
    id: lastTask ? lastTask.id + 1 : 1,
    name: taskName,
    completed: false,
  };

  tasks.push(newTask);
  inputAdd.value = "";
  renderTasks();
};

// Evento clic para agregar tarea
btnAdd.addEventListener("click", taskAdd);

// Función para cambiar el estado de la tarea (completada/no completada)
const changeStatus = (id) => {
  let taskIndex = tasks.findIndex((task) => task.id === id);
  tasks[taskIndex].completed = !tasks[taskIndex].completed;
  renderTasks();
};

// Función para eliminar una tarea
const deleteTask = (id) => {
  let taskIndex = tasks.findIndex((task) => task.id === id);
  tasks.splice(taskIndex, 1);

  // Actualizar los índices de las tareas restantes
  tasks.forEach((task, index) => {
    task.id = index + 1;
  });

  renderTasks();
};

// Función para renderizar las tareas en el DOM
let renderTasks = () => {
  let html = "";
  let doneCount = [];

  tasks.forEach((task) => {
    const completedClass = task.completed ? "completed" : "";

    html += `
      <article class="check">
        <p class="checkId"><b>${task.id}</b></p>
        <p class="${completedClass}" onclick="changeStatus(${
      task.id
    })" style="cursor: pointer; text-decoration: ${
      task.completed ? "line-through" : "none"
    };"><b>${task.name}</b></p>
        <i class="fa-solid fa-delete-left fa-2xl" onclick="deleteTask(${
          task.id
        })"></i>
      </article>
    `;

    if (task.completed) {
      doneCount.push(task);
    }
  });

  taskList.innerHTML = html;
  count.innerHTML = tasks.length;
  done.innerHTML = doneCount.length;
};

// Inicializar la lista de tareas al cargar la página
renderTasks();

// Función para recargar la página (limpiar tareas)
let refresh = () => {
  location.reload(true);
};

// Evento clic para recargar la página
refreshIcon.addEventListener("click", refresh);
