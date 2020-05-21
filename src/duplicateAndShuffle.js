export default function duplicateAndShuffle(cardsArray) {
  var duplicateArray = cardsArray.reduce(function (acc, obj) {
    acc.push(obj);
    acc.push({
      name: obj.name,
      id: obj.id + 0.5,
      src: obj.src,
    });

    return acc;
  }, []);

  return duplicateArray;
}
