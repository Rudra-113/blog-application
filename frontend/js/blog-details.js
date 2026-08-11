const API_URL = "http://localhost:5000/api";

// Get blog ID from URL
const params = new URLSearchParams(window.location.search);
const blogId = params.get("id");

const blogTitle = document.getElementById("blogTitle");
const blogAuthor = document.getElementById("blogAuthor");
const blogDate = document.getElementById("blogDate");
const blogContent = document.getElementById("blogContent");

async function loadBlog() {
  if (!blogId) {
    blogTitle.textContent = "Blog not found";
    blogContent.textContent = "No blog ID was provided.";
    return;
  }

  try {
    const response = await fetch(`${API_URL}/blogs/${blogId}`);

    if (!response.ok) {
      throw new Error("Blog not found");
    }

    const blog = await response.json();

    blogTitle.textContent = blog.title;

    blogAuthor.textContent =
      `By ${blog.author?.name || "Unknown Author"}`;

    blogDate.textContent =
      `Published on ${new Date(blog.createdAt).toLocaleDateString()}`;

    blogContent.textContent = blog.content;

  } catch (error) {
    console.error(error);

    blogTitle.textContent = "Unable to load blog";
    blogContent.textContent =
      "Something went wrong while loading this blog.";
  }
}

loadBlog();