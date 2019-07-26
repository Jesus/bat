import { createStore } from "redux";

// Origin is top-left
const BOARD_SIZE_X = 25;
const BOARD_SIZE_Y = 25;

function snakeWalk(snake) {
  switch (snake.direction) {
    case 'up':
      snake.head.y -= 1;
      break;
    case 'right':
      snake.head.x += 1;
      break;
    case 'down':
      snake.head.y += 1;
      break;
    case 'left':
      snake.head.x -= 1;
      break;
    default:
      throw new Error(`Unknown direction: '${snake.direction}'`);
  }

  if (snake.head.x >= BOARD_SIZE_X) {
    snake.head.x -= BOARD_SIZE_X;
  } else if (snake.head.x < 0) {
    snake.head.x += BOARD_SIZE_X;
  }

  if (snake.head.y >= BOARD_SIZE_Y) {
    snake.head.y -= BOARD_SIZE_Y;
  } else if (snake.head.y < 0) {
    snake.head.y += BOARD_SIZE_Y;
  }
}

function snakeTick(snake) {
  // Make the tail follow the head
  snake.tail.push({ x: snake.head.x, y: snake.head.y, });

  // Move the head forward
  snakeWalk(snake);

  // Shrink the tail if it has grown too long
  if (snake.tail.length > snake.length) {
    snake.tail.shift();
  }

  return snake;
}

function snakeTurn(snake, direction) {
  if (direction === snake.direction
    || direction === 'up' && snake.direction === 'down'
    || direction === 'right' && snake.direction === 'left'
    || direction === 'down' && snake.direction === 'up'
    || direction === 'left' && snake.direction === 'right'
  ) {
    return snake;
  }

  return {
    ...snake,
    direction: direction,
  }
}

function randomLocation() {
  return {
    x: Math.floor(Math.random() * BOARD_SIZE_X),
    y: Math.floor(Math.random() * BOARD_SIZE_Y),
  }
}

const initialState = {
  board: {
    size: {
      x: BOARD_SIZE_X,
      y: BOARD_SIZE_Y,
    },
  },
  snake: {
    direction: 'right',
    length: 3,
    head: {
      x: Math.floor(BOARD_SIZE_X / 2),
      y: Math.floor(BOARD_SIZE_Y / 2),
    },
    tail: []
  },
  food: {
    x: 0,
    y: 0,
  }
};

function tick(state) {
  const newState = { ...state };
  const snake = newState.snake = snakeTick(state.snake);

  // Ate?
  if (snake.head.x === state.food.x && snake.head.y === state.food.y) {
    snake.length += 1;
    newState.food = randomLocation();
  }

  return newState;
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'TICK':
      return tick(state);
    case 'HARVEST': // Make food appear
      return {
        ...state,
        food: randomLocation(),
      };
    case 'EAT':
      return {
        ...state,
        snake: {
          ...state.snake,
          length: state.snake.length + 1,
        },
      };
    case 'TURN':
      return {
        ...state,
        snake: snakeTurn(state.snake, action.payload),
      };
    default:
      return state;
  }
}

export default createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
