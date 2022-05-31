import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Storage } from "services/enums";
import { reviveStore } from "facades/store";
import "styles/globals.scss";

import Head from "next/head";
import MainLoader from "components/common/MainLoader";

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [isStoreRevived, setStoreRevived] = useState(false);

  const routeHandleStart = () => {
    setLoading(true);
  };

  const routeHandleComplete = () => {
    setLoading(false);
  };

  useEffect(() => {
    reviveStore(Storage.ITEM_STATE_UI);
    reviveStore(Storage.ITEM_STATE_POKEMON_MAIN_LIST);
    setStoreRevived(true);

    router.events.on("routeChangeStart", routeHandleStart);
    router.events.on("routeChangeComplete", routeHandleComplete);
    router.events.on("routeChangeError", routeHandleComplete);
  }, [router]);

  return (
    <>
      <Head>
        <title>React Pokédex</title>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </Head>
      <MainLoader loading={isLoading} global={true} />
      {isStoreRevived && <Component {...pageProps} />}
    </>
  );
}

export default MyApp;
