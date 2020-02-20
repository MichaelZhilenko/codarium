document.querySelectorAll(".my-button").forEach(function(item, i, arr) { item.onclick = finishTask; });

function addNewTask() {
    let text = document.getElementById('my-input').value;
    let task = document.createElement("li");
    task.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center", "my-button");
    task.innerHTML = `<span>${text}</span>`;
    let myButton = document.createElement("span");
    myButton.classList.add("badge", "badge-primary", "badge-pill", "my-button");
    myButton.innerText = 'x';
    myButton.onclick = finishTask;
    task.append(myButton);
    document.getElementById('my-list').append(task);
}

function finishTask() {
    this.previousElementSibling.classList.add("line-through");
}