import React from "react";
import { Circle, Image, Layer, Stage } from "react-konva";
import useImage from "use-image";
import { coord } from "../utils/calculateCoordinate";
import { ticketToRideData } from "../assets/ticket-to-ride-data";
import { useSelector } from "react-redux";
import gameMap from "../assets/ticket-to-ride-europe-map.jpg";
import cityDot from "../assets/images/cityDot.png";
import highlightedCityDot from "../assets/images/highlightedCityDot.png";

const MapImage = () => {
  const [image] = useImage(gameMap);
  return <Image image={image} width={800 / 1.15} height={533 / 1.15} />;
};

const HighlightedCityDot = ({ x, y }) => {
  const [image] = useImage(highlightedCityDot);
  return <Image image={image} width={28} height={32} x={x} y={y} />;
};

const CityDot = ({ x, y }) => {
  const [image] = useImage(cityDot);
  return <Image image={image} width={25} height={32} x={x / 1.15} y={y / 1.15} />;
};

const Map = () => {
  const ui = useSelector((state) => state.ui);

  return (
    <div className="flex flex-wrap object-center">
      <Stage
        className="ml-60"
        width={window.innerWidth}
        height={533}
        x={window.innerWidth / 2 - 400 - 240 / 1.15}
        y={0}
        onMouseOver={() => console.log("ASDAS")}
      >
        <Layer>
          <MapImage />
          {Object.keys(ticketToRideData.cities).map((number) => {
            const currentCity = ticketToRideData.cities[number];
            const { x, y } = coord(currentCity.x, currentCity.y);
            return <CityDot x={x - 15} y={y - 15} city={currentCity} />;
          })}
          {Object.keys(ticketToRideData.connections).map((number) => {
            const connection = ticketToRideData.connections[number];
            const connectionShapes = connection.elements.map((element) => {
              const { x, y } = coord(element.x, element.y);

              return (
                <Circle
                  x={x / 1.15}
                  y={y / 1.15}
                  // draggable
                  radius={5}
                  fill={connection.color}
                  onMouseEnter={() => console.log(connection)}
                />
              );
            });
            return connectionShapes;
          })}
          <HighlightedCityDot x={ui.firstX / 1.15 - 15} y={ui.firstY / 1.15 - 15} />
          <HighlightedCityDot x={ui.secondX / 1.15 - 15} y={ui.secondY / 1.15 - 15} />
        </Layer>
      </Stage>
    </div>
  );
};

export default Map;
