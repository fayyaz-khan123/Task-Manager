const addPage = document.querySelector(".add");
const tasks = document.querySelector(".tasks");
const clearAll = document.querySelector(".clear");
const messageSpan = document.querySelector(".message span");
const searchTag = document.querySelector(".search");


function updateMessage(){
    const textLength = tasks.children.length;
    messageSpan.textContent = `you have ${textLength} panding tasks.`;
}
updateMessage();

addPage.addEventListener("submit", event => {
    event.preventDefault();
    const value = addPage.task.value.trim()

    if(value.length){
        tasks.innerHTML += `<li>
                                <span>${value}</span>
                                <i class="bi bi-trash3-fill delete"></i>
                            </li>`;

         addPage.reset();
         updateMessage();
    }
});

tasks.addEventListener("click", event => {
    if(event.target.classList.contains("delete")){
        event.target.parentElement.remove();
        updateMessage();
    }
});

clearAll.addEventListener("click", event => {
    const taskItems = document.querySelectorAll("li");

    taskItems.forEach(items => {
        items.remove();
    })
    updateMessage();
})

function filterTask(term){
    Array.from(tasks.children)
    .filter(task => {
        return !task.textContent.toLowerCase().includes(term);
    })
    .forEach(task => {
        task.classList.add("hide");
    });

    Array.from(tasks.children)
    .filter(task => {
        return task.textContent.toLowerCase().includes(term);
    })
    .forEach(task => {
        task.classList.remove("hide");
    });

}

searchTag.addEventListener("keyup", event => {
    const term = searchTag.task.value.trim().toLowerCase();
    filterTask(term);
});

searchTag.addEventListener("click", event => {
    if(event.target.classList.contains("reset")){
        searchTag.reset();
        const term = searchTag.task.value.trim();
        filterTask(term);
    }
})