import { useEffect, useState } from "react"
import { io } from 'socket.io-client';
import GameBoard from "./GameBoard";
import Join from "./Join";


const url = `https://tic-tac-toe-service-01.herokuapp.com`
// const url = "http://localhost:8080"

const socket = io(url, { transport: ['websocket'] });

function App() {
  const [state, setState] = useState({
    is_loading: false,
    room: null,
    user: null,
  })


  // function handleClick(flag) {
  //   const data = {
  //     admin: flag || false
  //   }
  //   state?.socket?.emit("response", data, response => {
  //     // console.log(response);
  //     setState({ ...state, list: [...response] })
  //   })
  // }


  function on_create_room(arg) {
    socket.emit("createRoom", arg, response => {
      // console.log(response);
      setState({ ...state, room: response?.room || null, user: response?.user || null })
    })
  }

  function on_join_room(arg) {
    socket.emit("joinRoom", arg, response => {
      // console.log(response);
      if (!response) alert("Fail to join!")
      setState({ ...state, room: response?.room || null, user: response?.user || null })
    })
  }




  return (
    <>
      <header className="header shadow" >
        Tic Tac Toe
      </header>
      <div className="container">
        {
          state?.is_loading ?
            <div className="text-center my-3" >
              <h5 className="text-light" >
                Loading......
              </h5>
            </div>
            :
            socket ?
              state?.room ?
                <GameBoard data={state} socket={socket} />
                :
                <Join createRoom={on_create_room} joinRoom={on_join_room} />
              :
              <div className="text-center my-3" >
                <h4 className="text-danger" >
                  Connection fail!
                </h4>
              </div>
        }
      </div>
    </>
  );
}

export default App;
