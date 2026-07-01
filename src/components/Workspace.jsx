import React, { useState } from "react";
import rocketIcon from "../assets/iconroket.png";

const HF_SPACE_API = import.meta.env.VITE_HF_SPACE_API;

export default function Workspace({ onBackToLanding }) {
  const [model, setModel] = useState("resnet50");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [status, setStatus] = useState("idle");
  const [result, setResult] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [meta, setMeta] = useState({
    sensor: "Satellite Multispectral (CDD Source)",
    resolution: "0.5m / pixel",
    coordinates: "N/A",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setStatus("idle");
      setResult(null);

      const mockLat = (Math.random() * (10 - -10) + -10).toFixed(4);
      const mockLng = (Math.random() * (140 - 95) + 95).toFixed(4);
      setMeta((prev) => ({
        ...prev,
        coordinates: `${mockLat}° S, ${mockLng}° E`,
      }));
    }
  };

  const handleAnalyze = async () => {
    if (!image) return alert("Pilih dokumen citra terlebih dahulu!");

    setStatus("scanning");
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("model_type", model);
      formData.append("file", image);

      const response = await fetch(HF_SPACE_API, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("API Server gagal merespons bray!");

      const data = await response.json();
      const severityLevel =
        data.class === "Non Damage" ? "NORMAL / SECURE" : "CRITICAL ALERT";

      setStatus("success");
      setResult({
        class: data.class,
        severity: severityLevel,
        confidence: data.confidence,
        inferenceTime: data.inferenceTime,
        processedArea: data.processedArea || "Grid Sector Alpha-12",
      });
    } catch (error) {
      console.error(error);
      alert("Gagal melakukan analisis spasial.");
      setStatus("idle");
    }
  };

  const handleReset = () => {
    setImage(null);
    setPreview(null);
    setStatus("idle");
    setResult(null);
    setMeta({
      sensor: "Satellite Multispectral (CDD Source)",
      resolution: "0.5m / pixel",
      coordinates: "N/A",
    });
  };

  return (
    <div className="min-h-screen w-full bg-[#F3F4F6] text-[#1F2937] font-sans antialiased flex flex-col items-center">
      {/* Navigation Top Bar */}
      <header className="w-full bg-white border-b border-[#E5E7EB] px-6 py-4 shadow-sm flex justify-between items-center z-10">
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToLanding}
            className="flex items-center justify-center px-4 py-2 rounded-xl bg-[#F5F3FF] hover:bg-[#EDE9FE] border border-[#DDD6FF] text-[#6D28D9] font-mono text-xs font-bold transition duration-200"
          >
            [ KEMBALI ]
          </button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-sm">
              <img
                src={rocketIcon}
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-sm sm:text-lg font-bold tracking-tight text-[#111827] leading-none sm:leading-tight">
                Workspace Analisis Spasial Kerusakan Bencana
              </h1>
              <p className="text-[10px] sm:text-xs text-[#6B7280] mt-0.5 sm:mt-0 font-mono">
                EXECUTION PIPELINE: UNIVERSITAS DIAN NUSWANTORO
              </p>
            </div>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs text-[#9CA3AF] font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          HF_SPACE_CONNECTED
        </div>
      </header>

      {/* Main Core Container */}
      <main className="max-w-[1200px] w-full p-6 flex flex-col gap-8 flex-1">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <section className="lg:col-span-5 bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm flex flex-col gap-5">
            <div>
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#111827] mb-3">
                I. Pengunggahan Dokumen Citra
              </h2>

              <div className="border-2 border-dashed border-[#D1D5DB] hover:border-[#6D28D9] rounded-xl bg-[#F5F3FF]/40 p-4 transition min-h-[220px] flex flex-col items-center justify-center text-center overflow-hidden relative group">
                {preview ? (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img
                      src={preview}
                      alt="Preview"
                      className="max-h-[190px] object-contain rounded-lg"
                    />
                    {status === "scanning" && (
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#6D28D9]/20 to-transparent h-1/4 w-full animate-scan border-b-2 border-[#6D28D9]"></div>
                    )}
                  </div>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center space-y-2 w-full py-12">
                    <span className="text-sm font-semibold text-[#6D28D9] block uppercase tracking-wide font-mono text-xs">
                      [ INPUT CITRA GEOSPASIAL ]
                    </span>
                    <span className="text-xs text-[#6B7280] block">
                      Mendukung format JPG, PNG, atau Geo-TIFF
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>

              <div className="mt-4 space-y-2 bg-[#F3F4F6] p-4 rounded-xl border border-[#E5E7EB] text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Karakteristik Sensor:</span>
                  <span className="text-[#1F2937] font-medium">
                    {meta.sensor}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Resolusi Spasial:</span>
                  <span className="text-[#1F2937] font-medium">
                    {meta.resolution}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Geo-Coordinates:</span>
                  <span className="text-[#6D28D9] font-bold">
                    {meta.coordinates}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-[#E5E7EB] pt-4">
              <div className="relative">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#6B7280] mb-1.5 font-mono">
                  Arsitektur Model (Kernel):
                </label>

                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  disabled={status === "scanning"}
                  className="flex items-center justify-between w-full bg-[#F5F3FF] border border-[#DDD6FF] text-[#6D28D9] text-xs font-mono font-bold rounded-xl px-4 py-3 transition disabled:opacity-50 text-left shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    <span>
                      {model === "resnet50"
                        ? "[CNN] ResNet-50"
                        : "[XFRM] Vision Transformer (ViT)"}
                    </span>
                  </div>
                  <svg
                    className={`w-4 h-4 text-[#6D28D9] transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-20"
                      onClick={() => setIsDropdownOpen(false)}
                    ></div>
                    <div className="absolute left-0 right-0 mt-2 bg-white border border-[#E5E7EB] rounded-xl shadow-xl z-30 p-1.5 space-y-1 font-mono">
                      <button
                        type="button"
                        onClick={() => {
                          setModel("resnet50");
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left flex items-start justify-between p-3 rounded-lg transition-colors ${model === "resnet50" ? "bg-[#F5F3FF]" : "hover:bg-[#F9FAFB]"}`}
                      >
                        <div className="flex flex-col">
                          <span
                            className={`text-xs font-bold ${model === "resnet50" ? "text-[#6D28D9]" : "text-[#111827]"}`}
                          >
                            ResNet-50 (CNN Architecture)
                          </span>
                        </div>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setModel("vit");
                          setIsDropdownOpen(false);
                        }}
                        disabled={status === "scanning"}
                        className={`w-full text-left flex items-start justify-between p-3 rounded-lg transition-colors ${model === "vit" ? "bg-[#F5F3FF]" : "hover:bg-[#F9FAFB]"}`}
                      >
                        <div className="flex flex-col">
                          <span
                            className={`text-xs font-bold ${model === "vit" ? "text-[#6D28D9]" : "text-[#111827]"}`}
                          >
                            Vision Transformer (ViT Architecture)
                          </span>
                        </div>
                      </button>
                    </div>
                  </>
                )}
              </div>

              <button
                onClick={handleAnalyze}
                disabled={status === "scanning" || !image}
                className={`w-full py-3 px-4 text-xs font-mono font-bold uppercase rounded-xl transition duration-200 shadow-sm ${
                  status === "scanning"
                    ? "bg-[#C4B5FD] text-white cursor-wait"
                    : !image
                      ? "bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed"
                      : "bg-[#6D28D9] hover:bg-[#7C3AED] text-white"
                }`}
              >
                {status === "scanning"
                  ? "RUNNING INFERENCE..."
                  : "EXECUTE PIPELINE ANALYSES"}
              </button>

              {image && (
                <button
                  onClick={handleReset}
                  disabled={status === "scanning"}
                  className="w-full py-2.5 px-4 text-xs font-mono font-bold uppercase rounded-xl border border-[#C4B5FD] bg-[#F5F3FF] text-[#6D28D9] hover:bg-[#EDE9FE] transition"
                >
                  CLEAR WORKSPACE
                </button>
              )}
            </div>
          </section>

          {/* ANALYTICS DISPLAY PANEL (RIGHT COLUMN) */}
          <section className="lg:col-span-7 bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm h-full flex flex-col justify-between min-h-[420px]">
            <div>
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#111827] border-b border-[#E5E7EB] pb-3 mb-4">
                II. Visualisasi Analytics & Peta Probabilitas (XAI Layer)
              </h2>

              {status === "success" && result ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="border border-[#E5E7EB] rounded-xl bg-[#F3F4F6] p-3 flex flex-col items-center relative shadow-inner">
                    <div className="relative rounded-lg overflow-hidden border border-[#D1D5DB]">
                      <img
                        src={preview}
                        alt="XAI Analysis"
                        className="max-h-[220px] object-contain rounded-lg"
                      />
                      <div className="absolute inset-0 bg-[#00FFCE]/10 mix-blend-multiply pointer-events-none"></div>
                    </div>
                    <div className="w-full text-center mt-2 text-[10px] font-mono font-bold text-[#6D28D9] bg-[#F5F3FF] py-1.5 rounded-lg border border-[#DDD6FF] uppercase tracking-wider">
                      KERNEL ATTENTION MATRIX READ
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-red-50 border border-red-200 p-4 rounded-xl">
                      <span className="text-[10px] text-red-500 font-mono font-bold uppercase block mb-1">
                        Status Kategori Terdeteksi:
                      </span>
                      <span className="text-[#111827] text-base font-extrabold tracking-wide uppercase">
                        {result.class}
                      </span>
                    </div>

                    <div className="bg-[#F3F4F6] border border-[#E5E7EB] p-4 rounded-xl space-y-3 text-xs font-mono">
                      <div className="flex justify-between border-b border-[#D1D5DB] pb-1.5">
                        <span className="text-[#6B7280] font-sans text-xs">
                          Tingkat Keyakinan (Confidence):
                        </span>
                        <span className="text-emerald-600 font-extrabold text-sm">
                          {result.confidence}
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-[#D1D5DB] pb-1.5">
                        <span className="text-[#6B7280] font-sans text-xs">
                          Sektor Pemetaan:
                        </span>
                        <span className="text-[#1F2937] font-bold">
                          {result.processedArea}
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-[#D1D5DB] pb-1.5">
                        <span className="text-[#6B7280] font-sans text-xs">
                          Kecepatan Komputasi:
                        </span>
                        <span className="text-[#374151]">
                          {result.inferenceTime}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[#6B7280] font-sans text-xs">
                          Tingkat Ancaman Sektoral:
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold border ${result.severity === "CRITICAL ALERT" ? "bg-red-100 text-red-700 border-red-300" : "bg-emerald-100 text-emerald-700 border-emerald-300"}`}
                        >
                          {result.severity}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center border border-[#E5E7EB] border-dashed rounded-xl bg-[#F9FAFB] py-16">
                  <p className="text-[#6B7280] font-medium max-w-sm text-xs font-mono">
                    {status === "scanning"
                      ? "INFERENCE PIPELINE ACTIVE..."
                      : "AWAITING SATELLITE MULTISPECTRAL SOURCE FILE..."}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-4 border-t border-[#E5E7EB] pt-3 text-[11px] text-[#9CA3AF] flex justify-between font-mono">
              <span>STATUS: SECURITY PIPELINE SECURE</span>
              <span className="text-[#6D28D9] font-bold">READY TO RUN</span>
            </div>
          </section>
        </div>
      </main>

      {/* Global Status Footer */}
      <footer className="w-full border-t border-[#E5E7EB] bg-white px-6 py-3 text-center text-[11px] text-[#9CA3AF] font-mono">
        GRID METRICS PROTOCOL: INTEGRATED WITH HUGGING FACE DOCKER STORAGE
      </footer>
    </div>
  );
}
