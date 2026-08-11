/* =====================================================
   common.js
   Shared helpers for the backend-connected Blog App.
===================================================== */

const API_BASE = 'http://localhost:5000/api';

function getToken() {
  return localStorage.getItem('blogapp_token');
}

function setToken(token) {
  localStorage.setItem('blogapp_token', token);
}

function clearAuth() {
  localStorage.removeItem('blogapp_token');
  localStorage.removeItem('blogapp_user');
}

function getCurrentUser() {
  const raw = localStorage.getItem('blogapp_user');
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

function setCurrentUser(user) {
  localStorage.setItem('blogapp_user', JSON.stringify(user));
}

async function apiRequest(path, options = {}) {
  const headers = { ...(options.headers || {}) };
  if (options.body && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(API_BASE + path, {
    ...options,
    headers
  });

  let data = {};
  try {
    data = await response.json();
  } catch (e) {
    data = {};
  }

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong. Please try again.');
  }

  return data;
}

function logoutUser() {
  clearAuth();
}

function requireLogin() {
  if (!getToken()) {
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

/* ---------- Navbar Behavior ---------- */

document.addEventListener('DOMContentLoaded', function () {
  const toggleBtn = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', function () {
      navLinks.classList.toggle('show');
    });
  }

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.nav-links a');

  links.forEach(function (link) {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  const loggedIn = !!getToken();
  const loginLink = document.getElementById('navLogin');
  const registerLink = document.getElementById('navRegister');
  const dashboardLink = document.getElementById('navDashboard');
  const createLink = document.getElementById('navCreate');
  const logoutLink = document.getElementById('navLogout');

  if (loggedIn) {
    if (loginLink) loginLink.style.display = 'none';
    if (registerLink) registerLink.style.display = 'none';
    if (dashboardLink) dashboardLink.style.display = 'block';
    if (createLink) createLink.style.display = 'block';
    if (logoutLink) logoutLink.style.display = 'block';
  } else {
    if (loginLink) loginLink.style.display = 'block';
    if (registerLink) registerLink.style.display = 'block';
    if (dashboardLink) dashboardLink.style.display = 'none';
    if (createLink) createLink.style.display = 'none';
    if (logoutLink) logoutLink.style.display = 'none';
  }

  if (logoutLink) {
    logoutLink.addEventListener('click', function (e) {
      e.preventDefault();
      logoutUser();
      window.location.href = 'index.html';
    });
  }
});
