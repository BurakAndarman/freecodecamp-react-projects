import React from "https://cdn.skypack.dev/react";
import ReactDOM from "https://cdn.skypack.dev/react-dom";
import {useState,useEffect} from "https://cdn.skypack.dev/react";


const App=()=>{
  const [breakTime,setBreakTime]=useState(5);
  const [sessionTime,setSessionTime]=useState(25);
  const [timer,setTimer]=useState(1500);
  const [timerRunning,setTimerRunning]=useState(false);
  const [onSession,setOnSession]=useState(true);
  
  const timeout = setTimeout(()=>{
    if(timer && timerRunning){
      setTimer(prev => {
        prev--;
        return prev;
      })
    }
  },1000);
  
  const play=()=>{
    clearTimeout(timeout);
    setTimerRunning(!timerRunning);
  }
  
  const clock=()=>{
    if(timerRunning){
      timeout;
      resetTimer();
    }
    else{
      clearTimeout(timeout);
    }
  }
  
  const resetTimer=()=>{
    const audio=document.getElementById("beep");
    if(!timer && onSession){
      setOnSession(false);
      setTimer(breakTime*60);
      audio.play();
    }
    else if(!timer && !onSession){
      setOnSession(true);
      setTimer(sessionTime*60);
      audio.pause();
      audio.currentTime=0;
    }
  }
  
  useEffect(()=>{
    clock();
  },[timerRunning,timer,timeout])
  
  const timerFormatter=()=>{
    const minutes = Math.floor(timer/60);
    const seconds = timer - minutes *60;
    
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    
    return `${formattedMinutes}:${formattedSeconds}`;
  }
  
  
  const incrementerDecrementer=(isInc,label="session")=>{
    if(isInc && !timerRunning){
      if(label==="break" && breakTime<60){
        setBreakTime(prev => {
          prev++;
          return prev;
        })
        if(!onSession){
          setTimer(prev=>{
            prev+=60;
            return prev;
          });
        }
      }
      else if(label==="session" && sessionTime<60){
        setSessionTime(prev => {
          prev++;
          return prev;
        })
        if(onSession){
          setTimer(prev=>{
            prev+=60;
            return prev;
          });
        }
      }
    }
    else if(!timerRunning){
      if(label==="break" && breakTime>1){
        setBreakTime(prev => {
          prev--;
          return prev; 
        })
        if(!onSession){
          setTimer(prev=>{
            prev-=60;
            return prev;
          });
        }
      }
      else if(label==="session" && sessionTime>1){
        setSessionTime(prev => {
          prev--;
          return prev;
        })
        if(onSession){
          setTimer(prev=>{
            prev-=60;
            return prev;
          });
        }
      }
    }
  }
  
  
  const reset=()=>{
    clearTimeout(timeout);
    setBreakTime(5);
    setSessionTime(25);
    setTimer(1500);
    setTimerRunning(false);
    setOnSession(true);
    const audio = document.getElementById("beep");
    audio.pause();
    audio.currentTime=0;
  }
    
  
  return(
      <>
        <h1 class="title">Pomodoro Timer</h1>
        <div class="length">
          <div>
            <h2 id="break-label">Break Length</h2>
            <div>
              <button id="break-decrement" onClick={()=>incrementerDecrementer(false,"break")}><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" class="bi bi-arrow-down" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
</svg></button>
              <p id="break-length">{breakTime}</p>
              <button id="break-increment" onClick={()=>incrementerDecrementer(true,"break")}><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" class="bi bi-arrow-up" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
</svg></button>
            </div>
          </div>
          <div>
            <h2 id="session-label">Session Length</h2>
            <div>
               <button id="session-decrement" onClick={()=>incrementerDecrementer(false)}><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" class="bi bi-arrow-down" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
</svg></button>
               <p id="session-length">{sessionTime}</p>
               <button id="session-increment" onClick={()=>incrementerDecrementer(true)}><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" class="bi bi-arrow-up" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
</svg></button>
            </div>
          </div>
        </div>
        <div class="timer">
            <h2 id="timer-label">{onSession ?  "Session" : "Break"}</h2>
            <p id="time-left">{timerFormatter()}</p>
            <button id="start_stop" onClick={()=>play()}>{timerRunning ? <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" class="bi bi-pause-fill" viewBox="0 0 16 16">
  <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>
</svg> : <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" class="bi bi-play-fill" viewBox="0 0 16 16">
  <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
</svg>}</button>
            <button id="reset" onClick={()=>reset()}><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
  <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
</svg></button>
        </div>
        <audio
            id="beep"
            preload="auto"
            src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
      </>
  
  )
  
  
}


ReactDOM.render(<App/>,document.getElementById("root"));