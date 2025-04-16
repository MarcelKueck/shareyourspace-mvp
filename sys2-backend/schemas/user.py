from pydantic import BaseModel, EmailStr
from typing import Optional

class UserBase(BaseModel):
    email: EmailStr
    is_active: bool = True
    is_superuser: bool = False
    full_name: Optional[str] = None

class UserCreate(UserBase):
    password: str
    role: str # Consider using an Enum for roles
    company_name: Optional[str] = None

class User(UserBase):
    id: int

    class Config:
        orm_mode = True
