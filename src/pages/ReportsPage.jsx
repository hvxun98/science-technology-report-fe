import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FileText, Bot, Send, Save, CheckCircle, Calendar, Clock, Eye, Edit3, X, Bold, Italic, List, AlignLeft, Quote, Undo2, Redo2, MessageSquare, Loader2 } from 'lucide-react';
import { dailyBriefs } from '../data/dailyBriefs';
import AIAnalyst from './AIAnalyst';

// Build weekly reports from daily briefs + extras
const WEEKLY_REPORTS = [
  {
    id: 1, status: 'approved',
    title: 'Tổng kết xu hướng KH&CN — Tuần 13/2026',
    dateRange: '24/03 – 30/03/2026',
    createdAt: '30/03/2026 22:15',
    summary: 'Tuần đánh dấu 2 sự kiện lớn: Mỹ mở rộng Entity List sang DRAM HBM và EU AI Act bắt đầu có hiệu lực với doanh nghiệp ASEAN.',
    sections: [
      { heading: '1. Tổng quan xu hướng tuần', content: 'Hệ thống đã thu thập và phân tích 1,847 bài viết từ 47 nguồn. Tín hiệu nổi bật tập trung vào 3 lĩnh vực:\n\n• Bán dẫn & Chuỗi cung ứng (tăng 41% thảo luận)\n• AI Governance & Regulation (tăng 29%)\n• Năng lượng thế hệ mới (tăng 17%)\n\n→ Đặc biệt cần chú ý: Mỹ áp lệnh kiểm soát xuất khẩu chip HBM sang 27 thực thể TQ, tác động trực tiếp đến Samsung và SK Hynix tại Việt Nam.' },
      { heading: '2. Phân tích chiến lược', content: 'Dòng FDI bán dẫn vào ASEAN tăng 34% so với Q1/2025. Việt Nam, Malaysia và Thái Lan tiếp tục là 3 điểm đến hàng đầu.\n\nEU AI Act Tier 4 tạo ra khoảng trắng pháp lý thuận lợi cho các doanh nghiệp AI B2B không bị ràng buộc bởi quy định general purpose AI.\n\n→ Hàm ý với Việt Nam: Cửa sổ thời gian 18 tháng để xây dựng khung pháp lý AI sandbox trước khi các nước ASEAN khác hoàn thiện.' },
      { heading: '3. Ngụ ý với Nghị quyết 57', content: '→ Kinh tế số: Samsung xác nhận đầu tư $3.5B vào Thái Nguyên — tín hiệu tích cực cho mục tiêu xuất khẩu CN cao đạt 50% vào 2030.\n\n→ R&D/GDP: Nhật Bản, Hàn Quốc tăng ngân sách lượng tử — áp lực cạnh tranh nhân tài với các trường đại học VN.\n\n→ Nhân lực: SeaLLM-v3 đạt SOTA tiếng Việt — cơ hội ứng dụng AI vào các hệ thống hành chính công.' },
      { heading: '4. Khuyến nghị hành động', content: '1. Bộ KH&ĐT: Đánh giá ngay rủi ro chuỗi cung ứng chip — timeline 2 tuần\n2. BTTTT: Khởi động xây dựng AI Sandbox framework — ưu tiên tháng 4/2026\n3. BGD&ĐT: Tăng tốc chương trình đào tạo 10,000 kỹ sư bán dẫn theo mô hình MEXT Nhật Bản' },
    ],
  },
  {
    id: 2, status: 'editing',
    title: 'Tổng kết xu hướng KH&CN — Tuần 14/2026',
    dateRange: '31/03 – 06/04/2026',
    createdAt: '06/04/2026 20:44',
    summary: 'Tuần có tín hiệu mạnh từ đầu tư VC vào AI Infrastructure tại SEA và Nhật Bản tăng ngân sách Quantum lên ¥200 tỷ.',
    sections: [
      { heading: '1. Tổng quan xu hướng tuần', content: 'Tuần 14/2026 ghi nhận 2,341 tín hiệu từ 47 nguồn, cao nhất kể từ tháng 1/2026.\n\n• AI & Đầu tư (tăng 52% so với tuần trước)\n• Lượng tử (tăng 38%)\n• Pin thế hệ mới (tăng 22%)\n\n→ Fund $3B của Sequoia SEA và $5B SoftBank Vision Fund III đổ vào AI Infrastructure là tín hiệu dòng vốn quan trọng nhất tuần.' },
      { heading: '2. Phân tích chiến lược', content: 'Đầu tư VC vào AI Infrastructure tại SEA đạt kỷ lục mới: $4.2B trong Q1/2026, tăng 89% so với Q1/2025. Xu hướng chính: hardware AI (GPU clusters, inference chips) và AI platform (foundation model API, RAG infrastructure).\n\nNhật Bản tăng ngân sách quantum lên ¥200 tỷ phản ánh chiến lược cạnh tranh độc lập khỏi lưỡng cực Mỹ-Trung trong công nghệ nhạy cảm.' },
    ],
  },
  {
    id: 3, status: 'draft',
    title: 'Tổng kết xu hướng KH&CN — Tuần 15/2026',
    dateRange: '07/04 – 13/04/2026',
    createdAt: '---',
    summary: 'Bản nháp — chưa có dữ liệu đầy đủ',
    sections: [],
  },
];

