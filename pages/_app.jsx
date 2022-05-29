import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import "styles/globals.scss";

import Head from "next/head";
import AppLoader from "components/common/AppLoader";

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const routeHandleStart = () => {
    setLoading(true);
  };

  const routeHandleComplete = () => {
    setLoading(false);
  };

  useEffect(() => {
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
      <AppLoader loading={isLoading} global={true} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
