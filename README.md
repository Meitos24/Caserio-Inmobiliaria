# 🏠 Caserio Boutique Inmobiliaria

## 🏗️ Estructura del Proyecto

\`\`\`
CASERIO/
├── backend/          # API Django REST Framework
├── frontend/         # Aplicación Next.js
├── .gitignore
└── README.md
\`\`\`

## 🚀 Instalación

### Backend (Django)
\`\`\`bash
cd backend
python -m venv venv
source venv/bin/activate  # En Windows: venv\\Scripts\\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
\`\`\`

### Frontend (Next.js)
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

## 🔧 Tecnologías

- **Backend**: Django 5.x, Django REST Framework
- **Frontend**: Next.js 14, React, Tailwind CSS
- **Base de datos**: PostgreSQL / SQLite

## 📦 Variables de Entorno

### Backend (.env en /backend)
\`\`\`
SECRET_KEY=tu-secret-key
DEBUG=True
DATABASE_URL=postgresql://...
\`\`\`

### Frontend (.env.local en /frontend)
\`\`\`
NEXT_PUBLIC_API_URL=http://localhost:8000
\`\`\`

