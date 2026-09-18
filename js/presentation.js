const slides = [
    { 
      title: "Opening Hook", 
      speaker: "Suyog", 
      emoji: "📢",
      text: "Good afternoon, judges! We are <strong>Team Innovators</strong>—Suyog, Karisha, Sohan, and Samir. Today, we present an <strong>Automated Early Flood Detection and Active Risk Reduction System!</strong>" 
    },
    { 
      title: "The Core Problem", 
      speaker: "Karisha", 
      emoji: "⚡",
      text: "When a flash flood hits, human observation is <strong>simply too slow.</strong> By the time someone notices rising water, <strong>it's already too late.</strong> We replace manual checks with <strong>instant automated code.</strong>" 
    },
    { 
      title: "System Logic & Code", 
      speaker: "Suyog", 
      emoji: "💻",
      text: "Our code runs on an Arduino loop: sensors measure water depth, <strong>evaluate thresholds in milliseconds</strong>, and <strong>instantly trigger</strong> the alarm LEDs and servo barrier!" 
    },
    { 
      title: "Hardware Architecture", 
      speaker: "Sohan", 
      emoji: "🛠️",
      text: "Our physical layout: <strong>the eyes</strong> <em>[point to sensor]</em> water depth sensor, <strong>the brain</strong> <em>[point to Arduino]</em> microcontroller, and <strong>the muscle</strong> <em>[point to barrier]</em> active servo gate." 
    },
    { 
      title: "Live Demonstration", 
      speaker: "Samir", 
      emoji: "🌊",
      text: "<em>[Dips sensor in water]</em> 1. Sensor detects rise. 2. Code evaluates threshold. 3. <strong>System fires alarm!</strong> <em>[LEDs light up]</em> 4. <strong>Barrier deploys instantly!</strong> <em>[Servo moves 90°]</em>" 
    },
    { 
      title: "Closing & Impact", 
      speaker: "Karisha", 
      emoji: "🏆",
      text: "From detection to physical defense in milliseconds — <strong>ZERO human delay!</strong> Thank you, judges. We are now open for your questions." 
    }
  ];

  let currentIndex = 0;

  const slideTitle = document.getElementById('slideTitle');
  const slideScript = document.getElementById('slideScript');
  const speakerName = document.getElementById('speakerName');
  const speakerEmoji = document.getElementById('speakerEmoji');
  const progressDotsEl = document.getElementById('progressDots');
  const slideAnnouncer = document.getElementById('slideAnnouncer');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  // Build progress dots
  slides.forEach((slide, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Go to slide ${i + 1}: ${slide.title}`);
    dot.addEventListener('click', () => goToSlide(i));
    progressDotsEl.appendChild(dot);
  });

  function renderDots() {
    const dots = progressDotsEl.querySelectorAll('button');
    dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
  }

  function updateSlide() {
    const slide = slides[currentIndex];
    slideTitle.textContent = slide.title;
    slideScript.innerHTML = slide.text; // Render HTML tags (strong, em)
    speakerName.textContent = slide.speaker;
    speakerEmoji.textContent = slide.emoji;
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === slides.length - 1;
    renderDots();
    slideAnnouncer.textContent = `Slide ${currentIndex + 1} of ${slides.length}: ${slide.title}`;
  }

  function goToSlide(index) {
    if (index < 0 || index >= slides.length || index === currentIndex) return;
    currentIndex = index;
    updateSlide();
  }

  function nextSlide() { goToSlide(currentIndex + 1); }
  function prevSlide() { goToSlide(currentIndex - 1); }

  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
  });

  updateSlide();

  // ---------- Minimize camera preview ----------
  const cameraBox = document.getElementById('cameraBox');
  const minCamBtn = document.getElementById('minCamBtn');
  let camMinimized = false;
  minCamBtn.addEventListener('click', () => {
    camMinimized = !camMinimized;
    cameraBox.classList.toggle('minimized', camMinimized);
    minCamBtn.textContent = camMinimized ? '+' : '–';
    minCamBtn.setAttribute('aria-label', camMinimized ? 'Restore camera preview' : 'Minimize camera preview');
  });

  // ---------- Minimize nav controls dock ----------
  const controlsDock = document.getElementById('controlsDock');
  const collapseBtn = document.getElementById('collapseBtn');
  let dockMinimized = false;
  collapseBtn.addEventListener('click', () => {
    dockMinimized = !dockMinimized;
    controlsDock.classList.toggle('minimized', dockMinimized);
    collapseBtn.textContent = dockMinimized ? '⌃' : '⌄';
    collapseBtn.setAttribute('aria-pressed', String(dockMinimized));
    collapseBtn.setAttribute('title', dockMinimized ? 'Expand controls' : 'Minimize controls');
    collapseBtn.setAttribute('aria-label', dockMinimized ? 'Expand navigation controls' : 'Minimize navigation controls');
  });

  // ---------- MediaPipe Hand-Gesture Camera Setup ----------
  let lastGestureTime = 0;
  const GESTURE_COOLDOWN = 1000;
  let cameraInstance = null;
  let isCameraOn = false;

  const videoElement = document.getElementsByClassName('input_video')[0];
  const canvasElement = document.getElementsByClassName('output_canvas')[0];
  const canvasCtx = canvasElement.getContext('2d');

  const hands = new Hands({
    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
  });

  hands.setOptions({
    maxNumHands: 1,
    modelComplexity: 1,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
  });

  hands.onResults((results) => {
    if (!isCameraOn) return;
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
      for (const landmarks of results.multiHandLandmarks) {
        drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, { color: '#35d0e0', lineWidth: 2 });
        drawLandmarks(canvasCtx, landmarks, { color: '#f5a623', lineWidth: 1, radius: 2 });

        const now = Date.now();
        if (now - lastGestureTime > GESTURE_COOLDOWN) {
          const indexTip = landmarks[8];
          const wrist = landmarks[0];

          if (indexTip.x < wrist.x - 0.25) {
            nextSlide();
            lastGestureTime = now;
          } else if (indexTip.x > wrist.x + 0.25) {
            prevSlide();
            lastGestureTime = now;
          }
        }
      }
    }
    canvasCtx.restore();
  });

  async function startCamera() {
    try {
      if (!cameraInstance) {
        cameraInstance = new Camera(videoElement, {
          onFrame: async () => {
            if (isCameraOn) {
              await hands.send({ image: videoElement });
            }
          },
          width: 320,
          height: 240
        });
      }
      await cameraInstance.start();
      isCameraOn = true;
      cameraBox.classList.remove('off');
      updateCamBtnUI(true);
    } catch (err) {
      console.error("Failed to start camera: ", err);
      isCameraOn = false;
      updateCamBtnUI(false);
    }
  }

  function stopCamera() {
    isCameraOn = false;
    if (videoElement.srcObject) {
      const tracks = videoElement.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoElement.srcObject = null;
    }
    cameraBox.classList.add('off');
    updateCamBtnUI(false);
  }

  function toggleCamera() {
    if (isCameraOn) {
      stopCamera();
    } else {
      startCamera();
    }
  }

  const cameraToggleBtn = document.getElementById('cameraToggleBtn');
  const camBtnIcon = document.getElementById('camBtnIcon');
  const camBtnLabel = document.getElementById('camBtnLabel');

  function updateCamBtnUI(active) {
    if (active) {
      cameraToggleBtn.classList.remove('off');
      camBtnIcon.textContent = '📷';
      camBtnLabel.textContent = 'Cam On';
    } else {
      cameraToggleBtn.classList.add('off');
      camBtnIcon.textContent = '🚫';
      camBtnLabel.textContent = 'Cam Off';
    }
  }

  cameraToggleBtn.addEventListener('click', toggleCamera);

  // Auto start camera on page load
  startCamera();
