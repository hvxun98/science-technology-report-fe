import React, { useState } from 'react';
import { dailyBriefs, aiAgentActivity } from '../data/dailyBriefs';
import { nghiQuyet57KPIs } from '../data/nghiQuyet57';
import { signalAlerts } from '../data/techSignals';
import GeoMap from './GeoMap';
import { Clock, ArrowRight, ChevronRight } from 'lucide-react';

const URGENCY_COLOR = { critical: '#f43f5e', high: '#f97316', medium: '#3b82f6' };
const SEV_COLOR = { critical: '#f43f5e', high: '#f97316', medium: '#f59e0b', low: '#22d3a0' };

const BRIEF_TABS = [
  { id: 'bluf', num: 1, icon: '🎯', label: 'BLUF', color: '#f43f5e' },
  { id: 'facts', num: 2, icon: '✅', label: 'Sự kiện', color: '#22d3a0' },
  { id: 'analysis', num: 3, icon: '🔍', label: 'Phân tích', color: '#3b82f6' },
  { id: 'vn', num: 4, icon: '🇻🇳', label: 'Ngụ ý VN', color: '#f59e0b' },
  { id: 'recs', num: 5, icon: '💡', label: 'Khuyến nghị', color: '#a855f7' },
];

export default function Today() {
  const [selectedId, setSelectedId] = useState(dailyBriefs[0].id);
  const [activeTab, setActiveTab] = useState('bluf');
  const [mapMode, setMapMode] = useState('radar'); // radar | alignment | action
  const brief = dailyBriefs.find(b => b.id === selectedId);

  return (
    <div style={{ height: '100%', overflow: 'auto', padding: '14px 16px' }}>

      {/* ─── Header row ─── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <div>
          <h1 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', margin: 0 }}>Trọng tâm Tình báo Hàng ngày</h1>
          <p style={{ fontSize: 10, color: 'var(--text-muted)', margin: 0 }}>
            PDB · BLUF · Inverted Pyramid · AI tin cậy&nbsp;
            <strong style={{ color: '#22d3a0' }}>{brief.aiConfidence}%</strong>
          </p>
        </div>
        {/* Date selector */}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 5 }}>
          {dailyBriefs.map(b => {
            const c = URGENCY_COLOR[b.urgency];
            const active = selectedId === b.id;
            return (
              <button key={b.id} onClick={() => setSelectedId(b.id)} style={{
                padding: '4px 11px', borderRadius: 5, fontSize: 11,
                fontWeight: active ? 700 : 400,
                border: `1px solid ${active ? c + '66' : 'var(--border)'}`,
                background: active ? c + '18' : 'transparent',
                color: active ? c : 'var(--text-muted)', cursor: 'pointer',
              }}>
                {new Date(b.date + 'T00:00:00').toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })}
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── Dashboard screens + Map ─── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>

        {/* Massive Top Map */}
        <div style={{ width: '100%', height: 520, background: 'var(--surface)', border: `1px solid var(--border)`, borderTop: mapMode === 'radar' ? '3px solid #f43f5e' : mapMode === 'alignment' ? '3px solid #3b82f6' : '3px solid #a855f7', borderRadius: 10, overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'border-top 0.3s' }}>
          <div style={{ padding: '8px 14px', borderBottom: `1px solid rgba(255,255,255,0.05)`, background: `rgba(255,255,255,0.02)`, flexShrink: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: mapMode === 'radar' ? '#f43f5e' : mapMode === 'alignment' ? '#3b82f6' : '#a855f7' }} />
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text)', letterSpacing: '0.03em', textTransform: 'uppercase' }}>
              {mapMode === 'radar' ? 'Bản đồ Radar Cảnh báo' : mapMode === 'alignment' ? 'Bản đồ Thước đo NQ57' : 'Bản đồ Khuyến nghị Action'}
            </div>
            <div style={{ fontSize: 9, color: 'var(--text-muted)' }}>{mapMode === 'radar' ? 'Tín hiệu phát hiện & Rủi ro' : mapMode === 'alignment' ? 'So sánh với khu vực' : 'Mô hình thể chế tương quan'}</div>
          </div>
          <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
              <GeoMap isWidget mode={mapMode} />
            </div>
          </div>
        </div>

        {/* 3 Clickable Screen Panels below */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>

          {/* 1 · Radar Screen */}
          <div onClick={() => setMapMode('radar')} style={{ cursor: 'pointer', transition: 'all 0.2s', transform: mapMode === 'radar' ? 'translateY(-4px)' : 'none', opacity: mapMode === 'radar' ? 1 : 0.5, filter: mapMode === 'radar' ? 'none' : 'grayscale(0.6)' }}>
            <Screen color="#f43f5e" label="🚨 Phân hệ Cảnh báo" sub="Tín hiệu phát hiện & Rủi ro" flex={1}>
              {signalAlerts.filter(s => s.strength !== 'weak').slice(0, 3).map(s => {
                const c = s.severity === 'critical' ? '#f43f5e' : s.severity === 'high' ? '#f97316' : '#f59e0b';
                return (
                  <div key={s.id} style={{ padding: '7px 10px', borderRadius: 6, background: `${c}08`, border: `1px solid ${c}22`, marginBottom: 6 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 3 }}>
                      <span style={{ fontSize: 8, fontWeight: 700, padding: '1px 5px', borderRadius: 999, background: `${c}22`, color: c, textTransform: 'uppercase' }}>{s.severity}</span>
                      <span style={{ fontSize: 8, color: 'var(--text-muted)', marginLeft: 'auto' }}>{s.time}</span>
                    </div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text)', lineHeight: 1.35 }}>{s.title}</div>
                  </div>
                );
              })}
              <LinkRow href="/alerts" color="#f43f5e" label="Tất cả cảnh báo" />
            </Screen>
          </div>

          {/* 2 · Alignment Screen */}
          <div onClick={() => setMapMode('alignment')} style={{ cursor: 'pointer', transition: 'all 0.2s', transform: mapMode === 'alignment' ? 'translateY(-4px)' : 'none', opacity: mapMode === 'alignment' ? 1 : 0.5, filter: mapMode === 'alignment' ? 'none' : 'grayscale(0.6)' }}>
            <Screen color="#3b82f6" label="📊 Phân hệ Thước đo" sub="Tiến độ Nghị quyết 57" flex={1}>
              {nghiQuyet57KPIs.slice(0, 3).map(kpi => {
                const pct = kpi.isRank
                  ? Math.max(0, 100 - (kpi.current - kpi.target2030) * 15)
                  : Math.min(100, (kpi.current / kpi.target2030) * 100);
                const c = pct >= 80 ? '#22d3a0' : pct >= 50 ? '#f59e0b' : '#f43f5e';
                return (
                  <div key={kpi.id} style={{ marginBottom: 6 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                      <span style={{ fontSize: 10, color: 'var(--text-secondary)', fontWeight: 500 }}>{kpi.label}</span>
                      <span style={{ fontSize: 10, fontWeight: 700, color: c, fontFamily: 'monospace' }}>{kpi.current}{kpi.unit}</span>
                    </div>
                    <div style={{ height: 4, background: 'var(--border)', borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{ width: `${pct}%`, height: '100%', background: `linear-gradient(90deg,${c}77,${c})`, borderRadius: 3, transition: 'width 0.8s ease' }} />
                    </div>
                    <div style={{ fontSize: 8, color: 'var(--text-muted)', marginTop: 2, textAlign: 'right' }}>
                      {Math.round(pct)}% → mục tiêu {kpi.target2030}{kpi.unit}
                    </div>
                  </div>
                );
              })}
              <LinkRow href="/tracker" color="#3b82f6" label="VN Tracker đầy đủ" />
            </Screen>
          </div>

          {/* 3 · Action Screen */}
          <div onClick={() => setMapMode('action')} style={{ cursor: 'pointer', transition: 'all 0.2s', transform: mapMode === 'action' ? 'translateY(-4px)' : 'none', opacity: mapMode === 'action' ? 1 : 0.5, filter: mapMode === 'action' ? 'none' : 'grayscale(0.6)' }}>
            <Screen color="#a855f7" label="⚡ Phân hệ Hành động" sub="Khuyến nghị ưu tiên" flex={1}>
              {brief.recommendations.map((rec, i) => {
                const tc = rec.type === 'immediate' ? '#f43f5e' : rec.type === 'policy' ? '#f59e0b' : '#3b82f6';
                return (
                  <div key={i} style={{ display: 'flex', gap: 8, padding: '7px 10px', borderRadius: 6, background: 'rgba(168,85,247,0.05)', border: '1px solid rgba(168,85,247,0.14)', marginBottom: 6 }}>
                    <div style={{ width: 20, height: 20, borderRadius: 5, background: 'rgba(168,85,247,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 10, fontWeight: 800, color: '#a855f7' }}>{i + 1}</div>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text)', lineHeight: 1.35, marginBottom: 3 }}>{rec.action}</div>
                      <div style={{ display: 'flex', gap: 8, fontSize: 9, color: 'var(--text-muted)', alignItems: 'center' }}>
                        <span>👤 {rec.actor}</span>
                        <span><Clock size={8} style={{ verticalAlign: 'middle' }} /> {rec.timeframe}</span>
                        <span style={{ padding: '0 5px', borderRadius: 4, background: `${tc}18`, color: tc, fontWeight: 700, fontSize: 8, textTransform: 'uppercase' }}>{rec.type}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Screen>
          </div>
        </div>
      </div>

      {/* ─── Daily Brief: Tabbed ─── */}


      {/* ─── AI Agents compact row ─── */}
      {/* <div style={{ marginTop: 10, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        {aiAgentActivity.map((ag, i) => (
          <div key={i} style={{ padding: '9px 12px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, display: 'flex', alignItems: 'flex-start', gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', marginTop: 3, flexShrink: 0, background: ag.status === 'active' ? '#22d3a0' : '#f59e0b', boxShadow: ag.status === 'active' ? '0 0 6px #22d3a0' : 'none' }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text)', marginBottom: 2 }}>{ag.agent}</div>
              <div style={{ fontSize: 9, color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ag.task}</div>
              <div style={{ display: 'flex', gap: 8, fontSize: 9, color: 'var(--text-muted)' }}>
                <span style={{ color: '#22d3a0' }}>⚡ {ag.found} tín hiệu</span>
                <span>{ag.lastUpdate}</span>
              </div>
            </div>
          </div>
        ))}
      </div> */}

    </div>
  );
}

/* Reusable sub-components */
function Screen({ color, label, sub, flex, children }) {
  return (
    <div style={{ flex, display: 'flex', flexDirection: 'column', background: 'var(--surface)', border: `1px solid ${color}22`, borderTop: `3px solid ${color}`, borderRadius: 8, overflow: 'hidden' }}>
      <div style={{ padding: '9px 12px', borderBottom: `1px solid ${color}15`, background: `${color}08`, flexShrink: 0 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color, letterSpacing: '0.03em' }}>{label}</div>
        <div style={{ fontSize: 9, color: 'var(--text-muted)', marginTop: 1 }}>{sub}</div>
      </div>
      <div style={{ padding: '9px 10px', flex: 1, display: 'flex', flexDirection: 'column' }}>{children}</div>
    </div>
  );
}

function TabContent({ color, title, subtitle, children }) {
  return (
    <div>
      <div style={{ marginBottom: 12, paddingBottom: 10, borderBottom: '1px solid var(--border)' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{title}</div>
        <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>{subtitle}</div>
      </div>
      {children}
    </div>
  );
}

function LinkRow({ href, color, label }) {
  return (
    <a href={href} style={{ display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'center', fontSize: 10, color, textDecoration: 'none', opacity: 0.8, marginTop: 2 }}>
      {label} <ArrowRight size={10} />
    </a>
  );
}

function NextBtn({ tab, label, color, setActive }) {
  return (
    <button onClick={() => setActive(tab)} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 10, color, background: `${color}12`, border: `1px solid ${color}33`, borderRadius: 6, padding: '5px 12px', cursor: 'pointer', fontWeight: 600 }}>
      {label} <ChevronRight size={11} />
    </button>
  );
}
