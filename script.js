// --- Theme Toggle Logic ---
const toggleBtn = document.getElementById('theme-toggle');
const lightImg = document.getElementById('hero-img-light');
const darkImg = document.getElementById('hero-img-dark');
const topicCardsContainer = document.getElementById('topic-cards');
const topicTitle = document.getElementById('topic-title');
const topicDescription = document.getElementById('topic-description');
const topicBadge = document.getElementById('topic-badge');
const topicDetail = document.getElementById('topic-detail');
const topicEffect = document.getElementById('topic-effect');

const topics = [
    {
        id: 'reading',
        title: 'Reading',
        icon: '📚',
        subtitle: 'Books, stories, and daily reading habits',
        description: 'I love exploring fiction, self-help, science, and storytelling through books.',
        details: [
            'My favorite book is Atomic Habits because it helps me build strong routines.',
            'I read every day, even when I am busy with school and coding.',
            'Books help me learn faster, imagine bigger, and stay motivated.'
        ],
        theme: {
            bg: 'linear-gradient(135deg, #fff9db, #ffe4b3)',
            accent: '#f59e0b',
            text: '#1f2937',
            card: 'rgba(255, 250, 235, 0.95)',
            border: 'rgba(245, 158, 11, 0.18)'
        },
        special: 'none'
    },
    {
        id: 'atomic-habits',
        title: 'Atomic Habits',
        icon: '🧠',
        subtitle: 'Small changes, big results',
        description: 'Atomic Habits shows how tiny actions add up to massive improvements over time.',
        details: [
            'I use the book to build better routines every day.',
            'It helps me stay focused on progress instead of perfect outcomes.',
            'I love the idea of making habits easy, visible, and rewarding.'
        ],
        theme: {
            bg: 'linear-gradient(135deg, #e0f2fe, #bae6fd)',
            accent: '#0284c7',
            text: '#0f172a',
            card: 'rgba(240, 249, 255, 0.95)',
            border: 'rgba(2, 132, 199, 0.18)'
        },
        special: 'none'
    },
    {
        id: 'golden-flower-school',
        title: 'Golden Flower School',
        icon: '🏫',
        subtitle: 'My school and daily learning environment',
        description: 'I attend Golden Flower Secondary School, where I enjoy studying and growing with friends.',
        details: [
            'School helps me learn math, science, English, and technology.',
            'I enjoy participating in clubs and reading activities.',
            'My school is a place where I can explore new interests and meet new friends.'
        ],
        theme: {
            bg: 'linear-gradient(135deg, #f8fafc, #dbeafe)',
            accent: '#2563eb',
            text: '#0f172a',
            card: 'rgba(248, 250, 252, 0.95)',
            border: 'rgba(59, 130, 246, 0.16)'
        },
        special: 'none'
    },
    {
        id: 'free-fire',
        title: 'Free Fire',
        icon: '🔥',
        subtitle: 'Battle royale fun for 8 years',
        description: 'Free Fire is one of my favorite games, and I have played it for 8 years.',
        details: [
            'I love strategy, fast moves, and epic victories.',
            'Free Fire shows how games can be exciting and creative.',
            'I enjoy collecting skins, teaming up with friends, and improving every match.'
        ],
        theme: {
            bg: 'linear-gradient(135deg, #fed7aa, #fb7185)',
            accent: '#ef4444',
            text: '#1f2937',
            card: 'rgba(255, 243, 238, 0.95)',
            border: 'rgba(248, 113, 113, 0.18)'
        },
        special: 'none'
    },
    {
        id: 'space',
        title: 'Space',
        icon: '🚀',
        subtitle: 'Aliens, stars, and exploration',
        description: 'I love the idea of alien worlds, spaceships, and cosmic adventure.',
        details: [
            'Space is a huge source of imagination and creativity.',
            'I enjoy thinking about planets, stars, and what might exist beyond Earth.',
            'Spaceships and extraterrestrial stories make my ideas feel limitless.'
        ],
        theme: {
            bg: 'linear-gradient(135deg, #0f172a, #1e293b)',
            accent: '#38bdf8',
            text: '#e2e8f0',
            card: 'rgba(15, 23, 42, 0.92)',
            border: 'rgba(56, 189, 248, 0.18)'
        },
        special: 'none'
    },
    {
        id: 'aircraft',
        title: 'Aircraft',
        icon: '✈️',
        subtitle: 'Flying machines and sky adventure',
        description: 'I am fascinated by airplanes, helicopters, and flying through the sky.',
        details: [
            'Aircraft are powerful, fast, and full of engineering magic.',
            'I imagine flying above clouds and seeing the world from high above.',
            'This topic page gives you a money shower feeling when you click it.'
        ],
        theme: {
            bg: 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
            accent: '#2563eb',
            text: '#0f172a',
            card: 'rgba(248, 250, 252, 0.96)',
            border: 'rgba(37, 99, 235, 0.18)'
        },
        special: 'money-shower'
    },
    {
        id: 'technology',
        title: 'Technology',
        icon: '💻',
        subtitle: 'Coding, gadgets, and digital creativity',
        description: 'I love building websites, learning new tools, and exploring tech trends.',
        details: [
            'Coding helps me bring my ideas to life on the screen.',
            'Technology makes learning faster and more fun.',
            'I enjoy discovering new apps and experimenting with code.'
        ],
        theme: {
            bg: 'linear-gradient(135deg, #e0f2fe, #bae6fd)',
            accent: '#0284c7',
            text: '#0f172a',
            card: 'rgba(240, 249, 255, 0.95)',
            border: 'rgba(2, 132, 199, 0.18)'
        },
        special: 'none'
    },
    {
        id: 'science',
        title: 'Science',
        icon: '🔬',
        subtitle: 'Experiments, ideas, and discovery',
        description: 'Science grows my curiosity and helps me explore the world around me.',
        details: [
            'I enjoy learning about physics, chemistry, and biology.',
            'Science shows how amazing the universe can be.',
            'I like solving puzzles and testing new ideas.'
        ],
        theme: {
            bg: 'linear-gradient(135deg, #eef2ff, #e0e7ff)',
            accent: '#6366f1',
            text: '#1e293b',
            card: 'rgba(247, 250, 255, 0.96)',
            border: 'rgba(99, 102, 241, 0.18)'
        },
        special: 'none'
    },
    {
        id: 'math',
        title: 'Math',
        icon: '➗',
        subtitle: 'Numbers, logic, and problem solving',
        description: 'Math helps me think clearly and solve tricky puzzles every day.',
        details: [
            'I enjoy problems that make me think differently.',
            'Numbers help me understand patterns and results.',
            'Math helps with coding, science, and real life.'
        ],
        theme: {
            bg: 'linear-gradient(135deg, #f3f4f6, #dbeafe)',
            accent: '#1d4ed8',
            text: '#0f172a',
            card: 'rgba(249, 250, 251, 0.95)',
            border: 'rgba(59, 130, 246, 0.18)'
        },
        special: 'none'
    },
    {
        id: 'movies',
        title: 'Movies',
        icon: '🎬',
        subtitle: 'Stories, visuals, and cinematic fun',
        description: 'I enjoy watching movies that spark excitement and imagination.',
        details: [
            'Action, animation, and sci-fi are some of my favorite movie genres.',
            'Movies help me understand new worlds and characters.',
            'I like thinking about the stories and visuals after watching.'
        ],
        theme: {
            bg: 'linear-gradient(135deg, #fdf2f8, #fce7f3)',
            accent: '#d946ef',
            text: '#1f2937',
            card: 'rgba(255, 247, 250, 0.95)',
            border: 'rgba(217, 70, 239, 0.18)'
        },
        special: 'none'
    },
    {
        id: 'music',
        title: 'Music',
        icon: '🎵',
        subtitle: 'Rhythm, beats, and sound',
        description: 'Music is a powerful source of energy, focus, and fun.',
        details: [
            'I enjoy listening to tracks while studying and gaming.',
            'Songs can change the mood of the whole day.',
            'I like discovering new sounds and artists.'
        ],
        theme: {
            bg: 'linear-gradient(135deg, #ede9fe, #f5f3ff)',
            accent: '#7c3aed',
            text: '#1e293b',
            card: 'rgba(249, 250, 251, 0.95)',
            border: 'rgba(124, 58, 237, 0.18)'
        },
        special: 'none'
    },
    {
        id: 'travel',
        title: 'Travel',
        icon: '🌍',
        subtitle: 'Exploring places and cultures',
        description: 'Travel inspires me to learn about new places, foods, and people.',
        details: [
            'Seeing new locations expands my imagination.',
            'I enjoy learning about different cultures and nature.',
            'Travel stories make me curious to visit amazing destinations.'
        ],
        theme: {
            bg: 'linear-gradient(135deg, #d8f5e4, #dcfce7)',
            accent: '#16a34a',
            text: '#0f172a',
            card: 'rgba(240, 253, 244, 0.96)',
            border: 'rgba(16, 163, 127, 0.18)'
        },
        special: 'none'
    },
    {
        id: 'nepal',
        title: 'Nepal',
        icon: '🏔️',
        subtitle: 'My home and mountain inspiration',
        description: 'Nepal is full of natural beauty, culture, and mountain spirit.',
        details: [
            'I love the pride of being from Nepal.',
            'The mountains and colors of Nepal inspire my creativity.',
            'I enjoy sharing what makes Nepal unique with friends.'
        ],
        theme: {
            bg: 'linear-gradient(135deg, #dbeafe, #c7d2fe)',
            accent: '#2563eb',
            text: '#0f172a',
            card: 'rgba(238, 242, 255, 0.96)',
            border: 'rgba(37, 99, 235, 0.18)'
        },
        special: 'none'
    },
    {
        id: 'robotics',
        title: 'Robotics',
        icon: '🤖',
        subtitle: 'Robots, automation, and creation',
        description: 'Robotics blends coding, electronics, and design into powerful machines.',
        details: [
            'I enjoy thinking about how machines solve problems.',
            'Robots make technology feel alive and exciting.',
            'I like imagining future inventions powered by robotics.'
        ],
        theme: {
            bg: 'linear-gradient(135deg, #e0f2fe, #dbeafe)',
            accent: '#2563eb',
            text: '#0f172a',
            card: 'rgba(240, 249, 255, 0.95)',
            border: 'rgba(59, 130, 246, 0.18)'
        },
        special: 'none'
    },
    {
        id: 'animation',
        title: 'Animation',
        icon: '🎨',
        subtitle: 'Colorful motion and storytelling',
        description: 'Animation turns drawings into moving stories and fun worlds.',
        details: [
            'I love the bright energy of animated movies.',
            'Animation inspires creativity and imagination.',
            'I enjoy characters, colors, and playful scenes.'
        ],
        theme: {
            bg: 'linear-gradient(135deg, #fef3c7, #fde68a)',
            accent: '#f59e0b',
            text: '#1f2937',
            card: 'rgba(255, 250, 235, 0.95)',
            border: 'rgba(245, 158, 11, 0.18)'
        },
        special: 'none'
    },
    {
        id: 'creativity',
        title: 'Creativity',
        icon: '✨',
        subtitle: 'Ideas, design, and imagination',
        description: 'Creativity helps me make unique projects and stories.',
        details: [
            'I love thinking of new ways to solve problems.',
            'Creative projects make learning fun.',
            'I enjoy combining art and technology.'
        ],
        theme: {
            bg: 'linear-gradient(135deg, #ede9fe, #f5f3ff)',
            accent: '#7c3aed',
            text: '#1e293b',
            card: 'rgba(249, 250, 251, 0.95)',
            border: 'rgba(124, 58, 237, 0.18)'
        },
        special: 'none'
    },
    {
        id: 'adventure',
        title: 'Adventure',
        icon: '🧭',
        subtitle: 'Exciting journeys and bold challenges',
        description: 'Adventure fills my mind with daring stories and bold goals.',
        details: [
            'I enjoy learning by doing and exploring new ideas.',
            'Adventure gives every day a sense of excitement.',
            'I like setting goals that feel fun and daring.'
        ],
        theme: {
            bg: 'linear-gradient(135deg, #e9f5db, #daf5d8)',
            accent: '#16a34a',
            text: '#0f172a',
            card: 'rgba(249, 250, 251, 0.95)',
            border: 'rgba(22, 163, 74, 0.18)'
        },
        special: 'none'
    },
    {
        id: 'nature',
        title: 'Nature',
        icon: '🌿',
        subtitle: 'Plants, animals, and natural beauty',
        description: 'Nature inspires calm thinking, wonder, and learning.',
        details: [
            'I enjoy the colors and sounds of nature.',
            'Natural scenes help me feel peaceful and creative.',
            'I love learning about forests, mountains, and animals.'
        ],
        theme: {
            bg: 'linear-gradient(135deg, #dcfce7, #bbf7d0)',
            accent: '#22c55e',
            text: '#0f172a',
            card: 'rgba(240, 253, 244, 0.95)',
            border: 'rgba(34, 197, 94, 0.18)'
        },
        special: 'none'
    },
    {
        id: 'art',
        title: 'Art',
        icon: '🖌️',
        subtitle: 'Drawing, painting, and creative expression',
        description: 'Art helps me express ideas and feel more inspired.',
        details: [
            'I love experimenting with color and shape.',
            'Art makes projects more personal and exciting.',
            'I enjoy seeing how different styles create different moods.'
        ],
        theme: {
            bg: 'linear-gradient(135deg, #ffedd5, #fee2e2)',
            accent: '#fb7185',
            text: '#1f2937',
            card: 'rgba(255, 247, 237, 0.95)',
            border: 'rgba(251, 113, 133, 0.18)'
        },
        special: 'none'
    },
    {
        id: 'football',
        title: 'Football',
        icon: '⚽',
        subtitle: 'Sports, teamwork, and energy',
        description: 'I enjoy football for its teamwork, movement, and fun spirit.',
        details: [
            'Sports teach me strategy and teamwork.',
            'Football helps me stay active and focused.',
            'I love the energy of a fast match.'
        ],
        theme: {
            bg: 'linear-gradient(135deg, #f0fdfa, #d1fae5)',
            accent: '#059669',
            text: '#0f172a',
            card: 'rgba(240, 253, 250, 0.95)',
            border: 'rgba(5, 150, 105, 0.18)'
        },
        special: 'none'
    },
    {
        id: 'history',
        title: 'History',
        icon: '📜',
        subtitle: 'Past stories and lessons from the world',
        description: 'History helps me understand how people and places changed over time.',
        details: [
            'I like reading about ancient civilizations and heroes.',
            'History shows how ideas develop and evolve.',
            'I enjoy learning the stories behind important events.'
        ],
        theme: {
            bg: 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
            accent: '#475569',
            text: '#0f172a',
            card: 'rgba(248, 250, 252, 0.95)',
            border: 'rgba(71, 85, 105, 0.18)'
        },
        special: 'none'
    },
    {
        id: 'comics',
        title: 'Comics',
        icon: '🦸',
        subtitle: 'Heroes, adventure, and funny panels',
        description: 'I love comics because they are colorful, exciting, and full of heroes.',
        details: [
            'Comics combine pictures and stories in a fun way.',
            'Super heroes and adventures spark my imagination.',
            'I enjoy reading amazing panels and plot twists.'
        ],
        theme: {
            bg: 'linear-gradient(135deg, #ffedd5, #fef3c7)',
            accent: '#f97316',
            text: '#1f2937',
            card: 'rgba(255, 249, 238, 0.95)',
            border: 'rgba(249, 115, 22, 0.18)'
        },
        special: 'none'
    },
    {
        id: 'fiction',
        title: 'Fiction',
        icon: '📖',
        subtitle: 'Imaginary worlds and storytelling',
        description: 'Fiction lets me imagine worlds beyond the everyday.',
        details: [
            'Stories help me build creative ideas in my mind.',
            'Fiction can be funny, exciting, or adventurous.',
            'I enjoy reading scenes that feel magical and new.'
        ],
        theme: {
            bg: 'linear-gradient(135deg, #ede9fe, #f5f3ff)',
            accent: '#7c3aed',
            text: '#1e293b',
            card: 'rgba(249, 250, 251, 0.95)',
            border: 'rgba(124, 58, 237, 0.18)'
        },
        special: 'none'
    },
    {
        id: 'languages',
        title: 'Languages',
        icon: '🗣️',
        subtitle: 'Learning words and ideas from around the world',
        description: 'I enjoy learning new languages because they open doors to new cultures.',
        details: [
            'Languages help me connect with more people.',
            'I like the sound of different accents and words.',
            'Learning languages makes reading and writing more exciting.'
        ],
        theme: {
            bg: 'linear-gradient(135deg, #e0f2fe, #dbeafe)',
            accent: '#2563eb',
            text: '#0f172a',
            card: 'rgba(240, 249, 255, 0.95)',
            border: 'rgba(59, 130, 246, 0.18)'
        },
        special: 'none'
    },
    {
        id: 'food',
        title: 'Food',
        icon: '🍛',
        subtitle: 'Tasty dishes and favorite treats',
        description: 'Food is one of my favorite things to talk about and explore.',
        details: [
            'I love trying different flavors and dishes.',
            'Food gives energy and makes gatherings fun.',
            'I enjoy learning about food from different cultures.'
        ],
        theme: {
            bg: 'linear-gradient(135deg, #fef3c7, #fde68a)',
            accent: '#f59e0b',
            text: '#1f2937',
            card: 'rgba(255, 250, 235, 0.95)',
            border: 'rgba(245, 158, 11, 0.18)'
        },
        special: 'none'
    },
    {
        id: 'photography',
        title: 'Photography',
        icon: '📷',
        subtitle: 'Capturing moments and creative frames',
        description: 'Photography helps me see the world through a different lens.',
        details: [
            'I like how photos can tell stories without words.',
            'Good lighting and composition make pictures feel alive.',
            'Taking photos is a fun way to remember amazing moments.'
        ],
        theme: {
            bg: 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
            accent: '#475569',
            text: '#0f172a',
            card: 'rgba(248, 250, 252, 0.95)',
            border: 'rgba(71, 85, 105, 0.18)'
        },
        special: 'none'
    },
    {
        id: 'physics',
        title: 'Physics',
        icon: '🧲',
        subtitle: 'Forces, energy, and the laws of motion',
        description: 'Physics explains how the world and universe move and behave.',
        details: [
            'I enjoy thinking about how things fall, fly, and move.',
            'Physics is the science behind machines and space travel.',
            'Learning physics makes systems feel logical and amazing.'
        ],
        theme: {
            bg: 'linear-gradient(135deg, #eef2ff, #e0e7ff)',
            accent: '#6366f1',
            text: '#1e293b',
            card: 'rgba(247, 250, 255, 0.96)',
            border: 'rgba(99, 102, 241, 0.18)'
        },
        special: 'none'
    },
    {
        id: 'psychology',
        title: 'Psychology',
        icon: '🧠',
        subtitle: 'Mind, emotions, and how we think',
        description: 'Psychology helps me understand how people feel and learn.',
        details: [
            'I enjoy learning why people act the way they do.',
            'Understanding emotions makes me better at communicating.',
            'Psychology helps with study habits and teamwork.'
        ],
        theme: {
            bg: 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
            accent: '#0f766e',
            text: '#0f172a',
            card: 'rgba(248, 250, 252, 0.95)',
            border: 'rgba(15, 118, 110, 0.18)'
        },
        special: 'none'
    },
    {
        id: 'fitness',
        title: 'Fitness',
        icon: '🏃',
        subtitle: 'Exercise, energy, and staying healthy',
        description: 'Fitness keeps my body active and my mind ready for learning.',
        details: [
            'I like moving, stretching, and staying strong.',
            'Exercise helps me feel focused and energized for school.',
            'Healthy habits make everything easier and more fun.'
        ],
        theme: {
            bg: 'linear-gradient(135deg, #dcfce7, #bbf7d0)',
            accent: '#22c55e',
            text: '#0f172a',
            card: 'rgba(240, 253, 244, 0.95)',
            border: 'rgba(34, 197, 94, 0.18)'
        },
        special: 'none'
    },
    {
        id: 'future-tech',
        title: 'Future Tech',
        icon: '🛰️',
        subtitle: 'Robots, AI, and tomorrow’s gadgets',
        description: 'Future technology excites me with tomorrow’s possibilities.',
        details: [
            'I imagine what gadgets will look like in the future.',
            'AI and robots are some of the most exciting ideas.',
            'Tech can make life smarter, faster, and more playful.'
        ],
        theme: {
            bg: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
            accent: '#2563eb',
            text: '#0f172a',
            card: 'rgba(241, 245, 255, 0.95)',
            border: 'rgba(37, 99, 235, 0.18)'
        },
        special: 'none'
    },
    {
        id: 'superheroes',
        title: 'Superheroes',
        icon: '🦸‍♂️',
        subtitle: 'Heroes, powers, and epic battles',
        description: 'Superheroes are exciting because they combine power and heart.',
        details: [
            'I love the energy of hero stories and bold missions.',
            'Heroes show courage, creativity, and teamwork.',
            'The stories are full of adventure and big ideas.'
        ],
        theme: {
            bg: 'linear-gradient(135deg, #fdf2f8, #fce7f3)',
            accent: '#db2777',
            text: '#1f2937',
            card: 'rgba(255, 247, 250, 0.95)',
            border: 'rgba(219, 39, 119, 0.18)'
        },
        special: 'none'
    },
    {
        id: 'esports',
        title: 'Esports',
        icon: '🎮',
        subtitle: 'Competitive gaming and team strategy',
        description: 'Esports brings teamwork, practice, and fast thinking together.',
        details: [
            'I love the excitement of a played match and quick moves.',
            'Esports blends games with training and strategy.',
            'It helps me learn how to stay calm and perform better.'
        ],
        theme: {
            bg: 'linear-gradient(135deg, #eef2ff, #e0e7ff)',
            accent: '#6366f1',
            text: '#1e293b',
            card: 'rgba(247, 250, 255, 0.95)',
            border: 'rgba(99, 102, 241, 0.18)'
        },
        special: 'none'
    },
    {
        id: 'friends',
        title: 'Friends',
        icon: '👫',
        subtitle: 'Fun times, teamwork, and support',
        description: 'Friends make learning and playing much more fun.',
        details: [
            'I enjoy sharing ideas and games with friends.',
            'Friends help each other stay motivated and happy.',
            'Good teamwork makes every project stronger.'
        ],
        theme: {
            bg: 'linear-gradient(135deg, #fff7ed, #ffedd5)',
            accent: '#f97316',
            text: '#1f2937',
            card: 'rgba(255, 247, 238, 0.95)',
            border: 'rgba(249, 115, 22, 0.18)'
        },
        special: 'none'
    },
    {
        id: 'family',
        title: 'Family',
        icon: '👪',
        subtitle: 'Support, love, and inspiration',
        description: 'Family is where my values, dreams, and support start.',
        details: [
            'My family encourages me to learn and grow.',
            'Family time makes me feel safe and motivated.',
            'I am thankful for their support in every project.'
        ],
        theme: {
            bg: 'linear-gradient(135deg, #fffbeb, #fef3c7)',
            accent: '#f59e0b',
            text: '#1f2937',
            card: 'rgba(255, 250, 235, 0.95)',
            border: 'rgba(245, 158, 11, 0.18)'
        },
        special: 'none'
    },
    {
        id: 'goals',
        title: 'Goals',
        icon: '🎯',
        subtitle: 'Dreams, plans, and daily progress',
        description: 'Setting goals helps me stay focused and improve every day.',
        details: [
            'I use small steps to reach big dreams.',
            'Goals help me stay motivated in school and coding.',
            'I track progress and celebrate each win.'
        ],
        theme: {
            bg: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
            accent: '#2563eb',
            text: '#0f172a',
            card: 'rgba(241, 245, 255, 0.95)',
            border: 'rgba(37, 99, 235, 0.18)'
        },
        special: 'none'
    },
    {
        id: 'money',
        title: 'Money',
        icon: '💰',
        subtitle: 'Dreams, savings, and success',
        description: 'Money is a way to reach goals and make future plans real.',
        details: [
            'I think about saving for cool tech and learning tools.',
            'Smart money habits help me build better habits.',
            'Dreams feel more possible when I plan carefully.'
        ],
        theme: {
            bg: 'linear-gradient(135deg, #fef9c3, #fef08a)',
            accent: '#ca8a04',
            text: '#1f2937',
            card: 'rgba(255, 251, 235, 0.95)',
            border: 'rgba(202, 138, 4, 0.18)'
        },
        special: 'none'
    },
    {
        id: 'moon',
        title: 'Moon',
        icon: '🌙',
        subtitle: 'Night skies and quiet wonder',
        description: 'The moon makes me think about dreams, calm nights, and space.',
        details: [
            'Night skies feel peaceful and inspiring.',
            'I enjoy thinking about moonlight and space travel.',
            'The moon is a symbol of wonder and new ideas.'
        ],
        theme: {
            bg: 'linear-gradient(135deg, #0f172a, #1e293b)',
            accent: '#38bdf8',
            text: '#e2e8f0',
            card: 'rgba(15, 23, 42, 0.92)',
            border: 'rgba(56, 189, 248, 0.18)'
        },
        special: 'none'
    },
    {
        id: 'planets',
        title: 'Planets',
        icon: '🪐',
        subtitle: 'Solar system worlds and cosmic color',
        description: 'Planets fill my imagination with colors, orbits, and galaxies.',
        details: [
            'Each planet has its own story and feeling.',
            'I love thinking about distant worlds and stars.',
            'The solar system inspires science and imagination.'
        ],
        theme: {
            bg: 'linear-gradient(135deg, #e0e7ff, #c7d2fe)',
            accent: '#4f46e5',
            text: '#1e293b',
            card: 'rgba(241, 245, 255, 0.95)',
            border: 'rgba(79, 70, 229, 0.18)'
        },
        special: 'none'
    },
    {
        id: 'deep-sea',
        title: 'Deep Sea',
        icon: '🌊',
        subtitle: 'Ocean depths and mysterious creatures',
        description: 'The deep sea is full of mystery, creatures, and blue wonder.',
        details: [
            'Ocean stories feel magical and full of discovery.',
            'I like thinking about creatures that live deep underwater.',
            'The sea inspires calm and curiosity at the same time.'
        ],
        theme: {
            bg: 'linear-gradient(135deg, #e0f2fe, #bae6fd)',
            accent: '#0ea5e9',
            text: '#0f172a',
            card: 'rgba(240, 249, 255, 0.96)',
            border: 'rgba(14, 165, 233, 0.18)'
        },
        special: 'none'
    },
    {
        id: 'challenges',
        title: 'Challenges',
        icon: '🧩',
        subtitle: 'Solving puzzles and testing skills',
        description: 'Challenges help me learn faster and push myself to do better.',
        details: [
            'I enjoy coding puzzles and school challenges.',
            'Hard problems teach me new ways to think.',
            'Challenges feel rewarding when I solve them.'
        ],
        theme: {
            bg: 'linear-gradient(135deg, #f3f4f6, #e2e8f0)',
            accent: '#475569',
            text: '#0f172a',
            card: 'rgba(248, 250, 252, 0.95)',
            border: 'rgba(71, 85, 105, 0.18)'
        },
        special: 'none'
    },
    {
        id: 'electric',
        title: 'Electric Vehicles',
        icon: '⚡',
        subtitle: 'Fast cars, future rides, and clean power',
        description: 'Electric vehicles are part of the future I want to learn about.',
        details: [
            'I like the idea of clean, fast transportation.',
            'Future vehicles feel cool and smart.',
            'Technology can make travel more exciting and green.'
        ],
        theme: {
            bg: 'linear-gradient(135deg, #e0f7fa, #ccfbf1)',
            accent: '#06b6d4',
            text: '#0f172a',
            card: 'rgba(240, 253, 254, 0.95)',
            border: 'rgba(6, 182, 212, 0.18)'
        },
        special: 'none'
    },
    {
        id: 'story',
        title: 'Stories',
        icon: '📜',
        subtitle: 'Tales, imagination, and world-building',
        description: 'Stories are a wonderful way to explore new ideas and feelings.',
        details: [
            'I enjoy stories that make me think and dream.',
            'Fiction and real-life stories both teach me lessons.',
            'I like imagining characters and worlds while I read.'
        ],
        theme: {
            bg: 'linear-gradient(135deg, #fff7ed, #ffedd5)',
            accent: '#f97316',
            text: '#1f2937',
            card: 'rgba(255, 247, 238, 0.95)',
            border: 'rgba(249, 115, 22, 0.18)'
        },
        special: 'none'
    },
    {
        id: 'gaming',
        title: 'Gaming',
        icon: '🎮',
        subtitle: 'Fun, control, and friendly competition',
        description: 'Gaming is one of the most fun ways to practice strategy and quick thinking.',
        details: [
            'I love exploring games with cool mechanics and visuals.',
            'Playing games helps me think faster and stay creative.',
            'I enjoy both casual play and serious practice.'
        ],
        theme: {
            bg: 'linear-gradient(135deg, #e9d5ff, #f3e8ff)',
            accent: '#8b5cf6',
            text: '#1e293b',
            card: 'rgba(250, 243, 255, 0.95)',
            border: 'rgba(139, 92, 246, 0.18)'
        },
        special: 'none'
    },
    {
        id: 'learning',
        title: 'Learning',
        icon: '📘',
        subtitle: 'Studying new skills and growing every day',
        description: 'Learning is a big part of my life, whether in school or on my own.',
        details: [
            'I enjoy learning from books, projects, and friends.',
            'Skills like coding and reading make me feel capable.',
            'I like trying new topics and improving step by step.'
        ],
        theme: {
            bg: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
            accent: '#3b82f6',
            text: '#0f172a',
            card: 'rgba(241, 245, 255, 0.95)',
            border: 'rgba(59, 130, 246, 0.18)'
        },
        special: 'none'
    },
    {
        id: 'coding-challenges',
        title: 'Coding Challenges',
        icon: '💡',
        subtitle: 'Fun puzzles with code and logic',
        description: 'Coding challenges are a great way to practice problem-solving skills.',
        details: [
            'I enjoy solving problems and finding elegant solutions.',
            'Challenges keep my thinking sharp and creative.',
            'They help me become a more confident programmer.'
        ],
        theme: {
            bg: 'linear-gradient(135deg, #e0f2fe, #bae6fd)',
            accent: '#0384c7',
            text: '#0f172a',
            card: 'rgba(240, 249, 255, 0.95)',
            border: 'rgba(2, 132, 199, 0.18)'
        },
        special: 'none'
    },
    {
        id: 'ai',
        title: 'Artificial Intelligence',
        icon: '🤖',
        subtitle: 'Smart machines and future thinking',
        description: 'AI feels futuristic and exciting because it learns from data and patterns.',
        details: [
            'I am curious about how AI can help people and projects.',
            'AI combines math, logic, and creativity.',
            'I like imagining future tools powered by smart systems.'
        ],
        theme: {
            bg: 'linear-gradient(135deg, #e0f2fe, #dbeafe)',
            accent: '#2563eb',
            text: '#0f172a',
            card: 'rgba(240, 249, 255, 0.95)',
            border: 'rgba(59, 130, 246, 0.18)'
        },
        special: 'none'
    },
    {
        id: 'spacecraft',
        title: 'Spacecraft',
        icon: '🛸',
        subtitle: 'Ships for exploring space and aliens',
        description: 'Spacecraft are the coolest way to travel between planets and stars.',
        details: [
            'I love imagining ships flying past planets and stars.',
            'Spacecraft are full of technology and mystery.',
            'A page about spacecraft should feel futuristic and exciting.'
        ],
        theme: {
            bg: 'linear-gradient(135deg, #0f172a, #1e293b)',
            accent: '#38bdf8',
            text: '#e2e8f0',
            card: 'rgba(15, 23, 42, 0.92)',
            border: 'rgba(56, 189, 248, 0.18)'
        },
        special: 'none'
    },
    {
        id: 'writing',
        title: 'Writing',
        icon: '✍️',
        subtitle: 'Stories, essays, and journaling',
        description: 'Writing helps me express ideas, practice language, and tell stories that matter.',
        details: [
            'I enjoy writing about my favorite books, games, and dreams.',
            'Journaling helps me remember what I learn each day.',
            'Writing gives my thoughts a creative and clear shape.'
        ],
        theme: {
            bg: 'linear-gradient(135deg, #fff7ed, #ffe4d6)',
            accent: '#fb7185',
            text: '#1f2937',
            card: 'rgba(255, 247, 238, 0.95)',
            border: 'rgba(251, 113, 133, 0.18)'
        },
        special: 'none'
    },
    {
        id: 'design',
        title: 'Design',
        icon: '🎨',
        subtitle: 'Creative layouts, colors, and visuals',
        description: 'Design is the way ideas look, feel, and become easy to understand.',
        details: [
            'I enjoy choosing colors, shapes, and styles that feel exciting.',
            'Good design makes websites and projects more fun to use.',
            'Design helps me bring my ideas to life with a strong visual style.'
        ],
        theme: {
            bg: 'linear-gradient(135deg, #ede9fe, #f5f3ff)',
            accent: '#8b5cf6',
            text: '#1e293b',
            card: 'rgba(249, 250, 251, 0.95)',
            border: 'rgba(139, 92, 246, 0.18)'
        },
        special: 'none'
    },
    {
        id: 'dreams',
        title: 'Dreams',
        icon: '🌠',
        subtitle: 'Aspirations, ideas, and future goals',
        description: 'Dreams help me imagine what I want to build, learn, and become.',
        details: [
            'I think about future stories, projects, and achievements.',
            'Dreams keep me motivated when I face hard challenges.',
            'My dreams are full of learning, creativity, and fun.'
        ],
        theme: {
            bg: 'linear-gradient(135deg, #f3e8ff, #e9d5ff)',
            accent: '#c084fc',
            text: '#1f2937',
            card: 'rgba(250, 245, 255, 0.95)',
            border: 'rgba(192, 132, 252, 0.18)'
        },
        special: 'none'
    }
];

