'use strict';

const onEditingItemInputs = (evt) => {
  const target = evt.target;
  const length = target.value.length;
  if (target.classList.contains("todo__item-task")) {
    target.removeAttribute('disabled');
    document.getSelection().empty();
    target.focus();
    target.setSelectionRange(length, length);
    target.parentNode.classList.add('todo__item--editing');
  }
};

const saveChangesOfEditing = (evt, value) => {
  allItems.forEach((item) => {
    if (item.id == evt.target.parentNode.id) {
      item.value = value ? value : item.value;
      evt.target.value = item.value;
    }
  });
  evt.target.parentNode.classList.remove('todo__item--editing');
  evt.target.setAttribute('disabled', 'disabled');
}

const offEditingItemInputs = (evt) => {
  if (evt.keyCode === keyEnter || evt.type === 'blur') { 
    evt.target.removeEventListener('blur', offEditingItemInputs);
    evt.target.removeEventListener('keydown', offEditingItemInputs); 
    if (!evt.target.value) { 
      deleteTodoItem(evt);
    } else {
      validateInput(evt);
      saveChangesOfEditing(evt, correctedValue);
    }
    onLocalStorage();
  } else if (evt.keyCode === keyEsc ) {
    saveChangesOfEditing(evt);
  }
}

todoList.addEventListener('dblclick', (evt) => {
  onEditingItemInputs(evt);
  evt.target.addEventListener('blur', offEditingItemInputs);
  evt.target.addEventListener('keydown', offEditingItemInputs);
});
