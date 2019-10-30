//Helper functions
const changeActive = (activeSelector, itemToSetActive) => {
  let active = document.querySelectorAll(activeSelector);
  for (let j = 0; j < active.length; j++) {
    active.item(j).className = active.item(j).className.replace("active", "");
  }
  itemToSetActive.className += " active";
};

//The following is wrapped in a listener for the DOM to be loaded since otherwise odd values can be returned
//concept from: https://stackoverflow.com/questions/30211605/javascript-html-collection-showing-as-0-length
document.addEventListener("DOMContentLoaded", () => {
  //Functionality for changing pages
  let pageLinks = document.getElementsByClassName("navPageLink");
  let subLinks = document.getElementsByClassName("navSubLink");
  console.log(pageLinks);
  for (let i = 0; i < pageLinks.length; i++) {
    pageLinks.item(i).addEventListener("click", () => {
      changeActive("a.active", pageLinks.item(i));
    });
  }
  console.log("done");

  //Functionality for changing subLists
  window.addEventListener("scroll", () => {
    console.log(subLinks);
    for (let i = 0; i < subLinks.length; i++) {
      let divId = subLinks.item(i).attributes["href"].value.split("#")[1];
      let subLink = document.getElementById("#" + divId);
      let linkTop = subLink.getBoundingClientRect().top;
      console.log(linkTop);
      if (linkTop >= 0 && linkTop < 100) {
        changeActive("a.navSubLink.active", subLinks.item(i));
      }
    }
  });
});
