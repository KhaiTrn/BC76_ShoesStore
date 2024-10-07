let arrFormRegister = [];

async function getData() {
  let promise = await axios({
    url: "https://shop.cyberlearn.vn/api/Product",
    method: "GET",
  })
    .then((res) => {
      console.log(res);
      renderData(res.data.content);
    })
    .catch((err) => {
      console.log(err);
    });
}
getData();

function renderData(arr) {
  let content = "";
  let newArr = arr.slice(0, 6);
  for (let field of newArr) {
    const { id, image } = field;
    content += `<div class="col-6">
      <img src="${image}" alt="">
    </div>`;
  }
  document.querySelector(".container_a").innerHTML = content;
}

document.getElementById("form-register").onsubmit = function (event) {
  console.log("hello");
  event.preventDefault();
  let register = getDataValue();
  console.log(register);
};

function getDataValue(arr = arrFormRegister) {
  let arrField = document.querySelectorAll("#form-register input");
  let register = {};
  let flag = true;

  // nếu giá trị của đk = false thì register = false và ngược lại
  for (let field of arrField) {
    let { value, id, type, checked, name } = field;
    let theThongBao = field.parentElement.querySelector("span");
    //  let passwordValue=field.getAttribute("data-password").value;
    console.log(theThongBao);
    if (type === "radio") {
      if (checked) {
        register.gender = value;
      }
    } else if (id) {
      if (id === "name") {
        if (!checkName(value, theThongBao)) {
          flag = false;
        }
      } else if (id === "email") {
        if (!checkEmailValue(value, theThongBao)) {
          flag = false;
        }
      } else if (id === "phone") {
        if (!checkPhone(value, theThongBao)) {
          flag = false;
        }
      } else if (id === "password") {
        if (!checkPasswordValue(value, theThongBao)) {
          flag = false;
        }
        register.password = value;
      } else if (name === "passwordConfirm") {
        if (!checkPasword(register.password, value, theThongBao)) {
          flag = false;
        }
      }
      if (flag) {
        register[id] = value;
      }
    }
  }

  return flag ? register : false;
}
