# Crowned by Canaya - Backend Deployment Guide

## Deployment auf Render.com

### Schritt 1: GitHub Repository erstellen

Das Backend muss in einem GitHub Repository gehostet werden, damit Render darauf zugreifen kann.

```bash
cd /home/ubuntu/crowned-canaya-backend/backend
git remote add origin https://github.com/[USERNAME]/crowned-canaya-backend.git
git push -u origin main
```

### Schritt 2: Render Account erstellen

1. Gehe zu https://render.com
2. Registriere dich mit deinem GitHub Account
3. Verbinde dein GitHub Repository

### Schritt 3: PostgreSQL Datenbank erstellen

1. In Render Dashboard: "New" → "PostgreSQL"
2. Name: `crowned-canaya-db`
3. Region: Frankfurt (oder näher zu deinem Standort)
4. Plan: Free
5. Erstellen und auf "Available" warten

### Schritt 4: Web Service erstellen

1. In Render Dashboard: "New" → "Web Service"
2. Repository auswählen: `crowned-canaya-backend`
3. Einstellungen:
   - Name: `crowned-canaya-backend`
   - Region: Frankfurt
   - Branch: `main`
   - Root Directory: (leer lassen)
   - Environment: `Node`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run start`
   - Plan: Free

### Schritt 5: Environment Variables konfigurieren

Füge folgende Umgebungsvariablen hinzu:

```
NODE_VERSION=22.13.0
NODE_ENV=production
DATABASE_CLIENT=postgres
DATABASE_URL=[Aus PostgreSQL Datenbank kopieren - Internal Database URL]
DATABASE_SSL=true
HOST=0.0.0.0
PORT=10000
ADMIN_JWT_SECRET=[Generieren mit: openssl rand -base64 32]
API_TOKEN_SALT=[Generieren mit: openssl rand -base64 32]
TRANSFER_TOKEN_SALT=[Generieren mit: openssl rand -base64 32]
JWT_SECRET=[Generieren mit: openssl rand -base64 32]
APP_KEYS=[Generieren mit: openssl rand -base64 32,openssl rand -base64 32]
ENCRYPTION_KEY=[Generieren mit: openssl rand -base64 32]
```

### Schritt 6: Deployment starten

1. Klicke auf "Create Web Service"
2. Render wird automatisch bauen und deployen
3. Nach erfolgreichem Deployment erhältst du eine URL wie: `https://crowned-canaya-backend.onrender.com`

### Schritt 7: Admin-User erstellen

1. Öffne `https://crowned-canaya-backend.onrender.com/admin`
2. Erstelle den ersten Administrator-Account für Canaya

### Schritt 8: API-Berechtigungen konfigurieren

1. Im Strapi Admin: Settings → Users & Permissions Plugin → Roles → Public
2. Aktiviere folgende Berechtigungen:
   - **Produkt**: `find`, `findOne`
   - **Blog-Post**: `find`, `findOne`
   - **Galerie-Bild**: `find`, `findOne`
   - **Kundenbewertung**: `find`, `findOne`
   - **Startseite**: `find`
3. Speichern

## Wichtige URLs nach Deployment

- **Admin Panel**: `https://crowned-canaya-backend.onrender.com/admin`
- **API Basis-URL**: `https://crowned-canaya-backend.onrender.com/api`
- **Produkte API**: `https://crowned-canaya-backend.onrender.com/api/produkte`
- **Blog Posts API**: `https://crowned-canaya-backend.onrender.com/api/blog-posts`

## Secrets generieren (für lokale Entwicklung)

```bash
# APP_KEYS (4 Keys, komma-getrennt)
openssl rand -base64 32
openssl rand -base64 32
openssl rand -base64 32
openssl rand -base64 32

# ADMIN_JWT_SECRET
openssl rand -base64 32

# API_TOKEN_SALT
openssl rand -base64 32

# TRANSFER_TOKEN_SALT
openssl rand -base64 32

# JWT_SECRET
openssl rand -base64 32

# ENCRYPTION_KEY
openssl rand -base64 32
```

## Hinweis zu Free Plan

Der kostenlose Plan von Render hat folgende Einschränkungen:
- Service schläft nach 15 Minuten Inaktivität ein
- Erste Anfrage nach dem Aufwachen dauert ~30 Sekunden
- 750 Stunden pro Monat (ausreichend für ein Projekt)
- PostgreSQL: 90 Tage Datenspeicherung, dann automatische Löschung

Für Produktion wird ein kostenpflichtiger Plan empfohlen (ab $7/Monat).
