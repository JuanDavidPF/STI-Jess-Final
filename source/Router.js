//link
let baseLink = "";

function AnalyzeLink() {
  let link = window.location.href;
  let linkRoute = "";

  if (!link.includes("#")) {
    baseLink = link + "#";
    window.location.href = baseLink;
  } else {
    let linkSegments = [];
    linkSegments = link.split("#");
    baseLink = linkSegments[0] + "#";
    linkRoute = linkSegments[1];
  }
  return linkRoute;
} //closes Analyzelink method;

function Router(path) {
  let linkRoute = AnalyzeLink();
  switch (linkRoute) {
    case "":
      ToSplash();
      break;

    case "/login":
      ToLogin();
      break;

 

      case "/test":
      ToTest();
      // if (!CurrentUser) {
      //   Redirect("/login");
      // }
      break;

    case "/load-csv":
      ToLoadCSVScreen();
      break;

    case "/404":
      PageNotFound();
      break;
    default:
      Redirect("/404");
      break;
  } //closes Router switch
} //closes Router method

function Redirect(path) {
  window.location.href = baseLink + path;
} //closes Redirect method

function Refresh() {
  Router();
} //closes Redirect method

window.onhashchange = function () {
  Router();
}; //closes onHasChange event

Router();
