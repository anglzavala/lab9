const storageTechnologies = [
  {
    id: 'hdd',
    name: 'HDD',
    capacity: '500 GB to 20 TB',
    speed: 'Slow to moderate',
    durability: 'Medium',
    portability: 'Low',
    cost: 'Low per GB',
    bestUse: 'Backups and bulk storage',
    summary: 'Mechanical hard drives offer large capacity at a low price.'
  },
  {
    id: 'sata-ssd',
    name: 'SATA SSD',
    capacity: '120 GB to 8 TB',
    speed: 'Fast',
    durability: 'High',
    portability: 'Medium',
    cost: 'Moderate',
    bestUse: 'Everyday laptops and desktops',
    summary: 'SATA SSDs are affordable upgrades for faster boot and app loading.'
  },
  {
    id: 'nvme-ssd',
    name: 'NVMe SSD',
    capacity: '256 GB to 8 TB',
    speed: 'Very fast',
    durability: 'High',
    portability: 'Medium',
    cost: 'Higher',
    bestUse: 'Gaming, editing, and high-performance work',
    summary: 'NVMe drives use PCIe interfaces for quick data transfer and lower latency.'
  },
  {
    id: 'usb',
    name: 'USB Flash Drive',
    capacity: '8 GB to 1 TB',
    speed: 'Moderate',
    durability: 'Medium',
    portability: 'High',
    cost: 'Moderate',
    bestUse: 'File transfer and portable backups',
    summary: 'Small, durable, and easy to carry for moving files between devices.'
  },
  {
    id: 'memory-card',
    name: 'Memory Card',
    capacity: '16 GB to 1 TB',
    speed: 'Fast to very fast',
    durability: 'Medium to high',
    portability: 'High',
    cost: 'Moderate',
    bestUse: 'Cameras, phones, and drones',
    summary: 'Compact storage cards are built for multimedia capture and mobile devices.'
  },
  {
    id: 'optical',
    name: 'Optical Storage',
    capacity: '700 MB to 128 GB',
    speed: 'Slow',
    durability: 'Medium',
    portability: 'Medium',
    cost: 'Low to moderate',
    bestUse: 'Archive and media distribution',
    summary: 'Discs like CD, DVD, and Blu-ray store data on removable optical media.'
  },
  {
    id: 'cloud',
    name: 'Cloud Storage',
    capacity: 'Flexible and scalable',
    speed: 'Depends on network',
    durability: 'High with redundancy',
    portability: 'Very high',
    cost: 'Pay-as-you-go',
    bestUse: 'Collaboration and remote backups',
    summary: 'Cloud storage is hosted remotely and can be accessed from almost any device.'
  }
];

const recommendationMatrix = {
  gaming: {
    title: 'Gaming Recommendation',
    items: [
      'NVMe SSD for your operating system, games, and streaming assets.',
      'Add a large HDD only if you want extra storage for older or less frequently played games.',
      'Use cloud backup for saves and game library archives.'
    ]
  },
  schoolwork: {
    title: 'Schoolwork Recommendation',
    items: [
      'A 500 GB SATA SSD is usually enough for notes, files, and course projects.',
      'Keep important assignments in cloud storage and maintain a USB flash drive copy.',
      'Use a portable USB drive for quick transfers between school and home.'
    ]
  },
  photography: {
    title: 'Photography Recommendation',
    items: [
      'Use a high-capacity NVMe SSD for active editing and a memory card for camera capture.',
      'Store finished projects on external HDDs or cloud services for backup.',
      'Create a workflow that keeps originals and edited files in separate locations.'
    ]
  },
  business: {
    title: 'Business Recommendation',
    items: [
      'Use NVMe SSDs for critical applications and fast file access.',
      'Keep redundant cloud backups for collaboration and disaster recovery.',
      'Use encrypted USB drives for portable data sharing and secure handoff.'
    ]
  },
  backups: {
    title: 'Backup Recommendation',
    items: [
      'Pair an HDD or NAS for long-term backup storage with cloud storage for off-site protection.',
      'Use encryption to protect sensitive backups from unauthorized access.',
      'Follow the 3-2-1 backup rule: three copies, two media types, one off-site copy.'
    ]
  }
};

