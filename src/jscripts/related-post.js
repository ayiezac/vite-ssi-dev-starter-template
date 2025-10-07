$(document).ready(function () {
 var protocol = window.location.protocol;
 var hostname = window.location.hostname;
 var pathname = window.location.pathname;
 var getCluster = pathname.split("/")[1];
 var nameCluster = "";

 var url = protocol + '//' + hostname + '/' + getCluster + '/' + 'related-content.php';

 var cluster = ["dating/", "culture/", "travel/", "psychology/", "realities/", "our-process/", "faqs/", "success-stories/"];
 for (var i = 0; i < cluster.length; i++) {
  nameCluster = cluster[i];


  if (pathname.includes(nameCluster)) {
   $.ajax({
    type: "POST",
    url: url,
    data: {
     cluster: nameCluster
    },
    cache: false,
    success: function (data) {
     /*dynamic cluster related name */
     function dynamicclusterName(str) {
      var words = str.match(/([^-]+)/g) || [];
      words.forEach(function (word, i) {
       words[i] = word[0].toUpperCase() + word.slice(1);
      });
      return words.join(' ');
     }

     var myString = dynamicclusterName(getCluster);

     $('.cluster-data').html(data);
     $('.cluster-name').append(myString);
    },
    error: function (xhr, status, error) {
     console.error(xhr);
    }
   });
  } else {

  }

 }

});










// This code is for only /visa/visakitorder.shtml || /visa/visa-kit.shtml only // 

const screensize = window.innerWidth;

if (screensize < 991) {

 navMenu();
}


function navMenu() {
 let currUrl = window.location.href;
 if (currUrl.includes("/visa/visakitorder.shtml") || currUrl.includes("/visa/visa-kit.shtml")) {

  console.log("Run only in /visa/visakitorder.shtml  or  /visa/visa-kit.shtml");
  let button = document.querySelector(".navbar-toggle");
  let navbar = document.getElementById("navbar");
  navbar.classList.add('out');
  button.addEventListener('click', function () {
   if (navbar.classList.contains('out')) {
    navbar.classList.remove('out');

   }
   else {
    navbar.classList.add('out');
   }
  })

  const dropdownElement = document.querySelector('.nav.navbar-nav .dropdown');
  dropdownElement.addEventListener('click', function () {
   if (dropdownElement.classList.contains('open')) {
    dropdownElement.classList.remove('open');
   }
   else {
    dropdownElement.classList.add('open');
   }
   let dropdownMenu = document.querySelector('.nav.navbar-nav .dropdown-menu');
   if (dropdownElement.classList.contains('open')) {
    dropdownMenu.style.setProperty('display', 'block', 'important');
   }
   else {
    dropdownMenu.style.setProperty('display', 'none', 'important');
   }

  })
 }

}

//End