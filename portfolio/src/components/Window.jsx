import "../styles/Window.css"

export default function Window({code}){
    return(
        <div className="window">
            <div className="topbar">
                <div className="left">
                    <div className="dot-terminal red"></div>
                    <div className="dot-terminal yellow"></div>
                    <div className="dot-terminal green"></div>
                </div>
                <button>Copy</button>
            </div>
            <div className="terminal">{code}</div>
        </div>
    );
}