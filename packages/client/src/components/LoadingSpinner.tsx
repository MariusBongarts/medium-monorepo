/*
design by Martin van Driel.
codepen: https://codepen.io/martinvd/pen/xbQJom
*/

import React, { FC } from "react";
import "./LoadingSpinner.css";
export const LoadingSpinner: FC = () => (
  <div className="loader">
    <div className="inner one"></div>
    <div className="inner two"></div>
    <div className="inner three"></div>
  </div>
);