const canvas = document.getElementById('bg-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;
let width = window.innerWidth;
let height = window.innerHeight;
let particles = [];
let weatherMode = 'none';

function resizeCanvas() {
    if (!canvas) return;
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor(type) {
        this.type = type;
        this.reset();
    }
    reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        if (this.type === 'ambient') {
            this.size = Math.random() * 4.5 + 3.5;
            this.speedY = Math.random() * 0.25 - 0.125;
            this.speedX = Math.random() * 0.25 - 0.125;
            this.opacity = Math.random() * 0.4 + 0.3;
            this.pulse = Math.random() * Math.PI * 2;
            this.pulseSpeed = Math.random() * 0.02 + 0.01;
        } else if (this.type === 'rain') {
            this.y = Math.random() * -height;
            this.size = Math.random() * 2.5 + 2;
            this.speedY = Math.random() * 16 + 20;
            this.speedX = Math.random() * 2 - 1;
            this.length = Math.random() * 45 + 35;
            this.opacity = Math.random() * 0.35 + 0.45;
            this.wobble = Math.random() * Math.PI * 2;
            this.wobbleAmount = Math.random() * 0.3 + 0.1;
        } else if (this.type === 'meteor') {
            this.x = Math.random() * width * 1.5;
            this.y = Math.random() * -height;
            this.size = Math.random() * 2.5 + 1.5;
            this.speedY = Math.random() * 12 + 12;
            this.speedX = -Math.random() * 12 - 12;
            this.length = Math.random() * 80 + 60;
            this.trail = [];
            this.tailOpacity = 1;
        }
    }
    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        if (this.type === 'ambient') {
            this.pulse += this.pulseSpeed;
        } else if (this.type === 'rain') {
            this.wobble += 0.1;
            this.x += Math.sin(this.wobble) * this.wobbleAmount;
        } else if (this.type === 'meteor') {
            this.trail.push({x: this.x, y: this.y, opacity: this.tailOpacity});
            if (this.trail.length > 8) this.trail.shift();
            this.tailOpacity *= 0.92;
        }
        if (this.y > height || this.x < -100 || this.x > width + 100) {
            this.reset();
        }
    }
    draw() {
        if (!ctx) return;
        const isDark = document.body.classList.contains('dark-mode');
        
        if (this.type === 'ambient') {
            const pulse = Math.sin(this.pulse) * 0.3 + 0.7;
            const baseOpacity = this.opacity * pulse;
            const coreColor = isDark
                ? `rgba(150, 240, 255, ${baseOpacity})`
                : `rgba(255, 220, 130, ${baseOpacity})`;
            const glowColor = isDark ? 'rgba(80, 180, 255, 0.6)' : 'rgba(255, 200, 100, 0.5)';
            
            ctx.shadowBlur = isDark ? 35 : 25;
            ctx.shadowColor = isDark ? 'rgba(100, 200, 255, 0.7)' : 'rgba(255, 210, 150, 0.5)';
            ctx.fillStyle = coreColor;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.fillStyle = glowColor;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * 1.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
            
        } else if (this.type === 'rain') {
            ctx.strokeStyle = isDark 
                ? `rgba(140, 220, 255, ${this.opacity * 0.8})` 
                : `rgba(255, 210, 120, ${this.opacity * 0.85})`;
            ctx.lineWidth = this.size;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.shadowBlur = 10;
            ctx.shadowColor = isDark ? 'rgba(120, 210, 255, 0.5)' : 'rgba(255, 220, 140, 0.35)';
            
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x, this.y - this.length);
            ctx.stroke();
            
            ctx.strokeStyle = isDark
                ? `rgba(100, 200, 255, ${this.opacity * 0.4})`
                : `rgba(255, 200, 100, ${this.opacity * 0.4})`;
            ctx.lineWidth = this.size * 2.5;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x, this.y - this.length);
            ctx.stroke();
            ctx.shadowBlur = 0;
            
        } else if (this.type === 'meteor') {
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            
            this.trail.forEach((point, idx) => {
                const trailOpacity = (idx / this.trail.length) * 0.8;
                ctx.strokeStyle = isDark 
                    ? `rgba(100, 180, 255, ${trailOpacity})`
                    : `rgba(255, 240, 100, ${trailOpacity})`;
                ctx.lineWidth = this.size * (1 - idx / this.trail.length);
                ctx.shadowBlur = 12;
                ctx.shadowColor = isDark ? 'rgba(100, 200, 255, 0.6)' : 'rgba(255, 220, 120, 0.5)';
                
                ctx.beginPath();
                if (idx > 0) {
                    ctx.moveTo(this.trail[idx - 1].x, this.trail[idx - 1].y);
                    ctx.lineTo(point.x, point.y);
                } else {
                    ctx.moveTo(this.x, this.y);
                    ctx.lineTo(point.x, point.y);
                }
                ctx.stroke();
            });
            
            ctx.shadowBlur = 20;
            ctx.shadowColor = isDark ? 'rgba(150, 220, 255, 0.8)' : 'rgba(255, 255, 180, 0.8)';
            ctx.fillStyle = isDark ? 'rgba(180, 240, 255, 0.9)' : 'rgba(255, 255, 200, 0.95)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * 1.2, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }
}

