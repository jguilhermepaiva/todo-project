from database import Base, engine
from sqlalchemy import Column, Integer, String, Float, Boolean


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True)
    email = Column(String)
    hashed_password = Column(String)

class Todo(Base):
    __tablename__ = 'todos'

    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String)
    category = Column(String)
    description = Column(String)
    is_priority = Column(Boolean)
    date = Column(String)

User.metadata.create_all(bind=engine)