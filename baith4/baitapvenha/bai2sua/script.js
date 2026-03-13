const form = document.getElementById("registerForm");

const hoTen = document.getElementById("hoTen");
const email = document.getElementById("email");
const soDienThoai = document.getElementById("soDienThoai");
const matKhau = document.getElementById("matKhau");
const gioiTinh = document.getElementById("gioiTinh");

const hoTenError = document.getElementById("hoTenError");
const emailError = document.getElementById("emailError");
const soDienThoaiError = document.getElementById("soDienThoaiError");
const matKhauError = document.getElementById("matKhauError");
const gioiTinhError = document.getElementById("gioiTinhError");

const hoTenCount = document.getElementById("hoTenCount");
const togglePassword = document.getElementById("togglePassword");
const passwordStrengthBar = document.getElementById("passwordStrengthBar");
const passwordStrengthText = document.getElementById("passwordStrengthText");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const soDienThoaiRegex = /^0[0-9]{9}$/;
const matKhauRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
const chiChuRegex = /^[a-zA-ZÀ-ỹ\s]+$/;

function hienThiLoi(inputElement, errorElement, message) {
  errorElement.textContent = message;
  inputElement.classList.add("error-border");
  inputElement.classList.remove("success-border");
}

function hienThiHopLe(inputElement, errorElement) {
  errorElement.textContent = "";
  inputElement.classList.remove("error-border");
  inputElement.classList.add("success-border");
}

function xoaLoi(inputElement, errorElement) {
  errorElement.textContent = "";
  inputElement.classList.remove("error-border");
  inputElement.classList.remove("success-border");
}

function capNhatDemKyTuHoTen() {
  hoTenCount.textContent = `${hoTen.value.length}/50`;
}

function capNhatDoManhMatKhau() {
  const value = matKhau.value;

  if (value.length === 0) {
    passwordStrengthBar.style.width = "0%";
    passwordStrengthBar.style.background = "transparent";
    passwordStrengthText.textContent = "Độ mạnh: Chưa nhập";
    return;
  }

  let score = 0;

  if (value.length >= 6) score++;
  if (value.length >= 8) score++;
  if (/[a-z]/.test(value)) score++;
  if (/[A-Z]/.test(value)) score++;
  if (/\d/.test(value)) score++;
  if (/[^A-Za-z0-9]/.test(value)) score++;

  if (score <= 3) {
    passwordStrengthBar.style.width = "33%";
    passwordStrengthBar.style.background = "red";
    passwordStrengthText.textContent = "Độ mạnh: Yếu";
  } else if (score <= 5) {
    passwordStrengthBar.style.width = "66%";
    passwordStrengthBar.style.background = "#f4c542";
    passwordStrengthText.textContent = "Độ mạnh: Trung bình";
  } else {
    passwordStrengthBar.style.width = "100%";
    passwordStrengthBar.style.background = "green";
    passwordStrengthText.textContent = "Độ mạnh: Mạnh";
  }
}

function validateHoTen() {
  const value = hoTen.value.trim();

  if (value === "") {
    hienThiLoi(hoTen, hoTenError, "Họ tên không được để trống");
    return false;
  }

  if (value.length > 50) {
    hienThiLoi(hoTen, hoTenError, "Họ tên tối đa 50 ký tự");
    return false;
  }

  if (!chiChuRegex.test(value)) {
    hienThiLoi(hoTen, hoTenError, "Họ tên chỉ được chứa chữ cái và khoảng trắng");
    return false;
  }

  hienThiHopLe(hoTen, hoTenError);
  return true;
}

function validateEmail() {
  const value = email.value.trim();

  if (value === "") {
    hienThiLoi(email, emailError, "Email không được để trống");
    return false;
  }

  if (!emailRegex.test(value)) {
    hienThiLoi(email, emailError, "Email không đúng định dạng");
    return false;
  }

  hienThiHopLe(email, emailError);
  return true;
}

function validateSoDienThoai() {
  const value = soDienThoai.value.trim();

  if (value === "") {
    hienThiLoi(soDienThoai, soDienThoaiError, "Số điện thoại không được để trống");
    return false;
  }

  if (!soDienThoaiRegex.test(value)) {
    hienThiLoi(soDienThoai, soDienThoaiError, "Số điện thoại phải gồm 10 số và bắt đầu bằng 0");
    return false;
  }

  hienThiHopLe(soDienThoai, soDienThoaiError);
  return true;
}

function validateMatKhau() {
  const value = matKhau.value.trim();

  if (value === "") {
    hienThiLoi(matKhau, matKhauError, "Mật khẩu không được để trống");
    return false;
  }

  if (!matKhauRegex.test(value)) {
    hienThiLoi(
      matKhau,
      matKhauError,
      "Mật khẩu phải có ít nhất 8 ký tự, gồm chữ thường, chữ hoa và số"
    );
    return false;
  }

  hienThiHopLe(matKhau, matKhauError);
  return true;
}

function validateGioiTinh() {
  const value = gioiTinh.value;

  if (value === "") {
    hienThiLoi(gioiTinh, gioiTinhError, "Vui lòng chọn giới tính");
    return false;
  }

  hienThiHopLe(gioiTinh, gioiTinhError);
  return true;
}

function resetThanhMatKhau() {
  passwordStrengthBar.style.width = "0%";
  passwordStrengthBar.style.background = "transparent";
  passwordStrengthText.textContent = "Độ mạnh: Chưa nhập";
}

hoTen.addEventListener("blur", validateHoTen);
email.addEventListener("blur", validateEmail);
soDienThoai.addEventListener("blur", validateSoDienThoai);
matKhau.addEventListener("blur", validateMatKhau);
gioiTinh.addEventListener("change", validateGioiTinh);

hoTen.addEventListener("input", function () {
  xoaLoi(hoTen, hoTenError);
  capNhatDemKyTuHoTen();
});

email.addEventListener("input", function () {
  xoaLoi(email, emailError);
});

soDienThoai.addEventListener("input", function () {
  xoaLoi(soDienThoai, soDienThoaiError);
});

matKhau.addEventListener("input", function () {
  xoaLoi(matKhau, matKhauError);
  capNhatDoManhMatKhau();
});

gioiTinh.addEventListener("change", function () {
  xoaLoi(gioiTinh, gioiTinhError);
});

togglePassword.addEventListener("click", function () {
  if (matKhau.type === "password") {
    matKhau.type = "text";
    togglePassword.textContent = "🙈";
  } else {
    matKhau.type = "password";
    togglePassword.textContent = "👁";
  }
});

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const isHoTenValid = validateHoTen();
  const isEmailValid = validateEmail();
  const isSoDienThoaiValid = validateSoDienThoai();
  const isMatKhauValid = validateMatKhau();
  const isGioiTinhValid = validateGioiTinh();

  if (
    isHoTenValid &&
    isEmailValid &&
    isSoDienThoaiValid &&
    isMatKhauValid &&
    isGioiTinhValid
  ) {
    alert("Gửi form thành công!");
    form.reset();

    hoTen.classList.remove("success-border");
    email.classList.remove("success-border");
    soDienThoai.classList.remove("success-border");
    matKhau.classList.remove("success-border");
    gioiTinh.classList.remove("success-border");

    capNhatDemKyTuHoTen();
    resetThanhMatKhau();
    matKhau.type = "password";
    togglePassword.textContent = "👁";
  }
});

capNhatDemKyTuHoTen();
resetThanhMatKhau();