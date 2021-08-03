<template>
  <TopNavigation :changeTheme="toggleTheme" :theme="userTheme" />
  <router-view />
</template>

<script>
import "./assets/styles/global.scss";
import TopNavigation from "./components/TopNavigation.vue";
export default {
  components: {
    TopNavigation,
  },
  data() {
    return {
      userTheme: "dark-theme",
    };
  },
  methods: {
    setTheme(theme) {
      localStorage.setItem("user-theme", theme);
      this.userTheme = theme;
      document.documentElement.className = theme;
    },
    toggleTheme() {
      const activeTheme = localStorage.getItem("user-theme");
      if (activeTheme === "light-theme") {
        this.setTheme("dark-theme");
      } else {
        this.setTheme("light-theme");
      }
    },
    getMediaPreference() {
      const activeTheme = localStorage.getItem("user-theme");
      this.setTheme(activeTheme || this.userTheme);
      return activeTheme || this.userTheme;
    },
  },
  mounted() {
    const initUserTheme = this.getMediaPreference();
    this.setTheme(initUserTheme);
  },
  created() {},
};
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  font-family: "Nunito Sans", sans-serif;
  font-size: 16px;
  background-color: var(--app-background-color);
}

.container {
  padding: 20px 40px;
}
</style>
