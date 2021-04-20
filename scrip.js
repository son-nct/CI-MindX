const navItems = [
  {
    name: "Item 1",
    children: ["Item 1.1", "Item 1.2", "Item 1.3"],
  },
  {
    name: "Item 2",
    children: [
      "Item 2.1",
      "Item 2.2",
      "Item 2.3",
    ],
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


var nav = document.getElementsByClassName('nav');

navItems.forEach((item) => {
    var span = document.createElement('span');
    span.appendChild(document.createTextNode(item.name));
    nav[0].appendChild(span);
    
    if(item.children != null) {
      if(span.textContent === item.name) {
        var dropdown = document.createElement('div');
        var ul = document.createElement('ul');
        dropdown.className = 'dropdown';
        dropdown.appendChild(ul);
        for(let value of item.children) {
          var li = document.createElement('li');
          li.appendChild(document.createTextNode(value));
          ul.appendChild(li);          
        }
        span.appendChild(dropdown);
      }
    }
   
});
