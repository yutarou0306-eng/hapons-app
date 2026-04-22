import { useState } from "react";

// ── CREDENTIALS ──
const MEMBER_ID = "hapons";
const MEMBER_PASS = "member2026";
const ADMIN_ID = "hapons";
const ADMIN_PASS = "rugby2026";

const LOGO_SRC = "/logo.jpg";

// ── INITIAL DATA ──
const initialMembers = [
  { id: 1, name: "田中 太郎", position: "FL", phone: "090-1234-5678", parent: "田中 一郎", paid: true, note: "" },
  { id: 2, name: "佐藤 健", position: "PR", phone: "090-2345-6789", parent: "佐藤 誠", paid: true, note: "" },
  { id: 3, name: "鈴木 翼", position: "HO", phone: "090-3456-7890", parent: "鈴木 浩二", paid: false, note: "" },
  { id: 4, name: "高橋 蓮", position: "LO", phone: "090-4567-8901", parent: "高橋 勇", paid: true, note: "" },
  { id: 5, name: "伊藤 陽太", position: "SO", phone: "090-5678-9012", parent: "伊藤 幸雄", paid: false, note: "" },
  { id: 6, name: "渡辺 悠斗", position: "WTB", phone: "090-6789-0123", parent: "渡辺 隆", paid: true, note: "" },
];

const initialAnnouncements = [
  { id: 1, title: "今週土曜日の練習について", body: "雨天中止の可能性があります。当日朝7時にLINEグループにてご連絡します。", date: "2026-04-19", important: true },
  { id: 2, title: "ユニフォーム注文締切のお知らせ", body: "4月25日までにサイズをコーチ宛にご連絡ください。", date: "2026-04-17", important: false },
  { id: 3, title: "春季大会エントリー完了", body: "5月10日（日）の春季大会にエントリーしました。詳細は別途お知らせします。", date: "2026-04-15", important: false },
];

const initialEvents = [
  { id: 1, title: "通常練習", date: "2026-04-26", time: "09:00〜11:00", location: "第一グラウンド", type: "practice" },
  { id: 2, title: "練習試合 vs Manila RC", date: "2026-05-03", time: "10:00〜13:00", location: "Rizal Memorial Stadium", type: "game" },
  { id: 3, title: "春季大会", date: "2026-05-10", time: "08:00〜17:00", location: "市営競技場", type: "game" },
  { id: 4, title: "保護者・メンバー会議", date: "2026-05-15", time: "19:00〜20:30", location: "クラブハウス", type: "meeting" },
];

const initialFees = [
  { id: 1, month: "2026年1月", amount: 3000, paidCount: 6, totalCount: 6 },
  { id: 2, month: "2026年2月", amount: 3000, paidCount: 6, totalCount: 6 },
  { id: 3, month: "2026年3月", amount: 3000, paidCount: 5, totalCount: 6 },
  { id: 4, month: "2026年4月", amount: 3000, paidCount: 4, totalCount: 6 },
];

// ── DESIGN TOKENS ──
const C = {
  primary: "#CC1F1F", primaryDark: "#9B0000", accent: "#F5C800",
  sakura: "#F4A7B0", sakuraLight: "#FDE8EC",
  bg: "#FDF8F8", card: "#FFFFFF", text: "#1A0505", textMuted: "#7A5050",
  border: "#F0DADA", success: "#2E7D32", danger: "#9B0000", warning: "#D4A800",
  adminBg: "#7A0000",
};

const S = {
  app: { minHeight: "100vh", backgroundColor: C.bg, fontFamily: "'Noto Sans JP', 'Hiragino Kaku Gothic ProN', sans-serif", maxWidth: 480, margin: "0 auto", paddingBottom: 80 },
  header: { background: `linear-gradient(160deg, ${C.primary} 0%, ${C.primaryDark} 100%)`, padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" },
  nav: { position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 480, background: C.card, borderTop: `2px solid ${C.border}`, display: "flex", zIndex: 100, boxShadow: "0 -2px 12px rgba(204,31,31,0.08)" },
  navBtn: (active) => ({ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "8px 4px 6px", cursor: "pointer", background: active ? C.sakuraLight : "none", border: "none", color: active ? C.primary : C.textMuted, gap: 2 }),
  content: { padding: "16px 16px 0" },
  sectionTitle: { fontSize: 17, fontWeight: 900, color: C.text, margin: "0 0 14px" },
  card: { background: C.card, borderRadius: 14, padding: "14px 16px", marginBottom: 10, boxShadow: "0 1px 6px rgba(204,31,31,0.07)", border: `1px solid ${C.border}` },
  badge: (color) => ({ display: "inline-block", padding: "2px 8px", borderRadius: 20, fontSize: 11, fontWeight: 700, background: color + "22", color }),
  btn: (variant = "primary", size = "md") => ({
    background: variant === "primary" ? C.primary : variant === "danger" ? C.primaryDark : variant === "accent" ? C.accent : "transparent",
    color: variant === "accent" ? C.primaryDark : variant === "ghost" ? C.primary : "#fff",
    border: variant === "ghost" ? `1.5px solid ${C.primary}` : "none",
    borderRadius: 8, padding: size === "sm" ? "5px 10px" : "9px 18px",
    fontSize: size === "sm" ? 12 : 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
  }),
  input: { width: "100%", padding: "10px 12px", borderRadius: 10, border: `1.5px solid ${C.border}`, fontSize: 14, background: C.bg, color: C.text, boxSizing: "border-box", marginBottom: 8, outline: "none", fontFamily: "inherit" },
};

// ── DOCUMENT VIEWER ──
function DocViewer({ title, onClose, children }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: C.bg, zIndex: 150, overflowY: "auto", maxWidth: 480, margin: "0 auto" }}>
      {/* ヘッダー */}
      <div style={{ background: `linear-gradient(160deg, ${C.primary} 0%, ${C.primaryDark} 100%)`, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, position: "sticky", top: 0, zIndex: 10 }}>
        <button onClick={onClose} style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 8, padding: "6px 12px", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
          ← 戻る
        </button>
        <h2 style={{ color: "#fff", fontSize: 14, fontWeight: 900, margin: 0, flex: 1 }}>{title}</h2>
      </div>
      <div style={{ padding: "16px 16px 32px" }}>{children}</div>
    </div>
  );
}

