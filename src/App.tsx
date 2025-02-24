import './App.css'
// import LanguageSwticher from './components/languageSwitcher.component'
// import MapView from './components/map.view'
import Home from './containers/Home'
import 'leaflet/dist/leaflet.css'
import { Layout } from './containers/layout.container'

function App() {

  return (
    <div>
      <Layout>
        <Home />
      </Layout>
    </div>
  )
}

export default App