for (let i = 0; i < 50; i++) {
    particles.push(new Particle('ambient'));
}

function animate() {
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
        if (p.type === 'ambient' || p.type === weatherMode) {
            p.update();
            p.draw();
        }
    });
    requestAnimationFrame(animate);
}

animate();

if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        if (isDarkMode) {
            toggleBtn.textContent = '☀️ Light Mode';
            if (lightImg) lightImg.classList.remove('active');
            if (darkImg) darkImg.classList.add('active');
        } else {
            toggleBtn.textContent = '🌙 Dark Mode';
            if (darkImg) darkImg.classList.remove('active');
            if (lightImg) lightImg.classList.add('active');
        }
        weatherMode = 'none';
    });
}

const imgContainer = document.getElementById('interactive-img');
const uiWrapper = document.getElementById('ui-wrapper');
const errorScreen = document.getElementById('error-screen');
const countdownEl = document.getElementById('countdown');

let clickCount = 0;
let clickTimer;
let isCrashing = false;

if (imgContainer) {
    imgContainer.addEventListener('click', () => {
        if (isCrashing) return;
        clickCount++;
        const isDark = document.body.classList.contains('dark-mode');
        weatherMode = isDark ? 'meteor' : 'rain';
        if (particles.filter(p => p.type === weatherMode).length === 0) {
            for (let i = 0; i < 100; i++) particles.push(new Particle(weatherMode));
        }
        clearTimeout(clickTimer);
        clickTimer = setTimeout(() => {
            clickCount = 0;
            weatherMode = 'none';
        }, 30000);
    });
}

