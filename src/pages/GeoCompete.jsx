import React, { useState } from 'react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, PieChart, Pie, Legend } from 'recharts';
import { countryProfiles, belferWeights, aspiTMR, supplyChainRisks } from '../data/geoProfiles';

export default function GeoCompete() {
  const [selectedCountry, setSelectedCountry] = useState(countryProfiles[0]);

  const radarData = ['Bán dẫn', 'AI', 'Sinh học', 'Không gian', 'Lượng tử'].map((s, i) => {
    const keys = ['semi', 'ai', 'bio', 'space', 'quantum'];
    const obj = { subject: s };
    countryProfiles.forEach(c => { obj[c.country] = c[keys[i]]; });
    return obj;
  });

  const riskColors = { critical: '#f43f5e', high: '#f59e0b', medium: '#3b82f6', low: '#22d3a0' };

  return (
    <div style={{ height: '100%', overflow: 'auto', padding: 16 }}>
      <div style={{ marginBottom: 16 }}>
        <h1 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 2 }}>Hồ sơ Cạnh tranh Địa chính trị</h1>
        <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>Phân tích dựa trên Belfer CET Index & ASPI Critical Technology Tracker · Phần 3</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
        {/* Belfer Weights */}
        <div className="panel">
          <div className="panel-header">
            <span className="panel-title">⚖️ Trọng số Belfer CET Index</span>
          </div>
          <div className="panel-body">
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <ResponsiveContainer width={180} height={180}>
                <PieChart>
                  <Pie data={belferWeights} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="weight" nameKey="tech">
                    {belferWeights.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: '#131316', border: '1px solid #252528', borderRadius: 6, fontSize: 10 }} formatter={(v, n) => [`${v}%`, n]} />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ flex: 1 }}>
                {belferWeights.map(w => (
                  <div key={w.tech} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <div style={{ width: 10, height: 10, borderRadius: 2, background: w.color, flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                        <span style={{ fontSize: 11, color: 'var(--text)' }}>{w.icon} {w.tech}</span>
                        <span style={{ fontSize: 11, fontWeight: 700, color: w.color, fontFamily: 'monospace' }}>{w.weight}%</span>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${w.weight}%`, background: w.color }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ marginTop: 12, padding: '10px', background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)', borderRadius: 6 }}>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                <strong style={{ color: '#3b82f6' }}>Nguyên tắc Belfer:</strong> Đánh giá dựa trên rủi ro chuỗi cung ứng, tiềm năng lưỡng dụng và lợi thế hệ thống. Bán dẫn chiếm tỷ trọng lớn nhất vì là nền tảng của mọi công nghệ khác.
              </div>
            </div>
          </div>
        </div>

        {/* Country radar */}
        <div className="panel">
          <div className="panel-header">
            <span className="panel-title">🌐 So sánh Vị thế Cạnh tranh</span>
            <span className="badge badge-brand">6 Nền kinh tế</span>
          </div>
          <div className="panel-body">
            <ResponsiveContainer width="100%" height={260}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#2a2a2a" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9, fill: '#71717a' }} />
                {countryProfiles.map(c => (
                  <Radar key={c.country} name={`${c.flag} ${c.country}`} dataKey={c.country}
                    stroke={c.color} fill={c.color} fillOpacity={c.isVietnam ? 0.3 : 0.05}
                    strokeWidth={c.isVietnam ? 2.5 : 1.5}
                  />
                ))}
                <Legend wrapperStyle={{ fontSize: 9, color: '#888' }} />
                <Tooltip contentStyle={{ background: '#131316', border: '1px solid #252528', borderRadius: 6, fontSize: 10 }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Country cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8, marginBottom: 12 }}>
        {countryProfiles.map(c => (
          <div key={c.country} onClick={() => setSelectedCountry(c)} className="card-hover" style={{
            background: selectedCountry.country === c.country ? `${c.color}18` : 'var(--surface)',
            border: `1px solid ${selectedCountry.country === c.country ? c.color + '44' : 'var(--border)'}`,
            borderRadius: 8, padding: '12px 10px', cursor: 'pointer', textAlign: 'center',
          }}>
            <div style={{ fontSize: 20, marginBottom: 4 }}>{c.flag}</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>{c.country}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: c.color, fontFamily: 'monospace' }}>{c.score}</div>
            <div style={{ fontSize: 9, color: 'var(--text-muted)' }}>điểm CET</div>
            <div style={{ fontSize: 9, color: 'var(--text-muted)', marginTop: 4 }}>Hạng #{c.rank}</div>
          </div>
        ))}
      </div>

      {/* Country detail + ASPI */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div className="panel">
          <div className="panel-header">
            <span className="panel-title">{selectedCountry.flag} Chi tiết: {selectedCountry.country}</span>
            <div style={{ display: 'flex', gap: 4 }}>
              <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 999, background: `${riskColors[selectedCountry.tmr]}22`, color: riskColors[selectedCountry.tmr] }}>TMR: {selectedCountry.tmr.toUpperCase()}</span>
            </div>
          </div>
          <div className="panel-body">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 14 }}>
              {[
                { label: 'Bán dẫn', value: selectedCountry.semi, color: '#f43f5e' },
                { label: 'AI', value: selectedCountry.ai, color: '#3b82f6' },
                { label: 'Y sinh', value: selectedCountry.bio, color: '#22d3a0' },
                { label: 'Không gian', value: selectedCountry.space, color: '#f59e0b' },
                { label: 'Lượng tử', value: selectedCountry.quantum, color: '#a855f7' },
                { label: 'Tổng CET', value: selectedCountry.score, color: selectedCountry.color },
              ].map(s => (
                <div key={s.label} style={{ textAlign: 'center', padding: '8px', background: 'rgba(255,255,255,0.02)', borderRadius: 6, border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: s.color, fontFamily: 'monospace' }}>{s.value}</div>
                  <div style={{ fontSize: 9, color: 'var(--text-muted)' }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: '#22d3a0', marginBottom: 6 }}>✅ Điểm mạnh</div>
              {selectedCountry.strengths.map(s => (
                <div key={s} style={{ fontSize: 11, color: 'var(--text-secondary)', padding: '3px 0', borderBottom: '1px solid var(--border-subtle)' }}>▸ {s}</div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 600, color: '#f43f5e', marginBottom: 6 }}>⚠️ Rủi ro</div>
              {selectedCountry.threats.map(t => (
                <div key={t} style={{ fontSize: 11, color: 'var(--text-secondary)', padding: '3px 0', borderBottom: '1px solid var(--border-subtle)' }}>▸ {t}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Supply Chain Risk */}
        <div className="panel">
          <div className="panel-header">
            <span className="panel-title">⛓️ Rủi ro Chuỗi Cung ứng Công nghệ với Việt Nam</span>
          </div>
          <div className="panel-body">
            {supplyChainRisks.map((risk, i) => (
              <div key={i} style={{ padding: '10px', borderRadius: 6, background: 'rgba(255,255,255,0.02)', border: `1px solid ${riskColors[risk.risk]}22`, borderLeft: `3px solid ${riskColors[risk.risk]}`, marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text)', flex: 1 }}>{risk.item}</span>
                  <span style={{ fontSize: 9, fontWeight: 700, padding: '1px 6px', borderRadius: 4, background: `${riskColors[risk.risk]}22`, color: riskColors[risk.risk], marginLeft: 8, flexShrink: 0 }}>{risk.risk.toUpperCase()}</span>
                </div>
                <div style={{ fontSize: 10, color: '#f59e0b', marginBottom: 4 }}>Phụ thuộc: {risk.dependency}</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>→ {risk.vnAction}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
