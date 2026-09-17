/**
 * Tutti i testi del sito in un unico punto.
 *
 * Il contenuto viene dal documento scritto dalla dott.ssa Madonia
 * (`contenuti-originali-sonia.txt` nella radice del progetto). Dove il web
 * chiede frasi più corte i testi sono stati accorciati, mai riscritti: i
 * termini tecnici, i numeri di certificazione e le date sono i suoi.
 */

export const studio = {
  nome: 'Sonia Madonia',
  nomeCompleto: 'Dott.ssa Carmela Maria Sonia Madonia',
  ruolo: 'Psicologa e Analista del Comportamento certificata',
  albo: 'Albo degli Psicologi della Regione Siciliana, Sezione A — n. 10600',
  email: 'soniamadonia@abafriendly.it',
  telefono: '+39 328 961 5159',
  citta: 'Gela (CL)',
  /**
   * Fornita dalla dott.ssa il 5 settembre 2026. Compare nel piè di pagina e
   * nell'informativa privacy: per un professionista con partita IVA che si
   * presenta online è un'indicazione dovuta, non un dettaglio amministrativo.
   */
  partitaIva: 'P. IVA 02091900858',
}

/**
 * Contatto WhatsApp.
 *
 * Il numero va scritto in formato internazionale **senza `+`, spazi o zeri
 * iniziali**: è l'unico che `wa.me` accetta. Il messaggio precompilato toglie a
 * chi scrive l'imbarazzo della prima riga — che su un tema delicato è spesso
 * l'ostacolo vero.
 */
export const whatsapp = {
  numero: '393289615159',
  messaggio:
    'Salve dott.ssa Madonia, le scrivo dal suo sito per avere informazioni.',
}

export const linkWhatsapp = `https://wa.me/${whatsapp.numero}?text=${encodeURIComponent(whatsapp.messaggio)}`

/**
 * Fotografie della professionista.
 *
 * `/sonia.jpg` è il ritratto professionale definitivo: 2710×3387 px, cioè
 * esattamente il 4:5 del riquadro del ritratto — che quindi non taglia nulla.
 * Sostituisce `sonia-prova.jpg`, che era 950×960 e non bastava per nessuno dei
 * due usi.
 *
 * Il file è tenuto alla risoluzione originale: ricomprimerlo con gli strumenti
 * di sistema lo faceva *crescere* a parità di lato, segno che è già codificato
 * bene. 486 KB per l'immagine più grande del sito sono accettabili.
 */
export const ritratto = {
  file: '/sonia.jpg' as string | null,
  alt: `${studio.nome}, ${studio.ruolo.toLowerCase()}`,
  // Il riquadro è 4:5 come la foto: non c'è ritaglio, e l'inquadratura non ha
  // niente da spostare.
  inquadratura: 'center',
}

/**
 * Foto grande della prima schermata.
 *
 * Il riquadro è largo quanto lo schermo e alto quanto la finestra: del ritratto
 * verticale ne resta visibile una fascia di poco più di un terzo.
 * `inquadratura` decide **quale** fascia, non quanto è alta.
 *
 * Il secondo valore va letto al contrario di come sembra: è la posizione della
 * finestra di ritaglio lungo la foto, quindi alzandolo la finestra scende e la
 * foto sale. Da 18% a 26% l'immagine si alza di circa il 3% della propria
 * altezza.
 *
 * Su telefono non ha alcun effetto: lì il riquadro è più alto che largo, la
 * foto è scalata per coprire l'altezza e il ritaglio avviene sui lati.
 * Lo spostamento a sinistra è per lo stesso motivo in `Hero.tsx` e non qui —
 * sull'orizzontale, da 1024px in su, non c'è niente da spostare finché non
 * glielo si crea.
 */
export const fotoHero = {
  file: '/sonia.jpg' as string | null,
  alt: `${studio.nome}, ${studio.ruolo.toLowerCase()}`,
  inquadratura: 'center 26%',
}

/**
 * I profili della professionista altrove sul web.
 *
 * Servono a due cose diverse con lo stesso elenco: le icone nel piè di pagina e
 * nei contatti, e la dichiarazione `sameAs` nei dati strutturati — il modo
 * esplicito di dire a un motore di ricerca «la persona di questo sito è quella
 * che già conosci altrove». Per un dominio appena nato, senza cronologia e
 * senza collegamenti in entrata, è uno dei pochi segnali di identità
 * disponibili.
 *
 * Gli indirizzi sono nella forma canonica. Quello di LinkedIn arrivava con il
 * suffisso `/en` e la coda `?trk=people-guest_people_search-card`: descrive da
 * quale schermata è stato copiato, non la pagina, e in un dato strutturato è
 * rumore che può anche cambiare nel tempo.
 *
 * La scheda del libro su Amazon **non** va qui: identifica il volume, non la
 * persona, ed è già l'indirizzo del nodo `Book` nei dati strutturati.
 */
export const profili = [
  {
    nome: 'Facebook',
    url: 'https://www.facebook.com/sonia.madonia.35/',
  },
  {
    nome: 'LinkedIn',
    url: 'https://www.linkedin.com/in/sonia-madonia-b541a822a/',
  },
  {
    /**
     * ⚠️ Da completare: l'indirizzo fornito era quello di un singolo post
     * (`/p/DZCGC2GIk6G/`), non del profilo. Serve la forma
     * `https://www.instagram.com/<nomeutente>/` — sia perché un'icona deve
     * portare al profilo e non a un contenuto che invecchia, sia perché in
     * `sameAs` un post non identifica la persona.
     */
    nome: 'Instagram',
    url: '',
  },
]