function triggerChaos() {
    if (!uiWrapper) return;
    isCrashing = true;
    weatherMode = 'none';
    clickCount = 0;
    uiWrapper.classList.add('falling-apart');
    setTimeout(() => {
        if (errorScreen && countdownEl) {
            errorScreen.classList.remove('hidden');
            let count = 3;
            countdownEl.innerText = count;
            const interval = setInterval(() => {
                count--;
                if (count > 0) {
                    countdownEl.innerText = count;
                } else {
                    clearInterval(interval);
                    if (errorScreen && uiWrapper) {
                        errorScreen.classList.add('hidden');
                        uiWrapper.classList.remove('falling-apart');
                        isCrashing = false;
                        weatherMode = 'rain';
                    }
                }
            }, 1000);
        }
    }, 1500);
}

function getQueryParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}

function findTopic(id) {
    return topics.find(topic => topic.id === id);
}

function buildTopicCards() {
    if (!topicCardsContainer) return;
    topics.forEach(topic => {
        const card = document.createElement('a');
        card.className = 'topic-card';
        card.href = `topic.html?topic=${encodeURIComponent(topic.id)}`;
        card.innerHTML = `
            <div class="topic-icon">${topic.icon}</div>
            <h3>${topic.title}</h3>
            <p>${topic.subtitle}</p>
        `;
        topicCardsContainer.appendChild(card);
    });
}

