import { useState } from "react";
import { Flex, Input, Heading, Button, Image } from "@chakra-ui/react";

import "./styles.css";
import DisplayQuirk from "./HowQuirky";

function UsernameForm() {
  const [username, setUsername] = useState("");
  const [favourite, setFavourite] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(`Username submitted: ${username}`);
    setLoading(true);
    try {
      const response = await fetch(
        // `/ScrapeLetterboxdFavourites?username=${username}`
        `http://13.40.82.99:22/api/ScrapeLetterboxdFavourites?username=${username}`
      );

      const data = await response.json();
      console.log("data:", data["favourite_films"]);
      setFavourite(data["favourite_films"]);
      setShowResults(true);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {showResults ? (
        <DisplayQuirk favourite={favourite} username={username} />
      ) : (
        <form onSubmit={handleSubmit}>
          <Flex justifyContent="center" alignItems="center">
            <Image
              src={require("../assets/img/letterboxd-dots.png")}
              h={"120px"}
              objectFit={"contain"}
              alt={"Letterboxd Logo"}
              paddingTop={"2%"}
              paddingBottom={"2%"}
            />
          </Flex>
          <label>
            <Heading
              as="h1"
              id="title"
              fontWeight={"bold"}
              textAlign={"Center"}
              color={"white"}
              paddingBottom={"2%"}
            >
              Letterboxd Favourites Quirk'o'meter
            </Heading>
            <Heading
              as={"h2"}
              fontSize={"25"}
              color={"white"}
              textAlign={"Center"}
              paddingBottom={"1%"}
            >
              Enter your Letterboxd username*
            </Heading>
            <Flex justifyContent="center" alignItems="center">
              <Input
                width={"20%"}
                bg={"FFFFFF"}
                color={"white"}
                placeholder="Type here..."
                variant={"filled"}
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </Flex>
          </label>

          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            paddingTop={"2%"}
            paddingBottom={"2%"}
          >
            <Button colorScheme={"green"} type="submit" isLoading={loading}>
              See how quirky you really are!
            </Button>
          </Flex>

          <Heading as={"h3"} color={"white"} textAlign={"Center"} size={"16"}>
            *This isn't always your display name, if your display name isn't
            <br />
            working go to settings and use whatever comes after “Signed in as”
          </Heading>
        </form>
      )}
    </div>
  );
}

export default UsernameForm;
