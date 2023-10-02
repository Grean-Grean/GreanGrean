import { useState } from "react";

import FaqList from "./FaqList";
import Styles from "./Faq.module.css"

import React from "react";
import Accordion from "./Accodion";

const contents = (
    <p>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat tenetur
      reiciendis excepturi deserunt dolores, at quae? Odit veniam libero, incidunt
      in illo eius praesentium quia rerum eaque illum perspiciatis sint.
    </p>
  );

const Faq = () => {
  
    return (
        <div className="App">
          <h1>Jacob's playground</h1>
          <Accordion title="#1 아코디언" contents={contents} />
          <br />
          <Accordion title="#2 아코디언" contents={contents} />
          <br />
          <Accordion title="#3 아코디언" contents={contents} />
        </div>
      );
};

export default Faq;
