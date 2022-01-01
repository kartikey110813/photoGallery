import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.scss";
import PhotoGrid from "./components/PhotoGrid";
import "./components/Search.css";
import { useHistory } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "react-loader-spinner";


const App = () => {
  const [images, setImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [length, setLength] = useState("");
  const API_KEY = "API_KEY";  //here I've added the api key in deployed version....On github Api key cannot be made public
  const history = useHistory();

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = () => {
    axios
      .get(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&text=nature&media=photos&per_page=15&page=5&format=json&nojsoncallback=1`
      )
      .then((res) => {
        console.log(res);
        setImages(res.data.photos.photo);
        setLength(res.data.photos.total);
      });
  };

  const handleSubmit = (e) => {
    history.push(`/${searchTerm}`);
    e.preventDefault();
    axios
      .get(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&text=${searchTerm}&media=photos&per_page=15&page=5&format=json&nojsoncallback=1`
      )
      .then((res) => {
        console.log(res);
        setImages(res.data.photos.photo);
        console.log(images);
      });
  };

  return (
    <>
      <h1
        className="text-center text-dark mt-4"
        style={{ fontFamily: "sans-serif" }}
      >
        Image Grid
      </h1>
      <form className="mt-4 mb-4 mx-auto" onSubmit={handleSubmit}>
        <div className="container1">
          <input
            value={searchTerm}
            id="searchBar"
            className="searchbar"
            type="text"
            placeholder="Search free high resolution photos"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <p id="btnSearch" className="btn-search">
            <i className="fa fa-search"></i>
          </p>
        </div>
      </form>

      <InfiniteScroll
      dataLength={length}
      next={fetchImages}
      hasMore={true}
      loader={ <Loader
        className="text-center p-4"
        type="Oval"
        color="green"
        height={100}
        width={200}
        timeout={10000} //3 secs
      />}
      >
        <PhotoGrid images={images} />
      </InfiniteScroll>
    </>
  );
};

export default App;
