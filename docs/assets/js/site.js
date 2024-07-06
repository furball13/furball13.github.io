window.addEventListener('load', function() {
  const navButton = document.getElementById('navToggle');
  const navBlock = document.querySelector('nav');

  if (navButton.clientWidth > 0) {
    navBlock.classList.add('hidden');
  }

  navButton.addEventListener('click', function() {
    navBlock.classList.toggle('hidden');
  });
});
