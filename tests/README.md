# Word Voyagers tests

Run any of these with `node tests/<file>.js` from the repository root. Each
exits non-zero on failure and prints what it checked.

| file | what it asserts |
|---|---|
| `today-content.js` | Every step of every day, both grades, all 36 weeks, opens exactly one assignment on the Today tab **and that assignment has real content** — a passage over 80 characters, a prompt over 20, a word list with words, a drill ready to start. 1,512 step-assignments. |
| `find-the-mistake.js` | The daily correction drill: present on every day as step 2, two stages in order, the sentence shown once and never repeated inside the question, options that are real words from the sentence, the prompt matching the kind of fault, four distinct repair options, the step ticking with a score, and a finished drill not surviving a change of day, week or grade. |
| `handwriting.js` | All 72 handwriting assignments carry a title, instructions, a labelled sentence and a working listen button; no week in either grade still tells the child to photograph the page; and no prompt says "this sentence" without supplying one. |
| `no-photo.js` | Neither grade has a photo step or capture buttons, the grown-up marking step survives, steps renumber with no gap, and a child can still finish Thursday. |
| `quote.js` | The quote ticks from the card it is printed on, on all five days, and opening an assignment does not scroll the page away from it. |

## Why these live here now

They were written in a scratch directory and lost their history every time the
environment reset. Several bugs in this app were only ever caught because one
of these existed — the drill that scored zero while looking correct, the
assignment panel that showed the wrong block, the reset that did nothing
because it ran after `setState`. They are worth keeping.

## The one thing they cannot do

Everything here is Node driving the component's view-model. Nothing renders a
real browser, so a fault that lives purely in CSS or in the DSL's rendering —
an undefined class, a panel below the fold, a button hidden behind another
element — passes every one of these. Three separate bugs of exactly that kind
reached the running site. Test in a browser as well.
