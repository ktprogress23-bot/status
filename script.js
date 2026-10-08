// Build Host status data. Replace the sample statuses with your real monitoring API later.
const services = [
  { name: 'Build Host Website', status: 'operational', uptime: '100%', latency: '42 ms' },
  { name: 'Build Host Panel', status: 'operational', uptime: '100%', latency: '58 ms' },
  { name: 'Intel Noida Node', status: 'operational', uptime: '100%', latency: '31 ms' },
  { name: 'Ryzen Mumbai Node', status: 'operational', uptime: '100%', latency: '27 ms' },
  { name: 'Core Services', status: 'operational', uptime: '100%', latency: '36 ms' },
  { name: 'API & Discord Bot', status: 'operational', uptime: '100%', latency: '44 ms' },
];

const labels = { operational: '100%', degraded: 'Issue', down: 'Down' };

function makeBars(status) {
  // 48 history checks. This is intentionally static until a monitoring API is connected.
  return Array.from({ length: 48 }, (_, i) => {
    let cls = 'bar';
    if (status === 'degraded' && i === 35) cls += ' degraded';
    if (status === 'down' && i >= 42) cls += ' down';
    return `<span class="${cls}"></span>`;
  }).join('');
}

function render() {
  const root = document.getElementById('services');
  root.innerHTML = services.map(s => `
    <article class="service">
      <div class="service-name">
        <span class="badge ${s.status}">${labels[s.status]}</span>
        <span class="service-name-text">${s.name}</span>
      </div>
      <div class="history-wrap">
        <div class="bars" aria-label="Uptime history">${makeBars(s.status)}</div>
        <div class="times"><span>30d ago</span><span>${s.uptime} uptime • ${s.latency}</span><span>now</span></div>
      </div>
    </article>
  `).join('');

  const bad = services.some(s => s.status === 'down');
  const degraded = services.some(s => s.status === 'degraded');
  const overall = document.getElementById('overall');
  const icon = overall.querySelector('.check');
  const text = document.getElementById('overallText');
  if (bad) { text.textContent = 'Major Systems Outage'; icon.textContent = '!'; icon.style.background = 'var(--red)'; }
  else if (degraded) { text.textContent = 'Some Systems Experiencing Issues'; icon.textContent = '!'; icon.style.background = 'var(--yellow)'; }
  else { text.textContent = 'All Systems Operational'; icon.textContent = '✓'; icon.style.background = 'var(--green)'; }
}

render();
setInterval(() => {
  document.getElementById('lastChecked').textContent = 'just now';
}, 30000);