const quizQuestions = [
  {
    question: 'Which storage type is usually the fastest for everyday system performance?',
    choices: ['HDD', 'SATA SSD', 'DVD', 'USB flash drive'],
    correct: 1,
    explanation: 'SATA SSDs are much faster than HDDs because they use flash memory instead of moving parts.'
  },
  {
    question: 'Why is cloud storage popular for schools and businesses?',
    choices: [
      'It never needs backup',
      'It allows access from multiple devices and remote locations',
      'It is always free',
      'It is only for mobile cameras'
    ],
    correct: 1,
    explanation: 'Cloud storage provides remote collaboration, easy access, and scalable data recovery tools.'
  },
  {
    question: 'Which technology is best described as highly portable and easy to carry?',
    choices: ['HDD', 'NVMe SSD', 'USB flash drive', 'Blu-ray disc'],
    correct: 2,
    explanation: 'USB flash drives are compact, portable, and convenient for moving files between devices.'
  },
  {
    question: 'What is an important reason to use encryption on stored data?',
    choices: [
      'It increases storage speed',
      'It permanently deletes files',
      'It protects data if devices are lost or stolen',
      'It removes the need for backups'
    ],
    correct: 2,
    explanation: 'Encryption helps protect files even if a storage device or cloud account is compromised.'
  },
  {
    question: 'Which storage option is usually best for a very large archive at the lowest cost per gigabyte?',
    choices: ['NVMe SSD', 'Memory card', 'HDD', 'Optical disc'],
    correct: 2,
    explanation: 'HDDs are still efficient for large backups and cold storage because they store more data for less money.'
  }
];

const musicTracks = [
  {
    title: 'Calm Study Flow',
    src: 'https://assets.mixkit.co/sfx/preview/mixkit-cinematic-whoosh-swoosh-1480.mp3'
  },
  {
    title: 'Soft Tech Pulse',
    src: 'https://assets.mixkit.co/sfx/preview/mixkit-technology-transition-1541.mp3'
  },
  {
    title: 'Quiet Horizon',
    src: 'https://assets.mixkit.co/sfx/preview/mixkit-sun-and-haze-ambient-1962.mp3'
  }
];

const mapMarkers = [
  { name: 'Google Data Center', coords: [37.421999, -122.084056], description: 'Large-scale cloud and storage infrastructure.' },
  { name: 'Amazon Web Services', coords: [47.6062, -122.3321], description: 'Global data services and digital storage platforms.' },
  { name: 'Microsoft Innovation Hub', coords: [47.6408, -122.1298], description: 'Cloud computing and enterprise technology facilities.' },
  { name: 'Stanford University', coords: [37.4275, -122.1697], description: 'Education and research in computing, data systems, and cybersecurity.' }
];

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;
let selectedUseCase = 'gaming';
let currentTrackIndex = 0;
let musicEnabled = false;

const comparisonBody = document.getElementById('comparisonBody');
const comparisonHeaderRow = document.getElementById('comparisonHeaderRow');
const compareSelects = [
  document.getElementById('compareSelect1'),
  document.getElementById('compareSelect2'),
  document.getElementById('compareSelect3')
];

function renderComparison() {
  const selectedIds = compareSelects.map((select) => select.value);

  comparisonHeaderRow.innerHTML = '';
  const metricHeader = document.createElement('th');
  metricHeader.textContent = 'Category';
  comparisonHeaderRow.appendChild(metricHeader);

  selectedIds.forEach((id) => {
    const tech = storageTechnologies.find((item) => item.id === id);
    const th = document.createElement('th');
    th.textContent = tech ? tech.name : 'Select';
    comparisonHeaderRow.appendChild(th);
  });

  const metricNames = ['capacity', 'speed', 'durability', 'portability', 'cost', 'bestUse'];
  comparisonBody.innerHTML = '';

  metricNames.forEach((metric) => {
    const row = document.createElement('tr');
    const labelCell = document.createElement('td');
    labelCell.textContent = metric === 'capacity' ? 'Capacity' : metric === 'speed' ? 'Speed' : metric === 'durability' ? 'Durability' : metric === 'portability' ? 'Portability' : metric === 'cost' ? 'Cost' : 'Best Use';
    row.appendChild(labelCell);

    selectedIds.forEach((id) => {
      const valueCell = document.createElement('td');
      const tech = storageTechnologies.find((item) => item.id === id);
      valueCell.textContent = tech ? tech[metric] : '—';
      row.appendChild(valueCell);
    });

    comparisonBody.appendChild(row);
  });
}

