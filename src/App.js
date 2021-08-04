import React, {useState, useEffect} from "react";
import io from "socket.io-client";
import './App.css';
import audioFile from "./test.mp3.mp3";

const socket = io.connect("http://localhost:3001");

const audio = new Audio();

function App() {
    const [role,setRole] = useState('');
    //feedback to the user
    const[playing,setPlaying] = useState('');

    useEffect(() =>{

        function recieveMessage(m) {
            console.log(m);
            if(role === 'server'){
                audio.src = m.path;
                audio.play();
            }
            setPlaying(m.name)
        }
        //recieve message
        socket.on('play', recieveMessage);
        return () => {
            socket.off('play', recieveMessage);
        }
    }, [role]);

    function handlePlaySound(){
        socket.emit('play', {name: 'Test sound 1',path:'audioFile'})
    }

  return (
    <div className="App">
     <h1>Soundbot</h1>
        <div>
            <h4>Role</h4>
            <button onClick={() => setRole('client')}>Client</button>
            <button onClick={() => setRole('server')}>Server</button>
        </div>
        <div>
            <h4>Choose sound</h4>
            <button onClick={handlePlaySound}>Play sound!</button>
        </div>
        <div>
            <h4>Playing {playing}</h4>
        </div>

    </div>
  );
}

export default App;
