/* ДЗ 6 - Асинхронность и работа с сетью */

/*
 Задание 1:

 Функция должна возвращать Promise, который должен быть разрешен через указанное количество секунду

 Пример:
   delayPromise(3) // вернет promise, который будет разрешен через 3 секунды
 */
function delayPromise(seconds) {
  return new Promise((resolve, reject) => {

    setTimeout(() => {
      resolve("OK");
    }, seconds*1000);

  });
}

/*
 Задание 2:

 2.1: Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json

 2.2: Элементы полученного массива должны быть отсортированы по имени города

 Пример:
   loadAndSortTowns().then(towns => console.log(towns)) // должна вывести в консоль отсортированный массив городов
 */
function loadAndSortTowns() {
  return new Promise((resolve, reject) => {

  let req = new XMLHttpRequest();
  var arr = [];
  req.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json', true);

  req.onload = ()=> {
    arr = JSON.parse(req.response);
    arr.sort((a, b) => a.name.localeCompare(b.name))
    resolve(arr);
   };

  req.send();
  });
}

export {
    delayPromise,
    loadAndSortTowns
};
