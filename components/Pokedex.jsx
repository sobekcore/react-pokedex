import { translate } from "services/translate";
import Image from "next/image";
import Link from "next/link";
import styles from "styles/modules/Pokedex.module.scss";

/**
 * @returns {JSX.Element}
 */
const Pokedex = () => {
  return (
    <div className={`${styles.pokedex} is-flex is-flex-direction-column is-flex-gap-5`}>
      <Image src="/assets/pokemon-logo.svg" alt="Pokémon" width="100%" height="100%" />
      <Link href="/pokemon">
        <button className="button">{translate("Open the")} Pokédex</button>
      </Link>
    </div>
  )
};

export default Pokedex;
