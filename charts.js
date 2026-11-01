(function () {
  var C = { g: '#1f8a5b', a: '#f2b33d', r: '#d1495b', i: '#0f1a15' };
  Chart.defaults.font.family = 'Inter, system-ui, sans-serif';
  Chart.defaults.color = '#3b4540';
  var base = { responsive: true, maintainAspectRatio: false };
  function hbar(id, labels, data, total, color) {
    new Chart(document.getElementById(id), {
      type: 'bar',
      data: { labels: labels, datasets: [{ data: data, backgroundColor: color, borderRadius: 3 }] },
      options: Object.assign({}, base, {
        indexAxis: 'y',
        plugins: { legend: { display: false }, tooltip: { callbacks: { label: function (c) { return c.raw + ' responses (' + (c.raw / total * 100).toFixed(1) + '%)'; } } } },
        scales: { x: { grid: { display: false }, ticks: { precision: 0 } }, y: { grid: { display: false } } }
      })
    });
  }
  hbar('c-stress', ['Petrol & commuting', 'Electricity & gas', 'Groceries', 'Tuition', 'Rent'], [49, 29, 23, 20, 9], 78, C.a);
  hbar('c-adjust', ['Delay major purchases', 'Reduce AC use', 'Change transport habits', 'Switch to local groceries', 'Cut back on eating out'], [34, 30, 29, 28, 23], 77, C.g);
  new Chart(document.getElementById('c-budget'), {
    type: 'doughnut',
    data: { labels: ['Cut non-essential spending', 'Seek extra income', 'Dip into savings', 'Other'], datasets: [{ data: [40, 26, 7, 4], backgroundColor: [C.r, C.a, C.g, '#9aa59f'], borderWidth: 0 }] },
    options: Object.assign({}, base, { cutout: '62%', plugins: { legend: { position: 'right' }, tooltip: { callbacks: { label: function (c) { return c.label + ': ' + (c.raw / 77 * 100).toFixed(1) + '%'; } } } } })
  });
  new Chart(document.getElementById('c-cpi'), {
    type: 'bar',
    data: { labels: ['September', 'July–September average'], datasets: [
      { label: 'A year earlier (2025)', data: [5.76, 4.30], backgroundColor: '#9aa59f', borderRadius: 3 },
      { label: 'Now (2026)', data: [10.26, 10.20], backgroundColor: C.r, borderRadius: 3 } ] },
    options: Object.assign({}, base, { plugins: { legend: { position: 'bottom' }, tooltip: { callbacks: { label: function (c) { return c.dataset.label + ': ' + c.raw + '%'; } } } },
      scales: { y: { beginAtZero: true, ticks: { callback: function (v) { return v + '%'; } }, grid: { color: '#eee' } }, x: { grid: { display: false } } } })
  });
})();
