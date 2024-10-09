async function getData() {
  let promise = await axios({
    url: "https://shop.cyberlearn.vn/api/Product",
    method: "GET",
  })
    .then((res) => {
      // console.log(res);
      renderData(res.data.content);
    })
    .catch((err) => {
      console.log(err);
    });
}
getData(); // phần này k liên quan bạn nó của trang index

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

// function thongBaoToast(thongBao, err = "success") {
//   // này là khai báo function có tham số là thongBao và err được mặc định là success (nếu truyền cái khác thì nó sẽ nhận cái khác )
//   let bgColor = err == "success" ? "success" : "red";
//   // tạo một biến bgColor được gán giá trị bằng với
//   // toán tử 3 ngôi trước khi gán dữ liệu nhé

//   Toastify({
//     text: thongBao, // này dắn nội dung là biến tb
//     duration: 3000, // này time chạy
//     // destination: "https://github.com/apvarun/toastify-js",=>
//     // giống thẻ a href nó trỏ tới đâu

//     // newWindow: true,=> là chưa hiểu
//     // có mở một tab mới khi click vào toast không

//     // 2 dòng này là nếu bạn đọc doc thì nó ghi là
//     close: true, // này chức năng tự đóng true (này là hiện nút tắt hay không trên toast )
//     gravity: "top", // `top` or `bottom`// 2 thằng này alf vị trí
//     position: "right", // `left`, `center` or `right`
//     stopOnFocus: true, // Prevents dismissing of toast on hover// này hiểu lờ mờ hơi trù tượng :D
//     style: {
//       background: bgColor,
//     },
//     onClick: function () {}, // Callback after click // này tạo sự kien onclick này nó tạo function oclick mà bỏ trông hết tham số chức năng v nó có ý nghĩa gì ta thật ra bỏ luôn dòng này cũng được :D nó chỉ là chức năng thêm cho bạn tùy biến toast thôi àaa
//   }).showToast();
// }

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
