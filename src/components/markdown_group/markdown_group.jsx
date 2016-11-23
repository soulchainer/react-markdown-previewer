import _ from 'lodash';
import React from 'react';

import MarkdownEditor from '../markdown_editor/markdown_editor.jsx';
import MarkdownPreview from '../markdown_preview/markdown_preview.jsx';

import './markdown_group.scss';

class MarkdownGroup extends React.Component {
  constructor(props) {
    super(props);

    this.state = { markdown: `



# Inquit illi corpora

## Patulo consistere faciente ignotos ebur

Lorem markdownum, poscunt Hippocoon cortice expresso, aqua moneo. Et obverterat
illa gutturaque illa, petiisse [dedissent](http://etiter.org/annum.html) tantum
alta Ulixem ensem *aselli lacrimis* hospes. Deum **solito gratus Pomona** cornu
nymphisque tantum, vestra contrarius quam pugnando gesserat ab.

Regem Eridanus verique [Iovis ita](http://armorum.org/manibus-quoque.html)
supplice Autolycus, et **nec vocem** non mihi stipite humano. Inmitibus sperata.
Matres nec *vulnere* insequitur coniugis spemque vipereis matertera ut cursu,
hac cum legit? Caudas lacerare fracta, sed nominat et tamen viriles mihi adibat
in flumina, refundit et inque retro herba Troades. Hiemes
[erratica](http://utentemet.io/mea) vincta fessos ignotae, hominum ulterius
*petitur* instantiaque gelidi: natum crebros sic, oscula chelydri.

## Incurrere fiet recursus quique non delabitur amens

Longo manus, saepes per loquaci Etruscam vina ultimus, Est est. Incipit arma:
murra iussit, exsecrantia Dauno pertulit, quaeritis hostile acutis
[incurvis](http://dexteranomina.org/est-nocte) viae: stamina tunc. Melius usus
gladium excuteret concurrere inplebat Nilus indomitae indomito parens, in pars,
sine terris et viro lintea puella. Caenis te illic fidem suorum tuba, quae inde
manere numina.

> Rogat putat! Et tellus dixit? Telo natas, turris, ex maduere, Tantale tyranni,
> quas.

## Precibus invenies inscribit

Ante iacere fronti primus passosque in Liber ducitur; spatio date artes, et
caelo bibulis. Expertem increpat pectore natum silva sol, nec quoque vertice
modo crescit paternos, de. Vidi fert metuenti novo. Aristas iram undis Saturnia
protinus ea fratrem honor attulerat misistis intres violentam et Cerambi tibi
vix ossa opus cladem possunt.

Me veneni crede nunc his adesset testata incessere unus buxus! Est quoque
Hecaben, signa aenea anili: numquam feruntur squalentia ponto praeferret
peritura sedet, pharetram Argolicae autumni, Bacchi. Si sanguine, fortuna,
adsimulavit despectare dixit: aditus est est supplex: per *iterum dabas tantus*:
viri! Caput vindicis, *erat* misce?

## Et crines vulnere

Tuum edideras precor Iunonis Alemonides, neve virgineusque figuram **quae
procubuit certus** resupinus viderat te auguror o. Et lucem ecce flava premis
fallacibus aliquem ictus tum equorum et. Omnes perlucentibus saeva cupidine meo
discrimen et nostris passurae stant.

Cum illa. Robora mater sed [se vixque](http://etet.org/obtulimusnocendo.aspx)
unus illa ferox [Tereus simulacra biformis](http://erat.com/et) linguae. Pressa
membra imagine tantum agmine, est Ancaeo est eligit me urna? Sum caros, in
totumque *quare*, formosus ad, est. Seram corpus furentibus culpa aures ulvaeque
telum.

Duo nec ait ille moratum suis **dentibus vocant fueramque** ignes lumina de.
Andron umero Dianae ad labor fatidicamque *iusserat in* te miratur agris adit
manu: urbes. Quod nam exanimi inque Molpeus tellure, irata famulasque medias,
remis nam Ammon. Nec in vetus primum praeponere opes tam contingere profuit
faciat: Cyllene aliamve: quidem [fugamque](http://orbe.io/) Lapithaeae pudore.
Pinum rogabat inspiciunt Iovi turba, et ardent sumpsisse tamen, nec terra orbem
nosterque fissa ambitiosus [omni](http://estcorporeusque.net/sed.aspx), ponat.



`,
      // percentage of content scrolled in each element
      scrolledPercent: {editor: 0, preview: 0},
      scrolledView: null
    };
    this.onScrollChangeDebounced = _.debounce((el) => 
                                              {this.onScrollChange(el);}, 300);
  }

  onScrollChange (el) {
    let totalToScroll = el.scrollHeight  - el.clientHeight;
    let scrollPercent = Math.round(el.scrollTop * 100 / totalToScroll);
    let syncedScrolledPercent = {editor: scrollPercent, preview: scrollPercent};

    this.setState({scrolledPercent: syncedScrolledPercent});
  }

  render() {
    return (
      <div className="MarkdownGroup">
        <MarkdownEditor
          markdown={this.state.markdown}
          onContentChange={markdown => this.setState({markdown})}
          onScrollChange={(el) => {
            this.setState({scrolledView: 'editor'});
            this.onScrollChange(el);} }
          scrolledView={this.state.scrolledView}
          scrolledPercent={this.state.scrolledPercent} />
        <MarkdownPreview
          markdown={this.state.markdown}
          onScrollChange={(el) => {
            this.setState({scrolledView: 'preview'});
            this.onScrollChangeDebounced(el);} }
          scrolledView={this.state.scrolledView}
          scrolledPercent={this.state.scrolledPercent} />
      </div>
    );
  }
}

export default MarkdownGroup;