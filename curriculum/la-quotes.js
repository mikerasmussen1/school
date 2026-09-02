/* ============================================================================
 * WORD VOYAGERS — QUOTE OF THE DAY
 * ----------------------------------------------------------------------------
 * One short reading for every one of the 180 school days, in both grades.
 * Each is tied to the virtue of the unit it falls in, so the quote a child
 * reads on Tuesday of week 10 is about courage because that is what Unit 3 is
 * about.
 *
 * SOURCES, AND WHY THEY ARE WHAT THEY ARE.
 * Everything here is public domain or traditional: Scripture in the King James
 * wording (public domain), traditional proverbs and adages that belong to no
 * one, historical figures who died long enough ago that their writing is free,
 * and plain common-sense maxims written for this curriculum. Nothing is quoted
 * from a living writer or a modern translation, because a curriculum that
 * quietly reproduces copyrighted material is not something to hand a family.
 *
 * Where a line is our own paraphrase of a longer passage rather than a direct
 * quotation, the source reads "after <reference>" so nobody is misled about
 * what is a quotation and what is a retelling. That distinction is one the
 * curriculum itself teaches in Unit 1; it would be strange to violate it here.
 *
 * TONE. The mix is deliberate: roughly a third Scripture, a third proverb or
 * historical, a third practical common sense. A child should finish the year
 * having met "a soft answer turneth away wrath" and "measure twice, cut once"
 * in the same voice, because both are true and both are for living.
 *
 * FORMAT  [text, source, kind, think]
 *   kind: "s" scripture · "p" proverb/adage · "h" historical · "c" common sense
 *   think: one short line turning the quote toward something the child can do
 *          today. Not a moral lecture — a handle.
 * ==========================================================================*/