// ── SECTION HEADER (doc style) ──
function DocSection({ num, title, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ background: C.primary, color: "#fff", padding: "8px 14px", borderRadius: "10px 10px 0 0", fontSize: 13, fontWeight: 800 }}>
        {num && <span style={{ marginRight: 8 }}>{num}</span>}{title}
      </div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderTop: "none", borderRadius: "0 0 10px 10px", padding: "12px 14px", fontSize: 13, lineHeight: 1.8, color: C.text }}>
        {children}
      </div>
    </div>
  );
}

function Item({ children }) {
  return <div style={{ paddingLeft: 12, borderLeft: `3px solid ${C.sakura}`, marginBottom: 8, fontSize: 13, lineHeight: 1.7, color: C.text }}>{children}</div>;
}

function Bold({ children }) {
  return <span style={{ fontWeight: 800, color: C.primary }}>{children}</span>;
}

// ── 重要事項ページ ──
function ImportantPage({ onClose }) {
  return (
    <DocViewer title="Hapons 重要事項" onClose={onClose}>
      <div style={{ background: C.sakuraLight, border: `1px solid ${C.sakura}`, borderRadius: 10, padding: "10px 14px", marginBottom: 16, fontSize: 12, color: C.textMuted, lineHeight: 1.7 }}>
        2026年1月28日　Manila Hapons 幹事会<br />
        第三版　2026年2月24日
      </div>

      <DocSection num="１" title="MJSグラウンド利用開始の経緯">
        <p style={{ margin: "0 0 10px", fontSize: 13, lineHeight: 1.8 }}>
          MJSグラウンドは従来、MJSの放課後倶楽部に限られていましたが、2023〜2024年に当時の幹事・赤星さん、小野さんが度重なる陳情と交渉を行い、日本人同好会としての利用が認められました。これによりHaponsは日本人会公認の同好会となりました。
        </p>
        <Item><Bold>利用開始日：</Bold>2024年4月7日（日）15:00〜17:00</Item>
        <Item><Bold>部員資格：</Bold>日本人会会員であることが求められます</Item>
      </DocSection>

      <DocSection num="２" title="利用可能施設">
        <Item>MJS グラウンド</Item>
        <Item>第二体育館</Item>
        <Item>第二体育館隣接お手洗い</Item>
        <div style={{ marginTop: 8, padding: "6px 10px", background: "#FFF3F3", borderRadius: 8, fontSize: 12, color: C.danger, fontWeight: 700 }}>
          ⚠ 対象施設以外への立ち入りは禁止
        </div>
      </DocSection>

      <DocSection num="３" title="MJSグラウンド利用ルール">
        <Item>MJSグラウンドを利用できるのは<Bold>Manila Hapons且つ日本人会会員</Bold>に限ります</Item>
        <Item>優先順位：学校行事 → 放課後倶楽部 → 郊外部活動</Item>
        <Item>第二体育館ではラグビー以外の行為は原則禁止（バスケ・バドミントン等NG）</Item>
        <Item><Bold>MJS SCHOOL ID の取得必須</Bold>（未取得者の入校不可）</Item>
        <Item>駐車する場合は<Bold>CAR STICKER の取得必須</Bold></Item>
        <Item>雨天時は第二体育館が空いている場合に限り使用可（スパイク不可）</Item>
        <Item>敷地内での飲食・喫煙禁止（水分補給を除く）</Item>
        <Item>施設破損時は当事者が修理費を弁済する責任を負います</Item>
        <Item>Manila Haponsに関わらない活動は禁止（政治・宗教活動等）</Item>
      </DocSection>

      <DocSection num="４" title="施設使用料">
        <Item><Bold>グラウンド：</Bold>P1,000／時間</Item>
        <Item><Bold>第二体育館：</Bold>P500／時間＋照明P200／時間</Item>
        <div style={{ marginTop: 8, fontSize: 12, color: C.textMuted }}>※皆様から集めた部費で支払います</div>
      </DocSection>

      <DocSection num="５" title="部費・練習参加費">
        <Item><Bold>大人：</Bold>P1,000／月（毎月25日〜月末払）</Item>
        <div style={{ margin: "4px 0 8px 12px", padding: "8px 12px", background: C.sakuraLight, borderRadius: 8, fontSize: 12, lineHeight: 1.7 }}>
          振込先：BDO Unibank<br />
          Manila Hapons <Bold>0000 4121 9449</Bold><br />
          または会計担当に手渡し・GCash
        </div>
        <Item><Bold>子供：</Bold>P100／回（兄弟参加の場合は1人分でOK）</Item>
        <Item><Bold>特別練習：</Bold>通常練習に加えP100／回</Item>
      </DocSection>

      <DocSection num="６" title="活動停止・退部勧告">
        以下に該当する場合、幹事会の判断により活動停止または退部を勧告することがあります：
        <div style={{ marginTop: 8 }}>
          <Item>MJS施設利用に関する規則の重大な違反</Item>
          <Item>特段の理由・連絡なく活動に参加しない</Item>
          <Item>他の部員や関係者への迷惑行為</Item>
          <Item>部費の支払いや必要書類の提出を継続的に怠った場合</Item>
          <Item>LINEグループから自主退出した者、または連絡なく2か月以上不参加かつ部費滞納者は自動的に部員名簿から削除</Item>
        </div>
      </DocSection>

      <DocSection num="７" title="提出書類">
        <div style={{ fontWeight: 800, color: C.primary, marginBottom: 6 }}>① 部員 → Manila Hapons幹事会</div>
        <Item>入部届兼誓約書</Item>
        <Item>参加同意書（WAIVER）（Jrのみ）</Item>

        <div style={{ fontWeight: 800, color: C.primary, margin: "10px 0 6px" }}>② 部員 → MJS</div>
        <Item>MJSパス＆スティッカー申請書（部長承認済）→ a.lecias@mjs.ph へメール送信<br />
          <span style={{ fontSize: 12, color: C.textMuted }}>Club Name：Manila Hapons　Club Representative：赤星敦（Akahoshi Atsushi）</span>
        </Item>
        <Item>ID SCHOOL PASS申請書（有効期限：4月〜翌年3月、毎年更新）</Item>
        <Item>Car Sticker（有効期限：4月〜翌年3月、毎年更新）</Item>
        <div style={{ marginTop: 6, fontSize: 12, color: C.textMuted }}>※毎年3月中旬を目途に申請すること</div>
      </DocSection>

      <div style={{ textAlign: "center", color: C.textMuted, fontSize: 11, marginTop: 16 }}>
        ご不明な点は赤星・栗生までお問い合わせください
      </div>
    </DocViewer>
  );
}

