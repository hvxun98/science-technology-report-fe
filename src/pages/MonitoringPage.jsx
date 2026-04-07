import React, { useState, useEffect } from 'react';
import { osintSources } from '../data/osintSources';
import { RefreshCw, Plus, Edit2, Trash2, X, Save, Settings, Layers } from 'lucide-react';


const DEFAULT_CATEGORIES = {
  gov: { label: 'Chính phủ & Quỹ tài trợ', icon: '🏛️', color: '#3b82f6' },
  think_tank: { label: 'Think Tanks', icon: '📚', color: '#a855f7' },
  media: { label: 'Tech Media', icon: '📰', color: '#f59e0b' },
  kol: { label: 'KOLs & Innovators', icon: '👤', color: '#22d3a0' },
};

const EXTRA_SOURCES = [
  { id: 101, category: 'gov', name: 'WHOSTP (X)', url: 'x.com/WHOSTP', region: 'US', status: 'live', lastUpdate: '5 phút', frequency: 'Thời gian thực', signals: 18 },
  { id: 102, category: 'gov', name: '中科院之声 (WeChat)', url: 'weixin.qq.com/cas', region: 'CN', status: 'live', lastUpdate: '20 phút', frequency: '2 giờ', signals: 24 },
  { id: 103, category: 'think_tank', name: 'STEPI Korea', url: 'stepi.re.kr', region: 'KR', status: 'cached', lastUpdate: '6 giờ', frequency: '24 giờ', signals: 6 },
  { id: 104, category: 'think_tank', name: 'ITIF', url: 'itif.org', region: 'US', status: 'live', lastUpdate: '4 giờ', frequency: '12 giờ', signals: 8 },
  { id: 105, category: 'media', name: 'Sifted.eu', url: 'sifted.eu', region: 'EU', status: 'live', lastUpdate: '18 phút', frequency: '1 giờ', signals: 34 },
  { id: 106, category: 'media', name: 'Science & Technology Daily', url: 'stdaily.com', region: 'CN', status: 'live', lastUpdate: '35 phút', frequency: '2 giờ', signals: 41 },
];

