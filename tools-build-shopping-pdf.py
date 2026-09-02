"""Build the printable science shopping list from the live curriculum data.

Reads /tmp/shopping.json, which is exported straight out of
curriculum/science-shopping.js — so this document can never disagree with what
the labs actually need. Re-run the export and this script to refresh it.
"""
import json
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.platypus import (SimpleDocTemplate, Paragraph, Spacer, Table,
                                TableStyle, KeepTogether)
from reportlab.graphics.shapes import Drawing, Rect


def checkbox(size=8):
    """A fixed-size tickbox.

    Not the Unicode box character: Helvetica has no U+25A1, so it prints as a
    solid black square. Not a table BOX style either, since that stretches to
    the row height and gives tall rectangles on two-line rows. A drawn Rect is
    the same square everywhere regardless of the row around it.
    """
    d = Drawing(size, size)
    d.add(Rect(0, 0, size, size, strokeColor=SOFT, strokeWidth=0.7,
               fillColor=colors.white))
    return d

D = json.load(open("/tmp/shopping.json"))

INK   = colors.HexColor("#22332C")
SOFT  = colors.HexColor("#5B7268")
DEEP  = colors.HexColor("#2E7D6B")
CLAY  = colors.HexColor("#B5651D")
RULE  = colors.HexColor("#C3D6C8")
BAND  = colors.HexColor("#EDF4EE")

def S(name, size, leading, colour=INK, space_before=0, space_after=0, bold=False):
    return ParagraphStyle(name, fontName="Helvetica-Bold" if bold else "Helvetica",
                          fontSize=size, leading=leading, textColor=colour,
                          spaceBefore=space_before, spaceAfter=space_after,
                          alignment=TA_LEFT)

title   = S("t", 20, 24, INK, 0, 2, True)
sub     = S("s", 9.5, 13, SOFT, 0, 10)
h2      = S("h2", 12.5, 15, DEEP, 14, 5, True)
body    = S("b", 9.5, 13, INK, 0, 4)
small   = S("sm", 8.3, 11, SOFT)
itemtxt = S("i", 9.6, 12.5, INK)
notetxt = S("n", 8, 11, SOFT)
monthtx = S("m", 9.6, 12.5, DEEP, 0, 0, True)

doc = SimpleDocTemplate(
    "/mnt/user-data/outputs/Science-Shopping-List.pdf",
    pagesize=LETTER,
    leftMargin=0.65*inch, rightMargin=0.65*inch,
    topMargin=0.6*inch, bottomMargin=0.6*inch,
    title="Field Notes — Science Shopping List",
    author="Baskin School",
)

story = []
story.append(Paragraph("Science Shopping List", title))
story.append(Paragraph(
    "Field Notes &middot; Georgia Standards of Excellence &middot; Brock (3rd) and Hank (5th)<br/>"
    "School year %s &ndash; %s &middot; %d items across the year"
    % (D["firstDay"], D["yearEnd"], len(D["items"])), sub))

story.append(Paragraph(
    "One list for both boys. Tick items off as you buy them. Reusable things are listed "
    "only in the month they are first needed, with the later weeks noted so nothing gets "
    "thrown out early &mdash; consumables are listed each time they are used up.", body))

# ---- the main list, grouped by month but running continuously ---------------
rows = [[Paragraph("<b>Month</b>", small), "",
         Paragraph("<b>Item</b>", small), Paragraph("<b>Who &middot; week</b>", small)]]
style_cmds = [
    ("VALIGN", (0,0), (-1,-1), "TOP"),
    ("LINEBELOW", (0,0), (-1,0), 0.75, RULE),
    ("TOPPADDING", (0,0), (-1,-1), 3),
    ("BOTTOMPADDING", (0,0), (-1,-1), 3),
    ("LEFTPADDING", (0,0), (-1,-1), 2),
]

