const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

function validate(name, age, email, pass, nat) {
  if (name.trim().langht < 3) {
    alert("There is no such name");
    return false;
  }
  if (email.trim().langht < 3) {
    alert("No such email exists");
    return false;
  }
  if (pass.trim().langht < 3 && pass.trim().langht > 8) {
    alert("You cannot enter such a password");
    return false;
  }
  if (age.value <= 0 || age.value >= 100) {
    alert(`Cannot be at such an age`);
    return false;
  }
  if (name.trim().langht < 3) {
    alert("There is no such name");
    return false;
  }
  if (!Number(age)) {
    alert("Must be a young number");

    return false;
  }
  const emailValid = validateEmail(email);
  if (!emailValid) {
    alert("Please enter your email address");
    return false;
  }
  if (!nat) {
    alert("You must select your nationality");
    return false;
  }
  return true;
}

function getUsers() {
  let users = [];
  if (localStorage.getItem("users")) {
    users = JSON.parse(localStorage.getItem("users"));
  }
  return users;
}

export { validate, getUsers };
