import React, { useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { POSTS, SENTIMENT_CONFIG, SIGNAL_CONFIG, SOURCE_TYPE_ICON } from '../data/posts';
import { 
  ArrowLeft, Calendar, User, Tag, Share2, Bookmark, 
  MessageCircle, ThumbsUp, ExternalLink, ShieldCheck, 
  Zap, BarChart3, AlertCircle
} from 'lucide-react';

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const post = useMemo(() => POSTS.find(p => p.id === parseInt(id)), [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!post) {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
        <AlertCircle size={48} style={{ marginBottom: 16, opacity: 0.5 }} />
        <h2 style={{ margin: 0 }}>Không tìm thấy bài viết</h2>
        <button 
          onClick={() => navigate('/posts')}
          style={{ marginTop: 20, padding: '8px 20px', borderRadius: 8, background: 'var(--accent-blue)', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 600 }}
        >
          Quay lại danh sách
        </button>
      </div>
    );
  }

  const sc = SENTIMENT_CONFIG[post.sentiment];
  const sig = SIGNAL_CONFIG[post.signalLevel];

  return (
    <div style={{ height: '100%', overflowY: 'auto', background: 'var(--bg)', color: 'var(--text)' }}>
      {/* Top Header */}
      <div style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(10,16,32,0.8)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border)', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 15 }}>
        <button 
          onClick={() => navigate(-1)}
          style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', color: 'var(--text)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
        >
          <ArrowLeft size={16} />
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>Chi tiết Tin báo OSINT</div>
          <div style={{ fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{post.title}</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ width: 32, height: 32, borderRadius: 8, background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><Bookmark size={14} /></button>
          <button style={{ width: 32, height: 32, borderRadius: 8, background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><Share2 size={14} /></button>
        </div>
      </div>

      <div style={{ maxWidth: 1600, margin: '0 auto', padding: '30px 20px 60px' }}>
        {/* Main Content Area */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 340px', gap: 60 }}>
          
          {/* Left Column: Article Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            
            {/* Meta Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 12px', borderRadius: 999, background: sc.bg, color: sc.color, fontSize: 11, fontWeight: 700 }}>
                 {sc.icon} {sc.label}
               </div>
               <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 12px', borderRadius: 999, background: 'rgba(245,158,11,0.1)', color: '#f59e0b', fontSize: 11, fontWeight: 700 }}>
                 <Zap size={12} /> Tín hiệu {sig.label}
               </div>
               <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 12px', borderRadius: 999, background: 'rgba(34,211,160,0.1)', color: '#22d3a0', fontSize: 11, fontWeight: 700 }}>
                 <ShieldCheck size={12} /> Tin cậy 92%
               </div>
            </div>

            {/* Title */}
            <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--text)', lineHeight: 1.3, margin: 0 }}>
              {post.title}
            </h1>

            {/* Author/Source Info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, paddingBottom: 24, borderBottom: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--accent-blue-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
                  {SOURCE_TYPE_ICON[post.sourceType]}
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700 }}>{post.source}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Nguồn tin xác thực</div>
                </div>
              </div>
              <div style={{ height: 24, width: 1, background: 'var(--border)' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', fontSize: 11 }}>
                <Calendar size={14} /> {post.pubTime}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', fontSize: 11 }}>
                <Tag size={14} /> {post.tags.join(', ')}
              </div>
            </div>

            {/* Article Body */}
            <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
              {post.content}
              <p style={{ marginTop: 24 }}>
                Sự kiện này đang được theo dõi sát sao bởi các AI Agents của hệ thống NKG Compass. Mọi diễn biến mới nhất liên quan đến thực thể này sẽ được cập nhật tự động vào Intel Feed và gửi cảnh báo đến Dashboard của bạn.
              </p>
            </div>

            {/* Source Link Mock */}
            <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--accent-blue)', textDecoration: 'none', fontWeight: 600, fontSize: 14, marginTop: 10 }}>
              Xem bài viết gốc tại {post.source} <ExternalLink size={14} />
            </a>

            {/* Strategic Details Analysis Section */}
            {post.strategicAnalysis && (
              <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4, paddingBottom: 16, borderBottom: '1px solid var(--border)' }}>
                  <div style={{ width: 32, height: 32, borderRadius: '8px', background: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 0 15px rgba(59,130,246,0.4)' }}>
                    <BarChart3 size={18} />
                  </div>
                  <h2 style={{ fontSize: 20, fontWeight: 800, margin: 0, color: 'var(--text)', letterSpacing: '-0.02em' }}>
                    Phân Tích Chiến Lược Chuyên Sâu
                  </h2>
                </div>

                {/* Section 1: Vietnam Importance */}
                <div style={{ padding: '20px', borderRadius: 12, background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.2)', borderLeft: '4px solid #3b82f6' }}>
                  <h3 style={{ fontSize: 13, fontWeight: 800, color: '#3b82f6', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    <Zap size={15} /> Tại sao sự kiện này quan trọng với Việt Nam?
                  </h3>
                  <div style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.7, fontWeight: 500 }}>
                    {post.strategicAnalysis.vietnamImportance}
                  </div>
                </div>

                {/* Section 2: Core Events */}
                <div style={{ padding: '20px', borderRadius: 12, background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <h3 style={{ fontSize: 13, fontWeight: 800, color: 'var(--text)', margin: '0 0 12px 0', display: 'flex', alignItems: 'center', gap: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    <ShieldCheck size={15} color="#22d3a0" /> Sự kiện cốt lõi & Phân định thông tin
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div style={{ background: 'rgba(34,211,160,0.05)', padding: '16px', borderRadius: 8, border: '1px dashed rgba(34,211,160,0.3)' }}>
                      <div style={{ fontSize: 11, fontWeight: 800, color: '#22d3a0', marginBottom: 8, letterSpacing: '0.05em' }}>TIN ĐÃ XÁC MINH (VERIFIED)</div>
                      <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{post.strategicAnalysis.coreEvents.verified}</div>
                    </div>
                    <div style={{ background: 'rgba(245,158,11,0.05)', padding: '16px', borderRadius: 8, border: '1px dashed rgba(245,158,11,0.3)' }}>
                      <div style={{ fontSize: 11, fontWeight: 800, color: '#f59e0b', marginBottom: 8, letterSpacing: '0.05em' }}>DỰ ĐOÁN MẠNG XÃ HỘI</div>
                      <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{post.strategicAnalysis.coreEvents.socialPrediction}</div>
                    </div>
                  </div>
                </div>

                {/* Section 3: Cause Evaluation */}
                <div style={{ padding: '20px', borderRadius: 12, background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <h3 style={{ fontSize: 13, fontWeight: 800, color: 'var(--text)', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    <AlertCircle size={15} color="#f43f5e" /> Đánh giá nguyên nhân & Động cơ
                  </h3>
                  <div style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.7 }}>
                    {post.strategicAnalysis.causeEvaluation}
                  </div>
                </div>

                {/* Section 4: Resolution 57 link & Sandbox */}
                <div style={{ padding: '20px', borderRadius: 12, background: 'linear-gradient(135deg, rgba(168,85,247,0.1), rgba(236,72,153,0.1))', border: '1px solid rgba(168,85,247,0.2)' }}>
                  <h3 style={{ fontSize: 13, fontWeight: 800, color: '#d946ef', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    <Bookmark size={15} /> Mục tiêu NQ57 & Cơ hội Sandbox
                  </h3>
                  <div style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.7, fontWeight: 500 }}>
                    {post.strategicAnalysis.resolution57Link}
                  </div>
                </div>

                {/* Section 5: Actionable Options */}
                <div style={{ padding: '20px', borderRadius: 12, background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <h3 style={{ fontSize: 13, fontWeight: 800, color: 'var(--text)', margin: '0 0 15px 0', display: 'flex', alignItems: 'center', gap: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    <Zap size={15} color="#10b981" /> Tùy chọn khả thi / Đề xuất hành động
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {post.strategicAnalysis.actionOptions.map((opt, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: 14, alignItems: 'center', background: 'rgba(255,255,255,0.03)', padding: '12px 16px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(16,185,129,0.15)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, flexShrink: 0 }}>
                          {idx + 1}
                        </div>
                        <div style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.5, fontWeight: 500 }}>
                          {opt}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Stats Card */}
            <div style={{ padding: '20px', borderRadius: 12, background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <h4 style={{ margin: '0 0 16px', fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Tương tác cộng đồng</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: 8, textAlign: 'center' }}>
                  <div style={{ color: 'var(--accent-blue)', marginBottom: 4 }}><ThumbsUp size={18} /></div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>{post.likes.toLocaleString()}</div>
                  <div style={{ fontSize: 9, color: 'var(--text-muted)' }}>Thích</div>
                </div>
                <div style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: 8, textAlign: 'center' }}>
                  <div style={{ color: 'var(--accent-green)', marginBottom: 4 }}><MessageCircle size={18} /></div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>{post.comments.toLocaleString()}</div>
                  <div style={{ fontSize: 9, color: 'var(--text-muted)' }}>Bình luận</div>
                </div>
              </div>
              <button style={{ width: '100%', marginTop: 16, padding: '10px', borderRadius: 8, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', color: 'var(--text)', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                Gửi phản hồi cho AI
              </button>
            </div>

            {/* Related Intelligence Card */}
            <div style={{ padding: '20px', borderRadius: 12, background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <h4 style={{ margin: '0 0 16px', fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Tin liên quan</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                {POSTS.filter(p => p.id !== post.id && p.tags.some(t => post.tags.includes(t))).slice(0, 3).map(p => (
                  <div key={p.id} onClick={() => navigate(`/post/${p.id}`)} style={{ cursor: 'pointer', display: 'flex', gap: 10 }}>
                    <div style={{ width: 4, height: 40, borderRadius: 2, background: SENTIMENT_CONFIG[p.sentiment].color, flexShrink: 0 }} />
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text)', lineHeight: 1.3, marginBottom: 4 }}>{p.title}</div>
                      <div style={{ fontSize: 9, color: 'var(--text-muted)' }}>{p.source} · {p.pubTime}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
