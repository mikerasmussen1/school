/* ============================================================================
 * WORD VOYAGERS — THE NOTEBOOK CHALLENGE
 * ----------------------------------------------------------------------------
 * Each day names TWO specific sentences from that week's passage and asks the
 * child to decide between them. He copies his choice into the notebook and
 * answers one critical-thinking question about it.
 *
 * WHY THIS REPLACED THE OLD FRAMES. The previous tasks said things like "find
 * one thing the passage lets you know but never states". That is a fair
 * exercise in the abstract and a bad one in practice: it assumes every passage
 * contains such a sentence. The ice-core passage was asked for a sentence that
 * contradicted its main idea, and no sentence in it does. A child hunting for
 * something that is not there learns nothing except that the work is
 * arbitrary.
 *
 * Naming both candidates fixes that. The answer is guaranteed to exist, the
 * choice is real, and a parent can check it in ten seconds because there are
 * only two possibilities and one of them is right.
 *
 * SENTENCES ARE STORED AS TEXT, NOT AS INDEXES. Splitting a passage into
 * sentences is unreliable here: "Caleb promised his neighbour, Mr. Hollis"
 * splits at the full stop after Mr. and becomes two sentences. Storing the
 * text means the data says exactly what it means, and the test asserts every
 * quoted sentence appears verbatim in its passage — so if a passage is ever
 * edited, the check fails loudly instead of the task quietly pointing at
 * nothing.
 *
 * WHAT GOES IN THE NOTEBOOK, and only this:
 *   1  the date
 *   2  the chosen challenge sentence, copied neatly
 *   3  the answer to one critical-thinking question tied to the day's lesson
 *
 * General comprehension stays in the digital drill, where it is marked
 * automatically. A notebook full of questions a computer could have marked is
 * a waste of handwriting.
 *
 * FORMAT  grade: { week: { day: {a, b, pick, ask, think} } }
 *   a, b    the two candidate sentences, verbatim from the passage
 *   pick    "a" or "b" — the one to copy out
 *   ask     the decision, worded for the day's lesson
 *   think   the critical-thinking question, specific to this passage
 * ==========================================================================*/
