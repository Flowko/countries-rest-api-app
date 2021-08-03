<template>
  <ul class="nav">
    <li class="nav-item">
      <router-link class="logo" to="/">Where in the world?</router-link>
    </li>
    <li class="nav-item last">
      <a @click="changeTheme()">
        <i v-if="theme == 'dark-theme'" class="fas fa-sun"></i>
        <i v-else class="fas fa-moon"></i>
        {{theme == 'dark-theme' ? 'Light' : 'Dark'}} Mode
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['changeTheme','theme'],
  data() {
    return {
    }
  },
  created() {

  },
  methods: {
  },
};
</script>

<style lang="scss" scopped>
.nav {
  list-style-type: none;
  margin: 0;
  padding: 20px 40px;
  overflow: hidden;
  box-shadow: 1px 1px 14px 2px #00000024;
  background-color: var(--app-elements-background-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 768px) {
    padding: 10px 20px;
  }

  .nav-item {
    float: left;

    &.last {
      float: right;
    }

    .logo {
      font-size: 20px;
      font-weight: 800;
    }

    a {
      display: block;
      cursor: pointer;
      color: var(--app-text-color);
      text-align: center;
      text-decoration: none;
      font-size: 16px;
      font-weight: 600;
    }
  }
}
</style>