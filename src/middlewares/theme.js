const express = require("express");
const path = require("path");
const fs = require("fs");

function applyTheme(app) {
  // Vérifier si le fichier de configuration existe
  const configPath = path.join(__dirname, "../../config/config.json");
  let config = { theme: "default" };

  try {
    if (fs.existsSync(configPath)) {
      config = require(configPath);
    } else {
      console.warn(
        "Fichier config.json introuvable, utilisation du thème par défaut"
      );
    }
  } catch (error) {
    console.error("Erreur lors du chargement de la configuration:", error);
  }

  const theme = config.theme || "default";

  // Vérifier si le répertoire du thème existe
  const themePath = path.join(__dirname, "../../views/theme", theme);
  if (!fs.existsSync(themePath)) {
    console.error(`Le répertoire du thème ${theme} n'existe pas: ${themePath}`);
    // Utiliser le thème par défaut si le thème configuré n'existe pas
    const defaultThemePath = path.join(__dirname, "../../views/theme/default");
    if (fs.existsSync(defaultThemePath)) {
      console.info("Utilisation du thème par défaut à la place");
      app.set("views", defaultThemePath);
    } else {
      console.error("Le thème par défaut n'existe pas non plus!");
    }
  } else {
    app.set("views", themePath);
  }

  app.set("view engine", "ejs");

  // Servir les fichiers statiques du thème sous le bon chemin
  const publicPath = path.join(__dirname, "../../public", theme);

  // Solution 1: Servir les fichiers spécifiquement sous /larium
  if (theme === "larium") {
    app.use("/larium", express.static(publicPath));
  }

  // Solution 2: Servir les fichiers sous les deux chemins pour compatibilité
  app.use("/public", express.static(publicPath));
  app.use(`/${theme}`, express.static(publicPath));

  console.log(
    `Thème appliqué: ${theme}, fichiers statiques disponibles sous /public et /${theme}`
  );
}

module.exports = applyTheme;
