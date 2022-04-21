import Image from "next/image";

const PokemonImage = (props) => {
  return (
    <Image
      src={props.pokemon.sprites.other["official-artwork"]["front_default"]}
      alt={`${props.pokemon.name} artwork`}
      width="100%"
      height="100%"
    />
  );
}

export default PokemonImage;
