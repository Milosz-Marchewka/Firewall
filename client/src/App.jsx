import { useState } from "react";
import EntryScreen from "./components/entryScreen/EntryScreen.jsx";
import LobbyScreen from "./components/lobby/LobbyScreen";
import RoomScreen from "./components/room/RoomScreen.jsx";
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const [user, setUser] = useState({id: null});
  console.log(user);
  
  return (
    <>
      <Routes>
        <Route path="/" element={<LobbyScreen user={user} />} />
        <Route path="/room/:token" element={<RoomScreen />} />
        <Route path="/hello" element={<EntryScreen setUser={setUser} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
