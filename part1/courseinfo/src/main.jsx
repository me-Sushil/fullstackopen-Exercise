import ReactDOM from "react-dom/client";
import App from "./App";


const root = document.getElementById("root");
const myRoot = ReactDOM.createRoot(root);
myRoot.render(<App />)

// same as above
//ReactDOM.createRoot(document.getElementById("root")).render(<App />)