import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to Space Travel</h1>
      <p>
        Explore the universe by building, managing, and deploying spacecraft.
      </p>

      <nav>
        <ul>
          <li>
            <Link to="/spacecrafts">View Spacecraft</Link>
            <Link to="/construct">Construct a Spacecraft</Link>
            <Link to="/planets">Explore Planets</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HomePage;
