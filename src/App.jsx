import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://opaelfaglzewknhgqufw.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wYWVsZmFnbHpld2tuaGdxdWZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4MzIxNzgsImV4cCI6MjA5MjQwODE3OH0.Gv2Udb64zcqQda85mgGOmJKumauuu89YhfHd1LW403A";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const MEMBER_ID = "hapons";
const MEMBER_PASS = "member2026";
const ADMIN_ID = "hapons";
const ADMIN_PASS = "rugby2026";
const LOGO_SRC = "/logo.jpg";

const C = {
  primary: "#CC1F1F", primaryDark: "#9B0000", accent: "#F5C800",
  sakura: "#F4A7B0", sakuraLight: "#FDE8EC",
  bg: "#FDF8F8", card: "#FFFFFF", text: "#1A0505", textMuted: "#7A5050",
  border: "#F0DADA", success: "#2E7D32", danger: "#9B0000", warning: "#D4A800",
  adminBg: "#7A0000", jr: "#1565C0", jrLight: "#E3F2FD",
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
    background: variant === "primary" ? C.primary : variant === "danger" ? C.primaryDark : variant === "accent" ? C.accent : variant === "jr" ? C.jr : "transparent",
    color: variant === "accent" ? C.primaryDark : variant === "ghost" ? C.primary : variant === "ghostJr" ? C.jr : "#fff",
    border: variant === "ghost" ? `1.5px solid ${C.primary}` : variant === "ghostJr" ? `1.5px solid ${C.jr}` : "none",
    borderRadius: 8, padding: size === "sm" ? "5px 10px" : "9px 18px",
    fontSize: size === "sm" ? 12 : 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
  }),
  input: { width: "100%", padding: "10px 12px", borderRadius: 10, border: `1.5px solid ${C.border}`, fontSize: 14, background: C.bg, color: C.text, boxSizing: "border-box", marginBottom: 8, outline: "none", fontFamily: "inherit" },
};

// ── HELPERS ──
function Loading() {
  return <div style={{ textAlign: "center", color: C.textMuted, padding: 30, fontSize: 13 }}>読み込み中...</div>;
}

function RichTextEditor({ value, onChange }) {
  const editorRef = useRef(null);
  useEffect(() => { if (editorRef.current) editorRef.current.innerHTML = value || ""; }, []);
  const exec = (command) => { editorRef.current.focus(); document.execCommand(command, false, null); onChange(editorRef.current.innerHTML); };
  const setFontSize = (size) => {
    editorRef.current.focus();
    document.execCommand("fontSize", false, size === "large" ? "5" : size === "medium" ? "3" : "1");
    const fonts = editorRef.current.querySelectorAll("font[size]");
    fonts.forEach((f) => { const s = f.getAttribute("size"); f.removeAttribute("size"); f.style.fontSize = s === "5" ? "20px" : s === "3" ? "15px" : "11px"; });
    onChange(editorRef.current.innerHTML);
  };
  const tb = (active = false) => ({ padding: "5px 10px", borderRadius: 6, border: `1px solid ${active ? C.primary : C.border}`, background: active ? C.primary + "15" : C.card, color: active ? C.primary : C.text, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" });
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", padding: "8px 10px", background: C.bg, border: `1.5px solid ${C.border}`, borderRadius: "10px 10px 0 0", borderBottom: "none" }}>
        <button style={tb()} onClick={() => setFontSize("large")} type="button">大</button>
        <button style={tb()} onClick={() => setFontSize("medium")} type="button">中</button>
        <button style={tb()} onClick={() => setFontSize("small")} type="button">小</button>
        <div style={{ width: 1, background: C.border, margin: "0 4px" }} />
        <button style={tb()} onClick={() => exec("bold")} type="button"><b>B</b></button>
      </div>
      <div ref={editorRef} contentEditable suppressContentEditableWarning onInput={() => onChange(editorRef.current.innerHTML)}
        style={{ minHeight: 100, padding: "10px 12px", border: `1.5px solid ${C.border}`, borderRadius: "0 0 10px 10px", fontSize: 14, background: C.card, color: C.text, outline: "none", lineHeight: 1.7, fontFamily: "'Noto Sans JP', sans-serif" }} />
      <p style={{ fontSize: 11, color: C.textMuted, margin: "4px 0 0" }}>文字を選択してからボタンを押すと書式が適用されます</p>
    </div>
  );
}

function DocViewer({ title, onClose, children }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: C.bg, zIndex: 150, overflowY: "auto", maxWidth: 480, margin: "0 auto" }}>
      <div style={{ background: `linear-gradient(160deg, ${C.primary} 0%, ${C.primaryDark} 100%)`, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, position: "sticky", top: 0, zIndex: 10 }}>
        <button onClick={onClose} style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 8, padding: "6px 12px", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>← 戻る</button>
        <h2 style={{ color: "#fff", fontSize: 14, fontWeight: 900, margin: 0, flex: 1 }}>{title}</h2>
      </div>
      <div style={{ padding: "16px 16px 32px" }}>{children}</div>
    </div>
  );
}

