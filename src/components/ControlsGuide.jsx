import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

function ControlsGuide({ keys, onButtonDown, onButtonUp }) {
  const [settings, setSettings] = useState(false);
  const [musicCard, setMusicCard] = useState(false);
  const [audioFile, setAudioFile] = useState(null);
  const [radioSelect, setRadioSelect] = useState("");

  const handleSettingOnClick = () => setSettings((prev) => !prev);
  const handleMusicCard = () => setMusicCard((prev) => !prev);

  // Music file dictionary
  const musicFiles = {
    "butterfly-effect": "/music/music1.mp3",
    "Countryside": "/music/Countryside.mp3",
  };

  const handleMusicSelect = (music) => {
    if (audioFile) {
      audioFile.pause();
      audioFile.currentTime = 0;
    }

    const musicFile = new Audio(musicFiles[music]);
    musicFile.loop = true;
    musicFile.play();
    setAudioFile(musicFile);
    setRadioSelect(music);
  };

  const handleStopMusic = () => {
    if (audioFile) {
      audioFile.pause();
      audioFile.currentTime = 0;
      setAudioFile(null);
    }
    setRadioSelect("");
  };

  const handleAuthorLink = () => {
    window.open("https://www.youtube.com/@squigglebeats", "_blank")
  };

  return (
    <>
      <div className="absolute w-screen h-40 bg-transparent z-10 top-0 left-0 pointer-events-auto flex flex-row justify-between items-start p-3">
        <div>
          <h4 className="text-gray-700 text-lg font-bold font-mono uppercase tracking-widest mb-2">
            Controls Guide
          </h4>
          <div className="grid grid-cols-2 gap-2 w-44 p-3 rounded-lg shadow-md">
            <div className="col-span-2 flex justify-center">
              <button
                className="bg-green-600 text-white w-16 p-1 rounded-md shadow-sm text-xs font-semibold"
                onMouseDown={() => onButtonDown("w")}
                onMouseUp={() => onButtonUp("w")}
                onTouchStart={() => onButtonDown("w")}
                onTouchEnd={() => onButtonUp("w")}
              >
                W <br />
                <span className="text-[10px] text-gray-200">Forward</span>
              </button>
            </div>
            <div className="col-span-1 flex justify-center">
              <button
                className="bg-green-500 text-white w-14 p-1 rounded-md shadow-sm text-xs font-semibold"
                onMouseDown={() => onButtonDown("a")}
                onMouseUp={() => onButtonUp("a")}
                onTouchStart={() => onButtonDown("a")}
                onTouchEnd={() => onButtonUp("a")}
              >
                A <br />
                <span className="text-[10px] text-gray-200">Left</span>
              </button>
            </div>
            <div className="col-span-1 flex justify-center">
              <button
                className="bg-green-500 text-white w-14 p-1 rounded-md shadow-sm text-xs font-semibold"
                onMouseDown={() => onButtonDown("d")}
                onMouseUp={() => onButtonUp("d")}
                onTouchStart={() => onButtonDown("d")}
                onTouchEnd={() => onButtonUp("d")}
              >
                D <br />
                <span className="text-[10px] text-gray-200">Right</span>
              </button>
            </div>
            <div className="col-span-2 flex justify-center">
              <button
                className="bg-green-600 text-white w-16 p-1 rounded-md shadow-sm text-xs font-semibold"
                onMouseDown={() => onButtonDown("s")}
                onMouseUp={() => onButtonUp("s")}
                onTouchStart={() => onButtonDown("s")}
                onTouchEnd={() => onButtonUp("s")}
              >
                S <br />
                <span className="text-[10px] text-gray-200">Back</span>
              </button>
            </div>
          </div>
        </div>

        <div className="text-gray-700 text-lg font-bold font-mono uppercase tracking-widest mb-2">
          <h3>🎮 GridRunner 🕹️</h3>
        </div>

        <div className="w-44 p-3 rounded-lg shadow-md text-center">
          <h3 className="text-gray-700 text-lg font-bold font-mono uppercase tracking-widest mb-1">Box</h3>
          <p className="text-[10px] font-bold font-mono uppercase tracking-widest text-gray-600">Touch the box to change the color.</p>

          <div className="group pointer-events-auto h-full">
            <h3
              className="font-bold text-gray-700 font-mono border-t border-white mt-1 pt-1 cursor-pointer"
              onClick={handleSettingOnClick}
              aria-label="Toggle Settings"
            >
              Settings ⚙️
            </h3>
            <ul
              className={`list-disc pl-4 transform transition-transform duration-300 ${settings ? "translate-x-0 opacity-100 mb-2" : "translate-x-full opacity-0"}`}
            >
              <li className="text-[10px] font-mono cursor-pointer hover:underline text-gray-600" onClick={handleMusicCard}>Musics</li>
              <li className="text-[10px] font-mono cursor-pointer hover:underline text-gray-600">More Updates will come</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="absolute w-screen h-screen z-20 bg-transparent flex justify-center items-center pointer-events-none">
        <div className={`w-60 h-48 bg-white rounded shadow-lg pointer-events-auto flex flex-col justify-center items-center backdrop-blur-md bg-opacity-30 p-4 ${musicCard ? "" : "hidden"}`}>
          <div className="w-full flex justify-end">
            <AiOutlineClose
              className="text-white text-2xl cursor-pointer"
              onClick={handleMusicCard} />
          </div>
          <h3 className="text-white font-bold font-mono">Select Music</h3>
          <div className="flex justify-center items-center">
            <label htmlFor="butterfly-effect" className="text-white font-mono text-sm mr-2 text-[12px]">
              Butterfly Effect
            </label>
            <input
              type="radio"
              id="butterfly-effect"
              name="effect"
              className="mr-2"
              checked={radioSelect === "butterfly-effect"}
              onChange={() => handleMusicSelect("butterfly-effect")}
            />
          </div>
          <div className="flex justify-center items-center">
            <label htmlFor="Countryside" className="text-white font-mono text-sm mr-2 text-[12px]">
              Countryside
            </label>
            <input
              type="radio"
              id="Countryside"
              name="effect"
              className="mr-2"
              checked={radioSelect === "Countryside"}
              onChange={() => handleMusicSelect("Countryside")}
            />
          </div>
          <div className="flex justify-center items-center mt-5">
            <button className="text-white bg-slate-600 p-2 rounded text-[10px] px-4" onClick={handleStopMusic}>Off</button>
          </div>
          <p className="text-white flex text-[10px] mt-4 text-center">Author of Musics - <span className=" hover:underline cursor-pointer font-mono font-bold text-[10px] pl-1" onClick={handleAuthorLink}>@squigglebeats</span></p>
        </div>
      </div>
    </>
  );
}

