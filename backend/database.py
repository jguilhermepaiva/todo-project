from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import os # Importa a biblioteca 'os'


URL_DATABASE = os.getenv("DATABASE_URL", "sqlite:///./todo.db")

# Pequena correção para o SQLAlchemy lidar com URLs do Supabase/Render
if URL_DATABASE and URL_DATABASE.startswith("postgres://"):
    URL_DATABASE = URL_DATABASE.replace("postgres://", "postgresql://", 1)

engine = create_engine(URL_DATABASE)

# Se estiver a usar SQLite, precisa do connect_args
if "sqlite" in engine.url.drivername:
    engine = create_engine(URL_DATABASE, connect_args={"check_same_thread": False})

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()