import React from "react";
import { Button } from "../common/button";

const CardStack = ({ drawCard, type }) => {
  return (
    <Button onClick={drawCard}>
      {type === "trains" ? "Draw Train Card" : "Draw Destination"}
    </Button>
  );
};

export default CardStack;
