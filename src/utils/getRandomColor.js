const getRandomColor = () => {
  const trainColors = [
    "red",
    "green",
    "blue",
    "purple",
    // TODO: ezek a szinek nincsenek tailwindbe
    // "black",
    // "white",
    // "orange",
    "yellow",
    "rainbow",
  ];

  return trainColors[Math.trunc(Math.random() * 6)];
};

export { getRandomColor };
