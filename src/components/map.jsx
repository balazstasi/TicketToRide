import React, { useEffect, useRef } from "react";
import gameMap from "../assets/ticket-to-ride-europe-map.jpg";
import { Circle, Image, Layer, Stage } from "react-konva";
import useImage from "use-image";
// import Konva from "konva";
import { coord } from "../utils/calculateCoordinate";
import { ticketToRideData } from "../assets/ticket-to-ride-data";

const MapImage = () => {
  const [image] = useImage(gameMap);
  return <Image image={image} />;
};

const Map = (props) => {
  return (
    <Stage width={800} height={533}>
      <Layer>
        <MapImage />
        {Object.keys(ticketToRideData.cities).map((number) => {
          const currentCity = ticketToRideData.cities[number];
          const { x, y } = coord(currentCity.x, currentCity.y);
          return <Circle x={x} y={y} draggable radius={10} fill="blue" />;
        })}
        {Object.keys(ticketToRideData.connections).map((number) => {
          const connection = ticketToRideData.connections[number];
          const connectionShapes = connection.elements.map((element) => {
            const { x, y } = coord(element.x, element.y);

            return (
              <Circle
                x={x}
                y={y}
                draggable
                radius={5}
                fill={connection.color}
              />
            );
          });
          console.log(connectionShapes);
          return connectionShapes;
        })}
      </Layer>
    </Stage>
  );
};

export default Map;
