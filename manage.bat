@echo off
setlocal

set MODE=%1

if "%MODE%"=="dev" (
    echo Starting ReadlyMagic in DEVELOPMENT mode...
    docker compose -f infra/docker-compose.yml -f infra/docker-compose.dev.yml up --build
) else if "%MODE%"=="prod" (
    echo Starting ReadlyMagic in PRODUCTION mode...
    docker compose -f infra/docker-compose.yml up --build -d
) else (
    echo Usage: manage.bat [dev^|prod]
    echo   dev  - Start with hot-reloading
    echo   prod - Start in production mode (detached)
)

endlocal