(function(){

  /* ---------------- 3RD GRADE · 180 days ------------------------------- */
  const Y1 = {
  /* Unit 1 · Truthful speech */
  1:[["A word fitly spoken is like apples of gold in pictures of silver.","Proverbs 25:11","s","Say one true, kind thing on purpose today."],
     ["Let your yea be yea; and your nay, nay.","James 5:12","s","Mean what you say the first time."],
     ["Honesty is the best policy.","Traditional proverb","p","The truth is easier to remember than a story."],
     ["Think before you speak.","Traditional saying","c","Count to three before you answer."],
     ["A lie has no legs, but a scandal has wings.","Traditional proverb","p","Once a story is loose you cannot call it back."]],
  2:[["Whatsoever thy hand findeth to do, do it with thy might.","Ecclesiastes 9:10","s","Finish the thing in front of you."],
     ["Well done is better than well said.","Benjamin Franklin","h","Show it instead of promising it."],
     ["Actions speak louder than words.","Traditional proverb","p","What did you do today that no one saw?"],
     ["A promise made is a debt unpaid.","Traditional saying","p","Keep the small ones and the big ones follow."],
     ["Do the hard part first.","Common sense","c","The rest of the day gets easier."]],
  3:[["Let all things be done decently and in order.","1 Corinthians 14:40","s","A tidy desk makes a clearer head."],
     ["A place for everything, and everything in its place.","Traditional proverb","p","Put one thing back where it belongs."],
     ["Little strokes fell great oaks.","Benjamin Franklin","h","Small work, repeated, moves big things."],
     ["Begin at the beginning.","Traditional saying","c","When you are stuck, go back one step."],
     ["Measure twice, cut once.","Carpenter's proverb","p","Checking is faster than fixing."]],
  4:[["A soft answer turneth away wrath.","Proverbs 15:1","s","Lower your voice when someone raises theirs."],
     ["Speak kind words and you will hear kind echoes.","Traditional proverb","p","Try it once today and watch."],
     ["He that cannot obey cannot command.","Benjamin Franklin","h","Learning to follow is how you learn to lead."],
     ["Say what you mean, and mean what you say.","Common sense","c","Fewer words, said honestly."],
     ["Better to remain silent and be thought a fool than to speak and remove all doubt.","Traditional saying","p","Sometimes the wise move is quiet."]],

  /* Unit 2 · Stewardship */
  5:[["The earth is the Lord's, and the fulness thereof.","Psalm 24:1","s","Take care of something that is not yours."],
     ["Waste not, want not.","Traditional proverb","p","Use what you already have first."],
     ["He that is faithful in that which is least is faithful also in much.","Luke 16:10","s","Do the small job properly."],
     ["Take care of the pennies and the pounds take care of themselves.","Traditional proverb","p","Small savings add up quietly."],
     ["Leave a place better than you found it.","Common sense","c","Pick up one thing that is not yours."]],
  6:[["Consider the ant, and be wise.","after Proverbs 6:6","s","Nobody has to tell the ant to work."],
     ["Make hay while the sun shines.","Traditional proverb","p","Do it now while you can."],
     ["A stitch in time saves nine.","Traditional proverb","p","Fix the small tear today."],
     ["Don't put off till tomorrow what you can do today.","Benjamin Franklin","h","Pick the one thing you have been avoiding."],
     ["Finish what you start.","Common sense","c","An unfinished job is still a job."]],
  7:[["In all thy ways acknowledge him, and he shall direct thy paths.","Proverbs 3:6","s","Ask for help before you are stuck, not after."],
     ["Give thanks in all circumstances.","after 1 Thessalonians 5:18","s","Name three things before breakfast."],
     ["Gratitude is the memory of the heart.","Traditional saying","p","Remember who helped you last week."],
     ["Count your blessings, not your troubles.","Traditional proverb","p","Make the list on paper. It is longer than you think."],
     ["Say thank you out loud.","Common sense","c","People cannot hear what you only think."]],
  8:[["Every good gift is from above.","after James 1:17","s","Nothing you have you made from nothing."],
     ["The best things in life are not things.","Traditional saying","p","Name one you could not buy."],
     ["Enough is as good as a feast.","Traditional proverb","p","Wanting less is a kind of wealth."],
     ["Contentment is natural wealth; luxury is artificial poverty.","after Socrates","h","What do you already have enough of?"],
     ["Want what you have.","Common sense","c","Look around before you look ahead."]],

  /* Unit 3 · Courage */
  9:[["Be strong and of a good courage; be not afraid.","Joshua 1:9","s","Courage is doing it while still scared."],
     ["Fortune favours the brave.","Traditional proverb","p","Ask the question you have been avoiding."],
     ["Courage is being scared to death and saddling up anyway.","Traditional saying","p","The fear does not have to leave first."],
     ["Do the thing you fear and the death of fear is certain.","after Ralph Waldo Emerson","h","Start with something small."],
     ["Speak up when it is hard.","Common sense","c","Someone may be waiting for one person to go first."]],
  10:[["The righteous are bold as a lion.","Proverbs 28:1","s","A clear conscience makes a steady voice."],
      ["Stand for something or you will fall for anything.","Traditional saying","p","Decide before the moment comes."],
      ["It is easier to stand up the first time than the tenth.","Common sense","c","Every time you go along it gets harder to stop."],
      ["One person with courage makes a majority.","after Andrew Jackson","h","You do not need permission to be right."],
      ["A coward dies a thousand times; the valiant taste death but once.","after Shakespeare","p","Worrying costs more than doing."]],
  11:[["Fear thou not; for I am with thee.","Isaiah 41:10","s","You are not doing it alone."],
      ["Smooth seas never made a skilled sailor.","Traditional proverb","p","The hard week is teaching you something."],
      ["Fall down seven times, stand up eight.","Japanese proverb","p","Getting up is the whole skill."],
      ["Nothing in life is to be feared, only understood.","after Marie Curie","h","Learn about the thing that scares you."],
      ["Try again tomorrow.","Common sense","c","One bad day is one day."]],
  12:[["Let us not be weary in well doing.","Galatians 6:9","s","Keep going when nobody claps."],
      ["Rome was not built in a day.","Traditional proverb","p","Slow is still forward."],
      ["Energy and persistence conquer all things.","Benjamin Franklin","h","Persistence beats talent that quits."],
      ["It always seems impossible until it is done.","Traditional saying","p","You are further along than you feel."],
      ["Keep going.","Common sense","c","Two more minutes than you wanted to."]],

  /* Unit 4 · Diligence */
  13:[["The hand of the diligent shall bear rule.","Proverbs 12:24","s","Careful work quietly earns trust."],
      ["Good, better, best; never let it rest.","Traditional saying","p","One more pass before you call it done."],
      ["If a job is worth doing, it is worth doing well.","Traditional proverb","p","Sand the part nobody will see."],
      ["Genius is one percent inspiration and ninety-nine percent perspiration.","after Thomas Edison","h","Mostly it is just showing up."],
      ["Do it right or do it twice.","Common sense","c","Rushing is usually the slow way."]],
  14:[["Whatsoever ye do, do it heartily.","Colossians 3:23","s","Half-hearted work is its own punishment."],
      ["The early bird catches the worm.","Traditional proverb","p","Start before you feel ready."],
      ["Lost time is never found again.","Benjamin Franklin","h","This hour is not coming back."],
      ["Practice makes progress.","Common sense","c","Not perfect. Better than yesterday."],
      ["A journey of a thousand miles begins with a single step.","Chinese proverb","p","Take the first step badly if you must."]],
  15:[["Two are better than one, for they have a good reward for their labour.","Ecclesiastes 4:9","s","Ask someone to work alongside you."],
      ["Many hands make light work.","Traditional proverb","p","Offer help before you are asked."],
      ["A chain is only as strong as its weakest link.","Traditional proverb","p","Help whoever is struggling most."],
      ["If you want to go fast go alone; if you want to go far go together.","African proverb","p","Which one is today?"],
      ["Do your part well.","Common sense","c","Others are counting on your piece."]],
  16:[["Iron sharpeneth iron; so a man sharpeneth the countenance of his friend.","Proverbs 27:17","s","A good friend makes you better, not just happier."],
      ["Tell me who your friends are and I will tell you who you are.","Traditional proverb","p","Who are you becoming?"],
      ["A true friend is the greatest of all blessings.","Traditional saying","p","Thank one today."],
      ["Be slow in choosing a friend, slower in changing.","Benjamin Franklin","h","Loyalty is built slowly."],
      ["Be the friend you want to have.","Common sense","c","Go first."]],

  /* Unit 5 · Honesty */
  17:[["Lie not one to another.","Colossians 3:9","s","One honest sentence today, even if it costs you."],
      ["Truth fears no questions.","Traditional proverb","p","If it is true you can say it twice the same way."],
      ["Honesty is the first chapter in the book of wisdom.","after Thomas Jefferson","h","Everything else builds on it."],
      ["A half truth is a whole lie.","Traditional proverb","p","Leaving it out still counts."],
      ["Tell it before someone else does.","Common sense","c","It never gets easier by waiting."]],
  18:[["Buy the truth, and sell it not.","Proverbs 23:23","s","Truth is worth what it costs you."],
      ["Cheaters never prosper.","Traditional proverb","p","A win you did not earn is not a win."],
      ["It takes many good deeds to build a good reputation, and only one bad one to lose it.","Benjamin Franklin","h","Guard it today."],
      ["No legacy is so rich as honesty.","after Shakespeare","p","People remember whether they could trust you."],
      ["Own the mistake.","Common sense","c","Say 'I did that' and watch it shrink."]],
  19:[["Let your light so shine before men.","Matthew 5:16","s","Someone is watching how you handle small things."],
      ["Character is what you do when no one is looking.","Traditional saying","p","Today's test is probably a small one."],
      ["The truth will out.","Traditional proverb","p","It always surfaces eventually."],
      ["Watch your habits; they become your character.","Traditional saying","p","Which habit is building you?"],
      ["Do the right thing quietly.","Common sense","c","No announcement necessary."]],
  20:[["A good name is rather to be chosen than great riches.","Proverbs 22:1","s","Your word is your real property."],
      ["Promise little and do much.","Traditional proverb","p","Under-promise. Then show up."],
      ["Trust is earned in drops and lost in buckets.","Traditional saying","p","Add a drop today."],
      ["It is not enough to be honest; you must be believed.","Common sense","c","Consistency is what makes people believe you."],
      ["Be what you seem to be.","after Lewis Carroll","p","Same person at home and away."]],

  /* Unit 6 · Family and belonging */
  21:[["Honour thy father and thy mother.","Exodus 20:12","s","Do the thing before you are asked twice."],
      ["Blood is thicker than water.","Traditional proverb","p","Repair it before it hardens."],
      ["A house divided against itself cannot stand.","Abraham Lincoln","h","Peace at home takes work from everyone."],
      ["Charity begins at home.","Traditional proverb","p","Kindness counts most where it is least noticed."],
      ["Say the kind thing to the person you live with.","Common sense","c","They hear the ordinary you."]],
  22:[["Bear ye one another's burdens.","Galatians 6:2","s","Carry something for somebody."],
      ["A burden shared is a burden halved.","Traditional proverb","p","Ask for help. It is not weakness."],
      ["To the world you may be one person, but to one person you may be the world.","Traditional saying","p","Be that for someone today."],
      ["No one is useless who lightens the burden of another.","after Charles Dickens","h","Small help is real help."],
      ["Notice who is left out.","Common sense","c","Then go sit with them."]],
  23:[["Love thy neighbour as thyself.","Mark 12:31","s","Neighbour means whoever is near you today."],
      ["Do unto others as you would have them do unto you.","Matthew 7:12","s","The oldest test, and still the best."],
      ["Kindness is a language everyone understands.","Traditional saying","p","No translation needed."],
      ["A kind word is never wasted.","Traditional proverb","p","Even if they do not answer."],
      ["Be kind first.","Common sense","c","Do not wait to be treated well."]],
  24:[["Be ye kind one to another, tenderhearted, forgiving.","Ephesians 4:32","s","Forgiving is a decision, not a feeling."],
      ["To err is human; to forgive, divine.","Alexander Pope","h","You will need it back one day."],
      ["Holding a grudge is carrying a weight you chose.","Common sense","c","Put it down."],
      ["Forgive and forget.","Traditional proverb","p","Start with forgive."],
      ["Do not let the sun go down upon your wrath.","Ephesians 4:26","s","Settle it before bedtime."]],

  /* Unit 7 · Wisdom and growth */
  25:[["Get wisdom, and with all thy getting get understanding.","Proverbs 4:7","s","Knowing a fact and understanding it are different."],
      ["Live and learn.","Traditional proverb","p","Today's mistake is tomorrow's skill."],
      ["An investment in knowledge pays the best interest.","Benjamin Franklin","h","What you learn, you keep."],
      ["The only true wisdom is in knowing you know nothing.","after Socrates","h","Say 'I don't know' out loud today."],
      ["Ask the question.","Common sense","c","The embarrassment lasts a minute; not knowing lasts years."]],
  26:[["A wise man will hear, and will increase learning.","Proverbs 1:5","s","Listening is how wise people got wise."],
      ["You have two ears and one mouth for a reason.","Traditional saying","p","Listen twice as much today."],
      ["He who asks is a fool for five minutes; he who does not ask remains a fool forever.","Chinese proverb","p","Raise your hand."],
      ["Experience is the teacher of all things.","after Julius Caesar","h","Do the thing badly first."],
      ["Learn from other people's mistakes.","Common sense","c","You will not live long enough to make them all yourself."]],
  27:[["Blessed is the man that findeth wisdom.","Proverbs 3:13","s","Wisdom is found, which means it is looked for."],
      ["Knowledge is power.","Traditional saying","p","But only if you use it."],
      ["Reading is to the mind what exercise is to the body.","Traditional saying","p","Twenty minutes counts."],
      ["A room without books is like a body without a soul.","after Cicero","h","Which book is yours right now?"],
      ["Read something harder than you are.","Common sense","c","That is where growing happens."]],
  28:[["The fear of the Lord is the beginning of wisdom.","Proverbs 9:10","s","Wisdom starts with knowing you are not the biggest thing."],
      ["Pride goeth before destruction.","Proverbs 16:18","s","Check your confidence against the facts."],
      ["Humility is not thinking less of yourself, but thinking of yourself less.","Traditional saying","p","Ask someone about their day first."],
      ["He that is taught only by himself has a fool for a master.","Ben Jonson","h","Let someone correct you today."],
      ["Admit when you are wrong.","Common sense","c","Fast. It costs less that way."]],

  /* Unit 8 · Discernment */
  29:[["Prove all things; hold fast that which is good.","1 Thessalonians 5:21","s","Test it before you believe it."],
      ["All that glitters is not gold.","Traditional proverb","p","Look past the shine."],
      ["Believe none of what you hear and half of what you see.","Traditional proverb","p","Check before repeating."],
      ["The first principle is that you must not fool yourself.","after Richard Feynman's teachers","h","You are the easiest person to fool."],
      ["Ask where they got that.","Common sense","c","A fact without a source is a rumour."]],
  30:[["Be wise as serpents, and harmless as doves.","Matthew 10:16","s","Clever and kind are not opposites."],
      ["Look before you leap.","Traditional proverb","p","One breath before you decide."],
      ["Do not judge a book by its cover.","Traditional proverb","p","Give the second look."],
      ["It is not what you look at that matters, it is what you see.","after Henry David Thoreau","h","Look again more slowly."],
      ["Slow down when it feels urgent.","Common sense","c","Urgency is how people get talked into things."]],
  31:[["Let every man be swift to hear, slow to speak, slow to wrath.","James 1:19","s","In that order."],
      ["Least said, soonest mended.","Traditional proverb","p","Not every thought needs an audience."],
      ["When angry, count to ten; when very angry, a hundred.","after Thomas Jefferson","h","Anger is a bad advisor."],
      ["Silence is golden.","Traditional proverb","p","Try it in the next argument."],
      ["Wait a day before you send it.","Common sense","c","You will usually change it."]],
  32:[["A prudent man foreseeth the evil, and hideth himself.","Proverbs 22:3","s","Seeing it coming is a skill you can build."],
      ["An ounce of prevention is worth a pound of cure.","Benjamin Franklin","h","Do the small thing now."],
      ["Do not count your chickens before they hatch.","Traditional proverb","p","Wait until it is real."],
      ["Hope for the best, prepare for the worst.","Traditional proverb","p","Both, not one."],
      ["Have a plan B.","Common sense","c","Then plan A gets easier."]],

  /* Unit 9 · Witness and service */
  33:[["Let us not love in word, but in deed and in truth.","1 John 3:18","s","Love is a verb today."],
      ["Deeds, not words.","Traditional proverb","p","What will you actually do?"],
      ["The best way to find yourself is to lose yourself in the service of others.","after Gandhi","h","Help someone with no audience."],
      ["No act of kindness, however small, is ever wasted.","after Aesop","p","Small counts."],
      ["Do something useful today.","Common sense","c","Useful beats impressive."]],
  34:[["Freely ye have received, freely give.","Matthew 10:8","s","You did not earn everything you have."],
      ["It is more blessed to give than to receive.","Acts 20:35","s","Test it and see."],
      ["Give what you can, where you are.","Common sense","c","You do not need to be rich to be generous."],
      ["A generous person will prosper.","after Proverbs 11:25","s","Generosity is not subtraction."],
      ["The smallest good deed beats the grandest intention.","Traditional proverb","p","Do the small one."]],
  35:[["Be ready always to give an answer.","1 Peter 3:15","s","Know why you believe what you believe."],
      ["Speak the truth, even if your voice shakes.","Traditional saying","p","Shaking is allowed."],
      ["I would rather be right than president.","Henry Clay","h","Popularity is not the same as being correct."],
      ["Have a reason, not just a feeling.","Common sense","c","Can you explain it to someone who disagrees?"],
      ["Stand for what is right even if you stand alone.","Traditional saying","p","Sometimes the count is one."]],
  36:[["Well done, thou good and faithful servant.","Matthew 25:21","s","Faithful in the ordinary is the goal."],
      ["Finish the race.","after 2 Timothy 4:7","s","You are at the end of a whole year."],
      ["The end crowns the work.","Traditional proverb","p","Look back at where you started."],
      ["Nothing is impossible to a willing heart.","Traditional proverb","p","You proved it this year."],
      ["Look at how far you have come.","Common sense","c","Then pick the next thing."]]
  };

  /* ---------------- 5TH GRADE · 180 days ------------------------------- */
  const Y2 = {
  /* Unit 1 · Truthfulness */
  1:[["Thou shalt not bear false witness against thy neighbour.","Exodus 20:16","s","Misquoting someone counts."],
     ["Truth is the daughter of time.","Traditional proverb","p","What is true survives being checked."],
     ["It is the mark of an educated mind to entertain a thought without accepting it.","after Aristotle","h","You can consider an idea without adopting it."],
     ["Facts are stubborn things.","John Adams","h","They do not care how you feel about them."],
     ["Quote it exactly or do not quote it.","Common sense","c","Approximate quotation is a small lie."]],
  2:[["He that hath knowledge spareth his words.","Proverbs 17:27","s","Knowing more should make you say less, not more."],
     ["Better to be silent and thought wise than to speak and be proven otherwise.","Traditional proverb","p","Especially online."],
     ["I have made this letter longer because I lacked the time to make it shorter.","after Blaise Pascal","h","Brevity is work."],
     ["Say it plainly.","Common sense","c","Big words are not the same as clear thinking."],
     ["Words are like arrows: once loosed they cannot be recalled.","Traditional proverb","p","Aim before you speak."]],
  3:[["Buy the truth, and sell it not; also wisdom, and instruction.","Proverbs 23:23","s","Truth sometimes costs you something."],
     ["The truth is rarely pure and never simple.","after Oscar Wilde","h","Beware of answers with no complications."],
     ["An error does not become truth by reason of multiplied propagation.","after Gandhi","h","Repetition is not evidence."],
     ["Extraordinary claims require extraordinary evidence.","Traditional principle of inquiry","p","The bigger the claim, the harder you check."],
     ["Ask who benefits from you believing it.","Common sense","c","Follow that thread."]],
  4:[["Whoso keepeth his mouth and his tongue keepeth his soul from troubles.","Proverbs 21:23","s","Most trouble starts as a sentence."],
     ["A rumour goes in one ear and out many mouths.","Traditional proverb","p","Be the place it stops."],
     ["Do not repeat what you cannot verify.","Common sense","c","'Someone said' is not a source."],
     ["Give every man thine ear, but few thy voice.","after Shakespeare","p","Listen widely; commit carefully."],
     ["The wise man doubts often, and changes his mind.","Traditional proverb","p","Changing your mind on evidence is strength."]],

  /* Unit 2 · Perseverance */
  5:[["Let us run with patience the race that is set before us.","Hebrews 12:1","s","Patience is part of the running."],
     ["Perseverance is not a long race but many short races one after another.","Traditional saying","p","Just today's leg."],
     ["Our greatest glory is not in never falling, but in rising every time we fall.","after Confucius","h","The falling is assumed."],
     ["Slow and steady wins the race.","Aesop","p","Consistency beats bursts."],
     ["Show up on the day you do not want to.","Common sense","c","That day counts double."]],
  6:[["A just man falleth seven times, and riseth up again.","Proverbs 24:16","s","Falling is not the disqualifier."],
     ["Little by little, one travels far.","Traditional proverb","p","Fifteen minutes is not nothing."],
     ["I have not failed. I have found ten thousand ways that will not work.","after Thomas Edison","h","A failed attempt is data."],
     ["The oak fought the wind and was broken; the willow bent and survived.","Aesop","p","Know when to bend."],
     ["Start over without complaining.","Common sense","c","The second attempt is always faster."]],
  7:[["Be not weary in well doing.","2 Thessalonians 3:13","s","Especially when it is unnoticed."],
     ["Constant dropping wears away a stone.","Traditional proverb","p","Repetition is a force."],
     ["Nothing in the world can take the place of persistence.","after Calvin Coolidge","h","Not talent. Not genius."],
     ["It does not matter how slowly you go so long as you do not stop.","after Confucius","h","Do not confuse slow with stopped."],
     ["Do the next right thing.","Common sense","c","Not the whole plan. The next thing."]],
  8:[["Cast not away therefore your confidence.","Hebrews 10:35","s","Discouragement is not evidence you were wrong."],
     ["When you reach the end of your rope, tie a knot and hang on.","Traditional saying","p","Sometimes holding on is the work."],
     ["The darkest hour is just before the dawn.","Traditional proverb","p","Do not decide anything at midnight."],
     ["Difficulties are things that show a person what they are.","after Epictetus","h","This week is showing you something."],
     ["Rest, then continue.","Common sense","c","Resting is not quitting."]],

  /* Unit 3 · Humility in listening */
  9:[["He that answereth a matter before he heareth it, it is folly and shame unto him.","Proverbs 18:13","s","Hear the whole thing first."],
     ["We have two ears and one mouth so that we can listen twice as much as we speak.","after Epictetus","h","Try the ratio today."],
     ["Everyone you meet knows something you do not.","Traditional saying","p","Go find out what."],
     ["Seek first to understand.","Common sense","c","Then ask to be understood."],
     ["A wise man changes his mind, a fool never.","Spanish proverb","p","Which one were you this week?"]],
  10:[["In lowliness of mind let each esteem others better than themselves.","Philippians 2:3","s","Assume the other person has a reason."],
      ["Pride goeth before a fall.","after Proverbs 16:18","s","Confidence without checking is a setup."],
      ["The more I learn, the more I realise how much I do not know.","after Albert Einstein","h","Learning should humble you."],
      ["Empty vessels make the most sound.","Traditional proverb","p","The loudest is rarely the wisest."],
      ["Say 'I could be wrong' and mean it.","Common sense","c","It costs nothing and buys a lot."]],
  11:[["Where no counsel is, the people fall.","Proverbs 11:14","s","Get another opinion before you commit."],
      ["Two heads are better than one.","Traditional proverb","p","Especially heads that disagree with you."],
      ["Better a friend who tells you the truth than one who agrees with you.","Traditional proverb","p","Value the honest one."],
      ["It is the province of knowledge to speak and the privilege of wisdom to listen.","Oliver Wendell Holmes","h","Both are skills."],
      ["Ask someone who disagrees with you.","Common sense","c","Before you decide, not after."]],
  12:[["Let every man be swift to hear, slow to speak.","James 1:19","s","In that order, always."],
      ["Judge not, that ye be not judged.","Matthew 7:1","s","You are not seeing the whole picture."],
      ["Before you criticise a man, walk a mile in his shoes.","Traditional saying","p","Then you are a mile away and have his shoes."],
      ["Nobody is entirely the villain of their own story.","Common sense","c","Ask what they thought they were doing."],
      ["Understand before you argue.","Common sense","c","State their view until they agree you have it."]],

  /* Unit 4 · Faithfulness over time */
  13:[["Whoso is faithful in that which is least is faithful also in much.","after Luke 16:10","s","Character shows up in the small stuff."],
      ["Trust is built slowly and broken quickly.","Traditional saying","p","Today adds a brick or removes ten."],
      ["Constancy is the foundation of virtue.","after Francis Bacon","h","Being the same person every day."],
      ["Keep the promise you made when it was easy.","Common sense","c","That is what makes it a promise."],
      ["Do what you said you would do.","Common sense","c","Even now that it is inconvenient."]],
  14:[["Better is the end of a thing than the beginning thereof.","Ecclesiastes 7:8","s","Finishing counts more than starting."],
      ["Well begun is half done.","Traditional proverb","p","But only half."],
      ["Time is the most valuable thing a man can spend.","after Theophrastus","h","You are spending it right now."],
      ["Lost time is never found again.","Benjamin Franklin","h","There is no catching up on yesterday."],
      ["Guard the first hour.","Common sense","c","It sets the rest."]],
  15:[["To every thing there is a season.","Ecclesiastes 3:1","s","Some things are not for right now."],
      ["Patience is bitter, but its fruit is sweet.","Traditional proverb","p","Wait well."],
      ["Adopt the pace of nature: her secret is patience.","after Ralph Waldo Emerson","h","Nothing good grows overnight."],
      ["All things come to those who wait — and work.","Traditional proverb","p","The second half matters."],
      ["Plant something you will not harvest.","Common sense","c","Someone planted for you."]],
  16:[["Let your speech be alway with grace.","Colossians 4:6","s","Grace does not mean vague."],
      ["The tongue has no bones but is strong enough to break a heart.","Traditional proverb","p","Handle carefully."],
      ["It is not what you say but how you say it.","Traditional saying","p","Tone is content."],
      ["When words are many, sin is not absent.","after Proverbs 10:19","s","Edit yourself."],
      ["Apologise specifically.","Common sense","c","'Sorry you were upset' is not an apology."]],

  /* Unit 5 · Peacemaking */
  17:[["Blessed are the peacemakers.","Matthew 5:9","s","Making peace is active work, not avoidance."],
      ["A soft answer turneth away wrath.","Proverbs 15:1","s","Try lowering your voice instead of raising it."],
      ["It takes two to make a quarrel.","Traditional proverb","p","You can decline to be the second."],
      ["Peace is not absence of conflict but the ability to handle conflict.","Traditional saying","p","Handle it, do not hide it."],
      ["Be the one who de-escalates.","Common sense","c","Somebody has to go first."]],
  18:[["If it be possible, as much as lieth in you, live peaceably with all men.","Romans 12:18","s","As much as depends on you."],
      ["A gentle answer is a strong answer.","Traditional proverb","p","Softness is not weakness."],
      ["Never cut what can be untied.","Traditional proverb","p","Try repair before rupture."],
      ["Do not burn a bridge you may need.","Common sense","c","The world is smaller than you think."],
      ["Assume the best interpretation first.","Common sense","c","You are usually right, and always calmer."]],
  19:[["Recompense to no man evil for evil.","Romans 12:17","s","Breaking the cycle is on you."],
      ["An eye for an eye leaves the whole world blind.","after Gandhi","h","Revenge multiplies."],
      ["He who cannot forgive breaks the bridge he must cross himself.","after George Herbert","h","You will need it."],
      ["The best revenge is to be unlike him who performed the injury.","Marcus Aurelius","h","Be different, not even."],
      ["Let it go before it grows.","Common sense","c","Grudges compound."]],
  20:[["Follow peace with all men.","Hebrews 12:14","s","Follow means pursue, not wait for."],
      ["Speak when you are angry and you will make the best speech you will ever regret.","Traditional saying","p","Sleep on it."],
      ["A quarrel is like buttermilk: the longer it stands the sourer it grows.","Irish proverb","p","Settle it early."],
      ["Say the hard thing kindly and early.","Common sense","c","Both words matter."],
      ["Choose the relationship over the point.","Common sense","c","Winning an argument can cost more than losing it."]],

  /* Unit 6 · Care and precision */
  21:[["Whatsoever ye do, do all to the glory of God.","1 Corinthians 10:31","s","Including the boring parts."],
      ["The devil is in the details.","Traditional proverb","p","So is the quality."],
      ["Take care of the little things and the big things take care of themselves.","Traditional proverb","p","Start small."],
      ["Perfection is achieved not when there is nothing more to add, but nothing left to take away.","after Antoine de Saint-Exupéry","h","Cut, do not pile on."],
      ["Proofread before you send.","Common sense","c","Once. Slowly. Out loud."]],
  22:[["Let all things be done decently and in order.","1 Corinthians 14:40","s","Order is a kindness to whoever comes next."],
      ["Measure twice, cut once.","Carpenter's proverb","p","Checking is cheaper than redoing."],
      ["Care and diligence bring luck.","Traditional proverb","p","Most 'luck' has a history."],
      ["Quality is never an accident.","after John Ruskin","h","Somebody chose it, step by step."],
      ["Do the unglamorous part properly.","Common sense","c","That is where the work actually is."]],
  23:[["He that despiseth small things shall fall by little and little.","after Sirach","p","Small carelessness compounds."],
      ["For want of a nail the shoe was lost; for want of a shoe the horse was lost.","Traditional proverb","p","Fix the nail."],
      ["Trifles make perfection, and perfection is no trifle.","after Michelangelo","h","The small things are the thing."],
      ["Neatness is a form of respect.","Common sense","c","For whoever reads it after you."],
      ["Label it now, not later.","Common sense","c","Future you will not remember."]],
  24:[["Study to shew thyself approved, a workman that needeth not to be ashamed.","2 Timothy 2:15","s","Work you can put your name on."],
      ["A workman is known by his tools.","Traditional proverb","p","And by how he keeps them."],
      ["If you do not have time to do it right, when will you have time to do it over?","Traditional saying","p","Usually never."],
      ["Sign your work.","Common sense","c","Then you will care how it looks."],
      ["Leave it better than you found it.","Common sense","c","Every desk, every room, every draft."]],

  /* Unit 7 · Wisdom */
  25:[["Wisdom is the principal thing; therefore get wisdom.","Proverbs 4:7","s","It is acquired, not issued."],
      ["The roots of education are bitter, but the fruit is sweet.","after Aristotle","h","The hard part comes first."],
      ["Knowing yourself is the beginning of all wisdom.","after Aristotle","h","Start with your own blind spots."],
      ["A man who does not read has no advantage over one who cannot.","after Mark Twain","h","The book only works if you open it."],
      ["Learn one new word properly.","Common sense","c","Properly means you can use it."]],
  26:[["Apply thine heart unto instruction, and thine ears to the words of knowledge.","Proverbs 23:12","s","Heart and ears, not just eyes."],
      ["He who opens a school door closes a prison.","after Victor Hugo","h","Education is not a formality."],
      ["Education is not the filling of a pail but the lighting of a fire.","after Plutarch","h","Curiosity is the point."],
      ["Tell me and I forget; teach me and I remember; involve me and I learn.","Traditional saying","p","Do it, do not just read it."],
      ["Teach it to someone else.","Common sense","c","That is how you find out if you know it."]],
  27:[["Through wisdom is an house builded; and by understanding it is established.","Proverbs 24:3","s","Build on understanding, not opinion."],
      ["The unexamined life is not worth living.","after Socrates","h","Ask yourself hard questions."],
      ["Doubt is not a pleasant condition, but certainty is absurd.","after Voltaire","h","Certainty should be earned."],
      ["Judge a man by his questions rather than his answers.","after Voltaire","h","Good questions are rarer."],
      ["Write down what you learned today.","Common sense","c","Otherwise it evaporates."]],
  28:[["In all thy getting get understanding.","Proverbs 4:7","s","Facts are cheap; understanding is not."],
      ["Reading without reflecting is like eating without digesting.","after Edmund Burke","h","Stop and think about it."],
      ["Any fool can know; the point is to understand.","after Albert Einstein","h","Can you explain it simply?"],
      ["If you cannot explain it simply, you do not understand it.","Traditional principle","p","Try explaining it to a younger child."],
      ["Close the book and say it back.","Common sense","c","That is the real test."]],

  /* Unit 8 · Discernment */
  29:[["Prove all things; hold fast that which is good.","1 Thessalonians 5:21","s","Test first, then hold on."],
      ["A lie can travel halfway around the world while the truth is putting on its shoes.","Traditional saying","p","Be slow to forward."],
      ["Beware of false prophets, which come to you in sheep's clothing.","Matthew 7:15","s","Presentation is not proof."],
      ["The first principle is that you must not fool yourself, and you are the easiest person to fool.","after Richard Feynman","h","Check your own reasoning hardest."],
      ["Check the source before you share it.","Common sense","c","Thirty seconds. Every time."]],
  30:[["The simple believeth every word: but the prudent man looketh well to his going.","Proverbs 14:15","s","Believing everything is not kindness."],
      ["Do not believe everything you think.","Traditional saying","p","Thoughts are not facts."],
      ["When the facts change, I change my mind.","after John Maynard Keynes","h","What do you do?"],
      ["Consider the source, then consider the evidence.","Common sense","c","Both. Not one."],
      ["It is easier to fool people than to convince them they have been fooled.","after Mark Twain","h","Be willing to be corrected."]],
  31:[["Buy the truth, and sell it not.","Proverbs 23:23","s","Hold it even when it costs."],
      ["Half a truth is often a great lie.","Benjamin Franklin","h","Watch what gets left out."],
      ["Figures do not lie, but liars figure.","Traditional saying","p","Ask how the number was measured."],
      ["A single statistic without context is a claim, not evidence.","Common sense","c","Compared to what? Over what period?"],
      ["Notice which words were chosen.","Common sense","c","'Crowd' or 'mob' is an argument."]],
  32:[["Ponder the path of thy feet, and let all thy ways be established.","Proverbs 4:26","s","Look where you are actually walking."],
      ["Not everything that counts can be counted.","Traditional saying","p","Some real things resist measurement."],
      ["The map is not the territory.","Alfred Korzybski","h","The model is not the thing."],
      ["Strong opinions are cheap; strong evidence is not.","Common sense","c","Which do you have?"],
      ["Steelman the other side.","Common sense","c","Build their case better than they did."]],

  /* Unit 9 · Witness */
  33:[["Be ready always to give an answer to every man that asketh you a reason.","1 Peter 3:15","s","A reason, not a feeling."],
      ["Let your light so shine before men, that they may see your good works.","Matthew 5:16","s","Works, not announcements."],
      ["Preach the gospel at all times; if necessary, use words.","Attributed to Francis of Assisi","p","Mostly it is how you behave."],
      ["Example is not the main thing in influencing others; it is the only thing.","after Albert Schweitzer","h","They watch what you do."],
      ["Be the same person in every room.","Common sense","c","Integrity is literally one-ness."]],
  34:[["Whatsoever ye would that men should do to you, do ye even so to them.","Matthew 7:12","s","Still the best test there is."],
      ["Injustice anywhere is a threat to justice everywhere.","after Martin Luther King Jr.","h","It is not only your business when it is yours."],
      ["The world is a dangerous place, not because of those who do evil, but those who look on and do nothing.","after Albert Einstein","h","Looking on is a choice."],
      ["Speak up for those who cannot speak for themselves.","after Proverbs 31:8","s","Especially when it costs you."],
      ["Do the right thing when it is inconvenient.","Common sense","c","That is the only time it is a test."]],
  35:[["Let us not love in word, neither in tongue; but in deed and in truth.","1 John 3:18","s","Deeds and truth, both."],
      ["The best way to find yourself is to lose yourself in the service of others.","after Gandhi","h","Try one hour this week."],
      ["Everybody can be great, because everybody can serve.","after Martin Luther King Jr.","h","No qualifications required."],
      ["We make a living by what we get; we make a life by what we give.","Traditional saying","p","Two different accounts."],
      ["Volunteer for the job nobody wants.","Common sense","c","That is where character is built."]],
  36:[["I have fought a good fight, I have finished my course, I have kept the faith.","2 Timothy 4:7","s","All three, in order."],
      ["The end crowns the work.","Traditional proverb","p","Look back at week one."],
      ["It is not the beginning but the continuing until it is thoroughly finished that yields the true glory.","after Francis Drake","h","You continued."],
      ["What you learn is yours forever.","Common sense","c","Nobody can take this year back."],
      ["Now go and use it.","Common sense","c","A year of learning is for spending."]]
  };

  /* One quote per school day. Deterministic: same week and day always gives
   * the same quote, so a child cannot reroll for an easier one and a parent
   * can look up what was read on a given day. */
  const DAY_INDEX = {Mon:0, Tue:1, Wed:2, Thu:3, Fri:4};

  function quoteFor(grade, week, day){
    const table = grade==="y2" ? Y2 : Y1;
    const rows = table[week] || table[1];
    const i = DAY_INDEX[day]==null ? 0 : DAY_INDEX[day];
    const r = rows[i] || rows[0];
    const KIND = {s:"Scripture", p:"Proverb", h:"Said long ago", c:"Common sense"};
    return {
      id: "la-"+grade+"-quote-w"+week+"-"+day.toLowerCase(),
      text: r[0], source: r[1], kind: r[2], kindLabel: KIND[r[2]] || "", think: r[3]
    };
  }

  function countFor(grade){
    const t = grade==="y2" ? Y2 : Y1;
    return Object.keys(t).reduce((n,k)=>n+t[k].length, 0);
  }

  window.__CURR = window.__CURR || {};
  window.__CURR.LA_QUOTES = {Y1, Y2, quoteFor, countFor, DAY_INDEX};
})();
