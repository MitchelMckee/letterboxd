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

    setFavourite(data.favourite);
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
      {favourite && <p>{favourite}</p>}
    </form>
  );
}

export default UsernameForm;
