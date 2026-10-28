<?php
session_start();

// ── Paths ─────────────────────────────────────────────────────────────────
$ROOT      = dirname(__DIR__);
$CFG_FILE  = __DIR__ . '/config.json';
$DATA_DIR  = $ROOT . '/data/';
$GAL_DIR   = $ROOT . '/images/gallery/';
$GAL_JSON  = $DATA_DIR . 'gallery.json';
$REV_JSON  = $DATA_DIR . 'reviews.json';
$CONT_JSON = $DATA_DIR . 'content.json';

// ── Helpers ───────────────────────────────────────────────────────────────
function readJson($path) {
    if (!file_exists($path)) return [];
    $d = json_decode(file_get_contents($path), true);
    return is_array($d) ? $d : [];
}
function readJsonMap($path) {
    if (!file_exists($path)) return [];
    $d = json_decode(file_get_contents($path), true);
    return is_array($d) ? $d : [];
}
function writeJson($path, $data) {
    $dir = dirname($path);
    if (!is_dir($dir)) mkdir($dir, 0755, true);
    file_put_contents($path, json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
}
function allowedExt($name) {
    $ext = strtolower(pathinfo($name, PATHINFO_EXTENSION));
    return in_array($ext, ['jpg','jpeg','png','webp']);
}
function uploadImg($key, $dir) {
    if (!isset($_FILES[$key]) || $_FILES[$key]['error'] !== UPLOAD_ERR_OK) return null;
    $f = $_FILES[$key];
    if ($f['size'] > 5 * 1024 * 1024) return null;
    if (!allowedExt($f['name'])) return null;
    if (!is_dir($dir)) mkdir($dir, 0755, true);
    $ext  = strtolower(pathinfo($f['name'], PATHINFO_EXTENSION));
    $name = $key . '_' . time() . '_' . substr(md5(rand()), 0, 6) . '.' . $ext;
    if (move_uploaded_file($f['tmp_name'], $dir . $name)) return $name;
    return null;
}
function h($s) { return htmlspecialchars($s, ENT_QUOTES, 'UTF-8'); }
function redir($tab = 'gallery', $msg = '') {
    $q = $msg ? '&msg=' . urlencode($msg) : '';
    header("Location: index.php?tab=$tab$q");
    exit;
}

// ── Load config ───────────────────────────────────────────────────────────
$cfg = readJsonMap($CFG_FILE);

// ── Setup (first run) ─────────────────────────────────────────────────────
if (empty($cfg['password_hash'])) {
    $err = '';
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['setup'])) {
        $pw = trim($_POST['password'] ?? '');
        $cf = trim($_POST['confirm']  ?? '');
        if (strlen($pw) < 6)  $err = 'Şifrə ən azı 6 simvol olmalıdır.';
        elseif ($pw !== $cf)  $err = 'Şifrələr eyni deyil.';
        else {
            $cfg['password_hash'] = password_hash($pw, PASSWORD_DEFAULT);
            writeJson($CFG_FILE, $cfg);
            header('Location: index.php');
            exit;
        }
    }
    ?><!DOCTYPE html><html lang="az"><head><meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Admin – İlk quraşdırma</title>
    <style><?php include_auth_styles(); ?></style></head>
    <body class="auth-page">
    <div class="auth-box">
        <div class="auth-logo">🦷 Admin Panel</div>
        <h2>İlk quraşdırma</h2>
        <p class="auth-sub">Admin şifrəsini təyin edin</p>
        <?php if ($err): ?><div class="alert alert-err"><?= h($err) ?></div><?php endif; ?>
        <form method="POST">
            <div class="field"><label>Şifrə</label>
            <input type="password" name="password" required minlength="6" autofocus></div>
            <div class="field"><label>Şifrəni təkrarla</label>
            <input type="password" name="confirm" required minlength="6"></div>
            <button type="submit" name="setup" class="btn-primary">Quraşdır</button>
        </form>
    </div>
    </body></html><?php
    exit;
}

