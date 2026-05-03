$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent $PSScriptRoot

$RequiredPages = @(
  "index.html",
  "collections.html",
  "product.html",
  "custom-oem.html",
  "factory.html",
  "contact.html"
)

$RequiredAssets = @(
  "assets/css/styles.css",
  "assets/js/site.js",
  "assets/images/image-plan.md"
)

$RequiredText = @{
  "index.html" = @(
    "Faux Florals, Made to Feel Effortless",
    "Explore Collections",
    "Request Wholesale Quote",
    "Start Your Wholesale Collection"
  )
  "collections.html" = @("Shop Artificial Flowers", "Hydrangeas", "Wedding Florals")
  "product.html" = @("Product Specifications", "Request Quote", "Ask for Sample")
  "custom-oem.html" = @("Custom Faux Floral Production", "Private Label", "Confirm Samples")
  "factory.html" = @("Our Factory", "Quality Control", "Export Packaging")
  "contact.html" = @("Wholesale Inquiry", "Request a Quote", "WhatsApp")
}

function Read-SiteFile($RelativePath) {
  Get-Content -LiteralPath (Join-Path $Root $RelativePath) -Raw -Encoding UTF8
}

foreach ($File in ($RequiredPages + $RequiredAssets)) {
  $Path = Join-Path $Root $File
  if (-not (Test-Path -LiteralPath $Path)) {
    throw "Missing required file: $File"
  }
}

foreach ($File in $RequiredText.Keys) {
  $Html = Read-SiteFile $File
  foreach ($Snippet in $RequiredText[$File]) {
    if (-not $Html.Contains($Snippet)) {
      throw "Missing text in ${File}: $Snippet"
    }
  }
}

foreach ($File in $RequiredPages) {
  $Html = Read-SiteFile $File
  if (-not $Html.Contains("assets/css/styles.css")) {
    throw "$File does not load shared CSS"
  }
  if (-not $Html.Contains("assets/js/site.js")) {
    throw "$File does not load shared JS"
  }
  if (-not $Html.Contains("Wholesale Inquiry")) {
    throw "$File missing inquiry navigation"
  }
}

$AllHtml = ($RequiredPages | ForEach-Object { Read-SiteFile $_ }) -join "`n"
$Matches = [regex]::Matches($AllHtml, 'href="([^"]+\.html)"')
foreach ($Match in $Matches) {
  $Href = $Match.Groups[1].Value
  if (-not (Test-Path -LiteralPath (Join-Path $Root $Href))) {
    throw "Broken local link target: $Href"
  }
}

Write-Output "Site check passed: $($RequiredPages.Count) pages, $($RequiredAssets.Count) shared assets."
