import './styles/App.css';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom"

function App() {
  return (
    <div className="Salvation">
      <header className="Salvation-header">
        <h2>The Hand Of Fate</h2>
      </header>
      <div className="salvation-menu">
        <div className="menu-image">
          <a href="https://world.hof.cards">
            <img src="./images/the-world.jpg" alt="Login to Foundry" />
          </a>
        </div>
        <div className="menu-image">
          <Link to="/calendar">
          <img src="./images/wheel-of-fortune.jpg" alt="Access Calendar" />
          </Link>
        </div>
      </div>
      <div className="salvation-menu">
        <div className="menu-image">
          <img src="./images/the-emperor.jpg" alt="Authorize" />
        </div>
      </div>
    </div>
  );
}

export default App;
