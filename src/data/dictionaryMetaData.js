// meta data for dictionaryData.json
// √ explained: 
// first: written in json file with all parameters
// second: written in intentSchema with all synonyms
// third: randomly tested

// first group: UML general                     (3) -> 3

    // UML                                      √ √
    // OMG                                      √ √
    // Diagrammtyp                              √ √

// second group: UML sichten                    (7) -> 10
    // Sichten                                  √ √ 
    // Statische Sicht                          √ √
    // Dynamische Sicht                         √ √ 
    // Laufzeitschicht                          √ √ 
    // Modellsicht                              √ √ 
    // Meta Modellschicht                       √ √ 
    // Meta-Metamodellschicht                   √ √

// third group: UML diagrams types - general    (3) -> 13

    // Strukturdiagramme                        √ √
    // Verhaltensdiagramme                      √ √
    // Interaktionsdiagramme                    √ √ 

// fourth group: UML diagrams types - narrow    (14) -> 27

    // Profil                                   √ √
    // Klassen                                  √ √
    // Kompositionsstruktur                     √ √
    // Komponenten                              √ √
    // Verteilungs                              √ √
    // Objekt                                   √ √
    // Paket                                    √ √

    // Sequenz                                  √ √
    // Kommunikations                           √ √
    // Interaktionsübersichts                   √ √  
    // Zeitverlauf                              √ √

    // Aktivitäts                               √ √
    // Anwendungsfall                           √ √
    // Zustands                                 √ √

// fifth group: UML diagram general elements    (11) -> 38

    // Rahmen                                   √ √
    // Rahmenkopf                               √ √
    // Modell                                   √ √
    // Kommentar                                √ √
    // Ausdruck                                 √ √
    // Randbedingung                            √ √
    // Classifier                               √ √
    // Datentyp                                 √ √
    // Primitiver Typ                           √ √
    // Aufzählungstyp                           √ √
    // Literal                                  √ √

// sixth group: specific terms for diagrams     (tmp: 45 + 21 + 7) = 73 (+ 38) ->  111 (+ 24) = 135 
    // --- First type: structure diagrams ---
    /* 
    (1) Klassendiagramm             (23)
    // Klasse                                   √ √
    // Abstrakte Klasse                         √ √
    // Compartments                             √ √
    // Objekt                                   √ √
    // Attribut                                 √ √
    // METHODEN METHODEN METHODEN METHODEN !!!!!!
    // Operation                                √ √
    // Interface                                √ √
    // Socket                                   √ √
    // Generalisierung                          √ √
    // Assoziation                              √ √
    // Assoziationsklasse                       √ √
    // Aggregation                              √ √
    // Komposition                              √ √
    // Abhängigkeit                             √ √
    // Verwendungsbeziehung                     √ √
    // Abstraktionsbeziehung                    √ √
                                // DERIVE TRACE REFINE!!!
                                // INKLUSION!!!
                                // Verteilungsbeziehung
    // Substitutionsbeziehung                   √ √
    // Realisierungsbeziehung                   √ √
    // Vererbung                                √ √
    // Informationsfluss                        √ √
    // Informationseinheit                      √ √
    // Multiplizität                            √ √
    // Kardinalität                             √ √      
    // 
    // TODO: Kontrollknoten -> wiki
    */

    /*
    (2) Objektdiagramm              (4)
    // Instanzbeschreibung                      √ √                 
    // Wertangabe                               √ √
    // Link                                     √ √
    // Instanz                                  √ √
    // 
    */

    /*
    (3) Paketdiagramm               (5)
    // Paket                                    √ √
    // Paket-Imort                              √ √
    // Element-Import                           √ √               
    // Paket Merge                              √ √
    // Namensraum                               √ √
    // 
    */

    /*
    (4) Komponentendiagramm         (2)
    // Komponente                               √ √
    // Artefakt                                 √ √
    // 
    */

    /*
    (5) Kompositionsstrukturdiagramm (5)
    // Part                                     √ √
    // Konnektor                                √ √
    // Port                                     √ √
    // Kollaboration                            √ √
    // Kollaborationsanwendung                  √ √
    // 
    */

    /*
    (6) Profildiagramm              (0)
    // ??
    */

    /*
    (7) Verteilungsdiagramm         (6)         
    // Knoten                                   √ √
    // Gerät                                    √ √
    // Ausführungsumgebung                      √ √
    // Kommunikationspfad                       √ √
    // Verteilungsbeziehung                     √ √
    // Einsatzspezifikation                     √ √
    // 
    */
    
    
    // --- Second type: behaviour diagrams ---
    /*
    (1) Use Case Diagramme          (6) 
    // Use Case                                 √ √       
    // System                                   √ √ 
    // Akteur                                   √ √ 
    // include Beziehung                        √ √ 
    // extend Beziehung                         √ √ 
    // Erweiterungspunkt                        √ √ 
    //
    */

    /*
    (2) Zustandsdiagramm            (5)
    // Ereignis                                 √ √
    // Zustand                                  √ √
    // Zustandsübergang                         √ √
    // Startzustand                             √ √
    // Endzustand                               √ √
    */
    /*
    (3) Aktivitätsdiagramm          (10)
    // Aktivität                                √ √
    // Verantwortlichkeitsbereich               √ √
    // Kontrollknoten                           √ √
    // Startknoten                              √ √
    // Endknoten                                √ √
    // Parallelisierungsknoten                  √ √
    // Synchronisationsknoten                   √ √
    // Verzweigungsknoten                       √ √
    // Verbindungsknoten                        √ √
    // Token                                    √ √
    // 
    */

    // --- Third type: interaction diagrams ---
    /*
    (1) Sequenz Diagramme           (5) 
    // Sequenz                                  √ √
    // Nachricht                                √ √
    // Synchrone Nachricht                      √ √
    // Asynchrone Nachricht                     √ √
    // Lebenslinie                              √ √
    //
    */

    /*
    (2) Kommunikationsdiagramm      (2)
    // Sequenzausdruck                          √ √
    // Sequenzterm                              √ √
    //
    */

    /*
    (3) Interaktionsübersicht       (0)
    */

    /*
    (4) Zeitdiagramm                (0)
    */


// last group: big picture                      (18 + 6) -> 24         
    /* Software Engineering         (18)
    // Requirements Engineering                 √ √
    // Objektorientierte Analyse                √ √
    // Designphase                              √ √
    // Software Engineering                     √ √
    // Software Architektur                     √ √
    // Feindesign                               √ √                  
    // Grobdesign                               √ √
    // Anforderung                              √ √
    // Qualitätsanforderungen                   √ √
    // funktionale Anforderungen                √ √
    // Stakeholder                              √ √ 
    // Systemziel                               √ √ 
    // Produktvision                            √ √ 
    // Rahmenbedingungen                        √ √
    // Kontextabgrenzung                        √ √
    // Systemgrenze                             √ √
    // Kontextgrenze                            √ √
    // Kontext                                  √ √   
    //
    */
    /*
    (2) Programming & Object-orientation    (6)    
    // Schleife                                 √ √ 
    // Verzweigung                              √ √
    // Kontrollfluss                            √ √
    // Guard                                    √ √
    // Objektfluss                              √ √
    // Pin                                      √ √
    // Parameter
    // Boolean
    // Integer
    // Real 
    // String
    // Unlimited Natural
    // Sichtbarkeit
    // Rückgabetyp
    //
    */
    
    // TODO: alle Stereotypen: http://www.comelio-medien.com/de/comelio-blog/uml/basis/ -> Stereotypen