// ── Login ─────────────────────────────────────────────────────────────────
if (empty($_SESSION['admin'])) {
    $err = '';
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['login'])) {
        if (password_verify($_POST['password'] ?? '', $cfg['password_hash'])) {
            $_SESSION['admin'] = true;
            redir('gallery');
        }
        $err = 'Şifrə yanlışdır.';
    }
    ?><!DOCTYPE html><html lang="az"><head><meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Admin – Giriş</title>
    <style><?php include_auth_styles(); ?></style></head>
    <body class="auth-page">
    <div class="auth-box">
        <div class="auth-logo">🦷 Admin Panel</div>
        <h2>Giriş</h2>
        <p class="auth-sub">Baku Estetic Clinic</p>
        <?php if ($err): ?><div class="alert alert-err"><?= h($err) ?></div><?php endif; ?>
        <form method="POST">
            <div class="field"><label>Şifrə</label>
            <input type="password" name="password" required autofocus></div>
            <button type="submit" name="login" class="btn-primary">Daxil ol</button>
        </form>
    </div>
    </body></html><?php
    exit;
}

// ── Actions ───────────────────────────────────────────────────────────────
$action = $_POST['action'] ?? '';

if ($action === 'logout') {
    session_destroy();
    header('Location: index.php');
    exit;
}
if ($action === 'add-gallery') {
    $before = uploadImg('before', $GAL_DIR);
    $after  = uploadImg('after',  $GAL_DIR);
    if ($after) {
        $gal   = readJson($GAL_JSON);
        $gal[] = [
            'id'         => (string)time() . rand(10,99),
            'before'     => $before ?? '',
            'after'      => $after,
            'caption_az' => strip_tags(trim($_POST['caption_az'] ?? '')),
            'caption_ru' => strip_tags(trim($_POST['caption_ru'] ?? '')),
            'caption_en' => strip_tags(trim($_POST['caption_en'] ?? '')),
        ];
        writeJson($GAL_JSON, $gal);
        redir('gallery', 'Şəkil əlavə edildi.');
    } else {
        redir('gallery', 'XƏTA: "sonra" şəkli mütləq lazımdır (max 5 MB, jpg/png/webp).');
    }
}
if ($action === 'delete-gallery') {
    $id  = $_POST['id'] ?? '';
    $gal = readJson($GAL_JSON);
    $new = [];
    foreach ($gal as $g) {
        if ($g['id'] === $id) {
            @unlink($GAL_DIR . $g['before']);
            @unlink($GAL_DIR . $g['after']);
        } else {
            $new[] = $g;
        }
    }
    writeJson($GAL_JSON, $new);
    redir('gallery', 'Foto silindi.');
}
if ($action === 'add-review') {
    $text_az = strip_tags(trim($_POST['text_az'] ?? ''));
    $auth    = strip_tags(trim($_POST['author']  ?? ''));
    if ($text_az && $auth) {
        $rev   = readJson($REV_JSON);
        $rev[] = [
            'id'      => (string)time() . rand(10,99),
            'stars'   => max(1, min(5, (int)($_POST['stars'] ?? 5))),
            'text_az' => $text_az,
            'text_ru' => strip_tags(trim($_POST['text_ru'] ?? '')),
            'text_en' => strip_tags(trim($_POST['text_en'] ?? '')),
            'author'  => $auth,
            'date'    => date('Y-m-d'),
        ];
        writeJson($REV_JSON, $rev);
        redir('reviews', 'Rəy əlavə edildi.');
    } else {
        redir('reviews', 'XƏTA: Azərbaycanca mətn və müəllif adı tələb olunur.');
    }
}
if ($action === 'delete-review') {
    $id  = $_POST['id'] ?? '';
    $rev = readJson($REV_JSON);
    $new = array_values(array_filter($rev, function($r) use ($id) { return $r['id'] !== $id; }));
    writeJson($REV_JSON, $new);
    redir('reviews', 'Rəy silindi.');
}
if ($action === 'save-contact') {
    $cont = [
        'phone'    => strip_tags(trim($_POST['phone']    ?? '')),
        'email'    => strip_tags(trim($_POST['email']    ?? '')),
        'address'  => strip_tags(trim($_POST['address']  ?? '')),
        'hours_az' => strip_tags(trim($_POST['hours_az'] ?? '')),
        'hours_ru' => strip_tags(trim($_POST['hours_ru'] ?? '')),
        'hours_en' => strip_tags(trim($_POST['hours_en'] ?? '')),
    ];
    writeJson($CONT_JSON, $cont);
    redir('contact', 'Əlaqə məlumatları saxlanıldı.');
}
if ($action === 'change-password') {
    $pw = trim($_POST['password'] ?? '');
    $cf = trim($_POST['confirm']  ?? '');
    if (strlen($pw) >= 6 && $pw === $cf) {
        $cfg['password_hash'] = password_hash($pw, PASSWORD_DEFAULT);
        writeJson($CFG_FILE, $cfg);
        redir('settings', 'Şifrə dəyişdirildi.');
    } else {
        redir('settings', 'XƏTA: şifrə ən azı 6 simvol olmalı və eyni olmalıdır.');
    }
}

