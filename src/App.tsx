import './App.css'
// import LanguageSwticher from './components/languageSwitcher.component'
// import MapView from './components/map.view'
import Home from './containers/Home'
import 'leaflet/dist/leaflet.css'
import { Layout } from './containers/Layout.container'

function App() {
  // const buenosAiresCoordinates: [number, number] = [-34.6037, -58.3816]
  return (
    <div>
      <Layout>
        <Home />
      </Layout>
      {/* <MapView coordinates={buenosAiresCoordinates} /> */}
    </div>
  )
}

export default App
