import './App.css';
import Navbar1 from './components/navbar1';
import bgi from './images/bgi.jpg'

function App() {
  return (
    <div id='bgimage' style={{ backgroundImage: `url(${bgi})` }}>
      <Navbar1/>
      <br/>
      <br/>
      <div className='d-flex justify-content-center'>
        <h1 id='tw'>Welcome to Readit</h1>
      </div>
      <p id='tw'>
        Welcome to ReadIt, This is a platform for shearing your achivements, asking your questions and building communities with like minded people from all over the world.<br/>
        In this website you can find communities of different origin and make friends over chat service between users.<br/>
        Be respectful to each other and have fun. <br/>
      </p>
    </div>
  );
}

export default App;
