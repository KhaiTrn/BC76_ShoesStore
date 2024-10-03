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
    content += `<div class ="product_item col-3 text-center">
      <a href=""><img src="${image}" alt=""></a>
      <h4><a href="#">${name}</a></h4>
      <p class= "description">${shortDescription}</p>
      <p class = "text-danger">$ ${price}</p>
    </div>`;
  }
  document.querySelector(".banner_content").innerHTML = content;
}
