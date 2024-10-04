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
      render(arr1);
      let arr = [res.data.content];
      renderDataDetail(arr);
    })
    .catch((err) => {
      console.log(err);
    });
};
function render(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let field of [arr[i]]) {
      const { image } = field;
      console.log(image);
    }
  }
}
function renderDataDetail(arr) {
  let content = "";
  for (let field of arr) {
    const { id, name, description, price, image, size } = field;

    content += `
    <div class="detail_img"><img src="${image}" alt="">
          </div>
          <div class="detail_info">
            <h3 class="text-black mb-4">${name}</h3>
            <p class="fs-5">${description}</p>
            <p class="text-danger fs-4">$ ${price}</p>
            <p class="text-danger fs-4">Available Size</p>`;
    for (let i of size) {
      content += `<button class="btn btn-dark mx-1">${i}</button>`;
    }
    content += `</div>`;
  }
  document.getElementById("detail_product").innerHTML = content;
}