/**
 * I soli profili con un indirizzo vero.
 *
 * Finché a uno manca l'indirizzo non compare da nessuna parte: né come icona
 * che non porta in nessun posto, né come `sameAs` vuoto nei dati strutturati,
 * che è peggio di un `sameAs` assente.
 */
export const profiliAttivi = profili.filter((profilo) => profilo.url !== '')

export const navigazione = [
  { etichetta: 'Chi sono', href: '/chi-sono' },
  { etichetta: 'Servizi', href: '/servizi' },
  { etichetta: 'Contatti', href: '/contatti' },
]

/**
 * Apertura della home, dalle prime righe del documento.
 *
 * Il titolo è la versione accorciata: nel documento originale è «interventi
 * individualizzati per persone con diagnosi di autismo». In un titolo la forma
 * breve si legge meglio; la dicitura tecnica resta nei paragrafi qui sotto e
 * nelle pagine interne, dove la precisione conta di più della scorrevolezza.
 */
export const presentazione = {
  titolo:
    'Interventi personalizzati per persone con autismo e altri disturbi del neurosviluppo',
  paragrafi: [
    // La città è nominata qui, nel primo paragrafo: è il punto in cui una
    // ricerca locale trova la corrispondenza. Detta con naturalezza, non
    // appiccicata — il territorio in cui lavora è un'informazione vera.
    'Sono la dott.ssa Sonia Madonia, psicologa e Analista del Comportamento certificata, con oltre quindici anni di esperienza nell’ambito dell’Analisi del Comportamento Applicata — Applied Behavior Analysis (ABA). Lavoro a Gela e nel territorio delle province di Caltanissetta e Catania.',
    'Mi occupo di osservazione e valutazione comportamentale, progettazione di interventi individualizzati, supervisione clinica, parent training, coordinamento di équipe multidisciplinari e formazione di professionisti, operatori e personale scolastico.',
    'Ogni intervento viene costruito sulle caratteristiche, sulle abilità e sui bisogni specifici della persona, e viene monitorato attraverso l’osservazione diretta e la raccolta sistematica dei dati.',
  ],
}

/**
 * Immagini d'ambiente usate fuori dalle aree di servizio.
 *
 * ⚠️ Sono fotografie generiche di stock, scelte senza persone e nella
 * palette del sito. Servono a non lasciare pagine di solo testo, ma vanno
 * sostituite con fotografie dei luoghi reali di lavoro: la ricerca sul
 * settore è unanime nel dire che le foto vere convertono molto meglio.
 */
export const immagini = {
  contatti: '/ambiente-6.jpg',
}

/**
 * Il marchio personale della professionista.
 *
 * È un JPG **senza trasparenza**: sul fondo sabbia mostrerebbe un rettangolo
 * bianco. Nel componente viene fuso con `mix-blend-mode: multiply`, che su uno
 * sfondo chiaro fa sparire il bianco senza bisogno di ritoccare il file.
 * Se un domani arriva una versione PNG trasparente, la fusione si può togliere.
 */
export const marchio = {
  file: '/logo-abafriendly.jpg',
  alt: 'ABA Friendly',
}

/**
 * I tre fatti verificabili, in evidenza sulla home.
 *
 * Sono numeri e iscrizioni, non aggettivi: chiunque può controllarli sui
 * registri. È il tipo di prova che sostituisce le testimonianze, che in Italia
 * un professionista sanitario non può usare.
 */
export const credenziali = [
  {
    valore: 'Dal 2010',
    etichetta: 'nel campo dell’Analisi del Comportamento Applicata',
  },
  {
    valore: 'n. 10600',
    etichetta: 'Albo degli Psicologi della Regione Siciliana, Sezione A',
  },
  {
    valore: 'Tre',
    etichetta: 'certificazioni: IBAO®, IACABAI e SIACSA/ABAIT',
  },
]

/**
 * «Infinito» — l'opera collettiva.
 *
 * Il simbolo dell'infinito, non il pezzo di puzzle: è una presa di posizione
 * precisa nella comunità autistica, e il testo la rende esplicita. Non
 * sostituire né l'immagine né le parole con qualcosa di più «neutro».
 *
 * Il testo è la versione integrale fornita dalla dott.ssa il 5 settembre 2026,
 * che sostituisce quella troncata del primo documento: si fermava su «alla
 * costruzione di qualcosa» e le mancavano il nome dei Tucarù, l'idea dell'opera
 * che resta aperta e la frase di chiusura. Sono le tre cose che la fanno finire
 * invece di interrompersi: da qui in poi si tocca solo con parole sue.
 */
