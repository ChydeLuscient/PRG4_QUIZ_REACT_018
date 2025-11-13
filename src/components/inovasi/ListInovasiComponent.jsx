import React, { useEffect, useState } from "react";
import { listProduk, deleteProduk } from "../../services/InovasiService";
import { Link } from 'react-router-dom';

function ListInovasiComponent() {
  const [inovasi, setInovasi] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchInovasis = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await listProduk();
      console.log('📦 API Response:', response.data);
      // response.data diharapkan berisi array
      setInovasi(response.data || []);
    } catch (err) {
      console.error('❌ Fetch error:', err);
      setError(err.message || "Gagal mengambil data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInovasis();
  }, []);

  const handleView = (item) => {
    // sederhana: tampilkan detail di alert (bisa diubah ke modal)
    alert(JSON.stringify(item, null, 2));
  };

  const handleDelete = async (id, judul) => {
    // Konfirmasi hapus
    if (!window.confirm(`Apakah Anda yakin ingin menghapus inovasi "${judul}"?`)) {
      return;
    }
    try {
      await deleteProduk(id);
      alert('✅ Inovasi berhasil dihapus!');
      // refresh
      fetchInovasis();
    } catch (err) {
      alert("❌ Gagal hapus: " + (err.message || err));
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
        <h3 align='left'>🛍️ Daftar Inovasi</h3>
        <h4 style={{ paddingLeft: '16px' }}>Kelola inovasi Anda dengan mudah</h4>
        </div>

        <div style={{ marginBottom: 16 }}>
          <Link to="/add-inovasi">
            <button style={{ marginRight: 8 }} className="btn btn-light btn-outline-success">➕Tambah Inovasi</button>
          </Link>
          <button onClick={fetchInovasis} className="btn btn-outline-primary">🔄 Refresh</button>
        </div>

        {loading && <div>Loading...</div>}
        {error && <div style={{ color: "red" }}>Error: {error}</div>}
      </div>

       <div className="card shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-dark">
                <tr>
                  <th style={{ border: "1px solid #ddd"}} className="text-center">No</th>
                  <th style={{ border: "1px solid #ddd"}} className="text-center">Judul</th>
                  <th style={{ border: "1px solid #ddd"}} className="text-center">Kategori</th>
                  <th style={{ border: "1px solid #ddd"}} className="text-center">Pengusul</th>
                  <th style={{ border: "1px solid #ddd"}} className="text-center">Unit</th>
                  <th style={{ border: "1px solid #ddd"}} className="text-center">Potensi Saving</th>
                  <th style={{ border: "1px solid #ddd"}} className="text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {inovasi.length === 0 && !loading ? (
                  <tr>
                    <td colSpan={7} style={{ padding: 12, textAlign: "center" }}>Tidak ada data</td>
                  </tr>
                ) : (
                  inovasi.map((item, idx) => (
                    <tr key={item.ino_id || idx}>
                      <td style={{ border: "1px solid #eee"}} className="text-center">{idx + 1}</td>
                      <td style={{ border: "1px solid #eee"}} className="text-center">{item.ino_judul || '-'}</td>
                      <td style={{ border: "1px solid #eee"}} className="text-center">{item.ino_kategori || '-'}</td>
                      <td style={{ border: "1px solid #eee"}} className="text-center">{item.ino_pengusul || '-'}</td>
                      <td style={{ border: "1px solid #eee"}} className="text-center">{item.ino_unit || '-'}</td>
                      <td style={{ border: "1px solid #eee"}} className="text-center">
                        {item.ino_potensi_savings ? `Rp ${parseFloat(item.ino_potensi_savings).toLocaleString('id-ID')}` : '-'}
                      </td>
                      <td style={{ border: "1px solid #eee", padding: 8 }}>
                        <button onClick={() => handleView(item)} style={{ marginRight: 8 }} className="btn btn-sm btn-outline-primary">Lihat</button>
                        <Link to={`/edit-inovasi/${item.ino_id}`} style={{ marginRight: 8 }}>
                          <button className="btn btn-sm btn-outline-warning">Edit</button>
                        </Link>
                        {item.ino_id ? (
                          <button onClick={() => handleDelete(item.ino_id, item.ino_judul)} className="btn btn-sm btn-outline-danger">Hapus</button>
                        ) : (
                          <button disabled title="ID tidak tersedia" className="btn btn-sm btn-outline-danger">Hapus</button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {inovasi && inovasi.length > 0 && (
        <div className="mt-3 text-muted text-center">
          <small>Menampilkan {inovasi.length} Inovasi</small>
        </div>
      )}
    </div>

  );
}

export default ListInovasiComponent;