export default ControlsGuide;





// import { useEffect, useState, useRef } from "react";
// import { AiOutlineClose } from 'react-icons/ai';

// function ControlsGuide(mobileButtons) {
//   const [settings, setSettings] = useState(false);
//   const [musicCard, setMusicCard] = useState(false);
//   const [audioFile, setAudioFile] = useState(null);
//   const [radioSelect, setRadioSelect] = useState("");
//   const keys = useRef({ w: false, a: false, s: false, d: false });

//   const handleSettingOnClick = () => setSettings((prev) => !prev);
//   const handleMusicCard = () => setMusicCard((prev) => !prev);

//   // Music file dictionary
//   const musicFiles = {
//     "butterfly-effect": "/music/music1.mp3",
//     "Countryside": "/music/Countryside.mp3",
//   };

//   const handleMusicSelect = (music) => {
//     // Pause and reset current audio file if it exists
//     if (audioFile) {
//       audioFile.pause();
//       audioFile.currentTime = 0;
//     }

//     // Play the selected music
//     const musicFile = new Audio(musicFiles[music]);
//     musicFile.loop = true;
//     musicFile.play();
//     setAudioFile(musicFile);
//     setRadioSelect(music);
//   };

//   const handleStopMusic = () => {
//     if (audioFile) {
//       audioFile.pause();
//       audioFile.currentTime = 0;
//       setAudioFile(null);
//     }
//     setRadioSelect(""); // Deselect music
//   };

//   const handleAuthorLink = () => {
//     window.open("https://www.youtube.com/@squigglebeats", "_blank")
//   }
  
//   // Handle button press & release (Touch & Mouse Click)
//   const handleButtonDown = (key) => {
//     keys.current[key] = true;
//   };

//   const handleButtonUp = (key) => {
//     keys.current[key] = false;
//   };

