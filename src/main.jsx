import { useState, useEffect } from “react”;
import { createRoot } from “react-dom/client”;

const CLOUDINARY_BASE = “https://res.cloudinary.com/donmltebd/image/upload”;

function getWeekFolder() {
const now = new Date();
const date = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
const dayNum = date.getUTCDay() || 7;
date.setUTCDate(date.getUTCDate() + 4 - dayNum);
const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
const week = Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
return `${date.getUTCFullYear()}W${String(week).padStart(2, '0')}`;
}

const WEEK_FOLDER = getWeekFolder();

const STORY_IMAGES = [
{ id: 1, src: `${CLOUDINARY_BASE}/PixelBound/${WEEK_FOLDER}/image1.png`, label: “Scene 1”, emoji: “✨” },
{ id: 2, src: `${CLOUDINARY_BASE}/PixelBound/${WEEK_FOLDER}/image2.png`, label: “Scene 2”, emoji: “✨” },
{ id: 3, src: `${CLOUDINARY_BASE}/PixelBound/${WEEK_FOLDER}/image3.png`, label: “Scene 3”, emoji: “✨” },
{ id: 4, src: `${CLOUDINARY_BASE}/PixelBound/${WEEK_FOLDER}/image4.png`, label: “Scene 4”, emoji: “✨” },
{ id: 5, src: `${CLOUDINARY_BASE}/PixelBound/${WEEK_FOLDER}/image5.png`, label: “Scene 5”, emoji: “✨” },
{ id: 6, src: `${CLOUDINARY_BASE}/PixelBound/${WEEK_FOLDER}/image6.png`, label: “Scene 6”, emoji: “✨” },
{ id: 7, src: `${CLOUDINARY_BASE}/PixelBound/${WEEK_FOLDER}/image7.png`, label: “Scene 7”, emoji: “✨” },
{ id: 8, src: `${CLOUDINARY_BASE}/PixelBound/${WEEK_FOLDER}/image8.png`, label: “Scene 8”, emoji: “✨” },
];

const DEMO = {
_key: “demo”,
storyTitle: “The Dragon and the Silver Key”,
authorName: “A Young Adventurer”,
createdAt: Date.now() - 86400000,
selectedImages: STORY_IMAGES.slice(0, 4),
pages: {
1: “Deep within the enchanted castle, a brave knight discovered a door that no one had ever managed to open. Behind it, she sensed, lay the greatest secret of the realm.”,
2: “The magical forest whispered ancient songs as she walked its mossy paths. Every tree had a memory, and every breeze carried a name long forgotten.”,
3: “The dragon had guarded the silver key for a thousand years, waiting patiently for someone courageous enough – and kind enough – to ask for it properly.”,
4: “At last the mystical ocean revealed the hidden cove where the treasure had always been. Not gold, not jewels – but the knowledge of how to find your way home.”,
}
};

