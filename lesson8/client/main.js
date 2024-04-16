const addToDoForm = document.getElementById("addToDoForm");
const toDoInput = document.getElementById("toDoInput");
const toDoList = document.getElementById("toDoList");
const noToDo = document.getElementById("noToDo");

let isEdit = false;

fetch("http://localhost:3500/todos", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const todos = data?.todos;

    if (todos) {
      todos
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .forEach((todo) => {
          addToDo(todo);
        });
    } else {
      noToDo.style.display = "block";
    }
  });

const editToDo = (id) => {
  const toDo = toDoList.querySelector(`[todo-id="${id}"]`);

  if (toDo) {
    const text = toDo.querySelector(`[name="text"]`).innerText;
    const date = toDo.querySelector(`[name="date"]`).innerText;
    toDoInput.value = text;

    const data = {
      id,
      text: toDoInput.value,
      date,
    };
    isEdit = true;
    fetch(`http://localhost:3500/todos`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todo: data }),
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        if (res.success) {
          addToDo(data);
          toDoList.removeChild(toDo);
        }
      });
  }
};

const deleteToDo = (id) => {
  const toDo = toDoList.querySelector(`[todo-id="${id}"]`);

  if (toDo) {
    fetch(`http://localhost:3500/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toDoList.removeChild(toDo);
        }
      });
  }
};

const addToDo = (todo) => {
  const listItem = `
  <li
  class="mt-5 text-gray-600 flex justify-between items-center border border-gray-200 rounded-lg p-5"
  todo-id="${todo.id}"
>
  <span>
    <p class="text-sm whitespace-pre">
      <p name="text">${todo.text}</p>
      <em name="date" class="text-sm text-gray-400 ml-2 font-normal"
        >${todo.date}</em
      >
    </p>
  </span>
  <span class="flex flex-col gap-1">
    <i
      type="button"
      class="fa-solid fa-pen text-center text-blue-500 inline block text-black text-[16px] hover:bg-gray-100 rounded-full p-2"
      onclick="editToDo('${todo.id}')"
    ></i>
    <i
      type="button"
      class="fa-solid fa-trash text-center text-red-500 inline block text-black text-[16px] hover:bg-gray-100 rounded-full p-2"
      onclick="deleteToDo('${todo.id}')"
    ></i>
  </span>
</li>`;
  noToDo.style.display = "none";
  toDoList.innerHTML += listItem;
};

addToDoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const toDo = toDoInput.value;
  if (toDo) {
    if (isEdit) {
    } else {
      data = {
        id: generateUID(),
        text: toDo,
        date: new Date().toLocaleString(),
      };
      fetch("http://localhost:3500/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ todo: data }),
      })
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          if (res.success) {
            addToDo(data);

            data = {};
            toDoInput.value = "";
          }
        });
    }
  }
});
