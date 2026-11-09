(() => {
  'use strict';

  const quiz = [
    { q: 'Which storage type is usually fastest for everyday system performance?', a: ['HDD', 'SATA SSD', 'DVD', 'USB flash drive'], correct: 1, why: 'SSDs use flash memory and have no moving parts, so they access data faster than HDDs.' },
    { q: 'Why is cloud storage useful for schools and businesses?', a: ['It never needs backup', 'It allows access from multiple devices and locations', 'It is always free', 'It only works with cameras'], correct: 1, why: 'Cloud storage makes files available from different devices and supports sharing and collaboration.' },
    { q: 'Which option is especially portable for moving files between devices?', a: ['HDD', 'NVMe SSD', 'USB flash drive', 'Blu-ray disc'], correct: 2, why: 'USB flash drives are compact and designed for convenient file transfer.' },
    { q: 'Why encrypt stored data?', a: ['To increase speed', 'To permanently delete files', 'To protect data if a device or account is accessed by someone else', 'To replace backups'], correct: 2, why: 'Encryption makes data unreadable without the correct key, including if a device is lost or stolen.' },
    { q: 'Which option is often a low-cost choice for large local archives?', a: ['NVMe SSD', 'Memory card', 'HDD', 'Optical disc'], correct: 2, why: 'HDDs typically provide high capacity at a lower cost per gigabyte than SSDs.' }
  ];
  let qIndex = 0;
  let score = 0;
  let answered = false;

  function setupQuiz() {
    const title = document.getElementById('questionText');
    const choices = document.getElementById('choices');
    const feedback = document.getElementById('feedback');
    const scoreDisplay = document.getElementById('scoreDisplay');
    let next = document.getElementById('nextQuestionBtn');
    if (!title || !choices || !feedback || !scoreDisplay || !next) return;

    const cleanNext = next.cloneNode(true);
    next.replaceWith(cleanNext);
    next = cleanNext;

    function showQuestion() {
      answered = false;
      const item = quiz[qIndex];
      title.textContent = `Question ${qIndex + 1} of ${quiz.length}: ${item.q}`;
      choices.replaceChildren();
      feedback.textContent = '';
      feedback.className = 'feedback';
      next.classList.add('hidden');
      next.textContent = qIndex === quiz.length - 1 ? 'See final score' : 'Next Question';
      item.a.forEach((answer, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'choice-btn';
        button.textContent = answer;
        button.addEventListener('click', () => {
          if (answered) return;
          answered = true;
          choices.querySelectorAll('button').forEach((choice, i) => {
            choice.disabled = true;
            if (i === item.correct) choice.classList.add('correct');
            if (i === index && i !== item.correct) choice.classList.add('incorrect');
          });
          if (index === item.correct) {
            score += 1;
            feedback.textContent = `Correct! ${item.why}`;
            feedback.classList.add('correct');
          } else {
            feedback.textContent = `Not quite. ${item.why}`;
            feedback.classList.add('incorrect');
          }
          scoreDisplay.textContent = `${score} / ${quiz.length}`;
          next.classList.remove('hidden');
        });
        choices.appendChild(button);
      });
    }

    next.addEventListener('click', () => {
      if (qIndex < quiz.length - 1) {
        qIndex += 1;
        showQuestion();
        return;
      }
      if (title.textContent === 'Quiz complete!') {
        qIndex = 0;
        score = 0;
        scoreDisplay.textContent = `0 / ${quiz.length}`;
        showQuestion();
        return;
      }
      title.textContent = 'Quiz complete!';
      choices.replaceChildren();
      const result = document.createElement('p');
      result.textContent = `Your final score: ${score} out of ${quiz.length} (${Math.round(score / quiz.length * 100)}%).`;
      choices.appendChild(result);
      feedback.textContent = score >= 4 ? 'Excellent work!' : 'Review the concepts and try again.';
      feedback.className = `feedback ${score >= 4 ? 'correct' : 'incorrect'}`;
      next.textContent = 'Try Again';
    });
    scoreDisplay.textContent = `0 / ${quiz.length}`;
    showQuestion();
  }

  function setupWeather() {
    const oldInput = document.getElementById('cityInput');
    const oldButton = document.getElementById('weatherSearchBtn');
    const status = document.getElementById('weatherStatus');
    const card = document.getElementById('weatherCard');
    if (!oldInput || !oldButton || !status || !card) return;
    const input = oldInput.cloneNode(true);
    const button = oldButton.cloneNode(true);
    oldInput.replaceWith(input);
    oldButton.replaceWith(button);

    const labels = { 0: 'Clear sky', 1: 'Mostly clear', 2: 'Partly cloudy', 3: 'Cloudy', 45: 'Foggy', 48: 'Foggy', 51: 'Drizzle', 53: 'Drizzle', 55: 'Heavy drizzle', 61: 'Rain', 63: 'Rain', 65: 'Heavy rain', 71: 'Snow', 73: 'Snow', 75: 'Heavy snow', 80: 'Rain showers', 81: 'Rain showers', 82: 'Heavy showers', 85: 'Snow showers', 86: 'Snow showers', 95: 'Thunderstorm', 96: 'Thunderstorm', 99: 'Thunderstorm' };
    const icon = (code) => [0, 1].includes(code) ? '☀️' : [2, 3].includes(code) ? '⛅' : [45, 48].includes(code) ? '🌫️' : [71, 73, 75, 85, 86].includes(code) ? '❄️' : [95, 96, 99].includes(code) ? '⛈️' : '🌧️';
    const showStatus = (message, isError = false) => {
      status.textContent = message;
      status.style.color = isError ? '#b32645' : '';
    };
    async function load(city) {
      const query = city.trim();
      if (!query) { showStatus('Enter a city name to search.', true); return; }
      showStatus('Loading live weather…');
      card.classList.add('hidden');
      try {
        const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=en&format=json`);
        if (!geoResponse.ok) throw new Error('City lookup failed. Please try again.');
        const geo = await geoResponse.json();
        if (!geo.results || !geo.results.length) throw new Error('City not found. Check the spelling and try again.');
        const place = geo.results[0];
        const params = new URLSearchParams({ latitude: place.latitude, longitude: place.longitude, current: 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m', daily: 'weather_code,temperature_2m_max,temperature_2m_min', timezone: 'auto', forecast_days: '5' });
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
        if (!response.ok) throw new Error('Weather service is temporarily unavailable. Please try again.');
        const data = await response.json();
        if (!data.current || !data.daily) throw new Error('Weather service returned incomplete data.');
        document.getElementById('locationName').textContent = [place.name, place.country].filter(Boolean).join(', ');
        document.getElementById('temperature').textContent = `${Math.round(data.current.temperature_2m)}°C`;
        document.getElementById('weatherCondition').textContent = labels[data.current.weather_code] || 'Conditions unavailable';
        document.getElementById('weatherIcon').textContent = icon(data.current.weather_code);
        document.getElementById('humidity').textContent = `${data.current.relative_humidity_2m}%`;
        document.getElementById('windSpeed').textContent = `${Math.round(data.current.wind_speed_10m)} km/h`;
        const forecast = document.getElementById('forecast');
        forecast.replaceChildren();
        data.daily.time.forEach((date, index) => {
          const day = document.createElement('div'); day.className = 'forecast-day';
          const name = document.createElement('span'); name.textContent = new Date(`${date}T12:00:00`).toLocaleDateString(undefined, { weekday: 'short' });
          const temps = document.createElement('strong'); temps.textContent = `${Math.round(data.daily.temperature_2m_max[index])}° / ${Math.round(data.daily.temperature_2m_min[index])}°`;
          const symbol = document.createElement('div'); symbol.textContent = icon(data.daily.weather_code[index]);
          const condition = document.createElement('small'); condition.textContent = labels[data.daily.weather_code[index]] || 'Conditions';
          day.append(name, temps, symbol, condition); forecast.appendChild(day);
        });
        card.classList.remove('hidden');
        showStatus('Live weather data from Open-Meteo.');
      } catch (error) {
        showStatus(error.message || 'Weather could not load. Check your connection and try again.', true);
      }
    }
    button.addEventListener('click', () => load(input.value));
    input.addEventListener('keydown', (event) => { if (event.key === 'Enter') load(input.value); });
    load(input.value || 'Seattle');
  }

  function setupMusic() {
    const playButton = document.getElementById('playPauseBtn');
    const toggleButton = document.getElementById('toggleMusicBtn');
    const volume = document.getElementById('volumeControl');
    const title = document.getElementById('currentTrackTitle');
    const playlist = document.getElementById('playlist');
    const progress = document.getElementById('progressBar');
    const time = document.getElementById('timeDisplay');
    if (!playButton || !toggleButton || !volume || !title || !playlist) return;

    // Gentle synthesized ambient chords; no downloads, external hosts, or autoplay.
    const songs = [
      { title: 'Calm Study Flow', chords: [[261.63, 329.63, 392], [220, 261.63, 329.63], [174.61, 220, 261.63], [196, 246.94, 293.66]] },
      { title: 'Soft Tech Pulse', chords: [[220, 277.18, 329.63], [196, 246.94, 293.66], [164.81, 207.65, 246.94], [185, 233.08, 277.18]] },
      { title: 'Quiet Horizon', chords: [[196, 246.94, 293.66], [174.61, 220, 261.63], [146.83, 185, 220], [164.81, 207.65, 246.94]] }
    ];
    let context = null;
    let master = null;
    let interval = null;
    let trackIndex = 0;
    let chordIndex = 0;
    let running = false;
    let startTime = 0;

    function renderPlaylist() {
      playlist.replaceChildren();
      songs.forEach((song, index) => {
        const item = document.createElement('li'); item.classList.toggle('active', index === trackIndex); item.tabIndex = 0; item.setAttribute('role', 'button');
        const name = document.createElement('span'); name.textContent = song.title;
        const play = document.createElement('span'); play.textContent = index === trackIndex && running ? '♫' : '▶';
        item.append(name, play);
        const choose = () => { trackIndex = index; chordIndex = 0; title.textContent = song.title; renderPlaylist(); if (running) start(); };
        item.addEventListener('click', choose); item.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); choose(); } });
        playlist.appendChild(item);
      });
    }

    function playChord() {
      if (!running || !context || !master) return;
      const now = context.currentTime;
      const notes = songs[trackIndex].chords[chordIndex % songs[trackIndex].chords.length];
      notes.forEach((frequency, index) => {
        const oscillator = context.createOscillator();
        const envelope = context.createGain();
        oscillator.type = 'sine'; oscillator.frequency.value = frequency;
        envelope.gain.setValueAtTime(0.0001, now);
        envelope.gain.exponentialRampToValueAtTime(index === 0 ? 0.045 : 0.025, now + 0.6);
        envelope.gain.setTargetAtTime(0.0001, now + 2.4, 0.5);
        oscillator.connect(envelope); envelope.connect(master); oscillator.start(now); oscillator.stop(now + 4.5);
      });
      chordIndex += 1;
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      progress.style.width = `${(elapsed % 60) / 60 * 100}%`;
      time.textContent = `${Math.floor(elapsed / 60)}:${String(elapsed % 60).padStart(2, '0')} / continuous`;
    }

    async function start() {
      const Audio = window.AudioContext || window.webkitAudioContext;
      if (!Audio) { title.textContent = 'Audio is not supported in this browser'; return; }
      if (!context) { context = new Audio(); master = context.createGain(); master.connect(context.destination); }
      await context.resume();
      master.gain.cancelScheduledValues(context.currentTime);
      master.gain.setTargetAtTime(Number(volume.value), context.currentTime, 0.05);
      running = true; startTime = Date.now();
      title.textContent = songs[trackIndex].title;
      playButton.textContent = 'Pause'; toggleButton.textContent = 'Background music: on';
      clearInterval(interval); playChord(); interval = setInterval(playChord, 3000); renderPlaylist();
    }

    function stop() {
      running = false; clearInterval(interval); interval = null;
      if (context && master) master.gain.setTargetAtTime(0, context.currentTime, 0.05);
      playButton.textContent = 'Play'; toggleButton.textContent = 'Background music: off'; renderPlaylist();
    }

    playButton.replaceWith(playButton.cloneNode(true));
    toggleButton.replaceWith(toggleButton.cloneNode(true));
    const freshPlay = document.getElementById('playPauseBtn');
    const freshToggle = document.getElementById('toggleMusicBtn');
    freshPlay.addEventListener('click', () => { if (running) stop(); else start().catch(() => { title.textContent = 'Could not start audio. Try clicking Play again.'; }); });
    freshToggle.addEventListener('click', () => { if (running) stop(); else start().catch(() => { title.textContent = 'Could not start audio. Try clicking Play again.'; }); });
    volume.addEventListener('input', () => { if (context && master && running) master.gain.setTargetAtTime(Number(volume.value), context.currentTime, 0.05); });
    renderPlaylist();
  }

  function run() {
    try { setupQuiz(); } catch (error) { console.error('Quiz setup failed', error); }
    try { setupWeather(); } catch (error) { console.error('Weather setup failed', error); }
    try { setupMusic(); } catch (error) { console.error('Music setup failed', error); }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run, { once: true });
  else run();
})();
