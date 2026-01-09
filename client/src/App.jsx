import LobbyScreen from "./components/lobby/LobbyScreen";
import RoomScreen from "./components/room/RoomScreen.jsx";
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LobbyScreen />} />
        <Route path="/room/:token" element={<RoomScreen />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
