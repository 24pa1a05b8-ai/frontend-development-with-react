function createSession() {
  const key = document.getElementById('sessionKey').value.trim();
  const value = document.getElementById('sessionValue').value.trim();

  if (!key) {
    document.getElementById('sessionDisplay').textContent = 'Please enter a key.';
    return;
  }

  sessionStorage.setItem(key, value);
  document.getElementById('sessionDisplay').textContent = `Stored '${key}' with value '${value}'.`;
  renderSession();
}

function getSession() {
  const key = document.getElementById('sessionKey').value.trim();
  const value = sessionStorage.getItem(key);

  if (!key) {
    document.getElementById('sessionDisplay').textContent = 'Please enter a key.';
    return;
  }

  document.getElementById('sessionDisplay').textContent = value !== null
    ? `Retrieved '${key}': ${value}`
    : `No value found for '${key}'.`;
  renderSession();
}

function removeSession() {
  const key = document.getElementById('sessionKey').value.trim();

  if (!key) {
    document.getElementById('sessionDisplay').textContent = 'Please enter a key.';
    return;
  }

  sessionStorage.removeItem(key);
  document.getElementById('sessionDisplay').textContent = `Removed '${key}' from session storage.`;
  renderSession();
}

function clearSession() {
  sessionStorage.clear();
  document.getElementById('sessionDisplay').textContent = 'All session storage items cleared.';
  renderSession();
}

function renderSession() {
  const display = document.getElementById('sessionDisplay');
  const keys = Object.keys(sessionStorage);

  if (keys.length === 0) {
    display.textContent = 'No items stored in session storage.';
    return;
  }

  display.textContent = keys.map((key) => `${key}: ${sessionStorage.getItem(key)}`).join(' | ');
}

document.addEventListener('DOMContentLoaded', renderSession);
