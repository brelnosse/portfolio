"""Génère le CV (PDF une page) utilisé par le portfolio.

Usage :  python cv/generate_cv.py
Sortie : cv/out/CV_Brel_NOSSE.pdf (ignoré par git)
Modifier le contenu directement dans les constantes ci-dessous.
"""
import json
from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import cm
from reportlab.platypus import (HRFlowable, KeepTogether, Paragraph, SimpleDocTemplate,
                                Spacer, Table, TableStyle)

# Le PDF contient des coordonnées : il est généré hors du suivi git (cv/out/), puis déposé sur le serveur.
OUT = Path(__file__).resolve().parent / "out" / "CV_Brel_NOSSE.pdf"

BLUE = HexColor("#0b66c2")
GREY = HexColor("#555555")
BLACK = HexColor("#111111")

# ---------------------------------------------------------------- contenu
NAME = "Brel NOSSE"
# Coordonnées personnelles : lues dans cv/contact.local.json (ignoré par git, le dépôt est public).
# Copier cv/contact.example.json vers cv/contact.local.json et le remplir.
_CONTACT_DIR = Path(__file__).resolve().parent
_contact_file = _CONTACT_DIR / "contact.local.json"
if not _contact_file.exists():
    _contact_file = _CONTACT_DIR / "contact.example.json"
    print("Attention : cv/contact.local.json absent, coordonnées d'exemple utilisées.")
_contact = json.loads(_contact_file.read_text(encoding="utf-8"))
CONTACT = [
    (_contact["city"], None),
    (_contact["phone"], "tel:" + _contact["phone"].replace(" ", "")),
    (_contact["email"], "mailto:" + _contact["email"]),
]
LINKS = [
    ("linkedin.com/in/brelnosse", "https://linkedin.com/in/brelnosse"),
    ("github.com/brelnosse", "https://github.com/brelnosse"),
    ("brelnosse.com", "https://brelnosse.com"),
]
TITLE = "Élève Ingénieur — Développement Logiciel &amp; Data"
SUBTITLE = "Stage de 4 mois &nbsp;&nbsp;|&nbsp;&nbsp; Disponible à partir d’avril 2027"

PROFILE = (
    "Élève ingénieur à 3iL Ingénieurs, j’ai acquis une expérience concrète en développement "
    "full-stack (deux stages et plusieurs applications déployées). Je m’oriente aujourd’hui vers la "
    "<b>data</b> et le <b>Machine Learning</b> : je pratique l’analyse de données en Python "
    "(NumPy, Pandas, Matplotlib, Seaborn) et poursuis ma formation vers les modèles de ML. "
    "Je recherche un stage de 4 mois à partir d’avril 2027."
)

SKILLS = [
    ("Data (Python)", "NumPy, Pandas, Matplotlib, Seaborn, SymPy."),
    ("Backend", "Java (POO), Node.js / NestJS, PHP, C, Shell."),
    ("Frontend &amp; Mobile", "React.js, TypeScript, React Native (Expo), Flutter."),
    ("Bases de données", "PostgreSQL, MongoDB, SQL/PLSQL, Redis."),
    ("Outils &amp; DevOps", "Docker, Git / GitHub, Coolify, CI/CD (bases)."),
    ("Méthodes &amp; Qualité", "Agile, tests unitaires Jest, UML."),
]

PROJECTS = [
    {
        "title": "PrintSpot | Plateforme d’impression",
        "links": [("printspot.app", "https://printspot.app")],
        "stack": "TypeScript, NestJS, React Native (Expo), Vite, PostgreSQL, Redis / BullMQ, Docker",
        "bullets": [
            "Écosystème complet : application mobile, back-office web et agent d’impression desktop.",
            "Paiement par séquestre Mobile Money, libéré après confirmation de livraison par QR code.",
            "Tâches asynchrones et notifications multi-canaux (push, WhatsApp, SMS, e-mail) via Redis &amp; BullMQ.",
            "Déploiement auto-hébergé avec Docker et Coolify.",
        ],
    },
    {
        "title": "ThayiPizza | E-commerce Pizza",
        "links": [
            ("thayipizza.netlify.app", "https://thayipizza.netlify.app"),
            ("Maquette Figma", "https://www.figma.com/proto/FqGTHgUcCOO69SLgEVCZuy/ThayiPizza?node-id=1-222"),
        ],
        "stack": "React, Firebase, CSS, Figma",
        "bullets": [
            "Conception de 10 écrans sur Figma puis intégration en composants React modulaires.",
            "Logique de panier avec calcul dynamique des prix et authentification Firebase.",
        ],
    },
    {
        "title": "Système d’Archivage Sécurisé",
        "links": [("Code source", "https://github.com/brelnosse/archiveX")],
        "stack": "Java, JavaFX, SQL, CSS",
        "bullets": [
            "Application desktop séparant l’interface graphique (JavaFX) de la logique métier.",
            "Connexion à la base via JDBC (pattern Singleton), validation des données et contrôle d’accès.",
        ],
    },
]

