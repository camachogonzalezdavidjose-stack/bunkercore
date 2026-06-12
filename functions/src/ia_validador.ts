import { generate } from '@genkit-ai/ai';
import * as fs from 'fs';

export async function validarAccesoConIA() {
  const authData = JSON.parse(fs.readFileSync('../auth/auth.json', 'utf8'));
  
  const response = await generate({
    prompt: `El sistema de seguridad reporta: ${JSON.stringify(authData)}. ¿Es seguro otorgar acceso? Responde solo 'PERMITIR' o 'DENEGAR'.`,
  });

  return response.text();
}
