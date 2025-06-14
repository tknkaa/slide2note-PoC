setup-web:
  cd web && bun install

setup-server:
  cd server && uv venv && uv sync 

setup:
   just setup-web
   just setup-server

dev-web:
  cd web && bun dev

dev-server:
  cd server && uv run fastapi dev main.py

dev:
  trap 'kill 0' EXIT; (just dev-web) & (just dev-server) & wait