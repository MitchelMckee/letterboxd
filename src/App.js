import FindFavourites from "./components/FindFavourites.jsx";
import Footer from "./components/Footer.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <Box bg="#202830" h="100vh">
        <FindFavourites />
        <Footer />
      </Box>
    </ChakraProvider>
  );
}

export default App;
