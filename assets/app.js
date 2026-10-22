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
      oTexte: "read in the text of the document (auditor's report, basis of preparation)",
      rAudit: "the collected document does not contain the auditor's report",
      rNonDit: "not stated in the collected document",
      oNote: "read in the financing note of the financial statements",
      rContrat: "this contract is not shown in the financing note", rNote: "financing note not found in the document",
      avRetraite: "Some values were restated by the company the following year: the original value is kept, the restated value is shown next to it.",
      avRelire: "Some values are “to review”: they did not pass all automatic checks.",
      ouvrirDocument: "open the official page",
      mDonnees: "Data", mCouverture: "Coverage", mGuide: "Guide", mContact: "Report an error / request a variable",
      retour: "← back to the data", pageBanque: "bank page",
      fChiffres: "Key figures by year", fTexte: "Audit, Sharia, governance and ESG (read in the text)", fCouverture: "Coverage",
      fDocuments: "Official documents used", signalerBanque: "Report an error on this bank",
      fRegulateur: "Regulator", fCotation: "Listing", fDevise: "Reporting currency", fExercice: "Fiscal year end", fPerimetre: "Statements shown",
      versionsTitre: "Dataset versions", aideVersions: "Each version is listed with its date and size. A version can be rebuilt exactly from the private archive (same fingerprint, same files).",
      etapeCouverture: "Coverage report", aideCouverture: "For every bank with collected documents: years collected, years with figures, values read, automatically verified, to review, and the main reasons of missing values.",
      cBanque: "Bank", cPays: "Country", cDocs: "Years collected", cAnnees: "Years with figures", cValeurs: "Values", cVerifiees: "Verified", cRelire: "To review", cRaisons: "Main reasons of missing values",
      cBanques: "banks with documents", cAvecDonnees: "with figures", cTotalValeurs: "values read", cTotalVerifiees: "automatically verified",
      etapeContact: "Report an error or request a variable",
      aideContact: "Seen a wrong value, or need a variable that is not in the database? Tell us: every message is read and answered by e-mail.",
      tErreur: "Report an error", tVariable: "Request a variable",
      fEntite: "Bank (optional)", fVariable: "Variable and year (optional)", fMessage: "Your message (required)", fEmail: "Your e-mail (required, to answer you)",
      fMention: "Your message is sent to the creator of the site (Formspree service).", fEnvoyer: "Send",
      fMerci: "Thank you, your message has been sent. You will get an answer by e-mail.", fEchec: "The message could not be sent. Please try again later.",
      fEmailFaux: "Please write a valid e-mail address so that we can answer you.", fVide: "Please write your message.",
      etapeGuide: "Guide for researchers",
      avFenetre: "Fiscal years end on different dates in this selection ({x}): the same « year » covers different periods.",
      avIAH: "Islamic banks present investment accounts differently (equity of investment account holders under AAOIFI, liabilities or customer deposits under IFRS): deposit-based ratios are not directly comparable; see Financing to deposits and investment accounts.",
      avTypes: "This selection mixes Islamic and conventional banks.",
      avOpinion: "The auditor's opinion is not unqualified for: {x}.",
      avCadre: "Accounting frameworks stated in the documents: {x}.",
      refTitre: "Reference set — values entered by hand",
      refAide: "For each line, open the official document at the page given, find the line named in « label in the document » and type the number EXACTLY as printed (minus sign or brackets for negatives) with the unit printed on the page (units, thousands or millions). Our value is not shown, so that the comparison is blind. Your entries are kept on this device until you export them.",
      refExport: "Download my entries (CSV)", refEnvoi: "Send the downloaded file to Ahmed (or put it in registres/reference/ of the private repository): outils/mesurer_precision.py then measures the accuracy by language and by family.",
      refFait: "entered", refReste: "to do", refIntrouvable: "not found on the page", refUnite: "unit printed",
      uUnites: "units", uMilliers: "thousands", uMillions: "millions", mReference: "Reference set"
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
  var NOMS_FAMILLES = { en: { "Bilan": "Balance sheet", "Hors bilan": "Off-balance sheet", "Résultat": "Income statement", "Flux": "Cash flows", "Ratios": "Ratios", "Audit": "Audit", "Sharia governance": "Sharia governance", "Islamic financing by contract": "Islamic financing by contract", "Islamic banking": "Islamic banking", "Governance": "Governance", "ESG": "ESG" } };
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
          el("div", { classe: "infos", texte: [e.nom.ar, nomPays(e.pays), e.devise, e.referentiel].filter(Boolean).join(" · ") }),
          el("a", { href: "#bank=" + e.code, classe: "petit-lien", texte: t("pageBanque") })])]));
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
    if (vars[variable].unite === "texte" || vars[variable].unite === "nombre") return String(v);
    if (vars[variable].unite === "binaire") return Number(v) === 1 ? "Yes" : "No";
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
    if (n) avertissements(etat.entites, etat.annees, etat.perimetre).forEach(function (x) { av.appendChild(el("p", { classe: "alerte", texte: x })); });
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

  // ----- comparability warnings (spec: comparability warnings), from the data itself
  function avertissements(codes, annees, perimetre) {
    var choisies = codes.map(function (c) { return entitesParCode[c]; }).filter(Boolean), sortie = [];
    if (!choisies.length) return sortie;
    var devises = Array.from(new Set(choisies.map(function (e) { return e.devise; }).filter(Boolean))).sort();
    sortie.push(t("avDevise").replace("{x}", devises.join(", ") || "not stated"));
    var cadres = {};
    choisies.forEach(function (e) { annees.forEach(function (a) {
      var o = obs[e.code + "|" + perimetre + "|" + a + "|SHR.FRAMEWORK"];
      if (o && o[C.valeur]) cadres[o[C.valeur]] = 1;
      else if (e.referentiel) cadres[e.referentiel] = 1;
    }); });
    if (Object.keys(cadres).length) sortie.push(t("avCadre").replace("{x}", Object.keys(cadres).sort().join("; ")));
    var fins = Array.from(new Set(choisies.map(function (e) { return e.fin_exercice || "12-31"; }))).sort();
    if (fins.length > 1) sortie.push(t("avFenetre").replace("{x}", fins.join(", ")));
    var islamiques = choisies.filter(function (e) { return (e.type || "").indexOf("banque_islamique") === 0; }).length;
    if (islamiques && islamiques < choisies.length) sortie.push(t("avTypes"));
    if (islamiques > 1) sortie.push(t("avIAH"));
    var reserves = [];
    choisies.forEach(function (e) { annees.forEach(function (a) {
      var o = obs[e.code + "|" + perimetre + "|" + a + "|AUD.OPINION"];
      if (o && o[C.valeur] && o[C.valeur] !== "unqualified") reserves.push(e.sigle + " " + a + " (" + o[C.valeur] + ")");
    }); });
    if (reserves.length) sortie.push(t("avOpinion").replace("{x}", reserves.join(", ")));
    return sortie;
  }

  // ----- fenêtre de détail d'une valeur (provenance)
  function nomStatut(s) { return { verifie_auto: t("sVerifie"), verifie_humain: t("sHumain"), a_relire: t("sRelire"), en_attente: t("sAttente"), manquant: t("sManquant") }[s] || s; }
  function nomOrigine(o) { return { rapport_de_l_annee: t("oAnnee"), colonne_comparative_du_rapport_suivant: t("oSuivant"), calcul: t("oCalcul"), texte_du_document: t("oTexte"), note_aux_etats_financiers: t("oNote") }[o] || o; }
  function nomRaison(r) { if (!r) return ""; if (r.indexOf("donnee_de_calcul_absente") === 0) return t("rCalcul") + (r.split(":")[1] ? " (" + r.split(":")[1].trim() + ")" : ""); return { ligne_absente_de_l_etat_publie: t("rLigne"), rapport_non_collecte: t("rRapport"), non_applicable: t("rNA"), auditor_report_not_in_document: t("rAudit"), not_stated_in_document: t("rNonDit"), contract_not_in_financing_note: t("rContrat"), financing_note_not_found: t("rNote"),
      key_audit_matters_not_numbered: "key audit matters are not numbered in the report (count not guessed)", no_key_audit_matters_section: "no key audit matters section in the report",
      no_listed_topic_named: "no topic of the fixed list named", line_not_found_in_read_pages: "line not found in the pages read",
      line_not_found_in_the_reports: "line not found in the reports of the year (read in full)", not_stated_in_one_sentence_of_the_reports: "not stated in one sentence of the reports of the year (read in full)",
      not_stated_in_one_sentence_of_the_pages_read: "not stated in one sentence of the pages read", annual_report_not_collected: "annual report not collected (financial statements only)",
      no_sharia_board_report_in_document: "no Sharia board report in the document", conclusion_not_stated: "conclusion not stated", sharia_audit_not_mentioned: "Sharia audit not mentioned in the pages read" }[r] || r; }
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
    ajouter("dValeur", o && o[C.valeur] !== null ? format(o[C.valeur], c) + (v.unite === "devise" ? " (" + e.devise + " thousands)" : "") : "—");
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
      lignes.push([l[0], etat.perimetre, l[1], c, o ? o[C.valeur] : null, vars[c].unite === "devise" ? (entitesParCode[l[0]] || {}).devise : vars[c].unite,
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
        if (entitesParCode[b.code]) { li.appendChild(el("span", { texte: " · " })); li.appendChild(el("a", { href: "#bank=" + b.code, classe: "petit-lien", texte: t("pageBanque") })); }
        ul.appendChild(li);
      });
      det.appendChild(ul);
      boite.appendChild(det);
    });
  }
  $("registre-recherche").addEventListener("input", dessinerRegistre);

  // ----- bank page (#bank=CODE): key figures by year, text variables, coverage, documents
  var CHIFFRES_CLES = ["BS.TOTAL_ASSETS", "BS.FINANCING_CUSTOMERS", "BS.LOANS_CUSTOMERS", "BS.DEPOSITS_CUSTOMERS", "BS.EQUITY_IAH",
    "BS.TOTAL_EQUITY", "IS.FINANCING_INCOME", "IS.NET_INCOME", "CF.OPERATING", "RATIO.ROA", "RATIO.ROE", "RATIO.EQUITY_TO_ASSETS",
    "RATIO.FINANCING_TO_FUNDING", "RATIO.COST_TO_INCOME_IFRS"];
  var TEXTE_CLES = ["AUD.FIRM", "AUD.BIG4", "AUD.OPINION", "AUD.KAM", "AUD.KAM_COUNT", "AUD.KAM_TOPICS", "AUD.FEES", "SHR.SSB_REPORT",
    "SHR.SSB_MEMBERS", "SHR.SSB_CONCLUSION", "SHR.SHARIA_AUDIT", "SHR.FRAMEWORK", "SHR.ZAKAT_BY", "GOV.BOARD_SIZE",
    "GOV.BOARD_INDEPENDENT", "GOV.BOARD_WOMEN", "ESG.EMPLOYEES", "ESG.SDG_INDEX"];
  function tableauFiche(tab, e, perim, annees, codes) {
    tab.textContent = "";
    var lignes = codes.filter(function (c) { return vars[c] && annees.some(function (a) { var o = obs[e.code + "|" + perim + "|" + a + "|" + c]; return o && o[C.valeur] !== null; }); });
    var tr = el("tr", {}, [el("th", { classe: "fixe", texte: "" })]);
    annees.forEach(function (a) { tr.appendChild(el("th", { texte: String(a) })); });
    tab.appendChild(el("thead", {}, [tr]));
    var corps = el("tbody");
    lignes.forEach(function (c) {
      var ligne = el("tr", {}, [el("td", { classe: "fixe", texte: vars[c].libelle_en })]);
      annees.forEach(function (a) {
        var o = obs[e.code + "|" + perim + "|" + a + "|" + c];
        var td = el("td", { classe: "valeur " + classeStatut(o), tabindex: "0", texte: format(o ? o[C.valeur] : null, c) });
        td.addEventListener("click", function () { montrerDetail(e, a, c, o); });
        ligne.appendChild(td);
      });
      corps.appendChild(ligne);
    });
    tab.appendChild(corps);
    return lignes.length;
  }
  function dessinerFiche(code) {
    var e = entitesParCode[code];
    if (!e) return false;
    var perims = ["consolide", "individuel"].filter(function (p) { return D.observations.some(function (o) { return o[C.entite] === code && o[C.perimetre] === p && o[C.valeur] !== null && o[C.origine] !== "calcul"; }); });
    var perim = perims[0] || "consolide";
    var annees = Array.from(new Set(D.observations.filter(function (o) { return o[C.entite] === code && o[C.perimetre] === perim && o[C.valeur] !== null; }).map(function (o) { return o[C.annee]; }))).sort();
    $("fiche-titre").textContent = (e.nom.en || e.nom.fr || e.sigle) + (e.nom.ar ? " — " + e.nom.ar : "");
    var infos = $("fiche-infos"); infos.textContent = "";
    [[t("cPays"), nomPays(e.pays)], [t("fRegulateur"), e.regulateur], [t("fCotation"), e.cotee ? (e.bourse || "") + (e.ticker ? " " + e.ticker : "") : e.cotee === false ? t("rNonCotee") : ""],
     [t("fDevise"), e.devise], [t("fExercice"), e.fin_exercice], [t("fPerimetre"), t(perim)]].forEach(function (x) {
      if (x[1]) infos.appendChild(el("div", {}, [el("strong", { texte: x[0] + ": " }), el("span", { texte: x[1] })]));
    });
    var av = $("fiche-avertissements"); av.textContent = "";
    avertissements([code], annees, perim).forEach(function (x) { av.appendChild(el("p", { classe: "alerte", texte: x })); });
    tableauFiche($("fiche-chiffres"), e, perim, annees, CHIFFRES_CLES);
    tableauFiche($("fiche-texte"), e, perim, annees, TEXTE_CLES);
    var c = (D.couverture || []).filter(function (x) { return x.code === code; })[0];
    var fc = $("fiche-couverture"); fc.textContent = "";
    if (c) fc.appendChild(el("p", { texte: t("cDocs") + ": " + (c.annees_documents.join(", ") || "—") + " · " + t("cAnnees") + ": " + (c.annees_valeurs.join(", ") || "—") +
      " · " + c.valeurs + " " + t("cValeurs").toLowerCase() + ", " + c.verifiees + " " + t("verifiees") + ", " + c.a_relire + " " + t("aRelire") }));
    var ul = $("fiche-documents"); ul.textContent = "";
    D.sources.filter(function (s) { return s.entite === code; }).sort(function (a, b) { return a.periode < b.periode ? 1 : -1; }).forEach(function (s) {
      ul.appendChild(el("li", {}, [el("a", { href: s.url, target: "_blank", rel: "noopener noreferrer", texte: s.titre })]));
    });
    $("fiche-signaler").onclick = function () { $("f-entite").value = (e.sigle || "") + " — " + (e.nom.en || e.nom.fr || ""); choisirType("erreur"); location.hash = "#contact"; };
    return true;
  }
  function route() {
    var m = /^#bank=([A-Z]{2}\.[A-Z0-9]+)$/.exec(location.hash);
    var ok = m && dessinerFiche(m[1]);
    var ref = location.hash === "#reference" && (D.echantillon_reference || []).length > 0;
    if (ref) dessinerReference();
    $("fiche").hidden = !ok;
    $("reference").hidden = !ref;
    ok = ok || ref;
    document.querySelectorAll("main > section.etape, main > .intro").forEach(function (n) { n.hidden = !!ok; });
    if (ok) { try { window.scrollTo(0, 0); } catch (e) { /* no scrolling available: nothing to do */ } }
    else if (location.hash.length > 1 && !m) { var cible = document.getElementById(location.hash.slice(1)); if (cible) cible.scrollIntoView(); }
  }
  window.addEventListener("hashchange", route);

  // ----- 8. coverage report
  function dessinerCouverture() {
    var L = D.couverture || [], tab = $("couverture-table"), r = $("couverture-resume");
    r.textContent = ""; tab.textContent = "";
    [[L.length, t("cBanques")], [L.filter(function (x) { return x.valeurs > 0; }).length, t("cAvecDonnees")],
     [L.reduce(function (s, x) { return s + x.valeurs; }, 0), t("cTotalValeurs")], [L.reduce(function (s, x) { return s + x.verifiees; }, 0), t("cTotalVerifiees")]
    ].forEach(function (x) { r.appendChild(el("div", { classe: "tuile" }, [el("div", { classe: "chiffre", texte: String(x[0]) }), el("div", { classe: "quoi", texte: x[1] })])); });
    var tr = el("tr", {});
    ["cBanque", "cPays", "cDocs", "cAnnees", "cValeurs", "cVerifiees", "cRelire", "cRaisons"].forEach(function (k) { tr.appendChild(el("th", { texte: t(k) })); });
    tab.appendChild(el("thead", {}, [tr]));
    var corps = el("tbody");
    L.slice().sort(function (a, b) { return b.verifiees - a.verifiees || (a.nom < b.nom ? -1 : 1); }).forEach(function (x) {
      var nom = entitesParCode[x.code] ? el("a", { href: "#bank=" + x.code, texte: x.nom }) : el("span", { texte: x.nom });
      corps.appendChild(el("tr", {}, [el("td", {}, [nom]), el("td", { texte: nomPays(x.pays) }),
        el("td", { texte: x.annees_documents.join(", ") }), el("td", { texte: x.annees_valeurs.join(", ") || "—" }),
        el("td", { texte: String(x.valeurs) }), el("td", { texte: String(x.verifiees) }), el("td", { texte: String(x.a_relire) }),
        el("td", { texte: x.raisons.map(function (r) { return nomRaison(r[0]) + " (" + r[1] + ")"; }).join("; ") })]));
    });
    tab.appendChild(corps);
  }

  // ----- dataset versions
  function dessinerVersions() {
    var ul = $("versions"); ul.textContent = "";
    (D.versions || []).slice().reverse().forEach(function (v) {
      ul.appendChild(el("li", { texte: v.version + " — " + v.date + " — " + v.observations + " values, " + v.entites + " companies" + (v.version === D.version ? " (current)" : "") }));
    });
  }

  // ----- 9. report an error / request a variable (common form of Ahmed's sites, Formspree; e-mail required)
  var typeMessage = "erreur";
  function choisirType(x) { typeMessage = x; dessinerTypes(); }
  function dessinerTypes() {
    var boite = $("type-message"); boite.textContent = "";
    [["erreur", t("tErreur")], ["variable", t("tVariable")]].forEach(function (x) {
      var b = el("button", { type: "button", classe: "puce", role: "radio", "aria-checked": String(typeMessage === x[0]), texte: x[1] });
      b.addEventListener("click", function () { choisirType(x[0]); });
      boite.appendChild(b);
    });
  }
  $("formulaire").addEventListener("submit", function (ev) {
    ev.preventDefault();
    var retour = $("f-retour"), email = $("f-email").value.trim(), message = $("f-message").value.trim();
    retour.hidden = false;
    if (!message) { retour.textContent = t("fVide"); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { retour.textContent = t("fEmailFaux"); return; }
    if ($("f-gotcha").value) return;            // robot
    var bout = $("f-envoyer"); bout.disabled = true;
    fetch("https://formspree.io/f/mwlpakqj", { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({ site: "FATMA Research Data (data.clicvia.com)", page: location.href, type: typeMessage === "erreur" ? "report an error" : "request a variable",
        entite: $("f-entite").value.trim(), variable: $("f-variable").value.trim(), message: message, email: email, version: D.version }) })
      .then(function (r) { retour.textContent = r.ok ? t("fMerci") : t("fEchec"); if (r.ok) { $("f-message").value = ""; } })
      .catch(function () { retour.textContent = t("fEchec"); })
      .then(function () { bout.disabled = false; });
  });

  // ----- reference set entered by hand (#reference): blind entry, kept on this device, exported as CSV
  var CLE_REF = "fatma-reference-saisie";
  function saisies() { try { return JSON.parse(lire(CLE_REF) || "{}"); } catch (e) { return {}; } }
  function dessinerReference() {
    var E = D.echantillon_reference || [], S = saisies(), tab = $("ref-table"); tab.textContent = "";
    var faits = E.filter(function (x) { return S[x.id] && (S[x.id].valeur !== "" || S[x.id].introuvable); }).length;
    var r = $("ref-resume"); r.textContent = "";
    [[faits, t("refFait")], [E.length - faits, t("refReste")]].forEach(function (x) { r.appendChild(el("div", { classe: "tuile" }, [el("div", { classe: "chiffre", texte: String(x[0]) }), el("div", { classe: "quoi", texte: x[1] })])); });
    var tr = el("tr", {});
    ["#", t("entreprise"), t("annee"), t("dLibelle"), t("dDocument"), t("dValeur"), t("refUnite"), t("refIntrouvable")].forEach(function (k) { tr.appendChild(el("th", { texte: k })); });
    tab.appendChild(el("thead", {}, [tr]));
    var corps = el("tbody");
    E.forEach(function (x) {
      var e = entitesParCode[x.entite] || { sigle: x.entite }, s = sources[x.id_source], v = S[x.id] || { valeur: "", unite: "1", introuvable: false };
      var champ = el("input", { type: "text", inputmode: "decimal", classe: "champ court", value: v.valeur, "aria-label": x.id });
      var unite = el("select", { "aria-label": t("refUnite") }, [["1", t("uUnites")], ["1000", t("uMilliers")], ["1000000", t("uMillions")]].map(function (u) {
        var o = el("option", { value: u[0], texte: u[1] }); if (v.unite === u[0]) o.selected = true; return o; }));
      var absent = el("input", { type: "checkbox", "aria-label": t("refIntrouvable") }); absent.checked = !!v.introuvable;
      function garder() { var T2 = saisies(); T2[x.id] = { valeur: champ.value.trim(), unite: unite.value, introuvable: absent.checked }; ecrire(CLE_REF, JSON.stringify(T2)); }
      champ.addEventListener("change", garder); unite.addEventListener("change", garder); absent.addEventListener("change", garder);
      corps.appendChild(el("tr", {}, [el("td", { texte: x.id }), el("td", { texte: e.sigle + " · " + t(x.perimetre) }), el("td", { texte: String(x.annee) }),
        el("td", { texte: x.libelle + " (" + (vars[x.variable] ? vars[x.variable].libelle_en : x.variable) + ")" }),
        el("td", {}, [s ? el("a", { href: s.url, target: "_blank", rel: "noopener noreferrer", texte: s.titre + " — p. " + x.page }) : el("span", { texte: "p. " + x.page })]),
        el("td", {}, [champ]), el("td", {}, [unite]), el("td", {}, [el("label", {}, [absent, el("span", { texte: " " + t("refIntrouvable") })])])]));
    });
    tab.appendChild(corps);
  }
  $("ref-export").addEventListener("click", function () {
    var S = saisies(), lignes = [["id", "entity", "scope", "year", "variable", "source_id", "page", "value_typed", "unit_printed", "not_found", "dataset_version"]];
    (D.echantillon_reference || []).forEach(function (x) { var v = S[x.id] || {}; lignes.push([x.id, x.entite, x.perimetre, x.annee, x.variable, x.id_source, x.page, v.valeur || "", v.unite || "1", v.introuvable ? 1 : 0, D.version]); });
    var csv = lignes.map(function (l) { return l.map(function (z) { z = String(z === undefined ? "" : z); return /[",\n]/.test(z) ? '"' + z.replace(/"/g, '""') + '"' : z; }).join(","); }).join("\n") + "\n";
    var a = el("a", { href: URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" })), download: "fatma_reference_" + new Date().toISOString().slice(0, 10) + ".csv" });
    document.body.appendChild(a); a.click(); a.remove();
  });

  // ----- 10. guide for researchers (one page)
  var GUIDE = [
    ["What is in the database", "Financial statements of Islamic banks taken from their official documents (balance sheet, income statement, cash flows, off-balance sheet), audit and Sharia governance facts read in the auditor's and Sharia board's reports, governance and ESG facts stated in the annual reports, and the world register of Islamic banks with the progress of the collection."],
    ["How to build a dataset", "1. Choose companies (search by name or ticker, filter by country). 2. Choose consolidated or standalone statements. 3. Choose years. 4. Choose variables (each has a definition). 5. Check the preview: tap a value to see its document, page and original label. 6. Download Excel or CSV for your selection, or the full dataset in Excel and Stata."],
    ["What the colours and statuses mean", "Automatically verified: the value passed the accounting checks (totals, balance sheet equality, chain of the income statement, cash flows, consistency with the following year). It is NOT a human verification. To review: a check failed or the figure was hard to read (scans). Awaiting checks: no check could test it yet. Restated: the following year's report gives another figure; the original is kept and the restated value is shown next to it."],
    ["Missing values", "A missing value is always empty, never 0, and always has a reason: line not present in the published statement, document not collected, not applicable, value needed for a ratio missing, not stated in the document."],
    ["Units", "Amounts are in each company's own reporting currency, as published (the downloads give them in units; the screen shows thousands). No currency conversion. Ratios are decimals in the files and percentages on screen. Text variables (audit firm, opinion, framework) are given as read."],
    ["Comparing banks", "Read the warnings above the preview: currencies, accounting frameworks (AAOIFI, IFRS, local), fiscal year ends, Islamic vs conventional banks, investment accounts presented differently, qualified audit opinions."],
    ["Text variables", "Audit, Sharia, governance and ESG variables are read with fixed rules in the text (no AI): each keeps its page and a short extract. Counts are given only when a sentence states them (never added up from lists). The SDG disclosure index (0-8) measures disclosure, not performance; its scale is version 1, to be confirmed against the specification."],
    ["Citing the data and versions", "Cite the dataset version shown at the bottom of the page (for example FATMA Research Data, version vYYYYMMDD-xxxxxx). Every version can be rebuilt exactly from the archive. Each value also gives the official document and page it comes from."],
    ["Errors and requests", "Use « Report an error or request a variable »: give the bank, the variable and the year if you can. Answers come by e-mail."],
    ["Reference set (for the researcher)", "The page « Reference set » (link at the top) lists a fixed sample of 150 values spread over languages and statements. Type each value as printed in the document, without seeing ours; the downloaded file lets us measure the accuracy of the database by language and by family."]
  ];
  function dessinerGuide() {
    var g = $("guide-contenu"); g.textContent = "";
    GUIDE.forEach(function (x) { g.appendChild(el("h3", { texte: x[0] })); g.appendChild(el("p", { texte: x[1] })); });
  }

  tout();
  dessinerRegistre();
  dessinerCouverture();
  dessinerVersions();
  dessinerTypes();
  dessinerGuide();
  route();
})();
