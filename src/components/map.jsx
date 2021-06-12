import React, { useEffect } from "react";
import { ticketToRideData } from "../assets/ticket-to-ride-data";
import { Image, Layer, Stage, Shape } from "react-konva";
import { useSelector, useDispatch } from "react-redux";
import { collectRoadOne, setJustBuiltOne, setLastMoveOne } from "../store/slices/playerOneSlice";
import { collectRoadTwo, setJustBuiltTwo, setLastMoveTwo } from "../store/slices/playerTwoSlice";
import { endGame, setTurnPlayer } from "../store/slices/gameSlice";
import { useHistory } from "react-router-dom";
import { coord } from "../utils/calculateCoordinate";
import useImage from "use-image";
import cityDot from "../assets/images/cityDot.png";
import gameMap from "../assets/ticket-to-ride-europe-map.jpg";
import highlightedCityDot from "../assets/images/highlightedCityDot.png";
import { syncAction } from "..";

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
  const history = useHistory();
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

  useEffect(() => {
    if (playerOne.trains <= 0 || playerTwo.trains <= 0) {
      if (playerOne.hand.length <= 2 || playerTwo.hand.length <= 2) {
        syncAction(endGame(), gameState.gameCode, false);
      }
    }
  }, [playerOne.trains, playerTwo.trains, playerOne.hand, playerTwo.hand, history]);

  const collectRoad = (road) => {
    if (gameState.turnPlayer === 1) {
      dispatch(collectRoadOne(road));
      if (!playerTwo.collectedRoads.find((currRoad) => currRoad.id === road.id))
        syncAction(collectRoadOne(road), gameState.gameCode, true);
      dispatch(setTurnPlayer(2));
      syncAction(setTurnPlayer(2), gameState.gameCode, true);
      if (playerOne.justBuilt) {
        dispatch(setJustBuiltOne(false));
        syncAction(setJustBuiltOne(false), gameState.gameCode, true);

        syncAction(setLastMoveOne(playerTwo.lastMove), gameState.gameCode, false);
      }
    } else {
      if (!playerOne.collectedRoads.find((currRoad) => currRoad.id === road.id))
        syncAction(collectRoadTwo(road), gameState.gameCode, false);

      dispatch(setTurnPlayer(1));
      syncAction(setTurnPlayer(1), gameState.gameCode, true);
      if (playerTwo.justBuilt) {
        dispatch(setJustBuiltTwo(false));
        syncAction(setJustBuiltTwo(false), gameState.gameCode, true);

        syncAction(setLastMoveOne(playerOne.lastMove), gameState.gameCode, false);
      }
    }
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
              const road = elements;

              if (index < connection.elements.length - 1) {
                const xNext = coord(elements[index + 1].x, elements[index + 1].y).x;
                const yNext = coord(elements[index + 1].x, elements[index + 1].y).y;
                return (
                  <Shape
                    opacity={
                      color === playerOne.playerColor || color === playerTwo.playerColor ? 0.45 : 0
                    }
                    sceneFunc={(context, shape) => {
                      context.beginPath();
                      context.moveTo(x, y);
                      context.lineTo(xNext, yNext);
                      context.closePath();
                      context.fillStrokeShape(shape);
                    }}
                    stroke={connection.color}
                    strokeWidth={20}
                    onClick={() =>
                      collectRoad({
                        id: connection.id,
                        color: connection.color,
                        from: connection.from,
                        to: connection.to,
                        fromCity: connection.fromCity,
                        toCity: connection.toCity,
                        road,
                      })
                    }
                  />
                );
              } else
                return (
                  <Shape
                    opacity={
                      color === playerOne.playerColor || color === playerTwo.playerColor ? 0.45 : 0
                    }
                    sceneFunc={(context, shape) => {
                      context.beginPath();
                      context.moveTo(x, y);
                      context.lineTo(coord(elements[index].x).x, coord(elements[index].y).y);
                      context.closePath();
                      context.fillStrokeShape(shape);
                    }}
                    stroke={connection.color}
                    strokeWidth={
                      color === playerOne.playerColor || color === playerTwo.playerColor ? 17 : 6
                    }
                    onClick={() =>
                      collectRoad({
                        id: connection.id,
                        color: connection.color,
                        road,
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
