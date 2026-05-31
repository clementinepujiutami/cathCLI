"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BUILTIN_PRAYERS = void 0;
exports.findPrayer = findPrayer;
exports.prayersByCategory = prayersByCategory;
exports.BUILTIN_PRAYERS = [
    {
        id: 'our-father',
        title: 'Our Father (The Lord\'s Prayer)',
        category: 'daily',
        text: `Our Father, Who art in heaven,
hallowed be Thy name;
Thy kingdom come;
Thy will be done on earth as it is in heaven.
Give us this day our daily bread;
and forgive us our trespasses
as we forgive those who trespass against us;
and lead us not into temptation,
but deliver us from evil.
Amen.`
    },
    {
        id: 'hail-mary',
        title: 'Hail Mary (Ave Maria)',
        category: 'daily',
        text: `Hail Mary, full of grace. The Lord is with thee.
Blessed art thou amongst women,
and blessed is the fruit of thy womb, Jesus.
Holy Mary, Mother of God,
pray for us sinners,
now and at the hour of our death.
Amen.`
    },
    {
        id: 'glory-be',
        title: 'Glory Be (Doxology)',
        category: 'daily',
        text: `Glory be to the Father, and to the Son,
and to the Holy Spirit.
As it was in the beginning, is now,
and ever shall be, world without end.
Amen.`
    },
    {
        id: 'apostles-creed',
        title: 'The Apostles\' Creed',
        category: 'daily',
        text: `I believe in God, the Father almighty,
Creator of heaven and earth,
and in Jesus Christ, his only Son, our Lord,
who was conceived by the Holy Spirit,
born of the Virgin Mary,
suffered under Pontius Pilate,
was crucified, died and was buried;
he descended into hell;
on the third day he rose again from the dead;
he ascended into heaven,
and is seated at the right hand of God the Father almighty;
from there he will come to judge the living and the dead.
I believe in the Holy Spirit,
the holy catholic Church,
the communion of saints,
the forgiveness of sins,
the resurrection of the body,
and life everlasting.
Amen.`
    },
    {
        id: 'nicene-creed',
        title: 'The Nicene Creed',
        category: 'daily',
        text: `I believe in one God,
the Father almighty,
maker of heaven and earth,
of all things visible and invisible.

I believe in one Lord Jesus Christ,
the Only Begotten Son of God,
born of the Father before all ages.
God from God, Light from Light,
true God from true God,
begotten, not made, consubstantial with the Father;
through him all things were made.
For us men and for our salvation
he came down from heaven,
and by the Holy Spirit was incarnate of the Virgin Mary,
and became man.
For our sake he was crucified under Pontius Pilate,
he suffered death and was buried,
and rose again on the third day
in accordance with the Scriptures.
He ascended into heaven
and is seated at the right hand of the Father.
He will come again in glory
to judge the living and the dead
and his kingdom will have no end.

I believe in the Holy Spirit, the Lord, the giver of life,
who proceeds from the Father and the Son,
who with the Father and the Son is adored and glorified,
who has spoken through the prophets.

I believe in one, holy, catholic and apostolic Church.
I confess one Baptism for the forgiveness of sins
and I look forward to the resurrection of the dead
and the life of the world to come.
Amen.`
    },
    {
        id: 'act-of-contrition',
        title: 'Act of Contrition',
        category: 'daily',
        text: `O my God, I am heartily sorry for having offended Thee,
and I detest all my sins because of Thy just punishments,
but most of all because they offend Thee, my God,
Who art all good and deserving of all my love.
I firmly resolve, with the help of Thy grace,
to sin no more and to avoid the near occasions of sin.
Amen.`
    },
    {
        id: 'morning-offering',
        title: 'Morning Offering',
        category: 'daily',
        text: `O Jesus, through the Immaculate Heart of Mary,
I offer You my prayers, works, joys, and sufferings of this day,
for all the intentions of Your Sacred Heart,
in union with the Holy Sacrifice of the Mass throughout the world,
for the salvation of souls, the reparation of sins,
the reunion of all Christians, and in particular for
the intentions of the Holy Father this month.
Amen.`
    },
    {
        id: 'guardian-angel-prayer',
        title: 'Guardian Angel Prayer (Angele Dei)',
        category: 'daily',
        text: `Angel of God, my guardian dear,
to whom God's love commits me here,
ever this day be at my side,
to light and guard, to rule and guide.
Amen.`
    },
    {
        id: 'grace-before-meals',
        title: 'Grace Before Meals',
        category: 'daily',
        text: `Bless us, O Lord, and these Thy gifts,
which we are about to receive from Thy bounty,
through Christ our Lord.
Amen.`
    },
    {
        id: 'hail-holy-queen',
        title: 'Hail Holy Queen (Salve Regina)',
        category: 'marian',
        text: `Hail, holy Queen, Mother of Mercy,
our life, our sweetness and our hope.
To thee do we cry, poor banished children of Eve.
To thee do we send up our sighs,
mourning and weeping in this valley of tears.
Turn then, most gracious advocate,
thine eyes of mercy toward us,
and after this our exile,
show unto us the blessed fruit of thy womb, Jesus.
O clement, O loving, O sweet Virgin Mary!

Pray for us, O holy Mother of God,
that we may be made worthy of the promises of Christ.
Amen.`
    },
    {
        id: 'memorare',
        title: 'The Memorare',
        category: 'marian',
        text: `Remember, O most gracious Virgin Mary,
that never was it known that anyone who fled to thy protection,
implored thy help, or sought thine intercession was left unaided.
Inspired by this confidence, I fly unto thee, O Virgin of virgins, my Mother;
to thee do I come, before thee I stand, sinful and sorrowful.
O Mother of the Word Incarnate, despise not my petitions,
but in thy mercy hear and answer me.
Amen.`
    },
    {
        id: 'angelus',
        title: 'The Angelus',
        category: 'marian',
        text: `V. The Angel of the Lord declared unto Mary.
R. And she conceived of the Holy Spirit.
(Hail Mary...)

V. Behold the handmaid of the Lord.
R. Be it done unto me according to thy word.
(Hail Mary...)

V. And the Word was made flesh.
R. And dwelt among us.
(Hail Mary...)

V. Pray for us, O holy Mother of God.
R. That we may be made worthy of the promises of Christ.

Let us pray: Pour forth, we beseech Thee, O Lord, Thy grace into our hearts, that we to whom the Incarnation of Christ Thy Son was made known by the message of an Angel, may by His Passion and Cross be brought to the glory of His Resurrection. Through the same Christ our Lord.
Amen.`
    },
    {
        id: 'magnificat',
        title: 'The Magnificat (Canticle of Mary)',
        category: 'marian',
        text: `My soul proclaims the greatness of the Lord,
my spirit rejoices in God my Savior,
for he has looked with favor on his lowly servant.
From this day all generations will call me blessed:
the Almighty has done great things for me,
and holy is his Name.
He has mercy on those who fear him
in every generation.
He has shown the strength of his arm,
he has scattered the proud in their conceit.
He has cast down the mighty from their thrones,
and has lifted up the lowly.
He has filled the hungry with good things,
and the rich he has sent away empty.
He has come to the help of his servant Israel
for he has remembered his promise of mercy,
the promise he made to our fathers,
to Abraham and his children for ever.
Amen.`
    },
    {
        id: 'regina-caeli',
        title: 'Regina Caeli (Queen of Heaven)',
        category: 'marian',
        text: `Queen of Heaven, rejoice, alleluia.
For He whom you did merit to bear, alleluia.
Has risen, as he said, alleluia.
Pray for us to God, alleluia.

V. Rejoice and be glad, O Virgin Mary, alleluia.
R. For the Lord has truly risen, alleluia.

Let us pray: O God, who gave joy to the world through the resurrection of Thy Son, our Lord Jesus Christ, grant we beseech Thee, that through the intercession of the Virgin Mary, His Mother, we may obtain the joys of everlasting life. Through the same Christ our Lord.
Amen.`
    },
    {
        id: 'st-michael-prayer',
        title: 'Prayer to Saint Michael the Archangel',
        category: 'devotion',
        text: `Saint Michael the Archangel, defend us in battle.
Be our protection against the wickedness and snares of the devil.
May God rebuke him, we humbly pray;
and do thou, O Prince of the Heavenly Host,
by the power of God, cast into hell Satan
and all the evil spirits who prowl about the world
seeking the ruin of souls.
Amen.`
    },
    {
        id: 'anima-christi',
        title: 'Anima Christi (Soul of Christ)',
        category: 'devotion',
        text: `Soul of Christ, sanctify me.
Body of Christ, save me.
Blood of Christ, inebriate me.
Water from the side of Christ, wash me.
Passion of Christ, strengthen me.
O good Jesus, hear me.
Within Thy wounds hide me.
Suffer me not to be separated from Thee.
From the malignant enemy defend me.
In the hour of my death call me,
and bid me come unto Thee,
that with Thy saints I may praise Thee
forever and ever.
Amen.`
    },
    {
        id: 'suscipe',
        title: 'Suscipe (Surrender Prayer of St. Ignatius)',
        category: 'devotion',
        text: `Take, Lord, and receive all my liberty,
my memory, my understanding,
and my entire will,
All I have and call my own.
You have given all to me.
To you, Lord, I return it.
Everything is yours; do with it what you will.
Give me only your love and your grace,
that is enough for me.
Amen.`
    },
    {
        id: 'peace-prayer-st-francis',
        title: 'Peace Prayer of Saint Francis',
        category: 'devotion',
        text: `Lord, make me an instrument of your peace:
where there is hatred, let me sow love;
where there is injury, pardon;
where there is doubt, faith;
where there is despair, hope;
where there is darkness, light;
where there is sadness, joy.

O Divine Master, grant that I may not so much seek
to be consoled as to console,
to be understood as to understand,
to be loved as to love.
For it is in giving that we receive,
it is in pardoning that we are pardoned,
and it is in dying that we are born to eternal life.
Amen.`
    },
    {
        id: 'divine-mercy-chaplet',
        title: 'Chaplet of Divine Mercy',
        category: 'devotion',
        text: `How to Pray the Chaplet of Divine Mercy:

1. Begin with the Sign of the Cross, one Our Father, one Hail Mary, and the Apostles' Creed.
2. Then on the Lord's Prayer beads, say the following:
   "Eternal Father, I offer You the Body and Blood, Soul and Divinity of Your dearly beloved Son, our Lord Jesus Christ, in atonement for our sins and those of the whole world."
3. On the ten Hail Mary beads, say the following:
   "For the sake of His sorrowful Passion, have mercy on us and on the whole world."
4. Conclude with the Holy God (repeat three times):
   "Holy God, Holy Mighty One, Holy Immortal One, have mercy on us and on the whole world."
5. Optional Closing Prayer:
   "Eternal God, in whom mercy is endless and the treasury of compassion inexhaustible, look kindly upon us and increase Your mercy in us, that in difficult moments we might not despair nor become despondent, but with great confidence submit ourselves to Your holy will, which is Love and Mercy itself."`
    },
    {
        id: 'litany-of-humility',
        title: 'Litany of Humility',
        category: 'litany',
        text: `O Jesus, meek and humble of heart, Hear me.

From the desire of being esteemed, Deliver me, Jesus.
From the desire of being loved, Deliver me, Jesus.
From the desire of being extolled, Deliver me, Jesus.
From the desire of being honored, Deliver me, Jesus.
From the desire of being praised, Deliver me, Jesus.
From the desire of being preferred to others, Deliver me, Jesus.
From the desire of being consulted, Deliver me, Jesus.
From the desire of being approved, Deliver me, Jesus.
From the fear of being humiliated, Deliver me, Jesus.
From the fear of being despised, Deliver me, Jesus.
From the fear of being rebuffed, Deliver me, Jesus.
From the fear of being calumniated, Deliver me, Jesus.
From the fear of being forgotten, Deliver me, Jesus.
From the fear of being ridiculed, Deliver me, Jesus.
From the fear of being wronged, Deliver me, Jesus.
From the fear of being suspected, Deliver me, Jesus.

That others may be loved more than I, Jesus, grant me the grace to desire it.
That others may be esteemed more than I, Jesus, grant me the grace to desire it.
That, in the opinion of the world, others may increase and I may decrease, Jesus, grant me the grace to desire it.
That others may be chosen and I set aside, Jesus, grant me the grace to desire it.
That others may be praised and I unnoticed, Jesus, grant me the grace to desire it.
That others may be preferred to me in everything, Jesus, grant me the grace to desire it.
That others may become holier than I, provided that I may become as holy as I should, Jesus, grant me the grace to desire it.`
    },
    {
        id: 'holy-rosary',
        title: 'The Holy Rosary',
        category: 'rosary',
        text: `✝ OPENING PRAYERS

Sign of the Cross:
In the name of the Father, and of the Son, and of the Holy Spirit. Amen.

Apostles' Creed:
I believe in God, the Father almighty, Creator of heaven and earth,
and in Jesus Christ, his only Son, our Lord, who was conceived by the
Holy Spirit, born of the Virgin Mary, suffered under Pontius Pilate,
was crucified, died and was buried; he descended into hell; on the third
day he rose again from the dead; he ascended into heaven, and is seated
at the right hand of God the Father almighty; from there he will come to
judge the living and the dead. I believe in the Holy Spirit, the holy
catholic Church, the communion of saints, the forgiveness of sins,
the resurrection of the body, and life everlasting. Amen.

Our Father:
Our Father, Who art in heaven, hallowed be Thy name; Thy kingdom come;
Thy will be done on earth as it is in heaven. Give us this day our daily
bread; and forgive us our trespasses as we forgive those who trespass
against us; and lead us not into temptation, but deliver us from evil. Amen.

3 Hail Marys (for an increase in Faith, Hope, and Charity):
Hail Mary, full of grace. The Lord is with thee. Blessed art thou amongst
women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of
God, pray for us sinners, now and at the hour of our death. Amen. (×3)

Glory Be:
Glory be to the Father, and to the Son, and to the Holy Spirit. As it was
in the beginning, is now, and ever shall be, world without end. Amen.

─────────────────────────────────────────────

✝ FOR EACH DECADE (repeat 5 times):

  1. Announce the Mystery and briefly meditate on it.

  2. Our Father:
     Our Father, Who art in heaven, hallowed be Thy name; Thy kingdom come;
     Thy will be done on earth as it is in heaven. Give us this day our daily
     bread; and forgive us our trespasses as we forgive those who trespass
     against us; and lead us not into temptation, but deliver us from evil. Amen.

  3. Hail Mary (×10):
     Hail Mary, full of grace. The Lord is with thee. Blessed art thou amongst
     women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of
     God, pray for us sinners, now and at the hour of our death. Amen.

  4. Glory Be:
     Glory be to the Father, and to the Son, and to the Holy Spirit. As it was
     in the beginning, is now, and ever shall be, world without end. Amen.

  5. Fatima Prayer:
     O my Jesus, forgive us our sins, save us from the fires of hell, lead all
     souls to heaven, especially those in most need of Thy mercy.

─────────────────────────────────────────────

✝ CLOSING PRAYERS

Hail Holy Queen (Salve Regina):
Hail, holy Queen, Mother of Mercy, our life, our sweetness and our hope.
To thee do we cry, poor banished children of Eve. To thee do we send up our
sighs, mourning and weeping in this valley of tears. Turn then, most gracious
advocate, thine eyes of mercy toward us, and after this our exile, show unto
us the blessed fruit of thy womb, Jesus. O clement, O loving, O sweet Virgin Mary!
Pray for us, O holy Mother of God, that we may be made worthy of the promises of Christ.

Concluding Prayer:
O God, whose only begotten Son, by His life, death, and resurrection, has
purchased for us the rewards of eternal life, grant, we beseech Thee, that
meditating upon these mysteries of the Most Holy Rosary of the Blessed Virgin
Mary, we may imitate what they contain and obtain what they promise, through
the same Christ our Lord. Amen.

Sign of the Cross:
In the name of the Father, and of the Son, and of the Holy Spirit. Amen.

─────────────────────────────────────────────

✝ THE MYSTERIES

[Joyful Mysteries] — Mondays & Saturdays
  1st Decade · The Annunciation (Luke 1:26–38)
  2nd Decade · The Visitation (Luke 1:39–56)
  3rd Decade · The Nativity (Luke 2:1–20)
  4th Decade · The Presentation in the Temple (Luke 2:22–38)
  5th Decade · The Finding in the Temple (Luke 2:41–52)

[Luminous Mysteries] — Thursdays
  1st Decade · The Baptism of Christ in the Jordan (Matthew 3:13–17)
  2nd Decade · The Wedding at Cana (John 2:1–11)
  3rd Decade · The Proclamation of the Kingdom (Mark 1:14–15)
  4th Decade · The Transfiguration (Luke 9:28–36)
  5th Decade · The Institution of the Eucharist (Matthew 26:26–28)

[Sorrowful Mysteries] — Tuesdays & Fridays
  1st Decade · The Agony in the Garden (Luke 22:39–46)
  2nd Decade · The Scourging at the Pillar (John 19:1)
  3rd Decade · The Crowning with Thorns (Matthew 27:27–31)
  4th Decade · The Carrying of the Cross (John 19:17)
  5th Decade · The Crucifixion and Death of Our Lord (Luke 23:33–46)

[Glorious Mysteries] — Wednesdays & Sundays
  1st Decade · The Resurrection (Mark 16:1–8)
  2nd Decade · The Ascension (Acts 1:6–11)
  3rd Decade · The Descent of the Holy Spirit (Acts 2:1–4)
  4th Decade · The Assumption of Mary
  5th Decade · The Coronation of Mary as Queen of Heaven and Earth`
    },
    {
        id: 'come-holy-spirit',
        title: "Come Holy Spirit",
        category: 'daily',
        text: `Come Holy Spirit,

fill the hearts of Your faithful

and kindle in them the fire of Your love.

Send forth Your Spirit

and they shall be created.

And You shall renew the face of the earth.

O, God, Who by the light of the Holy Spirit,

did instruct the hearts of the faithful,

grant that by the same Holy Spirit

we may be truly wise and ever enjoy His consolations,

through Christ Our Lord.

Amen.`
    },
    {
        id: 'breastplate-of-saint-patrick',
        title: "Breastplate of Saint Patrick",
        category: 'devotion',
        text: `I bind unto myself today The strong Name of the Trinity, By invocation of the same, The Three in One and One in Three.

I bind this day to me for ever. By power of faith, Christ’s incarnation; His baptism in the Jordan river; His death on Cross for my salvation; His bursting from the spicèd tomb; His riding up the heavenly way; His coming at the day of doom;* I bind unto myself today.

I bind unto myself the power Of the great love of the cherubim; The sweet ‘well done’ in judgment hour, The service of the seraphim, Confessors’ faith, Apostles’ word, The Patriarchs’ prayers, the Prophets’ scrolls, All good deeds done unto the Lord, And purity of virgin souls.

I bind unto myself today The virtues of the starlit heaven, The glorious sun’s life-giving ray, The whiteness of the moon at even, The flashing of the lightning free, The whirling wind’s tempestuous shocks, The stable earth, the deep salt sea, Around the old eternal rocks.

I bind unto myself today The power of God to hold and lead, His eye to watch, His might to stay, His ear to hearken to my need. The wisdom of my God to teach, His hand to guide, His shield to ward, The word of God to give me speech, His heavenly host to be my guard.

Against the demon snares of sin, The vice that gives temptation force, The natural lusts that war within, The hostile men that mar my course; Or few or many, far or nigh, In every place and in all hours, Against their fierce hostility, I bind to me these holy powers.

Against all Satan’s spells and wiles, Against false words of heresy, Against the knowledge that defiles, Against the heart’s idolatry, Against the wizard’s evil craft, Against the death wound and the burning, The choking wave and the poisoned shaft, Protect me, Christ, till Thy returning.

Christ be with me, Christ within me, Christ behind me, Christ before me, Christ beside me, Christ to win me, Christ to comfort and restore me. Christ beneath me, Christ above me, Christ in quiet, Christ in danger, Christ in hearts of all that love me, Christ in mouth of friend and stranger.

I bind unto myself the Name, The strong Name of the Trinity; By invocation of the same. The Three in One, and One in Three, Of Whom all nature hath creation, Eternal Father, Spirit, Word: Praise to the Lord of my salvation, Salvation is of Christ the Lord.

Amen.`
    },
    {
        id: 'litany-of-saints',
        title: "Litany of Saints",
        category: 'litany',
        text: `Lord, have mercy.  Lord, have mercy

Christ, have mercy.  Christ, have mercy

Lord, have mercy.  Lord, have mercy

Christ, hear us.  Christ, graciously hear us.

After each response below the invocation is:

God, our heavenly Father,

God the Son, Redeemer of the world,

God the Holy Spirit,

Holy Trinity, one God,

After each response below the invocation is:

Holy Mary, pray for us.

Holy Mother of God,

Holy Virgin of virgins,

Saint Michael,

Saint Gabriel,

Saint Raphael,

All you holy Angels and Archangels,

All you holy orders of blessed Spirits,

Saint John the Baptist,

Saint Joseph,

All you holy Patriarchs and Prophets,

Saint Peter,

Saint Paul,

Saint Andrew,

Saint James,

Saint John,

Saint Thomas,

Saint James,

Saint Philip,

Saint Bartholomew,

Saint Matthew,

Saint Simon,

Saint Thaddeus,

Saint Matthias,

Saint Barnabas,

Saint Luke,

Saint Mark,

All you holy Apostles and Evangelists,

All you holy Disciples of the Lord,

All you holy Innocents,

Saint Stephen,

Saint Lawrence,

Saint Vincent,

Saint Fabian and Saint Sebastian,

Saint John and Saint Paul,

Saint Cosmas and Saint Damian,

Saint Gervase and Saint Protase,

All you holy Martyrs,

Saint Silvester,

Saint Gregory,

Saint Ambrose,

Saint Augustine,

Saint Jerome,

Saint Martin,

Saint Nicholas,

All you holy Bishops and Confessors,

All you holy Doctors,

Saint Anthony,

Saint Benedict,

Saint Bernard,

Saint Dominic,

Saint Francis,

All you holy Priests and Clergy,

All you holy Monks and Hermits,

Saint Mary Magdalene,

Saint Agatha,

Saint Lucy,

Saint Agnes,

Saint Cecilia,

Saint Catharine,

Saint Anastasia,

All you holy Virgins and Widows,

All you Saints of God,

After each invocation below, the response is:

Lord be merciful, Lord save Your people

From every evil,

From every sin,

From Your anger,

From sudden and unforeseen death,

From the snares of the devil,

From anger, hatred, and all ill will,

From the spirit of uncleanness,

From lightening and tempest,

From the scourge of earthquake,

From plague, famine, and war,

From everlasting death,

By the mystery of Your holy Incarnation,

By Your coming,

By Your birth,

By Your baptism and holy fasting,

By Your Cross and suffering,

By Your death and burial,

By Your holy resurrection,

By Your wonderful ascension,

By the coming of the Holy Spirit, the Paraclete,

On the day of Judgment,

After each invocation below, the response is:

Be merciful to us sinners, Lord, hear our prayer.

That You will spare us,

That You will pardon us,

That it may please You to bring us to true repentance,

To govern and preserve Your holy Church,

To preserve in holy religion the Pope, and all Holy Orders,

To humble the enemies of holy Church,

To give peace and unity to the whole Christian people,

To recall to the unity of the Church all those who are straying, to bring all unbelievers to the light of the Gospel,

To strengthen and preserve us in Your holy service,

To raise our minds to desire the things of heaven,

To reward all our benefactors with eternal blessings,

To deliver our souls from eternal damnation, and the souls of our brethren, kinsmen, and benefactors,

To give and preserve the fruits of the earth,

To grant eternal rest to all the faithful departed, That it may please You to hear and heed us, Jesus, Son of the living God,

Lamb of God, who takes away the sins of the world,

spare us, O Lord.

Lamb of God, who takes away the sins of the world,

graciously hear us, O Lord.

Lamb of God, who takes away the sins of the world,

have mercy on us.

Christ, hear us. Christ, graciously hear us.

Lord Jesus, hear our prayer.  Lord Jesus, hear our prayer.

Lord, have mercy.  Lord, have mercy.

Christ, have mercy.  Christ, have mercy.

Lord, have mercy.  Lord, have mercy.

Amen.`
    },
    {
        id: 'litany-of-the-blessed-virgin-mary',
        title: "Litany of the Blessed Virgin Mary",
        category: 'litany',
        text: `Litany of Our Lady of Loreto

Lord, have mercy on us.

Christ, have mercy on us.

Lord, have mercy on us.

Christ, hear us.

Christ, graciously hear us.

God the Father of Heaven, have mercy on us.

God the Son, Redeemer of the world, have mercy on us.

God the Holy Ghost, have mercy on us.

Holy Trinity, one God, have mercy on us.

Holy Mother of God, pray for us.

Holy Virgin of virgins, pray for us.

Mother of Christ, pray for us.

Mother of divine grace, pray for us.

Mother most pure, pray for us.

Mother most chaste, pray for us.

Mother inviolate, pray for us.

Mother undefiled, pray for us.

Mother most amiable, pray for us.

Mother most admirable, pray for us.

Mother of good counsel, pray for us.

Mother of our Creator, pray for us.

Mother of our Savior, pray for us.

Virgin most prudent, pray for us.

Virgin most venerable, pray for us.

Virgin most renowned, pray for us.

Virgin most powerful, pray for us.

Virgin most merciful, pray for us.

Virgin most faithful, pray for us.

Mirror of justice, pray for us.

Seat of wisdom, pray for us.

Cause of our joy, pray for us.

Spiritual vessel, pray for us.

Vessel of honor, pray for us.

Singular vessel of devotion, pray for us.

Mystical rose, pray for us.

Tower of David, pray for us.

Tower of ivory, pray for us.

House of gold, pray for us.

Ark of the covenant, pray for us.

Gate of heaven, pray for us.

Morning star, pray for us.

Health of the sick, pray for us.

Refuge of sinners, pray for us.

Comforter of the afflicted, pray for us.

Help of Christians, pray for us.

Queen of Angels, pray for us.

Queen of Patriarchs, pray for us.

Queen of Prophets, pray for us.

Queen of Apostles, pray for us.

Queen of Martyrs, pray for us.

Queen of Confessors, pray for us.

Queen of Virgins, pray for us.

Queen of all Saints, pray for us.

Queen conceived without original sin, pray for us.

Queen of the most sacred Rosary, pray for us.

Lamb of God, who takest away the sins of the world, Spare us, O Lord!

Lamb of God, who takest away the sins of the world, Graciously hear us, O Lord!

Lamb of God, who takest away the sins of the world, Have mercy on us.

V. Pray for us, O holy Mother of God!

R. That we may be made worthy of the promises of Christ.

Let us pray.

Grant, we beseech Thee, 0 Lord God, that we Thy servants may be blessed with continual health of soul and body; and that by the glorious intercession of the Blessed Mary, ever Virgin, we may both be delivered from present sorrows and be brought to eternal joys. Through Christ our Lord. Amen.

V. Pray for us, O holy Joseph!

R. That we may be made worthy of the promises of Christ.

Let us pray.

O God! who in Thy unspeakable providence didst choose the Blessed Joseph to be the spouse of Thy own most holy Mother, grant, we beseech Thee, that He, whom we venerate as our protector upon earth, may be our intercessor in Heaven.

Amen.

Image on this page

Prayers from “ The Catholics Pocket Prayer Book, published in 1899.

Imprimatur: MICHAEL AUGUSTINE, Archbishop of New York. New York, Oct. 13, 1899.`
    },
    {
        id: 'litany-of-the-most-holy-name-of-jesus',
        title: "Litany of the Most Holy Name of Jesus",
        category: 'litany',
        text: `Lord, have mercy.

Christ, have mercy.

Lord, have mercy.

Jesus, hear us.

Jesus, graciously hear us.

God, the Father of Heaven,

have mercy on us .

God the Son, Redeemer of the world,

have mercy on us .

God, the Holy Spirit,

have mercy on us .

Holy Trinity, one God,

have mercy on us .

Jesus, Son of the living God,

have mercy on us .

Jesus, Splendor of the Father,

have mercy on us .

Jesus, Brightness of eternal Light,

have mercy on us .

Jesus, King of Glory,

have mercy on us .

Jesus, Sun of Justice,

have mercy on us .

Jesus, Son of the Virgin Mary,

have mercy on us .

Jesus, most amiable,

have mercy on us .

Jesus, most admirable,

have mercy on us .

Jesus, the mighty God,

have mercy on us .

Jesus, Father of the world to come,

have mercy on us .

Jesus, angel of great counsel,

have mercy on us .

Jesus, most powerful,

have mercy on us .

Jesus, most patient,

have mercy on us .

Jesus, most obedient,

have mercy on us .

Jesus, meek and humble of heart,

have mercy on us .

Jesus, Lover of Chastity,

have mercy on us .

Jesus, our Lover,

have mercy on us .

Jesus, God of Peace,

have mercy on us .

Jesus, Author of Life,

have mercy on us .

Jesus, Model of Virtues,

have mercy on us .

Jesus, zealous for souls,

have mercy on us .

Jesus, our God,

have mercy on us .

Jesus, our Refuge,

have mercy on us .

Jesus, Father of the Poor,

have mercy on us .

Jesus, Treasure of the Faithful,

have mercy on us .

Jesus, good Shepherd,

have mercy on us .

Jesus, true Light,

have mercy on us .

Jesus, eternal Wisdom,

have mercy on us .

Jesus, infinite Goodness,

have mercy on us .

Jesus, our Way and our Life,

have mercy on us .

Jesus, joy of the Angels,

have mercy on us .

Jesus, King of the Patriarchs,

have mercy on us .

Jesus, Master of the Apostles,

have mercy on us .

Jesus, Teacher of the Evangelists,

have mercy on us .

Jesus, Strength of Martyrs,

have mercy on us .

Jesus, Light of Confessors,

have mercy on us .

Jesus, Purity of Virgins,

have mercy on us .

Jesus, Crown of all Saints,

have mercy on us .

Be merciful, spare us, O Jesus!

Be merciful, graciously hear us, O Jesus!

From all evil,

deliver us, O Jesus .

From all sin,

deliver us, O Jesus .

From your wrath,

deliver us, O Jesus .

From the snares of the devil,

deliver us, O Jesus .

From the spirit of fornication,

deliver us, O Jesus .

From everlasting death,

deliver us, O Jesus .

From the neglect of your inspirations,

deliver us, O Jesus .

Through the mystery of your holy Incarnation,

deliver us, O Jesus .

Through your Nativity,

deliver us, O Jesus .

Through your Infancy,

deliver us, O Jesus .

Through your most divine Life,

deliver us, O Jesus .

Through your Labors,

deliver us, O Jesus .

Through your Agony and Passion,

deliver us, O Jesus .

Through your Cross and Dereliction,

deliver us, O Jesus .

Through your Sufferings,

deliver us, O Jesus .

Through your Death and Burial,

deliver us, O Jesus .

Through your Resurrection,

deliver us, O Jesus .

Through your Ascension,

deliver us, O Jesus .

Through your Institution of the Most Holy Eucharist,

deliver us, O Jesus .

Through your Joys,

deliver us, O Jesus .

Through your Glory,

deliver us, O Jesus .

Lamb of God, who takes away the sins of the world,

spare us, O Jesus!

Lamb of God, who takes away the sins of the world,

graciously hear us, O Jesus!

Lamb of God, who takes away the sins of the world,

have mercy on us, O Jesus!

Jesus, hear us.

Jesus, graciously hear us.

Let us pray. O Lord Jesus Christ, you have said, “Ask and you shall receive; seek, and you shall find; knock, and it shall be opened to you”; mercifully attend to our supplications, and grant us the grace of your most divine love, that we may love you with all our hearts, and in all our words and actions, and never cease to praise you.

Make us, O Lord, to have a perpetual fear and love of your holy name, for you never fail to govern those whom you solidly establish in your love. You, who live and reign forever and ever.

Amen.

Further Reading:

Dominican Biographies

Catholic Culture

Franciscan Media

New Advent

Catholic Online

Wikipedia`
    },
    {
        id: 'st-faustinas-litany-of-divine-mercy',
        title: "St. Faustina’s Litany to The Divine Mercy",
        category: 'litany',
        text: `Diary of Saint Maria Faustina Kowalska, Entry #949

+ JMJ    February 12, 1937

+God’s love is the flower – Mercy the fruit. Let the doubting soul read these considerations on Divine Mercy and become trusting.

Divine Mercy, gushing forth from the bosom of the Father, I trust in You.

Divine Mercy, greatest attribute of God, I trust in You.

Divine Mercy, incomprehensible mystery, I trust in You.

Divine Mercy, fount gushing forth from the mystery of the Most Blessed Trinity, I trust in You.

Divine Mercy, unfathomed by any intellect, human or angelic, I trust in You.

Divine Mercy, from which wells forth all life and happiness, I trust in You.

Divine Mercy, better than the heavens, I trust in You.

Divine Mercy, source of miracles and wonders, I trust in You.

Divine Mercy, encompassing the whole universe, I trust in You

Divine Mercy, descending to earth in the Person of the Incarnate Word, I trust in You.

Divine Mercy, which flowed out from the open wound of the Heart of Jesus, I trust in You.

Divine Mercy, enclosed in the Heart of Jesus for us, and especially for sinners, I trust in You.

Divine Mercy, unfathomed in the institution of the Sacred Host, I trust in You.

Divine Mercy, in the founding of Holy Church, I trust in You.

Divine Mercy, in the Sacrament of Holy Baptism, I trust in You.

Divine Mercy, in our justification through Jesus Christ, I trust in You.

Divine Mercy, accompanying us through our whole life, I trust in You.

Divine Mercy, embracing us especially at the hour of death, I trust in You.

Divine Mercy, endowing us with immortal life, I trust in You.

Divine Mercy, accompanying us every moment of our life, I trust in You.

Divine Mercy, shielding us from the fire of hell, I trust in You.

Divine Mercy, in the conversion of hardened sinners, I trust in You.

Divine Mercy, astonishment for Angels, incomprehensible to Saints, I trust in You.

Divine Mercy, unfathomed in all the mysteries of God, I trust in You.

Divine Mercy, lifting us out of every misery, I trust in You.

Divine Mercy, source of our happiness and joy, I trust in You.

Divine Mercy, in calling us forth from nothingness to existence, I trust in You.

Divine Mercy, embracing all the works of His hands, I trust in You.

Divine Mercy, crown of all of God’s handiwork, I trust in You.

Divine Mercy, in which we are all immersed, I trust in You.

Divine Mercy, sweet relief for anguished hearts, I trust in You.

Divine Mercy, only hope for despairing souls, I trust in You.

Divine Mercy, repose of hearts, peace amidst fear, I trust in You.

Divine Mercy, delight and ecstasy of holy souls, I trust in You.

Divine Mercy, inspiring hope against all hope, I trust in You.

+ Eternal God, in whom mercy is unfathomable and the treasury of compassion inexhaustible, look kindly upon us and increase Your mercy in us, that in difficult moments we might not despair nor become despondent, but with great confidence submit ourselves to Your holy will, which is Love and Mercy, itself” (Diary 950).

+ O incomprehensible and limitless Mercy Divine, To extol and adore You worthily, who can? Supreme attribute of Almighty God, You are the sweet hope for sinful man.  Into one hymn yourselves unite, stars, earth and sea, and in one accord, thankfully and fervently sing of the incomprehensible Divine Mercy (Diary 951).

More Divine Mercy Prayers`
    },
    {
        id: 'novena-to-saint-joseph',
        title: "Novena to Saint Joseph",
        category: 'devotion',
        text: `Day One—March 10 Day Two—March 11 Day Three—March 12 Day Four—March 13 Day Five—March 14 Day Six—March 15 Day Seven—March 16 Day Eight—March 17 Day Nine—March 18

Saint Joseph Husband of the Blessed Virgin Mary—Solemnity

Saint Joseph, you were privileged to share in the mystery of the Incarnation as the foster-father of Jesus. Mary alone was directly connected with the fulfillment of the mystery, in that she gave her consent to Christ’s conception and allowed the Holy Spirit to form the sacred humanity of Jesus from her blood. You had a part in this mystery in an indirect manner, by fulfilling the condition necessary for the Incarnation — the protection of Mary’s virginity before and during your married life with her. You made the virginal marriage possible, and this was a part of God’s plan, foreseen, willed, and decreed from all eternity.

In a more direct manner you shared in the support, upbringing, and protection of the Divine Child as His foster-father. For this purpose the Heavenly Father gave you a genuine heart of a father — a heart full of love and self-sacrifice. With the toil of your hands you were obliged to offer protection to the Divine Child, to procure for Him food, clothing, and a home. You were truly the saint of the holy childhood of Jesus — the living created providence which watched over the Christ-Child.

When Herod sought the Child to put Him to death, the Heavenly Father sent an angel but only as a messenger, giving orders for the flight; the rest He left entirely in your hands. It was that fatherly love which was the only refuge that received and protected the Divine Child. Your fatherly love carried Him through the desert into Egypt until all enemies were removed. Then on your arms the Child returned to Nazareth to be nourished and provided for during many years by the labor of your hands. Whatever a human son owes to a human father for all the benefits of his up-bringing and support, Jesus owed to you, because you were to Him a foster-father, teacher, and protector.

You served the Divine Child with a singular love. God gave you a heart filled with heavenly, supernatural love — a love far deeper and more powerful than any natural father’s love could be.

You served the Divine Child with great unselfishness, without any regard to self-interest, but not without sacrifices. You did not toil for yourself, but you seemed to be an instrument intended for the benefit of others, to be put aside as soon as it had done its word, for you disappeared from the scene once the childhood of Jesus had passed.

You were the shadow of the Heavenly Father not only as the earthly representative of the authority of the Father, but also by means of your fatherhood — which only appeared to be natural — you were to hide for a while the divinity of Jesus. What a wonderfully sublime and divine vocation was yours — the loving Child which you carried in your arms, and loved and served so faithfully, had God in Heaven as Father and was Himself God!

Yours is a very special rank among the saints of the Kingdom of God, because you were so much a part of the very life of the Word of God made Man. In your house at Nazareth and under your care the redemption of mankind was prepared. What you accomplished, you did for us. You are not only a powerful and great saint in the Kingdom of God, but a benefactor of the whole of Christendom and mankind. Your rank in the Kingdom of God, surpassing far in dignity and honor of all the angels, deserves our very special veneration, love, and gratitude.

Saint Joseph, I thank God for your privilege of having been chosen by God to be the foster-father of His Divine Son. As a token of your own gratitude to God for this your greatest privilege, obtain for me the grace of a very devoted love for Jesus Christ, my God and my Savior. Help me to serve Him with some of the self-sacrificing love and devotion which you had while on this earth with Him. Grant that through your intercession with Jesus, your foster-Son, I may reach the degree of holiness God has destined for me, and save my soul.

Saint Joseph, I, your unworthy child, greet you. You are the faithful protector and intercessor of all who love and venerate you. You know that I have special confidence in you and that, after Jesus and Mary, I place all my hope of salvation in you, for you are especially powerful with God and will never abandon your faithful servants. Therefore I humbly invoke you and commend myself, with all who are dear to me and all that belong to me, to your intercession. I beg of you, by your love for Jesus and Mary, not to abandon me during life and to assist me at the hour of my death.

Glorious Saint Joseph, spouse of the Immaculate Virgin, obtain for me a pure, humble, charitable mind, and perfect resignation to the divine Will. Be my guide, my father, and my model through life that I may merit to die as you did in the arms of Jesus and Mary.

Loving Saint Joseph, faithful follower of Jesus Christ, I raise my heart to you to implore your powerful intercession in obtaining from the Divine Heart of Jesus all the graces necessary for my spiritual and temporal welfare, particularly the grace of a happy death, and the special grace I now implore:

(Mention your request).

Guardian of the Word Incarnate, I feel confident that your prayers in my behalf will be graciously heard before the throne of God. Amen.

MEMORARE Remember, most pure spouse of Mary, ever Virgin, my loving protector, Saint Joseph, that no one ever had recourse to your protection or asked for your aid without obtaining relief. Confiding, therefore, in your goodness, I come before you and humbly implore you. Despise not my petitions, foster-father of the Redeemer, but graciously receive them. Amen.

Saint Joseph, I honor you as the true husband of Mary. Scripture says: ‘Jacob begot Joseph, the husband of Mary, and of her was born Jesus who is called Christ’ (Matt. 1:16). Your marriage to Mary was a sacred contract by which you and Mary gave yourselves to each other. Mary really belonged to you with all she was and had. You had a right to her love and obedience; and no other person so won her esteem, obedience, and love.

You were also the protector and witness of Mary’s virginity. By your marriage you gave to each other your virginity, and also the mutual right over it — a right to safeguard the other’s virtue. This mutual virginity also belonged to the divine plan of the Incarnation, for God sent His angel to assure you that motherhood and virginity in Mary could be united.

This union of marriage not only brought you into daily familiar association with Mary, the loveliest of God’s creatures, but also enabled you to share with her a mutual exchange of spiritual goods. And Mary found her edification in your calm, humble, and deep virtue, purity, and sanctity. What a great honor comes to you from this close union with her whom the Son of God calls Mother and whom He declared the Queen of heaven and earth! Whatever Mary had belonged by right to you also, and this included her Son, even though He had been given to her by God in a wonderful way. Jesus belonged to you as His legal father. Your marriage was the way which God chose to have Jesus introduced into the world, a great divine mystery from which all benefits have come to us.

God the Son confided the guardianship and the support of His Immaculate Mother to your care. Mary’s life was that of the Mother of the Savior, who did not come upon earth to enjoy honors and pleasures, but to redeem the world by hard work, suffering, and the cross. You were the faithful companion, support, and comforter of the Mother of Sorrows. How loyal you were to her in poverty, journeying, work, and pain. Your love for Mary was based upon your esteem for her as Mother of God. After God and the Divine Child, you loved no one as much as her. Mary responded to this love. She submitted to your guidance with naturalness and easy grace and childlike confidence. The Holy Spirit Himself was the bond of the great love which united your hearts.

Saint Joseph, I thank God for your privilege of being the virginal husband of Mary. As a token of your own gratitude to God, obtain for me the grace to love Jesus with all my heart, as you did, and love Mary with some of the tenderness and loyalty with which you loved her.

Saint Joseph, I, your unworthy child, greet you. You are the faithful protector and intercessor of all who love and venerate you. You know that I have special confidence in you and that, after Jesus and Mary, I place all my hope of salvation in you, for you are especially powerful with God and will never abandon your faithful servants. Therefore I humbly invoke you and commend myself, with all who are dear to me and all that belong to me, to your intercession. I beg of you, by your love for Jesus and Mary, not to abandon me during life and to assist me at the hour of my death.

Glorious Saint Joseph, spouse of the Immaculate Virgin, obtain for me a pure, humble, charitable mind, and perfect resignation to the divine Will. Be my guide, my father, and my model through life that I may merit to die as you did in the arms of Jesus and Mary.

Loving Saint Joseph, faithful follower of Jesus Christ, I raise my heart to you to implore your powerful intercession in obtaining from the Divine Heart of Jesus all the graces necessary for my spiritual and temporal welfare, particularly the grace of a happy death, and the special grace I now implore:

(Mention your request).

Guardian of the Word Incarnate, I feel confident that your prayers in my behalf will be graciously heard before the throne of God. Amen.

MEMORARE Remember, most pure spouse of Mary, ever Virgin, my loving protector, Saint Joseph, that no one ever had recourse to your protection or asked for your aid without obtaining relief. Confiding, therefore, in your goodness, I come before you and humbly implore you. Despise not my petitions, foster-father of the Redeemer, but graciously receive them. Amen.

Saint Joseph, you were the man chosen by God the Father. He selected you to be His representative on earth, hence He granted you all the graces and blessings you needed to be His worthy representative.

You were the man chosen by God the Son. Desirous of a worthy foster-father, He added His own riches and gifts, and above all, His love. The true measure of your sanctity is to be judged by your imitation of Jesus. You were entirely consecrated to Jesus, working always near Him, offering Him your virtues, your work, your sufferings, your very life. Jesus lived in you perfectly so that you were transformed into Him. In this lies your special glory, and the keynote of your sanctity. Hence, after Mary, you are the holiest of the saints.

You were chosen by the Holy Spirit. He is the mutual Love of the Father and the Son — the heart of the Holy Trinity. In His wisdom He draws forth all creatures from nothing, guides them to their end in showing them their destiny and giving them the means to reach it. Every vocation and every fulfillment of a vocation proceeds from the Holy Spirit. As a foster-father of Jesus and head of the Holy Family, you had an exalted and most responsible vocation — to open the way for the redemption of the world and to prepare for it by the education and guidance of the youth of the God-Man. In this work you cooperated as the instrument of the Holy Spirit. The Holy Spirit was the guide; you obeyed and carried out the works. How perfectly you obeyed the guidance of the God of Love!

The words of the Old Testament which Pharaoh spoke concerning Joseph of Egypt can well be applied to you: ‘Can we find such another man, that is full of the spirit of God, or a wise man like to him?’ (Gen. 41:38). No less is your share in the divine work of God than was that of Egypt. You now reign with your foster-Son and see reflected in the mirror of God’s Wisdom the Divine Will and what is of benefit to our souls.

Saint Joseph, I thank God for having made you the man specially chosen by Him. As a token of your own gratitude to God, obtain for me the grace to imitate your virtues so that I too may be pleasing to the Heart of God. Help me to give myself entirely to His service and to the accomplishment of His Holy Will, that one day I may reach heaven and be eternally united to God as you are.

Saint Joseph, I, your unworthy child, greet you. You are the faithful protector and intercessor of all who love and venerate you. You know that I have special confidence in you and that, after Jesus and Mary, I place all my hope of salvation in you, for you are especially powerful with God and will never abandon your faithful servants. Therefore I humbly invoke you and commend myself, with all who are dear to me and all that belong to me, to your intercession. I beg of you, by your love for Jesus and Mary, not to abandon me during life and to assist me at the hour of my death.

Glorious Saint Joseph, spouse of the Immaculate Virgin, obtain for me a pure, humble, charitable mind, and perfect resignation to the divine Will. Be my guide, my father, and my model through life that I may merit to die as you did in the arms of Jesus and Mary.

Loving Saint Joseph, faithful follower of Jesus Christ, I raise my heart to you to implore your powerful intercession in obtaining from the Divine Heart of Jesus all the graces necessary for my spiritual and temporal welfare, particularly the grace of a happy death, and the special grace I now implore:

(Mention your request).

Guardian of the Word Incarnate, I feel confident that your prayers in my behalf will be graciously heard before the throne of God. Amen.

MEMORARE Remember, most pure spouse of Mary, ever Virgin, my loving protector, Saint Joseph, that no one ever had recourse to your protection or asked for your aid without obtaining relief. Confiding, therefore, in your goodness, I come before you and humbly implore you. Despise not my petitions, foster-father of the Redeemer, but graciously receive them. Amen.

Saint Joseph, you lived for one purpose — to be the personal servant of Jesus Christ, the Word made flesh. Your noble birth and ancestry, the graces and gifts, so generously poured out on you by God — all this was yours to serve our Lord better. Every thought, word, and action of yours was a homage to the love and glory of the Incarnate Word. You fulfilled most faithfully the role of a good and faithful servant who cared for the House of God.

How perfect was your obedience! Your position in the Holy Family obliged you to command, but besides being the foster-father of Jesus, you were also His disciple. For almost thirty years, you watched the God-Man display a simple and prompt obedience, and you grew to love and practice it very perfectly yourself. Without exception you submitted to God, to the civil rulers, and to the voice of your conscience.

When God sent an angel to tell you to care for Mary, you obeyed in spite of the mystery which surrounded her motherhood. When you were told to flee into Egypt under painful conditions, you obeyed without the slightest word of complaint. When God advised you in a dream to return to Nazareth, you obeyed. In every situation your obedience was as simple as your faith, as humble as your heart, as prompt as your love. It neglected nothing; it took in every command.

You had the virtue of perfect devotedness, which marks a good servant. Every moment of your life was consecrated to the service of our Lord: sleep, rest, work, pain. Faithful to your duties, you sacrificed everything unselfishly, even cheerfully. You would have sacrificed even the happiness of being with Mary. The rest and quiet of Nazareth was sacrificed at the call of duty. Your entire life was one generous giving, even to the point of being ready to die in proof of your love for Jesus and Mary. With true unselfish devotedness you worked without praise or reward.

But God wanted you to be in a certain sense a cooperator in the Redemption of the world. He confided to you the care of nourishing and defending the Divine Child. He wanted you to be poor and to suffer because He destined you to be the foster-father of His Son, who came into the world to save men by His sufferings and death, and you were to share in His suffering. In all of these important tasks, the Heavenly Father always found you a faithful servant!

Saint Joseph, I thank God for your privilege of being God’s faithful servant. As a token of your own gratitude to God, obtain for me the grace to be a faithful servant of God as you were. Help me to share, as you did, the perfect obedience of Jesus, who came not to do His Will, but the Will of His Father; to trust in the Providence of God, knowing that if I do His Will, He will provide for all my needs of soul and body; to be calm in my trials and to leave it to our Lord to free me from them when it pleases Him to do so. And help me to imitate your generosity, for there can be no greater reward here on earth than the joy and honor of being a faithful servant of God.

Saint Joseph, I, your unworthy child, greet you. You are the faithful protector and intercessor of all who love and venerate you. You know that I have special confidence in you and that, after Jesus and Mary, I place all my hope of salvation in you, for you are especially powerful with God and will never abandon your faithful servants. Therefore I humbly invoke you and commend myself, with all who are dear to me and all that belong to me, to your intercession. I beg of you, by your love for Jesus and Mary, not to abandon me during life and to assist me at the hour of my death.

Glorious Saint Joseph, spouse of the Immaculate Virgin, obtain for me a pure, humble, charitable mind, and perfect resignation to the divine Will. Be my guide, my father, and my model through life that I may merit to die as you did in the arms of Jesus and Mary.

Loving Saint Joseph, faithful follower of Jesus Christ, I raise my heart to you to implore your powerful intercession in obtaining from the Divine Heart of Jesus all the graces necessary for my spiritual and temporal welfare, particularly the grace of a happy death, and the special grace I now implore:

(Mention your request).

Guardian of the Word Incarnate, I feel confident that your prayers in my behalf will be graciously heard before the throne of God. Amen.

MEMORARE Remember, most pure spouse of Mary, ever Virgin, my loving protector, Saint Joseph, that no one ever had recourse to your protection or asked for your aid without obtaining relief. Confiding, therefore, in your goodness, I come before you and humbly implore you. Despise not my petitions, foster-father of the Redeemer, but graciously receive them. Amen.

Saint Joseph, God has appointed you patron of the Catholic Church because you were the head of the Holy Family, the starting-point of the Church. You were the father, protector, guide and support of the Holy Family. For that reason you belong in a particular way to the Church, which was the purpose of the Holy Family’s existence.

I believe that the Church is the family of God on earth. Its government is represented in priestly authority which consists above all in its power over the true Body of Christ, really present in the Blessed Sacrament of the Altar, thus continuing Christ’s life in the Church. From this power, too, comes authority over the Mystical Body of Christ, the members of the Church — the power to teach and govern souls, to reconcile them with God, to bless them, and to pray for them.

You have a special relationship to the priesthood because you possessed a wonderful power over our Savior Himself. Your life and office were of a priestly function and are especially connected with the Blessed Sacrament. To some extent you were the means of bringing the Redeemer to us — as it is the priest’s function to bring Him to us in the Mass — for you reared Jesus, supported, nourished, protected and sheltered Him. You were prefigured by the patriarch Joseph, who kept supplies of wheat for his people. But how much greater than he were you! Joseph of old gave the Egyptians mere bread for their bodies. You nourished, and with the most tender care, preserved for the Church Him who is the Bread of Heaven and who gives eternal life in Holy Communion.

God has appointed you patron of the Church because the glorious title of patriarch also falls by special right to you. The patriarchs were the heads of families of the Chosen People, and theirs was the honor to prepare for the Savior’s incarnation. You belonged to this line of patriarchs, for you were one of the last descendants of the family of David and one of the nearest forebears of Christ according to the flesh. As husband of Mary, the Mother of God, and as the foster-father of the Savior, you were directly connected with Christ. Your vocation was especially concerned with the Person of Jesus; your entire activity centered about Him. You are, therefore, the closing of the Old Testament and the beginning of the New, which took its rise with the Holy Family of Nazareth. Because the New Testament surpasses the Old in every respect, you are the patriarch of patriarchs, the most venerable, exalted, and amiable of all the patriarchs.

Through Mary, the Church received Christ, and therefore the Church is indebted to her. But the Church owes her debt of gratitude and veneration to you also, for you were the chosen one who enabled Christ to enter into the world according to the laws of order and fitness. It was by you that the patriarchs and the prophets and the faithful reaped the fruit of God’s promise. Alone among them all, you saw with your own eyes and possessed the Redeemer promised to the rest of men.

Saint Joseph, I thank God for your privilege of being the Patron of the Church. As a token of your own gratitude to God, obtain for me the grace to live always as a worthy member of this Church, so that through it I may save my soul. Bless the priests, the religious, and the laity of the Catholic Church, that they may ever grow in God’s love and faithfulness in His service. Protect the Church from the evils of our day and from the persecution of her enemies. Through your powerful intercession may the church successfully accomplish its mission in this world — the glory of God and the salvation of souls!

Saint Joseph, I, your unworthy child, greet you. You are the faithful protector and intercessor of all who love and venerate you. You know that I have special confidence in you and that, after Jesus and Mary, I place all my hope of salvation in you, for you are especially powerful with God and will never abandon your faithful servants. Therefore I humbly invoke you and commend myself, with all who are dear to me and all that belong to me, to your intercession. I beg of you, by your love for Jesus and Mary, not to abandon me during life and to assist me at the hour of my death.

Glorious Saint Joseph, spouse of the Immaculate Virgin, obtain for me a pure, humble, charitable mind, and perfect resignation to the divine Will. Be my guide, my father, and my model through life that I may merit to die as you did in the arms of Jesus and Mary.

Loving Saint Joseph, faithful follower of Jesus Christ, I raise my heart to you to implore your powerful intercession in obtaining from the Divine Heart of Jesus all the graces necessary for my spiritual and temporal welfare, particularly the grace of a happy death, and the special grace I now implore:

(Mention your request).

Guardian of the Word Incarnate, I feel confident that your prayers in my behalf will be graciously heard before the throne of God. Amen.

MEMORARE Remember, most pure spouse of Mary, ever Virgin, my loving protector, Saint Joseph, that no one ever had recourse to your protection or asked for your aid without obtaining relief. Confiding, therefore, in your goodness, I come before you and humbly implore you. Despise not my petitions, foster-father of the Redeemer, but graciously receive them. Amen.

Saint Joseph, I venerate you as the gentle head of the Holy Family. The Holy Family was the scene of your life’s work in its origin, in its guidance, in its protection, in your labor for Jesus and Mary, and even in your death in their arms. You lived, moved, and acted in the loving company of Jesus and Mary. The inspired writer describes your life at Nazareth in only a few words: ‘And (Jesus) went down with them and came to Nazareth, and was subject to them’ (Luke, 2:51). Yet these words tell of your high vocation here on earth, and the abundance of graces which filled your soul during those years spent in Nazareth.

Your family life at Nazareth was all radiant with the light of divine charity. There was an intimate union of heart and mind among the members of your Holy Family. There could not have been a closer bond than that uniting you to Jesus, your foster-Son and to Mary, your most loving wife. Jesus chose to fulfill toward you, His foster-father, all the duties of a faithful son, showing you every mark of honor and affection due to a parent. And Mary showed you all the signs of respect and love of a devoted wife. You responded to this love and veneration from Jesus and Mary with feelings of deepest love and respect. You had for Jesus a true fatherly love, enkindled and kept aglow in your heart by the Holy Spirit. And you could not cease to admire the workings of grace in Mary’s soul, and this admiration caused the holy love which you had consecrated to her on the day of your wedding grow stronger every day.

God has made you a heavenly patron of family life because you sanctified yourself as head of the Holy Family and thus by your beautiful example sanctified family life. How peacefully and happily the Holy Family rested under the care of your fatherly rule, even in the midst of trials. You were the protector, counselor, and consolation of the Holy Family in every need. And just as you were the model of piety, so you gave us by your zeal, your earnestness and devout trust in God’s providence, and especially by your love, the example of labor according to the Will of God. You cherished all the experiences common to family life and the sacred memories of the life, sufferings, and joys in the company of Jesus and Mary. Therefore the family is dear to you as the work of God, and it is of the highest importance in your eyes to promote the honor of God and the well-being of man. In your loving fatherliness and unfailing intercession you are the patron and intercessor of families, and you deserve a place in every home.

Saint Joseph, I thank God for your privilege of living in the Holy Family and being its head. As a token of your own gratitude to God, obtain God’s blessing upon my own family. Make our home the kingdom of Jesus and Mary — a kingdom of peace, of joy, and love.

I also pray for all Christian families. Your help is needed in our day when God’s enemy has directed his attack against the family in order to desecrate and destroy it. In the face of these evils, as patron of families, be pleased to help; and as of old, you arose to save the Child and His Mother, so today arise to protect the sanctity of the home. Make our homes sanctuaries of prayer, of love, of patient sacrifice, and of work. May they be modeled after your own at Nazareth. Remain with us with Jesus and Mary, so that by your help we may obey the commandments of God and of the Church; receive the holy sacraments of God and of the Church; live a life of prayer; and foster religious instruction in our homes. Grant that we may be reunited in God’s Kingdom and eternally live in the company of the Holy Family in heaven.

Saint Joseph, I, your unworthy child, greet you. You are the faithful protector and intercessor of all who love and venerate you. You know that I have special confidence in you and that, after Jesus and Mary, I place all my hope of salvation in you, for you are especially powerful with God and will never abandon your faithful servants. Therefore I humbly invoke you and commend myself, with all who are dear to me and all that belong to me, to your intercession. I beg of you, by your love for Jesus and Mary, not to abandon me during life and to assist me at the hour of my death.

Glorious Saint Joseph, spouse of the Immaculate Virgin, obtain for me a pure, humble, charitable mind, and perfect resignation to the divine Will. Be my guide, my father, and my model through life that I may merit to die as you did in the arms of Jesus and Mary.

Loving Saint Joseph, faithful follower of Jesus Christ, I raise my heart to you to implore your powerful intercession in obtaining from the Divine Heart of Jesus all the graces necessary for my spiritual and temporal welfare, particularly the grace of a happy death, and the special grace I now implore:

(Mention your request).

Guardian of the Word Incarnate, I feel confident that your prayers in my behalf will be graciously heard before the throne of God. Amen.

MEMORARE Remember, most pure spouse of Mary, ever Virgin, my loving protector, Saint Joseph, that no one ever had recourse to your protection or asked for your aid without obtaining relief. Confiding, therefore, in your goodness, I come before you and humbly implore you. Despise not my petitions, foster-father of the Redeemer, but graciously receive them. Amen.

Saint Joseph, you devoted your time at Nazareth to the work of a carpenter. It was the Will of God that you and your foster-Son should spend your days together in manual labor. What a beautiful example you set for the working classes!

It was especially for the poor, who compose the greater part of mankind, that Jesus came upon earth, for in the synagogue of Nazareth, He read the words of Isaiah and referred them to Himself: ‘The Spirit of the Lord is upon me, because He has anointed Me to bring good news to the poor…’ (Luke 4:18). It was God’s Will that you should be occupied with work common to poor people, that in this way Jesus Himself might ennoble it by inheriting it from you, His foster-father, and by freely embracing it. Thus our Lord teaches us that for the humbler class of workmen, He has in store His richest graces, provided they live content in the place God’s Providence has assigned them, and remain poor in spirit for He said, ‘Blessed are the poor in spirit, for theirs is the kingdom of heaven’ (Matt. 5:3).

The kind of work to which you devoted your time in the workshop of Nazareth offered you many occasions of practicing humility. You were privileged to see each day the example of humility which Jesus practiced — a virtue most pleasing to Him. He chose for His earthly surroundings not the courts of princes nor the halls of the learned, but a little workshop of Nazareth. Here you shared for many years the humble and hidden toiling of the God-Man. What a touching example for the worker of today!

While your hands were occupied with manual work, your mind was turned to God in prayer. From the Divine Master, who worked along with you, you learned to work in the presence of God in the spirit of prayer, for as He worked He adored His Father and recommended the welfare of the world to Him, Jesus also instructed you in the wonderful truths of grace and virtue, for you were in close contact with Him who said of Himself, ‘I am the Way and the Truth and the Life.’

As you were working at your trade, you were reminded of the greatness and majesty of God, who, as a most wise Architect, formed this vast universe with wonderful skill and limitless power.

The light of divine faith that filled your mind, did not grow dim when you saw Jesus working as a carpenter. You firmly believed that the saintly Youth working beside you was truly God’s own Son.

Saint Joseph, I thank God for your privilege of being able to work side by side with Jesus in the carpenter shop of Nazareth. As a token of your own gratitude to God, obtain for me the grace to respect the dignity of labor and ever to be content with the position in life, however lowly, in which it may please Divine Providence to place me. Teach me to work for God and with God in the spirit of humility and prayer, as you did, so that I may offer my toil in union with the sacrifice of Jesus in the Mass as a reparation for my sins, and gain rich merit for heaven.

Saint Joseph, I, your unworthy child, greet you. You are the faithful protector and intercessor of all who love and venerate you. You know that I have special confidence in you and that, after Jesus and Mary, I place all my hope of salvation in you, for you are especially powerful with God and will never abandon your faithful servants. Therefore I humbly invoke you and commend myself, with all who are dear to me and all that belong to me, to your intercession. I beg of you, by your love for Jesus and Mary, not to abandon me during life and to assist me at the hour of my death.

Glorious Saint Joseph, spouse of the Immaculate Virgin, obtain for me a pure, humble, charitable mind, and perfect resignation to the divine Will. Be my guide, my father, and my model through life that I may merit to die as you did in the arms of Jesus and Mary.

Loving Saint Joseph, faithful follower of Jesus Christ, I raise my heart to you to implore your powerful intercession in obtaining from the Divine Heart of Jesus all the graces necessary for my spiritual and temporal welfare, particularly the grace of a happy death, and the special grace I now implore:

(Mention your request).

Guardian of the Word Incarnate, I feel confident that your prayers in my behalf will be graciously heard before the throne of God. Amen.

MEMORARE Remember, most pure spouse of Mary, ever Virgin, my loving protector, Saint Joseph, that no one ever had recourse to your protection or asked for your aid without obtaining relief. Confiding, therefore, in your goodness, I come before you and humbly implore you. Despise not my petitions, foster-father of the Redeemer, but graciously receive them. Amen.

Saint Joseph, your share of suffering was very great because of your close union with the Divine Savior. All the mysteries of His life were more or less mysteries of suffering. Poverty pressed upon you, and the cross of labor followed you everywhere. Nor were you spared domestic crosses, owing to misunderstandings in regard to the holiest and most cherished of all beings, Jesus and Mary, who were all to you. Keen must have been the suffering caused by the uncertainty regarding Mary’s virginity; by the bestowal of the name of Jesus, which pointed to future misfortune. Deeply painful must have been the prophecy of Simeon, the flight into Egypt, the disappearance of Jesus at the Paschal feast. To these sufferings were surely added interior sorrow at the sight of the sins of your own people.

You bore all this suffering in a truly Christ-like manner, and in this you are our example. No sound of complaint or impatience escaped you — you were, indeed, the silent saint! You submitted to all in the spirit of faith, humility, confidence, and love. You cheerfully bore all in union with and for the Savior and His Mother, knowing well that true love is a crucified love. But God never forsook you in your trials. The trials, too, disappeared and were changed at last into consolation and joy.

It seems that God had purposely intended your life to be filled with suffering as well as consolation to keep before my eyes the truth that my life on earth is but a succession of joys and sorrows, and that I must gratefully accept whatever God sends me, and during the time of consolation prepare for suffering. Teach me to bear my cross in the spirit of faith, of confidence, and of gratitude toward God. In a happy eternity, I shall thank God fervently for the sufferings which He deigned to send me during my pilgrimage on earth, and which after your example I endured with patience and heartfelt love for Jesus and Mary.

You were truly the martyr of the hidden life. This was God’s Will, for the holier a person is, the more he is tried for the love and glory of God. If suffering is the flowering of God’s grace in a soul and the triumph of the soul’s love for God, being the greatest of saints after Mary, you suffered more than any of the martyrs.

Because you have experienced the sufferings of this valley of tears, you are most kind and sympathetic toward those in need. Down through the ages souls have turned to you in distress and have always found you a faithful friend in suffering. You have graciously heard their prayers in their needs even though it demanded a miracle. Having been so intimately united with Jesus and Mary in life, your intercession with Them is most powerful.

Saint Joseph, I thank God for your privilege of being able to suffer for Jesus and Mary. As a token of your own gratitude to God, obtain for me the grace to bear my suffering patiently for love of Jesus and Mary. Grant that I may unite the sufferings, works and disappointments of life with the sacrifice of Jesus in the Mass, and share like you in Mary’s spirit of sacrifice.

Saint Joseph, I, your unworthy child, greet you. You are the faithful protector and intercessor of all who love and venerate you. You know that I have special confidence in you and that, after Jesus and Mary, I place all my hope of salvation in you, for you are especially powerful with God and will never abandon your faithful servants. Therefore I humbly invoke you and commend myself, with all who are dear to me and all that belong to me, to your intercession. I beg of you, by your love for Jesus and Mary, not to abandon me during life and to assist me at the hour of my death.

Glorious Saint Joseph, spouse of the Immaculate Virgin, obtain for me a pure, humble, charitable mind, and perfect resignation to the divine Will. Be my guide, my father, and my model through life that I may merit to die as you did in the arms of Jesus and Mary.

Loving Saint Joseph, faithful follower of Jesus Christ, I raise my heart to you to implore your powerful intercession in obtaining from the Divine Heart of Jesus all the graces necessary for my spiritual and temporal welfare, particularly the grace of a happy death, and the special grace I now implore:

(Mention your request).

Guardian of the Word Incarnate, I feel confident that your prayers in my behalf will be graciously heard before the throne of God. Amen.

MEMORARE Remember, most pure spouse of Mary, ever Virgin, my loving protector, Saint Joseph, that no one ever had recourse to your protection or asked for your aid without obtaining relief. Confiding, therefore, in your goodness, I come before you and humbly implore you. Despise not my petitions, foster-father of the Redeemer, but graciously receive them. Amen.

Saint Joseph, how fitting it was that at the hour of your death Jesus should stand at your bedside with Mary, the sweetness and hope of all mankind. You gave your entire life to the service of Jesus and Mary; at death you enjoyed the consolation of dying in Their loving arms. You accepted death in the spirit of loving submission to the Will of God, and this acceptance crowned your hidden life of virtue. Yours was a merciful judgment, for your foster-Son, for whom you had cared so lovingly, was your Judge, and Mary was your advocate. The verdict of the Judge was a word of encouragement to wait for His coming to Limbo, where He would shower you with the choicest fruits of the Redemption, and an embrace of grateful affection before you breathed forth your soul into eternity.

You looked into eternity and to your everlasting reward with confidence. If our Savior blessed the shepherds, the Magi, Simeon, John the Baptist, and others, because they greeted His presence with devoted hearts for a brief passing hour, how much more did He bless you who have sanctified yourself for so many years in His company and that of His Mother? If Jesus regards every corporal and spiritual work of mercy, performed in behalf of our fellow men out of love for Him, as done to Himself, and promises heaven as a reward, what must have been the extent of His gratitude to you who in the truest sense of the word have received Him, given Him shelter, clothed, nourished, and consoled Him at the sacrifice of your strength and rest, and even your life, with a love which surpassed the love of all fathers.

God really and personally made Himself your debtor. Our Divine Savior paid that debt of gratitude by granting you many graces in your lifetime, especially the grace of growing in love, which is the best and most perfect of all gifts. Thus at the end of your life your heart became filled with love, the fervor and longing of which your frail body could not resist. Your soul followed the triumphant impulse of your love and winged its flight from earth to bear the prophets and patriarchs in Limbo the glad tidings of the advent of the Redeemer.

Saint Joseph, I thank God for your privilege of being able to die in the arms of Jesus and Mary. As a token of your own gratitude to God, obtain for me the grace of a happy death. Help me to spend each day in preparation for death. May I, too, accept death in the spirit of resignation to God’s Holy Will, and die, as you did, in the arms of Jesus, strengthened by Holy Viaticum, and in the arms of Mary, with her rosary in my hand and her name on my lips!

Saint Joseph, I, your unworthy child, greet you. You are the faithful protector and intercessor of all who love and venerate you. You know that I have special confidence in you and that, after Jesus and Mary, I place all my hope of salvation in you, for you are especially powerful with God and will never abandon your faithful servants. Therefore I humbly invoke you and commend myself, with all who are dear to me and all that belong to me, to your intercession. I beg of you, by your love for Jesus and Mary, not to abandon me during life and to assist me at the hour of my death.

Glorious Saint Joseph, spouse of the Immaculate Virgin, obtain for me a pure, humble, charitable mind, and perfect resignation to the divine Will. Be my guide, my father, and my model through life that I may merit to die as you did in the arms of Jesus and Mary.

Loving Saint Joseph, faithful follower of Jesus Christ, I raise my heart to you to implore your powerful intercession in obtaining from the Divine Heart of Jesus all the graces necessary for my spiritual and temporal welfare, particularly the grace of a happy death, and the special grace I now implore:

(Mention your request).

Guardian of the Word Incarnate, I feel confident that your prayers in my behalf will be graciously heard before the throne of God. Amen.

MEMORARE Remember, most pure spouse of Mary, ever Virgin, my loving protector, Saint Joseph, that no one ever had recourse to your protection or asked for your aid without obtaining relief. Confiding, therefore, in your goodness, I come before you and humbly implore you. Despise not my petitions, foster-father of the Redeemer, but graciously receive them. Amen.

Source of Novena: EWTN, and Catholic News Agency

Images from: Wikipedia`
    },
    {
        id: 'novena-to-the-holy-spirit',
        title: "Novena to the Holy Spirit",
        category: 'devotion',
        text: `We ought to pray and invoke the Holy Spirit, for each of us greatly needs His protection and His help. The more a man is deficient in wisdom, weak in strength, borne down with trouble, prone to sin, so ought he the more fly to Him Who is the never ceasing Fount of Light, Strength, Consolation and Holiness.” – Pope Leo XIII

Note: The following novena was written by the Holy Ghost Fathers over 100 years ago and was reprinted several times.  It is prayed for the nine days prior to Pentecost.

The Church grants the following indulgence: “Partial indulgence to those who participate in a public novena before the feast of Christmas or Pentecost, or the Immaculate Conception.” (The Enchiridion of Indulgences, Issued by the Sacred Apostolic Penitentiary, 1968, #34)

Though this novena can be prayed any time of year, it is traditionally prayed from the Friday after Ascension Thursday (when the Ascension is not transferred to the following Sunday) until the Saturday before Pentecost.

The next traditional time for the novena to begin is May 15 – May 23, 2026.

Day One – Friday of the Sixth Week of Easter

Day Two – Saturday of the Sixth Week of Easter

Day Three – Sunday of the Seventh Week of Easter

Day Four – Monday of the Seventh Week of Easter

Day Five – Tuesday of the Seventh Week of Easter

Day Six – Wednesday of the Seventh Week of Easter

Day Seven – Thursday of the Seventh Week of Easter

Day Eight – Friday of the Seventh Week of Easter

Day Nine – Saturday of the Seventh Week of Easter

Act of Consecration to the Holy Ghost

On my knees / before the great multitude of heavenly witnesses / I offer myself, soul and body / to Thee O Eternal Spirit of God. / I adore the brightness of Thy purity / the unerring keenness of Thy justice / and the might of Thy love. Thou art the Strength / and Light of my soul. / In Thee I live and move and am. / I desire never to grieve Thee by unfaithfulness to grace, and I pray with all my heart to be kept from the smallest sin against Thee. / Mercifully guard my every thought / and grant that I may always watch for Thy light / and listen to Thy voice / and follow Thy gracious inspirations. / I cling to Thee / and give myself to Thee / and ask Thee / by Thy compassion / to watch over me in my weakness. / Holding the pierced feet of Jesus / and looking at His five Wounds / and trusting in His Precious Blood / and adoring His opened side and stricken Heart / I implore Thee / Adorable Spirit / Helper of my infirmity, / so to keep me in Thy grace / that I may never sin against Thee. / Give me grace / O Holy Ghost, / Spirit of the Father and of the Son / to say to Thee always and everywhere / “Speak, Lord / for Thy servant heareth.”

Prayer for the Seven Gifts of the Holy Ghost

O Lord Jesus Christ / Who, before ascending into heaven / did promise to send the Holy Ghost / to finish Thy work / in the souls of Thine Apostles and Disciples / deign to grant the same Holy Spirit to me / that He may perfect in my soul / the work of Thy grace and Thy love. / Grant me the Spirit of Wisdom / that I may despise the perishable things of this world / and aspire only after the things / that are eternal, / the Spirit of Understanding, to enlighten my mind with the light of Your divine truth, / the Spirit of Counsel / that I may choose / the surest way of pleasing God / and gaining heaven, / the Spirit of Fortitude / that I may bear my cross with Thee / and that I may overcome with courage all the obstacles that oppose my salvation, / the Spirit of Knowledge that I may know God and know myself / and grow perfect in the science of the Saints, / the Spirit of Piety / that I may find the service of God sweet and amiable, / the Spirit of Fear of the Lord / that I may be filled with a loving reverence towards God, and may dread in any way to displease Him. / Mark me, dear Lord, / with the sign of Thy true disciples / and animate me in all things with Thy Spirit. / Amen.

Day One Holy Spirit! Lord of light! From Thy clear celestial height, Thy pure beaming radiance give!

Our Father (prayed once) Hail Mary (prayed once) Glory be… (prayed 7 times) Act of Consecration and Prayer for the Seven Gifts (prayed once)

Day Two Come Thou, Father of the poor! Come, treasure which endure! Come Thou, Light of all that live!

Our Father (prayed once) Hail Mary (prayed once) Glory be… (prayed 7 times) Act of Consecration and Prayer for the Seven Gifts (prayed once)

Day Three Thou, of all consolers, best, Visiting the troubled breast, Dost refreshing peace bestow.

Our Father (prayed once) Hail Mary (prayed once) Glory be… (prayed 7 times) Act of Consecration and Prayer for the Seven Gifts (prayed once)

Day Four Thou in toil art comfort sweet; Pleasant coolness in the heat; Solace in the midst of woe.

Our Father (prayed once) Hail Mary (prayed once) Glory be… (prayed 7 times) Act of Consecration and Prayer for the Seven Gifts (prayed once)

Day Five Light immortal! Light Divine! Visit Thou these hearts of Thine, And our inmost being fill!

Our Father (prayed once) Hail Mary (prayed once) Glory be… (prayed 7 times) Act of Consecration and Prayer for the Seven Gifts (prayed once)

Day Six If Thou take Thy grace away, Nothing pure in man will stay, All his good is turned to ill.

Our Father (prayed once) Hail Mary (prayed once) Glory be… (prayed 7 times) Act of Consecration and Prayer for the Seven Gifts (prayed once)

Day Seven Heal our wounds ~ our strength renew; On our dryness pour Thy dew! Wash the stains of guilt away!

Our Father (prayed once) Hail Mary (prayed once) Glory be… (prayed 7 times) Act of Consecration and Prayer for the Seven Gifts (prayed once)

Day Eight Bend the stubborn heart and will; Melt the frozen, warm the chill; Guide the steps that go astray!

Our Father (prayed once) Hail Mary (prayed once) Glory be… (prayed 7 times) Act of Consecration and Prayer for the Seven Gifts (prayed once)

Day Nine Thou, on those who evermore Thee confess, and Thee adore, In Thy sevenfold gifts, descend:

Give them comfort when they die; Give them life with Thee on high; Give them joys which never end. Amen.

Our Father (prayed once) Hail Mary (prayed once) Glory be… (prayed 7 times) Act of Consecration and Prayer for the Seven Gifts (prayed once)

An Imprimatur for this novena was granted by +Patrick A. O’Boyle, Archbishop of Washington, March 12, 1948.

Images used on this page: Jean II Restout – Pentecost Master of the Baroncelli portraits – Pentecost Hours of the Holy Spirit: Pentecost Pentecost by Master of Guillaume Lambert Pentecost by Girolamo da Cremona Pentecost byJosef Ignaz Mildorfer, Hungarian National Gallery, 1750s Pentecost stained glass, Lawrence OP, Flikr Pentecost by Bartolomeo di Tommaso Pentecost: Master of the Dominican Effigies Anonymous – Pentecost Giotto di Bondone: Pentecost`
    },
    {
        id: 'novena-to-the-sacred-heart',
        title: "Novena to the Sacred Heart",
        category: 'devotion',
        text: `Recommended novena dates: June 3 – 11, 2026 The Solemnity of the Most Sacred Heart is June 12, 2026

Saint Padre Pio recited this novena every day for all those who requested his prayers.

This novena can be prayed any time of year or, as did Padre Pio, perpetually throughout the year.  However, it is traditionally prayed for nine days prior to the Solemnity of the Most Sacred Heart.

Pray all prayers below every day during the novena.

+++

Prayer One:

O my Jesus, you have said: “Truly I say to you, ask and you will receive, seek and you will find, knock and it will be opened to you.” Behold I knock, I seek and ask for the grace of… (name your request here) Our Father… Hail Mary… Glory Be to the Father… Sacred Heart of Jesus, I place all my trust in you. Amen.

Prayer Two:

O my Jesus, you have said: “Truly I say to you, if you ask anything of the Father in my name, he will give it to you.” Behold, in your name, I ask the Father for the grace of… (name your request here) Our Father… Hail Mary… Glory Be To the Father… Sacred Heart of Jesus, I place all my trust in you. Amen.

Prayer Three:

O my Jesus, you have said: “Truly I say to you, heaven and earth will pass away but my words will not pass away.” Encouraged by your infallible words I now ask for the grace of… (name your request here) Our Father… Hail Mary… Glory Be to the Father… Sacred Heart of Jesus, I place all my trust in you.

Amen.

Concluding Prayer:

O Sacred Heart of Jesus, for whom it is impossible not to have compassion on the afflicted, have pity on us miserable sinners and grant us the grace which we ask of you, through the Sorrowful and Immaculate Heart of Mary, your tender Mother and ours.

The Hail Holy Queen (The Salve Regina) Hail, holy Queen, mother of mercy, our life, our sweetness, and our hope. To you we cry, poor banished children of Eve; to you we send up our sighs, mourning and weeping in this valley of tears. Turn, then, most gracious advocate, your eyes of mercy toward us; and after this, our exile, show unto us the blessed fruit of your womb, Jesus. O clement, O loving, O sweet Virgin Mary.

Pray for us O most holy Mother of God, That we may be worthy of the promises of Christ.

St. Joseph, foster father of Jesus, pray for us.

Amen.

Optional Litany to the Sacred Heart By St. Margaret Mary Alacoque

Hail, Heart of Jesus, save me! Hail, Heart of my Creator, perfect me! Hail, Heart of my Savior, deliver me! Hail, Heart of my Judge, grant me pardon! Hail, Heart of my Father, govern me! Hail, Heart of my Spouse, grant me love! Hail, Heart of my Master, teach me! Hail, Heart of my King, be my crown! Hail, Heart of my Benefactor, enrich me! Hail, Heart of my Shepherd, guard me! Hail, Heart of my Friend, comfort me! Hail, Heart of my Brother, stay with me! Hail, Heart of the Child Jesus, draw me to yourself! Hail, Heart of Jesus dying on the Cross, redeem me! Hail, Heart of Jesus in all your states, give yourself to me! Hail, Heart of incomparable goodness, have mercy on me! Hail, Heart of splendor, shine within me! Hail, most loving Heart, inflame me! Hail, most merciful Heart, work within me! Hail, most humble Heart, dwell within me! Hail, most patient Heart, support me! Hail, most faithful Heart, be my reward! Hail, most admirable and most worthy Heart, bless me!

Lord Jesus, let my heart never rest until it finds You, who are its center, its love, and its happiness. By the wound in Your heart, pardon the sins that I have committed whether out of malice or out of evil desires.

Place my weak heart in Your own divine Heart, continually under Your protection and guidance,

so that I may persevere in doing good and in fleeing evil until my last breath.

Amen.`
    },
    {
        id: 'consecration-to-the-blessed-virgin-mary',
        title: "Consecration to the Blessed Virgin Mary",
        category: 'marian',
        text: `O Mary, Virgin most powerful and Mother of mercy, Queen of Heaven and Refuge of sinners, we consecrate ourselves to thine Immaculate Heart.

We consecrate to thee our very being and our whole life; all that we have, all that we love, all that we are. To thee we give our bodies, our hearts and our souls; to thee we give our homes, our families, our country.

We desire that all that is in us and around us may belong to thee, and may share in the benefits of thy motherly benediction. And that this act of consecration may be truly efficacious and lasting, we renew this day at thy feet the promises of our Baptism and our first Holy Communion.

We pledge ourselves to profess courageously and at all times the truths of our holy Faith, and to live as befits Catholics who are duly submissive to all the directions of the Pope and the Bishops in communion with him.

We pledge ourselves to keep the commandments of God and His Church, in particular to keep holy the Lord’s Day.

We likewise pledge ourselves to make the consoling practices of the Christian religion, and above all, Holy Communion, an integral part of our lives, in so far as we shall be able so to do.

Finally, we promise thee, O glorious Mother of God and loving Mother of men, to devote ourselves wholeheartedly to the service of thy blessed cult, in order to hasten and assure, through the sovereignty of thine Immaculate Heart, the coming of the kingdom of the Sacred Heart of thine adorable Son, in our own hearts and in those of all men, in our country and in all the world, as in heaven. so on earth.

Amen.`
    },
    {
        id: 'prayer-of-abandonment',
        title: "Prayer of Abandonment",
        category: 'devotion',
        text: `Gemäldegalerie Berlin, Public domain, via Wikimedia Commons

Father,

I abandon myself into your hands;

do with me what you will.

Whatever you may do, I thank you:

I am ready for all, I accept all.

Let only your will be done in me,

and in all your creatures –

I wish no more than this, O Lord.

Into your hands I commend my soul:

I offer it to you with all the love of my heart,

for I love you, Lord, and so need to give myself,

to surrender myself into your hands without reserve,

and with boundless confidence,

for you are my Father.

Amen.

Saint Charles de Foucauld`
    },
    {
        id: 'prayer-of-surrender',
        title: "Prayer of Surrender",
        category: 'devotion',
        text: `Take, Lord, and receive all my liberty,  My memory, my understanding  And my entire will,  All I have and call my own.

You have given all to me.  To you, Lord, I return it.

Everything is yours; do with it what you will.  Give me only your love and your grace.  That is enough for me.

Amen.

Prayer of St. Ignatius of Loyola`
    },
    {
        id: 'a-students-prayer',
        title: "A Student’s Prayer",
        category: 'daily',
        text: `Come, Holy Spirit, Divine Creator,

true source of light and fountain of wisdom!

Pour forth your brilliance upon my dense intellect,

dissipate the darkness which covers me,

that of sin and of ignorance.

Grant me a penetrating mind to understand,

a retentive memory,

method and ease in learning,

the lucidity to comprehend,

and abundant grace in expressing myself.

Guide the beginning of my work,

direct its progress,

and bring it to successful completion.

This I ask through Jesus Christ,

true God and true man,

living and reigning with You

and the Father, forever and ever.

Amen.

By St. Thomas Aquinas`
    },
    {
        id: 'adoro-te-devote',
        title: "Adoro te Devote",
        category: 'devotion',
        text: `O Godhead hid, devoutly I adore Thee, Who truly art within the forms before me; To Thee my heart I bow with bended knee, As failing quite in contemplating Thee.

Jesu, eternal Shepherd! hear our cry; Increase the faith of all whose souls on Thee rely.

Sight, touch, and taste in Thee are each deceived; The ear alone most safely is believed: I believe all the Son of God has spoken, Than truth’s own word there is no truer token.

God only on the cross lay hid from view; But here lies hid at once the manhood too; And I, in both professing my belief, Make the same prayer as the repentant thief.

Thy wounds, as Thomas saw, I do not see; Yet Thee confess my Lord and God to be; Make me believe Thee evermore and more; In Thee my hope, in Thee my love to store.

O Thou memorial of our Lord’s own dying! O living bread, to mortals life supplying! Make Thou my soul henceforth on Thee to live, Ever a taste of heavenly sweetness give.

O loving Pelican! O Jesus Lord! Unclean I am, but cleanse me in Thy Blood! Of which a single drop, for sinners split, Can purge the entire world from all its guilt.

Jesus, whom, for the present, veil’d I see, What I so thirst for, oh! vouchsafe to me; That I may see Thy countenance unfolding, And may be blest Thy glory in beholding.

Amen.

By St. Thomas Aquinas`
    },
    {
        id: 'chaplet-of-saint-michael-archangel',
        title: "Chaplet of Saint Michael Archangel",
        category: 'chaplet',
        text: `One day, Saint Michael the Archangel appeared to Antonia d'Astonac, a most
devout Servant of God and told her that he wished to be honoured by nine
salutations corresponding to the nine Choirs of Angels, which should
consist of one Our Father and three Hail Marys in honour of each of the
Angelic Choirs.

Promises of St. Michael

"Whoever would practice this devotion in his honour would have, when
approaching the Holy Table, an escort of nine angels chosen from each of
the nine Choirs. In addition, for the daily recital of these nine
salutations, he promised his continual assistance and that all the holy
angels during life, and after death deliverance from Purgatory for
themselves and all their relations."

How to pray the Chaplet of Michael Archangel

The Chaplet is begun by saying the following invocation on the medal:

"O God, come to my assistance!

O Lord, make haste to help me!

Glory Be...

Say 1 Our Father...

and 3 Hail Mary...

after each of the following nine salutations in honour of the nine Choir of Angels.

1.

"By the intercession of St. Michael

and the Celestial choir of Seraphim,

may the Lord make us worthy

to burn with the fire of perfect charity.

Amen."

1 Our Father...

and 3 Hail Mary...

in honour of the 1 st Choir of Angels.

2.

"By the intercession of St. Michael

and the Celestial choir of Cherubim,

may the Lord vouchsafe to grant us grace

to leave the ways of wickedness

and run in the paths of Christian perfection.

Amen."

1 Our Father...

and 3 Hail Mary...

in honour of the 2 nd Choir of Angels.

3.

"By the intercession of St. Michael

and the Celestial choir of Thrones,

may the Lord infuse into our hearts

a true and sincere spirit of humility.

Amen."

1 Our Father...

and 3 Hail Mary...

in honour of the 3 rd Choir of Angels.

4.

"By the intercession of St. Michael

and the Celestial choir of Dominions,

may the Lord give us grace

to govern our senses

and subdue our unruly passions.

Amen."

1 Our Father...

and 3 Hail Mary...

in honour of the 4 th Choir of Angels.

5.

"By the intercession of St. Michael

and the Celestial choir of Virtues,

may the Lord preserve us from evil,

an suffer us not to fall into temptation.

Amen."

1 Our Father...

and 3 Hail Mary...

in honour of the 5 th Choir of Angels.

6.

"By the intercession of St. Michael

and the Celestial choir of Powers,

may the Lord vouchsafe to protect our souls

against the snares and temptations of the devil.

Amen."

1 Our Father...

and 3 Hail Mary...

in honour of the 6 th Choir of Angels.

7.

"By the intercession of St. Michael

and the Celestial choir of Principalities,

may God fill our souls

with a true spirit of obedience.

Amen."

1 Our Father...

and 3 Hail Mary...

in honour of the 7 th Choir of Angels.

8.

"By the intercession of St. Michael

and the Celestial choir of Archangels,

may the Lord give us perseverance in faith

and in good works,

in order that we gain the glory of Paradise.

Amen."

1 Our Father...

and 3 Hail Mary...

in honour of the 8 th Choir of Angels.

9.

"By the intercession of St. Michael

and the Celestial choir of Angels,

may the Lord grant us to be protected by them

in this mortal life

and conducted hereafter to eternal glory.

Amen."

1 Our Father...

and 3 Hail Mary...

in honour of the 9 th Choir of Angels.

At the end, say 1 Our Father...
on each of the 4 beads in honour of each of the following leading Angels:
St. Michael, St. Gabriel, St. Raphael, our Guardian Angel.

The Chaplet is concluded with the following prayers:

"O glorious Prince St. Michael,

chief and commander of the heavenly hosts,

guardian of souls,

vanquisher of rebel spirits,

servant in the house of the Divine King,

and our admirable conductor,

thou who dost shine with excellence and superhuman virtue,

vouchsafe to deliver us from all evil,

who turn to thee with confidence,

and enable us by thy gracious protection

to serve God more and more faithfully every day.

Amen."

V. Pray for us, O Glorious St. Michael, Prince of the Church of Jesus Christ.

R. That we may be made worthy of His Promises.

Prayer

"Almighty and everlasting God,

who by a prodigy of Goodness

and a merciful desire

for the salvation of all men,

has appointed the most glorious Archangel St. Michael,

Prince of Thy Church,

make us worthy,

we beseech Thee,

to be delivered by his powerful protection

from all our enemies,

that none of them may harass us

at the hour of our death,

but that we may be conducted by him

into the august presence of Thy Divine Majesty.

This we beg through the merits of Jesus Christ our Lord.

Amen."`
    },
    {
        id: 'chaplet-of-saint-joseph',
        title: "Chaplet of Saint Joseph",
        category: 'chaplet',
        text: `How to pray the Chaplet of Saint Joseph

The Chaplet of Saint Joseph is prayed for family protection. In today's
society, Satan is making every attempt, first of all and foremost, to
destroy the family. As is well known, many marriages end up in divorce.
But all that can change by the intercession of the adoptive father of
Jesus through our praying of the Chaplet of Saint Joseph.

On the large beads, say the following prayer:

"St. Joseph guardian of the Holy Family, bless our families."

On the small beads, say the following prayer:

"St. Joseph pray for us."

Concluding prayer:

Jesus, Mary and Joseph I give You my heart and my soul.

Jesus, Mary and Joseph assist me now and in my last agony.

Jesus, Mary and Joseph may I breathe forth my soul in peace with You.

Amen.`
    },
    {
        id: 'chaplet-of-the-holy-face',
        title: "Chaplet of the Holy Face",
        category: 'chaplet',
        text: `The purpose of the Chaplet of the Holy Face is to honour the Five Wounds of
Our Lord Jesus Christ, and to ask of God the Triumph of His Holy Church and
the downfall of her enemies.

This Chaplet was composed by Sister Saint Pierre, a Carmelite of Tours.

Saint Ethanasius stated that the devils, when being asked what verse in the Holy
Scripture they feared the most, they replied, "That with which the sixty-seventh
Psalm commences." This passage states, "Let God arise, and let His enemies be
scattered. Let them that hate Him flee from before His Face." They added that
this biblical passage always compelled them to take flight.

How to pray the Chaplet of the Five Wounds

The Chaplet of the Holy Face is composed of a medal and 39 beads, 6 of them being
large ones, 33 being small ones, with a medal of the Holy Face.

The chaplet of the Holy Face honours the 5 senses of Our Lord, Jesus Christ,
and entreats God for the triumph of His Church. It is recommended that the
faithful pray the Chaplet of the Holy Face to obtain from God, by means of the
Holy Face of the Lord Jesus, the downfall of His enemies.

The 33 small beads represent the 33 years of the mortal life of Our Divine Lord
Jesus on earth. The first 30 beads call to mind the 30 years of His hidden life.
These are divided into 5 groups, with the intention of honouring the 5 senses of
touch, hearing, sight, smell, and the taste of Jesus. These senses have their
seat, principally, in the Holy Face and render reparative homage for all the
sufferings which Our Lord Jesus endured in His Face, through each of these
senses.

The last 3 small beads remind us of the 3 years of public life of Our Saviour,
and have as their object, to honour all the wounds of His Adorable Face.

Begin as follows:

Make the sign of the Cross, with the Cross, and say:

"O God, incline unto my aid.

O Lord, make haste to help me."

Then say 1 Glory Be....

Before each group of beads, there is a large bead. On this bead, reflect on
the sense of Jesus, or the wounds of His Face, and say 1
Glory Be... and the following
prayer invocation:

"My Jesus, mercy."

On every small bead, say:

"Arise, O Lord, and let Thy enemies be scattered,
and let them that hate Thee flee before Thy Face!"

At the end, say:

The Glory Be... 7 times, in honour of
the last 7 Words that Jesus spoke on the Cross, and the 7 dolors of the
Immaculate Virgin.

Upon completing the Chaplet, say on the medal:

"O God, our Protector,

look down upon us

and cast Thine eyes

upon the Face of Thy Christ!"`
    },
    {
        id: 'chaplet-of-the-holy-ghost',
        title: "Chaplet of the Holy Ghost",
        category: 'chaplet',
        text: `This Chaplet was composed in 1892 by a Franciscan Capuchin missionary
of the English Province in order to give the faithful an easy means
of honouring the Holy Ghost. It was approved by Pope Leo XIII in 1902.

How to pray the Chaplet of the Holy Ghost

The Chaplet of the Holy Ghost has 50 beads. It begins with three small
beads, followed by 5 sets of 7 beads, each separated by 2 large beads.

On the three large beads, the faithful

make the "Sign of the Cross,"

says an "Act of Contrition..." and

recites the hymn "Come, Holy Ghost...."

On each set of 7 small beads is prayed 7 "Glory be to the Father...."

Then, on the 2 large beads is said 1 "Our Father"

and 1 "Hail Mary."

During the praying of each set of 7 beads, the faithful is asked
to meditate on one of the 5 mysteries (below), therefore
commemorating the Five Wounds of Jesus which are the fountains of
grace which the Holy Ghost imparts to all men.

THE FIRST MYSTERY

By the Holy Ghost is Jesus conceived of the Blessed Virgin Mary.

The Meditation: "The Holy Ghost shall come upon thee, and the Power
of the Most High shall overshadow thee; and therefore also the Holy
which shall be born of thee shall be called the Son of God."
[Lk. 1:35]

The Practice: Diligently implore the aid of the Divine Spirit, and
Mary's intercession, to imitate the virtues of Jesus Christ, Who is
the Model of virtues, so that you may be made comformable to the image
of the Son of God.

THE SECOND MYSTERY

The Spirit of the Lord rested upon Jesus when he was baptized.

The Meditation: "Jesus, being baptized, forthwith came out of the
water: and lo! the heavens were opened to Him, and he saw the Spirit
of God descending as a dove, and coming upon Him." [Mt. 3:16]

The Practice: Hold in the highest esteem the priceless gift of
sanctifying grace, infused into your soul by the Holy Ghost in
Baptism. Keep the promises to which you then pledged yourself.
Increase, by constant practice, Faith, Hope, and Charity. Ever live
as becometh children of God and members of God's true Church, so as to
obtain, hereafter, the inheritance of heaven.

THE THIRD MYSTERY

By the Spirit is Jesus led into the desert to be tempted by the Devil.

The Meditation: "Jesus, being full of the Holy ghost, returned from
the Jordan, and was led by the Spirit into the desert for the space of
forty days; and was tempted by the devil." [Lk. 4:1-2]

The Practice: Be ever grateful for the sevenfold gift of the Holy
Ghost bestowed upon you in Confirmation, for the spirit of wisdom and
understanding, of counsel and fortitude, of knowledge and piety, and
of the fear of the Lord. Faithfully yield to His Divine guidance, so
that, in all the trials and temptations of life, you may act manfully,
as becometh a perfect Christian and valiant soldier of Jesus Christ.

THE FOURTH MYSTERY

The Holy Ghost in the Church.

The Meditation: "Suddenly there came a sound from heaven as of a
mighty wind coming, and it filled the whole house where they were
sitting... and they were all filled with the Holy Ghost, and began to
speak... the wonderful works of God." [Acts, 2:2, 4, 11.]

The Practice: Thank God for having made you a child of His Church
which is ever animated and directed by the Divine Spirit, sent into
this world for that purpose of the day of Pentecost. Hear and obey
the Holy See, the infallible mouthpiece of the Holy Ghost, and the
Church, the pillar and ground of truth. Uphold her doctrines, seek
her interests, defend her rights.

THE FIFTH MYSTERY

The Holy Ghost in the soul of the just man and just woman.

The Meditation: "Know you not that you members are the temple of the
Holy Ghost, Who is in you?" [1 Cor. 6:19] "Extinguish not the Spirit."
[1 Thess. 5:19] "And grieve not the Holy Spirit of God whereby you
are sealed unto the day of redemption." [Eph. 4:30]

The Practice: Be ever mindful of the Holy Ghost Who is within you,
and carefully cultivate purity of soul and body. Faithfully obey His
Divine Inspirations so that you may bring forth the Fruits of the
Spirit - Charity, Joy, Peace, Patience, Dignity, Goodness,
Long-suffering, Mildness, Faith, Modesty, Continency, Chastity.

Conclude with the "I believe..." as a profession of faith.

Say finally once "Our Father...",

"Hail Mary...", and

"Glory be to the Father...,"

for the intentions of the Sovereign Pontiff.`
    },
    {
        id: 'chaplet-of-the-infant-jesus-of-prague',
        title: "Chaplet of the Infant Jesus of Prague",
        category: 'chaplet',
        text: `How to pray the Chaplet of the Infant Jesus of Prague

The chaplet to the Infant Jesus of Prague has 15 beads.

It consist of praying

3 Our Father... in honour of the Holy Family and

12 Hail Mary... in memory of the 12 years of the
Infancy of our Divine Saviour.

Starting at the medal of the Infant Jesus, say,

"Divine Infant Jesus,

I adore Thy Cross

and I accept all the cross

Thou wilt be pleased to send me.

Adorable Trinity,

I offer Thee

for the glory of Thy Holy Name of God,

all the adorations of the Sacred Heart

of the Holy Infant Jesus."

Before each Our Father

and Hail Mary,

say the following prayer:

"And the Word was made flesh and dwelt amongst us."

At the end of the Chaplet, say,

"Holy Infant Jesus, bless and protect us."`
    },
    {
        id: 'chaplet-of-the-precious-blood',
        title: "Chaplet of the Precious Blood",
        category: 'chaplet',
        text: `How to pray the Chaplet of the Precious Blood

This devotion consists of seven mysteries in which you medidate on the seven
principal sheddings of the Most Precious Blood of Jesus. The Chaplet is
divided into 7 groups, each containing 33 beads in honour of the 33 years of
the life of Jesus.

The Our Father is said five times after each mystery except the last, when it
is said three times. In all, 33 Our Fathers are said in honour of the 33 years
of the life of Our Lord Jesus on earth.

While praying this devotion, you are asked to meditate on each of the seven
bloodsheddings of Jesus.

Mystery 1

Jesus shed His Blood in the Circumcision.

Let us ask for chastity of soul and body.

Say the Our Father... 5 times.

Say the following prayer:

"Incline unto my aid, O God. O Lord, make haste to help me."

Say the Glory Be... 1 time.

Say the following prayer:

V. "We beseech You, Lord, help Your servants."

R. "Whom You have redeemed with Your Precious Blood."

Mystery 2

Jesus shed His Blood whilst praying in the Garden of Olives.

Let us ask for the spirit of prayer.

Say the Our Father... 5 times.

Say the following prayer:

"Incline unto my aid, O God. O Lord, make haste to help me."

Say the Glory Be... 1 time.

Say the following prayer:

V. "We beseech You, Lord, help Your servants."

R. "Whom You have redeemed with Your Precious Blood."

Mystery 3

Jesus shed His Blood in the scourging.

Let us ask for the grace of mortification.

Say the Our Father... 5 times.

Say the following prayer:

"Incline unto my aid, O God. O Lord, make haste to help me."

Say the Glory Be... 1 time.

Say the following prayer:

V. "We beseech You, Lord, help Your servants."

R. "Whom You have redeemed with Your Precious Blood."

Mystery 4

Jesus shed His Blood in the crowning with thorns.

Let us ask for contempt of worldly honors.

Say the Our Father... 5 times.

Say the following prayer:

"Incline unto my aid, O God. O Lord, make haste to help me."

Say the Glory Be... 1 time.

Say the following prayer:

V. "We beseech You, Lord, help Your servants."

R. "Whom You have redeemed with Your Precious Blood."

Mystery 5

Jesus shed His Blood while carrying His cross.

Let us ask for patience.

Say the Our Father... 5 times.

Say the following prayer:

"Incline unto my aid, O God. O Lord, make haste to help me."

Say the Glory Be... 1 time.

Say the following prayer:

V. "We beseech You, Lord, help Your servants."

R. "Whom You have redeemed with Your Precious Blood."

Mystery 6

Jesus shed His Blood in the crucifixion.

Let us ask for contrition for our sins.

Say the Our Father... 5 times.

Say the following prayer:

"Incline unto my aid, O God. O Lord, make haste to help me."

Say the Glory Be... 1 time.

Say the following prayer:

V. "We beseech You, Lord, help Your servants."

R. "Whom You have redeemed with Your Precious Blood."

Mystery 7

Jesus shed His Blood and water when His side was pierced.

Let us ask for the grace of perseverance.

Say the Our Father... 3 times.

Say the following prayer:

"Incline unto my aid, O God. O Lord, make haste to help me."

Say the Glory Be... 1 time.

Say the following prayer:

V. "We beseech You, Lord, help Your servants."

R. "Whom You have redeemed with Your Precious Blood."

You may conclude with this devotion with this final prayer:

Eternal Father,

I offer Thee the most Precious Blood of Jesus Christ

in satisfaction for my sins,

for the needs of Holy Church

and for the relief of the souls in purgatory.`
    },
    {
        id: 'chaplet-of-the-sacred-heart',
        title: "Chaplet of the Sacred Heart",
        category: 'chaplet',
        text: `How to pray the Chaplet of the Sacred Heart

This devotion to the Sacred Heart is prayed on the regular
Marian Rosary of 59 beads.

On the Crucifix, say the following prayer:

"Angel of God, my guardian dear,

To whom God's love commits me here,

Ever this day be at my side,

To light and guard, to rule and guide."

On the first bead (normally the "Our Father"), say:

"O Eternal Father,

I offer Thee the Blood,

Passion and death of Our Lord Jesus Christ

and the sorrows of Our Blessed Lady

and St. Joseph in reparation for my sins,

in suffrage for the souls in Purgatory,

for the wants of our Holy Church,

and for the conversion of sinners."

On the three beads (normally the "Hail Marys"), say:

"My God, I believe in Thee.

My God, I hope in Thee.

My God, I love Thee with my whole heart,

and for Thy sake I love my neighbor as myself."

On each of the single beads of the 5 decades, (normally an "Our Father"):

"Jesus, meek and humble of heart,

make my heart like unto Thine.

O Mary, conceived without sin, pray for me."

On the 5 sets of 10 beads (Normally the "Hail Marys"), say:

"Sweetest Heart of Jesus,

I implore, that I may love Thee more and more.

Sweet Heart of Mary, be thou my salvation."

When you have concluded, say

"Jesus, Mary, and Joseph,

I give you my heart and soul.

Jesus, Mary, and Joseph,

assist me now and in my last agony.

Jesus, Mary, and Joseph,

may I breathe forth my soul in peace with you."`
    },
    {
        id: 'chaplet-of-the-seven-dolors-of-our-lady',
        title: "Chaplet of the Seven Dolors of Our Lady",
        category: 'chaplet',
        text: `How to pray the Chaplet of the Seven Dolors of Our Lady

The Chaplet of the Seven Dolors of Our Lady has a total of 58 beads and
a medal of the first dolor. There is a total of 7 sets of 7 beads, with 3
additional beads and a crucifix. On each of the seven beads if prayed
the "Hail Mary...".

On the separating beads is prayed the "Our Father...".

On the 3 additional beads is prayed the "Hail Mary..."
in remembrance of the tears of Mary that were shed because of the suffering of her Divine Son.
These are said to obtain true sorrow for our sins.

The 7 groups of 7 Hail Mary's are recited in remembrance of the Seven
Sorrows of Mary, namely:

1. The Prophecy of Simeon.

2. The flight into Egypt.

3. The loss of the Child Jesus.

4. Mary meets Jesus carrying His Cross.

5. The crucifixion.

6. Mary receives the body of Jesus from the Cross.

7. The body of Jesus is placed in the tomb.

After each set of seven beads is said the following prayer:

V. Pray for us, O most sorrowful Virgin.

R. That we may be made worthy of the promises of Christ.

Concluding prayer:

Lord Jesus, we now implore,

both for the present

and for the hour of our death,

the intercession of the most Blessed Virgin Mary, Thy Mother,

whose holy soul was pierced

at the time of Thy Passion by a sword of grief.

Grant us this favour,

O Saviour of the world,

Who livest and reignest

with the Father and the Holy Spirit

for ever and ever.

Amen.

- - - - - - - - - -

According to St. Bridget of Sweden (1303-1373), seven promises were
made to those who medidate on Our Lady's Tears and Dolors. The Blessed
Virgin grants seven graces to the souls who honour her daily by saying
seven Hail Marys while meditating on her tears and dolors. These are:

1. "I will grant peace to their families."

2. "They will be enlightened about the Divine Mysteries."

3. "I will console them in their pains and I will accompany them in their work."

4. "I will give them as much as they ask for as long as it does not oppose
the adorable will of my Divine Son or the sanctification of their souls."

5. "I will defend them in their spiritual battles with the infernal enemy
and I will protect them at every instant of their lives."

6. "I will visibly help them at the moment of their death - they will see the
face of their mother."

7. "I have obtained this grace from my Divine Son, that those who
propagate this devotion to my tears and dolors will be taken directly
from this earthly life to eternal happiness, since all their sins will
be forgiven and my Son will be their eternal consolation and joy."

INDULGENCES

Benedict XIII., September 26th, 1724, granted an indulgence of two hundred
days for every Our Father and every Hail Mary to those who, with sincere
contrition, and having confessed, or firmly purposing to confess their
sins, shall recite this Chaplet on any Friday, or on any day of Lent,
on the Festival of the Seven Dolors, or within the Octave; and one
hundred days on any other day of the year.

Clement XII., December 12, 1734, confirmed these indulgences, and moreover granted:

1. A Plenary indulgence to those who shall have recited this Chaplet
for a month every day - Confession, Communion and Prayers for the
Church, required as usual.

2. An indulgence of one hundred years to all who should recite it on
any day, having confessed their sins, with sincere sorrow, or at least
firmly purposing to do so.

3. One hundred and fifty years to those who should recite it on
Mondays, Wednesdays and Fridays, and Holidays of obligation, with
Confession and Communion.

4. A Plenary indulgence once a year, on any day, to those who are
accustomed to recite it four times a week, on condition of Confession,
Communion, and the Recital of the Chaplet on the day of Communion.

5. Two hundred years' indulgence to all who recite it devoutly after
Confession; and to all who carry it about them, and frequently recite
it, ten years' indulgence every time they shall hear Mass, hear a
sermon, or reciting Our Father, and seven Hail Mary's, shall perform
any spiritual or corporal work of mercy, in honor of our Blessed
Saviour, the Blessed Virgin Mary, or any Saint, their advocate.

All these indulgences were confirmed by a decree of January 17th,
1747, and rendered applicable to the souls in Purgatory.`
    },
    {
        id: 'chaplet-of-the-way-of-the-cross',
        title: "Chaplet of the Way of the Cross",
        category: 'chaplet',
        text: `The Chaplet of the Way of the Cross was granted to the Vincentian
Order by Pope Pius IX and X. Later it was withdrawn by the Holy
Office (1912), since the indulgences can be gained by using the
Crucifix alone.

How to pray the Chaplet of the Way of the Cross

This Chaplet is a way of medidating on the Way of the Cross. On it, there
are 15 groups of 3 beads, each, between which are medals representing the
Stations of the Cross. An additional 6 beads are added as well as a
Crucifix.

Beginning with the Crucifix, you bless yourself.

Prior to each group of 3 beads, say the following prayer,

"We adore You, O Christ,

and we bless You

because by Your Holy Cross

You have redeemed the World."

Then say,

1 Our Father

1 Hail Mary and

1 Glory Be.

At the same time, in each group of 3 beads, medidate on the
particular station. These are:

1. Jesus is condemned to death.

2. Jesus is made to bear His Cross.

3. Jesus Falls the First Time.

4. Jesus is met by His Blessed Mother.

5. The cross is laid on Simon of Cyrene.

6. Veronica wipes the face of Jesus.

7. Jesus falls the second time.

8. Jesus speaks to the women of Jerusalem.

9. Jesus falls the third time.

10. Jesus is stripped and receives gall to drink.

11. Jesus is nailed to the cross.

12. Jesus dies on the cross.

13. Jesus is taken down from the cross.

14. Jesus is laid in the sepulchre.`
    },
    {
        id: 'chaplet-for-the-holy-souls',
        title: "Chaplet for the Holy Souls",
        category: 'chaplet',
        text: `How to pray the Chaplet for the Holy Souls

The devotion of the Chaplet for the Holy Souls is prayed on the
most popular 59 beads Marian Rosary which is one of the Catholic
Church Sacramentals.

Make the "Sign Of The Cross" on the Cross.

Then say the I Believe In God..

On the 5 beads between the Cross and the medal, say,

1 Our Father...

3 Hail Mary...

1 Glory Be...

For each decade, proceed as follows:

On the large bead prior to 10 small beads, say:

"O Holy Souls

draw the fire of God's love into my soul,

to reveal Jesus Crucified in me here on earth,

rather than hereafter in Purgatory."

On each of the small beads, say:

"Crucified Lord Jesus,

have mercy on the souls in Purgatory."

When you have completed all 5 decades, say 3 times the
Glory Be...`
    }
];
function findPrayer(query) {
    const q = query.toLowerCase().trim().replace(/[-\s]+/g, '-');
    // First match by exact ID
    let match = exports.BUILTIN_PRAYERS.find(p => p.id === q);
    if (match)
        return match;
    // Then fuzzy match by starting or containing words
    const normalizedQuery = query.toLowerCase().trim();
    match = exports.BUILTIN_PRAYERS.find(p => p.title.toLowerCase().includes(normalizedQuery) ||
        p.id.replace(/-/g, ' ').includes(normalizedQuery));
    return match;
}
function prayersByCategory() {
    const categories = {
        daily: exports.BUILTIN_PRAYERS.filter(p => p.category === 'daily'),
        marian: exports.BUILTIN_PRAYERS.filter(p => p.category === 'marian'),
        devotion: exports.BUILTIN_PRAYERS.filter(p => p.category === 'devotion'),
        litany: exports.BUILTIN_PRAYERS.filter(p => p.category === 'litany'),
        rosary: exports.BUILTIN_PRAYERS.filter(p => p.category === 'rosary'),
        chaplet: exports.BUILTIN_PRAYERS.filter(p => p.category === 'chaplet'),
    };
    return categories;
}
//# sourceMappingURL=prayers.js.map