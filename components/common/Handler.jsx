import { Handler } from "services/enums";

/**
 * @var {string} Y_AXIS
 */
const Y_AXIS = "y-axis";

/**
 * @var {string} X_AXIS
 */
const X_AXIS = "x-axis";

/**
 * @param {HTMLElement} handler An element that we want to grab
 * @param {HTMLElement} element An element that we want to resize
 * @param {HTMLElement} wrapper Any parent that contains the resized element
 * @param {number} max Maximum width of the resized element
 * @param {number} min Minimum width of the resized element
 * @param {string} side Side from which the resized element is going to be transformed
 * @param {Function} callback A callback that will be launched when the resizing is finished
 * @returns {void}
 */
const HandlerComponent = (handler, element, wrapper, max, min, side, callback) => {
  const MAX_SIZE = max;
  const MIN_SIZE = min;
  let FINAL_SIZE = 0;
  let AXIS = null;

  const mouseDownHandler = () => {
    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  };

  const mouseUpHandler = () => {
    document.removeEventListener("mousemove", mouseMoveHandler);
    document.removeEventListener("mouseup", mouseUpHandler);

    if (callback instanceof Function) {
      callback(FINAL_SIZE);
    }
  };

  const mouseMoveHandler = (event) => {
    const wrapperStyles = window.getComputedStyle(wrapper);
    const handlerStyles = window.getComputedStyle(handler);

    const { left, top } = wrapper.getBoundingClientRect();
    const mouseX = event.clientX - left;
    const mouseY = event.clientY - top;

    let wrapperSize = 0;
    let handlerSize = 0;
    let initialSize = 0;
    let reverse = false;

    switch (side) {
      case Handler.DIRECTION_TOP:
        wrapperSize = parseInt(wrapperStyles.height);
        handlerSize = parseInt(handlerStyles.height);
        initialSize = mouseY;
        break;
      case Handler.DIRECTION_BOTTOM:
        wrapperSize = parseInt(wrapperStyles.height);
        handlerSize = parseInt(handlerStyles.height);
        initialSize = wrapperSize - mouseY;
        reverse = true;
        break;
      case Handler.DIRECTION_LEFT:
        wrapperSize = parseInt(wrapperStyles.width);
        handlerSize = parseInt(handlerStyles.width);
        initialSize = mouseX;
        break;
      case Handler.DIRECTION_RIGHT:
        wrapperSize = parseInt(wrapperStyles.width);
        handlerSize = parseInt(handlerStyles.width);
        initialSize = wrapperSize - mouseX;
        reverse = true;
        break;
    }

    const sizeWithHandler = reverse
      ? initialSize + Math.round(handlerSize / 2)
      : initialSize - Math.round(handlerSize / 2);

    let size = sizeWithHandler;
    if (sizeWithHandler > MAX_SIZE) size = MAX_SIZE;
    if (sizeWithHandler < MIN_SIZE) size = MIN_SIZE;

    if (AXIS === Y_AXIS) {
      element.style.height = `${size}px`;
    }

    if (AXIS === X_AXIS) {
      element.style.width = `${size}px`;
    }

    FINAL_SIZE = size;
  };

  switch (side) {
    case Handler.DIRECTION_TOP:
    case Handler.DIRECTION_BOTTOM:
      AXIS = Y_AXIS;
      break;
    case Handler.DIRECTION_LEFT:
    case Handler.DIRECTION_RIGHT:
      AXIS = X_AXIS;
      break;
  }

  handler.classList.add(AXIS);
  handler.addEventListener("mousedown", mouseDownHandler);
};

export default HandlerComponent;
