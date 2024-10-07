window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get("productid");
  console.log("params", myParam);

  let promise = axios({
    url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${myParam}`,
    method: "GET",
  });
  promise
    .then((res) => {
      console.log(res);
      console.log(res.data.content);
      console.log(res.data.content.relatedProducts);
      let arr1 = res.data.content.relatedProducts;

      let arr = [res.data.content];
      // render(arr1, "relate");
      renderDataDetail(arr);
      render(arr1, "test_case");
    })
    .catch((err) => {
      console.log(err);
    });
};
function render(arr, classList) {
  let content = "";
  content += `<div class = "relatedProducts d-flex text-center">`;
  for (let i = 0; i < arr.length; i++) {
    for (let field of [arr[i]]) {
      const { name, price, image } = field;
      content += `<div class = "product_relate_item">
      <a href="javascript:void(0)" onclick="changeMainImage('${image}','${name}','${price}')"><img width="60%" src="${image}" alt=""></a>
      <h4><a class="text-uppercase" href="javascript:void(0)" onclick="changeMainImage('${image}','${name}','${price}')">${name}</a></h4>
      <p class="price text-danger fs-4">$ ${price}</p>
      </div>`;
    }
  }
  content += `</div>`;

  document.getElementById(classList).innerHTML += content;
}
function renderDataDetail(arr) {
  let content = "";
  for (let field of arr) {
    const { id, name, description, price, image, size } = field;

    content += `
    
    <div class="detail_img"><img src="${image}" alt="">
          </div>
          <div class="detail_info">
            <h3 class="name text-black text-uppercase mb-4">${name}</h3>
            <p class="fs-5">${description}</p>
            <p class="price text-danger fs-4">$ ${price}</p>
            <p class="text-danger text-warning-emphasis fs-4">Available Size</p>`;
    for (let i of size) {
      content += `<button onclick="selectSize(this)" class="size mx-1">${i}</button>`;
    }
    content += `<div class="button_cart mt-3">
    <button onclick="congTruCart('tang')" class="btn text-center">
      +
    </button>
    <input
      id="soLuong"
      class="text-center"
      type="number"
      value="1"
      min="1"
    />
    <button onclick="congTruCart('giam')" class="btn text-center">
      -
    </button>
  </div>
  <div class="button_add">
    <button class="">ADD TO CARD</button>
    <button class ="">BUY IT NOW</button>
  </div>`;
    content += `</div>`;
    document.querySelector(".title").innerHTML = `${name}`;
  }

  document.getElementById("detail_product").innerHTML += content;
}
// Button tăng giảm số lượng
function congTruCart(type) {
  let input = document.getElementById("soLuong");
  let value = parseInt(input.value);

  if (type == "tang") {
    value += 1;
  } else if (type == "giam" && value > 1) {
    value -= 1;
  }

  input.value = value;
}
// thay đổi các phần tử trong trang
function changeMainImage(newImage, name, price) {
  document.querySelector(".detail_img img").src = newImage;
  document.querySelector(".name").innerHTML = name;
  document.querySelector(".price").innerHTML = price;
  document.querySelector(".title").innerHTML = name;
}
// click size
function selectSize(button) {
  document
    .querySelectorAll(".size")
    .forEach((btn) => btn.classList.remove("click"));
  button.classList.add("click");
}