//   return (
//     <>
//       <div className="absolute w-screen h-40 bg-transparent z-10 top-0 left-0 pointer-events-auto flex flex-row justify-between items-start p-3">
//         <div>
//           <h4 className="text-gray-700 text-lg font-bold font-mono uppercase tracking-widest mb-2">
//             Controls Guide
//           </h4>
//           <div className="grid grid-cols-2 gap-2 w-44 p-3 rounded-lg shadow-md">
//             <div className="col-span-2 flex justify-center">
//               <button
//                 className="bg-green-600 text-white w-16 p-1 rounded-md shadow-sm text-xs font-semibold"
//                 onMouseDown={() => handleButtonDown("w")}
//                 onMouseUp={() => handleButtonUp("w")}
//                 onTouchStart={() => handleButtonDown("w")}
//                 onTouchEnd={() => handleButtonUp("w")}
//               >
//                 W <br />
//                 <span className="text-[10px] text-gray-200">Forward</span>
//               </button>
//             </div>
//             <div className="col-span-1 flex justify-center">
//               <button
//                 className="bg-green-500 text-white w-14 p-1 rounded-md shadow-sm text-xs font-semibold"
//                 onMouseDown={() => handleButtonDown("a")}
//                 onMouseUp={() => handleButtonUp("a")}
//                 onTouchStart={() => handleButtonDown("a")}
//                 onTouchEnd={() => handleButtonUp("a")}
//               >
//                 A <br />
//                 <span className="text-[10px] text-gray-200">Left</span>
//               </button>
//             </div>
//             <div className="col-span-1 flex justify-center">
//               <button
//                 className="bg-green-500 text-white w-14 p-1 rounded-md shadow-sm text-xs font-semibold"
//                 onMouseDown={() => handleButtonDown("d")}
//                 onMouseUp={() => handleButtonUp("d")}
//                 onTouchStart={() => handleButtonDown("d")}
//                 onTouchEnd={() => handleButtonUp("d")}
//               >
//                 D <br />
//                 <span className="text-[10px] text-gray-200">Right</span>
//               </button>
//             </div>
//             <div className="col-span-2 flex justify-center">
//               <button
//                 className="bg-green-600 text-white w-16 p-1 rounded-md shadow-sm text-xs font-semibold"
//                 onMouseDown={() => handleButtonDown("s")}
//                 onMouseUp={() => handleButtonUp("s")}
//                 onTouchStart={() => handleButtonDown("s")}
//                 onTouchEnd={() => handleButtonUp("s")}
//               >
//                 S <br />
//                 <span className="text-[10px] text-gray-200">Back</span>
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="text-gray-700 text-lg font-bold font-mono uppercase tracking-widest mb-2">
//           <h3>🎮 GridRunner 🕹️</h3>
//         </div>

//         <div className="w-44 p-3 rounded-lg shadow-md text-center">
//           <h3 className="text-gray-700 text-lg font-bold font-mono uppercase tracking-widest mb-1">Box</h3>
//           <p className="text-[10px] font-bold font-mono uppercase tracking-widest text-gray-600">Touch the box to change the color.</p>

//           <div className="group pointer-events-auto h-full">
//             <h3
//               className="font-bold text-gray-700 font-mono border-t border-white mt-1 pt-1 cursor-pointer"
//               onClick={handleSettingOnClick}
//               aria-label="Toggle Settings"
//             >
//               Settings ⚙️
//             </h3>
//             <ul
//               className={`list-disc pl-4 transform transition-transform duration-300 ${settings ? "translate-x-0 opacity-100 mb-2" : "translate-x-full opacity-0"}`}
//             >
//               <li className="text-[10px] font-mono cursor-pointer hover:underline text-gray-600" onClick={handleMusicCard}>Musics</li>
//               <li className="text-[10px] font-mono cursor-pointer hover:underline text-gray-600">More Updates will come</li>
//             </ul>
//           </div>
//         </div>
//       </div>

//       <div className="absolute w-screen h-screen z-20 bg-transparent flex justify-center items-center pointer-events-none">
//         <div className={`w-60 h-48 bg-white rounded shadow-lg pointer-events-auto flex flex-col justify-center items-center backdrop-blur-md bg-opacity-30 p-4 ${musicCard ? "" : "hidden"}`}>
//           <div className="w-full flex justify-end">
//             <AiOutlineClose
//               className="text-white text-2xl cursor-pointer"
//               onClick={handleMusicCard} />
//           </div>
//           <h3 className="text-white font-bold font-mono">Select Music</h3>
//           <div className="flex justify-center items-center">
//             <label htmlFor="butterfly-effect" className="text-white font-mono text-sm mr-2 text-[12px]">
//               Butterfly Effect
//             </label>
//             <input
//               type="radio"
//               id="butterfly-effect"
//               name="effect"
//               className="mr-2"
//               checked={radioSelect === "butterfly-effect"}
//               onChange={() => handleMusicSelect("butterfly-effect")}
//             />
//           </div>
//           <div className="flex justify-center items-center">
//             <label htmlFor="Countryside" className="text-white font-mono text-sm mr-2 text-[12px]">
//               Countryside
//             </label>
//             <input
//               type="radio"
//               id="Countryside"
//               name="effect"
//               className="mr-2"
//               checked={radioSelect === "Countryside"}
//               onChange={() => handleMusicSelect("Countryside")}
//             />
//           </div>
//           <div className="flex justify-center items-center mt-5">
//             <button className="text-white bg-slate-600 p-2 rounded text-[10px] px-4" onClick={handleStopMusic}>Off</button>
//           </div>
//           <p className="text-white flex text-[10px] mt-4 text-center">Author of Musics - <span className=" hover:underline cursor-pointer font-mono font-bold text-[10px] pl-1" onClick={handleAuthorLink}>@squigglebeats</span></p>
//         </div>
//       </div>
//     </>
//   );
// }

// export default ControlsGuide;
