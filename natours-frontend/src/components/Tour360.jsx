// // // import React from 'react';
// // // import { Pannellum } from "pannellum-react";
// // // import { X } from "lucide-react";

// // // const Tour360 = ({ onClose }) => {
// // //   return (
// // //     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md animate-fade-in">
      
// // //       <div className="relative w-full h-full md:w-[90%] md:h-[80%] bg-black border border-white/20 rounded-2xl overflow-hidden shadow-2xl">
        
// // //         {/* Header */}
// // //         <div className="absolute top-0 left-0 z-10 w-full p-4 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
// // //           <h2 className="text-white font-bold text-xl drop-shadow-md">
// // //             👓 360° Virtual View
// // //           </h2>
// // //           <button 
// // //             onClick={onClose}
// // //             className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full backdrop-blur-sm transition"
// // //           >
// // //             <X size={24} />
// // //           </button>
// // //         </div>

// // //         {/* 360 Viewer */}
// // //         <Pannellum
// // //           width="100%"
// // //           height="100%"
// // //           image="https://pannellum.org/images/alma.jpg" // 👈 DEMO 360 IMAGE
// // //           pitch={10}
// // //           yaw={180}
// // //           hfov={110}
// // //           autoLoad
// // //           onLoad={() => {
// // //             console.log("panorama loaded");
// // //           }}
// // //         >
// // //           {/* Hotspots (Optional Markers) */}
// // //           <Pannellum.Hotspot
// // //             type="info"
// // //             pitch={11}
// // //             yaw={-167}
// // //             text="Beautiful Mountain View"
// // //           />
// // //         </Pannellum>

// // //         {/* Instructions */}
// // //         <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/80 bg-black/50 px-4 py-2 rounded-full text-sm backdrop-blur-sm pointer-events-none">
// // //            Drag to look around 🖱️
// // //         </div>

// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Tour360;

// // import React from 'react';
// // import { Pannellum } from "pannellum-react";
// // import { X } from "lucide-react";

// // const Tour360 = ({ tour, onClose }) => {
  
// //   // 🧠 SMART IMAGE SELECTOR LOGIC
// //   const get360Image = () => {
// //     const name = tour.name.toLowerCase();

// //     // 1. Agar tour barf/winter wala hai (e.g., Northern Lights)
// //     if (name.includes("snow") || name.includes("northern") || name.includes("winter")) {
// //       return "https://pannellum.org/images/cerro-toco-0.jpg"; 
// //     }
    
// //     // 2. Agar tour city/indoor type ka hai
// //     if (name.includes("city") || name.includes("sports")) {
// //       return "https://pannellum.org/images/bma-0.jpg";
// //     }

// //     // 3. Default: Forest/Mountain (e.g., Forest Hiker, Sea Explorer)
// //     // (Sea ki achhi free 360 image milna mushkil hai, toh mountain best lagta hai)
// //     return "https://pannellum.org/images/alma.jpg";
// //   };

// //   const imageSrc = get360Image();

// //   return (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md animate-fade-in">
      
// //       <div className="relative w-full h-full md:w-[90%] md:h-[80%] bg-black border border-white/20 rounded-2xl overflow-hidden shadow-2xl">
        
// //         {/* Header */}
// //         <div className="absolute top-0 left-0 z-10 w-full p-4 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
// //           <div className="flex flex-col">
// //             <h2 className="text-white font-bold text-xl drop-shadow-md flex items-center gap-2">
// //               👓 Virtual View
// //             </h2>
// //             {/* Tour ka naam dikha rahe hain taaki real lage */}
// //             <p className="text-green-400 text-xs font-bold uppercase tracking-wider">
// //               {tour.name}
// //             </p>
// //           </div>

// //           <button 
// //             onClick={onClose}
// //             className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full backdrop-blur-sm transition"
// //           >
// //             <X size={24} />
// //           </button>
// //         </div>

// //         {/* 360 Viewer */}
// //         <Pannellum
// //           width="100%"
// //           height="100%"
// //           image={imageSrc} // ✅ Dynamic Image URL
// //           pitch={10}
// //           yaw={180}
// //           hfov={110}
// //           autoLoad
// //           showZoomCtrl={false}
// //         >
// //           <Pannellum.Hotspot
// //             type="info"
// //             pitch={11}
// //             yaw={-167}
// //             text={`Welcome to ${tour.name}`} // ✅ Dynamic Text
// //           />
// //         </Pannellum>

