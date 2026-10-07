import { useId } from "react";
import "./ServiceIllustration.css";

function BrowserScene({ paint }) {
  return (
    <>
      <g className="si-object si-object--browser" filter={`url(#${paint.shadow})`}>
        <rect x="42" y="24" width="218" height="113" rx="9" fill="white" stroke="#d9d0ea" />
        <path d="M51 24h200a9 9 0 0 1 9 9v11H42V33a9 9 0 0 1 9-9Z" fill="#faf8fe" />
        <path d="M42 44h218" stroke="#e9e3f1" />
        <g fill="#c8b9e1"><circle cx="53" cy="34" r="2" /><circle cx="60" cy="34" r="2" /><circle cx="67" cy="34" r="2" /></g>
        <rect x="115" y="31" width="79" height="6" rx="3" fill="#eee9f6" />
        <rect x="56" y="57" width="17" height="5" rx="2.5" fill="#8c5fe9" />
        <g fill="#e7e0f0"><rect x="212" y="58" width="11" height="3" rx="1.5" /><rect x="227" y="58" width="16" height="3" rx="1.5" /></g>
        <rect x="56" y="77" width="83" height="6" rx="3" fill="#443251" />
        <rect x="56" y="88" width="60" height="6" rx="3" fill="#8861bc" />
        <rect x="56" y="104" width="67" height="3" rx="1.5" fill="#d9d1e3" />
        <rect x="56" y="112" width="51" height="9" rx="4.5" fill={`url(#${paint.purple})`} />
        <rect x="163" y="70" width="81" height="55" rx="7" fill={`url(#${paint.pale})`} />
        <circle cx="203" cy="96" r="17" fill="white" fillOpacity=".75" />
        <path d="m201 78 18 14-14 18-18-14Z" fill={`url(#${paint.purple})`} />
        <path d="m201 78 4 32-18-14Z" fill="#b490ff" fillOpacity=".8" />
        <circle cx="235" cy="80" r="3" fill="#c7b0f4" />
      </g>
      <g className="si-object si-object--float" filter={`url(#${paint.shadow})`}>
        <rect x="234" y="91" width="39" height="34" rx="9" fill="white" stroke="#e8dff5" />
        <path d="m245 106 5 5 12-12" fill="none" stroke="#8860dc" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <path className="si-cursor" d="m48 116 1 20 5-6 8 1Z" fill="#352641" stroke="white" strokeWidth="2.5" strokeLinejoin="round" />
    </>
  );
}

function PhoneScene({ paint }) {
  return (
    <>
      <g className="si-object si-object--phone-back" filter={`url(#${paint.shadow})`}>
        <rect x="79" y="27" width="68" height="119" rx="13" fill="white" stroke="#cfc5de" strokeWidth="1.5" />
        <rect x="84" y="32" width="58" height="109" rx="9" fill="#f5f0fd" />
        <rect x="103" y="35" width="20" height="4" rx="2" fill="#c4b5d7" />
        <circle cx="113" cy="60" r="11" fill="#ded0f9" />
        <path d="m108 60 3 3 6-7" fill="none" stroke="#9263e5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {[82, 98, 114].map((y) => <g key={y}><rect x="91" y={y} width="44" height="12" rx="4" fill="white" /><circle cx="98" cy={y + 6} r="2.5" fill="#c6b1ec" /><rect x="105" y={y + 4.5} width="22" height="3" rx="1.5" fill="#e2daed" /></g>)}
        <rect x="104" y="135" width="18" height="2" rx="1" fill="#c6b9d9" />
      </g>
      <g className="si-object si-object--phone-front" filter={`url(#${paint.shadow})`}>
        <rect x="149" y="11" width="77" height="135" rx="15" fill="white" stroke="#cfc5de" strokeWidth="1.5" />
        <rect x="154" y="16" width="67" height="125" rx="11" fill="#f9f6ff" />
        <rect x="163" y="36" width="49" height="43" rx="8" fill={`url(#${paint.purple})`} />
        <circle cx="175" cy="49" r="4" fill="white" fillOpacity=".9" />
        <rect x="182" y="47" width="20" height="4" rx="2" fill="white" fillOpacity=".5" />
        <rect x="171" y="62" width="31" height="4" rx="2" fill="white" fillOpacity=".85" />
        <rect x="163" y="87" width="27" height="5" rx="2.5" fill="#c1afd9" />
        <rect x="163" y="98" width="49" height="17" rx="5" fill="white" stroke="#e7dff0" />
        <circle cx="171" cy="106.5" r="3" fill="#d6c6f1" />
        <rect x="179" y="105" width="23" height="3" rx="1.5" fill="#e1d8ed" />
        <rect x="163" y="121" width="49" height="9" rx="4.5" fill="#e5d8fc" />
        <rect x="176" y="20" width="23" height="5" rx="2.5" fill="#b9a8cb" />
        <rect x="178" y="135" width="19" height="2" rx="1" fill="#c6b9d9" />
      </g>
      <g className="si-object si-object--float" filter={`url(#${paint.shadow})`}>
        <path d="M218 77h30a9 9 0 0 1 9 9v16a9 9 0 0 1-9 9h-16l-9 6v-6h-5a9 9 0 0 1-9-9V86a9 9 0 0 1 9-9Z" fill="white" stroke="#e5dcf0" />
        <circle cx="223" cy="94" r="2.5" fill="#a37add" /><circle cx="233" cy="94" r="2.5" fill="#bb9be7" /><circle cx="243" cy="94" r="2.5" fill="#d1bced" />
      </g>
      <g className="si-object si-object--badge" filter={`url(#${paint.shadow})`}>
        <rect x="59" y="88" width="29" height="29" rx="9" fill="white" stroke="#dfd7ea" />
        <path d="m67 102 4 4 9-10" fill="none" stroke="#8b60d7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </>
  );
}

