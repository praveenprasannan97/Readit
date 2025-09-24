import './App.css';
import Navbar1 from './components/navbar1';
// import bgi from './images/bgi.jpg'

function App() {
  return (
    // <div id='bgimage' style={{ backgroundImage: `url(${bgi})` }}>
    <div id='bgimage'>
      <Navbar1/>
      <br/>
      <br/>
      <div id='hm-wel' className='container'>
        <div id='tw'>
          <h1>Welcome to Readit</h1>
        </div>
        <p id='tw' className='mt-3'>
          A vibrant platform where you can share your achievements, ask meaningful questions, and connect with communities of like-minded people from around the globe.<br></br>
          Discover groups of every kind, join conversations that matter to you, and build genuine friendships through our user-to-user chat.<br></br>
          At ReadIt, respect is at the heart of everything we do—so bring your curiosity, your stories, and your sense of fun. Let’s grow, learn, and celebrate together!<br></br>
        </p>
      </div>
    </div>
  );
}

export default App;
