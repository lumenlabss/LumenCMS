import app from "./app";

const port = 3050; // ou tout autre port de ton choix

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
