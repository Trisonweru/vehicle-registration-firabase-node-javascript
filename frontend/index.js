var register = document.getElementById("registerform");
var username = document.getElementById("username");
var licence = document.getElementById("licence");
var model = document.getElementById("car-model");
var number = document.getElementById("plate-number");
var alertReg = document.getElementById("alert-reg");
var template = document.querySelector("#item_template").content;
var righContainer = document.querySelector(".right-container");
var edit = document.querySelector(".edit");
var modal_username = document.getElementById("musername");
var modal_licence = document.getElementById("mlicence");
var modal_model = document.getElementById("mcar-model");
var modal_number = document.getElementById("mplate-number");
var update = document.getElementById("save");
var item_delete = document.querySelector(".delete");

const dataObj = [];
window.onload = async function () {
  const resp = await fetch("http://localhost:3000/all", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });
  const data = await resp.json();
  const newData = Array.prototype.reverse.call(data);
  newData.map((item) => {
    let template_clone = template.cloneNode(true);
    template_clone.querySelector(".uname").innerHTML = `${item.username}`;
    template_clone.querySelector(".dlicence").innerHTML = `${item.licence}`;
    template_clone.querySelector(".cmodel").innerHTML = `${item.model}`;
    template_clone.querySelector(".pnumber").innerHTML = `${item.number}`;
    template_clone.querySelector(".edit").setAttribute("id", `${item.id}`);
    template_clone.querySelector(".delete").setAttribute("id", `${item.id}`);
    righContainer.appendChild(template_clone);
    dataObj.push(item);
  });
};

function edit_data(id) {
  dataObj.map((item) => {
    if (item.id === id) {
      modal_username.value = `${item.username}`;
      modal_licence.value = `${item.licence}`;
      modal_model.value = `${item.model}`;
      modal_number.value = `${item.number}`;

      update.addEventListener("click", async (e) => {
        const data = {
          id: id,
          username: modal_username.value,
          licence: modal_licence.value,
          model: modal_model.value,
          number: modal_number.value,
        };
        const resp = await fetch("http://localhost:3000/update", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
        });
        const respData = await resp.json();
        if (respData) {
          window.location.reload();
        }
      });
    }
  });
}

function delete_item(id) {
  dataObj.map(async (item) => {
    if (item.id === id) {
      data = {
        id: id,
      };
      const resp = await fetch("http://localhost:3000/delete", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
      });
      const respData = await resp.json();
      if (respData) {
        window.location.reload();
      }
    }
  });
}

register.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (
    username.value === "" &&
    licence.value === "" &&
    model.value === "" &&
    number.value === ""
  ) {
    alertReg.classList.add("alert");
    alertReg.innerHTML = "All fields are required!";
    setTimeout(() => {
      alertReg.classList.remove("alert");
      alertReg.innerHTML = "";
    }, 5000);
  } else {
    const data = {
      username: username.value,
      licence: licence.value,
      model: model.value,
      number: number.value,
    };
    const resp = await fetch("http://localhost:3000/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    });
    const respData = await resp.json();
    if (respData) {
      window.location.reload();
    }
  }
});
