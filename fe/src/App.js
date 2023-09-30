import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Routers from "./router/routers";

import RouteTest from "./components/RouteTest";

function App() {
  // axios
  //   .get("https://my-json-server.typicode.com/typicode/demo/posts")
  //   .then(function (response) {
  //     console.log(response.data);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });

  return (
    <BrowserRouter>
      <div className="App">
        <Header />

        <Routers />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