(function(){

  const Y1 = {
    1: {
      Mon: {a:"It took eleven minutes.",
            b:"A person who counts the eggs on the day he would rather be somewhere else is not a person you have to ask.",
            pick:"a",
            ask:"One of these is a fact you could check with a clock. The other is a conclusion the writer has drawn. Which is the fact?",
            think:"The writer tells us the exact number of minutes. Why does eleven minutes matter more than saying 'it did not take long'?"},
      Tue: {a:"The chickens came running when they heard the latch, complaining the way they always did.",
            b:"The first morning was easy.",
            pick:"a",
            ask:"Which sentence tells you what 'complaining' means here, without giving you a definition?",
            think:"What does the word 'complaining' tell you about the chickens that 'noisy' would not?"},
      Wed: {a:"He never asked whether Caleb had come every morning.",
            b:"He stood at the end of his driveway for a long moment, listening to the shouting from the direction of the water.",
            pick:"b",
            ask:"Both sentences show you something without saying it. Which one shows you that Caleb was tempted to skip the job?",
            think:"The passage never says Caleb wanted to go to the creek. How do you know he did?"},
      Thu: {a:"The second morning it rained.",
            b:"It took eleven minutes.",
            pick:"b",
            ask:"Which detail would the passage miss more if the writer cut it?",
            think:"What does the writer want you to feel by telling you Caleb timed the job and hoped for a smaller number?"},
      Fri: {a:"He did not have to.",
            b:"A person who counts the eggs on the day he would rather be somewhere else is not a person you have to ask.",
            pick:"b",
            ask:"One of these is about this story. The other is about people in general. Which is about people in general?",
            think:"The last sentence is not about chickens at all. What is it about?"}
    },
    2: {
      Mon: {a:"This order matters.",
            b:"A root pushes downward first, anchoring the plant and drinking from the soil.",
            pick:"b",
            ask:"One of these states what happens. The other tells you the writer's opinion about it. Which states what happens?",
            think:"Using the passage rather than what you already knew, why does the root have to come first?"},
      Tue: {a:"Scientists call this photosynthesis, from Greek words meaning light and putting together.",
            b:"The shoot breaks the surface and opens its first leaves.",
            pick:"a",
            ask:"Which sentence lets you work out what 'photosynthesis' means from the parts of the word?",
            think:"Photosynthesis is built from two Greek words. What would you expect a word beginning with 'photo' to have to do with?"},
      Wed: {a:"A person walking past would say nothing much is happening.",
            b:"For the first year, most of the growing happens underground where no one can see it.",
            pick:"a",
            ask:"Which sentence shows you that people judge by what they can see, without ever saying so?",
            think:"The passage says a passer-by would think nothing is happening. Why would they be wrong?"},
      Thu: {a:"A young oak may stand only a few inches tall while its roots reach several feet down.",
            b:"The seed swells until its hard coat splits open.",
            pick:"a",
            ask:"Which sentence is there to make you picture the difference between what you see and what is really there?",
            think:"Why did the writer choose an oak, a tree people think of as huge, rather than any other plant?"},
      Fri: {a:"What holds a tree up is not the part you admire.",
            b:"That invisible year is what lets the tree stand for a century afterward.",
            pick:"a",
            ask:"Both sentences carry the big idea. Which one is written so that it could be about people as well as trees?",
            think:"The last sentence is not really about trees. What is it saying about work nobody sees?"}
    },
    3: {
      Mon: {a:"An old woman came last.",
            b:"Her clothes were worn thin at the elbows and mended at the hem.",
            pick:"a",
            ask:"One of these tells you plainly what happened. The other gives a detail you must think about. Which tells you plainly what happened?",
            think:"The passage says she came last. Why might the writer have chosen to put her at the end rather than the beginning?"},
      Tue: {a:"The temple courtyard was loud with the clink of coins.",
            b:"The students barely noticed her.",
            pick:"a",
            ask:"Which sentence helps you work out what 'clink' means, from the sound of the word and what is happening?",
            think:"'Clink' is a word that sounds like the thing it describes. Why is that a better choice here than 'noise'?"},
      Wed: {a:"Some paused before they poured, so that the people nearby would turn and look.",
            b:"Then she turned and walked away without looking at anyone.",
            pick:"a",
            ask:"Which sentence shows you that some of the men wanted to be seen giving, without calling them show-offs?",
            think:"The writer never says the rich men were proud. What in the passage lets you decide whether they were?"},
      Thu: {a:"Her clothes were worn thin at the elbows and mended at the hem.",
            b:"But the teacher leaned forward.",
            pick:"a",
            ask:"Which detail is there to tell you how much the woman's gift cost her?",
            think:"What would be lost from the story if the writer had simply said she was poor?"},
      Fri: {a:"They had eyes.",
            b:"\"She gave out of what she needed.",
            pick:"b",
            ask:"Which sentence contains the idea the whole passage is built on?",
            think:"The teacher measures giving differently from the students. What is he measuring?"}
    },
    4: {
      Mon: {a:"The length of the run tells them how far to go \u2014 a longer waggle means a longer trip.",
            b:"So she dances.",
            pick:"a",
            ask:"Which sentence gives you information precise enough to test?",
            think:"Using the passage, how does a bee tell the others how FAR to fly?"},
      Tue: {a:"The other bees crowd around and press their antennae against her body, reading the rhythm by touch, the way a person might read a word by running a finger over it.",
            b:"The hive is completely dark.",
            pick:"a",
            ask:"Which sentence lets you work out what 'antennae' are used for here?",
            think:"The writer compares the bees to a person reading by touch. What does that comparison help you understand?"},
      Wed: {a:"A honeybee that finds a good patch of flowers has a problem.",
            b:"In 1973 he was given a Nobel Prize.",
            pick:"b",
            ask:"Which sentence shows you, without saying so, that von Frisch's discovery was important?",
            think:"The passage never calls the discovery important. How do you know it was?"},
      Thu: {a:"She cannot draw a map or point across the field.",
            b:"The hive is completely dark.",
            pick:"b",
            ask:"Which detail makes the bees' method more impressive, and would be missed if it were cut?",
            think:"Why does it matter to the passage that the hive is dark?"},
      Fri: {a:"He had proven that an insect the size of a fingernail was giving directions, and that the other insects were following them.",
            b:"A scientist named Karl von Frisch spent years watching this before he understood what he was seeing.",
            pick:"a",
            ask:"Which sentence says what the whole passage is really about?",
            think:"What is this passage saying about how small things can do difficult work?"}
    }
  };

  const Y2 = {
    1: {
      Mon: {a:"Brother Anselm had copied manuscripts for thirty-one years, and he had never once, so far as he knew, changed a word on purpose.",
            b:"The novice assigned to him that winter was quick, clever, and impatient.",
            pick:"a",
            ask:"One of these states a fact about a person. The other is the writer's judgement of a person. Which is the statement of fact?",
            think:"Anselm has never changed a word 'so far as he knew'. Why did the writer add those four words?"},
      Tue: {a:"He was, he explained, improving the text.",
            b:"When a sentence repeated itself, he cut the repetition.",
            pick:"a",
            ask:"Which sentence's meaning changes depending on whether you trust the boy's word for it?",
            think:"The boy calls it 'improving'. What word would Anselm have used, and why does the difference matter?"},
      Wed: {a:"Anselm set down his pen.",
            b:"That is honest.",
            pick:"a",
            ask:"Which sentence shows you Anselm's reaction without describing how he felt?",
            think:"Anselm puts down his pen before he speaks. What does that tell you that a description of his anger would not?"},
      Thu: {a:"In the margin, in small careful letters, he wrote his first note \u2014 and signed it.",
            b:"The boy recopied the page.",
            pick:"a",
            ask:"Which sentence is placed last because the writer wanted it to land there?",
            think:"Why does the story end with the boy signing his name rather than with him being corrected?"},
      Fri: {a:"If you believe a line is wrong, you may write a note in the margin and sign your name to it.",
            b:"\"Whose book is this?\" he asked.",
            pick:"a",
            ask:"Which sentence contains the rule the whole passage is arguing for?",
            think:"Anselm allows the boy to disagree, but only in one particular way. What is the difference between that and what the boy did?"}
    },
    2: {
      Mon: {a:"The longest cores recovered so far stretch back roughly 800,000 years, covering eight complete ice-age cycles.",
            b:"That match is a kind of proof.",
            pick:"a",
            ask:"One of these is a measurement. The other is the writer's conclusion about what a measurement means. Which is the measurement?",
            think:"The writer says 'roughly' 800,000 years. Why would a scientist write 'roughly' rather than an exact number?"},
      Tue: {a:"Each year's snowfall seals in dust, ash, pollen, and, most valuably, tiny bubbles of the actual atmosphere from the year it fell.",
            b:"When researchers extract a core, they can count its annual layers much as one counts tree rings.",
            pick:"b",
            ask:"Which sentence lets you work out what 'annual' means, using the comparison it makes?",
            think:"Tree rings and ice layers are compared. What does that comparison let the writer avoid explaining?"},
      Wed: {a:"The atmosphere itself is there, sealed in the sample.",
            b:"Two entirely independent records, one written by humans and one written by weather, agreeing on a date.",
            pick:"b",
            ask:"Which sentence shows you why the ash layer matters, without stating the conclusion outright?",
            think:"Why is it stronger evidence when two records that know nothing of each other agree?"},
      Thu: {a:"Two miles beneath the surface of Antarctica, scientists have drilled out a cylinder of ice that is older than the human species.",
            b:"Compressed under later snow, those bubbles survive unchanged for hundreds of thousands of years.",
            pick:"a",
            ask:"Which sentence is built to make you keep reading, and is placed first for that reason?",
            think:"Why did the writer open with ice 'older than the human species' rather than with how ice cores work?"},
      Fri: {a:"This is why ice cores matter so much to climate science: they do not require anyone to model or estimate past atmospheres.",
            b:"Ice cores work as records because snow does not simply pile up \u2014 it traps things.",
            pick:"a",
            ask:"Which sentence states the main idea of the whole passage?",
            think:"The passage argues that evidence you can measure beats evidence you have to estimate. Where in the passage is that argument strongest?"}
    },
    3: {
      Mon: {a:"It is eighty-four years old.",
            b:"Delia's father was not a good speaker.",
            pick:"a",
            ask:"One of these is a checkable fact. The other is an opinion about a person. Which is the fact?",
            think:"Voss said a century; Delia's father counted eighty-four. Why does a sixteen-year difference matter to his argument?"},
      Tue: {a:"That is not the same thing, and if his numbers are loose on the easy part, I want to see the hard part twice.",
            b:"He had written his three points on the back of a feed receipt.",
            pick:"a",
            ask:"Which sentence shows you what 'loose' means when it is used about numbers?",
            think:"'Loose numbers' is not about knots. What does it mean, and how does the sentence tell you?"},
      Wed: {a:"Someone laughed.",
            b:"Voss did not.",
            pick:"b",
            ask:"Which of these two very short sentences tells you that the point had landed?",
            think:"Two people react differently in two sentences of two and three words. What does Voss's silence tell you?"},
      Thu: {a:"He had written his three points on the back of a feed receipt.",
            b:"The town meeting had run two hours when Delia's father finally stood.",
            pick:"a",
            ask:"Which detail tells you most about the kind of man he is, and would be missed if cut?",
            think:"Why a feed receipt, rather than notes on proper paper? What does the writer gain from that detail?"},
      Fri: {a:"I do not know which is better.",
            b:"The replacement faction had spoken well.",
            pick:"a",
            ask:"Which sentence carries the idea the passage is really about?",
            think:"He argues for two minutes and then admits he does not know the answer. Why is that the strongest thing he says?"}
    },
    4: {
      Mon: {a:"Paraphrasing restates a passage in different words at roughly the same length.",
            b:"That judgment is the skill; the shortening is just the visible result.",
            pick:"a",
            ask:"One of these defines a term. The other makes a claim about what matters. Which is the definition?",
            think:"In your own words, and using the lengths the passage gives, what is the difference between a paraphrase and a summary?"},
      Tue: {a:"Summarizing restates it at substantially shorter length, keeping only what is essential.",
            b:"A real summary is a different operation.",
            pick:"a",
            ask:"Which sentence lets you work out what 'essential' means in this context?",
            think:"'Essential' and 'important' are close but not the same. Which does the passage mean, and how can you tell?"},
      Wed: {a:"But they cannot compress it, because they never assembled it.",
            b:"Ask most students to summarize an article and they will hand back the first three sentences, shortened.",
            pick:"b",
            ask:"Which sentence shows you what a bad summary looks like, rather than explaining why it is bad?",
            think:"The passage never calls those students lazy. What does it say the real problem is?"},
      Thu: {a:"A paraphrase of a chapter is another chapter.",
            b:"The reason appears to be that summarizing cannot be faked.",
            pick:"a",
            ask:"Which sentence is built to make an abstract difference instantly concrete?",
            think:"Why is 'a paraphrase of a chapter is another chapter' more useful to a reader than a definition would be?"},
      Fri: {a:"Both require the same underlying honesty: whatever comes out must still be the author's meaning, not yours.",
            b:"A summary of a chapter is a paragraph.",
            pick:"a",
            ask:"Which sentence states the principle the whole passage rests on?",
            think:"The passage says both operations need 'honesty'. Honest about what, exactly?"}
    }
  };

  /* Weeks not yet written fall back to null, and the page says so plainly
   * rather than printing a vague task. Half a specification is worse than a
   * visible gap: a parent can plan around a gap. */
  function challengeFor(grade, week, day){
    const bank = (grade === "y2") ? Y2 : Y1;
    const wk = bank[week];
    return (wk && wk[day]) ? wk[day] : null;
  }

  function weeksWritten(grade){
    return Object.keys((grade === "y2") ? Y2 : Y1).map(Number).sort(function(a,b){ return a-b; });
  }

  window.__CURR = window.__CURR || {};
  window.__CURR.LA_CHALLENGE = {Y1, Y2, challengeFor, weeksWritten};
})();
