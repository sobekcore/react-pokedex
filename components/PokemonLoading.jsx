/**
 * @param {string} props.name Name of a Pokemon to apply loader on
 * @returns {JSX.Element}
 */
const PokemonLoading = (props) => {
  return (
    <div className="is-absolute-centered is-width-100">
      <span className="is-flex is-justify-content-center is-align-items-center is-flex-gap-3">
        <span className="loader is-size-4"></span>
        <span className="has-text-grey-light">
          Loading {" "}
          {props.name
            ? <span className="is-capitalized">{props.name}</span>
            : <span>Pokemon</span>
          }
          ...
        </span>
      </span>
    </div>
  );
};

export default PokemonLoading;
