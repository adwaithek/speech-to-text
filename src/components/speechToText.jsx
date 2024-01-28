import React, { useEffect, useState } from 'react';
import annyang from 'annyang';

function SpeechToText() {
  const [isSpeaking, setIsSpeaking] = useState(false);
const [recPhrase,setRecPhrase]=useState([])
  const startListening = () => {
    if (annyang) {
        annyang.setLanguage('en-IN');
      annyang.start();
    }
  };

  useEffect(() => {
    if (annyang) {
      // Event handler for when speech is recognized
      annyang.addCallback('result', (phrases) => {
        setRecPhrase(phrases)
        console.log('Speech recognized:', phrases);
      });

      
      annyang.addCallback('start', () => {
        console.log('Started speaking');
        setIsSpeaking(true);
      });
 
      annyang.addCallback('end', () => {
        console.log('Not speaking');
        setIsSpeaking(false);
      });

      // Add any commands you want to recognize
    //   annyang.addCommands({
    //     'hello': () => {
    //       console.log('Hello command executed');
    //     },
    //     // Add more commands as needed
    //   });

      return () => {
        // Stop listening and clean up when the component unmounts
        annyang.abort();
      };
    }
  }, []);

  return (
    <div className="App">
      <h1>Speech To Text</h1>
      <p>{isSpeaking ? 'Speaking...' : 'Not speaking'}</p>
      <button onClick={startListening}>Start Listening</button>
      {/* Add your UI components here */}


      <h1>Recognized Phrases:</h1>
      <ul>
        {recPhrase.map((phrase, index) => (
          <li key={index}>{phrase}</li>
        ))}
      </ul>


    </div>
  );
}

export default SpeechToText;
