//components
import './App.css'
import Home from './containers/home.container'
import { Layout } from './containers/layout.container'

//css
import 'leaflet/dist/leaflet.css'

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
