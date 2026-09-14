/* ============================================================================
 * WORD VOYAGERS — CLOSE READING, EVERY DAY
 * ----------------------------------------------------------------------------
 * Comprehension used to happen on Monday and nowhere else. Four days of the
 * week touched the passage not at all, and a day ran ten or twelve minutes.
 * This adds a close-reading step to every day: the same passage, read again
 * for a different purpose, finishing in a written claim backed by a line from
 * the text.
 *
 * WHY RE-READING THE SAME PASSAGE RATHER THAN FIVE NEW ONES. Re-reading with a
 * stated purpose is the practice comprehension research keeps landing on, and
 * it is what a strong reader does naturally: the first pass is for the story,
 * and every pass after it is for something. A new passage each day would give
 * five first passes and no second ones, which trains speed rather than
 * understanding.
 *
 * It is also honest about what could be built well. Five new passages a week
 * across two grades is 360 passages; five purposes written carefully is ten
 * frames. The frames are reusable because the QUESTION is the constant and the
 * passage is the variable, which is the right way round.
 *
 * THE WRITING IS NOT MACHINE-GRADED, deliberately. A claim supported by
 * evidence cannot be marked by matching strings, and pretending otherwise
 * would teach a child to write for the matcher. It is written by hand and a
 * grown-up reads it. Each day carries a self-check so most of what would be
 * corrected, the child corrects first.
 *
 * FORMAT  day: {focus, look, write, check}
 * ==========================================================================*/
(function(){

  /* Third grade. The purposes are concrete and the written task is short —
   * one or two sentences with a line copied out to support them. */
  const Y1 = {
    Mon: {
      focus: "What it actually says",
      look:  "Read it again slowly. This time you are not reading for the story \u2014 you already know it. Find the three sentences that tell you the most important things that happen.",
      write: "Copy out the ONE sentence you think matters most in the whole passage. Underneath, write one sentence saying why you chose it.",
      check: "Did I copy the sentence exactly, with its punctuation? Did I say why, and not just say it again?"
    },
    Tue: {
      focus: "Words you had to work out",
      look:  "Find two words you were not certain of. Do not look them up. Read the sentence before and after each one and see what the passage itself tells you.",
      write: "For each word: write the word, then what you think it means, then the words in the passage that made you think so.",
      check: "Did I use the passage to work it out, rather than a guess? Did I point at the actual words that helped?"
    },
    Wed: {
      focus: "What it shows without saying",
      look:  "Find one thing the passage lets you know that it never states outright \u2014 about a person, or why something happened.",
      write: "Write: 'I can tell that ___ because the passage says ___.' Copy the part after 'says' exactly.",
      check: "Is my evidence really in the passage? Would someone else reading it agree with me?"
    },
    Thu: {
      focus: "Why the writer put that there",
      look:  "Find one small detail \u2014 a word, an object, something someone does \u2014 that the passage would be worse without.",
      write: "Name the detail, then write one sentence saying what it does for the passage. What would be lost if it were cut?",
      check: "Did I say what the detail DOES, rather than just describe it again?"
    },
    Fri: {
      focus: "What it is really about",
      look:  "Think past what happens. What is this passage saying about people, or about doing the right thing?",
      write: "Write what the passage is really about in one sentence \u2014 not what happens in it. Then copy one line that shows it.",
      check: "Is my sentence about an idea rather than a plot? Does my line actually show that idea?"
    }
  };

  /* Fifth grade. Same five purposes, pitched harder: the tasks ask for
   * comparison, structure, and the argument against. */
  const Y2 = {
    Mon: {
      focus: "Stated and unstated",
      look:  "Read it again and separate the two: what the passage states outright, and what it only lets you infer.",
      write: "Write two lines. One: something the passage states, with the sentence quoted. Two: something you infer, with the sentence that supports the inference and a note on why it is an inference and not a statement.",
      check: "Have I kept the two genuinely apart? Could I defend calling the second one an inference?"
    },
    Tue: {
      focus: "The writer's word choices",
      look:  "Find two words or phrases the writer chose where a plainer one would have done. Ask what the choice adds.",
      write: "For each: quote the phrase, name the plainer word that could have replaced it, and write one sentence on what is gained or lost by the choice.",
      check: "Am I writing about the effect of the word, or only its meaning? Those are different things."
    },
    Wed: {
      focus: "The strongest evidence",
      look:  "Decide what the passage is arguing or showing. Then find the line that supports it best \u2014 and the line that supports it most weakly.",
      write: "Quote both. Write one sentence on why the strong one is stronger. Then write what someone who disagreed with the passage would point at.",
      check: "Did I find the strongest line or just the first one? Did I take the opposing point seriously?"
    },
    Thu: {
      focus: "How it is built",
      look:  "Look at the order of it. What comes first, what is held back, where does it turn? A writer who saves something for the end wants it to land there.",
      write: "Describe the shape of the passage in two or three sentences. Name the place where it turns, and say what the turn does.",
      check: "Am I describing the structure, or retelling the content? Retelling is the easier mistake."
    },
    Fri: {
      focus: "Theme, and the case against it",
      look:  "Work out what the passage says about life, not what happens in it. Then test it: is there anything in the passage that complicates or resists that reading?",
      write: "State the theme in one sentence. Support it with a quoted line. Then write one sentence on anything in the passage that does not fit neatly.",
      check: "Is my theme a claim about life rather than a summary? Did I look honestly for what resists it?"
    }
  };

  const ORDER = ["Mon","Tue","Wed","Thu","Fri"];

  function closeFor(grade, day){
    const bank = (grade==="y2") ? Y2 : Y1;
    return bank[day] || bank.Mon;
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
  window.__CURR.LA_CLOSE = {Y1, Y2, ORDER, closeFor, MINUTES, minutesFor, dayMinutes};
})();
