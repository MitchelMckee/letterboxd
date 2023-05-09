import {
  Flex,
  Input,
  Heading,
  Button,
  Image,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";

function DisplayQuirk(props) {
  return (
    <div>
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
      <Heading
        as="h1"
        id="title"
        fontWeight={"bold"}
        textAlign={"Center"}
        color={"white"}
        paddingBottom={"2%"}
      >
        Quirk'o'meter
      </Heading>

      <Heading
        as={"h2"}
        fontSize={"25"}
        color={"white"}
        textAlign={"Center"}
        paddingBottom={"1%"}
      >
        {props.username}, your favourite films are...
      </Heading>
      {props.favourite && (
        <UnorderedList>
          {props.favourite.map((film, index) => (
            <ListItem key={index} color={"white"}>
              {film}
            </ListItem>
          ))}
        </UnorderedList>
      )}
    </div>
  );
}

export default DisplayQuirk;