export default function MonitoringPage() {
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('nkg_categories');
    return saved ? JSON.parse(saved) : DEFAULT_CATEGORIES;
  });
  
  const [sources, setSources] = useState(() => {
    const saved = localStorage.getItem('nkg_sources');
    return saved ? JSON.parse(saved) : [...osintSources, ...EXTRA_SOURCES];
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCatModalOpen, setIsCatModalOpen] = useState(false);
  const [editingSource, setEditingSource] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ name: '', url: '', category: 'gov', region: '' });
  const [catFormData, setCatFormData] = useState({ key: '', label: '', icon: '📁', color: '#3b82f6' });

  useEffect(() => {
    localStorage.setItem('nkg_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('nkg_sources', JSON.stringify(sources));
  }, [sources]);

  const stats = Object.entries(categories).map(([k, v]) => ({
    label: v.label, icon: v.icon, color: v.color,
    count: sources.filter(s => s.category === k).length,
    live: sources.filter(s => s.category === k && s.status === 'live').length,
    signals: sources.filter(s => s.category === k).reduce((a, b) => a + b.signals, 0),
  }));

  const grouped = Object.entries(categories)
    .sort((a, b) => a[1].label.localeCompare(b[1].label))
    .map(([k, v]) => ({
      key: k, ...v,
      sources: sources.filter(s => s.category === k),
    }));

  const totalSignals = sources.reduce((a, b) => a + b.signals, 0);
  const liveCount = sources.filter(s => s.status === 'live').length;

  const handleOpenAdd = () => {
    setEditingSource(null);
    setFormData({ name: '', url: '', category: Object.keys(categories)[0] || '', region: '' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (src) => {
    setEditingSource(src);
    setFormData({ name: src.name, url: src.url, category: src.category, region: src.region });
    setIsModalOpen(true);
  };

  const handleOpenAddCat = () => {
    setEditingCategory(null);
    setCatFormData({ key: '', label: '', icon: '📁', color: '#3b82f6' });
    setIsCatModalOpen(true);
  };

  const handleOpenEditCat = (key, cat) => {
    setEditingCategory(key);
    setCatFormData({ key, label: cat.label, icon: cat.icon, color: cat.color });
    setIsCatModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa nguồn này không?")) {
      setSources(s => s.filter(x => x.id !== id));
    }
  };

  const handleDeleteCat = (key) => {
    const hasSources = sources.some(s => s.category === key);
    if (hasSources) {
      alert("Không thể xóa nhóm này vì vẫn còn nguồn đang được gắn vào nhóm. Vui lòng chuyển hoặc xóa các nguồn này trước.");
      return;
    }
    if (window.confirm(`Bạn có chắc chắn muốn xóa nhóm "${categories[key].label}" không?`)) {
      const newCats = { ...categories };
      delete newCats[key];
      setCategories(newCats);
    }
  };

  const handleSave = () => {
    if (!formData.name || !formData.url) {
      alert("Vui lòng điền đủ Tên nguồn và URL");
      return;
    }
    if (editingSource) {
      setSources(s => s.map(x => x.id === editingSource.id ? { ...x, ...formData } : x));
    } else {
      const newSource = {
        id: Date.now(),
        ...formData,
        status: 'cached',
        lastUpdate: 'vừa xong',
        frequency: '24 giờ',
        signals: 0
      };
      setSources(s => [newSource, ...s]);
    }
    setIsModalOpen(false);
  };

  const handleSaveCategory = () => {
    if (!catFormData.label) {
      alert("Vui lòng nhập tên nhóm");
      return;
    }
    const key = editingCategory || catFormData.label.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
    if (!editingCategory && categories[key]) {
      alert("Mã nhóm này đã tồn tại, vui lòng chọn tên khác");
      return;
    }
    setCategories(prev => ({
      ...prev,
      [key]: {
        label: catFormData.label,
        icon: catFormData.icon,
        color: catFormData.color
      }
    }));
    setIsCatModalOpen(false);
  };

  return (
    <div style={{ height: '100%', overflow: 'auto', padding: 16, position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div>
          <h1 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', marginBottom: 2 }}>Giám sát Nguồn Chiến lược</h1>
          <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>{sources.length} nguồn đang được quét · {liveCount} đang hoạt động thời gian thực</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={handleOpenAddCat} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 12px', borderRadius: 6, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-secondary)', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>
            <Layers size={12} /> Quản lý Nhóm
          </button>
          <button onClick={handleOpenAdd} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 12px', borderRadius: 6, border: 'none', background: '#3b82f6', color: '#fff', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>
             <Plus size={12} /> Thêm nguồn
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10, marginBottom: 14 }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: 'var(--surface)', border: `1px solid ${s.color}22`, borderRadius: 8, padding: '12px 14px', borderTop: `3px solid ${s.color}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 8 }}>
              <span style={{ fontSize: 16 }}>{s.icon}</span>
              <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--text)' }}>{s.label}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 4, textAlign: 'center' }}>
              <div><div style={{ fontSize: 16, fontWeight: 700, color: s.color, fontFamily: 'monospace' }}>{s.count}</div><div style={{ fontSize: 8, color: 'var(--text-muted)' }}>Nguồn</div></div>
              <div><div style={{ fontSize: 16, fontWeight: 700, color: '#22d3a0', fontFamily: 'monospace' }}>{s.live}</div><div style={{ fontSize: 8, color: 'var(--text-muted)' }}>Live</div></div>
              <div><div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-secondary)', fontFamily: 'monospace' }}>{s.signals}</div><div style={{ fontSize: 8, color: 'var(--text-muted)' }}>Tín hiệu</div></div>
            </div>
          </div>
        ))}
      </div>

      {/* Grouped tables */}
      {grouped.map(group => (
        <div key={group.key} className="panel" style={{ marginBottom: 16 }}>
          <div className="panel-header" style={{ padding: '8px 12px' }}>
            <span className="panel-title">{group.icon} {group.label}</span>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <span style={{ fontSize: 9, color: '#22d3a0', fontWeight: 600 }}>{group.sources.filter(s => s.status === 'live').length} LIVE</span>
              <span style={{ fontSize: 9, color: 'var(--text-muted)' }}>/ {group.sources.length} NGUỒN</span>
              <div style={{ width: 1, height: 12, background: 'var(--border)', margin: '0 4px' }} />
              <button onClick={() => handleOpenEditCat(group.key, group)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 2 }} title="Sửa nhóm"><Edit2 size={10} /></button>
              <button onClick={() => handleDeleteCat(group.key)} style={{ background: 'transparent', border: 'none', color: '#f43f5e', cursor: 'pointer', padding: 2 }} title="Xóa nhóm"><Trash2 size={10} /></button>
            </div>
          </div>
          <div className="panel-body" style={{ padding: 0 }}>
            {group.sources.length > 0 ? (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                    {['Tên nguồn', 'Khu vực', 'URL', 'Trạng thái', 'Cập nhật', 'Tần suất', 'Tín hiệu', 'Thao tác'].map(h => (
                      <th key={h} style={{ fontSize: 9, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', padding: '6px 12px', textAlign: h === 'Thao tác' ? 'right' : 'left', borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {group.sources.map(src => (
                    <tr key={src.id} style={{ borderBottom: '1px solid var(--border-subtle)', background: 'transparent', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                      <td style={{ padding: '8px 12px', fontSize: 11, fontWeight: 600, color: 'var(--text)' }}>{src.name}</td>
                      <td style={{ padding: '8px 12px', fontSize: 10, color: 'var(--text-secondary)' }}>{src.region}</td>
                      <td style={{ padding: '8px 12px', fontSize: 9, color: 'var(--text-muted)', fontFamily: 'monospace' }}>{src.url}</td>
                      <td style={{ padding: '8px 12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                          <div style={{ width: 6, height: 6, borderRadius: '50%', background: src.status === 'live' ? '#22d3a0' : '#f59e0b', boxShadow: src.status === 'live' ? '0 0 5px #22d3a0' : 'none' }} />
                          <span style={{ fontSize: 9, fontWeight: 600, color: src.status === 'live' ? '#22d3a0' : '#f59e0b', textTransform: 'uppercase' }}>{src.status}</span>
                        </div>
                      </td>
                      <td style={{ padding: '8px 12px', fontSize: 10, color: 'var(--text-muted)', fontFamily: 'monospace' }}>{src.lastUpdate}</td>
                      <td style={{ padding: '8px 12px', fontSize: 10, color: 'var(--text-secondary)' }}>{src.frequency}</td>
                      <td style={{ padding: '8px 12px', fontSize: 11, fontWeight: 700, color: group.color, fontFamily: 'monospace' }}>{src.signals}</td>
                      <td style={{ padding: '8px 12px', textAlign: 'right' }}>
                        <button onClick={() => handleOpenEdit(src)} style={{ background: 'transparent', border: 'none', color: '#3b82f6', cursor: 'pointer', padding: 4, marginRight: 4 }} title="Sửa"><Edit2 size={12} /></button>
                        <button onClick={() => handleDelete(src.id)} style={{ background: 'transparent', border: 'none', color: '#f43f5e', cursor: 'pointer', padding: 4 }} title="Xoá"><Trash2 size={12} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: 11 }}>Nhóm này hiện chưa có nguồn nào.</div>
            )}
          </div>
        </div>
      ))}

      {/* Global Stats */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 16px', display: 'flex', gap: 24, alignItems: 'center', marginTop: 8 }}>
        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Tổng cộng:</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{sources.length} nguồn</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#22d3a0' }}>{liveCount} đang live</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#3b82f6' }}>{totalSignals.toLocaleString()} tín hiệu/ngày</span>
      </div>

      {/* Source CRUD Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ background: '#0e1420', border: '1px solid var(--border-light)', borderRadius: 12, width: 420, padding: '20px 24px', boxShadow: '0 16px 40px rgba(0,0,0,0.5)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>{editingSource ? 'Sửa thông tin Nguồn' : 'Thêm Nguồn mới'}</h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 4 }}><X size={16} /></button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 600, marginBottom: 5, color: 'var(--text-muted)' }}>Tên nguồn <span style={{ color: '#f43f5e' }}>*</span></label>
                <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="VD: Reuters Tech" autoFocus style={{ width: '100%', padding: '9px 12px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text)', fontSize: 12, outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 600, marginBottom: 5, color: 'var(--text-muted)' }}>Địa chỉ (URL) <span style={{ color: '#f43f5e' }}>*</span></label>
                <input value={formData.url} onChange={e => setFormData({...formData, url: e.target.value})} placeholder="VD: reuters.com/tech" style={{ width: '100%', padding: '9px 12px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text)', fontSize: 12, outline: 'none', fontFamily: 'monospace' }} />
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 600, marginBottom: 5, color: 'var(--text-muted)' }}>Phân loại Nhóm</label>
                  <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} style={{ width: '100%', padding: '9px 12px', background: '#121825', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text)', fontSize: 12, outline: 'none', cursor: 'pointer' }}>
                    {Object.entries(categories).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 600, marginBottom: 5, color: 'var(--text-muted)' }}>Khu vực</label>
                  <input value={formData.region} onChange={e => setFormData({...formData, region: e.target.value})} placeholder="VD: US, VN, Global" style={{ width: '100%', padding: '9px 12px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text)', fontSize: 12, outline: 'none' }} />
                </div>
              </div>
              <button onClick={handleSave} style={{ marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#3b82f6', color: '#fff', padding: '10px', borderRadius: 6, border: 'none', fontWeight: 600, fontSize: 12, cursor: 'pointer', transition: 'background 0.2s' }}>
                <Save size={14} /> Hoàn tất lưu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Category CRUD Modal */}
      {isCatModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ background: '#0e1420', border: '1px solid var(--border-light)', borderRadius: 12, width: 380, padding: '20px 24px', boxShadow: '0 16px 40px rgba(0,0,0,0.5)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>{editingCategory ? 'Sửa thông tin Nhóm' : 'Thêm Nhóm mới'}</h3>
              <button onClick={() => setIsCatModalOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 4 }}><X size={16} /></button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 600, marginBottom: 5, color: 'var(--text-muted)' }}>Tên nhóm <span style={{ color: '#f43f5e' }}>*</span></label>
                <input value={catFormData.label} onChange={e => setCatFormData({...catFormData, label: e.target.value})} placeholder="VD: Đối thủ cạnh tranh" autoFocus style={{ width: '100%', padding: '9px 12px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text)', fontSize: 12, outline: 'none' }} />
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ width: 80 }}>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 600, marginBottom: 5, color: 'var(--text-muted)' }}>Biểu tượng</label>
                  <input value={catFormData.icon} onChange={e => setCatFormData({...catFormData, icon: e.target.value})} placeholder="📁" style={{ width: '100%', padding: '9px 12px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text)', fontSize: 12, textAlign: 'center', outline: 'none' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 600, marginBottom: 5, color: 'var(--text-muted)' }}>Màu định danh</label>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    <input type="color" value={catFormData.color} onChange={e => setCatFormData({...catFormData, color: e.target.value})} style={{ width: 30, height: 30, padding: 0, border: 'none', background: 'transparent', cursor: 'pointer' }} />
                    <input value={catFormData.color} onChange={e => setCatFormData({...catFormData, color: e.target.value})} style={{ flex: 1, padding: '7px 10px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text)', fontSize: 11, fontFamily: 'monospace', outline: 'none' }} />
                  </div>
                </div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: 8, marginTop: 4 }}>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 6 }}>Bản xem trước:</div>
                <div style={{ background: 'var(--surface)', border: `1px solid ${catFormData.color}22`, borderRadius: 8, padding: '10px 12px', borderTop: `3px solid ${catFormData.color}`, display: 'inline-flex', alignItems: 'center', gap: 7 }}>
                  <span style={{ fontSize: 14 }}>{catFormData.icon}</span>
                  <span style={{ fontSize: 9, fontWeight: 600, color: 'var(--text)' }}>{catFormData.label || 'Tên nhóm'}</span>
                </div>
              </div>
              <button onClick={handleSaveCategory} style={{ marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#a855f7', color: '#fff', padding: '10px', borderRadius: 6, border: 'none', fontWeight: 600, fontSize: 12, cursor: 'pointer', transition: 'background 0.2s' }}>
                <Save size={14} /> Hoàn tất lưu nhóm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
