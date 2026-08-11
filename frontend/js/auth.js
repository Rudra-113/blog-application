/* =====================================================
   auth.js
   Handles registration and login using the Express API.
===================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- REGISTER ---------- */
  const registerForm = document.getElementById('registerForm');

  if (registerForm) {
    registerForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const name = document.getElementById('regName').value.trim();
      const email = document.getElementById('regEmail').value.trim();
      const password = document.getElementById('regPassword').value;
      const confirmPassword = document.getElementById('regConfirmPassword').value;

      let isValid = true;
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name) {
        showError('regNameError', 'Name is required.');
        isValid = false;
      } else hideError('regNameError');

      if (!emailPattern.test(email)) {
        showError('regEmailError', 'Please enter a valid email address.');
        isValid = false;
      } else hideError('regEmailError');

      if (password.length < 6) {
        showError('regPasswordError', 'Password must be at least 6 characters.');
        isValid = false;
      } else hideError('regPasswordError');

      if (confirmPassword !== password) {
        showError('regConfirmError', 'Passwords do not match.');
        isValid = false;
      } else hideError('regConfirmError');

      if (!isValid) return;

      try {
        const data = await apiRequest('/auth/register', {
          method: 'POST',
          body: JSON.stringify({ name, email, password })
        });

        if (data.token) setToken(data.token);
        if (data.user) setCurrentUser(data.user);

        showAlert('registerAlert', 'Account created successfully! Redirecting...', 'success');

        setTimeout(function () {
          window.location.href = data.token ? 'dashboard.html' : 'login.html';
        }, 900);
      } catch (error) {
        showAlert('registerAlert', error.message, 'error');
      }
    });
  }

  /* ---------- LOGIN ---------- */
  const loginForm = document.getElementById('loginForm');

  if (loginForm) {
    loginForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const email = document.getElementById('loginEmail').value.trim();
      const password = document.getElementById('loginPassword').value;

      let isValid = true;
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(email)) {
        showError('loginEmailError', 'Please enter a valid email address.');
        isValid = false;
      } else hideError('loginEmailError');

      if (!password) {
        showError('loginPasswordError', 'Password is required.');
        isValid = false;
      } else hideError('loginPasswordError');

      if (!isValid) return;

      try {
        const data = await apiRequest('/auth/login', {
          method: 'POST',
          body: JSON.stringify({ email, password })
        });

        if (!data.token) {
          throw new Error('Login succeeded but no token was returned by the server.');
        }

        setToken(data.token);
        if (data.user) setCurrentUser(data.user);

        showAlert('loginAlert', 'Login successful! Redirecting...', 'success');

        setTimeout(function () {
          window.location.href = 'dashboard.html';
        }, 700);
      } catch (error) {
        showAlert('loginAlert', error.message, 'error');
      }
    });
  }
});

function showError(id, message) {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = message;
    el.style.display = 'block';
  }
}

function hideError(id) {
  const el = document.getElementById(id);
  if (el) el.style.display = 'none';
}

function showAlert(id, message, type) {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = message;
    el.className = 'alert alert-' + type;
    el.style.display = 'block';
  }
}
