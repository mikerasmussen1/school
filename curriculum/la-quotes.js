/* ============================================================================
 * WORD VOYAGERS — QUOTE OF THE DAY
 * ----------------------------------------------------------------------------
 * One short reading for every one of the 180 school days, in both grades.
 *
 * EIGHT THEMES, and every quote is tagged with one so the coverage is
 * checkable rather than assumed:
 *   co  courage          standing up, going first, speaking when it is hard
 *   st  strength         self-command, endurance, strength spent on others
 *   fa  faith            firm foundations: God as rock, builder, source
 *   re  responsibility   keeping your word, work, owning the mistake
 *   fm  family           honouring parents, loyalty, carrying the heavy end
 *   gr  gratitude        thanksgiving, contentment, remembering who gave it
 *   pa  patriotism       the founding documents, Lincoln, Douglass, Washington
 *   un  understanding    wisdom, discernment, thinking before believing
 *
 * READING LEVEL. The 3rd grade set is deliberately plainer: shorter verses,
 * fewer subordinate clauses, and a "Today" line that carries the meaning if
 * the King James wording is a stretch. The 5th grade set allows longer
 * sentences and more abstraction. Both were checked for length.
 *
 * ON THE PATRIOTISM ENTRIES. These lean on the founding documents and on the
 * Americans who held the country to its own promises — Washington on
 * conscience and good faith, Lincoln at Gettysburg and on binding up wounds,
 * Frederick Douglass on reading as freedom, Patrick Henry, Nathan Hale, the
 * Declaration on rights that come from a Creator rather than a government.
 * That is love of country with a spine in it: gratitude for what was built,
 * and a standard to be measured against. A boy should get both.
 *
 * SOURCES. Public domain or traditional throughout — Scripture in King James
 * wording, traditional proverbs, and men long out of copyright. Nothing from
 * a living writer or a modern copyrighted translation. Paraphrases are marked
 * "after <name>" so the quotation-versus-retelling distinction taught in
 * Unit 1 is not violated here.
 *
 * FORMAT  [text, source, kind, think, theme]
 *   kind: "s" scripture · "p" proverb/adage · "h" historical · "c" common sense
 * ==========================================================================*/
