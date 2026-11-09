const storageTechnologies = [
  { id: 'hdd', name: 'HDD', capacity: '500 GB to 20 TB', speed: 'Slow to moderate', durability: 'Medium', portability: 'Low', cost: 'Low per GB', bestUse: 'Backups and bulk storage' },
  { id: 'sata-ssd', name: 'SATA SSD', capacity: '120 GB to 8 TB', speed: 'Fast', durability: 'High', portability: 'Medium', cost: 'Moderate', bestUse: 'Everyday laptops and desktops' },
  { id: 'nvme-ssd', name: 'NVMe SSD', capacity: '256 GB to 8 TB', speed: 'Very fast', durability: 'High', portability: 'Medium', cost: 'Higher', bestUse: 'Gaming, editing, and high-performance work' },
  { id: 'usb', name: 'USB Flash Drive', capacity: '8 GB to 1 TB', speed: 'Moderate', durability: 'Medium', portability: 'High', cost: 'Moderate', bestUse: 'File transfer and portable backups' },
  { id: 'memory-card', name: 'Memory Card', capacity: '16 GB to 1 TB', speed: 'Fast to very fast', durability: 'Medium to high', portability: 'High', cost: 'Moderate', bestUse: 'Cameras, phones, and drones' },
  { id: 'optical', name: 'Optical Storage', capacity: '700 MB to 128 GB', speed: 'Slow', durability: 'Medium', portability: 'Medium', cost: 'Low to moderate', bestUse: 'Archive and media distribution' },
  { id: 'cloud', name: 'Cloud Storage', capacity: 'Flexible and scalable', speed: 'Depends on network', durability: 'High with redundancy', portability: 'Very high', cost: 'Pay-as-you-go', bestUse: 'Collaboration and remote backups' }
];

const recommendations = {
  gaming: ['NVMe SSD for your operating system and frequently played games.', 'Add a large HDD for older games and media if you need inexpensive capacity.', 'Keep game saves backed up in the cloud.'],
  schoolwork: ['A 500 GB SATA SSD is often enough for notes and projects.', 'Back up important assignments to cloud storage.', 'Use a USB flash drive for quick transfers.'],
  photography: ['Use a fast NVMe SSD for active editing and a memory card for camera capture.', 'Back up originals to an external HDD or cloud service.', 'Keep original and edited files in separate locations.'],
  business: ['Use SSDs for fast access to everyday applications.', 'Use encrypted storage and redundant cloud backups for important work.', 'Restrict account access and enable multi-factor authentication.'],
  backups: ['Follow the 3-2-1 rule: three copies, two types of media, one off-site.', 'Pair a local HDD with an off-site cloud backup.', 'Encrypt sensitive backups and test restores regularly.']
};

const questions = [
  { question: 'Which storage type is usually fastest for everyday system performance?', choices: ['HDD', 'SATA SSD', 'DVD', 'USB flash drive'], correct: 1, explanation: 'SSDs use flash memory and have no moving parts, so they access data faster than HDDs.' },
  { question: 'Why is cloud storage useful for schools and businesses?', choices: ['It never needs backup', 'It allows access from multiple devices and locations', 'It is always free', 'It only works with cameras'], correct: 1, explanation: 'Cloud storage makes files available from different devices and supports sharing and collaboration.' },
  { question: 'Which option is especially portable for moving files between devices?', choices: ['HDD', 'NVMe SSD', 'USB flash drive', 'Blu-ray disc'], correct: 2, explanation: 'USB flash drives are compact and designed for convenient file transfer.' },
  { question: 'Why encrypt stored data?', choices: ['To increase speed', 'To permanently delete files', 'To protect data if a device or account is accessed by someone else', 'To replace backups'], correct: 2, explanation: 'Encryption makes data unreadable without the correct key, including if a device is lost or stolen.' },
  { question: 'Which option is often a low-cost choice for large local archives?', choices: ['NVMe SSD', 'Memory card', 'HDD', 'Optical disc'], correct: 2, explanation: 'HDDs typically provide high capacity at a lower cost per gigabyte than SSDs.' }
];

// A small Web Audio-generated ambient playlist avoids broken third-party audio links.
const tracks = [
  { title: 'Calm Study Flow', notes: [261.63, 329.63, 392, 329.63] },
  { title: 'Soft Tech Pulse', notes: [220, 277.18, 329.63, 277.18] },
  { title: 'Quiet Horizon', notes: [196, 246.94, 293.66, 246.94] }
];
const mapMarkers = [
  { name: 'Google technology campus', coords: [37.422, -122.084], description: 'Technology campus in Mountain View, California.' },
  { name: 'Microsoft campus', coords: [47.6401, -122.1298], description: 'Technology and cloud computing campus in Redmond, Washington.' },
  { name: 'Stanford University', coords: [37.4275, -122.1697], description: 'University research and education in computing and data systems.' }
];

