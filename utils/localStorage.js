export default {
  setDarkMode(value) {
    window.localStorage.setItem("DARK_MODE", value);
  },
  getDarkMode() {
    return JSON.parse(window.localStorage.getItem("DARK_MODE"));
  },
};
