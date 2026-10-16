@echo off
chcp 65001 >nul
title Restaurador de Manuais D&D 5e
echo =========================================================
echo    Restaurando Manuais Grandes divididos para o GitHub
echo =========================================================
echo.

if exist "Caldeirão de Tasha para Tudo.pdf.part1" (
    echo [1/3] Restaurando: Caldeirão de Tasha para Tudo.pdf...
    copy /b "Caldeirão de Tasha para Tudo.pdf.part1" + "Caldeirão de Tasha para Tudo.pdf.part2" "Caldeirão de Tasha para Tudo.pdf" >nul
)

if exist "D&D 5E - Fora do Abismo (v1.0).part1" (
    echo [2/3] Restaurando: D&D 5E - Fora do Abismo (v1.0)...
    copy /b "D&D 5E - Fora do Abismo (v1.0).part1" + "D&D 5E - Fora do Abismo (v1.0).part2" "D&D 5E - Fora do Abismo (v1.0)" >nul
)

if exist "D&D 5E - Manual dos Monstros.pdf.part1" (
    echo [3/3] Restaurando: D&D 5E - Manual dos Monstros.pdf...
    copy /b "D&D 5E - Manual dos Monstros.pdf.part1" + "D&D 5E - Manual dos Monstros.pdf.part2" "D&D 5E - Manual dos Monstros.pdf" >nul
)

echo.
echo =========================================================
echo    Todos os manuais foram restaurados com sucesso!
echo =========================================================
pause