last = None
for i, it in enumerate(D["items"], start=1):
    new_month = it["monthShort"] != last
    last = it["monthShort"]
    who = "both" if len(it["who"]) == 2 else it["who"][0].title()
    note = "%s &middot; wk %s" % (who, ", ".join(str(w) for w in it["weeks"]))
    if it["alsoWeeks"]:
        note += "<br/>again wk %s" % ", ".join(str(w) for w in it["alsoWeeks"])
    rows.append([
        Paragraph(it["monthShort"] if new_month else "", monthtx),
        checkbox(),
        Paragraph(it["name"], itemtxt),
        Paragraph(note, notetxt),
    ])
    if new_month and i > 1:
        style_cmds.append(("LINEABOVE", (0, len(rows)-1), (-1, len(rows)-1), 0.6, RULE))
    if new_month:
        style_cmds.append(("BACKGROUND", (0, len(rows)-1), (-1, len(rows)-1), BAND))
    style_cmds.append(("TOPPADDING", (1, len(rows)-1), (1, len(rows)-1), 4))

t = Table(rows, colWidths=[0.85*inch, 0.22*inch, 3.18*inch, 2.05*inch], repeatRows=1)
t.setStyle(TableStyle(style_cmds))
story.append(Spacer(1, 6))
story.append(t)

# ---- order ahead -----------------------------------------------------------
story.append(Paragraph("Worth ordering ahead", h2))
story.append(Paragraph(
    "Least likely to be in a local shop. Order these with the first trip rather than "
    "discovering them missing mid-year.", body))
oa = [[checkbox(), Paragraph(x, itemtxt)] for x in D["orderAhead"]]
t2 = Table(oa, colWidths=[0.22*inch, 6.08*inch])
t2.setStyle(TableStyle([("TOPPADDING",(0,0),(-1,-1),3),("BOTTOMPADDING",(0,0),(-1,-1),3),
                        ("LEFTPADDING",(0,0),(-1,-1),2),("VALIGN",(0,0),(-1,-1),"TOP")]))
story.append(t2)

# ---- staples ---------------------------------------------------------------
story.append(Paragraph("Check the cupboard once", h2))
story.append(Paragraph(
    "The labs assume these are already around the house. They are listed once for the "
    "whole year rather than repeated every month. Anything missing is worth picking up "
    "with the first shop.", body))
story.append(Paragraph(", ".join(D["staples"]) + ".", small))

# ---- month summary ---------------------------------------------------------
story.append(Paragraph("At a glance", h2))
msum = [[Paragraph("<b>Shop</b>", small), Paragraph("<b>Covers</b>", small),
         Paragraph("<b>Items</b>", small)]]
for m in D["months"]:
    label = m["label"] + ((" (incl. %s)" % m["mergedFrom"]) if m["mergedFrom"] else "")
    msum.append([Paragraph(label, itemtxt),
                 Paragraph("weeks %s" % ", ".join(str(w) for w in m["weeks"]), notetxt),
                 Paragraph(str(m["count"]), itemtxt)])
t3 = Table(msum, colWidths=[2.9*inch, 2.6*inch, 0.8*inch])
t3.setStyle(TableStyle([
    ("VALIGN",(0,0),(-1,-1),"TOP"),
    ("LINEBELOW",(0,0),(-1,0),0.75,RULE),
    ("TOPPADDING",(0,0),(-1,-1),3),("BOTTOMPADDING",(0,0),(-1,-1),3),
    ("LEFTPADDING",(0,0),(-1,-1),2),
]))
story.append(t3)

def footer(canvas, docu):
    canvas.saveState()
    canvas.setFont("Helvetica", 7.5)
    canvas.setFillColor(SOFT)
    canvas.drawString(0.65*inch, 0.38*inch, "Baskin School  \u00b7  Field Notes science supplies")
    canvas.drawRightString(LETTER[0]-0.65*inch, 0.38*inch, "Page %d" % docu.page)
    canvas.restoreState()

doc.build(story, onFirstPage=footer, onLaterPages=footer)
print("built /mnt/user-data/outputs/Science-Shopping-List.pdf")
