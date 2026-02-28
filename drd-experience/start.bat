@echo off
echo ========================================
echo DRD 交互式体验程序
echo ========================================
echo.
echo 正在启动程序...
echo.

node index.js

if %errorlevel% neq 0 (
    echo.
    echo ========================================
    echo 错误：程序运行失败
    echo ========================================
    echo.
    echo 请确保已安装 Node.js
    echo 访问 https://nodejs.org 下载安装
    echo.
    pause
)