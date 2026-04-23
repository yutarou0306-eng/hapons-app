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

function Loading() {
  return <div style={{ textAlign: "center", color: C.textMuted, padding: 30, fontSize: 13 }}>読み込み中...</div>;
}

function RichTextEditor({ value, onChange }) {
  const editorRef = useRef(null);
  useEffect(() => { if (editorRef.current) editorRef.current.innerHTML = value || ""; }, []);
  const setFontSize = (size) => {
    editorRef.current.focus();
    document.execCommand("fontSize", false, size === "large" ? "5" : size === "medium" ? "3" : "1");
    const fonts = editorRef.current.querySelectorAll("font[size]");
    fonts.forEach((f) => { const s = f.getAttribute("size"); f.removeAttribute("size"); f.style.fontSize = s === "5" ? "20px" : s === "3" ? "15px" : "11px"; });
    onChange(editorRef.current.innerHTML);
  };
  const tb = () => ({ padding: "5px 10px", borderRadius: 6, border: `1px solid ${C.border}`, background: C.card, color: C.text, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" });
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: "flex", gap: 4, padding: "8px 10px", background: C.bg, border: `1.5px solid ${C.border}`, borderRadius: "10px 10px 0 0", borderBottom: "none" }}>
        <button style={tb()} onClick={() => setFontSize("large")} type="button">大</button>
        <button style={tb()} onClick={() => setFontSize("medium")} type="button">中</button>
        <button style={tb()} onClick={() => setFontSize("small")} type="button">小</button>
        <div style={{ width: 1, background: C.border, margin: "0 4px" }} />
        <button style={tb()} onClick={() => { editorRef.current.focus(); document.execCommand("bold"); onChange(editorRef.current.innerHTML); }} type="button"><b>B</b></button>
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
              <input style={S.input} type={f.type || "text"} value={form[f.key] ?? ""} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} />
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

