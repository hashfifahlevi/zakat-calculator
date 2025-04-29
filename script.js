function gantiKalkulator() {
  const jenis = document.getElementById("jenisKalkulator").value;
  const container = document.getElementById("formContainer");
  const hasil = document.getElementById("hasilZakat");
  hasil.innerHTML = ""; // Bersihkan hasil saat ganti form

  if (jenis === "penghasilan") {
    container.innerHTML = `
      <label for="period">Pilih Periode:</label>
      <select id="period" onchange="updateLabelPeriode()">
        <option value="bulanan">Bulanan</option>
        <option value="tahunan">Tahunan</option>
      </select>

      <label for="income" style="margin-top: 1rem; display: block;">Penghasilan Utama (<span id="labelPeriode">per Bulan</span>):</label>
      <input type="text" id="income" placeholder="Contoh: 5.000.000">

      <label for="extraIncome" style="margin-top: 1rem; display: block;">Penghasilan Tambahan:</label>
      <input type="text" id="extraIncome" placeholder="Contoh: 1.000.000">

      <small class="info-nisab">Nisab: <strong>Rp7.140.498/bulan atau Rp85.685.972/tahun</strong><br>(SK Ketua BAZNAS No. 13 tahun 2025)</small>

      <button onclick="hitungZakat()">Hitung Zakat</button>
      <div id="hasilZakat"></div>
    `;
  } else if (jenis === "fitrah") {
    container.innerHTML = `
      <label for="jumlahOrang">Jumlah Orang dalam Tanggungan:</label>
      <input type="number" id="jumlahOrang" placeholder="Contoh: 4">
  
      <p style="font-size: 0.9rem; color: #666; font-weight: bold;">Ditetapkan: Rp47.000 per orang</p>
  
      <button onclick="hitungZakatFitrah()">Hitung Zakat Fitrah</button>
      <div id="hasilZakat"></div>
    `;
  } else if (jenis === "fidyah") {
    container.innerHTML = `
      <label for="hari">Jumlah Hari Tidak Puasa:</label>
      <input type="number" id="hari" placeholder="Contoh: 10">
  
      <p style="font-size: 0.9rem; color: #666; font-weight: bold;">Ditetapkan: Rp60.000 per hari</p>
  
      <button onclick="hitungFidyah()">Hitung Fidyah</button>
      <div id="hasilZakat"></div>
    `;
  }
}

function formatInputRupiah(el) {
  let angka = el.value.replace(/\D/g, ""); // Hapus semua non-digit
  let formatted = angka.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  el.value = formatted;
}

function updateLabelPeriode() {
  const period = document.getElementById("period").value;
  document.getElementById("labelPeriode").innerText = period === "tahunan" ? "per Tahun" : "per Bulan";
}

function hitungZakat() {
  const period = document.getElementById("period").value;
  const income = parseInt(document.getElementById("income").value.replace(/\D/g, '')) || 0;
  const extra = parseInt(document.getElementById("extraIncome").value.replace(/\D/g, '')) || 0;
  const total = income + extra;

  const nisab = period === "bulanan" ? 7140498 : 85685972;

  const hasil = document.getElementById("hasilZakat");
  if (total >= nisab) {
    const zakat = total * 0.025;
    hasil.innerHTML = `Total zakat yang harus dibayarkan: <strong>Rp${zakat.toLocaleString('id-ID')}</strong>`;
  } else {
    hasil.innerHTML = "Penghasilan belum mencapai nisab. Tidak wajib zakat.";
  }
}

function hitungZakatFitrah() {
  const jumlah = parseInt(document.getElementById("jumlahOrang").value) || 0;
  const tarif = 45000;
  const total = jumlah * tarif;
  document.getElementById("hasilZakat").innerHTML =
    `Total zakat fitrah: <strong>Rp${total.toLocaleString('id-ID')}</strong>`;
}

function hitungFidyah() {
  const hari = parseInt(document.getElementById("hari").value) || 0;
  const tarif = 40000;
  const total = hari * tarif;
  document.getElementById("hasilZakat").innerHTML =
    `Total fidyah yang harus dibayarkan: <strong>Rp${total.toLocaleString('id-ID')}</strong>`;
}
