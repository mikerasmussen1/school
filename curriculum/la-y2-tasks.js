/* ============================================================================
 * WORD VOYAGERS — YEAR TWO TASKS (handwriting · writing · speaking)
 * ----------------------------------------------------------------------------
 * Thursday is handwritten and model-graded from a photo. Friday is speaking,
 * and is NOT machine-graded — same reasoning as Year One.
 *
 * WHAT THE MODEL CAN AND CANNOT FAIRLY JUDGE IN A PIECE OF WRITING.
 * This matters more at fifth grade than third, because the tasks below ask for
 * real opinion, informative and narrative pieces rather than copying.
 *
 * It CAN judge, reasonably: legibility; whether the piece did what was asked;
 * whether there is an introduction, grouped support and a conclusion; whether
 * evidence is present where evidence was required; whether the target
 * convention (a comma rule, a tense) was used correctly; whether a quotation
 * matches a source the student supplied.
 *
 * It CANNOT fairly judge: whether the argument is actually GOOD; whether the
 * narrative is moving; whether the voice is the child's own. The rubrics below
 * are written to keep it on the first list. A model told to score "quality of
 * argument" from a photo will produce a confident number that means very
 * little, and a child will believe it.
 *
 * So the rubrics ask for structural and conventional feedback plus one
 * specific next step — and the three big unit pieces (Units 3, 6, 9) carry an
 * explicit note that a person should read them too.
 * ==========================================================================*/
