'use strict';

const startItemEditing = (evt) => {
  if (evt.target.classList.contains("todo__item-task") && evt.target.tagName === "SPAN") {
    evt.target.classList.add("hidden");
    addEditedInput(evt);
  }
};

const addEditedInput = (evt) => {
  evt.target.insertAdjacentHTML('beforebegin', '<input class="todo__item-task" type="text">');
  const input = evt.target.previousElementSibling;
  evt.target.classList.add("hidden");
  input.value = evt.target.textContent;
  input.focus();
  input.parentNode.classList.add('todo__item--editing');
  input.addEventListener('blur', finishItemEditing);
  input.addEventListener('keydown', finishItemEditing);
};

const removeEditedInput = (evt) => {
  evt.target.parentNode.classList.remove('todo__item--editing');
  try {
    evt.target.remove();
  } catch (error) {
    return
  }
};

const finishItemEditing = (evt) => {
  if (evt.keyCode === keyEnter || evt.type === 'blur') { 
    evt.target.removeEventListener('blur', finishItemEditing);
    evt.target.removeEventListener('keydown', finishItemEditing); 
    if (!validateInput(evt)) { 
      deleteTodoItem(evt);
    } else {
      saveChangesOfEditing(evt, correctedValue);
    }
    setLocalStorage();
  } else if (evt.keyCode === keyEsc) {
    saveChangesOfEditing(evt);
  } 
}

const saveChangesOfEditing = (evt, value) => {
  if (evt.target) {
    itemsArray.forEach((item) => {
      if (item.id == evt.target.parentNode.id) {
        item.value = value ? value : item.value;
        evt.target.value = item.value;
      }
    });
    const span = evt.target.nextElementSibling;
    span.classList.remove("hidden");
    span.textContent = evt.target.value;
    removeEditedInput(evt);
  }
}

todoList.addEventListener('dblclick', startItemEditing);
