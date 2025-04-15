from sqlalchemy import Column, Integer, String, DateTime, func
from sqlalchemy.sql import expression
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, nullable=True)
    role = Column(String, nullable=False) # E.g., 'CorporateAdmin', 'StartupAdmin', 'StartupMember', 'Freelancer', 'SysAdmin'
    status = Column(String, nullable=False) # E.g., 'Waitlisted', 'PendingOnboarding', 'Active', 'Inactive'
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