function DocSection({ num, title, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ background: C.primary, color: "#fff", padding: "8px 14px", borderRadius: "10px 10px 0 0", fontSize: 13, fontWeight: 800 }}>{num && <span style={{ marginRight: 8 }}>{num}</span>}{title}</div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderTop: "none", borderRadius: "0 0 10px 10px", padding: "12px 14px", fontSize: 13, lineHeight: 1.8, color: C.text }}>{children}</div>
    </div>
  );
}

function Item({ children }) { return <div style={{ paddingLeft: 12, borderLeft: `3px solid ${C.sakura}`, marginBottom: 8, fontSize: 13, lineHeight: 1.7, color: C.text }}>{children}</div>; }
function Bold({ children }) { return <span style={{ fontWeight: 800, color: C.primary }}>{children}</span>; }

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
              <input type="checkbox" checked={!!form[f.key]} onChange={(e) => setForm({ ...form, [f.key]: e.target.checked })} />{f.label}
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

// ── IMPORTANT & RULES PAGES ──
function ImportantPage({ onClose }) {
  return (
    <DocViewer title="Hapons 重要事項" onClose={onClose}>
      <div style={{ background: C.sakuraLight, border: `1px solid ${C.sakura}`, borderRadius: 10, padding: "10px 14px", marginBottom: 16, fontSize: 12, color: C.textMuted, lineHeight: 1.7 }}>2026年1月28日　Manila Hapons 幹事会／第三版　2026年2月24日</div>
      <DocSection num="１" title="MJSグラウンド利用開始の経緯">
        <p style={{ margin: "0 0 10px", fontSize: 13, lineHeight: 1.8 }}>MJSグラウンドは従来、MJSの放課後倶楽部に限られていましたが、2023〜2024年に当時の幹事・赤星さん、小野さんが度重なる陳情と交渉を行い、日本人同好会としての利用が認められました。</p>
        <Item><Bold>利用開始日：</Bold>2024年4月7日（日）15:00〜17:00</Item>
        <Item><Bold>部員資格：</Bold>日本人会会員であることが求められます</Item>
      </DocSection>
      <DocSection num="２" title="利用可能施設">
        <Item>MJS グラウンド</Item><Item>第二体育館</Item><Item>第二体育館隣接お手洗い</Item>
        <div style={{ marginTop: 8, padding: "6px 10px", background: "#FFF3F3", borderRadius: 8, fontSize: 12, color: C.danger, fontWeight: 700 }}>⚠ 対象施設以外への立ち入りは禁止</div>
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
      </DocSection>
      <DocSection num="４" title="施設使用料">
        <Item><Bold>グラウンド：</Bold>P1,000／時間</Item>
        <Item><Bold>第二体育館：</Bold>P500／時間＋照明P200／時間</Item>
      </DocSection>
      <DocSection num="５" title="部費・練習参加費">
        <Item><Bold>大人：</Bold>P1,000／月（毎月25日〜月末払）</Item>
        <div style={{ margin: "4px 0 8px 12px", padding: "8px 12px", background: C.sakuraLight, borderRadius: 8, fontSize: 12, lineHeight: 1.7 }}>振込先：BDO Unibank<br />Manila Hapons <Bold>0000 4121 9449</Bold><br />または会計担当に手渡し・GCash</div>
        <Item><Bold>子供：</Bold>P100／回（兄弟参加の場合は1人分でOK）</Item>
        <Item><Bold>特別練習：</Bold>通常練習に加えP100／回</Item>
      </DocSection>
      <DocSection num="６" title="活動停止・退部勧告">
        <Item>MJS施設利用に関する規則の重大な違反</Item>
        <Item>特段の理由・連絡なく活動に参加しない</Item>
        <Item>他の部員や関係者への迷惑行為</Item>
        <Item>部費の支払いや必要書類の提出を継続的に怠った場合</Item>
        <Item>LINEグループから自主退出した者、または連絡なく2か月以上不参加かつ部費滞納者は自動的に部員名簿から削除</Item>
      </DocSection>
      <DocSection num="７" title="提出書類">
        <div style={{ fontWeight: 800, color: C.primary, marginBottom: 6 }}>① 部員 → Manila Hapons幹事会</div>
        <Item>入部届兼誓約書</Item><Item>参加同意書（WAIVER）（Jrのみ）</Item>
        <div style={{ fontWeight: 800, color: C.primary, margin: "10px 0 6px" }}>② 部員 → MJS</div>
        <Item>MJSパス＆スティッカー申請書 → a.lecias@mjs.ph へメール<br /><span style={{ fontSize: 12, color: C.textMuted }}>Club Name：Manila Hapons　Rep：赤星敦（Akahoshi Atsushi）</span></Item>
        <Item>ID SCHOOL PASS申請書（毎年4月〜翌年3月更新）</Item>
        <Item>Car Sticker（毎年4月〜翌年3月更新）</Item>
      </DocSection>
      <div style={{ textAlign: "center", color: C.textMuted, fontSize: 11, marginTop: 16 }}>ご不明な点は赤星・栗生までお問い合わせください</div>
    </DocViewer>
  );
}

