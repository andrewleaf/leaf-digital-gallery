@echo off
echo 🌱 Setting up Leaf Digital Gallery...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ and try again.
    pause
    exit /b 1
)

echo ✅ Node.js version:
node --version

REM Install dependencies
echo.
echo 📦 Installing dependencies...
npm install

if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo ✅ Dependencies installed successfully!

REM Create environment file
if not exist ".env.local" (
    echo.
    echo 📝 Creating environment file...
    copy env.example .env.local >nul
    echo ✅ Environment file created (.env.local)
    echo 📝 Please update .env.local with your configuration
) else (
    echo ✅ Environment file already exists
)

echo.
echo 🎉 Setup complete!
echo.
echo To start the development server:
echo   npm run dev
echo.
echo To build for production:
echo   npm run build
echo.
echo Happy coding! 🚀
pause