export const opera = {
  occhiello: 'Un’opera collettiva',
  titolo: 'Infinito',
  immagine: '/opera-infinito.jpg',
  alt: 'Infinito: trittico su tela in cui il simbolo dell’infinito è composto da centinaia di impronte digitali colorate, trasformate in piccoli animali.',
  paragrafi: [
    'Infinito è un’opera collettiva realizzata con le impronte dei bambini e dei ragazzi con diagnosi di autismo che seguo nell’ambito dei progetti promossi dalle ASP di Caltanissetta e Catania presso le cooperative Carpe Diem di Gela e Zeno Saltini di Caltagirone.',
    'Alle loro impronte si uniscono quelle delle tante persone che, con ruoli diversi, fanno parte della nostra rete: tecnici del comportamento, educatori, insegnanti, tirocinanti, fotografi, rappresentanti delle istituzioni, giornalisti, assistenti sociali, responsabili delle cooperative e molti altri.',
    'Tutte queste impronte, diverse tra loro, si incontrano e formano un unico infinito. Sono stati proprio alcuni ragazzi con diagnosi di autismo, i Tucarù, a farmene comprendere il significato più profondo: non sono pezzi di un puzzle e nessuno di noi lo è. Ogni persona è unica e completa e, nell’incontro con gli altri, può esprimere le proprie caratteristiche e i propri talenti, contribuendo a creare qualcosa che nessuno potrebbe costruire da solo.',
    'Per questo, l’opera non sarà mai definitivamente conclusa: resterà aperta ad accogliere ogni nuova mano che vorrà unirsi, lasciando la propria impronta e diventando parte di questo infinito.',
  ],
  /**
   * L'ultima riga sta fuori dall'elenco perché non è un paragrafo come gli
   * altri: è la frase che chiude, e nel testo della dott.ssa arriva dopo una
   * pausa. Trattata come le precedenti si perderebbe in fondo alla colonna.
   */
  chiusura:
    'È questo il significato più autentico di Infinito: da soli si può andare più veloci, ma insieme si arriva più lontano.',
}

/** A chi si rivolgono i servizi. */
export const destinatari = [
  // L'elenco completo delle diagnosi è quello del documento originale.
  // Riassumerlo in «autismo o altri disturbi del neurosviluppo» — come avevo
  // fatto in una prima stesura — costava caro due volte: una famiglia con una
  // diagnosi di ADHD o di DSA non si riconosceva, e il sito spariva da quelle
  // ricerche. I nomi delle diagnosi sono i termini con cui le persone cercano.
  'Bambini, adolescenti e adulti con diagnosi di autismo, disabilità intellettiva, disturbi della comunicazione e del linguaggio, ADHD (disturbo da deficit di attenzione/iperattività), disturbi specifici dell’apprendimento e altri disturbi del neurosviluppo',
  'Genitori, familiari e caregiver',
  'Insegnanti, educatori, ASACOM e Tecnici del Comportamento',
  'Scuole e istituti di formazione',
  'Cooperative sociali, centri educativi e servizi riabilitativi',
  'Équipe multidisciplinari',
  'Enti e organizzazioni interessati alla progettazione di servizi e percorsi formativi',
]

/**
 * I servizi, raggruppati in quattro aree.
 *
 * Il documento originale ne elenca sedici: presentarli in fila renderebbe la
 * pagina illeggibile. Le aree seguono l'ordine naturale di un percorso —
 * prima si capisce, poi si interviene, poi si estende ai contesti di vita, e
 * in parallelo si formano le persone che ci lavorano.
 */
