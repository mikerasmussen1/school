/* ============================================================================
 * WORD VOYAGERS — THE DAILY LESSON
 * ----------------------------------------------------------------------------
 * One passage a week, read again each day for a different purpose. Each day is
 * laid out in the order a lesson is actually done:
 *
 *   LESSON      what today is about, named
 *   LOOK FOR    what to watch for, given BEFORE the passage rather than after.
 *               A purpose stated afterwards is not a purpose, it is a quiz. A
 *               child who knows what he is hunting reads differently.
 *   the passage
 *   NOTEBOOK    numbered tasks, written the same way every day
 *   FOR PARENTS what to check when the notebook comes to you
 *
 * WHY THE NOTEBOOK TASKS ARE NUMBERED AND IDENTICAL IN SHAPE. A notebook is
 * only a record if it can be read back. "Write about the passage" produces a
 * page nobody can check six weeks later; a dated entry with Task 1, Task 2 and
 * Task 3 produces a page a parent can open at any point in the year and
 * follow. The date line is the same every day for the same reason: it is what
 * makes the book a chronology rather than a pile.
 *
 * TASK 3 IS ALWAYS THE SELF-CHECK, both grades, all five days. It is last
 * because it is done last, and it is a numbered task rather than a footnote
 * because a child skips notes and does tasks.
 *
 * FORMAT  day: {lesson, look:[...], tasks:[...], parent}
 * ==========================================================================*/
