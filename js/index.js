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

function dangKy() {
  document.getElementById("submit").onclick = function (event) {
    console.log("hello");
    event.preventDefault();
  };
}
