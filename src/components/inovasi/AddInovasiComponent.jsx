import React, { useState } from 'react';
import { addProduk } from '../../services/InovasiService';
import { Link, useNavigate } from 'react-router-dom';

function AddInovasiComponent() {
  const [formData, setFormData] = useState({
    ino_judul: '',
    ino_deskripsi: '',
    ino_kategori: 'SS',
    ino_tanggalsubmit: '',
    ino_pengusul: '',
    ino_unit: '',
    ino_manfaat: '',
    ino_potensi_savings: ''
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();

  const kategoriOptions = [
    { value: 'SS', label: 'SS - Suggestion System' },
    { value: 'Non-SS', label: 'Non-SS - Non-Suggestion System' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    // Validation
    if (!formData.ino_judul.trim()) {
      setError('Judul harus diisi');
      return;
    }
    if (!formData.ino_kategori) {
      setError('Kategori harus dipilih');
      return;
    }
    if (!formData.ino_tanggalsubmit) {
      setError('Tanggal submit harus diisi');
      return;
    }
    if (!formData.ino_pengusul.trim()) {
      setError('Pengusul harus diisi');
      return;
    }
    if (!formData.ino_unit.trim()) {
      setError('Unit harus diisi');
      return;
    }
    if (!formData.ino_potensi_savings || parseFloat(formData.ino_potensi_savings) < 0) {
      setError('Potensi Savings harus berupa angka positif');
      return;
    }

    setIsSubmitting(true);

    try {
      const newInovasi = {
        ino_judul: formData.ino_judul.trim(),
        ino_deskripsi: formData.ino_deskripsi.trim(),
        ino_kategori: formData.ino_kategori,
        ino_tanggalsubmit: formData.ino_tanggalsubmit,
        ino_pengusul: formData.ino_pengusul.trim(),
        ino_unit: formData.ino_unit.trim(),
        ino_manfaat: formData.ino_manfaat.trim(),
        ino_potensi_savings: parseFloat(formData.ino_potensi_savings)
      };
      
      await addProduk(newInovasi);
      setSuccessMessage('✅ Inovasi berhasil ditambahkan!');
      
      // Reset form and redirect
      setTimeout(() => {
        navigate('/');
      }, 1500);
      
    } catch (error) {
      console.error("Error adding inovasi:", error);
      setError("❌ Gagal menambahkan inovasi. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="mb-0">➕ Tambah Inovasi Baru</h4>
                <Link to="/" className="btn btn-light btn-sm">
                  ← Kembali
                </Link>
              </div>
            </div>
            
            <div className="card-body">
              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}
              
              {successMessage && (
                <div className="alert alert-success">
                  {successMessage}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="ino_judul" className="form-label fw-semibold">
                        Judul Inovasi <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="ino_judul"
                        name="ino_judul"
                        value={formData.ino_judul}
                        onChange={handleInputChange}
                        placeholder="Masukkan judul inovasi"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="ino_kategori" className="form-label fw-semibold">
                        Kategori <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-control"
                        id="ino_kategori"
                        name="ino_kategori"
                        value={formData.ino_kategori}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                      >
                        {kategoriOptions.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="ino_tanggalsubmit" className="form-label fw-semibold">
                        Tanggal Submit <span className="text-danger">*</span>
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="ino_tanggalsubmit"
                        name="ino_tanggalsubmit"
                        value={formData.ino_tanggalsubmit}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="ino_potensi_savings" className="form-label fw-semibold">
                        Potensi Savings (Rp) <span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="ino_potensi_savings"
                        name="ino_potensi_savings"
                        value={formData.ino_potensi_savings}
                        onChange={handleInputChange}
                        min="0"
                        step="0.01"
                        placeholder="0"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="ino_pengusul" className="form-label fw-semibold">
                        Pengusul <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="ino_pengusul"
                        name="ino_pengusul"
                        value={formData.ino_pengusul}
                        onChange={handleInputChange}
                        placeholder="Nama pengusul"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="ino_unit" className="form-label fw-semibold">
                        Unit <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="ino_unit"
                        name="ino_unit"
                        value={formData.ino_unit}
                        onChange={handleInputChange}
                        placeholder="Unit kerja"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="ino_deskripsi" className="form-label fw-semibold">
                    Deskripsi
                  </label>
                  <textarea
                    className="form-control"
                    id="ino_deskripsi"
                    name="ino_deskripsi"
                    value={formData.ino_deskripsi}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Deskripsi inovasi"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="ino_manfaat" className="form-label fw-semibold">
                    Manfaat
                  </label>
                  <textarea
                    className="form-control"
                    id="ino_manfaat"
                    name="ino_manfaat"
                    value={formData.ino_manfaat}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Manfaat yang diharapkan"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <Link to="/" className="btn btn-secondary me-md-2">
                    Batal
                  </Link>
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Menyimpan...
                      </>
                    ) : (
                      '💾 Simpan Inovasi'
                    )}
                  </button>
                </div>
                
                <div className="mt-3">
                  <small className="text-muted">
                    <span className="text-danger">*</span> Menandakan field wajib diisi
                  </small>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddInovasiComponent;