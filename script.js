//Koppla til header, main, footer
let header = document.getElementById("header");
let main = document.getElementById("main");
let footer = document.getElementById("footer");

//Text till footern
let footerText = document.createElement("p");
footerText.innerText = "Tack för att du besöker vår sida!";
footerText.id = "footerText";
footer.append(footerText);

//Vår "Logo"
let logo = document.createElement("h1");
logo.innerText = "Nyhetsbrev";
logo.id = "logo";

//För den inloggade
let loggedDiv = document.createElement("div");
let loggedUserName = document.createElement("h2");
let loggedEmail = document.createElement("p");
let loggedAge = document.createElement("p");
let loggedPrenumeration = document.createElement("p");
let changePrenumeration = document.createElement("a");
changePrenumeration.innerText = "Du kan ändra din prenumeration status här ";
let changeBtn = document.createElement("button");
changeBtn.id = "changeBtn";
changeBtn.innerHTML = "Ändra";

//Fyra olika main innehåll
let mainloggedin = document.createElement("p");
mainloggedin.innerText = "Välkommen!";
let mainnotloggedin = document.createElement("p");
mainnotloggedin.innerText = "Välkommen! Vänligen logga in!";
let mainNew = document.createElement("p");
mainNew.innerText = "Grattis! Nu är du registrerad. Vänligen logga in!";
let failed = document.createElement("p");
failed.innerText = "Något gick fel!";
failed.style.color = "red";
failed.className = "mainText";
mainNew.className = "mainText";
mainnotloggedin.className = "mainText";
mainloggedin.className = "mainText";

//Skapa inloggnings formulär
let loginText = document.createElement("p");
loginText.innerText = "Har du ett konto? Logga in!";

let nameInput = document.createElement("input");
nameInput.setAttribute("type", "text");
nameInput.setAttribute("placeholder", "namn");

let keyInput = document.createElement("input");
keyInput.setAttribute("type", "text");
keyInput.setAttribute("placeholder", "lösenord");

let loginBtn = document.createElement("button");
loginBtn.innerHTML = "Logga in";

//Skapa konto formulär
let makeAccountText = document.createElement("p");
makeAccountText.innerText = "Inte registrerad? Skapa konto!";

let newNameInput = document.createElement("input");
newNameInput.setAttribute("type", "text");
newNameInput.setAttribute("placeholder", "namn");

let newKeyInput = document.createElement("input");
newKeyInput.setAttribute("type", "text");
newKeyInput.setAttribute("placeholder", "lösenord");

let emailInput = document.createElement("input");
emailInput.setAttribute("type", "email");
emailInput.setAttribute("placeholder", "email");

let ageInput = document.createElement("input");
ageInput.setAttribute("type", "number");
ageInput.setAttribute("placeholder", "Ålder");

let prenumerationInput = document.createElement("input");
prenumerationInput.setAttribute("type", "checkbox");

let prenumerationText = document.createElement("p");
prenumerationText.innerText =
  "Kryssa här om du vill prenumerera på vår nyhetsbrev!";

let prenumerationDiv = document.createElement("div");
prenumerationDiv.append(changePrenumeration, changeBtn);
let regPrenumerationDiv = document.createElement("div");
regPrenumerationDiv.append(prenumerationText, prenumerationInput);

let saveBtn = document.createElement("button");
saveBtn.innerHTML = "Skapa konto";

//Logga ut knapp
let logoutBtn = document.createElement("button");
logoutBtn.innerHTML = "Logga ut";

//Välkommen användaren text
let welcomeUser = document.createElement("p");
welcomeUser.className = "welcomeUser";

// Funktionen för prenumertation
let checked = false;
prenumerationInput.addEventListener("click", () => {
  checked = !checked;
  console.log(checked, "checked");
});

