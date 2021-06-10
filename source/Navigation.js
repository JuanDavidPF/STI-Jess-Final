
const ToTest = () => {

    TestScreen.classList.remove("hidden");
}; //closes CSVLoadingScreen method

const ToLoadCSVScreen = () => {
    TestScreen.classList.add("hidden");
    LoadCSVScreen.classList.remove("hidden");
}; //closes CSVLoadingScreen method



const PageNotFound = () => {
    LoadCSVScreen.classList.add("hidden");
    TestScreen.classList.add("hidden");
}; //closes CSVLoadingScreen method
