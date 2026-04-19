$links = ""
$navLinks = ""
for ($i=1; $i -le 55; $i++) {
    $links += "            <li style=`"margin-bottom: 10px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px;`"><a href=`"page$i.html`" style=`"text-decoration: none; color: inherit; font-size: 1.1rem;`">페이지 $i 제목</a> <br><small style=`"color: #888;`">2026.04.19</small></li>`n"
    $navLinks += "`n            <a href=`"page$i.html`">페이지 $i</a>"
}

$template = @"
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>블로그 | 홈</title>
    <meta name="description" content="블로그 메인 페이지">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="./styles.css">
</head>
<body class="dark-theme">
    
<header class="navbar">
    <div class="container nav-content">
        <h1 class="logo"><a href="index.html">My<span>Blog</span></a></h1>
        <nav class="nav-links" style="overflow-x: auto; white-space: nowrap; max-width: 60vw;">
            <a href="index.html">홈</a>
            <a href="about.html">소개</a>
            <a href="contact.html">연락처</a>$navLinks
        </nav>
    </div>
</header>

<main class="container article-container">
    <div class="post-content glass">
        <h1>최신 페이지</h1>
        <br>
        <ul style="list-style: none; padding: 0;">
$links
        </ul>
    </div>
</main>

<footer>
    <p>&copy; 2026 MyBlog by BlackPC.</p>
</footer>

<script src="./app.js"></script>
</body>
</html>
"@

[System.IO.File]::WriteAllText((Join-Path (Get-Location) "index.html"), $template, [System.Text.Encoding]::UTF8)
Write-Host "index.html generated successfully."
