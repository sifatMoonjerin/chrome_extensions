const culpritUrlArray = [
  'https://www.facebook.com/',
  'https://web.facebook.com/'
];

const culpritUrlSet = new Set(culpritUrlArray);

if (isCulpritUrl()) {
  clearFeed();
}

function isCulpritUrl() {
  const curUrl = window.location.href.split(/[?#]/)[0];
  return culpritUrlSet.has(curUrl);
}

function clearFeed() {
  const target = [
    {
      attrType: 'data-pagelet',
      attrName: 'VideoChatHomeUnit',
      hidden: false
    }, {
      attrType: 'data-pagelet',
      attrName: 'Stories',
      hidden: false
    }, {
      attrType: 'role',
      attrName: 'feed',
      hidden: false
    }
  ]

  // document.body.style.visibility = 'hidden';
  const fb = document.body.firstChild;
  fb.style.visibility = 'hidden';
  const loader = document.createElement("P");                       
  const loaderText = document.createTextNode("Clearing your news feed...");      
  loader.appendChild(loaderText);
  loader.style.font = "32px cursive";
  loader.style.textAlign = "center";
  loader.style.marginTop = "72px";
  document.body.insertBefore(loader, fb);
  
  setTimeout(() => {
    loader.parentNode.removeChild(loader);
    target.forEach(attr => {
      const element = document.querySelector(`[${attr.attrType}="${attr.attrName}"]`);
      if (element) {
        element.parentNode.removeChild(element);
      }
    })
  
    // document.body.style.visibility = 'visible';
    fb.style.visibility = 'visible';
  }, 5000);
}

chrome.runtime.onMessage.addListener(request => {
  if (request.message === 'no feed please!') {
    if (isCulpritUrl()) {
      clearFeed();
    }
  }
});