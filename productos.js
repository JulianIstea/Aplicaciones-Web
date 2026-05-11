// 1) Array de 6 productos como objetos
const productosList = [
    { id: 1, nombre: 'Heladora Expositora Vertical', precio: 870000, stock: 5 },
    { id: 2, nombre: 'Heladera de Mostrador', precio: 1000000, stock: 0 },
    { id: 3, nombre: 'Freezer Industrial', precio: 8900000, stock: 2 },
    { id: 4, nombre: 'Vitrina Refrigerada', precio: 3700000, stock: 0 },
    { id: 5, nombre: 'Camara de Frio', precio: 12500000, stock: 1 },
    { id: 6, nombre: 'Enfriador de Botellas', precio: 650000, stock: 8 }
];

// 2) Recorrer y separar disponibles / agotados con if/else
const disponibles = [];
const agotados = [];

productosList.forEach(function(p) {
    if (p.stock > 0) {
        disponibles.push(p);
    } else {
        agotados.push(p);
    }
});

console.log('--- Productos disponibles ---');
disponibles.forEach(function(p) { console.log(p.nombre + ' | Stock: ' + p.stock); });

console.log('--- Productos agotados ---');
agotados.forEach(function(p) { console.log(p.nombre); });

// 3) Nombres precio > 8.000.000, en mayusculas. Una linea con filter + map encadenados
const caros = productosList.filter(function(p) { return p.precio > 8000000; }).map(function(p) { return p.nombre.toUpperCase(); });
console.log('--- Productos caros (> $8.000.000) ---', caros);

// 4) Suma de precio * stock con reduce, luego loguear con IVA (21%)
const totalSinIVA = productosList.reduce(function(acum, p) { return acum + (p.precio * p.stock); }, 0);
const conIVA = totalSinIVA * 1.21;
console.log('Total sin IVA: $' + totalSinIVA);
console.log('Total con IVA (21%): $' + conIVA);