export const aree = [
  {
    titolo: 'Valutazione e progettazione',
    sommario:
      'Dal primo colloquio al piano individualizzato: capire cosa serve prima di decidere come intervenire.',
    /** Foto vera di un colloquio: persone riconoscibili, serve il consenso. */
    immagine: '/colloquio.jpg',
    servizi: [
      {
        titolo: 'Primo colloquio e analisi della richiesta',
        testo:
          'Il primo colloquio consente di comprendere le esigenze della famiglia, le principali difficoltà del bambino e il tipo di supporto richiesto, per valutare l’appropriatezza della presa in carico. Se si decide di proseguire, viene svolta un’intervista approfondita con i genitori o caregiver per individuare le priorità e definire gli obiettivi del percorso.',
      },
      {
        titolo: 'Osservazione comportamentale',
        testo:
          'L’osservazione viene effettuata, quando possibile e necessario, nei contesti in cui le abilità o le difficoltà si manifestano: casa, scuola, centro educativo. Lo scopo è descrivere in modo concreto ciò che la persona fa, in quali condizioni un comportamento si presenta e quali conseguenze possono mantenerlo. Non si limita alle difficoltà: considera anche abilità già acquisite, punti di forza, interessi e competenze emergenti.',
      },
      {
        titolo: 'Valutazione delle abilità e dei bisogni individuali',
        testo:
          'Permette di definire il profilo di funzionamento della persona e individuare le abilità da potenziare, attraverso colloqui, osservazioni dirette, raccolta dei dati e strumenti coerenti con gli obiettivi.',
        elenco: [
          'Comunicazione',
          'Abilità sociali',
          'Gioco e tempo libero',
          'Prerequisiti dell’apprendimento',
          'Autonomie personali, domestiche e sociali',
          'Partecipazione alle attività quotidiane',
          'Tolleranza dei cambiamenti e delle attese',
          'Regolazione del comportamento',
          'Generalizzazione e mantenimento delle abilità',
        ],
      },
      {
        titolo: 'Valutazione funzionale dei comportamenti',
        testo:
          'Serve a comprendere le variabili che influenzano i comportamenti problema — quelli che interferiscono con l’apprendimento, la partecipazione o la vita quotidiana: definizione operazionale, raccolta di informazioni da genitori e insegnanti, osservazione di antecedenti e conseguenze, ipotesi sulla funzione, individuazione di strategie preventive e abilità alternative da insegnare. Prima di attribuire una funzione esclusivamente comportamentale vengono considerati anche fattori medici, sensoriali, comunicativi e ambientali.',
      },
      {
        titolo: 'Progettazione di interventi ABA individualizzati',
        testo:
          'Sulla base della valutazione viene predisposto un piano con obiettivi osservabili, misurabili e significativi per la vita quotidiana della persona. Nel piano sono specificati obiettivi, procedure di insegnamento, aiuti, modalità di rinforzo, criteri di acquisizione e modalità di raccolta dei dati.',
      },
    ],
  },
  {
    titolo: 'Intervento e accompagnamento',
    sommario:
      'La messa in pratica: supervisione degli operatori, parent training, monitoraggio dei progressi sui dati.',
    /**
     * Ritrae un minore durante un intervento — **con il volto offuscato**.
     *
     * L'offuscamento è cotto nei pixel del file, non applicato con un filtro
     * nel browser: un velo CSS avrebbe lasciato l'originale scaricabile
     * all'indirizzo di sempre, cioè non avrebbe protetto nessuno.
     *
     * La sfocatura è leggera — sigma 8 su un'immagine di 1000px — e sfuma fra
     * il 38% e il 50% della larghezza, chiudendosi prima del viso della
     * dott.ssa, che resta nitido. Legge come una profondità di campo, non come
     * una censura.
     *
     * Otto è il minimo che funziona, e la misura è stata presa guardando: a
     * sigma 5 i lineamenti del bambino, gli occhiali e l'espressione si
     * leggevano ancora, quindi la fotografia restava un dato personale.
     * Abbassarlo ancora vanifica l'operazione.
     *
     * ⚠️ Resta una cosa da fare, ed è fuori dal codice: la fotografia originale
     * **è ancora nella cronologia di git**, perché il file era già stato
     * committato prima dell'offuscamento. Chiunque abbia accesso al repository
     * può recuperarla. Per toglierla davvero serve riscrivere la cronologia.
     *
     * Il contesto lascia intuire una diagnosi, che ai sensi del GDPR è un dato
     * particolarissimo: con il volto coperto la fotografia non è più un dato
     * personale, ma finché l'originale è recuperabile la questione non è chiusa.
     */
    immagine: '/intervento.jpg',
    servizi: [
      {
        titolo: 'Supervisione degli interventi ABA',
        testo:
          'Rivolta ai Tecnici del Comportamento, agli educatori e agli operatori coinvolti nell’attuazione del piano: osservazione dell’applicazione delle procedure, dimostrazione degli interventi, formazione pratica, feedback specifici, analisi dei dati e aggiornamento degli obiettivi. Permette di mantenere coerenza fra tutte le persone coinvolte, nel rispetto del ruolo e delle competenze di ciascuno.',
      },
      {
        titolo: 'Monitoraggio dei progressi',
        testo:
          'I progressi vengono verificati attraverso dati osservabili, non attraverso impressioni generali: se le abilità previste vengono acquisite, se gli obiettivi sono adeguati, se le procedure sono applicate correttamente, se i risultati si mantengono nel tempo e in contesti diversi. I dati vengono analizzati e condivisi periodicamente con la famiglia e con l’équipe, in un linguaggio comprensibile e rispettoso.',
      },
      {
        titolo: 'Parent training',
        testo:
          'Un percorso strutturato di formazione e accompagnamento per genitori e caregiver: osservare e descrivere i comportamenti, riconoscere le condizioni che li influenzano, applicare con coerenza le procedure del piano, sostenere comunicazione e autonomie, riconoscere e rinforzare i progressi. Non consiste nella consegna di indicazioni scritte: le procedure vengono spiegate, mostrate concretamente, esercitate insieme e accompagnate da feedback.',
      },
      {
        titolo: 'Consulenza comportamentale nelle difficoltà alimentari',
        testo:
          'Percorsi rivolti alle famiglie di bambini con selettività alimentare, comportamenti di rifiuto o difficoltà nella partecipazione al pasto: analisi della storia alimentare e delle routine, osservazione dei comportamenti di accettazione ed evitamento, obiettivi misurabili, strategie individualizzate come esposizione graduata, shaping, rinforzo differenziale e fading. Prima dell’avvio vengono considerati gli aspetti medici, nutrizionali, sensoriali, oro-motori e di deglutizione; quando necessario l’intervento entra in una presa in carico multidisciplinare.',
      },
      {
        titolo: 'Interventi per le autonomie personali e sociali',
        testo:
          'Percorsi per favorire indipendenza e partecipazione nei diversi ambienti di vita: cura personale, organizzazione delle routine, abilità domestiche, uso funzionale del tempo libero, spostamenti, accesso a negozi e servizi, comunicazione nei contesti sociali, regole di sicurezza. Le abilità vengono suddivise in passaggi insegnabili e adattate all’età e alle opportunità reali della persona.',
      },
    ],
  },
  {
    titolo: 'Servizi per scuole, équipe ed enti',
    sommario:
      'Il lavoro con i contesti: consulenza scolastica, coordinamento dell’équipe, progettazione di servizi.',
    /**
     * La dott.ssa in aula all'Istituto «Luigi Sturzo» di Caltagirone, davanti
     * a una slide sull'assessment delle competenze. 1600×900, il rapporto in
     * cui viene ritagliata.
     *
     * ⚠️ Delle tre foto delle aree è quella che espone di più: qui la platea è
     * girata verso di lei e almeno sei persone sono riconoscibili di fronte o
     * di tre quarti, non di spalle. Prima della pubblicazione serve il consenso
     * scritto di ciascuna, oppure una foto diversa. Non è un dato sanitario —
     * sono corsisti — ma restano volti identificabili di persone private.
     */
    immagine: '/scuola-equipe.jpg',
    servizi: [
      {
        titolo: 'Consulenza scolastica',
        testo:
          'Rivolta a insegnanti, educatori, ASACOM e alle altre figure coinvolte nel percorso educativo: osservazione nel contesto scolastico, individuazione delle abilità prioritarie, analisi delle condizioni che facilitano o ostacolano la partecipazione, strategie per comunicazione, autonomia e inclusione, adattamento delle attività, confronto periodico con famiglia ed équipe. L’obiettivo è costruire strategie sostenibili, applicabili nelle reali routine della classe.',
      },
      {
        titolo: 'Coordinamento dell’équipe multidisciplinare',
        testo:
          'Condivisione degli obiettivi e definizione dei ruoli, organizzazione degli incontri, condivisione di informazioni e dati, verifica dei progressi, raccordo fra famiglia, scuola, tecnici e professionisti. In base ai bisogni possono essere coinvolti medici, neuropsichiatri, psicologi, logopedisti, nutrizionisti, terapisti della neuro e psicomotricità, terapisti occupazionali, educatori e insegnanti: ciascuno contribuisce nel rispetto delle proprie competenze.',
      },
      {
        titolo: 'Consulenza scientifica e progettazione di servizi',
        testo:
          'Per cooperative, enti, istituti scolastici e organizzazioni: analisi dei bisogni, definizione del modello operativo, progettazione dei percorsi, indicatori di esito, organizzazione e formazione dell’équipe, procedure e strumenti di monitoraggio, supervisione dell’attuazione, valutazione della qualità del servizio e coordinamento scientifico di corsi di formazione.',
      },
    ],
  },
  {
    titolo: 'Formazione',
    sommario:
      'Corsi per Tecnici del Comportamento, professionisti sanitari, insegnanti e personale scolastico.',
    /**
     * La dott.ssa durante una docenza, davanti a una sala di insegnanti.
     *
     * È la foto giusta per quest'area perché mostra il ruolo, non l'aula: lei
     * al microfono, la slide sui principi dell'ABA alle spalle, la platea di
     * spalle. 1600×900, esattamente il rapporto in cui viene ritagliata.
     *
     * ⚠️ La platea è quasi tutta di spalle, ma sul lato destro alcuni volti si
     * riconoscono di profilo: prima della pubblicazione serve il consenso di
     * quelle persone all'uso dell'immagine, oppure una sfocatura di quella
     * porzione. Diversamente dalle foto degli interventi, qui non c'è alcun
     * dato sanitario in gioco — sono partecipanti a un corso — quindi basta il
     * consenso ordinario all'immagine.
     */
    immagine: '/formazione-aba.jpg',
    servizi: [
      {
        titolo: 'Formazione per Tecnici del Comportamento e professionisti sanitari',
        testo:
          'Sono referente scientifico e docente del corso per Tecnico del Comportamento presso l’Istituto di Sociologia “Luigi Sturzo” di Caltagirone. Il percorso è rivolto a Tecnici del Comportamento, educatori, ASACOM e professionisti sanitari — psicologi, psicoterapeuti, logopedisti. Per le professioni sanitarie ammesse è previsto il riconoscimento di 50 crediti ECM, secondo le modalità stabilite dal provider accreditato.',
        elenco: [
          'Osservazione, misurazione e valutazione funzionale del comportamento',
          'Procedure di insegnamento, prompting e rinforzo',
          'Comunicazione funzionale e sviluppo delle autonomie',
          'Prevenzione e gestione dei comportamenti che interferiscono',
          'Raccolta, rappresentazione e interpretazione dei dati',
          'Generalizzazione e mantenimento delle abilità',
          'Collaborazione con famiglie ed équipe multidisciplinari',
          'Responsabilità etiche e limiti del ruolo professionale',
        ],
      },
      {
        // Sta subito dopo la docenza al corso e prima della formazione per la
        // scuola: è il passo successivo dello stesso percorso — prima si
        // insegna, poi si supervisiona chi sta ottenendo la certificazione.
        titolo:
          'Supervisione per il conseguimento della certificazione di Tecnico del Comportamento',
        testo:
          'Svolgo attività di supervisione nell’ambito dei percorsi finalizzati al conseguimento della certificazione come Tecnico del Comportamento, secondo i requisiti stabiliti da IACABAI, IBAO e ABAIT. La supervisione comprende la pianificazione e il monitoraggio della pratica, l’osservazione diretta o tramite registrazioni video, l’analisi dei casi, la valutazione delle competenze, il feedback e la predisposizione della documentazione richiesta.',
      },
      {
        titolo: 'Formazione per insegnanti e personale scolastico',
        testo:
          'Incontri formativi sui temi dell’autismo, dei Bisogni Educativi Speciali e dell’inclusione: comprensione del comportamento, organizzazione preventiva dell’ambiente, comunicazione e supporti visivi, motivazione e rinforzo, abilità sociali, transizioni, autonomie scolastiche, collaborazione scuola-famiglia-équipe e promozione del benessere nel gruppo classe. I contenuti vengono adattati alle esigenze dell’istituto e accompagnati da esempi applicativi.',
      },
    ],
  },
]

