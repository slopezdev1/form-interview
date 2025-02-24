import './App.css'
// import LanguageSwticher from './components/languageSwitcher.component'
import MapView from './components/map.view'
import Home from './containers/Home'
import 'leaflet/dist/leaflet.css'

function App() {
  const buenosAiresCoordinates: [number, number] = [-34.6037, -58.3816]
  return (
    <div>
      <Home />
      {/* <MapView coordinates={buenosAiresCoordinates} /> */}
    </div>
  )
}

export default App
