-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Mag 24, 2021 alle 19:11
-- Versione del server: 10.4.14-MariaDB
-- Versione PHP: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `polofoto`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `acquisto`
--

CREATE TABLE `acquisto` (
  `ID` int(11) NOT NULL,
  `stampa` int(11) DEFAULT NULL,
  `utente` varchar(255) DEFAULT NULL,
  `dataordine` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `acquisto`
--

INSERT INTO `acquisto` (`ID`, `stampa`, `utente`, `dataordine`) VALUES
(35, 2, 'fromeo69', '2021-05-11'),
(112, 3, 'fromeo69', '2021-05-24');

-- --------------------------------------------------------

--
-- Struttura della tabella `carrello`
--

CREATE TABLE `carrello` (
  `ID_CARRELLO` int(11) NOT NULL,
  `stampa` int(11) DEFAULT NULL,
  `utente` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `carrello`
--

INSERT INTO `carrello` (`ID_CARRELLO`, `stampa`, `utente`) VALUES
(100, 2, 'fromeo69');

-- --------------------------------------------------------

--
-- Struttura della tabella `foto`
--

CREATE TABLE `foto` (
  `ID` int(11) NOT NULL,
  `titolo` varchar(255) DEFAULT NULL,
  `data_scatto` date DEFAULT NULL,
  `genere` varchar(255) DEFAULT NULL,
  `fotografo` char(16) DEFAULT NULL,
  `descrizione` varchar(255) DEFAULT NULL,
  `file` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `foto`
--

INSERT INTO `foto` (`ID`, `titolo`, `data_scatto`, `genere`, `fotografo`, `descrizione`, `file`) VALUES
(1, 'Ponte Delle Catene', '2016-12-06', 'paesaggitica', 'FFFFFF00X00ZZZZY', '...', '../immagini/Tusa-Castello.png'),
(2, 'Arco Via Lattea', '2020-07-21', 'paesaggistica', 'GGGGGG00X00ZZZZY', '...', '../immagini/Tusa-Lampare.jpg'),
(3, 'Neowise', '2020-07-02', 'paesaggistica', 'IIIIII00X00ZZZZY', '...', '../immagini/Tusa-Panoramica.jpg'),
(4, 'Ombre', '2015-10-30', 'ritrattistica', 'LLLLLL00X00ZZZZY', '...', '../immagini/Londra-Banda.jpg'),
(5, 'Luci', '2017-06-23', 'ritrattistica', 'MMMMMM00X00ZZZZY', '...', '../immagini/Paola.jpg'),
(6, 'Ombre', '2019-12-14', 'ritrattistica', 'MMMMMM00X00ZZZZY', '...', '../immagini/venice.jpg'),
(7, 'MOSE', '2020-08-20', 'reportage', 'NNNNNN00X00ZZZZY', '...', '../immagini/venicce3.jpg'),
(8, 'Napoli', '2020-10-24', 'reportage', 'RRRRRR00X00ZZZZY', '...', '../immagini/venice4.jpg');

-- --------------------------------------------------------

--
-- Struttura della tabella `fotografo`
--

CREATE TABLE `fotografo` (
  `CF` char(16) NOT NULL,
  `nome` varchar(255) DEFAULT NULL,
  `cognome` varchar(255) DEFAULT NULL,
  `citta` varchar(255) DEFAULT NULL,
  `data_nascita` date DEFAULT NULL,
  `eta` int(11) DEFAULT NULL,
  `data_inizio` date DEFAULT NULL,
  `negozio` int(11) DEFAULT NULL,
  `propic` varchar(255) DEFAULT NULL,
  `playlist` varchar(255) DEFAULT NULL,
  `facebook` varchar(255) DEFAULT NULL,
  `instagram` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `fotografo`
--

INSERT INTO `fotografo` (`CF`, `nome`, `cognome`, `citta`, `data_nascita`, `eta`, `data_inizio`, `negozio`, `propic`, `playlist`, `facebook`, `instagram`) VALUES
('FFFFFF00X00ZZZZY', 'Federica', 'Foti', 'Catania', '1993-09-23', 27, '2014-10-12', 1, '../immagini/Federica.jpg', '0Ie5X3JS6BrLSWKrRm310H', NULL, NULL),
('GGGGGG00X00ZZZZY', 'Giorgio', 'Grasso', 'Catania', '2001-12-31', 19, '2020-12-14', 1, '../immagini/Giorgio.jpg', '7xmpNYZ15D6b43BHzYQCLt', NULL, NULL),
('IIIIII00X00ZZZZY', 'Isabella', 'Iacopino', 'Firenze', '1987-06-04', 33, '1999-10-30', 1, '../immagini/Isabella.jpg', '77856kp4bvCDF4sQ2SOV4X', NULL, NULL),
('LLLLLL00X00ZZZZY', 'Luca', 'Lombardo', 'Catania', '1996-04-22', 25, '2015-08-23', 1, '../immagini/Luca.jpg', '5YwYJReJeBLZc2qRC0VF5H', NULL, NULL),
('MMMMMM00X00ZZZZY', 'Miriam', 'Monti', 'Catania', '1995-01-02', 26, '2012-09-20', 1, '../immagini/Miriam.jpg', '5Xeez4I9oT530S67fQeerM', NULL, NULL),
('NNNNNN00X00ZZZZY', 'Nicola', 'Nelli', 'Venezia', '1984-12-21', 36, '1995-07-12', 1, '../immagini/Nicola.jpg', '37i9dQZF1DX4o1oenSJRJd', NULL, NULL),
('RRRRRR00X00ZZZZY', 'Roberta', 'Resti', 'Catania', '2002-06-19', 18, '2019-12-11', 1, '../immagini/Roberta.jpg', '37i9dQZF1DWU13kKnk03AP', NULL, NULL),
('SSSSSS00X00ZZZZY', 'Salvo', 'Storti', 'Catania', '1954-11-11', 66, '2019-08-04', 1, '../immagini/Salvo.jpg', '1Pz21cQ5rXflabr5O9upF4', NULL, NULL);

--
-- Trigger `fotografo`
--
DELIMITER $$
CREATE TRIGGER `min_eta` BEFORE INSERT ON `fotografo` FOR EACH ROW begin 
if exists(select * from fotografo where new.eta<18) 
then signal sqlstate '45000' set message_text='Il fotografo deve avere almeno 18 anni';
end if;
end
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `numero_fotografi_delete` AFTER DELETE ON `fotografo` FOR EACH ROW begin 
if exists (select * from negozio where codice=old.negozio)
then update negozio set numero_fotografi=numero_fotografi-1
where codice=old.negozio;
else signal sqlstate '45000'set message_text='Il negozio non esiste';
end if;
end
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `numero_fotografi_insert` AFTER INSERT ON `fotografo` FOR EACH ROW begin 
if exists (select * from negozio where codice=new.negozio)
then update negozio set numero_fotografi=numero_fotografi+1
where codice=new.negozio;
else signal sqlstate '45000'set message_text='Il negozio non esiste';
end if;
end
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `set_eta` BEFORE INSERT ON `fotografo` FOR EACH ROW begin 
if not exists(select * from fotografo where cf=new.cf) then
set new.eta =timestampdiff(year, new.data_nascita, current_Date);
else signal sqlstate '45000' set message_text='La persona inserita esiste già';
end if;
end
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Struttura della tabella `negozio`
--

CREATE TABLE `negozio` (
  `codice` int(11) NOT NULL,
  `nomeNegozio` varchar(255) DEFAULT NULL,
  `numero_fotografi` int(11) DEFAULT NULL,
  `indirizzo` varchar(255) DEFAULT 'Piazza San Marco',
  `proprietario` char(16) DEFAULT NULL,
  `latitudine` float DEFAULT 45.4341,
  `longitudine` float DEFAULT 12.3392,
  `numCiv` varchar(255) DEFAULT '12',
  `citta` varchar(255) DEFAULT 'Venezia',
  `email` varchar(255) DEFAULT NULL,
  `prov` char(2) DEFAULT 'VE',
  `telefono` varchar(255) DEFAULT '+39 041 522 8387'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `negozio`
--

INSERT INTO `negozio` (`codice`, `nomeNegozio`, `numero_fotografi`, `indirizzo`, `proprietario`, `latitudine`, `longitudine`, `numCiv`, `citta`, `email`, `prov`, `telefono`) VALUES
(1, 'Polo Foto', 8, 'Piazza San Marco', 'EEEEEE00X00ZZZZY', 45.4341, 12.3392, '12', 'Venezia', 'info@polofoto.it', 'VE', '+39 041 522 8387');

-- --------------------------------------------------------

--
-- Struttura della tabella `proprietario`
--

CREATE TABLE `proprietario` (
  `username` varchar(255) NOT NULL,
  `nome` varchar(255) DEFAULT NULL,
  `cognome` varchar(255) DEFAULT NULL,
  `citta` varchar(255) DEFAULT NULL,
  `data_nascita` date DEFAULT NULL,
  `propic` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `proprietario`
--

INSERT INTO `proprietario` (`username`, `nome`, `cognome`, `citta`, `data_nascita`, `propic`) VALUES
('EEEEEE00X00ZZZZY', 'Elia', 'Episcopo', 'Venezia', '1994-03-15', 'immagini/Elia.jpg');

-- --------------------------------------------------------

--
-- Struttura della tabella `recensione`
--

CREATE TABLE `recensione` (
  `id` int(11) NOT NULL,
  `voto` int(11) DEFAULT NULL,
  `testo` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `recensione`
--

INSERT INTO `recensione` (`id`, `voto`, `testo`) VALUES
(36, 5, 'Ottima qualità di stampa');

-- --------------------------------------------------------

--
-- Struttura della tabella `salvato`
--

CREATE TABLE `salvato` (
  `ID_PREF` int(11) NOT NULL,
  `stampa` int(11) DEFAULT NULL,
  `utente` varchar(255) DEFAULT NULL,
  `datasalvataggio` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `salvato`
--

INSERT INTO `salvato` (`ID_PREF`, `stampa`, `utente`, `datasalvataggio`) VALUES
(77, 11, 'fromeo69', '2021-05-14'),
(87, 4, 'EEEEEE00X00ZZZZY', '2021-05-22'),
(88, 2, 'fromeo69', '2021-05-24');

-- --------------------------------------------------------

--
-- Struttura della tabella `stampa`
--

CREATE TABLE `stampa` (
  `ID` int(11) NOT NULL,
  `foto` int(11) DEFAULT NULL,
  `prezzo` float DEFAULT NULL,
  `altezza` int(11) DEFAULT NULL,
  `larghezza` int(11) DEFAULT NULL,
  `materiale` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `stampa`
--

INSERT INTO `stampa` (`ID`, `foto`, `prezzo`, `altezza`, `larghezza`, `materiale`) VALUES
(1, 1, 23, 30, 60, 'Carta Lucida'),
(2, 1, 54, 30, 60, 'Alluminio'),
(3, 2, 14, 30, 60, 'Carta Opaca'),
(4, 3, 67, 30, 60, 'Alluminio'),
(5, 4, 10, 30, 60, 'Carta Opaca'),
(6, 5, 36, 30, 60, 'Alluminio'),
(7, 6, 11, 30, 60, 'Carta Lucida'),
(8, 7, 18, 30, 60, 'Carta Opaca'),
(9, 8, 56, 30, 60, 'Alluminio'),
(11, 1, 50, 60, 140, 'Carta Opaca');

-- --------------------------------------------------------

--
-- Struttura della tabella `supporto`
--

CREATE TABLE `supporto` (
  `acquisto` int(11) DEFAULT NULL,
  `recensione` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `supporto`
--

INSERT INTO `supporto` (`acquisto`, `recensione`) VALUES
(112, 36);

-- --------------------------------------------------------

--
-- Struttura della tabella `utente`
--

CREATE TABLE `utente` (
  `nome` varchar(255) DEFAULT NULL,
  `cognome` varchar(255) DEFAULT NULL,
  `datanascita` date DEFAULT NULL,
  `citta` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `pswd` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `utente`
--

INSERT INTO `utente` (`nome`, `cognome`, `datanascita`, `citta`, `email`, `username`, `pswd`) VALUES
('Alberto', 'Zacco', '1999-08-30', 'Augusta', 'albertuccio02@gmail.com', 'albertuccio', '$2y$10$KP7UPWYu6MbP80WOV8Vo/e2i54j/nsQO41C/yUKb1uOhGc7kUQBwa'),
('Elia', 'Episcopo', '1994-03-15', 'Venezia', 'eliaepiscopo@gmail.com', 'EEEEEE00X00ZZZZY', '$2y$10$Yker3B0HsLc03AKroKaBl.tkpwJ6S.DdYNDqHQ0BZXJhzD88QFOxG'),
('Francesco', 'Romeo', '1999-11-02', 'Catania', 'fraromeo69@gmail.com', 'fromeo69', '$2y$10$rASPX1I1Gxqz0SAW43HuN.c559mURJOK6d5x72B56HrfHWWwTHhoO'),
('Giulia', 'Pulvirenti', '1999-10-30', 'Catania', 'giuliapulvirentihp99@gmail.com', 'giulipulvi22', '$2y$10$YDwerDoJ364Sko3decp0NuPFpfTOVEtABgYw7CC4Q4A2pNAu/SMBK');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `acquisto`
--
ALTER TABLE `acquisto`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `st` (`stampa`),
  ADD KEY `us` (`utente`);

--
-- Indici per le tabelle `carrello`
--
ALTER TABLE `carrello`
  ADD PRIMARY KEY (`ID_CARRELLO`),
  ADD KEY `st` (`stampa`),
  ADD KEY `us` (`utente`);

--
-- Indici per le tabelle `foto`
--
ALTER TABLE `foto`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ft1` (`fotografo`);

--
-- Indici per le tabelle `fotografo`
--
ALTER TABLE `fotografo`
  ADD PRIMARY KEY (`CF`),
  ADD KEY `nego` (`negozio`);

--
-- Indici per le tabelle `negozio`
--
ALTER TABLE `negozio`
  ADD PRIMARY KEY (`codice`),
  ADD KEY `pro` (`proprietario`);

--
-- Indici per le tabelle `proprietario`
--
ALTER TABLE `proprietario`
  ADD PRIMARY KEY (`username`);

--
-- Indici per le tabelle `recensione`
--
ALTER TABLE `recensione`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `salvato`
--
ALTER TABLE `salvato`
  ADD PRIMARY KEY (`ID_PREF`),
  ADD KEY `st` (`stampa`),
  ADD KEY `us` (`utente`);

--
-- Indici per le tabelle `stampa`
--
ALTER TABLE `stampa`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ft1` (`foto`);

--
-- Indici per le tabelle `supporto`
--
ALTER TABLE `supporto`
  ADD PRIMARY KEY (`recensione`),
  ADD KEY `ac` (`acquisto`),
  ADD KEY `re` (`recensione`);

--
-- Indici per le tabelle `utente`
--
ALTER TABLE `utente`
  ADD PRIMARY KEY (`username`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `acquisto`
--
ALTER TABLE `acquisto`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=113;

--
-- AUTO_INCREMENT per la tabella `carrello`
--
ALTER TABLE `carrello`
  MODIFY `ID_CARRELLO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=102;

--
-- AUTO_INCREMENT per la tabella `foto`
--
ALTER TABLE `foto`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT per la tabella `negozio`
--
ALTER TABLE `negozio`
  MODIFY `codice` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT per la tabella `recensione`
--
ALTER TABLE `recensione`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT per la tabella `salvato`
--
ALTER TABLE `salvato`
  MODIFY `ID_PREF` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- AUTO_INCREMENT per la tabella `stampa`
--
ALTER TABLE `stampa`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `acquisto`
--
ALTER TABLE `acquisto`
  ADD CONSTRAINT `acquisto_ibfk_1` FOREIGN KEY (`stampa`) REFERENCES `stampa` (`ID`),
  ADD CONSTRAINT `acquisto_ibfk_2` FOREIGN KEY (`utente`) REFERENCES `utente` (`username`);

--
-- Limiti per la tabella `carrello`
--
ALTER TABLE `carrello`
  ADD CONSTRAINT `carrello_ibfk_1` FOREIGN KEY (`stampa`) REFERENCES `stampa` (`ID`),
  ADD CONSTRAINT `carrello_ibfk_2` FOREIGN KEY (`utente`) REFERENCES `utente` (`username`);

--
-- Limiti per la tabella `foto`
--
ALTER TABLE `foto`
  ADD CONSTRAINT `foto_ibfk_1` FOREIGN KEY (`fotografo`) REFERENCES `fotografo` (`CF`);

--
-- Limiti per la tabella `fotografo`
--
ALTER TABLE `fotografo`
  ADD CONSTRAINT `fotografo_ibfk_1` FOREIGN KEY (`negozio`) REFERENCES `negozio` (`codice`);

--
-- Limiti per la tabella `negozio`
--
ALTER TABLE `negozio`
  ADD CONSTRAINT `negozio_ibfk_1` FOREIGN KEY (`proprietario`) REFERENCES `proprietario` (`username`);

--
-- Limiti per la tabella `salvato`
--
ALTER TABLE `salvato`
  ADD CONSTRAINT `salvato_ibfk_1` FOREIGN KEY (`stampa`) REFERENCES `stampa` (`ID`),
  ADD CONSTRAINT `salvato_ibfk_2` FOREIGN KEY (`utente`) REFERENCES `utente` (`username`);

--
-- Limiti per la tabella `stampa`
--
ALTER TABLE `stampa`
  ADD CONSTRAINT `stampa_ibfk_1` FOREIGN KEY (`foto`) REFERENCES `foto` (`ID`);

--
-- Limiti per la tabella `supporto`
--
ALTER TABLE `supporto`
  ADD CONSTRAINT `supporto_ibfk_1` FOREIGN KEY (`acquisto`) REFERENCES `acquisto` (`ID`),
  ADD CONSTRAINT `supporto_ibfk_2` FOREIGN KEY (`recensione`) REFERENCES `recensione` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
