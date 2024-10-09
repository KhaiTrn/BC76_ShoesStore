// index
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
  for (let field of arr) {
    const { id, name, price, shortDescription, image } = field;
    content += `<div class ="product_item text-uppercase col-lg-3
    col-md-4 col-sm-6 col-xs-12 text-center wow animate__animated animate__bounceInUp">
      <a href="./detail.html?productid=${id}"><img src="${image}" alt=""></a>
      <h4><a href="./detail.html?productid=${id}">${name}</a></h4>
      <p class= "description">${shortDescription}</p>
      <p class = "text-danger">$ ${price}</p>
    </div>`;
  }
  document.querySelector(".product_content").innerHTML = content;
}
