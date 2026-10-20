/* FATMA Research Data — première version privée.
   Les données viennent de donnees/donnees.js (observations VÉRIFIÉES ou marquées, jamais inventées).
   Règles : une valeur absente reste vide avec sa raison (jamais 0) ; « vérifié automatiquement » n'est jamais présenté
   comme « vérifié par un humain » ; un retraitement est montré À CÔTÉ de la valeur d'origine. */
(function () {
  "use strict";
  var D = window.FATMA_DONNEES;
  var T = {
    en: {
      sousTitre: "Research database — pilot version",
      intro: "Choose companies, years and variables, check the preview, then download your dataset. Every figure comes from an official company document and shows its page.",
      etapeEntites: "Companies", rechercheEntite: "Search a company (name or ticker)…", aucuneEntite: "No company matches.",
      etapePerimetre: "Statements", consolide: "Consolidated (group)", individuel: "Standalone (company)",
      etapeAnnees: "Years", toutes: "All", cinqDernieres: "Last 5",
      etapeVariables: "Variables", toutChoisir: "Select all", rienChoisir: "Select none", choisies: "selected",
      etapeApercu: "Preview", entites: "company(ies)", annees: "year(s)", variables: "variable(s)", observations: "values",
      verifiees: "automatically verified", manquantes: "missing", aRelire: "to review",
      legendeVerifie: "Automatically verified (accounting checks)", legendeRelire: "To review", legendeRetraite: "Later restated by the company", legendeManquant: "Missing (reason given)",
      aideCellule: "Tap a value to see its document, page, original label and checks.",
      uniteNote: "Amounts in thousands of Tunisian dinars (TND), as in the published statements. Ratios in %.",
      rienAAfficher: "Choose at least one company, one year and one variable.",
      entreprise: "Company", annee: "Year",
      etapeTelecharger: "Download", telechargerExcel: "Excel (my selection)", telechargerCsv: "CSV long format (my selection)",
      aideTelechargement: "The Excel file has 4 sheets: panel (one row per company-year), long format with the quality of each value, codebook, and dataset version. Amounts are in dinars (not thousands).",
      jeuComplet: "Full dataset (Excel and Stata)", mesSelections: "My saved selections", nomSelection: "Selection name",
      enregistrer: "Save selection", enregistree: "Selection saved: ", ouvrir: "Open", supprimer: "Delete", aucuneSelection: "No selection saved on this device.",
      piedSources: "Sources: official documents published by the companies (financial statements, annual reports). The documents themselves are not distributed; each value links to the official page.",
      piedQualite: "“Automatically verified” means the value passed the accounting checks (totals, balance sheet equality, income statement chain, cash flows, consistency with the following year). It is not a human verification.",
      version: "Data version:", droits: "all rights reserved.",
      dValeur: "Value", dStatut: "Status", dLibelle: "Label in the document", dDocument: "Document", dPage: "Page", dOrigine: "Origin",
      dRetraite: "Restated value (following report)", dRaison: "Reason", dDefinition: "Definition", dFormule: "Formula",
      sVerifie: "automatically verified", sRelire: "to review", sAttente: "awaiting checks", sManquant: "missing", sHumain: "human verified",
      oAnnee: "financial statements of the year", oSuivant: "“previous year” column of the following year's report", oCalcul: "calculated from the values above",
      rLigne: "line not present in the published statement", rRapport: "document for the year not collected", rCalcul: "a value needed for the calculation is missing",
      avDevise: "All values are in Tunisian dinars (TND); no currency conversion is applied.",
      avReferentiel: "Framework: Tunisian GAAP (NCT). Compare with care to IFRS reporters.",
      avRetraite: "Some values were restated by the company the following year: the original value is kept, the restated value is shown next to it.",
      avRelire: "Some values are “to review”: they did not pass all automatic checks.",
      ouvrirDocument: "open the official page"
    }
  };
  var CLE_SEL = "fatma-research-selections";
  var langue = "en";      // site in English only (decision of Ahmed, 20/10/2026)
  function t(k) { return T.en[k] || k; }
  function lire(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function ecrire(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* stockage indisponible : sans conséquence */ } }
  function $(id) { return document.getElementById(id); }
  function el(tag, attrs, enfants) {
    var n = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (a) {
      if (a === "texte") n.textContent = attrs[a]; else if (a === "classe") n.className = attrs[a]; else n.setAttribute(a, attrs[a]);
    });
    (enfants || []).forEach(function (c) { if (c) n.appendChild(c); });
    return n;
  }

  // ----- index des données
  var C = {}; D.colonnes_observations.forEach(function (c, i) { C[c] = i; });
  var obs = {};
  D.observations.forEach(function (o) { obs[o[C.entite] + "|" + o[C.perimetre] + "|" + o[C.annee] + "|" + o[C.variable]] = o; });
  var vars = {}; D.variables.forEach(function (v) { vars[v.code] = v; });
  var sources = {}; D.sources.forEach(function (s) { sources[s.id] = s; });
  var toutesAnnees = Array.from(new Set(D.observations.map(function (o) { return o[C.annee]; }))).sort();
  var familles = []; D.variables.forEach(function (v) { if (familles.indexOf(v.famille) < 0) familles.push(v.famille); });
  var NOMS_FAMILLES = { en: { "Bilan": "Balance sheet", "Hors bilan": "Off-balance sheet", "Résultat": "Income statement", "Flux": "Cash flows", "Ratios": "Ratios" } };
  function nomFamille(f) { return (NOMS_FAMILLES[langue] || {})[f] || f; }

  // ----- état de la sélection
  var etat = {
    entites: D.entites.map(function (e) { return e.code; }),
    perimetre: "consolide",
    annees: toutesAnnees.slice(-5),
    variables: ["BS.TOTAL_ASSETS", "BS.LOANS_CUSTOMERS", "BS.DEPOSITS_CUSTOMERS", "BS.TOTAL_EQUITY", "IS.NET_BANKING_INCOME", "IS.NET_INCOME", "RATIO.ROA", "RATIO.ROE"],
    ouvertes: {}
  };

  // ----- textes fixes
  function traduire() {
    document.documentElement.lang = langue;
    document.querySelectorAll("[data-t]").forEach(function (n) { n.textContent = t(n.getAttribute("data-t")); });
    document.querySelectorAll("[data-t-placeholder]").forEach(function (n) { n.placeholder = t(n.getAttribute("data-t-placeholder")); });
    $("version").textContent = D.version;
    
  }

  // ----- 1. entreprises (recherche « au son », outil commun)
  var clesEntites = {};
  D.entites.forEach(function (e) { clesEntites[e.code] = sonRecherche.cle([e.sigle, e.nom.fr, e.nom.en, e.nom.ar, e.code].join(" ")); });
  function dessinerEntites() {
    var q = $("recherche").value, boite = $("liste-entites"); boite.textContent = "";
    var trouvees = D.entites.filter(function (e) { return sonRecherche.trouve(clesEntites[e.code], q); });
    trouvees.forEach(function (e) {
      var choisie = etat.entites.indexOf(e.code) >= 0;
      var case_ = el("input", { type: "checkbox", id: "e-" + e.code }); case_.checked = choisie;
      case_.addEventListener("change", function () {
        etat.entites = case_.checked ? etat.entites.concat([e.code]) : etat.entites.filter(function (x) { return x !== e.code; });
        dessinerEntites(); dessinerApercu();
      });
      var nom = langue === "en" ? e.nom.en : e.nom.fr;
      boite.appendChild(el("label", { classe: "carte-entite" + (choisie ? " choisie" : ""), "for": "e-" + e.code }, [case_,
        el("div", {}, [el("div", { classe: "titre", texte: e.sigle + " — " + nom }),
          el("div", { classe: "infos", texte: [e.nom.ar, e.pays, e.devise, e.referentiel].join(" · ") })])]));
    });
    $("aucune-entite").hidden = trouvees.length > 0;
  }

  // ----- 2. comptes
  function dessinerPerimetres() {
    var boite = $("perimetres"); boite.textContent = "";
    ["consolide", "individuel"].forEach(function (p) {
      var b = el("button", { type: "button", classe: "puce", role: "radio", "aria-checked": String(etat.perimetre === p), texte: t(p) });
      b.addEventListener("click", function () { etat.perimetre = p; dessinerPerimetres(); dessinerApercu(); });
      boite.appendChild(b);
    });
  }

  // ----- 3. années
  function dessinerAnnees() {
    var boite = $("annees"); boite.textContent = "";
    toutesAnnees.forEach(function (a) {
      var b = el("button", { type: "button", classe: "puce", "aria-pressed": String(etat.annees.indexOf(a) >= 0), texte: String(a) });
      b.addEventListener("click", function () {
        etat.annees = etat.annees.indexOf(a) >= 0 ? etat.annees.filter(function (x) { return x !== a; }) : etat.annees.concat([a]).sort();
        dessinerAnnees(); dessinerApercu();
      });
      boite.appendChild(b);
    });
  }

  // ----- 4. variables, par famille, repliables
  function dessinerVariables() {
    var boite = $("familles"); boite.textContent = "";
    familles.forEach(function (f) {
      var liste = D.variables.filter(function (v) { return v.famille === f; });
      var n = liste.filter(function (v) { return etat.variables.indexOf(v.code) >= 0; }).length;
      var ouverte = !!etat.ouvertes[f];
      var tete = el("button", { type: "button", classe: "famille-tete", "aria-expanded": String(ouverte) }, [
        el("span", {}, [el("span", { texte: nomFamille(f) + " " }), el("span", { classe: "compte", texte: "(" + n + "/" + liste.length + " " + t("choisies") + ")" })]),
        el("span", { classe: "signe", "aria-hidden": "true", texte: ouverte ? "−" : "+" })]);
      tete.addEventListener("click", function () { etat.ouvertes[f] = !ouverte; dessinerVariables(); });
      var corps = el("div", { classe: "famille-corps" }); corps.hidden = !ouverte;
      var tous = el("div", { classe: "actions-petites tout-choisir" }, [
        bouton(t("toutChoisir"), function () { liste.forEach(function (v) { if (etat.variables.indexOf(v.code) < 0) etat.variables.push(v.code); }); dessinerVariables(); dessinerApercu(); }),
        bouton(t("rienChoisir"), function () { etat.variables = etat.variables.filter(function (c) { return vars[c].famille !== f; }); dessinerVariables(); dessinerApercu(); })]);
      corps.appendChild(tous);
      liste.forEach(function (v) {
        var id = "v-" + v.code.replace(/\./g, "-");
        var c = el("input", { type: "checkbox", id: id }); c.checked = etat.variables.indexOf(v.code) >= 0;
        c.addEventListener("change", function () {
          etat.variables = c.checked ? etat.variables.concat([v.code]) : etat.variables.filter(function (x) { return x !== v.code; });
          dessinerVariables(); dessinerApercu();
        });
        corps.appendChild(el("div", { classe: "variable" }, [c, el("label", { "for": id }, [
          el("span", { texte: (langue === "en" ? v.libelle_en : v.libelle_fr) + " " }), el("span", { classe: "code", translate: "no", texte: v.code }),
          el("div", { classe: "definition", texte: langue === "en" ? v.definition_en : v.definition_fr })])]));
      });
      boite.appendChild(el("div", { classe: "famille" }, [tete, corps]));
    });
  }
  function bouton(texte, action) { var b = el("button", { type: "button", classe: "lien", texte: texte }); b.addEventListener("click", action); return b; }

  // ----- 5. aperçu
  var ESP = " ";   // espace fine insécable entre les milliers (règle commune § 30)
  function format(v, variable) {
    if (v === null || v === undefined) return "—";
    if (vars[variable].unite === "ratio") return (v * 100).toFixed(2).replace(".", langue === "fr" ? "," : ".") + ESP + "%";
    var k = Math.round(v / 1000), s = Math.abs(k).toString().replace(/\B(?=(\d{3})+(?!\d))/g, langue === "fr" ? ESP : ",");
    return (k < 0 ? "−" : "") + s;
  }
  function classeStatut(o) {
    if (!o || o[C.statut] === "manquant") return "manque";
    if (o[C.statut] === "verifie_auto" || o[C.statut] === "verifie_humain") return "ok" + (o[C.valeur_retraitee] !== null ? " retraite" : "");
    return "relire" + (o[C.valeur_retraitee] !== null ? " retraite" : "");
  }
  function lignesSelection() {
    var lignes = [];
    etat.entites.forEach(function (e) { etat.annees.forEach(function (a) { lignes.push([e, a]); }); });
    return lignes;
  }
  function variablesChoisies() { return D.variables.map(function (v) { return v.code; }).filter(function (c) { return etat.variables.indexOf(c) >= 0; }); }
  function dessinerApercu() {
    var lignes = lignesSelection(), cols = variablesChoisies();
    var n = 0, ok = 0, manque = 0, relire = 0, retraite = 0;
    lignes.forEach(function (l) { cols.forEach(function (c) {
      var o = obs[l[0] + "|" + etat.perimetre + "|" + l[1] + "|" + c]; n++;
      if (!o || o[C.statut] === "manquant") manque++; else if (o[C.statut] === "verifie_auto") ok++; else relire++;
      if (o && o[C.valeur_retraitee] !== null) retraite++;
    }); });
    var r = $("resume"); r.textContent = "";
    [[etat.entites.length, t("entites")], [etat.annees.length, t("annees")], [cols.length, t("variables")], [n, t("observations")],
     [ok, t("verifiees")], [relire, t("aRelire")], [manque, t("manquantes")]].forEach(function (x) {
      r.appendChild(el("div", { classe: "tuile" }, [el("div", { classe: "chiffre", texte: String(x[0]) }), el("div", { classe: "quoi", texte: x[1] })]));
    });
    var av = $("avertissements"); av.textContent = "";
    if (n) { av.appendChild(el("p", { classe: "alerte", texte: t("avDevise") })); av.appendChild(el("p", { classe: "alerte", texte: t("avReferentiel") })); }
    if (retraite) av.appendChild(el("p", { classe: "alerte", texte: t("avRetraite") }));
    if (relire) av.appendChild(el("p", { classe: "alerte", texte: t("avRelire") }));
    var tab = $("tableau"); tab.textContent = "";
    $("unite-note").textContent = n ? t("uniteNote") : t("rienAAfficher");
    if (!n) return;
    var tr = el("tr", {}, [el("th", { classe: "fixe", texte: t("entreprise") + " · " + t("annee") })]);
    cols.forEach(function (c) { tr.appendChild(el("th", {}, [el("span", { texte: langue === "en" ? vars[c].libelle_en : vars[c].libelle_fr }), el("span", { classe: "code", translate: "no", texte: c })])); });
    tab.appendChild(el("thead", {}, [tr]));
    var corps = el("tbody");
    lignes.forEach(function (l) {
      var e = D.entites.filter(function (x) { return x.code === l[0]; })[0];
      var ligne = el("tr", {}, [el("td", { classe: "fixe", texte: e.sigle + " · " + l[1] })]);
      cols.forEach(function (c) {
        var o = obs[l[0] + "|" + etat.perimetre + "|" + l[1] + "|" + c];
        var td = el("td", { classe: "valeur " + classeStatut(o), tabindex: "0", texte: format(o ? o[C.valeur] : null, c) });
        td.addEventListener("click", function () { montrerDetail(e, l[1], c, o); });
        td.addEventListener("keydown", function (ev) { if (ev.key === "Enter") montrerDetail(e, l[1], c, o); });
        ligne.appendChild(td);
      });
      corps.appendChild(ligne);
    });
    tab.appendChild(corps);
  }

  // ----- fenêtre de détail d'une valeur (provenance)
  function nomStatut(s) { return { verifie_auto: t("sVerifie"), verifie_humain: t("sHumain"), a_relire: t("sRelire"), en_attente: t("sAttente"), manquant: t("sManquant") }[s] || s; }
  function nomOrigine(o) { return { rapport_de_l_annee: t("oAnnee"), colonne_comparative_du_rapport_suivant: t("oSuivant"), calcul: t("oCalcul") }[o] || o; }
  function nomRaison(r) { if (!r) return ""; if (r.indexOf("donnee_de_calcul_absente") === 0) return t("rCalcul") + " (" + r.split(":")[1].trim() + ")"; return { ligne_absente_de_l_etat_publie: t("rLigne"), rapport_non_collecte: t("rRapport") }[r] || r; }
  function montrerDetail(e, annee, c, o) {
    var v = vars[c];
    $("detail-titre").textContent = e.sigle + " · " + annee + " · " + (langue === "en" ? v.libelle_en : v.libelle_fr);
    var dl = $("detail-contenu"); dl.textContent = "";
    function ajouter(k, valeur, lien) {
      if (valeur === null || valeur === undefined || valeur === "") return;
      var dd = el("dd");
      if (lien) dd.appendChild(el("a", { href: lien, target: "_blank", rel: "noopener noreferrer", texte: valeur }));
      else dd.textContent = valeur;
      dl.appendChild(el("dt", { texte: t(k) })); dl.appendChild(dd);
    }
    ajouter("dValeur", o && o[C.valeur] !== null ? format(o[C.valeur], c) + (v.unite === "ratio" ? "" : " (" + (langue === "en" ? "TND thousands" : "milliers de TND") + ")") : "—");
    ajouter("dStatut", nomStatut(o ? o[C.statut] : "manquant"));
    if (o && o[C.raison_manquant]) ajouter("dRaison", nomRaison(o[C.raison_manquant]));
    if (o && o[C.libelle_origine]) ajouter("dLibelle", o[C.libelle_origine]);
    if (o && o[C.origine]) ajouter("dOrigine", nomOrigine(o[C.origine]));
    var s = o && sources[o[C.id_source]];
    if (s) { ajouter("dDocument", s.titre + " — " + t("ouvrirDocument"), s.url); ajouter("dPage", o[C.page]); }
    if (o && o[C.valeur_retraitee] !== null) {
      var s2 = sources[o[C.id_source_retraitement]];
      ajouter("dRetraite", format(o[C.valeur_retraitee], c) + (s2 ? " — " + s2.titre : ""), s2 ? s2.url : null);
    }
    if (v.formule) ajouter("dFormule", v.formule);
    ajouter("dDefinition", langue === "en" ? v.definition_en : v.definition_fr);
    $("detail").hidden = false; $("detail-fermer").focus();
  }
  function fermerDetail() { $("detail").hidden = true; }
  $("detail-fermer").addEventListener("click", fermerDetail);
  $("detail").addEventListener("click", function (ev) { if (ev.target === $("detail")) fermerDetail(); });
  document.addEventListener("keydown", function (ev) { if (ev.key === "Escape") fermerDetail(); });

  // ----- 6. téléchargements (fabriqués dans le navigateur : rien n'est envoyé ailleurs)
  function tableLongue() {
    var lignes = [["entity", "scope", "year", "variable", "value", "unit", "status", "missing_reason", "origin", "source_id", "page", "label_as_reported", "restated_value", "source_url"]];
    lignesSelection().forEach(function (l) { variablesChoisies().forEach(function (c) {
      var o = obs[l[0] + "|" + etat.perimetre + "|" + l[1] + "|" + c], s = o && sources[o[C.id_source]];
      lignes.push([l[0], etat.perimetre, l[1], c, o ? o[C.valeur] : null, vars[c].unite === "ratio" ? "ratio" : "TND",
        o ? o[C.statut] : "manquant", o ? o[C.raison_manquant] : "rapport_non_collecte", o ? o[C.origine] : "", o ? o[C.id_source] : "",
        o ? o[C.page] : "", o ? o[C.libelle_origine] : "", o ? o[C.valeur_retraitee] : null, s ? s.url : ""]);
    }); });
    return lignes;
  }
  function nomFichier(ext) { return "fatma_selection_" + etat.perimetre + "_" + D.version + "." + ext; }
  $("dl-excel").addEventListener("click", function () {
    var cols = variablesChoisies(), wb = XLSX.utils.book_new();
    var large = [["entity", "year"].concat(cols)];
    lignesSelection().forEach(function (l) { large.push([l[0], l[1]].concat(cols.map(function (c) { var o = obs[l[0] + "|" + etat.perimetre + "|" + l[1] + "|" + c]; return o ? o[C.valeur] : null; }))); });
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(large), "panel_wide");
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(tableLongue()), "long_with_quality");
    var dico = [["code", "label_en", "label_fr", "unit", "type", "formula", "definition_en", "definition_fr", "version"]];
    cols.forEach(function (c) { var v = vars[c]; dico.push([c, v.libelle_en, v.libelle_fr, v.unite === "ratio" ? "ratio" : "TND", v.type, v.formule, v.definition_en, v.definition_fr, v.version]); });
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(dico), "codebook");
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([["dataset_version", D.version], ["scope", etat.perimetre], ["entities", etat.entites.join(" ")], ["years", etat.annees.join(" ")],
      ["downloaded", new Date().toISOString().slice(0, 10)], ["units", "TND (not thousands); ratios as decimals"], ["missing", "empty cell = missing (never 0); see long_with_quality.missing_reason"],
      ["status", "verifie_auto = passed automatic accounting checks; not human-verified"]]), "about");
    XLSX.writeFile(wb, nomFichier("xlsx"));
  });
  $("dl-csv").addEventListener("click", function () {
    var csv = tableLongue().map(function (l) { return l.map(function (x) { x = x === null || x === undefined ? "" : String(x); return /[",\n]/.test(x) ? '"' + x.replace(/"/g, '""') + '"' : x; }).join(","); }).join("\n") + "\n";
    var a = el("a", { href: URL.createObjectURL(new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" })), download: nomFichier("csv") });
    document.body.appendChild(a); a.click(); a.remove();
  });
  function dessinerJeux() {
    var ul = $("jeux-complets"); ul.textContent = "";
    D.telechargements.forEach(function (f) { ul.appendChild(el("li", {}, [el("a", { href: "telechargements/" + f, download: f, texte: f })])); });
  }

  // ----- sélections enregistrées (sur cet appareil ; dans le compte quand le site sera en ligne)
  function selections() { try { return JSON.parse(lire(CLE_SEL) || "[]"); } catch (e) { return []; } }
  function dessinerSelections() {
    var ul = $("selections"), liste = selections(); ul.textContent = "";
    if (!liste.length) { ul.appendChild(el("li", { classe: "vide", texte: t("aucuneSelection") })); return; }
    liste.forEach(function (s, i) {
      ul.appendChild(el("li", {}, [el("span", { texte: s.nom + " (" + s.annees.join(", ") + ") " }),
        bouton(t("ouvrir"), function () { etat.entites = s.entites; etat.perimetre = s.perimetre; etat.annees = s.annees; etat.variables = s.variables; tout(); }),
        el("span", { texte: " · " }),
        bouton(t("supprimer"), function () { var l = selections(); l.splice(i, 1); ecrire(CLE_SEL, JSON.stringify(l)); dessinerSelections(); })]));
    });
  }
  $("enregistrer").addEventListener("click", function () {
    var nom = $("nom-selection").value.trim() || (etat.perimetre + " " + etat.annees[0] + "-" + etat.annees[etat.annees.length - 1]);
    var l = selections(); l.unshift({ nom: nom, entites: etat.entites, perimetre: etat.perimetre, annees: etat.annees, variables: etat.variables, version: D.version });
    ecrire(CLE_SEL, JSON.stringify(l.slice(0, 30)));
    $("confirmation").textContent = t("enregistree") + nom; $("confirmation").hidden = false;
    $("nom-selection").value = ""; dessinerSelections();
  });

  // ----- mise en route
  $("recherche").addEventListener("input", dessinerEntites);
  $("annees-toutes").addEventListener("click", function () { etat.annees = toutesAnnees.slice(); dessinerAnnees(); dessinerApercu(); });
  $("annees-5").addEventListener("click", function () { etat.annees = toutesAnnees.slice(-5); dessinerAnnees(); dessinerApercu(); });
  function tout() { traduire(); dessinerEntites(); dessinerPerimetres(); dessinerAnnees(); dessinerVariables(); dessinerApercu(); dessinerJeux(); dessinerSelections(); }
  tout();
})();