function applyTopicTheme(theme) {
    document.documentElement.style.setProperty('--page-bg', theme.bg);
    document.documentElement.style.setProperty('--page-text', theme.text);
    document.documentElement.style.setProperty('--page-card-bg', theme.card);
    document.documentElement.style.setProperty('--page-card-border', theme.border);
}

function createMoneyShower() {
    if (!topicEffect) return;
    topicEffect.classList.add('money-shower');
    topicEffect.innerHTML = '';
    for (let i = 0; i < 16; i++) {
        const drop = document.createElement('span');
        drop.className = 'money-drop';
        drop.textContent = i % 2 === 0 ? '$' : '💰';
        drop.style.left = `${Math.random() * 88 + 6}%`;
        drop.style.animationDelay = `${Math.random() * 1.5}s`;
        drop.style.fontSize = `${Math.random() * 1.4 + 1}rem`;
        topicEffect.appendChild(drop);
    }
}

function loadTopicPage() {
    if (!topicTitle || !topicDescription || !topicBadge || !topicDetail) return;
    const requested = getQueryParam('topic') || 'reading';
    const topic = findTopic(requested) || topics[0];
    document.title = `${topic.title} | Suyog Basnet`;
    topicBadge.textContent = `${topic.icon} ${topic.title}`;
    topicTitle.textContent = topic.title;
    topicDescription.textContent = topic.description;
    topicDetail.innerHTML = '';
    topic.details.forEach(detail => {
        const detailParagraph = document.createElement('p');
        detailParagraph.textContent = detail;
        topicDetail.appendChild(detailParagraph);
    });
    applyTopicTheme(topic.theme);
    if (topic.special === 'money-shower') {
        createMoneyShower();
    } else if (topicEffect) {
        topicEffect.innerHTML = '';
        topicEffect.classList.remove('money-shower');
    }
}

if (topicCardsContainer) {
    buildTopicCards();
}

loadTopicPage();