// ── Rules & Guidelinesページ ──
function RulesPage({ onClose }) {
  return (
    <DocViewer title="Rules & Guidelines" onClose={onClose}>
      <div style={{ background: C.sakuraLight, border: `1px solid ${C.sakura}`, borderRadius: 10, padding: "10px 14px", marginBottom: 16, fontSize: 12, color: C.textMuted, lineHeight: 1.7 }}>
        Manila Hapons Rules and Guidelines<br />
        施行日：2026年4月1日　初版
      </div>

      <DocSection num="１" title="目的（Purpose）">
        本ルールは、Manila HaponsにおいてJr・大人・保護者を含むすべての関係者が、安全で互いを尊重し、ラグビーを楽しめる環境を維持することを目的とする。
      </DocSection>

      <DocSection num="２" title="適用範囲（Scope of Application）">
        <Item>「本チーム」とはManila Haponsをいう</Item>
        <Item>選手（Jr・大人）、指導者、運営スタッフ、保護者・見学者を含むすべての関係者に適用</Item>
      </DocSection>

      <DocSection num="３" title="基本方針（Team Principles）">
        <Item><Bold>Jrチームは「ラグビーを楽しむこと」を基本方針とする</Bold></Item>
        <Item>運動を楽しむこと・ラグビーに親しむことを最優先とし、競技力・勝敗の追求はこれを妨げない範囲で行う</Item>
        <Item>より高いレベルを目指すメンバーにはローカルチーム等の活用を推奨</Item>
        <div style={{ marginTop: 10, fontWeight: 800, color: C.text, marginBottom: 6 }}>行動原則：</div>
        {["関係者すべてに感謝と敬意をもって接すること",
          "地域・他チームとの交流を大切にし積極的に関係を築くこと",
          "挨拶を大きな声で行うこと",
          "仲間を大切にし互いを尊重すること",
          "良いプレーや前向きな行動に積極的に声をかけること",
          "何よりも、ラグビーを楽しむこと"].map((item, i) => (
          <Item key={i}>{i + 1}. {item}</Item>
        ))}
      </DocSection>

      <DocSection num="４" title="運営体制・役割（Organization and Roles）">
        {[
          { role: "部長", desc: "クラブ方針・日本人学校対応・毎月の施設使用願い等" },
          { role: "キャプテン", desc: "練習開催・中止連絡、コーチ・練習リード（大人）" },
          { role: "副キャプテン", desc: "キャプテンサポート・試合リード（大人）" },
          { role: "ジュニアコーチ", desc: "開催・中止連絡、コーチ、Jr対外試合調整" },
          { role: "主務", desc: "幹事会招集・イベント設定・メンバー名簿管理" },
          { role: "会計", desc: "会費徴収・グラウンド代支払・入出金管理" },
          { role: "広報", desc: "日本人会・SNS・Facebook・新入部員獲得活動" },
          { role: "渉外・対外", desc: "日本人会対応・対外試合・AJRC調整" },
          { role: "備品", desc: "倉庫管理・備品確認・ユニフォーム管理" },
          { role: "保護者窓口", desc: "議事共有・名簿管理・新入部員受け入れ対応" },
        ].map((r) => (
          <div key={r.role} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start" }}>
            <span style={{ ...S.badge(C.primary), flexShrink: 0, marginTop: 2 }}>{r.role}</span>
            <span style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.6 }}>{r.desc}</span>
          </div>
        ))}
        <div style={{ marginTop: 10, fontSize: 12, color: C.textMuted }}>※総会は年1回、幹事会は月1回開催</div>
      </DocSection>

      <DocSection num="５" title="会計（Finance）">
        <Item><Bold>大人部費：</Bold>月額1,000ペソ（翌月から支払い開始）</Item>
        <Item><Bold>支払方法：</Bold>BDO Unibank振込 / GCash / 手渡し</Item>
        <Item><Bold>Jr参加費：</Bold>100ペソ／回（兄弟姉妹は1家庭100ペソ）</Item>
        <Item><Bold>特別練習：</Bold>追加100ペソ／回</Item>
        <Item><Bold>グラウンド：</Bold>1,000ペソ／時間</Item>
        <Item><Bold>第二体育館：</Bold>500ペソ／時間（照明+200ペソ）</Item>
        <Item>3,000ペソ以下の支出は部長の専権事項、超える場合は幹事会の過半数承認が必要</Item>
      </DocSection>

      <DocSection num="６" title="運営ルール（Operational Rules）">
        <Item><Bold>部員資格：</Bold>国籍を問わず、日本人会に入会している者</Item>
        <Item><Bold>入部手続：</Bold>入部届の提出と部費支払い開始（Jrは参加同意書も必要）</Item>
        <Item><Bold>MJS利用資格：</Bold>Manila Haponsの活動として参加する日本人会会員に限る</Item>
        <Item><Bold>入校：</Bold>MJS SCHOOL ID取得必須（未就学児除く）</Item>
        <Item><Bold>駐車：</Bold>CAR STICKER取得必須</Item>
        <Item><Bold>更新：</Bold>SCHOOL ID・CAR STICKERは毎年3月に更新</Item>
        <Item>雨天時は第二体育館が空いている場合のみ使用可（スパイク不可）</Item>
        <Item>敷地内での飲食・喫煙禁止（水分補給を除く）</Item>
      </DocSection>

      <DocSection num="７" title="禁止事項（Prohibited Conduct）">
        <div style={{ marginBottom: 8, fontWeight: 700, color: C.text }}>以下の行為を禁止します：</div>
        <Item>暴力行為・暴言・威圧的な言動</Item>
        <Item>いじめ・ハラスメント行為（身体的・精神的・言語的なものを含む）</Item>
        <Item>差別的・侮辱的または他者の尊厳を損なう行為</Item>
        <Item>指導者・運営者の指示に従わない行為</Item>
        <Item>MJS施設利用規則への違反</Item>
        <Item>許可された場所以外への立ち入り</Item>
        <Item>政治活動・宗教活動・営利目的の活動</Item>
        <Item>チームの名誉または信用を損なう行為</Item>
        <Item>Jrへの不適切な言動・過度な叱責・威圧的な指導</Item>
      </DocSection>

      <DocSection num="８" title="違反時の対応（Disciplinary Measures）">
        <div style={{ marginBottom: 8 }}>違反の程度に応じ、以下の対応を行います：</div>
        <Item>注意または口頭による指導</Item>
        <Item>書面による注意喚起</Item>
        <Item>一定期間の活動停止</Item>
        <Item>退部の勧告</Item>
        <div style={{ marginTop: 8, fontSize: 12, color: C.textMuted }}>
          ※LINEグループ自主退出者・連絡なく2か月以上不参加かつ部費滞納者は自動的に名簿から削除。部費支払い継続者は資格を維持。
        </div>
      </DocSection>

      <DocSection num="９〜１１" title="改訂・施行日・改訂履歴">
        <Item>本規則はManila Hapons幹事会の決議により改定可能</Item>
        <Item>改定時は原則として事前にチームメンバーへ周知</Item>
        <Item><Bold>施行日：</Bold>2026年4月1日</Item>
        <Item><Bold>初版：</Bold>2026年4月1日　Rules & Regulation規定</Item>
      </DocSection>
    </DocViewer>
  );
}

