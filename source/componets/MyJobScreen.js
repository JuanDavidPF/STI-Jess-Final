const JobTitles = MyJobScreen.querySelector("h1");
const PeopleList = MyJobScreen.querySelector("ul");

const LoadJobGroup = (job) => {
  JobTitles.textContent=job;
  PeopleList.innerHTML = "";

  db.collection("Participantes")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.data().Trabajo == job) {
          let listmember = document.createElement("li");
          listmember.textContent = doc.data().Nombre;
          PeopleList.appendChild(listmember);
        }
      });
    }); //close LoadSelectInputs methods
}; //closes LoadJobGroup methos
