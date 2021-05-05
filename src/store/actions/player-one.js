import { createAction } from "@reduxjs/toolkit";

const addCard = createAction("ADD_CARD");
const addDestination = createAction("ADD_DESTINATION");

export { addCard, addDestination };
