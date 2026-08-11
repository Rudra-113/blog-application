/* =====================================================
   blog.js
   Connects dashboard and create-blog pages to the backend.
===================================================== */

document.addEventListener('DOMContentLoaded', async function () {
  const protectedPage = document.body.getAttribute('data-protected');

  if (protectedPage === 'true' && !requireLogin()) return;

  const currentUser = getCurrentUser();

  const dashboardName = document.getElementById('dashboardUserName');
  const postList = document.getElementById('dashboardPostList');

  // Display logged-in user's name
  if (dashboardName) {
    dashboardName.textContent =
      currentUser?.name || currentUser?.email || 'User';
  }

  // Load only the logged-in user's blogs
  if (postList) {
    await renderDashboardPosts(postList);
  }

  // Create Blog Form
  const createForm = document.getElementById('createBlogForm');

  if (createForm) {
    createForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const title = document.getElementById('blogTitle').value.trim();
      const content = document.getElementById('blogContent').value.trim();

      let isValid = true;

      if (!title) {
        showError('blogTitleError', 'Title is required.');
        isValid = false;
      } else {
        hideError('blogTitleError');
      }

      if (content.length < 10) {
        showError(
          'blogContentError',
          'Content should be at least 10 characters.'
        );
        isValid = false;
      } else {
        hideError('blogContentError');
      }

      if (!isValid) return;

      try {
        await apiRequest('/blogs', {
          method: 'POST',
          body: JSON.stringify({
            title,
            content
          })
        });

        showAlert(
          'createBlogAlert',
          'Blog post published! Redirecting to dashboard...',
          'success'
        );

        createForm.reset();

        setTimeout(function () {
          window.location.href = 'dashboard.html';
        }, 800);

      } catch (error) {
        showAlert(
          'createBlogAlert',
          error.message,
          'error'
        );
      }
    });
  }
});


/* =====================================================
   Dashboard
   Loads ONLY blogs belonging to the logged-in user.
===================================================== */

async function renderDashboardPosts(postList) {
  postList.innerHTML =
    '<p class="empty-state">Loading your posts...</p>';

  try {
    // IMPORTANT:
    // /blogs/my returns only the logged-in user's blogs
    const data = await apiRequest('/blogs/my');

    const posts = Array.isArray(data)
      ? data
      : (data.blogs || data.posts || []);

    postList.innerHTML = '';

    if (posts.length === 0) {
      postList.innerHTML =
        '<p class="empty-state">' +
        'No blog posts yet. Click "Create Blog" to write your first one!' +
        '</p>';

      return;
    }

    posts.forEach(function (post) {

      const row = document.createElement('div');
      row.className = 'dashboard-post';

      const title = escapeHtml(
        post.title || 'Untitled'
      );

      const content = escapeHtml(
        post.content || ''
      );

      const date = post.createdAt
        ? new Date(post.createdAt).toLocaleDateString()
        : (post.date || '');

      row.innerHTML =
        '<div>' +

          '<h3>' +
            title +
          '</h3>' +

          '<p class="post-meta">' +
            escapeHtml(date) +
          '</p>' +

          '<p class="post-excerpt">' +
            content.slice(0, 100) +
            (content.length > 100 ? '...' : '') +
          '</p>' +

          '<div class="blog-actions">' +

            // Read More
            '<a href="blog-details.html?id=' +
              encodeURIComponent(post._id) +
              '" class="btn">' +
              'Read More' +
            '</a>' +

            // Edit
            '<a href="edit-blog.html?id=' +
              encodeURIComponent(post._id) +
              '" class="btn">' +
              'Edit' +
            '</a>' +

            // Delete
            '<button class="btn delete-btn" data-id="' +
              escapeHtml(post._id) +
              '">' +
              'Delete' +
            '</button>' +

          '</div>' +

        '</div>';

      postList.appendChild(row);
    });


    /* =================================================
       Delete Blog
    ================================================= */

    const deleteButtons =
      postList.querySelectorAll('.delete-btn');

    deleteButtons.forEach(function (button) {

      button.addEventListener('click', async function () {

        const blogId =
          button.getAttribute('data-id');

        const confirmed = confirm(
          'Are you sure you want to delete this blog?'
        );

        if (!confirmed) return;

        try {

          await apiRequest('/blogs/' + blogId, {
            method: 'DELETE'
          });

          alert('Blog deleted successfully.');

          // Reload user's blogs
          await renderDashboardPosts(postList);

        } catch (error) {

          alert(error.message);

        }
      });
    });

  } catch (error) {

    postList.innerHTML =
      '<p class="empty-state">' +
      escapeHtml(error.message) +
      '</p>';
  }
}


/* =====================================================
   Security helper
===================================================== */

function escapeHtml(text) {
  const div = document.createElement('div');

  div.textContent = text;

  return div.innerHTML;
}


/* =====================================================
   Form Error Helpers
===================================================== */

function showError(id, message) {

  const el = document.getElementById(id);

  if (el) {
    el.textContent = message;
    el.style.display = 'block';
  }
}


function hideError(id) {

  const el = document.getElementById(id);

  if (el) {
    el.style.display = 'none';
  }
}


/* =====================================================
   Alert Helper
===================================================== */

function showAlert(id, message, type) {

  const el = document.getElementById(id);

  if (el) {
    el.textContent = message;
    el.className = 'alert alert-' + type;
    el.style.display = 'block';
  }
}