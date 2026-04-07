import React, { useState, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';
import { Layers, Clock, RefreshCw, Maximize2, Globe, X } from 'lucide-react';

// World map topojson (from jsdelivr CDN)
const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

// ─── Map Modes Data ───
const RADAR_EVENTS = [
  { id: 1, lat: 38.9, lon: -77.0, country: 'Mỹ', type: 'policy', severity: 'high', title: 'BIS Entity List +27 bán dẫn TQ', time: '3 giờ trước', desc: 'U.S. Commerce mở rộng hạn chế xuất khẩu chip sang Trung Quốc', postId: 1 },
  { id: 2, lat: 50.8, lon: 4.4, country: 'EU', type: 'policy', severity: 'high', title: 'EU AI Act Tier 4 có hiệu lực', time: '5 giờ trước', desc: 'Áp dụng với high-risk AI systems toàn EU', postId: 3 },
  { id: 3, lat: 39.9, lon: 116.4, country: 'Trung Quốc', type: 'research', severity: 'medium', title: 'CAS: 512-qubit lượng tử demo', time: '6 giờ trước', desc: 'Viện Hàn lâm KH TQ hoàn thành kỷ lục mới về thời gian kết hợp', postId: 13 },
  { id: 4, lat: 37.6, lon: 127.0, country: 'Hàn Quốc', type: 'investment', severity: 'medium', title: 'Samsung HBM4 $3.5B → VN', time: '8 giờ trước', desc: 'Samsung xác nhận FDI vào Thái Nguyên, Việt Nam', postId: 2 },
  { id: 5, lat: 35.7, lon: 139.7, country: 'Nhật Bản', type: 'policy', severity: 'low', title: 'MEXT: Quantum ¥200B budget', time: '10 giờ trước', desc: 'Nhật tăng ngân sách lượng tử gấp đôi FY2026', postId: 4 },
  { id: 6, lat: 21.0, lon: 105.8, country: 'Việt Nam', type: 'investment', severity: 'high', title: 'FDI bán dẫn tăng 34% Q1/2026', time: '12 giờ trước', desc: 'Cơ hội vàng trong 6-12 tháng tới', postId: 10 },
  { id: 7, lat: 37.3, lon: -122.0, country: 'Mỹ (Silicon Valley)', type: 'investment', severity: 'medium', title: 'Sequoia SEA Fund $3B AI', time: '15 giờ trước', desc: '60% vào AI infrastructure, VN top 3 mục tiêu', postId: 6 },
  { id: 8, lat: 1.4, lon: 103.8, country: 'Singapore', type: 'policy', severity: 'low', title: 'MAS AI Governance update', time: '18 giờ trước', desc: 'Singapore cập nhật khung quản trị AI cho FinTech', postId: 14 },
  { id: 9, lat: 55.8, lon: 37.6, country: 'Nga', type: 'risk', severity: 'critical', title: 'Chip smuggling route detected', time: '2 giờ trước', desc: 'ASPI phát hiện tuyến vận chuyển chip né lệnh trừng phạt', postId: 15 },
  { id: 10, lat: 51.5, lon: -0.1, country: 'Anh', type: 'research', severity: 'low', title: 'DeepMind: AlphaFold4 preprint', time: '4 giờ trước', desc: 'Phiên bản mới với protein folding cho đa bào sinh vật', postId: 16 },
];

const ALIGNMENT_DATA = [
  { country: 'Việt Nam', lon: 105.8, lat: 21.0, kpi1: '15%', kpi2: '0.5%', desc: 'Đang tăng trưởng FDI mạnh nhưng R&D còn mỏng', color: '#3b82f6' },
  { country: 'Singapore', lon: 103.8, lat: 1.4, kpi1: '32%', kpi2: '2.4%', desc: 'Dẫn đầu ASEAN về hạ tầng số và R&D Hubs', color: '#22d3a0' },
  { country: 'Trung Quốc', lon: 116.4, lat: 39.9, kpi1: '40%', kpi2: '2.5%', desc: 'Siêu cường kinh tế số, tự chủ công nghệ lõi', color: '#f43f5e' },
  { country: 'Thái Lan', lon: 100.5, lat: 13.8, kpi1: '22%', kpi2: '1.2%', desc: 'Hub sản xuất EV và chuyển đổi số công nghiệp', color: '#f59e0b' },
  { country: 'Ấn Độ', lon: 77.2, lat: 28.6, kpi1: '20%', kpi2: '0.7%', desc: 'Cường quốc phần mềm, đang đẩy mạnh FDI bán dẫn', color: '#a855f7' },
];

const ACTION_ARCS = [
  { fromName: 'Mỹ', toName: 'Việt Nam', from: [-77.0, 38.9], to: [105.8, 21.0], label: 'Đạo luật CHIPS', desc: 'Hành lang thu hút FDI bán dẫn và đào tạo nhân lực' },
  { fromName: 'EU', toName: 'Việt Nam', from: [4.4, 50.8], to: [105.8, 21.0], label: 'Quy định AI Act', desc: 'Chuẩn hóa khung pháp lý AI an toàn và đạo đức' },
  { fromName: 'Singapore', toName: 'Việt Nam', from: [103.8, 1.4], to: [105.8, 21.0], label: 'Regulatory Sandbox', desc: 'Xây dựng Sandbox cho AI, FinTech và xe tự lái' },
];

const LAYER_CONFIG = {
  policy: { color: '#f43f5e', label: 'Chính sách / Pháp lý', icon: '🏛️', radius: 7 },
  investment: { color: '#22d3a0', label: 'Đầu tư & FDI', icon: '💰', radius: 7 },
  research: { color: '#3b82f6', label: 'Nghiên cứu & Phát minh', icon: '🔬', radius: 6 },
  risk: { color: '#f97316', label: 'Rủi ro & Cảnh báo', icon: '⚠️', radius: 8 },
};

const SEV_OPACITY = { critical: 1, high: 0.9, medium: 0.75, low: 0.55 };
const SEV_RING = { critical: true, high: true, medium: false, low: false };
const TIME_FILTERS = ['1h', '6h', '24h', '7d', 'Tất cả'];

function clampTooltipXY(x, y, pad = 16, maxW = 320, maxH = 280) {
  if (typeof window === 'undefined') return { x: x + pad, y: y + pad };
  const nx = Math.min(Math.max(pad, x + 12), window.innerWidth - maxW - pad);
  const ny = Math.min(Math.max(pad, y + 12), window.innerHeight - maxH - pad);
  return { x: nx, y: ny };
}

export default function GeoMap({ isWidget = false, mode = 'radar' }) {
  const navigate = useNavigate();
  const closeTimerRef = useRef(null);
  const [activeLayers, setActiveLayers] = useState(new Set(['policy', 'investment', 'research', 'risk']));
  const [timeFilter, setTimeFilter] = useState('24h');
  const [hoverTip, setHoverTip] = useState(null); // { x, y, radar? | alignment? | action? }
  const [position, setPosition] = useState({ coordinates: [0, 20], zoom: 1.3 });

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const startCloseTimer = () => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      setHoverTip(null);
    }, 300);
  };

  const toggleLayer = (k) => {
    setActiveLayers(prev => {
      const n = new Set(prev);
      n.has(k) ? n.delete(k) : n.add(k);
      return n;
    });
  };

  const filteredRadar = useMemo(() => {
    if (mode !== 'radar') return [];
    const hrMap = { '1h': 1, '6h': 6, '24h': 24, '7d': 168, 'Tất cả': 9999 };
    const hr = hrMap[timeFilter] || 9999;
    return RADAR_EVENTS.filter(e => {
      if (!activeLayers.has(e.type)) return false;
      const h = parseFloat(e.time);
      const inHours = e.time.includes('ngày') ? h * 24 : h;
      return inHours <= hr;
    });
  }, [activeLayers, timeFilter, mode]);

  const counts = Object.fromEntries(
    Object.keys(LAYER_CONFIG).map(k => [k, filteredRadar.filter(e => e.type === k).length])
  );

  const now = new Date().toLocaleDateString('vi-VN', { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  return (
    <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#070b12', borderRadius: isWidget ? 8 : 0 }}>
      {/* ── Top bar ── */}
      {!isWidget && (
        <div style={{ padding: '8px 14px', background: '#0a1020', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.12em', color: '#22d3a0', textTransform: 'uppercase' }}>🌐 Cục diện Toàn cầu</span>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22d3a0', boxShadow: '0 0 8px #22d3a0', animation: 'pulse 2s infinite' }} />
            <span style={{ fontSize: 9, color: '#22d3a0' }}>TRỰC TIẾP</span>
          </div>
          <div style={{ display: 'flex', gap: 3, marginLeft: 14 }}>
            {TIME_FILTERS.map(t => (
              <button key={t} onClick={() => setTimeFilter(t)} style={{ padding: '3px 9px', borderRadius: 4, fontSize: 10, fontWeight: timeFilter === t ? 700 : 400, cursor: 'pointer', background: timeFilter === t ? 'rgba(34,211,160,0.15)' : 'rgba(255,255,255,0.04)', border: `1px solid ${timeFilter === t ? 'rgba(34,211,160,0.4)' : 'rgba(255,255,255,0.08)'}`, color: timeFilter === t ? '#22d3a0' : '#8899aa' }}>{t}</button>
            ))}
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 14, alignItems: 'center' }}>
            <span style={{ fontSize: 10, color: '#8899aa' }}>{filteredRadar.length} sự kiện</span>
            <span style={{ fontSize: 9, color: '#8899aa', fontFamily: 'monospace' }}>{now} GMT+7</span>
            <button style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4, padding: '3px 7px', color: '#8899aa', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontSize: 9 }}><RefreshCw size={10} /> Reset</button>
            <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.1)' }} />
            <button
              onClick={() => navigate('/')}
              style={{ background: 'rgba(244,63,94,0.15)', border: '1px solid rgba(244,63,94,0.2)', padding: '3px 8px', borderRadius: 4, color: '#f43f5e', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontSize: 9, fontWeight: 700 }}
              title="Thoát bản đồ"
            >
              <X size={11} /> THOÁT
            </button>
          </div>
        </div>
      )}

      {isWidget && (
        <>
          <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 10, display: 'flex', gap: 3 }}>
            {/* Widget mini timeframe selector */}
            {mode === 'radar' && ['24h', '7d', 'Tất cả'].map(t => (
              <button key={t} onClick={() => setTimeFilter(t)} style={{ padding: '3px 7px', borderRadius: 4, fontSize: 9, fontWeight: timeFilter === t ? 700 : 400, cursor: 'pointer', background: timeFilter === t ? 'rgba(34,211,160,0.2)' : 'rgba(10,16,32,0.8)', border: `1px solid ${timeFilter === t ? 'rgba(34,211,160,0.6)' : 'rgba(255,255,255,0.1)'}`, color: timeFilter === t ? '#22d3a0' : '#8899aa', backdropFilter: 'blur(4px)' }}>{t}</button>
            ))}
          </div>

          {/* Legend Strip for Widget Mode */}
          <div style={{ position: 'absolute', bottom: 15, left: 15, zIndex: 50, display: 'flex', flexWrap: 'wrap', gap: 12, background: 'rgba(10,16,32,0.85)', padding: '6px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(6px)', maxWidth: 'calc(100% - 70px)' }}>
            {mode === 'radar' && Object.entries(LAYER_CONFIG).map(([k, cfg]) => (
              <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: cfg.color }} />
                <span style={{ fontSize: 9, color: '#aabbcc' }}>{cfg.label}</span>
              </div>
            ))}
          </div>
          {/* Zoom & Maximize controls (Widget Mode) */}
          <div style={{ position: 'absolute', bottom: 15, right: 15, display: 'flex', flexDirection: 'row', gap: 8, zIndex: 999 }}>
            <button
              onClick={() => navigate('/geomap')}
              style={{ width: 32, height: 32, background: 'rgba(10,16,32,0.9)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 6, color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.5)', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(59,130,246,0.3)'; e.currentTarget.style.borderColor = '#3b82f6' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(10,16,32,0.9)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)' }}
              title="Phóng to bản đồ"
            >
              <Maximize2 size={16} />
            </button>
            <button
              onClick={() => setPosition(p => ({ ...p, zoom: Math.min(p.zoom * 1.5, 6) }))}
              style={{ width: 32, height: 32, background: 'rgba(10,16,32,0.9)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 6, color: '#fff', cursor: 'pointer', fontSize: 20, fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.5)', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(34,211,160,0.3)'; e.currentTarget.style.borderColor = '#22d3a0' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(10,16,32,0.9)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)' }}
              title="Phóng to"
            >+</button>
            <button
              onClick={() => setPosition(p => ({ ...p, zoom: Math.max(p.zoom / 1.5, 0.8) }))}
              style={{ width: 32, height: 32, background: 'rgba(10,16,32,0.9)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 6, color: '#fff', cursor: 'pointer', fontSize: 20, fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.5)', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(34,211,160,0.3)'; e.currentTarget.style.borderColor = '#22d3a0' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(10,16,32,0.9)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)' }}
              title="Thu nhỏ"
            >−</button>
          </div>
        </>
      )}

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* ── Left sidebar: Layers (Only for radar or full page map) ── */}
        {!isWidget && mode === 'radar' && (
          <div style={{ width: 186, flexShrink: 0, background: '#0a1020', borderRight: '1px solid rgba(255,255,255,0.07)', padding: '10px 0', overflowY: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0 12px 8px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
              <Layers size={11} color="#8899aa" />
              <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', color: '#8899aa', textTransform: 'uppercase' }}>Phân lớp</span>
              <span style={{ fontSize: 9, color: '#8899aa', marginLeft: 'auto' }}>{Object.values(activeLayers).length}</span>
            </div>
            <div style={{ padding: '8px 0' }}>
              {Object.entries(LAYER_CONFIG).map(([k, cfg]) => {
                const on = activeLayers.has(k);
                return (
                  <div key={k} onClick={() => toggleLayer(k)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', cursor: 'pointer', opacity: on ? 1 : 0.4, transition: 'opacity 0.15s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    <div style={{ width: 13, height: 13, borderRadius: 3, border: `2px solid ${cfg.color}`, background: on ? cfg.color : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {on && <div style={{ width: 5, height: 5, background: '#0a1020', borderRadius: 1 }} />}
                    </div>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: cfg.color, flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 10, color: on ? '#dde8f4' : '#8899aa', fontWeight: on ? 600 : 400, lineHeight: 1.3 }}>{cfg.label}</div>
                      <div style={{ fontSize: 8, color: '#8899aa' }}>{counts[k] || 0} sự kiện</div>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Severity legend */}
            <div style={{ padding: '8px 12px', borderTop: '1px solid rgba(255,255,255,0.07)', marginTop: 4 }}>
              <div style={{ fontSize: 8, fontWeight: 700, color: '#8899aa', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 7 }}>Mức độ</div>
              {['critical', 'high', 'medium', 'low'].map(s => {
                const lbl = { critical: 'Nghiêm trọng', high: 'Cảnh báo', medium: 'Trung bình', low: 'Thấp' }[s];
                return (
                  <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: s === 'critical' ? '#f43f5e' : s === 'high' ? '#f97316' : s === 'medium' ? '#f59e0b' : '#22d3a0', opacity: SEV_OPACITY[s] }} />
                    <span style={{ fontSize: 9, color: '#8899aa', textTransform: 'capitalize' }}>{lbl}</span>
                    {SEV_RING[s] && <div style={{ width: 10, height: 10, borderRadius: '50%', border: '1px solid #f43f5e', opacity: 0.5, marginLeft: 'auto' }} />}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Map ── */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          <ComposableMap
            projection="geoMercator"
            style={{ width: '100%', height: '100%', background: '#070b12' }}
            projectionConfig={{ scale: 140, center: [20, 20] }}
          >
            <ZoomableGroup
              zoom={position.zoom}
              center={position.coordinates}
              onMoveEnd={(pos) => setPosition(pos)}
              minZoom={0.8}
              maxZoom={6}
            >
              {/* Countries */}
              <Geographies geography={GEO_URL}>
                {({ geographies }) =>
                  geographies.map(geo => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      style={{
                        default: { fill: '#0f1925', stroke: '#1e2d42', strokeWidth: 0.4, outline: 'none' },
                        hover: { fill: '#162234', stroke: '#2a3f5a', strokeWidth: 0.5, outline: 'none' },
                        pressed: { fill: '#1a2940', outline: 'none' },
                      }}
                    />
                  ))
                }
              </Geographies>

              {/* ---- Radar Mode Render ---- */}
              {mode === 'radar' && filteredRadar.map(ev => {
                const cfg = LAYER_CONFIG[ev.type];
                const opacity = SEV_OPACITY[ev.severity];
                const pulse = SEV_RING[ev.severity];
                return (
                  <Marker key={ev.id} coordinates={[ev.lon, ev.lat]}>
                    <g
                      style={{ cursor: 'pointer' }}
                      onMouseEnter={(e) => { clearCloseTimer(); setHoverTip({ radar: ev, ...clampTooltipXY(e.clientX, e.clientY) }); }}
                      onMouseMove={(e) => { clearCloseTimer(); setHoverTip(prev => (prev?.radar?.id === ev.id ? { radar: ev, ...clampTooltipXY(e.clientX, e.clientY) } : prev)); }}
                      onMouseLeave={() => startCloseTimer()}
                    >
                      {pulse && <circle r={cfg.radius + 6} fill="none" stroke={cfg.color} strokeWidth={1} opacity={0.35} style={{ animation: 'geoRing 2s ease-out infinite' }} />}
                      <circle r={cfg.radius} fill={cfg.color} fillOpacity={opacity * 0.85} stroke={cfg.color} strokeWidth={1.2} strokeOpacity={opacity} style={{ filter: `drop-shadow(0 0 4px ${cfg.color}99)` }} />
                      <circle r={2.5} fill="rgba(7,11,18,0.9)" />
                      <text x={12} y={3} fill="#8899aa" fontSize={6.5} fontWeight={700} letterSpacing="0.1em" textAnchor="start" alignmentBaseline="middle" style={{ pointerEvents: 'none', textTransform: 'uppercase', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.8))' }}>{ev.country}</text>
                    </g>
                  </Marker>
                );
              })}

              {/* ---- Alignment Benchmarking Mode Render ---- */}
              {mode === 'alignment' && ALIGNMENT_DATA.map((bm, i) => (
                <Marker key={`bm-${i}`} coordinates={[bm.lon, bm.lat]}>
                  <g
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={(e) => setHoverTip({ alignment: bm, ...clampTooltipXY(e.clientX, e.clientY) })}
                    onMouseMove={(e) => setHoverTip(prev => (prev?.alignment?.country === bm.country ? { alignment: bm, ...clampTooltipXY(e.clientX, e.clientY) } : prev))}
                    onMouseLeave={() => setHoverTip(prev => (prev?.alignment?.country === bm.country ? null : prev))}
                  >
                    <circle r={24} fill={bm.color} opacity={0.15} style={{ animation: 'pulse 3s infinite' }} />
                    <circle r={8} fill={bm.color} stroke="#070b12" strokeWidth={1.5} />
                    <text x={14} y={-4} fill="#dde8f4" fontSize={7} fontWeight={700} textAnchor="start" style={{ pointerEvents: 'none' }}>{bm.country.toUpperCase()}</text>
                    <text x={14} y={6} fill={bm.color} fontSize={6.5} fontWeight={600} textAnchor="start" style={{ pointerEvents: 'none' }}>KT Số: {bm.kpi1} | R&D: {bm.kpi2}</text>
                  </g>
                </Marker>
              ))}

              {/* ---- Action Policy Arcs Mode Render ---- */}
              {mode === 'action' && ACTION_ARCS.map((arc, i) => (
                <Marker key={`arc-${i}`} coordinates={arc.to}>
                  <g
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={(e) => setHoverTip({ action: arc, ...clampTooltipXY(e.clientX, e.clientY) })}
                    onMouseMove={(e) => setHoverTip(prev => (prev?.action?.label === arc.label && prev?.action?.fromName === arc.fromName ? { action: arc, ...clampTooltipXY(e.clientX, e.clientY) } : prev))}
                    onMouseLeave={() => setHoverTip(prev => (prev?.action?.label === arc.label && prev?.action?.fromName === arc.fromName ? null : prev))}
                  >
                    <circle cx={arc.from[0] - arc.to[0]} cy={-(arc.from[1] - arc.to[1])} r={6} fill="#a855f7" />
                    <text x={arc.from[0] - arc.to[0] + 10} y={-(arc.from[1] - arc.to[1])} fill="#a855f7" fontSize={6} fontWeight={700} textAnchor="start" style={{ pointerEvents: 'none' }}>{arc.fromName.toUpperCase()}</text>
                    <circle r={6} fill="#22d3a0" />
                    <text x={10} y={3} fill="#22d3a0" fontSize={6} fontWeight={700} textAnchor="start" style={{ pointerEvents: 'none' }}>{arc.toName.toUpperCase()}</text>
                    <line x1={arc.from[0] - arc.to[0]} y1={-(arc.from[1] - arc.to[1])} x2={0} y2={0} stroke="#a855f7" strokeWidth={1} strokeDasharray="3 3" opacity={0.6} />
                    <g transform={`translate(${(arc.from[0] - arc.to[0]) / 2}, ${-(arc.from[1] - arc.to[1]) / 2 - 10})`}>
                      <rect x={-30} y={-8} width={60} height={16} rx={8} fill="#a855f7" opacity={0.2} stroke="#a855f7" strokeWidth={0.5} />
                      <text x={0} y={3} fill="#dde8f4" fontSize={5.5} fontWeight={700} textAnchor="middle" style={{ pointerEvents: 'none' }}>{arc.label}</text>
                    </g>
                  </g>
                </Marker>
              ))}
            </ZoomableGroup>
          </ComposableMap>

          {/* Hover tooltip (theo chuột) */}
          {hoverTip?.radar && (() => {
            const t = hoverTip.radar;
            const col = LAYER_CONFIG[t.type]?.color || '#22d3a0';
            const sevLabel = { critical: 'Nghiêm trọng', high: 'Cảnh báo', medium: 'Trung bình', low: 'Thấp' }[t.severity];
            return (
              <div
                onMouseEnter={clearCloseTimer}
                onMouseLeave={startCloseTimer}
                style={{ position: 'fixed', left: hoverTip.x, top: hoverTip.y, width: 320, maxWidth: 'min(320px, calc(100vw - 24px))', background: '#0e1828', border: `1px solid ${col}44`, borderLeft: `3px solid ${col}`, borderRadius: 8, padding: '10px 14px', zIndex: 10050, boxShadow: '0 8px 32px rgba(0,0,0,0.55)' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: col, flexShrink: 0 }} />
                  <span style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: col }}>{LAYER_CONFIG[t.type]?.label || t.type}</span>
                  <span style={{ fontSize: 8, color: '#8899aa', marginLeft: 'auto' }}>📍 {t.country}</span>
                </div>
                <div
                  onClick={() => t.postId && navigate(`/post/${t.postId}`)}
                  style={{ fontSize: 12, fontWeight: 700, color: '#dde8f4', marginBottom: 6, lineHeight: 1.4, cursor: t.postId ? 'pointer' : 'default', textDecoration: t.postId ? 'underline' : 'none' }}
                >
                  {t.title}
                </div>
                <div style={{ fontSize: 10, color: '#aabbcc', lineHeight: 1.55, marginBottom: 8 }}>{t.desc}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 9, color: '#8899aa', flexWrap: 'wrap' }}>
                  <span><Clock size={8} style={{ verticalAlign: 'middle' }} /> {t.time}</span>
                  <span style={{ padding: '1px 7px', borderRadius: 999, background: `${col}18`, color: col, fontWeight: 700, textTransform: 'uppercase' }}>{sevLabel}</span>
                  {t.postId && <span style={{ marginLeft: 'auto', color: col, fontWeight: 600, fontSize: 10 }}>Xem chi tiết →</span>}
                </div>
              </div>
            );
          })()}

          {/* Zoom controls (Full Page Mode) */}
          {!isWidget && (
            <div style={{ position: 'absolute', bottom: 20, right: 20, display: 'flex', flexDirection: 'column', gap: 8, zIndex: 50 }}>
              <button
                onClick={() => setPosition(p => ({ ...p, zoom: Math.min(p.zoom * 1.5, 6) }))}
                style={{ width: 32, height: 32, background: 'rgba(10,16,32,0.9)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 6, color: '#fff', cursor: 'pointer', fontSize: 20, fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.5)', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(34,211,160,0.3)'; e.currentTarget.style.borderColor = '#22d3a0' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(10,16,32,0.9)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)' }}
                title="Phóng to"
              >+</button>
              <button
                onClick={() => setPosition(p => ({ ...p, zoom: Math.max(p.zoom / 1.5, 0.8) }))}
                style={{ width: 32, height: 32, background: 'rgba(10,16,32,0.9)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 6, color: '#fff', cursor: 'pointer', fontSize: 20, fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.5)', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(34,211,160,0.3)'; e.currentTarget.style.borderColor = '#22d3a0' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(10,16,32,0.9)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)' }}
                title="Thu nhỏ"
              >−</button>
            </div>
          )}

          {/* Legend strip */
            !isWidget && (
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(10,16,32,0.85)', backdropFilter: 'blur(6px)', borderTop: '1px solid rgba(255,255,255,0.07)', padding: '6px 16px', display: 'flex', alignItems: 'center', gap: 18 }}>
                <span style={{ fontSize: 8, fontWeight: 700, color: '#8899aa', textTransform: 'uppercase', letterSpacing: '0.1em' }}>CHÚ GIẢI</span>
                {Object.entries(LAYER_CONFIG).map(([k, cfg]) => (
                  <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 5, opacity: activeLayers.has(k) ? 1 : 0.3 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: cfg.color }} />
                    <span style={{ fontSize: 9, color: '#aabbcc' }}>{cfg.icon} {cfg.label}</span>
                  </div>
                ))}
                <span style={{ marginLeft: 'auto', fontSize: 8, color: '#8899aa' }}>Cuộn để zoom · Kéo để di chuyển · Di chuột lên chấm để xem chi tiết</span>
              </div>
            )}
        </div>
      </div>

      <style>{`
        @keyframes geoRing {
          0%  { r: 13; opacity: 0.6; }
          100% { r: 24; opacity: 0; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
