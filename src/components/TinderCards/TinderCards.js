/** In summary, this code sets up a Tinder-like card interface with
 * swipe functionality, populating the cards with people's information. */

import React, { useState } from 'react';
import TinderCard from 'react-tinder-card';
import './TinderCards.css';

const TinderCards = () => {
  // eslint-disable-next-line no-unused-vars
  const [people, setPeople] = useState([
    {
      name: 'Beyonce Knowles',
      gender: 'woman',
      preferred_gender: 'women',
      url: 'https://www.travelnews.se/wp-content/uploads/2023/02/643px-Beyonce_Black_Is_King_Still.png'
    },
    {
      name: 'Britney Spears',
      url: 'https://cdn.thehollywoodgossip.com/uploads/2017/08/britney-spears-no-makeup-selfie.png'
    }]);
  const swiped = (direction, nameToDelete) => {
    console.log(`removing: ${nameToDelete}`);
  };

  const outOfFrame = (name) => {
    console.log(`${name} + left the screen!`);
  };

  return (
    <div className="tinderCards">
      <div className="tinderCards__cardContainer">
        {people.map((person) => (
          <TinderCard
            className="swipe"
            key={person.name}
            preventSwipe={['up', 'down']}
            onSwipe={(dir) => swiped(dir, person.name)}
            onCardLeftScreen={() => outOfFrame(person.name)}>
            <div
              style={{ backgroundImage: `url(${person.url})` }}
              className="card">
              <h3>{person.name}</h3>
            </div>

          </TinderCard>
        ))}
      </div>
    </div>
  );
};
export default TinderCards;