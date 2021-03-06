//JSON database
let skillsJSON;
let occupationsJSON = [];
let participantsJSON = [];


//File Inputs
document
  .getElementById("skillsDB")
  .addEventListener("change", LoadSkillsDatabase, false);

document
  .getElementById("occupationDB")
  .addEventListener("change", LoadOccupationDatabase, false);

document
  .getElementById("participantsDB")
  .addEventListener("change", LoadparticipantsDatabase, false);

//Parse CSVs as JSONs
function LoadSkillsDatabase(evt) {
  skillsJSON = null;
  var file = evt.target.files[0];
  var reader = new FileReader();
  reader.readAsText(file);

  reader.onload = function (event) {
    var csvData = event.target.result;

    skillsJSON = Papa.parse(csvData, {
      header: true,
    });

    skillsJSON = JSON.parse(JSON.stringify(skillsJSON.meta.fields));

    skillsJSON.forEach((element) => {});
  };
} //closes LoadSkillsDatabase method

function LoadOccupationDatabase(evt) {
  occupationsJSON = [];
  var file = evt.target.files[0];
  var reader = new FileReader();
  reader.readAsText(file);

  reader.onload = function (event) {
    var csvData = event.target.result;

    let json = Papa.parse(csvData, {
      header: true,
    });

    json = JSON.parse(JSON.stringify(json.data));

    json.forEach((element) => {
      if (element.Trabajos != "") {
        let occupation = {
          ID: element.Trabajos,
          Skills: {},
        };
        delete element.Trabajos;

        //turns values into ints
        const keys = Object.keys(element);
        for (const key of keys) {
          element[key] = parseInt(element[key]);
        }
        occupation.Skills = element;
        occupationsJSON.push(occupation);
      }
    });
  };
} //closes LoadOccupationDatabase method

function LoadparticipantsDatabase(evt) {
  participantsJSON = [];


  var file = evt.target.files[0];
  var reader = new FileReader();
  reader.readAsText(file);

  reader.onload = function (event) {
    var csvData = event.target.result;

    let json = Papa.parse(csvData, {
      header: true,
    });

    json = JSON.parse(JSON.stringify(json.data));

    json.forEach((element) => {
      if (element.Nombre != "") {
        let participant = {
          Name: element.Nombre,
          Skills: {},
      
        };
        delete element.Nombre;
        delete element.Grupo;

        //turns values into ints
        const keys = Object.keys(element);
        for (const key of keys) {
          element[key] = parseInt(element[key]);
        }
        participant.Skills = element;
        participantsJSON.push(participant);
      }
    });
  };
} //closes LoadparticipantsDatabase method

//Parse JSONS to Firebase

const UploadSkillsCSV = () => {
  if (skillsJSON) {
    db.collection("Habilidades")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          ////////////////////////////
          //clear Previous Skillss
          ////////////////////////////
          db.collection("Habilidades")
            .doc(doc.id)
            .delete()
            .then(() => {})
            .catch((error) => {
              Alert("Error restarting database values: ", error);
            });
        });
        ////////////////////////////
        //Uploading New Skills
        ////////////////////////////
        skillsJSON.forEach((skill) => {
          db.collection("Habilidades").doc(skill).set({});
        });
      });
  } else alert("No has subido una base de datos");
}; //closes UploadSkillsCSV method

const UploadOccupationsCSV = () => {
  if (occupationsJSON) {
    db.collection("Trabajos")
      .get()
      .then((querySnapshot) => {
        ////////////////////////////
        //clear Previous Jobs
        ////////////////////////////
        querySnapshot.forEach((doc) => {
          db.collection("Trabajos")
            .doc(doc.id)
            .delete()
            .then(() => {})
            .catch((error) => {
              console.log("Error restarting database values: ", error);
            });
        });
        ////////////////////////////
        //Uploading New Jobs
        ////////////////////////////
        occupationsJSON.forEach((job) => {
          db.collection("Trabajos").doc(job.ID).set({
            Habilidades: job.Skills,
          });
        });
      });
  } else alert("No has subido una base de datos");
}; //closes UploadOccupationsCSV method

const UploadParticipantsCSV = () => {
  if (participantsJSON) {
    db.collection("Participantes")
      .get()
      .then((querySnapshot) => {
        ////////////////////////////
        //clear Previous Particpants
        ////////////////////////////
        querySnapshot.forEach((doc) => {
          db.collection("Participantes")
            .doc(doc.id)
            .delete()
            .then(() => {})
            .catch((error) => {
              console.log("Error restarting database values: ", error);
            });
        });

        ////////////////////////////
        //Uploading New Participants
        ////////////////////////////
        participantsJSON.forEach((participant) => {
          db.collection("Participantes").doc(participant.Name).set({
            Nombre: participant.Name,
            Habilidades: participant.Skills,
            Trabajo: "",
          });
        });
      });
  } else alert("No has subido una base de datos");
}; //closes UploadParticipantsCSV method
