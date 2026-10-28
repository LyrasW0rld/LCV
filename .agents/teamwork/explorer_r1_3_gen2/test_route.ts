function polylineLength(pts) {
  let len = 0;
  for (let i = 0; i < pts.length - 1; i++) {
    len += Math.hypot(pts[i + 1].x - pts[i].x, pts[i + 1].y - pts[i].y);
  }
  return len;
}

function buildCandidate(x1, y1, x2, y2, laneOffset, yDetour) {
  const stub = 18;
  const pStart = { x: x1, y: y1 };
  const pStub1 = { x: x1 + stub, y: y1 };
  const pStub2 = { x: x2 - stub, y: y2 };
  const pEnd = { x: x2, y: y2 };

  const dx = pStub2.x - pStub1.x;
  const dy = pStub2.y - pStub1.y;
  const absDy = Math.abs(dy);

  if (dx >= absDy && yDetour === 0) {
    const diagX = absDy;
    const baseFlat = (dx - diagX) / 2;
    const shiftedFlat = Math.max(4, Math.min(dx - diagX - 4, baseFlat + laneOffset));
    return [
      pStart,
      pStub1,
      { x: pStub1.x + shiftedFlat, y: y1 },
      { x: pStub1.x + shiftedFlat + diagX, y: y2 },
      pStub2,
      pEnd,
    ];
  }

  const midY = (y1 + y2) / 2 + yDetour;
  const chamfer = Math.min(20, Math.abs(y2 - y1) / 4);
  const signY = y2 >= y1 ? 1 : -1;
  return [
    pStart,
    pStub1,
    { x: pStub1.x + chamfer, y: y1 + signY * chamfer },
    { x: pStub1.x + chamfer, y: midY },
    { x: pStub2.x - chamfer, y: midY },
    { x: pStub2.x - chamfer, y: y2 - signY * chamfer },
    pStub2,
    pEnd,
  ];
}

const pts = buildCandidate(860, 200, 285, 100, 0, 0);
console.log('Backward route points:', pts);
