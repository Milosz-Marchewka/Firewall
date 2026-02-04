import { useEffect, useState } from "react";
import EntryScreen from "./components/entryScreen/EntryScreen.jsx";
import LobbyScreen from "./components/lobby/LobbyScreen";
import RoomScreen from "./components/room/RoomScreen.jsx";
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
          setUser({
            id: data.id,
            username: data?.username || `Guest ${data.id}`,
            level: data?.level ?? 0,
            levelPoints: data?.levelPoints ?? 0,
          });
        }
      } catch {
      }
    };

    loadUser();
    return () => {
      cancelled = true;
    };
  }, []);

  console.log("USER: ", user);
  

  return (
    <>
      <Routes>
        <Route path="/" element={<LobbyScreen user={user} />} />
        <Route path="/room/:token" element={<RoomScreen user={user}/>} />
        <Route path="/hello" element={<EntryScreen user={user} setUser={setUser} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