// ── LOGIN SCREEN ──
function LoginScreen({ onLogin }) {
  const [id, setId] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const handleLogin = () => {
    if (id === ADMIN_ID && pass === ADMIN_PASS) { onLogin("admin"); }
    else if (id === MEMBER_ID && pass === MEMBER_PASS) { onLogin("member"); }
    else { setError("IDまたはパスワードが正しくありません"); setPass(""); }
  };
  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(160deg, ${C.primary} 0%, ${C.primaryDark} 60%, #5A0000 100%)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "'Noto Sans JP', sans-serif" }}>
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <img src={LOGO_SRC} alt="Manila Hapons Rugby" style={{ width: 180, height: "auto", filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.4))" }} />
      </div>
      <div style={{ background: C.card, borderRadius: 24, padding: "32px 28px", width: "100%", maxWidth: 360, boxShadow: "0 20px 60px rgba(0,0,0,0.4)" }}>
        <h2 style={{ fontSize: 16, fontWeight: 900, color: C.text, margin: "0 0 20px", textAlign: "center" }}>ログイン</h2>
        <label style={{ fontSize: 12, fontWeight: 700, color: C.textMuted, display: "block", marginBottom: 4 }}>ID</label>
        <input style={S.input} placeholder="IDを入力" value={id} onChange={(e) => setId(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleLogin()} />
        <label style={{ fontSize: 12, fontWeight: 700, color: C.textMuted, display: "block", marginBottom: 4 }}>パスワード</label>
        <input style={{ ...S.input, marginBottom: 4 }} type="password" placeholder="パスワードを入力" value={pass} onChange={(e) => setPass(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleLogin()} />
        {error && <p style={{ fontSize: 12, color: C.danger, margin: "4px 0 12px", fontWeight: 600 }}>⚠ {error}</p>}
        <button style={{ ...S.btn("primary"), width: "100%", padding: "12px", fontSize: 15, marginTop: 12, borderRadius: 12 }} onClick={handleLogin}>ログイン</button>
        <p style={{ fontSize: 11, color: C.textMuted, textAlign: "center", marginTop: 16, marginBottom: 0, lineHeight: 1.6 }}>IDとパスワードはコーチにお問い合わせください</p>
      </div>
      <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, marginTop: 32 }}>© 2026 Manila Hapons Rugby</p>
    </div>
  );
}

