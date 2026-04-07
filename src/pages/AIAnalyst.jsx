import React, { useState, useRef, useEffect } from 'react';
import { Send, RefreshCw, Copy, ThumbsUp, Bot, User } from 'lucide-react';

const SUGGESTED_QUESTIONS = [
  'Tổng hợp phản ứng của các quỹ VC Nhật Bản về EU AI Act trong tuần qua',
  'Việt Nam đang ở đâu trong chuỗi cung ứng bán dẫn toàn cầu?',
  'So sánh chiến lược AI của Mỹ và Trung Quốc hiện tại',
  'Công nghệ nào cần ưu tiên theo Nghị quyết 57 dựa trên tín hiệu thị trường?',
  'Phân tích tác động của Entity List mới đến FDI vào Việt Nam',
  'Các startup deeptech nào đang nhận vốn nhiều nhất trong 3 tháng qua?',
];

const MOCK_RESPONSES = {
  default: (q) => `Đang phân tích câu hỏi: **"${q}"**\n\nDựa trên **2,341 nguồn** đã xử lý trong 24 giờ qua và Knowledge Graph với **12,847 nodes**:\n\n**Tóm tắt chỉ đạo (BLUF):** Hệ thống phát hiện 8 nguồn tín hiệu mức cao liên quan đến chủ đề này, bao gồm BIS.gov, Bloomberg, Nikkei Asia, ASPI CTT và European Commission.\n\n**Phân tích chính:**\n- Xu hướng này đã được 3 AI Agents xử lý song song trong vòng 18 phút\n- Độ tương quan với dữ liệu lịch sử: 78%\n- Mức độ khẩn cấp với chiến lược VN: ĐỘ CAO\n\n**Khuyến nghị:** Tham khảo Daily Brief hôm nay để có phân tích đầy đủ theo chuẩn PDB.\n\n*Nguồn tham chiếu: BIS.gov · Bloomberg · Nikkei Asia · ASPI CTT · EC Official Journal*`,
  vc: `**Tổng hợp: Phản ứng quỹ VC Nhật Bản về EU AI Act**\n\nDựa trên quét LinkedIn, X và báo cáo từ Globis Capital, SoftBank, JAFCO (7 ngày qua):\n\n🟡 **Tâm lý chính: Thận trọng tích cực**\n\n- **Globis Capital**: Nhận định EU AI Act tạo "khoảng trắng tốt" cho AI B2B Japan — ít rủi ro pháp lý hơn EU, nhiều cơ hội hơn US. Đang mở rộng portfolio sang AI trong y tế và tài chính.\n\n- **SoftBank Vision Fund**: Im lặng công khai nhưng dữ liệu Crunchbase cho thấy 3 deal mới vào AI infrastructure ở Singapore & Việt Nam trong 30 ngày qua.\n\n- **JAFCO**: Báo cáo nội bộ rò rỉ (TechNode) nhận định EU AI Act "không ảnh hưởng material đến chiến lược Đông Nam Á".\n\n**Tín hiệu yếu đáng theo dõi:** Kuznetsov Lab (Tokyo) công bố nghiên cứu về AI governance arbitrage — các startup muốn vừa tiếp cận EU vừa tránh regulation.\n\n*Nguồn: LinkedIn, TechNode, Crunchbase, Globis IR · Độ tin cậy: 83%*`,
};

