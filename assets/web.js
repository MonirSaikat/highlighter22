$('#theme-toggler').on('click', function () {
  if (!localStorage.getItem('theme22')) {
    localStorage.setItem('theme22', 'light');
  }

  const theme = getTheme() == 'light' ? 'dark' : 'light';
  localStorage.setItem('theme22', theme);
  $('html').attr('data-theme', theme);
});

function getTheme() {
  return localStorage.getItem('theme22');
}

$(document).ready(function () {
  const theme = getTheme();
  $('html').attr('data-theme', theme);
});