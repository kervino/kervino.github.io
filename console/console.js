'use strict';

// KO Workstation: a safe, client-side command router. No commands are executed on a server.
const PROJECTS = Object.freeze({
  netlens: {
    title: 'NetLens / Network Traffic Analyzer',
    summary: 'An offline PCAP analyzer with IP and protocol summaries, text/JSON reports, and heuristic TCP SYN-scan detection.',
    stack: ['Python', 'Scapy', 'Wireshark', 'unittest'],
    caseStudy: '../projects/netlens.html',
    source: 'https://github.com/kervino/NetLens',
  },
  wayforge: {
    title: 'Wayforge / Indoor Navigation',
    summary: 'Cross-language native C++ integration, Unity interoperability, and backend services for building navigation.',
    stack: ['C++20', 'C#', 'Unity', 'TypeScript', 'CMake'],
    caseStudy: '../projects/wayforge.html',
  },
  graphics: {
    title: 'Graphics & Algorithms / Spatial Data',
    summary: 'Explorations of spatial acceleration structures, rendering, and computational geometry.',
    stack: ['C++', 'OpenGL', 'BVH', 'KD-Tree'],
    caseStudy: '../projects/graphics.html',
  },
  'dot-product': {
    title: 'Performance Lab / Dot Product Optimization',
    summary: 'Experiments comparing scalar, loop-unrolled, SIMD, and threaded approaches to performance.',
    stack: ['C', 'SIMD', 'pthreads', 'Profiling'],
    caseStudy: '../projects/dot-product.html',
  },
});

const output = document.getElementById('terminal-output');
const input = document.getElementById('terminal-input');
const form = document.getElementById('terminal-form');
const history = [];
let historyPosition = 0;

