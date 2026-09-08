import "../styles/Code.css"
import Window from "./Window";
import CompetentRender from "./CompetentRender";

export default function Code_Visual({title, codes, generator}){
  const Code = (
    <pre>
        <code>{codes}</code>
    </pre>
    );


    const alignText =
  "p-5 text-center flex flex-col items-center justify-center text-[1.2rem] font-semibold border-[3px] border-black transition-all duration-300 ease-in-out";

const hoverEffect =
  "hover:shadow-[10px_10px_#000] hover:scale-[0.95]";

// return (
//   <div
//     className={`
//       flex flex-col h-[85vh] w-full
//       transition-all duration-300 ease-in-out
//       ${hoverEffect}
//     `}
//   >
//     <div
//       className={`
//         h-[20px] p-[10px] bg-[#ffb52b]
//         ${alignText}
//       `}
//     >
//       <h2>{title}</h2>
//     </div>

//     <div className="flex h-[82vh]">
//       <div
//         className={`
//           flex-1 pr-5 bg-[#F3C178]
//           grid place-items-center
//           ${alignText}
//         `}
//       >
//         <CompetentRender generator={generator} />
//       </div>

//       <div
//         className={`
//           flex-[2] pr-5 bg-[#FE5E41]
//           ${alignText}
//         `}
//       >
//         <h3>Sidebar</h3>
//         <p>This is the Box</p>
//         <Window code={Code}/>
//       </div>
//     </div>
//   </div>
// );

    return(
        <div className="content Hover">
            <div className="card-title alignText">
                <h2>{title}</h2>
            </div>
            <div className="content-inner">
                <div className="card-about alignText">
                    <CompetentRender generator={generator} />
                </div>
                <div className="sidebar alignText">
                    <h3>Sidebar</h3>
                    <p>This is the code content inside code box.</p>
                    <Window code={Code}/>
                </div>
            </div>
        </div>
    );
}