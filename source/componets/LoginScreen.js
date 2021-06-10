const GroupSelectInput = document.getElementById("login_selectGroup");
const NameSelectInput = document.getElementById("login_selectName");
let CurrentUser = null;

GroupSelectInput.addEventListener("change", function () {
  LoadSelectNameInputs(GroupSelectInput.value);
});

NameSelectInput.addEventListener("change", function () {
  if (
    NameSelectInput.value &&
    NameSelectInput.value != "Escoje un participante"
  ) {
    db.collection("Participantes")
      .doc(NameSelectInput.value)
      .get()
      .then((querySnapshot) => {
        CurrentUser = querySnapshot.data();
        Redirect("/panel");
      });
  }
});

const LoadSelectNameInputs = (groupSelected) => {
  NameSelectInput.innerHTML = "";

  let option = document.createElement("option");
  option.textContent = "Escoje un participante";
  option.disabled = true;
  option.selected = true;
  option.hidden = true;

  option.value = "placeholder";
  NameSelectInput.appendChild(option);

  db.collection("Grupos")
    .doc(groupSelected)
    .get()
    .then((querySnapshot) => {
      querySnapshot.data().Participantes.forEach((participants) => {
        let option = document.createElement("option");
        option.textContent = participants;
        option.value = participants;
        NameSelectInput.appendChild(option);
      });
    });
}; //close LoadSelectInputs methods
