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
      uniteNote: "Amounts in thousands of each company's own reporting currency (shown next to the company), as in the published statements. Ratios in %.",
      rienAAfficher: "Choose at least one company, one year and one variable.",
      entreprise: "Company", annee: "Year",
      etapeTelecharger: "Download", telechargerExcel: "Excel (my selection)", telechargerCsv: "CSV long format (my selection)",
      aideTelechargement: "The Excel file has 4 sheets: panel (one row per company-year), long format with the quality of each value, codebook, and dataset version. Amounts are in units of each company's reporting currency (not thousands); the currency is given on every row.",
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
      avDevise: "Values are in each company's own reporting currency ({x}); no currency conversion is applied.",
      avReferentiel: "Accounting frameworks in this selection: {x}. Compare with care across frameworks.",
      tousPays: "All countries",
      etapeRegistre: "World register of Islamic banks",
      aideRegistre: "Every Islamic bank found on the official lists of central banks and regulators, with the progress of the collection. Banks with figures appear in step 1.",
      rechercheRegistre: "Search the register (bank, country, regulator)…",
      rBanques: "Islamic banks registered", rPays: "countries", rCollectees: "with documents collected", rDonnees: "with figures in the database",
      rListe: "official list", rCotee: "listed", rNonCotee: "not listed", rFenetre: "Islamic window", rFiliale: "Islamic subsidiary",
      rStatutDonnees: "figures available", rStatutDocs: "documents collected, extraction pending", rStatutAttente: "documents not yet collected",
      rStatutSanctions: "collection deferred (sanctions check)", rAnnees: "years",
      rNA: "not applicable to this type of company",
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
  // default selection: the companies with the most verified values (at most 6, so the preview stays readable)
  var nbVerifiees = {};
  D.observations.forEach(function (o) { if (o[C.statut] === "verifie_auto") nbVerifiees[o[C.entite]] = (nbVerifiees[o[C.entite]] || 0) + 1; });
  var parDefaut = D.entites.map(function (e) { return e.code; }).sort(function (a, b) { return (nbVerifiees[b] || 0) - (nbVerifiees[a] || 0) || (a < b ? -1 : 1); }).slice(0, 6);
  var entitesParCode = {}; D.entites.forEach(function (e) { entitesParCode[e.code] = e; });
  var etat = {
    entites: parDefaut,
    perimetre: "consolide",
    annees: toutesAnnees.slice(-5),
    variables: ["BS.TOTAL_ASSETS", "BS.LOANS_CUSTOMERS", "BS.FINANCING_CUSTOMERS", "BS.DEPOSITS_CUSTOMERS", "BS.TOTAL_EQUITY", "IS.NET_INCOME", "RATIO.ROA", "RATIO.ROE"],
    pays: [],
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
    var trouvees = D.entites.filter(function (e) { return sonRecherche.trouve(clesEntites[e.code], q) && (!etat.pays.length || etat.pays.indexOf(e.pays) >= 0); });
    trouvees.forEach(function (e) {
      var choisie = etat.entites.indexOf(e.code) >= 0;
      var case_ = el("input", { type: "checkbox", id: "e-" + e.code }); case_.checked = choisie;
      case_.addEventListener("change", function () {
        etat.entites = case_.checked ? etat.entites.concat([e.code]) : etat.entites.filter(function (x) { return x !== e.code; });
        dessinerEntites(); dessinerApercu();
      });
      var nom = e.nom.en || e.nom.fr;
      boite.appendChild(el("label", { classe: "carte-entite" + (choisie ? " choisie" : ""), "for": "e-" + e.code }, [case_,
        el("div", {}, [el("div", { classe: "titre", texte: e.sigle + " — " + nom }),
          el("div", { classe: "infos", texte: [e.nom.ar, nomPays(e.pays), e.devise, e.referentiel].filter(Boolean).join(" · ") })])]));
    });
    $("aucune-entite").hidden = trouvees.length > 0;
  }

  // country filter (chips): only the countries that have companies with figures
  var NOMS_PAYS = { AE: "United Arab Emirates", BH: "Bahrain", BD: "Bangladesh", BN: "Brunei", DZ: "Algeria", EG: "Egypt", GB: "United Kingdom",
    ID: "Indonesia", IQ: "Iraq", JO: "Jordan", KE: "Kenya", KW: "Kuwait", LB: "Lebanon", MA: "Morocco", MY: "Malaysia", NG: "Nigeria", OM: "Oman",
    PK: "Pakistan", PS: "Palestine", QA: "Qatar", SA: "Saudi Arabia", SD: "Sudan", TN: "Tunisia", TR: "Türkiye", YE: "Yemen", IR: "Iran",
    SY: "Syria", DE: "Germany", MV: "Maldives", LK: "Sri Lanka", AF: "Afghanistan", TH: "Thailand", PH: "Philippines", SG: "Singapore",
    LY: "Libya", MR: "Mauritania", DJ: "Djibouti", SN: "Senegal", NE: "Niger", GM: "Gambia", KZ: "Kazakhstan", KG: "Kyrgyzstan",
    AZ: "Azerbaijan", BA: "Bosnia and Herzegovina", TZ: "Tanzania", ET: "Ethiopia", SO: "Somalia", UG: "Uganda", GH: "Ghana", ZA: "South Africa",
    LU: "Luxembourg", FR: "France", TJ: "Tajikistan", UZ: "Uzbekistan", MU: "Mauritius", CM: "Cameroon", ML: "Mali", BF: "Burkina Faso",
    GN: "Guinea", CI: "Côte d'Ivoire", TG: "Togo", BJ: "Benin", SL: "Sierra Leone", LR: "Liberia", KM: "Comoros", RU: "Russia", US: "United States", CA: "Canada", AU: "Australia" };
  function nomPays(c) { return NOMS_PAYS[c] || c; }
  function dessinerPays() {
    var boite = $("pays"); boite.textContent = "";
    var liste = Array.from(new Set(D.entites.map(function (e) { return e.pays; }))).sort(function (a, b) { return nomPays(a) < nomPays(b) ? -1 : 1; });
    if (liste.length < 2) { boite.hidden = true; return; }
    var tous = el("button", { type: "button", classe: "puce", "aria-pressed": String(!etat.pays.length), texte: t("tousPays") });
    tous.addEventListener("click", function () { etat.pays = []; dessinerPays(); dessinerEntites(); });
    boite.appendChild(tous);
    liste.forEach(function (c) {
      var n = D.entites.filter(function (e) { return e.pays === c; }).length;
      var b = el("button", { type: "button", classe: "puce", "aria-pressed": String(etat.pays.indexOf(c) >= 0), texte: nomPays(c) + " (" + n + ")" });
      b.addEventListener("click", function () {
        etat.pays = etat.pays.indexOf(c) >= 0 ? etat.pays.filter(function (x) { return x !== c; }) : etat.pays.concat([c]);
        dessinerPays(); dessinerEntites();
      });
      boite.appendChild(b);
    });
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
    if (n) {
      var choisies = etat.entites.map(function (c) { return entitesParCode[c]; }).filter(Boolean);
      var devises = Array.from(new Set(choisies.map(function (e) { return e.devise; }))).sort();
      var refs = Array.from(new Set(choisies.map(function (e) { return e.referentiel || "not stated"; }))).sort();
      av.appendChild(el("p", { classe: "alerte", texte: t("avDevise").replace("{x}", devises.join(", ")) }));
      av.appendChild(el("p", { classe: "alerte", texte: t("avReferentiel").replace("{x}", refs.join("; ")) }));
    }
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
      var ligne = el("tr", {}, [el("td", { classe: "fixe", texte: e.sigle + " · " + l[1] + " · " + e.devise })]);
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
  function nomRaison(r) { if (!r) return ""; if (r.indexOf("donnee_de_calcul_absente") === 0) return t("rCalcul") + " (" + r.split(":")[1].trim() + ")"; return { ligne_absente_de_l_etat_publie: t("rLigne"), rapport_non_collecte: t("rRapport"), non_applicable: t("rNA") }[r] || r; }
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
    ajouter("dValeur", o && o[C.valeur] !== null ? format(o[C.valeur], c) + (v.unite === "ratio" ? "" : " (" + e.devise + " thousands)") : "—");
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
      lignes.push([l[0], etat.perimetre, l[1], c, o ? o[C.valeur] : null, vars[c].unite === "ratio" ? "ratio" : (entitesParCode[l[0]] || {}).devise,
        o ? o[C.statut] : "manquant", o ? o[C.raison_manquant] : "rapport_non_collecte", o ? o[C.origine] : "", o ? o[C.id_source] : "",
        o ? o[C.page] : "", o ? o[C.libelle_origine] : "", o ? o[C.valeur_retraitee] : null, s ? s.url : ""]);
    }); });
    return lignes;
  }
  function nomFichier(ext) { return "fatma_selection_" + etat.perimetre + "_" + D.version + "." + ext; }
  $("dl-excel").addEventListener("click", function () {
    var cols = variablesChoisies(), wb = XLSX.utils.book_new();
    var large = [["entity", "year", "currency"].concat(cols)];
    lignesSelection().forEach(function (l) { large.push([l[0], l[1], (entitesParCode[l[0]] || {}).devise].concat(cols.map(function (c) { var o = obs[l[0] + "|" + etat.perimetre + "|" + l[1] + "|" + c]; return o ? o[C.valeur] : null; }))); });
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(large), "panel_wide");
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(tableLongue()), "long_with_quality");
    var dico = [["code", "label_en", "label_fr", "unit", "type", "formula", "definition_en", "definition_fr", "version"]];
    cols.forEach(function (c) { var v = vars[c]; dico.push([c, v.libelle_en, v.libelle_fr, v.unite === "ratio" ? "ratio" : "reporting currency", v.type, v.formule, v.definition_en, v.definition_fr, v.version]); });
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(dico), "codebook");
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([["dataset_version", D.version], ["scope", etat.perimetre], ["entities", etat.entites.join(" ")], ["years", etat.annees.join(" ")],
      ["downloaded", new Date().toISOString().slice(0, 10)], ["units", "each company's reporting currency (column currency / unit), not thousands; ratios as decimals"], ["missing", "empty cell = missing (never 0); see long_with_quality.missing_reason"],
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
  function tout() { traduire(); dessinerPays(); dessinerEntites(); dessinerPerimetres(); dessinerAnnees(); dessinerVariables(); dessinerApercu(); dessinerJeux(); dessinerSelections(); }
  // ----- 7. world register of Islamic banks (coverage of the collection)
  function dessinerRegistre() {
    var R = D.registre || [];
    var sec = $("registre-section");
    if (!R.length) { sec.hidden = true; return; }
    var resume = $("registre-resume"); resume.textContent = "";
    [[R.length, t("rBanques")], [new Set(R.map(function (b) { return b.pays; })).size, t("rPays")],
     [R.filter(function (b) { return b.documents > 0; }).length, t("rCollectees")], [R.filter(function (b) { return b.annees.length > 0; }).length, t("rDonnees")]
    ].forEach(function (x) { resume.appendChild(el("div", { classe: "tuile" }, [el("div", { classe: "chiffre", texte: String(x[0]) }), el("div", { classe: "quoi", texte: x[1] })])); });
    var q = $("registre-recherche").value, boite = $("registre-liste"); boite.textContent = "";
    var parPays = {};
    R.forEach(function (b) {
      var texte = [b.nom, b.nom_ar, b.sigle, nomPays(b.pays), b.regulateur].join(" ");
      if (q && !sonRecherche.trouve(sonRecherche.cle(texte), q)) return;
      (parPays[b.pays] = parPays[b.pays] || []).push(b);
    });
    Object.keys(parPays).sort(function (a, b) { return nomPays(a) < nomPays(b) ? -1 : 1; }).forEach(function (c) {
      var banques = parPays[c];
      var avec = banques.filter(function (b) { return b.annees.length > 0; }).length;
      var det = el("details", { classe: "pays-registre" });
      if (q) det.open = true;
      det.appendChild(el("summary", { texte: nomPays(c) + " — " + banques.length + " " + (banques.length > 1 ? "banks" : "bank") + " · " + avec + " with figures" }));
      var ul = el("ul", { classe: "liste-registre" });
      banques.forEach(function (b) {
        var statut = b.annees.length ? t("rStatutDonnees") + " (" + b.annees[0] + "–" + b.annees[b.annees.length - 1] + ")"
          : b.sanctions ? t("rStatutSanctions") : b.documents ? t("rStatutDocs") : t("rStatutAttente");
        var forme = b.forme === "islamic_window" ? t("rFenetre") : b.forme === "islamic_subsidiary" ? t("rFiliale") : "";
        var infos = [b.regulateur, b.cotee === true ? t("rCotee") + (b.bourse ? " (" + b.bourse + (b.ticker ? " " + b.ticker : "") + ")" : "") : b.cotee === false ? t("rNonCotee") : "", forme, b.devise].filter(Boolean).join(" · ");
        var li = el("li", { classe: "banque-registre " + (b.annees.length ? "ok" : b.documents ? "docs" : "attente") }, [
          el("div", { classe: "titre", texte: (b.nom || b.sigle) + (b.nom_ar ? " — " + b.nom_ar : "") }),
          el("div", { classe: "infos", texte: infos }),
          el("div", { classe: "statut", texte: statut })]);
        if (b.liste) li.appendChild(el("a", { href: b.liste, target: "_blank", rel: "noopener noreferrer", classe: "petit-lien", texte: t("rListe") }));
        ul.appendChild(li);
      });
      det.appendChild(ul);
      boite.appendChild(det);
    });
  }
  $("registre-recherche").addEventListener("input", dessinerRegistre);

  tout();
  dessinerRegistre();
})();
