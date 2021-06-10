/*
 */

const ToSplash = () => {
  DeactivateScreens();
  SplashScreen.classList.remove("hidden");

  setTimeout(() => {
    Redirect("/login");
  }, 3000);
}; //closes ToSplash method

const ToLogin = () => {
  DeactivateScreens();
  LoginScreen.classList.remove("hidden");
}; //closes ToTest method

const ToPanel = () => {
  DeactivateScreens();
  PanelScreen.classList.remove("hidden");
}; //closes ToTest method

const ToTest = () => {
  DeactivateScreens();
  TestScreen.classList.remove("hidden");
}; //closes ToTest method

const ToLoadCSVScreen = () => {
  DeactivateScreens();
  LoadCSVScreen.classList.remove("hidden");
}; //closes ToLoadCSVScreen method

const PageNotFound = () => {
  DeactivateScreens();
}; //closes PageNotFound method

const DeactivateScreens = () => {
  TestScreen.classList.add("hidden");
  LoadCSVScreen.classList.add("hidden");
  SplashScreen.classList.add("hidden");
  LoginScreen.classList.add("hidden");
  PanelScreen.classList.add("hidden");
}; //closes DeactivateScreens method