let questionIndex = 0;
let quizScore = 0;
let answered = false;
let currentTrack = 0;
let musicEnabled = false;
let audioContext = null;
let masterGain = null;
let musicTimer = null;
let musicStep = 0;

function renderComparison() {
  const selects = ['compareSelect1', 'compareSelect2', 'compareSelect3'].map((id) => document.getElementById(id));
  const header = document.getElementById('comparisonHeaderRow');
  const body = document.getElementById('comparisonBody');
  if (!header || !body || selects.some((select) => !select)) return;
  header.replaceChildren();
  ['Category', ...selects.map((select) => storageTechnologies.find((item) => item.id === select.value)?.name || 'Storage')].forEach((label) => {
    const th = document.createElement('th'); th.textContent = label; header.appendChild(th);
  });
  const fields = [['capacity', 'Capacity'], ['speed', 'Speed'], ['durability', 'Durability'], ['portability', 'Portability'], ['cost', 'Cost'], ['bestUse', 'Best use']];
  body.replaceChildren();
  fields.forEach(([field, label]) => {
    const row = body.insertRow();
    row.insertCell().textContent = label;
    selects.forEach((select) => { row.insertCell().textContent = storageTechnologies.find((item) => item.id === select.value)?.[field] || '—'; });
  });
}

function initComparison() {
  ['compareSelect1', 'compareSelect2', 'compareSelect3'].forEach((id, index) => {
    const select = document.getElementById(id);
    if (!select) return;
    select.innerHTML = storageTechnologies.map((item) => `<option value="${item.id}">${item.name}</option>`).join('');
    select.value = storageTechnologies[index].id;
    select.addEventListener('change', renderComparison);
  });
  renderComparison();
}

function updateCalculator() {
  const slider = document.getElementById('deviceCapacity');
  if (!slider) return;
  const gb = Number(slider.value);
  document.getElementById('deviceCapacityValue').textContent = gb;
  document.getElementById('photoCount').textContent = `~${Math.floor(gb * 1024 / 5).toLocaleString()}`;
  document.getElementById('songCount').textContent = `~${Math.floor(gb * 1024 / 4).toLocaleString()}`;
  document.getElementById('videoCount').textContent = `~${Math.floor(gb * 1024 / 180).toLocaleString()}`;
}

function initRecommendations() {
  const output = document.getElementById('recommendationOutput');
  const show = (use) => {
    const title = `${use.charAt(0).toUpperCase()}${use.slice(1)} recommendation`;
    output.replaceChildren();
    const heading = document.createElement('h4'); heading.textContent = title; output.appendChild(heading);
    const list = document.createElement('ul');
    recommendations[use].forEach((text) => { const li = document.createElement('li'); li.textContent = text; list.appendChild(li); });
    output.appendChild(list);
  };
  document.querySelectorAll('.recommend-btn').forEach((button) => button.addEventListener('click', () => {
    document.querySelectorAll('.recommend-btn').forEach((item) => item.classList.toggle('active', item === button));
    show(button.dataset.useCase);
  }));
  show('gaming');
}

function renderQuestion() {
  const item = questions[questionIndex];
  const title = document.getElementById('questionText');
  const choices = document.getElementById('choices');
  const feedback = document.getElementById('feedback');
  const next = document.getElementById('nextQuestionBtn');
  if (!title || !choices || !feedback || !next) return;
  answered = false;
  title.textContent = `Question ${questionIndex + 1} of ${questions.length}: ${item.question}`;
  choices.replaceChildren(); feedback.textContent = ''; feedback.className = 'feedback'; next.classList.add('hidden');
  item.choices.forEach((text, index) => {
    const button = document.createElement('button'); button.type = 'button'; button.className = 'choice-btn'; button.textContent = text;
    button.addEventListener('click', () => {
      if (answered) return;
      answered = true;
      choices.querySelectorAll('button').forEach((choice, i) => { choice.disabled = true; if (i === item.correct) choice.classList.add('correct'); if (i === index && i !== item.correct) choice.classList.add('incorrect'); });
      if (index === item.correct) { quizScore += 1; feedback.textContent = `Correct! ${item.explanation}`; feedback.classList.add('correct'); }
      else { feedback.textContent = `Not quite. ${item.explanation}`; feedback.classList.add('incorrect'); }
      document.getElementById('scoreDisplay').textContent = `${quizScore} / ${questions.length}`;
      next.textContent = questionIndex === questions.length - 1 ? 'See final score' : 'Next Question';
      next.classList.remove('hidden');
    });
    choices.appendChild(button);
  });
}

