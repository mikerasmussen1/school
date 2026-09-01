/* Japan history unit. The content lives in japan.dc.html — a separate page with
 * its own illustrations, itinerary links and tappable vocabulary — so this file
 * only puts it on the landing page and hands the child over to it.
 * Discussion-based: nothing here is graded. */
(function(){
  window.Subjects.register({
    id: "japan",
    name: "The Japan Unit",
    tagline: "日本 · History & Culture",
    color: "#E8503A",
    glyph: "日",
    gradient: "linear-gradient(150deg,#E8503A,#F59E0B)",
    blurb: "Sixteen lessons across eight weeks, tied to the places on the itinerary. Read it together and talk about it — nothing is graded.",
    status: "live",
    order: 30,
    open: {href:"japan.dc.html"}
  });
})();
