import NavBar from './components/NavBar'
import './stylesheets/App.css'

function App () {
  return (
    <div className='App'>
      <div class='container mx-auto px-4'>
        <div class='flex flex-row'>
          <div class='basis-1/4'><NavBar/></div>
          <div class='basis-3/4'>3/4</div>
        </div>
      </div>
    </div>
  )
}

export default App