// //         {/* Instructions */}
// //         <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/80 bg-black/50 px-4 py-2 rounded-full text-sm backdrop-blur-sm pointer-events-none border border-white/10">
// //            Drag to explore {tour.name} 🖱️
// //         </div>

// //       </div>
// //     </div>
// //   );
// // };

// // export default Tour360;

// import React from 'react';
// import { X } from "lucide-react";

// const Tour360 = ({ tour, onClose }) => {
  
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md animate-fade-in">
      
//       <div className="relative w-full h-full md:w-[90%] md:h-[80%] bg-black border border-white/20 rounded-2xl overflow-hidden shadow-2xl">
        
//         {/* Header */}
//         <div className="absolute top-0 left-0 z-10 w-full p-4 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
//           <div className="flex flex-col">
//             <h2 className="text-white font-bold text-xl drop-shadow-md flex items-center gap-2">
//               👓 Virtual View
//             </h2>
//             <p className="text-green-400 text-xs font-bold uppercase tracking-wider">
//               {tour?.name || "Tour Preview"}
//             </p>
//           </div>

//           <button 
//             onClick={onClose}
//             className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full backdrop-blur-sm transition"
//           >
//             <X size={24} />
//           </button>
//         </div>

//         {/* ✅ SOLUTION: Direct Iframe (100% Working) */}
//         {/* React Library hata di hai kyunki wo React 19 ke saath crash ho rahi thi */}
//         <iframe 
//           width="100%" 
//           height="100%" 
//           allowFullScreen 
//           style={{ border: 'none' }}
//           src="https://pannellum.org/tp/alma.html" 
//           title="360 View"
//         ></iframe>

//         {/* Instructions */}
//         <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/80 bg-black/50 px-4 py-2 rounded-full text-sm backdrop-blur-sm pointer-events-none border border-white/10">
//            Drag to explore {tour?.name} 🖱️
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Tour360;
import React from 'react';
import { X } from "lucide-react";

const Tour360 = ({ tour, onClose }) => {
  
  // 🧠 SMART IMAGE LOGIC (Tour ke naam se photo choose karega)
  const get360Url = () => {
    const name = tour?.name?.toLowerCase() || "";
    const viewerBase = "https://pannellum.org/pannellum/pannellum.htm?panorama="; // ✅ Official Viewer URL

    // 1. Snow / Winter Tours ❄️
    if (name.includes("snow") || name.includes("northern") || name.includes("winter")) {
      return viewerBase + "https://pannellum.org/images/cerro-toco-0.jpg&autoLoad=true";
    }
    
    // 2. City / Indoor Tours 🏛️
    if (name.includes("city") || name.includes("sports") || name.includes("urban")) {
      return viewerBase + "https://pannellum.org/images/bma-0.jpg&autoLoad=true";
    }

    // 3. Default: Forest / Mountain 🌲
    return viewerBase + "https://pannellum.org/images/alma.jpg&autoLoad=true";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md animate-fade-in">
      
      <div className="relative w-full h-full md:w-[90%] md:h-[80%] bg-black border border-white/20 rounded-2xl overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="absolute top-0 left-0 z-10 w-full p-4 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex flex-col">
            <h2 className="text-white font-bold text-xl drop-shadow-md flex items-center gap-2">
              👓 Virtual View
            </h2>
            <p className="text-green-400 text-xs font-bold uppercase tracking-wider">
              {tour?.name || "Tour Preview"}
            </p>
          </div>

          <button 
            onClick={onClose}
            className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full backdrop-blur-sm transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* ✅ Iframe with Official Pannellum Viewer */}
        <iframe 
          width="100%" 
          height="100%" 
          allowFullScreen 
          style={{ border: 'none' }}
          src={get360Url()} 
          title="360 View"
        ></iframe>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/80 bg-black/50 px-4 py-2 rounded-full text-sm backdrop-blur-sm pointer-events-none border border-white/10">
           Drag to explore {tour?.name} 🖱️
        </div>

      </div>
    </div>
  );
};

export default Tour360;