import PokemonImage from "components/PokemonImage";

const Pokemon = (props) => {
  return (
    <div className="box">
      <div className="block">
        <h2 className="title is-capitalized">{props.pokemon.name}</h2>
      </div>
      <div className="block">
        <PokemonImage pokemon={props.pokemon} />
      </div>
      <div className="block">
        <ul className="is-flex is-flex-gap-4">
          {props.pokemon.types.map(({ type }) => {
            return <li key={type.name}>{type.name}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default Pokemon;
