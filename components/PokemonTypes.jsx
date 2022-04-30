import PokemonTypesMap from "configs/pokemon-types-map";
import styles from "styles/modules/PokemonTypes.module.scss";

/**
 * @param {import("types/Pokemon").Pokemon} props.pokemon
 * @returns {JSX.Element}
 */
const PokemonTypes = (props) => {
  return (
    <>
      {props.pokemon.types && (
        <ul className="is-flex is-flex-gap-4">
          {props.pokemon.types.map(({ type }) => {
            let typeClassName = "tag";

            if (PokemonTypesMap[type.name] && styles[type.name]) {
              typeClassName = `tag ${styles[type.name]} ${PokemonTypesMap[type.name]}`;
            }

            return (
              <li key={type.name} className={typeClassName}>
                {type.name}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default PokemonTypes;
