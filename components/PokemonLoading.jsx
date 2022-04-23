const PokemonLoading = (props) => {
  return (
    <span className="is-flex is-flex-gap-3">
      <span className="loader is-size-4"></span>
      <span className="has-text-grey-light">
        Loading {" "}
        {props.name
          ? <span className="is-capitalized">{props.name}</span>
          : <span>Pokemons</span>
        }
        ...
      </span>
    </span>
  );
};

export default PokemonLoading;
