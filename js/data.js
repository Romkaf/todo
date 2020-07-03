'use strict';

const mainInput = document.querySelector('.todo__input');
const todoList = document.querySelector('.todo__list');
const todoCounter = document.querySelector('.todo__counter b');
const choiseAllItems = document.querySelector('.todo__choice-all');
const labelOfChoiseAllItems = document.querySelector('.todo__choice-all + label');
const filterAll = document.querySelector('.filter-all');
const filterActive = document.querySelector('.filter-active');
const filterCompleted = document.querySelector('.filter-completed');
const footer = document.querySelector('.todo__footer');
const btnClearCompleted = footer.querySelector('.todo__clear-completed');

let allItems = [];
let activeItems;
let completedItems;
let counter;
let correctedValue;
const keyEnter = 13;
const keyEsc = 27;

const createAllItems = (valueOfInput) => {
  let itemInfo = {};
  itemInfo.checked = false;
  itemInfo.value = valueOfInput;
  itemInfo.id = allItems.length ? allItems[allItems.length-1].id + 1 : 1;
  itemInfo.classOfItem ="";
  allItems.push(itemInfo);
  mainInput.value = "";
}

const createActiveItems = () => {
  return activeItems = allItems.filter((item) => !item.checked);
};

const createCompletedItems = () => {
  return completedItems = allItems.filter((item) => item.checked);
};

