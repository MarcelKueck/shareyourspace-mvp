import os
import sys
from logging.config import fileConfig

from dotenv import load_dotenv # Import dotenv
from sqlalchemy import engine_from_config
from sqlalchemy import pool
from alembic import context

# --- Explicitly Load .env File ---
# Construct the path to the .env file relative to env.py
# Assumes .env is one level up from the alembic directory
dotenv_path = os.path.join(os.path.dirname(__file__), '..', '.env')
print(f"DEBUG [env.py]: Attempting to load .env file from: {dotenv_path}")
loaded = load_dotenv(dotenv_path=dotenv_path)
print(f"DEBUG [env.py]: dotenv loaded successfully: {loaded}") # Should print True if .env found
# ---------------------------------

# Ensure the app root directory is in the path for imports
# Assumes env.py is in alembic/, and other modules (config, database, models)
# are directly under the parent directory (sys2-backend) or in standard locations.
sys.path.insert(0, os.path.realpath(os.path.join(os.path.dirname(__file__), '..')))

# --- Import Application Modules AFTER loading .env ---
try:
    from config import settings # Import settings from your config module
    # --- Print Debug URL ---
    print(f"DEBUG [env.py]: DATABASE_URL from settings: {settings.DATABASE_URL}")
    DATABASE_URL_STR = str(settings.DATABASE_URL) # Ensure it's a string
    # -----------------------
except ImportError as e:
    print(f"ERROR [env.py]: Could not import settings from config.py: {e}")
    # Attempt fallback directly from os environment if settings import fails
    DATABASE_URL_STR = os.getenv("DATABASE_URL")
    if not DATABASE_URL_STR:
        raise ImportError(
            "Could not import settings from config.py AND "
            "DATABASE_URL not found directly in environment. "
            "Ensure .env is loaded correctly and config.py is importable."
        ) from e
    print(f"DEBUG [env.py]: Using DATABASE_URL directly from environment: {DATABASE_URL_STR}")


try:
    from database import Base  # Import Base from your database module
    target_metadata = Base.metadata # Use Base.metadata
except ImportError as e:
    print(f"ERROR [env.py]: Could not import Base from database.py: {e}")
    target_metadata = None # Set to None if import fails

try:
    # Import models package/modules to ensure they are registered with Base.metadata
    import models.user
    # Add other model imports here as they are created
    # e.g., import models.space
    #      import models.company
    #      etc.
    print("DEBUG [env.py]: Successfully imported models")
except ImportError as e:
    print(f"ERROR [env.py]: Could not import models: {e}")
# ----------------------------------------------------

# this is the Alembic Config object, which provides
# access to the values within the .ini file in use.
config = context.config

# Interpret the config file for Python logging.
# This line sets up loggers basically.
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Set the database URL in the Alembic config.
# This ensures both offline and online modes can potentially access it,
# though online mode sets it again below explicitly.
config.set_main_option('sqlalchemy.url', DATABASE_URL_STR)


# other values from the config, defined by the needs of env.py,
# can be acquired:
# my_important_option = config.get_main_option("my_important_option")
# ... etc.


def run_migrations_offline() -> None:
    """Run migrations in 'offline' mode."""
    print("INFO [env.py]: Running migrations in offline mode")
    if not DATABASE_URL_STR:
         print("ERROR [env.py]: DATABASE_URL is not set for offline mode.")
         return
    if target_metadata is None:
        print("ERROR [env.py]: target_metadata is None, cannot run offline migrations.")
        return

    context.configure(
        url=DATABASE_URL_STR, # Use the loaded URL string
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    """Run migrations in 'online' mode."""
    print("INFO [env.py]: Running migrations in online mode")
    if not DATABASE_URL_STR:
         print("ERROR [env.py]: DATABASE_URL is not set for online mode.")
         return
    if target_metadata is None:
        print("ERROR [env.py]: target_metadata is None, cannot run online migrations.")
        return

    # Get Alembic's configuration section
    configuration = config.get_section(config.config_ini_section, {})

    # Explicitly set the sqlalchemy.url from our loaded settings/env var
    configuration["sqlalchemy.url"] = DATABASE_URL_STR
    print(f"DEBUG [env.py]: Setting online engine URL to: {configuration['sqlalchemy.url']}")

    connectable = engine_from_config(
        configuration,
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection, target_metadata=target_metadata
        )

        print("INFO [env.py]: Beginning transaction and running migrations...")
        with context.begin_transaction():
            context.run_migrations()
        print("INFO [env.py]: Migrations completed.")


# Determine mode and run
if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()

print("DEBUG [env.py]: env.py script finished.") # Final debug print