function initQuiz() {
  const next = document.getElementById('nextQuestionBtn');
  if (!next) return;
  next.addEventListener('click', () => {
    if (questionIndex < questions.length - 1) { questionIndex += 1; renderQuestion(); return; }
    document.getElementById('questionText').textContent = 'Quiz complete!';
    const choices = document.getElementById('choices'); choices.replaceChildren();
    const result = document.createElement('p'); result.textContent = `Your final score: ${quizScore} out of ${questions.length} (${Math.round(quizScore / questions.length * 100)}%).`; choices.appendChild(result);
    const feedback = document.getElementById('feedback'); feedback.className = 'feedback'; feedback.textContent = quizScore >= 4 ? 'Excellent work!' : 'Review the concepts and try again.';
    next.textContent = 'Try Again'; next.onclick = () => { questionIndex = 0; quizScore = 0; document.getElementById('scoreDisplay').textContent = `0 / ${questions.length}`; next.onclick = null; renderQuestion(); };
  });
  renderQuestion();
}

function playMusicStep() {
  if (!audioContext || !musicEnabled) return;
  const track = tracks[currentTrack];
  const frequency = track.notes[musicStep % track.notes.length];
  const now = audioContext.currentTime;
  const oscillator = audioContext.createOscillator();
  const noteGain = audioContext.createGain();
  oscillator.type = 'sine'; oscillator.frequency.value = frequency;
  noteGain.gain.setValueAtTime(0.0001, now);
  noteGain.gain.exponentialRampToValueAtTime(0.10, now + 0.08);
  noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);
  oscillator.connect(noteGain); noteGain.connect(masterGain);
  oscillator.start(now); oscillator.stop(now + 1.7);
  musicStep += 1;
  document.getElementById('progressBar').style.width = `${(musicStep % 16) / 16 * 100}%`;
  document.getElementById('timeDisplay').textContent = `${Math.floor(musicStep / 2)}:${String((musicStep % 2) * 30).padStart(2, '0')} / 8:00`;
}

async function startMusic() {
  const PlayerContext = window.AudioContext || window.webkitAudioContext;
  if (!PlayerContext) throw new Error('This browser does not support Web Audio.');
  if (!audioContext) { audioContext = new PlayerContext(); masterGain = audioContext.createGain(); masterGain.gain.value = Number(document.getElementById('volumeControl').value); masterGain.connect(audioContext.destination); }
  await audioContext.resume();
  musicEnabled = true;
  document.getElementById('toggleMusicBtn').textContent = 'Background music: on';
  document.getElementById('playPauseBtn').textContent = 'Pause';
  document.getElementById('currentTrackTitle').textContent = tracks[currentTrack].title;
  clearInterval(musicTimer); playMusicStep(); musicTimer = setInterval(playMusicStep, 1600);
}

function stopMusic() {
  musicEnabled = false; clearInterval(musicTimer); musicTimer = null;
  if (masterGain && audioContext) masterGain.gain.setTargetAtTime(0, audioContext.currentTime, .04);
  document.getElementById('toggleMusicBtn').textContent = 'Background music: off';
  document.getElementById('playPauseBtn').textContent = 'Play';
}

function initMusic() {
  const list = document.getElementById('playlist');
  list.replaceChildren();
  tracks.forEach((track, index) => {
    const item = document.createElement('li'); item.dataset.index = index; item.classList.toggle('active', index === currentTrack);
    const name = document.createElement('span'); name.textContent = track.title;
    const play = document.createElement('span'); play.textContent = '▶'; item.append(name, play);
    item.addEventListener('click', async () => { currentTrack = index; document.getElementById('currentTrackTitle').textContent = track.title; list.querySelectorAll('li').forEach((entry, i) => entry.classList.toggle('active', i === index)); if (musicEnabled) { musicStep = 0; await startMusic(); } });
    list.appendChild(item);
  });
  document.getElementById('playPauseBtn').addEventListener('click', async () => {
    try { if (musicEnabled) stopMusic(); else { if (masterGain) masterGain.gain.setTargetAtTime(Number(document.getElementById('volumeControl').value), audioContext.currentTime, .04); await startMusic(); } }
    catch (error) { document.getElementById('currentTrackTitle').textContent = error.message; }
  });
  document.getElementById('toggleMusicBtn').addEventListener('click', async () => {
    try { if (musicEnabled) stopMusic(); else await startMusic(); }
    catch (error) { document.getElementById('currentTrackTitle').textContent = error.message; }
  });
  document.getElementById('volumeControl').addEventListener('input', (event) => { if (masterGain && audioContext) masterGain.gain.setTargetAtTime(Number(event.target.value), audioContext.currentTime, .04); });
}

