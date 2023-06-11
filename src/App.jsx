import './App.css'
import { puppyList } from './data'
import { kittyList } from './data';
import { useState } from 'react'




function App() {
const [puppies, setPuppies] = useState(puppyList);
const [featPupId, setFeatPupId] = useState(null);
const [kitties, setKitties] = useState(kittyList);
const [featKitId, setFeatKitId] = useState(null);

const [pupImage, setPupImage] = useState(null);
const [kitImage, setKitImage] = useState(null);

const clickPupError = (id) => {
  if (id === featPupId) {
    window.alert("You can't feature the same puppy twice!");
  } else {
    const selectedPuppy = puppies.find((pup) => pup.id === id);
    let breed = selectedPuppy.breed.toLowerCase().replace(' ', '-');
    if (breed === "golden-retriever") breed = "retriever/golden";
    if (breed === "german-shepherd") breed = "germanshepherd";
    setFeatPupId(id);
    fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
      .then((res) => res.json())
      .then(data => setPupImage(data.message))
      .catch((err) => console.log(err));
  }
};

const clickKitError = (id) => {
  if (id === featKitId) {
    window.alert("You can't feature the same kitty twice!");
  } else {
    const selectedKitty = kitties.find((kit) => kit.id === id);
    let breed;
    switch (selectedKitty.breed) {
      case "Persian":
        breed = "pers";
        break;
      case "Siamese":
        breed = "siam";
        break;
      case "Maine Coon":
        breed = "mcoo";
        break;
      case "Bengal":
        breed = "beng";
        break;
      case "Ragdoll":
        breed = "ragd";
        break;
      case "Sphynx":
        breed = "sphy";
        break;
      case "Scottish Fold":
        breed = "sfol";
        break;
      default:
        breed = "beng"; // default to Bengal if breed not recognized
    }
    setFeatKitId(id);
    fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breed}`, {
      headers: {
        'x-api-key': 'live_VABUkYW9nIeGXulAgZ2rWOEsrjlgzlmiBl0s66mDz3yeNDG5ICO6wukUGl40YM3o'
      }
    })
      .then((res) => res.json())
      .then(data => setKitImage(data[0].url))
      .catch((err) => console.log(err));
  }
};


const featuredPup = puppies.find((pup) => pup.id === featPupId);
console.log(featuredPup);

const featuredKit = kitties.find((kit) => kit.id === featKitId);
console.log(featuredKit);

  return (
    <>
      <h1 className="title">
                {featPupId && featKitId
          ? "Puppies VS Kitties"
          : featPupId
          ? "Kitties, Please Pick Your Player"
          : featKitId
          ? "Puppies, Please Pick Your Player"
          : "Pick Your Player"}
      </h1>
      <div className="card-container">
        {featPupId && (
          <div className="featured-card">
            <h2 className="featured-name">{featuredPup.name}</h2>
            <ul className="stat-color">
              <li>Breed: {featuredPup.breed}</li>
              {pupImage && <img className="animal-image" src={pupImage} alt={featuredPup.breed} />}
              <div className="abilities-container">
                {featuredPup.abilities.map((ability, index) => (
                  <li key={index}>{ability}</li>
                ))}
              </div>
            </ul>
          </div>
        )}
        {featKitId && (
          <div className="featured-card2">
            <h2 className="featured-name2">{featuredKit.name}</h2>
            <ul className="stat-color2">
              <li>Breed: {featuredKit.breed}</li>
              {kitImage && <img className="animal-image" src={kitImage} alt={featuredKit.breed} />}
              <div className="abilities-container">
                {featuredKit.abilities.map((ability, index) => (
                  <li key={index}>{ability}</li>
                ))}
              </div>
            </ul>
          </div>
        )}
      </div>
      <div className="selector-container">
        {!featPupId && (
          <div className="pup-selector">
            <h3>Select a Puppy</h3>
            {puppies.map((puppy) => {
              return (
                <p onClick={() => clickPupError(puppy.id)} key={puppy.id}>
                  {puppy.name}
                </p>
              );
            })}
          </div>
        )}
        {!featKitId && (
          <div className="kit-selector">
             <h3>Select a Kitty</h3>
            {kitties.map((kitty) => {
              return (
                <p onClick={() => clickKitError(kitty.id)} key={kitty.id}>
                  {kitty.name}
                </p>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default App
