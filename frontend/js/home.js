/* =====================================================
   home.js
   Loads latest blog posts from the Express API.
===================================================== */

document.addEventListener('DOMContentLoaded', async function () {
  const grid = document.getElementById('homePostGrid');
  if (!grid) return;

  try {
    const data = await apiRequest('/blogs');
    const posts = Array.isArray(data) ? data : (data.blogs || data.posts || []);

    if (posts.length === 0) {
      grid.innerHTML = '<p class="empty-state">No blog posts yet. Register and be the first to write one!</p>';
      return;
    }

    posts.slice().reverse().forEach(function (post) {
      const card = document.createElement('div');
      card.className = 'card post-card';

      const title = escapeHtml(post.title || 'Untitled');
      const authorValue = post.author?.name || post.author?.email || 'User';
      const content = escapeHtml(post.content || '');
      const date = post.createdAt
        ? new Date(post.createdAt).toLocaleDateString()
        : (post.date || '');

      card.innerHTML =
        '<h3>' + title + '</h3>' +
        '<p class="post-meta">By ' + escapeHtml(authorValue) + ' &middot; ' + escapeHtml(date) + '</p>' +
        '<p class="post-excerpt">' + content.slice(0, 120) + (content.length > 120 ? '...' : '') + '</p>';

      grid.appendChild(card);
    });
  } catch (error) {
    grid.innerHTML = '<p class="empty-state">' + escapeHtml(error.message) + '</p>';
  }
});
