/*
 */

const ToSplash = () => {
  DeactivateScreens();
  SplashScreen.classList.remove("hidden");
  SplashScreen.classList.add("animate__fadeIn");

  setTimeout(() => {
    SplashScreen.classList.remove("animate__fadeIn");
  }, 1000);

  setTimeout(() => {
    SplashScreen.classList.add("animate__fadeOut");
  }, 2000);

  setTimeout(() => {
    Redirect("/login");
    SplashScreen.classList.remove("animate__fadeOut");
  }, 3000);
}; //closes ToSplash method

const ToLogin = () => {
  DeactivateScreens();
  LoginScreen.classList.remove("hidden");
  LoginScreen.classList.add("animate__fadeIn");

  setTimeout(() => {
    LoginScreen.classList.remove("animate__fadeIn");
  }, 1000);

  LoadSelectNameInputs();
}; //closes ToTest method

const ToTest = () => {
  DeactivateScreens();
  TestScreen.classList.remove("hidden");
  TestScreen.classList.add("animate__fadeIn");

  setTimeout(() => {
    TestScreen.classList.remove("animate__fadeIn");
  }, 1000);
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
}; //closes DeactivateScreens method
