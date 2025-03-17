import './Home.css';
import { Link } from 'react-router-dom';
function Home() {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        Welcome to the SWBC Document Management Landing Page!! <br />
        Take a look around.
        <div class="button-container">
          <Link to="./Upload">
          <button class="button-74" role="button">Upload a document</button>
          </Link>
        </div>
      </div>
    );
  }
  
  export default Home;