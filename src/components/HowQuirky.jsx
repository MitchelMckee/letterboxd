import { useEffect, useState } from "react";

import {
  Flex,
  Heading,
  Image,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";

function DisplayQuirk(props) {
  const [posters, setPosters] = useState([]);
  const REACT_APP_MOVIEDB_API_KEY = "2722a23afd6bef9cff0c38f0b37e9fb1";

  useEffect(() => {
    const fetchMoviePosters = async () => {
      const moviePosters = [];
      for (const film of props.favourite) {
        const filmNoDate = film.replace(/\s\(\d{4}\)$/, "");
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${REACT_APP_MOVIEDB_API_KEY}&query=${filmNoDate}`
        );
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          moviePosters.push(data.results[0].poster_path);
        }
      }
      setPosters(moviePosters);
    };
    fetchMoviePosters();
  }, [props.favourite]);

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
        <UnorderedList
          display={"flex"}
          justifyContent={"center"}
          paddingTop={"2%"}
          listStyleType={"none"}
          textAlign={"center"}
          gap={"2%"}
        >
          {props.favourite.map((film, index) => (
            <ListItem key={index} color={"white"}>
              <Image
                src={`https://image.tmdb.org/t/p/w500/${posters[index]}`}
                alt={`${film} poster`}
                height={200}
                width={150}
                borderRadius={"5%"}
              />
              <br />
            </ListItem>
          ))}
        </UnorderedList>
      )}
    </div>
  );
}

export default DisplayQuirk;
