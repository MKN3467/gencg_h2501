let points = [];

function setup() {
  createCanvas(600, 600);
  // 50 adet rastgele nokta oluştur ve listeye ekle
  for (let i = 0; i < 50; i++) {
    points.push(createVector(random(width), random(height)));
  }
  noLoop();
}

function draw() {
  background(255);
  stroke(0, 80); // Çizgileri biraz şeffaf yaparsan o "web" görüntüsü daha iyi çıkar

  // Her noktayı, listedeki diğer TÜM noktalarla birleştir (İç içe döngü)
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      line(points[i].x, points[i].y, points[j].x, points[j].y);
    }
  }
}