function setupComparisonSelects() {
  compareSelects.forEach((select, index) => {
    select.innerHTML = storageTechnologies
      .map(
        (tech) => `<option value="${tech.id}">${tech.name}</option>`
      )
      .join('');

    select.value = storageTechnologies[index % storageTechnologies.length].id;
    select.addEventListener('change', renderComparison);
  });

  renderComparison();
}

function updateCalculator() {
  const capacityGB = Number(document.getElementById('deviceCapacity').value);
  document.getElementById('deviceCapacityValue').textContent = capacityGB;

  const photoSizeMB = 5;
  const songSizeMB = 4;
  const videoSizeMB = 180;

  const photoCount = Math.floor((capacityGB * 1024) / photoSizeMB);
  const songCount = Math.floor((capacityGB * 1024) / songSizeMB);
  const videoCount = Math.floor((capacityGB * 1024) / videoSizeMB);

  document.getElementById('photoCount').textContent = `~${photoCount.toLocaleString()}`;
  document.getElementById('songCount').textContent = `~${songCount.toLocaleString()}`;
  document.getElementById('videoCount').textContent = `~${videoCount.toLocaleString()}`;
}

function renderRecommendation(useCase) {
  const output = document.getElementById('recommendationOutput');
  const recommendation = recommendationMatrix[useCase];

  output.innerHTML = `
    <h4>${recommendation.title}</h4>
    <ul>
      ${recommendation.items.map((item) => `<li>${item}</li>`).join('')}
    </ul>
  `;
}

function attachRecommendationHandlers() {
  document.querySelectorAll('.recommend-btn').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.recommend-btn').forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
      selectedUseCase = button.dataset.useCase;
      renderRecommendation(selectedUseCase);
    });
  });
}

function buildQuestion() {
  const question = quizQuestions[currentQuestionIndex];
  const questionText = document.getElementById('questionText');
  const choicesContainer = document.getElementById('choices');
  const feedback = document.getElementById('feedback');
  const nextButton = document.getElementById('nextQuestionBtn');

  questionText.textContent = `${currentQuestionIndex + 1}. ${question.question}`;
  choicesContainer.innerHTML = '';
  feedback.textContent = '';
  feedback.className = 'feedback';
  selectedAnswer = null;
  nextButton.classList.add('hidden');

  question.choices.forEach((choice, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'choice-btn';
    button.textContent = choice;
    button.addEventListener('click', () => handleAnswer(button, index));
    choicesContainer.appendChild(button);
  });
}

function handleAnswer(button, choiceIndex) {
  if (selectedAnswer !== null) return;

  const question = quizQuestions[currentQuestionIndex];
  const buttons = Array.from(document.querySelectorAll('.choice-btn'));
  selectedAnswer = choiceIndex;

  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === question.correct) {
      btn.classList.add('correct');
    }
    if (idx === choiceIndex && idx !== question.correct) {
      btn.classList.add('incorrect');
    }
  });

  const feedback = document.getElementById('feedback');
  const nextButton = document.getElementById('nextQuestionBtn');

  if (choiceIndex === question.correct) {
    score += 1;
    feedback.textContent = `Correct! ${question.explanation}`;
    feedback.classList.add('correct');
  } else {
    feedback.textContent = `Not quite. ${question.explanation}`;
    feedback.classList.add('incorrect');
  }

  document.getElementById('scoreDisplay').textContent = `${score} / ${quizQuestions.length}`;
  nextButton.classList.remove('hidden');
}

function advanceQuiz() {
  if (currentQuestionIndex < quizQuestions.length - 1) {
    currentQuestionIndex += 1;
    buildQuestion();
  } else {
    const questionText = document.getElementById('questionText');
    const choicesContainer = document.getElementById('choices');
    const feedback = document.getElementById('feedback');
    const nextButton = document.getElementById('nextQuestionBtn');

    questionText.textContent = 'Quiz complete!';
    choicesContainer.innerHTML = '';
    const resultText = document.createElement('p');
    const percentage = Math.round((score / quizQuestions.length) * 100);
    resultText.textContent = `Your final score is ${score} out of ${quizQuestions.length} (${percentage}%). Great effort!`;
    choicesContainer.appendChild(resultText);
    feedback.textContent = score >= 4 ? 'Excellent work — you understand the key storage ideas.' : 'Good effort — review the storage concepts and try again to improve your score.';
    feedback.className = `feedback ${score >= 4 ? 'correct' : 'incorrect'}`;
    nextButton.classList.add('hidden');
  }
}

