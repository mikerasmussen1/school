/* ============================================================================
 * WORD VOYAGERS — QUOTE OF THE DAY
 * ----------------------------------------------------------------------------
 * One short reading for every one of the 180 school days, in both grades,
 * tied to the virtue of the unit it falls in.
 *
 * WHAT THIS SET IS AIMED AT. These are chosen to form boys into strong,
 * courageous, faithful men — men who keep their word, do hard work without
 * being watched, master their own temper, protect people weaker than they are,
 * and stand alone when standing alone is what is required.
 *
 * A DELIBERATE BALANCE, worth stating because it shapes every entry here.
 * Scripture's picture of a strong man is not a loud one. "Quit you like men,
 * be strong" sits in the same Bible as "he that ruleth his spirit is better
 * than he that taketh a city," and as a Christ who wept, knelt, and washed
 * feet. So roughly a third of these are about courage and strength, and the
 * rest are about what strength is FOR: keeping promises, controlling temper,
 * telling the truth when it costs, carrying what others cannot, and treating
 * mothers and sisters and smaller boys well. A set that only said "be tough"
 * would be forming something other than a Christian man, and would not match
 * what the family asked for.
 *
 * SOURCES. Public domain or traditional throughout: Scripture in King James
 * wording, traditional proverbs, and men whose writing is long out of
 * copyright — Washington, Lincoln, Franklin, Douglass, Booker T. Washington,
 * Theodore Roosevelt, Marcus Aurelius, Epictetus. Nothing from a living
 * writer or a modern copyrighted translation.
 *
 * Where a line is a paraphrase rather than a direct quotation, the source
 * reads "after <name>", so nobody is misled about which is which. Unit 1 of
 * this curriculum teaches exactly that distinction.
 *
 * FORMAT  [text, source, kind, think]
 *   kind: "s" scripture · "p" proverb/adage · "h" historical · "c" common sense
 *   think: one short line turning it into something he can do today.
 * ==========================================================================*/
