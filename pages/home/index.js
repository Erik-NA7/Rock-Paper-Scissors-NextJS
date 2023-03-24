import { useEffect, useState } from "react";
import HomeLayout from "./HomeLayout";
import cookie from "js-cookie";
import { useAuth } from "../../context/authContext";


function Home() {
  
  const [ greeting, setGreeting ] = useState("");
  
  const { isAuthenticated, user } = useAuth(); 
  
  const GameHistory = () => {
    const lastGame = cookie.get("lastGame")
    if (lastGame) {
      return (
        <h3>You gained {lastGame} points from your last game</h3>
      )
    } else {
      return null
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      setGreeting(user.username);
    } else {
      setGreeting("Visitor");
    }
  }, [isAuthenticated, user.username])

  return (
    <div className="homeWrapper">
      <div className="home-welcome">
      <h2>Welcome, {greeting}</h2> 
      <GameHistory/>
      </div>
    </div>
  );
}

Home.Layout = HomeLayout;

export default Home;
