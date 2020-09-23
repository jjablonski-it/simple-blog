import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import Navigation from "../components/Navigation";
import "../styles/globals.css";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:4000/graphql",
  credentials: "include",
});

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navigation />
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default MyApp;
