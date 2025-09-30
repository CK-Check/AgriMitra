import InputDashboard from './components/InputDashboard'
import './App.css'

function App() {
  return (
    <>
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl pt-10 font-bold text-gray-800 mb-2">AgriMitra</h1>
          <p className="text-gray-600">Smart Agriculture Solutions</p>
        </div>
        <InputDashboard />
      </div>
    </div>
    </>
  )
}

export default App
