# Django + React Full Stack Project

A full-stack web application built with Django REST Framework backend and React frontend.

## Project Structure

```
Khamenei/
├── backend/                 # Django backend
│   ├── config/             # Django project configuration
│   │   ├── settings.py     # Django settings with REST framework & CORS
│   │   ├── urls.py         # Main URL configuration
│   │   └── ...
│   ├── api/                # API application
│   │   ├── views.py        # API endpoints
│   │   ├── urls.py         # API URL routes
│   │   └── ...
│   ├── manage.py           # Django management script
│   └── requirements.txt    # Python dependencies
│
├── frontend/               # React frontend
│   ├── src/
│   │   ├── App.jsx         # Main React component
│   │   ├── main.jsx        # Entry point
│   │   └── ...
│   ├── package.json        # Node.js dependencies
│   └── vite.config.js      # Vite configuration
│
└── README.md              # This file
```

## Features

- ✅ Django REST API with CORS support
- ✅ React frontend with Vite
- ✅ API proxy configuration for development
- ✅ Sample API endpoints
- ✅ Axios for API calls

## Prerequisites

- Python 3.8 or higher
- Node.js 18 or higher
- npm or yarn

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```powershell
   cd backend
   ```

2. Create a virtual environment:
   ```powershell
   python -m venv venv
   ```

3. Activate the virtual environment:
   ```powershell
   .\venv\Scripts\Activate.ps1
   ```

4. Install Python dependencies:
   ```powershell
   pip install -r requirements.txt
   ```

5. Run migrations:
   ```powershell
   python manage.py migrate
   ```

6. Create a superuser (optional):
   ```powershell
   python manage.py createsuperuser
   ```

7. Start the Django development server:
   ```powershell
   python manage.py runserver
   ```

   The backend will run at `http://localhost:8000`

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```powershell
   cd frontend
   ```

2. Install Node.js dependencies:
   ```powershell
   npm install
   ```

3. Start the development server:
   ```powershell
   npm run dev
   ```

   The frontend will run at `http://localhost:5173`

## API Endpoints

- `GET /api/health/` - Health check endpoint
- `GET /api/hello/` - Hello world endpoint

## Development

### Backend Development

- Add new API endpoints in `backend/api/views.py`
- Register URLs in `backend/api/urls.py`
- Configure settings in `backend/config/settings.py`

### Frontend Development

- React components go in `frontend/src/`
- API calls use Axios (configured in `App.jsx`)
- Styling in CSS files

## Production Deployment

This project is configured for deployment on **Render** (Backend) and **Vercel** (Frontend).

### Backend Deployment (Render.com)

1. Create a new **Web Service** on Render.
2. Connect your repo: `https://github.com/koushamoeini/countdown`.
3. Set **Root Directory** to `backend`.
4. **Environment Variables**:
   - `SECRET_KEY`: (generate a random string)
   - `DEBUG`: `False`
   - `ALLOWED_HOSTS`: `your-backend-url.onrender.com`
   - `DJANGO_SETTINGS_MODULE`: `config.settings`
5. **Build Command**: `pip install -r requirements.txt && python manage.py collectstatic --no-input`
6. **Start Command**: `gunicorn config.wsgi`

### Frontend Deployment (Vercel.com)

1. Create a new project on Vercel.
2. Import your GitHub repo.
3. Set **Root Directory** to `frontend`.
4. Vercel will auto-detect Vite and deploy.

## Troubleshooting

### CORS Issues
- Ensure `django-cors-headers` is installed
- Check `CORS_ALLOWED_ORIGINS` in settings.py
- Verify middleware order in settings.py

### Connection Issues
- Ensure both servers are running
- Check ports 8000 (Django) and 5173 (React)
- Verify proxy settings in vite.config.js

## License

This project is open source and available under the MIT License.
