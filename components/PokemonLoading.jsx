const PokemonLoading = (props) => {
  return (
    <span>
      Loading {" "}
      {props.name
        ? <span className="is-capitalized">{props.name}</span>
        : <span>Pokemons</span>
      }
      ...
    </span>
  );
};

export default PokemonLoading;
