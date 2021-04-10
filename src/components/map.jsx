import React from "react";
import gameMap from "../assets/ticket-to-ride-europe-map.jpg";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";

const Map = () => {
  const { editor, onReady } = useFabricJSEditor();

  const onAddCircle = () => {
    editor?.addCircle();
  };
  const onAddRectangle = () => {
    editor?.addRectangle();
  };

  return (
    <div>
      <img src={gameMap} alt="Game Map" />
      <button onClick={onAddCircle}>Add circle</button>
      <button onClick={onAddRectangle}>Add Rectangle</button>
      <FabricJSCanvas className="sample-canvas" onReady={onReady} />
    </div>
  );
};

export default Map;
