@echo off
echo.
echo  ======================================
echo   Japan Trip 2026 - Sync and Deploy
echo  ======================================
echo.

cd /d "C:\Users\Shadman Kaiser\Desktop\Claude Code Projects\Japan Trip 2026"

echo  Syncing from Notion...
echo.
call npm run sync

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo  ERROR: Sync failed! Check your Notion API key.
    pause
    exit /b 1
)

echo.
echo  Checking coordinates coverage...
echo.
call npx tsx scripts/check-coords.ts

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo  WARNING: Some items are missing coordinates!
    echo  They won't appear on the map or nearby page.
    echo  Add their lat/lng to src/data/coordinates.ts
    echo.
    pause
)

echo.
echo  Committing and pushing to GitHub...
echo.
git add src/data/
git commit -m "Sync itinerary from Notion"
git push origin master

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo  ERROR: Push failed! Check your git credentials.
    pause
    exit /b 1
)

echo.
echo  ======================================
echo   Done! Vercel will auto-deploy shortly.
echo   Visit: shad2fast2furious.com
echo  ======================================
echo.
pause
