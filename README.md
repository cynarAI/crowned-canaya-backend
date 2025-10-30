# 👑 Crowned by Canaya - Backend (Strapi CMS)

**Strapi 5.8.0 Headless CMS für die Crowned by Canaya Perücken-Website**

[![Strapi](https://img.shields.io/badge/Strapi-5.8.0-blueviolet)](https://strapi.io)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Railway-blue)](https://railway.app)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-green)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org)

---

## 🎯 Übersicht

Dieses Backend ist ein **Strapi 5 Headless CMS**, das die Content-Verwaltung für die Crowned by Canaya Website bereitstellt. Es läuft auf **Railway** mit einer **PostgreSQL-Datenbank** und ist unter **https://api.aistronaut.io** erreichbar.

### Hauptfunktionen:
- ✅ **Perücken-Konfigurator API**: Basis-Typen, Haar-Qualität, Stile, Extras, Pflegeprodukte
- ✅ **Content Management**: Vollständige Verwaltung über Strapi Admin-Panel
- ✅ **RESTful API**: Automatisch generierte API-Endpunkte
- ✅ **PostgreSQL**: Produktions-Datenbank auf Railway
- ✅ **CORS konfiguriert**: Sichere Cross-Origin-Requests
- ✅ **Auto-Deploy**: Automatisches Deployment bei Git-Push

---

## 🚀 Live-URLs

- **API-Basis-URL**: https://api.aistronaut.io/api
- **Admin-Panel**: https://api.aistronaut.io/admin
- **Health Check**: https://api.aistronaut.io/_health

---

## 📦 Installation & Setup

### Voraussetzungen
- Node.js 20.x oder höher
- npm oder yarn
- PostgreSQL (lokal oder Railway)

### Lokale Installation

```bash
# Repository klonen
git clone https://github.com/cynarAI/crowned-canaya-backend.git
cd crowned-canaya-backend/backend

# Dependencies installieren
npm install

# Environment Variables konfigurieren
cp .env.example .env
# .env bearbeiten und Datenbank-Credentials eintragen

# Datenbank initialisieren
npm run strapi build

# Development-Server starten
npm run develop
```

Der Admin-Panel ist dann unter **http://localhost:1337/admin** erreichbar.

---

## 🔧 Verfügbare Scripts

```bash
# Development-Modus (mit Auto-Reload)
npm run develop

# Production-Build
npm run build

# Production-Start
npm start

# Strapi-Konsole
npm run strapi
```

---

## 📊 Content-Types (API-Endpunkte)

### 1. Base Type (Basis-Typ)
**Endpunkt**: `GET /api/base-types`

Perücken-Basis-Typen wie Lace Front, Full Cap, etc.

**Felder:**
- `name` (String): Name des Basis-Typs
- `description` (Text): Beschreibung
- `price` (Number): Preis in Euro
- `popular` (Boolean): Beliebtes Produkt?

**Beispiel:**
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "name": "Lace Front Luxus (HD-Lace)",
        "description": "Unsichtbarer Haaransatz, maximaler Realismus",
        "price": 220,
        "popular": true
      }
    }
  ]
}
```

### 2. Hair Quality (Haar-Qualität)
**Endpunkt**: `GET /api/hair-qualities`

Haar-Qualitäten wie Echthaar Premium, Synthetisch, etc.

**Felder:**
- `name` (String): Name der Haar-Qualität
- `description` (Text): Beschreibung
- `price` (Number): Aufpreis in Euro
- `popular` (Boolean): Beliebt?

### 3. Style (Stil)
**Endpunkt**: `GET /api/styles`

Haar-Stile wie Glatt, Lockig, Wellig, etc.

**Felder:**
- `name` (String): Name des Stils
- `description` (Text): Beschreibung
- `price` (Number): Aufpreis in Euro
- `popular` (Boolean): Beliebt?

### 4. Extra (Extras)
**Endpunkt**: `GET /api/extras`

Zusätzliche Optionen wie Highlights, Ombre, etc.

**Felder:**
- `name` (String): Name des Extras
- `description` (Text): Beschreibung
- `price` (Number): Aufpreis in Euro
- `popular` (Boolean): Beliebt?

### 5. Care Product (Pflegeprodukt)
**Endpunkt**: `GET /api/care-products`

Pflegeprodukte für Perücken.

**Felder:**
- `name` (String): Produktname
- `description` (Text): Beschreibung
- `price` (Number): Preis in Euro
- `popular` (Boolean): Beliebt?

---

## 🔐 Environment Variables

### Erforderliche Variablen (.env)

```env
# Server
HOST=0.0.0.0
PORT=1337
NODE_ENV=production

# App Keys (für Session-Verschlüsselung)
APP_KEYS=your-app-key-1,your-app-key-2

# Secrets
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
TRANSFER_TOKEN_SALT=your-transfer-token-salt
JWT_SECRET=your-jwt-secret

# Database (PostgreSQL)
DATABASE_CLIENT=postgres
DATABASE_URL=postgresql://user:password@host:port/database

# Optional: Lokale Datenbank
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=strapi_canaya
DATABASE_USERNAME=strapi_user
DATABASE_PASSWORD=your-password
DATABASE_SSL=false
```

### Secrets generieren

```bash
# Neue Secrets generieren
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

## 🗄️ Datenbank-Konfiguration

