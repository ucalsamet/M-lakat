const express = require("express");
const { Client } = require("pg");

const app = express();
const connection = new Client({
  user: "postgres",
  host: "localhost",
  database: "dbmulakat",
  password: "123456",
  port: 5432
});

connection.connect();
// Geliştirilecek 1. Servis TestVerisiOlustur(int musteriAdet, int sepetAdet)
app.post("/text-verisi-olustur", (req, res) => {
  let musteriAdet = parseInt(req.body.musteriAdet);
  let sepetAdet = parseInt(req.body.sepetAdet);
  let musteriler;
  while (musteriAdet > 0) {
    function makeid(length) {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    }
    const sehirler = [
      "Ankara",
      "İstanbul",
      "İzmir",
      "Bursa",
      "Edirne",
      "Konya",
      "Antalya",
      "Diyarbakır",
      "Van",
      "Rize"
    ];
    let random = Math.floor(Math.random() * 10);
    let ad = makeid(5);
    let soyad = makeid(5);
    let sehir = sehirler[random];

    const query = {
      text: "insert into Musteri (Ad,Soyad,Sehir) values ($1,$2,$3)",
      values: [ad, soyad, sehir]
    };
    connection.query(query, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json();
      }
    });
    musteriAdet--;
  }

  const query = {
    text: "select * from musteri order by id desc limit $1",
    values: [req.body.musteriAdet]
  };
  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json();
      musteriler = result.rows;
      while (sepetAdet > 0) {
        let random = Math.floor(Math.random() * req.body.musteriAdet);
        let musteri = musteriler[random];
        const query = {
          text: "insert into Sepet (musteriid) values ($1)",
          values: [musteri.id]
        };
        connection.query(query, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.status(200).json();
          }
        });
        sepetAdet--;
      }
    }
    const query2 = {
      text: "select * from Sepet order by id desc limit $1",
      values: [req.body.sepetAdet]
    };
    connection.query(query2, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json();
        let sepetler = result.rows;
        let sepetSayısı = parseInt(req.body.sepetAdet);
        while (sepetSayısı > 0) {
          let random = Math.floor(Math.random() * 5);
          let sepet = sepetler[sepetSayısı - 1];
          while (random > 0) {
            let tutar = Math.floor(Math.random() * 900) + 100;
            const query = {
              text:
                "insert into SepetUrun (sepetid , tutar , aciklama) values ($1 ,$2, $3)",
              values: [sepet.id, tutar, "aciklama"]
            };
            connection.query(query, (err, result) => {
              if (err) {
                console.log(err);
              } else {
                res.status(200).json();
              }
            });
            random--;
          }
          sepetSayısı--;
        }
      }
    });
  });
});

// Geliştirilecek 2. Servis SehirBazliAnalizYap()
app.post("/sehir-bazli-analiz-yap", (req, res) => {
  connection.query(
    "select ms.id,ms.sehir ,su.tutar  from musteri ms inner join sepet s on ms.id = s.musteriId inner join SepetUrun su on s.id = su.sepetId",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        //console.log(result.rows);
        let liste = result.rows;
        const sehirler = [
          "Ankara",
          "İstanbul",
          "İzmir",
          "Bursa",
          "Edirne",
          "Konya",
          "Antalya",
          "Diyarbakır",
          "Van",
          "Rize"
        ];
        let count = sehirler.length;
        let toplamTutar = 0;
        let sepetAdeti = 0;
        let DtoSehirAnaliz = [];
        while (count >= 0) {
          liste.forEach(item => {
            if (item.sehir === sehirler[count]) {
              toplamTutar += parseInt(item.tutar);
              sepetAdeti++;
            }
          });
          if (sepetAdeti > 0) {
            DtoSehirAnaliz.push({
              SehirAdi: sehirler[count],
              SepetAdet: sepetAdeti,
              ToplamTutar: toplamTutar
            });
          }

          toplamTutar = 0;
          sepetAdeti = 0;

          count--;
        }
        res.status(200).json({
          DtoSehirAnaliz
        });
        console.log(DtoSehirAnaliz);
      }
    }
  );
});

module.exports = {
  path: "/api",
  handler: app
};
