'use strict';

const createTodoItem = (itemInfo) => {
  const Template = document.querySelector('template');
  const todoElement = Template.content.querySelector('.todo__item').cloneNode(true);
  todoElement.querySelector('.todo__item-task').textContent = itemInfo.value;
  todoElement.querySelector('.todo__item-choice').checked =  itemInfo.checked;
  const newClass = itemInfo.checked ? "todo__item--completed" : "";
  todoElement.classList += ` ${newClass}`;
  todoElement.id = itemInfo.id;
  return todoElement;
}
  
const renderTodoItems = () => {
  todoList.innerHTML = "";
  const fragment = document.createDocumentFragment();
  let array;
  if (filterAll.checked) {
    array = itemsArray;
  } else if (filterActive.checked) {
    array = activeItemsArray;
  } else if (filterCompleted.checked) {
    array = completedItemsArray;
  }

  for (let i = 0; i < array.length; i++) {
    fragment.appendChild(createTodoItem(array[i]));
  }

  todoList.appendChild(fragment);
};

const setFooterVisibility = () => {
  if (footer.classList.contains('hidden')) {
    footer.classList.remove('hidden');
  }
  if (itemsArray.length === 0) {
    footer.classList.add('hidden');
  }
}

const validateInput = (evt) => {
  return correctedValue = (evt.target.value.trim()).replace(/\s+/g, " ");
};

const mainInputHandler = (evt) => {
  if ((evt.keyCode === keyEnter || evt.type === 'blur') && mainInput.value) {

    if (validateInput(evt)) {
      addItemToArray(correctedValue);
      createActiveItemsArray();
      createCompletedItemsArray();
      renderTodoItems();
      countActiveItems();
      setChoiseAllItemsOpacity();
      setChoiseAllItemsVisibility();
      setFooterVisibility();
      setLocalStorage();
    } else {
      mainInput.value = "";
    }
  }
};

mainInput.addEventListener('keydown', mainInputHandler);
mainInput.addEventListener('blur', mainInputHandler);