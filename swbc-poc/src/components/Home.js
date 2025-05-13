import './Home.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
      <div className='content-ovelay'>
        <div className="welcome-message">
          <h1>Welcome to the SWBC Document Management Landing Page!</h1>
          <p>Take a look around and start managing your documents today.</p>
        </div>
        <div className="button-container">
          <Link to="./Login">
            <button className="button-18" role="button">Login to Continue</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;