/** Le cinque fasi del metodo di lavoro. */
export const metodo = [
  {
    numero: '01',
    titolo: 'Analisi della richiesta',
    testo:
      'Vengono raccolte le informazioni necessarie per comprendere le esigenze della persona, della famiglia o del servizio.',
  },
  {
    numero: '02',
    titolo: 'Osservazione e valutazione',
    testo:
      'Si osservano abilità, difficoltà, contesti e variabili rilevanti, con strumenti coerenti con gli obiettivi.',
  },
  {
    numero: '03',
    titolo: 'Definizione degli obiettivi',
    testo:
      'Gli obiettivi vengono stabiliti insieme alle persone coinvolte e formulati in maniera concreta, osservabile, misurabile e significativa.',
  },
  {
    numero: '04',
    titolo: 'Progettazione e attuazione',
    testo:
      'Viene predisposto un piano individualizzato che descrive procedure, responsabilità, modalità di insegnamento e raccolta dei dati.',
  },
  {
    numero: '05',
    titolo: 'Monitoraggio e revisione',
    testo:
      'I risultati vengono verificati periodicamente. Il piano viene mantenuto, aggiornato o modificato sulla base dei dati raccolti e delle risposte della persona.',
  },
]

/** I principi professionali dichiarati nel documento. */
export const principi = [
  'Centralità e dignità della persona',
  'Individualizzazione dell’intervento',
  'Obiettivi significativi per la qualità della vita',
  'Coinvolgimento consapevole della famiglia',
  'Collaborazione tra professionisti',
  'Utilizzo di procedure fondate sulle evidenze',
  'Raccolta e analisi dei dati',
  'Verifica della corretta applicazione degli interventi',
  'Rispetto dei ruoli e dei confini professionali',
  'Attenzione alla generalizzazione e al mantenimento delle abilità',
  'Revisione del programma quando i dati indicano l’assenza di progressi',
]

