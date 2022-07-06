import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Game from "./components/Game.jsx";

/* Completed by Jon Gauer based on the reactjs.org tutorial. 
    Changes made:
        1. Class components refactored into functional components with useState() hooks.
        2. Components refactored into external files.
        3. Move history list modified to display player & coordinate for each turn.
        4. <Board/> refactored to render rows and squares using nested loops/maps.
        5. Appearance changed in CSS.

*/

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);