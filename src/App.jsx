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
        <Item><Bold>特別練習：</Bold>P100／回・人（兄弟参加の場合は人数×P100）</Item>
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

      <a href="https://drive.google.com/file/d/1giuEY0dfbTQlh01BfjAkb7LWGs9faGJW/preview" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block", marginTop: 8 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "14px 16px", background: `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryDark} 100%)`, borderRadius: 12, cursor: "pointer" }}>
          <span style={{ fontSize: 18 }}>📄</span>
          <span style={{ color: "#fff", fontWeight: 800, fontSize: 14 }}>全文はこちら（PDF）</span>
          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 12 }}>↗</span>
        </div>
      </a>
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

// ── 入部書類ページ ──
function EntryFormsPage({ onClose }) {
  return (
    <DocViewer title="入部書類" onClose={onClose}>
      <div style={{ background: C.jrLight, border: `1px solid ${C.jr}`, borderRadius: 12, padding: "14px 16px", marginBottom: 20 }}>
        <div style={{ fontSize: 14, fontWeight: 900, color: C.jr, marginBottom: 10 }}>📌 提出方法</div>
        <div style={{ fontSize: 13, color: C.text, lineHeight: 1.9 }}>
          下記より書類をダウンロードし、必要事項を記入・署名の上、以下の方法で提出してください。
        </div>
        <div style={{ marginTop: 10, fontSize: 13, lineHeight: 2 }}>
          <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 6 }}>
            <span style={{ ...S.badge(C.jr), flexShrink: 0, marginTop: 2 }}>①</span>
            <span>記入後の書類を<strong>写真または画像</strong>で撮影し、<br /><a href="mailto:manilahapons10@gmail.com" style={{ color: C.jr, fontWeight: 800 }}>manilahapons10@gmail.com</a> へメールで送付</span>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <span style={{ ...S.badge(C.jr), flexShrink: 0, marginTop: 2 }}>②</span>
            <span><strong>原本</strong>は主務または保護者担当に直接提出</span>
          </div>
        </div>
      </div>

      {/* 入部届兼誓約書 */}
      <div style={{ ...S.card, marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <span style={{ fontSize: 24 }}>📄</span>
          <div>
            <div style={{ fontSize: 15, fontWeight: 900, color: C.text }}>入部届兼誓約書</div>
            <div style={{ fontSize: 12, color: C.textMuted }}>大人・Jr共通</div>
          </div>
        </div>
        <div style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.7, marginBottom: 12 }}>
          入部にあたり、クラブの規則・ルールに同意する旨を記入・署名して提出してください。大人・Jr問わず全員が対象です。
        </div>
        <a href="https://drive.google.com/file/d/1imsUFwo4HHP_mjItKJ76kfCNqpi2Hcqy/view?usp=sharing" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px", background: C.jr, borderRadius: 10, cursor: "pointer" }}>
            <span style={{ fontSize: 16 }}>📥</span>
            <span style={{ color: "#fff", fontWeight: 800, fontSize: 14 }}>ダウンロード（Google Drive）</span>
          </div>
        </a>
      </div>

      {/* 参加同意書 */}
      <div style={S.card}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <span style={{ fontSize: 24 }}>📄</span>
          <div>
            <div style={{ fontSize: 15, fontWeight: 900, color: C.text }}>参加同意書（WAIVER）</div>
            <div style={{ ...S.badge(C.jr), fontSize: 11 }}>Jr のみ</div>
          </div>
        </div>
        <div style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.7, marginBottom: 12 }}>
          Jrメンバーの入部には、保護者による参加同意書（WAIVER）の提出が必要です。怪我・SNS等に関する同意書となります。保護者が記入・署名してください。
        </div>
        <a href="https://drive.google.com/file/d/18bsXleKQziggnxu5ztoQt3mjt_SNjm3N/view?usp=sharing" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px", background: C.jr, borderRadius: 10, cursor: "pointer" }}>
            <span style={{ fontSize: 16 }}>📥</span>
            <span style={{ color: "#fff", fontWeight: 800, fontSize: 14 }}>ダウンロード（Google Drive）</span>
          </div>
        </a>
      </div>
    </DocViewer>
  );
}

