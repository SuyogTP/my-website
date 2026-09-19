const canvas = document.getElementById('titan-webgpu-sim');
        const ctx = canvas.getContext('2d');
        const consoleLog = document.getElementById('console-log');
        
        let width, height;
        let time = 0;

        function log(msg) {
            const entry = document.createElement('div');
            entry.className = 'log-entry';
            entry.innerText = `[${new Date().toLocaleTimeString()}] ${msg}`;
            consoleLog.appendChild(entry);
            consoleLog.scrollTop = consoleLog.scrollHeight;
        }

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resize);
        resize();

        // 3D Vector Math Pipeline Class Simulation
        class Vector3 {
            constructor(x,y,z) { this.x=x; this.y=y; this.z=z; }
            rotateY(angle) {
                let cos = Math.cos(angle), sin = Math.sin(angle);
                return new Vector3(this.x * cos - this.z * sin, this.y, this.x * sin + this.z * cos);
            }
        }

        // Custom Pseudo-Shader Rendering Loop
        function renderPipeline() {
            time += 0.015;
            ctx.fillStyle = '#020205';
            ctx.fillRect(0, 0, width, height);

            // Compute structural isometric transform depth matrix lines
            ctx.strokeStyle = 'rgba(0, 255, 170, 0.12)';
            ctx.lineWidth = 1.5;
            
            let center = { x: width / 2, y: height / 2 + 50 };
            let lines = 40;
            let spacing = 35;

            for (let i = -lines; i < lines; i++) {
                ctx.beginPath();
                for (let j = -lines; j < lines; j++) {
                    // Generate 3D procedural landscape heights natively via sine waves
                    let waveX = Math.sin(i * 0.15 + time) * 40;
                    let waveZ = Math.cos(j * 0.15 + time) * 40;
                    let y3d = waveX + waveZ;

                    // Rotational calculations matching a 3D isometric view matrix
                    let x3d = i * spacing;
                    let z3d = j * spacing;
                    
                    let rot = new Vector3(x3d, y3d, z3d).rotateY(time * 0.1);

                    // Perspective transformation map
                    let fov = 400;
                    let scale = fov / (fov + rot.z + 500);
                    let projX = center.x + rot.x * scale;
                    let projY = center.y + rot.y * scale;

                    if (j === -lines) ctx.moveTo(projX, projY);
                    else ctx.lineTo(projX, projY);
                }
                ctx.stroke();
            }

            // Dynamically simulate floating asset blocks rendering
            document.getElementById('fps-val').innerText = (60 + Math.random() * 0.8 - 0.4).toFixed(1);

            requestAnimationFrame(renderPipeline);
        }

        // Periodic event logging simulator to match engine activity
        setInterval(() => {
            const updates = [
                "Streaming structural asset chunk from client IndexedDB cache...",
                "WebRTC frame synchronized with 14 active remote spatial nodes.",
                "Garbage Collector optimized: Cleared 1,420 unreferenced transform matrices.",
                "Procedural noise generator updated chunk coordinates."
            ];
            log(updates[Math.floor(Math.random() * updates.length)]);
        }, 4000);

        // Run engine loop
        requestAnimationFrame(renderPipeline);
