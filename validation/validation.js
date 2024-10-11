// làm các hàm kiểm tra dk
// trong hàm cần 2 giá trị để có thể chạy vd như id,name và biến thẻ thông báo
// trong đó nếu rỗng thì báo lỗi và giá trị là false và ngược lại
// kiểm tra thêm giá trị cần thiết khác ví du số đt là bao nhiêu số

// check password
function checkPasswordValue(value, theThongBao) {
  let regexPassword = /^(?=.*[A-Z])(?=.*[\W_]).+$/;
  let checkPassword = regexPassword.test(value);
  if (checkPassword) {
    theThongBao.innerHTML = "";
    return true;
  } else {
    theThongBao.innerHTML =
      "Vui lòng nhập mật khẩu có ít nhất 1 ký tự viết hoa và một ký tự đặc biệt";
    return false;
  }
}

// check passwordCofirm
function checkPasword(valuePassword, valuePasswordConfirm, theThongBao) {
  if (!valuePassword || valuePassword.trim() === "") {
    theThongBao.innerHTML = "Vui lòng nhập lại password";
    return false;
  }

  if (valuePasswordConfirm !== valuePassword) {
    theThongBao.innerHTML = "Password không khớp";
    return false;
  } else {
    theThongBao.innerHTML = "";
    return true;
  }
}

//check name
function checkName(name, theThongBao) {
  if (!name.trim() === "") {
    theThongBao.innerHTML = "Không được để trống tên";
    return false;
  } else {
    theThongBao.innerHTML = "";
    return true;
  }
}
// check phone
function checkPhone(valuePhone, theThongBao) {
  valuePhone = valuePhone.trim();

  if (!valuePhone || valuePhone === "") {
    theThongBao.innerHTML = "Vui lòng không để trống";
    return false;
  } else if (valuePhone.length !== 10) {
    theThongBao.innerHTML = "Vui lòng nhập đúng 10 số điện thoại";
    return false;
  } else {
    theThongBao.innerHTML = "";
    return true;
  }
  const phoneRegex = /^(03|05|07|08|09)\d{8}$/;
  if (!phoneRegex.test(valuePhone)) {
    theThongBao.innerHTML = "Số điện thoại không hợp lệ";
    return false;
  }
  return true;
}

// checkemail
function checkEmailValue(value, theThongBao) {
  if (!value || value.trim() === "") {
    theThongBao.innerHTML = "Vui lòng không để trống";
    return false;
  }

  let regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let checkEmail = regexEmail.test(value);
  if (checkEmail) {
    theThongBao.innerHTML = "";
    return true;
  } else {
    theThongBao.innerHTML = "Vui lòng nhập đúng định dạng email";
    return false;
  }
}
