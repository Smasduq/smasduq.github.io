const  searchInput = document.getElementById("search");
const list = document.getElementById("all1");
const items = list.getElementsByTagName("span");
const item2 = list.getElementsByTagName('li');

searchInput.addEventListener("input", function () {
    const searchItem = searchInput.value.toLowerCase();

    for (let i = 0; i < items.length; i++) {
        const itemText = items[i].textContent.toLowerCase();
        if (itemText.includes(searchItem)) {
            items[i].style.display = "block";
            item2[i].style.display = 'block';
        } else {
            items[i].style.display = "none";
            item2[i].style.display = 'none';
        }
    }
});