function initMap() {
  const mapElement = document.querySelector('.map-search + #map');
  if (!mapElement || !window.L) return;
  const map = L.map(mapElement).setView([25, 0], 2);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '&copy; OpenStreetMap contributors' }).addTo(map);
  mapMarkers.forEach((item) => L.marker(item.coords).addTo(map).bindPopup(`<strong>${item.name}</strong><br>${item.description}`));
  const search = async () => {
    const input = document.getElementById('mapSearchInput');
    if (!input.value.trim()) return;
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(input.value.trim())}`);
      if (!response.ok) throw new Error();
      const results = await response.json();
      if (!results.length) { alert('No location found. Try another place name.'); return; }
      const place = results[0]; const point = [Number(place.lat), Number(place.lon)];
      map.setView(point, 11); L.marker(point).addTo(map).bindPopup(place.display_name).openPopup();
    } catch { alert('Location search is unavailable right now.'); }
  };
  document.getElementById('mapSearchBtn').addEventListener('click', search);
  document.getElementById('mapSearchInput').addEventListener('keydown', (event) => { if (event.key === 'Enter') search(); });
  setTimeout(() => map.invalidateSize(), 200);
}

const weatherLabels = { 0: 'Clear sky', 1: 'Mostly clear', 2: 'Partly cloudy', 3: 'Cloudy', 45: 'Foggy', 48: 'Foggy', 51: 'Drizzle', 53: 'Drizzle', 55: 'Heavy drizzle', 56: 'Freezing drizzle', 57: 'Freezing drizzle', 61: 'Rain', 63: 'Rain', 65: 'Heavy rain', 66: 'Freezing rain', 67: 'Freezing rain', 71: 'Snow', 73: 'Snow', 75: 'Heavy snow', 77: 'Snow grains', 80: 'Rain showers', 81: 'Rain showers', 82: 'Heavy showers', 85: 'Snow showers', 86: 'Heavy snow showers', 95: 'Thunderstorm', 96: 'Thunderstorm', 99: 'Thunderstorm' };
function weatherIcon(code) { if ([0, 1].includes(code)) return '☀️'; if ([2, 3].includes(code)) return '⛅'; if ([45, 48].includes(code)) return '🌫️'; if ([71, 73, 75, 77, 85, 86].includes(code)) return '❄️'; if ([95, 96, 99].includes(code)) return '⛈️'; return '🌧️'; }
function setWeatherStatus(message, error = false) { const status = document.getElementById('weatherStatus'); status.textContent = message; status.style.color = error ? '#b32645' : ''; }

async function loadWeather(city) {
  const card = document.getElementById('weatherCard');
  setWeatherStatus('Loading live weather…'); card.classList.add('hidden');
  if (!city.trim()) { setWeatherStatus('Enter a city name to search.', true); return; }
  try {
    const geoUrl = new URL('https://geocoding-api.open-meteo.com/v1/search');
    geoUrl.search = new URLSearchParams({ name: city.trim(), count: '1', language: 'en', format: 'json' });
    const geoResponse = await fetch(geoUrl);
    if (!geoResponse.ok) throw new Error('City lookup failed. Please try again.');
    const geo = await geoResponse.json();
    if (!geo.results?.length) throw new Error('City not found. Check the spelling and try again.');
    const place = geo.results[0];
    const forecastUrl = new URL('https://api.open-meteo.com/v1/forecast');
    forecastUrl.search = new URLSearchParams({ latitude: place.latitude, longitude: place.longitude, current: 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m', daily: 'weather_code,temperature_2m_max,temperature_2m_min', timezone: 'auto', forecast_days: '5' });
    const forecastResponse = await fetch(forecastUrl);
    if (!forecastResponse.ok) throw new Error('Weather service is temporarily unavailable. Please try again.');
    const data = await forecastResponse.json();
    if (!data.current || !data.daily) throw new Error('The weather service returned incomplete data.');
    document.getElementById('locationName').textContent = [place.name, place.country].filter(Boolean).join(', ');
    document.getElementById('temperature').textContent = `${Math.round(data.current.temperature_2m)}°C`;
    document.getElementById('weatherCondition').textContent = weatherLabels[data.current.weather_code] || 'Conditions unavailable';
    document.getElementById('weatherIcon').textContent = weatherIcon(data.current.weather_code);
    document.getElementById('humidity').textContent = `${data.current.relative_humidity_2m}%`;
    document.getElementById('windSpeed').textContent = `${Math.round(data.current.wind_speed_10m)} km/h`;
    const forecast = document.getElementById('forecast'); forecast.replaceChildren();
    data.daily.time.forEach((date, index) => {
      const day = document.createElement('div'); day.className = 'forecast-day';
      const name = document.createElement('span'); name.textContent = new Date(`${date}T12:00:00`).toLocaleDateString(undefined, { weekday: 'short' });
      const temps = document.createElement('strong'); temps.textContent = `${Math.round(data.daily.temperature_2m_max[index])}° / ${Math.round(data.daily.temperature_2m_min[index])}°`;
      const icon = document.createElement('div'); icon.textContent = weatherIcon(data.daily.weather_code[index]);
      const condition = document.createElement('small'); condition.textContent = weatherLabels[data.daily.weather_code[index]] || 'Conditions';
      day.append(name, temps, icon, condition); forecast.appendChild(day);
    });
    card.classList.remove('hidden'); setWeatherStatus('Live weather data from Open-Meteo.');
  } catch (error) { setWeatherStatus(error.message || 'Weather data could not be loaded. Check your connection and try again.', true); }
}

function initWeather() {
  const input = document.getElementById('cityInput');
  const search = () => loadWeather(input.value);
  document.getElementById('weatherSearchBtn').addEventListener('click', search);
  input.addEventListener('keydown', (event) => { if (event.key === 'Enter') search(); });
  loadWeather(input.value || 'Seattle');
}

function initChatbot() {
  const form = document.getElementById('chatForm'); const input = document.getElementById('chatInput'); const windowEl = document.getElementById('chatWindow');
  const replyTo = (message) => {
    const text = message.toLowerCase();
    if (text.includes('hdd') && text.includes('ssd')) return 'HDDs use spinning disks and usually cost less per gigabyte. SSDs use flash memory, so they are faster, quieter, and more shock-resistant.';
    if (text.includes('cloud')) return 'Cloud storage keeps files on remote servers for access across devices. Use strong passwords, multi-factor authentication, and backups for important data.';
    if (text.includes('backup') || text.includes('security') || text.includes('encrypt')) return 'A good plan follows 3-2-1: three copies, two types of storage, and one off-site copy. Encrypt sensitive backups and test that you can restore them.';
    if (text.includes('capacity') || text.includes('gb') || text.includes('tb')) return 'Capacity is how much data a device can hold. A 1 TB drive is about 1,000 GB; actual photo, song, and video counts vary with file size.';
    if (text.includes('gaming')) return 'For gaming, an NVMe SSD is a great choice for your operating system and current games. A larger HDD can store less-used games cheaply.';
    if (text.includes('school') || text.includes('study')) return 'For schoolwork, an SSD makes a laptop responsive. Keep assignments backed up to cloud storage and another device such as a USB drive.';
    if (text.includes('photo') || text.includes('video')) return 'For photography and video, use a fast SSD for editing, a memory card for capture, and a separate backup for originals.';
    return 'Choose storage based on speed, capacity, portability, and price: SSDs are fast, HDDs are economical for bulk storage, USB drives are portable, and cloud storage enables remote access.';
  };
  form.addEventListener('submit', (event) => {
    event.preventDefault(); const text = input.value.trim(); if (!text) return;
    const add = (value, role) => { const bubble = document.createElement('div'); bubble.className = `message ${role}`; bubble.textContent = value; windowEl.appendChild(bubble); windowEl.scrollTop = windowEl.scrollHeight; };
    add(text, 'user'); input.value = ''; window.setTimeout(() => add(replyTo(text), 'bot'), 200);
  });
}

function initializeSite() {
  // Initialize independently so an optional external map/library failure cannot disable quiz, weather, or music.
  const init = (name, callback) => { try { callback(); } catch (error) { console.error(`${name} could not initialize:`, error); } };
  init('Quiz', initQuiz); init('Music', initMusic); init('Comparison', initComparison);
  init('Calculator', () => { updateCalculator(); document.getElementById('deviceCapacity').addEventListener('input', updateCalculator); });
  init('Recommendations', initRecommendations); init('Weather', initWeather); init('Map', initMap); init('Chatbot', initChatbot);
  const navToggle = document.querySelector('.nav-toggle'); const navMenu = document.querySelector('.nav-menu');
  navToggle?.addEventListener('click', () => navMenu.classList.toggle('open'));
  navMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => navMenu.classList.remove('open')));
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initializeSite);
else initializeSite();
