// window.localStorage.clear();
const name = document.querySelector(".website-name");
const url = document.querySelector(".website-url");
const button = document.querySelector(".save");
let count = 0;

const isValidUrl = (urlString) => {
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    const regex = new RegExp(expression);
    if (!urlString.match(regex)) {
        return false;
    }
    return true;
};

const validateData = () => {
  if (name.value == "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Name Cannot be blank!",
    });
    return false;
  } else if (url.value == "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Url cannot be blank!",
    });
    return false;
  } else if (!isValidUrl(url.value)) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please enter a valid URL!",
      footer: '<h2>Example:- https://www.google.com/</h2>'
    });
    return false;
  }
  return true;
};

const fetchLocalStorage = () => {
  return JSON.parse(window.localStorage.getItem("details"));
};

const setLocalStorage = (item) => {
  window.localStorage.setItem("details", JSON.stringify(item));
};

const createObj = () => {
  const obj = {
    website: name.value,
    visit: url.value,
  };
  return obj;
};

const putData = () => {
  count=0;
  let check = fetchLocalStorage();
  document.querySelector("tbody").innerHTML = "";
  if (check != null) {
    for (ch of check) {
      const newElement = document.createElement("tr");
      newElement.classList.add(`${count}`);
      newElement.innerHTML = `<td class="flex-1"><img src="https://s2.googleusercontent.com/s2/favicons?domain=${ch.visit}" alt="Not Found"></td>
            <td>${ch.website}</td>
            <td onclick=visit("${ch.visit}") class="pointer">Visit</td>
            <td onclick=deleteItems(${count}) class="pointer">Delete</td>`;
      document.querySelector("tbody").append(newElement);
      count++;
    }
  }
};

const visit=(link)=>{
    window.open(link, '_blank');
}

const deleteItems=(location)=>{
let check=fetchLocalStorage();
check.splice(location,1);
setLocalStorage(check);
putData();
}

const resetData=()=>{
    name.value="";
    url.value="";
}

putData();

button.addEventListener("click", (e) => {
  let bool = validateData();
  name.value=name.value.trim();
  url.value=url.value.trim();
  if (bool) {
    let check = fetchLocalStorage();
    if (check == null) {
      let arr = [];
      let obj = createObj();
      arr.push(obj);
      setLocalStorage(arr);
    } else {
      let obj = createObj();
      let arr = fetchLocalStorage();
      arr.push(obj);
      setLocalStorage(arr);
    }
    putData();
    resetData();
  }
});