const http = require('http');
const fs = require('fs');

// 1. Esto es lo que verá el usuario en su navegador
const html = `
  <html>
    <body>
      <h1>Bunkercore</h1>
      <button onclick="verificar()">Poner Huella</button>
      <p id="status"></p>
      <script>
        function verificar() {
          document.getElementById('status').innerText = 'Verificando...';
          fetch('/acceso', { method: 'POST' })
            .then(res => res.json())
            .then(data => {
              document.getElementById('status').innerText = data.mensaje;
            });
        }
      </script>
    </body>
  </html>
`;

// 2. Este es tu servidor que hace todo
const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  } else if (req.url === '/acceso' && req.method === 'POST') {
    // Aquí es donde ocurre la "magia" de tu seguridad
    const resultado = "ACCESO_PERMITIDO"; 
    fs.writeFileSync('./auth.json', JSON.stringify({ resultado }));
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ mensaje: "¡Bienvenido al Búnker!" }));
  }
});

server.listen(3000, () => console.log('App lista en http://localhost:3000'));
