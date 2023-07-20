const fs = require("fs");

/* Séquence d'actions :
- Lire "file1.txt" avec contenu X
- Créer un fichier dont le nom est X et le contenu un chiffre aléatoire
- Lire le 2e fichier et afficher le contenu dans la console
- Supprimer le 2e fichier
*/
function readMultipleFiles() {
  fs.readFile("file1.txt", (err, data) => {
    if (err) { return console.log('Fichier introuvable'); }
    const newFileName = data.toString();
    fs.writeFile(newFileName, `${Math.random() * 10 + 1}`, (err) => {
      fs.readFile(newFileName, (err, dataFile2) => {
        console.log(dataFile2.toString());
        fs.unlink(newFileName, (err) => {
          console.group(`${newFileName} supprimé`);
        });
      });
    });
  });
}

readMultipleFiles();