const puzzleCells = [
  [0, 0, "#cdb6f5"], [1, 0, "#a477ed"], [2, 0, "#8c55e2"], [3, 0, "#ece5f5"],
  [0, 1, "#f4bc89"], [1, 1, "#a477ed"], [2, 1, "#ece5f5"], [3, 1, "#b7dfcf"],
  [0, 2, "#f1ab72"], [1, 2, "#f4bc89"], [2, 2, "#9dd1bd"], [3, 2, "#a8d8c6"],
  [0, 3, "#ece5f5"], [1, 3, "#ece5f5"], [2, 3, "#c8b1ef"], [3, 3, "#ece5f5"],
];

function GameScene({ paint }) {
  return (
    <>
      <g className="si-object si-object--board" filter={`url(#${paint.shadow})`}>
        <rect x="94" y="19" width="133" height="124" rx="16" fill="white" stroke="#d9cfea" />
        <rect x="103" y="28" width="115" height="106" rx="9" fill="#f4f0fa" />
        {puzzleCells.map(([x, y, color]) => <g key={`${x}-${y}`}><rect x={110 + x * 26} y={35 + y * 24} width="22" height="20" rx="5" fill={color} /><path d={`M${114 + x * 26} ${38 + y * 24}h12`} stroke="white" strokeOpacity=".4" strokeWidth="2" strokeLinecap="round" /></g>)}
      </g>
      <g className="si-object si-object--puzzle" filter={`url(#${paint.shadow})`}>
        <rect x="66" y="55" width="35" height="35" rx="9" fill="#ae87ec" />
        <path d="M73 62h20" stroke="#d8c2fc" strokeWidth="3" strokeLinecap="round" />
        <rect x="66" y="94" width="35" height="35" rx="9" fill="#9e71e3" />
        <path d="M73 101h20" stroke="#cfb4f7" strokeWidth="3" strokeLinecap="round" />
        <rect x="27" y="94" width="35" height="35" rx="9" fill="#b793ed" />
        <path d="M34 101h20" stroke="#dbc7fc" strokeWidth="3" strokeLinecap="round" />
      </g>
      <g className="si-object si-object--float" filter={`url(#${paint.shadow})`}>
        <rect x="242" y="50" width="34" height="34" rx="10" fill="#f2b184" />
        <path d="M250 56h17" stroke="#ffdac0" strokeWidth="3" strokeLinecap="round" />
      </g>
      <path className="si-spark" d="m259 104 3.5 8 8 3.5-8 3.5-3.5 8-3.5-8-8-3.5 8-3.5Z" fill="#b3a1d7" />
      <circle cx="56" cy="43" r="4" fill="#c6b5e4" />
    </>
  );
}

export default function ServiceIllustration({ type = "globe" }) {
  const id = useId().replace(/:/g, "");
  const paint = { shadow: `${id}-shadow`, purple: `${id}-purple`, pale: `${id}-pale` };
  const Scene = type === "phone" ? PhoneScene : type === "game" ? GameScene : BrowserScene;

  return (
    <div className={`service-illustration service-illustration--${type}`} aria-hidden="true">
      <svg viewBox="0 0 320 160" fill="none" focusable="false">
        <defs>
          <linearGradient id={paint.purple} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#a476ef" /><stop offset="1" stopColor="#7137e8" /></linearGradient>
          <linearGradient id={paint.pale} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#f0e6ff" /><stop offset="1" stopColor="#dbcbf8" /></linearGradient>
          <filter id={paint.shadow} x="-40%" y="-30%" width="190%" height="190%"><feDropShadow dx="0" dy="7" stdDeviation="6" floodColor="#604579" floodOpacity=".12" /><feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#604579" floodOpacity=".06" /></filter>
        </defs>
        <ellipse cx="161" cy="132" rx="100" ry="12" fill="#cdb9e9" fillOpacity=".12" />
        <circle cx="166" cy="80" r="63" stroke="#d8cbed" strokeOpacity=".45" />
        <circle cx="166" cy="80" r="75" stroke="#e4daf0" strokeOpacity=".4" strokeDasharray="2 5" />
        <Scene paint={paint} />
      </svg>
    </div>
  );
}
