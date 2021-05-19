import React from "react";
import { Button } from "../common/button";

const CardStack = ({ drawCard, type }) => {
  return <Button onClick={drawCard}>{type === "trains" ? "TRAIN" : "DESTI"}</Button>;
};

export default CardStack;
