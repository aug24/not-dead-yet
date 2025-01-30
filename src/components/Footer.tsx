import React from 'react';


const quotes= [
{
lines: [
'It is a sobering thought that when ', 'Wolfgang Amadeus Mozart was my age...', 'he had been dead for two years.'
],
"author": 'Tom Lehrer'
},
{
lines: [
'Always go to other people’s funerals,', 'otherwise they won’t come to yours.'
],
"author": 'Yogi Berra'
},
{
lines: [
'I am prepared to meet my maker.', 'Whether my maker is prepared for the great ordeal ', 'of meeting me is another matter'
],
"author": 'Winston Churchill'
},
{
lines: [
'I bequeath my entire estate to my wife ', 'on the condition that she marries again.', 'That will ensure there will be', 'at least one man who will regret my death.'
],
"author": 'Heinrich Heine'
},
{
lines: [
'I intend to live forever or die trying.'
],
"author": 'Groucho Marx'
},
{
lines: [
'At my age, I do what Mark Twain did.', 'I get my daily paper, look at the obituaries', ' page and if I’m not there,', 'I carry on as usual.'
],
"author": 'Patrick Moore'
},
{
lines: [
'When I die, I want my body to be donated', 'for research, but more specifically, to ', 'a scientist who is working on', 'bringing dead bodies back to life.'
],
"author": 'Nikhil Saluja'
},
{
lines: [
'I’m not afraid of death; I just don’t', 'want to be there when it happens.'
],
"author": 'Woody Allen'
},
{
lines: [
'This wallpaper and I are fighting a duel to the death.', 'Either it goes, or I do.'
],
"author": 'Oscar Wilde'
},
{
lines: [
'If any of you cry at my funeral', 'I’ll never speak to you again.'
],
"author": 'Stan Laurel'
},
{
lines: [
'They couldn’t hit an elephant at this dist--'
],
"author": 'General John Sedgwick'
}
]


const Footer: React.FC = () => {
  let quote=quotes[Math.floor(Math.random() * quotes.length)]
  return (
    <footer>
    <br/>
    <p>
    <em>
      {quote.lines.map((line) => <>{line}<br/></>)}
    </em>
      ~{quote.author}
      </p>
      <p> (c) Justin Rowles - Not Dead Yet</p>
    </footer>
  );
};

export default Footer;
