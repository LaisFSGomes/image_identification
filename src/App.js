import * as mobilenet from "@tensorflow-models/mobilenet"; 
import { useState, useEffect, useRef } from "react";
function App() {
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [model, setModel] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const imageRef = useRef();

  const loadModel = async () => {
    setIsModelLoading(true);
    try {
      const model = await mobilenet.load();
      setModel(model);
      setIsModelLoading(false);
    } catch (error) {
      console.log(error)
      setIsModelLoading(false);
    }
  };
  
  const uploadImage = (event) => {
    const {files} = event.target;
    if(files.length > 0) {
      const url = URL.createObjectURL(files[0]);
      setImageUrl(url);
    } else {
      setImageUrl(null);
    }
  }

  useEffect(() => {
    loadModel();
  }, []);

  if(isModelLoading){
    return <h2>Model Loading...</h2>
  }

  console.log(imageUrl);

  return (
    <div className="header">
      <h1>Hello World, image classification!</h1>
      <div className="inputHolder">
      <input type="file" accept="image/*" capiture="camera" className="uploadInput" onChange={uploadImage} />
      </div>
      <div className="mainWrapper">
        <div className="mainContent">
          <div className="imageHolder">
            {imageUrl && <img src={imageUrl} alt="Upload Preview" crossOrigin="anonymous" ref={imageRef}  />}
          </div>
          {imageUrl && <button className="button">Identify Image</button>}
        </div>
      </div>

    </div>
  );
}

export default App;
