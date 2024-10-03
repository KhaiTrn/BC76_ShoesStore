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
      let arr = [res.data.content];
      renderDataDetail(arr);
    })
    .catch((err) => {
      console.log(err);
    });
};

function renderDataDetail(arr) {
  let content = "";
  for (let field of arr) {
    const { id, name, description, price, image } = field;

    content += `<div class="detail_img"><img src="${image}" alt="">
          </div>
          <div class="detail_info">
            <h3>${name}</h3>
            <p>${description}</p>
            <p>${price}</p>
          </div>`;
  }
  document.getElementById("detail_product").innerHTML = content;
}