EXPERIENCES = [
    {
        "title": "Développeur Front-end (Stage)",
        "org": "Ovnicode sarl, Yaoundé",
        "period": "Juin 2025 – Août 2025",
        "bullets": [
            "Développement d’une interface web de consultation et de filtrage dynamique de catalogues culinaires.",
            "Intégration de maquettes Figma en composants React responsives, connectés aux APIs backend.",
            "Mise en place d’une authentification sécurisée (JWT) et d’une recherche intuitive.",
        ],
    },
    {
        "title": "Développeur Fullstack (Stage)",
        "org": "Like-concept, Douala",
        "period": "Juin 2024 – Août 2024",
        "bullets": [
            "Réalisation d’une application de gestion d’emprunts : base relationnelle MySQL et CRUD en PHP.",
            "Développement d’un algorithme de gestion des dates d’emprunt et des alertes de retard.",
            "Interface d’administration en HTML5/CSS3 et JavaScript natif.",
        ],
    },
]

EDUCATION = [
    ("Cycle Ingénieur en Informatique (Bac+5)", "3iL Ingénieurs, Limoges", "Depuis 2025",
     "Méthodologie Agile, qualité de code, Docker, PostgreSQL."),
    ("Classe Préparatoire Informatique", "IUC, Douala", "2023 – 2025",
     "Java, script shell, C, assembleur."),
]

LANGUAGES = "<b>Français :</b> Maternel &nbsp;•&nbsp; <b>Anglais :</b> B2 &nbsp;•&nbsp; <b>Chinois :</b> A1"
SOFT_SKILLS = "Curiosité technique, Rigueur, Autonomie, Esprit d’équipe, Adaptabilité."
INTERESTS = "<b>Sports &amp; Loisirs :</b> Basket-ball, Baby-foot, Lecture."

# ---------------------------------------------------------------- styles
F, FB, FI = "Times-Roman", "Times-Bold", "Times-Italic"
st = {
    "name": ParagraphStyle("name", fontName=F, fontSize=24, leading=27, alignment=TA_CENTER),
    "contact": ParagraphStyle("contact", fontName=F, fontSize=9.5, leading=13, alignment=TA_CENTER, textColor=GREY),
    "band": ParagraphStyle("band", fontName=FB, fontSize=11, leading=13, alignment=TA_CENTER, textColor=HexColor("#ffffff")),
    "bandsub": ParagraphStyle("bandsub", fontName=F, fontSize=9.5, leading=12, alignment=TA_CENTER, textColor=HexColor("#ffffff")),
    "h": ParagraphStyle("h", fontName=FB, fontSize=12.5, leading=14, textColor=BLUE, spaceBefore=5),
    "body": ParagraphStyle("body", fontName=F, fontSize=9.6, leading=11.6, textColor=BLACK, alignment=TA_JUSTIFY),
    "item": ParagraphStyle("item", fontName=F, fontSize=9.6, leading=11.6, textColor=BLACK, leftIndent=14, firstLineIndent=-14),
    "bold": ParagraphStyle("bold", fontName=FB, fontSize=10, leading=12.5, textColor=BLACK),
    "stack": ParagraphStyle("stack", fontName=FI, fontSize=9, leading=11, textColor=BLACK),
    "right": ParagraphStyle("right", fontName=F, fontSize=9.5, leading=12.5, alignment=2, textColor=BLUE),
    "date": ParagraphStyle("date", fontName=FI, fontSize=9.5, leading=12.5, alignment=2, textColor=BLACK),
}

