import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const App = () => {
  const [selectedStar, setSelectedStar] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);

  return(
    <div>
      {[1,2,3,4,5].map((star) => (
        <FaStar
          key={star}
          color={star <= (hoveredStar || selectedStar) ? 'gold' : 'gray'}
          onMouseEnter={() => setHoveredStar(star)}
          onMouseLeave={() => setHoveredStar(0)}
          onClick={() => setSelectedStar(star)}
          size={40}
          className="cursor-pointer transition duration-200"
        />
      ))}
    </div>
  )
};

export default App;
