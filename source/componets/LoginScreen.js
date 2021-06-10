const NameSelectInput = document.getElementById("login_selectName");
const NameTextField = document.getElementById("login_typeName");
let CurrentUser = null;

NameSelectInput.addEventListener("change", function () {
  if (NameSelectInput.value == "New") {
    NameTextField.classList.remove("hidden");
  } else {
    NameTextField.classList.add("hidden");
  }
});

const LoadSelectNameInputs = () => {
  NameSelectInput.innerHTML = "";

  let option = document.createElement("option");
  option.textContent = "Escoje un participante";
  option.disabled = true;
  option.selected = true;
  option.hidden = true;
  option.value = "Unchosen";
  NameSelectInput.appendChild(option);

  db.collection("Participantes")
    .get()
    .then((querySnapshot) => {
      let option = document.createElement("option");
      option.textContent = "Nuevo Participante";
      option.style.background = "#08aff1b0";
      option.value = "New";
      NameSelectInput.appendChild(option);

      querySnapshot.forEach((doc) => {
        let option = document.createElement("option");
        option.textContent = doc.data().Nombre;
        option.value = doc.data().Nombre;
        NameSelectInput.appendChild(option);
      });
    });
}; //close LoadSelectInputs methods

const LogIn = () => {
  switch (NameSelectInput.value) {
    case "Unchosen":
      alert("Por favor selecciona un nombre");
      return;

    case "New":
      if (NameTextField.value.length == 0) {
        alert("Por favor Escribe un nombre válido");
        return;
      }
      CreateUser(NameTextField.value);
      break;

    default:
      LoadUser(NameSelectInput.value);
      break;
  }
}; //close LogIn methods

const CreateUser = (Nombre) => {
  let User = {
    Nombre: Nombre,
    Habilidades: {},
  };
  CurrentUser = User;
  LoginScreen.classList.add("animate__fadeOut");
  setTimeout(() => {
    LoginScreen.classList.remove("animate__fadeOut");
    Redirect("/test");
  }, 1000);
}; //close CreateUser methods

const LoadUser = (Nombre) => {
  db.collection("Participantes")
    .doc(Nombre)
    .get()
    .then((querySnapshot) => {
      CurrentUser = querySnapshot.data();
      LoginScreen.classList.add("animate__fadeOut");

      setTimeout(() => {
        LoginScreen.classList.remove("animate__fadeOut");
        Redirect("/test");
      }, 1000);
    });
}; //close LogIn methods
