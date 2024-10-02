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
    const { id, name, image } = field;
    content += `<div class ="col-4 text-center">
      <img style="width: 100%;" src="${image}" alt="">
      <h2>${name}</h2>
    </div>`;
  }
  document.querySelector(".banner_content").innerHTML = content;
}
