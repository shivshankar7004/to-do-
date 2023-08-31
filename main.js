const list_el = document.getElementById("list");
const create_btn_el = document.getElementById("create");

let tasks =[];

create_btn_el.addEventListener('click', CreateNewTask);

function CreateNewTask () {
    const item = {
        id: new Date().getTime(),
        text: "",
        complete: false
    }

    tasks.unshift(item);

    const { item_el , input_el} = CreateTaskElement(item);

    list_el.prepend(item_el);

    input_el.removeAttribute("disabled");
    input_el.focus();

    Save();
}

{/* <div class="item">
<input type="checkbox"/>
<input type="text" 
value="Task content goes here" 
disabled/>
<div class="actions">
    <button class="material-icons">edit</button>
    <button class="material-icons remove-btn">remove_circle</button>
</div>
</div> */}

function CreateTaskElement(item) {
    const item_el = document.createElement("div");
    item_el.classList.add("item");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.complete;

    if(item.complete) {
        item_el.classList.add("complete");
    }

    const input_el = document.createElement("input");
    input_el.type = "text";
    input_el.value = item.text;
    input_el.setAttribute("disabled", "");

    const actions_el = document.createElement("div");
    actions_el.classList.add("actions");

    const edit_btn_el = document.createElement("button");
    edit_btn_el.classList.add("material-icons");
    edit_btn_el.innerText = "edit";

    const remove_btn_el = document.createElement("button");
    remove_btn_el.classList.add("material-icons", "remove-btn");
    remove_btn_el.innerText = "remove_circle";

    actions_el.append(edit_btn_el);
    actions_el.append(remove_btn_el);

    item_el.append(checkbox);
    item_el.append(input_el);
    item_el.append(actions_el);

    // events

    checkbox.addEventListener("change", ()=> {
        item.complete = checkbox.checked;

        if(item.complete) {
            item_el.classList.add("complete");
        }
        else{
            item_el.classList.remove("complete");
        }

        Save();
    });

    input_el.addEventListener('input', () => {
        item.text = input_el.value;
    });

    input_el.addEventListener("blur", ()=> {
        input_el.setAttribute("disabled", "");
        Save();
    });

    edit_btn_el.addEventListener("click", () => {
        input_el.removeAttribute("disabled");
        input_el.focus();
    });

    remove_btn_el.addEventListener("click", () => {
        tasks = tasks.filter(t =>t.id != item.id);
        item_el.remove();

        Save();
    });

    return { item_el, input_el, edit_btn_el, remove_btn_el }


}

function DisplayTasks() {
    Load();

    for( let i=0; i<tasks.length; i++) {
        const item = tasks[i];

        const { item_el } = CreateTaskElement(item);

        list_el.append(item_el);
    }
}

DisplayTasks();

function Save() {
    const save = JSON.stringify(tasks);
    localStorage.setItem("my_tasks", save);
}

function Load() {
    const data = localStorage.getItem("my_tasks");

    if(data) {
        tasks = JSON.parse(data);

    }
}