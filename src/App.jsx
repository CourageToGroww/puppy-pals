import './App.css'
import { puppyList } from './data'
import { useState } from 'react'



function App() {
const [puppies, setPuppies] = useState(puppyList);
const [featPupId, setFeatPupId] = useState(null);

const clickError = (id) => {
  if (id === featPupId) {
    window.alert("You can't feature the same puppy twice!");
  } else {
    setFeatPupId(id);
  }
};

const featuredPup = puppies.find((pup) => pup.id === featPupId);
console.log(featuredPup);

  return (
    <>
    {featPupId && (
      <div className = "featured-card">
        <h2 className = "featured-name">{featuredPup.name}</h2>
        <ul className = "stat-color">
          <li>Age: {featuredPup.age}</li>
          <li>Email: {featuredPup.email} </li>
        </ul>
        </div>
    )}
      <div className = "pup-selector">{puppies.map((puppy) => {
        return <p onClick={() => clickError(puppy.id)} key={puppy.id}>{puppy.name}</p>
      })
    }

        </div>
    </>
  )
}

export default App
