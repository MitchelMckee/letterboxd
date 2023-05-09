import FindFavourites from "./components/FindFavourites.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <Box bg="#202830" h="100vh">
        <div>
          <div className="letterboxd-logo" />
          <FindFavourites />
        </div>
      </Box>
    </ChakraProvider>
  );
}

export default App;
