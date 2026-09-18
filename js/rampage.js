let port, writer;
    let lastAngle = -1;

    const connectBtn = document.getElementById('connectBtn');
    const statusDiv = document.getElementById('status');
    const videoElement = document.getElementById('webcam');

    // --- 1. Web Serial API Connection ---
    connectBtn.addEventListener('click', async () => {
      if (!('serial' in navigator)) {
        alert('Web Serial API is not supported in this browser. Please use Chrome, Edge, or Opera.');
        return;
      }
      try {
        port = await navigator.serial.requestPort();
        await port.open({ baudRate: 9600 });
        
        const encoder = new TextEncoderStream();
        encoder.readable.pipeTo(port.writable);
        writer = encoder.writable.getWriter();
        
        statusDiv.innerText = "Arduino: Connected!";
        statusDiv.style.color = "#4caf50";
      } catch (err) {
        console.error("Serial connection error:", err);
        statusDiv.innerText = "Connection Failed";
        statusDiv.style.color = "#f44336";
      }
    });

    async function sendAngleToArduino(angle) {
      if (writer && angle !== lastAngle) {
        await writer.write(`${angle}\n`);
        lastAngle = angle;
      }
    }

    // --- 2. Thumbs-Up Gesture Detection ---
    function isThumbsUp(landmarks) {
      const thumbTip = landmarks[4].y;
      const thumbIp = landmarks[3].y;

      // Check if other fingers are curled down (tip Y > joint Y in browser coordinates)
      const indexCurled  = landmarks[8].y > landmarks[6].y;
      const middleCurled = landmarks[12].y > landmarks[10].y;
      const ringCurled   = landmarks[16].y > landmarks[14].y;
      const pinkyCurled  = landmarks[20].y > landmarks[18].y;

      return (thumbTip < thumbIp) && indexCurled && middleCurled && ringCurled && pinkyCurled;
    }

    // --- 3. MediaPipe Hands Setup ---
    const hands = new Hands({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
    });

    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.7
    });

    hands.onResults((results) => {
      let targetAngle = 0;

      if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        const landmarks = results.multiHandLandmarks[0];
        
        if (isThumbsUp(landmarks)) {
          targetAngle = 90;
          statusDiv.innerText = "Gesture: THUMBS UP! (Servo: 90°)";
          statusDiv.style.color = "#4caf50";
        } else {
          statusDiv.innerText = "Tracking Hand... (Servo: 0°)";
          statusDiv.style.color = "#ffca28";
        }
      } else {
        statusDiv.innerText = "No hand detected";
        statusDiv.style.color = "#aaa";
      }

      sendAngleToArduino(targetAngle);
    });

    // --- 4. Camera Stream Initialization ---
    const camera = new Camera(videoElement, {
      onFrame: async () => {
        await hands.send({ image: videoElement });
      },
      width: 640,
      height: 480
    });
    camera.start();