/** Biografia estesa, pagina "Chi sono". */
export const biografia = [
  'Sono una psicologa iscritta all’Albo degli Psicologi della Regione Siciliana, Sezione A, e un’Analista del Comportamento in possesso della certificazione internazionale IBA®, rilasciata da IBAO®, della certificazione AdC IACABAI e dell’attestazione SIACSA/ABAIT.',
  'Dal 2010 opero nel campo dell’Analisi del Comportamento Applicata. Nel corso della mia esperienza ho ricoperto i ruoli di Tutor ABA, Analista del Comportamento, supervisore clinico, coordinatrice di équipe multidisciplinari, referente scientifico e docente in corsi rivolti a Tecnici del Comportamento, ASACOM, insegnanti e professionisti sanitari.',
  'Mi occupo della progettazione e della supervisione di interventi rivolti a persone con diagnosi di autismo e altri disturbi del neurosviluppo, con particolare attenzione alla comunicazione, alle abilità di apprendimento, alle autonomie personali e sociali e alla partecipazione nei diversi contesti di vita.',
  // Sostituisce, su indicazione della dott.ssa, il paragrafo che diceva solo
  // «Collaboro con famiglie, scuole…»: quello elencava gli interlocutori senza
  // mai dire in che veste lavora. La libera professione dal 2022 è
  // un'informazione che prima non compariva da nessuna parte, e non va confusa
  // con il «dal 2010» delle credenziali, che indica da quando opera nel campo.
  'Dal 2022 svolgo la mia attività come libera professionista, lavorando direttamente con persone e famiglie e collaborando con scuole, cooperative sociali, professionisti sanitari e servizi del territorio. Promuovo interventi individualizzati e multidisciplinari, fondati sull’osservazione e sull’analisi dei dati.',
]

/**
 * Certificazioni, con la spiegazione di che cosa attesta ciascuna.
 *
 * La nota finale è obbligatoria per correttezza deontologica e va tenuta
 * visibile: distingue le certificazioni dall'iscrizione all'Albo.
 */
export const certificazioni = [
  {
    titolo: 'International Behavior Analyst® — IBAO®',
    numero: 'Certificazione n. 76933613',
    logo: '/logo-ibao.png' as string | null,
    sigla: 'IBAO®',
    testo:
      'IBAO® — International Behavior Analysis Organization® — è un organismo internazionale di certificazione nell’ambito dell’Analisi del Comportamento Applicata. La certificazione IBA® attesta il possesso degli standard previsti in materia di formazione, esperienza pratica, supervisione, competenze ed etica professionale, e rende verificabile la preparazione dell’Analista del Comportamento a livello internazionale.',
  },
  {
    titolo: 'Analista del Comportamento (AdC) certificata IACABAI',
    numero: 'Certificazione n. 1-001-39',
    logo: '/logo-iacabai.png' as string | null,
    sigla: 'IACABAI',
    testo:
      'IACABAI è l’Italy Associate Chapter di ABAI e gestisce i registri dedicati alle figure professionali dell’Analisi del Comportamento Applicata. La certificazione AdC attesta i requisiti tecnico-scientifici previsti per progettare, coordinare e monitorare interventi comportamentali.',
  },
  {
    titolo: 'Analista del Comportamento — SIACSA/ABAIT',
    numero: 'Codice socio S-2022-00601 — validità fino al 31 dicembre 2026',
    logo: '/logo-abait.png' as string | null,
    sigla: 'ABAIT',
    /** Marchio orizzontale: va tenuto più basso degli altri due (vedi nota). */
    largo: true,
    testo:
      'SIACSA gestisce il registro nazionale professionale degli Analisti e degli Assistenti Analisti del Comportamento. ABAIT — Applied Behavior Analysis Italia — promuove il riconoscimento e lo sviluppo delle professioni ABA e ne definisce i requisiti formativi e professionali.',
  },
]

