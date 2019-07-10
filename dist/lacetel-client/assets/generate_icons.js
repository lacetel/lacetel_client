var icons = require('./lala');

var result = [
  '<div class="container">',
  '<table>',
  '<tr>',
];

//console.log(icons[0], icons[1]);

var cant = 4;

for (let i = 0, maxi = icons.length; i < maxi; i += 1) {
  result.push(`<td>${icons[i]}</td><td><mat-icon svgIcon="${icons[i]}"></mat-icon></td>`);

  if ( i > 0 && i % cant === 0 ) {
    result.push('</tr><tr>');
  }
}

result.push('</tr></table></div>');

require('fs').writeFileSync('salida.html', result.join(''));