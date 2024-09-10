// function to fetch data from firebase
let url =
  "https://wu-e24a-fetch-fun-default-rtdb.europe-west1.firebasedatabase.app/{karl}-{mads}-{golf}.json";

let collection_id = "-O6QYNj7_6eiSV3W3EuH";
const output = document.querySelector("#output");
let players_array = [];

const fetch_data = async () => {
  try {
    const response = await fetch(url);
    let data = await response.json();
    let players = data[collection_id].players;
    players = Object.entries(players).map((entry) => {
      const [name, info] = entry;
      return { name, ...info };
    });
    players.sort((a, b) => a.rank - b.rank);

    // foreach loop to display data
    players.forEach((player) => {
      output.innerHTML += `
        <div class="card">
          <h2>${player.name}</h2>
          <p>Age: ${player.age}</p>
          <p>Rank: ${player.rank}</p>
        </div>
      `;
    });

    players_array = players;
  } catch (error) {
    console.log(error);
  }
};

fetch_data();

function sort_by_name() {
  output.innerHTML = "";
  players.sort((a, b) => a.name.localeCompare(b.name));
  players.forEach((player) => {
    output.innerHTML += `
      <div class="card">
        <h2>${player.name}</h2>
        <p>Age: ${player.age}</p>
        <p>Rank: ${player.rank}</p>
      </div>
    `;
  });
}

// data to post
const players = {
  "Tiger Woods": { age: 42, rank: 21 },
  "Phil Mickelson": { age: 48, rank: 17 },
  "Rory McIlroy": { age: 29, rank: 8 },
  "Jordan Spieth": { age: 25, rank: 6 },
  "Dustin Johnson": { age: 34, rank: 1 },
  "Justin Thomas": { age: 25, rank: 3 },
  "Rickie Fowler": { age: 29, rank: 7 },
  "Brooks Koepka": { age: 28, rank: 2 },
  "Bubba Watson": { age: 39, rank: 13 },
  "Jason Day": { age: 30, rank: 12 },
};

// post data to firebase
const post_data = async () => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ players }),
    });
    let data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

// post_data();