function initQuiz() {
  document.getElementById('nextQuestionBtn').addEventListener('click', () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      advanceQuiz();
    } else {
      currentQuestionIndex = 0;
      score = 0;
      document.getElementById('scoreDisplay').textContent = '0 / 5';
      buildQuestion();
    }
  });

  buildQuestion();
}

function buildPlaylist() {
  const list = document.getElementById('playlist');
  list.innerHTML = musicTracks
    .map(
      (track, index) => `
        <li data-index="${index}" class="${index === currentTrackIndex ? 'active' : ''}">
          <span>${track.title}</span>
          <span>▶</span>
        </li>
      `
    )
    .join('');

  list.querySelectorAll('li').forEach((item) => {
    item.addEventListener('click', () => selectTrack(Number(item.dataset.index)));
  });
}

function formatTime(seconds) {
  if (!seconds || Number.isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function selectTrack(index) {
  currentTrackIndex = index;
  const audio = document.getElementById('audioPlayer');
  const track = musicTracks[index];
  document.getElementById('currentTrackTitle').textContent = track.title;
  audio.src = track.src;
  buildPlaylist();

  if (musicEnabled) {
    audio.play();
  }
}

function toggleMusic() {
  const btn = document.getElementById('toggleMusicBtn');
  const audio = document.getElementById('audioPlayer');
  musicEnabled = !musicEnabled;

  if (musicEnabled) {
    btn.textContent = 'Background music: on';
    if (!audio.src) {
      selectTrack(currentTrackIndex);
    }
    audio.play();
  } else {
    btn.textContent = 'Background music: off';
    audio.pause();
  }
}

function initMusicPlayer() {
  const audio = document.getElementById('audioPlayer');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const volumeControl = document.getElementById('volumeControl');

  buildPlaylist();
  document.getElementById('toggleMusicBtn').addEventListener('click', toggleMusic);
  playPauseBtn.addEventListener('click', () => {
    if (!audio.src) {
      selectTrack(currentTrackIndex);
    }
    if (musicEnabled) {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    } else {
      musicEnabled = true;
      document.getElementById('toggleMusicBtn').textContent = 'Background music: on';
      audio.play();
    }
    updatePlayButton();
  });

  volumeControl.addEventListener('input', (event) => {
    audio.volume = Number(event.target.value);
  });

  audio.volume = Number(volumeControl.value);
  audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100 || 0;
    document.getElementById('progressBar').style.width = `${progress}%`;
    document.getElementById('timeDisplay').textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
  });

  audio.addEventListener('loadedmetadata', () => {
    document.getElementById('timeDisplay').textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
  });

  audio.addEventListener('ended', () => {
    currentTrackIndex = (currentTrackIndex + 1) % musicTracks.length;
    selectTrack(currentTrackIndex);
    if (musicEnabled) {
      audio.play();
    }
    updatePlayButton();
  });

  function updatePlayButton() {
    playPauseBtn.textContent = audio.paused ? 'Play' : 'Pause';
  }

  playPauseBtn.textContent = 'Play';
}

function initMap() {
  const map = L.map('map').setView([20, 0], 2);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  mapMarkers.forEach((markerData) => {
    const marker = L.marker(markerData.coords).addTo(map);
    marker.bindPopup(`<strong>${markerData.name}</strong><br>${markerData.description}`);
  });

  const searchInput = document.getElementById('mapSearchInput');
  const searchBtn = document.getElementById('mapSearchBtn');

  searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (!query) return;

    fetch(`https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(query)}`)
      .then((response) => response.json())
      .then((data) => {
        if (!data.length) {
          alert('No location found. Try another place name.');
          return;
        }

        const firstResult = data[0];
        const lat = Number(firstResult.lat);
        const lon = Number(firstResult.lon);
        map.setView([lat, lon], 11);

        const popup = L.popup()
          .setLatLng([lat, lon])
          .setContent(`<strong>${firstResult.display_name}</strong>`)
          .openOn(map);

        popup.addTo(map);
      })
      .catch(() => {
        alert('Location search failed. Please try again.');
      });
  });
}

