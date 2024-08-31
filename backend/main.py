from fastapi import FastAPI, HTTPException, Depends
from typing import Annotated, List
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import SessionLocal, engine
import models
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    'http://localhost:3000',
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],   
)

class TodoBase(BaseModel):
    titulo: str
    category: str
    description: str
    is_priority: bool
    date: str

class TodoModel(TodoBase):
    id: int

    class Config:
        orm_mode = True

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

models.Base.metadata.create_all(bind=engine)

@app.post("/todos/", response_model=TodoModel)
async def create_todo(todo: TodoBase, db: db_dependency):
    db_todo = models.Todo(**todo.model_dump())
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo

@app.get("/todos/", response_model=List[TodoModel])
async def read_todos(db: db_dependency, skip: int = 0, limit: int = 100):
    todos = db.query(models.Todo).offset(skip).limit(limit).all()
    return todos

@app.delete("/todos/{todo_id}", response_model=TodoModel)
async def delete_todo(todo_id: int, db: db_dependency):
    db_todo = db.query(models.Todo).filter(models.Todo.id == todo_id).first()
    
    if not db_todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    
    db.delete(db_todo)
    db.commit()
    
    return db_todo