function RulesPage({ onClose }) {
  return (
    <DocViewer title="Rules & Guidelines" onClose={onClose}>
      <div style={{ background: C.sakuraLight, border: `1px solid ${C.sakura}`, borderRadius: 10, padding: "10px 14px", marginBottom: 16, fontSize: 12, color: C.textMuted, lineHeight: 1.7 }}>Manila Hapons Rules and Guidelines／施行日：2026年4月1日　初版</div>
      <DocSection num="１" title="目的（Purpose）">本ルールは、Manila HaponsにおいてJr・大人・保護者を含むすべての関係者が、安全で互いを尊重し、ラグビーを楽しめる環境を維持することを目的とする。</DocSection>
      <DocSection num="２" title="適用範囲（Scope of Application）">
        <Item>「本チーム」とはManila Haponsをいう</Item>
        <Item>選手（Jr・大人）、指導者、運営スタッフ、保護者・見学者を含むすべての関係者に適用</Item>
      </DocSection>
      <DocSection num="３" title="基本方針（Team Principles）">
        <Item><Bold>Jrチームは「ラグビーを楽しむこと」を基本方針とする</Bold></Item>
        <Item>運動を楽しむこと・ラグビーに親しむことを最優先とし、競技力・勝敗の追求はこれを妨げない範囲で行う</Item>
        {["関係者すべてに感謝と敬意をもって接すること", "地域・他チームとの交流を大切にし積極的に関係を築くこと", "挨拶を大きな声で行うこと", "仲間を大切にし互いを尊重すること", "良いプレーや前向きな行動に積極的に声をかけること", "何よりも、ラグビーを楽しむこと"].map((item, i) => <Item key={i}>{i + 1}. {item}</Item>)}
      </DocSection>
      <DocSection num="４" title="運営体制・役割（Organization and Roles）">
        {[{ role: "部長", desc: "クラブ方針・日本人学校対応・毎月の施設使用願い等" }, { role: "キャプテン", desc: "練習開催・中止連絡、コーチ・練習リード（大人）" }, { role: "副キャプテン", desc: "キャプテンサポート・試合リード（大人）" }, { role: "ジュニアコーチ", desc: "開催・中止連絡、コーチ、Jr対外試合調整" }, { role: "主務", desc: "幹事会招集・イベント設定・メンバー名簿管理" }, { role: "会計", desc: "会費徴収・グラウンド代支払・入出金管理" }, { role: "広報", desc: "日本人会・SNS・Facebook・新入部員獲得活動" }, { role: "渉外・対外", desc: "日本人会対応・対外試合・AJRC調整" }, { role: "備品", desc: "倉庫管理・備品確認・ユニフォーム管理" }, { role: "保護者窓口", desc: "議事共有・名簿管理・新入部員受け入れ対応" }].map((r) => (
          <div key={r.role} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start" }}>
            <span style={{ ...S.badge(C.primary), flexShrink: 0, marginTop: 2 }}>{r.role}</span>
            <span style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.6 }}>{r.desc}</span>
          </div>
        ))}
      </DocSection>
      <DocSection num="５" title="会計（Finance）">
        <Item><Bold>大人部費：</Bold>月額1,000ペソ</Item>
        <Item><Bold>Jr参加費：</Bold>100ペソ／回（兄弟姉妹は1家庭100ペソ）</Item>
        <Item><Bold>グラウンド：</Bold>1,000ペソ／時間</Item>
        <Item><Bold>第二体育館：</Bold>500ペソ／時間（照明+200ペソ）</Item>
      </DocSection>
      <DocSection num="６〜１１" title="運営ルール・禁止事項・違反時の対応">
        <Item><Bold>部員資格：</Bold>国籍を問わず、日本人会に入会している者</Item>
        <Item><Bold>MJS利用：</Bold>Manila Haponsの活動として参加する日本人会会員に限る</Item>
        <Item>暴力・ハラスメント・差別的言動は禁止</Item>
        <Item>施設利用規則への違反・許可された場所以外への立ち入り禁止</Item>
        <Item>政治活動・宗教活動・営利目的の活動禁止</Item>
        <Item><Bold>施行日：</Bold>2026年4月1日</Item>
      </DocSection>
    </DocViewer>
  );
}

