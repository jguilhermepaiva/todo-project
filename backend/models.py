from database import Base, engine
from sqlalchemy import Column, ForeignKey, Integer, String, Float, Boolean
from sqlalchemy.orm import relationship


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True)
    email = Column(String)
    hashed_password = Column(String)
    todos = relationship("Todo", back_populates="owner")

class Todo(Base):
    __tablename__ = 'todos'

    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String)
    category = Column(String)
    description = Column(String)
    is_priority = Column(Boolean)
    date = Column(String)
    user_id = Column(Integer, ForeignKey('users.id'))
    owner = relationship("User", back_populates="todos")
    
User.metadata.create_all(bind=engine)