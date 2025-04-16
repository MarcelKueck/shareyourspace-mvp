# main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# --- Configuration & Routers ---
# Only import routers that actually exist right now
from routers import auth
# from routers import profiles # Commented out - Phase 2
# from routers import admin # Commented out - Phase 2/5
# from routers import companies # Commented out - Phase 2
# from routers import matching # Commented out - Phase 3
# from routers import connections # Commented out - Phase 3
# from routers import chat # Commented out - Phase 4
# from routers import safety # Commented out - Phase 8
# from routers import notifications # Commented out - Phase 4
# from routers import corporate_admin # Commented out - Phase 5
# from routers import invites # Commented out - Phase 6
# from routers import billing # Commented out - Phase 7
# from routers import referrals # Commented out - Phase 7
# from routers import feedback # Commented out - Phase 7

# --- FastAPI App Initialization ---
app = FastAPI(
    title="ShareYourSpace 2.0 MVP API",
    description="API endpoints for the ShareYourSpace platform.",
    version="1.0.0"
)

# --- CORS Middleware Configuration ---
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Include API Routers ---
# Only include routers that have been imported

# Phase 1: Auth
app.include_router(auth.router, prefix="/auth", tags=["Authentication"])

# Phase 2: User Profiles, Spaces, Companies (Add as you create them)
# app.include_router(profiles.router, prefix="/users", tags=["User Profiles"]) # Commented out
# app.include_router(companies.router, prefix="/companies", tags=["Companies"]) # Commented out
# app.include_router(admin.router, prefix="/admin", tags=["Admin (Spaces/Companies)"]) # Commented out

# Phase 3: Matching, Connections
# app.include_router(matching.router, prefix="/matching", tags=["Matching"]) # Commented out
# app.include_router(connections.router, prefix="/connections", tags=["Connections"]) # Commented out

# Phase 4: Chat, Notifications
# app.include_router(chat.router, prefix="/chat", tags=["Chat"]) # Commented out
# app.include_router(notifications.router, prefix="/notifications", tags=["Notifications"]) # Commented out

# Phase 5: Dashboards (Admin endpoints)
# app.include_router(corporate_admin.router, prefix="/corporate-admin", tags=["Corporate Admin"]) # Commented out

# Phase 6: Agentic Features (Invites)
# app.include_router(invites.router, prefix="/invite", tags=["Invites"]) # Commented out

# Phase 7: Monetization, Referrals, Feedback
# app.include_router(billing.router, prefix="/billing", tags=["Billing"]) # Commented out
# app.include_router(referrals.router, prefix="/referrals", tags=["Referrals"]) # Commented out
# app.include_router(feedback.router, prefix="/feedback", tags=["Feedback"]) # Commented out

# Phase 8: Security (Blocking/Reporting)
# app.include_router(safety.router, prefix="/safety", tags=["Safety"]) # Commented out


# --- Root Endpoint ---
@app.get("/", tags=["Root"])
def read_root():
    """ Basic API health check endpoint. """
    return {'message': 'ShareYourSpace 2.0 Backend is running!'}

# --- Optional: Mount Socket.IO (If doing Phase 4) ---
# import socketio
# from socket_handlers import setup_socketio
# sio = setup_socketio()
# app.mount('/ws', socketio.ASGIApp(sio))