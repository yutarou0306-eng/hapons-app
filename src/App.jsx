<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>お勘定奉行 幹事郎</title>
  <style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,'Hiragino Sans','Noto Sans JP',sans-serif;background:#f5f5f0;color:#1a1a1a;padding:12px;max-width:780px;margin:0 auto;-webkit-text-size-adjust:100%;overflow-x:hidden}
input,select{border:0.5px solid #ccc;border-radius:6px;padding:8px 10px;font-size:16px;width:100%;font-family:inherit;background:#fff;color:#1a1a1a}
input:focus,select:focus{outline:none;border-color:#378ADD}
.page-wrap{overflow:hidden;width:100%}
.pages{display:flex;transition:transform 0.3s cubic-bezier(0.4,0,0.2,1);will-change:transform;touch-action:pan-y}
.page{width:100vw;max-width:780px;min-width:0;flex-shrink:0;padding:0.5rem 0;overflow-x:hidden;box-sizing:border-box}
.card{background:#fff;border:0.5px solid #e0e0d8;border-radius:12px;padding:0.875rem 1rem;margin-bottom:10px;width:100%;overflow:hidden}
h3{font-size:14px;font-weight:500;color:#1a1a1a;margin-bottom:8px}
label{font-size:12px;color:#666;display:block;margin-bottom:3px}
.btn{background:#fff;border:0.5px solid #ccc;border-radius:8px;padding:10px 16px;font-size:14px;cursor:pointer;color:#1a1a1a;font-family:inherit;-webkit-tap-highlight-color:transparent}
.btn:active{opacity:0.7}
.btn-primary{background:#e8f0fb;border-color:#a0bfef;color:#185FA5;font-weight:500}
.btn-success{background:#e6f4ef;border-color:#8ecdb5;color:#1a7a56;font-weight:500}
.btn-sm{padding:6px 11px;font-size:12px}
.btn-icon{padding:5px 8px;font-size:12px;border:0.5px solid #e0e0d8;border-radius:6px;cursor:pointer;background:transparent;color:#888;-webkit-tap-highlight-color:transparent}
.nav{display:flex;gap:4px;margin-bottom:0.75rem;border-bottom:0.5px solid #e0e0d8;padding-bottom:0.5rem}
.nav-btn{flex:1;padding:6px 4px;font-size:11px;border:none;border-radius:100px;cursor:pointer;white-space:nowrap;background:transparent;color:#888;font-family:inherit;-webkit-tap-highlight-color:transparent;text-align:center}
.nav-btn.active{background:#e8f0fb;color:#185FA5;font-weight:500}
.pill-tag{display:inline-block;padding:2px 8px;border-radius:100px;font-size:11px;font-weight:500}

/* 人数ロール */
.count-roll-wrap{display:flex;align-items:center;gap:10px}
.count-roll{width:90px;font-size:18px;font-weight:500;text-align:center;padding:6px 4px}

/* 参加者リスト */
.person-list{display:flex;flex-direction:column;gap:6px}
.person-item{display:flex;align-items:center;gap:8px;padding:8px 10px;background:#f5f5f0;border-radius:8px}
.person-item input{flex:1;border:none;background:transparent;font-size:14px;font-weight:500;color:#1a1a1a;padding:0}
.person-item input:focus{outline:none}
.person-item input::placeholder{color:#bbb}
.person-num{width:24px;text-align:right;font-size:12px;color:#bbb;flex-shrink:0}
.person-kanji-btn{padding:3px 8px;font-size:11px;border:0.5px solid #ddd;border-radius:100px;cursor:pointer;background:#fff;color:#888;font-family:inherit;-webkit-tap-highlight-color:transparent;white-space:nowrap;flex-shrink:0}
.person-kanji-btn.active{background:#FFF3CD;border-color:#FFDA6A;color:#856404;font-weight:500}

/* カテゴリ */
.cat-row{display:flex;align-items:center;gap:6px;padding:7px 0;border-bottom:0.5px solid #e0e0d8}
.cat-row:last-child{border-bottom:none}
.cat-row.ghost{opacity:0.38}
.cat-chip{display:inline-block;padding:3px 9px;border-radius:100px;font-size:11px;font-weight:500;cursor:pointer;border:0.5px solid transparent;white-space:nowrap;margin:2px 2px;-webkit-tap-highlight-color:transparent}

/* 座席図 */
.table-scene{display:flex;flex-direction:column;gap:20px;align-items:center;padding:8px 0}
.table-viz{position:relative}
.rect-body{background:#B5D4F4;border-radius:6px;display:flex;align-items:center;justify-content:center;position:absolute}
.round-body{background:#C0DD97;border-radius:50%;display:flex;align-items:center;justify-content:center;position:absolute}
.counter-body{background:#F5C4B3;border-radius:6px;display:flex;align-items:center;justify-content:center;position:absolute}
.t-label{font-size:10px;font-weight:500;color:#0C447C;text-align:center;line-height:1.3}
.round-body .t-label{color:#27500A}
.counter-body .t-label{color:#993C1D}
.seat{position:absolute;width:42px;height:42px;border-radius:50%;background:#f0f0ea;border:0.5px solid #ddd;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:9px;text-align:center;color:#888;line-height:1.2;word-break:break-all;overflow:hidden;-webkit-tap-highlight-color:transparent;transition:border-color 0.1s}
.seat.assigned{background:#fff;border:1.5px solid #378ADD;color:#1a1a1a;font-weight:500}
.seat.empty-seat{background:#f0f0ea}
.seat.counter-seat{border-radius:4px}

/* テーブルコントロール */
.tbl-ctrl{display:flex;align-items:center;gap:6px;margin-top:6px;flex-wrap:wrap;justify-content:center}
.seat-stepper{display:flex;align-items:center;border:0.5px solid #e0e0d8;border-radius:100px;overflow:hidden;background:#fff}
.seat-stepper button{width:32px;height:28px;border:none;background:#f5f5f0;color:#1a1a1a;font-size:16px;cursor:pointer;-webkit-tap-highlight-color:transparent;display:flex;align-items:center;justify-content:center}
.seat-stepper button:active{background:#e5e5e0}
.seat-stepper span{min-width:34px;text-align:center;font-size:12px;font-weight:500;background:#fff;line-height:28px}
.tbl-type-select{font-size:11px;border:0.5px solid #e0e0d8;border-radius:100px;padding:2px 8px;background:#f5f5f0;color:#888;width:auto;height:28px}
.tbl-del-btn{padding:3px 8px;font-size:11px;border:0.5px solid #f0a0a0;border-radius:100px;cursor:pointer;background:#fdeaea;color:#c0392b;font-family:inherit;-webkit-tap-highlight-color:transparent}

/* 座席選択ポップオーバー */
.seat-popup{position:fixed;z-index:200;background:#fff;border:0.5px solid #e0e0d8;border-radius:12px;padding:6px;box-shadow:0 4px 20px rgba(0,0,0,0.14);min-width:150px;max-width:220px;max-height:260px;overflow-y:auto}
.seat-popup-item{padding:8px 12px;font-size:13px;cursor:pointer;border-radius:8px;display:flex;align-items:center;gap:8px;-webkit-tap-highlight-color:transparent}
.seat-popup-item:active{background:#f5f5f0}
.seat-popup-item.assigned-elsewhere{opacity:0.35;pointer-events:none}
.seat-popup-clear{padding:8px 12px;font-size:12px;cursor:pointer;border-radius:8px;color:#c0392b;border-top:0.5px solid #e0e0d8;margin-top:4px}
.seat-popup-clear:active{background:#fdeaea}

/* 個人別請求 */
.br{display:flex;align-items:center;padding:13px 2px;border-bottom:0.5px solid #e0e0d8;gap:6px}
.br:first-child{border-top:0.5px solid #e0e0d8}
.br.is-paid .br-name,.br.is-paid .br-amt{color:#aaa}
.br-name{font-size:14px;font-weight:500;color:#1a1a1a;flex:1;min-width:0;display:flex;align-items:center;gap:4px;overflow:hidden}
.br-cat{font-size:11px;flex-shrink:0;cursor:pointer;-webkit-tap-highlight-color:transparent}
.br-amt{font-size:14px;font-weight:500;color:#185FA5;white-space:nowrap;cursor:pointer;padding:4px 8px;border-radius:6px;min-width:58px;text-align:right;flex-shrink:0;border:0.5px solid #a0bfef;background:#f0f7ff;display:flex;align-items:center;gap:3px}
.br-amt:active{background:#d8eaf8}
.br-amt-input{width:78px;font-size:16px;font-weight:500;text-align:right;border:none;border-bottom:1.5px solid #378ADD;background:transparent;color:#1a1a1a;outline:none;padding:2px 4px;flex-shrink:0}
.br-pay-btn{padding:6px 12px;font-size:12px;border:0.5px solid #a0bfef;border-radius:100px;cursor:pointer;background:#185FA5;color:#fff;white-space:nowrap;flex-shrink:0;font-family:inherit;font-weight:500;-webkit-tap-highlight-color:transparent}
.br-pay-btn:active{opacity:0.8}
.br-pay-btn.paid{background:#e6f4ef;border-color:#8ecdb5;color:#1a7a56;font-weight:500}
.br-kanji-btn{padding:3px 7px;font-size:10px;border:0.5px solid #ddd;border-radius:100px;cursor:pointer;background:#fff;color:#888;font-family:inherit;-webkit-tap-highlight-color:transparent;white-space:nowrap;flex-shrink:0}
.br-kanji-btn.active{background:#FFF3CD;border-color:#FFDA6A;color:#856404;font-weight:500}

/* サマリー */
.metric{background:#f5f5f0;border-radius:8px;padding:8px;min-width:0;overflow:hidden}
.metric-label{font-size:10px;color:#888;margin-bottom:3px}
.metric-value{font-size:16px;font-weight:500;color:#1a1a1a;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.metric-value.hi{color:#185FA5}
.metric-sub{font-size:9px;margin-top:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.surplus{color:#1D9E75}.deficit{color:#E24B4A}
.progress-bar{height:5px;background:#e0e0d8;border-radius:4px;overflow:hidden;margin:8px 0}
.progress-fill{height:100%;background:#1D9E75;border-radius:4px;transition:width 0.3s}
.grid3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:5px;width:100%}
.billing-input-area{background:#eaf3ff;border:1.5px solid #a0bfef;border-radius:10px;padding:12px 14px;margin-bottom:12px;width:100%}
.billing-input-area label{font-size:13px;color:#185FA5;font-weight:500;margin-bottom:6px;display:block}
.billing-input-area input{font-size:20px;font-weight:500;border:none;border-bottom:2px solid #378ADD;border-radius:0;background:transparent;color:#1a1a1a;padding:4px 2px;width:100%}
.billing-input-area input:focus{outline:none;border-bottom-color:#185FA5}

/* 幹事 */
.kanji-badge{display:inline-block;padding:1px 5px;border-radius:100px;font-size:10px;font-weight:500;background:#FFF3CD;color:#856404;border:0.5px solid #FFDA6A;flex-shrink:0}
.btn-kanji-surplus{width:100%;margin-top:6px;padding:9px;font-size:12px;background:#FFF3CD;border:0.5px solid #FFDA6A;color:#856404;border-radius:8px;cursor:pointer;font-family:inherit;font-weight:500;-webkit-tap-highlight-color:transparent}
.btn-kanji-surplus:active{opacity:0.7}
.btn-kanji-revert{width:100%;margin-top:4px;padding:7px;font-size:11px;background:#fff;border:0.5px solid #ccc;color:#888;border-radius:8px;cursor:pointer;font-family:inherit;-webkit-tap-highlight-color:transparent}

/* 結果 */
.result-header{text-align:center;padding:16px 0 14px}
.result-row{display:flex;justify-content:space-between;align-items:center;padding:11px 0;border-bottom:0.5px solid #e0e0d8}
.result-row:last-child{border-bottom:none}
.result-row-label{font-size:13px;color:#888}
.result-row-val{font-size:14px;font-weight:500;color:#1a1a1a}
.share-btn{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:13px;font-size:14px;font-weight:500;border-radius:10px;cursor:pointer;margin-bottom:8px;border:none;font-family:inherit;-webkit-tap-highlight-color:transparent}
.share-line{background:#06C755;color:#fff}
.share-viber{background:#7360F2;color:#fff}
.share-sms{background:#5856D6;color:#fff}
.pax-badge{display:inline-flex;align-items:center;gap:5px;background:#f5f5f0;border-radius:100px;padding:4px 12px;font-size:13px;font-weight:500;color:#1a1a1a}

/* カテゴリポップオーバー */
.cat-popup{position:fixed;z-index:200;background:#fff;border:0.5px solid #e0e0d8;border-radius:12px;padding:6px;box-shadow:0 4px 20px rgba(0,0,0,0.14);min-width:150px;max-width:210px}
.cat-popup-item{padding:8px 10px;font-size:13px;cursor:pointer;border-radius:8px;display:flex;align-items:center;gap:8px;-webkit-tap-highlight-color:transparent}
.cat-popup-item:active,.cat-popup-item.selected{background:#f5f5f0}
.cat-popup-add{padding:8px 10px;font-size:12px;cursor:pointer;border-radius:8px;display:flex;align-items:center;gap:6px;color:#185FA5;border-top:0.5px solid #e0e0d8;margin-top:4px;font-weight:500}

/* モーダル */
.modal-bg{position:fixed;inset:0;background:rgba(0,0,0,0.45);display:flex;align-items:center;justify-content:center;z-index:100;padding:16px}
.cat-add-modal{background:#fff;border-radius:14px;padding:1.25rem;width:100%;max-width:300px;border:0.5px solid #e0e0d8}
.cat-add-row{display:flex;align-items:center;gap:8px;margin-bottom:10px}
.cat-add-row label{min-width:52px;font-size:12px;color:#666;margin:0}
.cat-add-row input{font-size:15px}
.color-picker{display:flex;gap:8px;flex-wrap:wrap;margin:8px 0 14px}
.color-dot{width:28px;height:28px;border-radius:50%;cursor:pointer;border:2px solid transparent;-webkit-tap-highlight-color:transparent}
.color-dot.selected{border-color:#1a1a1a}

.toast{position:fixed;bottom:28px;left:50%;transform:translateX(-50%);background:#1a1a1a;color:#fff;padding:9px 20px;border-radius:100px;font-size:13px;opacity:0;transition:opacity 0.3s;z-index:300;pointer-events:none;white-space:nowrap}
.toast.show{opacity:1}
@media(max-width:480px){body{padding:10px}.grid3{gap:4px}.metric-value{font-size:15px}.metric-label{font-size:9px}.br-name{font-size:13px}.br-amt{font-size:13px;min-width:50px}.br-pay-btn{padding:4px 8px;font-size:11px}.billing-input-area{padding:10px 12px}}
  </style>
</head>
<body>


<div style="display:flex;align-items:baseline;justify-content:space-between;padding-top:0.25rem;margin-bottom:2px">
  <div style="display:flex;align-items:baseline;gap:8px">
    <span style="font-size:19px;font-weight:500">お勘定奉行</span>
    <span style="font-size:13px;color:#888">幹事郎</span>
    <span style="font-size:17px">🍺</span>
  </div>
  <div style="display:flex;gap:6px;align-items:center">
    <button onclick="shareHeaderLine()" style="display:flex;align-items:center;gap:4px;padding:5px 10px;border-radius:100px;font-size:11px;font-weight:500;cursor:pointer;border:none;background:#06C755;color:#fff;font-family:inherit;-webkit-tap-highlight-color:transparent">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/></svg>
      LINE
    </button>
    <button onclick="shareHeaderCopy()" style="padding:5px 10px;border-radius:100px;font-size:11px;font-weight:500;cursor:pointer;border:0.5px solid #ddd;background:#f5f5f0;color:#555;font-family:inherit;-webkit-tap-highlight-color:transparent">🔗 リンク</button>
  </div>
</div>
<p style="font-size:11px;color:#888;margin-bottom:10px">飲み会の集金を、もれなく・かんたんに。</p>

<div class="nav" id="nav">
  <button class="nav-btn active" onclick="goPage(0)">🗓 基本情報</button>
  <button class="nav-btn" onclick="goPage(1)">🪑 座席登録<span style="font-size:9px;color:#aaa;display:block;line-height:1">（任意）</span></button>
  <button class="nav-btn" onclick="goToBilling()">🧾 お会計</button>
</div>

<div class="page-wrap" id="page-wrap">
<div class="pages" id="pages">

<!-- PAGE 0: 基本情報 -->
<div class="page" id="page-0">

  <div class="card">
    <h3>🗓 飲み会情報</h3>
    <label>タイトル</label>
    <input type="text" id="ev-title" placeholder="例：4月歓迎会" style="margin-bottom:10px">
    <label>日付</label>
    <input type="date" id="ev-date" style="margin-bottom:10px">
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
      <span style="font-size:12px;color:#888">表示：</span>
      <span id="date-preview" style="font-size:14px;font-weight:500">—</span>
    </div>
    <label>参加人数</label>
    <div class="count-roll-wrap">
      <select id="count-sel" class="count-roll" >
        <option value="">—</option>
      </select>
      <span style="font-size:14px;color:#888">名</span>
    </div>
  </div>

  <!-- 参加者名前登録 -->
  <div class="card" id="persons-card" style="display:none">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
      <h3 style="margin:0">👥 参加者登録</h3>
      <span style="font-size:11px;color:#888">名前を入力してください</span>
    </div>
    <div class="person-list" id="person-list"></div>
  </div>

  <!-- 傾斜カテゴリ -->
  <div class="card">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
      <h3 style="margin:0">⚖️ 傾斜カテゴリ</h3>
      <button class="btn btn-sm" onclick="openAddCatModal(null)">＋ 追加</button>
    </div>
    <p style="font-size:11px;color:#888;margin-bottom:10px">カテゴリ名と倍率を設定。各参加者に割り当てできます。</p>
    <div id="cat-list"></div>
  </div>

  <!-- メインCTA：お会計へ直行 -->
  <button class="btn btn-primary" onclick="goToBilling()" style="width:100%;margin-top:4px;padding:13px;font-size:15px;font-weight:500">🧾 お会計へ →</button>
  <!-- サブ：座席登録（任意） -->
  <div style="display:flex;align-items:center;gap:8px;border:0.5px solid #e0e0d8;border-radius:10px;padding:10px 14px;margin-top:8px;background:#fafaf8">
    <div style="flex:1">
      <div style="font-size:12px;font-weight:500;color:#555;margin-bottom:1px">🪑 座席を登録する場合（任意）</div>
      <div style="font-size:11px;color:#aaa">誰がどの席に座るか記録できます</div>
    </div>
    <button onclick="goPage(1)" style="padding:7px 12px;border-radius:8px;font-size:12px;font-weight:500;cursor:pointer;border:0.5px solid #ddd;background:#fff;color:#666;font-family:inherit;-webkit-tap-highlight-color:transparent;white-space:nowrap;flex-shrink:0">座席登録へ</button>
  </div>
  <!-- 途中保存 -->
  <div style="display:flex;align-items:center;gap:8px;border:0.5px solid #e0e0d8;border-radius:8px;padding:8px 12px;margin-top:6px;background:#fafaf8">
    <span style="font-size:11px;color:#999;flex:1">💾 入力内容をキープしたい場合は→</span>
    <button onclick="saveStateUrl()" style="padding:5px 10px;border-radius:6px;font-size:11px;font-weight:500;cursor:pointer;border:0.5px solid #ccc;background:#fff;color:#666;font-family:inherit;-webkit-tap-highlight-color:transparent;white-space:nowrap;flex-shrink:0">URLを発行</button>
  </div>
</div>

<!-- PAGE 1: 座席登録 -->
<div class="page" id="page-1">
  <div class="card">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
      <h3 style="margin:0">🪑 座席配置</h3>
      <div id="pax-badge" class="pax-badge">👤 0名</div>
    </div>
    <p style="font-size:11px;color:#888;margin-bottom:8px">席の＋をタップ→参加者割り当て・カテゴリ変更・新規追加。テーブルをタップ→種別変更。</p>
    <!-- 座席図：横スクロール可 -->
    <div style="overflow-x:auto;-webkit-overflow-scrolling:touch;margin:0 -4px;padding:0 4px">
      <div class="table-scene" id="table-scene"></div>
    </div>
    <!-- テーブル追加（配置図の下） -->
    <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:12px;padding-top:10px;border-top:0.5px solid #e0e0d8;align-items:center">
      <span style="font-size:11px;color:#888">テーブル追加：</span>
      <button class="btn btn-sm" onclick="addTable('rect');renderScene()">＋ 四角</button>
      <button class="btn btn-sm" onclick="addTable('round');renderScene()">＋ 円卓</button>
      <button class="btn btn-sm" onclick="addTable('counter');renderScene()">＋ カウンター</button>
    </div>
  </div>

  <!-- 幹事未設定の警告 -->
  <div id="kanji-warning" style="display:none;background:#FFF3CD;border:0.5px solid #FFDA6A;border-radius:10px;padding:10px 14px;margin-bottom:10px;font-size:13px;color:#856404;font-weight:500">
    👑 幹事が設定されていません。席をタップして幹事を1人以上設定してください。
  </div>

  <!-- 未割当て一覧 -->
  <div class="card" id="unassigned-card">
    <h3 style="margin-bottom:6px">未割当て</h3>
    <div id="unassigned-list"><p style="font-size:12px;color:#888">全員割り当て済みです ✅</p></div>
  </div>

  <!-- 途中保存カード -->
  <div class="card" style="background:#f0f7ff;border-color:#a0bfef;margin-bottom:8px">
    <div style="display:flex;align-items:center;gap:10px">
      <div style="flex:1">
        <div style="font-size:13px;font-weight:500;color:#185FA5;margin-bottom:2px">💾 座席情報も含めて保存する</div>
        <div style="font-size:11px;color:#555">基本情報＋座席配置まで含めた最新の状態をURLに保存します</div>
      </div>
      <button onclick="saveStateUrl()" style="padding:8px 14px;border-radius:8px;font-size:12px;font-weight:500;cursor:pointer;border:0.5px solid #a0bfef;background:#185FA5;color:#fff;font-family:inherit;-webkit-tap-highlight-color:transparent;white-space:nowrap;flex-shrink:0">URLを発行</button>
    </div>
  </div>

  <div style="display:flex;gap:8px;margin-top:4px">
    <button class="btn" onclick="goPage(0)" style="flex:1;font-size:13px">← 基本情報</button>
    <button class="btn btn-primary" onclick="goToBilling()" style="flex:2;font-size:13px">🧾 お会計へ</button>
  </div>
</div>

<!-- PAGE 2: お会計 -->
<div class="page" id="page-2">
  <div class="card">
    <div class="billing-input-area">
      <label>💴 お会計の合計金額を入力してください</label>
      <input type="number" id="total-input" placeholder="例：50000" inputmode="numeric">
      <div id="per-person-hint" style="display:none;margin-top:10px;background:#fff;border:0.5px solid #a0bfef;border-radius:8px;padding:8px 12px"></div>
    </div>
    <div class="grid3" style="margin-bottom:6px">
      <div class="metric">
        <div class="metric-label">代金合計</div>
        <div class="metric-value" id="b-total">¥0</div>
        <div class="metric-sub" id="b-per-person" style="color:#888"></div>
      </div>
      <div class="metric">
        <div class="metric-label">集金済み</div>
        <div class="metric-value hi" id="b-collected">¥0</div>
        <div class="metric-sub" id="b-rnd-info" style="color:#888"></div>
      </div>
      <div class="metric">
        <div class="metric-label">余り</div>
        <div class="metric-value" id="b-remainder">¥0</div>
        <div class="metric-sub" id="b-paid-count" style="color:#888">0/0人</div>
      </div>
    </div>
    <div id="kanji-surplus-wrap" style="display:none">
      <button class="btn-kanji-surplus" id="btn-kanji-surplus" onclick="applyRemainderToKanji()">👑 余りを幹事に充当する</button>
      <button class="btn-kanji-revert" id="btn-kanji-revert" onclick="revertKanjiSurplus()" style="display:none">↩️ 幹事充当を元に戻す</button>
    </div>
    <div class="progress-bar"><div class="progress-fill" id="b-prog" style="width:0%"></div></div>
  </div>
  <div class="card">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
      <h3 style="margin:0">👥 個人別請求</h3>
      <span style="font-size:11px;color:#888">金額・カテゴリ・幹事をタップで変更</span>
    </div>
    <div id="billing-list"></div>
  </div>
  <button class="btn btn-success" onclick="goResult()" style="width:100%;font-size:14px;padding:13px;margin-top:4px">🎉 集金完了・結果を見る</button>
</div>

<!-- PAGE 3: 結果 -->
<div class="page" id="page-3">
  <div class="result-header">
    <div style="font-size:34px;margin-bottom:8px">🎊</div>
    <div style="font-size:21px;font-weight:500;margin-bottom:4px" id="r-title">飲み会</div>
    <div style="font-size:13px;color:#888" id="r-date"></div>
  </div>
  <div class="card"><div id="result-stats"></div></div>
  <div class="card"><h3 style="margin-bottom:8px">👥 個人別まとめ</h3><div id="result-people"></div></div>
  <div class="card">
    <h3 style="margin-bottom:10px">📤 シェア</h3>
    <button class="share-btn share-line" onclick="shareLine()">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/></svg>
      LINEで共有
    </button>
    <button class="share-btn share-viber" onclick="shareViber()">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M11.985 0C5.37 0 .015 5.355.015 11.97c0 2.84.995 5.445 2.64 7.485L.9 23.25l3.975-1.725A11.88 11.88 0 0011.985 24C18.6 24 24 18.645 24 12.03 24 5.37 18.6 0 11.985 0zm6.15 16.665c-.27.765-1.35 1.41-2.205 1.59-.585.12-1.35.21-3.93-.84-3.285-1.335-5.415-4.665-5.58-4.875-.165-.225-1.32-1.755-1.32-3.345s.84-2.37 1.14-2.685c.27-.285.585-.36.78-.36s.39 0 .555.015c.18.015.42-.06.66.495.24.585.81 1.98.885 2.13.075.135.12.3.03.48-.09.195-.135.315-.27.48-.135.165-.285.36-.405.48-.135.135-.27.285-.12.555.15.27.675 1.11 1.455 1.8 1.005.885 1.845 1.17 2.115 1.305.27.12.42.105.585-.06.165-.18.705-.825.885-1.11.18-.27.36-.225.615-.135.255.09 1.62.765 1.89.9.27.135.45.21.525.315.06.12.06.675-.21 1.44z"/></svg>
      Viberで共有
    </button>
    <button class="share-btn share-sms" onclick="shareSMS()">💬 SMSで共有</button>
    <button class="share-btn btn" onclick="copyResult()" style="margin-bottom:0">📋 テキストをコピー</button>
  </div>
  <div style="display:flex;gap:8px;margin-top:4px">
    <button class="btn" onclick="goPage(2)" style="flex:1;font-size:13px">← お会計に戻る</button>
    <button class="btn btn-primary" onclick="resetAll()" style="flex:1;font-size:13px">🏠 トップに戻る</button>
  </div>
</div>

</div></div>

<!-- MODAL: カテゴリ -->
<div class="modal-bg" id="cat-add-modal-bg" style="display:none" onclick="if(event.target===this)closeAddCatModal()">
  <div class="cat-add-modal">
    <h3 id="cat-modal-title" style="margin-bottom:12px">カテゴリを追加</h3>
    <div class="cat-add-row"><label>名前</label><input type="text" id="cat-modal-name" placeholder="例：若手" maxlength="10"></div>
    <div class="cat-add-row"><label>倍率</label><input type="number" id="cat-modal-rate" value="1.0" min="0.1" max="9.9" step="0.1" inputmode="decimal" style="width:90px"><span style="font-size:13px;color:#888">倍</span></div>
    <label style="margin-bottom:6px">カラー</label>
    <div class="color-picker" id="cat-color-picker"></div>
    <div style="display:flex;gap:8px">
      <button class="btn" onclick="closeAddCatModal()" style="flex:1">キャンセル</button>
      <button class="btn btn-primary" onclick="saveAddCatModal()" style="flex:2">保存</button>
    </div>
  </div>
</div>

<div id="seat-popup" class="seat-popup" style="display:none"></div>
<div id="cat-popup" class="cat-popup" style="display:none"></div>
<div id="toast" class="toast">コピーしました！</div>

<script>
// ===== STATE =====
const S={
  title:'',date:'',count:0,
  persons:[],
  cats:[{id:'c0',name:'一般',rate:1.0,color:'#C0DD97',tc:'#27500A'}],
  tables:[],
  assignments:{},
  amounts:{},
  paid:{},
  doneRecords:[],
  kanjiSnapshot:null
};
let catIdCnt=1,editCatIdx=null,currentPage=0,activeSeatKey=null;
const fmt=n=>{const v=Math.round(n);return isNaN(v)||!isFinite(v)?'¥0':'¥'+v.toLocaleString();};
const r500up=n=>Math.ceil(n/500)*500;
const r500dn=n=>Math.floor(n/500)*500;
const DAYS=['日','月','火','水','木','金','土'];
const TBL_LABELS={'rect':'四角テーブル','round':'円卓','counter':'カウンター席'};
const CAT_COLORS=[{color:'#C0DD97',tc:'#27500A'},{color:'#B5D4F4',tc:'#0C447C'},{color:'#F5C4B3',tc:'#993C1D'},{color:'#CEB5F6',tc:'#3C3489'},{color:'#FAC775',tc:'#633806'},{color:'#F4C0D1',tc:'#72243E'},{color:'#D3D1C7',tc:'#444441'},{color:'#A8E6CF',tc:'#1A5E40'}];
function fmtDate(str){if(!str)return'—';const d=new Date(str+'T00:00:00');return`${d.getMonth()+1}月${d.getDate()}日（${DAYS[d.getDay()]}）`;}
function showToast(msg){const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2200);}

// ===== NAVIGATION =====
function goPage(idx){
  currentPage=idx;
  const _pageEl=document.querySelector('.page');
  const pageW=_pageEl?_pageEl.offsetWidth:window.innerWidth;
  document.getElementById('pages').style.transform=`translateX(-${idx*pageW}px)`;
  document.querySelectorAll('.nav-btn').forEach((b,i)=>b.classList.toggle('active',i===idx));
  document.getElementById('nav').style.display=idx===3?'none':'flex';
  window.scrollTo({top:0,behavior:'instant'});
  if(idx===1)renderScene();
  if(idx===2)renderBillingPage();
  const _base=location.origin+location.pathname;
  history.pushState({page:idx},'',_base+'#p'+idx);
}
window.addEventListener('popstate',e=>{
  if(e.state&&e.state.page!==undefined){const t=Math.max(0,e.state.page-1);goPage(t);history.pushState({page:t},'',location.origin+location.pathname+'#p'+t);}
  else if(currentPage>0){goPage(currentPage-1);history.pushState({page:currentPage},'',location.origin+location.pathname+'#p'+currentPage);}
  else history.pushState({page:0},'',location.origin+location.pathname+'#p0');
});

// Swipe
(function(){
  var wrap=document.getElementById('page-wrap');
  if(!wrap)return;
  var sx=0,sy=0,moved=false,tracking=false;
  wrap.addEventListener('touchstart',function(e){sx=e.touches[0].clientX;sy=e.touches[0].clientY;moved=false;tracking=true;},{passive:true});
  wrap.addEventListener('touchmove',function(e){if(!tracking)return;var dx=e.touches[0].clientX-sx,dy=e.touches[0].clientY-sy;if(!moved&&Math.abs(dy)>Math.abs(dx)){tracking=false;return;}if(Math.abs(dx)>8)moved=true;},{passive:true});
  wrap.addEventListener('touchend',function(e){
    if(!moved){tracking=false;return;}
    var dx=e.changedTouches[0].clientX-sx,maxP=2;
    if(dx<-50&&currentPage<maxP)goPage(currentPage+1);
    else if(dx>50&&currentPage>0)goPage(currentPage-1);
    tracking=false;moved=false;
  },{passive:true});
})();

// ===== DATE =====


// ===== COUNT =====
(function(){
  var sel=document.getElementById('count-sel');
  for(var i=1;i<=50;i++){var o=document.createElement('option');o.value=i;o.textContent=i;sel.appendChild(o);}
})();

function onCountChange(val){
  var n=parseInt(val)||0;S.count=n;
  while(S.persons.length<n)S.persons.push({name:'',catId:S.cats[0]?S.cats[0].id:'c0',isKanji:false});
  S.persons=S.persons.slice(0,n);
  if(S.tables.length===0&&n>0){S.tables.push({id:'t'+Date.now(),type:'rect',seats:n});}
  else if(S.tables.length>0){S.tables[0].seats=n;}
  renderPersonList();
  document.getElementById('persons-card').style.display=n>0?'block':'none';
}

// ===== PERSON LIST =====
function renderPersonList(){
  var list=document.getElementById('person-list');list.innerHTML='';
  S.persons.forEach(function(p,i){
    var row=document.createElement('div');row.className='person-item';
    var num=document.createElement('span');num.className='person-num';num.textContent=(i+1)+'.';
    var inp=document.createElement('input');inp.type='text';inp.placeholder='名前';inp.value=p.name;
    inp.oninput=function(e){S.persons[i].name=e.target.value;};
    inp.onblur=function(){renderScene();};
    var kb=document.createElement('button');
    kb.className='person-kanji-btn'+(p.isKanji?' active':'');
    kb.textContent=p.isKanji?'👑 幹事':'幹事';
    kb.onclick=function(){S.persons[i].isKanji=!S.persons[i].isKanji;renderPersonList();};
    var delBtn=document.createElement('button');
    delBtn.style.cssText='padding:3px 7px;font-size:13px;border:none;background:transparent;color:#ccc;cursor:pointer;flex-shrink:0;-webkit-tap-highlight-color:transparent';
    delBtn.textContent='✕';
    delBtn.onclick=function(){
      Object.keys(S.assignments).forEach(function(k){if(S.assignments[k]===i)delete S.assignments[k];});
      var newAssign={};
      Object.entries(S.assignments).forEach(function(e){var k=e[0],v=e[1];if(v>i)newAssign[k]=v-1;else if(v<i)newAssign[k]=v;});
      S.assignments=newAssign;
      S.persons.splice(i,1);S.count=S.persons.length;
      var sel=document.getElementById('count-sel');if(sel)sel.value=S.count;
      if(!S.persons.length)document.getElementById('persons-card').style.display='none';
      renderPersonList();renderScene();calcAmounts();
    };
    row.appendChild(num);row.appendChild(inp);
    S.cats.forEach(function(c){
      var chip=document.createElement('span');chip.className='cat-chip';var active=p.catId===c.id;
      chip.style.cssText=active?('background:'+c.color+';color:'+c.tc+';border-color:'+c.color):'background:#f5f5f0;color:#888;border-color:#ddd';
      chip.textContent=c.name||'?';
      chip.onclick=function(){S.persons[i].catId=c.id;renderPersonList();calcAmounts();};
      row.appendChild(chip);
    });
    row.appendChild(kb);row.appendChild(delBtn);list.appendChild(row);
  });
}

// ===== CATEGORIES =====
function openAddCatModal(editIdx){
  editCatIdx=editIdx;var isEdit=editIdx!==null;
  document.getElementById('cat-modal-title').textContent=isEdit?'カテゴリを編集':'カテゴリを追加';
  var c=isEdit?S.cats[editIdx]:null;
  document.getElementById('cat-modal-name').value=c?c.name:'';
  document.getElementById('cat-modal-rate').value=c?c.rate:1.0;
  var picker=document.getElementById('cat-color-picker');picker.innerHTML='';
  CAT_COLORS.forEach(function(col,i){
    var dot=document.createElement('div');dot.className='color-dot'+((!c&&i===0)||(c&&c.color===col.color)?' selected':'');
    dot.style.background=col.color;dot.dataset.idx=i;
    dot.onclick=function(){document.querySelectorAll('.color-dot').forEach(function(d){d.classList.remove('selected');});this.classList.add('selected');};
    picker.appendChild(dot);
  });
  document.getElementById('cat-add-modal-bg').style.display='flex';
  setTimeout(function(){document.getElementById('cat-modal-name').focus();},100);
}
function closeAddCatModal(){document.getElementById('cat-add-modal-bg').style.display='none';editCatIdx=null;}
function saveAddCatModal(){
  var name=document.getElementById('cat-modal-name').value.trim();
  var rate=parseFloat(document.getElementById('cat-modal-rate').value)||1.0;
  var selDot=document.querySelector('.color-dot.selected');
  var col=CAT_COLORS[selDot?parseInt(selDot.dataset.idx):0];
  if(!name){alert('カテゴリ名を入力してください');return;}
  if(editCatIdx!==null){S.cats[editCatIdx]=Object.assign({},S.cats[editCatIdx],{name:name,rate:rate,color:col.color,tc:col.tc});}
  else S.cats.push({id:'c'+(catIdCnt++),name:name,rate:rate,color:col.color,tc:col.tc});
  closeAddCatModal();renderCatList();renderPersonList();calcAmounts();
  if(currentPage===2)renderBillingPage();
}
var ghostCats=[{name:'若手',rate:0.7,color:'#B5D4F4',tc:'#0C447C'},{name:'遅参',rate:0.5,color:'#F5C4B3',tc:'#993C1D'}];
function renderCatList(){
  var el=document.getElementById('cat-list');if(!el)return;el.innerHTML='';
  S.cats.forEach(function(c,i){
    var row=document.createElement('div');row.className='cat-row';
    var left=document.createElement('div');left.style.cssText='display:flex;align-items:center;gap:6px;flex:1;min-width:0;cursor:pointer';
    left.innerHTML='<span class="pill-tag" style="background:'+c.color+';color:'+c.tc+';padding:3px 8px">'+(c.name||'?')+'</span><span style="font-size:13px;color:#888">×'+c.rate+'</span>';
    left.onclick=function(){openAddCatModal(i);};
    var btns=document.createElement('div');btns.style.cssText='display:flex;gap:4px';
    var eb=document.createElement('button');eb.className='btn-icon';eb.textContent='✏️';eb.onclick=function(){openAddCatModal(i);};btns.appendChild(eb);
    if(S.cats.length>1){var db=document.createElement('button');db.className='btn-icon';db.textContent='🗑';db.onclick=function(){removeCat(i);};btns.appendChild(db);}
    row.appendChild(left);row.appendChild(btns);el.appendChild(row);
  });
  ghostCats.forEach(function(g,gi){
    var row=document.createElement('div');row.className='cat-row ghost';
    row.innerHTML='<span class="pill-tag" style="background:'+g.color+';color:'+g.tc+';padding:3px 8px">'+g.name+'</span><span style="font-size:13px;color:#aaa;flex:1;margin-left:6px">×'+g.rate+'（タップで追加）</span>';
    row.style.cursor='pointer';
    row.onclick=function(){S.cats.push({id:'c'+(catIdCnt++),name:g.name,rate:g.rate,color:g.color,tc:g.tc});ghostCats.splice(gi,1);renderCatList();};
    el.appendChild(row);
  });
}
function removeCat(i){if(S.cats.length<=1)return;var rid=S.cats[i].id;S.cats.splice(i,1);S.persons.forEach(function(p){if(p.catId===rid)p.catId=S.cats[0]?S.cats[0].id:'';});renderCatList();renderPersonList();calcAmounts();}

// ===== TABLES =====
function addTable(type){S.tables.push({id:'t'+Date.now(),type:type,seats:0});}
function removeTable(i){
  var t=S.tables[i];
  Object.keys(S.assignments).filter(function(k){return k.indexOf(t.id+'_')===0;}).forEach(function(k){delete S.assignments[k];});
  S.tables.splice(i,1);renderScene();
}
function changeSeats(i,delta){
  var t=S.tables[i];var nn=Math.max(1,Math.min(40,(t.seats||0)+delta));
  if(delta<0){for(var k=nn;k<(t.seats||0);k++)delete S.assignments[t.id+'_'+k];}
  t.seats=nn;renderScene();
}
function changeTableType(i,type){S.tables[i].type=type;renderScene();}

// ===== SEAT RENDER =====
function countAssigned(){return new Set(Object.values(S.assignments).filter(function(v){return v!==null&&v!==undefined;})).size;}
function assignedPersons(){return new Set(Object.values(S.assignments).filter(function(v){return v!==null&&v!==undefined;}));}
function updatePaxBadge(){var el=document.getElementById('pax-badge');if(el)el.textContent='👤 '+countAssigned()+'/'+S.persons.filter(function(p){return p.name;}).length+'名';}

function renderScene(){
  var scene=document.getElementById('table-scene');if(!scene)return;scene.innerHTML='';
  var spPanel=document.getElementById('members-panel-sp');
  if(spPanel)spPanel.style.display=window.innerWidth<=540?'block':'none';
  if(!S.tables.length){scene.innerHTML='<p style="font-size:12px;color:#888;padding:8px 0">下のボタンでテーブルを追加してください</p>';updatePaxBadge();renderUnassigned();return;}
  var _card=document.querySelector('#page-1 .card');
  var cardW=(_card?_card.offsetWidth:0)||Math.min(window.innerWidth-24,560);
  var availW=Math.max(200,cardW-24);
  var maxSeats=S.tables.reduce(function(m,t){return Math.max(m,t.seats||0);},0);
  var maxCols=Math.max(1,Math.ceil(maxSeats/2));
  var calcSize=Math.floor((availW-20)/(maxCols+2));
  var SS=Math.max(26,Math.min(38,calcSize));
  var SH=Math.floor(SS*1.05);
  S.tables.forEach(function(t,ti){
    var wrap=document.createElement('div');wrap.style.cssText='display:flex;flex-direction:column;align-items:center;gap:4px;margin-bottom:4px';
    var n=t.seats||0;
    if(n>0){
      var viz=document.createElement('div');viz.className='table-viz';
      if(t.type==='rect'){
        var cols=Math.ceil(n/2),W=Math.max(100,cols*(SS+4)),H=Math.max(50,Math.floor(SS*0.8));
        var vW=W+SS*2+4,vH=H+SH*2+8;
        viz.style.cssText='width:'+vW+'px;height:'+vH+'px;position:relative';
        var body=document.createElement('div');body.className='rect-body';
        body.style.cssText='width:'+W+'px;height:'+H+'px;left:'+(SS+2)+'px;top:'+(SH+4)+'px;cursor:pointer';
        body.innerHTML='<span class="t-label">テーブル'+(ti+1)+'</span>';
        body.onclick=(function(ti2){return function(e){e.stopPropagation();openTableTypePopup(ti2,body);};})(ti);
        viz.appendChild(body);
        var top=Math.ceil(n/2),bot=Math.floor(n/2);
        for(var i=0;i<top;i++){var s=mkSeat(t.id,i,SS,SH);s.style.cssText='left:'+(SS+2+(i/(top-1||1))*(W-SS))+'px;top:0';viz.appendChild(s);}
        for(var i=0;i<bot;i++){var s=mkSeat(t.id,top+i,SS,SH);s.style.cssText='left:'+(SS+2+(i/(bot-1||1))*(W-SS))+'px;top:'+(H+SH+8)+'px';viz.appendChild(s);}
      } else if(t.type==='round'){
        var r=Math.max(40,Math.floor(SS*1.5)),pad=Math.floor(SS*1.1),sz=r*2+pad*2;
        viz.style.cssText='width:'+sz+'px;height:'+sz+'px;position:relative';
        var body=document.createElement('div');body.className='round-body';
        body.style.cssText='width:'+r+'px;height:'+r+'px;left:'+(pad+r/2)+'px;top:'+(pad+r/2)+'px;cursor:pointer';
        body.innerHTML='<span class="t-label">テーブル'+(ti+1)+'</span>';
        body.onclick=(function(ti2){return function(e){e.stopPropagation();openTableTypePopup(ti2,body);};})(ti);
        viz.appendChild(body);
        var cx=pad+r;
        for(var i=0;i<n;i++){var a=(2*Math.PI/n)*i-Math.PI/2;var s=mkSeat(t.id,i,SS,SH);s.style.cssText='left:'+(cx+Math.cos(a)*(r+pad/2)-SS/2)+'px;top:'+(cx+Math.sin(a)*(r+pad/2)-SH/2)+'px';viz.appendChild(s);}
      } else {
        var sW=SS+4,barH=22,bPad=14,W=Math.max(80,n*sW+bPad*2);
        viz.style.cssText='width:'+W+'px;height:'+(barH+SH+10)+'px;position:relative';
        var body=document.createElement('div');body.className='counter-body';
        body.style.cssText='width:'+W+'px;height:'+barH+'px;left:0;top:'+(SH+10)+'px;cursor:pointer';
        body.innerHTML='<span class="t-label">カウンター'+(ti+1)+'</span>';
        body.onclick=(function(ti2){return function(e){e.stopPropagation();openTableTypePopup(ti2,body);};})(ti);
        viz.appendChild(body);
        for(var i=0;i<n;i++){var s=mkSeat(t.id,i,SS,SH,'counter-seat');s.style.cssText='left:'+(bPad+i*sW)+'px;top:0';viz.appendChild(s);}
      }
      wrap.appendChild(viz);
    } else {
      var ph=document.createElement('div');ph.style.cssText='padding:8px 16px;background:#f5f5f0;border-radius:8px;font-size:12px;color:#888;text-align:center;cursor:pointer';
      ph.textContent=TBL_LABELS[t.type]+(ti+1)+'（＋で席数設定）';
      ph.onclick=(function(ti2,ph2){return function(e){e.stopPropagation();openTableTypePopup(ti2,ph2);};})(ti,ph);
      wrap.appendChild(ph);
    }
    var ctrl=document.createElement('div');ctrl.className='tbl-ctrl';
    var stepper=document.createElement('div');stepper.className='seat-stepper';
    var mb=document.createElement('button');mb.textContent='−';mb.onclick=(function(ti2){return function(){changeSeats(ti2,-1);};})(ti);
    var cs=document.createElement('span');cs.textContent=n?n+'席':'席数';
    var pb=document.createElement('button');pb.textContent='＋';pb.onclick=(function(ti2){return function(){changeSeats(ti2,1);};})(ti);
    stepper.appendChild(mb);stepper.appendChild(cs);stepper.appendChild(pb);
    var db=document.createElement('button');db.className='tbl-del-btn';db.textContent='削除';db.onclick=(function(ti2){return function(){removeTable(ti2);};})(ti);
    ctrl.appendChild(stepper);ctrl.appendChild(db);
    wrap.appendChild(ctrl);scene.appendChild(wrap);
  });
  updatePaxBadge();renderUnassigned();
}

function mkSeat(tid,idx,SS,SH,extraClass){
  SS=SS||38;SH=SH||40;
  var key=tid+'_'+idx;
  var pIdx=S.assignments[key];
  var person=(pIdx!==undefined&&pIdx!==null)?S.persons[pIdx]:null;
  var s=document.createElement('div');
  s.className='seat'+(person?' assigned':'')+(extraClass?' '+extraClass:'');
  s.style.width=SS+'px';s.style.height=SH+'px';s.style.fontSize=Math.max(8,Math.floor(SS*0.22))+'px';
  s.dataset.key=key;
  if(person){var nm=person.name||'?';s.textContent=nm.length>4?nm.slice(0,3)+'…':nm;s.title=nm;
    if(person.isKanji){var star=document.createElement('span');star.style.cssText='position:absolute;top:1px;right:2px;font-size:8px';star.textContent='👑';s.appendChild(star);}
  } else {s.innerHTML='<span style="font-size:14px;opacity:0.4">＋</span>';}
  s.onclick=(function(k){return function(e){e.stopPropagation();openSeatPopup(k,s);};})(key);
  return s;
}

function openTableTypePopup(ti,anchorEl){
  var popup=document.getElementById('seat-popup');popup.innerHTML='';
  var t=S.tables[ti];
  var hdr=document.createElement('div');hdr.style.cssText='font-size:11px;color:#888;padding:4px 10px 6px';hdr.textContent='テーブル種別を変更';popup.appendChild(hdr);
  [{v:'rect',label:'四角テーブル',emoji:'⬛'},{v:'round',label:'円卓',emoji:'⭕'},{v:'counter',label:'カウンター席',emoji:'🟧'}].forEach(function(opt){
    var item=document.createElement('div');item.className='seat-popup-item';
    item.innerHTML='<span style="font-size:14px">'+opt.emoji+'</span><span style="flex:1">'+opt.label+'</span>';
    if(t.type===opt.v)item.style.background='#e8f0fb';
    item.onclick=(function(v){return function(){S.tables[ti].type=v;closeSeatPopup();renderScene();};})(opt.v);
    popup.appendChild(item);
  });
  showPopupAt(popup,anchorEl);
}

function openSeatPopup(key,anchorEl){
  activeSeatKey=key;
  var popup=document.getElementById('seat-popup');popup.innerHTML='';
  var assigned=assignedPersons();
  var currentPIdx=S.assignments[key];
  var namedPersons=S.persons.filter(function(p){return p.name;});
  var hdr=document.createElement('div');hdr.style.cssText='font-size:11px;color:#888;padding:4px 10px 6px';hdr.textContent='参加者を選択';popup.appendChild(hdr);
  namedPersons.forEach(function(p){
    var realIdx=S.persons.indexOf(p);
    var isAssignedElsewhere=assigned.has(realIdx)&&currentPIdx!==realIdx;
    var item=document.createElement('div');item.className='seat-popup-item'+(isAssignedElsewhere?' assigned-elsewhere':'');
    var c=S.cats.find(function(c){return c.id===p.catId;})||S.cats[0];
    var dot=c?'<span class="pill-tag" style="background:'+c.color+';color:'+c.tc+';font-size:10px;padding:1px 6px">'+c.name+'</span>':'';
    var kbadge=p.isKanji?'👑 ':'';
    item.innerHTML='<span style="flex:1">'+kbadge+p.name+'</span>'+dot;
    if(currentPIdx===realIdx)item.style.background='#e8f0fb';
    if(!isAssignedElsewhere){
      item.onclick=(function(ri){return function(){
        S.assignments[key]=ri;closeSeatPopup();renderScene();calcAmounts();
        setTimeout(function(){var se=document.querySelector('.seat[data-key="'+key+'"]');if(se)openSeatPopup(key,se);},150);
      };})(realIdx);
    }
    popup.appendChild(item);
  });
  var addNew=document.createElement('div');addNew.className='seat-popup-item';addNew.style.cssText='color:#185FA5;font-weight:500';
  addNew.innerHTML='＋ 新しい参加者を追加';
  addNew.onclick=function(){
    var name=prompt('新しい参加者の名前を入力してください');if(!name||!name.trim())return;
    var n=name.trim();S.count++;S.persons.push({name:n,catId:S.cats[0]?S.cats[0].id:'c0',isKanji:false});
    var sel=document.getElementById('count-sel');if(sel)sel.value=S.count;
    document.getElementById('persons-card').style.display='block';
    renderPersonList();var newIdx=S.persons.length-1;S.assignments[key]=newIdx;
    closeSeatPopup();renderScene();calcAmounts();showToast(n+'さんを追加しました');
  };
  popup.appendChild(addNew);
  if(currentPIdx!==undefined&&currentPIdx!==null){
    var p=S.persons[currentPIdx];
    if(p){
      var kanjiSection=document.createElement('div');kanjiSection.style.cssText='border-top:0.5px solid #e0e0d8;margin-top:4px;padding-top:4px';
      var kanjiItem=document.createElement('div');kanjiItem.className='seat-popup-item';
      var isKanji=p.isKanji;
      kanjiItem.innerHTML='<span style="font-size:15px">'+(isKanji?'👑':'👤')+'</span><span style="flex:1;font-weight:'+(isKanji?'500':'400')+';color:'+(isKanji?'#856404':'#1a1a1a')+'">'+(isKanji?'幹事（タップで解除）':'幹事に設定する')+'</span>';
      if(isKanji)kanjiItem.style.background='#FFF3CD';
      kanjiItem.onclick=(function(idx){return function(){S.persons[idx].isKanji=!S.persons[idx].isKanji;renderPersonList();closeSeatPopup();renderScene();};})(currentPIdx);
      kanjiSection.appendChild(kanjiItem);
      popup.appendChild(kanjiSection);
      var catSection=document.createElement('div');catSection.style.cssText='border-top:0.5px solid #e0e0d8;margin-top:4px;padding-top:4px';
      var catLabel=document.createElement('div');catLabel.style.cssText='font-size:10px;color:#888;padding:4px 10px';catLabel.textContent='カテゴリ変更：';catSection.appendChild(catLabel);
      S.cats.forEach(function(c){
        var ci=document.createElement('div');ci.className='seat-popup-item';
        var dot=document.createElement('span');dot.className='pill-tag';dot.style.cssText='background:'+c.color+';color:'+c.tc+';padding:2px 7px;font-size:11px';dot.textContent=c.name;
        var rate=document.createElement('span');rate.style.cssText='font-size:11px;color:#888';rate.textContent='×'+c.rate;
        ci.appendChild(dot);ci.appendChild(rate);
        if(p.catId===c.id)ci.style.background='#e8f0fb';
        ci.onclick=(function(cidx,cid){return function(){S.persons[cidx].catId=cid;renderPersonList();calcAmounts();closeSeatPopup();renderScene();};})(currentPIdx,c.id);
        catSection.appendChild(ci);
      });
      popup.appendChild(catSection);
      var clearItem=document.createElement('div');clearItem.className='seat-popup-clear';clearItem.textContent='✕ 割り当てを外す';
      clearItem.onclick=function(){delete S.assignments[key];closeSeatPopup();renderScene();calcAmounts();};
      popup.appendChild(clearItem);
    }
  }
  showPopupAt(popup,anchorEl);
}

function showPopupAt(popup,anchorEl){
  popup.style.display='block';
  var rect=anchorEl.getBoundingClientRect();
  var left=rect.left,top=rect.bottom+6;
  if(left+230>window.innerWidth)left=Math.max(4,window.innerWidth-234);
  if(top+300>window.innerHeight)top=Math.max(4,rect.top-304);
  popup.style.left=left+'px';popup.style.top=top+'px';
  setTimeout(function(){document.addEventListener('click',closeSeatPopupOutside);},10);
}
function closeSeatPopup(){var p=document.getElementById('seat-popup');if(p)p.style.display='none';document.removeEventListener('click',closeSeatPopupOutside);activeSeatKey=null;}
function closeSeatPopupOutside(e){var p=document.getElementById('seat-popup');if(p&&!p.contains(e.target))closeSeatPopup();}

function renderUnassigned(){
  var el=document.getElementById('unassigned-list');if(!el)return;
  var assigned=assignedPersons();
  var unassigned=S.persons.filter(function(p,i){return p.name&&!assigned.has(i);});
  var assignedPeople=getAssignedPersons();
  var hasKanji=assignedPeople.some(function(p){return S.persons[p.idx]?S.persons[p.idx].isKanji:false;});
  var warnEl=document.getElementById('kanji-warning');
  if(warnEl)warnEl.style.display=(assignedPeople.length>0&&!hasKanji)?'block':'none';
  if(!unassigned.length){el.innerHTML='<p style="font-size:12px;color:#1D9E75;padding:4px 0">全員割り当て済みです ✅</p>';return;}
  el.innerHTML='';
  unassigned.forEach(function(p){
    var span=document.createElement('span');span.style.cssText='display:inline-block;padding:4px 10px;background:#f5f5f0;border-radius:100px;font-size:13px;font-weight:500;margin:3px 3px;color:#1a1a1a';
    span.textContent=p.name;el.appendChild(span);
  });
}

// ===== CALC =====
function getAssignedPersons(){
  var idxSet=new Set(Object.values(S.assignments).filter(function(v){return v!==null&&v!==undefined;}));
  return Array.from(idxSet).map(function(i){return Object.assign({idx:i},S.persons[i]);}).filter(function(p){return p.name;});
}

function calcAmounts(){
  var total=S.total;var people=getAssignedPersons();if(!total||!people.length)return;
  var getCat=function(p){return S.cats.find(function(c){return c.id===(S.persons[p.idx]?S.persons[p.idx].catId:'');})|| S.cats[0];};
  var ws=people.reduce(function(s,p){var c=getCat(p);return s+(c?c.rate:1);},0);if(!ws)return;
  var raws=people.map(function(p){var c=getCat(p);return((c?c.rate:1)/ws)*total;});
  var sumUp=raws.reduce(function(s,r){return s+r500up(r);},0);
  var sumDn=raws.reduce(function(s,r){return s+r500dn(r);},0);
  var useUp=Math.abs(sumUp-total)<=Math.abs(sumDn-total);
  var roundFn=useUp?r500up:r500dn;
  people.forEach(function(p,i){S.amounts[p.idx]=roundFn(raws[i]);});
  S.kanjiSnapshot=null;
  if(currentPage===2)renderBillingPage();
}

function onTotalInput(v){
  S.total=parseInt(v)||0;S.amounts={};S.kanjiSnapshot=null;
  var hint=document.getElementById('per-person-hint');
  if(hint){
    var people=getAssignedPersons();
    if(S.total>0&&people.length>0){
      var each=Math.round(S.total/people.length);
      hint.innerHTML='<div style="display:flex;align-items:center;justify-content:space-between"><span style="font-size:12px;color:#888">👤 '+people.length+'人均等割り（参考）</span><span style="font-size:18px;font-weight:500;color:#185FA5">¥'+each.toLocaleString()+'<span style="font-size:11px;font-weight:400;color:#888">／人</span></span></div>';
      hint.style.display='block';
    } else hint.style.display='none';
  }
  calcAmounts();updateSummary();
}

function updateSummary(){
  var total=S.total,people=getAssignedPersons();
  var allAmt=people.reduce(function(s,p){return s+(S.amounts[p.idx]||0);},0);
  var paidPeople=people.filter(function(p){return S.paid[p.idx];});
  var collectedAmt=paidPeople.reduce(function(s,p){return s+(S.amounts[p.idx]||0);},0);
  var paidCount=paidPeople.length,pct=total?Math.min(100,Math.round(collectedAmt/total*100)):0;
  var remainder=allAmt-total;
  document.getElementById('b-total').textContent=fmt(total);
  document.getElementById('b-collected').textContent=fmt(collectedAmt);
  var rem=document.getElementById('b-remainder');rem.textContent=remainder>=0?fmt(remainder):('−'+fmt(Math.abs(remainder)));rem.className='metric-value '+(remainder>=0?'':'deficit');
  var perEl=document.getElementById('b-per-person');if(perEl)perEl.textContent='';
  var diff=allAmt-total;
  var rndEl=document.getElementById('b-rnd-info');if(rndEl){rndEl.textContent='請求合計 '+fmt(allAmt);rndEl.style.color='#888';}
  document.getElementById('b-paid-count').textContent=paidCount+'/'+people.length+'人 支払済';
  document.getElementById('b-prog').style.width=pct+'%';
  var wrap=document.getElementById('kanji-surplus-wrap');
  var kanjiList=people.filter(function(p){return S.persons[p.idx]?S.persons[p.idx].isKanji:false;});
  var revertBtn=document.getElementById('btn-kanji-revert');
  var surplusBtn=document.getElementById('btn-kanji-surplus');
  if(wrap){
    if(remainder!==0&&kanjiList.length>0){
      var each=remainder>0?Math.floor(remainder/kanjiList.length):Math.ceil(remainder/kanjiList.length);
      surplusBtn.textContent='👑 '+(remainder>0?'余り'+fmt(remainder)+'を幹事':'不足'+fmt(Math.abs(remainder))+'を幹事が負担')+(kanjiList.length>1?kanjiList.length+'人':'')+'に充当（各'+fmt(Math.abs(each))+'引く）';
      surplusBtn.style.display='block';wrap.style.display='block';
      if(revertBtn)revertBtn.style.display=S.kanjiSnapshot?'block':'none';
    } else if(S.kanjiSnapshot){
      wrap.style.display='block';surplusBtn.style.display='none';if(revertBtn)revertBtn.style.display='block';
    } else wrap.style.display='none';
  }
}

function showCatPopup(pIdx,anchorEl){
  var popup=document.getElementById('cat-popup');popup.innerHTML='';
  var p=S.persons[pIdx];if(!p)return;
  S.cats.forEach(function(c){
    var item=document.createElement('div');item.className='cat-popup-item'+(p.catId===c.id?' selected':'');
    var dot=document.createElement('span');dot.className='pill-tag';dot.style.cssText='background:'+c.color+';color:'+c.tc+';padding:3px 8px';dot.textContent=c.name||'?';
    var rate=document.createElement('span');rate.style.cssText='font-size:11px;color:#888';rate.textContent='×'+c.rate;
    item.appendChild(dot);item.appendChild(rate);
    item.onclick=(function(cid){return function(){S.persons[pIdx].catId=cid;calcAmounts();renderBillingPage();closeCatPopup();};})(c.id);
    popup.appendChild(item);
  });
  var addItem=document.createElement('div');addItem.className='cat-popup-add';addItem.innerHTML='＋ 新しいカテゴリを追加';
  addItem.onclick=function(){closeCatPopup();openAddCatModal(null);};popup.appendChild(addItem);
  popup.style.display='block';
  var rect=anchorEl.getBoundingClientRect();var left=rect.left,top=rect.bottom+4;
  if(left+165>window.innerWidth)left=window.innerWidth-170;
  if(top+S.cats.length*44+50>window.innerHeight)top=rect.top-(S.cats.length*44+54);
  popup.style.left=left+'px';popup.style.top=top+'px';
  setTimeout(function(){document.addEventListener('click',closeCatPopupOutside);},10);
}
function closeCatPopup(){var p=document.getElementById('cat-popup');if(p)p.style.display='none';document.removeEventListener('click',closeCatPopupOutside);}
function closeCatPopupOutside(e){var p=document.getElementById('cat-popup');if(p&&!p.contains(e.target))closeCatPopup();}

function applyRemainderToKanji(){
  var people=getAssignedPersons();
  var allAmt=people.reduce(function(s,p){return s+(S.amounts[p.idx]||0);},0);
  var remainder=allAmt-S.total;if(remainder===0)return;
  var kanjiList=people.filter(function(p){return S.persons[p.idx]?S.persons[p.idx].isKanji:false;});
  if(!kanjiList.length){showToast('幹事が設定されていません');return;}
  var each=remainder>0?Math.floor(remainder/kanjiList.length):Math.ceil(remainder/kanjiList.length);
  if(each===0){showToast('充当できる金額がありません');return;}
  S.kanjiSnapshot={};kanjiList.forEach(function(p){S.kanjiSnapshot[p.idx]=S.amounts[p.idx]||0;});
  kanjiList.forEach(function(p){S.amounts[p.idx]=Math.max(0,(S.amounts[p.idx]||0)-each);var r=S.doneRecords.find(function(r){return r.idx===p.idx;});if(r)r.amount=S.amounts[p.idx];});
  showToast(remainder>0?'幹事に各'+fmt(each)+'充当しました':'幹事が各'+fmt(Math.abs(each))+'負担します');renderBillingPage();
}
function revertKanjiSurplus(){
  if(!S.kanjiSnapshot)return;
  Object.entries(S.kanjiSnapshot).forEach(function(e){var idx=e[0],amt=e[1];S.amounts[idx]=amt;var r=S.doneRecords.find(function(r){return r.idx==idx;});if(r)r.amount=amt;});
  S.kanjiSnapshot=null;showToast('元の金額に戻しました');renderBillingPage();
}

function renderBillingPage(){
  var tiEl=document.getElementById('total-input');
  if(S.total&&tiEl&&!tiEl.value)tiEl.value=S.total;
  var hint=document.getElementById('per-person-hint');
  if(hint){
    var people=getAssignedPersons();
    if(S.total>0&&people.length>0){
      var each=Math.round(S.total/people.length);
      hint.innerHTML='<div style="display:flex;align-items:center;justify-content:space-between"><span style="font-size:12px;color:#888">👤 '+people.length+'人均等割り（参考）</span><span style="font-size:18px;font-weight:500;color:#185FA5">¥'+each.toLocaleString()+'<span style="font-size:11px;font-weight:400;color:#888">／人</span></span></div>';
      hint.style.display='block';
    } else hint.style.display='none';
  }
  updateSummary();
  var list=document.getElementById('billing-list');list.innerHTML='';
  var people=getAssignedPersons();
  if(!people.length){list.innerHTML='<p style="font-size:12px;color:#888;padding:12px 0">座席に参加者を割り当ててください</p>';return;}
  people.forEach(function(p){
    var c=(S.cats.find(function(c){return c.id===(S.persons[p.idx]?S.persons[p.idx].catId:'');}))||S.cats[0];
    var isPaid=!!S.paid[p.idx];
    var row=document.createElement('div');row.className='br'+(isPaid?' is-paid':'');
    var nameSpan=document.createElement('span');nameSpan.className='br-name';
    var nameText=document.createElement('span');nameText.textContent=p.name;nameText.style.cssText='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0';nameSpan.appendChild(nameText);
    var isKanji=S.persons[p.idx]?S.persons[p.idx].isKanji:false;
    if(isKanji){var badge=document.createElement('span');badge.className='kanji-badge';badge.textContent='👑';nameSpan.appendChild(badge);}
    var catEl=document.createElement('span');catEl.className='br-cat';
    if(c)catEl.innerHTML='<span class="pill-tag" style="background:'+c.color+';color:'+c.tc+';cursor:pointer">'+(c.name||'?')+'</span>';
    catEl.onclick=(function(pidx){return function(e){e.stopPropagation();showCatPopup(pidx,catEl);};})(p.idx);
    var amtWrap=document.createElement('span');amtWrap.className='br-amt';
    var amtText=document.createElement('span');amtText.textContent=S.amounts[p.idx]!==undefined?fmt(S.amounts[p.idx]):'—';
    var editIcon=document.createElement('span');editIcon.style.cssText='font-size:10px;opacity:0.55';editIcon.textContent='✎';
    amtWrap.appendChild(amtText);if(!isPaid)amtWrap.appendChild(editIcon);
    amtWrap.onclick=(function(pidx){return function(){if(!isPaid)startEditAmt(pidx,amtWrap);};})(p.idx);
    var kBtn=document.createElement('button');kBtn.className='br-kanji-btn'+(isKanji?' active':'');kBtn.textContent=isKanji?'👑':'幹事';
    kBtn.onclick=(function(pidx){return function(){if(S.persons[pidx])S.persons[pidx].isKanji=!S.persons[pidx].isKanji;renderBillingPage();updateSummary();};})(p.idx);
    var payBtn=document.createElement('button');payBtn.className='br-pay-btn'+(isPaid?' paid':'');
    payBtn.textContent=isPaid?'✓ 集金済み':'💰 集金する';payBtn.onclick=(function(pidx){return function(){togglePaid(pidx);};})(p.idx);
    row.appendChild(nameSpan);row.appendChild(catEl);row.appendChild(amtWrap);row.appendChild(kBtn);row.appendChild(payBtn);list.appendChild(row);
  });
}

function togglePaid(idx){
  if(S.paid[idx]){S.paid[idx]=false;var i=S.doneRecords.findIndex(function(r){return r.idx===idx;});if(i>=0)S.doneRecords.splice(i,1);}
  else{S.paid[idx]=true;var time=new Date().toLocaleTimeString('ja-JP',{hour:'2-digit',minute:'2-digit'});if(!S.doneRecords.find(function(r){return r.idx===idx;}))S.doneRecords.push({idx:idx,name:S.persons[idx]?S.persons[idx].name:'',amount:S.amounts[idx]||0,time:time});}
  renderBillingPage();updateSummary();
}

function startEditAmt(idx,el){
  var cur=S.amounts[idx]||'';var inp=document.createElement('input');inp.type='number';inp.className='br-amt-input';inp.value=cur;inp.step=500;inp.inputMode='numeric';el.replaceWith(inp);inp.focus();inp.select();
  function commit(){var v=parseInt(inp.value)||0;S.amounts[idx]=v;var r=S.doneRecords.find(function(r){return r.idx===idx;});if(r)r.amount=v;var span=document.createElement('span');span.className='br-amt';span.textContent=v?fmt(v):'—';span.onclick=function(){startEditAmt(idx,span);};inp.replaceWith(span);updateSummary();}
  inp.onblur=commit;inp.onkeydown=function(e){if(e.key==='Enter')inp.blur();};
}

function goToBilling(){
  var people=getAssignedPersons();
  if(!people.length&&S.persons.filter(function(p){return p.name;}).length>0){
    // persons exist but not assigned - allow going to billing anyway
    if(!confirm('座席への割り当てが完了していません。\nお会計ページに進みますか？'))return;
  }
  var hasKanji=S.persons.some(function(p){return p.isKanji;});
  if(!hasKanji&&S.persons.filter(function(p){return p.name;}).length>0){
    alert('幹事が設定されていません。\n基本情報または座席配置で幹事を1名以上設定してください。');return;
  }
  goPage(2);
}

function goResult(){
  var people=getAssignedPersons(),total=S.total;
  var allAmt=people.reduce(function(s,p){return s+(S.amounts[p.idx]||0);},0);
  var paidAmt=S.doneRecords.reduce(function(s,r){return s+r.amount;},0);
  var paidCount=people.filter(function(p){return S.paid[p.idx];}).length,remainder=paidAmt-total;
  document.getElementById('r-title').textContent=S.title||'飲み会';
  document.getElementById('r-date').textContent=fmtDate(S.date);
  var stats=document.getElementById('result-stats');stats.innerHTML='';
  [['参加人数',people.length+'名'],['代金合計',fmt(total)],['集計金額（500円刻み）',fmt(allAmt)],['実際の集金額',fmt(paidAmt)],['余り / 不足',remainder>=0?'+'+fmt(remainder)+' 余り':fmt(Math.abs(remainder))+' 不足'],['支払済み',paidCount+'/'+people.length+'名']].forEach(function(lv){var row=document.createElement('div');row.className='result-row';row.innerHTML='<span class="result-row-label">'+lv[0]+'</span><span class="result-row-val">'+lv[1]+'</span>';stats.appendChild(row);});
  var rp=document.getElementById('result-people');rp.innerHTML='';
  people.forEach(function(p){
    var c=(S.cats.find(function(c){return c.id===(S.persons[p.idx]?S.persons[p.idx].catId:'');}))|| S.cats[0];
    var row=document.createElement('div');row.className='result-row';
    var tag=c?'<span class="pill-tag" style="background:'+c.color+';color:'+c.tc+';font-size:10px">'+c.name+'</span>':'';
    var isKanji=S.persons[p.idx]?S.persons[p.idx].isKanji:false;
    var kb=isKanji?'<span class="kanji-badge">👑 幹事</span>':'';
    row.innerHTML='<span class="result-row-label" style="display:flex;align-items:center;gap:5px">'+(S.paid[p.idx]?'✅':'⬜')+' '+p.name+' '+tag+kb+'</span><span class="result-row-val">'+fmt(S.amounts[p.idx]||0)+'</span>';
    rp.appendChild(row);
  });
  goPage(3);
}

function buildShareText(){
  var people=getAssignedPersons(),total=S.total;
  var allAmt=people.reduce(function(s,p){return s+(S.amounts[p.idx]||0);},0);
  var paidAmt=S.doneRecords.reduce(function(s,r){return s+r.amount;},0);var remainder=paidAmt-total;
  var txt='🍺 '+(S.title||'飲み会')+' '+fmtDate(S.date)+'\n━━━━━━━━━━━━\n代金合計：'+fmt(total)+'\n集計金額：'+fmt(allAmt)+'\n実集金額：'+fmt(paidAmt)+'\n';
  txt+=remainder>=0?('余り：+'+fmt(remainder)+'\n'):('不足：'+fmt(Math.abs(remainder))+'\n');
  txt+='━━━━━━━━━━━━\n';
  people.forEach(function(p){var isKanji=S.persons[p.idx]?S.persons[p.idx].isKanji:false;txt+=(S.paid[p.idx]?'✅':'⬜')+' '+p.name+(isKanji?'（幹事）':'')+':'+fmt(S.amounts[p.idx]||0)+'\n';});
  return txt;
}
function shareLine(){window.open('https://line.me/R/share?text='+encodeURIComponent(buildShareText()),'_blank');}
function shareViber(){window.open('viber://forward?text='+encodeURIComponent(buildShareText()),'_blank');}
function shareSMS(){window.open('sms:?body='+encodeURIComponent(buildShareText()),'_blank');}
function copyResult(){var txt=buildShareText();if(navigator.clipboard){navigator.clipboard.writeText(txt).then(function(){showToast('コピーしました！');});}else{var ta=document.createElement('textarea');ta.value=txt;document.body.appendChild(ta);ta.select();document.execCommand('copy');document.body.removeChild(ta);showToast('コピーしました！');}}

function shareHeaderLine(){var txt=encodeURIComponent('🍺 飲み会の集金管理アプリ「お勘定奉行 幹事郎」\n'+location.href);window.open('https://line.me/R/share?text='+txt,'_blank');}
function shareHeaderCopy(){var url=location.href;if(navigator.clipboard){navigator.clipboard.writeText(url).then(function(){showToast('リンクをコピーしました！');});}else{var ta=document.createElement('textarea');ta.value=url;document.body.appendChild(ta);ta.select();document.execCommand('copy');document.body.removeChild(ta);showToast('リンクをコピーしました！');}}

function encodeState(){
  try{
    var data={t:S.title,d:S.date,c:S.count,p:S.persons.map(function(p){return{n:p.name,c:p.catId,k:p.isKanji?1:0};}),cats:S.cats.map(function(c){return{id:c.id,n:c.name,r:c.rate,co:c.color,tc:c.tc};}),tbl:S.tables.map(function(t){return{id:t.id,tp:t.type,s:t.seats};}),asgn:S.assignments,amt:S.amounts,paid:Object.fromEntries(Object.entries(S.paid).map(function(e){return[e[0],e[1]?1:0];})),total:S.total};
    return btoa(unescape(encodeURIComponent(JSON.stringify(data))));
  }catch(e){return null;}
}
function decodeState(b64){
  try{
    if(!b64||typeof b64!=='string')return false;
    var data=JSON.parse(decodeURIComponent(escape(atob(b64))));
    S.title=data.t||'';S.date=data.d||'';S.count=data.c||0;
    S.persons=(data.p||[]).map(function(p){return{name:p.n,catId:p.c,isKanji:!!p.k};});
    if(data.cats&&data.cats.length)S.cats=data.cats.map(function(c){return{id:c.id,name:c.n,rate:c.r,color:c.co,tc:c.tc};});
    S.tables=(data.tbl||[]).map(function(t){return{id:t.id,type:t.tp,seats:t.s};});
    S.assignments=data.asgn||{};
    S.amounts=data.amt||{};
    S.paid=Object.fromEntries(Object.entries(data.paid||{}).map(function(e){return[e[0],!!e[1]];}));
    S.total=data.total||0;
    return true;
  }catch(e){return false;}
}
function saveStateUrl(){
  var enc=encodeState();if(!enc){showToast('データの保存に失敗しました');return;}
  var url=location.origin+location.pathname+'?d='+enc;
  if(navigator.clipboard){navigator.clipboard.writeText(url).then(function(){showToast('💾 保存URLをコピーしました！');});}
  else{var ta=document.createElement('textarea');ta.value=url;document.body.appendChild(ta);ta.select();document.execCommand('copy');document.body.removeChild(ta);showToast('💾 保存URLをコピーしました！');}
}
function loadStateFromUrl(){
  var params=new URLSearchParams(location.search);var d=params.get('d');if(!d)return false;return decodeState(d);
}

function resetAll(){
  S.title='';S.date='';S.count=0;S.persons=[];S.tables=[];S.assignments={};S.amounts={};S.paid={};S.doneRecords=[];S.kanjiSnapshot=null;
  document.getElementById('ev-title').value='';document.getElementById('ev-date').value='';document.getElementById('date-preview').textContent='—';
  var sel=document.getElementById('count-sel');if(sel)sel.value='';
  var ti=document.getElementById('total-input');if(ti)ti.value='';
  document.getElementById('persons-card').style.display='none';
  renderCatList();renderScene();goPage(0);
}


// Attach inline handlers via JS to avoid iOS Script error
document.getElementById('ev-title').addEventListener('input', function(){S.title=this.value;});
document.getElementById('ev-date').addEventListener('input', function(){S.date=this.value;document.getElementById('date-preview').textContent=fmtDate(this.value);});
document.getElementById('count-sel').addEventListener('change', function(){onCountChange(this.value);});
document.getElementById('total-input').addEventListener('input', function(){onTotalInput(this.value);});

// ===== INIT =====
var _restored=loadStateFromUrl();
if(_restored){
  var titleEl=document.getElementById('ev-title');if(titleEl)titleEl.value=S.title;
  var dateEl=document.getElementById('ev-date');if(dateEl)dateEl.value=S.date;
  document.getElementById('date-preview').textContent=fmtDate(S.date);
  var selEl=document.getElementById('count-sel');if(selEl&&S.count)selEl.value=S.count;
  if(S.persons.length)document.getElementById('persons-card').style.display='block';
  if(S.total){var ti2=document.getElementById('total-input');if(ti2)ti2.value=S.total;}
  renderPersonList();renderCatList();renderScene();
  showToast('💾 保存データを復元しました');
  S.cats.forEach(function(c){var m=c.id.match(/^c(\d+)$/);if(m)catIdCnt=Math.max(catIdCnt,parseInt(m[1])+1);});
} else {
  var today=new Date().toISOString().slice(0,10);
  document.getElementById('ev-date').value=today;
  document.getElementById('date-preview').textContent=fmtDate(today);
  S.date=today;
  renderCatList();renderScene();
}
history.pushState({page:0},'',location.origin+location.pathname+'#p0');
window.addEventListener('resize',function(){
  var _pe=document.querySelector('.page');
  var pageW=_pe?_pe.offsetWidth:window.innerWidth;
  document.getElementById('pages').style.transition='none';
  document.getElementById('pages').style.transform='translateX(-'+(currentPage*pageW)+'px)';
  setTimeout(function(){document.getElementById('pages').style.transition='';},50);
  if(currentPage===1)renderScene();
});

</script>
</body>
</html>
