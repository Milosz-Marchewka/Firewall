import { useEffect, useState } from "react";
import EntryScreen from "./components/entryScreen/EntryScreen.jsx";
import LobbyScreen from "./components/lobby/LobbyScreen";
import RoomScreen from "./components/room/RoomScreen.jsx";
import Documentation from "./components/documentation/Documentation.jsx";
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

function App() {
  const [user, setUser] = useState({id: null});
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    const loadUser = async () => {
      try {
        const res = await fetch("/api/account/auth", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok){
          navigate("/hello");
          return;
        }
        const data = await res.json();
        if (cancelled) return;
        if (data?.id) {
          console.log(data);
          
          setUser(
            data
          );
        }
      } catch {
      }
    };

    loadUser();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<LobbyScreen user={user} setUser={setUser} />} />
        <Route path="/room/:token" element={<RoomScreen user={user}/>} />
        <Route path="/documentation" element={<Documentation />} />
        <Route path="/hello" element={<EntryScreen user={user} setUser={setUser} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
