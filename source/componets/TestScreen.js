const TestContainer = document.querySelector(".TestContainer");
const TestPrefab = document.querySelector(".TestItem__prefab");
let Tests = [];

const LoadTests = () => {
  db.collection("Participantes")
    .doc(CurrentUser.Nombre)
    .get()
    .then((querySnapshot) => {
   
      if (querySnapshot.data().Trabajo.length > 0) {
        TestScreen.classList.add("animate__fadeOut");
        setTimeout(() => {
          TestScreen.classList.remove("animate__fadeOut");
          Redirect("/my-job");
          LoadJobGroup(querySnapshot.data().Trabajo);
        }, 1000);
      } else {
        db.collection("Habilidades")
          .get()
          .then((querySnapshot) => {
            TestContainer.innerHTML = "";
            Tests = [];
            querySnapshot.forEach((doc) => {
              let test = TestPrefab.cloneNode(true);
              test.classList.remove("TestItem__prefab");
              test.querySelector("h1").textContent = doc.id;
              test.querySelectorAll("input").forEach((input) => {
                input.id = doc.id;
                input.name = doc.id;
              });
              Tests.push(test);
              TestContainer.appendChild(test);
            });
          });
      }
    });
}; //close LoadTests method

const FinishTest = () => {
  Tests.forEach((test) => {
    let skill = test.querySelector("h1").textContent;
    CurrentUser.Habilidades[skill] = parseInt(
      test.querySelector(`input[name="${skill}"]:checked`).value
    );
  });

  db.collection("Participantes")
    .doc(CurrentUser.Nombre)
    .set({
      Nombre: CurrentUser.Nombre,
      Habilidades: CurrentUser.Habilidades,
      Trabajo: CurrentUser.Trabajo,
    })
    .then(() => {
      GetJobs();
    });
}; //close FinishTest method

const GetJobs = () => {
  let Jobs = [];
  db.collection("Trabajos")
    .get()
    .then((querySnapshot) => {
      TestContainer.innerHTML = "";
      Tests = [];
      querySnapshot.forEach((doc) => {
        let JobCompatibility = {
          Trabajo: doc.id,
          Similitud: CompareJob(doc.data()),
        };
        Jobs.push(JobCompatibility);
      });

      //organizes parche based on similitud coseno
      Jobs.sort((job1, job2) => {
        return job2.Similitud - job1.Similitud;
      });
      Jobs.length = 3;

      TestScreen.classList.add("animate__fadeOut");

      setTimeout(() => {
        TestScreen.classList.remove("animate__fadeOut");
        JobElection(Jobs);
        Redirect("/choose");
      }, 1000);
    });
}; //close SelectJobs method

const CompareJob = (job) => {
  return SimilitudCoseno(job.Habilidades, CurrentUser.Habilidades);
}; //close CompareJob methodç

const SimilitudCoseno = (jobSkills, userSkills) => {
  let similitudCoseno = 0;

  let productoPunto = ProductoPunto(jobSkills, userSkills);
  let magnitudJob = Magnitud(jobSkills);
  let magnitudUser = Magnitud(userSkills);

  similitudCoseno = productoPunto / (magnitudJob * magnitudUser);
  return similitudCoseno;
}; //close SimilitudCoseno methodç

function ProductoPunto(ArrayA, ArrayB) {
  let producto = 0;

  const keys = Object.keys(ArrayA);
  for (const key of keys) {
    producto += ArrayA[key] * ArrayB[key];
  }

  return producto;
} //closes ProductoPunto method

function Magnitud(Array) {
  let magnitud = 0;

  const keys = Object.keys(Array);
  for (const key of keys) {
    magnitud += Math.pow(Array[key], 2);
  }

  magnitud = Math.sqrt(magnitud);
  return magnitud;
} //closes Magnitud method
