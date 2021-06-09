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
  console.log(link);
  return linkRoute;
} //closes Analyzelink method;

function Router(path) {
  let linkRoute = AnalyzeLink();
  switch (linkRoute) {
    case "":
      break;

    case "/404":
   
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
