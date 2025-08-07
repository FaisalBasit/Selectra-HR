from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api import auth
from dotenv import load_dotenv
import os

# ✅ Load environment variables
load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
if not SECRET_KEY:
    raise RuntimeError("SECRET_KEY not found in .env file")

app = FastAPI()

# ✅ Allow CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with actual frontend origin in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Auth router
app.include_router(auth.router, prefix="/auth")
