import React, { useState } from 'react';
import { signalAlerts } from '../data/techSignals';
import { Bell, Check, X, AlertTriangle, Clock } from 'lucide-react';

const EXTRA_ALERTS = [
  { id: 'a1', strength: 'strong', severity: 'critical', title: 'Mỹ áp lệnh kiểm soát xuất khẩu chip HBM sang 10 nước bao gồm VN allies', source: 'BIS Federal Register', time: '15 phút trước', impact: 'Samsung/SK Hynix cần xin giấy phép xuất khẩu bổ sung. Rủi ro delay FDI chip vào VN.', tags: ['Bán dẫn', 'Export Control', 'Khẩn cấp'], confidence: 97 },
  { id: 'a2', strength: 'strong', severity: 'high', title: 'Trung Quốc ban hành quy định kiểm soát xuất khẩu đất hiếm Dysprosium & Terbium', source: 'MOFCOM.gov.cn', time: '1 giờ trước', impact: '80% nguồn cung toàn cầu bị ảnh hưởng. Giá nam châm vĩnh cửu tăng dự kiến 30-40%.', tags: ['Đất hiếm', 'Trung Quốc', 'Chuỗi cung ứng'], confidence: 99 },
];

const ALL_ALERTS = [...EXTRA_ALERTS, ...signalAlerts.filter(s => s.strength !== 'weak')];

const severityConfig = {
  critical: { color: '#f43f5e', bg: 'rgba(244,63,94,0.08)', border: 'rgba(244,63,94,0.25)', label: 'KHẨN CẤP', icon: '🚨' },
  high: { color: '#f97316', bg: 'rgba(249,115,22,0.08)', border: 'rgba(249,115,22,0.2)', label: 'ĐỘ CAO', icon: '⚠️' },
  medium: { color: '#f59e0b', bg: 'rgba(245,158,11,0.06)', border: 'rgba(245,158,11,0.15)', label: 'TRUNG BÌNH', icon: '🔔' },
  low: { color: '#22d3a0', bg: 'rgba(34,211,160,0.06)', border: 'rgba(34,211,160,0.15)', label: 'THẤP', icon: 'ℹ️' },
};

export default function Alerts() {
  const [dismissed, setDismissed] = useState(new Set());
  const [read, setRead] = useState(new Set());
  const [filterSev, setFilterSev] = useState('all');

  const visible = ALL_ALERTS.filter(a => {
    if (dismissed.has(a.id)) return false;
    if (filterSev !== 'all' && a.severity !== filterSev) return false;
    return true;
  });

  const unread = visible.filter(a => !read.has(a.id)).length;

  const markRead = (id, e) => { e.stopPropagation(); setRead(prev => new Set([...prev, id])); };
  const dismiss = (id, e) => { e.stopPropagation(); setDismissed(prev => new Set([...prev, id])); };

  const grouped = {};
  ['critical', 'high', 'medium', 'low', 'info'].forEach(s => {
    const items = visible.filter(a => a.severity === s);
    if (items.length) grouped[s] = items;
  });

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ padding: '12px 16px 10px', background: 'var(--surface)', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <h1 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', margin: 0 }}>Cảnh báo</h1>
          {unread > 0 && <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 999, background: 'var(--accent-red)', color: '#fff' }}>{unread} chưa đọc</span>}
          <button onClick={() => setRead(new Set(ALL_ALERTS.map(a => a.id)))} style={{ marginLeft: 'auto', fontSize: 10, padding: '4px 10px', borderRadius: 6, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <Check size={10} style={{ verticalAlign: 'middle', marginRight: 4 }} />Đọc tất cả
          </button>
        </div>
        {/* Filter */}
        <div style={{ display: 'flex', gap: 5 }}>
          {[['all', 'Tất cả'], ['critical', '🚨 Khẩn cấp'], ['high', '⚠️ Cao'], ['medium', '🔔 Trung']].map(([v, l]) => (
            <button key={v} onClick={() => setFilterSev(v)} style={{
              padding: '3px 10px', borderRadius: 999, fontSize: 10, fontWeight: filterSev === v ? 700 : 400,
              border: `1px solid ${filterSev === v ? '#f43f5e66' : 'var(--border)'}`,
              background: filterSev === v ? 'rgba(244,63,94,0.12)' : 'transparent',
              color: filterSev === v ? '#f43f5e' : 'var(--text-muted)', cursor: 'pointer',
            }}>{l}</button>
          ))}
        </div>
      </div>

      {/* Alert list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px' }}>
        {visible.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
            <Bell size={32} style={{ marginBottom: 10, opacity: 0.3 }} />
            <div style={{ fontSize: 13 }}>Không có cảnh báo nào</div>
          </div>
        )}

        {Object.entries(grouped).map(([sev, alerts]) => {
          const sc = severityConfig[sev] || severityConfig.medium;
          return (
            <div key={sev} style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                <span style={{ fontSize: 11 }}>{sc.icon}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: sc.color, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{sc.label}</span>
                <span style={{ fontSize: 9, color: 'var(--text-muted)', padding: '1px 6px', background: `${sc.color}18`, borderRadius: 999 }}>{alerts.length}</span>
                <div style={{ flex: 1, height: 1, background: `${sc.color}22`, marginLeft: 4 }} />
              </div>

              {alerts.map(alert => {
                const isRead = read.has(alert.id);
                return (
                  <div key={alert.id} style={{
                    background: isRead ? 'rgba(255,255,255,0.01)' : sc.bg,
                    border: `1px solid ${isRead ? 'var(--border)' : sc.border}`,
                    borderLeft: `3px solid ${isRead ? 'var(--border)' : sc.color}`,
                    borderRadius: 8, padding: '12px 14px', marginBottom: 8,
                    opacity: isRead ? 0.6 : 1, transition: 'all 0.2s',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                      {!isRead && <div style={{ width: 7, height: 7, borderRadius: '50%', background: sc.color, marginTop: 4, flexShrink: 0, boxShadow: `0 0 6px ${sc.color}` }} />}
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: isRead ? 400 : 600, color: 'var(--text)', lineHeight: 1.4, marginBottom: 6 }}>{alert.title}</div>
                        <p style={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 8 }}>{alert.impact}</p>
                        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 8 }}>
                          {alert.tags.map(t => <span key={t} style={{ fontSize: 9, padding: '2px 6px', borderRadius: 4, background: 'rgba(255,255,255,0.04)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>{t}</span>)}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ display: 'flex', gap: 10, fontSize: 10, color: 'var(--text-muted)' }}>
                            <span>📡 {alert.source}</span>
                            <span><Clock size={9} style={{ verticalAlign: 'middle' }} /> {alert.time}</span>
                            <span style={{ color: '#22d3a0' }}>✓ {alert.confidence}%</span>
                          </div>
                          <div style={{ display: 'flex', gap: 5 }}>
                            {!isRead && (
                              <button onClick={(e) => markRead(alert.id, e)} style={{ padding: '3px 8px', fontSize: 10, borderRadius: 4, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 3 }}>
                                <Check size={9} />Đã đọc
                              </button>
                            )}
                            <button onClick={(e) => dismiss(alert.id, e)} style={{ padding: '3px 8px', fontSize: 10, borderRadius: 4, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 3 }}>
                              <X size={9} />Bỏ qua
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
