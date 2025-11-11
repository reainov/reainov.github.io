@echo off
echo ========================================
echo    GitHub部署脚本 - 海洋生物标本介绍网站
echo ========================================
echo.

REM 检查是否在正确的目录
if not exist "index.html" (
    echo 错误：请在项目根目录运行此脚本
    pause
    exit /b 1
)

echo 步骤1: 初始化Git仓库
git init

echo.
echo 步骤2: 添加所有文件到暂存区
git add .

echo.
echo 步骤3: 提交初始版本
git commit -m "Initial commit: 海洋生物标本介绍网站"

echo.
echo 步骤4: 添加远程仓库
git remote add origin git@github.com:reainov/reainov.github.io.git

echo.
echo 步骤5: 推送到GitHub
echo 注意：如果是第一次推送，可能需要设置上游分支
git branch -M main
git push -u origin main

echo.
echo ========================================
echo   部署完成！
echo   网站地址：https://reainov.github.io
echo ========================================
echo.
pause