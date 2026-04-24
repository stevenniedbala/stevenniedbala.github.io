# optimize-images.ps1
# Resizes project images to max 1200px wide at high JPEG quality (90)
# Originals are backed up to resources/images/originals/
# Run once from the repo root: .\optimize-images.ps1

Add-Type -AssemblyName System.Drawing

$imagesDir  = Join-Path $PSScriptRoot "resources\images"
$backupDir  = Join-Path $imagesDir "originals"
$maxWidth   = 1200
$jpegQuality = 90

# Project images to optimize (skip logos, favicon, headshot, SVG-adjacent PNGs)
$targets = @(
    "hockanumdaytime.png",
    "hockanumnighttime.png",
    "pleasantstreetdaytime.png",
    "pleasantstreetnightime.png",
    "walnutdaytime.png",
    "walnutnighttime.png",
    "cochrandaytime.png",
    "cochrannighttime.png",
    "trumbulldaytime.png",
    "trumbullnighttime.png",
    "joystreetdaytime.jpg",
    "joystreetnighttime.png",
    "408unitckitchen.jpg",
    "408unit2kitchen.jpg",
    "408unit2bathroom.jpg",
    "bathroomunit1.jpg",
    "398kitchenunit1.jpg",
    "livingroomtrumbull.jpg",
    "livingroomtrumbull2.jpg",
    "joystreetcourt.jpg",
    "pic2.jpg",
    "project1.jpg"
)

# Create backup dir
if (-not (Test-Path $backupDir)) {
    New-Item -ItemType Directory -Path $backupDir | Out-Null
    Write-Host "Created backup folder: $backupDir"
}

# JPEG encoder with quality setting
$jpegEncoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
    Where-Object { $_.MimeType -eq "image/jpeg" }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
    [System.Drawing.Imaging.Encoder]::Quality, [long]$jpegQuality
)

# PNG encoder
$pngEncoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
    Where-Object { $_.MimeType -eq "image/png" }

foreach ($filename in $targets) {
    $srcPath = Join-Path $imagesDir $filename
    if (-not (Test-Path $srcPath)) {
        Write-Host "SKIP (not found): $filename"
        continue
    }

    $ext = [System.IO.Path]::GetExtension($filename).ToLower()
    $backupPath = Join-Path $backupDir $filename

    # Backup original if not already backed up
    if (-not (Test-Path $backupPath)) {
        Copy-Item $srcPath $backupPath
    }

    $img = [System.Drawing.Image]::FromFile($srcPath)
    $origW = $img.Width
    $origH = $img.Height

    if ($origW -le $maxWidth) {
        Write-Host "OK (already small): $filename ($origW x $origH)"
        $img.Dispose()
        continue
    }

    $newW = $maxWidth
    $newH = [int]($origH * ($maxWidth / $origW))

    $bmp = New-Object System.Drawing.Bitmap($newW, $newH)
    $g   = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode  = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode      = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode    = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $g.DrawImage($img, 0, 0, $newW, $newH)
    $img.Dispose()
    $g.Dispose()

    # Save — PNGs stay PNG, JPEGs stay JPEG
    if ($ext -eq ".png") {
        $bmp.Save($srcPath, $pngEncoder, $encoderParams)
    } else {
        $bmp.Save($srcPath, $jpegEncoder, $encoderParams)
    }

    $bmp.Dispose()

    $beforeKB = [math]::Round((Get-Item $backupPath).Length / 1KB)
    $afterKB  = [math]::Round((Get-Item $srcPath).Length / 1KB)
    Write-Host "DONE: $filename | $origW x $origH -> $newW x $newH | ${beforeKB}KB -> ${afterKB}KB"
}

Write-Host ""
Write-Host "All done. Originals saved to: $backupDir"