W = A4[0] - 2 * 1.6 * cm - 12  # largeur utile (padding du frame : 6pt de chaque côté)


def link(text, url):
    return f'<a href="{url}" color="#0b66c2">{text}</a>' if url else text


def section(title):
    return [Paragraph(title, st["h"]),
            HRFlowable(width="100%", thickness=0.6, color=BLUE, spaceBefore=1, spaceAfter=4)]


def row(left, right, lw=0.68):
    t = Table([[left, right]], colWidths=[W * lw, W * (1 - lw)])
    t.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "BOTTOM"),
                           ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                           ("TOPPADDING", (0, 0), (-1, -1), 0), ("BOTTOMPADDING", (0, 0), (-1, -1), 0)]))
    return t


def bullets(items):
    return [Paragraph(f"—&nbsp;&nbsp;{b}", st["item"]) for b in items]


def build():
    story = [
        Paragraph(NAME, st["name"]),
        Spacer(1, 2),
        Paragraph("&nbsp;&nbsp;•&nbsp;&nbsp;".join(link(t, u) for t, u in CONTACT), st["contact"]),
        Paragraph("&nbsp;&nbsp;•&nbsp;&nbsp;".join(link(t, u) for t, u in LINKS), st["contact"]),
        Spacer(1, 8),
    ]
    band = Table([[Paragraph(TITLE, st["band"])], [Paragraph(SUBTITLE, st["bandsub"])]], colWidths=[W])
    band.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), BLUE),
                              ("TOPPADDING", (0, 0), (-1, 0), 4), ("BOTTOMPADDING", (0, -1), (-1, -1), 4),
                              ("TOPPADDING", (0, 1), (-1, 1), 0), ("BOTTOMPADDING", (0, 0), (-1, 0), 1)]))
    story += [band, Spacer(1, 2)]

    story += section("Profil") + [Paragraph(PROFILE, st["body"])]

    story += section("Compétences Techniques")
    cells = [Paragraph(f"—&nbsp;&nbsp;<b>{k} :</b> {v}", st["item"]) for k, v in SKILLS]
    half = (len(cells) + 1) // 2
    grid = Table([[cells[i], cells[i + half] if i + half < len(cells) else ""] for i in range(half)],
                 colWidths=[W / 2, W / 2])
    grid.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"),
                              ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                              ("TOPPADDING", (0, 0), (-1, -1), 0), ("BOTTOMPADDING", (0, 0), (-1, -1), 1)]))
    story.append(grid)

    story += section("Projets &amp; Réalisations")
    for p in PROJECTS:
        links = "&nbsp;&nbsp;•&nbsp;&nbsp;".join(link(t, u) for t, u in p["links"])
        story.append(KeepTogether([row(Paragraph(p["title"], st["bold"]), Paragraph(links, st["right"]), 0.55),
                                   Paragraph(p["stack"], st["stack"]), *bullets(p["bullets"]), Spacer(1, 3)]))

    story += section("Expériences Professionnelles")
    for e in EXPERIENCES:
        left = Paragraph(f"<b>{e['title']}</b> — {e['org']}", ParagraphStyle("l", parent=st["body"], alignment=0))
        story.append(KeepTogether([row(left, Paragraph(e["period"], st["date"])), *bullets(e["bullets"]), Spacer(1, 4)]))

    story += section("Formation")
    for title, org, period, detail in EDUCATION:
        left = Paragraph(f"<b>{title}</b> — {org}", ParagraphStyle("l", parent=st["body"], alignment=0))
        story += [row(left, Paragraph(period, st["date"])), Paragraph(detail, st["body"]), Spacer(1, 2)]

    story += section("Langues, Soft Skills &amp; Intérêts") + bullets([
        LANGUAGES, f"<b>Soft skills :</b> {SOFT_SKILLS}", INTERESTS])

    OUT.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(str(OUT), pagesize=A4, leftMargin=1.6 * cm, rightMargin=1.6 * cm,
                            topMargin=1.2 * cm, bottomMargin=1.0 * cm,
                            title="CV Brel NOSSE", author="Brel NOSSE")
    doc.build(story)
    print(f"CV généré : {OUT}")


if __name__ == "__main__":
    build()
