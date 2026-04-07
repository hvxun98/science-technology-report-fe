import React, { useState } from 'react';
import { aiAgentActivity } from '../data/dailyBriefs';
import { Activity, Database, Zap, ArrowRight, Check } from 'lucide-react';

export default function AIArchitecture() {
  const [activeLayer, setActiveLayer] = useState(0);

  const layers = [
    {
      id: 0, name: 'Lớp 1: Ngữ cảnh & Quản trị Dữ liệu',
      subtitle: 'Context & Data Governance Layer',
      color: '#3b82f6', icon: '🗄️',
      description: 'Data lake trung tâm thu thập toàn bộ dữ liệu từ mạng xã hội, báo cáo học thuật và tin tức. LLM thực hiện dịch thuật đa ngôn ngữ (Anh, Trung, Nhật, Hàn → Việt) và trích xuất thực thể.',
      components: [
        { name: 'Data Lake', desc: 'Thu thập từ 47 nguồn theo thời gian thực', status: 'live' },
        { name: 'Multilingual LLM', desc: 'Dịch và chuẩn hóa 4 ngôn ngữ', status: 'live' },
        { name: 'Knowledge Graph', desc: '12,847 node thực thể được dán nhãn', status: 'live' },
        { name: 'RAG Engine', desc: 'Ngăn hallucination — chỉ sinh từ dữ liệu lưu trữ', status: 'live' },
        { name: 'Security Sandbox', desc: 'Dữ liệu nội bộ không rò rỉ ra ngoài', status: 'live' },
      ],
      flow: 'Nguồn → ETL → LLM Translation → Entity Extraction → Knowledge Graph → RAG Index'
    },
    {
      id: 1, name: 'Lớp 2: Suy luận & Đa Tác tử',
      subtitle: 'Reasoning & Multi-Agent Layer',
      color: '#a855f7', icon: '🤖',
      description: 'Nơi phân tích cốt lõi. Các AI Agents hoạt động như lực lượng lao động số chuyên biệt, phối hợp giải quyết các bài toán phân tích phức tạp đòi hỏi nhiều nguồn thông tin.',
      components: [
        { name: 'Tech-Scouting Agent', desc: 'Điều chỉnh từ khóa tự động, cân bằng exploration/exploitation', status: 'live' },
        { name: 'Policy-Analysis Agent', desc: 'Tóm tắt và gap analysis với khung pháp lý VN', status: 'live' },
        { name: 'Risk-Foresight Agent', desc: 'Scenario modeling và cross-impact analysis', status: 'idle' },
        { name: 'Orchestrator', desc: 'Điều phối luồng giữa các agents và ưu tiên task', status: 'live' },
      ],
      flow: 'RAG Index → Agent Dispatch → Parallel Analysis → Cross-Validation → Draft Report'
    },
    {
      id: 2, name: 'Lớp 3: Trải nghiệm & Báo cáo',
      subtitle: 'Experience & Interaction Layer',
      color: '#22d3a0', icon: '📊',
      description: 'Giao diện dành cho chuyên gia phân tích. Cung cấp dashboard thời gian thực, natural language Q&A, và workflow Human-in-the-loop để phê duyệt báo cáo trước khi xuất bản.',
      components: [
        { name: 'Dashboard Engine', desc: 'Inverted pyramid visualization, 5-second rule', status: 'live' },
        { name: 'NLQ Interface', desc: 'Hỏi đáp ngôn ngữ tự nhiên với chuyên gia', status: 'live' },
        { name: 'Human-in-the-loop', desc: 'Phê duyệt và điều chỉnh mức tin cậy', status: 'live' },
        { name: 'Report Publisher', desc: 'Xuất Daily Brief theo chuẩn PDB/BLUF', status: 'live' },
      ],
      flow: 'Draft Report → Expert Review → Confidence Adjustment → HITL Approval → Published Brief'
    }
  ];

  return (
    <div style={{ height: '100%', overflow: 'auto', padding: 16 }}>
      <div style={{ marginBottom: 16 }}>
        <h1 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 2 }}>Kiến trúc Hệ thống Multi-Agentic AI</h1>
        <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>NKG Social Compass — 3 tầng kiến trúc tương tác liên tục · Phần 5</p>
      </div>

      {/* Architecture diagram */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 16 }}>
        {layers.map((layer, i) => (
          <div key={layer.id} onClick={() => setActiveLayer(i)} className="card-hover" style={{
            background: activeLayer === i ? `${layer.color}12` : 'var(--surface)',
            border: `1px solid ${activeLayer === i ? layer.color + '44' : 'var(--border)'}`,
            borderRadius: 8, padding: '16px', cursor: 'pointer', position: 'relative',
          }}>
            {activeLayer === i && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: layer.color, borderRadius: '8px 8px 0 0' }} />}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: `${layer.color}22`, border: `1px solid ${layer.color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
                {layer.icon}
              </div>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: layer.color, letterSpacing: '0.04em' }}>TẦNG {i + 1}</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text)', lineHeight: 1.3 }}>{layer.subtitle}</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {layer.components.map(c => (
                <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 4, height: 4, borderRadius: '50%', background: c.status === 'live' ? '#22d3a0' : '#f59e0b', flexShrink: 0 }} />
                  <span style={{ fontSize: 10, color: 'var(--text-secondary)' }}>{c.name}</span>
                </div>
              ))}
            </div>
            {i < 2 && (
              <div style={{ position: 'absolute', right: -24, top: '50%', transform: 'translateY(-50%)', zIndex: 1 }}>
                <ArrowRight size={16} color="var(--text-muted)" />
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {/* Layer detail */}
        <div className="panel">
          <div className="panel-header">
            <span className="panel-title">{layers[activeLayer].icon} {layers[activeLayer].name}</span>
            <span style={{ fontSize: 9, padding: '2px 8px', borderRadius: 4, background: `${layers[activeLayer].color}22`, color: layers[activeLayer].color, fontWeight: 700 }}>ACTIVE</span>
          </div>
          <div className="panel-body">
            <p style={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 14 }}>{layers[activeLayer].description}</p>
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 9, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Components</div>
              {layers[activeLayer].components.map(c => (
                <div key={c.name} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '8px', borderRadius: 6, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', marginBottom: 6 }}>
                  <div className={c.status === 'live' ? 'pulse-dot' : ''} style={{ marginTop: 3, width: 6, height: 6, borderRadius: '50%', background: c.status === 'live' ? '#22d3a0' : '#f59e0b', flexShrink: 0, boxShadow: c.status === 'live' ? '0 0 6px #22d3a0' : 'none' }} />
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>{c.name}</div>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{c.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ padding: '10px', background: 'rgba(255,255,255,0.02)', borderRadius: 6, border: '1px solid var(--border)' }}>
              <div style={{ fontSize: 9, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Data Flow</div>
              <div style={{ fontSize: 10, color: layers[activeLayer].color, fontFamily: 'JetBrains Mono, monospace', lineHeight: 1.8 }}>{layers[activeLayer].flow}</div>
            </div>
          </div>
        </div>

        {/* Agent status */}
        <div className="panel">
          <div className="panel-header">
            <span className="panel-title">🤖 Trạng thái AI Agents</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <div className="pulse-dot" style={{ width: 5, height: 5 }} />
              <span style={{ fontSize: 9, color: 'var(--accent-green)' }}>2/3 đang hoạt động</span>
            </div>
          </div>
          <div className="panel-body">
            {aiAgentActivity.map((agent, i) => (
              <div key={i} style={{ padding: '14px', borderRadius: 8, background: 'rgba(255,255,255,0.02)', border: `1px solid ${agent.status === 'active' ? 'rgba(168,85,247,0.2)' : 'var(--border)'}`, marginBottom: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <div className={agent.status === 'active' ? 'agent-active' : ''} style={{ width: 32, height: 32, borderRadius: '50%', background: agent.status === 'active' ? 'rgba(168,85,247,0.2)' : 'rgba(255,255,255,0.04)', border: `1px solid ${agent.status === 'active' ? '#a855f7' : 'var(--border)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>
                    {i === 0 ? '🔍' : i === 1 ? '📋' : '⚡'}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)' }}>{agent.agent}</span>
                      <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 999, background: agent.status === 'active' ? 'rgba(34,211,160,0.12)' : 'rgba(245,158,11,0.12)', color: agent.status === 'active' ? '#22d3a0' : '#f59e0b' }}>
                        {agent.status === 'active' ? '● ACTIVE' : '○ IDLE'}
                      </span>
                    </div>
                    <div style={{ fontSize: 9, color: 'var(--text-muted)', marginTop: 2 }}>{agent.lastUpdate}</div>
                  </div>
                </div>
                <div style={{ fontSize: 10, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 8, padding: '6px 8px', background: 'rgba(168,85,247,0.05)', borderRadius: 4, fontStyle: 'italic' }}>"{agent.task}"</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  <div style={{ textAlign: 'center', padding: '6px', background: 'rgba(255,255,255,0.02)', borderRadius: 4 }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: '#3b82f6', fontFamily: 'monospace' }}>{agent.processed.toLocaleString()}</div>
                    <div style={{ fontSize: 9, color: 'var(--text-muted)' }}>Nguồn xử lý</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: '6px', background: 'rgba(255,255,255,0.02)', borderRadius: 4 }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: '#22d3a0', fontFamily: 'monospace' }}>{agent.found}</div>
                    <div style={{ fontSize: 9, color: 'var(--text-muted)' }}>Tín hiệu phát hiện</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RAG Flow Visual */}
      <div className="panel" style={{ marginTop: 12 }}>
        <div className="panel-header">
          <span className="panel-title">🔄 Luồng dữ liệu RAG — Ngăn chặn Hallucination</span>
        </div>
        <div className="panel-body">
          <div style={{ display: 'flex', alignItems: 'center', gap: 0, overflowX: 'auto', padding: '8px 0' }}>
            {[
              { label: '47 Nguồn OSINT', sub: 'Real-time', color: '#3b82f6', icon: '🌐' },
              { label: 'Data Ingestion', sub: 'ETL pipeline', color: '#3b82f6', icon: '→' },
              { label: 'LLM Translation', sub: '4 ngôn ngữ', color: '#6366f1', icon: '🌐' },
              { label: 'Entity Extraction', sub: 'NER + Relations', color: '#8b5cf6', icon: '→' },
              { label: 'Knowledge Graph', sub: '12,847 nodes', color: '#a855f7', icon: '🕸️' },
              { label: 'RAG Vectorstore', sub: 'pgvector', color: '#c026d3', icon: '→' },
              { label: 'Context Retrieval', sub: 'Top-K relevant', color: '#ec4899', icon: '🔍' },
              { label: 'LLM Analysis', sub: 'Grounded only', color: '#f43f5e', icon: '→' },
              { label: 'Expert Review', sub: 'HITL', color: '#f97316', icon: '👤' },
              { label: 'Daily Brief', sub: 'BLUF format', color: '#22d3a0', icon: '📄' },
            ].map((step, i) => {
              const isArrow = step.icon === '→';
              if (isArrow) return <div key={i} style={{ fontSize: 16, color: 'var(--text-muted)', flexShrink: 0, padding: '0 4px' }}>→</div>;
              return (
                <div key={i} style={{ textAlign: 'center', padding: '10px 12px', background: `${step.color}12`, border: `1px solid ${step.color}33`, borderRadius: 8, flexShrink: 0 }}>
                  <div style={{ fontSize: 16, marginBottom: 4 }}>{step.icon}</div>
                  <div style={{ fontSize: 10, fontWeight: 600, color: step.color, whiteSpace: 'nowrap' }}>{step.label}</div>
                  <div style={{ fontSize: 9, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{step.sub}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
