import React from "react";
import { Image, Layer, Stage, Shape } from "react-konva";
import { useSelector, useDispatch } from "react-redux";
import { ticketToRideData } from "../assets/ticket-to-ride-data";
import { collectRoadOne } from "../store/slices/playerOneSlice";
import { collectRoadTwo } from "../store/slices/playerTwoSlice";
import { coord } from "../utils/calculateCoordinate";
import highlightedCityDot from "../assets/images/highlightedCityDot.png";
import useImage from "use-image";
import gameMap from "../assets/ticket-to-ride-europe-map.jpg";
import cityDot from "../assets/images/cityDot.png";

const MapImage = () => {
  const [image] = useImage(gameMap);
  return <Image image={image} width={800 / 1.05} height={533 / 1.05} />;
};

const HighlightedCityDot = ({ x, y }) => {
  const [image] = useImage(highlightedCityDot);
  return <Image image={image} width={28} height={32} x={x} y={y} />;
};

const CityDot = ({ x, y }) => {
  const [image] = useImage(cityDot);
  return <Image image={image} width={25} height={32} x={x} y={y} />;
};

const Map = () => {
  const d = useDispatch();
  const ui = useSelector((state) => state.ui);
  const gameState = useSelector((state) => state.game);
  const playerOne = useSelector((state) => state.playerOne);
  const playerTwo = useSelector((state) => state.playerTwo);

  const getColor = ({ _, id }) => {
    if (playerOne.collectedRoads.find((road) => road.id === id)) {
      return playerOne.playerColor;
    }

    if (playerTwo.collectedRoads.find((road) => road.id === id)) {
      return playerTwo.playerColor;
    }

    return null;
  };

  const collect = (road) => {
    gameState.turnPlayer === 1 && d(collectRoadOne(road));
    gameState.turnPlayer === 2 && d(collectRoadTwo(road));
  };

  return (
    <div className="flex flex-wrap object-center">
      <Stage
        className="ml-60"
        width={window.innerWidth}
        height={533}
        x={window.innerWidth / 2 - 400 - 240 / 1.05}
        y={0}
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
            const connectionShapes = connection.elements.map((element, index) => {
              const { x, y } = coord(element.x, element.y);
              const elements = connection.elements;
              const color = getColor({ road: elements, id: connection.id }) ?? connection.color;
              const roadToDispatch = elements;
              if (index < connection.elements.length - 1) {
                const xNext = coord(elements[index + 1].x, elements[index + 1].y).x;
                const yNext = coord(elements[index + 1].x, elements[index + 1].y).y;
                return (
                  <Shape
                    opacity={
                      color === playerOne.playerColor || color === playerTwo.playerColor ? 0.9 : 0
                    }
                    sceneFunc={(context, shape) => {
                      context.beginPath();
                      context.moveTo(x, y);
                      context.lineTo(xNext, yNext);
                      context.closePath();
                      // (!) Konva specific method, it is very important
                      context.fillStrokeShape(shape);
                    }}
                    stroke={color}
                    strokeWidth={
                      color === playerOne.playerColor || color === playerTwo.playerColor ? 8 : 6
                    }
                    onClick={() =>
                      collect({
                        id: connection.id,
                        road: roadToDispatch,
                        color: connection.color,
                      })
                    }
                  />
                );
              } else
                return (
                  <Shape
                    opacity={0.25}
                    sceneFunc={(context, shape) => {
                      context.beginPath();
                      context.moveTo(x, y);
                      context.lineTo(coord(elements[index].x).x, coord(elements[index].y).y);
                      context.closePath();
                      // (!) Konva specific method, it is very important
                      context.fillStrokeShape(shape);
                    }}
                    stroke={color}
                    strokeWidth={
                      color === playerOne.playerColor || color === playerTwo.playerColor ? 12 : 6
                    }
                    onClick={() =>
                      collect({
                        id: connection.id,
                        road: roadToDispatch,
                        color: connection.color,
                      })
                    }
                  />
                );
            });
            return connectionShapes;
          })}
          <HighlightedCityDot x={ui.firstX / 1.05 - 15} y={ui.firstY / 1.05 - 15} />
          <HighlightedCityDot x={ui.secondX / 1.05 - 15} y={ui.secondY / 1.05 - 15} />
        </Layer>
      </Stage>
    </div>
  );
};

export default Map;