//Vad som visas om man inte är inloggad
function notLoggedin() {
  header.innerHTML = "";
  main.innerHTML = "";
  main.append(mainnotloggedin);
  header.append(logo);
  header.append(loginText, nameInput, keyInput, loginBtn);
  header.append(
    makeAccountText,
    newNameInput,
    newKeyInput,
    emailInput,
    ageInput,
    regPrenumerationDiv,
    saveBtn
  );
}
//Vad som visas när man är inloggad
function loggedin() {
  main.innerHTML = "";
  header.innerHTML = "";
  main.append(loggedDiv);
  header.append(logo, logoutBtn);
  loggedDiv.append(
    loggedUserName,
    loggedEmail,
    loggedAge,
    loggedPrenumeration,
    prenumerationDiv
  );
}
saveBtn.addEventListener("click", postRegistration);

// post anrop för registrering
function postRegistration() {
  let newUser = {
    userName: newNameInput.value,
    password: newKeyInput.value,
    email: emailInput.value,
    age: parseInt(ageInput.value),
    prenumeration: checked
  };
  console.log(newUser);
  fetch("https://nyhetsbreb-skolprojekt.herokuapp.com/register", {
    method: "POST",
    body: JSON.stringify(newUser),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(function (response) {
      // API anrop lyckades!
      if (response.ok) {
        main.append(mainNew);
        return response.json();
      } else {
        alert('Något gick fel')
        return Promise.reject(response);
      }
    })
    .then(function (data) {
      // JSON från vårt svar
      console.log(data.message);
    })
    .catch(function (err) {
      // Det är något fel
      console.warn("Something went wrong.", err);
    });
  main.innerHTML = "";
  if (newNameInput.value && newKeyInput.value) {
    main.append(mainNew);
  } else {
    main.append(failed);
  }
}
// Ändra prenumeration status
changeBtn.addEventListener("click", () => {
  let userId = localStorage.getItem("inloggad");
  if (userId) {
    userId = JSON.parse(userId);
  }
  userId = { _id: userId };
  fetch("https://nyhetsbreb-skolprojekt.herokuapp.com/register", {
    method: "PUT",
    body: JSON.stringify(userId),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(function (response) {
      // API anrop lyckades!
      if (response.ok) {
        alert("Din prenumeration status är nu ändrad!");
        return response.json();
      } else {
        alert("Något blev fel försök igen!");
        return Promise.reject(response);
      }
    })
    .catch(function (err) {
      // Det är något fel
      console.warn("Something went wrong.", err);
    });
});

loginBtn.addEventListener("click", login);
//Inloggningen
function login() {
  let loginUser = {
    userName: nameInput.value,
    password: keyInput.value
  };
  fetch("https://nyhetsbreb-skolprojekt.herokuapp.com/login", {
    method: "POST",
    body: JSON.stringify(loginUser),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then((response) => response.json())
    .then(function (data) {
      if (data.ID) {
        localStorage.setItem("inloggad", JSON.stringify(data.ID));
        loggedin()
        window.location.reload();
      } else alert('Något gick fel!');
    })
    .catch(function (err) {
      // Det är något fel
      console.warn("Something went wrong.", err);
      alert('Något gick fel!')
    });
}
//När man klickar på logga ut ska objektet tas bort från ls("inloggad") och ej inloggad sidan ska visas
logoutBtn.addEventListener("click", () => {
  notLoggedin();
  localStorage.removeItem("inloggad");
});
// Detta är vad som händer om vi har någon sparad i ls("inloggad")
if (localStorage.getItem("inloggad")) {
    let id=JSON.parse(localStorage.getItem("inloggad"))
    console.log(id)
    fetch("https://nyhetsbreb-skolprojekt.herokuapp.com/login/"+id) 
    .then((response) => response.json())
    .then(function (data) {
      if (data.name) {
        loggedUserName.innerText = "Välkommen! " + data.name;
        loggedEmail.innerText = "email: " + data.email;
        loggedAge.innerText = "ålder: " + data.age;
        loggedPrenumeration.innerText =
          "Prenumeration status: " + data.prenumeration;        
        loggedin();
      }
    })
} else {
  notLoggedin();
}
    
