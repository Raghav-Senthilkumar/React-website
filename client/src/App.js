import React, { useState,useEffect } from 'react';
import './App.css';
import yourFigmaImage from './rectangle.png';
import k from './mask2.png'
import kl from './group.png'
import Card from './Card';


function App() {
  const [scrollY, setScrollY] = useState(0);
  const [file, setFile] = useState(null);
  const [predictions, setPredictions] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('file', file);

    fetch('/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => setPredictions(data.predictions))
      .catch((error) => console.error(error));
  };
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const positionY = window.scrollY;

      // Retrieve elements
      const title = document.getElementById("title");
      const bg_2 = document.getElementById("bg-2");
      const bg_3 = document.getElementById("bg-3");
      title.style.fontSize = `${90 + positionY * 0.05}px`;
      bg_2.style.top = `-${positionY * 0.5}px`;
      bg_3.style.top = `-${positionY*0.7}px `;
      bg_3.style.transform =`rotate(${positionY*0.5}deg)`;
      const newOpacity = 1 - positionY * 0.002; // Adjust opacity based on scroll
      title.style.opacity = newOpacity > 0 ? newOpacity : 0;
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollY]);
    
  return (
    <div className="App">
      <div class="parallax__container">
      <img id="bg-2" src={yourFigmaImage} alt="parallax" />
      <img id="bg-2" src={k} style={{marginTop: '271px'}} alt="parallax" />
      <h1 id="title" class="l"style={{marginTop: '0px'}}>COX-2 INHIBITION PREDICTOR</h1>
      <img id="bg-3" src={kl} style={{ width: 379/1.2, height: 521/1.2,marginTop: '100px', marginLeft:'10px'  }}  alt="parallax" />
      
    </div>
    <Card></Card>
    

    <img id="bg-2" src={k} style={{marginTop: '270px'}} alt="parallax" />
    
      <h1>CSV File Upload and Prediction</h1>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <div>
        <h2>Predictions:</h2>
        <ul>
          {predictions.slice(0,2).map((prediction, index) => (
            <li key={index}>{prediction}</li>
          ))}
        </ul>
        
      {/* Add more sections or content as needed */}
      </div>
    
    <script>
      var title
      </script>
    
    </div>
    
  );
}

export default App;