const CSS = `
@import url(‘https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Lora:ital,wght@0,400;0,500;1,400&display=swap’);
*{box-sizing:border-box;margin:0;padding:0}

.pb{min-height:100vh;background:radial-gradient(ellipse at 20% 10%,#2d1b69 0%,#0d0a1a 50%,#1a0d2e 100%);font-family:‘Lora’,Georgia,serif;color:#e8d5b7;position:relative;overflow-x:hidden}
.pb::before{content:’’;position:fixed;inset:0;background-image:radial-gradient(1px 1px at 20% 30%,rgba(255,215,0,.6) 0%,transparent 100%),radial-gradient(1px 1px at 80% 20%,rgba(255,215,0,.4) 0%,transparent 100%),radial-gradient(1px 1px at 50% 70%,rgba(200,160,255,.5) 0%,transparent 100%),radial-gradient(2px 2px at 35% 15%,rgba(255,255,255,.3) 0%,transparent 100%);pointer-events:none;z-index:0}

.pbh{position:relative;z-index:10;text-align:center;padding:20px 24px 14px;border-bottom:1px solid rgba(212,175,55,.3);background:rgba(13,10,26,.7);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:space-between;gap:12px}
.pbh-logo{display:flex;flex-direction:column;align-items:center;flex:1}
.pbh-sub{font-family:‘Cinzel’,serif;font-size:10px;letter-spacing:3px;color:#b8901a;text-transform:uppercase;margin-top:4px}
.pbh-action{background:transparent;border:1px solid rgba(212,175,55,.3);border-radius:9px;padding:9px 16px;font-family:‘Cinzel’,serif;font-size:10px;letter-spacing:1.5px;color:rgba(212,175,55,.75);cursor:pointer;transition:all .2s;text-transform:uppercase;white-space:nowrap;min-width:90px}
.pbh-action:hover{border-color:#d4af37;color:#d4af37;background:rgba(212,175,55,.07)}

.pbs{display:flex;justify-content:center;gap:0;padding:0 16px;margin:20px auto;max-width:640px;position:relative;z-index:10}
.pbs-item{display:flex;flex-direction:column;align-items:center;flex:1;position:relative}
.pbs-item:not(:last-child)::after{content:’’;position:absolute;top:14px;left:50%;width:100%;height:2px;background:rgba(212,175,55,.15);z-index:-1}
.pbs-item.done:not(:last-child)::after,.pbs-item.active:not(:last-child)::after{background:linear-gradient(90deg,rgba(212,175,55,.7),rgba(212,175,55,.15))}
.pbs-dot{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:‘Cinzel’,serif;font-size:11px;font-weight:700;border:2px solid rgba(212,175,55,.25);background:rgba(13,10,26,.9);color:rgba(212,175,55,.4);transition:all .3s;position:relative;z-index:2}
.pbs-item.active .pbs-dot{border-color:#d4af37;background:rgba(212,175,55,.15);color:#d4af37;box-shadow:0 0 14px rgba(212,175,55,.3)}
.pbs-item.done .pbs-dot{border-color:#d4af37;background:rgba(212,175,55,.2);color:#d4af37}
.pbs-lbl{font-size:9px;letter-spacing:1px;text-transform:uppercase;color:rgba(212,175,55,.35);margin-top:5px;font-family:‘Cinzel’,serif}
.pbs-item.active .pbs-lbl,.pbs-item.done .pbs-lbl{color:rgba(212,175,55,.75)}

.pbm{position:relative;z-index:10;max-width:880px;margin:0 auto;padding:16px 20px 40px}
.pbt{font-family:‘Cinzel’,serif;font-size:21px;font-weight:600;color:#d4af37;text-align:center;margin-bottom:6px;text-shadow:0 0 18px rgba(212,175,55,.3)}
.pbhint{text-align:center;font-style:italic;color:rgba(232,213,183,.55);font-size:13px;margin-bottom:24px}

.home{position:relative;z-index:10;max-width:980px;margin:0 auto;padding:0 24px 80px}
.hero{text-align:center;padding:64px 20px 52px}
.hero-eyebrow{font-family:‘Cinzel’,serif;font-size:11px;letter-spacing:6px;color:rgba(212,175,55,.38);text-transform:uppercase;margin-bottom:20px}
.hero-title{font-family:‘Cinzel’,serif;font-size:clamp(42px,7vw,72px);font-weight:700;color:#d4af37;line-height:1.05;text-shadow:0 0 60px rgba(212,175,55,.25);margin-bottom:18px;letter-spacing:3px}
.hero-sub{font-style:italic;color:rgba(232,213,183,.55);font-size:15px;line-height:1.75;max-width:420px;margin:0 auto 38px}
.hero-rule{width:100px;height:1px;background:linear-gradient(90deg,transparent,rgba(212,175,55,.5),transparent);margin:0 auto 38px}
.hero-btn{display:inline-flex;align-items:center;gap:10px;background:linear-gradient(135deg,#d4af37 0%,#b8901a 100%);border:none;border-radius:13px;padding:17px 40px;font-family:‘Cinzel’,serif;font-size:13px;letter-spacing:2.5px;color:#0d0a1a;font-weight:700;cursor:pointer;transition:all .28s;text-transform:uppercase;box-shadow:0 6px 28px rgba(212,175,55,.28)}
.hero-btn:hover{transform:translateY(-3px) scale(1.02);box-shadow:0 12px 36px rgba(212,175,55,.42)}

.lib-header{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:24px;padding-bottom:14px;border-bottom:1px solid rgba(212,175,55,.12)}
.lib-title{font-family:‘Cinzel’,serif;font-size:13px;letter-spacing:4px;color:rgba(212,175,55,.55);text-transform:uppercase}
.lib-count{font-family:‘Cinzel’,serif;font-size:11px;color:rgba(212,175,55,.28);letter-spacing:2px}
.shelf{display:flex;flex-direction:column;gap:10px}
.scard{background:rgba(255,255,255,.035);border:1px solid rgba(212,175,55,.13);border-radius:14px;overflow:hidden;cursor:pointer;transition:border-color .3s,transform .2s,box-shadow .3s;position:relative;display:flex;flex-direction:row;align-items:stretch;height:90px}
.scard:hover{border-color:rgba(212,175,55,.38);transform:translateX(4px);box-shadow:0 6px 24px rgba(0,0,0,.4)}
.scard-thumb{width:110px;min-width:110px;height:100%;object-fit:cover;display:block;flex-shrink:0}
.scard-body{padding:14px 16px;flex:1;display:flex;flex-direction:column;justify-content:center;position:relative;overflow:hidden}
.scard-title{font-family:‘Cinzel’,serif;font-size:14px;font-weight:600;color:#d4af37;margin-bottom:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding-right:32px}
.scard-author{font-style:italic;color:rgba(232,213,183,.5);font-size:12px;margin-bottom:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.scard-date{font-family:‘Cinzel’,serif;font-size:10px;color:rgba(212,175,55,.45);letter-spacing:1px}
.scard-pages{background:rgba(212,175,55,.09);border:1px solid rgba(212,175,55,.15);border-radius:20px;padding:2px 9px;font-family:‘Cinzel’,serif;font-size:9px;color:rgba(212,175,55,.5);letter-spacing:1px;position:absolute;top:10px;right:10px}
.scard-read{display:none}
.scard-del{position:absolute;bottom:10px;right:10px;background:transparent;border:1px solid rgba(200,80,80,.35);border-radius:7px;padding:4px 10px;font-family:‘Cinzel’,serif;font-size:9px;letter-spacing:1px;color:rgba(200,80,80,.6);cursor:pointer;display:flex;align-items:center;gap:5px;transition:all .2s;z-index:5;text-transform:uppercase}
.scard-del:hover{border-color:rgba(200,80,80,.7);color:rgb(200,80,80);background:rgba(200,80,80,.1)}
.scard-print{position:absolute;top:10px;left:118px;background:transparent;border:1px solid rgba(212,175,55,.35);border-radius:7px;padding:4px 10px;font-family:‘Cinzel’,serif;font-size:9px;letter-spacing:1px;color:rgba(212,175,55,.6);cursor:pointer;display:flex;align-items:center;gap:5px;transition:all .2s;z-index:5;text-transform:uppercase}
.scard-print:hover{border-color:#d4af37;color:#d4af37;background:rgba(212,175,55,.1)}

.empty{text-align:center;padding:80px 20px;color:rgba(232,213,183,.3)}
.overlay{position:fixed;inset:0;background:rgba(0,0,0,.72);z-index:200;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(5px)}
.modal{background:#100d1f;border:1px solid rgba(212,175,55,.28);border-radius:18px;padding:34px 30px;max-width:340px;width:90%;text-align:center;box-shadow:0 24px 64px rgba(0,0,0,.6)}
.modal-title{font-family:‘Cinzel’,serif;font-size:15px;color:#d4af37;margin-bottom:10px;letter-spacing:1px}
.modal-text{font-size:13px;color:rgba(232,213,183,.55);font-style:italic;margin-bottom:26px;line-height:1.65}
.modal-btns{display:flex;gap:10px;justify-content:center}

.pbcard{background:rgba(255,255,255,.04);border:1px solid rgba(212,175,55,.2);border-radius:14px;padding:36px;max-width:520px;margin:0 auto;backdrop-filter:blur(8px)}
.pblbl{display:block;font-family:‘Cinzel’,serif;font-size:11px;letter-spacing:2px;color:#d4af37;text-transform:uppercase;margin-bottom:8px}
.pbinput{width:100%;background:rgba(255,255,255,.05);border:1px solid rgba(212,175,55,.3);border-radius:9px;padding:13px 16px;font-family:‘Cinzel’,serif;font-size:18px;color:#e8d5b7;outline:none;transition:border-color .2s,box-shadow .2s;margin-bottom:20px}
.pbinput:focus{border-color:#d4af37;box-shadow:0 0 10px rgba(212,175,55,.2)}
.pbinput::placeholder{color:rgba(232,213,183,.3)}
.pbsub{width:100%;background:rgba(255,255,255,.04);border:1px solid rgba(212,175,55,.18);border-radius:9px;padding:11px 16px;font-family:‘Lora’,serif;font-size:14px;color:#e8d5b7;outline:none;transition:border-color .2s}
.pbsub:focus{border-color:rgba(212,175,55,.5)}
.pbsub::placeholder{color:rgba(232,213,183,.3)}
.pbgrid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-bottom:26px}
.pbimg-card{border-radius:11px;overflow:hidden;border:2px solid rgba(212,175,55,.15);cursor:pointer;transition:all .25s;position:relative;background:rgba(255,255,255,.03)}
.pbimg-card:hover{border-color:rgba(212,175,55,.5);transform:translateY(-3px);box-shadow:0 8px 20px rgba(212,175,55,.15)}
.pbimg-card.sel{border-color:#d4af37;box-shadow:0 0 0 2px rgba(212,175,55,.25),0 6px 18px rgba(212,175,55,.2)}
.pbimg-card img{width:100%;height:110px;object-fit:cover;display:block}
.pbcheck{position:absolute;top:7px;right:7px;width:20px;height:20px;border-radius:50%;background:#d4af37;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#0d0a1a;box-shadow:0 2px 6px rgba(0,0,0,.3)}
.pbbadge{background:rgba(212,175,55,.12);border:1px solid rgba(212,175,55,.28);border-radius:20px;padding:5px 14px;font-size:12px;color:#d4af37;font-family:‘Cinzel’,serif;width:fit-content;margin:0 auto 20px}
.pbpages{display:flex;flex-direction:column;gap:18px;margin-bottom:26px}
.pbpc{background:rgba(255,255,255,.04);border:1px solid rgba(212,175,55,.18);border-radius:13px;overflow:hidden}
.pbph{display:flex;align-items:center;gap:10px;padding:11px 14px;background:rgba(212,175,55,.07);border-bottom:1px solid rgba(212,175,55,.12)}
.pbpn{font-family:‘Cinzel’,serif;font-size:12px;font-weight:600;color:#d4af37;background:rgba(212,175,55,.14);padding:3px 10px;border-radius:18px;white-space:nowrap}
.pbpb{display:flex}
.pbpi{width:170px;min-width:170px;height:120px;object-fit:cover;border-right:1px solid rgba(212,175,55,.1)}
.pbtxt{flex:1;background:transparent;border:none;outline:none;padding:12px 14px;font-family:‘Lora’,serif;font-size:13.5px;color:#e8d5b7;resize:none;min-height:120px;line-height:1.75}
.pbtxt::placeholder{color:rgba(232,213,183,.3);font-style:italic}
.pbarrlist{display:flex;flex-direction:column;gap:11px;margin-bottom:26px}
.pbai{display:flex;align-items:center;gap:12px;background:rgba(255,255,255,.04);border:1px solid rgba(212,175,55,.18);border-radius:11px;padding:11px 14px;transition:all .2s}
.pbath{width:60px;height:43px;object-fit:cover;border-radius:6px;border:1px solid rgba(212,175,55,.18);flex-shrink:0}
.pbai-info{flex:1;min-width:0}
.pbai-prev{font-size:11px;color:rgba(232,213,183,.45);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-style:italic}
.pbarr{display:flex;flex-direction:column;gap:3px}
.pbarr-btn{background:rgba(212,175,55,.12);border:1px solid rgba(212,175,55,.3);border-radius:7px;color:#d4af37;width:36px;height:30px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:14px;transition:all .15s}
.pbarr-btn:hover:not(:disabled){background:rgba(212,175,55,.25);border-color:#d4af37}
.pbarr-btn:disabled{opacity:.2;cursor:not-allowed}
.pbcover-btn{background:transparent;border:1px solid rgba(212,175,55,.2);border-radius:6px;padding:3px 8px;font-size:10px;color:rgba(212,175,55,.4);cursor:pointer;transition:all .2s;white-space:nowrap;font-family:‘Cinzel’,serif;letter-spacing:.5px}
.pbcover-btn:hover{border-color:rgba(212,175,55,.6);color:rgba(212,175,55,.8);background:rgba(212,175,55,.07)}
.pbcover-btn.active{background:rgba(212,175,55,.15);border-color:#d4af37;color:#d4af37}
.pb-btn-p{background:linear-gradient(135deg,#d4af37 0%,#b8901a 100%);border:none;border-radius:9px;padding:12px 28px;font-family:‘Cinzel’,serif;font-size:13px;letter-spacing:1.5px;color:#0d0a1a;font-weight:700;cursor:pointer;transition:all .2s;text-transform:uppercase;box-shadow:0 4px 14px rgba(212,175,55,.25)}
.pb-btn-p:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 7px 20px rgba(212,175,55,.35)}
.pb-btn-p:disabled{opacity:.35;cursor:not-allowed;transform:none}
.pb-btn-s{background:transparent;border:1px solid rgba(212,175,55,.38);border-radius:9px;padding:11px 24px;font-family:‘Cinzel’,serif;font-size:12px;letter-spacing:1px;color:rgba(212,175,55,.75);cursor:pointer;transition:all .2s;text-transform:uppercase}
.pb-btn-s:hover{border-color:#d4af37;color:#d4af37;background:rgba(212,175,55,.07)}
.pb-btn-d{background:transparent;border:1px solid rgba(200,80,80,.35);border-radius:7px;padding:7px 12px;font-size:11px;color:rgba(200,80,80,.65);cursor:pointer;transition:all .2s}
.pb-btn-d:hover{border-color:rgba(200,80,80,.65);color:rgb(200,80,80)}
.pb-row{display:flex;justify-content:space-between;align-items:center;margin-top:22px;gap:10px;flex-wrap:wrap}

.fb{position:fixed;inset:0;z-index:999;background:#06040f;display:flex;flex-direction:column;overflow:hidden}
.fb-stars{position:absolute;inset:0;pointer-events:none;background-image:radial-gradient(1px 1px at 8% 12%,rgba(255,215,0,.7) 0%,transparent 100%),radial-gradient(1px 1px at 75% 10%,rgba(255,215,0,.5) 0%,transparent 100%),radial-gradient(1px 1px at 22% 5%,rgba(255,255,255,.5) 0%,transparent 100%),radial-gradient(1px 1px at 90% 25%,rgba(200,160,255,.6) 0%,transparent 100%),radial-gradient(1px 1px at 55% 85%,rgba(255,215,0,.4) 0%,transparent 100%),radial-gradient(1px 1px at 15% 72%,rgba(255,255,255,.3) 0%,transparent 100%),radial-gradient(1px 1px at 40% 95%,rgba(200,160,255,.35) 0%,transparent 100%),radial-gradient(1px 1px at 68% 55%,rgba(255,215,0,.25) 0%,transparent 100%)}
.fb-bar{position:relative;z-index:20;display:flex;align-items:center;justify-content:space-between;padding:14px 20px;background:linear-gradient(to bottom,rgba(0,0,0,.9),rgba(0,0,0,.4));flex-shrink:0}
.fb-close-btn{background:rgba(212,175,55,.1);border:1px solid rgba(212,175,55,.35);border-radius:8px;padding:8px 18px;font-family:‘Cinzel’,serif;font-size:10px;letter-spacing:2px;color:#d4af37;cursor:pointer;transition:all .2s;text-transform:uppercase}
.fb-close-btn:hover{background:rgba(212,175,55,.22);border-color:#d4af37}
.fb-title-bar{font-family:‘Cinzel’,serif;font-size:11px;letter-spacing:3px;color:rgba(212,175,55,.5);text-transform:uppercase;text-align:center;flex:1;padding:0 12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.fb-pg-count{font-family:‘Cinzel’,serif;font-size:10px;letter-spacing:2px;color:rgba(212,175,55,.35);min-width:70px;text-align:right}
.fb-viewport{position:relative;flex:1;overflow:hidden}
.fb-page{position:absolute;inset:0;display:flex;flex-direction:column;will-change:transform}
.fb-page.current{transform:translateX(0);transition:none}
.fb-page.enter-from-right{transform:translateX(100%);transition:none}
.fb-page.enter-from-left{transform:translateX(-100%);transition:none}
.fb-page.slide-in{transform:translateX(0);transition:transform 0.45s cubic-bezier(0.4,0,0.2,1)}
.fb-page.slide-out-left{transform:translateX(-100%);transition:transform 0.45s cubic-bezier(0.4,0,0.2,1)}
.fb-page.slide-out-right{transform:translateX(100%);transition:transform 0.45s cubic-bezier(0.4,0,0.2,1)}
.fb-img{width:100%;flex:0 0 42%;object-fit:contain;display:block;min-height:0;background:#06040f}
.fb-cover-page{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px 32px;text-align:center;background:linear-gradient(160deg,#2d1b69 0%,#0d0a1a 65%,#1a0d2e 100%)}
.fb-cover-icon{font-size:48px;margin-bottom:20px;filter:drop-shadow(0 0 16px rgba(212,175,55,.4))}
.fb-cover-title{font-family:‘Cinzel’,serif;font-size:clamp(22px,5vw,42px);font-weight:700;color:#d4af37;text-shadow:0 0 30px rgba(212,175,55,.35);line-height:1.2;margin-bottom:14px}
.fb-cover-rule{width:60px;height:1px;background:linear-gradient(90deg,transparent,#d4af37,transparent);margin:0 auto 14px}
.fb-cover-author{font-style:italic;color:rgba(232,213,183,.55);font-size:16px;margin-bottom:32px}
.fb-cover-hint{font-family:‘Cinzel’,serif;font-size:10px;letter-spacing:3px;color:rgba(212,175,55,.3);text-transform:uppercase;animation:pulse 2s ease-in-out infinite}
@keyframes pulse{0%,100%{opacity:.3}50%{opacity:.8}}
.fb-end-page{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;background:linear-gradient(160deg,#180d30,#06040f)}
.fb-end-ornament{font-size:48px;color:rgba(212,175,55,.8)}
.fb-end-word{font-family:‘Cinzel’,serif;font-size:42px;color:#d4af37;text-shadow:0 0 30px rgba(212,175,55,.4);letter-spacing:8px}
.fb-end-sub{font-family:‘Cinzel’,serif;font-size:13px;color:rgba(212,175,55,.7);text-transform:uppercase}
.fb-text-area{flex:1;display:flex;flex-direction:column;padding:24px 28px 16px;background:linear-gradient(to bottom,#1a1230 0%,#100d22 100%);overflow-y:auto;position:relative;min-height:0}
.fb-text-area::before{content:’’;position:absolute;top:0;left:28px;right:28px;height:1px;background:linear-gradient(90deg,transparent,rgba(212,175,55,.2),transparent)}
.fb-story-text{font-family:‘Lora’,serif;font-size:clamp(15px,2.2vw,19px);line-height:1.85;color:#e8d5b7;font-style:italic;flex:1;overflow-y:auto;white-space:pre-wrap}
.fb-story-text::-webkit-scrollbar{width:3px}
.fb-story-text::-webkit-scrollbar-thumb{background:rgba(212,175,55,.2);border-radius:2px}
.fb-empty-text{color:rgba(232,213,183,.25);font-style:italic}
.fb-nav{position:relative;z-index:20;display:flex;align-items:center;justify-content:space-between;padding:14px 20px;background:linear-gradient(to top,rgba(0,0,0,.9),rgba(0,0,0,.4));flex-shrink:0}
.fb-nav-btn{width:52px;height:52px;border-radius:50%;background:rgba(212,175,55,.1);border:1px solid rgba(212,175,55,.3);color:#d4af37;font-size:26px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;font-family:serif;line-height:1}
.fb-nav-btn:hover:not(:disabled){background:rgba(212,175,55,.22);border-color:#d4af37;transform:scale(1.1)}
.fb-nav-btn:disabled{opacity:.15;cursor:not-allowed;transform:none}
.fb-dots{display:flex;gap:7px;align-items:center;justify-content:center;flex:1}
.fb-dot{width:7px;height:7px;border-radius:50%;background:rgba(212,175,55,.2);transition:all .3s;cursor:pointer}
.fb-dot.active{background:#d4af37;transform:scale(1.3);box-shadow:0 0 8px rgba(212,175,55,.5)}
.fb-dot:hover:not(.active){background:rgba(212,175,55,.45)}

/* iPad */
@media(min-width:768px){
.pbgrid{grid-template-columns:repeat(4,1fr)}
.pbimg-card img{height:130px}
.shelf{gap:14px}
.scard{height:100px}
.scard-thumb{width:130px;min-width:130px}
.scard-title{font-size:15px}
.hero-btn{padding:20px 52px;font-size:14px}
.fb-img{flex:0 0 42%;object-fit:contain;background:#06040f}
.fb-story-text{font-size:18px}
.pbpages{display:grid;grid-template-columns:1fr 1fr;gap:18px}
.pbcard{padding:44px}
}

/* iPad landscape */
@media(min-width:768px) and (orientation:landscape){
.fb-img{flex:0 0 42%;object-fit:contain;background:#06040f}
.fb-text-area{flex:1;padding:36px 40px}
.fb-story-text{font-size:19px}
}

/* iPhone */
@media(max-width:767px){
.pbgrid{grid-template-columns:repeat(2,1fr)}
.pbpb{flex-direction:column}
.pbpi{width:100%;min-width:100%;height:150px;border-right:none;border-bottom:1px solid rgba(212,175,55,.1)}
.pbcard{padding:24px 18px}
.pbh{flex-wrap:wrap;justify-content:center;gap:8px}
.fb-text-area{padding:18px 20px 12px}
.fb-story-text{font-size:15px}
.fb-cover-title{font-size:26px}
.fb-nav-btn{width:52px;height:52px;font-size:26px}
.fb-img{flex:0 0 42%;object-fit:contain;background:#06040f}
.hero{padding:40px 16px 36px}
.pbm{padding:12px 16px 40px}
.pbarrlist{gap:8px}
.pbai{padding:10px 10px}
.pb-btn-p{padding:15px 28px;font-size:13px}
.pb-btn-s{padding:14px 22px}
.pbarr-btn{width:42px;height:36px;font-size:16px}
.scard{height:86px}
.scard-thumb{width:100px;min-width:100px}
.scard-print{top:10px;left:108px;bottom:auto}
}
`;