// ── IMPORTANT & RULES ──
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
        <Item>第二体育館ではラグビー以外の行為は原則禁止</Item>
        <Item><Bold>MJS SCHOOL ID の取得必須</Bold></Item>
        <Item>駐車する場合は<Bold>CAR STICKER の取得必須</Bold></Item>
        <Item>雨天時は第二体育館が空いている場合に限り使用可（スパイク不可）</Item>
        <Item>敷地内での飲食・喫煙禁止（水分補給を除く）</Item>
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
      <DocSection num="２" title="適用範囲">
        <Item>「本チーム」とはManila Haponsをいう</Item>
        <Item>選手（Jr・大人）、指導者、運営スタッフ、保護者・見学者を含むすべての関係者に適用</Item>
      </DocSection>
      <DocSection num="３" title="基本方針（Team Principles）">
        <Item><Bold>Jrチームは「ラグビーを楽しむこと」を基本方針とする</Bold></Item>
        <Item>運動を楽しむこと・ラグビーに親しむことを最優先とし、競技力・勝敗の追求はこれを妨げない範囲で行う</Item>
        {["関係者すべてに感謝と敬意をもって接すること", "地域・他チームとの交流を大切にし積極的に関係を築くこと", "挨拶を大きな声で行うこと", "仲間を大切にし互いを尊重すること", "良いプレーや前向きな行動に積極的に声をかけること", "何よりも、ラグビーを楽しむこと"].map((item, i) => <Item key={i}>{i + 1}. {item}</Item>)}
      </DocSection>
      <DocSection num="４" title="運営体制・役割">
        {[{ role: "部長", desc: "クラブ方針・日本人学校対応・毎月の施設使用願い等" }, { role: "キャプテン", desc: "練習開催・中止連絡、コーチ・練習リード（大人）" }, { role: "副キャプテン", desc: "キャプテンサポート・試合リード（大人）" }, { role: "ジュニアコーチ", desc: "開催・中止連絡、コーチ、Jr対外試合調整" }, { role: "主務", desc: "幹事会招集・イベント設定・メンバー名簿管理" }, { role: "会計", desc: "部費徴収・グラウンド代支払・入出金管理" }, { role: "広報", desc: "日本人会・SNS・Facebook・新入部員獲得活動" }, { role: "渉外・対外", desc: "日本人会対応・対外試合・AJRC調整" }, { role: "備品", desc: "倉庫管理・備品確認・ユニフォーム管理" }, { role: "保護者窓口", desc: "議事共有・名簿管理・新入部員受け入れ対応" }].map((r) => (
          <div key={r.role} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start" }}>
            <span style={{ ...S.badge(C.primary), flexShrink: 0, marginTop: 2 }}>{r.role}</span>
            <span style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.6 }}>{r.desc}</span>
          </div>
        ))}
      </DocSection>
      <DocSection num="５〜１１" title="会計・運営ルール・禁止事項">
        <Item><Bold>大人部費：</Bold>月額1,000ペソ</Item>
        <Item><Bold>Jr参加費：</Bold>100ペソ／回</Item>
        <Item><Bold>部員資格：</Bold>国籍を問わず、日本人会に入会している者</Item>
        <Item>暴力・ハラスメント・差別的言動は禁止</Item>
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
  const [formState, setFormState] = useState({ title: "", date: "", important: false });
  const [bodyValue, setBodyValue] = useState("");

  const openAdd = () => { setFormState({ title: "", date: "", important: false }); setBodyValue(""); setShowAdd(true); };
  const openEdit = (a) => { setFormState({ title: a.title, date: a.date, important: a.important }); setBodyValue(a.body || ""); setEditing(a); };

  const save = async () => {
    setSaving(true);
    const payload = { title: formState.title, body: bodyValue, date: formState.date || new Date().toISOString().slice(0, 10), important: !!formState.important };
    if (showAdd) {
      const { data } = await supabase.from("announcements").insert([payload]).select();
      if (data) setAnnouncements([data[0], ...announcements]);
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
            <label style={{ fontSize: 12, fontWeight: 700, color: C.textMuted, display: "block", marginBottom: 4 }}>タイトル</label>
            <input style={S.input} value={formState.title} onChange={(e) => setFormState({ ...formState, title: e.target.value })} placeholder="タイトルを入力" />
            <label style={{ fontSize: 12, fontWeight: 700, color: C.textMuted, display: "block", marginBottom: 4 }}>内容</label>
            <RichTextEditor value={bodyValue} onChange={setBodyValue} />
            <label style={{ fontSize: 12, fontWeight: 700, color: C.textMuted, display: "block", marginBottom: 4 }}>日付</label>
            <input style={S.input} type="date" value={formState.date} onChange={(e) => setFormState({ ...formState, date: e.target.value })} />
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: C.text, marginBottom: 16, cursor: "pointer" }}>
              <input type="checkbox" checked={!!formState.important} onChange={(e) => setFormState({ ...formState, important: e.target.checked })} />重要なお知らせとしてマーク
            </label>
            <div style={{ display: "flex", gap: 8 }}>
              <button style={{ ...S.btn("ghost"), flex: 1 }} onClick={() => { setShowAdd(false); setEditing(null); }}>キャンセル</button>
              <button style={{ ...S.btn("primary"), flex: 2 }} onClick={save}>保存する</button>
            </div>
          </div>
        </div>
      )}
      {saving && <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.3)", zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ background: C.card, borderRadius: 12, padding: "16px 24px", fontSize: 14, fontWeight: 700 }}>保存中...</div></div>}
    </div>
  );
}

