export const controller = ({ router, getPeople }) => ({
  mounted: function (site_data) {
    const article = (this.article = document.getElementById("article"));

    // base is needed  to make this work under: nuejs.org/@modular-app
    const base = (this.base = site_data.base || "");

    // render route
    router.on(`${base}/:type`, async ({ type }) => {
      const people = await getPeople(router.data);
      const view = site_data[type || "members"];

      this.mountChild("people-view", article, { type, view, ...people });
    });

    // start router
    router.start({ path: `${base}/:type/:id`, root: this.root });
  },

  unmounted: function () {
    this.article.innerHTML = "";
  },
});