function fmtDate(ts) {
return new Date(ts).toLocaleDateString(“en-US”,{month:“short”,day:“numeric”,year:“numeric”});
}

function PrintBook({ story, onClose }) {
const imgs = story.selectedImages || [];
const coverImg = imgs.find(function(i){return i.id===story.coverImageId;}) || imgs[0];
const coverBg = coverImg
? “linear-gradient(to bottom,rgba(6,4,15,.2),rgba(6,4,15,.75)),url(” + coverImg.src + “) center/cover no-repeat”
: “#2d1b69”;
const printCSS = [
“@media print{.no-print{display:none!important}.pb{display:none!important}.fb{display:none!important}body{background:white!important}.print-cover{page-break-after:always}.print-page{page-break-after:always;page-break-inside:avoid}}”,
“.print-cover{height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:40px;color:white;background:#2d1b69}”,
“.print-cover h1{font-size:36px;color:#d4af37;margin-bottom:12px}”,
“.print-cover hr{width:80px;border:1px solid #d4af37;margin:16px auto}”,
“.print-cover p{font-size:18px;color:rgba(255,255,255,.7);font-style:italic}”,
“.print-page{background:white;padding:0}”,
“.print-page img{width:100%;height:50vh;object-fit:contain;display:block;background:#f9f9f9}”,
“.story-text{padding:20px 32px;font-size:16px;line-height:1.8;color:#222;text-align:center}”,
“.page-num{text-align:center;font-size:10px;color:#aaa;padding:8px;letter-spacing:2px}”,
“.print-end{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;background:white}”,
“.print-end h2{font-size:48px;color:#2d1b69;letter-spacing:8px}”,
“.print-end p{font-size:13px;color:#aaa;margin-top:12px;letter-spacing:3px}”,
].join(” “);
return (
<div style={{position:“relative”,background:“white”,fontFamily:“Georgia,serif”,minHeight:“100vh”}}>
<style dangerouslySetInnerHTML={{__html: printCSS}} />
<div className=“no-print” style={{position:“sticky”,top:0,background:“rgba(255,255,255,.95)”,padding:“12px 20px”,display:“flex”,gap:12,justifyContent:“center”,borderBottom:“1px solid #eee”,zIndex:10}}>
<button onClick={()=>window.print()} style={{background:”#2d1b69”,color:“white”,border:“none”,borderRadius:8,padding:“10px 24px”,fontFamily:“Georgia,serif”,fontSize:14,cursor:“pointer”}}>Print / Save as PDF</button>
<button onClick={onClose} style={{background:“transparent”,color:”#666”,border:“1px solid #ccc”,borderRadius:8,padding:“10px 24px”,fontFamily:“Georgia,serif”,fontSize:14,cursor:“pointer”}}>Close</button>
</div>
<div className=“print-cover” style={{position:“relative”,overflow:“hidden”}}>
{coverImg && <img src={coverImg.src} style={{position:“absolute”,inset:0,width:“100%”,height:“100%”,objectFit:“cover”,opacity:0.4}} alt=””/>}
<div style={{position:“relative”,zIndex:1}}>
<h1>{story.storyTitle || “My Story”}</h1>
<hr/>
{story.authorName && <p>{“by “ + story.authorName}</p>}
</div>
</div>
{imgs.map(function(img, idx) {
return (
<div className="print-page" key={img.id}>
<img src={img.src} alt={img.label}/>
<div className="story-text">{(story.pages||{})[img.id]||””}</div>
<div className="page-num">{”- “ + (idx+1) + “ -”}</div>
</div>
);
})}
<div className="print-end">
<h2>The End</h2>
<p>{”* “ + (story.storyTitle||””) + “ *”}</p>
</div>
</div>
);
}

function FlipBook({ story, onClose, onPrint }) {
const imgs = story.selectedImages || [];
const total = imgs.length + 2;
const [current, setCurrent] = useState(0);
const [incoming, setIncoming] = useState(null);
const [dir, setDir] = useState(null);
const [animating, setAnimating] = useState(false);

function goTo(target) {
if (animating || target === current || target < 0 || target >= total) return;
const direction = target > current ? ‘next’ : ‘prev’;
setDir(direction);
setIncoming(target);
setAnimating(true);
}

useEffect(() => {
if (incoming === null) return;
const t = setTimeout(() => {
setCurrent(incoming);
setTimeout(() => { setIncoming(null); setDir(null); setAnimating(false); }, 480);
}, 30);
return () => clearTimeout(t);
}, [incoming]);

useEffect(() => {
const h = e => {
if (e.key===‘ArrowRight’) goTo(current+1);
if (e.key===‘ArrowLeft’) goTo(current-1);
if (e.key===‘Escape’) onClose();
};
window.addEventListener(‘keydown’, h);
return () => window.removeEventListener(‘keydown’, h);
}, [current, animating]);

function renderPage(pageIdx) {
if (pageIdx === 0) {
const coverImg = imgs.find(i=>i.id===story.coverImageId) || imgs[0];
return (
<div className=“fb-cover-page” style={coverImg?{background:“linear-gradient(to bottom, rgba(6,4,15,.3) 0%, rgba(6,4,15,.85) 55%, #06040f 100%), url(” + coverImg.src + “) center/cover no-repeat”}:undefined}>
<div className="fb-cover-icon">📖</div>
<div className="fb-cover-title">{story.storyTitle || “Untitled Story”}</div>
<div className="fb-cover-rule" />
{story.authorName && <div className="fb-cover-author">by {story.authorName}</div>}
<div className="fb-cover-hint">tap to begin</div>
</div>
);
}
if (pageIdx === total - 1) return (
<div className="fb-end-page">
<div className="fb-end-ornament">✦</div>
<div className="fb-end-word">The End</div>
<div className="fb-end-sub">✦   {story.storyTitle}   ✦</div>
{onPrint && <button className=“pb-btn-s” style={{marginTop:24,fontSize:11,padding:“10px 24px”}} onClick={onPrint}>🖨️ Print / Save as PDF</button>}
</div>
);
const img = imgs[pageIdx - 1];
const text = (story.pages || {})[img.id];
return (
<>
<img src={img.src} alt={img.label} className="fb-img" />
<div className="fb-text-area">
<div className="fb-story-text">
{text || <span className="fb-empty-text">[ No text written for this page ]</span>}
</div>
</div>
</>
);
}

function currentClass() {
if (!animating) return “fb-page current”;
return dir===‘next’ ? “fb-page slide-out-left” : “fb-page slide-out-right”;
}

const label = current===0 ? “Cover” : current===total-1 ? “The End” : “Page “ + current + “ of “ + imgs.length;
const showDots = total <= 12;

return (
<div className="fb">
<div className="fb-stars" />
<div className="fb-bar">
<button className="fb-close-btn" onClick={onClose}>✕ Close</button>
<div className="fb-title-bar">{story.storyTitle}</div>
<div className="fb-pg-count">{label}</div>
</div>
<div className="fb-viewport">
<div className={currentClass()} key={“cur-”+current}>
{renderPage(current)}
</div>
{animating && incoming !== null && (
<IncomingPage key={“inc-”+incoming} dir={dir} render={() => renderPage(incoming)} />
)}
</div>
<div className="fb-nav">
<button className=“fb-nav-btn” disabled={current===0||animating} onClick={()=>goTo(current-1)}>‹</button>
{showDots ? (
<div className="fb-dots">
{Array.from({length:total}).map((_,i)=>(
<div key={i} className={“fb-dot “ + (i===current?“active”:””)} onClick={()=>goTo(i)} />
))}
</div>
) : (
<div style={{flex:1,textAlign:‘center’,fontFamily:”‘Cinzel’,serif”,fontSize:10,letterSpacing:3,color:“rgba(212,175,55,.3)”}}>{label}</div>
)}
<button className=“fb-nav-btn” disabled={current===total-1||animating} onClick={()=>goTo(current+1)}>›</button>
</div>
</div>
);
}

function IncomingPage({ dir, render }) {
const [settled, setSettled] = useState(false);
useEffect(() => { const t = setTimeout(() => setSettled(true), 20); return () => clearTimeout(t); }, []);
const cls = settled ? “fb-page slide-in” : (dir===‘next’ ? “fb-page enter-from-right” : “fb-page enter-from-left”);
return <div className={cls}>{render()}</div>;
}

function Homepage({ onNewStory, onRead, sessionStories, onDelete, onPrint }) {
const [storageStories, setStorageStories] = useState(null);
const [delTarget, setDelTarget] = useState(null);
useEffect(()=>{ load(); },[]);

async function load() {
try {
const _ks = Object.keys(localStorage).filter(k=>k.startsWith(“pbstory:”)); const res = {keys: _ks};
if (!res.keys.length){ setStorageStories([]); return; }
const all = await Promise.all(res.keys.map(async k=>{
try{
const _rv=localStorage.getItem(k); const r=_rv?{value:_rv}:null;
if(!r) return null;
const d=JSON.parse(r.value);
if(d.imageIds && !d.selectedImages){
d.selectedImages=d.imageIds.map(id=>STORY_IMAGES.find(i=>i.id===id)).filter(Boolean);
}
return {_key:k,…d};
}catch{ return null; }
}));
setStorageStories(all.filter(Boolean));
} catch(err) { setStorageStories([]); }
}

const merged = (() => {
const base = […(sessionStories||[])];
const sessionTs = new Set(base.map(s=>s.createdAt));
(storageStories||[]).forEach(s=>{ if(!sessionTs.has(s.createdAt)) base.push(s); });
base.sort((a,b)=>b.createdAt-a.createdAt);
return base.length ? base : [DEMO];
})();

const stories = storageStories === null ? null : merged;

async function doDelete() {
if (!delTarget || delTarget._key===‘demo’){ setDelTarget(null); return; }
try{ localStorage.removeItem(delTarget._key); }catch{}
onDelete && onDelete(delTarget.createdAt);
setDelTarget(null); load();
}

return (
<div className="home">
<div className="hero">
<p className="hero-sub">Weave enchanting tales from magical scenes.<br/>Every story you write lives in the library below.</p>
<div className="hero-rule"/>
<button className="hero-btn" onClick={onNewStory}><span style={{fontSize:17}}>✨</span> Craft a New Story</button>
</div>
{stories===null ? (
<div style={{textAlign:“center”,padding:“60px”,fontFamily:”‘Cinzel’,serif”,fontSize:11,letterSpacing:4,color:“rgba(212,175,55,.3)”}}>✦ Opening the Library ✦</div>
) : (
<>
<div className="lib-header">
<span className="lib-title">The Library</span>
<span className="lib-count">{stories.length} {stories.length===1?“story”:“stories”}</span>
</div>
<div className="shelf">
{stories.map(s=>(
<div className=“scard” key={s._key||s.createdAt} onClick={()=>onRead(s)}>
<img src={(s.selectedImages||[]).find(i=>i.id===s.coverImageId)?.src || (s.selectedImages||[])[0]?.src} alt=”” className=“scard-thumb” />
<div className="scard-body">
<div className="scard-title">{s.storyTitle||“Untitled Story”}</div>
<div className="scard-author">{s.authorName?“by “+s.authorName:<em>Anonymous</em>}</div>
<div className="scard-date">{fmtDate(s.createdAt)}</div>
<span className="scard-pages">{(s.selectedImages||[]).length} {(s.selectedImages||[]).length===1?“page”:“pages”}</span>
{s._key!==‘demo’&&<button className=“scard-del” onClick={e=>{e.stopPropagation();setDelTarget(s);}}>🗑 Delete</button>}
{s._key!==‘demo’&&<button className=“scard-print” onClick={e=>{e.stopPropagation();onPrint&&onPrint(s);}}>🖨️ Print / Save</button>}
</div>
</div>
))}
</div>
</>
)}
{delTarget&&(
<div className=“overlay” onClick={()=>setDelTarget(null)}>
<div className=“modal” onClick={e=>e.stopPropagation()}>
<div className="modal-title">Delete this story?</div>
<p className="modal-text">”{delTarget.storyTitle||“Untitled Story”}” will be permanently removed.</p>
<div className="modal-btns">
<button className=“pb-btn-s” style={{padding:“9px 20px”,fontSize:11}} onClick={()=>setDelTarget(null)}>Keep It</button>
<button className=“pb-btn-d” style={{padding:“9px 20px”}} onClick={doDelete}>Delete</button>
</div>
</div>
</div>
)}
</div>
);
}

function Builder({ onSaved, onCancel }) {
const [step,setStep]=useState(0);
const [storyTitle,setStoryTitle]=useState(””);
const [authorName,setAuthorName]=useState(””);
const [selectedImages,setSelectedImages]=useState([]);
const [pages,setPages]=useState({});
const [coverImageId,setCoverImageId]=useState(null);
const [saving,setSaving]=useState(false);
const [saveError,setSaveError]=useState(null);
const [storyReady,setStoryReady]=useState(null);
const LABELS=[“Scenes”,“Arrange”,“Write”,“Title”];

useEffect(()=>{ window.scrollTo({top:0,behavior:‘smooth’}); },[step]);

const toggleImage=img=>setSelectedImages(p=>p.find(i=>i.id===img.id)?p.filter(i=>i.id!==img.id):[…p,img]);
const isSel=id=>selectedImages.some(i=>i.id===id);
const move=(from,to)=>{const a=[…selectedImages];const[x]=a.splice(from,1);a.splice(to,0,x);setSelectedImages(a);};

async function saveAndRead(){
setSaving(true); setSaveError(null);
const ts=Date.now();
const story={storyTitle,authorName,selectedImages,pages,coverImageId,createdAt:ts};
try{
localStorage.setItem(“pbstory:”+ts, JSON.stringify(story));
} catch(err){
console.warn(“Storage save failed:”, err);
}
setSaving(false);
onSaved(story);
}

return (
<>
<div className="pbs">
{LABELS.map((lbl,i)=>(
<div key={i} className={“pbs-item “ + (i===step?“active”:””) + “ “ + (i<step?“done”:””)}>
<div className="pbs-dot">{i<step?“✓”:i+1}</div>
<div className="pbs-lbl">{lbl}</div>
</div>
))}
</div>
<div className="pbm">
{step===0&&<div>
<div className="pbt">🌟 Choose Your Scenes</div>
<div className="pbhint">Pick the magical places your story will visit</div>
<div className=“pbhint” style={{marginTop:’-16px’,fontSize:12,color:‘rgba(232,213,183,.4)’}}>Don’t worry about the order, you can switch them up later.</div>
<div className="pbbadge">{selectedImages.length===0?“No scenes chosen yet”:“✦ “ + selectedImages.length + “ scene” + (selectedImages.length>1?“s”:””) + “ chosen ✦”}</div>
<div className="pbgrid">
{STORY_IMAGES.map(img=>(
<div key={img.id} className={“pbimg-card “ + (isSel(img.id)?“sel”:””)} onClick={()=>toggleImage(img)}>
<img src={img.src} alt={img.label}/>
{isSel(img.id)&&<div className="pbcheck">✓</div>}
</div>
))}
</div>
<div className="pb-row">
<button className="pb-btn-s" onClick={onCancel}>← Library</button>
<button className=“pb-btn-p” disabled={selectedImages.length===0} onClick={()=>setStep(1)}>Arrange Your Pages →</button>
</div>
</div>}
{step===1&&<div>
<div className="pbt">📚 Arrange Your Pages</div>
<div className="pbhint">Use the arrows to change the order! Tap ★ to set your cover image.</div>
<div className="pbarrlist">
{selectedImages.map((img,idx)=>{
const isCover=(coverImageId===null&&idx===0)||coverImageId===img.id;
return (
<div key={img.id} className="pbai">
<img src={img.src} alt={img.label} className=“pbath” style={{boxShadow:isCover?“0 0 0 2px #d4af37”:undefined}}/>
<div className="pbai-info">
<div className="pbai-prev">{pages[img.id]?’”’+ pages[img.id].slice(0,65)+(pages[img.id].length>65?”…”:””) +’”’:“No text yet”}</div>
</div>
<button className={“pbcover-btn” + (isCover?” active”:””)} onClick={()=>setCoverImageId(img.id)} title=“Set as cover”>
{isCover?“★ Cover”:“☆ Cover”}
</button>
<div style={{fontFamily:”‘Cinzel’,serif”,fontSize:11,color:“rgba(212,175,55,.45)”,paddingRight:4}}>{idx+1}</div>
<div className="pbarr">
<button className=“pbarr-btn” disabled={idx===0} onClick={()=>move(idx,idx-1)}>▲</button>
<button className=“pbarr-btn” disabled={idx===selectedImages.length-1} onClick={()=>move(idx,idx+1)}>▼</button>
</div>
</div>
);
})}
</div>
<div className="pb-row">
<button className=“pb-btn-s” onClick={()=>setStep(0)}>← Back</button>
<button className=“pb-btn-p” onClick={()=>setStep(2)}>Write Your Story →</button>
</div>
</div>}
{step===2&&<div>
<div className="pbt">📝 Write Your Story</div>
<div className="pbhint">Add words to each scene!</div>
<div className="pbpages">
{selectedImages.map((img,idx)=>(
<div key={img.id} className="pbpc">
<div className="pbph">
<span className="pbpn">Page {idx+1}</span>
<button className=“pb-btn-d” onClick={()=>setSelectedImages(p=>p.filter(i=>i.id!==img.id))}>x Remove</button>
</div>
<div className="pbpb">
<img src={img.src} alt={img.label} className="pbpi"/>
<textarea className=“pbtxt” placeholder=“Type your story here…” value={pages[img.id]||””} onChange={e=>setPages(p=>({…p,[img.id]:e.target.value}))}/>
</div>
</div>
))}
</div>
<div className="pb-row">
<button className=“pb-btn-s” onClick={()=>setStep(1)}>← Back</button>
<button className=“pb-btn-p” onClick={()=>setStep(3)}>Give It a Title →</button>
</div>
</div>}
{step===3&&<div>
<div className="pbt">✨ Name Your Story ✨</div>
<div className="pbhint">Now that you’ve written it – what’s it called?</div>
<div className="pbcard">
<label className="pblbl">Story Title</label>
<input className=“pbinput” type=“text” placeholder=“The Dragon and the Silver Key…” value={storyTitle} onChange={e=>setStoryTitle(e.target.value)} autoFocus/>
<label className="pblbl">Written by</label>
<input className=“pbsub” type=“text” placeholder=“Your name…” value={authorName} onChange={e=>setAuthorName(e.target.value)}/>
</div>
{saveError&&<div style={{background:“rgba(200,80,80,.1)”,border:“1px solid rgba(200,80,80,.3)”,borderRadius:9,padding:“12px 16px”,margin:“16px auto”,maxWidth:520,fontFamily:”‘Cinzel’,serif”,fontSize:11,color:“rgba(220,120,120,.9)”,textAlign:“center”}}>⚠ {saveError}</div>}
<div className="pb-row">
<button className=“pb-btn-s” onClick={()=>setStep(2)}>← Back</button>
{storyReady
? <button className=“pb-btn-p” onClick={()=>onSaved(storyReady.story)}>Open Your Book →</button>
: <button className="pb-btn-p" disabled={!storyTitle.trim()||saving} onClick={saveAndRead}>{saving?“Saving…”:“Save & Continue →”}</button>
}
</div>
</div>}
</div>
</>
);
}

function PixelBound() {
const [view,setView]=useState(“home”);
const [activeStory,setActiveStory]=useState(null);
const [reading,setReading]=useState(false);
const [printing,setPrinting]=useState(null);
const [sessionStories,setSessionStories]=useState([]);

function handleSaved(story) {
setSessionStories(prev=>[story,…prev.filter(s=>s.createdAt!==story.createdAt)]);
setActiveStory(story);
setView(“home”);
setReading(true);
}

function handleDelete(createdAt) {
setSessionStories(prev=>prev.filter(s=>s.createdAt!==createdAt));
}

return (
<>
<style>{CSS}</style>
{printing&&<PrintBook story={printing} onClose={()=>setPrinting(null)}/>}
{reading&&activeStory&&<FlipBook story={activeStory} onClose={()=>setReading(false)} onPrint={()=>{setReading(false);setPrinting(activeStory);}}/>}
<div className="pb">
<header className="pbh">
{view!==“home”
?<button className=“pbh-action” onClick={()=>setView(“home”)}>← Library</button>
:<div style={{minWidth:90}}/>}
<div className="pbh-logo">
<img src=“https://res.cloudinary.com/donmltebd/image/upload/v1774344846/img_5534_aadazm_f1f475” alt=“PixelBound” style={{width:“100%”,height:“auto”,objectFit:“contain”,filter:“drop-shadow(0 0 14px rgba(212,175,55,.4))”}}/>
<div className="pbh-sub">Craft Your Magical Story</div>
</div>
<div style={{minWidth:90}}/>
</header>
{view===“home”&&<Homepage onNewStory={()=>setView(“builder”)} onRead={s=>{setActiveStory(s);setReading(true);}} sessionStories={sessionStories} onDelete={handleDelete} onPrint={s=>setPrinting(s)}/>}
{view===“builder”&&<Builder onSaved={handleSaved} onCancel={()=>setView(“home”)}/>}
</div>
</>
);
}

createRoot(document.getElementById(“root”)).render(
<PixelBound />
);