const weatherCodeMap = {
  0: 'Clear sky',
  1: 'Mostly clear',
  2: 'Partly cloudy',
  3: 'Cloudy',
  45: 'Foggy',
  48: 'Foggy',
  51: 'Drizzle',
  53: 'Drizzle',
  55: 'Heavy drizzle',
  56: 'Freezing drizzle',
  57: 'Freezing drizzle',
  61: 'Rain',
  63: 'Rain',
  65: 'Heavy rain',
  66: 'Freezing rain',
  67: 'Freezing rain',
  71: 'Snow',
  73: 'Snow',
  75: 'Heavy snow',
  77: 'Snow grains',
  80: 'Rain showers',
  81: 'Heavy showers',
  82: 'Heavy showers',
  85: 'Snow showers',
  86: 'Heavy snow showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm',
  99: 'Thunderstorm'
};

function getWeatherCodeLabel(code) {
  return weatherCodeMap[code] || 'Weather conditions';
}

function getWeatherIcon(code) {
  if ([0, 1].includes(code)) return '☀️';
  if ([2, 3].includes(code)) return '⛅';
  if ([45, 48].includes(code)) return '🌫️';
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return '🌧️';
  if ([71, 73, 75, 77, 85, 86].includes(code)) return '❄️';
  if ([95, 96, 99].includes(code)) return '⛈️';
  return '🌤️';
}

function renderForecast(daily) {
  const forecastContainer = document.getElementById('forecast');
  forecastContainer.innerHTML = '';

  daily.time.forEach((date, index) => {
    const card = document.createElement('div');
    card.className = 'forecast-day';

    const label = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
    const maxTemp = Math.round(daily.temperature_2m_max[index]);
    const minTemp = Math.round(daily.temperature_2m_min[index]);
    const code = daily.weather_code[index];

    card.innerHTML = `
      <span>${label}</span>
      <strong>${maxTemp}° / ${minTemp}°</strong>
      <div>${getWeatherIcon(code)}</div>
      <small>${getWeatherCodeLabel(code)}</small>
    `;

    forecastContainer.appendChild(card);
  });
}

function updateWeatherStatus(message, isError = false) {
  const status = document.getElementById('weatherStatus');
  status.textContent = message;
  status.style.color = isError ? '#b32645' : '#53657d';
}

function loadWeather(cityName) {
  updateWeatherStatus('Loading weather...');

  fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`)
    .then((response) => response.json())
    .then((geoData) => {
      if (!geoData.results || !geoData.results.length) {
        throw new Error('City not found.');
      }

      const result = geoData.results[0];
      const latitude = result.latitude;
      const longitude = result.longitude;

      return fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=5`
      )
        .then((weatherResponse) => weatherResponse.json())
        .then((weatherData) => ({ result, weatherData }));
    })
    .then(({ result, weatherData }) => {
      const current = weatherData.current;
      const daily = weatherData.daily;

      document.getElementById('locationName').textContent = `${result.name}, ${result.country}`;
      document.getElementById('temperature').textContent = `${Math.round(current.temperature_2m)}°C`;
      document.getElementById('weatherCondition').textContent = getWeatherCodeLabel(current.weather_code);
      document.getElementById('weatherIcon').textContent = getWeatherIcon(current.weather_code);
      document.getElementById('humidity').textContent = `${current.relative_humidity_2m}%`;
      document.getElementById('windSpeed').textContent = `${Math.round(current.wind_speed_10m)} km/h`;

      renderForecast(daily);
      document.getElementById('weatherCard').classList.remove('hidden');
      updateWeatherStatus('Weather data loaded successfully.');
    })
    .catch((error) => {
      document.getElementById('weatherCard').classList.add('hidden');
      updateWeatherStatus(error.message || 'Weather data could not be loaded.', true);
    });
}

