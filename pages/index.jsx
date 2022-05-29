import Pokedex from "components/Pokedex";

/**
 * @returns {JSX.Element}
 */
const HomePage = () => {
  return (
    <main className="is-flex is-justify-content-center is-align-items-center is-full-width is-full-height">
      <Pokedex />
    </main>
  );
};

export default HomePage;
