export const shuffle = (a) => {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
};

function duplicate(cardsArray) {
  var duplicateArray = cardsArray.reduce(function (acc, obj) {
    acc.push(obj);
    acc.push({
      name: obj.name,
      id: obj.id + 0.5,
      src: obj.src,
    });

    return acc;
  }, []);

  // return shuffle(duplicateArray);
  return duplicateArray;
}

export default duplicate;