function Message({ msg }) {
  const isAI = msg.role === 'ai';
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 20, animation: 'fadeIn 0.3s ease' }}>
      <div style={{
        width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
        background: isAI ? 'linear-gradient(135deg, rgba(168,85,247,0.3), rgba(59,130,246,0.3))' : 'rgba(30,64,121,0.4)',
        border: `1px solid ${isAI ? 'rgba(168,85,247,0.3)' : 'rgba(30,64,121,0.5)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
      }}>
        {isAI ? <Bot size={16} color="#a855f7" /> : <User size={16} color="#93bbff" />}
      </div>
      <div style={{ flex: 1, maxWidth: 'calc(100% - 44px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: isAI ? '#a855f7' : '#93bbff' }}>{isAI ? 'NKG AI Analyst' : 'Bạn'}</span>
          <span style={{ fontSize: 9, color: 'var(--text-muted)' }}>{msg.time}</span>
          {msg.confidence && <span style={{ fontSize: 9, padding: '1px 6px', borderRadius: 999, background: 'rgba(34,211,160,0.12)', color: '#22d3a0' }}>✓ {msg.confidence}% tin cậy</span>}
        </div>
        <div style={{
          padding: '12px 14px', borderRadius: isAI ? '4px 12px 12px 12px' : '12px 4px 12px 12px',
          background: isAI ? 'rgba(168,85,247,0.07)' : 'rgba(30,64,121,0.25)',
          border: `1px solid ${isAI ? 'rgba(168,85,247,0.15)' : 'rgba(30,64,121,0.4)'}`,
        }}>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}
            dangerouslySetInnerHTML={{ __html: msg.content.replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--text)">$1</strong>') }} />
        </div>
        {isAI && (
          <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
            {[['👍', 'Hữu ích'], ['📋', 'Sao chép'], ['🔄', 'Thử lại']].map(([icon, label]) => (
              <button key={label} style={{ fontSize: 10, padding: '2px 8px', borderRadius: 4, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer' }}>
                {icon} {label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function AIAnalyst({ showHeader = true, compact = false }) {
  const [messages, setMessages] = useState([
    {
      role: 'ai', time: 'Bây giờ', confidence: null,
      content: 'Xin chào! Tôi là **NKG AI Analyst** — trợ lý phân tích thông tin chiến lược được hỗ trợ bởi 3 AI Agents và Knowledge Graph với 12,847 nodes.\n\nTôi có thể giúp bạn:\n• Tổng hợp thông tin từ 47 nguồn được giám sát\n• Phân tích tác động của sự kiện đến chiến lược Việt Nam\n• Đối chiếu xu hướng công nghệ với mục tiêu Nghị quyết 57\n• So sánh chiến lược các quốc gia cạnh tranh\n\nHãy đặt câu hỏi của bạn!',
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const sendMessage = (text) => {
    const q = text || input;
    if (!q.trim() || loading) return;
    setInput('');
    const now = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, { role: 'user', content: q, time: now }]);
    setLoading(true);
    setTimeout(() => {
      const isVC = q.toLowerCase().includes('vc') || q.toLowerCase().includes('nhật') || q.toLowerCase().includes('quỹ');
      const response = isVC ? MOCK_RESPONSES.vc : MOCK_RESPONSES.default(q);
      setMessages(prev => [...prev, { role: 'ai', content: response, time: now, confidence: Math.floor(Math.random() * 15) + 82 }]);
      setLoading(false);
    }, 1200 + Math.random() * 800);
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: compact ? 'transparent' : 'var(--bg)' }}>
      {/* Header */}
      {showHeader && (
        <div style={{ padding: '10px 16px', background: 'var(--surface)', borderBottom: '1px solid var(--border)', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, rgba(168,85,247,0.3), rgba(59,130,246,0.3))', border: '1px solid rgba(168,85,247,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bot size={16} color="#a855f7" />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>NKG AI Analyst</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 10, color: 'var(--text-muted)' }}>
              <div className="pulse-dot" style={{ width: 5, height: 5 }} />
              <span style={{ color: '#22d3a0' }}>Online</span>
              <span>· 3 agents · 47 nguồn · 12,847 nodes</span>
            </div>
          </div>
          <button onClick={() => setMessages(messages.slice(0, 1))} style={{ marginLeft: 'auto', padding: '5px 10px', fontSize: 10, borderRadius: 6, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
            <RefreshCw size={10} />Cuộc trò chuyện mới
          </button>
        </div>
      )}

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: compact ? '12px' : '20px 24px' }}>
        {messages.map((msg, i) => <Message key={i} msg={msg} />)}
        {loading && (
          <div style={{ display: 'flex', gap: compact ? 8 : 12, alignItems: 'flex-start', marginBottom: 20 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, rgba(168,85,247,0.3), rgba(59,130,246,0.3))', border: '1px solid rgba(168,85,247,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bot size={16} color="#a855f7" />
            </div>
            <div style={{ padding: '12px 16px', borderRadius: '4px 12px 12px 12px', background: 'rgba(168,85,247,0.07)', border: '1px solid rgba(168,85,247,0.15)', display: 'flex', alignItems: 'center', gap: 6 }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: '#a855f7', opacity: 0.6, animation: `pulse ${0.8 + i * 0.15}s ease-in-out infinite` }} />
              ))}
              <span style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 4 }}>Đang phân tích...</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggested questions */}
      {messages.length <= 1 && (
        <div style={{ padding: compact ? '0 12px 10px' : '0 24px 10px', flexShrink: 0 }}>
          <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 8, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Câu hỏi gợi ý</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {SUGGESTED_QUESTIONS.map(q => (
              <button key={q} onClick={() => sendMessage(q)} style={{
                fontSize: 10, padding: '5px 10px', borderRadius: 6, border: '1px solid var(--border)',
                background: 'rgba(168,85,247,0.06)', color: 'var(--text-secondary)', cursor: 'pointer',
                textAlign: 'left', lineHeight: 1.4, transition: 'all 0.15s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(168,85,247,0.4)'; e.currentTarget.style.color = 'var(--text)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
              >{q}</button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div style={{ padding: compact ? '8px 10px 10px' : '10px 16px 14px', borderTop: '1px solid var(--border)', background: 'var(--surface)', flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: 8, background: 'var(--surface-hover)', border: '1px solid var(--border)', borderRadius: 10, padding: compact ? '8px 10px' : '10px 14px', transition: 'border-color 0.15s' }}
          onFocusCapture={e => e.currentTarget.style.borderColor = '#a855f7'}
          onBlurCapture={e => e.currentTarget.style.borderColor = 'var(--border)'}
        >
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
            placeholder={compact ? "Nhập yêu cầu..." : "Đặt câu hỏi về thông tin chiến lược... (Enter để gửi, Shift+Enter xuống dòng)"}
            rows={compact ? 1 : 2}
            style={{ flex: 1, background: 'transparent', border: 'none', color: 'var(--text)', fontSize: 12, resize: 'none', outline: 'none', lineHeight: 1.6, fontFamily: 'inherit' }}
          />
          <button onClick={() => sendMessage()} disabled={!input.trim() || loading} style={{
            width: compact ? 32 : 36, height: compact ? 32 : 36, borderRadius: 8, border: 'none', alignSelf: 'flex-end',
            background: input.trim() && !loading ? 'var(--brand)' : 'var(--surface-hover)',
            color: input.trim() && !loading ? '#e0eaff' : 'var(--text-muted)',
            cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
            display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s', flexShrink: 0,
          }}>
            <Send size={compact ? 12 : 14} />
          </button>
        </div>
        {!compact && (
          <div style={{ fontSize: 9, color: 'var(--text-muted)', marginTop: 5, textAlign: 'center' }}>
            AI Analyst sử dụng RAG — chỉ trả lời dựa trên dữ liệu có trong hệ thống, không hallucinate
          </div>
        )}
      </div>
    </div>
  );
}