export const notaCertificazioni =
  'Le certificazioni attestano competenze specifiche nell’Analisi del Comportamento Applicata. Non costituiscono Albi o Ordini professionali e si affiancano alla mia abilitazione sanitaria e all’iscrizione all’Albo degli Psicologi.'

/** Titoli di studio e iscrizioni. */
export const qualifiche = [
  'Psicologa iscritta all’Albo degli Psicologi della Regione Siciliana, Sezione A, n. 10600',
  'Analista del Comportamento certificata IBAO® — International Behavior Analysis Organization®, certificazione n. 76933613',
  'Analista del Comportamento (AdC) certificata IACABAI, certificazione n. 1-001-39',
  'Iscritta al registro ABAIT, codice S-2022-00601',
  'Iscritta al registro SIACSA, codice S-2022-00601',
  'Master universitario di II livello in Applied Behavior Analysis e intervento comportamentale precoce per l’autismo',
  'Laurea in Psicologia presso l’Università degli Studi di Palermo',
]

/** Collaborazioni con cooperative e progetti territoriali. */
export const collaborazioni = [
  {
    periodo: 'Dal 2026',
    ente: 'Omnia Società Cooperativa Sociale',
    luogo: 'Sommatino, San Cataldo e Niscemi',
    ruolo: 'Psicologa e Analista del Comportamento',
    testo:
      'Prestazioni specialistiche ABA in piena autonomia tecnica, scientifica e organizzativa: valutazione funzionale, predisposizione e monitoraggio dei programmi d’intervento, interventi comportamentali diretti e parent training.',
  },
  {
    periodo: 'Dall’8 gennaio 2025',
    ente: 'Cooperativa Sociale Zeno Saltini Onlus',
    luogo: 'Caltagirone',
    ruolo: 'Supervisore Analista del Comportamento',
    testo:
      'Progetto avviato dall’ASP di Catania per l’erogazione di interventi ABA-based rivolti a persone con diagnosi di autismo.',
  },
  {
    periodo: 'Dal 17 luglio 2023',
    ente: 'Cooperativa Carpe Diem',
    luogo: 'Gela',
    ruolo: 'Specialista nell’educazione e nella formazione',
    testo:
      'In convenzione con l’ASP di Caltanissetta, nell’ambito dei progetti Diversamente Simili 2.0 e Diversamente Simili 2.0-2: progettazione e supervisione degli interventi per lo sviluppo dell’autonomia personale e sociale.',
  },
]

/**
 * Il libro pubblicato.
 *
 * La descrizione è quella scritta dall'autrice per la scheda del volume, e dice
 * tre cose che il titolo da solo non dice: che è interamente illustrato da lei,
 * che le procedure di insegnamento sono mostrate passo dopo passo e a chi si
 * rivolge. Sono le tre ragioni per cui qualcuno decide di comprarlo.
 *
 * La copertina è l'immagine di prodotto della scheda Amazon, 1000×1294 px.
 *
 * `linkAcquisto` è la forma estesa della scheda, con il titolo nell'indirizzo e
 * l'ASIN B09W1JHMWM che identifica il volume e non cambia mai. Non è il link
 * breve `amzn.eu` con cui la scheda viene condivisa: quello porta in coda un
 * codice di tracciamento della condivisione, che finirebbe nel sorgente della
 * pagina e in ogni clic.
 */
export const pubblicazione = {
  occhiello: 'Il libro',
  autore: 'Carmela Maria Sonia Madonia',
  titolo: 'Interventi comportamentali: come e cosa fare a casa e a scuola',
  dettagli: 'Amazon, 2022 — pubblicazione indipendente',
  copertina: '/copertina-libro.jpg',
  linkAcquisto:
    'https://www.amazon.it/Interventi-Comportamentali-Come-cosa-scuola/dp/B09W1JHMWM',
  paragrafi: [
    'Un manuale interamente illustrato, pensato per rendere chiari e accessibili i principi dell’Analisi del Comportamento Applicata. I contenuti, fondati sulla letteratura scientifica, sono accompagnati da disegni originali realizzati dall’autrice, che illustrano anche le procedure di insegnamento e ne mostrano l’applicazione passo dopo passo.',
    'Il volume è rivolto a famiglie, insegnanti, educatori, psicologi, logopedisti e alle altre figure coinvolte nel percorso educativo del bambino, nei contesti familiare e scolastico.',
  ],
}

/**
 * Domande frequenti.
 *
 * Ogni risposta è un elenco di paragrafi e non una stringa: la risposta
 * sull'ABA oltre l'autismo ne ha tre, e cucirli in un blocco unico renderebbe
 * illeggibile proprio quella più lunga.
 *
 * Le quattro contrassegnate «⌂ sua» sono state scritte dalla dott.ssa e
 * inviate il 5 settembre 2026: si toccano solo con parole sue. Le altre quattro
 * le avevo ricavate io dai suoi contenuti e restano da far approvare prima
 * della pubblicazione — sono le uniche del sito a non venire da un suo testo.
 *
 * L'ordine non è casuale: prima che cos'è la disciplina, poi a chi si rivolge,
 * poi un caso concreto molto cercato, poi dove si lavora e come si comincia.
 *
 * La domanda sulle certificazioni che non equivalgono a un Albo è stata tolta
 * su sua indicazione. La precisazione in sé **non è sparita dal sito**: vive in
 * `notaCertificazioni`, in evidenza sotto le tre certificazioni nella pagina
 * «Chi sono», dove è dovuta per correttezza deontologica. Qui era una seconda
 * copia della stessa cosa.
 */
