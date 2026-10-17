const themeToggle = document.getElementById('theme-toggle');
        const body = document.body;
        const imgLight = document.getElementById('hero-img-light');
        const imgDark = document.getElementById('hero-img-dark');
        const interactiveImg = document.getElementById('interactive-img');

        // Toggle Dark/Light Mode via Button
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            
            // Switch button text and images
            if (body.classList.contains('dark-mode')) {
                themeToggle.textContent = '☀️ Light Theme';
                imgLight.classList.remove('active');
                imgDark.classList.add('active');
            } else {
                themeToggle.textContent = '🌙 Dark Theme';
                imgDark.classList.remove('active');
                imgLight.classList.add('active');
            }
        });

        // Optional: Clicking the image container itself also toggles the pictures (as your caption suggests)
        interactiveImg.addEventListener('click', () => {
            imgLight.classList.toggle('active');
            imgDark.classList.toggle('active');
        });
