
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif; background: #0f172a; color: #f8fafc; line-height: 1.5; padding: 20px; }
header { display: flex; justify-content: space-between; align-items: center; background: #1e293b; color: #fff; padding: 15px 25px; border-radius: 12px; margin-bottom: 20px; border: 1px solid #334155; }
header h1 { font-size: 1.5rem; }
.badge { padding: 4px 10px; border-radius: 6px; font-weight: bold; background: #334155; color: #94a3b8; }
.badge.ok { background: #10b981; color: #fff; }
.badge.no { background: #ef4444; color: #fff; }

main { display: flex; flex-direction: column; gap: 20px; }
.panel { background: #1e293b; padding: 20px; border-radius: 12px; border: 1px solid #334155; box-shadow: 0 4px 12px rgba(0,0,0,0.3); }

.setup { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 15px; }
.setup label { display: flex; flex-direction: column; font-size: 0.9rem; font-weight: 600; color: #cbd5e1; }
.setup input, .setup select { margin-top: 5px; padding: 8px 12px; background: #0f172a; border: 1px solid #475569; color: #fff; border-radius: 6px; }

.buttons { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 15px; }
button { padding: 8px 16px; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; background: #334155; color: #f8fafc; transition: 0.2s; }
button.primary { background: #2563eb; color: #fff; }
button.locationButton { background: #0284c7; color: #fff; }
button.fireButton { background: #dc2626; color: #fff; }
button:hover { opacity: 0.85; }

.selectionGuide { background: #0f172a; border: 1px solid #38bdf8; padding: 10px 15px; border-radius: 8px; font-size: 0.9rem; margin-bottom: 10px; color: #38bdf8; }

.summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; }
.summary article { background: #0f172a; padding: 15px; border-radius: 10px; border: 1px solid #334155; text-align: center; }
.summary article span { font-size: 0.8rem; color: #94a3b8; }
.summary article strong { display: block; font-size: 1.2rem; margin: 5px 0; color: #38bdf8; }

.layout { display: grid; grid-template-columns: 300px 1fr; gap: 20px; }
@media (max-width: 900px) { .layout { grid-template-columns: 1fr; } }

.maphead { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
.legend span { margin-left: 12px; font-size: 0.85rem; font-weight: 600; }
.legend .safe { color: #10b981; }
.legend .warn { color: #eab308; }
.legend .danger { color: #f97316; }
.legend .critical { color: #ef4444; }

.map { position: relative; width: 100%; aspect-ratio: 1.83 / 1; background: #020617; border-radius: 8px; overflow: hidden; border: 1px solid #475569; }
.map img { width: 100%; height: 100%; object-fit: fill !important; display: block; }

#pathLayer, #exitLayer, #specialMarkerLayer {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  pointer-events: none !important;
}

#sensorLayer { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; }

/* 업그레이드된 센서 마커: ID와 퍼센티지 실시간 수치 표시 */
#sensorLayer .sensor {
  position: absolute; width: 34px; height: 34px; transform: translate(-50%, -50%);
  border-radius: 50%; color: #fff; display: flex; flex-direction: column; align-items: center;
  justify-content: center; cursor: pointer; pointer-events: auto !important; 
  box-shadow: 0 0 8px rgba(0,0,0,0.8); border: 2px solid #ffffff; transition: background-color 0.2s ease, box-shadow 0.2s ease;
}
#sensorLayer .sensor strong { font-size: 0.8rem; line-height: 1.1; font-weight: bold; }
#sensorLayer .sensor small { font-size: 0.55rem; line-height: 1; opacity: 0.95; font-weight: bold; }

#sensorLayer .sensor.safe { background-color: #10b981 !important; box-shadow: 0 0 10px rgba(16, 185, 129, 0.6); }
#sensorLayer .sensor.warn { background-color: #eab308 !important; color: #000 !important; box-shadow: 0 0 10px rgba(234, 179, 8, 0.6); border-color: #000; }
#sensorLayer .sensor.danger { background-color: #f97316 !important; box-shadow: 0 0 10px rgba(249, 115, 22, 0.6); }
#sensorLayer .sensor.critical { background-color: #ef4444 !important; box-shadow: 0 0 12px rgba(239, 68, 68, 0.9); animation: pulseAlert 0.5s infinite alternate; }

@keyframes pulseAlert {
  from { transform: translate(-50%, -50%) scale(1); }
  to { transform: translate(-50%, -50%) scale(1.15); }
}

.realgrid, .virtualgrid { display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 10px; }
.card { background: #0f172a; border: 1px solid #334155; border-radius: 8px; padding: 10px; text-align: center; }
.card .title { font-size: 0.8rem; color: #cbd5e1; font-weight: 600; }
.card .val { font-size: 1.1rem; font-weight: bold; margin: 4px 0; }

.aiDiag { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 10px; margin-top: 10px; }
.aiDiag article { background: #0f172a; padding: 10px; border-radius: 8px; text-align: center; border: 1px solid #334155; }

.titleRow { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
.explainBox { background: #0f172a; padding: 12px; border-radius: 8px; margin-top: 15px; font-size: 0.85rem; border: 1px solid #334155; }

.marker { position: absolute; transform: translate(-50%, -50%); pointer-events: none; }
.marker.myLocation { font-size: 26px; z-index: 10; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.8)); }
.marker.fireLocation { font-size: 30px; z-index: 10; animation: pulse 1s infinite alternate; }

@keyframes pulse {
  from { transform: translate(-50%, -50%) scale(1); }
  to { transform: translate(-50%, -50%) scale(1.2); }
}

footer { text-align: center; font-size: 0.85rem; color: #64748b; margin-top: 20px; }
