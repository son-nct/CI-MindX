const navItems = [
  {
    name: "Item 1",
  },
  {
    name: "Item 2",
  },
  {
    name: "Item 3",
  },
  {
    name: "Item 4",
  },
  {
    name: "Item 5",
  },
];


window.onload = () => {
    navItems.forEach(item =>{
       document.getElementsByClassName('menu')[0].innerHTML += '<span>'+item.name+'</span>';
    })
}

