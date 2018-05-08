/* ДЗ 2 - работа с массивами и объеектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
  for(let i = 0; i < array.length; i++){
    fn(array[i], i, array);
  }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
  let arr = [];
  for(let i = 0; i < array.length; i++){
   arr.push(fn(array[i], i, array));
  }
  return arr;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
  let prev = (!initial) ? array[0] : initial;
  let i = (!initial) ? 1 : 0;
  for(i; i < array.length; i++){
    prev = fn(prev, array[i], i, array);
  }
  return prev;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
  return Object.keys(obj).map(prop => prop.toUpperCase());
}

/*function upperProps(obj) {
  let upprop = [];
  for(let prop in obj){
    upprop.push(prop.toUpperCase());
  }
  return upprop;
}*/

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from = 0, to = array.length) {
  let arr = [], i, j;
  i = from < 0 ? array.length + from : from;
  j = to < 0 ? array.length + to : to;
  i = i < 0 ? 0 : i;
  j = j > array.length ? array.length : j;

  for(i; i < j; i++){
    arr.push(array[i]);
  }
  return arr;
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
  return new Proxy(obj, { 
    set(target, prop, value) {
      target[prop] = value * value;
      return true;
  }
});
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