// ── ADMIN LOGIN MODAL ──
function AdminLoginModal({ onLogin, onClose }) {
  const [id, setId] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const handleLogin = () => {
    if (id === ADMIN_ID && pass === ADMIN_PASS) { onLogin(); }
    else { setError("IDまたはパスワードが正しくありません"); setPass(""); }
  };
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ background: C.card, borderRadius: 20, padding: 28, width: "100%", maxWidth: 360, boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ fontSize: 32, marginBottom: 6 }}>🔐</div>
          <h2 style={{ fontSize: 16, fontWeight: 900, color: C.text, margin: 0 }}>管理者ログイン</h2>
        </div>
        <label style={{ fontSize: 12, fontWeight: 700, color: C.textMuted, display: "block", marginBottom: 4 }}>管理者ID</label>
        <input style={S.input} placeholder="IDを入力" value={id} onChange={(e) => setId(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleLogin()} />
        <label style={{ fontSize: 12, fontWeight: 700, color: C.textMuted, display: "block", marginBottom: 4 }}>パスワード</label>
        <input style={{ ...S.input, marginBottom: 4 }} type="password" placeholder="パスワードを入力" value={pass} onChange={(e) => setPass(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleLogin()} />
        {error && <p style={{ fontSize: 12, color: C.danger, margin: "4px 0 10px", fontWeight: 600 }}>⚠ {error}</p>}
        <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
          <button style={{ ...S.btn("ghost"), flex: 1 }} onClick={onClose}>キャンセル</button>
          <button style={{ ...S.btn("primary"), flex: 2 }} onClick={handleLogin}>ログイン</button>
        </div>
      </div>
    </div>
  );
}

// ── EDIT MODAL ──
function EditModal({ title, fields, data, onSave, onClose }) {
  const [form, setForm] = useState({ ...data });
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 200, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
      <div style={{ background: C.card, borderRadius: "20px 20px 0 0", padding: "24px 20px", width: "100%", maxWidth: 480, maxHeight: "85vh", overflowY: "auto", boxShadow: "0 -8px 40px rgba(0,0,0,0.2)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 900, color: C.text }}>{title}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: C.textMuted }}>✕</button>
        </div>
        {fields.map((f) => {
          if (f.type === "checkbox") return (
            <label key={f.key} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: C.text, marginBottom: 12, cursor: "pointer" }}>
              <input type="checkbox" checked={!!form[f.key]} onChange={(e) => setForm({ ...form, [f.key]: e.target.checked })} />
              {f.label}
            </label>
          );
          if (f.type === "select") return (
            <div key={f.key}>
              <label style={{ fontSize: 12, fontWeight: 700, color: C.textMuted, display: "block", marginBottom: 4 }}>{f.label}</label>
              <select style={S.input} value={form[f.key] || ""} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}>
                {f.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          );
          if (f.type === "textarea") return (
            <div key={f.key}>
              <label style={{ fontSize: 12, fontWeight: 700, color: C.textMuted, display: "block", marginBottom: 4 }}>{f.label}</label>
              <textarea style={{ ...S.input, minHeight: 80, resize: "vertical" }} value={form[f.key] || ""} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} />
            </div>
          );
          return (
            <div key={f.key}>
              <label style={{ fontSize: 12, fontWeight: 700, color: C.textMuted, display: "block", marginBottom: 4 }}>{f.label}</label>
              <input style={S.input} type={f.type || "text"} value={form[f.key] || ""} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} />
            </div>
          );
        })}
        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <button style={{ ...S.btn("ghost"), flex: 1 }} onClick={onClose}>キャンセル</button>
          <button style={{ ...S.btn("primary"), flex: 2 }} onClick={() => onSave(form)}>保存する</button>
        </div>
      </div>
    </div>
  );
}

// ── HOME TAB ──
function HomeTab({ announcements, onOpenImportant, onOpenRules }) {
  const latest = announcements.slice(0, 3);
  const today = new Date().toLocaleDateString("ja-JP", { year: "numeric", month: "long", day: "numeric", weekday: "long" });
  return (
    <div style={S.content}>
      <div style={{ ...S.card, background: `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryDark} 100%)`, color: "#fff", marginBottom: 16, textAlign: "center", padding: "20px 16px" }}>
        <img src={LOGO_SRC} alt="Manila Hapons Rugby" style={{ width: 130, height: "auto", marginBottom: 10 }} />
        <div style={{ fontSize: 11, opacity: 0.7, letterSpacing: "0.06em" }}>{today}</div>
      </div>

      <h2 style={S.sectionTitle}>クラブ資料</h2>

      <div onClick={onOpenImportant} style={{ ...S.card, display: "flex", alignItems: "center", gap: 14, cursor: "pointer", borderLeft: `4px solid ${C.accent}` }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: C.accent + "30", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>📋</div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 800, color: C.text, marginBottom: 2 }}>Hapons 重要事項</div>
          <div style={{ fontSize: 12, color: C.textMuted }}>クラブの重要なお知らせ・規則</div>
        </div>
        <div style={{ marginLeft: "auto", color: C.textMuted, fontSize: 18 }}>›</div>
      </div>

      <div onClick={onOpenRules} style={{ ...S.card, display: "flex", alignItems: "center", gap: 14, cursor: "pointer", borderLeft: `4px solid ${C.sakura}` }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: C.sakuraLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>🌸</div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 800, color: C.text, marginBottom: 2 }}>Rules & Guidelines</div>
          <div style={{ fontSize: 12, color: C.textMuted }}>クラブのルールとガイドライン</div>
        </div>
        <div style={{ marginLeft: "auto", color: C.textMuted, fontSize: 18 }}>›</div>
      </div>

      <h2 style={{ ...S.sectionTitle, marginTop: 8 }}>最新のお知らせ</h2>
      {latest.length === 0 && <div style={{ ...S.card, textAlign: "center", color: C.textMuted, fontSize: 13 }}>お知らせはありません</div>}
      {latest.map((a) => (
        <div key={a.id} style={{ ...S.card, borderLeft: a.important ? `4px solid ${C.accent}` : `1px solid ${C.border}` }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 4 }}>
            {a.important && <span style={S.badge(C.primary)}>重要</span>}
            <span style={{ fontSize: 14, fontWeight: 800, color: C.text }}>{a.title}</span>
          </div>
          <p style={{ fontSize: 13, color: C.textMuted, margin: "0 0 4px", lineHeight: 1.6 }}>{a.body}</p>
          <span style={{ fontSize: 11, color: C.textMuted }}>{a.date}</span>
        </div>
      ))}
    </div>
  );
}

