'use strict';

const onEditingItemInputs = (evt) => {
  if (evt.target.classList.contains("todo__item-task")) {
    evt.target.insertAdjacentHTML('beforebegin', '<input class="todo__item-task" type="text">');
    const input = evt.target.previousElementSibling;
    evt.target.classList.add("hidden");
    input.value = evt.target.textContent;
    input.focus();
    input.parentNode.classList.add('todo__item--editing');
    input.addEventListener('blur', offEditingItemInputs);
    input.addEventListener('keydown', offEditingItemInputs);
  }
};

const saveChangesOfEditing = (evt, value) => {
  if (evt.target) {
    allItems.forEach((item) => {
      if (item.id == evt.target.parentNode.id) {
        item.value = value ? value : item.value;
        evt.target.value = item.value;
      }
    });
    evt.target.parentNode.classList.remove('todo__item--editing');
    const span = evt.target.nextElementSibling;
    span.classList.remove("hidden");
    span.textContent = evt.target.value;
    try {
      evt.target.remove();
    } catch (error) {
      return
    }
  }
}

const offEditingItemInputs = (evt) => {
  if ((evt.keyCode === keyEnter || evt.type === 'blur') && !(evt.keyCode === keyEsc)) { 
    evt.target.removeEventListener('blur', offEditingItemInputs);
    evt.target.removeEventListener('keydown', offEditingItemInputs); 
    if (!evt.target.value) { 
      deleteTodoItem(evt);
    } else {
      validateInput(evt);
      saveChangesOfEditing(evt, correctedValue);
    }
    onLocalStorage();
  } else if (evt.keyCode === keyEsc) {
    saveChangesOfEditing(evt);
  } 
}

todoList.addEventListener('dblclick', (evt) => {
  onEditingItemInputs(evt);
});
