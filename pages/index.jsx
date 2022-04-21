import Link from "next/link";

const HomePage = () => {
  return (
    <div className="is-flex is-justify-content-center is-align-items-center is-full-width is-full-height">
      <Link href="/pokemon"><button className="button">Open the Pokédex</button></Link>
    </div>
  );
};

export default HomePage;
