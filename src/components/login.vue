<template>
  <v-row justify="center">
    <v-col :cols="$vuetify.breakpoint.mdAndUp ? 6 : 12">
      <v-card flat>
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
              type="submit"
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
    </v-col>
  </v-row>
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
