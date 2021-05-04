import React, { useEffect, useRef } from "react";
import gameMap from "../assets/ticket-to-ride-europe-map.jpg";
import { Circle, Image, Layer, Stage } from "react-konva";
import useImage from "use-image";
// import Konva from "konva";
import { coord } from "../utils/calculateCoordinate";
import { ticketToRideData } from "../assets/ticket-to-ride-data";

const MapImage = () => {
  const [image] = useImage(gameMap);
  return <Image image={image} width={800} height={533} />;
};

const Map = ({ destinations }) => {
  return (
    <div className="w-full flex flex-wrap object-center">
      <Stage width={window.innerWidth} height={533} x={window.innerWidth / 2 - 400}>
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

              return <Circle x={x} y={y} draggable radius={5} fill={connection.color} />;
            });
            return connectionShapes;
          })}
          {/* {destinations?.map((destination) => {
          let connectionShapes;
          Object.keys(ticketToRideData.connections).forEach((number) => {
            const connection = ticketToRideData.connections[number];
            console.log(
              connection.to === destination.from &&
                connection.from === destination.to
            );
            if (
              connection.from === destination.from &&
              connection.to === destination.to
            ) {
              console.log("ARIM");
              connectionShapes = connection.elements.map((element) => {
                const { x, y } = coord(element.x, element.y);

                return (
                  <Circle x={x} y={y} draggable radius={5} fill={"orange"} />
                );
              });
            }
          });
          console.log(connectionShapes);
          return connectionShapes;
        })} */}
        </Layer>
      </Stage>
    </div>
  );
};

export default Map;