(function(){

  /* The line that opens every notebook entry, in both grades. Identical
   * every day so it becomes automatic.
   *
   * It asks for TODAY'S date, the day the work is actually done, and gives the
   * format rather than an example. Word Voyagers is self-paced: no lesson has
   * a scheduled date, so the notebook records when each entry was written.
   * (It once showed "like this: September 14, 2026" on every lesson, and then
   * a scheduled date per lesson; both implied a pace the course does not set.) */
  const DATE_LINE = "Write today's date at the top in this format: Month Day, Year";
  /* Fifth grade has its own wording, with the weekday and a worked example.
   * The example date is fixed on purpose: it shows the format, and it is a
   * date that matters to the family, not a lesson date. */
  const DATE_LINE_Y2 = "Write today's date in your notebook following this format: Weekday, Month, Day, Year.  Example: Saturday, March 5, 2016 (one of the best days of Nana's life!)";
  function dateLineFor(grade){ return grade === "y2" ? DATE_LINE_Y2 : DATE_LINE; }

  /* Third grade. Concrete purposes, short written tasks. */
  const Y1 = {
    Mon: {
      lesson: "What the passage actually says",
      look: ["You already know the story, so this time read for the facts.",
             "Watch for the sentences that carry the important events.",
             "Notice any sentence you could not leave out without losing the story."],
      tasks: ["Copy out the ONE sentence you think matters most in the whole passage. Copy it exactly, with its punctuation.",
              "Write one sentence saying why you chose it.",
              "Check your work: did I use my best handwriting, and did I copy every mark of punctuation correctly?"],
      parent: "Task 1 should be copied exactly \u2014 check it against the passage word for word, including the full stop. Task 2 should give a reason, not repeat the sentence in different words. If he has written \u201cbecause it is important\u201d, ask what it tells you that the other sentences do not."
    },
    Tue: {
      lesson: "Words you had to work out",
      look: ["Find two words you were not certain of.",
             "Do not look them up. Read the sentence before and the sentence after.",
             "Watch for the words nearby that hint at the meaning."],
      tasks: ["Write the two words, one under the other.",
              "Under each word, write what you think it means, then the words from the passage that made you think so.",
              "Check your work: did I use my best handwriting, and did I use the passage rather than a guess?"],
      parent: "The meaning does not have to be right. What matters is the evidence in Task 2: it must come from the passage and he must be able to point at it. A guess dressed up as a definition is the thing to catch."
    },
    Wed: {
      lesson: "What the passage shows without saying",
      look: ["Look for something the passage lets you know but never states.",
             "It might be about a person, or about why something happened.",
             "Watch for what people do, not what they say about themselves."],
      tasks: ["Write: I can tell that ___ because the passage says ___.",
              "Copy the part after \u201csays\u201d exactly, with its punctuation.",
              "Check your work: did I use my best handwriting, and is my evidence really in the passage?"],
      parent: "Check the quoted half against the passage. The common mistake is evidence that is nearly there \u2014 remembered rather than copied. Ask him to show you the line."
    },
    Thu: {
      lesson: "Why the writer put that there",
      look: ["Find one small detail: a word, an object, something someone does.",
             "Choose one the passage would be worse without.",
             "Watch for details that seem small but change how you feel about someone."],
      tasks: ["Name the detail in a few words.",
              "Write one sentence saying what it does for the passage \u2014 what would be lost if it were cut.",
              "Check your work: did I use my best handwriting, and did I say what the detail DOES rather than just describe it?"],
      parent: "Task 2 is the whole exercise. Describing the detail again is the easy mistake; saying what it does for the reader is the skill. \u201cIt shows he was poor\u201d is doing the work. \u201cIt was a brown coat\u201d is not."
    },
    Fri: {
      lesson: "What the passage is really about",
      look: ["Think past what happens in the passage.",
             "Ask what it is saying about people, or about doing the right thing.",
             "Watch for a line that carries the whole idea."],
      tasks: ["Write what the passage is really about in one sentence \u2014 not what happens in it.",
              "Copy one line from the passage that shows it.",
              "Check your work: did I use my best handwriting, and is my sentence about an idea rather than about the plot?"],
      parent: "Task 1 should be a statement about people or about right and wrong, not a summary. If it begins \u201cA boy fed some chickens\u201d, that is a retelling \u2014 ask him what the story is saying."
    }
  };

  /* Fifth grade. The same five purposes, asking for comparison, structure and
   * the argument against. */
  const Y2 = {
    Mon: {
      lesson: "Stated and unstated",
      look: ["Separate two things as you read: what the passage states outright, and what it only lets you infer.",
             "Watch for sentences you believe but cannot point to.",
             "Those are inferences, and they are the ones to test."],
      tasks: ["Write one thing the passage STATES, with the sentence quoted exactly.",
              "Write one thing you INFER, with the sentence that supports it, and one line on why it is an inference and not a statement.",
              "Check your work: did I use my best handwriting, and have I kept the two genuinely apart?"],
      parent: "The test is the last line of Task 2. He should be able to say why the text does not state his inference outright. If he cannot, he has quoted a statement and called it an inference."
    },
    Tue: {
      lesson: "The writer's word choices",
      look: ["Find two words or phrases where a plainer one would have done.",
             "Ask what the writer's choice adds that the plain word would not.",
             "Watch for words that carry a feeling as well as a meaning."],
      tasks: ["Quote the two phrases, one under the other.",
              "Under each, name the plainer word that could have replaced it, then write one sentence on what is gained or lost by the choice.",
              "Check your work: did I use my best handwriting, and am I writing about the EFFECT of the word rather than its meaning?"],
      parent: "Meaning and effect are different, and the second is the exercise. \u201cTrudged means walked slowly\u201d is a definition. \u201cTrudged makes him sound worn out\u201d is the answer."
    },
    Wed: {
      lesson: "The strongest evidence",
      look: ["Decide what the passage is arguing or showing.",
             "Find the line that supports it best, and the line that supports it most weakly.",
             "Watch for what someone who disagreed would seize on."],
      tasks: ["Quote the strongest line and the weakest line, each labelled.",
              "Write one sentence on why the strong one is stronger, then one sentence on what someone who disagreed with the passage would point at.",
              "Check your work: did I use my best handwriting, and did I find the STRONGEST line rather than the first one?"],
      parent: "The second half of Task 2 is the one to read closely. Taking the opposing point seriously, rather than dismissing it, is the habit being built and it is rare at this age."
    },
    Thu: {
      lesson: "How the passage is built",
      look: ["Look at the order of it: what comes first, what is held back.",
             "Find the point where it turns \u2014 the sentence after which it is doing something different.",
             "A writer who saves something for the end wants it to land there."],
      tasks: ["Describe the shape of the passage in two or three sentences.",
              "Name the place where it turns, and write one sentence on what the turn does.",
              "Check your work: did I use my best handwriting, and am I describing the STRUCTURE rather than retelling the content?"],
      parent: "Retelling is the easy mistake and it looks like work. If the entry could have been written by someone who only skimmed the passage in order, it is a summary, not a structure."
    },
    Fri: {
      lesson: "Theme, and the case against it",
      look: ["Work out what the passage says about life, not what happens in it.",
             "Then test it: is there anything in the passage that resists that reading?",
             "Watch for the detail that does not fit neatly."],
      tasks: ["State the theme in one sentence, then quote a line that supports it.",
              "Write one sentence on anything in the passage that complicates or does not fit that theme.",
              "Check your work: did I use my best handwriting, and is my theme a claim about life rather than a summary?"],
      parent: "Task 2 is where an honest reader shows. \u201cNothing\u201d is almost never true and usually means he did not look. Ask him for the hardest line to fit."
    }
  };

  const ORDER = ["Mon","Tue","Wed","Thu","Fri"];

  function lessonFor(grade, day){
    const bank = (grade==="y2") ? Y2 : Y1;
    return bank[day] || bank.Mon;
  }

  /* Kept for anything still using the old shape. */
  function closeFor(grade, day){
    const L = lessonFor(grade, day);
    return {focus:L.lesson, look:L.look.join(" "), write:L.tasks.join(" "), check:L.tasks[2]};
  }

  /* Roughly how long each part of a day should take, in minutes.
   *
   * These are estimates, not measurements, and they are here so the page can
   * show a child what he is in for rather than to be precise. They were set by
   * adding up the parts: a 200-word passage read aloud is about two minutes, a
   * multiple-choice item about forty seconds, and a hand-written paragraph
   * about eight. The day totals near thirty. A child who is quick will finish
   * sooner and that is fine — the number is a guide, not a quota. */
  const MINUTES = {
    quote: 2, fix: 3, close: 12, read: 3, rq: 4, skill: 3, gz: 5,
    study: 4, sq: 5, prompt: 3, write: 9, approve: 2, speak: 8, rv: 4, end: 1
  };

  function minutesFor(key){ return MINUTES[key] || 3; }

  function dayMinutes(steps){
    return (steps||[]).reduce(function(n,s){ return n + minutesFor(s.key); }, 0);
  }

  window.__CURR = window.__CURR || {};
  window.__CURR.LA_CLOSE = {
    Y1, Y2, ORDER, DATE_LINE, DATE_LINE_Y2, dateLineFor, lessonFor, closeFor, MINUTES, minutesFor, dayMinutes
  };
})();
