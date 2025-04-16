from pydantic import BaseModel
from typing import Optional


class Token(BaseModel):
    access_token: str
    token_type: str
    refresh_token: Optional[str] = None


class TokenData(BaseModel):
    email: Optional[str] = None
    # Add other fields potentially stored in the token payload, like user_id
    # user_id: Optional[int] = None
