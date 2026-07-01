import React from "react";
import fireImg from "../assets/fire.png";
import humanImg from "../assets/human.png";
import infrasImg from "../assets/infras.png";
import landImg from "../assets/land.png";
import nonDamageImg from "../assets/nonDamage.png";
import waterImg from "../assets/water.png";
import rocketIcon from "../assets/iconroket.png";
import disasterBg from "../assets/disaster.jpg";

const LandingPage = ({ onStartPrediction }) => {
  const variables = [
    {
      title: "Non Damage",
      img: nonDamageImg,
      desc: "Area kontrol normal, aman, kondisi spasial hijau, atau pemukiman pra-bencana tanpa kerusakan fisik.",
    },
    {
      title: "Damaged Infrastructure",
      img: infrasImg,
      desc: "Kerusakan fisik bangunan, fasilitas umum, jalan raya, atau jembatan runtuh akibat gempa.",
    },
    {
      title: "Water Disaster",
      img: waterImg,
      desc: "Genangan banjir bandang, luapan debit aliran sungai, wilayah terisolasi, dan bencana hidrometeorologi air.",
    },
    {
      title: "Fire Disaster",
      img: fireImg,
      desc: "Identifikasi sebaran titik api aktif (thermal anomaly), asap tebal, dan kebakaran lahan atau area hunian.",
    },
    {
      title: "Land Disaster",
      img: landImg,
      desc: "Pergerakan massa tanah, tanah longsor, deformasi geologis lereng, amblesan permukiman, dan tanah retak.",
    },
    {
      title: "Human Damage",
      img: humanImg,
      desc: "Konsentrasi kerumunan korban selamat, situasi darurat evakuasi kemanusiaan, atau tenda pengungsian aktif.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-500/30">
      {/* HERO SECTION */}
      <section
        className="relative flex flex-col items-center justify-center text-center px-4 py-32 border-b border-slate-900 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${disasterBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/90 to-slate-950 pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Sistem Analisis Spasial <br />
            <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Kerusakan Bencana
            </span>
          </h1>
          <p className="max-w-2xl text-slate-300 text-base md:text-lg mb-10 leading-relaxed">
            Platform komputasi terintegrasi untuk mendeteksi,
            mengklasifikasikan, dan mengukur tingkat kerusakan visual objek
            geospasial secara asinkronus menggunakan arsitektur deep learning.
          </p>
          <button
            onClick={onStartPrediction}
            className="flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 font-bold text-white rounded-xl shadow-lg shadow-blue-600/30 transition-all duration-300 border border-blue-400/20 text-sm tracking-wide uppercase"
          >
            <span>Buka Workspace Analisis</span>
          </button>
        </div>
      </section>

      {/* METODOLOGI & PROBLEM STATEMENT */}
      <section className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <span className="text-xs font-mono font-bold text-blue-500 uppercase tracking-widest block">
            Latar Belakang Riset
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
            Tantangan Ketimpangan Data Spasial Kebencanaan (Highly Imbalanced)
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed text-justify">
            Distribusi data pada domain kebencanaan rill di lapangan secara
            alami memiliki bias ketidakseimbangan yang ekstrem (intrinsic
            imbalance). Kondisi lingkungan aman atau normal secara kuantitas
            jauh lebih mudah didokumentasikan dibandingkan visualisasi hantaman
            kerusakan pascabencana. Hal ini memicu fenomena Accuracy Paradox, di
            mana model kecerdasan buatan dapat meraih nilai akurasi global yang
            tinggi sekadar dengan memprediksi kelas mayoritas tanpa mampu
            mendeteksi indikator kritis pada kelas minoritas.
          </p>
          <p className="text-slate-400 text-sm leading-relaxed text-justify">
            Melalui platform ini, dilakukan pengujian komparasi murni terhadap
            dua metode mitigasi ketimpangan data, yaitu pendekatan tingkat data
            (Random Undersampling) melawan pendekatan tingkat algoritma (Class
            Weights) untuk memetakan arsitektur mana yang paling adaptif menjaga
            sinyal gradien pelatihan tetap stabil.
          </p>
        </div>

        <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-6 space-y-6">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 border-b border-slate-800 pb-2">
            Karakteristik Pembagian Partisi Data CDD
          </h3>
          <div className="space-y-4 text-xs font-mono">
            <div className="flex justify-between items-center bg-slate-950 p-3 rounded-xl border border-slate-900">
              <span className="text-slate-400">Total Populasi Citra:</span>
              <span className="text-white font-bold">13.556 Gambar Valid</span>
            </div>
            <div className="flex justify-between items-center bg-slate-950 p-3 rounded-xl border border-slate-900">
              <span className="text-slate-400">
                Rasio Ketimpangan Kelas (Imbalance Ratio):
              </span>
              <span className="text-amber-500 font-bold">
                38 : 1 (Max vs Min)
              </span>
            </div>
            <div className="flex justify-between items-center bg-slate-950 p-3 rounded-xl border border-slate-900">
              <span className="text-slate-400">
                Metode Partisi Subset (Stratified Hold-Out):
              </span>
              <span className="text-blue-400 font-bold">
                70% Latih | 15% Validasi | 15% Uji
              </span>
            </div>
            <p className="text-[11px] text-slate-500 italic leading-snug font-sans">
              *Pembagian menggunakan metode Stratified Split dikunci menggunakan
              token Random Seed 42 guna menjamin konsistensi partisi sebaran
              data.
            </p>
          </div>
        </div>
      </section>

      {/* METRIK PERFORMA MODEL */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="p-8 bg-slate-900/30 border border-slate-900 rounded-2xl text-center">
          <h2 className="text-2xl font-bold mb-2 text-white">
            Validasi Performa Eksperimen
          </h2>
          <p className="text-slate-400 text-sm mb-8 max-w-xl mx-auto">
            Hasil evaluasi pengujian komparative pada 2.034 citra uji
            menggunakan arsitektur pilihan dengan optimasi fungsi loss Class
            Weights.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono">
            <div className="p-5 bg-slate-950/60 border border-slate-900 rounded-xl">
              <div className="text-4xl font-black text-blue-500 mb-1">
                96.61%
              </div>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold font-sans">
                Akurasi Validasi (ResNet-50)
              </p>
            </div>
            <div className="p-5 bg-slate-950/60 border border-slate-900 rounded-xl">
              <div className="text-4xl font-black text-teal-400 mb-1">0.96</div>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold font-sans">
                Macro F1-Score ResNet+CW
              </p>
            </div>
            <div className="p-5 bg-slate-950/60 border border-slate-900 rounded-xl">
              <div className="text-4xl font-black text-emerald-400 mb-1">
                0.93
              </div>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold font-sans">
                Macro F1-Score ViT+CW
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TEORI ARSITEKTUR MODEL */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-white text-center mb-2">
          Komparasi Arsitektur Deep Learning
        </h2>
        <p className="text-center text-slate-400 text-sm mb-10 max-w-md mx-auto">
          Perbedaan mendasar paradigma ekstraksi fitur visual antara kernel CNN
          dan Transformer.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-slate-900/30 border border-slate-900 rounded-xl space-y-3">
            <div className="flex items-center gap-2 text-blue-500 font-bold text-base font-mono uppercase tracking-wide">
              <span>[CNN]</span>{" "}
              <h3>ResNet-50 (Convolutional Neural Network)</h3>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed text-justify">
              Bekerja memanfaatkan operasi filter konvolusi lokal (receptive
              field) untuk mengekstraksi hirarki fitur visual secara bertahap
              mulai dari tepi, tekstur, hingga bentuk objek utuh. Dibekali
              mekanisme Residual Connections (Skip Connection) yang merumuskan
              aliran gradien langsung melewati blok transformasi konvolusional.
              Karakteristik ini membuat ResNet-50 memiliki inductive bias yang
              kuat, sangat stabil, konvergen lebih cepat, dan toleran tinggi
              meskipun dilatih pada volume data skala menengah.
            </p>
          </div>

          <div className="p-6 bg-slate-900/30 border border-slate-900 rounded-xl space-y-3">
            <div className="flex items-center gap-2 text-teal-500 font-bold text-base font-mono uppercase tracking-wide">
              <span>[XFRM]</span> <h3>Vision Transformer (ViT-B/16)</h3>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed text-justify">
              Memproses citra dengan cara memotong gambar input berukuran
              224x224 menjadi 196 token patch visual berukuran 16x16 piksel.
              Fitur visual diekstrak memanfaatkan mekanisme Multi-Head
              Self-Attention yang mengkalkulasi matriks korelasi antar token
              patch secara global tanpa batasan receptive field lokal. Meskipun
              memiliki kapasitas representasi konteks global yang sangat kuat,
              arsitektur ViT tidak dibekali inductive bias konvolusional bawaan,
              sehingga membutuhkan durasi pelatihan yang jauh lebih panjang atau
              volume data raksasa untuk mencapai kestabilan konvergensi penuh.
            </p>
          </div>
        </div>
      </section>

      {/* 6 VARIABEL KLASIFIKASI */}
      <section className="max-w-6xl mx-auto px-4 py-8 mb-16">
        <h2 className="text-3xl font-bold text-center text-white mb-2">
          6 Kategori Variabel Deteksi
        </h2>
        <p className="text-center text-slate-400 text-sm mb-12 max-w-md mx-auto">
          Deskripsi operasional variabel visual target berdasarkan pembagian
          sub-kelas asli Comprehensive Disaster Dataset (CDD).
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {variables.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-900 rounded-xl overflow-hidden flex flex-col shadow-sm"
            >
              <div className="h-44 overflow-hidden relative bg-slate-950">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover select-none"
                  loading="lazy"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-wide font-mono">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed text-justify">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full border-t border-slate-900 bg-slate-950 px-6 py-6 text-center text-[10px] text-slate-500 font-mono tracking-wider"></footer>
    </div>
  );
};

export default LandingPage;
