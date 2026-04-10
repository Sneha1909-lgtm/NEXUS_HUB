$mavenVersion = "3.9.6"
$downloadUrl = "https://archive.apache.org/dist/maven/maven-3/$mavenVersion/binaries/apache-maven-$mavenVersion-bin.zip"
$installDir = "$HOME\.maven"
$zipFile = "$installDir\maven.zip"
if (!(Test-Path $installDir)) { New-Item -ItemType Directory -Path $installDir }
Invoke-WebRequest -Uri $downloadUrl -OutFile $zipFile
Expand-Archive -Path $zipFile -DestinationPath $installDir -Force