const statusConfig = {
  approved: { color: '#22d3a0', bg: 'rgba(34,211,160,0.1)', label: 'Đã duyệt', icon: <CheckCircle size={10} /> },
  editing: { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', label: 'Đang sửa', icon: <Edit3 size={10} /> },
  draft: { color: '#3b82f6', bg: 'rgba(59,130,246,0.1)', label: 'Bản nháp', icon: <FileText size={10} /> },
};

function renderContent(text) {
  return text.split('\n').map((line, i) => {
    if (!line.trim()) return <br key={i} />;
    if (line.startsWith('•')) return <p key={i} style={{ margin: '3px 0 3px 12px', fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{line}</p>;
    if (line.startsWith('→')) return <p key={i} style={{ margin: '6px 0', padding: '5px 10px', borderLeft: '3px solid #f59e0b', background: 'rgba(245,158,11,0.06)', fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.7, borderRadius: '0 4px 4px 0' }}>{line}</p>;
    if (line.match(/^\d+\./)) return <p key={i} style={{ margin: '4px 0 4px 12px', fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.7, fontWeight: 500 }}>{line}</p>;
    return <p key={i} style={{ margin: '3px 0', fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{line}</p>;
  });
}

export default function ReportsPage() {
  const [reports, setReports] = useState(WEEKLY_REPORTS);
  const [selected, setSelected] = useState(WEEKLY_REPORTS[1]);
  const [editMode, setEditMode] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const editorRef = useRef(null);

  useEffect(() => {
    if (editMode && editorRef.current && selected) {
      let html = `<h1>${selected.title}</h1>`;
      html += `<p style="color:#666;font-size:0.85em">📅 ${selected.dateRange} &nbsp;|&nbsp; 🕐 ${selected.createdAt}</p>`;
      html += `<blockquote>⚡ <strong>TÓM TẮT:</strong> ${selected.summary}</blockquote>`;
      selected.sections.forEach(sec => {
        html += `<h2>${sec.heading}</h2>`;
        sec.content.split('\n').forEach(line => {
          if (line) html += `<p>${line}</p>`;
        });
      });
      editorRef.current.innerHTML = html;
    }
  }, [editMode, selected]);

  const execCommand = useCallback((cmd, val = null) => {
    document.execCommand(cmd, false, val);
    editorRef.current?.focus();
  }, []);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const newReport = {
        id: reports.length + 1, status: 'draft',
        title: `Tổng kết xu hướng KH&CN — Tuần ${14 + reports.length - 1}/2026`,
        dateRange: `${String(7 + reports.length - 1).padStart(2,'0')}/04 – ${String(13 + reports.length - 1).padStart(2,'0')}/04/2026`,
        createdAt: new Date().toLocaleDateString('vi-VN') + ' ' + new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        summary: 'AI đã tổng hợp từ 2,341 nguồn — Tín hiệu nổi bật: IBM Condor II 1,200 qubit và đầu tư VC vào AI infrastructure kỷ lục mới.',
        sections: [
          { heading: '1. Tổng quan xu hướng tuần', content: 'Hệ thống đã xử lý 2,341 bài viết từ 47 nguồn trong tuần qua.\n\n• Điện toán lượng tử (tăng 34% thảo luận)\n• Agentic AI (tăng 28%)\n• Pin thể rắn (tăng 22%)\n\n→ IBM công bố Condor II với 1,200 qubit và tỷ lệ lỗi giảm 90% là tín hiệu kỹ thuật mạnh nhất tuần.' },
          { heading: '2. Phân tích chiến lược', content: 'Cuộc đua lượng tử bước vào giai đoạn "quốc gia hóa" khi Mỹ, Nhật, TQ đều công bố tăng ngân sách Q1/2026.\n\nViệt Nam chưa có chiến lược lượng tử quốc gia rõ ràng — đây là khoảng trống cần lấp trong Nghị quyết 57 giai đoạn 2.0.' },
          { heading: '3. Khuyến nghị hành động', content: '1. Bộ KHCN: Khởi động đề án xây dựng Chiến lược lượng tử quốc gia VN 2030\n2. Bộ GD&ĐT: Mở chương trình học bổng quantum computing tại Nhật/Hàn\n3. Tham gia sáng kiến PQC Migration của NIST' },
        ],
      };
      setReports(prev => [newReport, ...prev]);
      setSelected(newReport);
      setIsGenerating(false);
      setEditMode(false);
    }, 2800);
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Page header */}
      <div style={{ padding: '10px 16px', background: 'var(--surface)', borderBottom: '1px solid var(--border)', flexShrink: 0, display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
        <h1 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', margin: 0 }}>Quản lý Báo cáo KH&CN</h1>
        <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>AI-generated weekly reports</span>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <button onClick={handleGenerate} disabled={isGenerating} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 6, border: 'none', background: 'var(--brand)', color: '#e0eaff', fontSize: 11, fontWeight: 600, cursor: isGenerating ? 'not-allowed' : 'pointer', opacity: isGenerating ? 0.7 : 1 }}>
            {isGenerating ? <><Loader2 size={12} style={{ animation: 'spin 1s linear infinite' }} />Đang tạo...</> : <><Bot size={12} />Tạo báo cáo AI</>}
          </button>
        </div>
      </div>

      {/* Generating overlay */}
      {isGenerating && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(7,7,8,0.85)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
          <Loader2 size={40} color="#3b82f6" style={{ animation: 'spin 1s linear infinite' }} />
          <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text)' }}>AI đang phân tích dữ liệu...</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Đang tổng hợp từ 2,341 nguồn trên 47 kênh</div>
          <div style={{ display: 'flex', gap: 20, marginTop: 8 }}>
            {['Thu thập dữ liệu', 'Phân loại tín hiệu', 'Phân tích xu hướng', 'Tạo bản nháp'].map((step, i) => (
              <div key={step} style={{ fontSize: 11, color: i < 2 ? '#22d3a0' : i === 2 ? '#f59e0b' : 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <span>{i < 2 ? '✓' : i === 2 ? '⟳' : '○'}</span> {step}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="reports-layout">
        {/* Left: Report list */}
        <div className="reports-sidebar">
          <div style={{ padding: '9px 12px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <FileText size={13} color="#3b82f6" />
            <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text)' }}>Báo cáo tuần ({reports.length})</span>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: 8 }}>
            {reports.map(r => {
              const sc = statusConfig[r.status];
              const active = selected?.id === r.id;
              return (
                <div key={r.id} onClick={() => { setSelected(r); setEditMode(false); }} style={{ padding: '10px 11px', borderRadius: 6, border: `1px solid ${active ? 'rgba(30,64,121,0.5)' : 'var(--border)'}`, background: active ? 'var(--brand-dim)' : 'transparent', marginBottom: 5, cursor: 'pointer', transition: 'all 0.15s' }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text)', marginBottom: 4, lineHeight: 1.4 }}>{r.title}</div>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 4 }}>
                    <Calendar size={9} color="var(--text-muted)" />
                    <span style={{ fontSize: 9, color: 'var(--text-muted)' }}>{r.dateRange}</span>
                    <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 3, fontSize: 8, fontWeight: 700, padding: '1px 5px', borderRadius: 999, background: sc.bg, color: sc.color }}>
                      {sc.icon}{sc.label}
                    </span>
                  </div>
                  <div style={{ fontSize: 9, color: 'var(--text-muted)', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{r.summary}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Center: Content */}
        <div className="reports-main-content">
          {selected ? (
            <>
              {/* Toolbar */}
              <div style={{ padding: '7px 12px', borderBottom: '1px solid var(--border)', background: 'var(--surface)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <button onClick={() => setEditMode(false)} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 10px', borderRadius: 5, border: `1px solid ${!editMode ? 'rgba(59,130,246,0.5)' : 'var(--border)'}`, background: !editMode ? 'rgba(59,130,246,0.12)' : 'transparent', color: !editMode ? '#3b82f6' : 'var(--text-muted)', fontSize: 11, cursor: 'pointer' }}>
                  <Eye size={11} />Xem trước
                </button>
                <button onClick={() => setEditMode(true)} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 10px', borderRadius: 5, border: `1px solid ${editMode ? 'rgba(59,130,246,0.5)' : 'var(--border)'}`, background: editMode ? 'rgba(59,130,246,0.12)' : 'transparent', color: editMode ? '#3b82f6' : 'var(--text-muted)', fontSize: 11, cursor: 'pointer' }}>
                  <Edit3 size={11} />Chỉnh sửa
                </button>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: 5 }}>
                  <button style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '5px 10px', borderRadius: 5, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-muted)', fontSize: 11, cursor: 'pointer' }}>
                    <Save size={10} />Lưu CSDL
                  </button>
                  <button style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '5px 10px', borderRadius: 5, border: '1px solid rgba(34,211,160,0.4)', background: 'rgba(34,211,160,0.1)', color: '#22d3a0', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>
                    <CheckCircle size={10} />Phê duyệt
                  </button>
                </div>
              </div>

              {/* Editor toolbar */}
              {editMode && (
                <div style={{ padding: '4px 12px', borderBottom: '1px solid var(--border)', background: 'rgba(255,255,255,0.01)', display: 'flex', gap: 3, alignItems: 'center', flexWrap: 'wrap' }}>
                  {[
                    { icon: <Undo2 size={12} />, cmd: 'undo', title: 'Hoàn tác' },
                    { icon: <Redo2 size={12} />, cmd: 'redo', title: 'Làm lại' },
                    null,
                    { icon: <Bold size={12} />, cmd: 'bold', title: 'Đậm (Ctrl+B)' },
                    { icon: <Italic size={12} />, cmd: 'italic', title: 'Nghiêng' },
                    null,
                    { icon: <span style={{ fontSize: 11, fontWeight: 700 }}>H1</span>, cmd: 'formatBlock', val: 'h1', title: 'Tiêu đề 1' },
                    { icon: <span style={{ fontSize: 10, fontWeight: 700 }}>H2</span>, cmd: 'formatBlock', val: 'h2', title: 'Tiêu đề 2' },
                    null,
                    { icon: <List size={12} />, cmd: 'insertUnorderedList', title: 'Danh sách' },
                    { icon: <Quote size={12} />, cmd: 'formatBlock', val: 'blockquote', title: 'Trích dẫn' },
                  ].map((t, i) => t === null ? (
                    <div key={i} style={{ width: 1, height: 16, background: 'var(--border)', margin: '0 2px' }} />
                  ) : (
                    <button key={i} title={t.title} onClick={() => execCommand(t.cmd, t.val)} style={{ padding: '4px 7px', borderRadius: 4, border: '1px solid transparent', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: 26 }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'var(--surface-hover)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'transparent'; }}
                    >
                      {t.icon}
                    </button>
                  ))}
                </div>
              )}

              {/* Content */}
              <div className="reports-editor-layout">
                <div className="reports-editor-pane">
                  {editMode ? (
                    <div ref={editorRef} contentEditable suppressContentEditableWarning spellCheck={false}
                      style={{ outline: 'none', minHeight: '100%', fontSize: 13, lineHeight: 1.8, color: 'var(--text-secondary)' }} />
                  ) : (
                    <div>
                      <div style={{ marginBottom: 16, paddingBottom: 14, borderBottom: '1px solid var(--border)' }}>
                        <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>{selected.title}</h2>
                        <div style={{ display: 'flex', gap: 16, alignItems: 'center', fontSize: 11, color: 'var(--text-muted)' }}>
                          <span><Calendar size={11} style={{ verticalAlign: 'middle' }} /> {selected.dateRange}</span>
                          <span><Clock size={11} style={{ verticalAlign: 'middle' }} /> {selected.createdAt}</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 9, fontWeight: 700, padding: '2px 8px', borderRadius: 999, background: statusConfig[selected.status].bg, color: statusConfig[selected.status].color }}>
                            {statusConfig[selected.status].label}
                          </span>
                        </div>
                      </div>
                      <div style={{ padding: '12px 16px', borderRadius: 8, background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: 16 }}>
                        <span style={{ fontWeight: 700, color: '#f59e0b' }}>⚡ TÓM TẮT:</span>
                        <span style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.7 }}> {selected.summary}</span>
                      </div>
                      {selected.sections.length > 0 ? selected.sections.map((sec, i) => (
                        <div key={i} style={{ marginBottom: 20 }}>
                          <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 10, paddingBottom: 6, borderBottom: '1px solid var(--border-subtle)' }}>{sec.heading}</h3>
                          {renderContent(sec.content)}
                        </div>
                      )) : (
                        <div style={{ textAlign: 'center', padding: '48px', color: 'var(--text-muted)' }}>
                          <Bot size={48} style={{ opacity: 0.2, marginBottom: 12 }} />
                          <div style={{ fontSize: 13 }}>Báo cáo đang được AI tổng hợp...</div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* AI Chat Drawer Overlay (Backdrop) */}
                <div 
                  style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(0,0,0,0.5)',
                    zIndex: 40,
                    opacity: drawerOpen ? 1 : 0,
                    pointerEvents: drawerOpen ? 'auto' : 'none',
                    transition: 'opacity 0.4s ease'
                  }}
                  onClick={() => setDrawerOpen(false)}
                />

                {/* AI Chat drawer */}
                <div 
                  className="reports-ai-drawer"
                  style={{
                    transform: drawerOpen ? 'translateX(0)' : 'translateX(100%)',
                    opacity: drawerOpen ? 1 : 0,
                    pointerEvents: drawerOpen ? 'auto' : 'none',
                  }}
                >
                  <div style={{ padding: '10px 12px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                    <Bot size={14} color="#a855f7" />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)' }}>Chuyên viên AI Analyst</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 8, color: 'var(--text-muted)' }}>
                        <div className="pulse-dot" style={{ width: 4, height: 4 }} />
                        <span style={{ color: '#22d3a0' }}>Online</span>
                        <span>· 3 agents · 47 nguồn · 12,847 nodes</span>
                      </div>
                    </div>
                    <button onClick={() => setDrawerOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 4 }}><X size={13} /></button>
                  </div>
                  <div style={{ flex: 1, overflow: 'hidden' }}>
                    <AIAnalyst showHeader={false} compact={true} />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 10, color: 'var(--text-muted)' }}>
              <Bot size={48} style={{ opacity: 0.2 }} />
              <div style={{ fontSize: 13 }}>Chọn báo cáo hoặc nhấn "Tạo báo cáo AI"</div>
            </div>
          )}
        </div>
      </div>

      {/* Floating AI Analyst Button */}
      {!drawerOpen && (
        <button 
          onClick={() => setDrawerOpen(true)} 
          style={{ 
            position: 'fixed', 
            bottom: '24px', 
            right: '24px', 
            zIndex: 50,
            display: 'flex', 
            alignItems: 'center', 
            gap: 10, 
            padding: '12px 20px', 
            borderRadius: '50px', 
            border: 'none', 
            background: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)', 
            color: 'white', 
            fontSize: '13px', 
            fontWeight: '600', 
            cursor: 'pointer',
            boxShadow: '0 10px 25px -5px rgba(124, 58, 237, 0.4), 0 8px 10px -6px rgba(124, 58, 237, 0.4)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
            e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(124, 58, 237, 0.5), 0 10px 10px -5px rgba(124, 58, 237, 0.4)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(124, 58, 237, 0.4), 0 8px 10px -6px rgba(124, 58, 237, 0.4)';
          }}
        >
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.2)', 
            borderRadius: '50%', 
            width: 28, 
            height: 28, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}>
            <Bot size={18} />
          </div>
          <span>Chuyên viên AI</span>
        </button>
      )}

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>

  );
}