// ── MEMBERS TAB ──
function MembersTab({ isAdmin }) {
  const [members, setMembers] = useState(initialMembers);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const posColors = { PR: "#CC1F1F", HO: "#CC1F1F", LO: "#1E88E5", FL: "#2E7D32", NO8: "#2E7D32", SH: "#D4A800", SO: "#8E24AA", CTR: "#00ACC1", WTB: "#F4511E", FB: "#6D4C41" };
  const filtered = members.filter((m) => m.name.includes(search) || m.position.includes(search));
  const fields = [
    { key: "name", label: "氏名" }, { key: "position", label: "ポジション（PR/HO/LO/FL/NO8/SH/SO/CTR/WTB/FB）" },
    { key: "phone", label: "電話番号" }, { key: "parent", label: "緊急連絡先" },
    { key: "note", label: "備考", type: "textarea" }, { key: "paid", label: "今月の会費納入済み", type: "checkbox" },
  ];
  const save = (form) => {
    if (showAdd) setMembers([...members, { ...form, id: Date.now() }]);
    else setMembers(members.map((m) => m.id === editing.id ? { ...m, ...form } : m));
    setEditing(null); setShowAdd(false);
  };
  const del = (id) => { if (window.confirm("このメンバーを削除しますか？")) setMembers(members.filter((m) => m.id !== id)); };
  const togglePaid = (id) => setMembers(members.map((m) => m.id === id ? { ...m, paid: !m.paid } : m));
  return (
    <div style={S.content}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <h2 style={{ ...S.sectionTitle, margin: 0 }}>メンバー名簿</h2>
        {isAdmin && <button style={S.btn("accent", "sm")} onClick={() => setShowAdd(true)}>＋ 追加</button>}
      </div>
      <input style={{ ...S.input, marginBottom: 10 }} placeholder="🔍 名前・ポジションで検索" value={search} onChange={(e) => setSearch(e.target.value)} />
      <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 10 }}>{filtered.length}名 / 全{members.length}名</div>
      {filtered.map((m) => (
        <div key={m.id} style={S.card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 15, fontWeight: 800, color: C.text }}>{m.name}</span>
                <span style={S.badge(posColors[m.position] || C.textMuted)}>{m.position || "—"}</span>
              </div>
              <div style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.7 }}>
                📞 {m.phone}　👤 {m.parent}{m.note && <><br />📝 {m.note}</>}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
              <button onClick={() => togglePaid(m.id)} style={{ padding: "4px 10px", borderRadius: 20, border: "none", fontWeight: 700, fontSize: 11, cursor: "pointer", background: m.paid ? "#2E7D3220" : "#CC1F1F20", color: m.paid ? C.success : C.danger }}>
                {m.paid ? "✓ 納入済" : "未納入"}
              </button>
              {isAdmin && <div style={{ display: "flex", gap: 4 }}>
                <button style={S.btn("ghost", "sm")} onClick={() => setEditing(m)}>編集</button>
                <button style={S.btn("danger", "sm")} onClick={() => del(m.id)}>削除</button>
              </div>}
            </div>
          </div>
        </div>
      ))}
      {editing && <EditModal title="メンバーを編集" fields={fields} data={editing} onSave={save} onClose={() => setEditing(null)} />}
      {showAdd && <EditModal title="新規メンバー追加" fields={fields} data={{ name: "", position: "", phone: "", parent: "", note: "", paid: false }} onSave={save} onClose={() => setShowAdd(false)} />}
    </div>
  );
}

