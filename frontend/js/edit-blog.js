const API_URL = "http://localhost:5000/api";

// Get blog ID from URL
const params = new URLSearchParams(window.location.search);
const blogId = params.get("id");

const editTitle = document.getElementById("editTitle");
const editContent = document.getElementById("editContent");
const editForm = document.getElementById("editBlogForm");


// Load existing blog
async function loadBlog() {
  if (!blogId) {
    showAlert(
      "editBlogAlert",
      "Blog ID is missing.",
      "error"
    );
    return;
  }

  try {
    const blog = await apiRequest(`/blogs/${blogId}`);

    editTitle.value = blog.title || "";
    editContent.value = blog.content || "";

  } catch (error) {

    showAlert(
      "editBlogAlert",
      error.message,
      "error"
    );
  }
}


// Update blog
editForm.addEventListener("submit", async function (event) {

  event.preventDefault();

  const title = editTitle.value.trim();
  const content = editContent.value.trim();

  let isValid = true;

  if (!title) {
    showError("editTitleError", "Title is required.");
    isValid = false;
  } else {
    hideError("editTitleError");
  }

  if (content.length < 10) {
    showError(
      "editContentError",
      "Content should be at least 10 characters."
    );
    isValid = false;
  } else {
    hideError("editContentError");
  }

  if (!isValid) return;

  try {

    await apiRequest(`/blogs/${blogId}`, {
      method: "PUT",
      body: JSON.stringify({
        title,
        content
      })
    });

    showAlert(
      "editBlogAlert",
      "Blog updated successfully! Redirecting...",
      "success"
    );

    setTimeout(function () {
      window.location.href = "dashboard.html";
    }, 800);

  } catch (error) {

    showAlert(
      "editBlogAlert",
      error.message,
      "error"
    );
  }
});


// Show error
function showError(id, message) {

  const element = document.getElementById(id);

  if (element) {
    element.textContent = message;
    element.style.display = "block";
  }
}


// Hide error
function hideError(id) {

  const element = document.getElementById(id);

  if (element) {
    element.style.display = "none";
  }
}


// Show alert
function showAlert(id, message, type) {

  const element = document.getElementById(id);

  if (element) {
    element.textContent = message;
    element.className = "alert alert-" + type;
    element.style.display = "block";
  }
}


// Load the blog when page opens
loadBlog();