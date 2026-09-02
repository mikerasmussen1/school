/* ============================================================================
 * WORD VOYAGERS — THE YEAR'S BOOK LIST
 * ----------------------------------------------------------------------------
 * One read-aloud per unit (nine across the year, roughly a month each), plus
 * independent readers grouped by category and a shelf of faith-and-character
 * titles. Lexile figures are approximate and drawn from publisher listings;
 * treat them as a guide, not a gate. The year's target band is roughly
 * 420–820L, so several read-alouds sit deliberately ABOVE it — a read-aloud
 * should be harder than what a child reads alone, because you are there.
 *
 * A NOTE ON HOW THIS LIST WAS PICKED, since it matters to the family using it:
 * these are books that treat faith as ordinary and good, and that reward being
 * read closely. Several are explicitly Christian. Others are classic or
 * modern literature whose virtues line up with biblical ones — those are
 * marked `discuss` where a passage is worth talking about rather than skipping.
 * Preview anything you have not read. Families draw lines differently, and
 * this list is a starting point for your judgment, not a substitute for it.
 * ==========================================================================*/
(function(){

  /* One per unit — the spine's nine units, in order. */
  const READ_ALOUDS = [
    {unit:1, title:"The Lion, the Witch and the Wardrobe", author:"C.S. Lewis", lexile:"940L",
     why:"Sacrifice and redemption told as adventure. Aslan's death and return is the year's first big conversation.",
     discuss:"Edmund's betrayal and its cost — worth pausing on rather than rushing past."},
    {unit:2, title:"The Boxcar Children", author:"Gertrude Chandler Warner", lexile:"490L",
     why:"Four siblings build order out of nothing with resourcefulness and care for each other. Pairs directly with Unit 2's stewardship theme.",
     discuss:""},
    {unit:3, title:"Sarah, Plain and Tall", author:"Patricia MacLachlan", lexile:"560L",
     why:"Quiet courage — a woman leaves everything familiar for an uncertain family. Short enough to finish in a month.",
     discuss:"The children's fear that Sarah will leave; good ground for talking about trust."},
    {unit:4, title:"Charlotte's Web", author:"E.B. White", lexile:"680L",
     why:"Patient, careful work on someone else's behalf — Charlotte spins all night for a pig who can give her nothing back.",
     discuss:"Charlotte's death. Do not skip it; it is the point of the book."},
    {unit:5, title:"The Hundred Dresses", author:"Eleanor Estes", lexile:"870L",
     why:"Honesty about our own silence. The narrator is not the bully — she is the one who said nothing, which lands harder.",
     discuss:"Wanda's family leaving town; the apology that arrives too late."},
    {unit:6, title:"Little House in the Big Woods", author:"Laura Ingalls Wilder", lexile:"930L",
     why:"Belonging, family work, gratitude through a hard winter. Read a chapter a night.",
     discuss:"Period attitudes appear in this series; read ahead and talk about them plainly."},
    {unit:7, title:"Frindle", author:"Andrew Clements", lexile:"830L",
     why:"A boy invents a word and discovers how language actually works — the perfect fit for the roots-and-words unit.",
     discuss:""},
    {unit:8, title:"The Tale of Despereaux", author:"Kate DiCamillo", lexile:"670L",
     why:"A story that constantly means more than it says, with a narrator who speaks directly to the reader about it.",
     discuss:"Chiaroscuro's cruelty and Miggery Sow's treatment; darker than it first appears."},
    {unit:9, title:"Because of Winn-Dixie", author:"Kate DiCamillo", lexile:"610L",
     why:"A girl gathers other people's stories and learns to tell her own — exactly what Unit 9 asks the child to do.",
     discuss:"Opal's mother's absence and alcoholism, handled gently but present."}
  ];

  const INDEPENDENT = [
    {title:"The Sugar Creek Gang series", author:"Paul Hutchens", lexile:"600L", cat:"Adventure with a Christian worldview",
     why:"Boys navigating friendship and right-from-wrong, with faith woven into ordinary adventure rather than bolted on."},
    {title:"Adventures in Odyssey chapter books", author:"Focus on the Family", lexile:"600L", cat:"Adventure with a Christian worldview",
     why:"Everyday moral choices through a biblical lens, in a voice children already know from the audio series."},
    {title:"The Imagination Station series", author:"Marianne Hering et al.", lexile:"550L", cat:"Adventure with a Christian worldview",
     why:"Time-travel history with real events and a faith frame; good for a reluctant reader who likes plot."},
    {title:"Mr. Popper's Penguins", author:"Richard & Florence Atwater", lexile:"910L", cat:"Humor and classics",
     why:"Kindness and responsibility played for laughs. Good for building stamina between heavier titles."},
    {title:"The Mouse and the Motorcycle", author:"Beverly Cleary", lexile:"860L", cat:"Humor and classics",
     why:"Friendship and courage at mouse scale; a reliable win for a child who says they do not like books."},
    {title:"My Father's Dragon", author:"Ruth Stiles Gannett", lexile:"990L", cat:"Humor and classics",
     why:"Cleverness and kindness solving problems instead of force. Short chapters, high success rate."},
    {title:"Encyclopedia Brown series", author:"Donald J. Sobol", lexile:"550L", cat:"Thinking and evidence",
     why:"Each case is a small evidence-sorting exercise — a natural companion to Unit 9's research work."},
    {title:"Who Was...? biography series", author:"various", lexile:"700L", cat:"Thinking and evidence",
     why:"Accessible nonfiction for the informational-text half of the standard. Pick the subjects your child asks about."},
    {title:"Magic Tree House Fact Trackers", author:"Mary Pope Osborne & Natalie Boyce", lexile:"650L", cat:"Thinking and evidence",
     why:"Nonfiction companions with real research habits modeled — headings, indexes, sources."},
    {title:"Little Pilgrim's Progress", author:"Helen L. Taylor", lexile:"780L", cat:"Faith and character",
     why:"Bunyan's allegory retold for children; the whole book is practice at reading for a second meaning."},
    {title:"Christian Heroes: Then & Now series", author:"Janet & Geoff Benge", lexile:"800L", cat:"Faith and character",
     why:"True missionary biographies — Hudson Taylor, George Müller, Gladys Aylward — showing real cost, not tidy endings."},
    {title:"Egermeier's Bible Story Book", author:"Elsie E. Egermeier", lexile:"700L", cat:"Faith and character",
     why:"The full sweep of Scripture at a third-grade reading level; useful alongside the passages in this curriculum."},
    {title:"Leading Little Ones to God", author:"Marian M. Schoolland", lexile:"—", cat:"Faith and character",
     why:"Short doctrinal readings with discussion questions; five minutes at breakfast."},
    {title:"The Year of Miss Agnes", author:"Kirkpatrick Hill", lexile:"820L", cat:"Stretch reads",
     why:"A one-room Alaskan school and a teacher who changes it. Sits right at the top of the year's band."},
    {title:"Stone Fox", author:"John Reynolds Gardiner", lexile:"610L", cat:"Stretch reads",
     why:"Short, fierce, and genuinely sad at the end. Read it when your child is ready to be moved by a book."},
    {title:"The Chronicles of Narnia (remaining volumes)", author:"C.S. Lewis", lexile:"870L", cat:"Stretch reads",
     why:"If the Unit 1 read-aloud lands, the rest of the series is the natural place for the year's independent reading to go."}
  ];

  window.__CURR = window.__CURR || {};
  window.__CURR.LA_Y1 = Object.assign(window.__CURR.LA_Y1||{}, {READ_ALOUDS, INDEPENDENT});
})();