function div(className, value) {
  const element = document.createElement('div');
  element.className = className;
  if (value !== undefined) element.textContent = value;
  return element;
}
function paragraph(value, className = '') {
  const p = document.createElement('p');
  if (className) p.className = className;
  p.textContent = value;
  return p;
}
function link(label, href) {
  const a = document.createElement('a');
  a.className = 'terminal-link';
  a.textContent = `${label} ↗`;
  a.href = href;
  if (/^https?:/.test(href)) {
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
  }
  return a;
}
function block(title) {
  const node = div('command-response');
  if (title) node.appendChild(paragraph(title, 'result-title'));
  output.appendChild(node);
  return node;
}
function addGrid(node, entries) {
  const grid = div('terminal-list');
  for (const [key, value] of entries) {
    grid.appendChild(div('', key));
    grid.appendChild(div('', value));
  }
  node.appendChild(grid);
}
function addSkills(node, skills) {
  const pills = div('result-pills');
  skills.forEach((name) => pills.appendChild(div('', name)));
  node.appendChild(pills);
}
function showProject(key) {
  const project = PROJECTS[key];
  if (!project) {
    block('Unknown project').appendChild(paragraph('Try: open netlens, open wayforge, open graphics, or open dot-product.'));
    return;
  }
  const node = block(project.title);
  node.appendChild(paragraph(project.summary));
  addSkills(node, project.stack);
  node.appendChild(link('View case study', project.caseStudy));
  if (project.source) node.appendChild(link('Source code', project.source));
}
function showHelp() {
  const node = block('AVAILABLE COMMANDS');
  addGrid(node, [
    ['help', 'Show available commands'],
    ['whoami', 'Introduction and background'],
    ['ls / projects', 'List available portfolio modules'],
    ['open <project>', 'Open a project summary and its case study'],
    ['about / skills', 'About my work and technologies'],
    ['contact', 'LinkedIn and GitHub links'],
    ['clear', 'Clear terminal output'],
    ['home', 'Return to the original portfolio'],
  ]);
  node.appendChild(paragraph('Example: open netlens', 'muted'));
}
function showProjects() {
  const node = block('~/portfolio/projects');
  addGrid(node, [
    ['netlens', 'Python / Scapy · Network security'],
    ['wayforge', 'C++ / Unity / TypeScript · Indoor navigation'],
    ['graphics', 'C++ / OpenGL · Rendering and algorithms'],
    ['dot-product', 'C / SIMD / threads · Performance'],
  ]);
  node.appendChild(paragraph('Run open <project> for details.', 'muted'));
}
function runCommand(value) {
  const original = value.trim();
  if (!original) return;
  history.push(original);
  historyPosition = history.length;
  if (original.toLowerCase() === 'clear') {
    output.replaceChildren();
    output.appendChild(paragraph('Console cleared. Run help to see commands.', 'muted'));
    output.scrollTop = output.scrollHeight;
    return;
  }

  const echo = div('command-echo');
  const prefix = document.createElement('span');
  prefix.className = 'prompt-user';
  prefix.textContent = 'visitor@ko:~$ ';
  echo.appendChild(prefix);
  echo.appendChild(document.createTextNode(original));
  output.appendChild(echo);

  const cleaned = original.toLowerCase().replace(/\s+/g, ' ');
  const [command, ...args] = cleaned.split(' ');
  switch (command) {
    case 'help': showHelp(); break;
    case 'ls':
    case 'projects': showProjects(); break;
    case 'whoami': {
      const node = block('KERVIN ONG / SOFTWARE & SYSTEMS');
      node.appendChild(paragraph('Computer science student in Singapore, interested in real-time systems, low-level engineering, interactive software, and cybersecurity.'));
      node.appendChild(link('Original portfolio', '../index.html'));
      break;
    }
    case 'about': {
      const node = block('ABOUT');
      node.appendChild(paragraph('I enjoy building and understanding the systems behind everyday software: native APIs, graphics pipelines, backend integrations, and network analysis tools.'));
      node.appendChild(link('Read more on the main site', '../index.html#about'));
      break;
    }
    case 'skills': {
      const node = block('TOOLKIT');
      addSkills(node, ['C++', 'C', 'C#', 'Python', 'TypeScript', 'Node.js', 'Scapy', 'Git', 'CMake', 'Unity', 'OpenGL']);
      node.appendChild(link('View toolkit', '../index.html#toolkit'));
      break;
    }
    case 'contact': {
      const node = block('LET’S CONNECT');
      node.appendChild(paragraph('Interested in internship collaboration, software engineering, and cybersecurity projects.'));
      node.appendChild(link('LinkedIn', 'https://www.linkedin.com/in/kervin-ong/'));
      node.appendChild(link('GitHub', 'https://github.com/kervino'));
      break;
    }
    case 'open': showProject(args.join(' ')); break;
    case 'github': block('GITHUB').appendChild(link('Open GitHub profile', 'https://github.com/kervino')); break;
    case 'home': {
      const node = block('HOME');
      node.appendChild(link('Return to the classic portfolio', '../index.html'));
      break;
    }
    default:
      block('Command not recognized').appendChild(paragraph(`No command named "${original}". Type help to see the supported commands.`, 'terminal-message'));
  }
  output.scrollTop = output.scrollHeight;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  runCommand(input.value);
  input.value = '';
  input.focus();
});
input.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowUp' && history.length) {
    event.preventDefault();
    historyPosition = Math.max(0, historyPosition - 1);
    input.value = history[historyPosition] || '';
  } else if (event.key === 'ArrowDown' && history.length) {
    event.preventDefault();
    historyPosition = Math.min(history.length, historyPosition + 1);
    input.value = history[historyPosition] || '';
  }
});
document.querySelectorAll('[data-command]').forEach((button) => {
  button.addEventListener('click', () => {
    runCommand(button.dataset.command);
    if (window.matchMedia('(pointer:fine)').matches) input.focus();
  });
});
document.getElementById('year').textContent = String(new Date().getFullYear());
if (window.matchMedia('(pointer:fine)').matches) input.focus();
