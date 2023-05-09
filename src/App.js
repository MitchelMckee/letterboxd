import FindFavourites from "./components/FindFavourites.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import HowQuirky from "./components/HowQuirky.jsx";
import DisplayQuirk from "./components/HowQuirky.jsx";

function App() {
  return (
    <ChakraProvider>
      <Box bg="#202830" h="100vh">
        <FindFavourites />
      </Box>
    </ChakraProvider>
  );
}

export default App;