// ── LOGIN ──
function LoginScreen({ onLogin }) {
  const [id, setId] = useState(""); const [pass, setPass] = useState(""); const [error, setError] = useState("");
  const handleLogin = () => {
    if (id === ADMIN_ID && pass === ADMIN_PASS) onLogin("admin");
    else if (id === MEMBER_ID && pass === MEMBER_PASS) onLogin("member");
    else { setError("IDまたはパスワードが正しくありません"); setPass(""); }
  };
  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(160deg, ${C.primary} 0%, ${C.primaryDark} 60%, #5A0000 100%)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "'Noto Sans JP', sans-serif" }}>
      <div style={{ textAlign: "center", marginBottom: 32 }}><img src={LOGO_SRC} alt="Manila Hapons Rugby" style={{ width: 180, height: "auto", filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.4))" }} /></div>
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

function AdminLoginModal({ onLogin, onClose }) {
  const [id, setId] = useState(""); const [pass, setPass] = useState(""); const [error, setError] = useState("");
  const handleLogin = () => { if (id === ADMIN_ID && pass === ADMIN_PASS) onLogin(); else { setError("IDまたはパスワードが正しくありません"); setPass(""); } };
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ background: C.card, borderRadius: 20, padding: 28, width: "100%", maxWidth: 360, boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
        <div style={{ textAlign: "center", marginBottom: 20 }}><div style={{ fontSize: 32, marginBottom: 6 }}>🔐</div><h2 style={{ fontSize: 16, fontWeight: 900, color: C.text, margin: 0 }}>管理者ログイン</h2></div>
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

// ── HOME TAB ──
function HomeTab({ announcements, loading, onOpenImportant, onOpenRules }) {
  const latest = announcements.slice(0, 3);
  const today = new Date().toLocaleDateString("ja-JP", { year: "numeric", month: "long", day: "numeric", weekday: "long" });
  return (
    <div style={S.content}>
      <div style={{ ...S.card, background: `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryDark} 100%)`, color: "#fff", marginBottom: 16, textAlign: "center", padding: "20px 16px" }}>
        <img src={LOGO_SRC} alt="Manila Hapons Rugby" style={{ width: 130, height: "auto", marginBottom: 10 }} />
        <div style={{ fontSize: 11, opacity: 0.7, letterSpacing: "0.06em" }}>{today}</div>
      </div>

      {/* お知らせ（上） */}
      <h2 style={S.sectionTitle}>最新のお知らせ</h2>
      {loading && <Loading />}
      {!loading && latest.length === 0 && <div style={{ ...S.card, textAlign: "center", color: C.textMuted, fontSize: 13 }}>お知らせはありません</div>}
      {latest.map((a) => (
        <div key={a.id} style={{ ...S.card, borderLeft: a.important ? `4px solid ${C.accent}` : `1px solid ${C.border}` }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 4 }}>
            {a.important && <span style={S.badge(C.primary)}>重要</span>}
            <span style={{ fontSize: 14, fontWeight: 800, color: C.text }}>{a.title}</span>
          </div>
          <div style={{ fontSize: 13, color: C.textMuted, margin: "0 0 4px", lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: a.body }} />
          <span style={{ fontSize: 11, color: C.textMuted }}>{a.date}</span>
        </div>
      ))}

      {/* クラブ資料（下） */}
      <h2 style={{ ...S.sectionTitle, marginTop: 8 }}>クラブ資料</h2>
      <div onClick={onOpenImportant} style={{ ...S.card, display: "flex", alignItems: "center", gap: 14, cursor: "pointer", borderLeft: `4px solid ${C.accent}` }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: C.accent + "30", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>📋</div>
        <div><div style={{ fontSize: 14, fontWeight: 800, color: C.text, marginBottom: 2 }}>Hapons 重要事項</div><div style={{ fontSize: 12, color: C.textMuted }}>クラブの重要なお知らせ・規則</div></div>
        <div style={{ marginLeft: "auto", color: C.textMuted, fontSize: 18 }}>›</div>
      </div>
      <div onClick={onOpenRules} style={{ ...S.card, display: "flex", alignItems: "center", gap: 14, cursor: "pointer", borderLeft: `4px solid ${C.sakura}` }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: C.sakuraLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>🌸</div>
        <div><div style={{ fontSize: 14, fontWeight: 800, color: C.text, marginBottom: 2 }}>Rules & Guidelines</div><div style={{ fontSize: 12, color: C.textMuted }}>クラブのルールとガイドライン</div></div>
        <div style={{ marginLeft: "auto", color: C.textMuted, fontSize: 18 }}>›</div>
      </div>
    </div>
  );
}

// ── ANNOUNCEMENTS TAB ──
function AnnouncementsTab({ isAdmin, announcements, setAnnouncements, loading }) {
  const [editing, setEditing] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [saving, setSaving] = useState(false);
  const [bodyValue, setBodyValue] = useState("");

  const openAdd = () => { setBodyValue(""); setShowAdd(true); };
  const openEdit = (a) => { setBodyValue(a.body || ""); setEditing(a); };

  const save = async (form) => {
    setSaving(true);
    const payload = { title: form.title, body: bodyValue, date: form.date || new Date().toISOString().slice(0, 10), important: !!form.important };
    if (showAdd) {
      const { data, error } = await supabase.from("announcements").insert([payload]).select();
      if (!error && data) setAnnouncements([data[0], ...announcements]);
    } else {
      await supabase.from("announcements").update(payload).eq("id", editing.id);
      setAnnouncements(announcements.map((i) => i.id === editing.id ? { ...i, ...payload } : i));
    }
    setSaving(false); setEditing(null); setShowAdd(false);
  };

  const del = async (id) => {
    if (!window.confirm("削除しますか？")) return;
    await supabase.from("announcements").delete().eq("id", id);
    setAnnouncements(announcements.filter((i) => i.id !== id));
  };

  const announcementFields = [
    { key: "title", label: "タイトル" },
    { key: "date", label: "日付", type: "date" },
    { key: "important", label: "重要なお知らせとしてマーク", type: "checkbox" },
  ];

  return (
    <div style={S.content}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <h2 style={{ ...S.sectionTitle, margin: 0 }}>お知らせ</h2>
        {isAdmin && <button style={S.btn("accent", "sm")} onClick={openAdd}>＋ 投稿</button>}
      </div>
      {loading && <Loading />}
      {!loading && announcements.length === 0 && <div style={{ ...S.card, textAlign: "center", color: C.textMuted, fontSize: 13 }}>お知らせはありません</div>}
      {announcements.map((a) => (
        <div key={a.id} style={{ ...S.card, borderLeft: a.important ? `4px solid ${C.accent}` : `1px solid ${C.border}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
            <span style={{ fontSize: 14, fontWeight: 800, color: C.text, flex: 1, marginRight: 8 }}>{a.title}</span>
            {a.important && <span style={S.badge(C.primary)}>重要</span>}
          </div>
          <div style={{ fontSize: 13, color: C.textMuted, margin: "0 0 6px", lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: a.body }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 11, color: C.textMuted }}>{a.date}</span>
            {isAdmin && <div style={{ display: "flex", gap: 6 }}>
              <button style={S.btn("ghost", "sm")} onClick={() => openEdit(a)}>編集</button>
              <button style={S.btn("danger", "sm")} onClick={() => del(a.id)}>削除</button>
            </div>}
          </div>
        </div>
      ))}

      {(showAdd || editing) && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 200, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
          <div style={{ background: C.card, borderRadius: "20px 20px 0 0", padding: "24px 20px", width: "100%", maxWidth: 480, maxHeight: "90vh", overflowY: "auto", boxShadow: "0 -8px 40px rgba(0,0,0,0.2)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 900, color: C.text }}>お知らせを{editing ? "編集" : "投稿"}</h3>
              <button onClick={() => { setShowAdd(false); setEditing(null); }} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: C.textMuted }}>✕</button>
            </div>
            {(() => {
              const [form, setForm] = useState(editing || { title: "", date: "", important: false });
              return (
                <>
                  <label style={{ fontSize: 12, fontWeight: 700, color: C.textMuted, display: "block", marginBottom: 4 }}>タイトル</label>
                  <input style={S.input} value={form.title || ""} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="タイトルを入力" />
                  <label style={{ fontSize: 12, fontWeight: 700, color: C.textMuted, display: "block", marginBottom: 4 }}>内容</label>
                  <RichTextEditor value={bodyValue} onChange={setBodyValue} />
                  <label style={{ fontSize: 12, fontWeight: 700, color: C.textMuted, display: "block", marginBottom: 4 }}>日付</label>
                  <input style={S.input} type="date" value={form.date || ""} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                  <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: C.text, marginBottom: 16, cursor: "pointer" }}>
                    <input type="checkbox" checked={!!form.important} onChange={(e) => setForm({ ...form, important: e.target.checked })} />重要なお知らせとしてマーク
                  </label>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button style={{ ...S.btn("ghost"), flex: 1 }} onClick={() => { setShowAdd(false); setEditing(null); }}>キャンセル</button>
                    <button style={{ ...S.btn("primary"), flex: 2 }} onClick={() => save(form)}>保存する</button>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
      {saving && <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.3)", zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ background: C.card, borderRadius: 12, padding: "16px 24px", fontSize: 14, fontWeight: 700 }}>保存中...</div></div>}
    </div>
  );
}

// ── MEMBERS TAB (大人 + Jr) ──
function MembersTab({ isAdmin }) {
  const [activeTab, setActiveTab] = useState("adult");
  const [members, setMembers] = useState([]);
  const [jrMembers, setJrMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      const [m, j] = await Promise.all([
        supabase.from("members").select("*").order("created_at"),
        supabase.from("jr_members").select("*").order("created_at"),
      ]);
      if (m.data) setMembers(m.data);
      if (j.data) setJrMembers(j.data);
      setLoading(false);
    };
    fetchAll();
  }, []);

  const posColors = { PR: "#CC1F1F", HO: "#CC1F1F", LO: "#1E88E5", FL: "#2E7D32", NO8: "#2E7D32", SH: "#D4A800", SO: "#8E24AA", CTR: "#00ACC1", WTB: "#F4511E", FB: "#6D4C41" };

  const adultFields = [
    { key: "name", label: "氏名" },
    { key: "position", label: "ポジション（PR/HO/LO/FL/NO8/SH/SO/CTR/WTB/FB）" },
    { key: "phone", label: "電話番号" },
    { key: "emergency_contact", label: "緊急連絡先" },
    { key: "note", label: "備考", type: "textarea" },
    { key: "paid", label: "今月の会費納入済み", type: "checkbox" },
  ];

  const jrFields = [
    { key: "name", label: "氏名" },
    { key: "grade", label: "学年" },
    { key: "phone", label: "電話番号" },
    { key: "parent", label: "保護者名" },
    { key: "note", label: "備考", type: "textarea" },
    { key: "paid", label: "今月の会費納入済み", type: "checkbox" },
  ];

  const isAdult = activeTab === "adult";
  const table = isAdult ? "members" : "jr_members";
  const list = isAdult ? members : jrMembers;
  const setList = isAdult ? setMembers : setJrMembers;
  const fields = isAdult ? adultFields : jrFields;

  const filtered = list.filter((m) => m.name?.includes(search) || (isAdult ? m.position?.includes(search) : m.grade?.includes(search)));

  const save = async (form) => {
    const payload = { ...form, paid: !!form.paid };
    if (showAdd) {
      const { data } = await supabase.from(table).insert([payload]).select();
      if (data) setList([...list, data[0]]);
    } else {
      await supabase.from(table).update(payload).eq("id", editing.id);
      setList(list.map((m) => m.id === editing.id ? { ...m, ...payload } : m));
    }
    setEditing(null); setShowAdd(false);
  };

  const del = async (id) => {
    if (!window.confirm("このメンバーを削除しますか？")) return;
    await supabase.from(table).delete().eq("id", id);
    setList(list.filter((m) => m.id !== id));
  };

  const togglePaid = async (m) => {
    await supabase.from(table).update({ paid: !m.paid }).eq("id", m.id);
    setList(list.map((item) => item.id === m.id ? { ...item, paid: !item.paid } : item));
  };

  return (
    <div style={S.content}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <h2 style={{ ...S.sectionTitle, margin: 0 }}>メンバー名簿</h2>
        {isAdmin && <button style={S.btn(isAdult ? "accent" : "jr", "sm")} onClick={() => setShowAdd(true)}>＋ 追加</button>}
      </div>

      {/* タブ切り替え */}
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        <button onClick={() => { setActiveTab("adult"); setSearch(""); }} style={{ flex: 1, padding: "10px", borderRadius: 10, border: `2px solid ${activeTab === "adult" ? C.primary : C.border}`, background: activeTab === "adult" ? C.sakuraLight : C.card, color: activeTab === "adult" ? C.primary : C.textMuted, fontWeight: 800, fontSize: 13, cursor: "pointer" }}>
          🏉 Haponsメンバー（{members.length}名）
        </button>
        <button onClick={() => { setActiveTab("jr"); setSearch(""); }} style={{ flex: 1, padding: "10px", borderRadius: 10, border: `2px solid ${activeTab === "jr" ? C.jr : C.border}`, background: activeTab === "jr" ? C.jrLight : C.card, color: activeTab === "jr" ? C.jr : C.textMuted, fontWeight: 800, fontSize: 13, cursor: "pointer" }}>
          ⭐ Jr（{jrMembers.length}名）
        </button>
      </div>

      {loading && <Loading />}

      {!loading && (
        <>
          <input style={{ ...S.input, marginBottom: 10 }} placeholder={isAdult ? "🔍 名前・ポジションで検索" : "🔍 名前・学年で検索"} value={search} onChange={(e) => setSearch(e.target.value)} />
          <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 10 }}>{filtered.length}名 / 全{list.length}名</div>

          {filtered.map((m) => (
            <div key={m.id} style={{ ...S.card, borderLeft: `4px solid ${isAdult ? C.primary : C.jr}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 15, fontWeight: 800, color: C.text }}>{m.name}</span>
                    {isAdult && m.position && <span style={S.badge(posColors[m.position] || C.textMuted)}>{m.position}</span>}
                    {!isAdult && m.grade && <span style={S.badge(C.jr)}>{m.grade}</span>}
                  </div>
                  <div style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.7 }}>
                    📞 {m.phone}　👤 {isAdult ? m.emergency_contact : m.parent}
                    {m.note && <><br />📝 {m.note}</>}
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                  <button onClick={() => togglePaid(m)} style={{ padding: "4px 10px", borderRadius: 20, border: "none", fontWeight: 700, fontSize: 11, cursor: "pointer", background: m.paid ? "#2E7D3220" : "#CC1F1F20", color: m.paid ? C.success : C.danger }}>
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
        </>
      )}

      {editing && <EditModal title={`${isAdult ? "メンバー" : "Jrメンバー"}を編集`} fields={fields} data={editing} onSave={save} onClose={() => setEditing(null)} />}
      {showAdd && <EditModal title={`新規${isAdult ? "メンバー" : "Jrメンバー"}追加`} fields={fields} data={isAdult ? { name: "", position: "", phone: "", emergency_contact: "", note: "", paid: false } : { name: "", grade: "", phone: "", parent: "", note: "", paid: false }} onSave={save} onClose={() => setShowAdd(false)} />}
    </div>
  );
}

// ── SCHEDULE TAB ──
function ScheduleTab({ isAdmin }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const { data } = await supabase.from("events").select("*").order("date");
      if (data) setEvents(data);
      setLoading(false);
    };
    fetch();
  }, []);

  const typeConfig = { practice: { label: "練習", color: "#1E88E5" }, game: { label: "試合", color: C.primary }, meeting: { label: "会議", color: "#8E24AA" }, tournament: { label: "大会", color: "#D4A800" } };
  const fields = [
    { key: "title", label: "タイトル" },
    { key: "date", label: "日付", type: "date" },
    { key: "time", label: "時間（例：09:00〜11:00）" },
    { key: "location", label: "場所" },
    { key: "type", label: "種別", type: "select", options: Object.entries(typeConfig).map(([v, c]) => ({ value: v, label: c.label })) },
  ];

  const save = async (form) => {
    if (showAdd) {
      const { data } = await supabase.from("events").insert([form]).select();
      if (data) setEvents([...events, data[0]].sort((a, b) => a.date.localeCompare(b.date)));
    } else {
      await supabase.from("events").update(form).eq("id", editing.id);
      setEvents(events.map((e) => e.id === editing.id ? { ...e, ...form } : e).sort((a, b) => a.date.localeCompare(b.date)));
    }
    setEditing(null); setShowAdd(false);
  };

  const del = async (id) => {
    if (!window.confirm("削除しますか？")) return;
    await supabase.from("events").delete().eq("id", id);
    setEvents(events.filter((e) => e.id !== id));
  };

  const wdays = ["日", "月", "火", "水", "木", "金", "土"];

  return (
    <div style={S.content}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <h2 style={{ ...S.sectionTitle, margin: 0 }}>スケジュール</h2>
        {isAdmin && <button style={S.btn("accent", "sm")} onClick={() => setShowAdd(true)}>＋ 追加</button>}
      </div>
      {loading && <Loading />}
      {!loading && events.length === 0 && <div style={{ ...S.card, textAlign: "center", color: C.textMuted, fontSize: 13 }}>イベントはありません</div>}
      {events.map((e) => {
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
  const [fees, setFees] = useState([]);
  const [members, setMembers] = useState([]);
  const [jrMembers, setJrMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      const [f, m, j] = await Promise.all([
        supabase.from("fees").select("*").order("created_at", { ascending: false }),
        supabase.from("members").select("*").order("created_at"),
        supabase.from("jr_members").select("*").order("created_at"),
      ]);
      if (f.data) setFees(f.data);
      if (m.data) setMembers(m.data);
      if (j.data) setJrMembers(j.data);
      setLoading(false);
    };
    fetchAll();
  }, []);

  const paidCount = members.filter((m) => m.paid).length;
  const total = members.length;
  const pct = total > 0 ? Math.round((paidCount / total) * 100) : 0;

  const feeFields = [
    { key: "month", label: "月（例：2026年5月）" },
    { key: "amount", label: "月額（ペソ）", type: "number" },
    { key: "paid_count", label: "納入人数", type: "number" },
    { key: "total_count", label: "対象人数", type: "number" },
  ];

  const saveFee = async (form) => {
    const parsed = { ...form, amount: Number(form.amount), paid_count: Number(form.paid_count), total_count: Number(form.total_count) };
    if (showAdd) {
      const { data } = await supabase.from("fees").insert([parsed]).select();
      if (data) setFees([data[0], ...fees]);
    } else {
      await supabase.from("fees").update(parsed).eq("id", editing.id);
      setFees(fees.map((f) => f.id === editing.id ? { ...f, ...parsed } : f));
    }
    setEditing(null); setShowAdd(false);
  };

  const togglePaid = async (m, table) => {
    await supabase.from(table).update({ paid: !m.paid }).eq("id", m.id);
    if (table === "members") setMembers(members.map((item) => item.id === m.id ? { ...item, paid: !item.paid } : item));
    else setJrMembers(jrMembers.map((item) => item.id === m.id ? { ...item, paid: !item.paid } : item));
  };

  return (
    <div style={S.content}>
      <h2 style={S.sectionTitle}>会費管理</h2>
      {loading && <Loading />}
      {!loading && (
        <>
          {/* サマリー */}
          <div style={{ ...S.card, background: `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryDark} 100%)`, color: "#fff", marginBottom: 16 }}>
            <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 4 }}>今月の大人会費納入状況</div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 6, marginBottom: 12 }}>
              <span style={{ fontSize: 36, fontWeight: 900 }}>{paidCount}</span>
              <span style={{ opacity: 0.6, marginBottom: 6 }}>/ {total}名</span>
              <span style={{ fontSize: 20, fontWeight: 900, marginLeft: "auto" }}>{pct}%</span>
            </div>
            <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: 99, height: 8, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${pct}%`, background: C.accent, borderRadius: 99, transition: "width 0.4s" }} />
            </div>
            <div style={{ marginTop: 10, fontSize: 13, opacity: 0.8 }}>月額 P1,000　未納：{total - paidCount}名</div>
          </div>

          {/* 月別実績 */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.textMuted }}>過去の納入実績</div>
            {isAdmin && <button style={S.btn("accent", "sm")} onClick={() => setShowAdd(true)}>＋ 追加</button>}
          </div>
          {fees.length === 0 && <div style={{ ...S.card, textAlign: "center", color: C.textMuted, fontSize: 13 }}>実績データがありません</div>}
          {fees.map((f) => (
            <div key={f.id} style={{ ...S.card, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 800, color: C.text }}>{f.month}</div>
                <div style={{ fontSize: 12, color: C.textMuted }}>{f.paid_count}/{f.total_count}名 納入</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                <div style={{ fontSize: 15, fontWeight: 900, color: C.text }}>P{(f.amount * f.paid_count).toLocaleString()}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={S.badge(f.paid_count === f.total_count ? C.success : C.warning)}>{f.paid_count === f.total_count ? "完納" : "一部未納"}</span>
                  {isAdmin && <button style={S.btn("ghost", "sm")} onClick={() => setEditing(f)}>編集</button>}
                </div>
              </div>
            </div>
          ))}

          {/* 大人会員別 */}
          <div style={{ fontSize: 13, fontWeight: 700, color: C.textMuted, margin: "16px 0 8px" }}>🏉 Haponsメンバー 今月の状況</div>
          {members.length === 0 && <div style={{ ...S.card, textAlign: "center", color: C.textMuted, fontSize: 13 }}>メンバーが登録されていません</div>}
          {members.map((m) => (
            <div key={m.id} style={{ ...S.card, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{m.name}</div>
                <div style={{ fontSize: 12, color: C.textMuted }}>{m.position}　📞 {m.phone}</div>
              </div>
              <button onClick={() => togglePaid(m, "members")} style={{ padding: "6px 14px", borderRadius: 20, border: "none", fontWeight: 700, fontSize: 12, cursor: "pointer", background: m.paid ? "#2E7D3220" : "#CC1F1F20", color: m.paid ? C.success : C.danger }}>
                {m.paid ? "✓ 納入済" : "未納入"}
              </button>
            </div>
          ))}

          {/* Jr会員別 */}
          <div style={{ fontSize: 13, fontWeight: 700, color: C.textMuted, margin: "16px 0 8px" }}>⭐ Jr 今月の参加費状況</div>
          {jrMembers.length === 0 && <div style={{ ...S.card, textAlign: "center", color: C.textMuted, fontSize: 13 }}>Jrメンバーが登録されていません</div>}
          {jrMembers.map((m) => (
            <div key={m.id} style={{ ...S.card, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{m.name}</div>
                <div style={{ fontSize: 12, color: C.textMuted }}>{m.grade}　👤 {m.parent}</div>
              </div>
              <button onClick={() => togglePaid(m, "jr_members")} style={{ padding: "6px 14px", borderRadius: 20, border: "none", fontWeight: 700, fontSize: 12, cursor: "pointer", background: m.paid ? "#2E7D3220" : "#CC1F1F20", color: m.paid ? C.success : C.danger }}>
                {m.paid ? "✓ 納入済" : "未納入"}
              </button>
            </div>
          ))}
        </>
      )}
      {editing && <EditModal title="実績を編集" fields={feeFields} data={editing} onSave={saveFee} onClose={() => setEditing(null)} />}
      {showAdd && <EditModal title="実績を追加" fields={feeFields} data={{ month: "", amount: 1000, paid_count: 0, total_count: members.length }} onSave={saveFee} onClose={() => setShowAdd(false)} />}
    </div>
  );
}

// ── MAIN APP ──
export default function HaponsApp() {
  const [role, setRole] = useState(null);
  const [tab, setTab] = useState("home");
  const [announcements, setAnnouncements] = useState([]);
  const [loadingAnnouncements, setLoadingAnnouncements] = useState(true);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showImportant, setShowImportant] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const isAdmin = role === "admin";

  useEffect(() => {
    const fetch = async () => {
      setLoadingAnnouncements(true);
      const { data } = await supabase.from("announcements").select("*").order("date", { ascending: false });
      if (data) setAnnouncements(data);
      setLoadingAnnouncements(false);
    };
    fetch();
  }, []);

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
            <button onClick={() => { if (window.confirm("管理者モードを終了しますか？")) setRole("member"); }} style={{ background: C.accent, border: "none", borderRadius: 8, padding: "5px 10px", color: C.primaryDark, fontSize: 10, fontWeight: 800, cursor: "pointer" }}>管理者 ✕</button>
          ) : (
            <button onClick={() => setShowAdminLogin(true)} style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 8, padding: "5px 10px", color: "#fff", fontSize: 10, fontWeight: 600, cursor: "pointer" }}>管理者</button>
          )}
          <button onClick={() => { if (window.confirm("ログアウトしますか？")) { setRole(null); setTab("home"); } }} style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 8, padding: "5px 10px", color: "rgba(255,255,255,0.8)", fontSize: 10, fontWeight: 600, cursor: "pointer" }}>ログアウト</button>
        </div>
      </div>

      {isAdmin && (
        <div style={{ background: C.adminBg, padding: "6px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ color: C.accent, fontSize: 11, fontWeight: 700, letterSpacing: "0.06em" }}>⚙ 管理者モード — 全コンテンツの編集が可能です</span>
          <span style={{ background: C.accent, color: C.primaryDark, fontSize: 10, fontWeight: 900, padding: "2px 8px", borderRadius: 20 }}>ADMIN</span>
        </div>
      )}

      {tab === "home" && <HomeTab announcements={announcements} loading={loadingAnnouncements} onOpenImportant={() => setShowImportant(true)} onOpenRules={() => setShowRules(true)} />}
      {tab === "members" && <MembersTab isAdmin={isAdmin} />}
      {tab === "announcements" && <AnnouncementsTab isAdmin={isAdmin} announcements={announcements} setAnnouncements={setAnnouncements} loading={loadingAnnouncements} />}
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

      {showAdminLogin && <AdminLoginModal onLogin={() => { setRole("admin"); setShowAdminLogin(false); }} onClose={() => setShowAdminLogin(false)} />}
    </div>
  );
}
