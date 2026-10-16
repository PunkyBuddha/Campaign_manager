@echo off
chcp 65001 >nul
title Upload do Grimorio para o GitHub
echo =========================================================
echo    Grimorio do Mestre - Envio para o GitHub
echo =========================================================
echo.
echo Repositorio: https://github.com/PunkyBuddha/Campaign_manager.git
echo.
echo Para fazer o upload, o GitHub exige um Personal Access Token (PAT).
echo Se voce ainda nao tem um token:
echo   1. Acesse: https://github.com/settings/tokens/new
echo   2. De um nome ao token e marque a permissao "repo"
echo   3. Copie o token gerado (ex: ghp_xxxx...)
echo.
set /p TOKEN="Cole o seu Token do GitHub (ou digite seu usuario): "

if "%TOKEN%"=="" (
    echo Nenhum dado inserido. Cancelando...
    pause
    exit
)

echo.
echo Enviando arquivos e manuais para o GitHub...
echo.

"%~dp0..\mingit\cmd\git.exe" -C "%~dp0." push https://%TOKEN%@github.com/PunkyBuddha/Campaign_manager.git main

echo.
echo =========================================================
echo    Operacao concluida!
echo =========================================================
pause
