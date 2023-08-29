import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ClientPage from "./pages/ClientPage";
import ClientsPage from "./pages/ClientsPage";
import ProjectsPage from "./pages/ProjectsPage";

// Now you can access environment variables using process.env

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        project: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const Client = new ApolloClient({
  // uri: "https://manager123-bf23d8444f95.herokuapp.com/graphql",
  uri: "https:localhost:5000/graphql",

  cache: cache,
});

function App() {
  return (
    <>
      <ApolloProvider client={Client}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/clients" element={<ClientsPage />} />
            <Route path="/projects" element={<ProjectsPage />} />

            <Route path="/client/:id" element={<ClientPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
