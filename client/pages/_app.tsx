import { ApolloCache, ApolloProvider } from "@apollo/client";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "../components/Navigation";
import { useApollo } from "../lib/apolloClient";
import theme from "../src/theme";
import "../styles/globals.css";

function MyApp({ Component, pageProps, router }) {
  const client = useApollo(pageProps.initialApolloProps);

  // useEffect(() => {
  //   // Remove the server-side injected CSS.
  //   const jssStyles = document.querySelector("#jss-server-side");
  //   if (jssStyles) {
  //     jssStyles.parentElement?.removeChild(jssStyles);
  //   }
  // }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ApolloProvider client={client}>
        <Navigation />
        <AnimatePresence>
          <motion.div
            style={{
              left: "50%",
            }}
            initial={{ opacity: 0.5, x: "-50%", position: "fixed" }}
            animate={{ opacity: 1, x: "-50%", position: "absolute" }}
            exit={{ opacity: 0, x: "100%", position: "fixed" }}
            key={router.route}
          >
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default MyApp;