(function(){

  /* ---------------- 3RD GRADE · 180 days ------------------------------- */
  const Y1 = {
  /* Unit 1 · Truthful speech */
  1:[["Let your yea be yea; and your nay, nay.","James 5:12","s","When you say you will, you will."],
     ["A word fitly spoken is like apples of gold in pictures of silver.","Proverbs 25:11","s","The right true word at the right time."],
     ["A man is only as good as his word.","Traditional proverb","p","Yours starts being worth something today."],
     ["Undertake not what you cannot perform, but be careful to keep your promise.","George Washington","h","Promise less. Then do it."],
     ["Say it, then do it.","Common sense","c","That is the whole of being trusted."]],
  2:[["Whatsoever thy hand findeth to do, do it with thy might.","Ecclesiastes 9:10","s","Half effort is a kind of lying."],
     ["Well done is better than well said.","Benjamin Franklin","h","Nobody is impressed by plans."],
     ["Actions speak louder than words.","Traditional proverb","p","What did you actually do today?"],
     ["Do the job nobody thanked you for.","Common sense","c","That is where a man is made."],
     ["A promise made is a debt unpaid.","Traditional proverb","p","Pay it before you are reminded."]],
  3:[["Let all things be done decently and in order.","1 Corinthians 14:40","s","Leave your things the way a man would."],
     ["A place for everything, and everything in its place.","Traditional proverb","p","Put one thing back without being asked."],
     ["Little strokes fell great oaks.","Benjamin Franklin","h","Small steady work moves heavy things."],
     ["Measure twice, cut once.","Carpenter's proverb","p","Careful now beats sorry later."],
     ["Finish what you start.","Common sense","c","Quitting halfway is a habit. So is finishing."]],
  4:[["A soft answer turneth away wrath.","Proverbs 15:1","s","The strong man is the quiet one in an argument."],
     ["He that ruleth his spirit is better than he that taketh a city.","Proverbs 16:32","s","Controlling your temper is real strength."],
     ["He that cannot obey cannot command.","Benjamin Franklin","h","Learn to follow first."],
     ["Speak little, do much.","Traditional proverb","p","Be the one who says less and carries more."],
     ["Lower your voice when he raises his.","Common sense","c","It takes more strength than shouting."]],

  /* Unit 2 · Stewardship */
  5:[["The earth is the Lord's, and the fulness thereof.","Psalm 24:1","s","Take care of what was handed to you."],
     ["He that is faithful in that which is least is faithful also in much.","Luke 16:10","s","Big trust is built out of small jobs."],
     ["Waste not, want not.","Traditional proverb","p","Use it up before you ask for more."],
     ["No man has a right to be idle.","after Theodore Roosevelt","h","Find something that needs doing."],
     ["Leave it better than you found it.","Common sense","c","Every room, every tool, every day."]],
  6:[["Go to the ant, thou sluggard; consider her ways, and be wise.","Proverbs 6:6","s","Nobody has to supervise the ant."],
     ["Make hay while the sun shines.","Traditional proverb","p","Do it while you can, not when you feel like it."],
     ["Don't put off till tomorrow what you can do today.","Benjamin Franklin","h","Pick the thing you have been avoiding."],
     ["A stitch in time saves nine.","Traditional proverb","p","Fix the small break now."],
     ["Do the hard part first.","Common sense","c","The day gets easier from there."]],
  7:[["In all thy ways acknowledge him, and he shall direct thy paths.","Proverbs 3:6","s","Ask before you are stuck."],
     ["Give thanks in all circumstances.","after 1 Thessalonians 5:18","s","Say it out loud to somebody."],
     ["Gratitude is not only the greatest of virtues, but the parent of all others.","after Cicero","h","Start there and the rest follow."],
     ["Count your blessings, not your troubles.","Traditional proverb","p","Write the list. It is longer than you think."],
     ["Thank the person who did it for you.","Common sense","c","To their face."]],
  8:[["Every good gift is from above.","after James 1:17","s","You built none of this from nothing."],
     ["Enough is as good as a feast.","Traditional proverb","p","Wanting less is a kind of strength."],
     ["Character, not circumstances, makes the man.","Booker T. Washington","h","You do not need better conditions to start."],
     ["Contentment is natural wealth.","after Socrates","h","Name one thing you already have enough of."],
     ["Want what you have.","Common sense","c","Look around before you look ahead."]],

  /* Unit 3 · Courage */
  9:[["Be strong and of a good courage; be not afraid.","Joshua 1:9","s","Courage is doing it while still scared."],
     ["Watch ye, stand fast in the faith, quit you like men, be strong.","1 Corinthians 16:13","s","Stand where you said you would stand."],
     ["Courage is not the absence of fear, but action in spite of it.","Traditional saying","p","The fear does not have to leave first."],
     ["Far better it is to dare mighty things than to take rank with those who neither enjoy much nor suffer much.","after Theodore Roosevelt","h","Try the harder thing."],
     ["Speak up when it is hard.","Common sense","c","Someone is waiting for one boy to go first."]],
  10:[["The righteous are bold as a lion.","Proverbs 28:1","s","A clean conscience makes a steady voice."],
      ["Stand for something or you will fall for anything.","Traditional saying","p","Decide before the moment comes."],
      ["It is easier to stand up the first time than the tenth.","Common sense","c","Every time you go along, it gets harder to stop."],
      ["One man with courage makes a majority.","after Andrew Jackson","h","You do not need permission to be right."],
      ["A coward dies many times; the brave man dies but once.","after Shakespeare","p","Worrying costs more than doing."]],
  11:[["Fear thou not; for I am with thee.","Isaiah 41:10","s","You are not doing it alone."],
      ["Fall down seven times, stand up eight.","Japanese proverb","p","Getting up is the whole skill."],
      ["Smooth seas never made a skilled sailor.","Traditional proverb","p","The hard week is training you."],
      ["Success is to be measured not by position reached but by obstacles overcome.","after Booker T. Washington","h","Count what you got through."],
      ["Try again tomorrow.","Common sense","c","One bad day is one day."]],
  12:[["Let us not be weary in well doing.","Galatians 6:9","s","Keep going when nobody claps."],
      ["It is not the size of the dog in the fight, but the size of the fight in the dog.","Traditional saying","p","Heart beats size."],
      ["Energy and persistence conquer all things.","Benjamin Franklin","h","Stubbornness, pointed the right way."],
      ["Rome was not built in a day.","Traditional proverb","p","Slow is still forward."],
      ["Keep going two minutes past when you wanted to stop.","Common sense","c","That is where you grow."]],

  /* Unit 4 · Diligence */
  13:[["The hand of the diligent shall bear rule.","Proverbs 12:24","s","Careful work quietly earns command."],
      ["The glory of young men is their strength.","Proverbs 20:29","s","Spend it on something worth doing."],
      ["If a job is worth doing, it is worth doing well.","Traditional proverb","p","Sand the part nobody will see."],
      ["There is no substitute for hard work.","after Thomas Edison","h","None. Not talent, not luck."],
      ["Do it right or do it twice.","Common sense","c","Rushing is the slow way."]],
  14:[["Whatsoever ye do, do it heartily.","Colossians 3:23","s","Half-hearted work is its own punishment."],
      ["Early to bed and early to rise makes a man healthy, wealthy, and wise.","Benjamin Franklin","h","Win the morning."],
      ["Lost time is never found again.","Benjamin Franklin","h","This hour is not coming back."],
      ["Practice makes progress.","Common sense","c","Not perfect. Better than yesterday."],
      ["A journey of a thousand miles begins with a single step.","Chinese proverb","p","Take the first one badly if you must."]],
  15:[["Two are better than one, for they have a good reward for their labour.","Ecclesiastes 4:9","s","Ask someone to work beside you."],
      ["Many hands make light work.","Traditional proverb","p","Offer before you are asked."],
      ["A chain is only as strong as its weakest link.","Traditional proverb","p","Go help whoever is struggling most."],
      ["Do your share, and then some.","Common sense","c","The 'and then some' is what people remember."],
      ["If you want to go far, go together.","African proverb","p","Bring somebody with you."]],
  16:[["Iron sharpeneth iron; so a man sharpeneth the countenance of his friend.","Proverbs 27:17","s","A good friend makes you better, not just comfortable."],
      ["A man that hath friends must shew himself friendly.","Proverbs 18:24","s","Go first."],
      ["Tell me who your friends are and I will tell you who you are.","Traditional proverb","p","Who are you becoming?"],
      ["Be slow in choosing a friend, slower in changing.","Benjamin Franklin","h","Loyalty is built slowly."],
      ["Stand by your friend when it costs you something.","Common sense","c","That is when it counts."]],

  /* Unit 5 · Honesty */
  17:[["Lie not one to another.","Colossians 3:9","s","One honest sentence today, even if it costs."],
      ["Truth fears no questions.","Traditional proverb","p","True stories come out the same twice."],
      ["Honesty is the first chapter in the book of wisdom.","after Thomas Jefferson","h","Everything else is built on it."],
      ["A half truth is a whole lie.","Traditional proverb","p","Leaving it out still counts."],
      ["Tell it before someone else does.","Common sense","c","It never gets easier by waiting."]],
  18:[["Buy the truth, and sell it not.","Proverbs 23:23","s","Some truths cost you. Pay it."],
      ["I hope I shall possess firmness enough to maintain the character of an honest man.","George Washington","h","Firmness is the word. It takes some."],
      ["It takes many good deeds to build a good reputation, and only one bad one to lose it.","Benjamin Franklin","h","Guard it today."],
      ["Cheaters never prosper.","Traditional proverb","p","A win you did not earn is not a win."],
      ["Own the mistake out loud.","Common sense","c","Say 'I did that' and watch it shrink."]],
  19:[["Let your light so shine before men.","Matthew 5:16","s","Someone is watching how you handle small things."],
      ["Character is what you do when no one is looking.","Traditional saying","p","Today's test is probably a small one."],
      ["I would rather be right than president.","Henry Clay","h","Popular and correct are different things."],
      ["The truth will out.","Traditional proverb","p","It surfaces. Always."],
      ["Do the right thing quietly.","Common sense","c","No announcement needed."]],
  20:[["A good name is rather to be chosen than great riches.","Proverbs 22:1","s","Your word is your real property."],
      ["Let no man despise thy youth; but be thou an example.","1 Timothy 4:12","s","Young is not an excuse. It is a starting line."],
      ["Promise little and do much.","Traditional proverb","p","Under-promise. Then show up."],
      ["Trust is earned in drops and lost in buckets.","Traditional saying","p","Add a drop today."],
      ["Be the same boy at home and away.","Common sense","c","One person, not two."]],

  /* Unit 6 · Family and belonging */
  21:[["Honour thy father and thy mother.","Exodus 20:12","s","Do it before you are asked twice."],
      ["A house divided against itself cannot stand.","Abraham Lincoln","h","Peace at home takes work from you too."],
      ["He who is good to his mother is worth knowing.","Traditional proverb","p","Go say something kind to her."],
      ["Charity begins at home.","Traditional proverb","p","Kindness counts most where nobody applauds."],
      ["Carry the heavy end.","Common sense","c","Especially for someone smaller."]],
  22:[["Bear ye one another's burdens.","Galatians 6:2","s","Carry something for somebody today."],
      ["Greater love hath no man than this, that a man lay down his life for his friends.","John 15:13","s","Strength is for spending on other people."],
      ["No one is useless who lightens the burden of another.","after Charles Dickens","h","Small help is real help."],
      ["A burden shared is a burden halved.","Traditional proverb","p","Ask for help. It is not weakness."],
      ["Notice who is left out, then go sit with him.","Common sense","c","That is what a strong boy does."]],
  23:[["Love thy neighbour as thyself.","Mark 12:31","s","Neighbour means whoever is nearest today."],
      ["Do unto others as you would have them do unto you.","Matthew 7:12","s","The oldest test and still the best."],
      ["Be kind, for everyone you meet is fighting a hard battle.","Traditional saying","p","You do not know what his week was."],
      ["Defend the boy who cannot defend himself.","Common sense","c","That is what your strength is for."],
      ["A kind word is never wasted.","Traditional proverb","p","Even if he does not answer."]],
  24:[["Be ye kind one to another, tenderhearted, forgiving.","Ephesians 4:32","s","Tenderhearted is in there on purpose."],
      ["Let not the sun go down upon your wrath.","Ephesians 4:26","s","Settle it before bed."],
      ["To err is human; to forgive, divine.","Alexander Pope","h","You will need it back one day."],
      ["Holding a grudge is carrying a weight you chose.","Common sense","c","Put it down."],
      ["Apologise first, even when it was mostly him.","Common sense","c","Going first is the harder job."]],

  /* Unit 7 · Wisdom and growth */
  25:[["Get wisdom, and with all thy getting get understanding.","Proverbs 4:7","s","Knowing a fact is not understanding it."],
      ["An investment in knowledge pays the best interest.","Benjamin Franklin","h","What you learn, you keep."],
      ["Live and learn.","Traditional proverb","p","Today's mistake is tomorrow's skill."],
      ["The only true wisdom is in knowing you know nothing.","after Socrates","h","Say 'I don't know' out loud today."],
      ["Ask the question.","Common sense","c","The embarrassment lasts a minute. Not knowing lasts years."]],
  26:[["A wise man will hear, and will increase learning.","Proverbs 1:5","s","Listening is how wise men got wise."],
      ["He who asks is a fool for five minutes; he who does not ask remains a fool forever.","Chinese proverb","p","Raise your hand."],
      ["I am a slow walker, but I never walk back.","Abraham Lincoln","h","Slow forward beats fast backward."],
      ["Learn from other men's mistakes.","Common sense","c","You will not live long enough to make them all."],
      ["You have two ears and one mouth.","Traditional saying","p","Use them in that ratio."]],
  27:[["Blessed is the man that findeth wisdom.","Proverbs 3:13","s","Found — which means somebody went looking."],
      ["Once you learn to read, you will be forever free.","Frederick Douglass","h","He risked a great deal to learn."],
      ["Reading is to the mind what exercise is to the body.","Traditional saying","p","Twenty minutes counts."],
      ["Knowledge is power.","Traditional saying","p","But only when you use it."],
      ["Read something harder than you are.","Common sense","c","That is where growing happens."]],
  28:[["The fear of the Lord is the beginning of wisdom.","Proverbs 9:10","s","Wisdom starts with knowing you are not the biggest thing."],
      ["Pride goeth before destruction, and an haughty spirit before a fall.","Proverbs 16:18","s","Check your confidence against the facts."],
      ["Humility is not thinking less of yourself, but thinking of yourself less.","Traditional saying","p","Ask about his day first."],
      ["He that is taught only by himself has a fool for a master.","Ben Jonson","h","Let someone correct you today."],
      ["Admit it fast when you are wrong.","Common sense","c","It costs less that way."]],

  /* Unit 8 · Discernment */
  29:[["Prove all things; hold fast that which is good.","1 Thessalonians 5:21","s","Test it before you believe it."],
      ["All that glitters is not gold.","Traditional proverb","p","Look past the shine."],
      ["Believe none of what you hear and half of what you see.","Traditional proverb","p","Check before you repeat."],
      ["Keep your eyes on the stars and your feet on the ground.","Theodore Roosevelt","h","Both at once."],
      ["Ask where he got that.","Common sense","c","A fact without a source is a rumour."]],
  30:[["Be ye wise as serpents, and harmless as doves.","Matthew 10:16","s","Sharp and safe are not opposites."],
      ["Look before you leap.","Traditional proverb","p","One breath before you decide."],
      ["Do not judge a book by its cover.","Traditional proverb","p","Give the second look."],
      ["It is not what you look at that matters, it is what you see.","after Henry David Thoreau","h","Look again, slower."],
      ["Slow down when it feels urgent.","Common sense","c","Urgency is how boys get talked into things."]],
  31:[["Let every man be swift to hear, slow to speak, slow to wrath.","James 1:19","s","In that order. Always."],
      ["When angry, count to ten; when very angry, a hundred.","after Thomas Jefferson","h","Anger is a bad advisor."],
      ["Least said, soonest mended.","Traditional proverb","p","Not every thought needs an audience."],
      ["Speak softly and carry a big stick.","Theodore Roosevelt","h","Quiet and capable. Not loud and empty."],
      ["Wait a day before you send it.","Common sense","c","You will change it."]],
  32:[["A prudent man foreseeth the evil, and hideth himself.","Proverbs 22:3","s","Seeing it coming is a skill you can build."],
      ["An ounce of prevention is worth a pound of cure.","Benjamin Franklin","h","Do the small thing now."],
      ["Do not count your chickens before they hatch.","Traditional proverb","p","Wait until it is real."],
      ["Hope for the best, prepare for the worst.","Traditional proverb","p","Both, not one."],
      ["Have a plan for when it goes wrong.","Common sense","c","Then the first plan gets easier."]],

  /* Unit 9 · Witness and service */
  33:[["Let us not love in word, neither in tongue; but in deed and in truth.","1 John 3:18","s","Love is a verb today."],
      ["Deeds, not words.","Traditional proverb","p","What will you actually do?"],
      ["The best way to find yourself is to lose yourself in the service of others.","after Gandhi","h","Help somebody with no audience."],
      ["Whosoever will be chief among you, let him be your servant.","Matthew 20:27","s","Leading means serving first."],
      ["Do something useful today.","Common sense","c","Useful beats impressive."]],
  34:[["Freely ye have received, freely give.","Matthew 10:8","s","You did not earn everything you have."],
      ["It is more blessed to give than to receive.","Acts 20:35","s","Test it and see."],
      ["No act of kindness, however small, is ever wasted.","after Aesop","p","Small counts."],
      ["Give what you can, where you are.","Common sense","c","You do not need to be grown to be generous."],
      ["Open the door for somebody.","Common sense","c","Start there. It is a habit."]],
  35:[["Be ready always to give an answer.","1 Peter 3:15","s","Know why you believe what you believe."],
      ["Speak the truth, even if your voice shakes.","Traditional saying","p","Shaking is allowed."],
      ["Stand with anybody that stands right.","Abraham Lincoln","h","Stand with him, part with him when he goes wrong."],
      ["Have a reason, not just a feeling.","Common sense","c","Could you explain it to someone who disagrees?"],
      ["Stand for what is right even if you stand alone.","Traditional saying","p","Sometimes the count is one."]],
  36:[["Well done, thou good and faithful servant.","Matthew 25:21","s","Faithful in the ordinary is the goal."],
      ["I have fought a good fight, I have finished my course.","after 2 Timothy 4:7","s","You finished a whole year."],
      ["Do what you can, with what you have, where you are.","Theodore Roosevelt","h","No better conditions required."],
      ["The end crowns the work.","Traditional proverb","p","Look back at where you started."],
      ["Now go and use it.","Common sense","c","A year of learning is for spending."]]
  };

  /* ---------------- 5TH GRADE · 180 days ------------------------------- */
  const Y2 = {
  /* Unit 1 · Truthfulness */
  1:[["Thou shalt not bear false witness against thy neighbour.","Exodus 20:16","s","Misquoting a man counts."],
     ["Quit you like men, be strong.","1 Corinthians 16:13","s","Strength starts with telling the truth."],
     ["Facts are stubborn things.","John Adams","h","They do not care how you feel about them."],
     ["I cannot tell a lie is a story about a boy; being unable to lie is a decision a man makes.","Common sense","c","Make it early."],
     ["Quote it exactly or do not quote it.","Common sense","c","Approximate quotation is a small lie."]],
  2:[["He that hath knowledge spareth his words.","Proverbs 17:27","s","Knowing more should make you say less."],
     ["It is the mark of an educated mind to entertain a thought without accepting it.","after Aristotle","h","Consider without adopting."],
     ["Better to be silent and thought wise than to speak and be proven otherwise.","Traditional proverb","p","Especially in a group."],
     ["Words are like arrows: once loosed they cannot be recalled.","Traditional proverb","p","Aim before you speak."],
     ["Say it plainly.","Common sense","c","Big words are not the same as clear thinking."]],
  3:[["Buy the truth, and sell it not; also wisdom, and instruction.","Proverbs 23:23","s","Sometimes the truth costs you the argument."],
     ["An error does not become truth by reason of multiplied propagation.","after Gandhi","h","Repetition is not evidence."],
     ["The truth is rarely pure and never simple.","after Oscar Wilde","h","Be wary of answers with no complications."],
     ["Extraordinary claims require extraordinary evidence.","Traditional principle of inquiry","p","The bigger the claim, the harder you check."],
     ["Ask who benefits from you believing it.","Common sense","c","Then follow that thread."]],
  4:[["Whoso keepeth his mouth and his tongue keepeth his soul from troubles.","Proverbs 21:23","s","Most trouble starts as a sentence."],
     ["A rumour goes in one ear and out many mouths.","Traditional proverb","p","Be the place it stops."],
     ["Give every man thine ear, but few thy voice.","after Shakespeare","p","Listen widely; commit carefully."],
     ["Do not repeat what you cannot verify.","Common sense","c","'Someone said' is not a source."],
     ["Defend a man's name when he is not in the room.","Common sense","c","That is what loyalty actually looks like."]],

  /* Unit 2 · Perseverance */
  5:[["Let us run with patience the race that is set before us.","Hebrews 12:1","s","Patience is part of the running."],
     ["It is not the critic who counts; the credit belongs to the man who is actually in the arena.","after Theodore Roosevelt","h","Be in it, not commenting on it."],
     ["Our greatest glory is not in never falling, but in rising every time we fall.","after Confucius","h","The falling is assumed."],
     ["Slow and steady wins the race.","Aesop","p","Consistency beats bursts."],
     ["Show up on the day you do not want to.","Common sense","c","That day counts double."]],
  6:[["A just man falleth seven times, and riseth up again.","Proverbs 24:16","s","Falling is not the disqualifier."],
     ["I have not failed. I have found ten thousand ways that will not work.","after Thomas Edison","h","A failed attempt is data."],
     ["Little by little, one travels far.","Traditional proverb","p","Fifteen minutes is not nothing."],
     ["Success is measured by the obstacles overcome while trying to succeed.","after Booker T. Washington","h","Count what you got through."],
     ["Start over without complaining.","Common sense","c","The second attempt is always faster."]],
  7:[["Be not weary in well doing.","2 Thessalonians 3:13","s","Especially when nobody notices."],
     ["Nothing in the world can take the place of persistence.","after Calvin Coolidge","h","Not talent. Not genius."],
     ["Constant dropping wears away a stone.","Traditional proverb","p","Repetition is a force."],
     ["It does not matter how slowly you go so long as you do not stop.","after Confucius","h","Slow is not stopped."],
     ["Do the next right thing.","Common sense","c","Not the whole plan. The next thing."]],
  8:[["Cast not away therefore your confidence.","Hebrews 10:35","s","Discouragement is not proof you were wrong."],
     ["When you reach the end of your rope, tie a knot and hang on.","Traditional saying","p","Sometimes holding on is the work."],
     ["Difficulties are things that show a man what he is.","after Epictetus","h","This week is showing you something."],
     ["The darkest hour is just before the dawn.","Traditional proverb","p","Decide nothing at midnight."],
     ["Rest, then continue.","Common sense","c","Resting is not quitting."]],

  /* Unit 3 · Humility in listening */
  9:[["He that answereth a matter before he heareth it, it is folly and shame unto him.","Proverbs 18:13","s","Hear the whole thing first."],
     ["We have two ears and one mouth so that we can listen twice as much as we speak.","after Epictetus","h","Try the ratio today."],
     ["Every man you meet knows something you do not.","Traditional saying","p","Go find out what."],
     ["Seek first to understand.","Common sense","c","Then ask to be understood."],
     ["A wise man changes his mind; a fool never does.","Spanish proverb","p","Which were you this week?"]],
  10:[["In lowliness of mind let each esteem others better than themselves.","Philippians 2:3","s","Assume he has a reason."],
      ["The more I learn, the more I realise how much I do not know.","after Albert Einstein","h","Learning should humble you."],
      ["Empty vessels make the most sound.","Traditional proverb","p","The loudest is rarely the wisest."],
      ["Do not be haughty, but condescend to men of low estate.","Romans 12:16","s","Sit with whoever nobody sits with."],
      ["Say 'I could be wrong' and mean it.","Common sense","c","It costs nothing and buys a lot."]],
  11:[["Where no counsel is, the people fall.","Proverbs 11:14","s","Get another opinion before you commit."],
      ["Better a friend who tells you the truth than one who agrees with you.","Traditional proverb","p","Value the honest one."],
      ["It is the province of knowledge to speak and the privilege of wisdom to listen.","Oliver Wendell Holmes","h","Both are skills."],
      ["Faithful are the wounds of a friend.","Proverbs 27:6","s","A real friend will tell you the hard thing."],
      ["Ask someone who disagrees with you.","Common sense","c","Before you decide, not after."]],
  12:[["Let every man be swift to hear, slow to speak.","James 1:19","s","In that order, always."],
      ["Judge not, that ye be not judged.","Matthew 7:1","s","You are not seeing the whole picture."],
      ["Before you criticise a man, walk a mile in his shoes.","Traditional saying","p","Then you have some perspective."],
      ["Nobody is entirely the villain of his own story.","Common sense","c","Ask what he thought he was doing."],
      ["Understand before you argue.","Common sense","c","State his view until he agrees you have it."]],

  /* Unit 4 · Faithfulness over time */
  13:[["Whoso is faithful in that which is least is faithful also in much.","after Luke 16:10","s","Character shows in the small stuff."],
      ["Associate with men of good quality if you esteem your own reputation.","George Washington","h","You become the room you stand in."],
      ["Constancy is the foundation of virtue.","after Francis Bacon","h","Being the same man every day."],
      ["Trust is built slowly and broken quickly.","Traditional saying","p","Today adds a brick or removes ten."],
      ["Keep the promise you made when it was easy.","Common sense","c","That is what makes it a promise."]],
  14:[["Better is the end of a thing than the beginning thereof.","Ecclesiastes 7:8","s","Finishing counts more than starting."],
      ["Time is the most valuable thing a man can spend.","after Theophrastus","h","You are spending it right now."],
      ["Lost time is never found again.","Benjamin Franklin","h","There is no catching up on yesterday."],
      ["Well begun is half done.","Traditional proverb","p","But only half."],
      ["Guard the first hour of the day.","Common sense","c","It sets the rest of it."]],
  15:[["To every thing there is a season.","Ecclesiastes 3:1","s","Some things are not for right now."],
      ["Whatsoever a man soweth, that shall he also reap.","Galatians 6:7","s","You are planting something today either way."],
      ["Patience is bitter, but its fruit is sweet.","Traditional proverb","p","Wait well."],
      ["Plant a tree you will never sit under.","Traditional proverb","p","Someone planted for you."],
      ["Do the work now that pays off in a year.","Common sense","c","Most good things are slow."]],
  16:[["Let your speech be alway with grace.","Colossians 4:6","s","Grace does not mean vague."],
      ["The tongue has no bones but is strong enough to break a heart.","Traditional proverb","p","Handle it carefully."],
      ["When words are many, sin is not absent.","after Proverbs 10:19","s","Edit yourself."],
      ["A gentle answer is a strong answer.","Traditional proverb","p","Softness under control is strength."],
      ["Apologise specifically.","Common sense","c","'Sorry you were upset' is not an apology."]],

  /* Unit 5 · Peacemaking */
  17:[["Blessed are the peacemakers.","Matthew 5:9","s","Making peace is work, not avoidance."],
      ["A soft answer turneth away wrath.","Proverbs 15:1","s","Lower your voice, not your ground."],
      ["He that ruleth his spirit is better than he that taketh a city.","Proverbs 16:32","s","Self-command is the hardest command."],
      ["It takes two to make a quarrel.","Traditional proverb","p","You can decline to be the second."],
      ["Be the one who de-escalates.","Common sense","c","Somebody has to go first."]],
  18:[["If it be possible, as much as lieth in you, live peaceably with all men.","Romans 12:18","s","As much as depends on you."],
      ["Never cut what can be untied.","Traditional proverb","p","Try repair before rupture."],
      ["Speak softly and carry a big stick.","Theodore Roosevelt","h","Capable and calm, not loud and empty."],
      ["Do not burn a bridge you may need.","Common sense","c","The world is smaller than you think."],
      ["Assume the best interpretation first.","Common sense","c","You are usually right, and always calmer."]],
  19:[["Recompense to no man evil for evil.","Romans 12:17","s","Breaking the cycle is on you."],
      ["The best revenge is to be unlike him who performed the injury.","Marcus Aurelius","h","Be different, not even."],
      ["An eye for an eye leaves the whole world blind.","after Gandhi","h","Revenge multiplies."],
      ["He who cannot forgive breaks the bridge he must cross himself.","after George Herbert","h","You will need it."],
      ["Let it go before it grows.","Common sense","c","Grudges compound like interest."]],
  20:[["Follow peace with all men.","Hebrews 12:14","s","Follow means pursue, not wait."],
      ["Speak when you are angry and you will make the best speech you will ever regret.","Traditional saying","p","Sleep on it."],
      ["A quarrel is like buttermilk: the longer it stands the sourer it grows.","Irish proverb","p","Settle it early."],
      ["Say the hard thing kindly and early.","Common sense","c","Both words matter."],
      ["Choose the friendship over the point.","Common sense","c","Winning can cost more than losing."]],

  /* Unit 6 · Care and precision */
  21:[["Whatsoever ye do, do all to the glory of God.","1 Corinthians 10:31","s","Including the boring parts."],
      ["Labour to keep alive in your breast that little spark of celestial fire, conscience.","George Washington","h","Guard it. It goes out quietly."],
      ["The devil is in the details.","Traditional proverb","p","So is the quality."],
      ["Perfection is achieved not when there is nothing more to add, but nothing left to take away.","after Antoine de Saint-Exupéry","h","Cut, do not pile on."],
      ["Proofread before you send it.","Common sense","c","Once, slowly, out loud."]],
  22:[["Let all things be done decently and in order.","1 Corinthians 14:40","s","Order is a courtesy to whoever comes next."],
      ["Measure twice, cut once.","Carpenter's proverb","p","Checking is cheaper than redoing."],
      ["Quality is never an accident.","after John Ruskin","h","Somebody chose it, step by step."],
      ["Care and diligence bring luck.","Traditional proverb","p","Most 'luck' has a history."],
      ["Do the unglamorous part properly.","Common sense","c","That is where the work actually is."]],
  23:[["For want of a nail the shoe was lost; for want of a shoe the horse was lost.","Traditional proverb","p","Fix the nail."],
      ["Trifles make perfection, and perfection is no trifle.","after Michelangelo","h","The small things are the thing."],
      ["He that despiseth small things shall fall by little and little.","Traditional proverb","p","Small carelessness compounds."],
      ["Neatness is a form of respect.","Common sense","c","For whoever reads it after you."],
      ["Label it now, not later.","Common sense","c","Future you will not remember."]],
  24:[["Study to shew thyself approved, a workman that needeth not to be ashamed.","2 Timothy 2:15","s","Work you can put your name on."],
      ["A workman is known by his tools.","Traditional proverb","p","And by how he keeps them."],
      ["If you do not have time to do it right, when will you have time to do it over?","Traditional saying","p","Usually never."],
      ["Sign your work.","Common sense","c","Then you will care how it looks."],
      ["Leave it better than you found it.","Common sense","c","Every desk, every draft, every room."]],

  /* Unit 7 · Wisdom */
  25:[["Wisdom is the principal thing; therefore get wisdom.","Proverbs 4:7","s","It is acquired, not issued."],
      ["The roots of education are bitter, but the fruit is sweet.","after Aristotle","h","The hard part comes first."],
      ["Knowing yourself is the beginning of all wisdom.","after Aristotle","h","Start with your own blind spots."],
      ["A man who does not read has no advantage over one who cannot.","after Mark Twain","h","The book only works if you open it."],
      ["Learn one new word properly.","Common sense","c","Properly means you can use it."]],
  26:[["Apply thine heart unto instruction, and thine ears to the words of knowledge.","Proverbs 23:12","s","Heart and ears, not just eyes."],
      ["Once you learn to read, you will be forever free.","Frederick Douglass","h","He risked his life for that sentence."],
      ["Education is not the filling of a pail but the lighting of a fire.","after Plutarch","h","Curiosity is the point."],
      ["Tell me and I forget; teach me and I remember; involve me and I learn.","Traditional saying","p","Do it, do not just read it."],
      ["Teach it to someone younger.","Common sense","c","That is how you find out if you know it."]],
  27:[["Through wisdom is an house builded; and by understanding it is established.","Proverbs 24:3","s","Build on understanding, not opinion."],
      ["The unexamined life is not worth living.","after Socrates","h","Ask yourself the hard questions."],
      ["Judge a man by his questions rather than his answers.","after Voltaire","h","Good questions are rarer."],
      ["Doubt is not a pleasant condition, but certainty is absurd.","after Voltaire","h","Certainty should be earned."],
      ["Write down what you learned today.","Common sense","c","Otherwise it evaporates."]],
  28:[["In all thy getting get understanding.","Proverbs 4:7","s","Facts are cheap. Understanding is not."],
      ["Any fool can know; the point is to understand.","after Albert Einstein","h","Can you explain it simply?"],
      ["Reading without reflecting is like eating without digesting.","after Edmund Burke","h","Stop and think about it."],
      ["If you cannot explain it simply, you do not understand it.","Traditional principle","p","Try it on a younger boy."],
      ["Close the book and say it back.","Common sense","c","That is the real test."]],

  /* Unit 8 · Discernment */
  29:[["Prove all things; hold fast that which is good.","1 Thessalonians 5:21","s","Test first, then hold on."],
      ["Beware of false prophets, which come to you in sheep's clothing.","Matthew 7:15","s","Presentation is not proof."],
      ["A lie can travel halfway around the world while the truth is putting on its shoes.","Traditional saying","p","Be slow to forward."],
      ["The first principle is that you must not fool yourself, and you are the easiest person to fool.","after Richard Feynman","h","Check your own reasoning hardest."],
      ["Check the source before you share it.","Common sense","c","Thirty seconds. Every time."]],
  30:[["The simple believeth every word: but the prudent man looketh well to his going.","Proverbs 14:15","s","Believing everything is not kindness."],
      ["Do not believe everything you think.","Traditional saying","p","Thoughts are not facts."],
      ["When the facts change, I change my mind.","after John Maynard Keynes","h","What do you do?"],
      ["It is easier to fool people than to convince them they have been fooled.","after Mark Twain","h","Be willing to be corrected."],
      ["Consider the source, then consider the evidence.","Common sense","c","Both. Not one."]],
  31:[["Buy the truth, and sell it not.","Proverbs 23:23","s","Hold it even when it costs."],
      ["Half a truth is often a great lie.","Benjamin Franklin","h","Watch what gets left out."],
      ["Figures do not lie, but liars figure.","Traditional saying","p","Ask how the number was measured."],
      ["Notice which words were chosen.","Common sense","c","'Crowd' or 'mob' is already an argument."],
      ["A statistic without context is a claim, not evidence.","Common sense","c","Compared to what? Over what period?"]],
  32:[["Ponder the path of thy feet, and let all thy ways be established.","Proverbs 4:26","s","Look where you are actually walking."],
      ["Character is like a tree and reputation its shadow; the shadow is what we think of it, the tree is the real thing.","after Abraham Lincoln","h","Tend the tree."],
      ["The map is not the territory.","Alfred Korzybski","h","The model is not the thing."],
      ["Strong opinions are cheap; strong evidence is not.","Common sense","c","Which do you have?"],
      ["Build the other side's case better than he did.","Common sense","c","Then answer that one."]],

  /* Unit 9 · Witness */
  33:[["Be ready always to give an answer to every man that asketh you a reason.","1 Peter 3:15","s","A reason, not a feeling."],
      ["Let your light so shine before men, that they may see your good works.","Matthew 5:16","s","Works, not announcements."],
      ["Example is not the main thing in influencing others; it is the only thing.","after Albert Schweitzer","h","They watch what you do."],
      ["Whosoever will be great among you, let him be your minister.","Matthew 20:26","s","Leadership is service or it is nothing."],
      ["Be the same man in every room.","Common sense","c","Integrity is literally one-ness."]],
  34:[["Whatsoever ye would that men should do to you, do ye even so to them.","Matthew 7:12","s","Still the best test there is."],
      ["Open thy mouth for the dumb in the cause of all such as are appointed to destruction.","Proverbs 31:8","s","Speak for whoever cannot speak."],
      ["Injustice anywhere is a threat to justice everywhere.","after Martin Luther King Jr.","h","It is your business even when it is not yours."],
      ["A man who stands for nothing will fall for anything.","Traditional saying","p","Decide what you stand for now."],
      ["Do the right thing when it is inconvenient.","Common sense","c","That is the only time it is a test."]],
  35:[["Let us not love in word, neither in tongue; but in deed and in truth.","1 John 3:18","s","Deeds and truth. Both."],
      ["Everybody can be great, because everybody can serve.","after Martin Luther King Jr.","h","No qualifications required."],
      ["Do what you can, with what you have, where you are.","Theodore Roosevelt","h","No better conditions required."],
      ["We make a living by what we get; we make a life by what we give.","Traditional saying","p","Two different accounts."],
      ["Volunteer for the job nobody wants.","Common sense","c","That is where a man is built."]],
  36:[["I have fought a good fight, I have finished my course, I have kept the faith.","2 Timothy 4:7","s","All three, in that order."],
      ["Quit you like men, be strong. Let all your things be done with charity.","1 Corinthians 16:13-14","s","Strength and charity in the same breath."],
      ["It is not the beginning but the continuing until it is thoroughly finished that yields the true glory.","after Francis Drake","h","You continued."],
      ["The end crowns the work.","Traditional proverb","p","Look back at week one."],
      ["Now go and use it.","Common sense","c","A year of learning is for spending."]]
  };

  /* One quote per school day. Deterministic: the same week and day always
   * gives the same quote, so a boy cannot reroll for an easier one and a
   * parent can look up what was read on a given day. */
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
