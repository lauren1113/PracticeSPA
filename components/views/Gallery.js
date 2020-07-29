// st is ALWAYS going to be state.Gallery
export default st =>
  `<section id="gallery">
    ${st.pictures
      .map(pic => `<img alt="${pic.title}" src="${pic.url}">`)
      .join("")}
  </section>`;
