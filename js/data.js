'use strict';

const mainInput = document.querySelector('.todo__input');
const todoList = document.querySelector('.todo__list');
const todoCounter = document.querySelector('.todo__counter b');
const choiceAllItems = document.querySelector('.todo__choice-all');
const labelOfChoiseAllItems = document.querySelector('.todo__choice-all + label');
const filterAll = document.querySelector('.filter-all');
const filterActive = document.querySelector('.filter-active');
const filterCompleted = document.querySelector('.filter-completed');
const footer = document.querySelector('.todo__footer');
const btnClearCompleted = footer.querySelector('.todo__clear-completed');

let itemsArray = [];
let activeItemsArray;
let completedItemsArray;
let correctedValue;
const keyEnter = 13;
const keyEsc = 27;

const addItemToArray = (valueOfInput) => {
  let itemInfo = {};
  itemInfo.checked = false;
  itemInfo.value = valueOfInput;
  itemInfo.id = itemsArray.length ? itemsArray[itemsArray.length-1].id + 1 : 1;
  itemsArray.push(itemInfo);
  mainInput.value = "";
}

const createActiveItemsArray = () => {
  return activeItemsArray = itemsArray.filter((item) => !item.checked);
};

const createCompletedItemsArray = () => {
  return completedItemsArray = itemsArray.filter((item) => item.checked);
};

