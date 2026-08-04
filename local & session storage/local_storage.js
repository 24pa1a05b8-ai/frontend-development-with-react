function createLocal() {
  const key = document.getElementById('localKey').value.trim();
  const value = document.getElementById('localValue').value.trim();

  if (!key) {
    document.getElementById('localDisplay').textContent = 'Please enter a key.';
    return;
  }

  localStorage.setItem(key, value);
  document.getElementById('localDisplay').textContent = `Stored '${key}' with value '${value}'.`;
  renderLocal();
}

function getLocal() {
  const key = document.getElementById('localKey').value.trim();
  const value = localStorage.getItem(key);

  if (!key) {
    document.getElementById('localDisplay').textContent = 'Please enter a key.';
    return;
  }

  document.getElementById('localDisplay').textContent = value !== null
    ? `Retrieved '${key}': ${value}`
    : `No value found for '${key}'.`;
  renderLocal();
}

function removeLocal() {
  const key = document.getElementById('localKey').value.trim();

  if (!key) {
    document.getElementById('localDisplay').textContent = 'Please enter a key.';
    return;
  }

  localStorage.removeItem(key);
  document.getElementById('localDisplay').textContent = `Removed '${key}' from local storage.`;
  renderLocal();
}

function clearLocal() {
  localStorage.clear();
  document.getElementById('localDisplay').textContent = 'All local storage items cleared.';
  renderLocal();
}

function renderLocal() {
  const display = document.getElementById('localDisplay');
  const keys = Object.keys(localStorage);

  if (keys.length === 0) {
    display.textContent = 'No items stored in local storage.';
    return;
  }

  display.textContent = keys.map((key) => `${key}: ${localStorage.getItem(key)}`).join(' | ');
}

document.addEventListener('DOMContentLoaded', renderLocal);
