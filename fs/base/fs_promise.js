const fs = require("fs");

/* Séquence d'actions :
- Lire "file1.txt" avec contenu X
- Créer un fichier dont le nom est X et le contenu un chiffre aléatoire
- Lire le 2e fichier et afficher le contenu dans la console
- Supprimer le 2e fichier
*/
async function read_write_read() {
  try {
    const newFileName = await fs.promises.readFile("file1.txt");
    await fs.promises.writeFile(newFileName, `${Math.random() * 10 + 1}`);
    const data = await fs.promises.readFile(newFileName);
    console.log(data.toString());
    await fs.promises.unlink(newFileName);
    console.group(`${newFileName} supprimé`);
  }
  catch (e) {
    console.log('Fichier introuvable');
  }
}

read_write_read();
