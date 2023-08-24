// import { useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Screen/Login/Login.tsx";
// import client from "./supabase/client.tsx";

function App() {
  // useEffect(() => {
  //   client.auth.onauthStateChange((event, session) => {
  //     console.log(event, session);
  //   });
  // }, []);

  return (
    <div style={{ display: "flex" }}>
      <Login />
    </div>
  );
}

export default App;
