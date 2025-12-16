@echo off
echo Starting Editlyr Project...

REM Check if Node is installed
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed. Please install Node.js.
    pause
    exit /b 1
)

REM Check if Docker is installed (optional but recommended)
docker -v >nul 2>&1
if %errorlevel% neq 0 (
    echo Warning: Docker is not installed or not in PATH. Infrastructure might not start.
) else (
    echo Starting Docker services...
    docker compose up -d
    if %errorlevel% neq 0 (
        echo Error starting Docker containers. Make sure Docker Desktop is running.
        pause
    )
)

REM Install dependencies if needed
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
)

REM Start the project
echo Starting development server...
call npm run dev

pause
