const fs = require('fs');
const path = require('path');

function registrarEvento(estado) {
  const data = {
    auth_result: estado,
    timestamp: new Date().toISOString()
  };
  // Usamos path.join para que no se pierda buscando el archivo
  const ruta = path.join(__dirname, '../auth/auth.json');
  fs.writeFileSync(ruta, JSON.stringify(data));
  console.log("Evento registrado en: " + ruta);
}

registrarEvento("TEST_DE_FUNCIONAMIENTO");
