/**
 * @param {HTMLElement} handler
 * @param {HTMLElement} element
 * @param {HTMLElement} wrapper
 * @param {number} max
 * @param {number} min
 * @param {Function} callback
 * @returns {void}
 */
const Handler = (handler, element, wrapper, max, min, reverse, callback) => {
  const MAX_WIDTH = max;
  const MIN_WIDTH = min;
  let FINAL_WIDTH = 0;

  const mouseUpHandler = () => {
    document.removeEventListener("mousemove", mouseMoveHandler);
    document.removeEventListener("mouseup", mouseUpHandler);

    if (callback instanceof Function) {
      callback(FINAL_WIDTH);
    }
  };

  const mouseDownHandler = () => {
    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  };

  const mouseMoveHandler = (event) => {
    const styles = window.getComputedStyle(wrapper);
    const wrapperWidth = parseInt(styles.width);

    const width = reverse ? wrapperWidth - event.clientX : event.clientX;
    if (width > MAX_WIDTH) width = MAX_WIDTH;
    if (width < MIN_WIDTH) width = MIN_WIDTH;

    element.style.width = `${width}px`;
    FINAL_WIDTH = width;
  };

  handler.addEventListener("mousedown", mouseDownHandler);
};

export default Handler;
