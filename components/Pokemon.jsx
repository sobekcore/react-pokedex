import Link from "next/link";
import PokemonImage from "components/PokemonImage";
import PokemonTypes from "components/PokemonTypes";

/**
 * @param {import("types/Pokemon").Pokemon} props.pokemon
 * @returns {JSX.Element}
 */
const Pokemon = (props) => {
  return (
    <div className="box">
      <div className="block">
        <Link href="/pokemon">
          <button className="button is-small">
            <span className="is-size-4 mr-2">&larr;</span>
            <span>Go back to list</span>
          </button>
        </Link>
      </div>
      <div className="block">
        <h2 className="title is-capitalized">{props.pokemon.name}</h2>
      </div>
      <div className="block">
        <PokemonImage pokemon={props.pokemon} />
      </div>
      <div className="block">
        <PokemonTypes pokemon={props.pokemon} />
      </div>
      <div className="block">
        <h3 className="title is-5">Statistics</h3>
        <table className="table is-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {props.pokemon.stats.map((stat) => {
              return (
                <tr key={stat.stat.name}>
                  <td>{stat.stat.name}</td>
                  <td>{stat.base_stat}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="block">
        <h3 className="title is-5">Abilites</h3>
        <table className="table is-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Hidden</th>
            </tr>
          </thead>
          <tbody>
            {props.pokemon.abilities.map((ability) => {
              return (
                <tr key={ability.ability.name}>
                  <td>{ability.ability.name}</td>
                  <td>{ability.is_hidden ? 'yes' : 'no'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Pokemon;