(function(){

  const Y1 = {
  1:[["Let your yea be yea; and your nay, nay.","James 5:12","s","When you say you will, you will.","re"],
     ["A man is only as good as his word.","Traditional proverb","p","Yours starts being worth something today.","re"],
     ["Trust in the Lord with all thine heart.","Proverbs 3:5","s","Lean on Him before you lean on yourself.","fa"],
     ["Undertake not what you cannot perform, but be careful to keep your promise.","George Washington","h","Promise less. Then do it.","re"],
     ["Say it, then do it.","Common sense","c","That is the whole of being trusted.","re"]],
  2:[["Whatsoever thy hand findeth to do, do it with thy might.","Ecclesiastes 9:10","s","Give the job all of you.","re"],
     ["Well done is better than well said.","Benjamin Franklin","h","Nobody is impressed by plans.","re"],
     ["Honour thy father and thy mother.","Exodus 20:12","s","Do it before you are asked twice.","fm"],
     ["United we stand, divided we fall.","Traditional American motto","p","A family works the same way.","pa"],
     ["Do the job nobody thanked you for.","Common sense","c","That is where a man is made.","st"]],
  3:[["Let all things be done decently and in order.","1 Corinthians 14:40","s","Leave your things the way a man would.","re"],
     ["A place for everything, and everything in its place.","Traditional proverb","p","Put one thing back without being asked.","re"],
     ["Little strokes fell great oaks.","Benjamin Franklin","h","Small steady work moves heavy things.","st"],
     ["Give thanks unto the Lord, for he is good.","Psalm 107:1","s","Say one thank you out loud today.","gr"],
     ["Finish what you start.","Common sense","c","Quitting halfway is a habit. So is finishing.","re"]],
  4:[["A soft answer turneth away wrath.","Proverbs 15:1","s","The strong boy is the quiet one in an argument.","st"],
     ["He that ruleth his spirit is better than he that taketh a city.","Proverbs 16:32","s","Holding your temper is real strength.","st"],
     ["Hear the instruction of thy father, and forsake not the law of thy mother.","Proverbs 1:8","s","They have gone further down the road than you.","fm"],
     ["He that cannot obey cannot command.","Benjamin Franklin","h","Learn to follow first.","re"],
     ["Lower your voice when he raises his.","Common sense","c","It takes more strength than shouting.","st"]],

  5:[["The earth is the Lord's, and the fulness thereof.","Psalm 24:1","s","Take care of what was handed to you.","fa"],
     ["He that is faithful in that which is least is faithful also in much.","Luke 16:10","s","Big trust is built out of small jobs.","re"],
     ["Waste not, want not.","Traditional proverb","p","Use it up before you ask for more.","gr"],
     ["This is my Father's world.","Traditional hymn, Maltbie Babcock","p","Look at something outside and mean it.","fa"],
     ["Leave it better than you found it.","Common sense","c","Every room, every tool, every day.","re"]],
  6:[["Go to the ant, thou sluggard; consider her ways, and be wise.","Proverbs 6:6","s","Nobody has to supervise the ant.","re"],
     ["Make hay while the sun shines.","Traditional proverb","p","Do it while you can, not when you feel like it.","re"],
     ["Don't put off till tomorrow what you can do today.","Benjamin Franklin","h","Pick the thing you have been avoiding.","re"],
     ["If any would not work, neither should he eat.","2 Thessalonians 3:10","s","Work is part of being a man, not a punishment.","re"],
     ["Do the hard part first.","Common sense","c","The day gets easier from there.","st"]],
  7:[["In every thing give thanks.","1 Thessalonians 5:18","s","Even on the ordinary days.","gr"],
     ["O give thanks unto the Lord; for his mercy endureth for ever.","Psalm 118:1","s","Say it before you ask for anything.","gr"],
     ["It is the duty of all nations to acknowledge the providence of Almighty God.","George Washington","h","Our first Thanksgiving order said so.","pa"],
     ["Count your blessings, not your troubles.","Traditional proverb","p","Write the list. It is longer than you think.","gr"],
     ["Thank the person who did it for you, to his face.","Common sense","c","Not later. Now.","gr"]],
  8:[["Every good gift is from above.","after James 1:17","s","You built none of this from nothing.","fa"],
     ["Enough is as good as a feast.","Traditional proverb","p","Wanting less is a kind of strength.","gr"],
     ["Character, not circumstances, makes the man.","Booker T. Washington","h","You do not need better conditions to start.","st"],
     ["Bless the Lord, O my soul, and forget not all his benefits.","Psalm 103:2","s","Forgetting is the easy part. Remembering takes work.","gr"],
     ["Want what you have.","Common sense","c","Look around before you look ahead.","gr"]],

  9:[["Be strong and of a good courage; be not afraid.","Joshua 1:9","s","Courage is doing it while still scared.","co"],
     ["Quit you like men, be strong.","1 Corinthians 16:13","s","Stand where you said you would stand.","co"],
     ["Give me liberty, or give me death!","Patrick Henry","h","He said it out loud when it was dangerous to.","pa"],
     ["Courage is not the absence of fear, but action in spite of it.","Traditional saying","p","The fear does not have to leave first.","co"],
     ["Speak up when it is hard.","Common sense","c","Someone is waiting for one boy to go first.","co"]],
  10:[["The righteous are bold as a lion.","Proverbs 28:1","s","A clean conscience makes a steady voice.","co"],
      ["Be strong in the Lord, and in the power of his might.","Ephesians 6:10","s","Your strength is borrowed. Go get it.","fa"],
      ["Stand for something or you will fall for anything.","Traditional saying","p","Decide before the moment comes.","co"],
      ["One man with courage makes a majority.","after Andrew Jackson","h","You do not need permission to be right.","co"],
      ["It is easier to stand up the first time than the tenth.","Common sense","c","Every time you go along, it gets harder to stop.","co"]],
  11:[["Fear thou not; for I am with thee.","Isaiah 41:10","s","You are not doing it alone.","fa"],
      ["They that wait upon the Lord shall renew their strength.","Isaiah 40:31","s","When you are empty, that is where you go.","fa"],
      ["Fall down seven times, stand up eight.","Japanese proverb","p","Getting up is the whole skill.","st"],
      ["I only regret that I have but one life to lose for my country.","Nathan Hale","h","He was twenty-one years old.","pa"],
      ["Try again tomorrow.","Common sense","c","One bad day is one day.","st"]],
  12:[["Let us not be weary in well doing.","Galatians 6:9","s","Keep going when nobody claps.","st"],
      ["The joy of the Lord is your strength.","Nehemiah 8:10","s","Not your mood. His joy.","fa"],
      ["It is not the size of the dog in the fight, but the size of the fight in the dog.","Traditional saying","p","Heart beats size.","co"],
      ["Energy and persistence conquer all things.","Benjamin Franklin","h","Stubbornness, pointed the right way.","st"],
      ["Keep going two minutes past when you wanted to stop.","Common sense","c","That is where you grow.","st"]],

  13:[["The hand of the diligent shall bear rule.","Proverbs 12:24","s","Careful work quietly earns command.","re"],
      ["The glory of young men is their strength.","Proverbs 20:29","s","Spend it on something worth doing.","st"],
      ["If a job is worth doing, it is worth doing well.","Traditional proverb","p","Sand the part nobody will see.","re"],
      ["There is no substitute for hard work.","after Thomas Edison","h","None. Not talent, not luck.","re"],
      ["Do it right or do it twice.","Common sense","c","Rushing is the slow way.","re"]],
  14:[["Whatsoever ye do, do it heartily, as to the Lord.","Colossians 3:23","s","You are working for Him, not just for a grade.","fa"],
      ["Early to bed and early to rise makes a man healthy, wealthy, and wise.","Benjamin Franklin","h","Win the morning.","re"],
      ["Lost time is never found again.","Benjamin Franklin","h","This hour is not coming back.","re"],
      ["Except the Lord build the house, they labour in vain that build it.","Psalm 127:1","s","Build on the right foundation first.","fa"],
      ["Practice makes progress.","Common sense","c","Not perfect. Better than yesterday.","st"]],
  15:[["Two are better than one, for they have a good reward for their labour.","Ecclesiastes 4:9","s","Ask someone to work beside you.","fm"],
      ["Many hands make light work.","Traditional proverb","p","Offer before you are asked.","re"],
      ["A chain is only as strong as its weakest link.","Traditional proverb","p","Go help whoever is struggling most.","st"],
      ["A house divided against itself cannot stand.","Abraham Lincoln","h","He meant a country. It is true of a family too.","pa"],
      ["Do your share, and then some.","Common sense","c","The 'and then some' is what people remember.","re"]],
  16:[["Iron sharpeneth iron; so a man sharpeneth the countenance of his friend.","Proverbs 27:17","s","A good friend makes you better, not just comfortable.","fm"],
      ["A man that hath friends must shew himself friendly.","Proverbs 18:24","s","Go first.","fm"],
      ["Tell me who your friends are and I will tell you who you are.","Traditional proverb","p","Who are you becoming?","un"],
      ["Be slow in choosing a friend, slower in changing.","Benjamin Franklin","h","Loyalty is built slowly.","fm"],
      ["Stand by your friend when it costs you something.","Common sense","c","That is when it counts.","co"]],

  17:[["Lie not one to another.","Colossians 3:9","s","One honest sentence today, even if it costs.","re"],
      ["Truth fears no questions.","Traditional proverb","p","True stories come out the same twice.","un"],
      ["Honesty is the first chapter in the book of wisdom.","after Thomas Jefferson","h","Everything else is built on it.","un"],
      ["A half truth is a whole lie.","Traditional proverb","p","Leaving it out still counts.","re"],
      ["Tell it before someone else does.","Common sense","c","It never gets easier by waiting.","co"]],
  18:[["Buy the truth, and sell it not.","Proverbs 23:23","s","Some truths cost you. Pay it.","co"],
      ["I hope I shall possess firmness enough to maintain the character of an honest man.","George Washington","h","Firmness is the word. It takes some.","pa"],
      ["It takes many good deeds to build a good reputation, and only one bad one to lose it.","Benjamin Franklin","h","Guard it today.","re"],
      ["Cheaters never prosper.","Traditional proverb","p","A win you did not earn is not a win.","re"],
      ["Own the mistake out loud.","Common sense","c","Say 'I did that' and watch it shrink.","co"]],
  19:[["Let your light so shine before men.","Matthew 5:16","s","Someone is watching how you handle small things.","fa"],
      ["Character is what you do when no one is looking.","Traditional saying","p","Today's test is probably a small one.","re"],
      ["Let us have faith that right makes might.","Abraham Lincoln","h","Not the other way round.","pa"],
      ["The truth will out.","Traditional proverb","p","It surfaces. Always.","un"],
      ["Do the right thing quietly.","Common sense","c","No announcement needed.","re"]],
  20:[["A good name is rather to be chosen than great riches.","Proverbs 22:1","s","Your word is your real property.","re"],
      ["Let no man despise thy youth; but be thou an example.","1 Timothy 4:12","s","Young is not an excuse. It is a starting line.","co"],
      ["Promise little and do much.","Traditional proverb","p","Under-promise. Then show up.","re"],
      ["Trust is earned in drops and lost in buckets.","Traditional saying","p","Add a drop today.","re"],
      ["Be the same boy at home and away.","Common sense","c","One person, not two.","re"]],

  21:[["Honour thy father and thy mother, that thy days may be long.","Exodus 20:12","s","There is a promise attached to this one.","fm"],
      ["Children, obey your parents in the Lord: for this is right.","Ephesians 6:1","s","Right, not just required.","fm"],
      ["He who is good to his mother is worth knowing.","Traditional proverb","p","Go say something kind to her.","fm"],
      ["Despise not thy mother when she is old.","Proverbs 23:22","s","She will not always be here.","fm"],
      ["Carry the heavy end.","Common sense","c","Especially for someone smaller.","st"]],
  22:[["Bear ye one another's burdens.","Galatians 6:2","s","Carry something for somebody today.","fm"],
      ["Greater love hath no man than this, that a man lay down his life for his friends.","John 15:13","s","Strength is for spending on other people.","st"],
      ["No one is useless who lightens the burden of another.","after Charles Dickens","h","Small help is real help.","fm"],
      ["A burden shared is a burden halved.","Traditional proverb","p","Ask for help. It is not weakness.","fm"],
      ["Notice who is left out, then go sit with him.","Common sense","c","That is what a strong boy does.","co"]],
  23:[["Love thy neighbour as thyself.","Mark 12:31","s","Neighbour means whoever is nearest today.","fa"],
      ["Do unto others as you would have them do unto you.","Matthew 7:12","s","The oldest test and still the best.","fa"],
      ["Be kind, for everyone you meet is fighting a hard battle.","Traditional saying","p","You do not know what his week was.","un"],
      ["Defend the boy who cannot defend himself.","Common sense","c","That is what your strength is for.","st"],
      ["A kind word is never wasted.","Traditional proverb","p","Even if he does not answer.","fm"]],
  24:[["Be ye kind one to another, tenderhearted, forgiving.","Ephesians 4:32","s","Tenderhearted is in there on purpose.","fm"],
      ["Let not the sun go down upon your wrath.","Ephesians 4:26","s","Settle it before bed.","fm"],
      ["To err is human; to forgive, divine.","Alexander Pope","h","You will need it back one day.","fm"],
      ["With malice toward none, with charity for all.","Abraham Lincoln","h","He said it about people who had shot at him.","pa"],
      ["Apologise first, even when it was mostly him.","Common sense","c","Going first is the harder job.","co"]],

  25:[["Get wisdom, and with all thy getting get understanding.","Proverbs 4:7","s","Knowing a fact is not understanding it.","un"],
      ["If any of you lack wisdom, let him ask of God.","James 1:5","s","Ask before you guess.","fa"],
      ["An investment in knowledge pays the best interest.","Benjamin Franklin","h","What you learn, you keep.","un"],
      ["Live and learn.","Traditional proverb","p","Today's mistake is tomorrow's skill.","un"],
      ["Ask the question.","Common sense","c","The embarrassment lasts a minute. Not knowing lasts years.","un"]],
  26:[["A wise man will hear, and will increase learning.","Proverbs 1:5","s","Listening is how wise men got wise.","un"],
      ["He who asks is a fool for five minutes; he who does not ask remains a fool forever.","Chinese proverb","p","Raise your hand.","un"],
      ["I am a slow walker, but I never walk back.","Abraham Lincoln","h","Slow forward beats fast backward.","st"],
      ["Learn from other men's mistakes.","Common sense","c","You will not live long enough to make them all.","un"],
      ["You have two ears and one mouth.","Traditional saying","p","Use them in that ratio.","un"]],
  27:[["Blessed is the man that findeth wisdom.","Proverbs 3:13","s","Found, which means somebody went looking.","un"],
      ["Once you learn to read, you will be forever free.","Frederick Douglass","h","He risked a great deal to learn.","pa"],
      ["Reading is to the mind what exercise is to the body.","Traditional saying","p","Twenty minutes counts.","un"],
      ["Knowledge is power.","Traditional saying","p","But only when you use it.","un"],
      ["Read something harder than you are.","Common sense","c","That is where growing happens.","un"]],
  28:[["The fear of the Lord is the beginning of wisdom.","Proverbs 9:10","s","Wisdom starts with knowing you are not the biggest thing.","fa"],
      ["Pride goeth before destruction, and an haughty spirit before a fall.","Proverbs 16:18","s","Check your confidence against the facts.","un"],
      ["Humility is not thinking less of yourself, but thinking of yourself less.","Traditional saying","p","Ask about his day first.","un"],
      ["He that is taught only by himself has a fool for a master.","Ben Jonson","h","Let someone correct you today.","un"],
      ["Admit it fast when you are wrong.","Common sense","c","It costs less that way.","co"]],

  29:[["Prove all things; hold fast that which is good.","1 Thessalonians 5:21","s","Test it before you believe it.","un"],
      ["All that glitters is not gold.","Traditional proverb","p","Look past the shine.","un"],
      ["Whosoever heareth these sayings of mine, and doeth them, I will liken him unto a wise man, which built his house upon a rock.","Matthew 7:24","s","Build on rock. Storms come to every house.","fa"],
      ["Keep your eyes on the stars and your feet on the ground.","Theodore Roosevelt","h","Both at once.","un"],
      ["Ask where he got that.","Common sense","c","A fact without a source is a rumour.","un"]],
  30:[["Be ye wise as serpents, and harmless as doves.","Matthew 10:16","s","Sharp and safe are not opposites.","un"],
      ["Look before you leap.","Traditional proverb","p","One breath before you decide.","un"],
      ["Do not judge a book by its cover.","Traditional proverb","p","Give the second look.","un"],
      ["It is not what you look at that matters, it is what you see.","after Henry David Thoreau","h","Look again, slower.","un"],
      ["Slow down when it feels urgent.","Common sense","c","Urgency is how boys get talked into things.","un"]],
  31:[["Let every man be swift to hear, slow to speak, slow to wrath.","James 1:19","s","In that order. Always.","un"],
      ["When angry, count to ten; when very angry, a hundred.","after Thomas Jefferson","h","Anger is a bad advisor.","st"],
      ["Least said, soonest mended.","Traditional proverb","p","Not every thought needs an audience.","un"],
      ["Speak softly and carry a big stick.","Theodore Roosevelt","h","Quiet and capable. Not loud and empty.","st"],
      ["Wait a day before you send it.","Common sense","c","You will change it.","un"]],
  32:[["A prudent man foreseeth the evil, and hideth himself.","Proverbs 22:3","s","Seeing it coming is a skill you can build.","un"],
      ["An ounce of prevention is worth a pound of cure.","Benjamin Franklin","h","Do the small thing now.","re"],
      ["Do not count your chickens before they hatch.","Traditional proverb","p","Wait until it is real.","un"],
      ["The Lord is my rock, and my fortress.","Psalm 18:2","s","Somewhere to stand when it shakes.","fa"],
      ["Have a plan for when it goes wrong.","Common sense","c","Then the first plan gets easier.","re"]],

  33:[["Let us not love in word, neither in tongue; but in deed and in truth.","1 John 3:18","s","Love is a verb today.","fa"],
      ["Whosoever will be chief among you, let him be your servant.","Matthew 20:27","s","Leading means serving first.","st"],
      ["Deeds, not words.","Traditional proverb","p","What will you actually do?","re"],
      ["The best way to find yourself is to lose yourself in the service of others.","after Gandhi","h","Help somebody with no audience.","st"],
      ["Do something useful today.","Common sense","c","Useful beats impressive.","re"]],
  34:[["Freely ye have received, freely give.","Matthew 10:8","s","You did not earn everything you have.","gr"],
      ["It is more blessed to give than to receive.","Acts 20:35","s","Test it and see.","gr"],
      ["The first requisite of a good citizen is that he shall be able and willing to pull his weight.","Theodore Roosevelt","h","Carry your share of the country you live in.","pa"],
      ["No act of kindness, however small, is ever wasted.","after Aesop","p","Small counts.","fm"],
      ["Open the door for somebody.","Common sense","c","Start there. It is a habit.","fm"]],
  35:[["Be ready always to give an answer.","1 Peter 3:15","s","Know why you believe what you believe.","fa"],
      ["As for me and my house, we will serve the Lord.","Joshua 24:15","s","A whole family can decide together.","fm"],
      ["Stand with anybody that stands right.","Abraham Lincoln","h","Stand with him, part with him when he goes wrong.","pa"],
      ["Speak the truth, even if your voice shakes.","Traditional saying","p","Shaking is allowed.","co"],
      ["Stand for what is right even if you stand alone.","Traditional saying","p","Sometimes the count is one.","co"]],
  36:[["Well done, thou good and faithful servant.","Matthew 25:21","s","Faithful in the ordinary is the goal.","fa"],
      ["I have fought a good fight, I have finished my course.","after 2 Timothy 4:7","s","You finished a whole year.","st"],
      ["Do what you can, with what you have, where you are.","Theodore Roosevelt","h","No better conditions required.","re"],
      ["Crown thy good with brotherhood.","Katharine Lee Bates, America the Beautiful","p","A good country is made of good neighbours.","pa"],
      ["Now go and use it.","Common sense","c","A year of learning is for spending.","gr"]]
  };

  const Y2 = {
  1:[["Thou shalt not bear false witness against thy neighbour.","Exodus 20:16","s","Misquoting a man counts.","re"],
     ["Quit you like men, be strong.","1 Corinthians 16:13","s","Strength starts with telling the truth.","co"],
     ["Facts are stubborn things.","John Adams","h","They do not care how you feel about them.","un"],
     ["Trust in the Lord with all thine heart; and lean not unto thine own understanding.","Proverbs 3:5","s","Your own read is not the final word.","fa"],
     ["Quote it exactly or do not quote it.","Common sense","c","Approximate quotation is a small lie.","re"]],
  2:[["He that hath knowledge spareth his words.","Proverbs 17:27","s","Knowing more should make you say less.","un"],
     ["It is the mark of an educated mind to entertain a thought without accepting it.","after Aristotle","h","Consider without adopting.","un"],
     ["Words are like arrows: once loosed they cannot be recalled.","Traditional proverb","p","Aim before you speak.","un"],
     ["Observe good faith and justice towards all nations.","George Washington","h","From his farewell to the country he built.","pa"],
     ["Let us have faith that right makes might; and in that faith let us dare to do our duty.","Abraham Lincoln","h","Faith first, then daring, then duty.","co"]],
  3:[["Buy the truth, and sell it not; also wisdom, and instruction.","Proverbs 23:23","s","Sometimes the truth costs you the argument.","co"],
     ["An error does not become truth by reason of multiplied propagation.","after Gandhi","h","Repetition is not evidence.","un"],
     ["We hold these truths to be self-evident, that all men are created equal.","Declaration of Independence","h","A whole country was staked on one sentence.","pa"],
     ["Extraordinary claims require extraordinary evidence.","Traditional principle of inquiry","p","The bigger the claim, the harder you check.","un"],
     ["Ask who benefits from you believing it.","Common sense","c","Then follow that thread.","un"]],
  4:[["Whoso keepeth his mouth and his tongue keepeth his soul from troubles.","Proverbs 21:23","s","Most trouble starts as a sentence.","re"],
     ["A rumour goes in one ear and out many mouths.","Traditional proverb","p","Be the place it stops.","re"],
     ["Give every man thine ear, but few thy voice.","after Shakespeare","p","Listen widely; commit carefully.","un"],
     ["Defend a man's name when he is not in the room.","Common sense","c","That is what loyalty actually looks like.","co"],
     ["Do not repeat what you cannot verify.","Common sense","c","'Someone said' is not a source.","un"]],

  5:[["Let us run with patience the race that is set before us.","Hebrews 12:1","s","Patience is part of the running.","st"],
     ["It is not the critic who counts; the credit belongs to the man who is actually in the arena.","after Theodore Roosevelt","h","Be in it, not commenting on it.","co"],
     ["Our greatest glory is not in never falling, but in rising every time we fall.","after Confucius","h","The falling is assumed.","st"],
     ["I can do all things through Christ which strengtheneth me.","Philippians 4:13","s","Through Him. That is the whole clause.","fa"],
     ["Show up on the day you do not want to.","Common sense","c","That day counts double.","re"]],
  6:[["A just man falleth seven times, and riseth up again.","Proverbs 24:16","s","Falling is not the disqualifier.","st"],
     ["I have not failed. I have found ten thousand ways that will not work.","after Thomas Edison","h","A failed attempt is data.","st"],
     ["Success is measured by the obstacles overcome while trying to succeed.","after Booker T. Washington","h","Count what you got through.","st"],
     ["Little by little, one travels far.","Traditional proverb","p","Fifteen minutes is not nothing.","re"],
     ["Start over without complaining.","Common sense","c","The second attempt is always faster.","st"]],
  7:[["Be not weary in well doing.","2 Thessalonians 3:13","s","Especially when nobody notices.","re"],
     ["Nothing in the world can take the place of persistence.","after Calvin Coolidge","h","Not talent. Not genius.","st"],
     ["They that wait upon the Lord shall renew their strength; they shall mount up with wings as eagles.","Isaiah 40:31","s","Renewed, not manufactured.","fa"],
     ["It does not matter how slowly you go so long as you do not stop.","after Confucius","h","Slow is not stopped.","st"],
     ["Do the next right thing.","Common sense","c","Not the whole plan. The next thing.","re"]],
  8:[["Cast not away therefore your confidence.","Hebrews 10:35","s","Discouragement is not proof you were wrong.","fa"],
     ["Difficulties are things that show a man what he is.","after Epictetus","h","This week is showing you something.","st"],
     ["When you reach the end of your rope, tie a knot and hang on.","Traditional saying","p","Sometimes holding on is the work.","st"],
     ["The Lord is my light and my salvation; whom shall I fear?","Psalm 27:1","s","Answer the question honestly.","fa"],
     ["Rest, then continue.","Common sense","c","Resting is not quitting.","re"]],

  9:[["He that answereth a matter before he heareth it, it is folly and shame unto him.","Proverbs 18:13","s","Hear the whole thing first.","un"],
     ["We have two ears and one mouth so that we can listen twice as much as we speak.","after Epictetus","h","Try the ratio today.","un"],
     ["Every man you meet knows something you do not.","Traditional saying","p","Go find out what.","un"],
     ["I am not a Virginian, but an American.","Patrick Henry","h","He put the larger loyalty first.","pa"],
     ["Seek first to understand.","Common sense","c","Then ask to be understood.","un"]],
  10:[["In lowliness of mind let each esteem others better than themselves.","Philippians 2:3","s","Assume he has a reason.","fa"],
      ["The more I learn, the more I realise how much I do not know.","after Albert Einstein","h","Learning should humble you.","un"],
      ["Empty vessels make the most sound.","Traditional proverb","p","The loudest is rarely the wisest.","un"],
      ["Do not be haughty, but condescend to men of low estate.","Romans 12:16","s","Sit with whoever nobody sits with.","fm"],
      ["Say 'I could be wrong' and mean it.","Common sense","c","It costs nothing and buys a lot.","un"]],
  11:[["Where no counsel is, the people fall.","Proverbs 11:14","s","Get another opinion before you commit.","un"],
      ["Faithful are the wounds of a friend.","Proverbs 27:6","s","A real friend tells you the hard thing.","fm"],
      ["It is the province of knowledge to speak and the privilege of wisdom to listen.","Oliver Wendell Holmes","h","Both are skills.","un"],
      ["Better a friend who tells you the truth than one who agrees with you.","Traditional proverb","p","Value the honest one.","fm"],
      ["Ask someone who disagrees with you.","Common sense","c","Before you decide, not after.","un"]],
  12:[["Let every man be swift to hear, slow to speak.","James 1:19","s","In that order, always.","un"],
      ["Judge not, that ye be not judged.","Matthew 7:1","s","You are not seeing the whole picture.","fa"],
      ["Before you criticise a man, walk a mile in his shoes.","Traditional saying","p","Then you have some perspective.","un"],
      ["Wait on the Lord: be of good courage.","Psalm 27:14","s","Waiting well takes more nerve than rushing.","co"],
      ["Understand before you argue.","Common sense","c","State his view until he agrees you have it.","un"]],

  13:[["Whoso is faithful in that which is least is faithful also in much.","after Luke 16:10","s","Character shows in the small stuff.","re"],
      ["Associate with men of good quality if you esteem your own reputation.","George Washington","h","You become the room you stand in.","fm"],
      ["Constancy is the foundation of virtue.","after Francis Bacon","h","Being the same man every day.","re"],
      ["Trust is built slowly and broken quickly.","Traditional saying","p","Today adds a brick or removes ten.","re"],
      ["Keep the promise you made when it was easy.","Common sense","c","That is what makes it a promise.","re"]],
  14:[["Better is the end of a thing than the beginning thereof.","Ecclesiastes 7:8","s","Finishing counts more than starting.","re"],
      ["Time is the most valuable thing a man can spend.","after Theophrastus","h","You are spending it right now.","re"],
      ["Lost time is never found again.","Benjamin Franklin","h","There is no catching up on yesterday.","re"],
      ["Honour thy father and thy mother: which is the first commandment with promise.","Ephesians 6:2","s","There is something attached to this one.","fm"],
      ["Guard the first hour of the day.","Common sense","c","It sets the rest of it.","re"]],
  15:[["To every thing there is a season.","Ecclesiastes 3:1","s","Some things are not for right now.","fa"],
      ["Whatsoever a man soweth, that shall he also reap.","Galatians 6:7","s","You are planting something today either way.","re"],
      ["Plant a tree you will never sit under.","Traditional proverb","p","Someone planted for you.","gr"],
      ["Liberty, when it begins to take root, is a plant of rapid growth.","George Washington","h","But someone has to plant it first.","pa"],
      ["Do the work now that pays off in a year.","Common sense","c","Most good things are slow.","re"]],
  16:[["Let your speech be alway with grace.","Colossians 4:6","s","Grace does not mean vague.","fa"],
      ["The tongue has no bones but is strong enough to break a heart.","Traditional proverb","p","Handle it carefully.","fm"],
      ["When words are many, sin is not absent.","after Proverbs 10:19","s","Edit yourself.","un"],
      ["A gentle answer is a strong answer.","Traditional proverb","p","Softness under control is strength.","st"],
      ["Apologise specifically.","Common sense","c","'Sorry you were upset' is not an apology.","re"]],

  17:[["Blessed are the peacemakers.","Matthew 5:9","s","Making peace is work, not avoidance.","fa"],
      ["He that ruleth his spirit is better than he that taketh a city.","Proverbs 16:32","s","Self-command is the hardest command.","st"],
      ["A soft answer turneth away wrath.","Proverbs 15:1","s","Lower your voice, not your ground.","st"],
      ["It takes two to make a quarrel.","Traditional proverb","p","You can decline to be the second.","un"],
      ["Be the one who de-escalates.","Common sense","c","Somebody has to go first.","co"]],
  18:[["If it be possible, as much as lieth in you, live peaceably with all men.","Romans 12:18","s","As much as depends on you.","fa"],
      ["Speak softly and carry a big stick.","Theodore Roosevelt","h","Capable and calm, not loud and empty.","st"],
      ["Never cut what can be untied.","Traditional proverb","p","Try repair before rupture.","fm"],
      ["Do not burn a bridge you may need.","Common sense","c","The world is smaller than you think.","un"],
      ["Assume the best interpretation first.","Common sense","c","You are usually right, and always calmer.","un"]],
  19:[["Recompense to no man evil for evil.","Romans 12:17","s","Breaking the cycle is on you.","fa"],
      ["The best revenge is to be unlike him who performed the injury.","Marcus Aurelius","h","Be different, not even.","st"],
      ["With malice toward none, with charity for all, let us bind up the nation's wounds.","Abraham Lincoln","h","Said at the end of a civil war.","pa"],
      ["He who cannot forgive breaks the bridge he must cross himself.","after George Herbert","h","You will need it.","fm"],
      ["Let it go before it grows.","Common sense","c","Grudges compound like interest.","fm"]],
  20:[["Follow peace with all men.","Hebrews 12:14","s","Follow means pursue, not wait.","fa"],
      ["Speak when you are angry and you will make the best speech you will ever regret.","Traditional saying","p","Sleep on it.","st"],
      ["A quarrel is like buttermilk: the longer it stands the sourer it grows.","Irish proverb","p","Settle it early.","fm"],
      ["Say the hard thing kindly and early.","Common sense","c","Both words matter.","co"],
      ["Choose the friendship over the point.","Common sense","c","Winning can cost more than losing.","fm"]],

  21:[["Whatsoever ye do, do all to the glory of God.","1 Corinthians 10:31","s","Including the boring parts.","fa"],
      ["Labour to keep alive in your breast that little spark of celestial fire, conscience.","George Washington","h","Guard it. It goes out quietly.","pa"],
      ["The devil is in the details.","Traditional proverb","p","So is the quality.","re"],
      ["Perfection is achieved not when there is nothing more to add, but nothing left to take away.","after Antoine de Saint-Exupéry","h","Cut, do not pile on.","un"],
      ["Proofread before you send it.","Common sense","c","Once, slowly, out loud.","re"]],
  22:[["Let all things be done decently and in order.","1 Corinthians 14:40","s","Order is a courtesy to whoever comes next.","re"],
      ["Measure twice, cut once.","Carpenter's proverb","p","Checking is cheaper than redoing.","re"],
      ["Quality is never an accident.","after John Ruskin","h","Somebody chose it, step by step.","re"],
      ["Care and diligence bring luck.","Traditional proverb","p","Most 'luck' has a history.","re"],
      ["Do the unglamorous part properly.","Common sense","c","That is where the work actually is.","re"]],
  23:[["For want of a nail the shoe was lost; for want of a shoe the horse was lost.","Traditional proverb","p","Fix the nail.","re"],
      ["Trifles make perfection, and perfection is no trifle.","after Michelangelo","h","The small things are the thing.","re"],
      ["Of all the dispositions which lead to political prosperity, religion and morality are indispensable supports.","George Washington","h","He thought a free country needed them.","pa"],
      ["Neatness is a form of respect.","Common sense","c","For whoever reads it after you.","fm"],
      ["Label it now, not later.","Common sense","c","Future you will not remember.","re"]],
  24:[["Study to shew thyself approved, a workman that needeth not to be ashamed.","2 Timothy 2:15","s","Work you can put your name on.","fa"],
      ["A workman is known by his tools.","Traditional proverb","p","And by how he keeps them.","re"],
      ["If you do not have time to do it right, when will you have time to do it over?","Traditional saying","p","Usually never.","re"],
      ["Sign your work.","Common sense","c","Then you will care how it looks.","re"],
      ["Leave it better than you found it.","Common sense","c","Every desk, every draft, every room.","re"]],

  25:[["Wisdom is the principal thing; therefore get wisdom.","Proverbs 4:7","s","It is acquired, not issued.","un"],
      ["The roots of education are bitter, but the fruit is sweet.","after Aristotle","h","The hard part comes first.","un"],
      ["Bless the Lord, O my soul, and forget not all his benefits.","Psalm 103:2","s","Forgetting is easy. Remembering takes work.","gr"],
      ["A man who does not read has no advantage over one who cannot.","after Mark Twain","h","The book only works if you open it.","un"],
      ["Learn one new word properly.","Common sense","c","Properly means you can use it.","un"]],
  26:[["Apply thine heart unto instruction, and thine ears to the words of knowledge.","Proverbs 23:12","s","Heart and ears, not just eyes.","fa"],
      ["Once you learn to read, you will be forever free.","Frederick Douglass","h","He risked his life for that sentence.","pa"],
      ["Education is not the filling of a pail but the lighting of a fire.","after Plutarch","h","Curiosity is the point.","un"],
      ["In every thing give thanks.","1 Thessalonians 5:18","s","Not for everything. In everything.","gr"],
      ["Teach it to someone younger.","Common sense","c","That is how you find out if you know it.","fm"]],
  27:[["Through wisdom is an house builded; and by understanding it is established.","Proverbs 24:3","s","Build on understanding, not opinion.","fa"],
      ["The unexamined life is not worth living.","after Socrates","h","Ask yourself the hard questions.","un"],
      ["Judge a man by his questions rather than his answers.","after Voltaire","h","Good questions are rarer.","un"],
      ["It is the duty of all nations to acknowledge the providence of Almighty God.","George Washington","h","The first national Thanksgiving said so.","pa"],
      ["Enter into his gates with thanksgiving.","Psalm 100:4","s","Start there, not with the asking.","gr"]],
  28:[["In all thy getting get understanding.","Proverbs 4:7","s","Facts are cheap. Understanding is not.","un"],
      ["Any fool can know; the point is to understand.","after Albert Einstein","h","Can you explain it simply?","un"],
      ["O give thanks unto the Lord; for he is good: for his mercy endureth for ever.","Psalm 118:1","s","Say it before you ask for anything.","gr"],
      ["If you cannot explain it simply, you do not understand it.","Traditional principle","p","Try it on a younger boy.","un"],
      ["Give thanks for the men who taught you.","Common sense","c","Name one and go tell him.","gr"]],

  29:[["Prove all things; hold fast that which is good.","1 Thessalonians 5:21","s","Test first, then hold on.","un"],
      ["Beware of false prophets, which come to you in sheep's clothing.","Matthew 7:15","s","Presentation is not proof.","fa"],
      ["A lie can travel halfway around the world while the truth is putting on its shoes.","Traditional saying","p","Be slow to forward.","un"],
      ["The first principle is that you must not fool yourself, and you are the easiest person to fool.","after Richard Feynman","h","Check your own reasoning hardest.","un"],
      ["Check the source before you share it.","Common sense","c","Thirty seconds. Every time.","re"]],
  30:[["The simple believeth every word: but the prudent man looketh well to his going.","Proverbs 14:15","s","Believing everything is not kindness.","un"],
      ["Be of good courage, and he shall strengthen your heart.","Psalm 31:24","s","Courage is issued, not manufactured.","co"],
      ["When the facts change, I change my mind.","after John Maynard Keynes","h","What do you do?","un"],
      ["Be strong and of a good courage; fear not, nor be afraid of them.","Deuteronomy 31:6","s","The command comes with a reason attached.","co"],
      ["Consider the source, then consider the evidence.","Common sense","c","Both. Not one.","un"]],
  31:[["Buy the truth, and sell it not.","Proverbs 23:23","s","Hold it even when it costs.","co"],
      ["Half a truth is often a great lie.","Benjamin Franklin","h","Watch what gets left out.","un"],
      ["Figures do not lie, but liars figure.","Traditional saying","p","Ask how the number was measured.","un"],
      ["Notice which words were chosen.","Common sense","c","'Crowd' or 'mob' is already an argument.","un"],
      ["A statistic without context is a claim, not evidence.","Common sense","c","Compared to what? Over what period?","un"]],
  32:[["Ponder the path of thy feet, and let all thy ways be established.","Proverbs 4:26","s","Look where you are actually walking.","fa"],
      ["Character is like a tree and reputation its shadow; the shadow is what we think of it, the tree is the real thing.","after Abraham Lincoln","h","Tend the tree.","re"],
      ["A republic, if you can keep it.","Benjamin Franklin","h","Keeping it is the part that falls to you.","pa"],
      ["The price of liberty is eternal vigilance.","Traditional American maxim","p","Someone has to keep watch. It may be you.","pa"],
      ["Build the other side's case better than he did.","Common sense","c","Then answer that one.","un"]],

  33:[["Be ready always to give an answer to every man that asketh you a reason.","1 Peter 3:15","s","A reason, not a feeling.","fa"],
      ["Let your light so shine before men, that they may see your good works.","Matthew 5:16","s","Works, not announcements.","fa"],
      ["Example is not the main thing in influencing others; it is the only thing.","after Albert Schweitzer","h","They watch what you do.","re"],
      ["Whosoever will be great among you, let him be your minister.","Matthew 20:26","s","Leadership is service or it is nothing.","st"],
      ["Be the same man in every room.","Common sense","c","Integrity is literally one-ness.","re"]],
  34:[["Whatsoever ye would that men should do to you, do ye even so to them.","Matthew 7:12","s","Still the best test there is.","fa"],
      ["Open thy mouth for the dumb in the cause of all such as are appointed to destruction.","Proverbs 31:8","s","Speak for whoever cannot speak.","co"],
      ["Endowed by their Creator with certain unalienable rights.","Declaration of Independence","h","Given by God, not granted by men.","pa"],
      ["A man who stands for nothing will fall for anything.","Traditional saying","p","Decide what you stand for now.","co"],
      ["Do the right thing when it is inconvenient.","Common sense","c","That is the only time it is a test.","co"]],
  35:[["Let us not love in word, neither in tongue; but in deed and in truth.","1 John 3:18","s","Deeds and truth. Both.","fa"],
      ["Government of the people, by the people, for the people, shall not perish from the earth.","Abraham Lincoln","h","Two hundred and seventy-two words at Gettysburg.","pa"],
      ["Do what you can, with what you have, where you are.","Theodore Roosevelt","h","No better conditions required.","re"],
      ["We make a living by what we get; we make a life by what we give.","Traditional saying","p","Two different accounts.","gr"],
      ["Volunteer for the job nobody wants.","Common sense","c","That is where a man is built.","st"]],
  36:[["I have fought a good fight, I have finished my course, I have kept the faith.","2 Timothy 4:7","s","All three, in that order.","fa"],
      ["Quit you like men, be strong. Let all your things be done with charity.","1 Corinthians 16:13-14","s","Strength and charity in the same breath.","st"],
      ["As for me and my house, we will serve the Lord.","Joshua 24:15","s","A house decides together.","fm"],
      ["It is not the beginning but the continuing until it is thoroughly finished that yields the true glory.","after Francis Drake","h","You continued.","st"],
      ["Give thanks, and go use it.","Common sense","c","A year of learning is for spending.","gr"]]
  };

  /* One quote per school day. Deterministic: the same week and day always
   * gives the same quote, so a boy cannot reroll for an easier one and a
   * parent can look up what was read on a given day. */
  const DAY_INDEX = {Mon:0, Tue:1, Wed:2, Thu:3, Fri:4};
  const KIND  = {s:"Scripture", p:"Proverb", h:"Said long ago", c:"Common sense"};
  const THEME = {co:"Courage", st:"Strength", fa:"Faith", re:"Responsibility",
                 fm:"Family", gr:"Gratitude", pa:"Country", un:"Understanding"};

  function quoteFor(grade, week, day){
    const table = grade==="y2" ? Y2 : Y1;
    const rows = table[week] || table[1];
    const i = DAY_INDEX[day]==null ? 0 : DAY_INDEX[day];
    const r = rows[i] || rows[0];
    return {
      id: "la-"+grade+"-quote-w"+week+"-"+day.toLowerCase(),
      text: r[0], source: r[1], kind: r[2], kindLabel: KIND[r[2]] || "",
      think: r[3], theme: r[4], themeLabel: THEME[r[4]] || ""
    };
  }

  function countFor(grade){
    const t = grade==="y2" ? Y2 : Y1;
    return Object.keys(t).reduce((n,k)=>n+t[k].length, 0);
  }

  /* Theme coverage, for the parent view and for tests. */
  function themeCounts(grade){
    const t = grade==="y2" ? Y2 : Y1, out = {};
    Object.keys(THEME).forEach(k=>out[k]=0);
    Object.keys(t).forEach(w=>t[w].forEach(r=>{ out[r[4]] = (out[r[4]]||0)+1; }));
    return out;
  }

  window.__CURR = window.__CURR || {};
  window.__CURR.LA_QUOTES = {Y1, Y2, quoteFor, countFor, themeCounts, DAY_INDEX, KIND, THEME};
})();
