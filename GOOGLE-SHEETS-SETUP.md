# Configurare la raccolta dei risultati

GitHub Pages ospita il sito, ma non può salvare risposte. Per raccoglierle serve collegare un Google Sheet tramite Apps Script.

## 1. Crea il foglio privato

1. Crea un nuovo foglio in Google Sheets con il tuo account.
2. Non condividere il foglio con i partecipanti: deve rimanere privato.
3. Dal foglio apri **Estensioni > Apps Script**.
4. Sostituisci il contenuto di `Code.gs` con quello di [`google-apps-script/Code.gs`](./google-apps-script/Code.gs) e salva.
5. Copia l'ID del foglio dall'URL: è la parte tra `/d/` e `/edit` (ad esempio `https://docs.google.com/spreadsheets/d/ID_DEL_FOGLIO/edit`).

Lo script crea automaticamente una scheda `Risposte` al primo invio.

## 2. Imposta il codice docente

1. In Apps Script apri **Impostazioni progetto**.
2. Nella sezione **Proprietà script**, aggiungi:
   - Proprietà: `ADMIN_TOKEN`
   - Valore: una password casuale lunga almeno 32 caratteri.
3. Aggiungi anche:
   - Proprietà: `SPREADSHEET_ID`
   - Valore: l'ID copiato dall'URL del foglio.
4. Non inserire il codice docente nel sito, nel repository o nei link dei quiz.

Conservalo in un gestore password: servirà per consultare i risultati.

## 3. Pubblica la web app

1. In Apps Script seleziona **Esegui il deployment > Nuovo deployment**.
2. Scegli il tipo **App web**.
3. Imposta **Esegui come: me** e **Chi può accedere: chiunque**. L'accesso pubblico è necessario perché i partecipanti non devono autenticarsi per inviare le risposte.
4. Premi **Esegui il deployment**, autorizza lo script e copia l'URL che termina in `/exec`.
5. Apri l'URL `/exec` in una scheda del browser: deve mostrare `Endpoint quiz attivo`. Se modifichi il codice Apps Script in seguito, vai in **Gestisci deployment > Modifica**, seleziona **Nuova versione** e distribuisci l'aggiornamento mantenendo lo stesso URL.

Il foglio resta privato e il codice docente è necessario per leggere i risultati. La web app accetta invii pubblici: usala per quiz a basso rischio, non per esami o dati sensibili. I contenuti e le risposte corrette nel link non sono protetti da manomissioni.

## 4. Collega il sito

1. Apri la [gestione quiz](https://iisefermi5-sudo.github.io/quiz-fascismo/gestione.html).
2. Incolla l'URL `/exec` e premi **Salva URL**.
3. Seleziona un quiz e premi **Crea link condivisibile**.
4. Invia il nuovo link ai partecipanti. I link creati prima di collegare Apps Script non inviano risposte.
5. Per vedere i risultati, seleziona lo stesso quiz, inserisci il `ADMIN_TOKEN` e premi **Mostra risposte**. Il codice non viene salvato dal browser.

I partecipanti inseriscono nome e cognome e devono accettare l'informativa prima di iniziare. Il foglio registra data, quiz, punteggio e risposta data a ogni domanda.
