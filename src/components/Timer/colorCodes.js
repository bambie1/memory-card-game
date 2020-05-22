const colorCodes = (fraction) => {
  var color = "green";
  if (fraction <= 0.5) {
    color = "orange";
    if (fraction <= 0.25) color = "red";
  }
  return color;
};

// const remainingPathColor = COLOR_CODES.info.color;

export default colorCodes;
