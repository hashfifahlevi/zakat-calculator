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
      <label for="jumlahOrang" style="margin-top: 1rem; display: block;">Jumlah Orang dalam Tanggungan:</label>
      <input type="number" id="jumlahOrang" placeholder="Contoh: 4" oninput="formatInputRupiah(this)">

      <label for="hargaBeras" style="margin-top: 1rem; display: block;">Harga Beras per Kg (misal Rp15.000):</label>
      <input type="text" id="hargaBeras" placeholder="Contoh: 15.000" oninput="formatInputRupiah(this)">

      <button onclick="hitungZakatFitrah()">Hitung Zakat Fitrah</button>
      <div id="hasilZakat"></div>
    `;
  } else if (jenis === "fidyah") {
    container.innerHTML = `
      <label for="hari" style="margin-top: 1rem; display: block;">Jumlah Hari Tidak Puasa:</label>
      <input type="number" id="hari" placeholder="Contoh: 10" oninput="formatInputRupiah(this)">

      <label for="hargaPorsi" style="margin-top: 1rem; display: block;">Harga Makanan per Porsi (misal Rp25.000):</label>
      <input type="text" id="hargaPorsi" placeholder="Contoh: 25.000" oninput="formatInputRupiah(this)">

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
  const harga = parseInt(document.getElementById("hargaBeras").value.replace(/\D/g, '')) || 0;
  const total = jumlah * harga * 2.5;
  document.getElementById("hasilZakat").innerHTML = `Total zakat fitrah: <strong>Rp${total.toLocaleString('id-ID')}</strong>`;
}

function hitungFidyah() {
  const hari = parseInt(document.getElementById("hari").value) || 0;
  const harga = parseInt(document.getElementById("hargaPorsi").value.replace(/\D/g, '')) || 0;
  const total = hari * harga;
  document.getElementById("hasilZakat").innerHTML = `Total fidyah yang harus dibayarkan: <strong>Rp${total.toLocaleString('id-ID')}</strong>`;
}
