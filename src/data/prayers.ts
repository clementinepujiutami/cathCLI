export interface Prayer {
  id: string; // URL-slug style ID
  title: string;
  category: 'daily' | 'marian' | 'devotion' | 'litany' | 'rosary';
  text: string;
}

export const BUILTIN_PRAYERS: Prayer[] = [
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
    text: `How to Pray the Rosary:
1. Make the Sign of the Cross and say the "Apostles' Creed".
2. Say the "Our Father".
3. Say three "Hail Marys" for an increase in faith, hope, and charity.
4. Say the "Glory Be".
5. Announce the First Mystery and say the "Our Father".
6. Say ten "Hail Marys" while meditating on the Mystery.
7. Say the "Glory Be" and the "Fatima Prayer":
   "O my Jesus, forgive us our sins, save us from the fires of hell, lead all souls to heaven, especially those in most need of Thy mercy."
8. Repeat steps 5-7 for the Second, Third, Fourth, and Fifth Mysteries.
9. After the five decades, say the "Hail Holy Queen" and the concluding prayer:
   "O God, whose only begotten Son, by His life, death, and resurrection, has purchased for us the rewards of eternal life, grant, we beseech Thee, that meditating upon these mysteries of the Most Holy Rosary of the Blessed Virgin Mary, we may imitate what they contain and obtain what they promise, through the same Christ our Lord. Amen."

---

THE MYSTERIES OF THE ROSARY:

[Joyful Mysteries] (Prayed on Mondays and Saturdays)
1. The Annunciation
2. The Visitation
3. The Nativity
4. The Presentation in the Temple
5. The Finding in the Temple

[Sorrowful Mysteries] (Prayed on Tuesdays and Fridays)
1. The Agony in the Garden
2. The Scourging at the Pillar
3. The Crowning with Thorns
4. The Carrying of the Cross
5. The Crucifixion and Death of Our Lord

[Glorious Mysteries] (Prayed on Wednesdays and Sundays)
1. The Resurrection
2. The Ascension
3. The Descent of the Holy Spirit
4. The Assumption of Mary
5. The Coronation of Mary as Queen of Heaven and Earth

[Luminous Mysteries] (Prayed on Thursdays)
1. The Baptism of Christ in the Jordan
2. The Wedding at Cana
3. The Proclamation of the Kingdom
4. The Transfiguration
5. The Institution of the Eucharist`
  }
];

export function findPrayer(query: string): Prayer | undefined {
  const q = query.toLowerCase().trim().replace(/[-\s]+/g, '-');
  // First match by exact ID
  let match = BUILTIN_PRAYERS.find(p => p.id === q);
  if (match) return match;

  // Then fuzzy match by starting or containing words
  const normalizedQuery = query.toLowerCase().trim();
  match = BUILTIN_PRAYERS.find(
    p => p.title.toLowerCase().includes(normalizedQuery) ||
         p.id.replace(/-/g, ' ').includes(normalizedQuery)
  );
  return match;
}

export function prayersByCategory() {
  const categories = {
    daily:    BUILTIN_PRAYERS.filter(p => p.category === 'daily'),
    marian:   BUILTIN_PRAYERS.filter(p => p.category === 'marian'),
    devotion: BUILTIN_PRAYERS.filter(p => p.category === 'devotion'),
    litany:   BUILTIN_PRAYERS.filter(p => p.category === 'litany'),
    rosary:   BUILTIN_PRAYERS.filter(p => p.category === 'rosary'),
  };
  return categories;
}
