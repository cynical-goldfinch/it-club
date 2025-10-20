@echo off

set /p project_name=Project name:
set /p init_git=Initialize git repository? (y/n, default=n):

if exist %project_name% (
    echo The folder already exists!
    exit /b
)

echo Creating the project %project_name%

md %project_name%
cd %project_name%

type nul > index.html
type nul > script.js
type nul > style.css

if /I "%init_git%"=="y" (
    echo Initializing git repository
    git init
    git add .
    git commit -m "Initial commit"
)

@REM code .

cd ..
