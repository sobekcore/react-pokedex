import { translate } from "services/translate";
import Image from "next/image";

/**
 * @param {import("types/Pokemon").Pokemon} props.pokemon
 * @returns {JSX.Element}
 */
const PokemonImage = (props) => {
  return (
    <>
      {props.pokemon.sprites && (
        <Image
          src={props.pokemon.sprites.other["official-artwork"]["front_default"]}
          alt={`${props.pokemon.name} ${translate("artwork")}`}
          width="100%"
          height="100%"
        />
      )}
    </>
  );
}

export default PokemonImage;