// ── Render dashboard ──────────────────────────────────────────────────────
$tab  = $_GET['tab'] ?? 'gallery';
$msg  = h($_GET['msg'] ?? '');
$gal  = readJson($GAL_JSON);
$rev  = readJson($REV_JSON);
$cont = readJsonMap($CONT_JSON) + [
    'phone'    => '+994504366366',
    'email'    => 'dr.elcanhemidli@gmail.com',
    'address'  => 'Baku Estetic Clinic, Hanifa Əlasgarov küç. 67, Bakı',
    'hours_az' => 'B.e / Çər / Cümə: Dr. Aygün (səhər)<br>Ç.ax / Cüm.ax / Şənbə: Dr. Elcan (günorta)<br>Bazar: İstirahət',
    'hours_ru' => 'Пн / Ср / Пт: Д-р Айгюн (утро)<br>Вт / Чт / Сб: Д-р Эльчан (день)<br>Воскресенье: выходной',
    'hours_en' => 'Mon / Wed / Fri: Dr. Aygün (morning)<br>Tue / Thu / Sat: Dr. Elcan (afternoon)<br>Sunday: Closed',
];

// ── Inline style helper ───────────────────────────────────────────────────
function include_auth_styles() {
    echo '
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    body{font-family:"Segoe UI",system-ui,sans-serif}
    .auth-page{display:flex;align-items:center;justify-content:center;min-height:100vh;background:linear-gradient(135deg,#0d3d52,#1a6b8a)}
    .auth-box{background:#fff;border-radius:16px;padding:40px 36px;width:100%;max-width:380px;box-shadow:0 20px 60px rgba(0,0,0,.2)}
    .auth-logo{font-size:1.5rem;font-weight:700;color:#1a6b8a;margin-bottom:20px;text-align:center}
    .auth-box h2{font-size:1.4rem;font-weight:700;margin-bottom:6px;text-align:center;color:#1a2332}
    .auth-sub{color:#7f8c8d;font-size:.9rem;text-align:center;margin-bottom:24px}
    .field{margin-bottom:16px}
    .field label{display:block;font-size:.82rem;font-weight:600;color:#374151;margin-bottom:6px}
    .field input{width:100%;padding:10px 14px;border:1.5px solid #dce6f0;border-radius:8px;font-family:inherit;font-size:.9rem;outline:none;transition:border-color .2s}
    .field input:focus{border-color:#1a6b8a}
    .btn-primary{width:100%;padding:12px;background:#1a6b8a;color:#fff;border:none;border-radius:8px;font-family:inherit;font-size:.9rem;font-weight:600;cursor:pointer}
    .btn-primary:hover{background:#145572}
    .alert{padding:12px 16px;border-radius:8px;font-size:.88rem;font-weight:500;margin-bottom:20px}
    .alert-err{background:#fee2e2;color:#991b1b;border:1px solid #fca5a5}
    ';
}
?>
<!DOCTYPE html>
<html lang="az">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Admin | Baku Estetic Clinic</title>
<style>
/* ── Base ── */
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Segoe UI',system-ui,sans-serif;background:#f0f4f8;color:#2c3e50;min-height:100vh}
a{text-decoration:none;color:inherit}
img{max-width:100%;display:block}

/* ── Auth pages ── */
.auth-page{display:flex;align-items:center;justify-content:center;min-height:100vh;background:linear-gradient(135deg,#0d3d52,#1a6b8a)}
.auth-box{background:#fff;border-radius:16px;padding:40px 36px;width:100%;max-width:380px;box-shadow:0 20px 60px rgba(0,0,0,.2)}
.auth-logo{font-size:1.5rem;font-weight:700;color:#1a6b8a;margin-bottom:20px;text-align:center}
.auth-box h2{font-size:1.4rem;font-weight:700;margin-bottom:6px;text-align:center}
.auth-sub{color:#7f8c8d;font-size:.9rem;text-align:center;margin-bottom:24px}

/* ── Admin layout ── */
.admin-header{background:#1a2332;color:#fff;padding:0 24px;display:flex;align-items:center;justify-content:space-between;height:60px;position:sticky;top:0;z-index:100}
.admin-logo{font-size:1rem;font-weight:700;letter-spacing:.3px}
.admin-logout{font-size:.82rem;color:rgba(255,255,255,.6);cursor:pointer;background:none;border:1px solid rgba(255,255,255,.2);padding:6px 14px;border-radius:6px;color:rgba(255,255,255,.8);transition:.2s}
.admin-logout:hover{background:rgba(255,255,255,.1)}
.tabs{background:#fff;border-bottom:1px solid #dce6f0;display:flex;gap:0;overflow-x:auto;padding:0 24px}
.tab-btn{padding:14px 20px;font-size:.88rem;font-weight:600;color:#7f8c8d;border:none;background:none;cursor:pointer;border-bottom:3px solid transparent;white-space:nowrap;transition:.2s}
.tab-btn:hover{color:#1a6b8a}
.tab-btn.active{color:#1a6b8a;border-bottom-color:#1a6b8a}
.admin-body{max-width:1100px;margin:0 auto;padding:32px 24px}

/* ── Cards / Sections ── */
.card{background:#fff;border-radius:12px;padding:28px;margin-bottom:24px;box-shadow:0 2px 12px rgba(26,107,138,.07);border:1px solid #dce6f0}
.card-title{font-size:1.05rem;font-weight:700;color:#1a2332;margin-bottom:20px;padding-bottom:12px;border-bottom:1px solid #f0f4f8}

/* ── Gallery grid ── */
.gal-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px;margin-bottom:20px}
.gal-pair{background:#f8fafc;border:1px solid #dce6f0;border-radius:10px;overflow:hidden}
.gal-pair-imgs{display:grid;grid-template-columns:1fr 1fr}
.gal-pair-imgs img{width:100%;height:130px;object-fit:cover;display:block}
.gal-pair-imgs .label{font-size:.7rem;font-weight:700;letter-spacing:1px;text-align:center;padding:4px;text-transform:uppercase}
.gal-before .label{background:#e8f0fb;color:#1a6b8a}
.gal-after  .label{background:#e8f5e9;color:#2e7d32}
.gal-caption{padding:8px 12px;font-size:.82rem;color:#6b7280;min-height:32px}
.gal-actions{padding:8px 12px 12px;display:flex;justify-content:flex-end}
.empty-state{text-align:center;padding:48px 20px;color:#bdc3c7}
.empty-state i{font-size:3rem;margin-bottom:12px;display:block}

/* ── Reviews ── */
.rev-list{display:flex;flex-direction:column;gap:12px;margin-bottom:20px}
.rev-item{background:#f8fafc;border:1px solid #dce6f0;border-radius:10px;padding:16px;display:flex;align-items:flex-start;gap:16px}
.rev-stars{color:#c9a96e;font-size:1.1rem;letter-spacing:2px;flex-shrink:0}
.rev-body{flex:1;min-width:0}
.rev-text{font-style:italic;margin-bottom:6px;font-size:.9rem;line-height:1.6}
.rev-author{font-weight:600;font-size:.82rem;color:#1a6b8a}
.rev-date{font-size:.76rem;color:#bdc3c7;margin-top:2px}

/* ── Forms ── */
.field{margin-bottom:16px}
.field label{display:block;font-size:.82rem;font-weight:600;color:#374151;margin-bottom:6px}
.field input,.field textarea,.field select{
    width:100%;padding:10px 14px;border:1.5px solid #dce6f0;border-radius:8px;
    font-family:inherit;font-size:.9rem;color:#2c3e50;background:#fff;
    transition:border-color .2s;outline:none
}
.field input:focus,.field textarea:focus,.field select:focus{border-color:#1a6b8a}
.field textarea{resize:vertical;min-height:80px}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.form-row-3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px}
.upload-area{border:2px dashed #dce6f0;border-radius:10px;padding:20px;text-align:center;cursor:pointer;transition:.2s;background:#fafbfd}
.upload-area:hover{border-color:#1a6b8a;background:#f0f7fb}
.upload-area input{display:none}
.upload-area .up-label{font-size:.85rem;color:#7f8c8d;margin-top:6px}
.upload-preview{width:100%;height:120px;object-fit:cover;border-radius:6px;margin-top:10px;display:none}

/* ── Buttons ── */
.btn-primary{width:100%;padding:12px;background:#1a6b8a;color:#fff;border:none;border-radius:8px;font-family:inherit;font-size:.9rem;font-weight:600;cursor:pointer;transition:.2s}
.btn-primary:hover{background:#145572}
.btn-sm{padding:6px 14px;border:none;border-radius:6px;font-family:inherit;font-size:.8rem;font-weight:600;cursor:pointer;transition:.2s}
.btn-danger{background:#fee2e2;color:#dc2626}
.btn-danger:hover{background:#dc2626;color:#fff}
.btn-outline{background:transparent;border:1.5px solid #1a6b8a;color:#1a6b8a;padding:10px 20px;border-radius:8px;font-family:inherit;font-size:.88rem;font-weight:600;cursor:pointer;transition:.2s}
.btn-outline:hover{background:#1a6b8a;color:#fff}

/* ── Alerts ── */
.alert{padding:12px 16px;border-radius:8px;font-size:.88rem;font-weight:500;margin-bottom:20px}
.alert-ok {background:#d1fae5;color:#065f46;border:1px solid #6ee7b7}
.alert-err{background:#fee2e2;color:#991b1b;border:1px solid #fca5a5}

/* ── Responsive ── */
@media(max-width:640px){
    .form-row,.form-row-3{grid-template-columns:1fr}
    .admin-body{padding:20px 16px}
    .card{padding:20px 16px}
    .gal-grid{grid-template-columns:1fr}
}
</style>
</head>
<body>

<header class="admin-header">
    <div class="admin-logo">🦷 Baku Estetic Clinic — Admin</div>
    <form method="POST" style="margin:0">
        <input type="hidden" name="action" value="logout">
        <button type="submit" class="admin-logout">Çıxış</button>
    </form>
</header>

<nav class="tabs">
    <button class="tab-btn <?= $tab==='gallery'  ? 'active':'' ?>" onclick="location='?tab=gallery'">📷 Qalereya (<?= count($gal) ?>)</button>
    <button class="tab-btn <?= $tab==='reviews'  ? 'active':'' ?>" onclick="location='?tab=reviews'">⭐ Rəylər (<?= count($rev) ?>)</button>
    <button class="tab-btn <?= $tab==='contact'  ? 'active':'' ?>" onclick="location='?tab=contact'">📞 Əlaqə məlumatları</button>
    <button class="tab-btn <?= $tab==='settings' ? 'active':'' ?>" onclick="location='?tab=settings'">⚙️ Parametrlər</button>
</nav>

<main class="admin-body">

<?php if ($msg): ?>
<div class="alert <?= strpos($msg,'XƏTA')===false ? 'alert-ok' : 'alert-err' ?>"><?= $msg ?></div>
<?php endif; ?>

<?php /* ═══════════════ GALLERY ═══════════════ */ if ($tab==='gallery'): ?>

<div class="card">
    <div class="card-title">📷 Mövcud foto cütləri</div>
    <?php if (empty($gal)): ?>
        <div class="empty-state"><span style="font-size:3rem">🖼️</span><p>Hələ foto yoxdur. Aşağıdan əlavə edin.</p></div>
    <?php else: ?>
    <div class="gal-grid">
        <?php foreach ($gal as $g): ?>
        <div class="gal-pair">
            <div class="gal-pair-imgs">
                <div class="gal-before">
                    <img src="../images/gallery/<?= h($g['before']) ?>" alt="Before">
                    <div class="label">Before</div>
                </div>
                <div class="gal-after">
                    <img src="../images/gallery/<?= h($g['after']) ?>" alt="After">
                    <div class="label">After</div>
                </div>
            </div>
            <?php $cap = $g['caption_az'] ?? $g['caption'] ?? ''; ?>
            <?php if ($cap): ?>
            <div class="gal-caption"><?= h($cap) ?></div>
            <?php endif; ?>
            <div class="gal-actions">
                <form method="POST" onsubmit="return confirm('Bu foto cütünü silmək istəyirsiniz?')">
                    <input type="hidden" name="action" value="delete-gallery">
                    <input type="hidden" name="id" value="<?= h($g['id']) ?>">
                    <button type="submit" class="btn-sm btn-danger">🗑 Sil</button>
                </form>
            </div>
        </div>
        <?php endforeach; ?>
    </div>
    <?php endif; ?>
</div>

<div class="card">
    <div class="card-title">➕ Yeni foto cütü əlavə et</div>
    <form method="POST" enctype="multipart/form-data">
        <input type="hidden" name="action" value="add-gallery">
        <div class="form-row">
            <div class="field">
                <label>Öncəsi şəkli (ixtiyari)</label>
                <div class="upload-area" onclick="document.getElementById('ub').click()">
                    <input type="file" id="ub" name="before" accept="image/jpeg,image/png,image/webp" onchange="preview(this,'pb')">
                    <div>📁 Şəkil seç</div>
                    <div class="up-label">JPG / PNG / WEBP — max 5 MB</div>
                    <img id="pb" class="upload-preview" alt="preview">
                </div>
            </div>
            <div class="field">
                <label>Sonrası şəkli *</label>
                <div class="upload-area" onclick="document.getElementById('ua').click()">
                    <input type="file" id="ua" name="after" accept="image/jpeg,image/png,image/webp" required onchange="preview(this,'pa')">
                    <div>📁 Şəkil seç</div>
                    <div class="up-label">JPG / PNG / WEBP — max 5 MB</div>
                    <img id="pa" class="upload-preview" alt="preview">
                </div>
            </div>
        </div>
        <div class="field">
            <label>Başlıq — Azərbaycanca</label>
            <textarea name="caption_az" rows="2" placeholder="Azərbaycanca açıqlama..."></textarea>
        </div>
        <div class="field">
            <label>Başlıq — Rusca</label>
            <textarea name="caption_ru" rows="2" placeholder="Описание на русском..."></textarea>
        </div>
        <div class="field">
            <label>Başlıq — İngiliscə</label>
            <textarea name="caption_en" rows="2" placeholder="Caption in English..."></textarea>
        </div>
        <button type="submit" class="btn-primary">Yüklə və əlavə et</button>
    </form>
</div>

<?php /* ═══════════════ REVIEWS ═══════════════ */ elseif ($tab==='reviews'): ?>

<div class="card">
    <div class="card-title">⭐ Mövcud rəylər</div>
    <?php if (empty($rev)): ?>
        <div class="empty-state"><span style="font-size:3rem">💬</span><p>Hələ rəy yoxdur. Aşağıdan əlavə edin.</p></div>
    <?php else: ?>
    <div class="rev-list">
        <?php foreach ($rev as $r): ?>
        <div class="rev-item">
            <div>
                <div class="rev-stars"><?= str_repeat('★', (int)$r['stars']) . str_repeat('☆', 5-(int)$r['stars']) ?></div>
                <form method="POST" onsubmit="return confirm('Bu rəyi silmək istəyirsiniz?')" style="margin-top:8px">
                    <input type="hidden" name="action" value="delete-review">
                    <input type="hidden" name="id" value="<?= h($r['id']) ?>">
                    <button type="submit" class="btn-sm btn-danger">🗑</button>
                </form>
            </div>
            <div class="rev-body">
                <div class="rev-text">"<?= h($r['text_az'] ?? $r['text'] ?? '') ?>"</div>
                <div class="rev-author">— <?= h($r['author']) ?></div>
                <div class="rev-date"><?= h($r['date']) ?></div>
            </div>
        </div>
        <?php endforeach; ?>
    </div>
    <?php endif; ?>
</div>

<div class="card">
    <div class="card-title">➕ Yeni rəy əlavə et</div>
    <form method="POST">
        <input type="hidden" name="action" value="add-review">
        <div class="field">
            <label>Ulduz sayı</label>
            <select name="stars">
                <?php for ($i=5;$i>=1;$i--): ?>
                <option value="<?= $i ?>"><?= str_repeat('★',$i) ?> (<?= $i ?>)</option>
                <?php endfor; ?>
            </select>
        </div>
        <div class="field">
            <label>Rəy mətni — Azərbaycanca *</label>
            <textarea name="text_az" required placeholder="Xəstənin rəyini azərbaycanca yazın..."></textarea>
        </div>
        <div class="field">
            <label>Rəy mətni — Rusca</label>
            <textarea name="text_ru" placeholder="Отзыв на русском языке..."></textarea>
        </div>
        <div class="field">
            <label>Rəy mətni — İngiliscə</label>
            <textarea name="text_en" placeholder="Review in English..."></textarea>
        </div>
        <div class="field">
            <label>Xəstənin adı *</label>
            <input type="text" name="author" required placeholder="Məs: Aynur X., Rauf M.">
        </div>
        <button type="submit" class="btn-primary">Rəy əlavə et</button>
    </form>
</div>

<?php /* ═══════════════ CONTACT ═══════════════ */ elseif ($tab==='contact'): ?>

<div class="card">
    <div class="card-title">📞 Əlaqə məlumatlarını redaktə et</div>
    <form method="POST">
        <input type="hidden" name="action" value="save-contact">
        <div class="form-row">
            <div class="field">
                <label>Telefon nömrəsi</label>
                <input type="text" name="phone" value="<?= h($cont['phone']) ?>">
            </div>
            <div class="field">
                <label>E-poçt</label>
                <input type="email" name="email" value="<?= h($cont['email']) ?>">
            </div>
        </div>
        <div class="field">
            <label>Ünvan</label>
            <input type="text" name="address" value="<?= h($cont['address']) ?>">
        </div>
        <hr style="margin:20px 0;border:none;border-top:1px solid #f0f4f8">
        <p style="font-size:.82rem;color:#7f8c8d;margin-bottom:16px">İş saatları — hər dil üçün ayrıca. &lt;br&gt; istifadə edərək sətir keçidi əlavə edə bilərsiniz.</p>
        <div class="field">
            <label>İş saatları (Azərbaycan dilində)</label>
            <textarea name="hours_az"><?= h($cont['hours_az']) ?></textarea>
        </div>
        <div class="field">
            <label>İş saatları (Rus dilində)</label>
            <textarea name="hours_ru"><?= h($cont['hours_ru']) ?></textarea>
        </div>
        <div class="field">
            <label>İş saatları (İngilis dilində)</label>
            <textarea name="hours_en"><?= h($cont['hours_en']) ?></textarea>
        </div>
        <button type="submit" class="btn-primary">Saxla</button>
    </form>
</div>

<?php /* ═══════════════ SETTINGS ═══════════════ */ elseif ($tab==='settings'): ?>

<div class="card" style="max-width:480px">
    <div class="card-title">🔒 Şifrəni dəyiş</div>
    <form method="POST">
        <input type="hidden" name="action" value="change-password">
        <div class="field">
            <label>Yeni şifrə (ən azı 6 simvol)</label>
            <input type="password" name="password" required minlength="6">
        </div>
        <div class="field">
            <label>Yeni şifrəni təkrarla</label>
            <input type="password" name="confirm" required minlength="6">
        </div>
        <button type="submit" class="btn-primary">Şifrəni dəyiş</button>
    </form>
</div>

<div class="card" style="max-width:480px">
    <div class="card-title">ℹ️ Texniki məlumat</div>
    <p style="font-size:.85rem;line-height:1.8;color:#6b7280">
        <strong>PHP versiyası:</strong> <?= PHP_VERSION ?><br>
        <strong>Sayt kökü:</strong> <?= h($ROOT) ?><br>
        <strong>Qalereya qovluğu:</strong> <?= is_writable($GAL_DIR) || !is_dir($GAL_DIR) ? '✅ Yazıla bilər' : '❌ Yazıla bilməz — chmod 755' ?><br>
        <strong>Data qovluğu:</strong> <?= is_writable($DATA_DIR) ? '✅ Yazıla bilər' : '❌ Yazıla bilməz — chmod 755' ?>
    </p>
</div>

<?php endif; ?>

</main>

<script>
function preview(input, imgId) {
    const img = document.getElementById(imgId);
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            img.src = e.target.result;
            img.style.display = 'block';
        };
        reader.readAsDataURL(input.files[0]);
        input.closest('.upload-area').querySelector('div').textContent = input.files[0].name;
    }
}
</script>
</body>
</html>
