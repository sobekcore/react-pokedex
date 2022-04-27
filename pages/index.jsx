import { translate } from "services/translate";
import Link from "next/link";

/**
 * @returns {JSX.Element}
 */
const HomePage = () => {
  return (
    <main className="is-flex is-justify-content-center is-align-items-center is-full-width is-full-height">
      <Link href="/pokemon">
        <button className="button">{translate("Open the")} Pokédex</button>
      </Link>
    </main>
  );
};

export default HomePage;
