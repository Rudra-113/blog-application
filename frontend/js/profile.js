/* =====================================================
   profile.js
   Loads the logged-in user's profile.
===================================================== */

document.addEventListener('DOMContentLoaded', async function () {

  // Protect profile page
  if (!requireLogin()) return;

  const profileName = document.getElementById('profileName');
  const profileEmail = document.getElementById('profileEmail');
  const profileAlert = document.getElementById('profileAlert');
  const profileLogout = document.getElementById('profileLogout');

  try {

    const data = await apiRequest('/auth/profile');

    const user = data.user;

    profileName.textContent = user.name || 'User';
    profileEmail.textContent = user.email || '';


  } catch (error) {

    profileAlert.textContent = error.message;
    profileAlert.className = 'alert alert-error';
    profileAlert.style.display = 'block';

  }


  // Logout button
  if (profileLogout) {

    profileLogout.addEventListener('click', function () {

      logoutUser();

      window.location.href = 'index.html';

    });

  }

});