/**
 * @param {boolean} props.loading
 * @param {boolean} props.global
 * @returns {JSX.Element}
 */
const MainLoader = (props) => {
  return (
    <>
      {props.loading && (
        <div className={props.global
          ? "app-loader-global is-flex is-justify-content-center is-align-items-center is-full-height is-full-width"
          : "app-loader-local is-flex is-justify-content-center is-align-items-center is-height-100 is-width-100"
        }>
          <span className="loader app-loader is-size-1"></span>
        </div>
      )}
    </>
  );
};

export default MainLoader;
