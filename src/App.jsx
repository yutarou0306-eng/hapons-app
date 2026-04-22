import { useState } from "react";

// ── CREDENTIALS ──
const MEMBER_ID = "hapons";
const MEMBER_PASS = "member2026";
const ADMIN_ID = "hapons";
const ADMIN_PASS = "rugby2026";

const IMPORTANT_URL = "https://docs.google.com/document/d/1KyBa4FufpoRyB6IpDUPEnv2GrYqwmUQQ2lb95luokFE/edit?usp=drive_link";
const RULES_URL = "https://docs.google.com/document/d/1vFL3nUWpJrwEzPqPQSg8Dr6bJGcHLTP3ojhD1dl9P18/edit?usp=drive_link";
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

// ── DESIGN TOKENS (Manila Hapons: red, yellow, sakura pink) ──
const C = {
  primary: "#CC1F1F",
  primaryDark: "#9B0000",
  accent: "#F5C800",
  sakura: "#F4A7B0",
  sakuraLight: "#FDE8EC",
  bg: "#FDF8F8",
  card: "#FFFFFF",
  text: "#1A0505",
  textMuted: "#7A5050",
  border: "#F0DADA",
  success: "#2E7D32",
  danger: "#9B0000",
  warning: "#D4A800",
  adminBg: "#7A0000",
};

const S = {
  app: { minHeight: "100vh", backgroundColor: C.bg, fontFamily: "'Noto Sans JP', 'Hiragino Kaku Gothic ProN', sans-serif", maxWidth: 480, margin: "0 auto", paddingBottom: 80 },
  header: { background: `linear-gradient(160deg, ${C.primary} 0%, ${C.primaryDark} 100%)`, padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" },
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
        <img src={LOGO_SRC} alt="Manila Hapons Rugby" style={{ width: 180, height: "auto", marginBottom: 8, filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.4))" }} />
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
function HomeTab({ announcements }) {
  const latest = announcements.slice(0, 3);
  const today = new Date().toLocaleDateString("ja-JP", { year: "numeric", month: "long", day: "numeric", weekday: "long" });
  return (
    <div style={S.content}>
      <div style={{ ...S.card, background: `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryDark} 100%)`, color: "#fff", marginBottom: 16, textAlign: "center", padding: "20px 16px" }}>
        <img src={LOGO_SRC} alt="Manila Hapons Rugby" style={{ width: 130, height: "auto", marginBottom: 10 }} />
        <div style={{ fontSize: 11, opacity: 0.7, letterSpacing: "0.06em" }}>{today}</div>
      </div>

      <h2 style={S.sectionTitle}>クラブ資料</h2>
      <a href={IMPORTANT_URL} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
        <div style={{ ...S.card, display: "flex", alignItems: "center", gap: 14, cursor: "pointer", borderLeft: `4px solid ${C.accent}` }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: C.accent + "30", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>📋</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 800, color: C.text, marginBottom: 2 }}>Hapons 重要事項</div>
            <div style={{ fontSize: 12, color: C.textMuted }}>クラブの重要なお知らせ・規則</div>
          </div>
          <div style={{ marginLeft: "auto", color: C.textMuted, fontSize: 18 }}>›</div>
        </div>
      </a>

      <a href={RULES_URL} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
        <div style={{ ...S.card, display: "flex", alignItems: "center", gap: 14, cursor: "pointer", borderLeft: `4px solid ${C.sakura}` }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: C.sakuraLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>🌸</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 800, color: C.text, marginBottom: 2 }}>Rules & Guidelines</div>
            <div style={{ fontSize: 12, color: C.textMuted }}>クラブのルールとガイドライン</div>
          </div>
          <div style={{ marginLeft: "auto", color: C.textMuted, fontSize: 18 }}>›</div>
        </div>
      </a>

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
  const isAdmin = role === "admin";

  if (!role) return <LoginScreen onLogin={setRole} />;

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
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img src={LOGO_SRC} alt="Manila Hapons Rugby" style={{ height: 40, width: "auto" }} />
          <div>
            <h1 style={{ color: "#fff", fontSize: 16, fontWeight: 900, margin: 0, letterSpacing: "0.04em" }}>Manila Hapons</h1>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 10, marginTop: 1, letterSpacing: "0.06em" }}>RUGBY FOOTBALL CLUB · PHILIPPINES</p>
          </div>
        </div>
        <button onClick={() => { if (window.confirm("ログアウトしますか？")) { setRole(null); setTab("home"); } }} style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 8, padding: "6px 12px", color: "rgba(255,255,255,0.85)", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>
          {isAdmin ? "管理者 ✕" : "ログアウト"}
        </button>
      </div>

      {isAdmin && (
        <div style={{ background: C.adminBg, padding: "6px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ color: C.accent, fontSize: 11, fontWeight: 700, letterSpacing: "0.06em" }}>⚙ 管理者モード — 全コンテンツの編集が可能です</span>
          <span style={{ background: C.accent, color: C.primaryDark, fontSize: 10, fontWeight: 900, padding: "2px 8px", borderRadius: 20 }}>ADMIN</span>
        </div>
      )}

      {tab === "home" && <HomeTab announcements={announcements} />}
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
    </div>
  );
}
