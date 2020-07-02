'use strict';

const createTodoItem = (itemInfo) => {
  const Template = document.querySelector('template');
  const todoElement = Template.content.querySelector('.todo__item').cloneNode(true);
  todoElement.querySelector('.todo__item-task').value = itemInfo.value;
  todoElement.querySelector('.todo__item-choice').checked =  itemInfo.checked;
  const newClass = itemInfo.classOfItem ? itemInfo.classOfItem : "";
  todoElement.classList += ` ${newClass}`;
  todoElement.id = itemInfo.id;
  return todoElement;
}
  
const renderTodoItems = (array) => {
  todoList.innerHTML = "";
  const fragment = document.createDocumentFragment();
  if (filterAll.checked) {
    array = allItems;
  } else if (filterActive.checked) {
    array = activeItems;
  } else if (filterCompleted.checked) {
    array = completedItems;
  }

  for (let i = 0; i < array.length; i++) {
    fragment.appendChild(createTodoItem(array[i]));
  }

  todoList.appendChild(fragment);
};

const visibilityFooter = () => {
  if (footer.classList.contains('hidden')) {
    footer.classList.remove('hidden');
  }
  if (allItems.length === 0) {
    footer.classList.add('hidden');
  }
}

const mainInputHandler = (evt) => {
  if ((evt.keyCode === keyEnter || evt.type === 'blur') && mainInput.value) {
    createAllItems();
    createActiveItems();
    createCompletedItems();
    renderTodoItems();
    count();
    checkChoiseAllItems();
    visibilityChoiseAllItems();
    visibilityFooter();
    onLocalStorage();
  }
};

mainInput.addEventListener('keydown', mainInputHandler);
mainInput.addEventListener('blur', mainInputHandler);