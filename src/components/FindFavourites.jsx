import { useState } from "react";

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
      <label>
        Letterboxd Username:
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </label>
      <button type="submit">Search</button>
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