### PostgreSQL (Railway - Production)

Die Produktions-Datenbank läuft auf Railway und wird automatisch über die `DATABASE_URL` Environment Variable verbunden.

**Konfiguration** (`config/database.ts`):
```typescript
export default ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      connectionString: env('DATABASE_URL'),
      ssl: env.bool('DATABASE_SSL', false) && {
        rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false),
      },
    },
    debug: false,
  },
});
```

### SQLite (Development - Optional)

Für lokale Entwicklung kann auch SQLite verwendet werden:

```env
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
```

---

## 🔒 CORS-Konfiguration

CORS ist für die Frontend-Domain konfiguriert (`config/middlewares.ts`):

```typescript
{
  name: 'strapi::cors',
  config: {
    enabled: true,
    origin: [
      'https://crownedbycanaya.netlify.app',
      'http://localhost:5173'
    ],
    credentials: true,
  },
}
```

**Erlaubte Origins:**
- Production: `https://crownedbycanaya.netlify.app`
- Development: `http://localhost:5173`

---

## 🚀 Deployment (Railway)

### Automatisches Deployment

1. **Code ändern** und committen
2. **Git push** zu GitHub
3. **Railway** erkennt automatisch den Push
4. **Build** wird automatisch gestartet
5. **Deploy** erfolgt automatisch bei erfolgreichem Build

### Manuelle Deployment-Schritte

```bash
# 1. Änderungen committen
git add .
git commit -m "Update: Beschreibung"

# 2. Zu GitHub pushen
git push origin main

# 3. Railway deployed automatisch!
```

### Railway-Konfiguration

**Build Command:**
```bash
npm install && npm run build
```

**Start Command:**
```bash
npm start
```

**Environment Variables:**
- Alle `.env` Variablen müssen in Railway Dashboard gesetzt werden
- `DATABASE_URL` wird automatisch von Railway bereitgestellt

---

## 📝 Content Management

### Admin-Panel Zugriff

1. Gehe zu **https://api.aistronaut.io/admin**
2. **Erstelle einen Admin-Account** (beim ersten Besuch)
3. **Logge dich ein**

### Content erstellen

1. **Content-Type auswählen** (z.B. "Base Type")
2. **"Create new entry"** klicken
3. **Felder ausfüllen**:
   - Name
   - Description
   - Price
   - Popular (Checkbox)
4. **"Save"** klicken
5. **"Publish"** klicken (wichtig!)

### API-Zugriff konfigurieren

1. **Settings** → **Roles** → **Public**
2. **Permissions** für jeden Content-Type aktivieren:
   - ✅ `find` (Liste abrufen)
   - ✅ `findOne` (Einzelnen Eintrag abrufen)
3. **Save** klicken

---

## 🧪 API-Tests

### Mit curl

```bash
# Base Types abrufen
curl https://api.aistronaut.io/api/base-types

# Hair Qualities abrufen
curl https://api.aistronaut.io/api/hair-qualities

# Einzelnen Eintrag abrufen
curl https://api.aistronaut.io/api/base-types/1
```

### Mit Browser

Öffne einfach die URLs im Browser:
- https://api.aistronaut.io/api/base-types
- https://api.aistronaut.io/api/hair-qualities
- https://api.aistronaut.io/api/styles
- https://api.aistronaut.io/api/extras
- https://api.aistronaut.io/api/care-products

---

## 🔧 Wartung & Updates

### Dependencies aktualisieren

```bash
# Alle Dependencies aktualisieren
npm update

# Sicherheitsupdates
npm audit fix

# Strapi aktualisieren
npm install @strapi/strapi@latest
```

### Datenbank-Backup

```bash
# PostgreSQL Backup (Railway)
# Über Railway Dashboard → Database → Backups
```

### Logs anzeigen

```bash
# Railway Dashboard → Deployments → Logs
```

---

## 🐛 Troubleshooting

### Problem: "Database connection error"
**Lösung:** Überprüfe `DATABASE_URL` in Railway Environment Variables

### Problem: "CORS error"
**Lösung:** Überprüfe `config/middlewares.ts` und stelle sicher, dass die Frontend-URL in der `origin`-Liste ist

### Problem: "API returns empty data"
**Lösung:** 
1. Überprüfe, ob Content im Admin-Panel **veröffentlicht** ist
2. Überprüfe Permissions unter Settings → Roles → Public

### Problem: "Build fails on Railway"
**Lösung:** 
1. Überprüfe Node.js Version (sollte 20.x sein)
2. Überprüfe `package.json` Scripts
3. Überprüfe Railway Build Logs

---

## 📚 Weitere Ressourcen

- **Strapi Dokumentation**: https://docs.strapi.io
- **Railway Dokumentation**: https://docs.railway.app
- **PostgreSQL Dokumentation**: https://www.postgresql.org/docs
- **Frontend Repository**: https://github.com/cynarAI/crownedbycanaya

---

## 🤝 Support

Bei Fragen oder Problemen:
1. Überprüfe die Logs in Railway Dashboard
2. Überprüfe die Strapi-Dokumentation
3. Kontaktiere den Entwickler

---

## 📄 Lizenz

Dieses Projekt ist proprietär und gehört zu Crowned by Canaya.

---

**Erstellt am:** 30. Oktober 2025
**Version:** 1.0.0
**Strapi Version:** 5.8.0
