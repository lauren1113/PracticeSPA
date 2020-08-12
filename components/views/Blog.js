export default st => `
  <section id ="blog">
    ${st.posts.map(post => formatASingleBlogPost(post)).join("")}
  </section>
  `;

function formatASingleBlogPost(post) {
  return `
    <div class="blog-post">
      <h4>${post.title} by User ${post.userId}</h4>
      <p>${post.body}</p>
    </div>`;
}
