const getNumColors = (n, color) => {
  let result = [];
  for (let i = 0; i < n; i++) {
    result = [...result, color];
  }

  return color;
};

export { getNumColors };
