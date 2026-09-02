/* ============================================================================
 * WORD VOYAGERS — YEAR ONE TASKS (handwriting · writing · speaking)
 * ----------------------------------------------------------------------------
 * Thursday is handwritten: the child writes on paper, photographs it, and
 * LAGrader reads the photo against the rubric. Friday is Speak & Show: a
 * speaking or listening task with a rubric, plus the week's review.
 *
 * WHAT IS AND IS NOT AUTO-GRADED, said plainly:
 *   Thursday's handwriting  → model-graded from a photo. Real feedback.
 *   Friday's speaking task  → NOT graded by anything. There is no honest way
 *                             to machine-score a child reporting aloud or
 *                             building on someone's idea in a discussion. The
 *                             page gives the task and the rubric, the child
 *                             does it with whoever is around, and it is marked
 *                             done by hand. Pretending otherwise would be a
 *                             progress bar, not an assessment.
 *
 * Every Thursday prompt is written to exercise BOTH the week's grammar skill
 * and its spelling pattern, so the handwriting day is not a separate subject —
 * it is where the week's two drills get used in real sentences.
 * ==========================================================================*/
(function(){

  const RUBRICS = {
    handwriting:"Judge letter formation, spacing and legibility first. Then check whether the writing does what the assignment asked. Do not penalize spelling unless the assignment was a spelling task.",
    spelling:"Judge spelling accuracy against the week's word list. Note any word attempted but misspelled, and say which spelling pattern would fix it.",
    grammar:"Judge whether the sentences follow the instruction and use the target grammar correctly. Legibility matters but is secondary here.",
    writing:"Judge whether the writing is on topic, organized, and complete for a third grader. Look for an opening, supporting detail, and a closing. Do not penalize imperfect handwriting or spelling heavily — content and organization are the point."
  };

  /* [handwriting prompt, writing/research task, speaking task] per week */
  const T = {
    1:["Copy neatly: 'A word fitly spoken is like apples of gold in settings of silver.' Then write three of your own complete sentences about your day, underlining each noun.",
       "Write four complete sentences about something you did this week. Each must have a subject and a verb.",
       "Tell someone at home about your day in three complete sentences, out loud. Ask them one question about theirs and listen to the whole answer before replying."],
    2:["Copy neatly: 'Whatever you do, work at it with all your heart.' Then write four sentences about a job you did, circling each verb.",
       "Write four sentences about a chore, using a different verb in each one.",
       "Retell a story you know in order — beginning, middle, end — out loud, without stopping to start over."],
    3:["Write six complete sentences about your week. Under each, mark S over the subject and P over the predicate.",
       "Turn these fragments into complete sentences: 'Running down the hill.' 'The three loud puppies.' 'Because it rained.'",
       "Read this week's passage aloud to someone. Ask them to tell you the main idea, then say whether they got it."],
    4:["Copy neatly a short paragraph from this week's passage. Then rewrite it, replacing every name with the right pronoun.",
       "Write five sentences about your family, using a different pronoun in each.",
       "Listen to a short read-aloud or podcast. Say back the main idea and two supporting details."],
    5:["Write each spelling word once. Then write five sentences, each using a plural noun from the list.",
       "Write a short paragraph describing your room, using at least six plural nouns.",
       "Describe an object to someone without naming it, until they guess. Use clear, ordered detail."],
    6:["Write ten irregular plurals with their singulars beside them (child/children). Then use four in sentences.",
       "Write a paragraph about a group of animals, using at least four irregular plurals.",
       "Ask an adult about something from their childhood. Take notes as they talk, then read your notes back to check you got it right."],
    7:["Copy neatly: 'Faith, hope and love remain, and the greatest of these is love.' Then list eight abstract nouns and use three in sentences.",
       "Write a paragraph about a quality you admire in someone, naming it with an abstract noun.",
       "Tell a family member about a person you admire and why. Speak for at least one full minute."],
    8:["Write eight sentences where the subject and verb agree. Underline both in each sentence.",
       "Write a paragraph about your week, checking every subject and verb agree before you finish.",
       "Read your paragraph aloud. Listening for agreement errors is easier than seeing them."],
    9:["Copy neatly a description from this week's passage. Then write five sentences with two adjectives each.",
       "Write a description of a place you love, using at least eight adjectives.",
       "Describe a person from this week's reading out loud, so a listener could picture them."],
    10:["Write ten adverbs. Then write five sentences, each using one to tell HOW something was done.",
       "Rewrite five plain sentences, adding an adverb to each to make them more vivid.",
       "Tell a short story out loud, changing your pace and volume to match the action."],
    11:["Write ten comparative forms (fast/faster). Then write four sentences comparing two things.",
       "Write a paragraph comparing two seasons, using at least five comparatives.",
       "Compare two things out loud for a listener, giving three points of difference in order."],
    12:["Write ten superlative forms (fast/fastest). Then write four sentences about the 'most' of something.",
       "Write a paragraph about the best day you remember, using at least three superlatives.",
       "Give a one-minute talk on your favorite anything, with three reasons. Speak at an understandable pace."],
    13:["Copy neatly: 'Two are better than one, because they have a good reward for their toil.' Then join six sentence pairs with and, but, or, so.",
       "Write a paragraph about working with someone, using at least four coordinating conjunctions.",
       "Tell about a time you worked with someone. Then ask your listener a question about a time they did."],
    14:["Write six sentences that begin with because, when, although, if, after, or before. Put the comma in the right place.",
       "Write a paragraph explaining why you like something, using at least three subordinating conjunctions.",
       "Explain how to do something you know well, in ordered steps, out loud."],
    15:["Write five compound sentences. Circle the comma and the joining word in each.",
       "Take a paragraph of short choppy sentences and rewrite it using compound sentences.",
       "Read both versions of your paragraph aloud. Ask a listener which sounds better and why."],
    16:["Write five complex sentences, each with a dependent part at the front and a comma after it.",
       "Write a paragraph about a decision you made, using at least three complex sentences.",
       "Record yourself (or perform for family) reading your paragraph with expression."],
    17:["Copy the titles of five books you own, capitalizing them correctly.",
       "Write a paragraph recommending a book, using its correctly capitalized title at least twice.",
       "Recommend a book out loud in one minute: what it is about and who would like it."],
    18:["Write your full address correctly. Then write four sentences containing cities and states with correct commas.",
       "Write a short letter to a relative, with a correctly punctuated heading, address and date.",
       "Read your letter aloud and ask a listener whether anything was unclear."],
    19:["Copy five lines of dialogue from this week's passage exactly, keeping every comma and quotation mark.",
       "Write a conversation between two people, at least six lines, punctuated correctly.",
       "Read your dialogue aloud with a partner, each taking a part."],
    20:["Write six lines of dialogue of your own, with the speaker named in a different position each time.",
       "Interview someone at home about their day and write up three exchanges as punctuated dialogue.",
       "Ask three follow-up questions in a real conversation, each building on the last answer."],
    21:["Write ten singular possessives (the dog's bone). Then use five in sentences.",
       "Write a paragraph about things belonging to people in your family, using at least six possessives.",
       "Describe your family to a listener, being clear about who owns or does what."],
    22:["Write ten plural possessives (the dogs' bones). Beside each, write the singular possessive for contrast.",
       "Write a paragraph about a group and their belongings, using at least four plural possessives.",
       "Explain the difference between the boy's and the boys' to someone, out loud, until they get it."],
    23:["Write eight sentences where each pronoun clearly matches its noun. Draw an arrow from pronoun to noun.",
       "Write a paragraph about a group of friends, checking every pronoun matches.",
       "Retell this week's passage aloud, keeping every pronoun clear so the listener never wonders who you mean."],
    24:["Write ten sentences alternating its and it's correctly. Beside each, write which one you meant.",
       "Write a paragraph about an animal, using its at least three times and it's at least twice.",
       "Teach the its / it's rule to a younger sibling or a parent, out loud, with examples."],
    25:["Copy neatly: 'Like a tree planted by streams of water.' Then write twelve words with un-, re-, or pre-, and define four.",
       "Write a paragraph using at least six prefixed words, underlining each prefix.",
       "Explain what a prefix does, out loud, using three examples you thought of yourself."],
    26:["Write twelve words with dis-, mis-, or non-. Beside each, write what the prefix does to the root.",
       "Write a paragraph about a misunderstanding, using at least four of this week's prefixes.",
       "Give a short talk explaining how prefixes let you work out unfamiliar words."],
    27:["Write twelve words with -ful, -less or -ness. Then write four sentences using pairs of opposites (hopeful/hopeless).",
       "Write a paragraph about a quality, using at least five suffixed words.",
       "Describe someone's character out loud using at least four -ness or -ful words."],
    28:["Copy four sentences from this week's passage that contain a hard word. Under each, write what the context told you.",
       "Find five unfamiliar words in your reading this week. Write each sentence, your guess, then the real meaning.",
       "Show a listener how you worked out one word from context, walking them through your reasoning."],
    29:["Write six nonliteral sentences. Beside each, write what it actually means.",
       "Write a paragraph that uses at least three nonliteral expressions, then explain each in a footnote.",
       "Say a nonliteral expression to a listener and have them explain it, then swap."],
    30:["Write ten idioms. Draw the literal meaning of one as a joke, then write what it really means.",
       "Write a short story in which a character takes an idiom literally.",
       "Read your story aloud to family. Their laughter is the assessment."],
    31:["Write five similes and five metaphors about the same subject. Label each.",
       "Write a description of a storm, a person, or a place using at least four comparisons.",
       "Read your description aloud twice — once flat, once with expression. Ask which was better."],
    32:["Write four sets of three related words ordered weakest to strongest (chuckle, laugh, roar).",
       "Rewrite a plain paragraph, replacing every vague word with a more precise one.",
       "Read both versions to a listener and ask what changed for them."],
    33:["Copy neatly: 'Always be prepared to give a reason for the hope that is in you.' Then take half a page of notes on a topic you choose, in your own words.",
       "Pick your research topic for Unit 9. Write your question, and take notes from two different sources — in your own words, with the source noted for each.",
       "Tell someone your research question and why you chose it. Ask what they would want to know about it."],
    34:["Sort your notes into three piles on paper: facts that support your point, facts that complicate it, and things that are opinion. Label each pile.",
       "Write one paragraph from your notes. Every sentence must be supported by a note, not by memory.",
       "Present your three strongest facts aloud and let a listener ask you two questions."],
    35:["Write your report's introduction and conclusion by hand, on one page.",
       "Write your full five-paragraph report: introduction, three supporting paragraphs, conclusion. Then revise it once.",
       "Read your report aloud to check the flow. Mark every place you stumbled — those are the places to revise."],
    36:["Copy your final report neatly by hand, or type and print it. This is the year's finished piece.",
       "Make a visual display for your report: a poster, a labeled diagram, or slides.",
       "Present your report with your visual display. Speak clearly, at an understandable pace, and answer at least two questions from your audience honestly — including 'I do not know, but I could find out.'"]
  };

  function taskFor(week, kind){
    const r = T[week] || T[1];
    const spine = (window.__CURR.LA_Y1 && window.__CURR.LA_Y1.WEEKS) || [];
    const wk = spine.find(w=>w.n===week);
    const map = {handwriting:0, writing:1, speaking:2};
    const i = map[kind]==null ? 0 : map[kind];
    return {
      id: "la-y1-w"+week+"-"+kind,
      w: week, kind,
      title: kind==="handwriting" ? "Handwriting — Week "+week
           : kind==="writing"     ? "Writing — Week "+week
           :                        "Speak & Show — Week "+week,
      prompt: r[i],
      instructions: kind==="handwriting"
        ? "Write this out by hand on paper, as neatly as you can. Then take a photo of the page and press Grade this work."
        : kind==="writing"
        ? "Write this on paper or type it. If you write it by hand, photograph it for feedback."
        : "This one is done out loud with another person. Nothing here is graded by the computer — do it, then mark it done.",
      rubric: kind==="handwriting" ? RUBRICS.handwriting
            : kind==="writing"     ? RUBRICS.writing
            :                        "Not machine-graded. Done with a person.",
      graded: kind !== "speaking",
      spelling: wk ? wk.spelling : "",
      grammar: wk ? wk.title : ""
    };
  }

  window.__CURR = window.__CURR || {};
  window.__CURR.LA_Y1 = Object.assign(window.__CURR.LA_Y1||{}, {TASK_ROWS:T, RUBRICS, taskFor});
})();
