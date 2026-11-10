# Raccolta e consultazione dei risultati

Il sito invia automaticamente le risposte completate al foglio Google collegato tramite Apps Script. Il foglio deve restare privato: partecipanti e altri utenti non devono avere accesso al file.

## Dove trovare le risposte

Apri il foglio Google dal tuo account e consulta la scheda **Risposte**. Ogni riga contiene data, quiz, nome, cognome e punteggio; dopo le colonne riassuntive trovi una colonna **Domanda 1**, **Domanda 2** e così via. In ogni cella sono riportati il testo della domanda, la risposta scelta, l'esito e la risposta corretta. La gestione del sito non richiede un codice docente: i risultati si controllano direttamente nel foglio.

Se il foglio contiene già dati salvati con la versione precedente, la colonna JSON **Risposte** viene mantenuta per la cronologia; le nuove risposte per domanda vengono aggiunte nelle colonne successive.

## Configurazione Apps Script

Nel progetto Apps Script collegato al foglio, la proprietà script `SPREADSHEET_ID` deve contenere l'ID del foglio (la parte dell'URL tra `/d/` e `/edit`). La web app deve essere distribuita con **Esegui come: me** e **Chi può accedere: chiunque**, così i partecipanti possono inviare i risultati senza autenticarsi. Il foglio rimane privato.

L'URL della web app è già configurato nel sito. Se viene creato un deployment con URL diverso, il responsabile del sito deve aggiornare l'endpoint e pubblicare una nuova versione del sito. Per modificare il codice Apps Script, pubblicare una nuova versione da **Gestisci deployment** mantenendo lo stesso URL.

Se un invio segnala un problema con il foglio, apri Apps Script, seleziona `testSpreadsheetAccess` e premi **Esegui**. Nei log deve comparire il nome del foglio. Se l'esecuzione fallisce, controlla `SPREADSHEET_ID` e che il proprietario selezionato in **Esegui come** possa modificare il foglio. Per applicare i messaggi d'errore più precisi, copia il `Code.gs` aggiornato e pubblica una nuova versione del deployment.

## Nuovi quiz

Apri la [gestione quiz](https://iisefermi5-sudo.github.io/quiz-fascismo/gestione.html), crea il link condivisibile e invialo ai partecipanti. I link generati prima di un cambio di endpoint devono essere creati di nuovo.

I partecipanti inseriscono nome e cognome e accettano l'informativa prima di iniziare. La raccolta pubblica e le risposte corrette contenute nel link rendono il sistema adatto a quiz didattici informali, non a esami con valutazione vincolante o dati sensibili.
