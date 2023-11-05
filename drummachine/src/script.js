import React from "https://cdn.skypack.dev/react";
import ReactDOM from "https://cdn.skypack.dev/react-dom";
import {useState,useEffect} from "https://cdn.skypack.dev/react";

const soundSource=[
    {
      "id":"bg-clap",
      "src":"https://res.cloudinary.com/df6xomy8c/video/upload/v1649938506/Bg-clap_q1fb7e.wav",
      "letter":"Q"
    },
    {
      "id":"biggest-clap",
      "src":"https://res.cloudinary.com/df6xomy8c/video/upload/v1649938527/biggest-clap_ktphbe.wav",
      "letter":"W"
    },
    {
      "id":"curiouscym",
      "src":"https://res.cloudinary.com/df6xomy8c/video/upload/v1649938536/curiouscym2_u3gryk.wav",
      "letter":"E"
    },
    {
      "id":"brighterch",
      "src":"https://res.cloudinary.com/df6xomy8c/video/upload/v1649938544/brighterchh_p1ygoj.wav",
      "letter":"A"
    },
    {
      "id":"808bd3",
      "src":"https://res.cloudinary.com/df6xomy8c/video/upload/v1649938558/808bd3_nj6taq.wav",
      "letter":"S"
    },
    {
      "id":"action-kick",
      "src":"https://res.cloudinary.com/df6xomy8c/video/upload/v1649938562/action-kick_h4voli.wav",
      "letter":"D"
    },
    {
      "id":"apocalypse-kick",
      "src":"https://res.cloudinary.com/df6xomy8c/video/upload/v1649938571/apocalypse-kick_mnkdne.wav",
      "letter":"Z"
    },
    {
      "id":"baroque-kick",
      "src":"https://res.cloudinary.com/df6xomy8c/video/upload/v1649938578/baroque-kick_nikrfp.wav",
      "letter":"X"
    },
    {
      "id":"bacic-ekick",
      "src":"https://res.cloudinary.com/df6xomy8c/video/upload/v1649938590/basic-ekick_a1xlbt.wav",
      "letter":"C"
    }
]


const App=()=>{
  const [status,setStatus]=useState(true);
  const [keyString,setKeyString]=useState("");
  
  
  const handleChange=(id)=>{
     setKeyString(id);
  }
  
  const handleClick=()=>{
    if(status){
      setStatus(false);
    }
    else{
      setStatus(true);
    }
  }
  
  return (
    <>
      <div id="drum-machine">
        <div className="drum-wrapper">
         <div className="drum">
          {
            soundSource.map((value)=> <DrumKey id={value.id} src={value.src} letter={value.letter} onChange={handleChange} lock={status}/>) 
          }
         </div>
        </div>        
        <div className="otherWrapper">
          <div className="keyDisplayWrapper"><p id="display">{ status ? keyString : ""}</p></div>
          <button type="button" onClick={handleClick} id="onOffButton">On/Off</button>
        </div>
      </div>
    </>  
  ) 
  
}

const DrumKey=(props)=>{
  
  const handleClick=(event)=>{
    if(event.key===props.letter.toLowerCase() || event.key.toUpperCase()===props.letter){
       play();
    }
  }
  
  useEffect(()=>{
    document.addEventListener('keydown',handleClick)
    return () => {
      document.removeEventListener('keydown', handleClick);
    };
  })
  
  const play=()=>{
    if(props.lock){
      const sound=document.getElementById(props.letter);
      sound.play();
      props.onChange(props.id);
    }
  }
  
  
  return(
       <button type="button" 
               className="drum-pad"
               id={props.id}
               onClick={play}>
               {props.letter}
               <audio src={props.src} 
                 className="clip" 
                 id={props.letter}
                 type="audio/vaw"/>
       </button>
  )
}


ReactDOM.render(<App/>,document.getElementById("root"));