from fastapi import APIRouter, HTTPException
from db.supabase import supabase
from schemas.user_schema import LoginRequest, RegisterRequest
import bcrypt

router = APIRouter()

# ✅ LOGIN
@router.post("/login")
def login(data: LoginRequest):
    try:
        result = supabase.table("employee").select("*").eq("email", data.email).execute()
        user = result.data[0] if result.data else None

        if not user or not bcrypt.checkpw(data.password.encode(), user["password"].encode()):
            raise HTTPException(status_code=401, detail="Invalid email or password")

        return {
            "message": "Login successful",
            "user": {
                "email": user["email"],
                "role": user["role"],
                "department": user["department"],
                "name": user["name"]
            }
        }

    except HTTPException as http_ex:
        raise http_ex  # ✅ Re-raise specific error
    except Exception as e:
        print("Login error:", str(e))
        raise HTTPException(status_code=500, detail="Something went wrong")


# ✅ REGISTER
@router.post("/register")
def register(data: RegisterRequest):
    try:
        existing = supabase.table("employee").select("id").eq("email", data.email).execute()
        if existing.data:
            raise HTTPException(status_code=400, detail="Email already exists")

        hashed_password = bcrypt.hashpw(data.password.encode(), bcrypt.gensalt()).decode()

        res = supabase.table("employee").insert({
            "name": data.name,
            "email": data.email,
            "password": hashed_password,
            "role": data.role,
            "department": data.department
        }).execute()

        return {
            "message": "User registered",
            "user_id": res.data[0]["id"]
        }

    except Exception as e:
        print("Registration error:", str(e))
        raise HTTPException(status_code=500, detail="Error registering user")

