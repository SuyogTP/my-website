(() => {
    const state = {
        currency: 0,
        incomeMultiplier: 1,
        cores: 1,
        currentEngine: 'galaxy',
        upgrades: [
            { name: 'Tachyon Computing', detail: 'Income x2 (+100% processing)', cost: 10, mult: 2 },
            { name: 'Neural Synthesizer', detail: 'Income x5 (+400% processing)', cost: 50, mult: 5 },
            { name: 'Dimensional Unfolder', detail: 'Income x15 (+1400% processing)', cost: 250, mult: 15 }
        ]
    };
    const canvas = document.getElementById('main-viewport');
    const ctx = canvas.getContext('2d');
    let stars = [], grid = [], organisms = [];
    const cols = 60, rows = 40;
    const byId = id => document.getElementById(id);

    function resize() {
        const box = canvas.parentElement;
        canvas.width = box.clientWidth;
        canvas.height = box.clientHeight;
        if (state.currentEngine === 'galaxy') initGalaxy();
        if (state.currentEngine === 'evolution') initEvolution();
    }
    function logToTerminal(text) {
        const container = byId('terminal-log');
        const entry = document.createElement('div');
        entry.textContent = `[${new Date().toLocaleTimeString()}] ${text}`;
        container.prepend(entry);
        while (container.children.length > 50) container.lastElementChild.remove();
    }
    function initGalaxy() {
        stars = Array.from({ length: 300 }, () => ({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, size: Math.random() * 2, speed: Math.random() * 0.5 + 0.1, angle: Math.random() * Math.PI * 2 }));
    }
    function drawGalaxy() {
        ctx.fillStyle = 'rgba(5, 5, 8, 0.2)'; ctx.fillRect(0, 0, canvas.width, canvas.height); ctx.fillStyle = '#00ffcc';
        stars.forEach(star => { star.x += Math.cos(star.angle) * star.speed; star.y += Math.sin(star.angle) * star.speed; if (star.x < 0 || star.x > canvas.width || star.y < 0 || star.y > canvas.height) { star.x = canvas.width / 2; star.y = canvas.height / 2; } ctx.beginPath(); ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2); ctx.fill(); });
        const gradient = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 10, canvas.width / 2, canvas.height / 2, 100); gradient.addColorStop(0, 'rgba(0,0,0,1)'); gradient.addColorStop(0.5, 'rgba(255,0,127,0.2)'); gradient.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = gradient; ctx.beginPath(); ctx.arc(canvas.width / 2, canvas.height / 2, 100, 0, Math.PI * 2); ctx.fill();
    }
    function initAutomata() { grid = Array.from({ length: cols }, () => Array.from({ length: rows }, () => Math.random() > 0.75 ? 1 : 0)); }
    function drawAutomata() {
        ctx.fillStyle = '#050508'; ctx.fillRect(0, 0, canvas.width, canvas.height); const cellW = canvas.width / cols, cellH = canvas.height / rows; const nextGrid = grid.map(column => [...column]);
        for (let column = 0; column < cols; column++) for (let row = 0; row < rows; row++) { let neighbors = 0; for (let dx = -1; dx < 2; dx++) for (let dy = -1; dy < 2; dy++) { if (dx || dy) neighbors += grid[(column + dx + cols) % cols][(row + dy + rows) % rows]; } if (grid[column][row] && (neighbors < 2 || neighbors > 3)) nextGrid[column][row] = 0; else if (!grid[column][row] && neighbors === 3) nextGrid[column][row] = 1; if (grid[column][row]) { ctx.fillStyle = `hsl(${(column * row) % 360}, 100%, 50%)`; ctx.fillRect(column * cellW, row * cellH, cellW - 1, cellH - 1); } } grid = nextGrid;
    }
    function newOrganism() { return { x: Math.random() * canvas.width, y: Math.random() * canvas.height, vx: (Math.random() - 0.5) * 4, vy: (Math.random() - 0.5) * 4, energy: 100, dna: Math.random() }; }
    function initEvolution() { organisms = Array.from({ length: 40 }, newOrganism); }
    function drawEvolution() { ctx.fillStyle = 'rgba(5,5,8,0.3)'; ctx.fillRect(0, 0, canvas.width, canvas.height); organisms.forEach((org, index) => { org.x += org.vx; org.y += org.vy; org.energy -= 0.1; if (org.x < 0 || org.x > canvas.width) org.vx *= -1; if (org.y < 0 || org.y > canvas.height) org.vy *= -1; ctx.strokeStyle = `rgba(0,255,204,${org.energy / 100})`; ctx.beginPath(); ctx.moveTo(org.x, org.y); ctx.lineTo(org.x + org.vx * 5, org.y + org.vy * 5); ctx.stroke(); ctx.fillStyle = org.dna > 0.5 ? '#00ffcc' : '#ff007f'; ctx.beginPath(); ctx.arc(org.x, org.y, 4 + org.energy / 20, 0, Math.PI * 2); ctx.fill(); if (org.energy <= 0) { organisms[index] = newOrganism(); if (Math.random() > 0.7) logToTerminal('Organism Mutation Cascade triggered.'); } }); }
    function switchEngine(name) { state.currentEngine = name; document.querySelectorAll('.module-btn').forEach(button => button.classList.toggle('active', button.dataset.engine === name)); const details = { galaxy: ['Procedural Cosmos Matrix', 'Switched to Deep-Space Simulation pipeline.'], automata: ['Matrix Cellular Automata', 'Switched to Quantum Conway Grid Array.'], evolution: ['Genetic Neural-Network Agents', 'Switched to Bio-Mimetic Neural Simulation.'] }; byId('hud-detail').textContent = `Engine: ${details[name][0]}`; logToTerminal(details[name][1]); if (name === 'galaxy') initGalaxy(); if (name === 'automata') initAutomata(); if (name === 'evolution') initEvolution(); }
    function renderUpgrades() { byId('upgrades-list').innerHTML = state.upgrades.map((upgrade, index) => `<div class="upgrade-card"><div>${upgrade.name}<small>${upgrade.detail}</small></div><button id="upg-${index}" data-upgrade="${index}">${upgrade.cost} ENT</button></div>`).join(''); document.querySelectorAll('[data-upgrade]').forEach(button => button.addEventListener('click', () => buyUpgrade(Number(button.dataset.upgrade)))); }
    function buyUpgrade(index) { const upgrade = state.upgrades[index]; if (state.currency < upgrade.cost || upgrade.purchased) return; state.currency -= upgrade.cost; state.incomeMultiplier *= upgrade.mult; upgrade.purchased = true; state.cores += 1; const button = byId(`upg-${index}`); button.textContent = 'MAXED'; button.disabled = true; byId('core-count').textContent = state.cores; logToTerminal(`Upgraded System with: ${upgrade.name}. Processing capacity expanded.`); }
    function loop() { state.currency += 0.001 * state.incomeMultiplier; byId('currency-display').textContent = state.currency.toFixed(4); state.upgrades.forEach((upgrade, index) => { const button = byId(`upg-${index}`); if (button && !upgrade.purchased) button.disabled = state.currency < upgrade.cost; }); if (state.currentEngine === 'galaxy') drawGalaxy(); else if (state.currentEngine === 'automata') drawAutomata(); else drawEvolution(); if (Math.random() > 0.997) { const stability = Math.floor(Math.random() * 20) + 80; byId('stability-display').textContent = `${stability}%`; } requestAnimationFrame(loop); }

    window.addEventListener('resize', resize); document.querySelectorAll('.module-btn').forEach(button => button.addEventListener('click', () => switchEngine(button.dataset.engine))); renderUpgrades(); resize(); initGalaxy(); loop();
    setInterval(() => { const messages = ['Synchronizing timelines across parallel layers...', 'Hashing algorithmic dark-matter arrays.', 'Compiling multi-threaded shader instructions.', 'Garbage collector freed 4.2 Exabytes of virtual space.']; logToTerminal(messages[Math.floor(Math.random() * messages.length)]); }, 8000);
})();
