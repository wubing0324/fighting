function fourLineTo(ctx, points, lineSmoothness, pos) {
    if (pos) {
      drawPointsSmoothLineFake(ctx, points, lineSmoothness, pos)
    } else {
      drawPointsSmoothLine(ctx, points, lineSmoothness)
    }
  }
  
  // 根据起起始点、中间经过点、终点算出两个控制点
  function getControlPoints(x0, y0, x1, y1, x2, y2, t) {
    var d01 = Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2));
    var d12 = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    var fa = t * d01 / (d01 + d12);   // scaling factor for triangle Ta
    var fb = t * d12 / (d01 + d12);   // ditto for Tb, simplifies to fb=t-fa
    var p1x = x1 - fa * (x2 - x0);    // x2-x0 is the width of triangle T
    var p1y = y1 - fa * (y2 - y0);    // y2-y0 is the height of T
    var p2x = x1 + fb * (x2 - x0);
    var p2y = y1 + fb * (y2 - y0);
    return [p1x, p1y, p2x, p2y];
  }
  // 算出一组点对应的控制点
  function createControlPoints(points, t = 0.5) {
    let controlPoints = []
    for (let i = 0; i < points.length - 2; i++) {
      const controlPoint = getControlPoints(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y, points[i + 2].x, points[i + 2].y, t)
      controlPoints.push({ x: controlPoint[0], y: controlPoint[1] }, { x: controlPoint[2], y: controlPoint[3] })
    }
    return controlPoints
  }
  // 根据给定的一组点、平滑度绘制出样条曲线
  const drawPointsSmoothLine = (ctx, points, t = 0.5) => {
    ctx.beginPath()
    ctx.strokeStyle = "red";
    let controlPoints = createControlPoints(points, t)
    if (controlPoints.length == 0) {
      return
    }
    for (let i = 0; i < points.length - 1; i++) {
      if (i === 0) {
        ctx.save()
        ctx.moveTo(points[i].x, points[i].y)
        ctx.quadraticCurveTo(controlPoints[0].x, controlPoints[0].y, points[i + 1].x, points[i + 1].y)
        ctx.stroke();
        ctx.restore()
      } else if (i === points.length - 2) {
        ctx.save()
        ctx.moveTo(points[i].x, points[i].y)
        ctx.quadraticCurveTo(controlPoints[controlPoints.length - 1].x, controlPoints[controlPoints.length - 1].y, points[i + 1].x, points[i + 1].y)
        ctx.stroke();
        ctx.restore()
      } else {
        ctx.save()
        ctx.lineTo(points[i].x, points[i].y)
        ctx.moveTo(points[i].x, points[i].y)
        ctx.bezierCurveTo(controlPoints[2 * (i - 1) + 1].x, controlPoints[2 * (i - 1) + 1].y, controlPoints[2 * (i - 1) + 2].x, controlPoints[2 * (i - 1) + 2].y, points[i + 1].x, points[i + 1].y)
        ctx.stroke();
        ctx.restore()
      }
    }
    console.log('绘制')
    ctx.closePath();
  }
  // 根据给定的一组点、平滑度绘制出样条曲线
  const drawPointsSmoothLineFake = (ctx, points, t = 0.5, pos) => {
    ctx.beginPath()
    let controlPoints = createControlPoints(points, t)
    if (controlPoints.length == 0) {
      return
    }
    let flag = false
    if (ctx.isPointInStroke(pos.x, pos.y)) {
      console.log("点击了这条线");
      flag = true
      return flag
    }
  
    ctx.lineWidth = 12;
    ctx.strokeStyle = "transparent";
    for (let i = 0; i < points.length - 1; i++) {
      if (i === 0) {
        ctx.moveTo(points[i].x, points[i].y)
        ctx.quadraticCurveTo(controlPoints[0].x, controlPoints[0].y, points[i + 1].x, points[i + 1].y)
      } else if (i === points.length - 2) {
        ctx.moveTo(points[i].x, points[i].y)
        ctx.quadraticCurveTo(controlPoints[controlPoints.length - 1].x, controlPoints[controlPoints.length - 1].y, points[i + 1].x, points[i + 1].y)
      } else {
        ctx.lineTo(points[i].x, points[i].y)
        ctx.moveTo(points[i].x, points[i].y)
        ctx.bezierCurveTo(controlPoints[2 * (i - 1) + 1].x, controlPoints[2 * (i - 1) + 1].y, controlPoints[2 * (i - 1) + 2].x, controlPoints[2 * (i - 1) + 2].y, points[i + 1].x, points[i + 1].y)
      }
      if (ctx.isPointInStroke(pos.x, pos.y)) {
        console.log("点击了这条线");
        flag = true
        break
      }
    }
    ctx.lineWidth = 1;
    ctx.closePath();
    return flag
  }