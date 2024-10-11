let arrFormRegister = {}; // từ khúc này nè okay mình đọc hiểu mà k sao
document.getElementById("form-register").onsubmit = function (event) {
  console.log("hello");
  event.preventDefault();
  let register = getDataValue();
  delete register.passwordConfirm;
  console.log("nhan", register);
  console.log(arrFormRegister);
  updateRegister(register);
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
      if (!checked) {
        document.getElementById("thongBao").innerHTML =
          "vui lòng chọn giới tính";
      }
      if (checked) {
        register.gender = value;
        if (register.gender === "Male") {
          register.gender = true;
        } else {
          register.gender = false;
        }
      }
    } else if (id) {
      if (id === "name") {
        if (!checkName(value, theThongBao)) {
          flag = false;
        }
      }
      if (id === "email") {
        if (!checkEmailValue(value, theThongBao)) {
          flag = false;
        }
      }
      if (id === "phone") {
        if (!checkPhone(value, theThongBao)) {
          flag = false;
        }
      }
      if (id === "password") {
        if (!checkPasswordValue(value, theThongBao)) {
          flag = false;
        }
        register.password = value;
      }
      if (name === "passwordConfirm") {
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

function updateRegister(data) {
  let promise = axios({
    url: "https://shop.cyberlearn.vn/api/Users/signup",
    method: "POST",
    data: data, // sai khuc nay
  });
  promise
    .then((res) => {
      console.log(res);
      testThongBao(res.data.message, "success");
    })
    .catch((err) => {
      console.log(err);
    });
}

function testThongBao(thongBao, thanhCong = "success") {
  let bgColor = (thanhCong = "success" ? "success" : "red");
  Toastify({
    text: thongBao,
    duration: 3000,
    // destination: "https://github.com/apvarun/toastify-js",
    // newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: bgColor,
    },
    onClick: function () {}, // Callback after click
  }).showToast();
}
