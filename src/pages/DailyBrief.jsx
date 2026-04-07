import React, { useState } from 'react';
import { dailyBriefs } from '../data/dailyBriefs';
import { AlertTriangle, CheckCircle, BarChart2, Target, Lightbulb, MessageSquare, Send } from 'lucide-react';

const urgencyColor = { critical: '#f43f5e', high: '#f59e0b', medium: '#3b82f6' };
const urgencyLabel = { critical: 'KHẨN CẤP', high: 'CAO', medium: 'TRUNG BÌNH' };
const sectionIcons = [AlertTriangle, CheckCircle, BarChart2, Target, Lightbulb];
const sectionColors = ['#f43f5e', '#22d3a0', '#3b82f6', '#f59e0b', '#a855f7'];
const sectionTitles = ['Tóm tắt Chỉ đạo (BLUF)', 'Dữ liệu & Sự kiện Xác minh', 'Phân tích Chiến lược Sâu', 'Ngụ ý Chiến lược với Việt Nam', 'Khuyến nghị Hành động'];

export default function DailyBrief() {
  const [selectedBriefId, setSelectedBriefId] = useState(dailyBriefs[0].id);
  const [activeSection, setActiveSection] = useState(null);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { role: 'ai', content: 'Xin chào! Tôi là AI Analyst. Bạn có thể hỏi tôi về bất kỳ thông tin nào trong hệ thống — ví dụ: "Tổng hợp phản ứng của các quỹ đầu tư Nhật Bản về dự luật AI mới của Châu Âu tuần qua"', time: 'Bây giờ' }
  ]);

  const brief = dailyBriefs.find(b => b.id === selectedBriefId);
  const color = urgencyColor[brief.urgency];

  const handleSend = () => {
    if (!chatInput.trim()) return;
    const q = chatInput;
    setChatInput('');
    setChatMessages(prev => [...prev, { role: 'user', content: q, time: 'Vừa xong' }]);
    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        role: 'ai',
        content: `Đang phân tích "${q}"...\n\nDựa trên 2,341 nguồn đã xử lý trong 24 giờ qua: Tín hiệu liên quan được phát hiện ở 8 nguồn mức độ cao (BIS.gov, Bloomberg, Nikkei Asia, ASPI CTT, EC Official Journal, Xinhua Tech, TechCrunch, SCMP). \n\nĐộ tin cậy tổng hợp: 91%. Đề xuất đọc kèm: Daily Brief ngày ${new Date().toLocaleDateString('vi-VN')}.`,
        time: 'Vừa xong'
      }]);
    }, 800);
  };

  return (
    <div style={{ height: '100%', overflow: 'auto', padding: 16 }}>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 2 }}>Báo cáo Hàng ngày — Daily Intelligence Brief</h1>
          <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>Chuẩn PDB + Nguyên tắc BLUF · Tháp ngược thông tin · Phần 6</p>
        </div>
        {/* Brief selector */}
        <div style={{ display: 'flex', gap: 6 }}>
          {dailyBriefs.map(b => (
            <button key={b.id} onClick={() => setSelectedBriefId(b.id)} style={{
              padding: '6px 14px', borderRadius: 6, border: `1px solid ${selectedBriefId === b.id ? urgencyColor[b.urgency] + '66' : 'var(--border)'}`,
              background: selectedBriefId === b.id ? urgencyColor[b.urgency] + '18' : 'transparent',
              color: selectedBriefId === b.id ? urgencyColor[b.urgency] : 'var(--text-muted)',
              fontSize: 11, fontWeight: selectedBriefId === b.id ? 600 : 400, cursor: 'pointer'
            }}>
              {new Date(b.date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 12 }}>
        {/* Main brief */}
        <div>
          {/* Brief header */}
          <div style={{ background: 'var(--surface)', border: `1px solid ${color}33`, borderRadius: 8, padding: '16px', marginBottom: 12, borderLeft: `4px solid ${color}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <span style={{ fontSize: 9, fontWeight: 800, padding: '3px 10px', borderRadius: 999, background: `${color}22`, color, letterSpacing: '0.1em' }}>
                {urgencyLabel[brief.urgency]}
              </span>
              <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                {new Date(brief.date).toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              <span style={{ marginLeft: 'auto', fontSize: 9, color: 'var(--text-muted)' }}>
                AI Confidence: <span style={{ color: '#22d3a0', fontWeight: 700 }}>{brief.aiConfidence}%</span>
              </span>
            </div>
            <div style={{ fontSize: 9, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>📌 BLUF — Bottom Line Up Front</div>
            <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)', lineHeight: 1.7 }}>{brief.bluf}</p>
          </div>

          {/* Section navigation */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
            {sectionTitles.map((title, i) => {
              const Icon = sectionIcons[i];
              return (
                <button key={i} onClick={() => setActiveSection(activeSection === i ? null : i)} style={{
                  display: 'flex', alignItems: 'center', gap: 5, padding: '5px 10px', borderRadius: 6,
                  border: `1px solid ${activeSection === i ? sectionColors[i] + '66' : 'var(--border)'}`,
                  background: activeSection === i ? `${sectionColors[i]}18` : 'transparent',
                  color: activeSection === i ? sectionColors[i] : 'var(--text-muted)',
                  fontSize: 10, fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s'
                }}>
                  <Icon size={11} />
                  <span>{i + 1}. {title}</span>
                </button>
              );
            })}
          </div>

          {/* Section: Verified Facts */}
          <div className="panel" style={{ marginBottom: 10 }}>
            <div className="panel-header">
              <span className="panel-title"><CheckCircle size={12} color="#22d3a0" style={{ verticalAlign: 'middle', marginRight: 4 }} />2. Dữ liệu & Sự kiện Xác minh</span>
            </div>
            <div className="panel-body">
              {brief.events.map((ev, i) => (
                <div key={i} style={{ padding: '10px', borderRadius: 6, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', marginBottom: 8 }}>
                  <div style={{ display: 'flex', items: 'flex-start', gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 8, fontWeight: 700, padding: '2px 6px', borderRadius: 4, background: ev.verified ? 'rgba(34,211,160,0.12)' : 'rgba(245,158,11,0.12)', color: ev.verified ? '#22d3a0' : '#f59e0b', flexShrink: 0 }}>{ev.verified ? '✓ VERIFIED' : 'UNVERIFIED'}</span>
                    <span style={{ fontSize: 9, padding: '2px 6px', borderRadius: 4, background: 'rgba(255,255,255,0.04)', color: 'var(--text-muted)' }}>{ev.type.toUpperCase()}</span>
                    <span style={{ fontSize: 9, color: 'var(--text-muted)', marginLeft: 'auto' }}>Xác suất: {ev.confidence}%</span>
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>{ev.title}</div>
                  <div style={{ display: 'flex', gap: 16, fontSize: 9, color: 'var(--text-muted)' }}>
                    <span>📡 {ev.source}</span>
                    <span>⏰ {ev.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Strategic Analysis */}
          <div className="panel" style={{ marginBottom: 10 }}>
            <div className="panel-header">
              <span className="panel-title"><BarChart2 size={12} color="#3b82f6" style={{ verticalAlign: 'middle', marginRight: 4 }} />3. Phân tích Chiến lược Sâu</span>
            </div>
            <div className="panel-body">
              {brief.strategicAnalysis.split('\n\n').map((para, i) => (
                <p key={i} style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 12 }}>{para}</p>
              ))}
            </div>
          </div>

          {/* Section: VN Implications */}
          <div className="panel" style={{ marginBottom: 10 }}>
            <div className="panel-header">
              <span className="panel-title"><Target size={12} color="#f59e0b" style={{ verticalAlign: 'middle', marginRight: 4 }} />4. Ngụ ý Chiến lược với Việt Nam</span>
            </div>
            <div className="panel-body">
              {brief.vnImplications.map((imp, i) => (
                <div key={i} style={{ padding: '10px', borderRadius: 6, background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.15)', marginBottom: 8, borderLeft: `3px solid ${urgencyColor[imp.urgency]}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 10, fontWeight: 600, color: '#f59e0b' }}>🎯 {imp.target}</span>
                    <span style={{ fontSize: 9, padding: '1px 6px', borderRadius: 4, background: `${urgencyColor[imp.urgency]}22`, color: urgencyColor[imp.urgency], fontWeight: 700 }}>{imp.urgency.toUpperCase()}</span>
                  </div>
                  <p style={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{imp.implication}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Recommendations */}
          <div className="panel">
            <div className="panel-header">
              <span className="panel-title"><Lightbulb size={12} color="#a855f7" style={{ verticalAlign: 'middle', marginRight: 4 }} />5. Khuyến nghị Hành động</span>
            </div>
            <div className="panel-body">
              {brief.recommendations.map((rec, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, padding: '12px', borderRadius: 6, background: 'rgba(168,85,247,0.05)', border: '1px solid rgba(168,85,247,0.15)', marginBottom: 8 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 6, background: 'rgba(168,85,247,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 700, color: '#a855f7', fontSize: 12 }}>{i + 1}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>{rec.action}</div>
                    <div style={{ display: 'flex', gap: 10, fontSize: 9, color: 'var(--text-muted)' }}>
                      <span>👤 {rec.actor}</span>
                      <span>⏰ {rec.timeframe}</span>
                      <span style={{ fontSize: 9, padding: '1px 6px', borderRadius: 4, background: 'rgba(168,85,247,0.15)', color: '#a855f7', textTransform: 'uppercase', fontWeight: 600 }}>{rec.type}</span>
                    </div>
                  </div>
                </div>
              ))}
              <div style={{ marginTop: 10, padding: '8px 12px', background: 'rgba(255,255,255,0.02)', borderRadius: 6, border: '1px solid var(--border)' }}>
                <div style={{ fontSize: 9, color: 'var(--text-muted)' }}>📚 Nguồn tham chiếu: {brief.sources.join(' · ')}</div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Chat Analyst */}
        <div className="panel" style={{ display: 'flex', flexDirection: 'column', height: 'fit-content', position: 'sticky', top: 0 }}>
          <div className="panel-header">
            <span className="panel-title"><MessageSquare size={12} style={{ verticalAlign: 'middle', marginRight: 4 }} />AI Analyst Chat</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <div className="pulse-dot" style={{ width: 5, height: 5 }} />
              <span style={{ fontSize: 9, color: '#22d3a0' }}>Online</span>
            </div>
          </div>
          <div style={{ padding: '12px', flex: 1, overflowY: 'auto', maxHeight: 400, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {chatMessages.map((msg, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row', gap: 6, alignItems: 'flex-start' }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: msg.role === 'ai' ? 'rgba(168,85,247,0.2)' : 'rgba(30,64,121,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, flexShrink: 0 }}>
                  {msg.role === 'ai' ? '🤖' : '👤'}
                </div>
                <div style={{ maxWidth: '85%', padding: '8px 10px', borderRadius: 8, background: msg.role === 'ai' ? 'rgba(168,85,247,0.08)' : 'rgba(30,64,121,0.3)', border: `1px solid ${msg.role === 'ai' ? 'rgba(168,85,247,0.15)' : 'rgba(30,64,121,0.4)'}` }}>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{msg.content}</div>
                  <div style={{ fontSize: 8, color: 'var(--text-muted)', marginTop: 4 }}>{msg.time}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding: '10px', borderTop: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', gap: 6 }}>
              <input
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder='Ví dụ: "Tổng hợp phản ứng quỹ VC Nhật về AI Act EU tuần qua"'
                style={{ flex: 1, fontSize: 11, padding: '6px 10px', borderRadius: 6 }}
              />
              <button onClick={handleSend} style={{ padding: '6px 10px', background: 'var(--brand)', border: 'none', borderRadius: 6, cursor: 'pointer', color: '#e0eaff', display: 'flex', alignItems: 'center' }}>
                <Send size={12} />
              </button>
            </div>
            <div style={{ marginTop: 6, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {['FDI chip VN', 'So sánh EU AI Act', 'Cảnh báo chuỗi cung ứng'].map(q => (
                <button key={q} onClick={() => { setChatInput(q); }} style={{ fontSize: 9, padding: '2px 7px', borderRadius: 999, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer' }}>{q}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
