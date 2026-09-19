// --- Canvas Graph Logic ---
        const canvas = document.getElementById('matrixCanvas');
        const ctx = canvas.getContext('2d');

        function resizeCanvas() {
            canvas.width = canvas.parentElement.clientWidth;
            canvas.height = canvas.parentElement.clientHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // Node Configuration for the P2P Mesh
        const nodes = [];
        const numNodes = 45;

        for (let i = 0; i < numNodes; i++) {
            nodes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.8,
                vy: (Math.random() - 0.5) * 0.8,
                radius: Math.random() * 3 + 2,
                pulse: Math.random() * Math.PI
            });
        }

        function drawMesh() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw Connection Lines
            ctx.strokeStyle = 'rgba(6, 182, 212, 0.06)';
            ctx.lineWidth = 1;
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.stroke();
                    }
                }
            }

            // Draw Nodes
            nodes.forEach(node => {
                node.pulse += 0.03;
                const dynamicRadius = node.radius + Math.sin(node.pulse) * 1.5;

                ctx.beginPath();
                ctx.arc(node.x, node.y, dynamicRadius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(6, 182, 212, ${0.4 + Math.sin(node.pulse) * 0.3})`;
                ctx.fill();

                // Intermittent data packets
                if (Math.random() > 0.995) {
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, dynamicRadius + 10, 0, Math.PI * 2);
                    ctx.strokeStyle = 'rgba(16, 185, 129, 0.6)';
                    ctx.stroke();
                }

                // Physics update boundary bounce
                node.x += node.vx;
                node.y += node.vy;

                if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
                if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
            });

            // HUD Overlay Text on Canvas
            ctx.fillStyle = 'rgba(6, 182, 212, 0.4)';
            ctx.font = '10px Courier New';
            ctx.fillText('DETERMINISTIC_PHYSICS_MATRIX: ACTIVE', 20, 30);
            ctx.fillText(`ACTIVE_PEER_MESH: ${numNodes}_INSTANCES`, 20, 45);

            requestAnimationFrame(drawMesh);
        }
        drawMesh();

        // --- System Metasystem Updates ---
        let clockTick = 0;
        const terminal = document.getElementById('terminal-stream');

        const logTypes = ['INFO', 'SUCCESS', 'ALRT', 'EXEC'];
        const logSubsystems = ['KERNEL', 'MEM_ALLOC', 'P2P_MESH', 'OPFS_IO', 'WEBGPU_PIPE'];
        const statements = [
            "Thread pipeline mapped cleanly to WebWorker dynamic context.",
            "Deterministic frame state checked successfully against hash index matrix.",
            "Garbage Collector mitigation vector initialized; heap variance 0.00%.",
            "WebRTC channel data chunk transmitted safely to Peer-Node cluster.",
            "Journal write committed to Origin Private File System block allocation.",
            "Memory compression array extended. Allocation buffer scaled dynamically."
        ];

        setInterval(() => {
            // Clock increment
            clockTick += Math.floor(Math.random() * 7) + 1;
            document.getElementById('clock-tick').innerText = String(clockTick).padStart(6, '0');

            // Dynamic progress bars updates
            const memoryUsage = 40 + Math.sin(clockTick * 0.05) * 8;
            document.getElementById('wasm-bar').style.width = `${memoryUsage}%`;
            document.getElementById('wasm-mem').innerText = `${Math.floor(memoryUsage * 42)}MB / 4.2GB`;
            document.getElementById('worker-bar').style.width = `${90 + Math.sin(clockTick * 0.1) * 10}%`;
            document.getElementById('io-rate').innerText = `${Math.floor(380 + Math.random() * 45)} MB/s`;

            // Terminal log updates
            if (Math.random() > 0.4) {
                const entry = document.createElement('div');
                entry.className = 'log-entry';
                const randType = logTypes[Math.floor(Math.random() * logTypes.length)];
                const randSub = logSubsystems[Math.floor(Math.random() * logSubsystems.length)];
                const randStat = statements[Math.floor(Math.random() * statements.length)];
                
                if (randType === 'SUCCESS') entry.className += ' success';
                if (randType === 'ALRT') entry.className += ' alert';
                
                entry.innerText = `[${randType}][${randSub}] ${randStat}`;
                terminal.appendChild(entry);
                
                if (terminal.children.length > 25) {
                    terminal.removeChild(terminal.firstChild);
                }
                terminal.scrollTop = terminal.scrollHeight;
            }
        }, 350);
