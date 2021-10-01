import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        brand: '#f58024',
        action: '#10AC84',
      }
    }
  }
});
