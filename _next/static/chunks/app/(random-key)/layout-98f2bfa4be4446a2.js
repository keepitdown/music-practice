(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[418],{2382:function(t,e,n){Promise.resolve().then(n.bind(n,8050))},8050:function(t,e,n){"use strict";n.r(e),n.d(e,{default:function(){return RandomKeyLayout}});var s=n(7437),o=n(7219),r=n.n(o);function SettingsIcon(t){let{width:e,height:n,addStyles:o,title:r}=t;return(0,s.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"10 10 44 44",width:e,height:n,className:o,children:[(0,s.jsx)("title",{children:r}),(0,s.jsx)("path",{d:"M52.34 28.02A2 2 0 0 1 54 30v4.02a2 2 0 0 1-1.66 1.97l-3.47.6c-.39 1.45-.96 2.84-1.7 4.12l2.02 2.87a2 2 0 0 1-.21 2.57l-2.84 2.83a2 2 0 0 1-2.57.22l-2.87-2.02a17.4 17.4 0 0 1-4.13 1.7l-.6 3.47A2 2 0 0 1 34.02 54h-4.02a2 2 0 0 1-1.97-1.66l-.6-3.47c-1.45-.39-2.84-.96-4.12-1.7l-2.87 2.02a2 2 0 0 1-2.57-.22l-2.83-2.83a2 2 0 0 1-.22-2.57l2.02-2.87a17.36 17.36 0 0 1-1.7-4.13l-3.47-.6A2 2 0 0 1 10 34.02v-4.02a2 2 0 0 1 1.66-1.97l3.46-.6c.4-1.45.97-2.84 1.71-4.12l-2.02-2.87a2 2 0 0 1 .22-2.57l2.83-2.83a2 2 0 0 1 2.57-.22l2.87 2.02a17.4 17.4 0 0 1 4.13-1.7l.6-3.47A2 2 0 0 1 29.98 10h4.02a2 2 0 0 1 1.97 1.66l.6 3.46c1.45.4 2.84.97 4.12 1.71l2.87-2.02a2 2 0 0 1 2.57.22l2.83 2.83a2 2 0 0 1 .22 2.57l-2.02 2.87a17.36 17.36 0 0 1 1.7 4.13l3.47.6zM32 40a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"})]})}function SettingsButton(t){let{onClick:e,addStyles:n,disabled:o}=t;return(0,s.jsx)("button",{type:"button",onClick:t=>{e(t),t.currentTarget.classList.remove(r().pressed),t.currentTarget.offsetHeight,t.currentTarget.classList.add(r().pressed)},onAnimationEnd:t=>{t.currentTarget.classList.remove(r().pressed)},className:r().button+(n?" "+n:""),disabled:o,children:(0,s.jsx)(SettingsIcon,{title:"Настройки",width:44,height:44,addStyles:r().buttonIcon})})}var a=n(2265),i=n(8471),u=n.n(i),c=n(2406),l=n.n(c);function Sidebar(t){let{children:e,isOpen:n,setShowSettings:o}=t;return(0,s.jsx)("div",{className:l().overlay+(n?" "+l().show:""),onClick:t=>{t.target===t.currentTarget&&o(!1)},children:(0,s.jsx)("div",{className:l().content+(n?" "+l().show:""),children:e})})}var m=n(3890),h=n(7330),d=JSON.parse('{"qj":100,"O8":25,"R4":20,"d7":40}');let Metronome=class Metronome{get tempo(){return this._tempo}set tempo(t){if(t<1||t>1e3)throw RangeError("Tempo value must must be between 1 and 1000");this._tempo=t}get volume(){return this._volume}set volume(t){if(t<0||t>d.R4)throw RangeError("Volume value must be between 0 and ".concat(d.R4));this._volume=t,this._gain=function(t){if(0===t)return 0;let e=d.d7/d.R4,n=(t-d.R4)*e;return Math.pow(10,n/20)}(t)}remove(){this._context&&this._context.close()}async loadSamples(){try{let[t,e]=await function(t){let e=t.map(async t=>{let e=await fetch(t),n=await e.arrayBuffer();return n});return Promise.all(e)}(["/audio/downbeat-click.wav","/audio/beat-click.wav"]);return this._sampleBuffers={downBeat:t,beat:e},"success"}catch(t){return t}}async start(){let t;if(!this._sampleBuffers)return console.error("Samples are not loaded"),null;if(!this._context){this._context=new AudioContext;let[t,e]=await function(t,e){let n=t.map(async t=>await e.decodeAudioData(t));return Promise.all(n)}([this._sampleBuffers.downBeat,this._sampleBuffers.beat],this._context);this._samples={downBeat:t,beat:e},this._context.resume()}let e=d.qj/1e3;this._beat=0;let n=60/this._tempo,s=this._context.currentTime,schedulePlayback=()=>{for(;s<=this._context.currentTime+e;){this.beatsPerBar?this._beat=this._beat<this.beatsPerBar?this._beat+1:1:this._beat=0;let e=1===this._beat?this._samples.downBeat:this._samples.beat;!function(t,e,n,s){let o=e.createBufferSource();o.buffer=t;let r=e.createGain();r.gain.value=n,o.connect(r).connect(e.destination),o.start(s)}(e,this._context,this._gain,s),s=(t=s)+n}};schedulePlayback();let scheduleRepeatedly=()=>{n=60/this._tempo,s=t+n,schedulePlayback(),this._timerId=setTimeout(scheduleRepeatedly,d.O8)};scheduleRepeatedly()}stop(){clearTimeout(this._timerId)}constructor({tempo:t,beatsPerBar:e,volume:n}){this._context=null,this._sampleBuffers=null,this._samples=null,this._beat=0,this.tempo=t,this.beatsPerBar=e,this.volume=n}};var f=n(7685),p=n(5125),_=n(8995),b=n.n(_),g=n(6341);function MetronomeButton(t){let{metronomeIsOn:e,onClick:n,addStyles:o,disabled:r}=t,i=(0,m.Dv)(h.bj),[u,c]=(0,a.useState)(null),l=(0,m.Dv)(h.ZC);return(0,a.useEffect)(()=>{l||c(i.tempo)},[i,l,c]),(0,s.jsxs)("button",{type:"button",className:b().button+(o?" "+o:""),onClick:t=>{n(t),t.currentTarget.classList.remove(b().pressed),t.currentTarget.offsetHeight,t.currentTarget.classList.add(b().pressed)},onAnimationEnd:t=>{t.currentTarget.classList.remove(b().pressed)},disabled:r,children:[(0,s.jsx)(g.Z,{addStyles:b().buttonIcon,width:38,height:38,title:(e?"Выключить":"Включить")+" метроном"}),(0,s.jsx)("span",{className:b().tempoValue,children:u})]})}function RandomKeyLayout(t){let{children:e,settings:n}=t,[o,r]=(0,m.KO)(h.ZC),[i,c]=(0,f.It)(h.bj),l=function(t){let{initTempo:e,initBeatsPerBar:n,initVolume:s}=t,o=(0,a.useRef)(null),[r,i]=(0,a.useState)(!1),[u,c]=(0,a.useState)(e),[l,m]=(0,a.useState)(s),[h,d]=(0,a.useState)(n),[f,p]=(0,a.useState)("loading");return(0,a.useEffect)(()=>(o.current=new Metronome({tempo:e,beatsPerBar:n,volume:s}),o.current.loadSamples(),()=>{var t;return null===(t=o.current)||void 0===t?void 0:t.remove()}),[]),(0,a.useEffect)(()=>{o.current&&(r?o.current.start():o.current.stop())},[r]),(0,a.useEffect)(()=>{o.current&&(o.current.tempo=u)},[u]),(0,a.useEffect)(()=>{o.current&&(o.current.volume=l)},[l]),(0,a.useEffect)(()=>{o.current&&(o.current.beatsPerBar=h)},[h]),{setIsOn:i,setTempo:c,setVolume:m,setBeatsPerBar:d,status:f,isOn:r}}({initTempo:i.tempo,initVolume:i.volume,initBeatsPerBar:4}),d=(0,a.useCallback)(()=>{r(!o)},[r,o]);(0,a.useEffect)(()=>{let handleSettingsHotKey=t=>{"KeyS"===t.code&&d()};return window.addEventListener("keydown",handleSettingsHotKey),()=>{window.removeEventListener("keydown",handleSettingsHotKey)}},[d]),(0,a.useEffect)(()=>{l.setTempo(i.tempo),l.setVolume(i.volume),l.setBeatsPerBar(i.beatsPerBar)},[i,l]);let _=(0,a.useCallback)(t=>{"Space"===t.code&&(t.preventDefault(),l.setIsOn(t=>!t)),"ArrowUp"===t.code&&(t.preventDefault(),c(t=>{t.volume<p.gr&&t.volume++})),"ArrowDown"===t.code&&(t.preventDefault(),c(t=>{t.volume>p.X8&&t.volume--})),"ArrowLeft"===t.code&&(t.preventDefault(),c(t=>{t.tempo>p.HS&&t.tempo--})),"ArrowRight"===t.code&&(t.preventDefault(),c(t=>{t.tempo<p.xj&&t.tempo++}))},[l,c]);return(0,a.useEffect)(()=>(window.addEventListener("keydown",_),()=>{window.removeEventListener("keydown",_)}),[_]),(0,s.jsxs)("main",{children:[e,(0,s.jsx)(Sidebar,{isOpen:o,setShowSettings:r,children:n}),(0,s.jsx)(MetronomeButton,{metronomeIsOn:l.isOn,onClick:()=>{l.setIsOn(t=>!t)},addStyles:u().metronomeButton}),(0,s.jsx)(SettingsButton,{onClick:d,addStyles:u().optionsButton})]})}},6341:function(t,e,n){"use strict";n.d(e,{Z:function(){return MetronomeIcon}});var s=n(7437);function MetronomeIcon(t){let{width:e,height:n,addStyles:o,title:r}=t;return(0,s.jsxs)("svg",{viewBox:"0 0 800 800",xmlns:"http://www.w3.org/2000/svg",width:e,height:n,className:o,children:[(0,s.jsx)("title",{children:r}),(0,s.jsx)("path",{d:"M319 50c-8 0-16 7-18 14L133 735c-2 8 3 14 11 14h532c8 0 13-6 11-14L517 64c-2-7-10-14-18-14Zm86 45c8 0 14 6 14 14v109h13c9-1 13 5 10 12l-15 40-7 8 2 333a14 14 0 0 1-29 0l-2-333-6-8-17-39c-3-7 1-13 9-13h14V109c0-8 6-14 14-14z"})]})}},7330:function(t,e,n){"use strict";n.d(e,{Lx:function(){return i},Uq:function(){return r},ZC:function(){return a},bj:function(){return u}});var s=n(7665),o=n(7726);globalThis.jotaiAtomCache=globalThis.jotaiAtomCache||{cache:new Map,get(t,e){return this.cache.has(t)?this.cache.get(t):(this.cache.set(t,e),e)}};let r=globalThis.jotaiAtomCache.get("C:\\Users\\Артем\\Documents\\Web Dev\\music-practice\\src\\state\\atoms.ts/keysAtom",(0,o.O4)("selectedKeys",{natural:{c:!0,d:!0,e:!0,f:!0,g:!0,a:!0,b:!0},sharp:{c:!1,d:!1,e:!1,f:!1,g:!1,a:!1,b:!1},flat:{c:!1,d:!1,e:!1,f:!1,g:!1,a:!1,b:!1}})),a=globalThis.jotaiAtomCache.get("C:\\Users\\Артем\\Documents\\Web Dev\\music-practice\\src\\state\\atoms.ts/settingsSidebarAtom",(0,s.cn)(!1)),i=globalThis.jotaiAtomCache.get("C:\\Users\\Артем\\Documents\\Web Dev\\music-practice\\src\\state\\atoms.ts/settingsTabAtom",(0,o.O4)("settingsTab","keys")),u=globalThis.jotaiAtomCache.get("C:\\Users\\Артем\\Documents\\Web Dev\\music-practice\\src\\state\\atoms.ts/metronomeAtom",(0,o.O4)("metronomeSettings",{volume:20,tempo:60,beatsPerBar:4}))},5125:function(t,e,n){"use strict";n.d(e,{C1:function(){return s},HS:function(){return a},X8:function(){return o},gr:function(){return r},xj:function(){return i}});let s={natural:"♮",sharp:"♯",flat:"♭"},o=0,r=20,a=20,i=180},8471:function(t){t.exports={metronomeButton:"layout_metronomeButton__t5Osw",optionsButton:"layout_optionsButton__mX_Me"}},8995:function(t){t.exports={button:"metronome-button_button__Dq38s",buttonIcon:"metronome-button_buttonIcon__BqJAn",pressed:"metronome-button_pressed__r4y1F","light-up":"metronome-button_light-up__N64WV",tempoValue:"metronome-button_tempoValue__5xHNn"}},7219:function(t){t.exports={button:"settings-button_button__vBZfe",buttonIcon:"settings-button_buttonIcon__vrYN4",pressed:"settings-button_pressed__t8G7Q","light-up":"settings-button_light-up__U0HSo"}},2406:function(t){t.exports={overlay:"sidebar_overlay__7L6Hi",show:"sidebar_show__icGaw",content:"sidebar_content__Ry6tS"}}},function(t){t.O(0,[901,726,685,971,472,744],function(){return t(t.s=2382)}),_N_E=t.O()}]);