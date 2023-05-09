import { useState } from "react";
import { Flex, Input, Heading, Button, Image } from "@chakra-ui/react";
import "./styles.css";

function UsernameForm() {
  const [username, setUsername] = useState("");
  const [favourite, setFavourite] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(`Username submitted: ${username}`);
    const response = await fetch(
      `/ScrapeLetterboxdFavourites?username=${username}`
    );

    const data = await response.json();
    console.log("data:", data["favourite_films"]);
    setFavourite(data["favourite_films"]);
    console.log(favourite);
  };

  return (
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
            placeholder="Type here..."
            variant={"filled"}
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            id="search-bar"
          />
        </Flex>
      </label>
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        paddingTop={"2%"}
        paddingBottom={"2%"}
      >
        <Button colorScheme={"green"} type="submit">
          See how quirky you really are!
        </Button>
      </Flex>

      <Heading as={"h3"} color={"white"} textAlign={"Center"} size={"16"}>
        *This isn't always your display name, if your display name isn't
        <br />
        working go to settings and use whatever comes after “Signed in as”
      </Heading>
      {favourite && (
        <ul>
          {favourite.map((film, index) => (
            <li key={index}>{film}</li>
          ))}
        </ul>
      )}
    </form>
  );
}

export default UsernameForm;