// ── ANNOUNCEMENTS TAB ──
function AnnouncementsTab({ isAdmin, announcements, setAnnouncements }) {
  const [editing, setEditing] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const fields = [
    { key: "title", label: "タイトル" }, { key: "body", label: "内容", type: "textarea" },
    { key: "date", label: "日付", type: "date" }, { key: "important", label: "重要なお知らせとしてマーク", type: "checkbox" },
  ];
  const save = (form) => {
    if (showAdd) setAnnouncements([{ ...form, id: Date.now(), date: form.date || new Date().toISOString().slice(0, 10) }, ...announcements]);
    else setAnnouncements(announcements.map((i) => i.id === editing.id ? { ...i, ...form } : i));
    setEditing(null); setShowAdd(false);
  };
  const del = (id) => { if (window.confirm("削除しますか？")) setAnnouncements(announcements.filter((i) => i.id !== id)); };
  return (
    <div style={S.content}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <h2 style={{ ...S.sectionTitle, margin: 0 }}>お知らせ</h2>
        {isAdmin && <button style={S.btn("accent", "sm")} onClick={() => setShowAdd(true)}>＋ 投稿</button>}
      </div>
      {announcements.map((a) => (
        <div key={a.id} style={{ ...S.card, borderLeft: a.important ? `4px solid ${C.accent}` : `1px solid ${C.border}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
            <span style={{ fontSize: 14, fontWeight: 800, color: C.text, flex: 1, marginRight: 8 }}>{a.title}</span>
            {a.important && <span style={S.badge(C.primary)}>重要</span>}
          </div>
          <p style={{ fontSize: 13, color: C.textMuted, margin: "0 0 6px", lineHeight: 1.7 }}>{a.body}</p>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 11, color: C.textMuted }}>{a.date}</span>
            {isAdmin && <div style={{ display: "flex", gap: 6 }}>
              <button style={S.btn("ghost", "sm")} onClick={() => setEditing(a)}>編集</button>
              <button style={S.btn("danger", "sm")} onClick={() => del(a.id)}>削除</button>
            </div>}
          </div>
        </div>
      ))}
      {editing && <EditModal title="お知らせを編集" fields={fields} data={editing} onSave={save} onClose={() => setEditing(null)} />}
      {showAdd && <EditModal title="お知らせを投稿" fields={fields} data={{ title: "", body: "", date: "", important: false }} onSave={save} onClose={() => setShowAdd(false)} />}
    </div>
  );
}

// ── SCHEDULE TAB ──
function ScheduleTab({ isAdmin }) {
  const [events, setEvents] = useState(initialEvents);
  const [editing, setEditing] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const typeConfig = { practice: { label: "練習", color: "#1E88E5" }, game: { label: "試合", color: C.primary }, meeting: { label: "会議", color: "#8E24AA" }, tournament: { label: "大会", color: "#D4A800" } };
  const fields = [
    { key: "title", label: "タイトル" }, { key: "date", label: "日付", type: "date" },
    { key: "time", label: "時間（例：09:00〜11:00）" }, { key: "location", label: "場所" },
    { key: "type", label: "種別", type: "select", options: Object.entries(typeConfig).map(([v, c]) => ({ value: v, label: c.label })) },
  ];
  const save = (form) => {
    if (showAdd) setEvents([...events, { ...form, id: Date.now() }]);
    else setEvents(events.map((e) => e.id === editing.id ? { ...e, ...form } : e));
    setEditing(null); setShowAdd(false);
  };
  const del = (id) => { if (window.confirm("削除しますか？")) setEvents(events.filter((e) => e.id !== id)); };
  const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date));
  const wdays = ["日", "月", "火", "水", "木", "金", "土"];
  return (
    <div style={S.content}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <h2 style={{ ...S.sectionTitle, margin: 0 }}>スケジュール</h2>
        {isAdmin && <button style={S.btn("accent", "sm")} onClick={() => setShowAdd(true)}>＋ 追加</button>}
      </div>
      {sorted.map((e) => {
        const cfg = typeConfig[e.type] || typeConfig.practice;
        const d = new Date(e.date);
        return (
          <div key={e.id} style={{ ...S.card, display: "flex", gap: 14 }}>
            <div style={{ minWidth: 50, textAlign: "center", background: C.sakuraLight, borderRadius: 10, padding: "8px 4px" }}>
              <div style={{ fontSize: 11, color: C.textMuted }}>{d.getMonth() + 1}月</div>
              <div style={{ fontSize: 24, fontWeight: 900, color: C.primary, lineHeight: 1 }}>{d.getDate()}</div>
              <div style={{ fontSize: 11, color: C.textMuted }}>({wdays[d.getDay()]})</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                <span style={S.badge(cfg.color)}>{cfg.label}</span>
                <span style={{ fontSize: 14, fontWeight: 800, color: C.text }}>{e.title}</span>
              </div>
              {e.time && <div style={{ fontSize: 12, color: C.textMuted }}>🕐 {e.time}</div>}
              {e.location && <div style={{ fontSize: 12, color: C.textMuted }}>📍 {e.location}</div>}
              {isAdmin && <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                <button style={S.btn("ghost", "sm")} onClick={() => setEditing(e)}>編集</button>
                <button style={S.btn("danger", "sm")} onClick={() => del(e.id)}>削除</button>
              </div>}
            </div>
          </div>
        );
      })}
      {editing && <EditModal title="イベントを編集" fields={fields} data={editing} onSave={save} onClose={() => setEditing(null)} />}
      {showAdd && <EditModal title="イベントを追加" fields={fields} data={{ title: "", date: "", time: "", location: "", type: "practice" }} onSave={save} onClose={() => setShowAdd(false)} />}
    </div>
  );
}

// ── FEES TAB ──
function FeesTab({ isAdmin }) {
  const [members, setMembers] = useState(initialMembers);
  const [fees, setFees] = useState(initialFees);
  const [editing, setEditing] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const paidCount = members.filter((m) => m.paid).length;
  const total = members.length;
  const pct = total > 0 ? Math.round((paidCount / total) * 100) : 0;
  const feeFields = [
    { key: "month", label: "月（例：2026年5月）" }, { key: "amount", label: "月額（円）", type: "number" },
    { key: "paidCount", label: "納入人数", type: "number" }, { key: "totalCount", label: "対象人数", type: "number" },
  ];
  const saveFee = (form) => {
    const parsed = { ...form, amount: Number(form.amount), paidCount: Number(form.paidCount), totalCount: Number(form.totalCount) };
    if (showAdd) setFees([...fees, { ...parsed, id: Date.now() }]);
    else setFees(fees.map((f) => f.id === editing.id ? { ...f, ...parsed } : f));
    setEditing(null); setShowAdd(false);
  };
  const togglePaid = (id) => setMembers(members.map((m) => m.id === id ? { ...m, paid: !m.paid } : m));
  return (
    <div style={S.content}>
      <h2 style={S.sectionTitle}>会費管理</h2>
      <div style={{ ...S.card, background: `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryDark} 100%)`, color: "#fff", marginBottom: 16 }}>
        <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 4 }}>今月の納入状況</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 6, marginBottom: 12 }}>
          <span style={{ fontSize: 36, fontWeight: 900 }}>{paidCount}</span>
          <span style={{ opacity: 0.6, marginBottom: 6 }}>/ {total}名</span>
          <span style={{ fontSize: 20, fontWeight: 900, marginLeft: "auto" }}>{pct}%</span>
        </div>
        <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: 99, height: 8, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${pct}%`, background: C.accent, borderRadius: 99, transition: "width 0.4s" }} />
        </div>
        <div style={{ marginTop: 10, fontSize: 13, opacity: 0.8 }}>月額 3,000円　未納：{total - paidCount}名</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.textMuted }}>過去の納入実績</div>
        {isAdmin && <button style={S.btn("accent", "sm")} onClick={() => setShowAdd(true)}>＋ 追加</button>}
      </div>
      {fees.map((f) => (
        <div key={f.id} style={{ ...S.card, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 800, color: C.text }}>{f.month}</div>
            <div style={{ fontSize: 12, color: C.textMuted }}>{f.paidCount}/{f.totalCount}名 納入</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
            <div style={{ fontSize: 15, fontWeight: 900, color: C.text }}>¥{(f.amount * f.paidCount).toLocaleString()}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={S.badge(f.paidCount === f.totalCount ? C.success : C.warning)}>{f.paidCount === f.totalCount ? "完納" : "一部未納"}</span>
              {isAdmin && <button style={S.btn("ghost", "sm")} onClick={() => setEditing(f)}>編集</button>}
            </div>
          </div>
        </div>
      ))}
      <div style={{ fontSize: 13, fontWeight: 700, color: C.textMuted, margin: "16px 0 8px" }}>今月の会員別状況</div>
      {members.map((m) => (
        <div key={m.id} style={{ ...S.card, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{m.name}</div>
            <div style={{ fontSize: 12, color: C.textMuted }}>{m.position}　📞 {m.phone}</div>
          </div>
          <button onClick={() => togglePaid(m.id)} style={{ padding: "6px 14px", borderRadius: 20, border: "none", fontWeight: 700, fontSize: 12, cursor: "pointer", background: m.paid ? "#2E7D3220" : "#CC1F1F20", color: m.paid ? C.success : C.danger }}>
            {m.paid ? "✓ 納入済" : "未納入"}
          </button>
        </div>
      ))}
      {editing && <EditModal title="実績を編集" fields={feeFields} data={editing} onSave={saveFee} onClose={() => setEditing(null)} />}
      {showAdd && <EditModal title="実績を追加" fields={feeFields} data={{ month: "", amount: 3000, paidCount: 0, totalCount: members.length }} onSave={saveFee} onClose={() => setShowAdd(false)} />}
    </div>
  );
}

// ── MAIN APP ──
export default function HaponsApp() {
  const [role, setRole] = useState(null);
  const [tab, setTab] = useState("home");
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showImportant, setShowImportant] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const isAdmin = role === "admin";

  if (!role) return <LoginScreen onLogin={setRole} />;
  if (showImportant) return <ImportantPage onClose={() => setShowImportant(false)} />;
  if (showRules) return <RulesPage onClose={() => setShowRules(false)} />;

  const tabs = [
    { id: "home", label: "ホーム", icon: "🏠" },
    { id: "members", label: "メンバー", icon: "🏉" },
    { id: "announcements", label: "お知らせ", icon: "📢" },
    { id: "schedule", label: "日程", icon: "📅" },
    { id: "fees", label: "会費", icon: "💴" },
  ];

  return (
    <div style={S.app}>
      <div style={S.header}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src={LOGO_SRC} alt="Manila Hapons Rugby" style={{ height: 38, width: "auto" }} />
          <div>
            <h1 style={{ color: "#fff", fontSize: 15, fontWeight: 900, margin: 0, letterSpacing: "0.04em" }}>Manila Hapons</h1>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 9, marginTop: 1, letterSpacing: "0.06em" }}>RUGBY FOOTBALL CLUB · PHILIPPINES</p>
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {isAdmin ? (
            <button onClick={() => { if (window.confirm("管理者モードを終了しますか？")) setRole("member"); }} style={{ background: C.accent, border: "none", borderRadius: 8, padding: "5px 10px", color: C.primaryDark, fontSize: 10, fontWeight: 800, cursor: "pointer" }}>
              管理者 ✕
            </button>
          ) : (
            <button onClick={() => setShowAdminLogin(true)} style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 8, padding: "5px 10px", color: "#fff", fontSize: 10, fontWeight: 600, cursor: "pointer" }}>
              管理者
            </button>
          )}
          <button onClick={() => { if (window.confirm("ログアウトしますか？")) { setRole(null); setTab("home"); } }} style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 8, padding: "5px 10px", color: "rgba(255,255,255,0.8)", fontSize: 10, fontWeight: 600, cursor: "pointer" }}>
            ログアウト
          </button>
        </div>
      </div>

      {isAdmin && (
        <div style={{ background: C.adminBg, padding: "6px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ color: C.accent, fontSize: 11, fontWeight: 700, letterSpacing: "0.06em" }}>⚙ 管理者モード — 全コンテンツの編集が可能です</span>
          <span style={{ background: C.accent, color: C.primaryDark, fontSize: 10, fontWeight: 900, padding: "2px 8px", borderRadius: 20 }}>ADMIN</span>
        </div>
      )}

      {tab === "home" && <HomeTab announcements={announcements} onOpenImportant={() => setShowImportant(true)} onOpenRules={() => setShowRules(true)} />}
      {tab === "members" && <MembersTab isAdmin={isAdmin} />}
      {tab === "announcements" && <AnnouncementsTab isAdmin={isAdmin} announcements={announcements} setAnnouncements={setAnnouncements} />}
      {tab === "schedule" && <ScheduleTab isAdmin={isAdmin} />}
      {tab === "fees" && <FeesTab isAdmin={isAdmin} />}

      <nav style={S.nav}>
        {tabs.map((t) => (
          <button key={t.id} style={S.navBtn(tab === t.id)} onClick={() => setTab(t.id)}>
            <span style={{ fontSize: 18 }}>{t.icon}</span>
            <span style={{ fontSize: 9, fontWeight: tab === t.id ? 800 : 400 }}>{t.label}</span>
          </button>
        ))}
      </nav>

      {showAdminLogin && (
        <AdminLoginModal onLogin={() => { setRole("admin"); setShowAdminLogin(false); }} onClose={() => setShowAdminLogin(false)} />
      )}
    </div>
  );
}
