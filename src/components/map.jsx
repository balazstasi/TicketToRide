import React from "react";
import { coord } from "../utils/calculateCoordinate";
import { Image, Layer, Stage, Shape } from "react-konva";
import { useSelector, useDispatch } from "react-redux";
import { ticketToRideData } from "../assets/ticket-to-ride-data";
import { collectRoadOne, collect } from "../store/slices/playerOneSlice";
import { collectRoadTwo } from "../store/slices/playerTwoSlice";
import highlightedCityDot from "../assets/images/highlightedCityDot.png";
import gameMap from "../assets/ticket-to-ride-europe-map.jpg";
import cityDot from "../assets/images/cityDot.png";
import useImage from "use-image";

const MapImage = () => {
  const [image] = useImage(gameMap);
  return <Image image={image} width={800 / 1.05} height={533 / 1.05} />;
};

const HighlightedCityDot = ({ x, y }) => {
  const [image] = useImage(highlightedCityDot);
  return <Image image={image} width={32} height={32} x={x - 32 / 2} y={y - 32 / 2} />;
};

const CityDot = ({ x, y }) => {
  const [image] = useImage(cityDot);
  return <Image image={image} width={25} height={25} x={x - 25 / 2} y={y - 25 / 2} />;
};

const Map = () => {
  const dispatch = useDispatch();
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

  const collectRoad = (road) => {
    if (gameState.turnPlayer === 1) dispatch(collectRoadOne(road));
    else dispatch(collectRoadTwo(road));
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
            return <CityDot x={x} y={y} city={currentCity} />;
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
                      color === playerOne.playerColor || color === playerTwo.playerColor
                        ? 0.9
                        : 0.01
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
                    // onClick={() =>
                    //   collectRoad({
                    //     id: connection.id,
                    //     road: roadToDispatch,
                    //     color: connection.color,
                    //   })
                    // }
                    onClick={() =>
                      collectRoad({
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
                      collectRoad({
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
          <HighlightedCityDot x={ui.firstX} y={ui.firstY} />
          <HighlightedCityDot x={ui.secondX} y={ui.secondY} />
        </Layer>
      </Stage>
    </div>
  );
};

export default Map;
