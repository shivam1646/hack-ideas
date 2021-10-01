module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "@/styles/_main.scss";
        `
      }
    }
  },
  transpileDependencies: ["vuetify"],
};