// ── MJSパス＆スティッカーページ ──
function MJSPassPage({ onClose }) {
  return (
    <DocViewer title="MJSパス＆スティッカー申請" onClose={onClose}>
      <div style={{ background: C.sakuraLight, border: `1px solid ${C.sakura}`, borderRadius: 12, padding: "14px 16px", marginBottom: 20 }}>
        <div style={{ fontSize: 14, fontWeight: 900, color: C.primary, marginBottom: 8 }}>📌 申請について</div>
        <div style={{ fontSize: 13, color: C.text, lineHeight: 1.9 }}>
          MJS（マニラ日本人学校）のグラウンドを利用するには、<strong>SCHOOL ID</strong>および<strong>CAR STICKER</strong>の取得が必要です。毎年3月中旬を目途に更新申請を行ってください。
        </div>
      </div>

      {/* 申請手順 */}
      <div style={{ ...S.card, marginBottom: 12 }}>
        <div style={{ fontSize: 14, fontWeight: 900, color: C.text, marginBottom: 12 }}>申請手順</div>

        <div style={{ display: "flex", gap: 12, marginBottom: 14, alignItems: "flex-start" }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: C.primary, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900, flexShrink: 0 }}>1</div>
          <div style={{ fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            下記より<strong>申請書をダウンロード</strong>し、必要事項を記入する
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, marginBottom: 14, alignItems: "flex-start" }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: C.primary, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900, flexShrink: 0 }}>2</div>
          <div style={{ fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            記入した申請書を<strong>部長（赤星敦）に提出</strong>し、承認サインをもらう
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: C.primary, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900, flexShrink: 0 }}>3</div>
          <div style={{ fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            部長承認済みの申請書を添付の上、以下の内容でMJSへメール送信：<br />
            <div style={{ background: C.bg, borderRadius: 8, padding: "10px 12px", marginTop: 8, border: `1px solid ${C.border}` }}>
              <div style={{ marginBottom: 4 }}>📧 送付先：<a href="mailto:a.lecias@mjs.ph" style={{ color: C.primary, fontWeight: 800 }}>a.lecias@mjs.ph</a></div>
              <div style={{ marginBottom: 4 }}>📝 メール本文に以下を記載：</div>
              <div style={{ paddingLeft: 12, color: C.textMuted }}>
                Club Name：<strong style={{ color: C.text }}>Manila Hapons</strong><br />
                Club Representative：<strong style={{ color: C.text }}>赤星敦（Akahoshi Atsushi）</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 注意事項 */}
      <div style={{ background: "#FFF3F3", border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", marginBottom: 16, fontSize: 12, color: C.danger, lineHeight: 1.8 }}>
        ⚠ <strong>SCHOOL IDを取得していないメンバー及び帯同者（未就学児除く）は入校不可</strong>となります。また、校内・正面玄関前路側帯に駐車する場合はCAR STICKERの取得が必須です。
      </div>

      {/* ダウンロード */}
      <div style={S.card}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <span style={{ fontSize: 24 }}>📄</span>
          <div>
            <div style={{ fontSize: 15, fontWeight: 900, color: C.text }}>MJSパス＆スティッカー申請書</div>
            <div style={{ fontSize: 12, color: C.textMuted }}>有効期限：4月〜翌年3月（毎年更新）</div>
          </div>
        </div>
        <a href="https://drive.google.com/file/d/1FK-pkBr5RimIT-eFjjBtu1ryNk9-8W3A/view?usp=drive_link" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px", background: C.primary, borderRadius: 10, cursor: "pointer" }}>
            <span style={{ fontSize: 16 }}>📥</span>
            <span style={{ color: "#fff", fontWeight: 800, fontSize: 14 }}>ダウンロード（Google Drive）</span>
          </div>
        </a>
      </div>
    </DocViewer>
  );
}

// ── 部歌ページ ──
function ClubSongPage({ onClose }) {
  return (
    <DocViewer title="Manila Hapons 部歌" onClose={onClose}>
      <div style={{ ...S.card, background: `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryDark} 100%)`, color: "#fff", textAlign: "center", padding: "20px 16px", marginBottom: 20 }}>
        <div style={{ fontSize: 32, marginBottom: 8 }}>🎵</div>
        <div style={{ fontSize: 18, fontWeight: 900, letterSpacing: "0.06em" }}>Manila Hapons 部歌</div>
      </div>

      <div style={{ ...S.card, padding: "24px 20px" }}>
        <div style={{ fontSize: 15, color: C.text, lineHeight: 2.4 }}>
          <div style={{ marginBottom: 16 }}>
            <span style={{ ...S.badge(C.primary), fontSize: 11, marginBottom: 8, display: "inline-block" }}>主将リード</span><br />
            フィリピンの地にのぼる　朝日をあびながら
          </div>
          <div style={{ marginBottom: 16 }}>
            <span style={{ ...S.badge(C.success), fontSize: 11, marginBottom: 8, display: "inline-block" }}>みんなで</span><br />
            熱い魂と　みなぎる闘志が<br />
            青い海を越え　戦いに挑んでゆく<br />
            愛する　ラグビーで　何かをつかむため<br />
            フィリピノ　フィリピノ　マニラ　ハポン（ズ）<br />
            フィリピノ　フィリピノ　マニラ　ハポン（ズ）<br />
            走り抜けろ　オー！<br />
            飛び込んでみろ　オー！<br />
            勝利のために　前へ！　HAPONS！
          </div>
        </div>
      </div>
    </DocViewer>
  );
}

// ── HOME TAB ──
function HomeTab({ announcements, loading, isAdmin, onOpenImportant, onOpenRules, onOpenEntryForms, onOpenMJSPass, onOpenClubSong }) {
  const latest = announcements.slice(0, 3);
  const today = new Date().toLocaleDateString("ja-JP", { year: "numeric", month: "long", day: "numeric", weekday: "long" });
  const [photos, setPhotos] = useState([]);
  const [currentPhoto, setCurrentPhoto] = useState(null);
  const [showPhotoManager, setShowPhotoManager] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    const { data } = await supabase.storage.from("hapons-photos").list("", { sortBy: { column: "created_at", order: "desc" } });
    if (data && data.length > 0) {
      setPhotos(data);
      const random = data[Math.floor(Math.random() * data.length)];
      const { data: urlData } = supabase.storage.from("hapons-photos").getPublicUrl(random.name);
      setCurrentPhoto(urlData.publicUrl);
    }
  };

  const uploadPhoto = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const fileName = `photo_${Date.now()}_${file.name}`;
    await supabase.storage.from("hapons-photos").upload(fileName, file);
    await fetchPhotos();
    setUploading(false);
  };

  const deletePhoto = async (name) => {
    if (!window.confirm("この写真を削除しますか？")) return;
    await supabase.storage.from("hapons-photos").remove([name]);
    await fetchPhotos();
    if (photos.length <= 1) setCurrentPhoto(null);
  };

  const getPhotoUrl = (name) => {
    const { data } = supabase.storage.from("hapons-photos").getPublicUrl(name);
    return data.publicUrl;
  };

  return (
    <div style={S.content}>
      {/* ヘッダーカード（写真 or ロゴ） */}
      <div style={{ ...S.card, background: `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryDark} 100%)`, color: "#fff", marginBottom: 16, textAlign: "center", padding: "0", overflow: "hidden", position: "relative" }}>
        {currentPhoto ? (
          <img src={currentPhoto} alt="Manila Hapons" style={{ width: "100%", height: 200, objectFit: "cover", display: "block" }} />
        ) : (
          <div style={{ padding: "20px 16px" }}>
            <img src={LOGO_SRC} alt="Manila Hapons Rugby" style={{ width: 130, height: "auto", marginBottom: 10 }} />
          </div>
        )}
        <div style={{ padding: "10px 16px", background: "rgba(0,0,0,0.3)" }}>
          <div style={{ fontSize: 11, opacity: 0.8, letterSpacing: "0.06em" }}>{today}</div>
        </div>
        {isAdmin && (
          <button onClick={() => setShowPhotoManager(true)} style={{ position: "absolute", top: 8, right: 8, background: "rgba(0,0,0,0.5)", border: "none", borderRadius: 8, padding: "4px 10px", color: "#fff", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>
            📷 写真管理
          </button>
        )}
      </div>

      {/* 写真管理モーダル */}
      {showPhotoManager && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 200, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
          <div style={{ background: C.card, borderRadius: "20px 20px 0 0", padding: "24px 20px", width: "100%", maxWidth: 480, maxHeight: "80vh", overflowY: "auto", boxShadow: "0 -8px 40px rgba(0,0,0,0.2)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 900, color: C.text }}>📷 ホーム写真管理</h3>
              <button onClick={() => setShowPhotoManager(false)} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: C.textMuted }}>✕</button>
            </div>
            <p style={{ fontSize: 12, color: C.textMuted, marginBottom: 14, lineHeight: 1.6 }}>
              アップロードした写真がホーム画面にランダムで表示されます。
            </p>
            <input ref={fileInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={uploadPhoto} />
            <button style={{ ...S.btn("primary"), width: "100%", marginBottom: 16 }} onClick={() => fileInputRef.current.click()} disabled={uploading}>
              {uploading ? "アップロード中..." : "📤 写真をアップロード"}
            </button>
            {photos.length === 0 && <div style={{ textAlign: "center", color: C.textMuted, fontSize: 13, padding: 20 }}>写真がありません</div>}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {photos.map((p) => (
                <div key={p.name} style={{ position: "relative", borderRadius: 10, overflow: "hidden" }}>
                  <img src={getPhotoUrl(p.name)} alt={p.name} style={{ width: "100%", height: 120, objectFit: "cover", display: "block" }} />
                  <button onClick={() => deletePhoto(p.name)} style={{ position: "absolute", top: 4, right: 4, background: "rgba(155,0,0,0.85)", border: "none", borderRadius: 6, padding: "3px 8px", color: "#fff", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>
                    削除
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

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
      <div onClick={onOpenEntryForms} style={{ ...S.card, display: "flex", alignItems: "center", gap: 14, cursor: "pointer", borderLeft: `4px solid ${C.jr}` }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: C.jrLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>📝</div>
        <div><div style={{ fontSize: 14, fontWeight: 800, color: C.text, marginBottom: 2 }}>入部書類</div><div style={{ fontSize: 12, color: C.textMuted }}>入部届・参加同意書のダウンロード</div></div>
        <div style={{ marginLeft: "auto", color: C.textMuted, fontSize: 18 }}>›</div>
      </div>
      <div onClick={onOpenMJSPass} style={{ ...S.card, display: "flex", alignItems: "center", gap: 14, cursor: "pointer", borderLeft: `4px solid ${C.primary}` }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: C.sakuraLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>🏫</div>
        <div><div style={{ fontSize: 14, fontWeight: 800, color: C.text, marginBottom: 2 }}>MJSパス＆スティッカー申請</div><div style={{ fontSize: 12, color: C.textMuted }}>MJS ID・CAR STICKERの申請方法</div></div>
        <div style={{ marginLeft: "auto", color: C.textMuted, fontSize: 18 }}>›</div>
      </div>
      <div onClick={onOpenClubSong} style={{ ...S.card, display: "flex", alignItems: "center", gap: 14, cursor: "pointer", borderLeft: `4px solid ${C.accent}` }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: C.accent + "25", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>🎵</div>
        <div><div style={{ fontSize: 14, fontWeight: 800, color: C.text, marginBottom: 2 }}>部歌</div><div style={{ fontSize: 12, color: C.textMuted }}>Manila Hapons 部歌の歌詞</div></div>
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
    const { id: _id, created_at: _ca, ...rest } = form;
    const payload = { ...rest };
    if (form.age !== "" && form.age !== null && form.age !== undefined) {
      payload.age = Number(form.age);
    } else {
      payload.age = null;
    }
    if (showAdd) {
      const { data, error } = await supabase.from(table).insert([payload]).select();
      if (error) { alert("保存に失敗しました：" + error.message); return; }
      if (data) setList([...list, data[0]]);
    } else {
      const { error } = await supabase.from(table).update(payload).eq("id", editing.id);
      if (error) { alert("保存に失敗しました：" + error.message); return; }
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
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("adult");
  // 選択中の名前セット {name, type}[]
  const [selected, setSelected] = useState([]);
  const [step, setStep] = useState("select"); // "select" | "confirm"

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

  const isAttending = (name, type) => attendances.some((a) => a.member_name === name && a.member_type === type);
  const isSelected = (name, type) => selected.some((s) => s.name === name && s.type === type);

  const toggleSelect = (name, type) => {
    if (isSelected(name, type)) {
      setSelected(selected.filter((s) => !(s.name === name && s.type === type)));
    } else {
      setSelected([...selected, { name, type }]);
    }
  };

  const registerAll = async () => {
    if (selected.length === 0) return;
    setSaving(true);
    const toAdd = selected.filter((s) => !isAttending(s.name, s.type));
    const toRemove = selected.filter((s) => isAttending(s.name, s.type));

    for (const s of toRemove) {
      const existing = attendances.find((a) => a.member_name === s.name && a.member_type === s.type);
      if (existing) await supabase.from("attendances").delete().eq("id", existing.id);
    }
    let newAttendances = attendances.filter((a) => !toRemove.some((s) => s.name === a.member_name && s.type === a.member_type));

    if (toAdd.length > 0) {
      const { data } = await supabase.from("attendances").insert(
        toAdd.map((s) => ({ event_id: event.id, member_name: s.name, member_type: s.type }))
      ).select();
      if (data) newAttendances = [...newAttendances, ...data];
    }

    setAttendances(newAttendances);
    setSelected([]);
    setStep("confirm");
    setSaving(false);
  };

  const adultAttending = attendances.filter((a) => a.member_type === "adult").map((a) => a.member_name);
  const jrAttending = attendances.filter((a) => a.member_type === "jr").map((a) => a.member_name);
  const adultNotAttending = members.map((m) => m.name_jp).filter((n) => !adultAttending.includes(n));
  const jrNotAttending = jrMembers.map((m) => m.name_jp).filter((n) => !jrAttending.includes(n));
  const totalAttending = adultAttending.length + jrAttending.length;

  const renderMemberList = (list, type) => list.map((m) => {
    const attending = isAttending(m.name_jp, type);
    const sel = isSelected(m.name_jp, type);
    const color = type === "adult" ? C.primary : C.jr;
    return (
      <button key={m.id} onClick={() => toggleSelect(m.name_jp, type)}
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "12px 14px", borderRadius: 10, fontFamily: "inherit", cursor: "pointer", textAlign: "left", width: "100%",
          border: sel ? `2px solid ${color}` : attending ? `2px solid ${C.success}` : `1.5px solid ${C.border}`,
          background: sel ? (type === "adult" ? C.sakuraLight : C.jrLight) : attending ? "#2E7D3210" : C.card,
          marginBottom: 6,
        }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 800, color: C.text }}>{m.name_jp}</div>
          <div style={{ fontSize: 11, color: attending ? C.success : C.textMuted }}>
            {attending ? "✓ 参加登録済み" : (type === "adult" ? m.position : m.grade)}
          </div>
        </div>
        <div style={{ width: 24, height: 24, borderRadius: "50%", border: `2px solid ${sel ? color : C.border}`, background: sel ? color : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          {sel && <span style={{ color: "#fff", fontSize: 14, fontWeight: 900 }}>✓</span>}
        </div>
      </button>
    );
  });

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 200, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
      <div style={{ background: C.bg, borderRadius: "20px 20px 0 0", width: "100%", maxWidth: 480, maxHeight: "90vh", overflowY: "auto", boxShadow: "0 -8px 40px rgba(0,0,0,0.2)" }}>

        {/* ヘッダー */}
        <div style={{ background: `linear-gradient(160deg, ${C.primary} 0%, ${C.primaryDark} 100%)`, padding: "16px 20px", borderRadius: "20px 20px 0 0", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 10 }}>
          <div>
            <div style={{ color: "#fff", fontSize: 15, fontWeight: 900 }}>{event.title}</div>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 12 }}>{event.date}　{event.time}　参加{totalAttending}名</div>
          </div>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 8, padding: "6px 12px", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>✕</button>
        </div>

        <div style={{ padding: "16px 16px 32px" }}>
          {loading && <Loading />}

          {!loading && (
            <>
              {/* 登録完了メッセージ */}
              {step === "confirm" && (
                <div style={{ ...S.card, borderLeft: `4px solid ${C.success}`, marginBottom: 14, display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 22 }}>✅</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 800, color: C.success }}>登録が完了しました</div>
                    <div style={{ fontSize: 12, color: C.textMuted }}>続けて別の方を選択できます</div>
                  </div>
                </div>
              )}

              {/* 選択中バナー＋登録ボタン */}
              {selected.length > 0 && (
                <div style={{ ...S.card, borderLeft: `4px solid ${C.accent}`, marginBottom: 14 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 8 }}>
                    選択中：{selected.map((s) => s.name).join("、")}
                  </div>
                  <button onClick={registerAll} disabled={saving}
                    style={{ ...S.btn("primary"), width: "100%", padding: "14px", fontSize: 15, borderRadius: 10 }}>
                    {saving ? "登録中..." : `✋ ${selected.length}名を登録する`}
                  </button>
                  <button onClick={() => setSelected([])} style={{ width: "100%", marginTop: 8, padding: "8px", borderRadius: 8, border: "none", background: "none", color: C.textMuted, fontSize: 12, cursor: "pointer" }}>
                    選択をクリア
                  </button>
                </div>
              )}

              {/* 大人/Jr タブ */}
              <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                <button onClick={() => setActiveTab("adult")} style={{ flex: 1, padding: "10px", borderRadius: 10, border: `2px solid ${activeTab === "adult" ? C.primary : C.border}`, background: activeTab === "adult" ? C.sakuraLight : C.card, color: activeTab === "adult" ? C.primary : C.textMuted, fontWeight: 800, fontSize: 12, cursor: "pointer" }}>
                  🏉 大人（{adultAttending.length}名参加）
                </button>
                <button onClick={() => setActiveTab("jr")} style={{ flex: 1, padding: "10px", borderRadius: 10, border: `2px solid ${activeTab === "jr" ? C.jr : C.border}`, background: activeTab === "jr" ? C.jrLight : C.card, color: activeTab === "jr" ? C.jr : C.textMuted, fontWeight: 800, fontSize: 12, cursor: "pointer" }}>
                  ⭐ Jr（{jrAttending.length}名参加）
                </button>
              </div>

              <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 10 }}>
                タップして選択 → 「登録する」ボタンで完了。複数名同時に選択可能です。
              </div>

              {/* メンバーリスト */}
              {activeTab === "adult" && (
                members.length === 0
                  ? <div style={{ textAlign: "center", color: C.textMuted, fontSize: 13 }}>メンバーが登録されていません</div>
                  : renderMemberList(members, "adult")
              )}
              {activeTab === "jr" && (
                jrMembers.length === 0
                  ? <div style={{ textAlign: "center", color: C.textMuted, fontSize: 13 }}>Jrメンバーが登録されていません</div>
                  : renderMemberList(jrMembers, "jr")
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

  const typeConfig = { practice: { label: "練習", color: "#1E88E5" }, game: { label: "試合", color: C.primary }, event: { label: "イベント", color: "#2E7D32" }, committee: { label: "幹事会", color: "#8E24AA" } };
  const fields = [
    { key: "title", label: "タイトル" },
    { key: "date", label: "日付", type: "date" },
    { key: "time", label: "時間（例：09:00〜11:00）" },
    { key: "location", label: "場所" },
    { key: "type", label: "種別", type: "select", options: Object.entries(typeConfig).map(([v, c]) => ({ value: v, label: c.label })) },
  ];

  const save = async (form) => {
    const { id: _id, created_at: _ca, ...payload } = form;
    if (showAdd) {
      const { data, error } = await supabase.from("events").insert([payload]).select();
      if (error) { alert("保存に失敗しました：" + error.message); return; }
      if (data) setEvents([...events, data[0]].sort((a, b) => a.date.localeCompare(b.date)));
    } else {
      const { error } = await supabase.from("events").update(payload).eq("id", editing.id);
      if (error) { alert("保存に失敗しました：" + error.message); return; }
      setEvents(events.map((e) => e.id === editing.id ? { ...e, ...payload } : e).sort((a, b) => a.date.localeCompare(b.date)));
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
  const [members, setMembers] = useState([]);
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [showMonthModal, setShowMonthModal] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [newMonth, setNewMonth] = useState("");
  const [newAmount, setNewAmount] = useState(1000);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [saving, setSaving] = useState(false);
  const [showAddMember, setShowAddMember] = useState(false);
  const [addTarget, setAddTarget] = useState("");

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      const [m, f] = await Promise.all([
        supabase.from("members").select("id, name_jp, position").order("created_at"),
        supabase.from("fees").select("*").order("created_at"),
      ]);
      if (m.data) setMembers(m.data);
      if (f.data) setFees(f.data);
      setLoading(false);
    };
    fetchAll();
  }, []);

  const months = [...new Set(fees.map((f) => f.month))].sort().reverse();
  const recentMonths = months.slice(0, 5);
  const yearTotal = fees.filter((f) => f.paid).reduce((sum, f) => sum + (f.amount || 0), 0);

  const getMonthFees = (month) => fees.filter((f) => f.month === month);
  const getMonthSummary = (month) => {
    const mf = getMonthFees(month);
    const paid = mf.filter((f) => f.paid).length;
    const total = mf.length;
    const amount = mf.filter((f) => f.paid).reduce((sum, f) => sum + (f.amount || 0), 0);
    const unitAmount = mf.length > 0 ? mf[0].amount : 0;
    return { paid, total, amount, unitAmount, pct: total > 0 ? Math.round((paid / total) * 100) : 0 };
  };

  const monthFees = selectedMonth ? getMonthFees(selectedMonth) : [];
  const monthAmount = monthFees.length > 0 ? monthFees[0].amount : 0;
  const getRecord = (name) => monthFees.find((f) => f.member_name === name);
  const notInMonth = members.filter((m) => !monthFees.some((f) => f.member_name === m.name_jp));

  const toggleSelectMember = (name) => setSelectedMembers((prev) =>
    prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
  );
  const selectAll = () => setSelectedMembers(members.map((m) => m.name_jp));
  const clearAll = () => setSelectedMembers([]);

  const createMonth = async () => {
    if (!newMonth.trim() || selectedMembers.length === 0) { alert("月と対象メンバーを選択してください"); return; }
    setSaving(true);
    const records = selectedMembers.map((name) => ({
      month: newMonth.trim(), amount: Number(newAmount), member_name: name, member_type: "adult", paid: false, paid_date: null,
    }));
    const { data, error } = await supabase.from("fees").insert(records).select();
    if (error) { alert("作成に失敗しました：" + error.message); setSaving(false); return; }
    if (data) { setFees([...fees, ...data]); setSelectedMonth(newMonth.trim()); }
    setShowMonthModal(false); setNewMonth(""); setSelectedMembers([]); setSaving(false);
  };

  const addMemberToMonth = async () => {
    if (!addTarget) return;
    setSaving(true);
    const { data, error } = await supabase.from("fees").insert([{
      month: selectedMonth, amount: monthAmount, member_name: addTarget, member_type: "adult", paid: false, paid_date: null,
    }]).select();
    if (error) { alert("追加に失敗しました：" + error.message); setSaving(false); return; }
    if (data) setFees([...fees, data[0]]);
    setShowAddMember(false); setAddTarget(""); setSaving(false);
  };

  const removeMemberFromMonth = async (name) => {
    if (!window.confirm(`${name} をこの月の部費対象から除外しますか？`)) return;
    const record = getRecord(name);
    if (!record) return;
    await supabase.from("fees").delete().eq("id", record.id);
    setFees(fees.filter((f) => f.id !== record.id));
  };

  const togglePaid = async (name) => {
    if (!isAdmin) return;
    const record = getRecord(name);
    if (!record) return;
    const newPaid = !record.paid;
    const newDate = newPaid ? new Date().toISOString().slice(0, 10) : null;
    const { error } = await supabase.from("fees").update({ paid: newPaid, paid_date: newDate }).eq("id", record.id);
    if (error) { alert("更新に失敗しました：" + error.message); return; }
    setFees(fees.map((f) => f.id === record.id ? { ...f, paid: newPaid, paid_date: newDate } : f));
  };

  const MonthCard = ({ month, onClick }) => {
    const s = getMonthSummary(month);
    return (
      <div onClick={onClick} style={{ ...S.card, cursor: "pointer", borderLeft: `4px solid ${s.pct === 100 ? C.success : C.primary}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
          <div style={{ fontSize: 14, fontWeight: 900, color: C.text }}>{month}</div>
          <div style={{ fontSize: 15, fontWeight: 900, color: C.primary }}>P{s.amount.toLocaleString()}</div>
        </div>
        <div style={{ background: C.border, borderRadius: 99, height: 6, overflow: "hidden", marginBottom: 6 }}>
          <div style={{ height: "100%", width: `${s.pct}%`, background: s.pct === 100 ? C.success : C.primary, borderRadius: 99 }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: C.textMuted }}>
          <span>{s.paid}/{s.total}名 納入済　月額P{s.unitAmount.toLocaleString()}</span>
          <span style={{ color: s.pct === 100 ? C.success : C.textMuted, fontWeight: 700 }}>{s.pct}%</span>
        </div>
      </div>
    );
  };

  // 月詳細ページ
  if (selectedMonth) {
    const mf = getMonthFees(selectedMonth);
    const paid = mf.filter((f) => f.paid).length;
    const pct = mf.length > 0 ? Math.round((paid / mf.length) * 100) : 0;
    const totalAmt = mf.filter((f) => f.paid).reduce((sum, f) => sum + (f.amount || 0), 0);
    return (
      <div style={S.content}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <button onClick={() => setSelectedMonth(null)} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: C.primary, padding: 0 }}>←</button>
          <h2 style={{ ...S.sectionTitle, margin: 0 }}>{selectedMonth}</h2>
          {isAdmin && notInMonth.length > 0 && (
            <button style={{ ...S.btn("ghost", "sm"), marginLeft: "auto" }} onClick={() => setShowAddMember(true)}>＋ 追加</button>
          )}
        </div>
        <div style={{ ...S.card, background: `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryDark} 100%)`, color: "#fff", marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
            <div>
              <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 2 }}>納入済み合計</div>
              <div style={{ fontSize: 26, fontWeight: 900 }}>P{totalAmt.toLocaleString()}</div>
              <div style={{ fontSize: 12, opacity: 0.8 }}>月額 P{monthAmount.toLocaleString()}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 24, fontWeight: 900 }}>{pct}%</div>
              <div style={{ fontSize: 12, opacity: 0.8 }}>{paid}/{mf.length}名</div>
            </div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: 99, height: 8, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${pct}%`, background: C.accent, borderRadius: 99 }} />
          </div>
          <div style={{ marginTop: 8, fontSize: 12, opacity: 0.8 }}>未納：{mf.length - paid}名</div>
        </div>
        {mf.length === 0 && <div style={{ ...S.card, textAlign: "center", color: C.textMuted, fontSize: 13 }}>対象メンバーがいません</div>}
        {mf.map((f) => (
          <div key={f.id} style={{ ...S.card, display: "flex", justifyContent: "space-between", alignItems: "center", borderLeft: `4px solid ${f.paid ? C.success : C.border}` }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, color: C.text }}>{f.member_name}</div>
              {f.paid && f.paid_date ? <div style={{ fontSize: 11, color: C.success }}>支払日：{f.paid_date}</div> : <div style={{ fontSize: 11, color: C.textMuted }}>未納入</div>}
            </div>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <button onClick={() => togglePaid(f.member_name)} disabled={!isAdmin}
                style={{ padding: "6px 14px", borderRadius: 20, border: "none", fontWeight: 700, fontSize: 12, cursor: isAdmin ? "pointer" : "default", background: f.paid ? "#2E7D3220" : "#CC1F1F20", color: f.paid ? C.success : C.danger }}>
                {f.paid ? "✓ 納入済" : "未納入"}
              </button>
              {isAdmin && <button onClick={() => removeMemberFromMonth(f.member_name)} style={{ padding: "4px 8px", borderRadius: 6, border: "none", background: C.border, color: C.textMuted, fontSize: 11, cursor: "pointer" }}>除外</button>}
            </div>
          </div>
        ))}
        {showAddMember && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
            <div style={{ background: C.card, borderRadius: 20, padding: 28, width: "100%", maxWidth: 360 }}>
              <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 900, color: C.text }}>メンバーを追加</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
                {notInMonth.map((m) => (
                  <button key={m.id} onClick={() => setAddTarget(m.name_jp)}
                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", borderRadius: 10, border: `1.5px solid ${addTarget === m.name_jp ? C.primary : C.border}`, background: addTarget === m.name_jp ? C.sakuraLight : C.card, cursor: "pointer", fontFamily: "inherit" }}>
                    <span style={{ fontSize: 14, fontWeight: 800, color: C.text }}>{m.name_jp}</span>
                    {addTarget === m.name_jp && <span style={{ color: C.primary, fontWeight: 900 }}>✓</span>}
                  </button>
                ))}
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button style={{ ...S.btn("ghost"), flex: 1 }} onClick={() => { setShowAddMember(false); setAddTarget(""); }}>キャンセル</button>
                <button style={{ ...S.btn("primary"), flex: 2 }} onClick={addMemberToMonth} disabled={!addTarget || saving}>追加する</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 全履歴ページ
  if (showHistory) {
    return (
      <div style={S.content}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <button onClick={() => setShowHistory(false)} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: C.primary, padding: 0 }}>←</button>
          <h2 style={{ ...S.sectionTitle, margin: 0 }}>支払い履歴（全期間）</h2>
        </div>
        <div style={{ ...S.card, background: `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryDark} 100%)`, color: "#fff", marginBottom: 16 }}>
          <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 4 }}>年間累計納入額</div>
          <div style={{ fontSize: 28, fontWeight: 900 }}>P{yearTotal.toLocaleString()}</div>
          <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>全期間 {months.length}か月分</div>
        </div>
        {months.length === 0 && <div style={{ ...S.card, textAlign: "center", color: C.textMuted, fontSize: 13 }}>データがありません</div>}
        {months.map((month) => (
          <MonthCard key={month} month={month} onClick={() => { setShowHistory(false); setSelectedMonth(month); }} />
        ))}
      </div>
    );
  }

  // メインページ
  return (
    <div style={S.content}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <h2 style={{ ...S.sectionTitle, margin: 0 }}>部費管理</h2>
        {isAdmin && <button style={S.btn("accent", "sm")} onClick={() => { setSelectedMembers(members.map((m) => m.name_jp)); setShowMonthModal(true); }}>＋ 月を追加</button>}
      </div>
      {loading && <Loading />}
      {!loading && (
        <>
          <div style={{ ...S.card, background: `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryDark} 100%)`, color: "#fff", marginBottom: 16 }}>
            <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 4 }}>年間累計納入額</div>
            <div style={{ fontSize: 32, fontWeight: 900, marginBottom: 4 }}>P{yearTotal.toLocaleString()}</div>
            <div style={{ fontSize: 12, opacity: 0.7 }}>全期間 {months.length}か月分の記録</div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: C.text }}>直近5か月</div>
          </div>

          {months.length === 0 ? (
            <div style={{ ...S.card, textAlign: "center", color: C.textMuted, fontSize: 13, padding: 24 }}>
              {isAdmin ? "「＋ 月を追加」から月を作成してください" : "部費データがありません"}
            </div>
          ) : (
            recentMonths.map((month) => (
              <MonthCard key={month} month={month} onClick={() => setSelectedMonth(month)} />
            ))
          )}

          {months.length > 0 && (
            <button onClick={() => setShowHistory(true)}
              style={{ width: "100%", padding: "12px", borderRadius: 10, border: `1.5px solid ${C.primary}`, background: C.sakuraLight, color: C.primary, fontSize: 13, fontWeight: 700, cursor: "pointer", marginTop: 8 }}>
              📋 全履歴を見る（{months.length}か月分）
            </button>
          )}
        </>
      )}

      {showMonthModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 200, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
          <div style={{ background: C.card, borderRadius: "20px 20px 0 0", padding: "24px 20px", width: "100%", maxWidth: 480, maxHeight: "85vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 900, color: C.text }}>月を追加</h3>
              <button onClick={() => setShowMonthModal(false)} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: C.textMuted }}>✕</button>
            </div>
            <label style={{ fontSize: 12, fontWeight: 700, color: C.textMuted, display: "block", marginBottom: 4 }}>月（例：2026年5月）</label>
            <input style={S.input} placeholder="2026年5月" value={newMonth} onChange={(e) => setNewMonth(e.target.value)} />
            <label style={{ fontSize: 12, fontWeight: 700, color: C.textMuted, display: "block", marginBottom: 4 }}>月額（ペソ）</label>
            <input style={S.input} type="number" value={newAmount} onChange={(e) => setNewAmount(e.target.value)} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>対象メンバー（{selectedMembers.length}名）</div>
              <div style={{ display: "flex", gap: 6 }}>
                <button onClick={selectAll} style={{ fontSize: 11, color: C.primary, background: "none", border: "none", cursor: "pointer", fontWeight: 700 }}>全選択</button>
                <button onClick={clearAll} style={{ fontSize: 11, color: C.textMuted, background: "none", border: "none", cursor: "pointer", fontWeight: 700 }}>クリア</button>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
              {members.map((m) => (
                <button key={m.id} onClick={() => toggleSelectMember(m.name_jp)}
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", borderRadius: 10, border: `1.5px solid ${selectedMembers.includes(m.name_jp) ? C.primary : C.border}`, background: selectedMembers.includes(m.name_jp) ? C.sakuraLight : C.card, cursor: "pointer", fontFamily: "inherit" }}>
                  <div>
                    <span style={{ fontSize: 14, fontWeight: 800, color: C.text }}>{m.name_jp}</span>
                    {m.position && <span style={{ fontSize: 11, color: C.textMuted, marginLeft: 8 }}>{m.position}</span>}
                  </div>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", border: `2px solid ${selectedMembers.includes(m.name_jp) ? C.primary : C.border}`, background: selectedMembers.includes(m.name_jp) ? C.primary : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {selectedMembers.includes(m.name_jp) && <span style={{ color: "#fff", fontSize: 12, fontWeight: 900 }}>✓</span>}
                  </div>
                </button>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button style={{ ...S.btn("ghost"), flex: 1 }} onClick={() => setShowMonthModal(false)}>キャンセル</button>
              <button style={{ ...S.btn("primary"), flex: 2 }} onClick={createMonth} disabled={saving}>
                {saving ? "作成中..." : `${selectedMembers.length}名で作成する`}
              </button>
            </div>
          </div>
        </div>
      )}
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
  const [showEntryForms, setShowEntryForms] = useState(false);
  const [showMJSPass, setShowMJSPass] = useState(false);
  const [showClubSong, setShowClubSong] = useState(false);
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
  if (showEntryForms) return <EntryFormsPage onClose={() => setShowEntryForms(false)} />;
  if (showMJSPass) return <MJSPassPage onClose={() => setShowMJSPass(false)} />;
  if (showClubSong) return <ClubSongPage onClose={() => setShowClubSong(false)} />;

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

      {tab === "home" && <HomeTab announcements={announcements} loading={loadingAnnouncements} isAdmin={isAdmin} onOpenImportant={() => setShowImportant(true)} onOpenRules={() => setShowRules(true)} onOpenEntryForms={() => setShowEntryForms(true)} onOpenMJSPass={() => setShowMJSPass(true)} onOpenClubSong={() => setShowClubSong(true)} />}
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