export const faq = [
  {
    /** ⚠️ Da approvare. */
    domanda: 'Che cos’è l’Analisi del Comportamento Applicata (ABA)?',
    risposta: [
      'È un approccio scientifico allo studio del comportamento che utilizza l’osservazione diretta e la raccolta sistematica dei dati per progettare interventi individualizzati. Gli obiettivi sono osservabili e misurabili, e i risultati vengono verificati sui dati e non su impressioni generali.',
    ],
  },
  {
    /** ⌂ sua */
    domanda:
      'L’ABA è rivolta soltanto alle persone con diagnosi di autismo?',
    risposta: [
      'No. L’Analisi del Comportamento Applicata non è un trattamento riservato all’autismo, ma una disciplina scientifica che studia le relazioni tra comportamento e ambiente.',
      'I suoi principi possono essere applicati anche in presenza di ADHD, sindrome di Down, disabilità intellettiva, ritardi dello sviluppo e altre condizioni, per insegnare nuove competenze, favorire le autonomie e intervenire sui comportamenti che compromettono il benessere e la vita quotidiana.',
      'Come disciplina, l’ABA trova applicazione anche nei settori dell’educazione, della salute, dello sport, della sicurezza sul lavoro, della sostenibilità, della gestione delle organizzazioni e del benessere animale. Nella mia attività professionale mi occupo prevalentemente di autismo e altri disturbi del neurosviluppo.',
    ],
  },
  {
    /** ⌂ sua — sostituisce «Lavora solo con i bambini?» */
    domanda: 'A chi si rivolgono gli interventi?',
    risposta: [
      'Gli interventi sono rivolti a bambini, adolescenti e adulti con diagnosi di autismo o altri disturbi del neurosviluppo. Il mio lavoro comprende anche attività di parent training, consulenza, formazione e supervisione rivolte a genitori e caregiver, insegnanti, Tecnici del Comportamento, educatori e professionisti del territorio, per favorire modalità di intervento condivise nei diversi contesti di vita.',
    ],
  },
  {
    /** ⌂ sua */
    domanda: 'Si occupa anche di selettività alimentare?',
    risposta: [
      'Sì. Mi occupo degli aspetti comportamentali della selettività e delle altre difficoltà alimentari nell’ambito di una presa in carico multidisciplinare. Il percorso considera gli aspetti medici, nutrizionali, sensoriali, oro-motori e relativi alla deglutizione, attraverso la collaborazione con i professionisti competenti del territorio. Il mio intervento comprende osservazione delle routine del pasto, valutazione comportamentale, definizione degli obiettivi, parent training e monitoraggio dei progressi.',
    ],
  },
  {
    /** ⌂ sua */
    domanda: 'Lavora solo a Gela?',
    risposta: [
      'No. Svolgo la mia attività professionale a Gela, Caltagirone, Agrigento, San Cataldo e Sommatino e, su richiesta, anche in altre località della Sicilia. La disponibilità e le modalità di intervento vengono valutate in base al servizio richiesto.',
    ],
  },
  {
    /** ⚠️ Da approvare. */
    domanda: 'Dove si svolgono gli interventi?',
    risposta: [
      'Quando possibile e necessario, nei contesti in cui le abilità o le difficoltà si manifestano: casa, scuola, centro educativo o altri ambienti di vita. Le collaborazioni con le cooperative del territorio permettono inoltre di operare presso i loro spazi.',
    ],
  },
  {
    /** ⚠️ Da approvare. */
    domanda: 'Come inizia un percorso?',
    risposta: [
      'Con un primo colloquio, che serve a comprendere le esigenze della famiglia e a valutare l’appropriatezza della presa in carico. Se si decide di proseguire, viene svolta un’intervista approfondita con i genitori o caregiver per individuare le priorità e definire gli obiettivi.',
    ],
  },
]

/** Titolo e description usati per <title> e meta, pagina per pagina. */
export const seo = {
  home: {
    /**
     * Il titolo della home porta la località, perché è il primo posto in cui
     * Google cerca corrispondenza per una ricerca locale.
     *
     * L'ordine non è casuale: prima il mestiere e la città — che è quello che
     * la gente digita — poi il nome, che serve a chi la cerca già sapendo come
     * si chiama. Sta sotto i 60 caratteri, oltre i quali il titolo viene
     * troncato nei risultati.
     */
    titolo: `Analista del Comportamento ABA a Gela — ${studio.nome}`,
    descrizione:
      'Psicologa e Analista del Comportamento certificata ABA a Gela. Interventi per autismo e disturbi del neurosviluppo, parent training, supervisione.',
  },
  chiSono: {
    titolo: `Chi sono — ${studio.nome}`,
    descrizione:
      'Percorso professionale, certificazioni IBA®, IACABAI e SIACSA/ABAIT, collaborazioni territoriali e pubblicazioni della dott.ssa Sonia Madonia.',
  },
  servizi: {
    titolo: `Servizi — ${studio.nome}`,
    descrizione:
      'Valutazione funzionale, progettazione di interventi ABA, supervisione, parent training, consulenza scolastica, coordinamento di équipe e formazione professionale.',
  },
  contatti: {
    titolo: `Contatti — ${studio.nome}`,
    descrizione:
      'Come richiedere un colloquio, una consulenza, una supervisione o informazioni sui percorsi formativi.',
  },
  privacy: {
    titolo: `Informativa privacy — ${studio.nome}`,
    descrizione: 'Informativa sul trattamento dei dati personali.',
  },
}
