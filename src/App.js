import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {

  const [images, setImages] = useState([]);
  const indexes = useRef([]);
  const [currImage, setCurrImage] = useState({});

  // console.log("Images: " + images);
  console.log("Ind: " + indexes.current);

  useEffect(() => {
    function getImages() {
      fetch("http://j0.wlmediahub.com/App_Themes/api/test/photos.js")
        .then(response => response.json())
        .then(result => setImages(() => {
          indexes.current = getRandomIndexes(result['photo'], 5);
          setCurrImage(result['photo'][indexes.current[0]]);
          return result['photo'];
        }));
    }
    getImages();
  }, []);

  function getRandomIndexes(array, num) {
    let arr = [];
    for (let i = 0; i < num; i++) {
      arr.push(getRandomInd(arr, 0, array.length));
    }
    // console.log(length);
    return arr;
  }

  function getRandomInd(arr, min, max) {
    let result = getRandom(min, max);
    do {
      result = getRandom(min, max);
    } while (arr.indexOf(result) !== -1 && indexes.current.indexOf(result) !== -1);
    return result;
  }

  function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  function showImage(e, ind) {
    e.preventDefault();
    setCurrImage(images[ind]);
  }

  function getNewImages(e) {
    e.preventDefault();
    indexes.current = getRandomIndexes(images, 5);
    setCurrImage(images[indexes.current[0]]);
  }

  return (
    <div className="App">
      <div>
        <img src={currImage.img !== undefined ? currImage.img : false} style={{ border: "1px", width: "500px", height: "500px" }} />
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ width: "30vw" }}></div>
        <div style={{ width: "20vw", display: "flex", flexDirection: "row", justifyContent: "center" }}>
          {indexes.current.map((ind, key) => {
            return <div style={{ padding: "0 5px" }}>
              <a key={key} href="/" onClick={e => showImage(e, ind)}>{key + 1}</a>
            </div>;
          })}
        </div>
        <div style={{ width: "20vw" }}>
          <a href="/" onClick={e => getNewImages(e)} >get new images</a>
        </div>
        <div style={{ width: "30vw" }}></div>
      </div>
    </div>
  );
}

export default App;
