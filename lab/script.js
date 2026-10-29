
'use strict';
// KO Lab v0.3: lightweight OS-inspired project window. No backend or executable shell.
// Project URLs remain relative to the existing GitHub Pages repo.
const APPS = {
  about:{icon:'▤',file:'PROFILE.TXT',category:'PROFILE / SYSTEM INFO',title:'About & Skills',description:'I study Real-Time Interactive Simulation and have a Diploma in Cybersecurity & Digital Forensics. I enjoy systems programming, graphics, networking and secure software.',tags:['C++','PYTHON','SYSTEMS','CYBERSECURITY'],links:[['About Me','../index.html#about'],['Technical Skills','../index.html#toolkit']],preview:'about',status:'PROFILE LOADED'},
  terminal:{icon:'>_',file:'TERMINAL.EXE',category:'TOOLS / CONSOLE',title:'Lab Terminal',description:'The lab console will let visitors navigate using commands such as help, projects, whoami and open netlens. The full command interpreter arrives in Milestone 3.',tags:['CONSOLE','COMMAND ROUTER','PLANNED'],links:[['Explore Projects','../index.html#work']],preview:'terminal',status:'PREVIEW / COMING IN MILESTONE 3'},
  netlens:{icon:'⌁',file:'NETLENS.EXE',category:'SECURITY / PACKET ANALYSIS',title:'NetLens',description:'Offline PCAP analysis using Python and Scapy, with protocol and port reports, TXT/JSON export, a SYN port-scan heuristic and four automated tests.',tags:['PYTHON','SCAPY','WIRESHARK','UNITTEST'],links:[['Read Case Study','../projects/netlens.html'],['GitHub','https://github.com/kervino/NetLens']],preview:'netlens',status:'SYNTHETIC DATA / NOT LIVE TRAFFIC'},
  wayforge:{icon:'⌖',file:'WAYFORGE.SYS',category:'SOFTWARE / NAVIGATION',title:'Wayforge',description:'A team-built indoor navigation system. My work spans C++ and Unity native integration and the backend APIs connecting building data and route requests to the engine.',tags:['C++20','UNITY','C#','TYPESCRIPT'],links:[['View Project','../projects/wayforge.html']],preview:'wayforge',status:'ILLUSTRATIVE ROUTE / NOT LIVE MAP'},
  graphics:{icon:'▣',file:'GRAPHICS.LAB',category:'ENGINEERING / REAL-TIME GRAPHICS',title:'Graphics Lab',description:'C++ and OpenGL rendering experiments, including the custom 2D game engine for Rock & Ghoul, shaders, sprites, framebuffers and editor tooling.',tags:['C++17','OPENGL','SHADERS'],links:[['Explore Graphics','../projects/graphics.html']],preview:'graphics',status:'GRAPHICS PROJECT DIRECTORY'},
  systems:{icon:'▥',file:'SYSTEMS.LAB',category:'SYSTEMS / PERFORMANCE',title:'Systems Lab',description:'Systems programming and performance experiments: scalar and loop-unrolled dot products, SIMD, pthreads, profiling and optimization trade-offs.',tags:['C','SIMD','PTHREADS','PROFILING'],links:[['Performance Case Study','../projects/dot-product.html']],preview:'systems',status:'SYSTEMS PROJECT DIRECTORY'},
  resume:{icon:'▤',file:'RESUME.PDF',category:'CAREER / PROFILE',title:'Resume',description:'My resume will open here when a verified, public PDF has been added to this website. For now, visit the classic portfolio and project case studies.',tags:['RESUME','PDF','PENDING UPLOAD'],links:[['Classic Portfolio','../index.html']],preview:'resume',status:'PDF NOT YET PUBLISHED'},
  contact:{icon:'✉',file:'CONTACT.MSG',category:'NETWORK / CONTACT',title:'Get in Touch',description:'Interested in my systems, cybersecurity or graphics projects? Visit my GitHub profile or connect with me on LinkedIn.',tags:['GITHUB','LINKEDIN'],links:[['LinkedIn','https://www.linkedin.com/in/kervin-ong/'],['GitHub','https://github.com/kervino']],preview:'contact',status:'PUBLIC PROFILE LINKS'}
};
// All previews are decorative or explicitly labeled synthetic; none are generated from visitor data.
const PREVIEWS = {
  netlens:`<div class="preview-header"><span>NETLENS :: ANALYZER</span><span>DEMO</span></div><div class="preview-screen"><div class="preview-caption">PROTOCOL DISTRIBUTION · SYNTHETIC SAMPLE</div><div class="traffic-row"><span>TCP</span><div><i style="width:61%"></i></div><b>34</b></div><div class="traffic-row"><span>UDP</span><div><i style="width:32%"></i></div><b>18</b></div><div class="traffic-row"><span>OTHER</span><div><i style="width:7%"></i></div><b>4</b></div><div class="preview-alert"><span>●</span> SYN SCAN HEURISTIC <strong>READY</strong></div><div class="preview-console">&gt; parse capture.pcap<br>&gt; export summary.json<span class="preview-cursor">_</span></div></div>`,
  wayforge:`<div class="preview-header"><span>WAYFORGE :: ROUTING</span><span>SCHEMATIC</span></div><div class="route-preview"><div class="route-grid"><div class="route-line"></div><span class="route-node start">A</span><span class="route-node mid">●</span><span class="route-node end">B</span><span class="route-corner one"></span><span class="route-corner two"></span></div><div class="route-label">L1 / CORRIDOR / STEP-FREE</div><div class="route-info">ENGINE API <strong>CONNECTED IN PROJECT</strong></div></div>`,
  graphics:`<div class="preview-header"><span>GRAPHICS :: RENDER LAB</span><span>OPENGL</span></div><div class="graphics-preview"><div class="graphic-panel"><div class="graphic-sun"></div><div class="graphic-hill h1"></div><div class="graphic-hill h2"></div><div class="graphic-grid"></div></div><div class="graphics-stats"><span>RENDER PIPELINE</span><span>SHADERS / SPRITES</span><span>FRAMEBUFFERS</span></div></div>`,
  systems:`<div class="preview-header"><span>SYSTEMS :: PROFILER</span><span>LOCAL</span></div><div class="systems-preview"><p>// DOT PRODUCT IMPLEMENTATIONS</p><div><span>SCALAR</span><i>BASELINE</i></div><div><span>UNROLLED</span><i>LOOP</i></div><div><span>SIMD / SSE2</span><i>VECTOR</i></div><div><span>PTHREADS</span><i>PARALLEL</i></div><small>Explore the case study for actual measurements.</small></div>`,
  terminal:`<div class="preview-header"><span>KO-LAB :: TERMINAL</span><span>PREVIEW</span></div><div class="terminal-preview"><span>KO LAB [v0.3]</span><br><span class="dim">Welcome, visitor.</span><br><br><span>visitor@ko:~$ </span><strong>help</strong><br><span class="dim">projects · whoami · skills<br>open &lt;project&gt; · contact</span><br><br><span>visitor@ko:~$ </span><em>_</em></div>`,
  about:`<div class="preview-header"><span>KO LAB :: PROFILE</span><span>ABOUT</span></div><div class="profile-preview"><span class="profile-symbol">KO</span><div><span>REAL-TIME INTERACTIVE SIMULATION</span><strong>ENGINEERING / SYSTEMS</strong></div><div><span>CYBERSECURITY & DIGITAL FORENSICS</span><strong>SECURITY FOUNDATIONS</strong></div></div>`,
  resume:`<div class="preview-header"><span>KO LAB :: DOCUMENTS</span><span>01</span></div><div class="file-preview"><div class="paper-icon">≡<small>PDF</small></div><p>RESUME.PDF</p><small>Awaiting published file</small></div>`,
  contact:`<div class="preview-header"><span>KO LAB :: NETWORK</span><span>CONNECT</span></div><div class="contact-preview"><div class="contact-orbit">@<span class="contact-dot d1"></span><span class="contact-dot d2"></span></div><p>LET'S CONNECT</p><small>GitHub / LinkedIn</small></div>`
};
const appWindow = document.getElementById('app-window');
const titlebar = document.getElementById('window-titlebar');
const menu = document.getElementById('project-menu');
const menuToggle = document.getElementById('project-button');
const hotspots = [...document.querySelectorAll('.hotspot')];
const dockTask = document.getElementById('dock-task');
let activeApp = null;
let opener = null;
let isMaximized = false;
let drag = null;
const qs = id => document.getElementById(id);
function setMenu(open){menu.hidden=!open;menuToggle.setAttribute('aria-expanded',String(open));}
function clearHotspots(){hotspots.forEach(btn=>btn.classList.remove('selected'));}
function closeApp(restore=true){appWindow.hidden=true;dockTask.hidden=true;activeApp=null;isMaximized=false;appWindow.classList.remove('maximized');clearHotspots();if(restore&&opener?.isConnected)opener.focus();}
function resetPosition(){appWindow.style.left='';appWindow.style.top='';}
function openApp(id, button){
 const a=APPS[id];if(!a)return;
 if(button)opener=button;
 if(activeApp!==id){isMaximized=false;appWindow.classList.remove('maximized');qs('window-max').textContent='□';qs('window-max').setAttribute('aria-label','Maximize application');resetPosition();}
 activeApp=id;
 qs('window-mini-icon').textContent=a.icon;
 qs('window-path').textContent='APPS/'+a.file;
 qs('window-breadcrumb').textContent='WORKSPACE / '+a.category;
 qs('window-category').textContent=a.category;
 qs('window-title').textContent=a.title;
 qs('window-description').textContent=a.description;
 qs('window-visual').innerHTML=PREVIEWS[a.preview]||'';
 qs('window-status').textContent=a.status;
 qs('window-tags').replaceChildren(...a.tags.map(t=>{let s=document.createElement('span');s.textContent=t;return s;}));
 qs('window-actions').replaceChildren(...a.links.map(([label,href],i)=>{let link=document.createElement('a');link.href=href;link.textContent=label+(href.startsWith('http')?' ↗':' →');if(href.startsWith('http')){link.target='_blank';link.rel='noopener noreferrer';}if(i===0)link.className='primary';return link;}));
 qs('dock-task-icon').textContent=a.icon;qs('dock-task-name').textContent=a.title;
 dockTask.hidden=false;appWindow.hidden=false;
 hotspots.forEach(btn=>btn.classList.toggle('selected',btn.dataset.app===id));
 setMenu(false);
 if(matchMedia('(max-width:850px)').matches){/* Fixed-size sheet on mobile; no room scrolling. */}
 qs('window-close').focus({preventScroll:true});
}
function minimizeApp(){if(!activeApp)return;appWindow.hidden=true;dockTask.classList.add('minimized');dockTask.focus();}
function restoreApp(){if(!activeApp)return;appWindow.hidden=false;dockTask.classList.remove('minimized');qs('window-close').focus({preventScroll:true});}
function toggleMaximize(){
 if(!activeApp || matchMedia('(max-width:850px)').matches)return;
 isMaximized=!isMaximized;appWindow.classList.toggle('maximized',isMaximized);resetPosition();
 qs('window-max').textContent=isMaximized?'❐':'□';qs('window-max').setAttribute('aria-label',isMaximized?'Restore window':'Maximize application');
}
document.querySelectorAll('[data-app]').forEach(btn=>btn.addEventListener('click',()=>openApp(btn.dataset.app,btn)));
qs('window-close').addEventListener('click',()=>closeApp());
qs('window-min').addEventListener('click',minimizeApp);
qs('window-max').addEventListener('click',toggleMaximize);
dockTask.addEventListener('click',()=>appWindow.hidden?restoreApp():minimizeApp());
qs('home-button').addEventListener('click',()=>{closeApp(false);setMenu(false);window.scrollTo({top:0,behavior:'smooth'});});
menuToggle.addEventListener('click',()=>setMenu(menu.hidden));
qs('close-menu').addEventListener('click',()=>{setMenu(false);menuToggle.focus();});
document.addEventListener('keydown',ev=>{if(ev.key==='Escape'){if(!menu.hidden){setMenu(false);menuToggle.focus();}else if(activeApp)closeApp();}
 // The titlebar is mouse-draggable; keyboard users can also reposition the open window.
 if(ev.altKey&&ev.key.startsWith('Arrow')&&activeApp&&!appWindow.hidden&&!isMaximized&&!matchMedia('(max-width:850px)').matches){
  ev.preventDefault();const rect=appWindow.getBoundingClientRect(),stage=qs('explore').getBoundingClientRect(),step=ev.shiftKey?80:24;
  const dx=ev.key==='ArrowRight'?step:ev.key==='ArrowLeft'?-step:0,dy=ev.key==='ArrowDown'?step:ev.key==='ArrowUp'?-step:0;
  moveTo(rect.left-stage.left+dx,rect.top-stage.top+dy);
 }
});
document.addEventListener('pointerdown',ev=>{if(!menu.hidden&&!menu.contains(ev.target)&&!menuToggle.contains(ev.target))setMenu(false);});
function moveTo(x,y){const stage=qs('explore').getBoundingClientRect(),rect=appWindow.getBoundingClientRect();appWindow.style.left=Math.max(8,Math.min(x,stage.width-rect.width-8))+'px';appWindow.style.top=Math.max(8,Math.min(y,stage.height-rect.height-8))+'px';}
titlebar.addEventListener('pointerdown',ev=>{
 if(ev.button!==0||ev.target.closest('button')||isMaximized||matchMedia('(max-width:850px)').matches)return;
 const stage=qs('explore').getBoundingClientRect(),rect=appWindow.getBoundingClientRect();drag={x:ev.clientX-rect.left,y:ev.clientY-rect.top,stageX:stage.left,stageY:stage.top};
 titlebar.setPointerCapture(ev.pointerId);appWindow.classList.add('dragging');
});
titlebar.addEventListener('pointermove',ev=>{if(drag)moveTo(ev.clientX-drag.stageX-drag.x,ev.clientY-drag.stageY-drag.y);});
function stopDrag(){drag=null;appWindow.classList.remove('dragging');}
titlebar.addEventListener('pointerup',stopDrag);titlebar.addEventListener('pointercancel',stopDrag);
