window.addEventListener('load', start);

function start() {
  var cor = document.querySelectorAll('.range');
  function mudaCor() {
    var caixa = document.querySelector('.caixa'),
      nums = document.querySelectorAll('.num_show');
    for (var i = 0; i < 3; i++) {
      nums[i].value = cor[i].value;
    }
    caixa.style.backgroundColor =
      'rgb(' + cor[0].value + ',' + cor[1].value + ',' + cor[2].value + ')';
  }
  for (var i = 0; i < 3; i++) {
    cor[i].addEventListener('change', mudaCor);
  }
}
