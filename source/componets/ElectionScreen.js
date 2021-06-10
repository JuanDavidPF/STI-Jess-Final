const Job1 = ElectionScreen.querySelector(".ElectionScreen__Job1");
const Job2 = ElectionScreen.querySelector(".ElectionScreen__Job2");
const Job3 = ElectionScreen.querySelector(".ElectionScreen__Job3");

const JobElection = (jobs) => {
  Job1.querySelector("h1").textContent = jobs[0].Trabajo;
  Job2.querySelector("h1").textContent = jobs[1].Trabajo;
  Job3.querySelector("h1").textContent = jobs[2].Trabajo;

  Job1.querySelector("p").textContent =
    (jobs[0].Similitud * 100).toFixed(2) + "% de similitud";
  Job2.querySelector("p").textContent =
    (jobs[1].Similitud * 100).toFixed(2) + "% de similitud";
  Job3.querySelector("p").textContent =
    (jobs[2].Similitud * 100).toFixed(2) + "% de similitud";
}; //close JobElection method

const ChooseJob1 = () => {
  let job = Job1.querySelector("h1").textContent;
  ChooseJob(job);
}; //close JobElection method

const ChooseJob2 = () => {
  let job = Job2.querySelector("h1").textContent;
  ChooseJob(job);
}; //close JobElection method

const ChooseJob3 = () => {
  let job = Job3.querySelector("h1").textContent;
  ChooseJob(job);
}; //close JobElection method

const ChooseJob = (job) => {
  db.collection("Participantes").doc(CurrentUser.Nombre).set({
    Nombre: CurrentUser.Nombre,
    Trabajo: job,
    Habilidades: CurrentUser.Habilidades,
  });

  ElectionScreen.classList.add("animate__fadeOut");

  setTimeout(() => {
    ElectionScreen.classList.remove("animate__fadeOut");
    Redirect("/my-job");
    LoadJobGroup(job);
  }, 1000);
}; //close ChooseJob method