(function(){

  const RUBRICS = {
    handwriting:"Judge legibility, letter formation and spacing first, then whether the page does what the assignment asked. Do not score spelling unless the task was a spelling task. Name one specific handwriting habit to work on.",
    convention:"Judge whether the target convention named in the assignment was used correctly, and count how many times it appears. Quote back one sentence where it was used well and one where it was not. Do not judge the quality of the ideas.",
    structure:"Judge structure only: is there an introduction that states the topic or position, are supporting points grouped into paragraphs, is there a conclusion, are linking words used between sections. Say plainly if a part is missing. Do NOT score how persuasive or interesting the writing is — that is not something you can judge fairly from a photo, and the student should hear it from a person.",
    evidence:"Check that each claim the student makes is followed by supporting evidence, and that any quotation is marked with quotation marks. Note any claim left unsupported. Do not judge whether the argument is correct."
  };

  /* [handwriting prompt, writing task, speaking task] */
  const T = {
    1:["Copy this sentence exactly, then copy it again from memory and compare the two versions word by word. Mark every difference.",
       "Choose one paragraph from this week's passage. Write three claims about it, each followed by an exact quotation in quotation marks.",
       "Read a paragraph aloud to someone, then have them summarize it back. Correct anything they got wrong by pointing at the actual words."],
    2:["Write out five sentences from this week's passage that state something explicitly. Under each, write one inference you can reasonably draw.",
       "Write a paragraph about a character, making one inference and quoting the exact evidence that supports it.",
       "Make an inference aloud about someone in a story and defend it when a listener challenges you."],
    3:["Copy three sentences from this week's passage that give evidence. Under each, write what claim it supports.",
       "Write a paragraph in which you make one claim and support it with two pieces of evidence from a text.",
       "State a claim aloud and give two reasons. Have a listener tell you which reason was stronger and why."],
    4:["Write a 40-word summary of this week's passage by hand. Then cut it to 20 words without losing the main idea.",
       "Paraphrase one paragraph in your own words at roughly the same length, then summarize the whole passage in three sentences.",
       "Summarize a text read aloud to you, then have the reader tell you what you left out."],
    5:["Write out the theme of this week's passage in one sentence, then copy three quotations that support it.",
       "Write a paragraph stating a theme and supporting it with two quoted details.",
       "State the theme of a book you are reading and defend it with two specific moments."],
    6:["Copy four sentences showing how a character acted under pressure. Beside each, name the trait it reveals.",
       "Write a comparison of two characters, using specific quoted details for each.",
       "Compare two characters aloud, giving three points of difference in order."],
    7:["Write a one-paragraph summary of a whole chapter by hand, in order, without looking back more than twice.",
       "Summarize an informational text, naming its two main ideas and the key details supporting each.",
       "Summarize a text aloud in under sixty seconds. Have a listener time you."],
    8:["Copy the first and last sentences of three chapters of your current book. Write what each pair tells you about the chapter's job.",
       "Write an explanation of how the parts of a story you are reading fit together to build the whole.",
       "Explain aloud how a book's opening set up its ending."],
    9:["Write a two-column comparison of two characters by hand: eight rows, filled on both sides.",
       "Write a comparison essay of two characters or settings with an introduction, two body paragraphs and a conclusion.",
       "Present your comparison aloud and take two questions."],
    10:["Copy the headings of an informational text. Under each, write one sentence on what that section does.",
       "Compare how two texts on the same topic are structured, and explain why each chose its structure.",
       "Explain aloud which of two texts you would give a friend, and why, based on structure."],
    11:["Copy one paragraph each from two accounts of the same event. Underline every point they agree on.",
       "Write an analysis of two accounts of one event, noting what each includes, omits and emphasizes.",
       "Present both accounts aloud fairly, then say which you found more useful and why."],
    12:["Rewrite one paragraph of this week's passage from a different character's point of view, by hand.",
       "Write a scene twice: once in first person, once in third person omniscient. Note what changed.",
       "Read both versions aloud and ask a listener which felt closer and why."],
    13:["Write ten sentences using the present perfect. Underline have or has and the participle in each.",
       "Write a paragraph about something you have done that still matters now, using present perfect at least four times.",
       "Tell someone about an experience that still affects you, using present perfect naturally."],
    14:["Write eight sentences using the past perfect to show one past event happening before another. Number the events 1 and 2.",
       "Write a narrative paragraph in which you reveal something that had happened before the story began.",
       "Tell a story aloud that includes a flashback, keeping the sequence clear for your listener."],
    15:["Write six sentences using the future perfect. Beside each, write the future point by which it will be complete.",
       "Write a paragraph about where you expect to be in five years, using future perfect at least three times.",
       "Describe aloud what you will have accomplished by the end of this school year."],
    16:["Copy a paragraph containing tense errors (write it wrong on purpose), then rewrite it correctly beside it.",
       "Write a narrative of at least three paragraphs, then reread it once checking ONLY for tense consistency.",
       "Read your narrative aloud. Tense errors are much easier to hear than to see."],
    17:["Write ten sentences, each with a different preposition. Circle each prepositional phrase.",
       "Write a description of a place using at least eight prepositional phrases to establish spatial relationships.",
       "Describe a room aloud so precisely that a listener could draw it."],
    18:["Write six sentences using coordinating conjunctions and six using subordinating conjunctions. Label each.",
       "Take a page of short sentences and rewrite it, joining ideas with varied conjunctions.",
       "Read both versions aloud and ask which was easier to follow."],
    19:["Write eight sentences using correlative pairs. Check that both halves are grammatically parallel.",
       "Write a paragraph using at least four correlative pairs, all parallel.",
       "Explain to someone what parallel structure means, using two examples you wrote yourself."],
    20:["Write ten sentences containing a series of three or more items, punctuated correctly.",
       "Write an informative paragraph containing at least three lists, one of which needs semicolons.",
       "Read a list aloud and have a listener tell you where they heard the commas."],
    21:["Write ten sentences that begin with an introductory element, each correctly punctuated.",
       "Write a paragraph in which every sentence begins differently, using introductory elements for variety.",
       "Read it aloud and listen for whether the openings feel varied or repetitive."],
    22:["Write eight sentences using direct address, yes/no, or tag questions, punctuated correctly.",
       "Write a dialogue of at least twelve lines using all three conventions correctly.",
       "Perform your dialogue aloud with a partner, each taking a role."],
    23:["Copy the titles of six works you have read this year, formatted correctly (underline for long works, quotation marks for short).",
       "Write a review of a book or article, formatting every title correctly and including a source line.",
       "Recommend a work aloud in ninety seconds: what it is, who it is for, and one specific reason."],
    24:["Take one long sentence and rewrite it four ways: shorter, longer, split in two, and combined with the next.",
       "Write a paragraph, then rewrite it cutting 30% of the words without losing meaning. Keep both.",
       "Read both versions aloud to a listener and ask which they preferred and why."],
    25:["Write twenty words built from Greek roots. Beside each, write the root and its meaning.",
       "Write an explanation of how root knowledge helps a reader, using five words you worked out yourself.",
       "Teach one Greek root to someone, giving four words that share it."],
    26:["Write twenty words built from Latin roots, grouped by root family.",
       "Write a paragraph using at least eight words from the same three root families.",
       "Give a two-minute talk on one root family and what it reveals about English."],
    27:["Take five long words apart on paper: root in the middle, prefixes left, suffixes right, meaning underneath.",
       "Find five words you have never seen in your reading. Disassemble each and write your predicted meaning, then check.",
       "Show a listener how you disassembled one word, walking through each piece."],
    28:["Write ten multiple-meaning words. For each, write two sentences using different meanings.",
       "Write a paragraph in which context makes clear which meaning of three multiple-meaning words you intend.",
       "Say a multiple-meaning word aloud in two sentences and have a listener identify both meanings."],
    29:["Write five similes and five metaphors about one subject. Label each and note what structure each imports.",
       "Write a description using at least four figurative comparisons, then explain what each one imports.",
       "Read your description aloud and ask a listener what picture each comparison gave them."],
    30:["Copy ten proverbs or adages. Beside each, write the situation it is meant for.",
       "Write a short narrative that earns one proverb — the reader should be able to name it without being told.",
       "Read your narrative aloud and see whether a listener names the proverb you intended."],
    31:["Write six synonym pairs where the two words differ in connotation. Mark which is warmer.",
       "Rewrite a neutral paragraph twice: once choosing warmer synonyms, once cooler. Keep the facts identical.",
       "Read both versions aloud to a listener without explaining, and ask what impression each gave."],
    32:["Write the same short message three times: to a friend, to a teacher, and in a formal letter.",
       "Write a scene with two characters who speak in different registers, and make the difference audible.",
       "Perform both versions aloud and discuss what changed and why it mattered."],
    33:["Take notes by hand from three sources on one question, one page per source, with the source named at the top.",
       "Choose your research question for Unit 9. Gather three sources and write a paragraph on what each contributes.",
       "State your research question aloud and have a listener ask three questions you have not yet answered."],
    34:["Write five paraphrases from your sources by hand. Beside each, note the source and page.",
       "Write two paragraphs from your notes, citing every fact. Include a source list at the end.",
       "Explain aloud how you know one of your facts is reliable, tracing it to its origin."],
    35:["Write your opinion paper's introduction and conclusion by hand, on one page.",
       "Write your full opinion paper: introduction with a clear position, grouped reasons with evidence, linking words, and a conclusion. Then revise it once.",
       "State the STRONGEST version of the opposing view aloud, to a listener's satisfaction, before arguing your own."],
    36:["Copy your final paper neatly by hand, or type and print it. This is the year's finished piece.",
       "Build a visual display that carries what the ear handles badly: numbers, sequences, and relationships between your points.",
       "Present your paper with your visual display. Signpost your three points before making them, speak slower than feels natural, and answer at least three questions honestly — including 'I don't know, but here is how I would find out.'"]
  };

  /* Which rubric each week's Thursday task should be judged against. */
  const RUBRIC_FOR = {
    handwriting:"handwriting",
    // writing tasks by unit: conventions units get the convention rubric,
    // evidence units get the evidence rubric, the big pieces get structure.
    writing: w =>
      (w>=13 && w<=24) ? "convention" :
      (w>=1 && w<=4) || w===34 || w===35 ? "evidence" :
      (w>=9 && w<=12) || (w>=21 && w<=24) || w>=33 ? "structure" : "structure"
  };

  function taskFor(week, kind){
    const r=T[week]||T[1];
    const spine=(window.__CURR.LA_Y2 && window.__CURR.LA_Y2.WEEKS)||[];
    const wk=spine.find(w=>w.n===week);
    const map={handwriting:0, writing:1, speaking:2};
    const i=map[kind]==null?0:map[kind];
    const bigPiece = (week===12 || week===24 || week===36);
    const rubricKey = kind==="handwriting" ? "handwriting" : RUBRIC_FOR.writing(week);
    return {
      id:"la-y2-w"+week+"-"+kind, w:week, kind,
      title: kind==="handwriting" ? "Handwriting — Week "+week
           : kind==="writing"     ? "Writing — Week "+week
           :                        "Speak & Show — Week "+week,
      prompt:r[i],
      instructions: kind==="handwriting"
        ? "Write this by hand on paper. Then photograph the page and press Grade this work."
        : kind==="writing"
        ? (bigPiece
            ? "This is a unit piece. Write it, photograph it for feedback on structure and conventions — then give it to a person to read. The model can tell you whether the parts are there; only a reader can tell you whether it lands."
            : "Write this on paper or type it. If you write it by hand, photograph it for feedback.")
        : "Done out loud with another person. Nothing here is scored by the computer — do it, then mark it done.",
      rubric: kind==="speaking" ? "Not machine-graded. Done with a person." : RUBRICS[rubricKey],
      graded: kind!=="speaking",
      bigPiece,
      spelling: wk?wk.spelling:"",
      focus: wk?wk.title:""
    };
  }

  window.__CURR = window.__CURR || {};
  window.__CURR.LA_Y2 = Object.assign(window.__CURR.LA_Y2||{}, {TASK_ROWS:T, RUBRICS, taskFor});
})();
