import React, { useState, useMemo } from 'react';
import { signalAlerts, techGroups } from '../data/techSignals';
import { Search, Filter, ExternalLink, ChevronDown, X } from 'lucide-react';

// Richer mock feed combining signals with more items
const FEED_ITEMS = [
  ...signalAlerts.map(s => ({
    id: s.id, type: 'signal',
    title: s.title, body: s.impact,
    source: s.source, time: s.time,
    strength: s.strength, severity: s.severity,
    tags: s.tags, confidence: s.confidence,
    techCategory: s.tags[0] || 'Chung',
    nq57Tag: s.tags.includes('Bán dẫn') ? 'Kinh tế số' : s.tags.includes('AI') ? 'R&D / Innovation' : 'Nhân lực & Hạ tầng',
    country: s.source.includes('Nikkei') ? 'Nhật Bản' : s.source.includes('Bloomberg') ? 'Mỹ' : s.source.includes('TechNode') ? 'Trung Quốc' : 'Toàn cầu',
  })),
  { id: 'f1', type: 'analysis', title: 'AI phân tích: Xu hướng đầu tư chip tháng 4/2025', body: 'Dòng vốn FDI vào bán dẫn ASEAN tăng 34% so với cùng kỳ. Việt Nam, Malaysia và Thái Lan là 3 điểm đến hàng đầu.', source: 'NKG AI Digest', time: '30 phút trước', strength: 'strong', severity: 'high', tags: ['FDI', 'Bán dẫn', 'ASEAN'], confidence: 89, techCategory: 'Bán dẫn', nq57Tag: 'Kinh tế số', country: 'Toàn cầu' },
  { id: 'f2', type: 'research', title: 'arXiv: Mô hình ngôn ngữ SeaLLM-v3 đạt SOTA tiếng Việt trên 8/10 benchmark', body: 'Nhóm nghiên cứu SUTD Singapore công bố SeaLLM-v3 vượt GPT-4o trên Vietnamese QA, Legal Reasoning, và Medical Vietnamese.', source: 'arXiv:2504.08113', time: '2 giờ trước', strength: 'weak', severity: 'info', tags: ['NLP', 'Tiếng Việt', 'LLM'], confidence: 72, techCategory: 'AI & Tính toán', nq57Tag: 'R&D / Innovation', country: 'Singapore' },
  { id: 'f3', type: 'policy', title: 'MEXT Nhật tăng gấp đôi ngân sách Quantum Research lên ¥200 tỷ cho FY2026', body: 'Nhật Bản đang đặt cược lớn vào quantum computing như một chiến lược độc lập công nghệ khỏi Mỹ-Trung. Tác động đến cạnh tranh nhân tài khu vực.', source: 'MEXT.go.jp', time: '4 giờ trước', strength: 'medium', severity: 'medium', tags: ['Lượng tử', 'Nhật Bản', 'Ngân sách'], confidence: 94, techCategory: 'Lượng tử', nq57Tag: 'R&D / Innovation', country: 'Nhật Bản' },
  { id: 'f4', type: 'investment', title: 'Sequoia Capital SEA công bố fund $3B tập trung AI + Climate Tech', body: 'Định hướng rõ: 60% vào AI infrastructure, 40% vào climate tech. Việt Nam nằm trong top 3 thị trường mục tiêu theo tuyên bố.', source: 'TechCrunch SEA', time: '5 giờ trước', strength: 'medium', severity: 'high', tags: ['Đầu tư', 'VC', 'AI'], confidence: 88, techCategory: 'AI & Tính toán', nq57Tag: 'Phát triển DN', country: 'Mỹ' },
  { id: 'f5', type: 'research', title: 'CATL công bố cell pin sodium-ion 200Wh/kg — kỷ lục mới thế giới', body: 'Thẳng vào lăng kính NQ57: giảm phụ thuộc vào lithium Úc/Chile, cơ hội cho pin xe điện giá rẻ phổ cập tại VN và thị trường ASEAN.', source: 'TechNode', time: '6 giờ trước', strength: 'strong', severity: 'high', tags: ['Pin', 'Năng lượng', 'Trung Quốc'], confidence: 96, techCategory: 'Vật liệu & Năng lượng', nq57Tag: 'Kinh tế số', country: 'Trung Quốc' },
];

