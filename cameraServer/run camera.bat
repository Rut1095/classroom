@echo OFF
ECHO camera server
set /p hostName="Enter host: "
set root=E:\projects\classroom\cameraServer\peerjs-server


start /d %root% peerjs --port 9000 --key peerjs --path /cameraServer --sslkey "../cert/key.pem" --sslcert "../cert/cert.pem" --host %hostName%

pause
print("This is my first Python program in Notepad++")
