
fetch('https://jsonplaceholder.typicode.com/users')
    .then(function (response) {
        return response.json();
    })
    .then(function (users) {
        console.log('--- Emails con .then() ---');
        users.forEach(function (user) {
            console.log(user.email);
        });
        document.getElementById('fetchStatus').textContent =
            'Se cargaron ' + users.length + ' usuarios correctamente.';
    })
    .catch(function (error) {
        console.error('Error con .then():', error);
        document.getElementById('fetchStatus').textContent =
            'Error al cargar usuarios: ' + error.message;
    });


async function cargarUsuarios() {
    try {
        var response = await fetch('https://jsonplaceholder.typicode.com/users');

        if (!response.ok) {
            throw new Error('Error HTTP: ' + response.status);
        }

        var users = await response.json();
        var lista = document.getElementById('usersDOM');

        users.forEach(function (user) {
            var li = document.createElement('li');
            li.textContent = user.name + ' — ' + user.email;
            li.style.padding = '8px 0';
            li.style.borderBottom = '1px solid #dee2e6';
            lista.appendChild(li);
        });

        console.log('--- Usuarios con async/await ---');
        console.log(users);

    } catch (error) {
        console.error('Error con async/await:', error);
        document.getElementById('usersDOM').innerHTML =
            '<li style="color:red;">Error: ' + error.message + '</li>';
    }
}

cargarUsuarios();


document.getElementById('btnPost').addEventListener('click', async function () {
    var resultDiv = document.getElementById('postResult');
    resultDiv.textContent = 'Enviando post...';

    try {
        var response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: 'Nuevo producto ColdMax',
                body: 'Heladera Expositora Vertical de 400 litros, ideal para negocios.',
                userId: 1
            })
        });

        if (!response.ok) {
            throw new Error('Error HTTP: ' + response.status);
        }

        var data = await response.json();
        console.log('--- POST exitoso ---', data);

        resultDiv.innerHTML =
            '<p style="color:#198754; font-weight:600;">Post creado con exito!</p>' +
            '<p><strong>ID:</strong> ' + data.id + '</p>' +
            '<p><strong>Titulo:</strong> ' + data.title + '</p>' +
            '<p><strong>Body:</strong> ' + data.body + '</p>' +
            '<p><strong>UserId:</strong> ' + data.userId + '</p>';

    } catch (error) {
        console.error('Error en POST:', error);
        resultDiv.innerHTML =
            '<p style="color:red;">Error: ' + error.message + '</p>';
    }
});


document.getElementById('btnError').addEventListener('click', async function () {
    var resultDiv = document.getElementById('errorResult');
    resultDiv.textContent = 'Intentando acceder a URL inexistente...';

    try {
        var response = await fetch('https://jsonplaceholder.typicode.com/esta-url-no-existe');

        if (!response.ok) {
            throw new Error('Error ' + response.status + ': Recurso no encontrado');
        }

        var data = await response.json();
        resultDiv.textContent = 'Esto no se deberia mostrar.';

    } catch (error) {
        console.error('Error capturado:', error);
        resultDiv.innerHTML =
            '<p style="color:#DC3545; font-weight:600;">' + error.message + '</p>' +
            '<p style="color:#6c757d;">La URL no existe en la API. El error fue capturado correctamente con try/catch.</p>';
    }
});
