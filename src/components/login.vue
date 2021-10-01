<template>
  <v-card
    flat
    :max-width="$vuetify.breakpoint.lg ? '40vw' : '80vw'"
    class="mx-auto my-16"
  >
    <v-card-title v-text="'Login'" />
    <v-card-text>
      <form @submit.prevent="onLogin">
        <v-text-field
          :value="employeeId"
          @input="setEmployeeId($event)"
          label="Employee id"
          color="brand"
          outlined
        />
        <v-btn
          block
          text
          v-text="'GET STARTED'"
          :disabled="$v.$invalid"
          color="action"
        />
      </form>
      <v-alert
        v-text="error"
        :value="!!error"
        color="brand"
        text
      />
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'login',

  mixins: [validationMixin],

  data: () => ({
    error: null
  }),

  computed: {
    ...mapState(['employeeId'])
  },

  validations: {
    employeeId: {
      required
    }
  },

  methods: {
    ...mapMutations(['setEmployeeId']),
    ...mapActions(['login']),

    onLogin() {
      try {
        this.login();
        this.$router.push({ name: 'home' });
      } catch (err) {
        this.error = err;
      }
    }
  }
}
</script>
