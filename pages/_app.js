import Head from "next/head";
import { CacheProvider } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import createEmotionCache from "../utils/createEmotionCache";
import theme from "../theme/theme";
import { RecoilRoot } from "recoil";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <RecoilRoot>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>Todo App</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          {/* <link rel="shortcut icon" href="/favicon.ico" /> */}
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </RecoilRoot>
  );
}
