document.addEventListener("DOMContentLoaded", () => {
  const observers = document.querySelectorAll(".fade-in");
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  });
  observers.forEach(e => io.observe(e));
});

function toggleTheme() {
  const isDark = document.body.style.getPropertyValue('--bg') === '#1a1a1a';
  document.body.style.setProperty('--bg', isDark ? '#f6f8fa' : '#1a1a1a');
  document.body.style.setProperty('--text', isDark ? '#222' : '#f6f8fa');
}

function toggleModal() {
  const modal = document.getElementById('docModal');
  modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
}

function copyEmail() {
  navigator.clipboard.writeText('dianasaasaa@gmail.com').then(() => {
    const msg = document.getElementById('copiedMsg');
    msg.style.display = 'inline';
    setTimeout(() => msg.style.display = 'none', 2000);
  });
}

function getWeather() {
  const city = document.getElementById('weatherInput').value;
  const apiKey = '0cf9bb40f3e6abdea8fd77f2c65ddaf3';
  if (!city) return;
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(res => res.json())
    .then(data => {
      document.getElementById('weatherOutput').innerText =
        `${data.name}: ${data.main.temp}°C, ${data.weather[0].main}`;
    }).catch(() => {
      document.getElementById('weatherOutput').innerText = 'Invalid city.';
    });
}

async function getQuote() {
  try {
    const response = await fetch("https://api.api-ninjas.com/v1/quotes", {
      headers: { 'X-Api-Key': 'QjSqHUKYotMyzoZ7GEmJww==vJ8LnWVw8aSOscc7' }
    });
    if (!response.ok) throw new Error("Failed to fetch quote.");
    const data = await response.json();
    const quote = data[0];

    document.getElementById("quote").textContent = `"${quote.quote}"`;
    document.getElementById("author").textContent = `— ${quote.author}`;
  } catch (error) {
    document.getElementById("quote").textContent = "Something went wrong. Try again later.";
    document.getElementById("author").textContent = "";
  }
}


function toggleModal(doc = null) {
  const modal = document.getElementById('docModal');
  const frame = document.getElementById('docFrame');
  if (doc) {
    const docs = {
      troubleshooting: 'Troubleshooting_Guide.pdf',
      api: 'Project_API_Integration.pdf',
      tracker: 'Pretty_Issue_Tracker_Documentation.pdf'
    };
    frame.src = docs[doc] || '';
    modal.style.display = 'flex';
  } else {
    frame.src = '';
    modal.style.display = 'none';
  }
}