// ── MEMBERS TAB ──
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
  const isAdult = activeTab === "adult";
  const table = isAdult ? "members" : "jr_members";
  const list = isAdult ? members : jrMembers;
  const setList = isAdult ? setMembers : setJrMembers;

  const adultFields = [
    { key: "position", label: "Position" },
    { key: "name_jp", label: "名前" },
    { key: "name_en", label: "Name" },
    { key: "age", label: "年齢", type: "number" },
    { key: "phone", label: "電話番号" },
    { key: "mjs_id_submitted", label: "MJS ID 提出済み", type: "checkbox" },
  ];

  const jrFields = [
    { key: "name_jp", label: "名前" },
    { key: "name_en", label: "Name" },
    { key: "grade", label: "学年" },
    { key: "is_mjs_student", label: "MJSの生徒", type: "checkbox" },
    { key: "parent_name", label: "保護者氏名" },
    { key: "phone", label: "電話番号" },
  ];

  const fields = isAdult ? adultFields : jrFields;
  const filtered = list.filter((m) => (m.name_jp || "").includes(search) || (m.name_en || "").toLowerCase().includes(search.toLowerCase()) || (isAdult ? (m.position || "").includes(search) : (m.grade || "").includes(search)));

  const save = async (form) => {
    const payload = { ...form };
    if (form.age) payload.age = Number(form.age);
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

  const defaultAdult = { position: "", name_jp: "", name_en: "", age: "", phone: "", mjs_id_submitted: false };
  const defaultJr = { name_jp: "", name_en: "", grade: "", is_mjs_student: false, parent_name: "", phone: "" };

  return (
    <div style={S.content}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <h2 style={{ ...S.sectionTitle, margin: 0 }}>メンバー名簿</h2>
        {isAdmin && <button style={S.btn(isAdult ? "accent" : "jr", "sm")} onClick={() => setShowAdd(true)}>＋ 追加</button>}
      </div>

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
          <input style={{ ...S.input, marginBottom: 10 }} placeholder="🔍 名前・ポジション・学年で検索" value={search} onChange={(e) => setSearch(e.target.value)} />
          <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 10 }}>{filtered.length}名 / 全{list.length}名</div>
          {filtered.length === 0 && <div style={{ ...S.card, textAlign: "center", color: C.textMuted, fontSize: 13 }}>メンバーが登録されていません</div>}
          {filtered.map((m) => (
            <div key={m.id} style={{ ...S.card, borderLeft: `4px solid ${isAdult ? C.primary : C.jr}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 15, fontWeight: 800, color: C.text }}>{m.name_jp}</span>
                    {m.name_en && <span style={{ fontSize: 12, color: C.textMuted }}>{m.name_en}</span>}
                    {isAdult && m.position && <span style={S.badge(posColors[m.position] || C.textMuted)}>{m.position}</span>}
                    {!isAdult && m.grade && <span style={S.badge(C.jr)}>{m.grade}</span>}
                  </div>
                  <div style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.8 }}>
                    {isAdult && m.age && <span>年齢：{m.age}歳　</span>}
                    <a href={`tel:${m.phone}`} style={{ color: C.primary, fontWeight: 700, textDecoration: "none" }}>📞 {m.phone}</a><br />
                    {isAdult
                      ? <span style={{ color: m.mjs_id_submitted ? C.success : C.danger, fontWeight: 700 }}>{m.mjs_id_submitted ? "✓ MJS ID提出済" : "⚠ MJS ID未提出"}</span>
                      : <>👤 {m.parent_name}　<span style={{ color: m.is_mjs_student ? C.success : C.textMuted, fontWeight: 700 }}>{m.is_mjs_student ? "🏫 MJS生徒" : "MJS以外"}</span></>
                    }
                  </div>
                </div>
                {isAdmin && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-end" }}>
                    <button style={S.btn("ghost", "sm")} onClick={() => setEditing(m)}>編集</button>
                    <button style={S.btn("danger", "sm")} onClick={() => del(m.id)}>削除</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </>
      )}

      {editing && <EditModal title={`${isAdult ? "メンバー" : "Jrメンバー"}を編集`} fields={fields} data={editing} onSave={save} onClose={() => setEditing(null)} />}
      {showAdd && <EditModal title={`新規${isAdult ? "メンバー" : "Jrメンバー"}追加`} fields={fields} data={isAdult ? defaultAdult : defaultJr} onSave={save} onClose={() => setShowAdd(false)} />}
    </div>
  );
}

// ── ATTENDANCE PANEL ──
function AttendancePanel({ event, onClose }) {
  const [members, setMembers] = useState([]);
  const [jrMembers, setJrMembers] = useState([]);
  const [attendances, setAttendances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [myName, setMyName] = useState(localStorage.getItem("hapons_name") || "");
  const [myType, setMyType] = useState(localStorage.getItem("hapons_type") || "adult");
  const [nameInput, setNameInput] = useState("");
  const [typeInput, setTypeInput] = useState("adult");
  const [showNameInput, setShowNameInput] = useState(!localStorage.getItem("hapons_name"));
  const [activeTab, setActiveTab] = useState("adult");

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      const [m, j, a] = await Promise.all([
        supabase.from("members").select("id, name_jp, position").order("created_at"),
        supabase.from("jr_members").select("id, name_jp, grade").order("created_at"),
        supabase.from("attendances").select("*").eq("event_id", event.id),
      ]);
      if (m.data) setMembers(m.data);
      if (j.data) setJrMembers(j.data);
      if (a.data) setAttendances(a.data);
      setLoading(false);
    };
    fetchAll();
  }, [event.id]);

  const saveName = () => {
    if (!nameInput.trim()) return;
    localStorage.setItem("hapons_name", nameInput.trim());
    localStorage.setItem("hapons_type", typeInput);
    setMyName(nameInput.trim());
    setMyType(typeInput);
    setShowNameInput(false);
  };

  const isAttending = (name, type) => attendances.some((a) => a.member_name === name && a.member_type === type);

  const toggleAttendance = async (name, type) => {
    const existing = attendances.find((a) => a.member_name === name && a.member_type === type);
    if (existing) {
      await supabase.from("attendances").delete().eq("id", existing.id);
      setAttendances(attendances.filter((a) => a.id !== existing.id));
    } else {
      const { data } = await supabase.from("attendances").insert([{ event_id: event.id, member_name: name, member_type: type }]).select();
      if (data) setAttendances([...attendances, data[0]]);
    }
  };

  const adultAttending = attendances.filter((a) => a.member_type === "adult").map((a) => a.member_name);
  const jrAttending = attendances.filter((a) => a.member_type === "jr").map((a) => a.member_name);
  const adultNotAttending = members.map((m) => m.name_jp).filter((n) => !adultAttending.includes(n));
  const jrNotAttending = jrMembers.map((m) => m.name_jp).filter((n) => !jrAttending.includes(n));

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 200, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
      <div style={{ background: C.bg, borderRadius: "20px 20px 0 0", width: "100%", maxWidth: 480, maxHeight: "88vh", overflowY: "auto", boxShadow: "0 -8px 40px rgba(0,0,0,0.2)" }}>
        {/* ヘッダー */}
        <div style={{ background: `linear-gradient(160deg, ${C.primary} 0%, ${C.primaryDark} 100%)`, padding: "16px 20px", borderRadius: "20px 20px 0 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ color: "#fff", fontSize: 15, fontWeight: 900 }}>{event.title}</div>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 12 }}>{event.date}　{event.time}</div>
          </div>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 8, padding: "6px 12px", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>✕</button>
        </div>

        <div style={{ padding: "16px 16px 32px" }}>
          {/* 名前設定 */}
          {showNameInput ? (
            <div style={{ ...S.card, marginBottom: 16, borderLeft: `4px solid ${C.accent}` }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 8 }}>あなたの情報を入力してください</div>
              <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                <button onClick={() => setTypeInput("adult")} style={{ flex: 1, padding: "8px", borderRadius: 8, border: `2px solid ${typeInput === "adult" ? C.primary : C.border}`, background: typeInput === "adult" ? C.sakuraLight : C.card, color: typeInput === "adult" ? C.primary : C.textMuted, fontWeight: 800, fontSize: 13, cursor: "pointer" }}>
                  🏉 大人
                </button>
                <button onClick={() => setTypeInput("jr")} style={{ flex: 1, padding: "8px", borderRadius: 8, border: `2px solid ${typeInput === "jr" ? C.jr : C.border}`, background: typeInput === "jr" ? C.jrLight : C.card, color: typeInput === "jr" ? C.jr : C.textMuted, fontWeight: 800, fontSize: 13, cursor: "pointer" }}>
                  ⭐ Jr
                </button>
              </div>
              <input style={S.input} placeholder="例：田中 太郎" value={nameInput} onChange={(e) => setNameInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && saveName()} />
              <button style={{ ...S.btn("primary"), width: "100%" }} onClick={saveName}>決定</button>
            </div>
          ) : (
            <div style={{ ...S.card, marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: 13, color: C.textMuted }}>
                {myType === "adult" ? "🏉" : "⭐"}　<span style={{ fontWeight: 800, color: C.text }}>{myName}</span>
              </div>
              <button onClick={() => { setNameInput(myName); setTypeInput(myType); setShowNameInput(true); }} style={{ fontSize: 11, color: C.primary, background: "none", border: "none", cursor: "pointer", fontWeight: 700 }}>変更</button>
            </div>
          )}

          {/* 自分の出席ボタン */}
          {myName && !showNameInput && (
            <button
              onClick={() => toggleAttendance(myName, myType)}
              style={{
                width: "100%", padding: "14px", borderRadius: 12, border: "none", cursor: "pointer", marginBottom: 16,
                background: isAttending(myName, myType) ? C.success : C.primary,
                color: "#fff", fontSize: 15, fontWeight: 900,
                boxShadow: isAttending(myName, myType) ? "0 4px 12px rgba(46,125,50,0.3)" : "0 4px 12px rgba(204,31,31,0.3)",
              }}
            >
              {isAttending(myName, myType) ? "✓ 参加登録済み　（タップで取消）" : "参加する"}
            </button>
          )}

          {loading && <Loading />}

          {!loading && (
            <>
              {/* 大人/Jr タブ */}
              <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                <button onClick={() => setActiveTab("adult")} style={{ flex: 1, padding: "8px", borderRadius: 10, border: `2px solid ${activeTab === "adult" ? C.primary : C.border}`, background: activeTab === "adult" ? C.sakuraLight : C.card, color: activeTab === "adult" ? C.primary : C.textMuted, fontWeight: 800, fontSize: 13, cursor: "pointer" }}>
                  🏉 大人（{adultAttending.length}名参加）
                </button>
                <button onClick={() => setActiveTab("jr")} style={{ flex: 1, padding: "8px", borderRadius: 10, border: `2px solid ${activeTab === "jr" ? C.jr : C.border}`, background: activeTab === "jr" ? C.jrLight : C.card, color: activeTab === "jr" ? C.jr : C.textMuted, fontWeight: 800, fontSize: 13, cursor: "pointer" }}>
                  ⭐ Jr（{jrAttending.length}名参加）
                </button>
              </div>

              {activeTab === "adult" && (
                <>
                  <div style={{ fontSize: 13, fontWeight: 800, color: C.success, marginBottom: 8 }}>✓ 参加（{adultAttending.length}名）</div>
                  {adultAttending.length === 0 && <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 12 }}>まだ参加登録者がいません</div>}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                    {adultAttending.map((name) => (
                      <span key={name} style={{ padding: "4px 12px", borderRadius: 20, background: "#2E7D3220", color: C.success, fontSize: 13, fontWeight: 700 }}>{name}</span>
                    ))}
                  </div>
                  {members.length > 0 && (
                    <>
                      <div style={{ fontSize: 13, fontWeight: 800, color: C.textMuted, marginBottom: 8 }}>未回答（{adultNotAttending.length}名）</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {adultNotAttending.map((name) => (
                          <span key={name} style={{ padding: "4px 12px", borderRadius: 20, background: C.border, color: C.textMuted, fontSize: 13 }}>{name}</span>
                        ))}
                      </div>
                    </>
                  )}
                </>
              )}

              {activeTab === "jr" && (
                <>
                  <div style={{ fontSize: 13, fontWeight: 800, color: C.success, marginBottom: 8 }}>✓ 参加（{jrAttending.length}名）</div>
                  {jrAttending.length === 0 && <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 12 }}>まだ参加登録者がいません</div>}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                    {jrAttending.map((name) => (
                      <span key={name} style={{ padding: "4px 12px", borderRadius: 20, background: "#1565C020", color: C.jr, fontSize: 13, fontWeight: 700 }}>{name}</span>
                    ))}
                  </div>
                  {jrMembers.length > 0 && (
                    <>
                      <div style={{ fontSize: 13, fontWeight: 800, color: C.textMuted, marginBottom: 8 }}>未回答（{jrNotAttending.length}名）</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {jrNotAttending.map((name) => (
                          <span key={name} style={{ padding: "4px 12px", borderRadius: 20, background: C.border, color: C.textMuted, fontSize: 13 }}>{name}</span>
                        ))}
                      </div>
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ── SCHEDULE TAB ──
function ScheduleTab({ isAdmin }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

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
              <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
                <button style={{ ...S.btn("primary", "sm"), background: C.success }} onClick={() => setSelectedEvent(e)}>
                  ✋ 出席登録・確認
                </button>
                {isAdmin && <>
                  <button style={S.btn("ghost", "sm")} onClick={() => setEditing(e)}>編集</button>
                  <button style={S.btn("danger", "sm")} onClick={() => del(e.id)}>削除</button>
                </>}
              </div>
            </div>
          </div>
        );
      })}
      {editing && <EditModal title="イベントを編集" fields={fields} data={editing} onSave={save} onClose={() => setEditing(null)} />}
      {showAdd && <EditModal title="イベントを追加" fields={fields} data={{ title: "", date: "", time: "", location: "", type: "practice" }} onSave={save} onClose={() => setShowAdd(false)} />}
      {selectedEvent && <AttendancePanel event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
    </div>
  );
}

// ── FEES TAB ──
function FeesTab({ isAdmin }) {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [filterMonth, setFilterMonth] = useState("");

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const { data } = await supabase.from("fees").select("*").order("payment_date", { ascending: false });
      if (data) setFees(data);
      setLoading(false);
    };
    fetch();
  }, []);

  const feeFields = [
    { key: "month", label: "月（例：2026年5月）" },
    { key: "amount", label: "月額（ペソ）", type: "number" },
    { key: "member_name", label: "名前" },
    { key: "payment_date", label: "支払日", type: "date" },
  ];

  const saveFee = async (form) => {
    const parsed = { ...form, amount: Number(form.amount) };
    if (showAdd) {
      const { data } = await supabase.from("fees").insert([parsed]).select();
      if (data) setFees([data[0], ...fees]);
    } else {
      await supabase.from("fees").update(parsed).eq("id", editing.id);
      setFees(fees.map((f) => f.id === editing.id ? { ...f, ...parsed } : f));
    }
    setEditing(null); setShowAdd(false);
  };

  const del = async (id) => {
    if (!window.confirm("削除しますか？")) return;
    await supabase.from("fees").delete().eq("id", id);
    setFees(fees.filter((f) => f.id !== id));
  };

  const months = [...new Set(fees.map((f) => f.month))].sort().reverse();
  const filtered = filterMonth ? fees.filter((f) => f.month === filterMonth) : fees;
  const totalAmount = filtered.reduce((sum, f) => sum + (f.amount || 0), 0);

  return (
    <div style={S.content}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <h2 style={{ ...S.sectionTitle, margin: 0 }}>部費管理</h2>
        {isAdmin && <button style={S.btn("accent", "sm")} onClick={() => setShowAdd(true)}>＋ 追加</button>}
      </div>

      {loading && <Loading />}

      {!loading && (
        <>
          {/* サマリー */}
          <div style={{ ...S.card, background: `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryDark} 100%)`, color: "#fff", marginBottom: 16 }}>
            <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 4 }}>部費支払い実績</div>
            <div style={{ fontSize: 28, fontWeight: 900, marginBottom: 4 }}>P{totalAmount.toLocaleString()}</div>
            <div style={{ fontSize: 13, opacity: 0.8 }}>{filtered.length}件の支払い記録{filterMonth ? `（${filterMonth}）` : "（全期間）"}</div>
          </div>

          {/* 月フィルター */}
          {months.length > 0 && (
            <div style={{ marginBottom: 12, overflowX: "auto", display: "flex", gap: 6, paddingBottom: 4 }}>
              <button onClick={() => setFilterMonth("")} style={{ padding: "5px 12px", borderRadius: 20, border: `1.5px solid ${!filterMonth ? C.primary : C.border}`, background: !filterMonth ? C.sakuraLight : C.card, color: !filterMonth ? C.primary : C.textMuted, fontSize: 12, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>全期間</button>
              {months.map((m) => (
                <button key={m} onClick={() => setFilterMonth(m)} style={{ padding: "5px 12px", borderRadius: 20, border: `1.5px solid ${filterMonth === m ? C.primary : C.border}`, background: filterMonth === m ? C.sakuraLight : C.card, color: filterMonth === m ? C.primary : C.textMuted, fontSize: 12, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>{m}</button>
              ))}
            </div>
          )}

          {/* 支払い一覧 */}
          {filtered.length === 0 && <div style={{ ...S.card, textAlign: "center", color: C.textMuted, fontSize: 13 }}>部費の支払い記録がありません</div>}
          {filtered.map((f) => (
            <div key={f.id} style={{ ...S.card, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 800, color: C.text }}>{f.member_name}</div>
                <div style={{ fontSize: 12, color: C.textMuted }}>{f.month}　支払日：{f.payment_date}</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                <div style={{ fontSize: 16, fontWeight: 900, color: C.primary }}>P{(f.amount || 0).toLocaleString()}</div>
                {isAdmin && (
                  <div style={{ display: "flex", gap: 4 }}>
                    <button style={S.btn("ghost", "sm")} onClick={() => setEditing(f)}>編集</button>
                    <button style={S.btn("danger", "sm")} onClick={() => del(f.id)}>削除</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </>
      )}

      {editing && <EditModal title="支払い記録を編集" fields={feeFields} data={editing} onSave={saveFee} onClose={() => setEditing(null)} />}
      {showAdd && <EditModal title="部費支払いを登録" fields={feeFields} data={{ month: "", amount: 1000, member_name: "", payment_date: new Date().toISOString().slice(0, 10) }} onSave={saveFee} onClose={() => setShowAdd(false)} />}
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
    { id: "announcements", label: "お知らせ", icon: "📢" },
    { id: "schedule", label: "日程", icon: "📅" },
    { id: "members", label: "メンバー", icon: "🏉" },
    { id: "fees", label: "部費", icon: "💴" },
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