function initWeather() {
  const searchInput = document.getElementById('cityInput');
  document.getElementById('weatherSearchBtn').addEventListener('click', () => {
    loadWeather(searchInput.value || 'Seattle');
  });

  searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      loadWeather(searchInput.value || 'Seattle');
    }
  });

  loadWeather('Seattle');
}

function initChatbot() {
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const chatWindow = document.getElementById('chatWindow');

  function appendMessage(message, sender) {
    const element = document.createElement('div');
    element.className = `message ${sender}`;
    element.textContent = message;
    chatWindow.appendChild(element);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  function generateBotReply(input) {
    const text = input.toLowerCase();

    if (text.includes('hdd') && text.includes('ssd')) {
      return 'HDDs store data on spinning platters and usually cost less per gigabyte. SSDs use flash memory, which makes them faster, quieter, and more reliable for everyday laptop and gaming use.';
    }

    if (text.includes('cloud')) {
      return 'Cloud storage keeps your files on remote servers, making them accessible from many devices. It is excellent for backups and sharing, but you still need strong passwords, encryption, and secure access controls.';
    }

    if (text.includes('backup') || text.includes('secure') || text.includes('security')) {
      return 'A strong backup plan should include multiple copies, encryption, and at least one off-site option such as cloud storage. The 3-2-1 rule is a great starting point: three copies, two media types, one off-site copy.';
    }

    if (text.includes('capacity') || text.includes('gb') || text.includes('tb')) {
      return 'Storage capacity tells you how much data a device can hold. For example, a 1 TB drive can store roughly 1,000 GB, enough for thousands of photos, songs, and many videos depending on file size.';
    }

    if (text.includes('gaming')) {
      return 'For gaming, an NVMe SSD is excellent for your operating system and installed games. If you need extra storage, a large HDD can hold older games and media at a lower price.';
    }

    if (text.includes('school') || text.includes('study') || text.includes('work')) {
      return 'For schoolwork, a 500 GB SATA SSD is often enough for notes, documents, and projects. Keep a backup in cloud storage and save important files to a USB flash drive as well.';
    }

    if (text.includes('photography') || text.includes('video')) {
      return 'For photography and video work, a fast NVMe SSD helps when editing large files, while a memory card is useful for camera capture. Keep a backup copy in the cloud or on an external drive.';
    }

    if (text.includes('compare') && (text.includes('usb') || text.includes('flash'))) {
      return 'USB flash drives are portable and easy for file transfer, while SSDs are better for system performance and large project files. Cloud storage is better for access from anywhere, but it depends on internet access.';
    }

    if (text.includes('hello') || text.includes('hi')) {
      return 'Hi! I can explain storage concepts, compare storage technologies, and suggest solutions for gaming, backups, or schoolwork.';
    }

    if (text.includes('quiz') || text.includes('review')) {
      return 'To review for a chapter quiz, focus on these ideas: capacity, file sizes, speed differences, durability, portability, backup planning, and encryption for data security.';
    }

    return 'A good storage choice depends on your needs: speed, capacity, portability, and cost. For example, HDDs are inexpensive for backups, SSDs are faster for daily use, USB drives are great for portability, and cloud storage excels for remote access and backups.';
  }

  chatForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = chatInput.value.trim();
    if (!message) return;

    appendMessage(message, 'user');
    chatInput.value = '';
    const reply = generateBotReply(message);
    setTimeout(() => appendMessage(reply, 'bot'), 350);
  });
}

function initializeSite() {
  setupComparisonSelects();
  updateCalculator();
  renderRecommendation(selectedUseCase);
  attachRecommendationHandlers();
  initQuiz();
  initMusicPlayer();
  initMap();
  initWeather();
  initChatbot();

  document.getElementById('deviceCapacity').addEventListener('input', updateCalculator);

  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  navToggle.addEventListener('click', () => navMenu.classList.toggle('open'));

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => navMenu.classList.remove('open'));
  });
}

initializeSite();

window.addEventListener('load', () => {
  const audio = document.getElementById('audioPlayer');
  audio.src = musicTracks[0].src;
  document.getElementById('currentTrackTitle').textContent = musicTracks[0].title;
});

window.addEventListener('beforeunload', () => {
  const audio = document.getElementById('audioPlayer');
  if (audio) {
    audio.pause();
  }
});














































































































































































"}]} ivoq to=functions.push_files untegnjson  {