const TECH_CATS = ['Tất cả', 'AI & Tính toán', 'Bán dẫn', 'Lượng tử', 'Vật liệu & Năng lượng', 'AI & Công nghệ'];
const NQ57_TAGS = ['Tất cả', 'Kinh tế số', 'R&D / Innovation', 'Nhân lực & Hạ tầng', 'Phát triển DN'];
const STRENGTHS = ['Tất cả', 'strong', 'medium', 'weak'];
const COUNTRIES = ['Tất cả', 'Mỹ', 'Trung Quốc', 'Nhật Bản', 'Toàn cầu', 'Singapore'];

const typeLabels = { signal: 'Tín hiệu', analysis: 'AI Phân tích', research: 'Nghiên cứu', policy: 'Chính sách', investment: 'Đầu tư' };
const typeColors = { signal: '#f43f5e', analysis: '#22d3a0', research: '#3b82f6', policy: '#f59e0b', investment: '#a855f7' };
const severityColor = { critical: '#f43f5e', high: '#f97316', medium: '#f59e0b', low: '#22d3a0', info: '#3b82f6' };
const strengthLabel = { strong: 'Mạnh', medium: 'Trung', weak: 'Yếu' };

function FilterPill({ options, value, onChange, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <span style={{ fontSize: 10, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{label}:</span>
      <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
        {options.map(o => (
          <button key={o} onClick={() => onChange(o)} style={{
            padding: '3px 8px', borderRadius: 999, fontSize: 10, fontWeight: value === o ? 600 : 400,
            border: `1px solid ${value === o ? 'var(--accent-blue)' : 'var(--border)'}`,
            background: value === o ? 'rgba(59,130,246,0.15)' : 'transparent',
            color: value === o ? '#3b82f6' : 'var(--text-muted)', cursor: 'pointer', whiteSpace: 'nowrap',
          }}>{o === 'Tất cả' ? 'Tất cả' : o}</button>
        ))}
      </div>
    </div>
  );
}

export default function IntelFeed() {
  const [search, setSearch] = useState('');
  const [tech, setTech] = useState('Tất cả');
  const [nq57, setNq57] = useState('Tất cả');
  const [strength, setStrength] = useState('Tất cả');
  const [country, setCountry] = useState('Tất cả');
  const [expanded, setExpanded] = useState(null);

  const filtered = useMemo(() => FEED_ITEMS.filter(item => {
    if (search && !item.title.toLowerCase().includes(search.toLowerCase()) && !item.body.toLowerCase().includes(search.toLowerCase())) return false;
    if (tech !== 'Tất cả' && !item.techCategory.includes(tech.split(' ')[0])) return false;
    if (nq57 !== 'Tất cả' && item.nq57Tag !== nq57) return false;
    if (strength !== 'Tất cả' && item.strength !== strength) return false;
    if (country !== 'Tất cả' && item.country !== country) return false;
    return true;
  }), [search, tech, nq57, strength, country]);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Filter header */}
      <div style={{ padding: '12px 16px', background: 'var(--surface)', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <h1 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', margin: 0 }}>Intel Feed</h1>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Tin tức đã AI phân tích & gán nhãn</span>
          <span style={{ marginLeft: 'auto', fontSize: 10, fontWeight: 600, color: 'var(--accent-green)', background: 'var(--accent-green-dim)', padding: '2px 8px', borderRadius: 999 }}>{filtered.length} kết quả</span>
        </div>

        {/* Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--surface-hover)', border: '1px solid var(--border)', borderRadius: 6, padding: '6px 10px', marginBottom: 10 }}>
          <Search size={13} color="var(--text-muted)" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm kiếm trong feed..." style={{ background: 'transparent', border: 'none', flex: 1, color: 'var(--text)', fontSize: 12, padding: 0 }} />
          {search && <X size={12} color="var(--text-muted)" onClick={() => setSearch('')} style={{ cursor: 'pointer' }} />}
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <FilterPill label="Ngành CN" options={['Tất cả', 'AI & Tính toán', 'Bán dẫn', 'Lượng tử', 'Vật liệu & Năng lượng']} value={tech} onChange={setTech} />
          <FilterPill label="NQ57" options={NQ57_TAGS} value={nq57} onChange={setNq57} />
          <FilterPill label="Tín hiệu" options={STRENGTHS} value={strength} onChange={setStrength} />
          <FilterPill label="Quốc gia" options={COUNTRIES} value={country} onChange={setCountry} />
        </div>
      </div>

      {/* Feed */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px' }}>
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>🔍</div>
            <div style={{ fontSize: 13 }}>Không tìm thấy kết quả phù hợp</div>
          </div>
        )}
        {filtered.map(item => {
          const isExpanded = expanded === item.id;
          const sColor = severityColor[item.severity] || '#888';
          const tColor = typeColors[item.type] || '#888';
          return (
            <div key={item.id} onClick={() => setExpanded(isExpanded ? null : item.id)} className="card-hover" style={{
              background: 'var(--surface)', border: `1px solid var(--border)`,
              borderLeft: `3px solid ${sColor}`, borderRadius: 8, padding: '12px 14px',
              marginBottom: 8, cursor: 'pointer',
            }}>
              {/* Top row */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 7 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: 5, marginBottom: 5, flexWrap: 'wrap', alignItems: 'center' }}>
                    <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 999, background: tColor + '18', color: tColor }}>{typeLabels[item.type] || item.type}</span>
                    <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 999, background: sColor + '18', color: sColor }}>{item.strength ? `● ${strengthLabel[item.strength]}` : ''}</span>
                    <span style={{ fontSize: 9, padding: '2px 7px', borderRadius: 999, background: 'rgba(30,64,121,0.2)', color: '#93bbff', border: '1px solid rgba(30,64,121,0.3)' }}>NQ57: {item.nq57Tag}</span>
                    <span style={{ fontSize: 9, color: 'var(--text-muted)', marginLeft: 'auto' }}>{item.country}</span>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', lineHeight: 1.4 }}>{item.title}</div>
                </div>
                <ChevronDown size={14} color="var(--text-muted)" style={{ flexShrink: 0, transition: 'transform 0.2s', transform: isExpanded ? 'rotate(180deg)' : 'none', marginTop: 2 }} />
              </div>

              {/* Body always visible (short) */}
              <p style={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0, marginBottom: 8 }}>{item.body}</p>

              {/* Expanded detail */}
              {isExpanded && (
                <div style={{ padding: '10px', borderRadius: 6, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', marginBottom: 8 }}>
                  <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>→ Tác động phân tích</div>
                  <p style={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                    Dựa trên cross-reference {item.source} với dữ liệu lịch sử: sự kiện này có mối tương quan 78% với các đợt điều chỉnh FDI khu vực trong vòng 6 tháng. Đề xuất đọc kèm Daily Brief hôm nay.
                  </p>
                </div>
              )}

              {/* Footer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                  {item.tags.map(t => <span key={t} style={{ fontSize: 9, padding: '1px 6px', borderRadius: 4, background: 'rgba(255,255,255,0.04)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>{t}</span>)}
                </div>
                <div style={{ display: 'flex', gap: 10, fontSize: 10, color: 'var(--text-muted)', flexShrink: 0 }}>
                  <span>{item.source}</span><span>{item.time}</span>
                  <span style={{ fontSize: 9, padding: '1px 5px', borderRadius: 4, background: 'rgba(34,211,160,0.1)', color: '#22d3a0' }}>✓ {item.confidence}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
