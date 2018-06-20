/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

function showCookies(){
  //если фильтр пуст то показываем все куки
 if(!listTable.children.length){

  if(document.cookie !==""){
    document.cookie.split("; ").forEach((cooka)=>{
      const [cookName, cookValue] = cooka.split('='), newTr = document.createElement("tr");
      newTr.setAttribute("id", "tr" + cookName);
      newTr.innerHTML = `<td>${cookName}</td><td>${cookValue}</td><td><button id = "bt${cookName}">удалить</button></td>`
      listTable.appendChild(newTr);

      const delbut = document.getElementById("bt"+cookName);
      delbut.addEventListener('click', () => {
        document.cookie = `${delbut.parentElement.previousElementSibling.previousElementSibling.textContent}='DelCookie';expires=Thu, 01 Jan 1970 00:00:01 GMT`;
        listTable.removeChild(newTr);
      });
    });
   };
  }
};

let isMatching = function (full, chunk) {
  full = full.toLowerCase();
  chunk = chunk.toLowerCase();
  return full.indexOf(chunk) !== -1;
};

filterNameInput.addEventListener('keyup', function() {
    // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
  listTable.innerHTML = "";
  const currentFilterWord = filterNameInput.value;
  
  if (currentFilterWord.length !== 0) {
    document.cookie.split("; ").forEach((cooka) => {
      const [cookName, cookValue] = cooka.split('=');
      if(isMatching(cookName, currentFilterWord)){
        const newTr = document.createElement("tr");
        newTr.setAttribute("id", "tr"+cookName);
        newTr.innerHTML = `<td>${cookName}</td><td>${cookValue}</td><td><button id = "bt${cookName}">удалить</button></td>`;
        listTable.appendChild(newTr);
      }
      else if(isMatching(cookValue, currentFilterWord)){
        const newTr = document.createElement("tr");
        newTr.setAttribute("id", "tr"+cookName);
        newTr.innerHTML = `<td>${cookName}</td><td>${cookValue}</td><td><button id = "bt${cookName}">удалить</button></td>`;
        listTable.appendChild(newTr);
      }
    });
  }
  else
  showCookies();
});

addButton.addEventListener('click', () => {
    // здесь можно обработать нажатие на кнопку "добавить cookie"
  let findCookName = false;
  if(document.cookie !==""){
   document.cookie.split("; ").forEach((cooka)=>{
    const [cookName, cookValue] = cooka.split('=');
    if(cookName == addNameInput.value)
    findCookName = true; 
    });
   };
  if(findCookName){
    
      if(filterNameInput.value === ""){
          const oldTr = document.getElementById("tr"+addNameInput.value);
          document.cookie = `${addNameInput.value}=${addValueInput.value}`;
          oldTr.firstElementChild.nextSibling.innerText = addValueInput.value;
        }
      else if(isMatching(addValueInput.value, filterNameInput.value)){
        const oldTr = document.getElementById("tr"+addNameInput.value);
        document.cookie = `${addNameInput.value}=${addValueInput.value}`;
        oldTr.firstElementChild.nextSibling.innerText = addValueInput.value;
      }
      else{
      const oldTr = document.getElementById("tr"+addNameInput.value);
      listTable.removeChild(oldTr);
      document.cookie = `${addNameInput.value}=${addValueInput.value}`;
      }
  } 
  else{ 
    if(filterNameInput.value === ""){
      const newTr = document.createElement("tr");
      newTr.setAttribute("id", "tr"+addNameInput.value);
      newTr.innerHTML = `<td>${addNameInput.value}</td><td>${addValueInput.value}</td><td><button id = "bt${addNameInput.value}">удалить</button></td>`
      listTable.appendChild(newTr);

      const delbut = document.getElementById("bt"+addNameInput.value);
      delbut.addEventListener('click', () => {
      document.cookie = `${delbut.parentElement.previousElementSibling.previousElementSibling.textContent}='DelCookie';expires=Thu, 01 Jan 1970 00:00:01 GMT`;
      listTable.removeChild(newTr);
      });
    document.cookie = `${addNameInput.value}=${addValueInput.value}`;
    }
    else if(isMatching(addNameInput.value, filterNameInput.value) || isMatching(addValueInput.value, filterNameInput.value)){
      const newTr = document.createElement("tr");
      newTr.setAttribute("id", "tr"+addNameInput.value);
      newTr.innerHTML = `<td>${addNameInput.value}</td><td>${addValueInput.value}</td><td><button id = "bt${addNameInput.value}">удалить</button></td>`
      listTable.appendChild(newTr);

      const delbut = document.getElementById("bt"+addNameInput.value);
      delbut.addEventListener('click', () => {
      document.cookie = `${delbut.parentElement.previousElementSibling.previousElementSibling.textContent}='DelCookie';expires=Thu, 01 Jan 1970 00:00:01 GMT`;
      listTable.removeChild(newTr);
      });
      document.cookie = `${addNameInput.value}=${addValueInput.value}`;
    }
    else
    document.cookie = `${addNameInput.value}=${addValueInput.value}`;
  };
  addNameInput.innerText= "";
  addValueInput.innerText = "";
});
showCookies();